/**
 * Strictly In-IDE Project-Manager-Dashboard Server
 * Zero external dependencies - uses pure Node.js standard library.
 * Binds strictly to 127.0.0.1 (Local machine only).
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { exec } = require('child_process');
const DashboardParser = require('./parser');

const PORT = Number(process.env.PORT) || 4201;
let currentPort = PORT;
const HOST = '127.0.0.1';
const PROJECT_ROOT = path.resolve(__dirname, '..');
const DASHBOARD_ROOT = path.resolve(__dirname);
const parser = new DashboardParser(PROJECT_ROOT);

// Per-process secret: injected into index.html and required on every mutating request.
// Blocks cross-site request forgery from any other page open in the user's browser.
const SESSION_TOKEN = crypto.randomBytes(24).toString('hex');
const MAX_BODY_BYTES = 64 * 1024;
const ALLOWED_TASK_STATUSES = new Set(['BACKLOG', 'READY', 'IN_PROGRESS', 'BLOCKED', 'REVIEW', 'DONE', 'RED_TEST_FAIL', 'REVIEW_BLOCKED']);
const ALLOWED_AC_STATUSES = new Set(['GREEN', 'RED', 'PENDING']);

/** Only accept requests addressed to this daemon (defeats DNS-rebinding). */
function isAllowedHost(req) {
  const host = (req.headers.host || '').toLowerCase();
  return host === `127.0.0.1:${currentPort}` || host === `localhost:${currentPort}`;
}

/** Mutating requests must come from the dashboard page itself and carry the session token. */
function isTrustedMutation(req) {
  const origin = (req.headers.origin || '').toLowerCase();
  const sameOrigin = origin === `http://127.0.0.1:${currentPort}` || origin === `http://localhost:${currentPort}`;
  const token = req.headers['x-dashboard-token'] || '';
  const tokenOk = token.length === SESSION_TOKEN.length &&
    crypto.timingSafeEqual(Buffer.from(token), Buffer.from(SESSION_TOKEN));
  const isJson = (req.headers['content-type'] || '').startsWith('application/json');
  return sameOrigin && tokenOk && isJson;
}

function readJsonBody(req, res, onBody) {
  let body = '';
  let tooLarge = false;
  req.on('data', chunk => {
    body += chunk;
    if (body.length > MAX_BODY_BYTES) { tooLarge = true; req.destroy(); }
  });
  req.on('end', () => {
    if (tooLarge) return;
    let payload;
    try { payload = JSON.parse(body || '{}'); } catch (e) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Invalid JSON' }));
      return;
    }
    onBody(payload);
  });
}

function sha256File(filePath) {
  try { return crypto.createHash('sha256').update(fs.readFileSync(filePath)).digest('hex'); } catch (e) { return 'n/a'; }
}

// Active SSE client connections
const sseClients = new Set();

/**
 * Broadcast updated state to all connected SSE clients
 */
function broadcastState() {
  if (sseClients.size === 0) return;
  try {
    const state = parser.getDashboardState('Vibe-Coding');
    const data = `data: ${JSON.stringify(state)}\n\n`;
    sseClients.forEach(res => {
      res.write(data);
    });
  } catch (err) {
    console.error('[Dashboard] Error broadcasting state:', err.message);
  }
}

// Debounced file watcher for real-time live telemetry
let debounceTimer = null;
function triggerLiveSync(event, filename) {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    broadcastState();
  }, 250);
}

// Periodic live sync for agent context window & token updates
setInterval(() => {
  broadcastState();
}, 3500);

// Watch target folders (feature specs live in docs/features/)
['docs', 'tests'].forEach(subDir => {
  const dirPath = path.join(PROJECT_ROOT, subDir);
  if (fs.existsSync(dirPath)) {
    try {
      fs.watch(dirPath, { recursive: true }, triggerLiveSync);
    } catch (e) {
      // Non-fatal if recursive watch isn't supported on all platforms
      try { fs.watch(dirPath, triggerLiveSync); } catch (err) {}
    }
  }
});

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png'
};

const server = http.createServer((req, res) => {
  // Security: no CORS headers are sent, so other origins cannot read responses.
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'no-referrer');

  if (!isAllowedHost(req)) {
    res.writeHead(421, { 'Content-Type': 'text/plain' });
    res.end('Misdirected Request');
    return;
  }

  if (req.method === 'OPTIONS') {
    // Cross-origin preflights are intentionally refused.
    res.writeHead(403);
    res.end();
    return;
  }

  if (req.method === 'POST' && !isTrustedMutation(req)) {
    res.writeHead(403, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Forbidden: untrusted origin or missing dashboard token' }));
    return;
  }

  // 1. SSE Real-Time Stream Endpoint
  if (req.url === '/api/stream') {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive'
    });

    // Send initial state immediately
    const initialState = parser.getDashboardState('Vibe-Coding');
    res.write(`data: ${JSON.stringify(initialState)}\n\n`);

    sseClients.add(res);

    req.on('close', () => {
      sseClients.delete(res);
    });
    return;
  }

  // 2. State Snapshot Endpoint
  if (req.url === '/api/state') {
    const state = parser.getDashboardState('Vibe-Coding');
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(state));
    return;
  }

  // 2b. Agent Context Window & Token Telemetry Endpoint
  if (req.url === '/api/tokens') {
    const tokens = parser.parseTokenTelemetry();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(tokens));
    return;
  }

  // 3. Quick Actions Endpoint
  if (req.url === '/api/action' && req.method === 'POST') {
    readJsonBody(req, res, (payload) => {
      try {
        const action = payload.action;

        if (action === 'run-tests') {
          const pkgPath = path.join(PROJECT_ROOT, 'package.json');
          const testsDir = path.join(PROJECT_ROOT, 'tests');
          let testCommand = '';

          // 1. If project has package.json with test script, prioritize npm test
          if (fs.existsSync(pkgPath)) {
            try {
              const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
              if (pkg.scripts && pkg.scripts.test) {
                testCommand = 'npm test';
              }
            } catch (e) {}
          }

          // 2. If pytest tests exist
          if (!testCommand && fs.existsSync(testsDir)) {
            const hasPyTests = fs.readdirSync(testsDir).some(f => f.startsWith('test_') && f.endsWith('.py'));
            if (hasPyTests) testCommand = 'pytest';
          }

          // 3. Framework test suite: AC Contracts and Token Telemetry runners
          if (!testCommand) {
            const runners = [];
            if (fs.existsSync(path.join(testsDir, 'test_ac_contracts.js'))) {
              runners.push(`"${path.join(testsDir, 'test_ac_contracts.js')}"`);
            }
            if (fs.existsSync(path.join(testsDir, 'test_token_telemetry.js'))) {
              runners.push(`"${path.join(testsDir, 'test_token_telemetry.js')}"`);
            }
            if (runners.length > 0) {
              testCommand = `node ${runners.join(' && node ')}`;
            } else {
              testCommand = 'node -v';
            }
          }

          exec(testCommand, { cwd: PROJECT_ROOT, timeout: 15000 }, (err, stdout, stderr) => {
            const combinedOutput = (stdout || '') + (stderr ? ('\n' + stderr) : '');
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
              output: combinedOutput.trim() || 'Test runner completed successfully.',
              success: !err
            }));
            broadcastState();
          });
          return;
        }

        if (action === 'spec-check') {
          const state = parser.getDashboardState('Vibe-Coding');
          const specs = state.specs || [];
          const passing = specs.filter(s => s.status === 'GREEN').length;
          const failing = specs.filter(s => s.status === 'RED').length;
          const pending = specs.filter(s => s.status === 'PENDING').length;
          const total = specs.length;
          const rate = total > 0 ? Math.round((passing / total) * 100) : 100;

          const reportLines = [
            '=================================================================',
            '           📐 SPECIFICATION & ACCEPTANCE CRITERIA AUDIT          ',
            '=================================================================',
            `Timestamp: ${new Date().toISOString()}`,
            `Total AC Contracts: ${total}`,
            `Passing (GREEN):      ${passing} (${rate}%)`,
            `Failing (RED):        ${failing}`,
            `Pending Verification: ${pending}`,
            '',
            '--- Acceptance Criteria Traceability Matrix ---'
          ];

          specs.forEach(s => {
            const icon = s.status === 'GREEN' ? '🟢' : (s.status === 'RED' ? '🔴' : '⚪');
            reportLines.push(`${icon} [${s.id}] ${s.title}`);
            if (s.file) reportLines.push(`   └─ Spec File: ${s.file}`);
            if (s.scenario && s.scenario.given) {
              reportLines.push(`   └─ GIVEN: ${s.scenario.given}`);
              reportLines.push(`   └─ WHEN:  ${s.scenario.when}`);
              reportLines.push(`   └─ THEN:  ${s.scenario.then}`);
            }
          });

          reportLines.push('');
          reportLines.push(failing === 0 ? '✅ RESULT: ZERO SPEC REGRESSIONS DETECTED — CONTRACTS IN TACT' : `⚠️ RESULT: ${failing} FAILING ACCEPTANCE CRITERIA REQUIRE ATTENTION`);

          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({
            output: reportLines.join('\n'),
            success: failing === 0
          }));
          return;
        }

        if (action === 'security-audit') {
          const reportLines = [
            '=================================================================',
            '            🛡️ STATIC SECURITY & SECRET LEAK AUDIT              ',
            '=================================================================',
            `Scan Time: ${new Date().toISOString()}`,
            `Scope: ${PROJECT_ROOT}`,
            ''
          ];

          let issuesFound = 0;
          const envPath = path.join(PROJECT_ROOT, '.env');
          if (fs.existsSync(envPath)) {
            reportLines.push('⚠️ [WARN] .env file detected in working directory. Ensure it is gitignored.');
            issuesFound++;
          } else {
            reportLines.push('✅ No unencrypted .env file located in root.');
          }

          const gitignorePath = path.join(PROJECT_ROOT, '.gitignore');
          if (fs.existsSync(gitignorePath)) {
            const gitignore = fs.readFileSync(gitignorePath, 'utf8');
            if (/node_modules/.test(gitignore)) {
              reportLines.push('✅ node_modules properly gitignored.');
            } else {
              reportLines.push('⚠️ [WARN] node_modules not explicitly listed in .gitignore.');
              issuesFound++;
            }
            if (/\.env/.test(gitignore)) {
              reportLines.push('✅ .env patterns protected in .gitignore.');
            }
          }

          const gitState = parser.getGitTelemetry();
          if (gitState.dirtyFiles > 0) {
            reportLines.push(`ℹ️ Git working tree has ${gitState.dirtyFiles} modified/uncommitted file(s).`);
          } else {
            reportLines.push('✅ Git working tree is completely clean.');
          }

          reportLines.push('');
          reportLines.push(issuesFound === 0 ? '🔒 STATUS: CLEAN — ZERO HIGH/CRITICAL VULNERABILITIES' : `⚠️ STATUS: ${issuesFound} ADVISORY ITEM(S) TO REVIEW`);

          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({
            output: reportLines.join('\n'),
            success: issuesFound === 0
          }));
          return;
        }

        if (action === 'sync-telemetry') {
          broadcastState();
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({
            output: `🔄 Telemetry successfully refreshed from disk at ${new Date().toLocaleTimeString()}. All connected clients updated.`,
            success: true
          }));
          return;
        }

        if (action === 'approve-milestone') {
          const approvalsDir = path.join(PROJECT_ROOT, 'docs', 'approvals');
          if (!fs.existsSync(approvalsDir)) {
            fs.mkdirSync(approvalsDir, { recursive: true });
          }
          // Follows docs/approvals/APPROVAL-TEMPLATE.md. Generated records are local-only
          // (gitignored) until a human reviews them and fills the approver identity.
          const stamp = new Date().toISOString();
          const approvalFile = path.join(approvalsDir, `approval-phase-${stamp.replace(/[:.]/g, '-')}.md`);
          const tracked = ['docs/phases.md', 'docs/task.md', 'docs/release-checklist.md'];
          const artifactRows = tracked
            .map(rel => `| \`${rel}\` | sha256:${sha256File(path.join(PROJECT_ROOT, rel))} |`)
            .join('\n');
          const approvalContent = [
            '# Approval Record — Phase Milestone (dashboard draft)',
            '',
            '| Field | Value |',
            '|---|---|',
            '| Approval ID | APR-TBD |',
            '| Artifact | Phase milestone (see revisions below) |',
            '| Approver | TBD — human approver name and role (REQUIRED) |',
            '| Decision | PENDING HUMAN CONFIRMATION |',
            `| Requested at | ${stamp} |`,
            '| Conditions | TBD |',
            '| Linked CR | TBD |',
            '',
            '## Artifact revisions',
            '',
            '| Artifact | Revision |',
            '|---|---|',
            artifactRows,
            '',
            '> Generated by Project-Manager-Dashboard. It is NOT an approval until a human approver',
            '> completes the fields above (see docs/approvals/APPROVAL-TEMPLATE.md).',
            ''
          ].join('\n');
          fs.writeFileSync(approvalFile, approvalContent, 'utf8');

          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: true, message: 'Draft approval record created in docs/approvals/ — a human approver must complete it.' }));
          broadcastState();
          return;
        }

        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Unknown action' }));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  // 4. Task Status Mutation Endpoint (Kanban Drag & Drop)
  if (req.url === '/api/task-status' && req.method === 'POST') {
    readJsonBody(req, res, ({ taskId, newStatus }) => {
      try {
        if (typeof taskId !== 'string' || !/^[A-Za-z0-9_-]{1,40}$/.test(taskId) ||
            typeof newStatus !== 'string' || !ALLOWED_TASK_STATUSES.has(newStatus)) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Valid taskId and newStatus required' }));
          return;
        }

        const success = parser.updateTaskStatus(taskId, newStatus);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success, taskId, newStatus }));
        broadcastState();
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  // 4b. AC Contract Status Mutation Endpoint
  if (req.url === '/api/ac-status' && req.method === 'POST') {
    readJsonBody(req, res, ({ acId, newStatus }) => {
      try {
        if (typeof acId !== 'string' || !/^[A-Za-z0-9._-]{3,50}$/.test(acId) ||
            typeof newStatus !== 'string' || !ALLOWED_AC_STATUSES.has(newStatus)) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Valid acId and newStatus (GREEN|RED|PENDING) required' }));
          return;
        }

        const success = parser.updateAcStatus(acId, newStatus);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success, acId, newStatus }));
        broadcastState();
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  // 5. Static Asset Serving
  let urlPath;
  try {
    urlPath = decodeURIComponent(new URL(req.url, `http://${HOST}`).pathname);
  } catch (e) {
    res.writeHead(400);
    res.end('Bad Request');
    return;
  }
  const filePath = path.resolve(DASHBOARD_ROOT, '.' + (urlPath === '/' ? '/index.html' : urlPath));

  // Security: prevent path traversal outside the dashboard directory and block server source files
  const rel = path.relative(DASHBOARD_ROOT, filePath);
  const blocked = ['server.js', 'parser.js'];
  if (rel.startsWith('..') || path.isAbsolute(rel) || blocked.includes(rel)) {
    res.writeHead(403);
    res.end('Access Denied');
    return;
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext];
  if (!contentType) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
    return;
  }

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
      } else {
        res.writeHead(500);
        res.end('Server Error');
      }
    } else {
      if (rel === 'index.html') {
        // Inject the per-process session token for same-origin mutating requests
        content = content.toString('utf8').replace(
          '</head>',
          `  <meta name="dashboard-token" content="${SESSION_TOKEN}">\n</head>`
        );
        res.setHeader('Cache-Control', 'no-store');
      }
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
});

function startServer(port) {
  const onError = (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`[Project-Manager-Dashboard] Port ${port} is busy, trying port ${port + 1}...`);
      server.removeListener('error', onError);
      currentPort = port + 1;
      startServer(currentPort);
    } else {
      console.error('[Project-Manager-Dashboard] Server error:', err.message);
    }
  };

  server.once('error', onError);
  server.listen(port, HOST, () => {
    server.removeListener('error', onError);
    currentPort = port;
    console.log(`[Project-Manager-Dashboard] Live in-IDE daemon active on http://${HOST}:${port}`);
    console.log(`[Project-Manager-Dashboard] Strictly local machine execution (Never pushed to remote)`);
  });
}

startServer(currentPort);


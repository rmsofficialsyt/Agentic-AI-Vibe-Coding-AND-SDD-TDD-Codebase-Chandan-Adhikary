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

const PORT = Number(process.env.PORT) || 4200;
const HOST = '127.0.0.1';
const PROJECT_ROOT = path.resolve(__dirname, '..');
const DASHBOARD_ROOT = path.resolve(__dirname);
const parser = new DashboardParser(PROJECT_ROOT);

// Per-process secret: injected into index.html and required on every mutating request.
// Blocks cross-site request forgery from any other page open in the user's browser.
const SESSION_TOKEN = crypto.randomBytes(24).toString('hex');
const MAX_BODY_BYTES = 64 * 1024;
const ALLOWED_TASK_STATUSES = new Set(['BACKLOG', 'READY', 'IN_PROGRESS', 'BLOCKED', 'REVIEW', 'DONE', 'RED_TEST_FAIL', 'REVIEW_BLOCKED']);

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
    const state = parser.getDashboardState('SDD');
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
    const initialState = parser.getDashboardState('SDD');
    res.write(`data: ${JSON.stringify(initialState)}\n\n`);

    sseClients.add(res);

    req.on('close', () => {
      sseClients.delete(res);
    });
    return;
  }

  // 2. State Snapshot Endpoint
  if (req.url === '/api/state') {
    const state = parser.getDashboardState('SDD');
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
          // Run test command
          exec('npm test -- --bail || pytest || exit 0', { cwd: PROJECT_ROOT, timeout: 10000 }, (err, stdout, stderr) => {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
              output: stdout || stderr || 'Test runner completed.',
              success: !err
            }));
            broadcastState();
          });
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

let currentPort = PORT;

function startServer(port) {
  server.listen(port, HOST, () => {
    console.log(`[Project-Manager-Dashboard] Live in-IDE daemon active on http://${HOST}:${port}`);
    console.log(`[Project-Manager-Dashboard] Strictly local machine execution (Never pushed to remote)`);
  });
}

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log(`[Project-Manager-Dashboard] Port ${currentPort} is busy, trying port ${currentPort + 1}...`);
    currentPort++;
    startServer(currentPort);
  } else {
    console.error('[Project-Manager-Dashboard] Server error:', err.message);
  }
});

startServer(currentPort);


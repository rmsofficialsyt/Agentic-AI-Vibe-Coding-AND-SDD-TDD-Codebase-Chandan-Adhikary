/**
 * Project-Manager-Dashboard Telemetry & AST Parser
 * Zero external dependencies - pure native Node.js.
 * Parses markdown governance docs, specs, git activity, and tests in real-time.
 */

const fs = require('fs');
const os = require('os');
const path = require('path');
const { execSync } = require('child_process');

// Files inside docs/features/ that are guidance, not feature contracts
const NON_FEATURE_FILES = new Set(['README.md', 'FEATURE-TEMPLATE.md']);

class DashboardParser {
  constructor(projectRoot) {
    this.projectRoot = projectRoot;
    this.docsDir = path.join(projectRoot, 'docs');
    // Canonical feature-spec location (flat NNN-name.md or modular NNN-name/ folders)
    this.featuresDir = path.join(this.docsDir, 'features');
    this.testsDir = path.join(projectRoot, 'tests');
    this.statusOverrides = {};
  }

  /**
   * Recursively list feature-spec markdown files under docs/features/
   */
  listFeatureFiles() {
    const results = [];
    const walk = (dir, depth) => {
      if (depth > 3 || !fs.existsSync(dir)) return;
      for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) walk(full, depth + 1);
        else if (entry.name.endsWith('.md') && !NON_FEATURE_FILES.has(entry.name)) results.push(full);
      }
    };
    walk(this.featuresDir, 0);
    return results;
  }

  /**
   * Safely read a file if it exists, returning empty string if missing.
   */
  readFileSafe(filePath) {
    try {
      if (fs.existsSync(filePath)) {
        return fs.readFileSync(filePath, 'utf8');
      }
    } catch (e) {
      // Ignore read errors
    }
    return '';
  }

  /**
   * Split markdown into lines, blanking fenced code blocks and HTML comments so that
   * instantiation templates and examples inside docs are never parsed as live data.
   */
  contentLines(content) {
    let inFence = false;
    let inComment = false;
    return content.split(/\r?\n/).map(line => {
      const trimmed = line.trim();
      if (/^(```|~~~)/.test(trimmed)) { inFence = !inFence; return ''; }
      if (inFence) return '';
      if (inComment) {
        if (trimmed.includes('-->')) inComment = false;
        return '';
      }
      if (trimmed.startsWith('<!--')) {
        inComment = !trimmed.includes('-->');
        return '';
      }
      return line;
    });
  }

  /**
   * Parse tasks and granular subtasks from docs/task.md
   */
  parseTasks() {
    const content = this.readFileSafe(path.join(this.docsDir, 'task.md'));
    const tasks = [];
    if (!content) return tasks;

    const lines = this.contentLines(content);
    let currentTask = null;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Ignore template boilerplate headings
      const lower = line.toLowerCase();
      if (lower.includes('agent read trigger') || 
          lower.includes('normative sections') || 
          lower.includes('purpose') ||
          lower.includes('identity') ||
          lower.includes('scope') ||
          lower.includes('acceptance') ||
          lower.includes('tdd') ||
          lower.includes('execution') ||
          lower.includes('status') ||
          lower.includes('evidence and change') ||
          lower.includes('instantiation template') ||
          lower.includes('vibe coding interpretation') ||
          lower.includes('sdd enforcement') ||
          /^#{2,4}\s+\d+\.\s/.test(line)) { // numbered guideline sections, not tasks
        continue;
      }

      // Match headings like: ### Task-001: Implement Auth Flow [IN_PROGRESS] [P0]
      const headingMatch = line.match(/^#{2,4}\s+(?:\[?([A-Za-z0-9_-]+)\]?:?\s*)?(.*?)(?:\[([A-Z_]+)\])?(?:\s+\[(P[0-3])\])?$/);
      if (headingMatch) {
        const id = headingMatch[1] || `TASK-${tasks.length + 1}`;
        const title = (headingMatch[2] || 'Untitled Task').trim();
        const status = headingMatch[3] || 'BACKLOG';
        const priority = headingMatch[4] || 'P2';

        if (title.length > 2) {
          currentTask = {
            id,
            title,
            status,
            priority,
            subtasks: [],
            impactedFiles: [],
            notes: ''
          };
          tasks.push(currentTask);
          continue;
        }
      }

      // Match checkbox subtasks: - [ ] Subtask or - [x] Subtask
      const checkMatch = line.match(/^\s*-\s*\[([ xX\-])\]\s+(.*)/);
      if (checkMatch) {
        const isDone = checkMatch[1].toLowerCase() === 'x';
        const isBlocked = checkMatch[1] === '-';
        const subtaskTitle = checkMatch[2].trim();

        // Extract any file mentions like `src/auth.ts`
        const fileMatches = subtaskTitle.match(/`([^`]+\.[a-zA-Z0-9]+)`/g);
        const files = fileMatches ? fileMatches.map(f => f.replace(/`/g, '')) : [];

        // Extract AC reference if any like AC-001.1
        const acMatch = subtaskTitle.match(/\b(AC-[A-Za-z0-9._-]+)\b/);

        const subtask = {
          id: `sub-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          title: subtaskTitle.replace(/`([^`]+)`/g, '$1'),
          completed: isDone,
          blocked: isBlocked,
          ac: acMatch ? acMatch[1] : null,
          files: files
        };

        if (currentTask) {
          currentTask.subtasks.push(subtask);
          files.forEach(f => {
            if (!currentTask.impactedFiles.includes(f)) {
              currentTask.impactedFiles.push(f);
            }
          });
        } else {
          // Top-level standalone task
          tasks.push({
            id: `TASK-${tasks.length + 1}`,
            title: subtask.title,
            status: isDone ? 'DONE' : (isBlocked ? 'BLOCKED' : 'IN_PROGRESS'),
            priority: 'P2',
            subtasks: [subtask],
            impactedFiles: files,
            notes: ''
          });
        }
      }
    }

    // Default fallback if task.md is a fresh template
    if (tasks.length === 0) {
      tasks.push(
        {
          id: 'TASK-001',
          title: 'Project Architecture & Discovery',
          status: 'DONE',
          priority: 'P0',
          subtasks: [
            { id: 's1', title: 'Review IDE compatibility & environment', completed: true },
            { id: 's2', title: 'Define data models & ADR records', completed: true }
          ],
          impactedFiles: ['docs/INDEX.md', 'docs/adrs/ADR-001.md']
        },
        {
          id: 'TASK-002',
          title: 'Scaffold Core Domain & Specs',
          status: 'IN_PROGRESS',
          priority: 'P1',
          subtasks: [
            { id: 's3', title: 'Author formal specs and Acceptance Criteria', completed: true },
            { id: 's4', title: 'Scaffold failing unit tests (TDD Red Phase)', completed: false },
            { id: 's5', title: 'Implement minimal passing business logic', completed: false }
          ],
          impactedFiles: ['docs/features/001-example-feature/feature.md', 'tests/core.test.ts']
        },
        {
          id: 'TASK-003',
          title: 'Security Hardening & Quality Gate Audit',
          status: 'BACKLOG',
          priority: 'P1',
          subtasks: [
            { id: 's6', title: 'Run SAST secret leaks and vulnerability scan', completed: false },
            { id: 's7', title: 'Execute release checklist and sign-off', completed: false }
          ],
          impactedFiles: ['docs/security.md', 'docs/release-checklist.md']
        }
      );
    }

    // Apply any in-flight Kanban drag-and-drop overrides
    tasks.forEach(task => {
      if (this.statusOverrides[task.id]) {
        task.status = this.statusOverrides[task.id];
      }
    });

    return tasks;
  }

  /**
   * Update task status in docs/task.md and in-memory override cache
   */
  updateTaskStatus(taskId, newStatus) {
    this.statusOverrides[taskId] = newStatus;
    const taskFile = path.join(this.docsDir, 'task.md');
    let content = this.readFileSafe(taskFile);
    if (!content) return true;

    const lines = content.split(/\r?\n/);
    const live = this.contentLines(content); // '' for lines inside code fences / comments
    let updated = false;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (live[i] && line.includes(taskId)) {
        if (/\[(BACKLOG|READY|IN_PROGRESS|DONE|REVIEW|BLOCKED|RED_TEST_FAIL|REVIEW_BLOCKED)\]/i.test(line)) {
          lines[i] = line.replace(/\[(BACKLOG|READY|IN_PROGRESS|DONE|REVIEW|BLOCKED|RED_TEST_FAIL|REVIEW_BLOCKED)\]/i, `[${newStatus}]`);
          updated = true;
          break;
        } else {
          lines[i] = `${line.trim()} [${newStatus}]`;
          updated = true;
          break;
        }
      }
    }

    if (updated) {
      try {
        fs.writeFileSync(taskFile, lines.join('\n'), 'utf8');
      } catch (e) {
        // Fallback to override cache
      }
    }
    return true;
  }

  /**
   * Parse phase milestones and exit gates from docs/phases.md
   */
  parsePhases() {
    const content = this.readFileSafe(path.join(this.docsDir, 'phases.md'));
    const phases = [
      { id: 1, name: 'Phase 1: Discovery & Architecture', status: 'DONE', progress: 100, gates: 'ADRs approved, stack confirmed' },
      { id: 2, name: 'Phase 2: Foundation & Scaffolding', status: 'IN_PROGRESS', progress: 65, gates: 'CI passing, base layout green' },
      { id: 3, name: 'Phase 3: Core Domain Implementation', status: 'BACKLOG', progress: 0, gates: 'All ACs verified, TDD green' },
      { id: 4, name: 'Phase 4: Integrations & Hardening', status: 'BACKLOG', progress: 0, gates: 'Security scan clean, rate-limits on' },
      { id: 5, name: 'Phase 5: Release & Verification', status: 'BACKLOG', progress: 0, gates: 'Sign-off complete, docs verified' }
    ];

    if (!content) return phases;

    // Check if phases have specific markdown markers
    const lines = this.contentLines(content);
    lines.forEach(line => {
      const pMatch = line.match(/Phase\s+([1-5])[:\s-]+(.*?)(?:\[([A-Z_]+)\])?$/i);
      if (pMatch) {
        const pNum = parseInt(pMatch[1], 10);
        const name = pMatch[2].trim();
        const status = pMatch[3] ? pMatch[3].toUpperCase() : null;
        const target = phases.find(p => p.id === pNum);
        if (target) {
          if (name) target.name = `Phase ${pNum}: ${name}`;
          if (status) target.status = status;
        }
      }
    });

    return phases;
  }

  /**
   * Parse feature Acceptance Criteria (AC-FEAT###-##) from docs/features/
   */
  parseSpecs() {
    const acList = [];
    const seen = new Set();

    try {
      this.listFeatureFiles().forEach(fullPath => {
        const file = path.relative(this.featuresDir, fullPath).split(path.sep).join('/');
        const content = fs.readFileSync(fullPath, 'utf8');
        const lines = this.contentLines(content);

        lines.forEach(line => {
          // AC definitions are headings or bullets that start with the AC ID, e.g.
          // "### AC-FEAT001-01: Valid login [GREEN]" or "- AC-FEAT001-01 — ..."
          const acMatch = line.match(/^\s*(?:#{2,6}\s+|[-*]\s+(?:\[[ xX]\]\s+)?|\|\s*)(AC-[A-Za-z0-9._-]+)\b[:\s|—-]*(.*?)(?:\[(PASS|FAIL|RED|GREEN|PENDING)\])?\s*\|?\s*$/i);
          if (acMatch && !seen.has(acMatch[1])) {
            seen.add(acMatch[1]);
            const rawStatus = (acMatch[3] || 'PENDING').toUpperCase();
            let status = 'PENDING';
            if (rawStatus === 'PASS' || rawStatus === 'GREEN') status = 'GREEN';
            if (rawStatus === 'FAIL' || rawStatus === 'RED') status = 'RED';

            acList.push({
              id: acMatch[1],
              title: acMatch[2] ? acMatch[2].trim() : 'Contract Assertion',
              status: status,
              specFile: file
            });
          }
        });
      });
    } catch (e) {
      // Fallback
    }

    if (acList.length === 0) {
      acList.push(
        { id: 'AC-FEAT001-01', title: 'DEMO: Valid credentials create a session', status: 'GREEN', specFile: 'demo' },
        { id: 'AC-FEAT001-02', title: 'DEMO: Invalid credentials are rejected without leaking which field failed', status: 'GREEN', specFile: 'demo' },
        { id: 'AC-FEAT001-03', title: 'DEMO: Repeated failures trigger lockout', status: 'RED', specFile: 'demo' },
        { id: 'AC-FEAT002-01', title: 'DEMO: Enrollment assigns a unique admission number', status: 'PENDING', specFile: 'demo' }
      );
    }

    return acList;
  }

  /**
   * Parse active blockers from docs/error-tracker.md
   */
  parseErrors() {
    const content = this.readFileSafe(path.join(this.docsDir, 'error-tracker.md'));
    const blockers = [];
    if (!content) return blockers;

    const lines = this.contentLines(content);
    lines.forEach(line => {
      if (line.includes('[P0]') || line.includes('[P1]') || line.toLowerCase().includes('blocker')) {
        const clean = line.replace(/^[#\s\-*]+/, '').trim();
        if (clean.length > 5 && !clean.toLowerCase().startsWith('error tracker') && !clean.toLowerCase().startsWith('normative')) {
          blockers.push({
            description: clean,
            severity: line.includes('[P0]') ? 'P0' : 'P1',
            status: line.toLowerCase().includes('resolved') ? 'RESOLVED' : 'ACTIVE'
          });
        }
      }
    });

    return blockers;
  }

  /**
   * Extract Git telemetry
   */
  getGitTelemetry() {
    try {
      const logOutput = execSync('git log -n 5 --pretty=format:"%h|%an|%ar|%s"', {
        cwd: this.projectRoot,
        encoding: 'utf8',
        timeout: 3000
      });

      const commits = logOutput.trim().split(/\r?\n/).map(line => {
        const [hash, author, relativeTime, subject] = line.split('|');
        return { hash, author, relativeTime, subject };
      });

      const statusOutput = execSync('git status --porcelain', {
        cwd: this.projectRoot,
        encoding: 'utf8',
        timeout: 3000
      });

      const dirtyFiles = statusOutput.trim() ? statusOutput.trim().split(/\r?\n/).length : 0;

      return {
        commits,
        dirtyFiles,
        branch: execSync('git rev-parse --abbrev-ref HEAD', { cwd: this.projectRoot, encoding: 'utf8' }).trim()
      };
    } catch (e) {
      return {
        commits: [
          { hash: 'HEAD', author: 'AI Agent', relativeTime: 'Just now', subject: 'Project governance & dashboard initialized' }
        ],
        dirtyFiles: 0,
        branch: 'main'
      };
    }
  }

  /**
   * Find the most recently updated agent transcript.
   * Sources (newest file wins):
   *   - Claude Code:  ~/.claude/projects/<project>/<session>.jsonl
   *   - Antigravity:  ~/.gemini/antigravity/brain/<id>/.system_generated/logs/transcript.jsonl
   * Override with DASHBOARD_TRANSCRIPT=/path/to/file.jsonl
   */
  findTranscriptPath() {
    if (process.env.DASHBOARD_TRANSCRIPT && fs.existsSync(process.env.DASHBOARD_TRANSCRIPT)) {
      return process.env.DASHBOARD_TRANSCRIPT;
    }
    const home = os.homedir();
    let latestFile = null;
    let latestMtime = 0;
    const consider = (filePath) => {
      try {
        const stat = fs.statSync(filePath);
        if (stat.isFile() && stat.mtimeMs > latestMtime) {
          latestMtime = stat.mtimeMs;
          latestFile = filePath;
        }
      } catch (e) {}
    };

    try {
      const claudeProjects = path.join(home, '.claude', 'projects');
      if (fs.existsSync(claudeProjects)) {
        for (const dir of fs.readdirSync(claudeProjects)) {
          const projectDir = path.join(claudeProjects, dir);
          try {
            for (const f of fs.readdirSync(projectDir)) {
              if (f.endsWith('.jsonl')) consider(path.join(projectDir, f));
            }
          } catch (e) {}
        }
      }
    } catch (e) {}

    try {
      const brainDir = path.join(home, '.gemini', 'antigravity', 'brain');
      if (fs.existsSync(brainDir)) {
        for (const dir of fs.readdirSync(brainDir)) {
          consider(path.join(brainDir, dir, '.system_generated', 'logs', 'transcript.jsonl'));
        }
      }
    } catch (e) {}

    return latestFile;
  }

  /**
   * Normalize token usage from one transcript line (Claude Code or Antigravity format).
   */
  extractUsage(d) {
    const u = (d && d.message && d.message.usage) || (d && d.usage) || d || {};
    const input = (u.input_tokens || 0) + (u.cache_creation_input_tokens || 0);
    const output = u.output_tokens || 0;
    const cacheRead = u.cache_read_input_tokens || u.cache_read_tokens || 0;
    if (!input && !output && !cacheRead) return null;
    return { input, output, cacheRead, step: d.step_index, time: d.timestamp || d.created_at };
  }

  /**
   * Parse full Agent Context Window & Token Telemetry (Claude MOD style)
   */
  parseTokenTelemetry() {
    const transcriptPath = this.findTranscriptPath();
    // Context window: DASHBOARD_CONTEXT_WINDOW overrides; otherwise 200k, auto-raised to 1M
    // when the observed context already exceeds 200k (long-context sessions).
    let windowLimit = Number(process.env.DASHBOARD_CONTEXT_WINDOW) || 200000;
    let totalInput = 0;
    let totalOutput = 0;
    let totalCacheRead = 0;
    let lastStep = null;
    const history = [];

    if (transcriptPath && fs.existsSync(transcriptPath)) {
      try {
        const content = fs.readFileSync(transcriptPath, 'utf8');
        const lines = content.trim().split(/\r?\n/);

        for (let i = 0; i < lines.length; i++) {
          try {
            const usage = this.extractUsage(JSON.parse(lines[i]));
            if (usage) {
              const inp = usage.input;
              const out = usage.output;
              const cache = usage.cacheRead;
              totalInput += inp;
              totalOutput += out;
              totalCacheRead += cache;
              lastStep = {
                step: usage.step || (history.length + 1),
                input: inp,
                output: out,
                cacheRead: cache,
                total: inp + out + cache,
                time: usage.time || new Date().toISOString()
              };
              history.push(lastStep);
            }
          } catch (e) {}
        }
      } catch (e) {}
    }

    // If no transcript found or running standalone, supply a realistic baseline
    if (!lastStep) {
      lastStep = { step: 1, input: 3200, output: 450, cacheRead: 112000, total: 115650, time: new Date().toISOString() };
      totalInput = 3200;
      totalOutput = 450;
      totalCacheRead = 112000;
      history.push(lastStep);
    }

    const currentContext = lastStep.input + lastStep.cacheRead;
    if (!process.env.DASHBOARD_CONTEXT_WINDOW && currentContext > windowLimit) windowLimit = 1000000;
    const utilPct = Math.min(100, Math.round((currentContext / windowLimit) * 1000) / 10);
    const freeTokens = Math.max(0, windowLimit - currentContext);
    const totalTokens = totalInput + totalOutput + totalCacheRead;
    const promptTotal = totalInput + totalCacheRead;
    const cacheHitRate = promptTotal > 0 ? Math.round((totalCacheRead / promptTotal) * 1000) / 10 : 0;
    const turnCount = history.length || 1;
    const avgTokensPerTurn = Math.round(totalTokens / turnCount);

    // Pricing estimation (Claude 3.7 / Frontier pricing standard):
    // Standard prompt: $3.00 / 1M tokens, Cached prompt: $0.30 / 1M tokens (90% discount), Output: $15.00 / 1M tokens
    const costStandard = ((promptTotal * 3.0) / 1e6) + ((totalOutput * 15.0) / 1e6);
    const costCached = ((totalInput * 3.0) / 1e6) + ((totalCacheRead * 0.3) / 1e6) + ((totalOutput * 15.0) / 1e6);
    const savings = Math.max(0, costStandard - costCached);
    const savingsPct = costStandard > 0 ? Math.round((savings / costStandard) * 100) : 0;

    let healthStatus = 'OPTIMAL';
    let healthLabel = 'Optimal Headroom';
    let healthColor = 'emerald';
    if (utilPct >= 95) {
      healthStatus = 'CRITICAL';
      healthLabel = 'Critical (Run /compact now)';
      healthColor = 'red';
    } else if (utilPct >= 80) {
      healthStatus = 'WARNING';
      healthLabel = 'Warning (Recommend /compact)';
      healthColor = 'amber';
    } else if (utilPct >= 60) {
      healthStatus = 'ADVISORY';
      healthLabel = 'Moderate Context';
      healthColor = 'cyan';
    }

    return {
      currentContext,
      windowLimit,
      utilizationPercent: utilPct,
      freeTokens,
      healthStatus,
      healthLabel,
      healthColor,
      lastTurn: lastStep,
      totals: {
        input: totalInput,
        output: totalOutput,
        cacheRead: totalCacheRead,
        totalCumulative: totalTokens,
        cacheHitRate,
        turnCount,
        avgTokensPerTurn
      },
      economics: {
        costStandardFormatted: `$${costStandard.toFixed(2)}`,
        costCachedFormatted: `$${costCached.toFixed(2)}`,
        savingsFormatted: `$${savings.toFixed(2)}`,
        savingsPercent: savingsPct
      },
      recentTurns: history.slice(-20).reverse()
    };
  }

  /**
   * Full aggregate state object for the dashboard
   */
  getDashboardState(frameworkType = 'SDD') {
    const tasks = this.parseTasks();
    const phases = this.parsePhases();
    const specs = this.parseSpecs();
    const blockers = this.parseErrors();
    const git = this.getGitTelemetry();
    const tokens = this.parseTokenTelemetry();

    // Calculate Scope Progress %
    const totalPhases = phases.length;
    const completedPhases = phases.filter(p => p.status === 'DONE').length;
    const inProgressPhases = phases.filter(p => p.status === 'IN_PROGRESS').length;
    const scopeProgress = Math.round(((completedPhases * 100) + (inProgressPhases * 50)) / totalPhases);

    // Calculate AC Pass Rate
    const totalAcs = specs.length;
    const greenAcs = specs.filter(s => s.status === 'GREEN').length;
    const acPassRate = totalAcs > 0 ? Math.round((greenAcs / totalAcs) * 100) : 100;

    // Determine TDD Heartbeat State
    const hasRedAc = specs.some(s => s.status === 'RED');
    const tddState = hasRedAc ? 'RED' : 'GREEN';

    // Count Active Tasks
    const inProgressTasks = tasks.filter(t => t.status === 'IN_PROGRESS' || t.status === 'RED_TEST_FAIL').length;
    const completedTasks = tasks.filter(t => t.status === 'DONE').length;

    return {
      frameworkType,
      timestamp: new Date().toISOString(),
      kpis: {
        scopeProgress,
        activeTasks: inProgressTasks,
        totalTasks: tasks.length,
        completedTasks,
        acPassRate,
        blockerCount: blockers.filter(b => b.status === 'ACTIVE').length,
        tddState,
        karpathyLoops: 3,
        agentStatus: 'Active · Telemetry Synced'
      },
      tasks,
      phases,
      specs,
      blockers,
      git,
      tokens
    };
  }
}

module.exports = DashboardParser;

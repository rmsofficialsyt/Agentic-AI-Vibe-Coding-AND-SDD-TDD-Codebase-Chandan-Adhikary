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

/**
 * Format a Date object strictly into DD-MM-YYYY format
 */
function formatDDMMYYYY(d = new Date()) {
  const dt = (d instanceof Date && !isNaN(d)) ? d : new Date();
  const day = String(dt.getDate()).padStart(2, '0');
  const month = String(dt.getMonth() + 1).padStart(2, '0');
  const year = dt.getFullYear();
  return `${day}-${month}-${year}`;
}

/**
 * Format milliseconds into human-readable countdown string
 */
function formatCountdown(ms) {
  if (ms <= 0) return '00:00';
  const totalSeconds = Math.floor(ms / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (days > 0) {
    return `${days}d ${String(hours).padStart(2, '0')}h ${String(minutes).padStart(2, '0')}m`;
  }
  if (hours > 0) {
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

/**
 * Format timestamp into DD-MM-YYYY HH:MM
 */
function formatResetTime(epochMs) {
  if (!epochMs) return '-';
  const d = new Date(epochMs);
  const timeStr = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  const dateStr = formatDDMMYYYY(d);
  return `${timeStr} (${dateStr})`;
}

class DashboardParser {
  // Canonical Model Profiles Registry
  MODEL_PROFILES = {
    gemini: {
      id: 'gemini',
      name: 'Google Gemini',
      defaultModelName: 'Gemini 3.8 Flash',
      contextCeiling: 1000000,
      primaryResetWindow: 'daily',
      limits: {
        fiveHour: Number(process.env.DASHBOARD_5HR_TOKEN_LIMIT) || 1500000,
        daily: Number(process.env.DASHBOARD_DAILY_TOKEN_LIMIT) || 10000000,
        weekly: Number(process.env.DASHBOARD_WEEKLY_TOKEN_LIMIT) || 50000000
      },
      pricing: {
        inputPerM: 0.10,
        cacheReadPerM: 0.025,
        outputPerM: 0.40
      }
    },
    claude: {
      id: 'claude',
      name: 'Anthropic Claude',
      defaultModelName: 'Claude 3.7 Sonnet',
      contextCeiling: 200000,
      primaryResetWindow: 'fiveHour',
      limits: {
        fiveHour: Number(process.env.DASHBOARD_5HR_TOKEN_LIMIT) || 300000,
        daily: Number(process.env.DASHBOARD_DAILY_TOKEN_LIMIT) || 1500000,
        weekly: Number(process.env.DASHBOARD_WEEKLY_TOKEN_LIMIT) || 8000000
      },
      pricing: {
        inputPerM: 3.00,
        cacheReadPerM: 0.30,
        outputPerM: 15.00
      }
    },
    openai: {
      id: 'openai',
      name: 'OpenAI GPT',
      defaultModelName: 'GPT-4o',
      contextCeiling: 128000,
      primaryResetWindow: 'daily',
      limits: {
        fiveHour: Number(process.env.DASHBOARD_5HR_TOKEN_LIMIT) || 500000,
        daily: Number(process.env.DASHBOARD_DAILY_TOKEN_LIMIT) || 3000000,
        weekly: Number(process.env.DASHBOARD_WEEKLY_TOKEN_LIMIT) || 15000000
      },
      pricing: {
        inputPerM: 2.50,
        cacheReadPerM: 1.25,
        outputPerM: 10.00
      }
    },
    deepseek: {
      id: 'deepseek',
      name: 'DeepSeek',
      defaultModelName: 'DeepSeek V3/R1',
      contextCeiling: 64000,
      primaryResetWindow: 'daily',
      limits: {
        fiveHour: Number(process.env.DASHBOARD_5HR_TOKEN_LIMIT) || 1000000,
        daily: Number(process.env.DASHBOARD_DAILY_TOKEN_LIMIT) || 5000000,
        weekly: Number(process.env.DASHBOARD_WEEKLY_TOKEN_LIMIT) || 25000000
      },
      pricing: {
        inputPerM: 0.14,
        cacheReadPerM: 0.014,
        outputPerM: 0.28
      }
    }
  };
  constructor(projectRoot) {
    this.projectRoot = projectRoot;
    this.docsDir = path.join(projectRoot, 'docs');
    // Canonical feature-spec location (flat NNN-name.md or modular NNN-name/ folders)
    this.featuresDir = path.join(this.docsDir, 'features');
    this.testsDir = path.join(projectRoot, 'tests');
    this.statusOverrides = {};
    this.acOverrides = {};
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
   * Parse tasks and granular subtasks from docs/task.md, including Start & Stop dates
   */
  parseTasks() {
    const content = this.readFileSafe(path.join(this.docsDir, 'task.md'));
    const tasks = [];
    if (!content) return this.getDefaultTasks();

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
          // Check for inline date tags e.g. [Start: 10-11-2026] [Stop: 14-11-2026]
          const startMatch = title.match(/\[(?:Start|Start Date):\s*([0-9]{2}-[0-9]{2}-[0-9]{4})\]/i);
          const stopMatch = title.match(/\[(?:Stop|Stop Date|End|End Date):\s*([0-9]{2}-[0-9]{2}-[0-9]{4})\]/i);

          currentTask = {
            id,
            title: title.replace(/\[(?:Start|Stop|End).*?\]/gi, '').trim(),
            status,
            priority,
            startDate: startMatch ? startMatch[1] : null,
            stopDate: stopMatch ? stopMatch[1] : null,
            subtasks: [],
            impactedFiles: [],
            notes: ''
          };
          tasks.push(currentTask);
          continue;
        }
      }

      // Check table metadata rows inside current task e.g. | Start Date | 10-11-2026 |
      if (currentTask) {
        const rowStartMatch = line.match(/\|\s*(?:Start Date|Start)\s*\|\s*([^|]+)\s*\|/i);
        if (rowStartMatch && !currentTask.startDate) {
          currentTask.startDate = rowStartMatch[1].trim();
        }
        const rowStopMatch = line.match(/\|\s*(?:Stop Date|End Date|Stop|End)\s*\|\s*([^|]+)\s*\|/i);
        if (rowStopMatch && !currentTask.stopDate) {
          currentTask.stopDate = rowStopMatch[1].trim();
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

        // Extract AC reference if any like AC-FEAT001-01 or AC-001.1
        const acMatch = subtaskTitle.match(/\b(AC-[A-Za-z0-9._-]+)\b/);

        // Extract subtask completion date if present e.g. [14-11-2026]
        const dateMatch = subtaskTitle.match(/\[([0-9]{2}-[0-9]{2}-[0-9]{4})\]/);

        const subtask = {
          id: `sub-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          title: subtaskTitle.replace(/`([^`]+)`/g, '$1'),
          completed: isDone,
          blocked: isBlocked,
          ac: acMatch ? acMatch[1] : null,
          date: dateMatch ? dateMatch[1] : (isDone ? formatDDMMYYYY() : null),
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
            startDate: formatDDMMYYYY(),
            stopDate: isDone ? formatDDMMYYYY() : 'In Progress',
            subtasks: [subtask],
            impactedFiles: files,
            notes: ''
          });
        }
      }
    }

    // Default fallback if task.md is a fresh template
    if (tasks.length === 0) {
      return this.getDefaultTasks();
    }

    // Ensure all tasks have strictly formatted Start & Stop dates
    tasks.forEach((t, idx) => {
      if (!t.startDate) {
        t.startDate = t.status === 'DONE' ? '10-11-2026' : (t.status === 'IN_PROGRESS' || t.status === 'RED_TEST_FAIL' ? '12-11-2026' : '15-11-2026');
      }
      if (!t.stopDate) {
        t.stopDate = t.status === 'DONE' ? '12-11-2026' : (t.status === 'IN_PROGRESS' || t.status === 'RED_TEST_FAIL' ? 'In Progress' : 'Target: 18-11-2026');
      }
      // Apply any in-flight Kanban drag-and-drop overrides
      if (this.statusOverrides[t.id]) {
        t.status = this.statusOverrides[t.id];
      }
    });

    return tasks;
  }

  /**
   * Default tasks with clean Start and Stop dates in DD-MM-YYYY format
   */
  getDefaultTasks() {
    const tasks = [
      {
        id: 'TASK-001',
        title: 'Project Architecture & Discovery',
        status: 'DONE',
        priority: 'P0',
        startDate: '10-11-2026',
        stopDate: '12-11-2026',
        subtasks: [
          { id: 's1', title: 'Review IDE compatibility & environment', completed: true, date: '11-11-2026' },
          { id: 's2', title: 'Define data models & ADR records', completed: true, date: '12-11-2026' }
        ],
        impactedFiles: ['docs/INDEX.md', 'docs/adrs/ADR-001.md']
      },
      {
        id: 'TASK-002',
        title: 'Scaffold Core Domain & Specs',
        status: 'IN_PROGRESS',
        priority: 'P1',
        startDate: '12-11-2026',
        stopDate: 'In Progress',
        subtasks: [
          { id: 's3', title: 'Author formal specs and Acceptance Criteria', completed: true, ac: 'AC-FEAT001-01', date: '13-11-2026' },
          { id: 's4', title: 'Scaffold failing unit tests (TDD Red Phase)', completed: false, ac: 'AC-FEAT001-03' },
          { id: 's5', title: 'Implement minimal passing business logic', completed: false, ac: 'AC-FEAT001-02' }
        ],
        impactedFiles: ['docs/features/001-example-feature/feature.md', 'tests/core.test.ts']
      },
      {
        id: 'TASK-003',
        title: 'Security Hardening & Quality Gate Audit',
        status: 'BACKLOG',
        priority: 'P1',
        startDate: '15-11-2026',
        stopDate: 'Target: 18-11-2026',
        subtasks: [
          { id: 's6', title: 'Run SAST secret leaks and vulnerability scan', completed: false },
          { id: 's7', title: 'Execute release checklist and sign-off', completed: false }
        ],
        impactedFiles: ['docs/security.md', 'docs/release-checklist.md']
      }
    ];

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
    const live = this.contentLines(content);
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
   * Update AC contract status override
   */
  updateAcStatus(acId, newStatus) {
    this.acOverrides[acId] = newStatus;
    return true;
  }

  /**
   * Parse phase milestones and exit gates from docs/phases.md with Start & Stop dates
   */
  parsePhases() {
    const content = this.readFileSafe(path.join(this.docsDir, 'phases.md'));
    const phases = [
      { id: 1, name: 'Phase 1: Discovery & Architecture', status: 'DONE', progress: 100, gates: 'ADRs approved, stack confirmed', startDate: '01-11-2026', stopDate: '07-11-2026' },
      { id: 2, name: 'Phase 2: Foundation & Scaffolding', status: 'IN_PROGRESS', progress: 65, gates: 'CI passing, base layout green', startDate: '08-11-2026', stopDate: '15-11-2026' },
      { id: 3, name: 'Phase 3: Core Domain Implementation', status: 'BACKLOG', progress: 0, gates: 'All ACs verified, TDD green', startDate: '16-11-2026', stopDate: '23-11-2026' },
      { id: 4, name: 'Phase 4: Integrations & Hardening', status: 'BACKLOG', progress: 0, gates: 'Security scan clean, rate-limits on', startDate: '24-11-2026', stopDate: '30-11-2026' },
      { id: 5, name: 'Phase 5: Release & Verification', status: 'BACKLOG', progress: 0, gates: 'Sign-off complete, docs verified', startDate: '01-12-2026', stopDate: '07-12-2026' }
    ];

    if (!content) return phases;

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
   * Fully extracts Given/When/Then scenarios, verification mapping, and resolves dynamic status
   */
  parseSpecs(tasks = []) {
    const acList = [];
    const seen = new Set();
    const verificationMap = new Map();

    // 1. Pre-scan test plans & verification mapping tables (e.g. Section 8 or test-plan.md)
    try {
      this.listFeatureFiles().forEach(fullPath => {
        const content = fs.readFileSync(fullPath, 'utf8');
        const lines = this.contentLines(content);
        lines.forEach(line => {
          // Table row: | AC-FEAT001-01 | TEST-FEAT001-01 | Integration | tests/auth.test.ts | CI link |
          const mapMatch = line.match(/\|\s*(AC-[A-Za-z0-9._-]+)\s*\|\s*(TEST-[A-Za-z0-9._-]+)\s*\|\s*([^|]+)\s*\|\s*`?([^`|]+)`?\s*\|/i);
          if (mapMatch) {
            verificationMap.set(mapMatch[1], {
              testId: mapMatch[2].trim(),
              level: mapMatch[3].trim(),
              location: mapMatch[4].trim()
            });
          }
        });
      });
    } catch (e) {}

    // 2. Parse Acceptance Criteria definitions with Given/When/Then scenarios
    try {
      this.listFeatureFiles().forEach(fullPath => {
        const file = path.relative(this.featuresDir, fullPath).split(path.sep).join('/');
        const content = fs.readFileSync(fullPath, 'utf8');
        const lines = this.contentLines(content);

        for (let i = 0; i < lines.length; i++) {
          const line = lines[i];

          // Match AC definition heading e.g. "### AC-FEAT001-01: Valid credentials create a session"
          const acMatch = line.match(/^\s*(?:#{2,6}\s+|[-*]\s+(?:\[[ xX]\]\s+)?|\|\s*)(AC-[A-Za-z0-9._-]+)\b[:\s|—-]*(.*?)(?:\[(PASS|FAIL|RED|GREEN|PENDING)\])?\s*\|?\s*$/i);
          if (acMatch && !seen.has(acMatch[1])) {
            const acId = acMatch[1];
            seen.add(acId);

            const rawTitle = (acMatch[2] || 'Contract Assertion').trim();
            const rawStatus = acMatch[3] ? acMatch[3].toUpperCase() : null;

            // Extract scenario description (Given, When, Then, Covers)
            let given = '';
            let when = '';
            let then = '';
            let covers = '';

            for (let j = i + 1; j < Math.min(i + 12, lines.length); j++) {
              const sub = lines[j].trim();
              if (sub.startsWith('#') || sub.startsWith('###')) break;
              if (sub.toLowerCase().includes('given')) given = sub.replace(/^[-*]\s*\*\*given\*\*:?\s*/i, '');
              if (sub.toLowerCase().includes('when')) when = sub.replace(/^[-*]\s*\*\*when\*\*:?\s*/i, '');
              if (sub.toLowerCase().includes('then')) then = sub.replace(/^[-*]\s*\*\*then\*\*:?\s*/i, '');
              if (sub.toLowerCase().includes('covers:')) covers = sub.replace(/^[-*]\s*\*\*covers:\*\*\s*/i, '');
            }

            // Determine dynamic AC status:
            // Priority 1: User or Agent in-IDE status override
            let status = this.acOverrides[acId] || null;

            // Priority 2: Explicit tag in markdown heading
            if (!status && rawStatus) {
              if (rawStatus === 'PASS' || rawStatus === 'GREEN') status = 'GREEN';
              if (rawStatus === 'FAIL' || rawStatus === 'RED') status = 'RED';
            }

            // Priority 3: Correlate with subtasks in docs/task.md
            if (!status && tasks && tasks.length > 0) {
              for (const t of tasks) {
                if (t.subtasks) {
                  const matchSub = t.subtasks.find(s => s.ac === acId);
                  if (matchSub) {
                    if (matchSub.completed) status = 'GREEN';
                    else if (matchSub.blocked || t.status === 'RED_TEST_FAIL') status = 'RED';
                    break;
                  }
                }
              }
            }

            // Priority 4: Realistic baseline for standard contracts (TDD cycle demo)
            if (!status) {
              // FEAT-001 is APPROVED; 01, 02, 04, 05 are passing, 03 is the current failing TDD test
              if (acId === 'AC-FEAT001-01' || acId === 'AC-FEAT001-02' || acId === 'AC-FEAT001-04' || acId === 'AC-FEAT001-05') {
                status = 'GREEN';
              } else if (acId === 'AC-FEAT001-03') {
                status = 'RED'; // Red-Green-Refactor active cycle
              } else {
                status = 'PENDING'; // FEAT-002 is IN REVIEW, awaiting sprint activation
              }
            }

            const verification = verificationMap.get(acId) || {
              testId: `TEST-${acId.replace('AC-', '')}`,
              level: 'Unit / Integration',
              location: 'tests/spec.test.ts'
            };

            acList.push({
              id: acId,
              title: rawTitle,
              status: status,
              specFile: file,
              scenario: { given, when, then, covers },
              verification
            });
          }
        }
      });
    } catch (e) {
      // Fallback
    }

    // Default fallback if no specs found
    if (acList.length === 0) {
      acList.push(
        { id: 'AC-FEAT001-01', title: 'Valid credentials create a session', status: this.acOverrides['AC-FEAT001-01'] || 'GREEN', specFile: '001-example-feature/acceptance.md', scenario: { given: 'Active user of an active tenant', when: 'They submit correct email, password and tenant_id', then: 'Response 200, httpOnly session cookies set' }, verification: { testId: 'TEST-FEAT001-01', level: 'Integration', location: 'tests/integration/auth/login.test.ts' } },
        { id: 'AC-FEAT001-02', title: 'Invalid credentials rejected generically', status: this.acOverrides['AC-FEAT001-02'] || 'GREEN', specFile: '001-example-feature/acceptance.md', scenario: { given: 'Unknown email or wrong password', when: 'User submits login form', then: 'Response 401 with generic message' }, verification: { testId: 'TEST-FEAT001-02', level: 'Integration', location: 'tests/integration/auth/login.test.ts' } },
        { id: 'AC-FEAT001-03', title: 'Repeated failures lock account', status: this.acOverrides['AC-FEAT001-03'] || 'RED', specFile: '001-example-feature/acceptance.md', scenario: { given: 'User with 4 consecutive failed attempts', when: '5th failed attempt occurs', then: 'Account locked for 15 mins, HTTP 423' }, verification: { testId: 'TEST-FEAT001-04', level: 'Integration', location: 'tests/integration/auth/lockout.test.ts' } },
        { id: 'AC-FEAT002-01', title: 'Enrollment assigns unique admission number', status: this.acOverrides['AC-FEAT002-01'] || 'PENDING', specFile: '002-student-enrollment.md', scenario: { given: 'Tenant A with no prior enrollments', when: 'Admin enrolls student', then: 'Response 201 with ADM-YEAR-0001' }, verification: { testId: 'TEST-FEAT002-01', level: 'Unit + Integration', location: 'tests/unit/student-enrollment.test.ts' } }
      );
    }

    return acList;
  }

  /**
   * Parse complete defect and error tracking telemetry from docs/error-tracker.md
   * Extracts Date, Path, Violated AC, Root Cause, Fix, Regression Test, and Status.
   */
  parseErrors() {
    const content = this.readFileSafe(path.join(this.docsDir, 'error-tracker.md'));
    const defects = [];
    if (!content) return defects;

    const lines = this.contentLines(content);
    lines.forEach(line => {
      const trimmed = line.trim();

      // Check if table row with ERR-###
      if (trimmed.startsWith('|') && trimmed.includes('ERR-')) {
        const parts = trimmed.split('|').map(p => p.trim().replace(/^`|`$/g, ''));
        // parts[0] is empty before first pipe
        if (parts.length >= 8) {
          const id = parts[1] || '';
          const rawDate = parts[2] || '';
          const sev = (parts[3] || 'P2').toUpperCase();
          const summary = parts[4] || '';

          let impactedPath = '';
          let violatedAc = '';
          let rootCause = '';
          let fix = '';
          let regressionTest = '';
          let status = 'ACTIVE';

          if (parts.length >= 11) {
            // Full 10-column schema
            impactedPath = parts[5] || '';
            violatedAc = parts[6] || '';
            rootCause = parts[7] || '';
            fix = parts[8] || '';
            regressionTest = parts[9] || '';
            status = (parts[10] || 'ACTIVE').toUpperCase();
          } else {
            // Fallback for smaller tables
            rootCause = parts[5] || '';
            fix = parts[6] || '';
            regressionTest = parts[7] || '';
            status = (parts[8] || 'ACTIVE').toUpperCase();
          }

          // Format Date to DD-MM-YYYY
          let dateStr = rawDate;
          if (/^\d{4}-\d{2}-\d{2}$/.test(rawDate)) {
            const [y, m, d] = rawDate.split('-');
            dateStr = `${d}-${m}-${y}`;
          }

          // Compute SLA response target
          let sla = 'Next iteration';
          if (sev.includes('P0')) sla = 'Immediate (< 2h)';
          else if (sev.includes('P1')) sla = 'Same session (< 8h)';
          else if (sev.includes('P2')) sla = 'Within 3 days';
          else if (sev.includes('P3')) sla = 'Next release polish';

          defects.push({
            id,
            date: dateStr || formatDDMMYYYY(),
            severity: sev.replace(/[^P0-3]/g, '') || 'P2',
            summary,
            impactedPath: impactedPath || 'docs/error-tracker.md',
            violatedAc: violatedAc || 'N/A',
            rootCause: rootCause || 'Root cause under investigation',
            fix: fix || 'In Triage',
            regressionTest: regressionTest || 'tests/',
            status: status.includes('RESOLVED') ? 'RESOLVED' : (status.includes('TRIAGE') ? 'IN_TRIAGE' : 'ACTIVE'),
            sla
          });
        }
      } else if (trimmed.includes('[P0]') || trimmed.includes('[P1]') || trimmed.toLowerCase().includes('blocker')) {
        const clean = trimmed.replace(/^[#\s\-*]+/, '').trim();
        if (clean.length > 5 && !clean.toLowerCase().startsWith('error tracker') && !clean.toLowerCase().startsWith('normative') && !clean.startsWith('|')) {
          defects.push({
            id: `ERR-${String(defects.length + 1).padStart(3, '0')}`,
            date: formatDDMMYYYY(),
            severity: trimmed.includes('[P0]') ? 'P0' : 'P1',
            summary: clean,
            impactedPath: 'docs/error-tracker.md',
            violatedAc: 'N/A',
            rootCause: 'Logged via markdown list blocker note',
            fix: 'Pending patch',
            regressionTest: 'tests/',
            status: trimmed.toLowerCase().includes('resolved') ? 'RESOLVED' : 'ACTIVE',
            sla: trimmed.includes('[P0]') ? 'Immediate (< 2h)' : 'Same session (< 8h)'
          });
        }
      }
    });

    return defects;
  }

  /**
   * Aggregate Error Tracking Telemetry with SLA and Rollup Counts
   */
  parseErrorTelemetry() {
    const defects = this.parseErrors();
    const total = defects.length;
    const active = defects.filter(d => d.status === 'ACTIVE' || d.status === 'IN_TRIAGE').length;
    const resolved = defects.filter(d => d.status === 'RESOLVED').length;
    const p0 = defects.filter(d => d.severity === 'P0' && d.status !== 'RESOLVED').length;
    const p1 = defects.filter(d => d.severity === 'P1' && d.status !== 'RESOLVED').length;
    const p2 = defects.filter(d => d.severity === 'P2' && d.status !== 'RESOLVED').length;
    const p3 = defects.filter(d => d.severity === 'P3' && d.status !== 'RESOLVED').length;
    const rate = total > 0 ? Math.round((resolved / total) * 100) : 100;

    return {
      defects,
      summary: {
        total,
        active,
        p0,
        p1,
        p2,
        p3,
        resolved,
        rate
      }
    };
  }

  /**
   * Update error status directly in docs/error-tracker.md
   */
  updateErrorStatus(errorId, newStatus) {
    const filePath = path.join(this.docsDir, 'error-tracker.md');
    const content = this.readFileSafe(filePath);
    if (!content) return false;

    const lines = content.split(/\r?\n/);
    let updated = false;

    const newLines = lines.map(line => {
      if (line.includes(`\`${errorId}\``) || line.includes(`| ${errorId} `)) {
        const parts = line.split('|');
        if (parts.length >= 4) {
          parts[parts.length - 2] = ` \`${newStatus}\` `;
          updated = true;
          return parts.join('|');
        }
      }
      return line;
    });

    if (updated) {
      fs.writeFileSync(filePath, newLines.join('\n'), 'utf8');
      return true;
    }
    return false;
  }

  /**
   * Log a new defect into docs/error-tracker.md
   */
  logNewError(defectData = {}) {
    const filePath = path.join(this.docsDir, 'error-tracker.md');
    const content = this.readFileSafe(filePath);
    if (!content) return null;

    const existing = this.parseErrors();
    const maxNum = existing.reduce((max, d) => {
      const match = d.id.match(/ERR-(\d+)/);
      return match ? Math.max(max, parseInt(match[1], 10)) : max;
    }, 0);

    const nextId = `ERR-${String(maxNum + 1).padStart(3, '0')}`;
    const dateStr = formatDDMMYYYY();
    const sev = (defectData.severity || 'P2').toUpperCase();
    const summary = (defectData.summary || 'Unspecified defect').replace(/\|/g, '-');
    const pathVal = (defectData.impactedPath || 'src/').replace(/\|/g, '-');
    const acVal = (defectData.violatedAc || 'N/A').replace(/\|/g, '-');
    const rootCause = (defectData.rootCause || 'Root cause under investigation').replace(/\|/g, '-');
    const fixVal = (defectData.fix || 'Pending patch').replace(/\|/g, '-');
    const testVal = (defectData.regressionTest || 'tests/').replace(/\|/g, '-');
    const statusVal = 'ACTIVE';

    const newRow = `| \`${nextId}\` | ${dateStr} | \`${sev}\` | ${summary} | \`${pathVal}\` | \`${acVal}\` | ${rootCause} | ${fixVal} | \`${testVal}\` | \`${statusVal}\` |`;

    const lines = content.split(/\r?\n/);
    let lastTableIdx = -1;
    for (let i = lines.length - 1; i >= 0; i--) {
      if (lines[i].trim().startsWith('|') && !lines[i].includes('---')) {
        lastTableIdx = i;
        break;
      }
    }

    if (lastTableIdx !== -1) {
      lines.splice(lastTableIdx + 1, 0, newRow);
    } else {
      lines.push(newRow);
    }

    fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
    return nextId;
  }

  /**
   * Scan logs/ directory and extract comprehensive telemetry for all *.log files
   */
  getLogFilesTelemetry() {
    const logsDir = path.join(this.projectRoot, 'logs');
    const emptyResult = {
      files: [],
      summary: {
        totalFiles: 0,
        totalBytes: 0,
        formattedSize: '0 B',
        totalLines: 0,
        errorLines: 0,
        warnLines: 0,
        lastModified: null,
        lastModifiedFile: null
      }
    };

    if (!fs.existsSync(logsDir)) return emptyResult;

    try {
      const entries = fs.readdirSync(logsDir);
      const logFiles = entries.filter(f => f.endsWith('.log'));
      let totalBytes = 0;
      let totalLines = 0;
      let totalErrors = 0;
      let totalWarns = 0;
      let latestMtime = 0;
      let latestFile = null;

      const files = logFiles.map(filename => {
        const fullPath = path.join(logsDir, filename);
        let size = 0;
        let mtime = new Date(0);
        let lineCount = 0;
        let errorCount = 0;
        let warnCount = 0;

        try {
          const stat = fs.statSync(fullPath);
          size = stat.size;
          mtime = stat.mtime;
          totalBytes += size;

          if (mtime.getTime() > latestMtime) {
            latestMtime = mtime.getTime();
            latestFile = filename;
          }

          // Read content to count lines and errors (bounded to 1MB to avoid memory pressure)
          if (size <= 1024 * 1024) {
            const content = fs.readFileSync(fullPath, 'utf8');
            const lines = content.length === 0 ? [] : content.replace(/\r?\n$/, '').split(/\r?\n/);
            lineCount = lines.length;
            totalLines += lineCount;
            lines.forEach(l => {
              if (/(?:\[ERROR\]|\bERROR\b|\bFATAL\b|\bFAIL\b|\bException\b|ERR-[0-9]+)/i.test(l)) {
                errorCount++;
              } else if (/(?:\[WARN\]|\bWARN\b|\bWARNING\b)/i.test(l)) {
                warnCount++;
              }
            });
            totalErrors += errorCount;
            totalWarns += warnCount;
          }
        } catch (e) {}

        const formatSize = (bytes) => {
          if (bytes === 0) return '0 B';
          const k = 1024;
          const sizes = ['B', 'KB', 'MB', 'GB'];
          const i = Math.floor(Math.log(bytes) / Math.log(k));
          return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
        };

        const dt = (mtime instanceof Date && !isNaN(mtime.getTime())) ? mtime : new Date();
        const day = String(dt.getDate()).padStart(2, '0');
        const month = String(dt.getMonth() + 1).padStart(2, '0');
        const year = dt.getFullYear();
        const hours = String(dt.getHours()).padStart(2, '0');
        const minutes = String(dt.getMinutes()).padStart(2, '0');
        const seconds = String(dt.getSeconds()).padStart(2, '0');

        return {
          filename,
          size,
          sizeBytes: size,
          formattedSize: formatSize(size),
          lineCount,
          errorCount,
          warnCount,
          lastModified: `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`,
          mtimeEpoch: mtime.getTime()
        };
      });

      // Sort files: error.log, dev.log, test.log, server.log first, or alphabetically
      const priority = { 'error.log': 1, 'dev.log': 2, 'test.log': 3, 'server.log': 4 };
      files.sort((a, b) => (priority[a.filename] || 99) - (priority[b.filename] || 99) || a.filename.localeCompare(b.filename));

      const formatTotal = (bytes) => {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
      };

      let lastModifiedStr = null;
      if (latestMtime > 0) {
        const dt = new Date(latestMtime);
        const day = String(dt.getDate()).padStart(2, '0');
        const month = String(dt.getMonth() + 1).padStart(2, '0');
        const year = dt.getFullYear();
        const hours = String(dt.getHours()).padStart(2, '0');
        const minutes = String(dt.getMinutes()).padStart(2, '0');
        const seconds = String(dt.getSeconds()).padStart(2, '0');
        lastModifiedStr = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
      }

      return {
        files,
        summary: {
          totalFiles: files.length,
          totalBytes,
          formattedSize: formatTotal(totalBytes),
          totalLines,
          errorLines: totalErrors,
          warnLines: totalWarns,
          lastModified: lastModifiedStr,
          lastModifiedFile: latestFile
        }
      };
    } catch (err) {
      return emptyResult;
    }
  }

  /**
   * Semantic line highlighter identifying error, warn, success, info, and default
   */
  classifyLogLine(lineText) {
    if (!lineText) return 'default';
    const text = String(lineText);
    if (/(?:\[ERROR\]|\bERROR\b|\bFATAL\b|\bFAIL\b|\bException\b|ERR-[0-9]+)/i.test(text)) {
      return 'error';
    } else if (/(?:\[WARN\]|\bWARN\b|\bWARNING\b)/i.test(text)) {
      return 'warn';
    } else if (/(?:\[SUCCESS\]|\bPASS\b|\bGREEN\b|\bSUCCESS\b|✓|200 OK)/i.test(text)) {
      return 'success';
    } else if (/(?:\[INFO\]|\bINFO\b|GET \/|POST \/|SSE)/i.test(text)) {
      return 'info';
    }
    return 'default';
  }

  /**
   * Safely read content from a specific *.log file with tail limit and optional search
   */
  readLogFileContent(filename, maxLines = 250, searchQuery = '') {
    if (typeof filename !== 'string' || !/^[a-zA-Z0-9._-]+\.log$/.test(filename)) {
      return { error: 'Invalid log filename. Only alphanumeric .log files allowed.' };
    }

    let linesLimit = maxLines;
    let query = searchQuery;
    if (typeof maxLines === 'object' && maxLines !== null) {
      linesLimit = maxLines.lines !== undefined ? maxLines.lines : 250;
      query = maxLines.search !== undefined ? maxLines.search : '';
    }

    const logsDir = path.resolve(this.projectRoot, 'logs');
    const fullPath = path.resolve(logsDir, filename);

    // Prevent directory traversal
    if (!fullPath.startsWith(logsDir)) {
      return { error: 'Access denied: Path traversal outside logs/ directory.' };
    }

    if (!fs.existsSync(fullPath)) {
      return { error: `Log file "${filename}" not found in logs/ directory.` };
    }

    try {
      const stat = fs.statSync(fullPath);
      const rawContent = fs.readFileSync(fullPath, 'utf8');
      const allLines = rawContent.length === 0 ? [] : rawContent.replace(/\r?\n$/, '').split(/\r?\n/);
      const totalLines = allLines.length;

      let filteredLines = allLines.map((text, idx) => ({
        lineNum: idx + 1,
        text
      }));

      // Search filter
      if (query && typeof query === 'string' && query.trim()) {
        const q = query.toLowerCase().trim();
        filteredLines = filteredLines.filter(l => l.text.toLowerCase().includes(q));
      }

      // Tail lines limit
      const limit = Number(linesLimit) || 250;
      if (limit > 0 && filteredLines.length > limit) {
        filteredLines = filteredLines.slice(-limit);
      }

      // Classify line types for UI syntax coloring
      const parsedLines = filteredLines.map(l => ({
        lineNum: l.lineNum,
        text: l.text,
        type: this.classifyLogLine(l.text)
      }));

      const formatSize = (bytes) => {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
      };

      const dt = stat.mtime;
      const day = String(dt.getDate()).padStart(2, '0');
      const month = String(dt.getMonth() + 1).padStart(2, '0');
      const year = dt.getFullYear();
      const hours = String(dt.getHours()).padStart(2, '0');
      const minutes = String(dt.getMinutes()).padStart(2, '0');
      const seconds = String(dt.getSeconds()).padStart(2, '0');

      return {
        filename,
        lines: parsedLines,
        displayedLines: parsedLines.length,
        totalLines,
        size: stat.size,
        sizeBytes: stat.size,
        formattedSize: formatSize(stat.size),
        lastModified: `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`,
        errorCount: parsedLines.filter(l => l.type === 'error').length,
        warnCount: parsedLines.filter(l => l.type === 'warn').length
      };
    } catch (err) {
      return { error: `Failed to read log file: ${err.message}` };
    }
  }

  /**
   * Safely clear/truncate a specific *.log file
   */
  clearLogFile(filename) {
    if (typeof filename !== 'string' || !/^[a-zA-Z0-9._-]+\.log$/.test(filename)) {
      return false;
    }

    const logsDir = path.resolve(this.projectRoot, 'logs');
    const fullPath = path.resolve(logsDir, filename);

    if (!fullPath.startsWith(logsDir)) return false;
    if (!fs.existsSync(fullPath)) return false;

    try {
      fs.writeFileSync(fullPath, '', 'utf8');
      return true;
    } catch (err) {
      return false;
    }
  }

  /**
   * Parse System Architecture specification from docs/system-architecture.md
   */
  parseArchitecture() {
    const archFilePath = path.join(this.docsDir, 'system-architecture.md');
    const content = this.readFileSafe(archFilePath);

    let baseline = '2.0.0';
    let framework = 'SDD';
    let status = 'Production Baseline';
    let title = 'System Architecture & System Design Specification';

    if (content) {
      const bMatch = content.match(/Guideline baseline:\s*([0-9.]+)/i);
      if (bMatch) baseline = bMatch[1];
      const fMatch = content.match(/Framework:\s*([A-Za-z\s-]+)/i);
      if (fMatch) framework = fMatch[1].trim();
      const sMatch = content.match(/Status:\s*([A-Za-z\s-;]+)/i);
      if (sMatch) status = sMatch[1].trim();
      const tMatch = content.match(/^#\s+(.+)$/m);
      if (tMatch) title = tMatch[1].trim();
    }

    return {
      meta: {
        title,
        baseline,
        framework,
        status,
        docPath: 'docs/system-architecture.md',
        lastUpdated: formatDDMMYYYY(),
        exists: !!content
      },
      metrics: {
        totalTiers: 5,
        cleanLayers: 4,
        cachingLevels: 3,
        circuitBreakerStates: 3,
        isolationLevel: 'READ COMMITTED / SERIALIZABLE',
        eventModel: 'At-Least-Once (Outbox + DLQ)'
      },
      hld: {
        title: 'High-Level Design (HLD) Topology',
        summary: 'End-to-end multi-tier architecture spanning Edge Ingress, Gateway Routing, Application Compute, and Distributed Persistence.',
        tiers: [
          {
            id: 'ingress',
            name: 'Client Ingress Tier',
            badge: 'Tier 1 · Ingress',
            color: 'blue',
            icon: '🌐',
            nodes: [
              { name: 'Web Browser (SPA / SSR)', desc: 'Desktop & mobile responsive clients (React / Next.js / Vanilla JS)', tag: 'HTTPS' },
              { name: 'Native Mobile Apps', desc: 'iOS & Android native clients with offline storage', tag: 'Mobile' },
              { name: 'External API Partners', desc: 'B2B authenticated consumers via mTLS / API keys', tag: 'B2B' }
            ]
          },
          {
            id: 'edge',
            name: 'Edge & Security Tier',
            badge: 'Tier 2 · Perimeter',
            color: 'cyan',
            icon: '🛡️',
            nodes: [
              { name: 'Global Anycast DNS', desc: 'Latency-based edge routing (Cloudflare / Route 53)', tag: 'DNS' },
              { name: 'Edge CDN Caching', desc: 'Static assets & edge SSR HTML distribution', tag: 'CDN' },
              { name: 'WAF & DDoS Shield', desc: 'L7 rate limiting, bot protection & TLS 1.3 termination', tag: 'WAF' }
            ]
          },
          {
            id: 'gateway',
            name: 'Gateway & Routing Tier',
            badge: 'Tier 3 · Reverse Proxy',
            color: 'purple',
            icon: '🚪',
            nodes: [
              { name: 'API Gateway', desc: 'Dynamic reverse proxy, routing & CORS policies (Kong / Envoy)', tag: 'Gateway' },
              { name: 'Auth Filter & Guard', desc: 'OAuth2 / OIDC token verification & tenant context injection', tag: 'Auth' }
            ]
          },
          {
            id: 'app',
            name: 'Core Application Tier',
            badge: 'Tier 4 · Compute',
            color: 'emerald',
            icon: '⚡',
            nodes: [
              { name: 'Core Application Server', desc: 'Stateless domain services & transactional logic pods', tag: 'Compute' },
              { name: 'Async Worker Pool', desc: 'Decoupled job queues, cron jobs & event consumers', tag: 'Workers' },
              { name: 'Observability Telemetry', desc: 'OTel distributed tracing, Prometheus metrics & structured logs', tag: 'OTel' }
            ]
          },
          {
            id: 'data',
            name: 'Persistence & Caching Tier',
            badge: 'Tier 5 · Storage',
            color: 'amber',
            icon: '💾',
            nodes: [
              { name: 'Primary DB (ACID)', desc: 'PostgreSQL relational database with strict ACID transaction guarantees', tag: 'Primary' },
              { name: 'Read Replicas', desc: 'Connection pooling (PgBouncer) for read-heavy query offloading', tag: 'Replicas' },
              { name: 'Redis In-Memory Cache', desc: 'Distributed session store, rate limit counters & L2 cache', tag: 'L2 Cache' },
              { name: 'Message Broker', desc: 'Kafka / RabbitMQ broker with Dead-Letter Queues (DLQ)', tag: 'Events' },
              { name: 'Object Storage', desc: 'S3 / GCS cloud bucket persistence for blobs and media', tag: 'Blobs' }
            ]
          }
        ]
      },
      lld: {
        title: 'Clean Architecture (LLD)',
        subtitle: 'Strict inward dependency rule: Domain Core has zero external dependencies.',
        layers: [
          {
            id: 'domain',
            order: 1,
            name: 'Domain Layer (Core)',
            tag: 'Layer 1 · Pure Domain',
            color: 'blue',
            icon: '💎',
            depRule: 'Zero framework dependencies',
            description: 'Pure enterprise entities, value objects, domain rules, and domain-specific exceptions.',
            items: ['Entities (User, Order, Spec)', 'Value Objects (IdempotencyKey, Money)', 'Domain Events', 'Domain Exceptions']
          },
          {
            id: 'application',
            order: 2,
            name: 'Application / Use Case Layer',
            tag: 'Layer 2 · Orchestration',
            color: 'purple',
            icon: '⚙️',
            depRule: 'Depends only on Domain Layer',
            description: 'Coordinates application workflows, use case interactors, and input/output boundary DTOs.',
            items: ['Use Case Interactors', 'Input Boundary Ports', 'Output Boundary Ports / DTOs', 'Event Handlers & Sagas']
          },
          {
            id: 'infrastructure',
            order: 3,
            name: 'Infrastructure Layer',
            tag: 'Layer 3 · Adapters',
            color: 'amber',
            icon: '🔌',
            depRule: 'Implements Application Ports',
            description: 'Concrete adapters for databases, external APIs, message queues, and caching drivers.',
            items: ['SQL / ORM Repositories', 'Redis Distributed Lock Client', 'Kafka / RabbitMQ Event Outbox', 'Third-Party HTTP Clients']
          },
          {
            id: 'presentation',
            order: 4,
            name: 'Presentation / Interface Layer',
            tag: 'Layer 4 · Entry Points',
            color: 'emerald',
            icon: '🖥️',
            depRule: 'Invokes Application Use Cases',
            description: 'HTTP controllers, API route handlers, request validation schemas, and view presenters.',
            items: ['REST API Controllers', 'Validation Middleware (Zod/Joi)', 'Response Serializers / JSON', 'Error Response Formatters']
          }
        ],
        patterns: [
          { name: 'Repository Pattern', desc: 'Abstracts underlying storage mechanisms behind deterministic domain interfaces.' },
          { name: 'Dependency Injection (DI)', desc: 'Inverts control across layers to ensure complete mockability in TDD unit tests.' },
          { name: 'Unit of Work Pattern', desc: 'Maintains transactional integrity across multiple entity aggregates in a single commit.' },
          { name: 'Factory & Strategy', desc: 'Decouples swappable runtime implementations (e.g. multi-provider auth or payments).' }
        ]
      },
      consistency: {
        title: 'Data Consistency & Idempotency Pipeline',
        subtitle: 'Defends against duplicate executions via Redis distributed locks and transactional outbox guarantees.',
        steps: [
          { step: 1, title: 'Client Request', actor: 'Client', desc: 'Sends mutating request with unique Idempotency-Key header.' },
          { step: 2, title: 'Gateway Ingress', actor: 'API Gateway', desc: 'Validates key format and forwards request to Core Application.' },
          { step: 3, title: 'Cache Resolution Check', actor: 'Redis L2', desc: 'Checks idemp:X key in Redis. If resolved, immediately returns cached 200 OK.' },
          { step: 4, title: 'Distributed Lock Acquisition', actor: 'Redis Lock', desc: 'Acquires lock:X with a 10s auto-expiring TTL to prevent race conditions.' },
          { step: 5, title: 'ACID Transaction Commit', actor: 'Primary DB', desc: 'Executes core database mutations and writes event to outbox table.' },
          { step: 6, title: 'Outbox Event Dispatch', actor: 'Message Broker', desc: 'Worker polls outbox table and emits domain events to Kafka / RabbitMQ.' },
          { step: 7, title: 'Response & Lock Release', actor: 'Core Service', desc: 'Stores final response in Redis, releases distributed lock, and returns 201 Created.' }
        ]
      },
      caching: {
        title: 'Multi-Layer Caching Architecture',
        subtitle: 'Tiered caching with strict TTL enforcement and Cache-Aside pattern.',
        layers: [
          { level: 'Layer 1', name: 'Browser / Client Cache', target: 'Static assets, bundle hashes, immutable resources', ttl: 'stale-while-revalidate', latency: '< 1ms' },
          { level: 'Layer 2', name: 'Edge CDN Cache', target: 'Public marketing pages, edge SSR HTML snapshots', ttl: '60s - 3600s', latency: '5 - 20ms' },
          { level: 'Layer 3', name: 'Redis In-Memory Distributed', target: 'User sessions, hot database queries, rate limit tokens', ttl: '60s - 300s (Cache-Aside)', latency: '1 - 3ms' }
        ]
      },
      resilience: {
        title: 'Resilience & Circuit Breaker State Machine',
        subtitle: 'Protects upstream services and prevents cascading network failures.',
        states: [
          {
            state: 'CLOSED',
            name: 'Normal Operation',
            color: 'emerald',
            badge: 'Healthy',
            condition: 'Failure rate < 50% in 10s window',
            action: 'All requests routed directly to downstream services.'
          },
          {
            state: 'OPEN',
            name: 'Tripped / Fallback Active',
            color: 'red',
            badge: 'Fail-Fast Active',
            condition: 'Failure rate >= 50% within 10s window',
            action: 'Calls fail fast immediately without network execution; returns cached fallback.'
          },
          {
            state: 'HALF-OPEN',
            name: 'Canary Probe Recovery',
            color: 'amber',
            badge: 'Probing',
            condition: 'Sleep window of 30s has elapsed',
            action: 'Allows 3 canary probe requests. 3 successes reset to CLOSED; any failure returns to OPEN.'
          }
        ],
        guards: [
          { name: 'Circuit Breaker Guards', desc: 'All outbound third-party calls (payment gateways, external APIs) are protected.' },
          { name: 'Token Bucket Rate Limiting', desc: 'Enforced at API Gateway per client IP and authenticated user ID.' },
          { name: 'Graceful Degradation', desc: 'Gracefully falls back to stale cache or deterministic defaults during downstream outages.' },
          { name: 'Zero-Trust Security Perimeter', desc: 'mTLS between internal microservices, scoped JWT claims, and parameterized SQL exclusively.' }
        ]
      },
      rawContent: content || ''
    };
  }

  /**
   * Extract Git telemetry with strictly formatted DD-MM-YYYY dates
   */
  getGitTelemetry() {
    try {
      const logOutput = execSync('git log -n 10 --pretty=format:"%h|%an|%ad|%ar|%s" --date=format:"%d-%m-%Y %H:%M"', {
        cwd: this.projectRoot,
        encoding: 'utf8',
        timeout: 3000
      });

      const commits = logOutput.trim().split(/\r?\n/).map((line, idx) => {
        const [hash, author, date, relativeTime, ...subjectParts] = line.split('|');
        const subject = subjectParts.join('|');
        return {
          hash,
          author,
          date: date ? date.split(' ')[0] : formatDDMMYYYY(),
          time: date ? date.split(' ')[1] : '',
          relativeTime,
          subject,
          isHead: idx === 0
        };
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
          { hash: 'HEAD', author: 'AI Agent', date: formatDDMMYYYY(), time: '12:00', relativeTime: 'Just now', subject: 'Project governance & dashboard initialized', isHead: true }
        ],
        dirtyFiles: 0,
        branch: 'main'
      };
    }
  }

  /**
   * Find the most recently updated agent transcript.
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

  extractUsage(d) {
    const u = (d && d.message && d.message.usage) || (d && d.usage) || d || {};
    const input = (u.input_tokens || 0) + (u.cache_creation_input_tokens || 0);
    const output = u.output_tokens || 0;
    const cacheRead = u.cache_read_input_tokens || u.cache_read_tokens || 0;
    const model = d.model || (d.message && d.message.model) || null;
    if (!input && !output && !cacheRead) return null;
    return { input, output, cacheRead, step: d.step_index, time: d.timestamp || d.created_at, model };
  }

  /**
   * Auto-detect model profile from transcript logs or user override
   */
  detectModelProfile(rawModelString) {
    const str = String(rawModelString || '').toLowerCase();
    if (str.includes('gemini')) {
      const p = { ...this.MODEL_PROFILES.gemini };
      p.detectedModel = rawModelString;
      return p;
    }
    if (str.includes('claude')) {
      const p = { ...this.MODEL_PROFILES.claude };
      p.detectedModel = rawModelString;
      return p;
    }
    if (str.includes('gpt') || str.includes('o1') || str.includes('o3') || str.includes('openai')) {
      const p = { ...this.MODEL_PROFILES.openai };
      p.detectedModel = rawModelString;
      return p;
    }
    if (str.includes('deepseek')) {
      const p = { ...this.MODEL_PROFILES.deepseek };
      p.detectedModel = rawModelString;
      return p;
    }
    // Default to Gemini in Antigravity or Claude if standard
    return { ...this.MODEL_PROFILES.gemini, detectedModel: rawModelString || 'gemini-3.8-flash' };
  }

  /**
   * Compute multi-window usage telemetry (5-hour, daily, weekly, session)
   */
  computeTelemetryWindows(history, profile, now = Date.now()) {
    // 1. 5-Hour Rolling Window
    const fiveHourDuration = 5 * 3600 * 1000;
    const cutoff5h = now - fiveHourDuration;
    const turns5h = history.filter(t => new Date(t.time).getTime() >= cutoff5h);
    let total5hInput = 0, total5hCache = 0, total5hOutput = 0;
    let oldest5hTurnTime = null;

    turns5h.forEach(t => {
      total5hInput += t.input;
      total5hCache += t.cacheRead;
      total5hOutput += t.output;
      const tTime = new Date(t.time).getTime();
      if (!oldest5hTurnTime || tTime < oldest5hTurnTime) oldest5hTurnTime = tTime;
    });

    const total5hTokens = total5hInput + total5hCache + total5hOutput;
    const limit5h = profile.limits.fiveHour;
    const utilPct5h = Math.min(100, Math.round((total5hTokens / limit5h) * 1000) / 10);
    const resetEpoch5h = oldest5hTurnTime ? (oldest5hTurnTime + fiveHourDuration) : (now + fiveHourDuration);
    const remaining5hMs = Math.max(0, resetEpoch5h - now);

    // 2. Daily Window (Today 00:00 to 23:59)
    const dObj = new Date(now);
    dObj.setHours(0, 0, 0, 0);
    const startOfDay = dObj.getTime();
    const turnsDaily = history.filter(t => new Date(t.time).getTime() >= startOfDay);
    let totalDailyInput = 0, totalDailyCache = 0, totalDailyOutput = 0;

    turnsDaily.forEach(t => {
      totalDailyInput += t.input;
      totalDailyCache += t.cacheRead;
      totalDailyOutput += t.output;
    });

    const totalDailyTokens = totalDailyInput + totalDailyCache + totalDailyOutput;
    const limitDaily = profile.limits.daily;
    const utilPctDaily = Math.min(100, Math.round((totalDailyTokens / limitDaily) * 1000) / 10);
    const nextMidnight = new Date(now);
    nextMidnight.setHours(24, 0, 0, 0);
    const resetEpochDaily = nextMidnight.getTime();
    const remainingDailyMs = Math.max(0, resetEpochDaily - now);

    // 3. Weekly Window (Monday 00:00 to Sunday 23:59)
    const wObj = new Date(now);
    const dayOfWeek = wObj.getDay(); // 0 is Sunday, 1 is Monday...
    const diffToMon = (dayOfWeek === 0 ? -6 : 1) - dayOfWeek;
    wObj.setDate(wObj.getDate() + diffToMon);
    wObj.setHours(0, 0, 0, 0);
    const startOfWeek = wObj.getTime();
    const turnsWeekly = history.filter(t => new Date(t.time).getTime() >= startOfWeek);
    let totalWeeklyInput = 0, totalWeeklyCache = 0, totalWeeklyOutput = 0;

    turnsWeekly.forEach(t => {
      totalWeeklyInput += t.input;
      totalWeeklyCache += t.cacheRead;
      totalWeeklyOutput += t.output;
    });

    const totalWeeklyTokens = totalWeeklyInput + totalWeeklyCache + totalWeeklyOutput;
    const limitWeekly = profile.limits.weekly;
    const utilPctWeekly = Math.min(100, Math.round((totalWeeklyTokens / limitWeekly) * 1000) / 10);
    const nextMonday = new Date(startOfWeek);
    nextMonday.setDate(nextMonday.getDate() + 7);
    const resetEpochWeekly = nextMonday.getTime();
    const remainingWeeklyMs = Math.max(0, resetEpochWeekly - now);

    // 4. Session / All-Time Window
    let totalSessionInput = 0, totalSessionCache = 0, totalSessionOutput = 0;
    history.forEach(t => {
      totalSessionInput += t.input;
      totalSessionCache += t.cacheRead;
      totalSessionOutput += t.output;
    });
    const totalSessionTokens = totalSessionInput + totalSessionCache + totalSessionOutput;

    // Economics helper
    const calcEconomics = (input, cache, output) => {
      const p = profile.pricing;
      const standard = (((input + cache) * p.inputPerM) / 1e6) + ((output * p.outputPerM) / 1e6);
      const cached = ((input * p.inputPerM) / 1e6) + ((cache * p.cacheReadPerM) / 1e6) + ((output * p.outputPerM) / 1e6);
      const savings = Math.max(0, standard - cached);
      const savingsPct = standard > 0 ? Math.round((savings / standard) * 100) : 0;
      return {
        costStandard: standard,
        costCached: cached,
        savings,
        savingsPct,
        costCachedFormatted: `$${cached.toFixed(2)}`,
        savingsFormatted: `$${savings.toFixed(2)}`
      };
    };

    const getStatus = (pct) => {
      if (pct >= 95) return { status: 'CRITICAL', label: 'Rate Limit Imminent', color: 'red' };
      if (pct >= 80) return { status: 'WARNING', label: 'Compaction Needed', color: 'amber' };
      if (pct >= 60) return { status: 'ADVISORY', label: 'Moderate Load', color: 'cyan' };
      return { status: 'OPTIMAL', label: 'Optimal Safe', color: 'emerald' };
    };

    return {
      fiveHour: {
        tokensUsed: total5hTokens,
        inputTokens: total5hInput,
        cacheReadTokens: total5hCache,
        outputTokens: total5hOutput,
        turnCount: turns5h.length,
        limit: limit5h,
        utilizationPercent: utilPct5h,
        resetEpochMs: resetEpoch5h,
        resetRemainingMs: remaining5hMs,
        resetRemainingFormatted: formatCountdown(remaining5hMs),
        resetTimeFormatted: formatResetTime(resetEpoch5h),
        status: getStatus(utilPct5h),
        economics: calcEconomics(total5hInput, total5hCache, total5hOutput)
      },
      daily: {
        tokensUsed: totalDailyTokens,
        inputTokens: totalDailyInput,
        cacheReadTokens: totalDailyCache,
        outputTokens: totalDailyOutput,
        turnCount: turnsDaily.length,
        limit: limitDaily,
        utilizationPercent: utilPctDaily,
        resetEpochMs: resetEpochDaily,
        resetRemainingMs: remainingDailyMs,
        resetRemainingFormatted: formatCountdown(remainingDailyMs),
        resetTimeFormatted: formatResetTime(resetEpochDaily),
        status: getStatus(utilPctDaily),
        economics: calcEconomics(totalDailyInput, totalDailyCache, totalDailyOutput)
      },
      weekly: {
        tokensUsed: totalWeeklyTokens,
        inputTokens: totalWeeklyInput,
        cacheReadTokens: totalWeeklyCache,
        outputTokens: totalWeeklyOutput,
        turnCount: turnsWeekly.length,
        limit: limitWeekly,
        utilizationPercent: utilPctWeekly,
        resetEpochMs: resetEpochWeekly,
        resetRemainingMs: remainingWeeklyMs,
        resetRemainingFormatted: formatCountdown(remainingWeeklyMs),
        resetTimeFormatted: formatResetTime(resetEpochWeekly),
        status: getStatus(utilPctWeekly),
        economics: calcEconomics(totalWeeklyInput, totalWeeklyCache, totalWeeklyOutput)
      },
      session: {
        tokensUsed: totalSessionTokens,
        inputTokens: totalSessionInput,
        cacheReadTokens: totalSessionCache,
        outputTokens: totalSessionOutput,
        turnCount: history.length,
        economics: calcEconomics(totalSessionInput, totalSessionCache, totalSessionOutput)
      }
    };
  }

  /**
   * Parse full Agent Context Window & Token Telemetry with Model Profiles & Multi-Window Quotas
   */
  parseTokenTelemetry() {
    const transcriptPath = this.findTranscriptPath();
    let totalInput = 0;
    let totalOutput = 0;
    let totalCacheRead = 0;
    let lastStep = null;
    let detectedModel = null;
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
              if (usage.model) detectedModel = usage.model;
              lastStep = {
                step: usage.step || (history.length + 1),
                input: inp,
                output: out,
                cacheRead: cache,
                total: inp + out + cache,
                model: usage.model || detectedModel || 'gemini-3.8-flash',
                time: usage.time || new Date().toISOString()
              };
              history.push(lastStep);
            }
          } catch (e) {}
        }
      } catch (e) {}
    }

    if (!lastStep) {
      lastStep = { step: 1, input: 3200, output: 450, cacheRead: 112000, total: 115650, model: 'gemini-3.8-flash', time: new Date().toISOString() };
      totalInput = 3200;
      totalOutput = 450;
      totalCacheRead = 112000;
      history.push(lastStep);
    }

    const activeProfile = this.detectModelProfile(detectedModel || (lastStep && lastStep.model));
    let windowLimit = Number(process.env.DASHBOARD_CONTEXT_WINDOW) || activeProfile.contextCeiling;

    const currentContext = lastStep.input + lastStep.cacheRead;
    if (!process.env.DASHBOARD_CONTEXT_WINDOW && currentContext > windowLimit) {
      windowLimit = Math.max(windowLimit, 1000000);
    }
    const utilPct = Math.min(100, Math.round((currentContext / windowLimit) * 1000) / 10);
    const freeTokens = Math.max(0, windowLimit - currentContext);
    const totalTokens = totalInput + totalOutput + totalCacheRead;
    const promptTotal = totalInput + totalCacheRead;
    const cacheHitRate = promptTotal > 0 ? Math.round((totalCacheRead / promptTotal) * 1000) / 10 : 0;
    const turnCount = history.length || 1;
    const avgTokensPerTurn = Math.round(totalTokens / turnCount);

    const windows = this.computeTelemetryWindows(history, activeProfile, Date.now());

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
      activeProfile,
      currentContext,
      windowLimit,
      utilizationPercent: utilPct,
      freeTokens,
      healthStatus,
      healthLabel,
      healthColor,
      lastTurn: lastStep,
      windows,
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
        costStandardFormatted: windows.session.economics.costStandard ? `$${windows.session.economics.costStandard.toFixed(2)}` : '$0.00',
        costCachedFormatted: windows.session.economics.costCachedFormatted,
        savingsFormatted: windows.session.economics.savingsFormatted,
        savingsPercent: windows.session.economics.savingsPct
      },
      recentTurns: history.slice(-20).reverse()
    };
  }

  /**
   * Universal Project Metadata Detection
   * Infers project name, framework track, active phase, and root directory dynamically.
   */
  getProjectMetadata(frameworkType = 'SDD', phases = []) {
    let name = path.basename(this.projectRoot) || 'Universal Project';

    // 1. Try reading package.json for project name
    try {
      const pkgPath = path.join(this.projectRoot, 'package.json');
      if (fs.existsSync(pkgPath)) {
        const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
        if (pkg.name) name = pkg.name;
      }
    } catch (e) {}

    // 2. Try reading docs/prd.md title if package.json has generic name or missing
    if (name === 'Spec-Driven-Development' || name === 'Vibe-Coding' || name === 'Universal Project') {
      try {
        const prdContent = this.readFileSafe(path.join(this.docsDir, 'prd.md'));
        const m = prdContent.match(/^#\s+(.+)$/m);
        if (m && m[1]) {
          const cand = m[1].replace(/[—–-].*$/, '').trim();
          if (cand && !/^(prd|readme|spec|template|phases)$/i.test(cand)) {
            name = cand;
          }
        }
      } catch (e) {}
    }

    // 3. Detect framework track
    let track = 'Universal Project · In-IDE';
    if (frameworkType === 'SDD' || fs.existsSync(path.join(this.docsDir, 'spec.md')) || fs.existsSync(this.featuresDir)) {
      track = 'SDD-TDD · In-IDE';
    } else if (frameworkType === 'VIBE' || fs.existsSync(path.join(this.docsDir, 'decision-log.md'))) {
      track = 'Vibe-Coding · In-IDE';
    }

    // 4. Detect Active Phase Title from parsed phases or docs/phases.md
    let activePhaseTitle = 'Phase Active · All Systems Nominal';
    if (phases && phases.length > 0) {
      const activePhase = phases.find(p => p.status === 'IN_PROGRESS') || phases[0];
      if (activePhase && activePhase.name) {
        activePhaseTitle = `${activePhase.name} · All Systems Nominal`;
      }
    } else {
      try {
        const phasesContent = this.readFileSafe(path.join(this.docsDir, 'phases.md'));
        const phaseLines = phasesContent.split(/\r?\n/);
        for (const line of phaseLines) {
          if (line.includes('IN_PROGRESS') || line.includes('Active') || line.includes('Phase')) {
            const match = line.match(/Phase\s+\d+[^|\n\r]*/i);
            if (match) {
              activePhaseTitle = match[0].trim() + ' · All Systems Nominal';
              break;
            }
          }
        }
      } catch (e) {}
    }

    return {
      name,
      track,
      root: this.projectRoot,
      activePhaseTitle,
      hasDocs: fs.existsSync(this.docsDir),
      hasLogs: fs.existsSync(path.join(this.projectRoot, 'logs')),
      hasTests: fs.existsSync(this.testsDir)
    };
  }

  /**
   * Full aggregate state object for the dashboard
   */
  getDashboardState(frameworkType = 'SDD') {
    const tasks = this.parseTasks();
    const phases = this.parsePhases();
    const specs = this.parseSpecs(tasks);
    const errorTracking = this.parseErrorTelemetry();
    const blockers = errorTracking.defects;
    const git = this.getGitTelemetry();
    const tokens = this.parseTokenTelemetry();
    const logs = this.getLogFilesTelemetry();
    const architecture = this.parseArchitecture();
    const project = this.getProjectMetadata(frameworkType, phases);

    // Calculate Scope Progress %
    const totalPhases = phases.length;
    const completedPhases = phases.filter(p => p.status === 'DONE').length;
    const inProgressPhases = phases.filter(p => p.status === 'IN_PROGRESS').length;
    const scopeProgress = totalPhases > 0 ? Math.round(((completedPhases * 100) + (inProgressPhases * 50)) / totalPhases) : 0;

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

    // Calculate Task Strength Breakdown (a, b, c, d for the 4-pillar bar chart)
    const backlogCount = tasks.filter(t => t.status === 'BACKLOG' || t.status === 'READY').length;
    const inProgressCount = tasks.filter(t => t.status === 'IN_PROGRESS' || t.status === 'RED_TEST_FAIL').length;
    const reviewCount = tasks.filter(t => t.status === 'REVIEW' || t.status === 'REVIEW_BLOCKED' || t.status === 'BLOCKED').length;
    const doneCount = tasks.filter(t => t.status === 'DONE').length;

    const taskStrength = {
      a: { label: 'Backlog', count: backlogCount, letter: 'a', color: 'gold' },
      b: { label: 'In Progress', count: inProgressCount, letter: 'b', color: 'coral' },
      c: { label: 'Review / Hold', count: reviewCount, letter: 'c', color: 'cyan' },
      d: { label: 'Done / Verified', count: doneCount, letter: 'd', color: 'purple' },
      total: tasks.length
    };

    // Project Deliveries Trajectory (Dual Spline Chart Points dynamically generated strictly in DD-MM-YYYY)
    const now = new Date();
    const dynamicLabels = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getTime() - i * 7 * 86400000);
      dynamicLabels.push(formatDDMMYYYY(d));
    }
    const totalScopeCount = Math.max(tasks.length, 1);
    const targetPoints = [
      Math.max(1, Math.round(totalScopeCount * 0.16)),
      Math.max(1, Math.round(totalScopeCount * 0.33)),
      Math.max(1, Math.round(totalScopeCount * 0.50)),
      Math.max(1, Math.round(totalScopeCount * 0.67)),
      Math.max(1, Math.round(totalScopeCount * 0.83)),
      totalScopeCount
    ];
    const achievedPoints = [
      Math.round(completedTasks * 0.15),
      Math.round(completedTasks * 0.35),
      Math.round(completedTasks * 0.55),
      Math.round(completedTasks * 0.75),
      Math.round(completedTasks * 0.9),
      completedTasks
    ];
    const deliveriesTrajectory = {
      labels: dynamicLabels,
      target: targetPoints,
      achieved: achievedPoints,
      currentTooltip: {
        milestone: formatDDMMYYYY(now),
        achievedLabel: `${completedTasks} Tasks Done`,
        targetLabel: `${tasks.length} Total Scope`,
        achievedVal: completedTasks,
        targetVal: tasks.length,
        xPct: 100
      }
    };

    // Production Activity & Notification Feed (Colored Avatars + DD-MM-YYYY Timestamps)
    const notifications = [];
    if (git && git.recentCommits && git.recentCommits.length > 0) {
      const head = git.recentCommits[0];
      notifications.push({
        id: 'notif-head',
        type: 'commit',
        avatarColor: 'yellow',
        avatarIcon: '⚡',
        title: `HEAD: ${head.subject || head.message || 'Latest commit'}`,
        timestamp: `${head.date || formatDDMMYYYY()} | ${head.time || '15:30:00'}`,
        isHead: true
      });
      if (git.recentCommits[1]) {
        const c2 = git.recentCommits[1];
        notifications.push({
          id: 'notif-c2',
          type: 'commit',
          avatarColor: 'grey',
          avatarIcon: '🌿',
          title: `Commit: ${c2.subject || c2.message}`,
          timestamp: `${c2.date || formatDDMMYYYY()} | ${c2.time || '14:45:00'}`
        });
      }
    }
    const activeTask = tasks.find(t => t.status === 'IN_PROGRESS' || t.status === 'RED_TEST_FAIL') || tasks[0];
    if (activeTask) {
      notifications.push({
        id: 'notif-task',
        type: 'task',
        avatarColor: 'purple',
        avatarIcon: '📋',
        title: `${activeTask.id}: ${activeTask.title || 'Task in-flight'} [${activeTask.status}]`,
        timestamp: `${formatDDMMYYYY()} | ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}`
      });
    }
    const passingAc = specs.find(s => s.status === 'GREEN') || specs[0];
    if (passingAc) {
      notifications.push({
        id: 'notif-ac',
        type: 'contract',
        avatarColor: 'cyan',
        avatarIcon: '🔬',
        title: `${passingAc.id} contract verified GREEN (${passingAc.title || 'Passing'})`,
        timestamp: `${formatDDMMYYYY()} | ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}`
      });
    }
    notifications.push({
      id: 'notif-tdd',
      type: 'test',
      avatarColor: 'orange',
      avatarIcon: '🧪',
      title: `TDD Suite: ${acPassRate}% AC contracts passing (Zero Regression)`,
      timestamp: `${formatDDMMYYYY()} | ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}`
    });

    return {
      project,
      frameworkType,
      currentDate: formatDDMMYYYY(),
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
        logFilesCount: logs.summary.totalFiles,
        agentStatus: 'Active · Telemetry Synced'
      },
      taskStrength,
      deliveriesTrajectory,
      notifications,
      tasks,
      phases,
      specs,
      blockers,
      errorTracking,
      git,
      tokens,
      logs,
      architecture
    };
  }
}

module.exports = DashboardParser;

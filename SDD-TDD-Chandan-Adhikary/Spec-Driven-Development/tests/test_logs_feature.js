/**
 * Automated Test Suite for In-IDE Project-Manager-Dashboard Live Logs Explorer
 * Validates discovery of logs/, security guards, tailing, keyword search,
 * semantic highlighting, and safe truncation across both framework tracks.
 */

const path = require('path');
const fs = require('fs');
const assert = require('assert');
const DashboardParser = require('../Project-Manager-Dashboard/parser');

const PROJECT_ROOT = path.resolve(__dirname, '..');
const DASHBOARD_DIR = path.join(PROJECT_ROOT, 'Project-Manager-Dashboard');
const parser = new DashboardParser(PROJECT_ROOT);

console.log('=================================================================');
console.log('       📜 LIVE DEVELOPMENT LOGS EXPLORER TEST SUITE              ');
console.log('=================================================================');
console.log(`Scan Target: logs/ & Project-Manager-Dashboard assets`);
console.log(`Timestamp:   ${new Date().toISOString()}\n`);

let passedChecks = 0;
let totalChecks = 0;

function runCheck(name, fn) {
  totalChecks++;
  try {
    fn();
    console.log(`  ✅ [PASS] ${name}`);
    passedChecks++;
  } catch (err) {
    console.error(`  ❌ [FAIL] ${name}: ${err.message}`);
    throw err;
  }
}

// 1. Telemetry & File Discovery
runCheck('Discovery: logs/ directory contains standard starter .log files', () => {
  const telemetry = parser.getLogFilesTelemetry();
  assert(telemetry, 'Telemetry object must be returned');
  assert(Array.isArray(telemetry.files), 'telemetry.files must be an array');
  assert(telemetry.summary, 'telemetry.summary must be defined');

  const filenames = telemetry.files.map(f => f.filename);
  assert(filenames.includes('dev.log'), 'dev.log must exist');
  assert(filenames.includes('test.log'), 'test.log must exist');
  assert(filenames.includes('server.log'), 'server.log must exist');
  assert(filenames.includes('error.log'), 'error.log must exist');
  assert(telemetry.summary.totalFiles >= 4, 'Total log files must be >= 4');
});

// 2. Telemetry metadata accuracy
runCheck('Metadata: Each log entry provides accurate stats and line counting', () => {
  const telemetry = parser.getLogFilesTelemetry();
  telemetry.files.forEach(f => {
    assert(typeof f.filename === 'string', 'filename must be string');
    assert(typeof f.size === 'number', 'size must be number');
    assert(typeof f.formattedSize === 'string', 'formattedSize must be string');
    assert(typeof f.lineCount === 'number', 'lineCount must be number');
    assert(typeof f.errorCount === 'number', 'errorCount must be number');
    assert(typeof f.warnCount === 'number', 'warnCount must be number');
    assert(typeof f.lastModified === 'string', 'lastModified must be string');
  });
});

// 3. Line classification & semantic highlighting
runCheck('Line Classification: Semantic line highlighter identifies ERROR, WARN, SUCCESS, and INFO', () => {
  const lineTypes = [
    { text: '[2026-11-18 01:00:00] [ERROR] Unhandled database connection error', expected: 'error' },
    { text: '[2026-11-18 01:00:01] [FATAL] Critical system crash detected', expected: 'error' },
    { text: '[2026-11-18 01:00:02] [WARN] Deprecated API call invoked', expected: 'warn' },
    { text: '[2026-11-18 01:00:03] [SUCCESS] All 14 test suites passed (100%)', expected: 'success' },
    { text: '[2026-11-18 01:00:04] [INFO] HTTP server listening on port 4200', expected: 'info' }
  ];

  lineTypes.forEach(lt => {
    const detected = parser.classifyLogLine(lt.text);
    assert.strictEqual(detected, lt.expected, `Expected ${lt.expected} for text: "${lt.text}", got: "${detected}"`);
  });
});

// 4. Content Reading, Tailing & Search
runCheck('Content Reading: Tail lines and keyword filtering function accurately', () => {
  const result = parser.readLogFileContent('dev.log', { lines: 10 });
  assert(!result.error, 'Reading dev.log should not produce error');
  assert.strictEqual(result.filename, 'dev.log');
  assert(Array.isArray(result.lines), 'result.lines must be array');
  assert(result.displayedLines <= 10, 'displayedLines must be <= 10');

  // Search filtering
  const searchResult = parser.readLogFileContent('dev.log', { lines: 50, search: 'INFO' });
  assert(!searchResult.error, 'Search in dev.log should not produce error');
  searchResult.lines.forEach(l => {
    assert(l.text.toLowerCase().includes('info'), `Search result line must contain "info": "${l.text}"`);
  });
});

// 5. Security & Path Traversal Protections
runCheck('Security: Rejects path traversal attempts, absolute paths, and non-.log files', () => {
  const invalidFiles = [
    '../package.json',
    '../../etc/passwd',
    '..\\server.js',
    'parser.js',
    'test.txt',
    'sub/dev.log',
    'dev.log/../../secret.key'
  ];

  invalidFiles.forEach(badFile => {
    const readRes = parser.readLogFileContent(badFile);
    assert(readRes.error, `readLogFileContent must reject bad file: ${badFile}`);

    const clearRes = parser.clearLogFile(badFile);
    assert.strictEqual(clearRes, false, `clearLogFile must reject bad file: ${badFile}`);
  });
});

// 6. DOM Elements in index.html
runCheck('DOM Integrity: index.html contains navigation link, badge, and view panel', () => {
  const html = fs.readFileSync(path.join(DASHBOARD_DIR, 'index.html'), 'utf8');
  assert(html.includes('id="nav-logs"'), 'Must have nav item #nav-logs');
  assert(html.includes('id="nav-log-badge"'), 'Must have nav badge #nav-log-badge');
  assert(html.includes('id="view-logs"'), 'Must have view panel #view-logs');
  assert(html.includes('id="logs-file-pills"'), 'Must have pills container #logs-file-pills');
  assert(html.includes('id="log-viewer-body"'), 'Must have terminal body #log-viewer-body');
  assert(html.includes('id="btn-clear-log"'), 'Must have clear button #btn-clear-log');
});

// 7. CSS Rules in dashboard.css
runCheck('CSS Integrity: dashboard.css contains log viewer and terminal styling', () => {
  const css = fs.readFileSync(path.join(DASHBOARD_DIR, 'assets/dashboard.css'), 'utf8');
  assert(css.includes('.nav-badge.blue'), 'Must include .nav-badge.blue');
  assert(css.includes('.log-pill'), 'Must include .log-pill');
  assert(css.includes('.logs-terminal-container'), 'Must include .logs-terminal-container');
  assert(css.includes('.log-line-error'), 'Must include .log-line-error');
  assert(css.includes('.log-line-warn'), 'Must include .log-line-warn');
  assert(css.includes('html[data-theme="light"] .logs-terminal-container'), 'Must include light theme styles');
});

// 8. JS Controller Methods in dashboard.js
runCheck('JS Client Integrity: dashboard.js implements log controller and handlers', () => {
  const js = fs.readFileSync(path.join(DASHBOARD_DIR, 'assets/dashboard.js'), 'utf8');
  assert(js.includes('bindLogControls'), 'Must include bindLogControls()');
  assert(js.includes('renderLogs'), 'Must include renderLogs()');
  assert(js.includes('fetchActiveLogContent'), 'Must include fetchActiveLogContent()');
  assert(js.includes('/api/clear-log'), 'Must call /api/clear-log');
});

// 9. Safe Log File Clearing / Truncation
runCheck('Mutation Safety: Safely clears log file without deleting the file node', () => {
  const tempLog = 'test_temp_verify.log';
  const tempPath = path.join(PROJECT_ROOT, 'logs', tempLog);

  try {
    fs.writeFileSync(tempPath, '[2026-11-18] Line 1 to be cleared\n[2026-11-18] Line 2 to be cleared\n', 'utf8');
    assert(fs.existsSync(tempPath), 'Temporary log file should be created');

    const beforeStats = parser.readLogFileContent(tempLog);
    assert.strictEqual(beforeStats.lines.length, 2, 'Should have 2 lines before clearing');

    const clearRes = parser.clearLogFile(tempLog);
    assert.strictEqual(clearRes, true, 'clearLogFile should succeed');

    const afterStats = parser.readLogFileContent(tempLog);
    assert.strictEqual(afterStats.lines.length, 0, 'Should have 0 lines after clearing');
    assert(fs.existsSync(tempPath), 'Log file should still exist on disk after truncation');
  } finally {
    if (fs.existsSync(tempPath)) {
      fs.unlinkSync(tempPath);
    }
  }
});

console.log('\n=================================================================');
console.log(`  🎉 ALL ${passedChecks}/${totalChecks} LOGS EXPLORER CHECKS PASSED SUCCESSFULLY!`);
console.log('=================================================================\n');

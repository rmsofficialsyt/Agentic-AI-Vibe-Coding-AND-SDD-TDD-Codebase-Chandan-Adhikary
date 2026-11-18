/**
 * Automated Test Suite for In-IDE Project-Manager-Dashboard
 * Design System Standardization, Motion Tokens, Button Micro-Interactions & Universal Project Architecture
 */

const assert = require('assert');
const path = require('path');
const fs = require('fs');

console.log('🧪 Starting Dashboard Design System & Universal Architecture Test Suite...\n');

const DASHBOARD_DIR = path.resolve(__dirname, '../Project-Manager-Dashboard');
const cssPath = path.join(DASHBOARD_DIR, 'assets/dashboard.css');
const jsPath = path.join(DASHBOARD_DIR, 'assets/dashboard.js');
const parserPath = path.join(DASHBOARD_DIR, 'parser.js');
const serverPath = path.join(DASHBOARD_DIR, 'server.js');
const htmlPath = path.join(DASHBOARD_DIR, 'index.html');

assert(fs.existsSync(cssPath), 'dashboard.css must exist');
assert(fs.existsSync(jsPath), 'dashboard.js must exist');
assert(fs.existsSync(parserPath), 'parser.js must exist');
assert(fs.existsSync(serverPath), 'server.js must exist');
assert(fs.existsSync(htmlPath), 'index.html must exist');

const css = fs.readFileSync(cssPath, 'utf8');
const js = fs.readFileSync(jsPath, 'utf8');
const server = fs.readFileSync(serverPath, 'utf8');
const html = fs.readFileSync(htmlPath, 'utf8');
const DashboardParser = require(parserPath);

// TEST 1: Spacing System Tokens
console.log('Test 1: Spacing Scale Tokens');
const requiredSpacing = [
  '--space-1',
  '--space-2',
  '--space-3',
  '--space-4',
  '--space-5',
  '--space-6',
  '--space-8',
  '--space-10',
  '--space-12'
];
for (const sp of requiredSpacing) {
  assert(css.includes(sp), `CSS must define spacing token ${sp}`);
}
console.log('  ✅ Spacing scale tokens validated.\n');

// TEST 2: Typography & Sizing Scale Tokens
console.log('Test 2: Typography & Sizing Scale Tokens');
const requiredTypeTokens = [
  '--font-size-xs',
  '--font-size-sm',
  '--font-size-base',
  '--font-size-md',
  '--font-size-lg',
  '--font-size-xl',
  '--font-size-2xl',
  '--font-weight-regular',
  '--font-weight-semibold',
  '--font-weight-bold',
  '--btn-height-sm',
  '--btn-height-md',
  '--btn-height-lg'
];
for (const tk of requiredTypeTokens) {
  assert(css.includes(tk), `CSS must define sizing token ${tk}`);
}
console.log('  ✅ Typography and sizing tokens validated.\n');

// TEST 3: Motion & Timing Tokens
console.log('Test 3: Motion & Timing Tokens');
const requiredMotionTokens = [
  '--duration-instant',
  '--duration-fast',
  '--duration-normal',
  '--duration-slow',
  '--ease-spring',
  '--ease-smooth',
  '--ease-tactile'
];
for (const mt of requiredMotionTokens) {
  assert(css.includes(mt), `CSS must define motion token ${mt}`);
}
console.log('  ✅ Motion and timing tokens validated.\n');

// TEST 4: Unified Button System Classes & States
console.log('Test 4: Unified Button System Classes & Interactive States');
const requiredButtonClasses = [
  '.ui-btn',
  '.ui-btn-primary',
  '.ui-btn-secondary',
  '.ui-btn-outline',
  '.ui-btn-ghost',
  '.ui-btn-danger',
  '.ui-btn-success',
  '.ui-btn-warning',
  '.ui-btn-sm',
  '.ui-btn-md',
  '.ui-btn-lg'
];
for (const bc of requiredButtonClasses) {
  assert(css.includes(bc), `CSS must include button class ${bc}`);
}

// Button interactive states
assert(css.includes('.ui-btn:hover'), 'CSS must define .ui-btn:hover');
assert(css.includes('.ui-btn:active'), 'CSS must define .ui-btn:active');
assert(css.includes('.ui-btn:focus-visible'), 'CSS must define .ui-btn:focus-visible');
assert(css.includes(':focus-visible'), 'Universal :focus-visible must be present for accessibility');
assert(css.includes('scale(0.975)') || css.includes('scale(0.98)'), 'Tactile active compression scale must be defined');
console.log('  ✅ Button system classes, sizes, and states validated.\n');

// TEST 5: Deduplicated Keyframes & Reduced Motion Compliance
console.log('Test 5: Keyframes & Reduced Motion Compliance');
const keyframeMatches = [...css.matchAll(/@keyframes\s+([a-zA-Z0-9_-]+)/g)].map(m => m[1]);
const seenKeyframes = new Set();
for (const name of keyframeMatches) {
  assert(!seenKeyframes.has(name), `Duplicate @keyframes name detected: ${name}`);
  seenKeyframes.add(name);
}
assert(css.includes('@media (prefers-reduced-motion: reduce)'), 'CSS must support prefers-reduced-motion');
console.log(`  ✅ All ${seenKeyframes.size} keyframes are unique (0 duplicates).`);
console.log('  ✅ Reduced-motion accessibility media query verified.\n');

// TEST 6: JS Tactile Button & Dynamic Project Engine
console.log('Test 6: JS Tactile Micro-Springs & Project Engine');
assert(js.includes('bindTactileButtons'), 'JS must include bindTactileButtons handler');
assert(js.includes('renderProjectMetadata'), 'JS must include renderProjectMetadata handler');
assert(html.includes('id="app-brand-name"'), 'index.html must have #app-brand-name');
assert(html.includes('id="app-track-badge"'), 'index.html must have #app-track-badge');
console.log('  ✅ JS tactile springs and dynamic metadata bindings verified.\n');

// TEST 7: Universal Project Parser & CLI Flags
console.log('Test 7: Universal Project Parser & CLI Flags');
const parser = new DashboardParser(path.resolve(__dirname, '..'));
const state = parser.getDashboardState('SDD');
assert(state.project, 'State must contain project metadata object');
assert(state.project.name, 'Project metadata must have name');
assert(state.project.track, 'Project metadata must have track');
assert(state.project.activePhaseTitle, 'Project metadata must have activePhaseTitle');
assert(Array.isArray(state.deliveriesTrajectory.labels), 'Trajectory labels must be array');
assert(state.deliveriesTrajectory.labels.length === 6, 'Trajectory must have 6 intervals');

// Verify strict DD-MM-YYYY format on all generated trajectory dates
const ddmmyyyyRegex = /^\d{2}-\d{2}-\d{4}$/;
for (const lbl of state.deliveriesTrajectory.labels) {
  assert(ddmmyyyyRegex.test(lbl), `Trajectory label "${lbl}" must follow strict DD-MM-YYYY format`);
}

// Verify server.js CLI project flag parsing
assert(server.includes('cliProjectDir'), 'server.js must support CLI project directory argument');
assert(server.includes('cliPort'), 'server.js must support CLI port argument');
console.log('  ✅ Universal project parser and CLI flag support verified.\n');

console.log('=================================================================');
console.log('🎉 ALL DASHBOARD DESIGN SYSTEM TESTS PASSED SUCCESSFULLY!');
console.log('=================================================================\n');

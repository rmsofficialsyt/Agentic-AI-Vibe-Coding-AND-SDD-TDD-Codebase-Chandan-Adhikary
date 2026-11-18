/**
 * Automated Test Suite for In-IDE Project-Manager-Dashboard System Architecture Overview
 * & Navigation Bar Sequence Optimization.
 * Validates divider-free SDLC sequence, architecture parsing, HLD/LLD components,
 * consistency timeline, and circuit breaker resilience across both tracks.
 */

const path = require('path');
const fs = require('fs');
const assert = require('assert');
const DashboardParser = require('../Project-Manager-Dashboard/parser');

const PROJECT_ROOT = path.resolve(__dirname, '..');
const DASHBOARD_DIR = path.join(PROJECT_ROOT, 'Project-Manager-Dashboard');
const parser = new DashboardParser(PROJECT_ROOT);

console.log('=================================================================');
console.log('   🏛️ SYSTEM ARCHITECTURE OVERVIEW & NAVBAR SEQUENCE TEST SUITE   ');
console.log('=================================================================');
console.log(`Scan Target: ${DASHBOARD_DIR}`);
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

// 1. Navigation Sequence & Divider Removal
runCheck('Navbar: Navigation sequence strictly adheres to SDLC order without divider', () => {
  const htmlPath = path.join(DASHBOARD_DIR, 'index.html');
  const html = fs.readFileSync(htmlPath, 'utf8');

  // Verify divider is completely absent
  const navMatch = html.match(/<nav class="sidebar-nav">([\s\S]*?)<\/nav>/);
  assert(navMatch, 'sidebar-nav element must exist in index.html');
  const navContent = navMatch[1];

  assert(!navContent.includes('nav-divider'), 'nav-divider MUST NOT exist in sidebar-nav per user directive');

  // Extract navigation items in order
  const idMatches = [...navContent.matchAll(/id="(nav-[a-z]+)"/g)].map(m => m[1]);
  const expectedOrder = [
    'nav-overview',
    'nav-architecture',
    'nav-tasks',
    'nav-specs',
    'nav-errors',
    'nav-logs',
    'nav-git',
    'nav-tokens',
    'nav-actions'
  ];

  assert.deepStrictEqual(idMatches, expectedOrder, `Navbar items order mismatch: ${idMatches.join(' -> ')}`);
});

// 2. System Architecture View Markup
runCheck('Markup: #view-architecture contains complete multi-tier sections and modals', () => {
  const htmlPath = path.join(DASHBOARD_DIR, 'index.html');
  const html = fs.readFileSync(htmlPath, 'utf8');

  assert(html.includes('id="view-architecture"'), '#view-architecture section must exist');
  assert(html.includes('id="arch-version-badge"'), '#arch-version-badge must exist');
  assert(html.includes('id="arch-stat-ingress"'), '#arch-stat-ingress must exist');
  assert(html.includes('id="arch-stat-compute"'), '#arch-stat-compute must exist');
  assert(html.includes('id="arch-stat-storage"'), '#arch-stat-storage must exist');
  assert(html.includes('id="arch-stat-resilience"'), '#arch-stat-resilience must exist');
  assert(html.includes('id="arch-hld-container"'), '#arch-hld-container must exist');
  assert(html.includes('id="arch-clean-layers-list"'), '#arch-clean-layers-list must exist');
  assert(html.includes('id="arch-consistency-timeline"'), '#arch-consistency-timeline must exist');
  assert(html.includes('id="arch-caching-list"'), '#arch-caching-list must exist');
  assert(html.includes('id="arch-breaker-states"'), '#arch-breaker-states must exist');
  assert(html.includes('id="arch-modal"'), '#arch-modal specification dialog must exist');
});

// 3. Parser AST & Telemetry
runCheck('Parser: parseArchitecture() extracts high-fidelity model from docs/system-architecture.md', () => {
  const arch = parser.parseArchitecture();
  assert(arch, 'Architecture model must be returned');
  assert(arch.meta, 'Metadata must be defined');
  assert(arch.meta.baseline, 'Baseline version must be defined');
  assert(arch.meta.docPath === 'docs/system-architecture.md', 'Doc path must match');

  // HLD Tiers
  assert(arch.hld && Array.isArray(arch.hld.tiers), 'HLD tiers must be an array');
  assert.strictEqual(arch.hld.tiers.length, 5, 'Must contain exactly 5 topological tiers');
  const tierIds = arch.hld.tiers.map(t => t.id);
  assert(tierIds.includes('ingress') && tierIds.includes('edge') && tierIds.includes('gateway') && tierIds.includes('app') && tierIds.includes('data'));

  // Clean Architecture Layers
  assert(arch.lld && Array.isArray(arch.lld.layers), 'Clean Architecture layers must be an array');
  assert.strictEqual(arch.lld.layers.length, 4, 'Must contain exactly 4 concentric layers');
  const layerIds = arch.lld.layers.map(l => l.id);
  assert(layerIds.includes('domain') && layerIds.includes('application') && layerIds.includes('infrastructure') && layerIds.includes('presentation'));

  // Data Consistency Steps
  assert(arch.consistency && Array.isArray(arch.consistency.steps), 'Consistency steps must be an array');
  assert(arch.consistency.steps.length >= 6, 'Consistency sequence must have >= 6 steps');

  // Circuit Breaker States
  assert(arch.resilience && Array.isArray(arch.resilience.states), 'Resilience states must be an array');
  assert.strictEqual(arch.resilience.states.length, 3, 'Must contain exactly 3 circuit breaker states');
  const stateNames = arch.resilience.states.map(s => s.state);
  assert(stateNames.includes('CLOSED') && stateNames.includes('OPEN') && stateNames.includes('HALF-OPEN'));

  // Aggregate Dashboard State
  const state = parser.getDashboardState();
  assert(state.architecture, 'Aggregate dashboard state must include architecture');
});

// 4. CSS Design System & Theme Tokens
runCheck('CSS: Architecture styles adhere to Shadcn Zinc tokens and responsive grid', () => {
  const cssPath = path.join(DASHBOARD_DIR, 'assets', 'dashboard.css');
  const css = fs.readFileSync(cssPath, 'utf8');

  assert(css.includes('.arch-card'), '.arch-card class must exist');
  assert(css.includes('.arch-tiers-flex'), '.arch-tiers-flex class must exist');
  assert(css.includes('.arch-tier-column'), '.arch-tier-column class must exist');
  assert(css.includes('.arch-node-card'), '.arch-node-card class must exist');
  assert(css.includes('.arch-layer-item'), '.arch-layer-item class must exist');
  assert(css.includes('.arch-step-item'), '.arch-step-item class must exist');
  assert(css.includes('.arch-cache-card'), '.arch-cache-card class must exist');
  assert(css.includes('.arch-breaker-state-card'), '.arch-breaker-state-card class must exist');
  assert(css.includes('html[data-theme="light"] .arch-tier-column'), 'Light theme overrides must exist');
});

// 5. Client Controller & Keyboard Shortcuts
runCheck('JS: Controller binds architecture view, shortcuts, and modal interactions', () => {
  const jsPath = path.join(DASHBOARD_DIR, 'assets', 'dashboard.js');
  const js = fs.readFileSync(jsPath, 'utf8');

  assert(js.includes('this.bindArchitectureEvents()'), 'bindArchitectureEvents must be called in init');
  assert(js.includes('this.renderArchitecture()'), 'renderArchitecture must be defined and called');
  assert(js.includes('openArchitectureModal()'), 'openArchitectureModal must be defined');
  assert(js.includes('closeArchitectureModal()'), 'closeArchitectureModal must be defined');
  assert(js.includes("e.key === '2' || e.key === 'a' || e.key === 'A'"), 'Key 2/A must switch to architecture view');
});

console.log('\n=================================================================');
console.log(`🎉 ALL ${passedChecks}/${totalChecks} ARCHITECTURE CHECKS PASSED SUCCESSFULLY!`);
console.log('=================================================================\n');

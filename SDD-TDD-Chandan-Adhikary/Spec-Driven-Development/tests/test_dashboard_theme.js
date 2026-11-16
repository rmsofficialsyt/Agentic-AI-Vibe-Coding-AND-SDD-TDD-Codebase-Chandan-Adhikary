/**
 * Automated Regression Test Suite for In-IDE Project-Manager-Dashboard
 * Theme Engine (Dark & Light Theme Switching, CSS Variables, and DOM Synchronization)
 */

const assert = require('assert');
const path = require('path');
const fs = require('fs');

console.log('🧪 Starting Dashboard Theme Engine Test Suite...\n');

const DASHBOARD_DIR = path.resolve(__dirname, '../Project-Manager-Dashboard');
const cssPath = path.join(DASHBOARD_DIR, 'assets/dashboard.css');
const jsPath = path.join(DASHBOARD_DIR, 'assets/dashboard.js');
const htmlPath = path.join(DASHBOARD_DIR, 'index.html');

assert(fs.existsSync(cssPath), 'dashboard.css must exist');
assert(fs.existsSync(jsPath), 'dashboard.js must exist');
assert(fs.existsSync(htmlPath), 'index.html must exist');

const css = fs.readFileSync(cssPath, 'utf8');
const js = fs.readFileSync(jsPath, 'utf8');
const html = fs.readFileSync(htmlPath, 'utf8');

// TEST 1: CSS Theme Tokens & Selectors
console.log('Test 1: CSS Theme Tokens & Selectors');
assert(css.includes('html[data-theme="dark"]') || css.includes('body.theme-dark'), 'Dark theme selector must be present in CSS');
assert(css.includes('html[data-theme="light"]') || css.includes('body.theme-light'), 'Light theme selector must be present in CSS');

const requiredTokens = [
  '--bg-canvas',
  '--bg-sidebar',
  '--bg-card',
  '--bg-card-elevated',
  '--bg-card-hover',
  '--bg-input',
  '--border-subtle',
  '--border-card',
  '--border-highlight',
  '--text-main',
  '--text-muted',
  '--text-faint',
  '--chart-grid',
  '--chart-marker',
  '--card-shadow'
];

// Check tokens defined in light mode block
const lightBlockMatch = css.match(/html\[data-theme="light"\],\s*body\.theme-light\s*\{([^}]+)\}/s);
assert(lightBlockMatch, 'Light theme token block must be defined');
const lightBlock = lightBlockMatch[1];

for (const token of requiredTokens) {
  assert(lightBlock.includes(token), `Token ${token} must be defined in light theme block`);
}
console.log('  ✅ All 15 critical design tokens verified in light theme palette.\n');

// TEST 2: Typography & Headings Contrast Safety
console.log('Test 2: Headings & Typography Theme Adaptability');
// Key titles must use var(--text-main) so they are dark in light theme and light in dark theme
const mainTextSelectors = [
  '.brand-name',
  '.header-greeting-title',
  '.card-title-bold',
  '.stat-big-num',
  '.view-section-title',
  '.action-card-title',
  '.shadcn-modal-title',
  '.shadcn-toast'
];

for (const sel of mainTextSelectors) {
  // Ensure the selector assigns var(--text-main) for color
  const selRegex = new RegExp(`\\${sel}[^{]*\\{[^}]*color:\\s*var\\(--text-main\\)`, 's');
  assert(selRegex.test(css), `Selector ${sel} must use color: var(--text-main)`);
}
console.log('  ✅ Key headings and text elements use theme-adaptive var(--text-main).\n');

// TEST 3: JS Theme Engine & DOM Synchronization
console.log('Test 3: JS Theme Engine & DOM Synchronization');
assert(js.includes("document.documentElement.setAttribute('data-theme', this.theme)"), 'JS must set data-theme attribute on documentElement');
assert(js.includes("document.body.classList.remove('theme-dark', 'theme-light')"), 'JS must clear existing theme classes on body');
assert(js.includes("document.body.classList.add(`theme-${this.theme}`)"), 'JS must add active theme class on body');
assert(js.includes("localStorage.setItem('pm_dashboard_theme', this.theme)"), 'JS must persist theme selection to localStorage');
assert(js.includes("this.renderDeliveries"), 'JS toggleTheme must trigger chart re-rendering for dynamic theme adaptation');
console.log('  ✅ JS Theme engine and DOM synchronization verified.\n');

// TEST 4: HTML Shell Pre-render Initialization
console.log('Test 4: HTML Shell Instant Theme Pre-render (FOUC Prevention)');
assert(html.includes('data-theme='), 'HTML tag must define data-theme');
assert(html.includes('pm_dashboard_theme'), 'HTML head must include pre-render script checking localStorage');
console.log('  ✅ HTML pre-render script verified.\n');

console.log('=================================================================');
console.log('🎉 ALL DASHBOARD THEME TESTS PASSED SUCCESSFULLY!');
console.log('=================================================================\n');

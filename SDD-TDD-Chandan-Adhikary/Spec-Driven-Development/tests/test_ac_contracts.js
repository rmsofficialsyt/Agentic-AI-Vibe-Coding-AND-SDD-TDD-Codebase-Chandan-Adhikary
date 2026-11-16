/**
 * Acceptance Criteria (AC) Contracts Test Suite
 * Validates Given/When/Then scenarios, test traceability, and contractual integrity.
 */

const path = require('path');
const fs = require('fs');
const assert = require('assert');
const DashboardParser = require('../Project-Manager-Dashboard/parser');

const PROJECT_ROOT = path.resolve(__dirname, '..');
const parser = new DashboardParser(PROJECT_ROOT);

console.log('=================================================================');
console.log('       🧪 ACCEPTANCE CRITERIA (AC) CONTRACT TEST SUITE           ');
console.log('=================================================================');
console.log(`Scan Target: docs/features/`);
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

// 1. Parse Specs & AC Contracts
const tasks = parser.parseTasks();
const specs = parser.parseSpecs(tasks);

console.log(`Discovered ${specs.length} Acceptance Criteria contracts in project.\n`);

runCheck('Contracts Discovery: At least one AC contract must exist', () => {
  assert(specs && specs.length > 0, 'No AC contracts parsed from docs/features/');
});

runCheck('Contract Identifiers: Every AC must have a canonical AC- ID', () => {
  specs.forEach(s => {
    assert(/^AC-[A-Za-z0-9._-]+$/.test(s.id), `Invalid AC ID format: ${s.id}`);
    assert(s.title && s.title.trim().length > 0, `AC ${s.id} has empty title`);
  });
});

runCheck('Given/When/Then Scenarios: Every contract must define Given/When/Then clauses', () => {
  specs.forEach(s => {
    const sc = s.scenario || {};
    assert(sc.given && sc.given.trim().length > 0, `AC ${s.id} is missing a GIVEN condition`);
    assert(sc.when && sc.when.trim().length > 0, `AC ${s.id} is missing a WHEN action`);
    assert(sc.then && sc.then.trim().length > 0, `AC ${s.id} is missing a THEN outcome`);
  });
});

runCheck('Verification Traceability: Every AC must map to a Test ID and location', () => {
  specs.forEach(s => {
    const v = s.verification || {};
    assert(v.testId && v.testId.startsWith('TEST-'), `AC ${s.id} has invalid testId: ${v.testId}`);
    assert(v.location && v.location.length > 0, `AC ${s.id} has no test location`);
  });
});

runCheck('Status Integrity: Every AC must carry a valid status (GREEN, RED, PENDING)', () => {
  const allowed = new Set(['GREEN', 'RED', 'PENDING']);
  specs.forEach(s => {
    assert(allowed.has(s.status), `AC ${s.id} has illegal status: ${s.status}`);
  });
});

console.log('\n--- Individual Contract Assertions ---');
specs.forEach(s => {
  const sc = s.scenario;
  const statusIcon = s.status === 'GREEN' ? '🟢' : (s.status === 'RED' ? '🔴' : '⚪');
  console.log(`${statusIcon} [${s.id}] ${s.title}`);
  console.log(`   ├─ GIVEN: ${sc.given}`);
  console.log(`   ├─ WHEN:  ${sc.when}`);
  console.log(`   ├─ THEN:  ${sc.then}`);
  console.log(`   └─ TEST:  ${s.verification.testId} [${s.verification.level}] -> ${s.verification.location}`);
});

console.log('\n=================================================================');
console.log(`🎉 ALL ${passedChecks}/${totalChecks} ACCEPTANCE CRITERIA CONTRACT AUDITS PASSED!`);
console.log('Contract Status Distribution:');
const green = specs.filter(s => s.status === 'GREEN').length;
const red = specs.filter(s => s.status === 'RED').length;
const pending = specs.filter(s => s.status === 'PENDING').length;
console.log(`  🟢 Passing (GREEN):   ${green}`);
console.log(`  🔴 In TDD Red Cycle: ${red}`);
console.log(`  ⚪ Pending Sprint:    ${pending}`);
console.log('=================================================================\n');

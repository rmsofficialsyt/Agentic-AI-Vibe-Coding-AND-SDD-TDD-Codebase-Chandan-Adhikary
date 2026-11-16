/**
 * Preventive Error Tracking & Defect Telemetry Test Suite
 * Validates discovery, Date formatting (DD-MM-YYYY), Path, AC traceability, SLA, and status mutations.
 */

const path = require('path');
const fs = require('fs');
const assert = require('assert');
const DashboardParser = require('../Project-Manager-Dashboard/parser');

const PROJECT_ROOT = path.resolve(__dirname, '..');
const parser = new DashboardParser(PROJECT_ROOT);

console.log('=================================================================');
console.log('       🛡️ PREVENTIVE ERROR TRACKING TEST SUITE                   ');
console.log('=================================================================');
console.log(`Scan Target: docs/error-tracker.md`);
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

// 1. Parse Defect Telemetry
const telemetry = parser.parseErrorTelemetry();
const defects = telemetry.defects;
const summary = telemetry.summary;

console.log(`Discovered ${defects.length} defect records in docs/error-tracker.md.\n`);

runCheck('Discovery: At least one defect must exist in error tracker', () => {
  assert(defects && defects.length > 0, 'No defects parsed from docs/error-tracker.md');
});

runCheck('ID Format: Every defect must have a canonical ERR-### identifier', () => {
  defects.forEach(d => {
    assert(/^ERR-\d{3,}$/i.test(d.id), `Invalid Defect ID: ${d.id}`);
  });
});

runCheck('Date Format: Every defect date must be strictly formatted in DD-MM-YYYY', () => {
  defects.forEach(d => {
    assert(/^\d{2}-\d{2}-\d{4}$/.test(d.date), `Defect ${d.id} date is not DD-MM-YYYY: ${d.date}`);
  });
});

runCheck('Severity & SLA: Every defect must carry valid severity (P0-P3) and SLA target', () => {
  const allowedSev = new Set(['P0', 'P1', 'P2', 'P3']);
  defects.forEach(d => {
    assert(allowedSev.has(d.severity), `Defect ${d.id} has invalid severity: ${d.severity}`);
    assert(d.sla && d.sla.length > 0, `Defect ${d.id} missing SLA`);
  });
});

runCheck('Path & Traceability: Every defect must have an explicit path and AC/root cause', () => {
  defects.forEach(d => {
    assert(d.impactedPath && d.impactedPath.length > 0, `Defect ${d.id} missing impactedPath`);
    assert(d.violatedAc && d.violatedAc.length > 0, `Defect ${d.id} missing violatedAc`);
    assert(d.rootCause && d.rootCause.length > 0, `Defect ${d.id} missing rootCause`);
    assert(d.regressionTest && d.regressionTest.length > 0, `Defect ${d.id} missing regressionTest`);
  });
});

runCheck('Status & SLA Health: Every defect must carry valid status (ACTIVE, IN_TRIAGE, RESOLVED)', () => {
  const allowedStatus = new Set(['ACTIVE', 'IN_TRIAGE', 'RESOLVED']);
  defects.forEach(d => {
    assert(allowedStatus.has(d.status), `Defect ${d.id} has invalid status: ${d.status}`);
  });
});

runCheck('Telemetry Aggregates: Summary metrics must accurately reflect defect list', () => {
  assert.strictEqual(summary.total, defects.length, 'Summary total mismatch');
  const activeCount = defects.filter(d => d.status !== 'RESOLVED').length;
  assert.strictEqual(summary.active, activeCount, 'Summary active mismatch');
  const resolvedCount = defects.filter(d => d.status === 'RESOLVED').length;
  assert.strictEqual(summary.resolved, resolvedCount, 'Summary resolved mismatch');
  assert(summary.rate >= 0 && summary.rate <= 100, `Invalid resolution rate: ${summary.rate}`);
});

console.log('\n--- Individual Defect Telemetry Records ---');
defects.forEach(d => {
  const icon = d.status === 'RESOLVED' ? '🟢' : (d.severity === 'P0' ? '🔥' : '🔴');
  console.log(`${icon} [${d.id}] [${d.severity}] ${d.summary}`);
  console.log(`   ├─ DATE:   ${d.date} | SLA: ${d.sla}`);
  console.log(`   ├─ PATH:   ${d.impactedPath}`);
  console.log(`   ├─ AC:     ${d.violatedAc}`);
  console.log(`   ├─ CAUSE:  ${d.rootCause}`);
  console.log(`   ├─ FIX:    ${d.fix}`);
  console.log(`   └─ TEST:   ${d.regressionTest} [Status: ${d.status}]`);
});

console.log('\n=================================================================');
console.log(`🎉 ALL ${passedChecks}/${totalChecks} PREVENTIVE ERROR TRACKING AUDITS PASSED!`);
console.log(`Total: ${summary.total} | Active: ${summary.active} | Resolved: ${summary.resolved} (${summary.rate}%)`);
console.log('=================================================================\n');

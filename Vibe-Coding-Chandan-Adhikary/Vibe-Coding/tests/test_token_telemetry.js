/**
 * Automated Regression Test Suite for Context Token Telemetry, Multi-Window Slicing,
 * Model Profiles, and Reset Schedules.
 */

const assert = require('assert');
const path = require('path');
const fs = require('fs');
const os = require('os');
const DashboardParser = require('../Project-Manager-Dashboard/parser');

const PROJECT_ROOT = path.resolve(__dirname, '..');
const parser = new DashboardParser(PROJECT_ROOT);

console.log('🧪 Starting Token Telemetry & Model Profiles Test Suite...\n');

// TEST 1: Model Registry & Profile Detection
console.log('Test 1: Model Profiles Registry & Auto-Detection');
assert(parser.MODEL_PROFILES, 'parser.MODEL_PROFILES must be defined');
assert(parser.MODEL_PROFILES.gemini, 'gemini profile must exist');
assert(parser.MODEL_PROFILES.claude, 'claude profile must exist');
assert(parser.MODEL_PROFILES.openai, 'openai profile must exist');
assert(parser.MODEL_PROFILES.deepseek, 'deepseek profile must exist');

assert.strictEqual(parser.MODEL_PROFILES.gemini.contextCeiling, 1000000, 'Gemini context ceiling must be 1,000,000');
assert.strictEqual(parser.MODEL_PROFILES.claude.contextCeiling, 200000, 'Claude context ceiling must be 200,000');
assert.strictEqual(parser.MODEL_PROFILES.openai.contextCeiling, 128000, 'OpenAI context ceiling must be 128,000');

assert.strictEqual(parser.detectModelProfile('gemini-3.8-flash-medium').id, 'gemini');
assert.strictEqual(parser.detectModelProfile('claude-3-7-sonnet-20250219').id, 'claude');
assert.strictEqual(parser.detectModelProfile('gpt-4o-2024-08-06').id, 'openai');
assert.strictEqual(parser.detectModelProfile('o3-mini').id, 'openai');
assert.strictEqual(parser.detectModelProfile('deepseek-r1').id, 'deepseek');
console.log('  ✅ Model profiles and auto-detection verified.\n');

// TEST 2: Multi-Window Slicing (5h, Daily, Weekly)
console.log('Test 2: Multi-Window Slicing & Reset Schedules');
const now = Date.now();
const testTurns = [
  // Turn 1: 10 minutes ago
  { step: 10, input: 2000, cacheRead: 50000, output: 500, total: 52500, time: new Date(now - 10 * 60 * 1000).toISOString() },
  // Turn 2: 2 hours ago
  { step: 9, input: 1500, cacheRead: 40000, output: 400, total: 41900, time: new Date(now - 2 * 3600 * 1000).toISOString() },
  // Turn 3: 4 hours ago
  { step: 8, input: 1200, cacheRead: 30000, output: 300, total: 31500, time: new Date(now - 4 * 3600 * 1000).toISOString() },
  // Turn 4: 8 hours ago (outside 5h, but within same day)
  { step: 7, input: 3000, cacheRead: 20000, output: 600, total: 23600, time: new Date(now - 8 * 3600 * 1000).toISOString() },
  // Turn 5: 3 days ago (within weekly, outside daily)
  { step: 6, input: 5000, cacheRead: 10000, output: 800, total: 15800, time: new Date(now - 3 * 24 * 3600 * 1000).toISOString() }
];

const windows = parser.computeTelemetryWindows(testTurns, parser.MODEL_PROFILES.claude, now);
assert(windows.fiveHour, 'fiveHour window must exist');
assert(windows.daily, 'daily window must exist');
assert(windows.weekly, 'weekly window must exist');

// 5-Hour should include turns from last 5 hours (turns 1, 2, 3: count = 3)
assert.strictEqual(windows.fiveHour.turnCount, 3, '5h window must include 3 turns');
assert.strictEqual(windows.fiveHour.tokensUsed, 52500 + 41900 + 31500, '5h tokens used must sum turns 1, 2, 3');

// 5-Hour reset should be oldest turn in window + 5h
const oldestIn5hTime = new Date(now - 4 * 3600 * 1000).getTime();
const expected5hReset = oldestIn5hTime + 5 * 3600 * 1000;
assert(Math.abs(windows.fiveHour.resetEpochMs - expected5hReset) < 2000, '5h reset epoch must be within 2s of expected');

// Daily reset should be next midnight
assert(windows.daily.resetEpochMs > now, 'Daily reset must be in the future');
const resetDate = new Date(windows.daily.resetEpochMs);
assert.strictEqual(resetDate.getHours(), 0, 'Daily reset hour must be 00');
assert.strictEqual(resetDate.getMinutes(), 0, 'Daily reset minute must be 00');

// Weekly reset should be next Monday
assert(windows.weekly.resetEpochMs > now, 'Weekly reset must be in the future');
const weeklyResetDate = new Date(windows.weekly.resetEpochMs);
assert.strictEqual(weeklyResetDate.getDay(), 1, 'Weekly reset day must be Monday (1)');
console.log('  ✅ Multi-window slicing and reset schedules verified.\n');

// TEST 3: Telemetry Payload Structure
console.log('Test 3: parseTokenTelemetry() Output Contract');
const telemetry = parser.parseTokenTelemetry();
assert(telemetry.activeProfile, 'telemetry must have activeProfile');
assert(telemetry.windows, 'telemetry must have windows');
assert(telemetry.windows.fiveHour, 'telemetry.windows must have fiveHour');
assert(telemetry.windows.daily, 'telemetry.windows must have daily');
assert(telemetry.windows.weekly, 'telemetry.windows must have weekly');
assert(telemetry.windows.session, 'telemetry.windows must have session');

assert(typeof telemetry.windows.fiveHour.resetRemainingFormatted === 'string', 'fiveHour must have formatted reset countdown');
assert(typeof telemetry.windows.daily.resetRemainingFormatted === 'string', 'daily must have formatted reset countdown');
assert(typeof telemetry.windows.weekly.resetRemainingFormatted === 'string', 'weekly must have formatted reset countdown');
console.log('  ✅ Telemetry contract verified.\n');

console.log('🎉 ALL TESTS PASSED SUCCESSFULLY!');

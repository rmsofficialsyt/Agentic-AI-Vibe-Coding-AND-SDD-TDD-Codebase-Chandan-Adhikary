# FEAT-001 Test Plan (SAMPLE)

**Spec version:** 1.0.0 · **Status:** APPROVED (sample) · Header and history: [`feature.md`](feature.md)

## Verification mapping

| AC | Test ID | Level | Test location | Evidence |
|---|---|---|---|---|
| AC-FEAT001-01 | TEST-FEAT001-01 | Integration | `tests/integration/auth/login.test.[ext]` | CI run link |
| AC-FEAT001-02 | TEST-FEAT001-02 | Integration | `tests/integration/auth/login.test.[ext]` | CI run link |
| AC-FEAT001-02 | TEST-FEAT001-03 | Unit | `tests/unit/auth/timing-safe-compare.test.[ext]` | CI run link |
| AC-FEAT001-03 | TEST-FEAT001-04 | Integration | `tests/integration/auth/lockout.test.[ext]` | CI run link + audit log sample |
| AC-FEAT001-04 | TEST-FEAT001-05 | Integration | `tests/integration/auth/tenant-status.test.[ext]` | CI run link |
| AC-FEAT001-05 | TEST-FEAT001-06 | Integration | `tests/integration/auth/logout.test.[ext]` | CI run link |

## Rules

- **MUST** show each test failing (red) before the production implementation exists, then passing (green); record both runs.
- **MUST** name or describe each test with its AC ID (e.g. `it('AC-FEAT001-03: locks account after 5 failures')`).
- **MUST** record the environment, exact command and evidence reference for each run.
- **MUST** include the full regression suite in the final evidence.

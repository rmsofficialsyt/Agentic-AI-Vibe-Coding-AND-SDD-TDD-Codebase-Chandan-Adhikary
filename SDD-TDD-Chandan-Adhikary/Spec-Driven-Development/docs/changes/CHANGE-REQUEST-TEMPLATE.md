# CR-[NNN]: [Short change title]

| Field | Value |
|---|---|
| CR ID | CR-[NNN] |
| Status | PROPOSED / UNDER ASSESSMENT / APPROVED / REJECTED / IMPLEMENTED / CLOSED |
| Requester | [NAME, role] |
| Date raised | [YYYY-MM-DD] |
| Urgency | Normal / Expedited (requires explicit approval per `docs/change-control.md` §10) |
| Affected feature(s) | FEAT-[NNN] |
| Spec version before | [x.y.z] |
| Proposed spec version after | [x.y.z] (MAJOR / MINOR / PATCH — justify) |
| Approval record | [APR-### in `docs/approvals/`] |

## 1. Proposed change

- **MUST** describe the proposed behavior, the reason, and the affected `FR-`/`AC-` IDs.

## 2. Impact assessment

| Area | Impact | Notes |
|---|---|---|
| Architecture / ADRs | None / Low / High | |
| Data model & migration | | |
| API compatibility | | |
| Tests (AC → TEST changes) | | |
| Security / privacy | | |
| Dependencies | | |
| Timeline / phases | | |
| Affected users (personas) | | |

## 3. Decision

- **MUST** record decision, approver and date before any implementation. No implementation before approval.

## 4. Execution evidence

- **MUST** link: updated spec version, failing-test evidence (red), passing-test evidence (green), changed files, CI run and review result.

## 5. Closure

- **MUST** link the `docs/CHANGELOG.md` entry and set the final status.

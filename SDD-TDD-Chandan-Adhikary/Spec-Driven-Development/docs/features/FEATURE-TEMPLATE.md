# FEAT-[NNN]: [Feature name]

| Field | Value |
|---|---|
| Feature ID | FEAT-[NNN] |
| Spec version | 0.1.0 |
| Status | DRAFT — NOT AUTHORIZED FOR IMPLEMENTATION |
| Format | Flat / Modular |
| Owner | [NAME, role] |
| Approver | [NAME, role] |
| Approval reference | [APR-### in docs/approvals/] |
| Approval date | [YYYY-MM-DD] |
| Related CR | [CR-### or N/A] |
| Product capability | [CAP-### in docs/product.md] |
| PRD requirements | [REQ-###, NFR-### in docs/prd.md] |
| Depends on | [FEAT-###, ADR-####, API/DB contract links] |
| Guideline baseline | 1.0.0 |

> Status values: `DRAFT` → `IN REVIEW` → `APPROVED` → `SUPERSEDED` | `DEPRECATED` (see `docs/features/README.md`).

## 1. Problem and value

- **MUST** define affected users (persona IDs from `docs/product.md`), pain point and measurable success.

## 2. Scope and non-goals

- **MUST** enumerate included and excluded behaviors.

| In scope | Out of scope |
|---|---|
| [behavior] | [behavior] |

## 3. Functional requirements

- **MUST** use stable IDs `FR-FEAT[NNN]-##`; each requirement is observable and testable.

| ID | Requirement | Source (REQ-###) |
|---|---|---|
| FR-FEAT[NNN]-01 | [The system MUST …] | REQ-[###] |

## 4. Journeys and states

- **MUST** include primary flow, loading, empty, error, success and edge cases where applicable.

## 5. Contracts

- **MUST** link architecture, schema, API and UI contracts (`docs/system-architecture.md`, `docs/database.md`, `docs/apis.md`, `docs/design.md`).

## 6. Quality requirements

- **MUST** specify security, accessibility, latency and privacy requirements when applicable.

| ID | Requirement | Measure / threshold |
|---|---|---|
| NFR-FEAT[NNN]-01 | [e.g. p95 latency] | [e.g. ≤ 300 ms] |

## 7. Acceptance criteria

- **MUST** define Given/When/Then cases with IDs `AC-FEAT[NNN]-##`, including negative cases.

### AC-FEAT[NNN]-01: [Title]

- **Given** [precondition]
- **When** [action]
- **Then** [observable result]
- **Covers:** FR-FEAT[NNN]-01

## 8. Verification mapping

- **MUST** map each AC to test IDs and evidence before implementation starts.

| AC | Test ID | Level (unit/integration/e2e) | Test location | Evidence |
|---|---|---|---|---|
| AC-FEAT[NNN]-01 | TEST-FEAT[NNN]-01 | [level] | [tests/path] | [CI run / report link] |

## 9. Approval and change history

- **MUST** record author, version, approver, timestamp and supersession; update the spec before tests and implementation.

| Version | Date | Author | Change | Status | Approval / CR |
|---|---|---|---|---|---|
| 0.1.0 | [YYYY-MM-DD] | [NAME] | Initial draft | DRAFT | — |

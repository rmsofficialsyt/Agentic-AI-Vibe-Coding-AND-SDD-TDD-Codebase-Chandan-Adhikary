# FEAT-001: Dashboard Landing Page (SAMPLE — flat format)

> **Illustrative sample.** Shows a Vibe feature that started as a `PROTOTYPE` and was formalized to `APPROVED`. It does **not** authorize implementation in your project until the product owner adopts it.

| Field | Value |
|---|---|
| Feature ID | FEAT-001 |
| Spec version | 1.0.0 |
| Status | APPROVED (sample) |
| Format | Flat |
| Owner | [Product owner] |
| Approver | [Product owner] |
| Approval reference | decision-log `DEC-001` (sample) |
| Approval date | [YYYY-MM-DD] |
| Related decision | DEC-001 |
| Product capability | CAP-001 Insight at a glance |
| PRD requirements | REQ-001, NFR-001 |
| Depends on | `docs/design.md` (tokens, layout grid), `docs/apis.md` (`GET /api/v1/summary`) |
| Guideline baseline | 1.0.0 |

## 1. Problem and value

Users must open three screens to understand today's status. Success: a user identifies their top three open items within 10 seconds of landing (usability test, n ≥ 5).

## 2. Scope and non-goals

| In scope | Out of scope |
|---|---|
| Summary cards (open items, due today, alerts) | Custom widget layout |
| Empty, loading and error states | Real-time push updates |

## 3. Functional requirements

| ID | Requirement | Source |
|---|---|---|
| FR-FEAT001-01 | The page MUST show three summary cards from `GET /api/v1/summary`. | REQ-001 |
| FR-FEAT001-02 | Each card MUST link to its filtered list view. | REQ-001 |
| FR-FEAT001-03 | The page MUST show an empty state with a primary call to action when there are no items. | REQ-001 |

## 4. Journeys and states

- **Loading:** skeleton cards. **Empty:** illustration + "Create your first item". **Error:** inline retry banner; cached values greyed out.

## 5. Contracts

- `GET /api/v1/summary` — canonical in `docs/apis.md`; visual tokens in `docs/design.md`.

## 6. Quality requirements

| ID | Requirement | Measure / threshold |
|---|---|---|
| NFR-FEAT001-01 | Largest Contentful Paint | ≤ 2.5 s on mid-tier mobile |
| NFR-FEAT001-02 | Accessibility | Cards keyboard-reachable; contrast ≥ 4.5:1 |

## 7. Acceptance criteria

### AC-FEAT001-01: Summary cards render from the API

- **Given** the summary API returns 4 open, 2 due today and 1 alert
- **When** the user lands on the dashboard
- **Then** three cards show `4`, `2` and `1` respectively
- **Covers:** FR-FEAT001-01

### AC-FEAT001-02: Empty state guides the user

- **Given** the summary API returns all zeros
- **When** the user lands on the dashboard
- **Then** the empty state and the "Create your first item" action are shown instead of cards
- **Covers:** FR-FEAT001-03

### AC-FEAT001-03: API failure is recoverable

- **Given** the summary API returns `500`
- **When** the user lands on the dashboard
- **Then** an inline error with a Retry action appears and Retry re-requests the API
- **Covers:** FR-FEAT001-01

## 8. Verification mapping

| AC | Test ID | Level | Test location | Evidence |
|---|---|---|---|---|
| AC-FEAT001-01 | TEST-FEAT001-01 | Component | `tests/components/dashboard-summary.test.[ext]` | CI run link |
| AC-FEAT001-02 | TEST-FEAT001-02 | Component | `tests/components/dashboard-summary.test.[ext]` | CI run link + screenshot |
| AC-FEAT001-03 | TEST-FEAT001-03 | E2E | `tests/e2e/dashboard.spec.[ext]` | CI run link |

## 9. Approval and change history

| Version | Date | Author | Change | Status | Approval / decision |
|---|---|---|---|---|---|
| 0.1.0 | [YYYY-MM-DD] | [Author] | Prototype contract (cards only) | PROTOTYPE | — |
| 0.2.0 | [YYYY-MM-DD] | [Author] | Added empty/error states and ACs | IN REVIEW | — |
| 1.0.0 | [YYYY-MM-DD] | [Author] | Formalized for production | APPROVED | DEC-001 |

# FEAT-001: User Authentication & RBAC (SAMPLE — modular format)

> **Illustrative sample.** Demonstrates the modular format and an `APPROVED` header. It does **not** authorize implementation in your project until the project owner adopts it with a project-specific approval record.

| Field | Value |
|---|---|
| Feature ID | FEAT-001 |
| Spec version | 1.0.0 |
| Status | APPROVED (sample) |
| Format | Modular (`feature.md`, `acceptance.md`, `test-plan.md`) |
| Owner | [Product owner] |
| Approver | [Engineering lead] |
| Approval reference | APR-SAMPLE-001 (replace with project record in `docs/approvals/`) |
| Approval date | [YYYY-MM-DD] |
| Related CR | N/A (initial version) |
| Product capability | CAP-001 Identity & access |
| PRD requirements | REQ-001, NFR-001 |
| Depends on | `docs/apis.md` (auth endpoints), `docs/database.md` (users, sessions), `docs/security.md` |
| Guideline baseline | 1.0.0 |

## 1. Problem and value

Multi-tenant users (School Admins, Teachers, Students, Parents) need secure sign-in with role-based access so that each user sees only their tenant's data. Success: zero cross-tenant data exposure; ≥ 99% successful sign-ins for valid credentials.

## 2. Scope and non-goals

| In scope | Out of scope |
|---|---|
| Email + password login, refresh, logout | Social / SSO login (future FEAT) |
| Role-based authorization for four roles | Self-service password reset (separate FEAT) |
| Lockout after repeated failures | Multi-factor authentication |

## 3. Functional requirements

| ID | Requirement | Source |
|---|---|---|
| FR-FEAT001-01 | The system MUST authenticate an active user by `email`, `password` and `tenant_id` and issue session tokens. | REQ-001 |
| FR-FEAT001-02 | The system MUST return a generic error for any invalid credential without revealing which field failed. | REQ-001 |
| FR-FEAT001-03 | The system MUST lock an account for 15 minutes after 5 consecutive failed attempts and write an audit event. | REQ-001 |
| FR-FEAT001-04 | The system MUST reject users of inactive or deleted tenants. | REQ-001 |
| FR-FEAT001-05 | The system MUST invalidate the refresh token on logout. | REQ-001 |

## 4. Journeys and states

- **Primary:** login → tokens issued → role-based landing page.
- **Error:** invalid credentials (generic message), locked account (retry-after shown), inactive tenant (403).
- **Loading:** submit button disabled while the request is in flight.
- **Session expiry:** silent refresh; on refresh failure redirect to login.

## 5. Contracts

| Endpoint | Request | Success |
|---|---|---|
| `POST /api/v1/auth/login` | `{ email, password, tenant_id }` | `200` + httpOnly cookies + profile |
| `POST /api/v1/auth/refresh` | refresh cookie | `200` + rotated tokens |
| `POST /api/v1/auth/logout` | — | `204` |

Canonical definitions live in `docs/apis.md` and `docs/database.md`; this table is a summary.

## 6. Quality requirements

| ID | Requirement | Measure / threshold |
|---|---|---|
| NFR-FEAT001-01 | Password policy | ≥ 12 chars, mixed case, digit, symbol |
| NFR-FEAT001-02 | Session tokens | httpOnly, `Secure`, `SameSite=Strict`; access token 15 min; rotating refresh token |
| NFR-FEAT001-03 | Timing-safe comparison | Invalid-user and invalid-password responses indistinguishable in timing (± 10%) |
| NFR-FEAT001-04 | Login latency | p95 ≤ 300 ms |

## 7. Acceptance criteria

See [`acceptance.md`](acceptance.md).

## 8. Verification mapping

See [`test-plan.md`](test-plan.md).

## 9. Approval and change history

| Version | Date | Author | Change | Status | Approval / CR |
|---|---|---|---|---|---|
| 0.1.0 | [YYYY-MM-DD] | [Author] | Initial draft | DRAFT | — |
| 1.0.0 | [YYYY-MM-DD] | [Author] | Review comments applied | APPROVED | APR-SAMPLE-001 |

# FEAT-002: Student Enrollment (SAMPLE — flat format)

> **Illustrative sample.** Demonstrates the flat format and an `IN REVIEW` feature. It is the canonical version of the enrollment example used in the root SDD guides. It does **not** authorize implementation.

| Field | Value |
|---|---|
| Feature ID | FEAT-002 |
| Spec version | 0.2.0 |
| Status | IN REVIEW — NOT AUTHORIZED FOR IMPLEMENTATION |
| Format | Flat |
| Owner | [Product owner] |
| Approver | [Engineering lead] |
| Approval reference | Pending |
| Approval date | — |
| Related CR | N/A (initial version) |
| Product capability | CAP-002 Student lifecycle |
| PRD requirements | REQ-002, NFR-001 |
| Depends on | FEAT-001 (authenticated School Admin), `docs/database.md` (students, academic years) |
| Guideline baseline | 1.0.0 |

## 1. Problem and value

School Admins enroll students manually across spreadsheets, causing inconsistent IDs, under-age placements and no audit trail. Success: every enrolled student has exactly one immutable, tenant-scoped admission number and every enrollment is auditable.

## 2. Scope and non-goals

| In scope | Out of scope |
|---|---|
| Single-student enrollment by a School Admin | Bulk CSV import (future FEAT) |
| Admission number generation | Fee assignment (separate FEAT) |
| Grade-level age policy check | Student self-registration |

## 3. Functional requirements

| ID | Requirement | Source |
|---|---|---|
| FR-FEAT002-01 | The system MUST assign each new student an immutable admission number `ADM-{YEAR}-{SEQUENCE:04d}`, sequential and unique per tenant. | REQ-002 |
| FR-FEAT002-02 | The system MUST reject an enrollment whose student age is below the grade level's minimum age with HTTP `422`. | REQ-002 |
| FR-FEAT002-03 | The system MUST write an immutable audit log entry `student.enrolled` with actor, tenant and timestamp. | REQ-002 |

## 4. Journeys and states

- **Primary:** Admin opens form → submits → success with admission number.
- **Validation error:** age below grade minimum or missing required fields → inline field errors (`422`).
- **Empty state:** no active academic year configured → form disabled with a setup link.

## 5. Contracts

- `POST /api/v1/students` — canonical definition in `docs/apis.md`.
- `students` table with unique index `(tenant_id, admission_number)`; `audit_log` table — canonical definition in `docs/database.md`.

## 6. Quality requirements

| ID | Requirement | Measure / threshold |
|---|---|---|
| NFR-FEAT002-01 | Tenant isolation | Every query filtered by `tenant_id` (PostgreSQL RLS); cross-tenant access test passes |
| NFR-FEAT002-02 | Sequence concurrency | 50 concurrent enrollments produce 50 unique, gap-free numbers |
| NFR-FEAT002-03 | Accessibility | Form meets `docs/accessibility.md` target (WCAG 2.2 AA) |

## 7. Acceptance criteria

### AC-FEAT002-01: Enrollment assigns a unique sequential admission number

- **Given** tenant A in academic year 2026 with no prior enrollments
- **When** an Admin of tenant A enrolls a valid student
- **Then** the response is `201` and the admission number is `ADM-2026-0001`; the next enrollment receives `ADM-2026-0002`, also under 50 concurrent requests
- **Covers:** FR-FEAT002-01, NFR-FEAT002-02

### AC-FEAT002-02: Under-age student is rejected

- **Given** grade 1 requires a minimum age of 6 on the academic year start date
- **When** an Admin enrolls a 5-year-old into grade 1
- **Then** the response is `422` with a field error on `date_of_birth` and nothing is persisted
- **Covers:** FR-FEAT002-02

### AC-FEAT002-03: Enrollment data is tenant-isolated

- **Given** a student enrolled by tenant A
- **When** an Admin of tenant B lists or fetches students
- **Then** the tenant A student is never returned (list excludes it; direct fetch returns `404`)
- **Covers:** NFR-FEAT002-01

### AC-FEAT002-04: Enrollment writes an immutable audit entry

- **Given** a successful enrollment
- **When** the audit log is queried
- **Then** exactly one `student.enrolled` entry exists with actor, tenant and timestamp, and update/delete attempts on it are rejected
- **Covers:** FR-FEAT002-03

## 8. Verification mapping

| AC | Test ID | Level | Test location | Evidence |
|---|---|---|---|---|
| AC-FEAT002-01 | TEST-FEAT002-01 | Unit + integration | `tests/unit/student-enrollment.test.[ext]` | CI run link |
| AC-FEAT002-02 | TEST-FEAT002-02 | Unit | `tests/unit/student-enrollment.test.[ext]` | CI run link |
| AC-FEAT002-03 | TEST-FEAT002-03 | Integration | `tests/integration/students/tenant-isolation.test.[ext]` | CI run link |
| AC-FEAT002-04 | TEST-FEAT002-04 | Integration | `tests/integration/students/audit.test.[ext]` | CI run link |

## 9. Approval and change history

| Version | Date | Author | Change | Status | Approval / CR |
|---|---|---|---|---|---|
| 0.1.0 | [YYYY-MM-DD] | [Author] | Initial draft | DRAFT | — |
| 0.2.0 | [YYYY-MM-DD] | [Author] | Added concurrency and tenant-isolation criteria | IN REVIEW | — |

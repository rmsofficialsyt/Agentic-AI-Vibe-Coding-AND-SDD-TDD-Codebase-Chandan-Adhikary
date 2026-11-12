# Spec

> **Document class:** Living feature/specification  
> **Framework:** SDD  
> **Guideline baseline:** 1.0.0  
> **Status:** Template; project-specific content requires review  

## Purpose

SDD index of current approved feature contracts.

## Agent read trigger

**MUST** read or consult this file: At the start of every SDD task and after spec changes.

## Normative sections and rules

### 1. Baseline

- **MUST** — Record current approved feature IDs, exact versions, approvers and effective dates.

### 2. Catalog

- **MUST** — Link `docs/features/*` source files and label each with exactly one lifecycle status: `DRAFT`, `IN REVIEW`, `APPROVED`, `SUPERSEDED` or `DEPRECATED` (defined in `docs/features/README.md`).

| Feature | Title | Current version | Status | Approval | Effective date | Supersedes |
|---|---|---|---|---|---|---|
| FEAT-001 | User Authentication & RBAC (sample) | 1.0.0 | APPROVED (sample) | APR-SAMPLE-001 | [YYYY-MM-DD] | — |
| FEAT-002 | Student Enrollment (sample) | 0.2.0 | IN REVIEW | Pending | — | — |

### 3. No duplicate authority

- **MUST** — Summarize, never create a requirement that overrides feature specifications or API/data contracts.

### 4. Dependencies

- **MUST** — Link prerequisite specs, data models, API contracts and architecture decisions.

### 5. Active changes

- **MUST** — Link open change requests and approval records.

### 6. Consistency

- **MUST** — Flag conflicts, missing approvals and untestable criteria before implementation.

### 7. History

- **SHOULD** — Include version overview and superseded contract references.

## Evidence and change control

- **MUST** record owner, revision/date, relevant approval reference, and traceable evidence in the applicable project instantiation.
- **MUST** route changes to process rules through `docs/guideline-CHANGELOG.md` and formal baseline revision; route feature behavior through approved versioned specs and `docs/CHANGELOG.md`.
- **SHOULD** keep links to canonical artifacts instead of duplicating definitions.

## SDD enforcement

- **MUST** update this index in the same change that moves a feature to `APPROVED`, `SUPERSEDED` or `DEPRECATED`.
- **MUST** treat a mismatch between this index and a feature header as a blocking defect; the feature file and its approval record win.
- **MUST NOT** implement any feature that is absent from this index or not `APPROVED` here.

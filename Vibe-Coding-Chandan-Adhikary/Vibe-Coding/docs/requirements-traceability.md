# Requirements Traceability

> **Document class:** Living feature/specification  
> **Framework:** Vibe Coding  
> **Guideline baseline:** 1.0.0  
> **Status:** Template; project-specific content requires review  

## Purpose

Requirement-to-task-to-test-to-evidence traceability.

## Agent read trigger

**MUST** read or consult this file: Before planning, review, acceptance and release.

## Normative sections and rules

### 1. Identifiers

- **MUST** — Use the canonical identifier scheme below in every document, spec, task, test and commit/PR description. IDs are never reused or renumbered.

| Artifact | Pattern | Defined in | Example |
|---|---|---|---|
| Persona | `PER-##` | `docs/product.md` | `PER-01` |
| Product capability | `CAP-###` | `docs/product.md` | `CAP-002` |
| Product requirement | `REQ-###` | `docs/prd.md` | `REQ-014` |
| Product non-functional requirement | `NFR-###` | `docs/prd.md` | `NFR-003` |
| Feature contract | `FEAT-###` | `docs/features/` | `FEAT-002` |
| Feature functional requirement | `FR-FEAT###-##` | feature file §3 | `FR-FEAT002-01` |
| Feature non-functional requirement | `NFR-FEAT###-##` | feature file §6 | `NFR-FEAT002-02` |
| Acceptance criterion | `AC-FEAT###-##` | feature file §7 | `AC-FEAT002-03` |
| Test case | `TEST-FEAT###-##` | feature file §8 / test code | `TEST-FEAT002-03` |
| Task | `TASK-###` | `docs/task.md` | `TASK-021` |
| Change request | `CR-###` | `docs/changes/` | `CR-004` |
| Approval record | `APR-###` | `docs/approvals/` | `APR-007` |
| Architecture decision | `ADR-####` | `docs/adrs/` | `ADR-0003` |
| Product / delivery decision | `DEC-###` | `docs/decision-log.md` | `DEC-012` |
| Risk | `RISK-###` | `docs/risk-register.md` | `RISK-005` |
| Defect / incident | `ERR-###` | `docs/error-tracker.md` | `ERR-009` |

### 2. Matrix

- **MUST** — Map each approved requirement to source specification, acceptance criteria, implementing task and tests.

### 3. Contracts

- **MUST** — Link affected API, data, architecture and UI references where applicable.

### 4. Evidence

- **MUST** — Record test-run or reviewer evidence and current verification status.

### 5. Gaps

- **MUST** — Block approval if mandatory requirements have missing acceptance evidence or unauthorized behavior.

### 6. Automation

- **SHOULD** — Validate link completeness and superseded versions in CI.

## Traceability matrix template

Copy into the project instantiation and keep one row per acceptance criterion.

| CAP | REQ | FEAT (version) | AC | TASK | TEST | Status | Evidence |
|---|---|---|---|---|---|---|---|
| CAP-001 | REQ-001 | FEAT-001 (1.0.0) | AC-FEAT001-01 | TASK-001 | TEST-FEAT001-01 | Verified / Pending / Failing | [CI run or review link] |

- **MUST** show `Pending` until real evidence exists; never mark `Verified` from agent assertion alone.

## Evidence and change control

- **MUST** record owner, revision/date, relevant approval reference, and traceable evidence in the applicable project instantiation.
- **MUST** route changes to process rules through `docs/guideline-CHANGELOG.md` and formal baseline revision; route feature behavior through approved versioned specs and `docs/CHANGELOG.md`.
- **SHOULD** keep links to canonical artifacts instead of duplicating definitions.

## Vibe Coding interpretation

- **MAY** use provisional decisions in an isolated prototype, clearly marked `DRAFT`; **MUST** formalize and approve production-bound behavior before shipping.
- **MAY** leave TEST and evidence columns `Pending` for `PROTOTYPE` features; **MUST** complete them before release.

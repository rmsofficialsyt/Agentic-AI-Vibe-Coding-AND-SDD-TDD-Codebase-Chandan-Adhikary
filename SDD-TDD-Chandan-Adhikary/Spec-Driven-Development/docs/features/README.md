# Feature Specifications (`docs/features/`)

> **Document class:** Controlled process guideline  
> **Framework:** SDD  
> **Guideline baseline:** 1.0.0  
> **Status:** Template; project-specific content requires review  

## Purpose

`docs/features/` is the **only** location for versioned feature contracts. A repository-level `specs/` directory is not permitted. `docs/spec.md` indexes the current approved version of every feature; it never overrides a feature file.

Hierarchy: `docs/product.md` (capabilities `CAP-###`) → `docs/prd.md` (requirements `REQ-###`) → `docs/features/` (contracts `FEAT-###`) → tests → code.

## Agent read trigger

**MUST** read this file before creating, renaming, versioning or validating any feature specification.

## Normative sections and rules

### 1. Location and naming

- **MUST** store every feature contract under `docs/features/`, numbered sequentially with three digits: `001`, `002`, …
- **MUST** use lowercase kebab-case names: `NNN-short-name`.
- **MUST NOT** reuse or renumber a feature number, even after deprecation.

### 2. Formats (choose per feature during Prompt 3 — Specification Approval)

| Format | Layout | Use when |
|---|---|---|
| **Flat** | `docs/features/NNN-name.md` — one file containing all template sections | Small/medium features |
| **Modular** | `docs/features/NNN-name/feature.md` (sections 1–6, 9), `acceptance.md` (section 7), `test-plan.md` (section 8) | Complex features needing isolated context |

- **MUST** start from `FEATURE-TEMPLATE.md`; a modular feature splits the same sections across its three files.
- **MUST** keep the metadata header (ID, version, status, owner, approver, approval reference, links) in the flat file or in `feature.md`.

### 3. Status lifecycle

```text
DRAFT ──► IN REVIEW ──► APPROVED ──► SUPERSEDED (by a newer approved version)
  ▲            │            └──────► DEPRECATED (capability retired)
  └── changes ─┘
```

| Status | Meaning | Implementation allowed? |
|---|---|---|
| `DRAFT` | Being written | No |
| `IN REVIEW` | Submitted for approval | No (tests may be drafted) |
| `APPROVED` | Signed off; approval record exists in `docs/approvals/` | Yes — exactly this version |
| `SUPERSEDED` | Replaced by a newer approved version | No new work |
| `DEPRECATED` | Capability retired | Removal work only |

- **MUST** use exactly these status values in feature headers and in `docs/spec.md`.
- **MUST** change an `APPROVED` feature only through `docs/change-control.md` (CR in `docs/changes/`, approval in `docs/approvals/`) and a version increment.

### 4. Identifier scheme

Defined canonically in `docs/requirements-traceability.md`. Feature-scoped IDs embed the feature number:

| Artifact | Pattern | Example |
|---|---|---|
| Feature | `FEAT-###` | `FEAT-002` |
| Functional requirement | `FR-FEAT###-##` | `FR-FEAT002-01` |
| Non-functional requirement | `NFR-FEAT###-##` | `NFR-FEAT002-01` |
| Acceptance criterion | `AC-FEAT###-##` | `AC-FEAT002-03` |
| Test case | `TEST-FEAT###-##` | `TEST-FEAT002-03` |

- **MUST** reference the AC ID in the name or description of every test that verifies it.
- **MUST** trace each feature to at least one `CAP-###` in `docs/product.md` and one `REQ-###` in `docs/prd.md`.

### 5. Versioning

- **MUST** use semantic versions: MAJOR for behavior-breaking changes, MINOR for additive behavior, PATCH for clarifications without behavior change.
- **MUST** record every version in the feature's change history.

## Files in this directory

- `FEATURE-TEMPLATE.md` — canonical template (copy, never edit in place for a feature).
- `001-example-feature/` — **sample** of the modular format (authentication).
- `002-student-enrollment.md` — **sample** of the flat format (student enrollment).

Samples are illustrative only. **MUST NOT** implement a sample unless the project owner adopts it through a project-specific approval record.

## Evidence and change control

- **MUST** record owner, revision/date, relevant approval reference, and traceable evidence in the applicable project instantiation.
- **MUST** route changes to process rules through `docs/guideline-CHANGELOG.md` and formal baseline revision; route feature behavior through approved versioned specs and `docs/CHANGELOG.md`.
- **SHOULD** keep links to canonical artifacts instead of duplicating definitions.

## SDD enforcement

- **MUST** stop implementation if the target feature is not `APPROVED` or the approved version differs from the one cited in the task.
- **MUST** fail `/spec-check-ca-agent` when a feature lacks AC IDs, Given/When/Then cases, AC→TEST mapping or a linked approval record.

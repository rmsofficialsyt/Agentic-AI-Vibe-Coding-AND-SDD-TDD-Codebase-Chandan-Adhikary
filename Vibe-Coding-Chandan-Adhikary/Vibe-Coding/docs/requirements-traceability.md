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

- **MUST** — Use stable REQ, FEAT, AC, TASK, TEST and CR IDs.

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

## Evidence and change control

- **MUST** record owner, revision/date, relevant approval reference, and traceable evidence in the applicable project instantiation.
- **MUST** route changes to process rules through `docs/guideline-CHANGELOG.md` and formal baseline revision; route feature behavior through approved versioned specs and `docs/CHANGELOG.md`.
- **SHOULD** keep links to canonical artifacts instead of duplicating definitions.

## Vibe Coding interpretation

- **MAY** use provisional decisions in an isolated prototype, clearly marked `DRAFT`; **MUST** formalize and approve production-bound behavior before shipping.

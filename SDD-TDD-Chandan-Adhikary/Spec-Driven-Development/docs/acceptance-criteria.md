# Acceptance Criteria

> **Document class:** Living feature/specification  
> **Framework:** SDD  
> **Guideline baseline:** 1.0.0  
> **Status:** Template; project-specific content requires review  

## Purpose

Standards for objective verification.

## Agent read trigger

**MUST** read or consult this file: When writing requirements, tests or confirming completion.

## Normative sections and rules

### 1. Clarity

- **MUST** — Make each criterion atomic, observable, unambiguous and tied to one requirement ID.

### 2. Cases

- **MUST** — Include success, negative, boundary, authorization and recovery conditions where relevant.

### 3. Format

- **SHOULD** — Use Given/When/Then with concrete inputs and expected results.

### 4. Quality attributes

- **MUST** — Add applicable performance, accessibility, security, privacy and error handling thresholds.

### 5. Evidence

- **MUST** — Identify verification method, owner and release-blocking status.

### 6. Deviations

- **MUST** — Document rejected, unmet or not-applicable criteria and approval rationale.

### 7. Non-deterministic outputs

- **MUST** — For AI/ML or other non-deterministic behavior, define evaluation datasets and pass thresholds instead of exact-match assertions.

### 8. Immutability

- **MUST** — Change an approved acceptance criterion only through a new feature version; never edit it in place.

## Instantiation template

Copy into the project instantiation (below this section or into a dedicated file) and replace every placeholder. Keep IDs from `docs/requirements-traceability.md`.

```markdown
### AC-FEAT###-##: [Short title]

- **Given** [precondition / state]
- **When** [single action or event]
- **Then** [observable, objectively checkable result]
- **Covers:** FR-FEAT###-## / NFR-FEAT###-##
- **Verified by:** TEST-FEAT###-## ([unit | integration | e2e | manual with evidence])

Quality checklist: one behavior per AC · measurable result · includes negative/edge cases · no implementation details.
```

## Evidence and change control

- **MUST** record owner, revision/date, relevant approval reference, and traceable evidence in the applicable project instantiation.
- **MUST** route changes to process rules through `docs/guideline-CHANGELOG.md` and formal baseline revision; route feature behavior through approved versioned specs and `docs/CHANGELOG.md`.
- **SHOULD** keep links to canonical artifacts instead of duplicating definitions.

## SDD enforcement

- **MUST** reject any acceptance criterion without an `AC-FEAT###-##` ID, Given/When/Then form and a mapped `TEST-FEAT###-##` before the feature can move to `APPROVED`.
- **MUST** treat a changed acceptance criterion on an `APPROVED` feature as a change request (`docs/change-control.md`).

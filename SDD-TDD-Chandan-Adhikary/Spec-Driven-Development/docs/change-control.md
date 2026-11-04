# Change Control

> **Document class:** Controlled process guideline  
> **Framework:** SDD  
> **Guideline baseline:** 1.0.0  
> **Status:** Template; project-specific content requires review  

## Purpose

No-exception governed change workflow for SDD.

## Agent read trigger

**MUST** read or consult this file: When any approved feature behavior or interface changes.

## Normative sections and rules

### 1. Intake

- **MUST** — Create a CR with ID, what, why, requestor, date and affected approved version.

### 2. Impact

- **MUST** — Assess architecture, data migration, API compatibility, tests, security/privacy, dependencies and milestones.

### 3. Decision

- **MUST** — Record approval or rejection by authorized owner before modifying approved baseline.

### 4. Spec before tests

- **MUST** — Update and version the approved feature spec before writing new expectations.

### 5. Tests before code

- **MUST** — Write/update tests to express approved new behavior; capture expected red result before implementation.

### 6. Implementation

- **MUST** — Limit code changes to approved spec and task boundaries.

### 7. Verification

- **MUST** — Pass relevant quality gates and verify no unapproved functional change.

### 8. Closure

- **MUST** — Record change and version in product CHANGELOG and link evidence.

### 9. Policy conflicts

- **MUST** — Stop and propose a distinct approved guideline revision if the request contradicts rules.

### 10. Emergency

- **MUST** — Use an explicitly approved expedited path preserving traceability, validation and subsequent closure.

## Evidence and change control

- **MUST** record owner, revision/date, relevant approval reference, and traceable evidence in the applicable project instantiation.
- **MUST** route changes to process rules through `docs/guideline-CHANGELOG.md` and formal baseline revision; route feature behavior through approved versioned specs and `docs/CHANGELOG.md`.
- **SHOULD** keep links to canonical artifacts instead of duplicating definitions.

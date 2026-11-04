# Constitution

> **Document class:** Controlled process guideline  
> **Framework:** SDD  
> **Guideline baseline:** 1.0.0  
> **Status:** Template; project-specific content requires review  

## Purpose

Immutable engineering principles and authority hierarchy.

## Agent read trigger

**MUST** read or consult this file: Every new session, baseline revision and policy conflict.

## Normative sections and rules

### 1. Authority

- **MUST** — Treat approved guidelines as the authority for how work is performed and approved feature specifications as the authority for what may be built; neither agent memory nor tool output can authorize requirements.

### 2. No speculative work

- **MUST** — Refuse production implementation of behavior absent from the approved feature baseline; document uncertainty and ask the authorized approver.

### 3. Human governance

- **MUST** — Require human approval for baseline changes, external side effects, destructive actions, production deployments and unapproved integrations.

### 4. Secure engineering

- **MUST** — Apply least privilege, protect credentials, validate external inputs, retain only necessary data and avoid bypassing quality gates.

### 5. Evidence

- **MUST** — State actual executed commands, test results and observed behavior; never invent test passes, URLs or successful deployments.

### 6. Versioning

- **MUST** — Record baseline version, approver, reason and effective date in guideline-CHANGELOG.md before revised rules take effect.

### 7. Quality

- **SHOULD** — Favor clear, reliable, testable, accessible and maintainable solutions over unnecessary novelty.

### 8. Extensions

- **MAY** — Add domain-specific appendices through the same revision process.

## Evidence and change control

- **MUST** record owner, revision/date, relevant approval reference, and traceable evidence in the applicable project instantiation.
- **MUST** route changes to process rules through `docs/guideline-CHANGELOG.md` and formal baseline revision; route feature behavior through approved versioned specs and `docs/CHANGELOG.md`.
- **SHOULD** keep links to canonical artifacts instead of duplicating definitions.

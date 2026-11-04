# Code Testing

> **Document class:** Controlled process guideline  
> **Framework:** Vibe Coding  
> **Guideline baseline:** 1.0.0  
> **Status:** Template; project-specific content requires review  

## Purpose

Project test pyramid and TDD release gate.

## Agent read trigger

**MUST** read or consult this file: Before tests, production changes, bugfix and PR acceptance.

## Normative sections and rules

### 1. TDD sequence

- **MUST** — Derive tests from approved spec, observe targeted failure, implement minimum code, observe passing tests and refactor safely.

### 2. Unit

- **MUST** — Test critical pure logic, validation, boundary and failure behavior.

### 3. Integration

- **MUST** — Test important service, data, queue, auth and external adapter boundaries.

### 4. Contracts

- **MUST** — Test changed API and event contracts where present.

### 5. E2E

- **MUST** — Cover approved critical user journeys including key unhappy paths.

### 6. Security/UX

- **MUST** — Apply privacy, accessibility, performance and security tests proportionate to spec/risk.

### 7. Isolation

- **MUST** — Use deterministic fixtures, reproducible environment and explicit treatment of flaky tests.

### 8. Coverage

- **MUST** — Approve numeric targets by project; 80% overall and 90% changed-code are suggested starting thresholds, not substitute for behavioral tests.

### 9. Traceability

- **MUST** — Link test IDs to criteria and store execution evidence.

### 10. ML

- **MUST** — For ML define dataset leakage checks, reproducibility, offline metrics, robustness, monitoring and regression thresholds.

### 11. Failures

- **MUST** — Investigate and fix failed blocking tests; no fabricated success or blanket skip.

## Evidence and change control

- **MUST** record owner, revision/date, relevant approval reference, and traceable evidence in the applicable project instantiation.
- **MUST** route changes to process rules through `docs/guideline-CHANGELOG.md` and formal baseline revision; route feature behavior through approved versioned specs and `docs/CHANGELOG.md`.
- **SHOULD** keep links to canonical artifacts instead of duplicating definitions.

## Vibe Coding interpretation

- **MAY** use provisional decisions in an isolated prototype, clearly marked `DRAFT`; **MUST** formalize and approve production-bound behavior before shipping.

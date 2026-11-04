# Error Tracker

> **Document class:** Living feature/specification  
> **Framework:** SDD  
> **Guideline baseline:** 1.0.0  
> **Status:** Template; project-specific content requires review  

## Purpose

Recurring defect prevention and failure history.

## Agent read trigger

**MUST** read or consult this file: At errors, regressions and incident reviews.

## Normative sections and rules

### 1. Record

- **MUST** — Use stable bug ID, date, affected version, severity, owner and status.

### 2. Reproduce

- **MUST** — Document steps, expected/actual behavior and safe logs/trace references.

### 3. Analysis

- **MUST** — Identify root cause and affected boundaries for significant defects.

### 4. Fix

- **MUST** — Link approved change, code references, regression test and CI evidence.

### 5. Prevention

- **MUST** — Document missing validation/monitoring and add preventative checks.

### 6. Closure

- **MUST** — Verify fix in representative environment and record reviewer/date.

### 7. Patterns

- **SHOULD** — Group repeated failures and review recurrence periodically.

## Evidence and change control

- **MUST** record owner, revision/date, relevant approval reference, and traceable evidence in the applicable project instantiation.
- **MUST** route changes to process rules through `docs/guideline-CHANGELOG.md` and formal baseline revision; route feature behavior through approved versioned specs and `docs/CHANGELOG.md`.
- **SHOULD** keep links to canonical artifacts instead of duplicating definitions.

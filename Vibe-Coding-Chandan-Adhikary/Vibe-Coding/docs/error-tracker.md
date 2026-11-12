# Error Tracker

> **Document class:** Living feature/specification  
> **Framework:** Vibe Coding  
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

### 8. Severity scale

- **MUST** — Define P0–P3 with examples and response targets (e.g. P0: production down or data loss — immediate; P3: cosmetic — next planned release).

### 9. Security defects

- **MUST** — Route suspected vulnerabilities through `docs/security.md` private disclosure; never record exploit details in a public tracker.

## Instantiation template

Copy into the project instantiation (below this section or into a dedicated file) and replace every placeholder. Keep IDs from `docs/requirements-traceability.md`.

```markdown
| ID | Date | Severity | Summary | Violated AC / spec gap | Root cause | Fix (commit / PR) | Regression test | Status |
|---|---|---|---|---|---|---|---|---|
| ERR-001 | YYYY-MM-DD | [P0] / [P1] / [P2] | [What failed] | AC-FEAT###-## or SPEC-GAP | [Cause] | [link] | TEST-FEAT###-## | ACTIVE / RESOLVED |
```

## Evidence and change control

- **MUST** record owner, revision/date, relevant approval reference, and traceable evidence in the applicable project instantiation.
- **MUST** route changes to process rules through `docs/guideline-CHANGELOG.md` and formal baseline revision; route feature behavior through approved versioned specs and `docs/CHANGELOG.md`.
- **SHOULD** keep links to canonical artifacts instead of duplicating definitions.

## Vibe Coding interpretation

- **MAY** use provisional decisions in an isolated prototype, clearly marked `DRAFT`; **MUST** formalize and approve production-bound behavior before shipping.
- **MUST** log prototype findings that will affect production design, even if the prototype is discarded.

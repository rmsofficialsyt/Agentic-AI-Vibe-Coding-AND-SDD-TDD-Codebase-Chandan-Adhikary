# Decision Log

> **Document class:** Living feature/specification  
> **Framework:** Vibe Coding  
> **Guideline baseline:** 1.0.0  
> **Status:** Template; project-specific content requires review  

## Purpose

Business, product and delivery decisions.

## Agent read trigger

**MUST** read or consult this file: Before changing resolved choices and at stakeholder approval.

## Normative sections and rules

### 1. Record

- **MUST** — Document decision ID, question, options, rationale, owner and date.

### 2. Impact

- **MUST** — Link affected tasks, specs, budgets, timelines or policies.

### 3. Status

- **MUST** — Distinguish proposed, accepted, superseded and rejected.

### 4. Traceability

- **SHOULD** — Link to architecture ADR for technical decisions.

### 5. Review

- **MUST** — Do not silently overwrite historical decisions; create superseding record.

## Evidence and change control

- **MUST** record owner, revision/date, relevant approval reference, and traceable evidence in the applicable project instantiation.
- **MUST** route changes to process rules through `docs/guideline-CHANGELOG.md` and formal baseline revision; route feature behavior through approved versioned specs and `docs/CHANGELOG.md`.
- **SHOULD** keep links to canonical artifacts instead of duplicating definitions.

## Vibe Coding interpretation

- **MAY** use provisional decisions in an isolated prototype, clearly marked `DRAFT`; **MUST** formalize and approve production-bound behavior before shipping.

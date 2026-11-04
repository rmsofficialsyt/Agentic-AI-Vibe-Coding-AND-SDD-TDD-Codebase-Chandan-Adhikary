# Risk Register

> **Document class:** Living feature/specification  
> **Framework:** Vibe Coding  
> **Guideline baseline:** 1.0.0  
> **Status:** Template; project-specific content requires review  

## Purpose

Delivery and technical risk tracking.

## Agent read trigger

**MUST** read or consult this file: During discovery, phase reviews and material changes.

## Normative sections and rules

### 1. Inventory

- **MUST** — Assign risk ID, category, owner, date, likelihood, impact and status.

### 2. Response

- **MUST** — Specify mitigations, contingency, thresholds and residual-risk acceptance.

### 3. Coverage

- **MUST** — Evaluate delivery, quality, security, privacy, operations, vendor and domain-specific risks.

### 4. Review

- **MUST** — Reassess before major milestones and architecture changes.

### 5. Indicators

- **SHOULD** — Add early warning signals and trigger thresholds.

## Evidence and change control

- **MUST** record owner, revision/date, relevant approval reference, and traceable evidence in the applicable project instantiation.
- **MUST** route changes to process rules through `docs/guideline-CHANGELOG.md` and formal baseline revision; route feature behavior through approved versioned specs and `docs/CHANGELOG.md`.
- **SHOULD** keep links to canonical artifacts instead of duplicating definitions.

## Vibe Coding interpretation

- **MAY** use provisional decisions in an isolated prototype, clearly marked `DRAFT`; **MUST** formalize and approve production-bound behavior before shipping.

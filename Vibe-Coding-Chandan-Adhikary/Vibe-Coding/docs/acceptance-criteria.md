# Acceptance Criteria

> **Document class:** Living feature/specification  
> **Framework:** Vibe Coding  
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

## Evidence and change control

- **MUST** record owner, revision/date, relevant approval reference, and traceable evidence in the applicable project instantiation.
- **MUST** route changes to process rules through `docs/guideline-CHANGELOG.md` and formal baseline revision; route feature behavior through approved versioned specs and `docs/CHANGELOG.md`.
- **SHOULD** keep links to canonical artifacts instead of duplicating definitions.

## Vibe Coding interpretation

- **MAY** use provisional decisions in an isolated prototype, clearly marked `DRAFT`; **MUST** formalize and approve production-bound behavior before shipping.

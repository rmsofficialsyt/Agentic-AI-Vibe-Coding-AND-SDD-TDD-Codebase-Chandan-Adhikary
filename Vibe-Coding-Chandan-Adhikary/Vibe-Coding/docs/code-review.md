# Code Review

> **Document class:** Controlled process guideline  
> **Framework:** Vibe Coding  
> **Guideline baseline:** 1.0.0  
> **Status:** Template; project-specific content requires review  

## Purpose

PR and design review acceptance standard.

## Agent read trigger

**MUST** read or consult this file: Before merge or release.

## Normative sections and rules

### 1. Scope

- **MUST** — Compare diff to approved task and spec version; flag extra behavior or unapproved dependencies.

### 2. Correctness

- **MUST** — Inspect logic, edge cases, errors, concurrency and regression risk.

### 3. Design

- **MUST** — Check layering, typing, naming, unnecessary complexity and relevant ADRs.

### 4. Security

- **MUST** — Review access checks, secrets, input boundaries, privacy and supply-chain implications.

### 5. Tests

- **MUST** — Inspect test-first evidence, assertions, meaningful coverage and actual CI results.

### 6. Nonfunctional

- **MUST** — Review accessibility, performance and operations as applicable.

### 7. Evidence

- **MUST** — Record findings with severity, remediation and independent approval for protected branches.

### 8. Documentation

- **MUST** — Confirm contracts, changelog, migrations and runbook updates.

### 9. AI

- **MAY** — Use assistant review as a supplement, not as a substitute for required review.

## Evidence and change control

- **MUST** record owner, revision/date, relevant approval reference, and traceable evidence in the applicable project instantiation.
- **MUST** route changes to process rules through `docs/guideline-CHANGELOG.md` and formal baseline revision; route feature behavior through approved versioned specs and `docs/CHANGELOG.md`.
- **SHOULD** keep links to canonical artifacts instead of duplicating definitions.

## Vibe Coding interpretation

- **MAY** use provisional decisions in an isolated prototype, clearly marked `DRAFT`; **MUST** formalize and approve production-bound behavior before shipping.

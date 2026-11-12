# Code Review

> **Document class:** Controlled process guideline  
> **Framework:** SDD  
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

### 10. AI-generated code

- **MUST** — Check AI-generated changes for hallucinated APIs or packages, unverifiable claims, over-broad edits and silently changed tests; the author discloses significant AI generation in the PR.

## Evidence and change control

- **MUST** record owner, revision/date, relevant approval reference, and traceable evidence in the applicable project instantiation.
- **MUST** route changes to process rules through `docs/guideline-CHANGELOG.md` and formal baseline revision; route feature behavior through approved versioned specs and `docs/CHANGELOG.md`.
- **SHOULD** keep links to canonical artifacts instead of duplicating definitions.

## SDD enforcement

- **MUST** reject a PR whose diff introduces behavior not covered by an `APPROVED` feature version or that lacks the AC→TEST evidence for the cited feature.
- **MUST** verify the PR cites the feature ID, version and task ID it implements.

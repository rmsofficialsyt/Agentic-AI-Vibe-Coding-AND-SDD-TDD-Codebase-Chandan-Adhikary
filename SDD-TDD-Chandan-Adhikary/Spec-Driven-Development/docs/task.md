# Task

> **Document class:** Living feature/specification  
> **Framework:** SDD  
> **Guideline baseline:** 1.0.0  
> **Status:** Template; project-specific content requires review  

## Purpose

Scoped, traceable units of work.

## Agent read trigger

**MUST** read or consult this file: Before assigning or implementing any feature task.

## Normative sections and rules

### 1. Identity

- **MUST** — Set task ID, owner, status, priority, feature ID and approved spec version.

### 2. Scope

- **MUST** — Record goal, in/out boundaries, allowed files and dependencies.

### 3. Acceptance

- **MUST** — Link requirement/acceptance IDs, expected tests and definition of done.

### 4. TDD

- **MUST** — Require failing test evidence before SDD production implementation.

### 5. Execution

- **MUST** — Record steps, commands actually run, test results, blockers and reviewer.

### 6. Status

- **SHOULD** — Use Backlog, Ready, In Progress, Blocked, Review and Done states.

## Evidence and change control

- **MUST** record owner, revision/date, relevant approval reference, and traceable evidence in the applicable project instantiation.
- **MUST** route changes to process rules through `docs/guideline-CHANGELOG.md` and formal baseline revision; route feature behavior through approved versioned specs and `docs/CHANGELOG.md`.
- **SHOULD** keep links to canonical artifacts instead of duplicating definitions.

## SDD enforcement

- **MUST** verify the latest approved feature spec version before changing implementation.
- **MUST** stop if this document conflicts with approved guidelines; pursue a guideline revision rather than an implicit exception.

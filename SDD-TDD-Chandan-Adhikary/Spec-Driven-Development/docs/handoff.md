# Handoff

> **Document class:** Controlled process guideline  
> **Framework:** SDD  
> **Guideline baseline:** 1.0.0  
> **Status:** Template; project-specific content requires review  

## Purpose

Verifiable project transfer to another engineer or team.

## Agent read trigger

**MUST** read or consult this file: At phase completion and ownership changes.

## Normative sections and rules

### 1. Scope

- **MUST** — Summarize delivered versus pending features and current approved versions.

### 2. Technical

- **MUST** — Link architecture, source, APIs, schema, setup and deployment procedures.

### 3. Evidence

- **MUST** — Attach test runs, review approvals, release status and unresolved defects.

### 4. Operations

- **MUST** — Document monitoring, runbooks, support and access transfer procedure without secrets.

### 5. Acceptance

- **MUST** — Record receiving owner, date, open items and sign-off.

## Evidence and change control

- **MUST** record owner, revision/date, relevant approval reference, and traceable evidence in the applicable project instantiation.
- **MUST** route changes to process rules through `docs/guideline-CHANGELOG.md` and formal baseline revision; route feature behavior through approved versioned specs and `docs/CHANGELOG.md`.
- **SHOULD** keep links to canonical artifacts instead of duplicating definitions.

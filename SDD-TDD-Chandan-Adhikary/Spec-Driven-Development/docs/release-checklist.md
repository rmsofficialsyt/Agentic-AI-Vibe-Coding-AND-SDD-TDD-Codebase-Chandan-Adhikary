# Release Checklist

> **Document class:** Controlled process guideline  
> **Framework:** SDD  
> **Guideline baseline:** 1.0.0  
> **Status:** Template; project-specific content requires review  

## Purpose

Evidence-based final ship/no-ship approval.

## Agent read trigger

**MUST** read or consult this file: Before every production release.

## Normative sections and rules

### 1. Scope

- **MUST** — Confirm exact release artifact, version and approved feature baseline.

### 2. Traceability

- **MUST** — Verify every release-blocking criterion and relevant requirement mapping.

### 3. CI

- **MUST** — Confirm build, test, code review, scans and policies actually passed.

### 4. Operational

- **MUST** — Confirm migrations, secrets, health checks, alerts, backups and rollback path.

### 5. Documentation

- **MUST** — Update product changelog, runbook and release notes.

### 6. Approval

- **MUST** — Obtain human release decision and record date, approver and evidence.

### 7. Aftercare

- **MUST** — Run post-release smoke checks and watch for regressions.

## Evidence and change control

- **MUST** record owner, revision/date, relevant approval reference, and traceable evidence in the applicable project instantiation.
- **MUST** route changes to process rules through `docs/guideline-CHANGELOG.md` and formal baseline revision; route feature behavior through approved versioned specs and `docs/CHANGELOG.md`.
- **SHOULD** keep links to canonical artifacts instead of duplicating definitions.

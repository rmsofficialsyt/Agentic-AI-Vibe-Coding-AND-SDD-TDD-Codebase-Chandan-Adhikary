# DevOps

> **Document class:** Controlled process guideline  
> **Framework:** SDD  
> **Guideline baseline:** 1.0.0  
> **Status:** Template; project-specific content requires review  

## Purpose

Git/PR/CI/CD engineering controls.

## Agent read trigger

**MUST** read or consult this file: During repository setup, PR, build and deployment.

## Normative sections and rules

### 1. Git

- **MUST** — Use protected branches, least-privilege access and identifiable task branches.

### 2. Commits

- **MUST** — Use agreed conventions with meaningful scope; avoid secret and generated-noise commits.

### 3. PR

- **MUST** — Link task, spec, change request, tests, reviewers and compatibility impacts.

### 4. CI

- **MUST** — Run formatting, lint/static analysis, tests, secret checks, relevant security scans and reproducible build.

### 5. Artifact

- **MUST** — Promote immutable tested artifacts, record provenance and use environment approval gates.

### 6. Secrets

- **MUST** — Use trusted CI secret store; limit permissions for pull-request workflows.

### 7. Deploy

- **MUST** — Document staging promotion, verification, monitoring and rollback/roll-forward path.

### 8. Templates

- **SHOULD** — Use platform-equivalent issue, codeowner, PR and CI configuration files.

### 9. No bypass

- **MUST** — Never use `--no-verify`, force-push to protected branches or disable required CI checks without a recorded approval.

## Evidence and change control

- **MUST** record owner, revision/date, relevant approval reference, and traceable evidence in the applicable project instantiation.
- **MUST** route changes to process rules through `docs/guideline-CHANGELOG.md` and formal baseline revision; route feature behavior through approved versioned specs and `docs/CHANGELOG.md`.
- **SHOULD** keep links to canonical artifacts instead of duplicating definitions.

## SDD enforcement

- **MUST** fail CI when `scripts/check_docs.py` or `scripts/manifest.py --check` fails, or when tests for cited ACs are missing.
- **MUST** require PR templates to cite feature ID/version, task ID and CR (if any).

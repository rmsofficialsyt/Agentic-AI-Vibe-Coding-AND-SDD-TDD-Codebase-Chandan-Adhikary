# Environments

> **Document class:** Controlled process guideline  
> **Framework:** SDD  
> **Guideline baseline:** 1.0.0  
> **Status:** Template; project-specific content requires review  

## Purpose

Reproducible environment and configuration register.

## Agent read trigger

**MUST** read or consult this file: During onboarding, tests, integrations and deployment.

## Normative sections and rules

### 1. Matrix

- **MUST** — Describe local, development, test, staging and production scopes as relevant.

### 2. Dependencies

- **MUST** — List runtime versions, system packages, build commands and service URLs as safe placeholders.

### 3. Variables

- **MUST** — Document required env names, validation, owners and secret classification without values.

### 4. Isolation

- **MUST** — Separate production and test access/data; use safe fixtures and permissions.

### 5. Drift

- **MUST** — Validate config consistency and record intentional environment differences.

### 6. Setup

- **MUST** — Provide steps for deterministic local startup and troubleshooting.

## Evidence and change control

- **MUST** record owner, revision/date, relevant approval reference, and traceable evidence in the applicable project instantiation.
- **MUST** route changes to process rules through `docs/guideline-CHANGELOG.md` and formal baseline revision; route feature behavior through approved versioned specs and `docs/CHANGELOG.md`.
- **SHOULD** keep links to canonical artifacts instead of duplicating definitions.

# Deployment

> **Document class:** Controlled process guideline  
> **Framework:** SDD  
> **Guideline baseline:** 1.0.0  
> **Status:** Template; project-specific content requires review  

## Purpose

Release execution and recovery contract.

## Agent read trigger

**MUST** read or consult this file: Before production changes or hosting configuration.

## Normative sections and rules

### 1. Targets

- **MUST** — Define environments, infrastructure, artifact version and owner.

### 2. Preflight

- **MUST** — Confirm approvals, tests, compatible configuration, migrations and restoration options.

### 3. Rollout

- **MUST** — Specify deploy method, health checks, traffic handling and abort thresholds.

### 4. Data

- **MUST** — Document safe migration sequencing, backups and forward/backward compatibility.

### 5. Post-deploy

- **MUST** — Run smoke/acceptance checks and review alerts and performance.

### 6. Recovery

- **MUST** — Define rollback/roll-forward commands, recovery owner and decision points.

### 7. Evidence

- **MUST** — Record release ID, timestamp, deployer, results and incidents.

## Evidence and change control

- **MUST** record owner, revision/date, relevant approval reference, and traceable evidence in the applicable project instantiation.
- **MUST** route changes to process rules through `docs/guideline-CHANGELOG.md` and formal baseline revision; route feature behavior through approved versioned specs and `docs/CHANGELOG.md`.
- **SHOULD** keep links to canonical artifacts instead of duplicating definitions.

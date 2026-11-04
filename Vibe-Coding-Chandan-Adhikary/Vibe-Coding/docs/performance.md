# Performance

> **Document class:** Controlled process guideline  
> **Framework:** Vibe Coding  
> **Guideline baseline:** 1.0.0  
> **Status:** Template; project-specific content requires review  

## Purpose

Performance constraints and regression methods.

## Agent read trigger

**MUST** read or consult this file: At architecture, performance testing and release.

## Normative sections and rules

### 1. Budgets

- **MUST** — Define project-appropriate response times, throughput, client experience, memory and availability targets.

### 2. Workloads

- **MUST** — Describe representative traffic, datasets, devices and test environments.

### 3. Evaluation

- **MUST** — Specify repeatable load, stress or soak checks as applicable and regression thresholds.

### 4. Remediation

- **MUST** — Track breaches to root cause, owner, decision and verification.

### 5. ML

- **MUST** — For model serving define inference latency, cost, memory and capacity objectives.

### 6. Optimization

- **SHOULD** — Measure bottlenecks before caching, parallelism or other performance changes.

## Evidence and change control

- **MUST** record owner, revision/date, relevant approval reference, and traceable evidence in the applicable project instantiation.
- **MUST** route changes to process rules through `docs/guideline-CHANGELOG.md` and formal baseline revision; route feature behavior through approved versioned specs and `docs/CHANGELOG.md`.
- **SHOULD** keep links to canonical artifacts instead of duplicating definitions.

## Vibe Coding interpretation

- **MAY** use provisional decisions in an isolated prototype, clearly marked `DRAFT`; **MUST** formalize and approve production-bound behavior before shipping.

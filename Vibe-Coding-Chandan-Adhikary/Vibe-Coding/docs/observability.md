# Observability

> **Document class:** Controlled process guideline  
> **Framework:** Vibe Coding  
> **Guideline baseline:** 1.0.0  
> **Status:** Template; project-specific content requires review  

## Purpose

Production metrics, logs, tracing and alerting.

## Agent read trigger

**MUST** read or consult this file: Before deployment and at incident response.

## Normative sections and rules

### 1. Signals

- **MUST** — Define critical logs, metrics, traces and correlation IDs appropriate to architecture.

### 2. Objectives

- **MUST** — Document service indicators, target thresholds and alert thresholds where applicable.

### 3. Privacy

- **MUST** — Redact secrets and sensitive data; define retention and access permissions.

### 4. Alerts

- **MUST** — Assign owner, routing, severity, thresholds and response runbook.

### 5. Verification

- **MUST** — Exercise key telemetry and alerts in staging or safe conditions.

### 6. LLM/ML

- **MUST** — Where relevant track evaluation drift, error rates, input/output risk and model/token cost.

## Evidence and change control

- **MUST** record owner, revision/date, relevant approval reference, and traceable evidence in the applicable project instantiation.
- **MUST** route changes to process rules through `docs/guideline-CHANGELOG.md` and formal baseline revision; route feature behavior through approved versioned specs and `docs/CHANGELOG.md`.
- **SHOULD** keep links to canonical artifacts instead of duplicating definitions.

## Vibe Coding interpretation

- **MAY** use provisional decisions in an isolated prototype, clearly marked `DRAFT`; **MUST** formalize and approve production-bound behavior before shipping.

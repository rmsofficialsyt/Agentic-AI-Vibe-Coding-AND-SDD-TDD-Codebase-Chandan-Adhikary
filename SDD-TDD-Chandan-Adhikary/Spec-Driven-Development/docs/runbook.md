# Runbook

> **Document class:** Controlled process guideline  
> **Framework:** SDD  
> **Guideline baseline:** 1.0.0  
> **Status:** Template; project-specific content requires review  

## Purpose

Incident response and operating procedures.

## Agent read trigger

**MUST** read or consult this file: At on-call handoff, alerts, maintenance and incidents.

## Normative sections and rules

### 1. Overview

- **MUST** — List services, dependencies, owners and relevant operational links.

### 2. Health

- **MUST** — Define health commands, dashboards, logs and normal thresholds.

### 3. Incidents

- **MUST** — Describe severity, triage, containment, escalation and communication.

### 4. Recovery

- **MUST** — Document deployment rollback, backup restoration and safe restart procedures.

### 5. Security

- **MUST** — Avoid embedding tokens/passwords; use controlled secret retrieval and incident evidence handling.

### 6. Follow-up

- **MUST** — Record postmortem actions and regression prevention.

## Evidence and change control

- **MUST** record owner, revision/date, relevant approval reference, and traceable evidence in the applicable project instantiation.
- **MUST** route changes to process rules through `docs/guideline-CHANGELOG.md` and formal baseline revision; route feature behavior through approved versioned specs and `docs/CHANGELOG.md`.
- **SHOULD** keep links to canonical artifacts instead of duplicating definitions.

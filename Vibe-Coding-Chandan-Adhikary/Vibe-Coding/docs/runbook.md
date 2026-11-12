# Runbook

> **Document class:** Controlled process guideline  
> **Framework:** Vibe Coding  
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

### 7. Severity and response

- **MUST** — Define severity levels (SEV1–SEV3) with acknowledgement, update and resolution targets and the on-call rota that owns them.

### 8. Communication

- **MUST** — Prepare status-update templates, stakeholder channels and the person authorized to communicate externally.

### 9. Drills

- **SHOULD** — Exercise rollback, backup restoration and the most critical runbooks periodically and record results and gaps.

## Instantiation template

Copy into the project instantiation (below this section or into a dedicated file) and replace every placeholder. Keep IDs from `docs/requirements-traceability.md`.

```markdown
### RB-###: [Symptom or alert name]

| Field | Value |
|---|---|
| Severity | SEV1 / SEV2 / SEV3 |
| Detection | [alert, metric, user report] |
| Affected features | FEAT-### |
| Owner / escalation | [on-call role] → [escalation contact] |

1. Triage: [commands / dashboards to check]
2. Mitigate: [safe, reversible steps]
3. Verify recovery: [objective check]
4. Rollback: [procedure] (see docs/deployment.md)
5. Follow-up: log ERR-### in docs/error-tracker.md and schedule the post-incident review
```

## Evidence and change control

- **MUST** record owner, revision/date, relevant approval reference, and traceable evidence in the applicable project instantiation.
- **MUST** route changes to process rules through `docs/guideline-CHANGELOG.md` and formal baseline revision; route feature behavior through approved versioned specs and `docs/CHANGELOG.md`.
- **SHOULD** keep links to canonical artifacts instead of duplicating definitions.

## Vibe Coding interpretation

- **MAY** use provisional decisions in an isolated prototype, clearly marked `DRAFT`; **MUST** formalize and approve production-bound behavior before shipping.
- **MUST** exclude prototypes from production on-call scope unless explicitly approved.

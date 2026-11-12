# Risk Register

> **Document class:** Living feature/specification  
> **Framework:** SDD  
> **Guideline baseline:** 1.0.0  
> **Status:** Template; project-specific content requires review  

## Purpose

Delivery and technical risk tracking.

## Agent read trigger

**MUST** read or consult this file: During discovery, phase reviews and material changes.

## Normative sections and rules

### 1. Inventory

- **MUST** — Assign risk ID, category, owner, date, likelihood, impact and status.

### 2. Response

- **MUST** — Specify mitigations, contingency, thresholds and residual-risk acceptance.

### 3. Coverage

- **MUST** — Evaluate delivery, quality, security, privacy, operations, vendor and domain-specific risks.

### 4. Review

- **MUST** — Reassess before major milestones and architecture changes.

### 5. Indicators

- **SHOULD** — Add early warning signals and trigger thresholds.

### 6. Scoring

- **MUST** — Define likelihood and impact scales (1–5) and an escalation threshold (e.g. score ≥ 15 is escalated to the sponsor within one working day).

### 7. Acceptance

- **MUST** — Residual risk may be accepted only by an authorized owner, with a recorded rationale and an expiry or review date.

### 8. Closure

- **MUST** — Close a risk only with evidence that the trigger can no longer occur or the mitigation is verified.

## Instantiation template

Copy into the project instantiation (below this section or into a dedicated file) and replace every placeholder. Keep IDs from `docs/requirements-traceability.md`.

```markdown
| ID | Risk (cause → event → impact) | Likelihood (1-5) | Impact (1-5) | Score | Owner | Mitigation / TASK | Trigger to watch | Status | Review date |
|---|---|---|---|---|---|---|---|---|---|
| RISK-001 | [cause] → [event] → [impact on FEAT-### / NFR] | 3 | 4 | 12 | [Name] | [action, TASK-###] | [signal] | Open / Mitigated / Accepted / Closed | YYYY-MM-DD |
```

## Evidence and change control

- **MUST** record owner, revision/date, relevant approval reference, and traceable evidence in the applicable project instantiation.
- **MUST** route changes to process rules through `docs/guideline-CHANGELOG.md` and formal baseline revision; route feature behavior through approved versioned specs and `docs/CHANGELOG.md`.
- **SHOULD** keep links to canonical artifacts instead of duplicating definitions.

## SDD enforcement

- **MUST** link risks that threaten approved behavior or NFRs to the affected `FEAT-###` and mitigating task.
- **MUST** raise a CR when a risk mitigation changes approved behavior.

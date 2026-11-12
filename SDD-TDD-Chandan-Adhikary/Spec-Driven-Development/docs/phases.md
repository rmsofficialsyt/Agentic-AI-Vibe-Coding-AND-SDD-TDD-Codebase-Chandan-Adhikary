# Phases

> **Document class:** Living feature/specification  
> **Framework:** SDD  
> **Guideline baseline:** 1.0.0  
> **Status:** Template; project-specific content requires review  

## Purpose

Release milestones and phase-level acceptance.

## Agent read trigger

**MUST** read or consult this file: During roadmapping and phase transitions.

## Normative sections and rules

### 1. Roadmap

- **MUST** — Define phases, goals, deliverables, owners, timeline and dependency sequence.

### 2. Exit gates

- **MUST** — Use explicit quality, product and security checks before advancing.

### 3. Risks

- **MUST** — Link blocked dependencies, contingencies and material changes.

### 4. Reporting

- **MUST** — Record planned versus actual progress and next approved milestone.

### 5. Template

- **SHOULD** — Start with Discovery, Foundation, Authentication, Core Features, Integrations, Hardening, Release and Handoff where applicable.

### 6. Scope change

- **MUST** — Adding or removing features from a phase in progress requires a change request (SDD) or a decision-log entry (Vibe Coding) before work continues.

### 7. Review

- **MUST** — Hold a demo and retrospective at each exit gate; record lessons in `docs/memory.md` and recurring defects in `docs/error-tracker.md`.

## Instantiation template

Copy into the project instantiation (below this section or into a dedicated file) and replace every placeholder. Keep IDs from `docs/requirements-traceability.md`.

```markdown
## Phase N: [Name] [BACKLOG | IN_PROGRESS | DONE]

| Field | Value |
|---|---|
| Goal | [Outcome this phase delivers] |
| Features in scope | FEAT-### (version), FEAT-### (version) |
| Entry criteria | [e.g. features APPROVED, environments ready] |
| Exit gate | [e.g. all ACs verified, release checklist passed] |
| Exit approval | [APR-### / DEC-###] |
| Target window | [YYYY-MM-DD → YYYY-MM-DD] (requires approval) |
```

## Evidence and change control

- **MUST** record owner, revision/date, relevant approval reference, and traceable evidence in the applicable project instantiation.
- **MUST** route changes to process rules through `docs/guideline-CHANGELOG.md` and formal baseline revision; route feature behavior through approved versioned specs and `docs/CHANGELOG.md`.
- **SHOULD** keep links to canonical artifacts instead of duplicating definitions.

## SDD enforcement

- **MUST** list, for each phase, the exact `FEAT-###` versions that must be `APPROVED` before the phase starts and verified before it exits.
- **MUST** record the phase exit approval (`APR-###`) before starting the next phase.

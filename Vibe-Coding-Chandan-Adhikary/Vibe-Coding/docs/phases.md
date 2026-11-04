# Phases

> **Document class:** Living feature/specification  
> **Framework:** Vibe Coding  
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

## Evidence and change control

- **MUST** record owner, revision/date, relevant approval reference, and traceable evidence in the applicable project instantiation.
- **MUST** route changes to process rules through `docs/guideline-CHANGELOG.md` and formal baseline revision; route feature behavior through approved versioned specs and `docs/CHANGELOG.md`.
- **SHOULD** keep links to canonical artifacts instead of duplicating definitions.

## Vibe Coding interpretation

- **MAY** use provisional decisions in an isolated prototype, clearly marked `DRAFT`; **MUST** formalize and approve production-bound behavior before shipping.

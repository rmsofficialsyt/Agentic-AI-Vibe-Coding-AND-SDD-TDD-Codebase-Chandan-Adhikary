# System Architecture

> **Document class:** Living feature/specification  
> **Framework:** Vibe Coding  
> **Guideline baseline:** 1.0.0  
> **Status:** Template; project-specific content requires review  

## Purpose

High- and low-level designs, boundaries and decisions.

## Agent read trigger

**MUST** read or consult this file: Before module creation, infrastructure or cross-cutting changes.

## Normative sections and rules

### 1. Context

- **MUST** — Define users, external systems, trust boundaries and deployment context.

### 2. HLD

- **MUST** — Describe major components, responsibilities, data flows and integration boundaries.

### 3. LLD

- **MUST** — Define module contracts, interfaces, state transitions, error paths and dependency directions.

### 4. Structure

- **MUST** — Document repository folders, package boundaries and rationale.

### 5. Reliability

- **MUST** — Define critical timeouts, retries, concurrency, idempotency and failure recovery.

### 6. Security

- **MUST** — Map identity, authorization, secrets and sensitive data flows.

### 7. Deployment

- **MUST** — Describe runtime, environments, storage and infrastructure assumptions.

### 8. Tradeoffs

- **MUST** — Link relevant ADRs and alternatives considered.

### 9. AI and ML

- **MUST** — When applicable detail datasets, pipelines, prompt/model versions, evaluations, inference, rollback and monitoring.

### 10. Diagrams

- **SHOULD** — Maintain system-context, sequence and deployment diagrams with versioned source.

## Evidence and change control

- **MUST** record owner, revision/date, relevant approval reference, and traceable evidence in the applicable project instantiation.
- **MUST** route changes to process rules through `docs/guideline-CHANGELOG.md` and formal baseline revision; route feature behavior through approved versioned specs and `docs/CHANGELOG.md`.
- **SHOULD** keep links to canonical artifacts instead of duplicating definitions.

## Vibe Coding interpretation

- **MAY** use provisional decisions in an isolated prototype, clearly marked `DRAFT`; **MUST** formalize and approve production-bound behavior before shipping.

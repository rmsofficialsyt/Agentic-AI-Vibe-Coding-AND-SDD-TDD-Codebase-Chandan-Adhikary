# Memory

> **Document class:** Living feature/specification  
> **Framework:** Vibe Coding  
> **Guideline baseline:** 1.0.0  
> **Status:** Template; project-specific content requires review  

## Purpose

Verified project-state recap, never source of new requirements.

## Agent read trigger

**MUST** read or consult this file: At session start and end; after approvals or incidents.

## Normative sections and rules

### 1. Metadata

- **MUST** — State last update, updater, guideline version and current approved feature baseline.

### 2. Progress

- **MUST** — Record active milestone, tasks, completed work and associated evidence.

### 3. Blockers

- **MUST** — Track unresolved questions, decisions, risks and current owners.

### 4. Next steps

- **MUST** — Distinguish next authorized action from proposed future work.

### 5. Reconciliation

- **MUST** — Re-check source files, approved specs, repository state and CI before relying on memory.

### 6. Confidentiality

- **MUST** — Do not store credentials, tokens or unnecessary personal data.

### 7. Compactness

- **SHOULD** — Link to canonical documents instead of duplicating policy or entire specs.

## Evidence and change control

- **MUST** record owner, revision/date, relevant approval reference, and traceable evidence in the applicable project instantiation.
- **MUST** route changes to process rules through `docs/guideline-CHANGELOG.md` and formal baseline revision; route feature behavior through approved versioned specs and `docs/CHANGELOG.md`.
- **SHOULD** keep links to canonical artifacts instead of duplicating definitions.

## Vibe Coding interpretation

- **MAY** use provisional decisions in an isolated prototype, clearly marked `DRAFT`; **MUST** formalize and approve production-bound behavior before shipping.

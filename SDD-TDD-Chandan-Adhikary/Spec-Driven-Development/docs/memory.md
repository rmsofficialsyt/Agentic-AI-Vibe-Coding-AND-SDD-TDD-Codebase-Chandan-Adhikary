# Memory

> **Document class:** Living feature/specification  
> **Framework:** SDD  
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

### 8. Staleness

- **MUST** — Remove or correct entries that are older than the current phase or contradicted by source documents; do not append contradictory notes.

### 9. Session handoff

- **MUST** — End every agent session by updating the next authorized action, open questions and evidence links.

## Instantiation template

Copy into the project instantiation (below this section or into a dedicated file) and replace every placeholder. Keep IDs from `docs/requirements-traceability.md`.

```markdown
| Field | Value |
|---|---|
| Last reconciled | YYYY-MM-DD by [agent/person] against commit [SHA] |
| Current phase | Phase N (docs/phases.md) |
| Active task | TASK-### for FEAT-### (version) |

### Verified facts (each with source link)
- [Fact] — source: [docs/... or commit]

### Open questions / assumptions
- [Question] — owner: [Name] — raised: YYYY-MM-DD

### Do not repeat (lessons)
- [Lesson] — see ERR-### / DEC-###
```

## Evidence and change control

- **MUST** record owner, revision/date, relevant approval reference, and traceable evidence in the applicable project instantiation.
- **MUST** route changes to process rules through `docs/guideline-CHANGELOG.md` and formal baseline revision; route feature behavior through approved versioned specs and `docs/CHANGELOG.md`.
- **SHOULD** keep links to canonical artifacts instead of duplicating definitions.

## SDD enforcement

- **MUST** reconcile memory against `docs/spec.md` and feature headers at the start of every session; on conflict the feature file wins.
- **MUST NOT** record new requirements here; route them to a CR.

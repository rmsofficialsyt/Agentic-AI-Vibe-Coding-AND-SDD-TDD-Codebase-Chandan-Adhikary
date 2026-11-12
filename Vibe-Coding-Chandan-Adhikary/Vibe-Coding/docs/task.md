# Task

> **Document class:** Living feature/specification  
> **Framework:** Vibe Coding  
> **Guideline baseline:** 1.0.0  
> **Status:** Template; project-specific content requires review  

## Purpose

Scoped, traceable units of work.

## Agent read trigger

**MUST** read or consult this file: Before assigning or implementing any feature task.

## Normative sections and rules

### 1. Identity

- **MUST** — Set task ID, owner, status, priority, feature ID and approved spec version.

### 2. Scope

- **MUST** — Record goal, in/out boundaries, allowed files and dependencies.

### 3. Acceptance

- **MUST** — Link requirement/acceptance IDs, expected tests and definition of done.

### 4. TDD

- **MUST** — Require failing test evidence before production-bound implementation of an `APPROVED` feature; prototype tasks are exempt but **MUST** be labelled `DRAFT`.

### 5. Execution

- **MUST** — Record steps, commands actually run, test results, blockers and reviewer.

### 6. Status

- **SHOULD** — Use Backlog, Ready, In Progress, Blocked, Review and Done states.

### 7. Size

- **MUST** — Keep each task small enough for one reviewable pull request; split larger work into dependent tasks.

### 8. Readiness

- **MUST** — Agents start only `READY` tasks whose dependencies are `DONE` and whose acceptance criteria are linked.

## Instantiation template

Copy into the project instantiation (below this section or into a dedicated file) and replace every placeholder. Keep IDs from `docs/requirements-traceability.md`.

```markdown
### TASK-###: [Short title] [BACKLOG] [P2]

| Field | Value |
|---|---|
| Feature | FEAT-### (version x.y.z) |
| Acceptance criteria | AC-FEAT###-##, AC-FEAT###-## |
| Owner | [agent / person] |
| Allowed files | [paths] |
| Definition of Done | Tests TEST-FEAT###-## red → green; review approved; docs synced |

- [ ] Write failing test TEST-FEAT###-## for AC-FEAT###-## in `tests/...`
- [ ] Implement minimal change in `src/...`
- [ ] Run suite and record evidence

Status values: BACKLOG, READY, IN_PROGRESS, BLOCKED, REVIEW, DONE (separate from feature lifecycle).
```

## Evidence and change control

- **MUST** record owner, revision/date, relevant approval reference, and traceable evidence in the applicable project instantiation.
- **MUST** route changes to process rules through `docs/guideline-CHANGELOG.md` and formal baseline revision; route feature behavior through approved versioned specs and `docs/CHANGELOG.md`.
- **SHOULD** keep links to canonical artifacts instead of duplicating definitions.

## Vibe Coding interpretation

- **MAY** use provisional decisions in an isolated prototype, clearly marked `DRAFT`; **MUST** formalize and approve production-bound behavior before shipping.
- **MUST** label prototype tasks `DRAFT` so they are never mistaken for authorized production work.

# Handoff

> **Document class:** Controlled process guideline  
> **Framework:** Vibe Coding  
> **Guideline baseline:** 1.0.0  
> **Status:** Template; project-specific content requires review  

## Purpose

Verifiable project transfer to another engineer or team.

## Agent read trigger

**MUST** read or consult this file: At phase completion and ownership changes.

## Normative sections and rules

### 1. Scope

- **MUST** — Summarize delivered versus pending features and current approved versions.

### 2. Technical

- **MUST** — Link architecture, source, APIs, schema, setup and deployment procedures.

### 3. Evidence

- **MUST** — Attach test runs, review approvals, release status and unresolved defects.

### 4. Operations

- **MUST** — Document monitoring, runbooks, support and access transfer procedure without secrets.

### 5. Acceptance

- **MUST** — Record receiving owner, date, open items and sign-off.

### 6. Access transfer

- **MUST** — Grant the receiving owner's access and revoke the departing party's accounts, tokens, CI secrets and MCP/connector credentials; record both actions.

### 7. Reproducibility

- **MUST** — The receiver runs the documented install, build and test commands on a clean environment and records the result before sign-off.

### 8. Known debt

- **MUST** — List technical debt, temporary workarounds, fragile areas and deferred decisions with links to their risks or tasks.

## Instantiation template

Copy into the project instantiation (below this section or into a dedicated file) and replace every placeholder. Keep IDs from `docs/requirements-traceability.md`.

```markdown
| Field | Value |
|---|---|
| From → To | [Name/team] → [Name/team] |
| Date | YYYY-MM-DD |
| Repository state | Branch [name] @ [commit SHA]; CI run [link] |

### Feature status
| Feature | Version | Status | Open ACs / known gaps |
|---|---|---|---|
| FEAT-### | x.y.z | APPROVED / IN REVIEW / DRAFT | [AC-FEAT###-## pending] |

### Open work
| Item | Type (TASK / CR / RISK / ERR) | Owner | Next action |
|---|---|---|---|

### Operational knowledge
- Run locally: [command]
- Secrets location (never the values): [vault/path]
- Runbook: docs/runbook.md · Dashboards: [links]
```

## Evidence and change control

- **MUST** record owner, revision/date, relevant approval reference, and traceable evidence in the applicable project instantiation.
- **MUST** route changes to process rules through `docs/guideline-CHANGELOG.md` and formal baseline revision; route feature behavior through approved versioned specs and `docs/CHANGELOG.md`.
- **SHOULD** keep links to canonical artifacts instead of duplicating definitions.

## Vibe Coding interpretation

- **MAY** use provisional decisions in an isolated prototype, clearly marked `DRAFT`; **MUST** formalize and approve production-bound behavior before shipping.
- **MUST** state which features are still `PROTOTYPE`/`DRAFT` and which are `APPROVED`.

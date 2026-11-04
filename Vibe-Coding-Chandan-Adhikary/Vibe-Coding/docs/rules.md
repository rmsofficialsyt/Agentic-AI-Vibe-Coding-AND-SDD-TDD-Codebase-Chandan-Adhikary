# Rules

> **Document class:** Controlled process guideline  
> **Framework:** Vibe Coding  
> **Guideline baseline:** 1.0.0  
> **Status:** Template; project-specific content requires review  

## Purpose

Enforceable engineering and AI-agent process baseline.

## Agent read trigger

**MUST** read or consult this file: Every session; before planning, editing, review and release.

## Normative sections and rules

### 1. Precedence

- **MUST** — Apply constitution and approved process policies to method; use newest approved feature specification for behavior; resolve contradictions before work.

### 2. Before coding

- **MUST** — Confirm objective, approved feature ID/version, acceptance criteria, task scope, architecture, allowed files and testing plan.

### 3. TDD

- **MUST** — For production change write/update test assertions from approved criteria, confirm red for intended reason, implement minimal solution, run green, then refactor with regression coverage.

### 4. Change procedure

- **MUST** — Log request with what/why/requester, assess architecture/data/API/tests/timeline, approve and version spec, update tests first, implement, pass gates, record changelog.

### 5. Coding conventions

- **MUST** — Use project-approved formatting, typing, naming and module boundaries; no hard-coded secrets, unsafe suppressed errors, or unreviewed dependency introductions.

### 6. Agent permissions

- **MUST** — Use least privilege; confirm before destructive operations, external messages, account changes, dependency installation or production writes.

### 7. Review

- **MUST** — Require verification against spec, automated checks, security and privacy review appropriate to risk, and authorized PR approval.

### 8. Reproducibility

- **MUST** — Pin dependencies; document environment variables with placeholders; avoid environment-specific undocumented assumptions.

### 9. Exceptions

- **MUST** — Escalate proposed framework changes, test skipping or policy conflicts as guideline revisions; no silent waivers.

### 10. Change isolation

- **SHOULD** — Prefer incremental diffs, protected branches, contract-first APIs and short-lived feature branches.

### 11. Observability

- **SHOULD** — Instrument failures and core flows with privacy-safe structured logs, metrics and tracing where relevant.

### 12. Experiments

- **MAY** — Allow disposable vibe prototypes based on provisional requirements if isolated from production and real sensitive information.

## Evidence and change control

- **MUST** record owner, revision/date, relevant approval reference, and traceable evidence in the applicable project instantiation.
- **MUST** route changes to process rules through `docs/guideline-CHANGELOG.md` and formal baseline revision; route feature behavior through approved versioned specs and `docs/CHANGELOG.md`.
- **SHOULD** keep links to canonical artifacts instead of duplicating definitions.

## Vibe Coding interpretation

- **MAY** use provisional decisions in an isolated prototype, clearly marked `DRAFT`; **MUST** formalize and approve production-bound behavior before shipping.

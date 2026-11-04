# Documentation Index — SDD

**MUST** start here before planning or development. Baseline: `1.0.0` (2026-11-04).

## Authority

1. `docs/constitution.md`, `docs/rules.md`: controlled process baseline.
2. Approved feature specifications and `docs/prd.md`: behavior (for SDD see `docs/spec.md` and `docs/features/`).
3. Architecture/data/API contracts and accepted ADRs: implementation boundaries.
4. `docs/task.md`: authorized work; `docs/memory.md`: context only.

**MUST** use `docs/` for all specifications; no `specs/` directory is permitted.

## File registry

- [`constitution.md`](constitution.md) — Immutable engineering principles and authority hierarchy.
- [`rules.md`](rules.md) — Enforceable engineering and AI-agent process baseline.
- [`prd.md`](prd.md) — Product requirements and measurable user outcomes.
- [`spec.md`](spec.md) — SDD index of current approved feature contracts.
- [`change-control.md`](change-control.md) — No-exception governed change workflow for SDD.
- [`requirements-traceability.md`](requirements-traceability.md) — Requirement-to-task-to-test-to-evidence traceability.
- [`acceptance-criteria.md`](acceptance-criteria.md) — Standards for objective verification.
- [`system-architecture.md`](system-architecture.md) — High- and low-level designs, boundaries and decisions.
- [`tech-stacks.md`](tech-stacks.md) — Approved technology inventory and decision rationale.
- [`design.md`](design.md) — UI, interaction and visual design contract.
- [`database.md`](database.md) — Persistence architecture, schema, migration and retention contract.
- [`apis.md`](apis.md) — Machine-checkable API and integration behavior contract.
- [`security.md`](security.md) — Security, privacy and legal applicability controls.
- [`code-testing.md`](code-testing.md) — Project test pyramid and TDD release gate.
- [`code-review.md`](code-review.md) — PR and design review acceptance standard.
- [`error-tracker.md`](error-tracker.md) — Recurring defect prevention and failure history.
- [`agents.md`](agents.md) — Multi-agent execution and delegation governance.
- [`memory.md`](memory.md) — Verified project-state recap, never source of new requirements.
- [`skills.md`](skills.md) — Registry of portable reusable agent skills.
- [`hooks.md`](hooks.md) — Event-driven agent and Git automation controls.
- [`plugins.md`](plugins.md) — Governance for code-agent plugins and extensions.
- [`connectors.md`](connectors.md) — MCP server and external-tool connector security/operations.
- [`accessibility.md`](accessibility.md) — Accessibility targets and validation.
- [`performance.md`](performance.md) — Performance constraints and regression methods.
- [`observability.md`](observability.md) — Production metrics, logs, tracing and alerting.
- [`devops.md`](devops.md) — Git/PR/CI/CD engineering controls.
- [`deployment.md`](deployment.md) — Release execution and recovery contract.
- [`environments.md`](environments.md) — Reproducible environment and configuration register.
- [`dependencies.md`](dependencies.md) — Third-party software and vendor governance.
- [`risk-register.md`](risk-register.md) — Delivery and technical risk tracking.
- [`decision-log.md`](decision-log.md) — Business, product and delivery decisions.
- [`task.md`](task.md) — Scoped, traceable units of work.
- [`phases.md`](phases.md) — Release milestones and phase-level acceptance.
- [`release-checklist.md`](release-checklist.md) — Evidence-based final ship/no-ship approval.
- [`runbook.md`](runbook.md) — Incident response and operating procedures.
- [`handoff.md`](handoff.md) — Verifiable project transfer to another engineer or team.

## Additional directories

- `docs/features/`: versioned feature contracts and acceptance criteria.
- `docs/adrs/`: architecture decisions.
- `docs/changes/`, `docs/approvals/`: SDD change and approval records where applicable.
- `docs/domains/`: optional controlled domain extensions.
- `playbooks/`: 11 operational workflow instructions.
- `agent/`: portable skills, commands, hook descriptions, templates; platform-specific adapters are not automatically enabled.

## Read matrix

- **MUST** read `AGENTS.md`, `docs/constitution.md`, `docs/rules.md`, current approved spec, task and applicable security/testing docs before code edits.
- **MUST** read release-checklist and devops/deployment docs before release.
- **MUST** reconcile `docs/memory.md` against source documents.

## IDE Compatibility & Agent Configuration

| Document | Category | Purpose | When to Read |
|---|---|---|---|
| [ide-compatibility.md](ide-compatibility.md) | Guidelines — Process Layer | Defines supported IDEs, agent instruction compatibility, IDE detection, skills, hooks, MCP connections, safe switching, configuration validation, and conflict resolution. | At agent initialization, when switching IDEs, when configuring agent tools, and before modifying IDE-specific configuration files. |

### Mandatory Rules

- **MUST** follow `ide-compatibility.md` when configuring or switching AI coding IDEs.
- **MUST** preserve existing IDE-specific configuration files.
- **MUST** verify compatibility before activating skills, hooks, plugins, MCP servers, or custom commands.
- **MUST NOT** automatically delete configuration files belonging to inactive IDEs.
- **MUST** maintain consistency with the project's approved guidelines and specifications.

**Document ID:** GL-IDE-001  
**Version:** 1.0.0  
**Status:** Proposed Guideline Baseline — Requires Approval
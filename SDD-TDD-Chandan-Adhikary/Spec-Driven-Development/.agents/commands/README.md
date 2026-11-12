# Portable Agent Commands (`-ca-agent`)

**Naming convention:** every custom command file uses the `<name>-ca-agent.md` suffix (e.g. `run-ca-agent.md`, `review-ca-agent.md`, `plan-ca-agent.md`) and is invoked as `/<name>-ca-agent`.

**File format:** each command starts with YAML frontmatter (`description:`, optional `argument-hint:`), followed by `# /<name>-ca-agent`, `**Purpose:**`, `## When to run`, the procedure, and the required evidence/output.

### Command collision prevention policy

**MUST NOT** name custom commands with generic tokens such as `/run`, `/plan`, `/test` or `/review`. AI coding IDEs (Cursor, Claude Code, Windsurf, Antigravity, OpenCode) reserve these tokens for host-level features. The explicit `-ca-agent` suffix guarantees:

1. Zero collisions with built-in IDE slash commands.
2. Predictable execution across multi-agent environments.
3. Complete portability between IDE adapters.

### Available commands (16)

| Command | Purpose |
|---|---|
| `/plan-ca-agent` | Scoped, read-only plan creation and architecture alignment. |
| `/run-ca-agent` | Documented local startup and runtime health verification. |
| `/tdd-ca-agent` | Red-Green-Refactor test-driven development workflow. |
| `/testing-ca-agent` | Targeted test execution and suite validation. |
| `/implement-ca-agent` | Scope-restricted feature implementation. |
| `/review-ca-agent` | Pre-commit code and contract review. |
| `/verify-ca-agent` | Objective quality-gate validation against specifications. |
| `/spec-check-ca-agent` | Feature specification compliance verification (`docs/features/`). |
| `/task-ca-agent` | Atomic task tracking and contract enforcement. |
| `/security-audit-ca-agent` | Vulnerability, credential and permission auditing. |
| `/release-check-ca-agent` | Production readiness and release-checklist gating. |
| `/change-request-ca-agent` | Formal change request and impact evaluation. |
| `/handoff-ca-agent` | Verifiable engineering handoff report generation. |
| `/errorlogs-ca-agent` | Structured runtime error and diagnostic log analysis. |
| `/gitlogs-ca-agent` | Git history, commit traceability and branch state verification. |
| `/dashboard-ca-agent` | Launch the local In-IDE Project-Manager-Dashboard (`Project-Manager-Dashboard/`). |

**Rule:** every command execution **MUST** record real command outputs, enforce human authorization and adhere to `docs/rules.md`.

# Portable Agent Commands (-ca-agent)

**Naming Convention:** All custom commands use the -ca-agent.md suffix (e.g., 
un-ca-agent.md, 
eview-ca-agent.md, plan-ca-agent.md).

### Command Collision Prevention Policy
**MUST NOT** name custom commands with generic tokens such as /run, /plan, /test, or /review. Modern AI coding IDEs (Cursor, Claude Code, Windsurf, Antigravity, OpenCode) reserve these tokens for host-level features. Naming our commands with the explicit -ca-agent suffix guarantees:
1. Zero collisions with built-in IDE slash commands.
2. Predictable execution across multi-agent environments.
3. Complete portability between different IDE adapters.

### Available Commands
- /plan-ca-agent — Scoped, read-only plan creation and architecture alignment.
- /run-ca-agent — Documented local startup and runtime health verification.
- /tdd-ca-agent — Red-Green-Refactor test-driven development workflow.
- /testing-ca-agent — Targeted test execution and suite validation.
- /implement-ca-agent — Scope-restricted feature implementation.
- /review-ca-agent — Pre-commit code and contract review.
- /verify-ca-agent — Objective quality gate validation against specifications.
- /spec-check-ca-agent — Feature specification compliance verification.
- /task-ca-agent — Atomic task tracking and contract enforcement.
- /security-audit-ca-agent — Vulnerability, credential, and permission auditing.
- /release-check-ca-agent — Production readiness and release checklist gating.
- /change-request-ca-agent — Formal change request and impact evaluation.
- /handoff-ca-agent — Verifiable engineering handoff report generation.
- /errorlogs-ca-agent — Structured runtime error and diagnostic log analysis.
- /gitlogs-ca-agent — Git history, commit traceability, and branch state verification.

**Rule:** Every command execution must record real command outputs, enforce human authorization, and strictly adhere to docs/rules.md.

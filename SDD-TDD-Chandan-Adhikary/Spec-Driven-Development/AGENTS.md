# AGENTS.md

> **Canonical specification:** this file, `docs/constitution.md` and `docs/rules.md` govern every AI coding agent session across Claude Code, Cursor, Windsurf, Antigravity, OpenCode, Codex, Trae, and VS Code.

- Autonomous, non-interactive agents (e.g. CI, batch runs) **MUST NOT** make speculative changes without human approval.
- An interactive agent working on a task **MUST** stop and ask when an edit touches protected policy (`docs/constitution.md`, `docs/rules.md`, `AGENTS.md`) or when an ambiguity affects architecture, security or data isolation.

**SDD rule:** only the latest `APPROVED` feature contract version (indexed in `docs/spec.md`, approval in `docs/approvals/`) authorizes behavior. There is no prototype exception.

Canonical `.agents/` contracts (`.agents/commands/`, `.agents/skills/`) serve as the universal cross-IDE source of truth; IDEs dynamically configure their own settings at runtime.

## Sovereign Agent Configuration & Commands

- **MUST** verify custom slash commands (`.agents/commands/*-ca-agent.md`) in the chat dropdown and terminal CLI before creating or altering application code.
- **MUST** preserve canonical project guidelines, approved specifications, and repository standards.
- **MUST** rely on canonical `AGENTS.md` and `.agents/` as the single source of truth across all coding platforms.
- **MUST NOT** assume external tools or uninstalled third-party skills exist.
- **MUST** request approval before modifying process guidelines or enabling external integrations.
- **SHOULD** maintain portability across Claude Code, Cursor, Windsurf, Antigravity, OpenCode, Trae, Codex, and terminal agents.

**Rule:** IDE switching must never silently change project specifications, engineering guidelines, testing policies, security controls, or repository structure.

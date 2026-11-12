# `.agents/` — Portable Agent Architecture & Assets

## Purpose

The `.agents/` directory houses portable capabilities, skills, commands, execution hooks and reporting templates for AI coding agents operating across any supported IDE.

## Directory structure

- `commands/` — 16 portable, collision-free agent commands named `<name>-ca-agent.md` (see `commands/README.md`).
- `skills/` — 18 domain-specific capability playbooks, each `skills/<name>/SKILL.md` with `name`/`description` frontmatter (including `andrej-karpathy-skill/`).
- `hooks/` — Lifecycle hook execution contracts (`HOOK-MATRIX.md`).
- `templates/` — Standardized reporting artifacts (`AGENT-TASK-CONTRACT.md`, `AGENT-COMPLETION-REPORT.md`).

## Collision prevention policy

**CRITICAL RULE:** assets within `.agents/` (commands, skills, hooks, templates) **MUST NOT** use names or identifiers that overlap or shadow native features of host coding IDEs (Cursor, Windsurf, Claude Code, Antigravity, OpenCode, VS Code, etc.).

- Commands **MUST** use the `-ca-agent` suffix (e.g. `/plan-ca-agent`, `/run-ca-agent`).
- Skills **MUST** reside in explicit subdirectories with a standardized `SKILL.md` definition whose `name` matches the folder.
- Hooks **MUST** declare execution criteria, timeouts and fallbacks in `hooks/HOOK-MATRIX.md`.

## Active agent activation

During project configuration (Prompt 2), the agent activates the relevant `.agents/` commands, hooks and skills for the active project tech stack and operational profile, following `docs/ide-compatibility.md`.

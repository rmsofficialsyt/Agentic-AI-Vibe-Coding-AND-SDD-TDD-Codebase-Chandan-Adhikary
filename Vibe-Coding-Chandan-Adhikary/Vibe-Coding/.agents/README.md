# `.agents/` — Portable Agent Architecture & Assets

## Purpose

The `.agents/` directory houses portable capabilities, skills, commands, execution hooks and reporting templates for AI coding agents operating across any supported IDE.

## Directory structure

- `commands/` — 16 canonical, collision-free agent commands named `<name>-ca-agent.md` (see `commands/README.md`).
- `workflows/` — Antigravity-native slash-command mirrors (`<name>-ca-agent.md`) synced from `commands/` so `/<name>-ca-agent` appears in the `/` dropdown.
- `skills/` — 18 domain-specific capability playbooks, each `skills/<name>/SKILL.md` with `name`/`description` frontmatter (including `andrej-karpathy-skill/`).
- `hooks.json` — Executable Antigravity lifecycle hooks (`SessionStart`, `PreToolUse`, `PostToolUse`) backed by `scripts/hooks/*.py`.
- `hooks/` — Lifecycle hook execution contracts (`HOOK-MATRIX.md`).
- `templates/` — Standardized reporting artifacts (`AGENT-TASK-CONTRACT.md`, `AGENT-COMPLETION-REPORT.md`).

## Collision prevention policy

**CRITICAL RULE:** assets within `.agents/` (commands, skills, hooks, templates) **MUST NOT** use names or identifiers that overlap or shadow native features of host coding IDEs (Cursor, Windsurf, Claude Code, Antigravity, OpenCode, VS Code, etc.).

- Commands **MUST** use the `-ca-agent` suffix (e.g. `/plan-ca-agent`, `/run-ca-agent`).
- Skills **MUST** reside in explicit subdirectories with a standardized `SKILL.md` definition whose `name` matches the folder.
- Hooks **MUST** declare execution criteria, timeouts and fallbacks in `hooks/HOOK-MATRIX.md`.

## Active agent activation & using in another project

When copying this framework into another project:
1. Place `.agents/` (and `AGENTS.md`, `docs/`, `scripts/`) at the **workspace/git root** — IDEs walk up to the repo root to discover `.agents/workflows/`, `.agents/skills/`, and `.agents/hooks.json`.
2. Run `python scripts/init_project.py --ides antigravity` (or `--ides all` / `--ides claude,cursor,windsurf,copilot`) to sync native adapters for your active IDE(s).
3. See `docs/ide-compatibility.md` for IDE-specific paths and Single-IDE vs. Multi-IDE coexistence rules.

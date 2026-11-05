# .agents/ — Portable Agent Architecture & Assets

## Purpose
The .agents/ directory houses portable capabilities, skills, commands, execution hooks, and reporting templates for AI coding agents operating across any supported IDE.

## Directory Structure
- commands/ — Portable, collision-free agent commands named with <name>-ca-agent.md.
- skills/ — Domain-specific capability playbooks and heuristics (including ndrej-karpathy-skill/).
- hooks/ — Lifecycle hook execution contracts (HOOK-MATRIX.md).
- 	emplates/ — Standardized reporting artifacts (AGENT-TASK-CONTRACT.md, AGENT-COMPLETION-REPORT.md).

## Collision Prevention Policy
**CRITICAL RULE:** Assets within .agents/ (commands, skills, hooks, templates) MUST NOT use names or identifiers that overlap or shadow pre-built, native features of host coding IDEs (Cursor, Windsurf, Claude Code, Antigravity, OpenCode, VS Code, etc.).
- Commands MUST use the -ca-agent suffix (e.g. /plan-ca-agent, /run-ca-agent).
- Skills MUST reside in explicit subdirectories with standardized SKILL.md definitions.
- Hooks MUST declare execution criteria, timeouts, and fallbacks in hooks/HOOK-MATRIX.md.

## Active Agent Activation
During project configuration (Prompt 2), the agent activates the relevant .agents/ custom slash commands, hooks, and skills specifically tailored to the active project tech stack and operational profile.

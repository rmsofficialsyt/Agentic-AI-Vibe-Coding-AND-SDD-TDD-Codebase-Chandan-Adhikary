# `.agents/` — Portable Autonomous Agent Assets & Engine
### Unified Cross-IDE Capability Layer for Spec-Driven Development (SDD-TDD)

<div align="center">

[![Agent Layer](https://img.shields.io/badge/Agent_Engine-Canonical_Source_of_Truth-blue?style=for-the-badge&logo=probot)](.)
[![Commands](https://img.shields.io/badge/Commands-16_Collision--Free_(ca--agent)-indigo?style=for-the-badge)](commands/README.md)
[![Skills](https://img.shields.io/badge/Skills-18_Deterministic_Playbooks-teal?style=for-the-badge)](skills/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](../LICENSE.md)

**Framework Track:** Spec-Driven Development · **Standard:** Cross-IDE Portability Release 2.0.0  
**Supported Hosts:** Claude Code · Cursor · Windsurf · Antigravity · OpenCode · Codex · VS Code

[🌟 Purpose](#-purpose) • [🏛️ Architecture](#️-agent-asset-architecture) • [🔄 Discovery Pipeline](#-multi-ide-discovery--dispatch-pipeline) • [🛡️ Collision Prevention](#️-collision-prevention-policy) • [📦 Activation](#-active-agent-activation)

</div>

---

## 🌟 Purpose

The `.agents/` directory is the single cross-IDE canonical source of truth for autonomous AI coding agents operating within this framework. It houses deterministic commands, executable skills, runtime lifecycle hooks, and reporting templates that function uniformly across all major AI code editors without vendor lock-in.

---

## 🏛️ Agent Asset Architecture

```mermaid
flowchart TD
    subgraph AgentsRoot [".agents/ Canonical Asset Store"]
        direction TB
        Commands["commands/<br/>(16 Collision-Free *-ca-agent.md Commands)"]
        Skills["skills/<br/>(18 Reusable Skills & core-engineering-skills)"]
        Hooks["hooks/ & hooks.json<br/>(SessionStart, PreToolUse, PostToolUse)"]
        Templates["templates/<br/>(Standardized Contracts & Completion Reports)"]
    end

    subgraph HostIDEs ["Supported AI Coding IDEs"]
        direction LR
        IDE1["Claude Code"]
        IDE2["Cursor / Windsurf"]
        IDE3["Antigravity"]
        IDE4["OpenCode / VS Code"]
    end

    AgentsRoot --> HostIDEs
```

---

## 🔄 Multi-IDE Discovery & Dispatch Pipeline

All supported IDEs discover `.agents/` by walking up the directory tree to the workspace root:

```mermaid
flowchart LR
    WorkspaceRoot["Workspace / Git Root<br/>(.agents/ Found)"] --> DiscoverCommands["Auto-Discover Commands<br/>(commands/*.md -> /<name>-ca-agent)"]
    WorkspaceRoot --> DiscoverSkills["Auto-Discover Skills<br/>(skills/*/SKILL.md)"]
    WorkspaceRoot --> DiscoverHooks["Bind Lifecycle Hooks<br/>(hooks.json -> scripts/hooks/*.py)"]

    DiscoverCommands --> IDEPalette["Exposed in AI Chat Dropdown<br/>(Typing '/' shows all 16 commands)"]
```

---

## 📁 Directory Structure

| Subdirectory / File | Purpose & Operational Contract |
| :--- | :--- |
| `commands/` | 16 canonical, collision-free agent commands named `<name>-ca-agent.md` (see [`commands/README.md`](commands/README.md)). |
| `workflows/` | Antigravity-native slash-command mirrors (`<name>-ca-agent.md`) synced from `commands/` so `/<name>-ca-agent` appears in the `/` dropdown. |
| `skills/` | 18 domain-specific capability playbooks, each `skills/<name>/SKILL.md` with standardized `name`/`description` frontmatter. |
| `hooks.json` | Executable Antigravity lifecycle hooks (`SessionStart`, `PreToolUse`, `PostToolUse`) backed by `scripts/hooks/*.py`. |
| `hooks/` | Lifecycle hook execution contracts and security matrices ([`hooks/HOOK-MATRIX.md`](hooks/HOOK-MATRIX.md)). |
| `templates/` | Standardized reporting artifacts (`AGENT-TASK-CONTRACT.md`, `AGENT-COMPLETION-REPORT.md`). |

---

## 🛡️ Collision Prevention Policy

> [!CRITICAL]
> Assets within `.agents/` (commands, skills, hooks, templates) **MUST NOT** use generic names or identifiers (such as `/run`, `/plan`, `/test` or `/review`) that overlap or shadow native features of host coding IDEs.

1. **Explicit Namespace:** Commands **MUST** use the `-ca-agent` suffix (e.g. `/plan-ca-agent`, `/run-ca-agent`, `/tdd-ca-agent`).
2. **Deterministic Skills:** Skills **MUST** reside in explicit subdirectories with a standardized `SKILL.md` definition whose `name` matches the directory.
3. **Execution Bounding:** Hooks **MUST** declare execution criteria, timeouts, and fallbacks in `hooks/HOOK-MATRIX.md`.

---

## 📦 Active Agent Activation

When copying this framework into another project:
1. Place `.agents/` (and `AGENTS.md`, `docs/`, `scripts/`) at the **workspace/git root**.
2. Run `python scripts/init_project.py --ides antigravity` (or `--ides all` / `--ides claude,cursor,windsurf,copilot`) to sync native adapters.
3. Verify that typing `/` in your chat palette displays all 16 custom `-ca-agent` commands.

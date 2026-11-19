# `.agents/` — Portable Autonomous Agent Assets & Engine
### Unified Cross-IDE Capability Layer for Vibe-Coding

<div align="center">

[![Agent Layer](https://img.shields.io/badge/Agent_Engine-Canonical_Source_of_Truth-purple?style=for-the-badge&logo=probot)](.)
[![Commands](https://img.shields.io/badge/Commands-16_Collision--Free_(ca--agent)-indigo?style=for-the-badge)](commands/README.md)
[![Skills](https://img.shields.io/badge/Skills-18_Deterministic_Playbooks-teal?style=for-the-badge)](skills/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](../LICENSE.md)

**Framework Track:** Vibe-Coding · **Standard:** Cross-IDE Portability Release 2.0.0  
**Supported Hosts:** Claude Code · Cursor · Windsurf · Antigravity · OpenCode · Codex · VS Code

[🌟 Purpose](#-purpose) • [🏛️ Architecture](#️-agent-asset-architecture) • [🔄 Discovery Pipeline](#-multi-ide-discovery--dispatch-pipeline) • [🛡️ Collision Prevention](#️-collision-prevention-policy) • [📦 Activation](#-active-agent-activation)

</div>

---

## 🌟 Purpose

The `.agents/` directory is the single cross-IDE canonical source of truth for autonomous AI coding agents operating within the Vibe-Coding framework. It houses deterministic commands, executable skills, runtime lifecycle hooks, and reporting templates that empower high-velocity visual prototyping and progressive hardening across all major AI code editors without vendor lock-in.

---

## 🏛️ Agent Asset Architecture

```mermaid
flowchart TD
    classDef asset fill:#2e1065,stroke:#c084fc,stroke-width:1.5px,color:#faf5ff;
    classDef ide fill:#0f172a,stroke:#38bdf8,stroke-width:1.5px,color:#f8fafc;

    subgraph AgentsRoot ["🛠️ .agents/ CANONICAL ASSET STORE"]
        direction TB
        Commands["<b>⚡ commands/ Catalog</b><br/><sub>16 Collision-Free *-ca-agent.md Commands</sub>"]:::asset
        Skills["<b>📚 skills/ Playbooks</b><br/><sub>18 Reusable Skills & core-engineering-skills</sub>"]:::asset
        Hooks["<b>🪝 hooks/ & hooks.json</b><br/><sub>SessionStart, PreToolUse, PostToolUse</sub>"]:::asset
        Templates["<b>📑 templates/ Contracts</b><br/><sub>Standardized Task & Completion Reports</sub>"]:::asset
    end

    subgraph HostIDEs ["🖥️ SUPPORTED AI CODING HOST IDES"]
        direction LR
        IDE1(["<b>Claude Code</b><br/><sub>Anthropic CLI</sub>"]):::ide
        IDE2(["<b>Cursor / Windsurf</b><br/><sub>VS Code Forks</sub>"]):::ide
        IDE3(["<b>Antigravity</b><br/><sub>Native Engine</sub>"]):::ide
        IDE4(["<b>OpenCode / VS Code</b><br/><sub>AI Extensions</sub>"]):::ide
    end

    AgentsRoot ==>|"Walk-Up Directory Discovery"| HostIDEs
```

---

## 🔄 Multi-IDE Discovery & Dispatch Pipeline

All supported IDEs discover `.agents/` by walking up the directory tree to the workspace root:

```mermaid
flowchart LR
    classDef root fill:#0f172a,stroke:#38bdf8,stroke-width:2px,color:#f8fafc;
    classDef disc fill:#2e1065,stroke:#c084fc,stroke-width:1.5px,color:#faf5ff;
    classDef ui fill:#064e3b,stroke:#34d399,stroke-width:2px,color:#ecfdf5;

    WorkspaceRoot[("<b>📁 Workspace / Git Root</b><br/><sub>.agents/ Asset Store Located</sub>")]:::root -->|"Discovers"| DiscoverCommands["<b>⚡ Parse Commands</b><br/><sub>commands/*.md -> /<name>-ca-agent</sub>"]:::disc
    WorkspaceRoot -->|"Discovers"| DiscoverSkills["<b>📚 Load Skills</b><br/><sub>skills/*/SKILL.md Playbooks</sub>"]:::disc
    WorkspaceRoot -->|"Discovers"| DiscoverHooks["<b>🪝 Bind Lifecycle Hooks</b><br/><sub>hooks.json -> scripts/hooks/*.py</sub>"]:::disc

    DiscoverCommands ==>|"Registers in Chat UI"| IDEPalette["<b>💬 AI Chat Palette Autocomplete</b><br/><sub>Typing '/' Displays All 16 Commands</sub>"]:::ui
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

1. **Explicit Namespace:** Commands **MUST** use the `-ca-agent` suffix (e.g. `/plan-ca-agent`, `/run-ca-agent`, `/implement-ca-agent`).
2. **Deterministic Skills:** Skills **MUST** reside in explicit subdirectories with a standardized `SKILL.md` definition whose `name` matches the directory.
3. **Execution Bounding:** Hooks **MUST** declare execution criteria, timeouts, and fallbacks in `hooks/HOOK-MATRIX.md`.

---

## 📦 Active Agent Activation

When copying this framework into another project:
1. Place `.agents/` (and `AGENTS.md`, `docs/`, `scripts/`) at the **workspace/git root**.
2. Run `python scripts/init_project.py --ides antigravity` (or `--ides all` / `--ides claude,cursor,windsurf,copilot`) to sync native adapters.
3. Verify that typing `/` in your chat palette displays all 16 custom `-ca-agent` commands.

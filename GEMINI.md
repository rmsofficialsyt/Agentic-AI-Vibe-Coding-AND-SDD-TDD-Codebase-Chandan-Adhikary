# GEMINI.md — Master Gemini & Antigravity Agent Configuration
### Autonomous Agent Governance, Dual-Track Architecture & Operational Contracts

> **Canonical System Instruction:** This document defines the primary behavioral contract and architectural entry point for Google Antigravity, Gemini CLI, and Gemini-powered autonomous coding agents operating within this repository.

---

## 1. Repository Dual-Track Architecture

This repository contains two independent, production-grade engineering framework blueprints:

```text
=============================================================================================
             TRACK 1: VIBE-CODING                            TRACK 2: SDD + TDD
---------------------------------------------   ---------------------------------------------
* Location: Vibe-Coding-Chandan-Adhikary/       * Location: SDD-TDD-Chandan-Adhikary/
            Vibe-Coding/                                    Spec-Driven-Development/
* Workflow: Fluid Prompts (Iterative Loops)     * Workflow: Formal Quality Gated Prompts
* Philosophy: Intuitive, visual, rapid UI        * Philosophy: Contract-first, zero regression
* Specs: Living 'docs/features/' contracts      * Specs: Formal 'docs/features/' (Flat/Modular)
* Testing: Visual runtime & sanity harnesses    * Testing: Test-First (TDD Red-Green-Refactor)
* Best For: Rapid SaaS MVPs, UI-heavy apps,     * Best For: Enterprise SaaS, multi-tenant core,
  consumer dashboards, interactive web tools      fintech, healthcare, mission-critical systems
=============================================================================================
```

When an agent session begins:
1. Identify which track the user is working in (or ask if ambiguous).
2. Defer to the track-specific `GEMINI.md` and `AGENTS.md`:
   - SDD-TDD: `SDD-TDD-Chandan-Adhikary/Spec-Driven-Development/GEMINI.md`
   - Vibe-Coding: `Vibe-Coding-Chandan-Adhikary/Vibe-Coding/GEMINI.md`

---

## 2. Core Operational Directives for Gemini Agents

### Directive 1: Never Code Speculatively
- **Do not start coding immediately.**
- Always execute the 5-step cyclic loop:
  1. **Reading Prompt:** Ingest requirements, scope, and constraints.
  2. **Analysis Prompt & Plan:** Deconstruct architectural impact, dependencies, and risk.
  3. **Check/Recheck `docs/` and `playbooks/`:** Review system architecture and rules.
  4. **Review `*.md` Guidelines:** Identify documents requiring project-specific updates.
  5. **Overwrite Full Guidelines:** Update living documentation before writing implementation code.
  6. **Spec-by-Spec Pacing:** Develop strictly one specification at a time.

### Directive 2: Mandatory Step 0 Slash Command Activation
Before creating any application code or directories:
- **Chat Dropdown:** Verify that all 16 `*-ca-agent` custom slash commands appear in the autocomplete palette when typing `/`.
- **Terminal CLI:** Verify command contracts exist via `ls .agents/commands/*-ca-agent.md`.

### Directive 3: Canonical Agent Authority
- `.agents/` is the sole cross-IDE source of truth for custom slash commands and skills.
- IDEs dynamically configure their own settings during deployment.
- External skills are **developer choice**: installed on-demand from GitHub, never forced or hardcoded.

### Directive 4: Single Canonical License
- The master license is `LICENSE.md` in the repository root (MIT License).

---

## 3. The 16 Collision-Free Slash Commands

All custom slash commands carry the `-ca-agent` namespace to guarantee zero collisions with IDE-reserved tokens:

| Slash Command | File Location | Operational Scope |
|---|---|---|
| `/plan-ca-agent` | `.agents/commands/plan-ca-agent.md` | Pre-development research, architecture proposal, and plan artifact generation in read-only mode. |
| `/run-ca-agent` | `.agents/commands/run-ca-agent.md` | Documented local startup and runtime verification; reports observed URLs. |
| `/tdd-ca-agent` | `.agents/commands/tdd-ca-agent.md` | Red-Green-Refactor test-driven implementation cycle; requires approved spec version and failing tests. |
| `/testing-ca-agent` | `.agents/commands/testing-ca-agent.md` | Targeted test suite execution and failure reporting without altering application code. |
| `/implement-ca-agent` | `.agents/commands/implement-ca-agent.md` | Scope-restricted feature implementation adhering strictly to approved specifications. |
| `/review-ca-agent` | `.agents/commands/review-ca-agent.md` | Pre-commit diff, lint, and security review to prevent unauthorized changes and secret leaks. |
| `/verify-ca-agent` | `.agents/commands/verify-ca-agent.md` | Objective quality gate verification against specifications and acceptance criteria. |
| `/spec-check-ca-agent` | `.agents/commands/spec-check-ca-agent.md` | Feature spec traceability and criteria check across `docs/features/` (Flat or Modular). |
| `/task-ca-agent` | `.agents/commands/task-ca-agent.md` | Atomic task execution and contract enforcement for isolated units of work. |
| `/security-audit-ca-agent` | `.agents/commands/security-audit-ca-agent.md` | SAST, secret leak, and dependency audit across the repository. |
| `/release-check-ca-agent` | `.agents/commands/release-check-ca-agent.md` | Final production gate and evidence-based ship/no-ship decision. |
| `/change-request-ca-agent` | `.agents/commands/change-request-ca-agent.md` | Formal change impact assessment and spec revision before modifying approved code. |
| `/handoff-ca-agent` | `.agents/commands/handoff-ca-agent.md` | Verifiable engineering handoff report generation for team transfers. |
| `/errorlogs-ca-agent` | `.agents/commands/errorlogs-ca-agent.md` | Structured runtime error and diagnostic log analysis. |
| `/gitlogs-ca-agent` | `.agents/commands/gitlogs-ca-agent.md` | Commit history and git traceability validation against authorized task IDs. |
| `/dashboard-ca-agent` | `.agents/commands/dashboard-ca-agent.md` | Launches the local-only, portable In-IDE Project-Manager-Dashboard (responsive across all monitor sizes, running task & HEAD commit on top). |

---

## 4. In-IDE Project-Manager-Dashboard

Both tracks feature the zero-dependency, Apple/Linear-inspired Bento Grid Mission Control:
- **100% Fluid & Portable:** Responsive across all resolutions (mobile to 4K Ultrawide).
- **Current Running Task Always on Top:** Actively running task (`Task 1`, `Task 2`, `IN_PROGRESS`, `RED_TEST_FAIL`, `RUNNING`) floats to index 0 with glowing `⚡ CURRENT RUNNING TASK` badge.
- **HEAD Git Commit Always on Top:** Latest commit pinned at top with `[HEAD / CURRENT COMMIT]` indicator.
- **Port:** `http://127.0.0.1:4200` (SDD) / `http://127.0.0.1:4201` (Vibe).

# AI-Powered Project Development Frameworks
### 2-in-1 Enterprise Architecture: Vibe-Coding & Spec-Driven Development (SDD + TDD)

<div align="center">

[![Framework](https://img.shields.io/badge/Framework-2--in--1_Dual--Track-blue?style=for-the-badge&logo=codewars)](.)
[![Release](https://img.shields.io/badge/Version-2.0.0_Universal-indigo?style=for-the-badge)](.)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE.md)
[![Security](https://img.shields.io/badge/Security-Enforced-red?style=for-the-badge)](.github/SECURITY.md)
[![Zero Dependencies](https://img.shields.io/badge/Dependencies-Zero_External-teal?style=for-the-badge)](.)

**Engineering Lead:** Chandan Adhikary · **Standard:** Production-Grade Universal Release  
**Supported Platforms:** Claude Code · Cursor · Windsurf · Antigravity · OpenCode · Codex · Trae · VS Code

[🌟 Executive Overview](#-executive-overview) • [🧭 Dual-Track Decision](#-the-2-in-1-dual-workflow-framework) • [🔄 Architecture Workflows](#-prompt-workflow-diagrams) • [📁 Blueprint](#-repository-architecture-blueprint) • [⚡ Quick-Start](#-quick-start-guide-step-by-step-for-any-project) • [🖥️ Dashboard](#-in-ide-project-manager-dashboard) • [📖 Catalog](#-complete-documentation-catalog)

</div>

---

## 🌟 Executive Overview

This repository provides two standardized, battle-tested engineering frameworks for developing **production-grade software** using autonomous AI coding agents. Whether you are building rapid consumer-facing SaaS products or mission-critical, enterprise multi-tenant systems, this repository enforces strict governance, zero speculative coding, and measurable quality gates.

```mermaid
flowchart TD
    subgraph RepoGateway ["AI-Powered Engineering Gateway"]
        Choice{"Select Development Paradigm"}
    end

    subgraph Track1 ["Track 1: Vibe-Coding Track"]
        VibePhilosophy["Intuitive, Visual & Rapid Prototyping"]
        VibeSpeed["High Velocity • Sensory Demo • Living Specs"]
        VibeBestFor["Best For: SaaS MVPs, UI Dashboards, Creative Tools"]
    end

    subgraph Track2 ["Track 2: SDD + TDD Track"]
        SDDPhilosophy["Contract-First & Zero-Regression TDD"]
        SDDRigor["Formal Specs • Failing Tests First • Strict Gates"]
        SDDBestFor["Best For: Enterprise Core, FinTech, HealthTech, Regulated Systems"]
    end

    subgraph SharedCore ["Canonical Core Governance"]
        AgentEngine[".agents/ Commands (16 Collision-Free Tools)"]
        DashboardEngine["In-IDE Project-Manager-Dashboard (Ports 4200 / 4201)"]
        DocGovernance["docs/ Governance Guidelines & ADR Decision Logs"]
    end

    Choice -->|"Rapid Iteration / Visual Focus"| Track1
    Choice -->|"High Assurance / Strict Contracts"| Track2

    Track1 --> SharedCore
    Track2 --> SharedCore
```

### The 4 Foundational Directives of Agentic Engineering:
> 1. **Never Code Speculatively:** Autonomous agents must first inspect repository governance, synthesize domain architecture, configure living documentation, and obtain explicit human sign-off before writing production code.
> 2. **Pre-Prompting Domain Knowledge & System Design Synthesis:** Before Step 5 (First Prompting), establish deep domain mastery and system design blueprints (HLD/LLD); if not manually prepared, instruct the AI agent to formulate the architecture during planning.
> 3. **Mandatory Development Logging (`logs/` Folder):** Always maintain clean, sanitized development logs (`logs/dev.log`, `logs/test.log`, `logs/server.log`, `logs/error.log`) inside a dedicated `logs/` directory.
> 4. **Staged Web Development (Frontend-First Verification):** For web applications, never build all features at once. First develop the frontend (UI design, layout, responsiveness, mock/client state), verify it via a live demo run (`/run-ca-agent`), and only after visual sign-off proceed to backend persistence, security, and automated tests.

---

## 🧭 The 2-in-1 Dual Workflow Framework

Choose the framework that matches your delivery model and architectural requirements:

| Architectural Dimension | 🌟 Track 1: Vibe-Coding | 🛡️ Track 2: SDD + TDD |
| :--- | :--- | :--- |
| **Workspace Location** | `Vibe-Coding-Chandan-Adhikary/Vibe-Coding/` | `SDD-TDD-Chandan-Adhikary/Spec-Driven-Development/` |
| **Core Workflow** | Fluid Prompts & Rapid Iterative Loops | Formal Quality-Gated Prompts & Phase Gates |
| **Engineering Philosophy** | Intuitive, visual feedback & rapid sensory UI | Contract-first, zero regression, test-driven |
| **Specification Model** | Living `docs/features/` contracts (Iterative) | Formal `docs/features/` (Flat vs. Modular Tiers) |
| **Verification Strategy** | Visual runtime inspection & sanity harnesses | Test-First (TDD: Red → Green → Refactor) |
| **In-IDE Dashboard** | Port `4201` (`http://127.0.0.1:4201`) | Port `4200` (`http://127.0.0.1:4200`) |
| **Recommended Scope** | Rapid SaaS MVPs, interactive apps, dashboards | Enterprise core, multi-tenant fintech, healthtech |

---

## 🔄 Prompt Workflow Diagrams

### Track 1: Vibe-Coding Prompt & Sensory Loop

```mermaid
flowchart TD
    Setup["1. Pre-Development Setup<br/>(Extract folder, rename, open IDE)"] --> CmdCheck{"2. Verify Slash Commands<br/>(Chat Dropdown & Terminal)"}
    CmdCheck --> PV1["3. Prompt V1: Discovery & Vibe Check<br/>(Plan Mode: Aesthetic, stack, personas)"]
    
    PV1 --> HumanV1{"Human Approval<br/>of V1 Plan?"}
    HumanV1 -->|"Revisions needed"| PV1
    HumanV1 -->|"Approved"| PV2["4. Prompt V2: Scaffold & Working Live UI<br/>(Layout, mock data, /run-ca-agent)"]
    
    PV2 --> LiveCheck["5. Verify Live Application in Browser<br/>(Visual sensory inspection at http://localhost:3000)"]
    
    LiveCheck --> PV3["6. Prompt V3: Conversational Vibe-Tuning<br/>(Iterate UI, polish micro-interactions)"]
    PV3 --> Loop{"Vibe feels right?"}
    Loop -->|"No: adjust styling or features"| PV3
    Loop -->|"Yes: ready to harden"| PV4["7. Prompt V4: Production Hardening & Pre-Deploy<br/>(Zod validation, error boundaries, security)"]
    
    PV4 --> Audits["8. Run /security-audit-ca-agent & /release-check-ca-agent"]
    Audits --> Ship["9. Production-Ready Deployment"]
```

---

### Track 2: Spec-Driven Development + TDD Quality-Gated Loop

```mermaid
flowchart TD
    SetupS["1. Pre-Development Setup<br/>(Extract folder, rename, open IDE)"] --> CmdCheckS{"2. Verify Slash Commands<br/>(Chat Dropdown & Terminal)"}
    CmdCheckS --> PS1["3. Prompt S1: Discovery & Architecture R&D<br/>(Plan Mode: System Design, HLD/LLD, models)"]
    
    PS1 --> HumanS1{"Human Approval<br/>of Architecture?"}
    HumanS1 -->|"Revise plan"| PS1
    HumanS1 -->|"Approved"| PS2["4. Prompt S2: Configure Complete Codebase<br/>(docs/, ADR-001, tests/, activate -ca-agent commands)"]
    
    PS2 --> PS3["5. Prompt S3: Spec Validation & Test Scaffolding<br/>(Prompt: Flat or Modular? Easy/Med/Hard Tiers)"]
    PS3 --> RedPhase["6. Scaffold Failing Tests (Red Phase)<br/>(Run /testing-ca-agent -> Confirm failures)"]
    
    RedPhase --> PS4["7. Prompt S4: TDD Feature Implementation<br/>(Minimal code -> All tests PASS -> Refactor)"]
    PS4 --> GateCheck{"All AC Tests Green<br/>and /review-ca-agent clean?"}
    GateCheck -->|"Failing tests"| PS4
    GateCheck -->|"Passed"| NextFeature{"More features<br/>in docs/features/?"}
    NextFeature -->|"Yes: Step-by-step next spec"| PS3
    NextFeature -->|"All complete"| PS5["8. Prompt S5: Production Readiness Audit<br/>(SAST scans, release checklist, signed approval)"]
    
    PS5 --> Release["9. Production Release Authorization<br/>(docs/approvals/release-v1.0.0.md)"]
```

---

## 📁 Repository Architecture Blueprint

```mermaid
flowchart TD
    subgraph Root ["Repository Root Structure"]
        RootDocs["Universal Documentation<br/>• README.md<br/>• PROJECT-MANAGER-DASHBOARD-GUIDE.md<br/>• Standalone Production Guides"]
        RootGov["Governance & Security<br/>• LICENSE.md (MIT)<br/>• .github/SECURITY.md<br/>• GEMINI.md"]
    end

    subgraph StarterTemplates ["Canonical Framework Blueprints"]
        direction TB
        subgraph T1Template ["Track 1: Vibe-Coding Template"]
            T1Agents[".agents/ (Commands, Skills, Hooks)"]
            T1Docs["docs/ (PRD, Architecture, Features)"]
            T1Dash["Project-Manager-Dashboard (Port 4201)"]
            T1Tests["tests/ (Visual & Sanity Harness)"]
        end

        subgraph T2Template ["Track 2: SDD-TDD Template"]
            T2Agents[".agents/ (Commands, Skills, Hooks)"]
            T2Docs["docs/ (Constitution, PRD, Features)"]
            T2Dash["Project-Manager-Dashboard (Port 4200)"]
            T2Tests["tests/ (TDD Test-First Suites)"]
        end
    end

    Root --> StarterTemplates
```

```text
SDD-Vibe/
├── README.md                                         # Universal overview & quick-start guide
├── LICENSE.md                                        # MIT License (Chandan Adhikary)
├── PROJECT-MANAGER-DASHBOARD-GUIDE.md                # In-IDE Project-Manager-Dashboard Step-by-Step Guide
├── GEMINI.md                                         # Master Agent Configuration & Operational Contracts
├── .github/
│   ├── SECURITY.md                                   # Vulnerability disclosure & security policy
│   └── workflows/frameworks-ci.yml                   # CI pipeline validating framework packages
│
├── 🌟 VIBE-CODING TRACK (STANDALONE GUIDES):
│   ├── Vibe-Coding-Production-Guide-Universal.md     # Universal Vibe-Coding Production Guide for ANY Project
│   ├── Vibe-Coding-Production-Guide-SMS.md           # Reference Vibe-Coding Production Guide (SMS Demo)
│   ├── Vibe-Coding-Custom-Slash-Command-Universal.md # Universal Vibe Slash Commands Guide (16 Commands Table)
│   └── Vibe-Coding-Custom-Slash-Command-SMS.md       # Reference Vibe Slash Commands Guide (SMS Demo)
│
├── 🛡️ SDD + TDD TRACK (STANDALONE GUIDES):
│   ├── SDD-TDD-Production-Guide-Universal.md         # Universal SDD-TDD Production Guide for ANY Project
│   ├── SDD-TDD-Production-Guide-SMS.md               # Reference SDD-TDD Production Guide (SMS Demo)
│   ├── SDD-TDD-Custom-Slash-Command-Universal.md     # Universal SDD Slash Commands Guide (16 Commands Table)
│   └── SDD-TDD-Custom-Slash-Command-SMS.md           # Reference SDD Slash Commands Guide (SMS Demo)
│
├── 📦 CANONICAL STARTER BLUEPRINTS:
│   ├── Vibe-Coding-Chandan-Adhikary/Vibe-Coding/     # Track 1 Starter Template (Port 4201)
│   └── SDD-TDD-Chandan-Adhikary/Spec-Driven-Development/ # Track 2 Starter Template (Port 4200)
```

---

## ⚡ Quick-Start Guide (Step-by-Step for Any Project)

### Step 1: Pick & Rename Your Framework Blueprint
1. Copy or extract either `Vibe-Coding-Chandan-Adhikary/Vibe-Coding/` or `SDD-TDD-Chandan-Adhikary/Spec-Driven-Development/` to your clean workspace.
2. Rename the directory to your target application name in lowercase `kebab-case` (e.g. `my-awesome-saas/`).
3. Open the directory at the root in your AI coding IDE (Cursor, Windsurf, Claude Code, Antigravity, VS Code).

### Step 2: Verify Slash Commands (Chat Palette & Terminal)
Before generating any application code:
1. **Chat Dropdown:** Focus your AI assistant chat box and type `/`. Verify all 16 `*-ca-agent` commands appear with descriptions.
2. **Terminal Verification:** Run `ls .agents/commands/*-ca-agent.md` to ensure command contracts exist.

### Step 3: Launch Local Mission Control
Start the zero-dependency telemetry dashboard:
- **Slash Command:** Type `/dashboard-ca-agent` in chat.
- **Direct Terminal:** Run `open-in-ide.bat` (Windows) or `bash open-in-ide.sh` (macOS/Linux).
- **IDE Docking:** Open `Simple Browser: Show` and navigate to `http://127.0.0.1:4200` (SDD) or `http://127.0.0.1:4201` (Vibe). Dock the tab to Editor Group 2.

---

## 🛡️ The 16 Collision-Free Custom Slash Commands (`.agents/commands/`)

All custom commands carry the `-ca-agent` namespace to guarantee zero collisions with IDE-reserved tokens:

```mermaid
stateDiagram-v2
    [*] --> PlanPhase: /plan-ca-agent
    PlanPhase --> SpecCheck: /spec-check-ca-agent
    SpecCheck --> TaskSetup: /task-ca-agent
    
    state ExecutionStage {
        [*] --> TestingRed: /testing-ca-agent (Red Phase)
        TestingRed --> TddGreen: /tdd-ca-agent (Green Phase)
        TddGreen --> Implement: /implement-ca-agent
        Implement --> RuntimeVerify: /run-ca-agent
    }

    TaskSetup --> ExecutionStage
    
    state QualityGates {
        [*] --> CodeReview: /review-ca-agent
        CodeReview --> VerifyAC: /verify-ca-agent
        VerifyAC --> SecurityScan: /security-audit-ca-agent
    }

    ExecutionStage --> QualityGates
    QualityGates --> ReleaseGate: /release-check-ca-agent
    ReleaseGate --> [*]: Production Ship
```

| Category | Slash Commands Available | Operational Scope |
| :--- | :--- | :--- |
| **Planning & Specs** | `/plan-ca-agent` · `/task-ca-agent` · `/spec-check-ca-agent` · `/change-request-ca-agent` | Discovery research, task harness initialization, spec validation, change impact assessment |
| **Execution & TDD** | `/testing-ca-agent` · `/tdd-ca-agent` · `/implement-ca-agent` · `/run-ca-agent` | Failing test execution, Red-Green-Refactor, bounded implementation, dev server startup |
| **Quality & Security** | `/review-ca-agent` · `/verify-ca-agent` · `/security-audit-ca-agent` · `/release-check-ca-agent` | Git diff review, criteria verification scorecard, SAST security scan, production release gate |
| **Diagnostics & Handoff** | `/errorlogs-ca-agent` · `/gitlogs-ca-agent` · `/handoff-ca-agent` | Stack trace root-cause triage, git commit audit trails, engineering handoff dossiers |
| **Visual Mission Control** | `/dashboard-ca-agent` | Launches portable, fluid In-IDE Bento Grid dashboard across all monitor resolutions |

---

## 🖥️ In-IDE Project-Manager-Dashboard

The in-built **Project-Manager-Dashboard** is a zero-dependency, Apple/Linear and Shadcn UI-inspired telemetry dashboard running directly inside your editor:

```mermaid
flowchart LR
    subgraph IDE ["IDE Editor Workspace"]
        EditorGroup1["Editor Group 1<br/>Active Code & Specs"]
        EditorGroup2["Editor Group 2<br/>Docked Simple Browser<br/>(127.0.0.1:4200 or 4201)"]
    end

    subgraph DaemonTier ["Zero-Dependency Local Daemon"]
        Daemon["Node.js HTTP Server<br/>(server.js + parser.js)"]
        FileWatchers["File Watchers & Git Telemetry<br/>(task.md, phases.md, .git)"]
    end

    FileWatchers --> Daemon
    Daemon -->|"Live SSE / JSON Telemetry"| EditorGroup2
    EditorGroup1 -.->|"Writes to docs/"| FileWatchers
```

### Dashboard Core Capabilities:
- **100% Fluid & Responsive:** Scales gracefully from split editor panes to 4K ultrawide monitors.
- **Current Running Task Always on Top:** Actively running task (`Task 1`, `IN_PROGRESS`, `RED_TEST_FAIL`) dynamically floats to Index 0 with a highlighted `⚡ CURRENT RUNNING TASK` badge.
- **HEAD Git Commit Pinned on Top:** Latest commit pinned at top with `[HEAD / CURRENT COMMIT]` indicator and exact `📅 DD-MM-YYYY` timestamp.
- **Working AC Contract Engine:** Acceptance Criteria (`AC-*`) with Given/When/Then scenario inspection and live status cycling (`PENDING` → `RED` → `GREEN`).
- **AI Token Telemetry:** Real-time token consumption, cache hit rate, and session cost savings tracking.

---

## 📖 Complete Documentation Catalog

### 1. Universal Framework Master Guides
- **[CUSTOM-SLASH-COMMANDS-GUIDE.md](CUSTOM-SLASH-COMMANDS-GUIDE.md)** — Master guide for custom slash commands, prompt formats, activation steps, and Webdev / Data Analysis reference architectures.
- **[PROJECT-MANAGER-DASHBOARD-GUIDE.md](PROJECT-MANAGER-DASHBOARD-GUIDE.md)** — In-IDE Project-Manager-Dashboard step-by-step launch, docking, AC engine, and token telemetry guide.
- **[Vibe-Coding-Production-Guide-Universal.md](Vibe-Coding-Production-Guide-Universal.md)** — Universal Vibe-Coding production guide with variable mapping for any SaaS, web app, or marketplace.
- **[SDD-TDD-Production-Guide-Universal.md](SDD-TDD-Production-Guide-Universal.md)** — Universal SDD-TDD production guide with variable mapping for enterprise and regulated systems.
- **[Vibe-Coding-Custom-Slash-Command-Universal.md](Vibe-Coding-Custom-Slash-Command-Universal.md)** — Tabular operational reference for all 16 Vibe commands.
- **[SDD-TDD-Custom-Slash-Command-Universal.md](SDD-TDD-Custom-Slash-Command-Universal.md)** — Tabular operational reference for all 16 SDD commands.

### 2. Concrete Reference Implementations (School Management System Demo)
- **[Vibe-Coding-Production-Guide-SMS.md](Vibe-Coding-Production-Guide-SMS.md)** — Step-by-step production guide for building the EduSphere School Management SaaS.
- **[SDD-TDD-Production-Guide-SMS.md](SDD-TDD-Production-Guide-SMS.md)** — Enterprise production guide for building EduSphere with PostgreSQL RLS and FERPA compliance.
- **[Vibe-Coding-Custom-Slash-Command-SMS.md](Vibe-Coding-Custom-Slash-Command-SMS.md)** — Dedicated Vibe-Coding slash command SMS demo.
- **[SDD-TDD-Custom-Slash-Command-SMS.md](SDD-TDD-Custom-Slash-Command-SMS.md)** — Dedicated SDD-TDD slash command SMS demo.

---

## 🛡️ License & Governance

This framework and its templates are distributed under the [MIT License](LICENSE.md). All projects instantiated from these templates maintain complete sovereignty to choose their own application licenses and tech stacks.

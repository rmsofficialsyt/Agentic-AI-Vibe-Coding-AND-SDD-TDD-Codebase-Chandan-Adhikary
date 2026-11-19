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
    classDef gate fill:#451a03,stroke:#fbbf24,stroke-width:2px,color:#fffbeb;
    classDef vibe fill:#2e1065,stroke:#c084fc,stroke-width:2px,color:#faf5ff;
    classDef sdd fill:#082f49,stroke:#38bdf8,stroke-width:2px,color:#f0f9ff;
    classDef core fill:#0f172a,stroke:#94a3b8,stroke-width:1.5px,color:#f8fafc;

    Choice{"<b>⚖️ ARCHITECTURAL EVALUATION GATE</b><br/><sub>Select Delivery & Governance Model Based on System SLA</sub>"}:::gate

    subgraph Track1 ["🌟 Track 1: Vibe-Coding Framework (High Velocity & Visual UI)"]
        VibeCore["<b>🎨 FLUID SENSORY PROTOTYPING</b><br/><sub>Rapid UI • Instant Hot-Reload • Living Specs</sub>"]:::vibe
        VibeSpeed["<b>⚡ SENSORY VERIFICATION LOOP</b><br/><sub>Inspect at localhost:3000 • Fluid Feedback</sub>"]:::vibe
        VibeScope["<b>🎯 TARGET WORKLOADS</b><br/><sub>Consumer SaaS • Dynamic Dashboards • AI Creative Tools</sub>"]:::vibe
    end

    subgraph Track2 ["🛡️ Track 2: SDD + TDD Framework (Enterprise Core & High Assurance)"]
        SDDCore["<b>🔒 FORMAL CONTRACT-FIRST ARCHITECTURE</b><br/><sub>Approved Specs • Failing Tests First • Zero Regression</sub>"]:::sdd
        SDDRigor["<b>🧪 RED-GREEN-REFACTOR VERIFICATION</b><br/><sub>AC-to-Test Traceability • Strict Quality Gating</sub>"]:::sdd
        SDDBestFor["<b>🎯 TARGET WORKLOADS</b><br/><sub>Enterprise Core • FinTech Ledger • HealthTech • Regulated</sub>"]:::sdd
    end

    subgraph SharedCore ["🏛️ Shared Governance & Mission Control Baseline"]
        AgentEngine["<b>🤖 .agents/ ASSET REPOSITORY</b><br/><sub>16 Collision-Free Tools & Deterministic Skills</sub>"]:::core
        DashboardEngine["<b>🖥️ IN-IDE MISSION CONTROL</b><br/><sub>Zero-Dependency Local Daemons (Ports 4200 / 4201)</sub>"]:::core
        DocGovernance["<b>📑 docs/ GOVERNANCE ENGINE</b><br/><sub>Constitution, PRD, Features, and ADR Decision Logs</sub>"]:::core
    end

    Choice -->|"🚀 Rapid Prototyping & Sensory UI"| Track1
    Choice -->|"🛡️ High Assurance & Contract Integrity"| Track2

    Track1 ==>|"Enforces Governance"| SharedCore
    Track2 ==>|"Enforces Governance"| SharedCore
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
    classDef step fill:#2e1065,stroke:#c084fc,stroke-width:1.5px,color:#faf5ff;
    classDef gate fill:#451a03,stroke:#fbbf24,stroke-width:2px,color:#fffbeb;
    classDef live fill:#064e3b,stroke:#34d399,stroke-width:2px,color:#ecfdf5;
    classDef ship fill:#022c22,stroke:#10b981,stroke-width:2px,color:#d1fae5;

    subgraph P1 ["🎨 PHASE 1: DISCOVERY & AESTHETIC VIBE CHECK"]
        Setup(["<b>⚙️ Pre-Development Setup</b><br/><sub>Extract Blueprint • Rename Directory • Open IDE</sub>"]):::step
        CmdCheck{"<b>🔍 Verify Slash Commands</b><br/><sub>Check /-ca-agent in Chat Palette & Terminal</sub>"}:::gate
        PV1["<b>💡 Prompt V1: Discovery & Vibe Check</b><br/><sub>Plan Mode • Aesthetic Tokens • Personas • Tech Stack</sub>"]:::step
        HumanV1{"<b>👤 Human Lead Approval</b><br/><sub>Sign-Off on Design Tokens & Stack Plan</sub>"}:::gate
    end

    subgraph P2 ["🏗️ PHASE 2: LIVE INTERACTIVE UI SCAFFOLD"]
        PV2["<b>🏗️ Prompt V2: Scaffold Live UI Shell</b><br/><sub>Component Wireframes • Mock State • /run-ca-agent</sub>"]:::step
        LiveCheck["<b>🌐 Live Browser Verification</b><br/><sub>Tactile & Visual Inspection at http://localhost:3000</sub>"]:::live
    end

    subgraph P3 ["✨ PHASE 3: CONVERSATIONAL VIBE-TUNING LOOP"]
        PV3["<b>🎨 Prompt V3: Conversational Vibe-Tuning</b><br/><sub>Refine Micro-Interactions • Padding • Transitions</sub>"]:::step
        Loop{"<b>✨ Sensory Vibe Approval</b><br/><sub>Does the UX feel intuitive, elegant, and responsive?</sub>"}:::gate
    end

    subgraph P4 ["🔒 PHASE 4: PROGRESSIVE PRODUCTION HARDENING"]
        PV4["<b>🔒 Prompt V4: Progressive Hardening</b><br/><sub>Zod Validation • Error Boundaries • Database Schemas</sub>"]:::step
        Audits["<b>🛡️ Pre-Flight Verification Gates</b><br/><sub>Execute /security-audit-ca-agent & /release-check-ca-agent</sub>"]:::step
        Ship(["<b>🚀 Production Release Deployment</b><br/><sub>Zero-Defect Enterprise Ship</sub>"]):::ship
    end

    Setup -->|"Clean Workspace"| CmdCheck
    CmdCheck -->|"Contracts Verified"| PV1
    PV1 -->|"Submits Plan"| HumanV1
    HumanV1 -->|"Revisions Needed"| PV1
    HumanV1 -->|"Approved"| PV2

    PV2 -->|"Starts Dev Server"| LiveCheck
    LiveCheck -->|"Sensory Feedback"| PV3

    PV3 -->|"Instant Fast Refresh"| Loop
    Loop -->|"No: Adjust Styling/Features"| PV3
    Loop -->|"YES: Vibe Approved"| PV4

    PV4 -->|"Automated Scans"| Audits
    Audits -->|"All Gates Passed"| Ship
```

---

### Track 2: Spec-Driven Development + TDD Quality-Gated Loop

```mermaid
flowchart TD
    classDef step fill:#082f49,stroke:#38bdf8,stroke-width:1.5px,color:#f0f9ff;
    classDef gate fill:#451a03,stroke:#fbbf24,stroke-width:2px,color:#fffbeb;
    classDef red fill:#4c0519,stroke:#fb7185,stroke-width:2px,color:#fff1f2;
    classDef green fill:#064e3b,stroke:#34d399,stroke-width:2px,color:#ecfdf5;
    classDef ship fill:#022c22,stroke:#10b981,stroke-width:2px,color:#d1fae5;

    subgraph S1Phase ["🏛️ PHASE 1: DISCOVERY & ARCHITECTURE R&D"]
        SetupS(["<b>⚙️ Pre-Development Setup</b><br/><sub>Extract Blueprint • Rename Directory • Open IDE</sub>"]):::step
        CmdCheckS{"<b>🔍 Verify Slash Commands</b><br/><sub>Check /-ca-agent in Chat Palette & Terminal</sub>"}:::gate
        PS1["<b>📑 Prompt S1: Architecture R&D</b><br/><sub>Plan Mode • HLD/LLD • Domain Data Model • Contracts</sub>"]:::step
        HumanS1{"<b>👤 Human Lead Approval</b><br/><sub>Approve Architecture & Boundary Models</sub>"}:::gate
        PS2["<b>🏗️ Prompt S2: Configure Complete Codebase</b><br/><sub>docs/ Governance • ADR-001 • Test Harness Scaffolding</sub>"]:::step
    end

    subgraph S2Phase ["📋 PHASE 2: SPECIFICATION & TEST CONTRACT"]
        PS3["<b>📋 Prompt S3: Spec Validation & Tier Decision</b><br/><sub>Flat vs. Modular Decision • AC-FEAT###-## Given/When/Then</sub>"]:::step
        RedPhase["<b>🔴 RED PHASE: Scaffold Failing Tests</b><br/><sub>Run /testing-ca-agent -> Confirm Expected Test Failures</sub>"]:::red
    end

    subgraph S3Phase ["🧪 PHASE 3: TDD IMPLEMENTATION CYCLE"]
        PS4["<b>🟢 GREEN PHASE: Minimal Code Implementation</b><br/><sub>Write Minimum Code -> All AC Tests PASS -> Refactor</sub>"]:::green
        GateCheck{"<b>🛡️ AC Verification Gate</b><br/><sub>All Tests Green & /review-ca-agent Clean?</sub>"}:::gate
        NextFeature{"<b>🔄 Specification Scope</b><br/><sub>More Features in docs/features/?</sub>"}:::gate
    end

    subgraph S4Phase ["🚀 PHASE 4: PRODUCTION READINESS & SHIP"]
        PS5["<b>🔍 Prompt S5: Production Readiness Audit</b><br/><sub>SAST Security Scan • Release Checklist Gate</sub>"]:::step
        Release(["<b>🎉 Production Release Authorization</b><br/><sub>Signed Off in docs/approvals/release-v1.0.0.md</sub>"]):::ship
    end

    SetupS -->|"Clean Workspace"| CmdCheckS
    CmdCheckS -->|"Contracts Verified"| PS1
    PS1 -->|"Submits System Design"| HumanS1
    HumanS1 -->|"Revise Plan"| PS1
    HumanS1 -->|"Approved"| PS2

    PS2 -->|"Initializes Harness"| PS3
    PS3 -->|"Failing Test Contract"| RedPhase

    RedPhase -->|"Run TDD Cycle"| PS4
    PS4 -->|"Automated Check"| GateCheck
    GateCheck -->|"Failing Tests"| PS4
    GateCheck -->|"Passed Green"| NextFeature

    NextFeature -->|"Yes: Step-by-Step Next Spec"| PS3
    NextFeature -->|"All Specs Verified"| PS5

    PS5 -->|"Release Checklist Signed"| Release
```

---

## 📁 Repository Architecture Blueprint

```mermaid
flowchart TD
    classDef root fill:#0f172a,stroke:#94a3b8,stroke-width:2px,color:#f8fafc;
    classDef vibe fill:#2e1065,stroke:#c084fc,stroke-width:1.5px,color:#faf5ff;
    classDef sdd fill:#082f49,stroke:#38bdf8,stroke-width:1.5px,color:#f0f9ff;

    subgraph Root ["📁 REPOSITORY GOVERNANCE ROOT"]
        RootDocs["<b>📑 Universal Documentation Hub</b><br/><sub>README.md • PROJECT-MANAGER-DASHBOARD-GUIDE.md • Production Guides</sub>"]:::root
        RootGov["<b>🛡️ Policy & Security Baseline</b><br/><sub>LICENSE.md (MIT) • .github/SECURITY.md • GEMINI.md Contracts</sub>"]:::root
    end

    subgraph StarterTemplates ["📦 CANONICAL STARTER BLUEPRINTS"]
        direction TB
        subgraph T1Template ["🌟 Track 1: Vibe-Coding Blueprint"]
            T1Agents["<b>🤖 .agents/ Asset Store</b><br/><sub>16 Commands • 18 Skills • Hooks</sub>"]:::vibe
            T1Docs["<b>🎨 docs/ Living Specs</b><br/><sub>PRD • System Architecture • Living Features</sub>"]:::vibe
            T1Dash["<b>🖥️ Mission Control</b><br/><sub>Project-Manager-Dashboard (Port 4201)</sub>"]:::vibe
            T1Tests["<b>🧪 tests/ Sanity Harness</b><br/><sub>Visual & Progressive Hardening Suites</sub>"]:::vibe
        end

        subgraph T2Template ["🛡️ Track 2: SDD-TDD Blueprint"]
            T2Agents["<b>🤖 .agents/ Asset Store</b><br/><sub>16 Commands • 18 Skills • Hooks</sub>"]:::sdd
            T2Docs["<b>📑 docs/ Contract Store</b><br/><sub>Constitution • PRD • Formal Features • ADRs</sub>"]:::sdd
            T2Dash["<b>🖥️ Mission Control</b><br/><sub>Project-Manager-Dashboard (Port 4200)</sub>"]:::sdd
            T2Tests["<b>🧪 tests/ TDD Harness</b><br/><sub>Unit, Integration & E2E Suites</sub>"]:::sdd
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
    [*] --> PlanPhase: 💡 /plan-ca-agent
    PlanPhase --> SpecCheck: 📋 /spec-check-ca-agent
    SpecCheck --> TaskSetup: 📌 /task-ca-agent
    
    state ExecutionStage {
        [*] --> TestingRed: 🔴 /testing-ca-agent (Confirm Fail)
        TestingRed --> TddGreen: 🟢 /tdd-ca-agent (Satisfy Tests)
        TddGreen --> Implement: 🏗️ /implement-ca-agent
        Implement --> RuntimeVerify: 🌐 /run-ca-agent
    }

    TaskSetup --> ExecutionStage
    
    state QualityGates {
        [*] --> CodeReview: 🔍 /review-ca-agent
        CodeReview --> VerifyAC: 📊 /verify-ca-agent
        VerifyAC --> SecurityScan: 🛡️ /security-audit-ca-agent
    }

    ExecutionStage --> QualityGates
    QualityGates --> ReleaseGate: 🚀 /release-check-ca-agent
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
    classDef client fill:#0f172a,stroke:#38bdf8,stroke-width:1.5px,color:#f8fafc;
    classDef daemon fill:#082f49,stroke:#0284c7,stroke-width:2px,color:#f0f9ff;
    classDef store fill:#1e293b,stroke:#64748b,stroke-width:1px,color:#f8fafc;

    subgraph IDEWindow ["🖥️ IDE WORKSPACE WINDOW (VS Code / Cursor / Windsurf / Antigravity)"]
        EditorGroup1["<b>📝 Editor Group 1</b><br/><sub>Active Source Code & Specs</sub>"]:::client
        EditorGroup2["<b>📊 Editor Group 2 (Simple Browser)</b><br/><sub>Docked Telemetry Dashboard (127.0.0.1:4200 / 4201)</sub>"]:::client
    end

    subgraph DaemonTier ["⚙️ ZERO-DEPENDENCY LOCAL DAEMON"]
        Daemon["<b>🔌 Node.js HTTP Server</b><br/><sub>server.js • parser.js • CSRF Guard</sub>"]:::daemon
        FileWatchers["<b>📁 File Watchers & Git Telemetry</b><br/><sub>docs/task.md • docs/phases.md • .git/</sub>"]:::store
    end

    FileWatchers -->|"Real-time Poll (2s)"| Daemon
    Daemon ==>|"⚡ Live SSE Telemetry"| EditorGroup2
    EditorGroup1 -.->|"Writes State"| FileWatchers
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

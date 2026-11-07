# AI-Powered Project Development Frameworks
### 2-in-1 Architecture: Vibe-Coding & Spec-Driven Development (SDD + TDD)

**Engineering Lead:** Chandan Adhikary & Antigravity Engineering  
**Version:** 2.0.0 (Production-Grade Universal Release)  
**Supported Platforms:** Claude Code, Cursor, Windsurf, Antigravity, OpenCode, Codex, Trae, VS Code with AI Agents  

---

## 🌟 Executive Overview

This repository provides two standardized, battle-tested engineering frameworks for developing **production-grade software** using autonomous AI coding agents. 

Both frameworks share the foundational rule of AI engineering:
> **Do not ask the AI agent to start coding immediately.**  
> First, let the agent inspect repository governance, propose an architecture, configure safe documentation, and obtain your approval.

---

## 🧭 The 2-in-1 Dual Workflow Framework

Choose the framework that matches your project requirements. Both tracks produce strictly production-grade software:

```text
=============================================================================================
             TRACK 1: VIBE-CODING                            TRACK 2: SDD + TDD
---------------------------------------------   ---------------------------------------------
* Location: Vibe-Coding-Chandan-Adhikary/       * Location: SDD-TDD-Chandan-Adhikary/
            Vibe-Coding/                                    Spec-Driven-Development/
* Workflow: 4 Fluid Prompts (Karpathy Loops)     * Workflow: 5 Formal Quality Gated Prompts
* Philosophy: Intuitive, visual, rapid UI        * Philosophy: Contract-first, zero regression
* Specs: Lightweight living feature docs        * Specs: Formal 'specs/' (Flat or Modular)
* Testing: Visual runtime & sanity harnesses    * Testing: Test-First (TDD Red-Green-Refactor)
* Best For: Rapid SaaS MVPs, UI-heavy apps,     * Best For: Enterprise SaaS, multi-tenant core,
  consumer dashboards, interactive web tools      fintech, healthcare, mission-critical systems
=============================================================================================
```

---

## 🔄 Prompt Workflow Diagrams

Here is how prompts flow through each development paradigm:

### Track 1: Vibe-Coding Workflow (4 Fluid Prompts & Karpathy Loops)

```mermaid
flowchart TD
    Setup["Pre-Development Setup<br/>(Extract folder, rename, open IDE)"] --> IDEDetect{"IDE Detection<br/>(docs/ide-compatibility.md)"}
    IDEDetect -->|"Single-IDE Mode"| Prune["Auto-prune irrelevant IDE configs"]
    IDEDetect -->|"Multi-IDE Mode"| Sync["Harmonize active IDE adapters to AGENTS.md"]
    
    Prune --> PV1["Prompt V1: Discovery & Vibe Check<br/>(Plan Mode: Aesthetic, stack, personas)"]
    Sync --> PV1
    
    PV1 --> HumanV1{"Human Approval<br/>of V1 Plan?"}
    HumanV1 -->|"Revisions needed"| PV1
    HumanV1 -->|"Approved"| PV2["Prompt V2: Scaffold & Working Live UI<br/>(Layout, mock data, /run-ca-agent)"]
    
    PV2 --> LiveCheck["Verify Live Application in Browser<br/>(Visual sensory inspection at http://localhost:3000)"]
    
    LiveCheck --> PV3["Prompt V3: Conversational Vibe-Tuning<br/>(Karpathy Loops: iterate UI, polish interactions)"]
    PV3 --> Loop{"Vibe feels right?"}
    Loop -->|"No: adjust styling or features"| PV3
    Loop -->|"Yes: ready to harden"| PV4["Prompt V4: Production Hardening & Pre-Deploy<br/>(Zod validation, error boundaries, security)"]
    
    PV4 --> Audits["Run /security-audit-ca-agent & /release-check-ca-agent"]
    Audits --> Ship["Production-Ready Deployment"]
```

---

### Track 2: Spec-Driven Development + TDD Workflow (5 Formal Gated Prompts)

```mermaid
flowchart TD
    SetupS["Pre-Development Setup<br/>(Extract folder, rename, open IDE)"] --> IDEDetectS{"IDE Detection<br/>(docs/ide-compatibility.md)"}
    IDEDetectS -->|"Single-IDE Mode"| PruneS["Auto-prune irrelevant IDE configs"]
    IDEDetectS -->|"Multi-IDE Mode"| SyncS["Harmonize active IDE adapters to AGENTS.md"]
    
    PruneS --> PS1["Prompt S1: Discovery & Architecture R&D<br/>(Plan Mode: Multi-tenant models, ADRs, compliance)"]
    SyncS --> PS1
    
    PS1 --> HumanS1{"Human Approval<br/>of Architecture?"}
    HumanS1 -->|"Revise plan"| PS1
    HumanS1 -->|"Approved"| PS2["Prompt S2: Configure Complete Codebase<br/>(docs/, ADR-001, tests/, activate -ca-agent commands)"]
    
    PS2 --> PS3["Prompt S3: Spec Validation & Test Scaffolding<br/>(Select specs/ Format 1 or 2, Acceptance Criteria AC-*)"]
    PS3 --> RedPhase["Scaffold Failing Tests (Red Phase)<br/>(Run /testing-ca-agent -> Confirm failures)"]
    
    RedPhase --> PS4["Prompt S4: TDD Feature Implementation<br/>(Minimal code -> All tests PASS -> Refactor)"]
    PS4 --> GateCheck{"All AC Tests Green<br/>and /review-ca-agent clean?"}
    GateCheck -->|"Failing tests"| PS4
    GateCheck -->|"Passed"| NextFeature{"More features<br/>in specs/?"}
    NextFeature -->|"Yes"| PS3
    NextFeature -->|"All complete"| PS5["Prompt S5: Production Readiness Audit<br/>(SAST scans, release checklist, signed approval)"]
    
    PS5 --> Release["Production Release Authorization<br/>(docs/approvals/release-v1.0.0.md)"]
```

---

## 📁 Symmetrical 4 + 4 Repository Architecture

The repository is organized into a clean **4 + 4 symmetrical documentation suite** providing both **Universal blueprints for ANY software project** and **Concrete reference implementations for a School Management System (SMS)**:

```text
Guide-Github/
├── README.md                                         # Universal overview & quick-start guide
├── LICENSE                                           # MIT License (Chandan Adhikary / RMS Officials)
├── .gitignore                                        # Standard development ignores
│
├── 🌟 VIBE-CODING TRACK (STANDALONE GUIDES):
├── Vibe-Coding-Production-Guide-Universal.md         # Universal Vibe-Coding Production Guide for ANY Project
├── Vibe-Coding-Production-Guide-SMS.md               # Reference Vibe-Coding Production Guide (SMS Demo)
├── Vibe-Coding-Custom-Slash-Command-Universal.md     # Universal Vibe Slash Commands Guide (15 Commands Table)
├── Vibe-Coding-Custom-Slash-Command-SMS.md           # Reference Vibe Slash Commands Guide (SMS Demo)
│
├── 🛡️ SDD + TDD TRACK (STANDALONE GUIDES):
├── SDD-TDD-Production-Guide-Universal.md             # Universal SDD-TDD Production Guide for ANY Project
├── SDD-TDD-Production-Guide-SMS.md                   # Reference SDD-TDD Production Guide (SMS Demo)
├── SDD-TDD-Custom-Slash-Command-Universal.md         # Universal SDD Slash Commands Guide (15 Commands Table)
└── SDD-TDD-Custom-Slash-Command-SMS.md               # Reference SDD Slash Commands Guide (SMS Demo)
│
├── 📦 CANONICAL STARTER TEMPLATES:
├── Vibe-Coding-Chandan-Adhikary/
│   └── Vibe-Coding/                                  # Track 1 Baseline Template (Extract & Rename)
│       ├── AGENTS.md                                 # Portable agent entry point
│       ├── .agents/                                  # 15 collision-free commands & skills
│       ├── docs/                                     # Guidelines, architecture & ide-compatibility.md
│       ├── playbooks/                                # 11 operational workflow playbooks
│       └── tests/                                    # Test contracts
│
└── SDD-TDD-Chandan-Adhikary/
    └── Spec-Driven-Development/                      # Track 2 Baseline Template (Extract & Rename)
        ├── AGENTS.md                                 # Portable agent entry point
        ├── specs/                                    # Official specifications (Format 1 Flat or Format 2 Modular)
        ├── .agents/                                  # 15 collision-free commands & skills
        ├── docs/                                     # Constitution, rules, ADRs, ide-compatibility.md
        ├── playbooks/                                # 11 operational workflow playbooks
        └── tests/                                    # Test harness & test-first suites
```

---

## ⚡ Quick-Start Guide (Step-by-Step for Any Project)

### Step 1: Pick & Rename Your Framework
1. Copy or extract either `Vibe-Coding-Chandan-Adhikary/Vibe-Coding/` or `SDD-TDD-Chandan-Adhikary/Spec-Driven-Development/` to a clean working directory.
2. Rename the folder to your product name in lowercase `kebab-case` (e.g. `[your-project-name]/`).
3. Open the renamed folder in your AI coding IDE (Antigravity, Cursor, Windsurf, Claude Code, OpenCode, VS Code). Ensure the editor opens at the project root so it discovers `AGENTS.md` and `.agents/`.

### Step 2: Active IDE Detection & Cleanup (`docs/ide-compatibility.md`)
- **Single-IDE Mode (Automated Pruning):** Irrelevant configuration files belonging to other IDEs (`.cursorrules`, `.windsurfrules`, `CLAUDE.md`, etc.) can be automatically pruned during Prompt 1 to prevent rule conflicts and token bloat.
- **Multi-IDE Mode (Coexistence):** If using multiple IDEs across a team, declare them in Prompt 1. All declared adapters will point to canonical `AGENTS.md` and `.agents/`.

### Step 3: Run the Master Prompts or Custom Slash Commands

Choose your preferred execution method:

#### Option A: Natural Language Master Prompts
- For any new project via Vibe-Coding: Follow **[Vibe-Coding-Production-Guide-Universal.md](Vibe-Coding-Production-Guide-Universal.md)** (Prompts 1 through 4).
- For any new project via SDD + TDD: Follow **[SDD-TDD-Production-Guide-Universal.md](SDD-TDD-Production-Guide-Universal.md)** (Prompts 1 through 5).

#### Option B: Portable Custom Slash Commands (`-ca-agent`)
Type custom slash commands directly into your AI chat prompt:

**For Vibe-Coding (4 Fluid Steps):**
1. `/plan-ca-agent`: Aesthetic vision, design tokens, component hierarchy, read-only plan mode.
2. `/implement-ca-agent` followed by `/run-ca-agent`: Layout scaffolding, responsive navigation, and dev server verification.
3. `/task-ca-agent` followed by `/review-ca-agent`: Fast Karpathy conversational loops, 1-click status pills, optimistic UI.
4. `/security-audit-ca-agent` followed by `/release-check-ca-agent`: Zod validation, auth route middleware, `npm run build` verification.
*(Full operational guide & 15-command table: **[Vibe-Coding-Custom-Slash-Command-Universal.md](Vibe-Coding-Custom-Slash-Command-Universal.md)**)*

**For SDD + TDD (5 Formal Quality Gates):**
1. `/plan-ca-agent`: Enterprise architecture, data isolation, regulatory compliance, read-only plan mode.
2. `/task-ca-agent`: Repository baseline configuration, `ADR-001`, and `tests/` test runner setup.
3. `/spec-check-ca-agent` followed by `/testing-ca-agent`: Specification audit against Acceptance Criteria (`AC-*`) and failing test execution (RED state).
4. `/tdd-ca-agent` followed by `/review-ca-agent`: Minimal code implementation (GREEN state), refactoring, atomic git commit.
5. `/security-audit-ca-agent` followed by `/release-check-ca-agent`: Full test coverage (>90%), SAST security scan, and formal sign-off in `docs/approvals/`.
*(Full operational guide & 15-command table: **[SDD-TDD-Custom-Slash-Command-Universal.md](SDD-TDD-Custom-Slash-Command-Universal.md)**)*

---

## 🛡️ Built-in Capabilities & Collision Prevention

### Collision-Free Agent Commands (`.agents/commands/`)
To eliminate collisions with host IDE reserved slash commands (like Cursor or Claude Code's native `/run`, `/plan`, or `/test`), all 15 custom commands use the explicit `-ca-agent` namespace:

| Category | Slash Commands Available | Operational Scope |
| :--- | :--- | :--- |
| **Planning & Specs** | `/plan-ca-agent` · `/task-ca-agent` · `/spec-check-ca-agent` · `/change-request-ca-agent` | Discovery research, task harness initialization, spec validation, change impact assessment |
| **Execution & TDD** | `/testing-ca-agent` · `/tdd-ca-agent` · `/implement-ca-agent` · `/run-ca-agent` | Failing test execution, Red-Green-Refactor, bounded implementation, dev server startup |
| **Quality & Security** | `/review-ca-agent` · `/verify-ca-agent` · `/security-audit-ca-agent` · `/release-check-ca-agent` | Git diff review, criteria verification scorecard, SAST security scan, production release gate |
| **Diagnostics & Handoff** | `/errorlogs-ca-agent` · `/gitlogs-ca-agent` · `/handoff-ca-agent` | Stack trace root-cause triage, git commit audit trails, engineering handoff dossiers |
| **Visual Mission Control** | `/dashboard-ca-agent` | Real-time In-IDE Bento Grid, 4-column drag-and-drop Kanban, Claude MOD token telemetry, and TDD heartbeat |

### Andrej Karpathy Engineering Skill (`andrej-karpathy-skill`)
Built into `.agents/skills/andrej-karpathy-skill/` across both tracks:
- **Inspect the Raw Data First:** Never guess schemas or APIs; inspect raw payloads and database seeds first.
- **Single-Batch Overfit / Micro-Baseline:** Make a single vertical feature slice work end-to-end before adding abstraction layers.
- **Immediate Feedback Loops:** Keep diffs small, verify each step live in the browser, and avoid blind multi-file refactoring.
- **Anti-Overengineering:** Keep code modular, inspectable, flat, and maintainable.

---

## 🖥️ In-IDE Project Manager Dashboard & Mission Control

Both frameworks include a lightweight, zero-dependency, Apple/Linear-inspired **Bento Grid Mission Control** designed specifically to run inside your coding IDE (Cursor, VS Code, Windsurf, Antigravity):

```text
=============================================================================================
             TRACK 1: VIBE-CODING                            TRACK 2: SDD + TDD
---------------------------------------------   ---------------------------------------------
* Port: http://127.0.0.1:4201                   * Port: http://127.0.0.1:4200
* Sensory: Karpathy loop speed & UI state       * Sensory: TDD Heartbeat & Red-Green Pulse
* Focus: Rapid prototype & design tokens        * Focus: Formal Spec Contracts & ADR status
=============================================================================================
```

### 🌟 6 Core Architectural Capabilities
1. **📋 4-Column Drag & Drop Kanban**:
   - `📥 Backlog`, `⚡ In Progress` (with 3-task WIP limit), `🔬 Review / Hold`, and `✅ Done`.
   - Native HTML5 Drag and Drop with authentic Framer Motion spring settling physics (`stiffness: 350, damping: 26`).
   - Bidirectional sync: dragging cards immediately mutates `docs/task.md` with zero data loss.
2. **🧠 Claude MOD Agent Context Window & Token Telemetry**:
   - Active context window capacity gauge (200,000 token ceiling) with health alerts (`Optimal <60%`, `Advisory 60-80%`, `Warning >80%` recommending `/compact`).
   - **4-Metric Grid**: Fresh Input tokens, Cache Read tokens (95%+ hit rate), Output/Thinking tokens, and real-time Cost & Savings telemetry ($150+ saved via prompt caching).
   - Slide-out deep-dive inspector drawer with turn-by-turn history table for the last 20 model invocations.
3. **🎯 Executive Scope & Phase Milestones Runway**:
   - 12 real-time indicators: Scope Delivery %, Completed Tasks, Active In-Flight, Spec AC Pass %, TDD Pulse, Active Phase, Blockers Radar, SAST Security Health, Test Assertions, Sprint Velocity, Git Churn, and Agent Autonomy.
   - Dynamic 5-phase gate runway tracker (`P1 Discovery ✓` -> `P2 Foundation 65%` -> `P3 Core Domain` ...).
4. **📈 Multi-Chart Scope Velocity & Analytics Hub**:
   - Trajectory burnup area curve, 7-day velocity cadence bars, and 3-ring quality concentric radial gauge (Unit/TDD 96%, AC Specs 92%, Security Lint 100%).
   - Task distribution spectrum bar reflecting instant status percentages.
5. **🔬 Spec AC Matrix & TDD Heartbeat**:
   - Live 60fps oscilloscope sine waveform pulsing Green or Red based on test assertions and Acceptance Criteria verification (`AC-*`).
6. **☀️/🌙 Telegram-Style Theme Switcher & 60fps Micro-Interactions**:
   - 360° spring toggle between Deep Obsidian Dark Mode and Clean Light Mode, audio chimes, and slide-up test runner drawer.

### 🚀 How to Launch & Dock in Your IDE Simple Browser
1. **Option A (Slash Command)**: Type `/dashboard-ca-agent` in your AI chat.
2. **Option B (VS Code Task)**: Press `Ctrl+Shift+B` or open Command Palette (`Ctrl+Shift+P`) -> `Tasks: Run Task` -> `Start Project Manager Dashboard`.
3. **Option C (One-Click Script)**: Double-click `open-in-ide.bat` (Windows) or execute `./open-in-ide.sh` (Mac/Linux).
4. **Dock in IDE**: Press `Ctrl+Shift+P` -> `Simple Browser: Show` -> enter `http://127.0.0.1:4200` (SDD) or `http://127.0.0.1:4201` (Vibe). The dashboard docks into a split editor tab right alongside your code!

---

## 📖 Complete Documentation Catalog

### 1. Universal Guides for ANY Project
- **[Vibe-Coding-Production-Guide-Universal.md](Vibe-Coding-Production-Guide-Universal.md)**  
  Universal 4-prompt Vibe-Coding production guide with parameterized placeholders and variable mapping for any SaaS, web app, or marketplace.
- **[SDD-TDD-Production-Guide-Universal.md](SDD-TDD-Production-Guide-Universal.md)**  
  Universal 5-prompt Spec-Driven Development & TDD production guide with parameterized placeholders for any enterprise or regulated system.
- **[Vibe-Coding-Custom-Slash-Command-Universal.md](Vibe-Coding-Custom-Slash-Command-Universal.md)**  
  Universal Vibe-Coding custom slash commands operational reference with exhaustive tabular workings for all 15 commands.
- **[SDD-TDD-Custom-Slash-Command-Universal.md](SDD-TDD-Custom-Slash-Command-Universal.md)**  
  Universal SDD+TDD custom slash commands operational reference with exhaustive tabular workings for all 15 commands.

### 2. Concrete Reference Implementations (School Management System Demo)
- **[Vibe-Coding-Production-Guide-SMS.md](Vibe-Coding-Production-Guide-SMS.md)**  
  Step-by-step production guide for building the EduSphere School Management SaaS website (Indigo/Slate palette, 30-sec attendance, optimistic UI).
- **[SDD-TDD-Production-Guide-SMS.md](SDD-TDD-Production-Guide-SMS.md)**  
  Step-by-step enterprise production guide for building the EduSphere Enterprise SMS platform (PostgreSQL RLS, FERPA compliance, TDD cycles).
- **[Vibe-Coding-Custom-Slash-Command-SMS.md](Vibe-Coding-Custom-Slash-Command-SMS.md)**  
  Dedicated Vibe-Coding custom slash commands guide driving the EduSphere SMS demo via conversational Karpathy loops.
- **[SDD-TDD-Custom-Slash-Command-SMS.md](SDD-TDD-Custom-Slash-Command-SMS.md)**  
  Dedicated SDD+TDD custom slash commands guide driving the EduSphere Enterprise SMS demo via formal compliance gates.

### 3. Architecture & Specification References
- **[docs/ide-compatibility.md](SDD-TDD-Chandan-Adhikary/Spec-Driven-Development/docs/ide-compatibility.md)** — Active IDE detection, pruning, and multi-IDE synchronization standard.
- **[specs/](SDD-TDD-Chandan-Adhikary/Spec-Driven-Development/specs/)** — Official SDD specifications supporting dual formats (Flat files vs. Modular folders).

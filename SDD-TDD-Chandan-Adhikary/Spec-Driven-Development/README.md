# Spec-Driven Development (SDD) & TDD Framework
### Enterprise Production-Grade Software Engineering with Autonomous AI Agents

<div align="center">

[![Framework](https://img.shields.io/badge/Framework-Spec--Driven_Development-blue?style=for-the-badge&logo=shield)](.)
[![Methodology](https://img.shields.io/badge/Methodology-Test--Driven_Development_(TDD)-indigo?style=for-the-badge)](.)
[![Governance](https://img.shields.io/badge/Governance-Zero_Speculative_Coding-red?style=for-the-badge)](.)
[![In-IDE Dashboard](https://img.shields.io/badge/Dashboard-Port_4200-teal?style=for-the-badge)](.)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](../../LICENSE.md)

**Framework Lead:** Chandan Adhikary · **Standard:** Enterprise Production Release 2.0.0  
**Target Domains:** Enterprise SaaS · FinTech Core · HealthTech · Multi-Tenant Platforms · Regulated Systems

[🌟 Framework Overview](#-framework-overview) • [🏛️ System Architecture](#️-system-architecture--spec-driven-pipeline) • [🔄 Traceability Flow](#-spec-to-code-traceability-contract) • [⚡ Quick-Start](#-quick-start-guide) • [🛡️ Slash Commands](#️-collision-free-agent-slash-commands--ca-agent) • [📁 Structure](#-repository-structure--component-map) • [📋 Governance](#-governance-rules--policies)

</div>

---

## 🌟 Framework Overview

**Spec-Driven Development (SDD)** paired with **Test-Driven Development (TDD)** is an enterprise engineering framework designed for high-assurance, zero-defect software creation with AI coding agents. In this framework, **the specification is the law**: no code is ever written speculatively, and every single production function is directly verified by failing automated tests before implementation begins.

### The 4 Pillars of SDD + TDD:
1. **Contract-First Authority:** All behavior must be formally declared in `docs/features/` and approved by a human lead before any code is drafted.
2. **Strict Red-Green-Refactor Cycle:** Write executable unit/integration tests directly against approved Acceptance Criteria (`AC-*`), verify that they fail (`RED`), implement the absolute minimal code (`GREEN`), and refactor cleanly.
3. **Staged Web Development:** For web applications, develop the frontend first (UI design, layout, responsiveness, mock/client state), verify it via a live demo run (`/run-ca-agent`), and only after visual sign-off proceed to backend persistence, security hardening, and test suites.
4. **Mandatory Development Logging (`logs/` Folder):** Always record clean, sanitized development logs (`logs/dev.log`, `logs/test.log`, `logs/server.log`, `logs/error.log`) inside a dedicated `logs/` directory.

---

## 🏛️ System Architecture & Spec-Driven Pipeline

The end-to-end SDD-TDD lifecycle follows a strict contract-first progression:

```mermaid
flowchart TD
    classDef gov fill:#0f172a,stroke:#38bdf8,stroke-width:1.5px,color:#f8fafc;
    classDef spec fill:#172554,stroke:#60a5fa,stroke-width:1.5px,color:#eff6ff;
    classDef red fill:#4c0519,stroke:#fb7185,stroke-width:2px,color:#fff1f2;
    classDef green fill:#064e3b,stroke:#34d399,stroke-width:2px,color:#ecfdf5;
    classDef gate fill:#451a03,stroke:#fbbf24,stroke-width:2px,color:#fffbeb;

    subgraph GovernancePhase ["🏛️ 1. GOVERNANCE & ARCHITECTURE SYNTHESIS"]
        ProductVision["<b>💡 Product Vision & Capabilities</b><br/><small>docs/product.md • CAP-### Taxonomy</small>"]:::gov
        PRD["<b>📑 System Requirements (PRD)</b><br/><small>docs/prd.md • REQ-### Requirements</small>"]:::gov
        SysArch["<b>🏛️ System Architecture & HLD/LLD</b><br/><small>docs/system-architecture.md • Boundaries</small>"]:::gov
    end

    subgraph SpecPhase ["📋 2. EXECUTABLE SPECIFICATION CONTRACT"]
        SpecFormat{"Spec Format?"}:::gate
        SpecDraft["<b>📝 Feature Specification Drafting</b><br/><small>docs/features/NNN-name.md (FEAT-###)</small>"]:::spec
        ACDefine["<b>🧪 Acceptance Criteria (AC-*)</b><br/><small>Given / When / Then Scenario Modeling</small>"]:::spec
        HumanReview{"Architecture Approved?"}:::gate
    end

    subgraph TDDPhase ["🧪 3. TEST-DRIVEN IMPLEMENTATION (TDD)"]
        RedTest["<b>🔴 RED PHASE: Failing Tests First</b><br/><small>Run /testing-ca-agent -> Confirm Fail</small>"]:::red
        GreenCode["<b>🟢 GREEN PHASE: Minimal Code</b><br/><small>Satisfy Assertions -> All Tests Pass</small>"]:::green
        Refactor["<b>✨ REFACTOR PHASE: Architecture Polish</b><br/><small>Eliminate Duplication • Zero Regression</small>"]:::green
    end

    subgraph GatePhase ["🚀 4. QUALITY AUDIT & RELEASE GATE"]
        CodeReview["<b>🔍 /review-ca-agent & /verify-ca-agent</b><br/><small>Diff Inspection & AC Scorecard Check</small>"]:::gov
        SecurityScan["<b>🛡️ /security-audit-ca-agent</b><br/><small>SAST, Secret Leaks & Dependency Scan</small>"]:::gov
        ReleaseGate{"Release Gate Passed?"}:::gate
        ProductionDeploy(["<b>🎉 Production-Ready Release</b><br/><small>Zero-Defect Enterprise Deployment</small>"]):::green
    end

    ProductVision -->|"Refines"| PRD
    PRD -->|"Architects"| SysArch
    SysArch -->|"Defines Bounds"| SpecFormat
    SpecFormat -->|"Tier 1/2 (1-6 files)"| SpecDraft
    SpecFormat -->|"Tier 3 (7+ files / RLS)"| SpecDraft
    SpecDraft -->|"Specifies"| ACDefine
    ACDefine -->|"Submits for Sign-off"| HumanReview

    HumanReview -->|"Revise"| SpecDraft
    HumanReview -->|"APPROVED"| RedTest

    RedTest -->|"Write Production Code"| GreenCode
    GreenCode -->|"Refactor & Optimize"| Refactor
    Refactor -->|"Triggers Verification"| CodeReview

    CodeReview -->|"Pass"| SecurityScan
    SecurityScan -->|"Clean Audit"| ReleaseGate
    ReleaseGate -->|"Ship Authorized"| ProductionDeploy
```

---

## 🔄 Spec-to-Code Traceability Contract

Every line of production code is mathematically traceable to a root business capability:

```mermaid
flowchart LR
    classDef cap fill:#0f172a,stroke:#38bdf8,stroke-width:2px,color:#f8fafc;
    classDef req fill:#1e293b,stroke:#818cf8,stroke-width:1.5px,color:#f8fafc;
    classDef feat fill:#172554,stroke:#60a5fa,stroke-width:1.5px,color:#eff6ff;
    classDef ac fill:#312e81,stroke:#a5b4fc,stroke-width:1.5px,color:#e0e7ff;
    classDef test fill:#064e3b,stroke:#34d399,stroke-width:2px,color:#ecfdf5;
    classDef code fill:#022c22,stroke:#10b981,stroke-width:2px,color:#d1fae5;

    CAP["<b>💡 CAPABILITY</b><br/><small>CAP-001: Student Lifecycle</small>"]:::cap -->|"Deconstructs to"| REQ["<b>📑 REQUIREMENT</b><br/><small>REQ-002: Enrollment Service</small>"]:::req
    REQ -->|"Specified by"| FEAT["<b>📝 FEATURE SPEC</b><br/><small>FEAT-002: Admission Workflow</small>"]:::feat
    FEAT -->|"Enforces Contract"| AC["<b>🧪 ACCEPTANCE CRITERIA</b><br/><small>AC-FEAT002-01: Unique ID Check</small>"]:::ac
    AC -->|"Directly Verified by"| TEST["<b>🔬 AUTOMATED TEST</b><br/><small>TEST-FEAT002-01 (tests/unit/)</small>"]:::test
    TEST ==>|"Guarantees"| CODE["<b>💻 PRODUCTION CODE</b><br/><small>src/modules/students/enroll.ts</small>"]:::code
```

---

## ⚡ Quick-Start Guide

### Step 1: Scaffolding into Your Project Workspace
Extract or copy the `Spec-Driven-Development/` directory into your project root:
```bash
# Rename to your target project name (kebab-case)
mv Spec-Driven-Development my-enterprise-core
cd my-enterprise-core
```

### Step 2: Verify Slash Commands
Verify that your host IDE recognizes the `.agents/` contracts:
1. Focus your AI agent chat and type `/`. Confirm all 16 `*-ca-agent` commands appear with descriptions.
2. In terminal, verify command contracts:
   ```bash
   ls .agents/commands/*-ca-agent.md
   ```

### Step 3: Launch In-IDE Project-Manager-Dashboard
Launch the dedicated telemetry dashboard on port `4200`:
- **Slash Command:** Type `/dashboard-ca-agent` in agent chat.
- **Terminal:** Run `open-in-ide.bat` (Windows) or `bash open-in-ide.sh` (macOS/Linux).
- **Dock in IDE:** Open `Simple Browser: Show`, navigate to `http://127.0.0.1:4200`, and dock in Editor Group 2.

---

## 🛡️ Collision-Free Agent Slash Commands (`-ca-agent`)

All custom commands carry the `-ca-agent` namespace to guarantee zero collisions with IDE-reserved tokens:

| Command | Category | Operational Purpose |
| :--- | :--- | :--- |
| `/plan-ca-agent` | Planning | Scoped, read-only system design and architectural alignment. |
| `/task-ca-agent` | Planning | Atomic task harness initialization and contract tracking. |
| `/spec-check-ca-agent` | Specs | Validates feature spec compliance against acceptance criteria. |
| `/change-request-ca-agent` | Specs | Formal change request, impact assessment, and spec revision. |
| `/testing-ca-agent` | Execution | Targeted test execution; confirms failing tests in Red phase. |
| `/tdd-ca-agent` | Execution | Red-Green-Refactor implementation satisfying acceptance criteria. |
| `/implement-ca-agent` | Execution | Scope-restricted feature implementation. |
| `/run-ca-agent` | Execution | Local runtime verification; reports observed server URLs. |
| `/review-ca-agent` | Quality | Pre-commit diff, lint, and security review. |
| `/verify-ca-agent` | Quality | Objective scorecard validation against specification contracts. |
| `/security-audit-ca-agent` | Security | SAST, secret leak, and dependency audit across codebase. |
| `/release-check-ca-agent` | Release | Production readiness gate and ship/no-ship decision. |
| `/dashboard-ca-agent` | Dashboard | Launches local In-IDE Project-Manager-Dashboard on port 4200. |
| `/errorlogs-ca-agent` | Diagnostics | Structured runtime error triage and stack trace analysis. |
| `/gitlogs-ca-agent` | Diagnostics | Commit history and git traceability validation against task IDs. |
| `/handoff-ca-agent` | Handoff | Generates verifiable engineering handoff report for team transfer. |

---

## 📁 Repository Structure & Component Map

```mermaid
flowchart TD
    classDef agent fill:#0f172a,stroke:#38bdf8,stroke-width:2px,color:#f8fafc;
    classDef doc fill:#1e293b,stroke:#818cf8,stroke-width:1.5px,color:#f8fafc;
    classDef dash fill:#082f49,stroke:#0284c7,stroke-width:2px,color:#f0f9ff;
    classDef test fill:#064e3b,stroke:#34d399,stroke-width:1.5px,color:#ecfdf5;
    classDef log fill:#2e1065,stroke:#c084fc,stroke-width:1.5px,color:#faf5ff;

    subgraph RepoRoot ["🛡️ SPEC-DRIVEN-DEVELOPMENT /"]
        AGENTS["<b>🤖 Agent Master Directives</b><br/><small>AGENTS.md • GEMINI.md • CLAUDE.md Governance</small>"]:::agent
        AgentsDir["<b>🛠️ .agents/ Canonical Asset Store</b><br/><small>16 Commands • 18 Skills • Lifecycle Hooks</small>"]:::agent
        DocsDir["<b>📑 docs/ Architecture & Living Specs</b><br/><small>Living Specs • System Design • ADR Records</small>"]:::doc
        DashboardDir["<b>🖥️ Project-Manager-Dashboard</b><br/><small>In-IDE Mission Control • Local Port 4200</small>"]:::dash
        TestsDir["<b>🧪 tests/ Automated Test Harness</b><br/><small>Unit, Integration & E2E Acceptance Suites</small>"]:::test
        LogsDir["<b>🪵 logs/ Audit Directory</b><br/><small>Structured Runtime Logs • Sanitized PII</small>"]:::log
    end
```

---

## 📋 Governance Rules & Policies

- **Guideline Baseline:** Fixed baseline `2.0.0`; modifications require explicit justification and logging in `docs/guideline-CHANGELOG.md`.
- **Feature Specification Authority:** Never implement code missing from the latest approved spec in `docs/features/`.
- **Dual Format Policy:**
  - **Flat Format (`docs/features/NNN-name.md`):** Tier 1 (Easy) and Tier 2 (Intermediate) features.
  - **Modular Format (`docs/features/NNN-name/{feature,acceptance,test-plan}.md`):** Tier 3 (Complex / Distributed) features.
- **Traceability Requirement:** All tests must carry `TEST-FEAT###-## / AC-FEAT###-##: <behavior>` in their title.
- **Development Logging:** All command runs and background test suites must write sanitized output to `logs/*.log`.

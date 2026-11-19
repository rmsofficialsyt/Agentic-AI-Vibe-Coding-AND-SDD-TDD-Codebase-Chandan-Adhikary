# Portable Agent Slash Commands (`-ca-agent`)
### 16 Canonical, Collision-Free Command Contracts for Autonomous Coding Agents

<div align="center">

[![Namespace](https://img.shields.io/badge/Namespace-*-ca--agent-blue?style=for-the-badge)](.)
[![Collision Prevention](https://img.shields.io/badge/Collisions-Zero_Shadowing-green?style=for-the-badge)](.)
[![Count](https://img.shields.io/badge/Commands-16_Standardized_Tools-indigo?style=for-the-badge)](.)
[![Logging](https://img.shields.io/badge/Audit_Trail-Mandatory_logs/_Output-teal?style=for-the-badge)](.)

[🌟 Overview](#-overview) • [🔄 Lifecycle State Machine](#-command-lifecycle-state-machine) • [⚡ Dispatch Pipeline](#-command-dispatch--authorization-pipeline) • [📋 Catalog](#-command-catalog-16)

</div>

---

## 🌟 Overview

Every custom command in this framework uses the explicit `-ca-agent` namespace suffix (e.g. `run-ca-agent.md`, `review-ca-agent.md`, `plan-ca-agent.md`) and is invoked directly inside agent chat as `/<name>-ca-agent`.

### Collision Prevention Policy
> [!CRITICAL]
> **MUST NOT** name custom commands with generic tokens such as `/run`, `/plan`, `/test` or `/review`. Host coding IDEs (Cursor, Claude Code, Windsurf, Antigravity, OpenCode) reserve these tokens for internal system features. The `-ca-agent` suffix guarantees:
> 1. Zero collisions with built-in IDE slash commands.
> 2. Predictable invocation across multi-agent environments.
> 3. 100% portability between all host IDE adapters.

---

## 🔄 Command Lifecycle State Machine

```mermaid
stateDiagram-v2
    [*] --> PlanPhase: 💡 /plan-ca-agent (Read-Only R&D)
    PlanPhase --> SpecCheck: 📋 /spec-check-ca-agent (AC Traceability)
    SpecCheck --> TaskSetup: 📌 /task-ca-agent (Harness Init)
    
    state ExecutionPhase {
        [*] --> TestRed: 🔴 /testing-ca-agent (Confirm Fail)
        TestRed --> TddGreen: 🟢 /tdd-ca-agent (Satisfy Tests)
        TddGreen --> Implement: 🏗️ /implement-ca-agent (Bounded Code)
        Implement --> RuntimeCheck: 🌐 /run-ca-agent (Runtime Check)
    }

    TaskSetup --> ExecutionPhase

    state QualityPhase {
        [*] --> ReviewDiff: 🔍 /review-ca-agent (Clean Diff)
        ReviewDiff --> VerifyScore: 📊 /verify-ca-agent (AC Scorecard)
        VerifyScore --> SecAudit: 🛡️ /security-audit-ca-agent (SAST Scan)
    }

    ExecutionPhase --> QualityPhase
    QualityPhase --> ReleaseGate: 🚀 /release-check-ca-agent (Release Gate)
    ReleaseGate --> [*]: 🎉 Production Ship

    state SupportTools {
        Dashboard: 🖥️ /dashboard-ca-agent (Port 4200)
        ErrorTriage: 🐛 /errorlogs-ca-agent (RCA Analysis)
        GitAudit: 🗄️ /gitlogs-ca-agent (Traceability)
        HandoffDossier: 📑 /handoff-ca-agent (Engineering Dossier)
        ChangeImpact: 🔄 /change-request-ca-agent (CR Impact)
    }
```

---

## ⚡ Command Dispatch & Authorization Pipeline

```mermaid
flowchart LR
    classDef dev fill:#0f172a,stroke:#38bdf8,stroke-width:2px,color:#f8fafc;
    classDef gate fill:#451a03,stroke:#fbbf24,stroke-width:2px,color:#fffbeb;
    classDef exec fill:#082f49,stroke:#0284c7,stroke-width:1.5px,color:#f0f9ff;
    classDef log fill:#1e293b,stroke:#64748b,stroke-width:1.5px,color:#f8fafc;
    classDef report fill:#064e3b,stroke:#34d399,stroke-width:2px,color:#ecfdf5;

    DevPrompt(["<b>👤 Developer Invocation</b><br/><sub>'/<name>-ca-agent [args]'</sub>"]):::dev -->|"Parses Contract"| Validator["<b>📑 Contract Validator</b><br/><sub>Reads YAML Frontmatter</sub>"]:::exec
    Validator -->|"Requires Gate"| HumanGate{"<b>👤 Human Lead Gate</b><br/><sub>Authorizes Execution</sub>"}:::gate
    HumanGate -->|"Authorized"| Execution[["<b>⚙️ Agent Execution</b><br/><sub>Deterministic Tool Calls</sub>"]]:::exec
    Execution -->|"Pipes Output"| DevLog[("<b>🪵 Audit Trail in logs/</b><br/><sub>dev.log, test.log, error.log</sub>")]:::log
    DevLog ==>|"Evidence Returned"| ReportResult(["<b>📊 Return Evidence</b><br/><sub>Standardized Report to Chat & UI</sub>"]):::report
```

---

## 📋 Command Catalog (16)

| Command | Category | Purpose | Required Evidence |
| :--- | :--- | :--- | :--- |
| **`/plan-ca-agent`** | Planning | Scoped, read-only system design proposal. | Plan artifact, risk analysis, no code modified. |
| **`/task-ca-agent`** | Planning | Atomic task harness initialization and contract tracking. | `docs/task.md` entry, sequential task ID. |
| **`/spec-check-ca-agent`** | Specs | Feature specification compliance verification. | Traceability verification table against `AC-*`. |
| **`/change-request-ca-agent`** | Specs | Formal change request and architectural impact evaluation. | Change impact matrix, spec version bump. |
| **`/testing-ca-agent`** | Execution | Targeted test execution and suite validation. | Real terminal command outputs, exit codes. |
| **`/tdd-ca-agent`** | Execution | Red-Green-Refactor test-driven implementation. | Red fail evidence, Green pass, refactor diff. |
| **`/implement-ca-agent`** | Execution | Scope-restricted feature implementation. | Strict file modifications matching spec only. |
| **`/run-ca-agent`** | Execution | Local startup and runtime health verification. | Observed URLs (`localhost:PORT`), health response. |
| **`/review-ca-agent`** | Quality | Pre-commit diff, lint, and security review. | Clean `git diff` review, zero unauthorized files. |
| **`/verify-ca-agent`** | Quality | Objective quality-gate validation against specs. | AC scorecard, test pass percentages. |
| **`/security-audit-ca-agent`** | Security | SAST, secret leak, and permission audit. | Dependency scan, zero secret leak verification. |
| **`/release-check-ca-agent`** | Release | Production readiness and release-checklist gate. | Signed approval evidence, ship/no-ship verdict. |
| **`/dashboard-ca-agent`** | Mission Control | Launches local In-IDE Project-Manager-Dashboard. | Confirmed local URL (`http://127.0.0.1:4200`). |
| **`/errorlogs-ca-agent`** | Diagnostics | Structured runtime error and diagnostic log analysis. | Root cause triage, reproduction test case. |
| **`/gitlogs-ca-agent`** | Diagnostics | Git history, commit traceability, and branch state check. | Commit hash audit, DD-MM-YYYY dates verified. |
| **`/handoff-ca-agent`** | Handoff | Verifiable engineering handoff report generation. | Complete handoff dossier for engineering team. |

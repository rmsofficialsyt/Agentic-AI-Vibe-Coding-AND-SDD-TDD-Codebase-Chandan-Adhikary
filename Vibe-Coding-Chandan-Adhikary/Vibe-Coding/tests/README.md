# Test Harness & Hardening Suite
### Visual Runtime Sanity & Progressive Hardening for Vibe-Coding

<div align="center">

[![Testing](https://img.shields.io/badge/Testing-Sensory_Sanity_&_Hardening-purple?style=for-the-badge&logo=vitest)](.)
[![Workflow](https://img.shields.io/badge/Workflow-Visual_Validation_First-pink?style=for-the-badge)](.)
[![Quality Gate](https://img.shields.io/badge/Gate-Pre--Deploy_Hardening-blue?style=for-the-badge)](.)
[![Audit Logging](https://img.shields.io/badge/Logging-logs/_test.log-teal?style=for-the-badge)](.)

[🌟 Overview](#-overview) • [🏛️ Hardening Pipeline](#️-vibe-hardening-pipeline) • [📁 Directory Layout](#-directory-layout--conventions) • [⚡ Commands](#-execution-commands)

</div>

---

## 🌟 Overview

In **Vibe-Coding**, testing follows a progressive hardening philosophy. During the initial exploration and UI prototyping stages, verification is visual and sensory via `/run-ca-agent` at `http://localhost:3000`. Once user flows and aesthetics are approved, automated sanity and regression tests are implemented to harden the application before production release.

---

## 🏛️ Vibe Hardening Pipeline

```mermaid
flowchart TD
    classDef sensory fill:#2e1065,stroke:#c084fc,stroke-width:1.5px,color:#faf5ff;
    classDef gate fill:#451a03,stroke:#fbbf24,stroke-width:2px,color:#fffbeb;
    classDef harden fill:#082f49,stroke:#38bdf8,stroke-width:1.5px,color:#f0f9ff;
    classDef pass fill:#064e3b,stroke:#34d399,stroke-width:2px,color:#ecfdf5;

    subgraph SensoryStage ["🎨 STAGE 1: SENSORY UI DEMO VERIFICATION"]
        LiveDemo["<b>🔌 Run /run-ca-agent</b><br/><sub>Starts Live Dev Server at http://localhost:3000</sub>"]:::sensory
        SensoryCheck["<b>🌐 Sensory UX Inspection</b><br/><sub>Inspect Visual Aesthetics, Responsiveness & Animations</sub>"]:::sensory
        VibeSignOff{"<b>✨ Vibe Approval Gate</b><br/><sub>Does the user experience feel right?</sub>"}:::gate
    end

    subgraph HardeningStage ["🔒 STAGE 2: PROGRESSIVE HARNESS HARDENING"]
        ComponentTests["<b>🧩 Component & State Tests</b><br/><sub>Header, Dialogs, Cards (tests/components/)</sub>"]:::harden
        ValidationTests["<b>📑 Schema & DTO Tests</b><br/><sub>Zod Validation & Typed Form Inputs</sub>"]:::harden
        RegressionTests["<b>🔌 API Regression Tests</b><br/><sub>Route Handlers & State Persistence (tests/integration/)</sub>"]:::harden
    end

    subgraph ReleaseStage ["🚀 STAGE 3: PRE-DEPLOY RELEASE GATE"]
        TestRun[["<b>🏃 Execute /testing-ca-agent</b><br/><sub>Automated Test Harness Output -> logs/test.log</sub>"]]:::harden
        ShipVerdict(["<b>🎉 /release-check-ca-agent Passed</b><br/><sub>Zero-Defect Production Deployment Authorized</sub>"]):::pass
    end

    LiveDemo --> SensoryCheck
    SensoryCheck --> VibeSignOff
    VibeSignOff -->|"Approved"| ComponentTests
    ComponentTests --> ValidationTests
    ValidationTests --> RegressionTests
    RegressionTests --> TestRun
    TestRun --> ShipVerdict
```

---

## 📁 Directory Layout & Conventions

```text
tests/
├── components/                               # Visual and interaction component tests
│   ├── hero.test.tsx                         # Header, navigation, and CTA checks
│   └── dashboard-card.test.tsx               # State rendering & interaction checks
├── integration/                              # API routes and client-server tests
│   └── api/newsletter.test.ts                # Endpoint validation & status checks
├── fixtures/                                 # Mock datasets for rapid testing
└── mocks/                                    # Service stubs & handlers
```

---

## ⚡ Execution Commands

| Target | Command | Operational Scope |
| :--- | :--- | :--- |
| **All Tests** | `npm test` or `pnpm test` | Runs all progressive hardening test suites. |
| **Component Tests** | `npm run test:components` | Validates UI rendering and interaction state. |
| **API Integration** | `npm run test:api` | Verifies endpoints, status codes, and schema validation. |
| **Watch Mode** | `npm run test:watch` | Instant feedback while refactoring components. |

> [!NOTE]
> All test executions must write clean, sanitized output to `logs/test.log`.

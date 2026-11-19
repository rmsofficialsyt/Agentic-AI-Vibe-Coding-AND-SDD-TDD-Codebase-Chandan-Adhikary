# Feature Specifications (`docs/features/`)
### Living Contracts & Sensory UI Specifications for Vibe-Coding

<div align="center">

[![Specifications](https://img.shields.io/badge/Contracts-Living_Feature_Specs-purple?style=for-the-badge&logo=gitbook)](.)
[![Formats](https://img.shields.io/badge/Formats-Flat_|_Modular-indigo?style=for-the-badge)](.)
[![Lifecycle](https://img.shields.io/badge/Lifecycle-Progressive_Hardening-pink?style=for-the-badge)](.)
[![Traceability](https://img.shields.io/badge/Traceability-FEAT_|_AC_|_SENSORY-green?style=for-the-badge)](../requirements-traceability.md)

[🌟 Purpose](#-purpose) • [🏛️ Format Decision Tree](#️-flat-vs-modular-decision-tree) • [📊 Complexity Tiers](#-feature-complexity-breakdown-tiers) • [🔄 Lifecycle State Machine](#-living-specification-lifecycle-state-machine) • [📋 Traceability](#-identifier-traceability-scheme)

</div>

---

## 🌟 Purpose

`docs/features/` is the canonical location for living feature contracts within the Vibe-Coding framework. Feature specifications evolve from initial prototype notes into hardened, production-ready contracts.

---

## 🏛️ Flat vs. Modular Decision Tree

```mermaid
flowchart LR
    classDef start fill:#0f172a,stroke:#38bdf8,stroke-width:2px,color:#f8fafc;
    classDef gate fill:#451a03,stroke:#fbbf24,stroke-width:2px,color:#fffbeb;
    classDef flat fill:#2e1065,stroke:#c084fc,stroke-width:1.5px,color:#faf5ff;
    classDef modular fill:#082f49,stroke:#38bdf8,stroke-width:2px,color:#f0f9ff;

    Start(["<b>🚀 Initiate New Feature Specification</b><br/><small>Triggered via /plan-ca-agent or Vibe Planning</small>"]):::start --> DevAsk{"Format Choice?"}:::gate
    
    DevAsk -->|"User Defined"| UserChoice["<b>🎯 Follow Explicit User Choice</b><br/><small>Adhere strictly to chosen format</small>"]:::start
    DevAsk -->|"Auto Detect"| AutoTier{"Evaluate Tier?"}:::gate
    
    AutoTier -->|"Tier 1 / Tier 2"| FlatFormat["<b>📄 Scaffold Flat Format</b><br/><small>docs/features/NNN-name.md • Single Living Contract</small>"]:::flat
    AutoTier -->|"Tier 3"| ModularFormat["<b>📁 Scaffold Modular Format</b><br/><small>docs/features/NNN-name/ • Multi-File Modular Spec</small>"]:::modular
```

---

## 📊 Feature Complexity Breakdown Tiers

| Tier | Complexity Category | Scope & Criteria | Testing & Sensory Gate |
|---|---|---|---|
| **Tier 1** | **Easy (Low Complexity)** | Self-contained, static UI, simple CRUD, single table, read-only views (1–2 files). | Rapid sensory test & unit check. |
| **Tier 2** | **Intermediate (Medium Complexity)** | Form validation, interactive UI state transitions, auth guards, API endpoints (3–6 files). | Unit + component integration tests; visual state checks. |
| **Tier 3** | **Hard / Complex (High Complexity)** | Multi-tenant RLS, distributed state, WebSocket live streams, external payment webhooks, background pipelines (7+ files). | Automated integration tests + live end-to-end verification. |

---

## 🔄 Step-by-Step Spec Development Protocol

```mermaid
flowchart LR
    classDef step fill:#2e1065,stroke:#c084fc,stroke-width:1.5px,color:#faf5ff;
    classDef sensory fill:#064e3b,stroke:#34d399,stroke-width:2px,color:#ecfdf5;
    classDef gate fill:#451a03,stroke:#fbbf24,stroke-width:2px,color:#fffbeb;

    subgraph ForwardTier ["🎨 SENSORY PROTOTYPING STAGE"]
        direction LR
        SelectSpec["<b>1. 📑 Select Spec</b><br/><small>Living Contract Draft</small>"]:::step
        ScaffoldCode["<b>2. 🎨 UI & Layout</b><br/><small>Interactive Components</small>"]:::step
        LiveVerify["<b>3. 🌐 Live Verification</b><br/><small>Sensory Demo at :3000</small>"]:::sensory
    end

    subgraph HardeningTier ["🔒 PROGRESSIVE HARDENING STAGE"]
        direction LR
        UpdateDocs["<b>4. 📝 Update Docs</b><br/><small>Living Trackers Synced</small>"]:::step
        NextSpec{"Next Spec?"}:::gate
        FinalAudit(["<b>5. 🚀 Release Audit</b><br/><small>/release-check-ca-agent</small>"]):::sensory
    end

    SelectSpec -->|"Plan"| ScaffoldCode
    ScaffoldCode -->|"Demo"| LiveVerify
    LiveVerify ==>|"Vibe Check"| UpdateDocs

    UpdateDocs -->|"Evaluate"| NextSpec
    NextSpec -->|"Yes: Next"| SelectSpec
    NextSpec -->|"No: Done"| FinalAudit
```

> [!CRITICAL]
> **MUST NOT** begin work on a subsequent feature until the current feature's acceptance criteria and sensory checkpoints are fully met, verified, and documented.

---

## 🔄 Living Specification Lifecycle State Machine

```mermaid
stateDiagram-v2
    [*] --> PROTOTYPE: 🎨 Fluid Vibe Discovery
    PROTOTYPE --> DRAFT: 📝 Living Spec Scaffolded
    DRAFT --> IN_REVIEW: 🌐 Interactive Demo Verified
    IN_REVIEW --> APPROVED: 👤 Human Approval for Production
    
    APPROVED --> SUPERSEDED: 📑 Newer Spec Iteration
    APPROVED --> DEPRECATED: 📦 Capability Retired
    
    SUPERSEDED --> [*]
    DEPRECATED --> [*]
```

| Status | Meaning | Implementation Allowed? |
| :--- | :--- | :--- |
| **`PROTOTYPE`** | Initial discovery notes; experimental code. | Rapid prototyping only |
| **`DRAFT`** | Living specification draft being refined. | UI scaffolding permitted |
| **`IN REVIEW`** | Submitted for team and visual sign-off. | Pre-deploy testing |
| **`APPROVED`** | Formally signed off for production. | **YES** — production code |
| **`SUPERSEDED`**| Replaced by a newer approved version. | No new work |
| **`DEPRECATED`**| Capability retired or decommissioned. | Removal work only |

---

## 📋 Identifier Traceability Scheme

Defined canonically in `docs/requirements-traceability.md`:

| Artifact | Pattern | Concrete Example |
| :--- | :--- | :--- |
| **Feature Contract** | `FEAT-###` | `FEAT-002` |
| **Functional Requirement** | `FR-FEAT###-##` | `FR-FEAT002-01` |
| **Acceptance Criterion** | `AC-FEAT###-##` | `AC-FEAT002-03` |
| **Sensory UI Check** | `SENSORY-FEAT###-##` | `SENSORY-FEAT002-01` |
| **Test Case Identifier** | `TEST-FEAT###-##` | `TEST-FEAT002-03` |

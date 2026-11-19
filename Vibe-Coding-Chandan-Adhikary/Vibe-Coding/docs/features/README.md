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
flowchart TD
    Start["Initiate New Feature Spec<br/>(/plan-ca-agent or Vibe Planning)"] --> DevAsk{"Ask Developer:<br/>'Do you prefer Flat or Modular format?'"}
    
    DevAsk -->|"Developer Specifies"| UserChoice["Follow Explicit User Choice"]
    DevAsk -->|"Developer Defers / No Choice"| AutoTier{"Evaluate Complexity Tier"}
    
    AutoTier -->|"Tier 1 (Easy) or Tier 2 (Intermediate)<br/>1 to 6 files impacted"| FlatFormat["Scaffold Flat Format<br/>docs/features/NNN-name.md<br/>(Single cohesive document)"]
    AutoTier -->|"Tier 3 (Complex / Distributed)<br/>7+ files, RLS, queues, payments"| ModularFormat["Scaffold Modular Format<br/>docs/features/NNN-name/<br/>├── feature.md<br/>├── acceptance.md<br/>└── test-plan.md"]
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
flowchart TD
    SelectSpec["1. Select Single Spec<br/>(e.g., FEAT-001)"] --> ScaffoldCode["2. Implement Layout & Logic<br/>(Satisfy visual & functional needs)"]
    ScaffoldCode --> LiveVerify["3. Test & Sensory Check<br/>(Visual inspection via /run-ca-agent)"]
    LiveVerify --> UpdateDocs["4. Update Docs & Trackers<br/>(docs/task.md, error-tracker.md)"]
    UpdateDocs --> NextSpec{"More features to build?"}
    NextSpec -->|"Yes: Step-by-step next spec"| SelectSpec
    NextSpec -->|"No: All done"| FinalAudit["5. Run /release-check-ca-agent"]
```

> [!CRITICAL]
> **MUST NOT** begin work on a subsequent feature until the current feature's acceptance criteria and sensory checkpoints are fully met, verified, and documented.

---

## 🔄 Living Specification Lifecycle State Machine

```mermaid
stateDiagram-v2
    [*] --> PROTOTYPE: Fluid Vibe Discovery
    PROTOTYPE --> DRAFT: Living Spec Scaffolded
    DRAFT --> IN_REVIEW: Interactive Demo Verified
    IN_REVIEW --> APPROVED: Signed Approval for Production
    
    APPROVED --> SUPERSEDED: Newer Spec Iteration
    APPROVED --> DEPRECATED: Capability Retired
    
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

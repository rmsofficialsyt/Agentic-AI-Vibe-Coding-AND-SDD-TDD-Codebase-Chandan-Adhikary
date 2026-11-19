# Feature Specifications (`docs/features/`)
### Canonical Living Contracts & Acceptance Criteria Architecture

<div align="center">

[![Specifications](https://img.shields.io/badge/Contracts-Living_Feature_Specs-blue?style=for-the-badge&logo=gitbook)](.)
[![Formats](https://img.shields.io/badge/Formats-Flat_|_Modular-indigo?style=for-the-badge)](.)
[![Lifecycle](https://img.shields.io/badge/Lifecycle-Formal_Quality_Gates-teal?style=for-the-badge)](.)
[![Traceability](https://img.shields.io/badge/Traceability-CAP_|_REQ_|_AC_|_TEST-green?style=for-the-badge)](../requirements-traceability.md)

[🌟 Purpose](#-purpose) • [🏛️ Format Decision Tree](#️-flat-vs-modular-decision-tree) • [📊 Complexity Tiers](#-feature-complexity-breakdown-tiers) • [🔄 Lifecycle State Machine](#-specification-lifecycle-state-machine) • [📋 Traceability](#-identifier-traceability-scheme)

</div>

---

## 🌟 Purpose

`docs/features/` is the **only** canonical location for versioned feature contracts within the repository. A root-level `specs/` directory is not permitted. `docs/spec.md` indexes the current approved version of every feature; it never overrides an individual feature file.

### Traceability Hierarchy:
`docs/product.md` (Capabilities `CAP-###`) → `docs/prd.md` (Requirements `REQ-###`) → `docs/features/` (Contracts `FEAT-###`) → Automated Tests (`TEST-*`) → Production Code.

---

## 🏛️ Flat vs. Modular Decision Tree

```mermaid
flowchart LR
    classDef start fill:#0f172a,stroke:#38bdf8,stroke-width:2px,color:#f8fafc;
    classDef gate fill:#451a03,stroke:#fbbf24,stroke-width:2px,color:#fffbeb;
    classDef flat fill:#172554,stroke:#60a5fa,stroke-width:1.5px,color:#eff6ff;
    classDef modular fill:#2e1065,stroke:#c084fc,stroke-width:2px,color:#faf5ff;

    Start(["<b>🚀 Initiate New Feature Specification</b><br/><small>Triggered via /plan-ca-agent or /spec-check-ca-agent</small>"]):::start --> DevAsk{"Format Choice?"}:::gate
    
    DevAsk -->|"User Defined"| UserChoice["<b>🎯 Follow Explicit User Choice</b><br/><small>Adhere strictly to chosen format</small>"]:::start
    DevAsk -->|"Auto Detect"| AutoTier{"Evaluate Tier?"}:::gate
    
    AutoTier -->|"Tier 1 / Tier 2"| FlatFormat["<b>📄 Scaffold Flat Format</b><br/><small>docs/features/NNN-name.md • Single Living Contract</small>"]:::flat
    AutoTier -->|"Tier 3"| ModularFormat["<b>📁 Scaffold Modular Format</b><br/><small>docs/features/NNN-name/ • Multi-File Modular Spec</small>"]:::modular
```

---

## 📊 Feature Complexity Breakdown Tiers

Every feature must be categorized into one of three complexity tiers to drive sizing, test strategies, and implementation pacing:

| Tier | Complexity Category | Characteristics & Scope | Verification Strategy |
|---|---|---|---|
| **Tier 1** | **Easy (Low Complexity)** | Self-contained, static or simple CRUD, single table/model, minimal dependencies, read-only views, health check endpoints (1–2 files). | Unit tests only; rapid Red-Green cycle. |
| **Tier 2** | **Intermediate (Medium Complexity)** | Multi-table relational logic, form validation, role-based auth guards, API endpoints, state management, UI component interactions (3–6 files). | Unit + API integration tests; component state testing. |
| **Tier 3** | **Hard / Complex (High Complexity)** | Multi-tenant row-level security (RLS), distributed transactions, WebSocket live streams, external payment webhooks, background worker queues, forecasting/ML pipelines (7+ files). | Unit + Integration + Contract tests + E2E failure recovery scenarios. |

---

## 🔄 Step-by-Step Spec Development Protocol

```mermaid
flowchart TB
    classDef step fill:#082f49,stroke:#38bdf8,stroke-width:1.5px,color:#f0f9ff;
    classDef red fill:#4c0519,stroke:#fb7185,stroke-width:2px,color:#fff1f2;
    classDef green fill:#064e3b,stroke:#34d399,stroke-width:2px,color:#ecfdf5;
    classDef gate fill:#451a03,stroke:#fbbf24,stroke-width:2px,color:#fffbeb;

    subgraph ForwardTier ["🧪 SPEC IMPLEMENTATION STAGE"]
        direction LR
        SelectSpec["<b>1. 📑 Select Spec</b><br/><small>Approved FEAT-###</small>"]:::step
        WriteTests["<b>2. 🔴 Write Tests</b><br/><small>Verify AC (Red Phase)</small>"]:::red
        ImplementCode["<b>3. 🟢 Minimal Code</b><br/><small>Pass Tests (Green Phase)</small>"]:::green
    end

    subgraph ReviewTier ["🔍 VERIFICATION & REVIEW STAGE"]
        direction LR
        RefactorCode["<b>4. ✨ Refactor</b><br/><small>Clean Architecture</small>"]:::green
        UpdateDocs["<b>5. 📝 Update Docs</b><br/><small>Living Trackers Synced</small>"]:::step
        NextSpec{"Next Spec?"}:::gate
        ReleaseAudit(["<b>6. 🚀 Release Audit</b><br/><small>/release-check-ca-agent</small>"]):::green
    end

    SelectSpec -->|"Contract"| WriteTests
    WriteTests -->|"Failing"| ImplementCode
    ImplementCode ==>|"Pass All"| RefactorCode

    RefactorCode -->|"Polish"| UpdateDocs
    UpdateDocs -->|"Evaluate"| NextSpec
    NextSpec -->|"Yes: Next"| SelectSpec
    NextSpec -->|"No: Done"| ReleaseAudit
```

> [!CRITICAL]
> **MUST NOT** begin work on a subsequent feature until the current feature's acceptance criteria are fully met, verified green by automated tests, and all relevant documentation files are updated.

---

## 🔄 Specification Lifecycle State Machine

```mermaid
stateDiagram-v2
    [*] --> DRAFT: 📝 Author Specification
    DRAFT --> IN_REVIEW: 🔍 Submit for Review
    IN_REVIEW --> DRAFT: 🔄 Revisions Requested
    IN_REVIEW --> APPROVED: 👤 Human Approval (docs/approvals/)
    
    APPROVED --> SUPERSEDED: 📑 Replaced by Newer Approved Spec
    APPROVED --> DEPRECATED: 📦 Capability Retired / Decommissioned
    
    SUPERSEDED --> [*]
    DEPRECATED --> [*]
```

| Status | Meaning | Implementation Permitted? |
| :--- | :--- | :--- |
| **`DRAFT`** | Initial specification draft being written. | **No** |
| **`IN REVIEW`** | Submitted for developer/lead review. | **No** (tests may be drafted) |
| **`APPROVED`** | Formally signed off; record exists in `docs/approvals/`. | **YES** — strictly this approved version |
| **`SUPERSEDED`** | Replaced by a newer approved version. | **No** (new work forbidden) |
| **`DEPRECATED`** | Capability retired or decommissioned. | Removal work only |

---

## 📋 Identifier Traceability Scheme

Defined canonically in `docs/requirements-traceability.md`:

| Artifact | Pattern | Concrete Example |
| :--- | :--- | :--- |
| **Feature Contract** | `FEAT-###` | `FEAT-002` |
| **Functional Requirement** | `FR-FEAT###-##` | `FR-FEAT002-01` |
| **Non-Functional Requirement** | `NFR-FEAT###-##` | `NFR-FEAT002-01` |
| **Acceptance Criterion** | `AC-FEAT###-##` | `AC-FEAT002-03` |
| **Test Case Identifier** | `TEST-FEAT###-##` | `TEST-FEAT002-03` |

- **MUST** reference the AC ID (`AC-FEAT###-##`) in the title and description of every unit/integration test.
- **MUST** trace each feature to at least one `CAP-###` in `docs/product.md` and one `REQ-###` in `docs/prd.md`.

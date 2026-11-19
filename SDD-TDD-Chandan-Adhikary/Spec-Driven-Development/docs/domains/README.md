# Domain-Specific Engineering Extensions
### Industry Standards, Bounded Contexts & Regulatory Extensions for SDD-TDD

<div align="center">

[![Domain Extensions](https://img.shields.io/badge/Architecture-Bounded_Contexts-blue?style=for-the-badge&logo=codewars)](.)
[![Compliance](https://img.shields.io/badge/Compliance-Regulatory_Standards-indigo?style=for-the-badge)](.)
[![Governance](https://img.shields.io/badge/Governance-Audited_Adoption-teal?style=for-the-badge)](.)

[🌟 Overview](#-overview) • [🏛️ Domain Topology](#️-domain-extension-topology) • [📋 Governance Rules](#-governance-rules) • [📄 Template](#-extension-template)

</div>

---

## 🌟 Overview

The core framework provides universal software engineering rules. The `docs/domains/` directory allows projects to cleanly layer on **industry-specific or platform-specific rules**—such as Web Frontends, Mobile Apps, High-Throughput Distributed Systems, FinTech (PCI-DSS), Healthcare (HIPAA/FERPA), or AI/ML pipelines—without polluting foundational guidelines.

---

## 🏛️ Domain Extension Topology

```mermaid
flowchart LR
    classDef core fill:#0f172a,stroke:#38bdf8,stroke-width:2px,color:#f8fafc;
    classDef ext fill:#1e293b,stroke:#818cf8,stroke-width:1.5px,color:#f8fafc;
    classDef code fill:#064e3b,stroke:#34d399,stroke-width:2px,color:#ecfdf5;

    Core[("<b>🏛️ Core Framework Baseline</b><br/><sub>docs/rules.md • constitution.md</sub>")]:::core

    Ext1["<b>🌐 Web & Frontend Domain</b><br/><sub>docs/domains/web.md • SSR, Accessibility</sub>"]:::ext
    Ext2["<b>💳 FinTech / Regulated</b><br/><sub>docs/domains/fintech.md • PCI-DSS, Audit</sub>"]:::ext
    Ext3["<b>🏥 HealthTech / FERPA / HIPAA</b><br/><sub>docs/domains/health.md • Privacy</sub>"]:::ext
    Ext4["<b>🤖 AI & Machine Learning</b><br/><sub>docs/domains/aiml.md • Drift, Lineage</sub>"]:::ext

    ProjectCode(["<b>💻 Production Application Code</b><br/><sub>High-Assurance Verified Modules</sub>"]):::code

    Core -->|"Extends Rules"| Ext1
    Core -->|"Extends Rules"| Ext2
    Core -->|"Extends Rules"| Ext3
    Core -->|"Extends Rules"| Ext4

    Ext1 ==>|"Governs Code"| ProjectCode
    Ext2 ==>|"Governs Code"| ProjectCode
    Ext3 ==>|"Governs Code"| ProjectCode
    Ext4 ==>|"Governs Code"| ProjectCode
```

---

## 📋 Governance Rules

1. **Explicit Justification:** Domain extensions are added as `docs/domains/<domain>.md` only when base documentation is insufficient for specialized compliance or architectural requirements.
2. **Audit & Changelog Entry:** When introducing binding rules, record applicability, approval rationale, and a version entry in `docs/guideline-CHANGELOG.md`.
3. **AI/ML Requirements:** Any AI/ML domain extension **MUST** declare dataset lineage, evaluation thresholds, and drift detection criteria.
4. **Precedence Hierarchy:** Base governance rules (`docs/rules.md`) always take precedence unless an approved domain extension explicitly documents an authorized variance.

---

## 📄 Extension Template

```markdown
# Domain: <name>

> **Document class:** Controlled process guideline  
> **Framework:** SDD-TDD  
> **Guideline baseline:** 2.0.0  
> **Status:** Proposed / Adopted  

## Purpose
<Describe the specialized domain context and why standard guidelines require extension.>

## Applicability
<Define which projects, modules, or services must comply with this extension.>

## Agent Read Trigger
**MUST** read or consult this file: <specify exact operational conditions>.

## Normative Sections and Rules
### 1. <Topic>
- **MUST** — <specific domain rule>

## Evidence and Change Control
- **MUST** record adoption approval and link the guideline-CHANGELOG entry.
```

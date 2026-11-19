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
    Core["Core Framework Baseline<br/>(docs/rules.md, constitution.md)"] --> Ext1["Web & Frontend Domain<br/>(docs/domains/web.md)"]
    Core --> Ext2["FinTech / Regulated<br/>(docs/domains/fintech.md)"]
    Core --> Ext3["HealthTech / FERPA / HIPAA<br/>(docs/domains/health.md)"]
    Core --> Ext4["AI & Machine Learning<br/>(docs/domains/aiml.md)"]

    Ext1 --> ProjectCode["Production Application Code"]
    Ext2 --> ProjectCode
    Ext3 --> ProjectCode
    Ext4 --> ProjectCode
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

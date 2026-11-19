# Domain-Specific Engineering Extensions
### Industry Standards, Bounded Contexts & Platform Extensions for Vibe-Coding

<div align="center">

[![Domain Extensions](https://img.shields.io/badge/Architecture-Bounded_Contexts-purple?style=for-the-badge&logo=codewars)](.)
[![Compliance](https://img.shields.io/badge/Platforms-Web_|_Mobile_|_AI-indigo?style=for-the-badge)](.)
[![Governance](https://img.shields.io/badge/Governance-Audited_Adoption-teal?style=for-the-badge)](.)

[🌟 Overview](#-overview) • [🏛️ Domain Topology](#️-domain-extension-topology) • [📋 Governance Rules](#-governance-rules) • [📄 Template](#-extension-template)

</div>

---

## 🌟 Overview

The `docs/domains/` directory allows Vibe-Coding projects to cleanly layer on specialized domain standards—such as Mobile Apps (React Native/Flutter), Creative Audio/Video Tools, 3D WebGL, or AI/LLM interfaces—without disrupting foundational workflows.

---

## 🏛️ Domain Extension Topology

```mermaid
flowchart LR
    classDef core fill:#2e1065,stroke:#c084fc,stroke-width:2px,color:#faf5ff;
    classDef ext fill:#1e293b,stroke:#818cf8,stroke-width:1.5px,color:#f8fafc;
    classDef code fill:#064e3b,stroke:#34d399,stroke-width:2px,color:#ecfdf5;

    Core[("<b>🎨 Core Framework Baseline</b><br/><small>docs/rules.md • docs/design.md</small>")]:::core

    Ext1["<b>🌐 Web & Interactive UI</b><br/><small>docs/domains/web.md • Micro-Interactions</small>"]:::ext
    Ext2["<b>📱 Mobile Applications</b><br/><small>docs/domains/mobile.md • React Native</small>"]:::ext
    Ext3["<b>🎮 Creative & 3D WebGL</b><br/><small>docs/domains/3d.md • Three.js / Canvas</small>"]:::ext
    Ext4["<b>🤖 AI Agent Interfaces</b><br/><small>docs/domains/agents.md • Streaming UI</small>"]:::ext

    ProjectCode(["<b>💻 Prototype & Production Code</b><br/><small>Responsive Application Assets</small>"]):::code

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
> **Framework:** Vibe-Coding  
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

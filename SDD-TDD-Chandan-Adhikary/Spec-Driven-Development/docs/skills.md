# Skills Registry & Developer Choice Policy

> **Document class:** Controlled process guideline  
> **Framework:** SDD  
> **Guideline baseline:** 2.0.0  
> **Status:** Active Standard  

## Purpose

Registry of portable agent skills and third-party skills installation policy.

## Agent read trigger

**MUST** read or consult this file: Before skill creation, invocation, or importing external capabilities.

---

## 1. Developer Choice Policy for External Skills

- **External Skills are Developer Choice:** Pre-bundling arbitrary third-party guidelines (e.g., `andrej-karpathy-skill` or unverified GitHub skills) is strictly avoided. The repository template contains only core deterministic engineering skills.
- **GitHub Installation on Demand:** Developers may freely install external skills directly from GitHub repositories or their personal IDE plugin manager if desired.
- **No Direct Hardcoded Dependencies:** Agents must never require or mandate third-party external skills unless explicitly configured and installed by the project developer.

---

## 2. Core Repository Skills Matrix

| Skill Name | Location | Primary Operational Scope |
|---|---|---|
| `spec-validator` | `.agents/skills/spec-validator/` | Validates `docs/features/` against canonical AC IDs and Given/When/Then contracts. |
| `task-planner` | `.agents/skills/task-planner/` | Generates granular, atomic tasks mapped to approved specifications. |
| `tdd-enforcer` | `.agents/skills/tdd-enforcer/` | Enforces the Red-Green-Refactor cycle and verifies failing tests before implementation. |
| `code-reviewer` | `.agents/skills/code-reviewer/` | Reviews code changes for security, architectural integrity, and style conformance. |
| `security-auditor`| `.agents/skills/security-auditor/`| Audits code for hardcoded secrets, injection vectors, and dependency CVEs. |
| `release-validator`| `.agents/skills/release-validator/`| Verifies all quality gates before production deployments. |

---

## 3. Normative Rules

- **MUST** evaluate security and privileges before running any third-party skill installed from GitHub.
- **MUST NOT** allow a skill to alter an `APPROVED` specification without formal human review.

## Evidence and change control

- **MUST** record owner, revision/date, relevant approval reference, and traceable evidence in the applicable project instantiation.
- **MUST** route changes to process rules through `docs/guideline-CHANGELOG.md` and formal baseline revision; route feature behavior through approved versioned specs and `docs/CHANGELOG.md`.
- **SHOULD** keep links to canonical artifacts instead of duplicating definitions.

## SDD enforcement

- **MUST** verify the latest approved feature spec version before changing implementation.
- **MUST** stop if this document conflicts with approved guidelines; pursue a guideline revision rather than an implicit exception.

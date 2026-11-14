# Skills Registry & Developer Choice Policy

> **Document class:** Controlled process guideline  
> **Framework:** Vibe Coding  
> **Guideline baseline:** 2.0.0  
> **Status:** Active Standard  

## Purpose

Registry of portable agent skills and developer choice installation policy.

## Agent read trigger

**MUST** read or consult this file: Before skill creation, invocation, or importing external capabilities.

---

## 1. Developer Choice Policy for External Skills

- **Developer Sovereignty:** Pre-bundling third-party skills (e.g., `andrej-karpathy-skill` or external GitHub repositories) is strictly avoided by default.
- **On-Demand GitHub Installation:** Developers have full autonomy to install or link skills from GitHub repositories or IDE plugins according to their specific project requirements.
- **Fluid & Decoupled Execution:** Agents operate using core workspace capabilities and only use external skills if explicitly installed by the developer.

---

## 2. Core Repository Skills Matrix

| Skill Name | Location | Primary Operational Scope |
|---|---|---|
| `task-planner` | `.agents/skills/task-planner/` | Generates granular, atomic tasks mapped to feature specifications. |
| `code-reviewer` | `.agents/skills/code-reviewer/` | Reviews code changes for quality, sensory feedback, and simplicity. |
| `security-auditor`| `.agents/skills/security-auditor/`| Scans code for secrets, CVEs, and input sanitization flaws. |
| `release-validator`| `.agents/skills/release-validator/`| Verifies builds, tests, and readiness before shipping. |

## Evidence and change control

- **MUST** record owner, revision/date, and traceable evidence in the applicable project instantiation.
- **MUST** route process changes through formal baseline revisions and living feature specifications.

## Vibe Coding interpretation

- Skills are portable execution assistants; living contracts remain with the project developer.

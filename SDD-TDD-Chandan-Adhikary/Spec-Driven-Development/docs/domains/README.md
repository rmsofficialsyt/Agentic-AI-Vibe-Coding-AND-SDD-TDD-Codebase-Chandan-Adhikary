# Optional Domain Extensions

- **MAY** add approved standards for web, mobile, backend, games, AI/ML or regulated systems as `docs/domains/<domain>.md`.
- **MUST** record applicability and a guideline revision in `docs/guideline-CHANGELOG.md` when introducing binding rules.
- **MUST** include dataset lineage, evaluation thresholds and drift checks for AI/ML domains.

## Extension template

```markdown
# Domain: <name>

> **Document class:** Controlled process guideline
> **Framework:** <SDD | Vibe Coding>
> **Guideline baseline:** <version that introduced this extension>
> **Status:** Proposed / Adopted

## Purpose
<What kind of system this extension governs and why the base docs are insufficient.>

## Applicability
<Which projects, features or components MUST follow it; explicit exclusions.>

## Agent read trigger
**MUST** read or consult this file: <when>.

## Normative sections and rules
### 1. <Topic>
- **MUST** — <rule>

## Evidence and change control
- **MUST** record adoption approval and link the guideline-CHANGELOG entry.
```

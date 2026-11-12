# Tech Stacks

> **Document class:** Living feature/specification  
> **Framework:** Vibe Coding  
> **Guideline baseline:** 1.0.0  
> **Status:** Template; project-specific content requires review  

## Purpose

Approved technology inventory and decision rationale.

## Agent read trigger

**MUST** read or consult this file: Before dependencies, framework or runtime changes.

## Normative sections and rules

### 1. Inventory

- **MUST** — List languages, frameworks, package managers, databases, hosting and key integrations with approved versions.

### 2. Selection

- **MUST** — Give decision rationale, constraints, maintenance status and supported platforms.

### 3. Compatibility

- **MUST** — Define version ranges, runtime minimums and upgrade testing.

### 4. Supply chain

- **MUST** — Review licenses, provenance, vulnerabilities and vendor trust.

### 5. Changes

- **MUST** — Require appropriate ADR, approval and guideline revision for previously prohibited technology.

### 6. Costs

- **SHOULD** — Evaluate operating costs, quotas and vendor lock-in.

### 7. Alternatives

- **SHOULD** — Record rejected options and tradeoffs.

### 8. Support policy

- **MUST** — Do not run end-of-life runtimes or frameworks in production; record EOL dates and the upgrade plan for each component.

## Instantiation template

Copy into the project instantiation (below this section or into a dedicated file) and replace every placeholder. Keep IDs from `docs/requirements-traceability.md`.

```markdown
| Layer | Technology | Version (pinned) | Purpose | Decision (ADR) | Licence | Support / EOL | Owner |
|---|---|---|---|---|---|---|---|
| Frontend | [e.g. framework] | [x.y.z] | [why] | ADR-#### | [licence] | [EOL date] | [Name] |
| Backend | | | | | | | |
| Data | | | | | | | |
| Infrastructure | | | | | | | |
| Testing | | | | | | | |
| AI / agents | | | | | | | |
```

## Evidence and change control

- **MUST** record owner, revision/date, relevant approval reference, and traceable evidence in the applicable project instantiation.
- **MUST** route changes to process rules through `docs/guideline-CHANGELOG.md` and formal baseline revision; route feature behavior through approved versioned specs and `docs/CHANGELOG.md`.
- **SHOULD** keep links to canonical artifacts instead of duplicating definitions.

## Vibe Coding interpretation

- **MAY** use provisional decisions in an isolated prototype, clearly marked `DRAFT`; **MUST** formalize and approve production-bound behavior before shipping.
- **MAY** evaluate candidate stacks in prototypes; **MUST** record the choice as an ADR before adoption.

# Product

> **Document class:** Living product definition  
> **Framework:** SDD  
> **Guideline baseline:** 1.0.0  
> **Status:** Template; project-specific content requires review  

## Purpose

Canonical definition of the product: what it is, who it serves, why it exists, what it does and does not do, and how success is measured. This is the parent document from which `docs/prd.md`, approved feature specifications (`docs/spec.md`, `docs/features/`), `docs/design.md` and `docs/phases.md` are derived.

### How this file relates to other product documents

| Document | Answers | Change frequency | Owner |
|---|---|---|---|
| `docs/product.md` | *What* is the product and *why* does it exist? | Rarely (strategy-level) | Product owner |
| `docs/prd.md` | *Which* requirements are needed for a release or feature set? | Per release / feature set | Product owner + engineering lead |
| `docs/features/` | *Exactly how* must a feature behave? (approved, versioned contract) | Per approved feature version | Feature owner |

- **MUST** — Keep `product.md` at the strategy and identity level; feature behavior belongs in `prd.md` and `docs/features/`.
- **MUST** — Ensure every PRD requirement and feature contract traces back to a capability, persona or goal defined here.

## Agent read trigger

**MUST** read or consult this file: at project initialization and discovery; before drafting or changing `docs/prd.md`, a feature contract, `docs/design.md` or `docs/phases.md`; and whenever deciding whether a request fits the product scope.

## Normative sections and rules

### 1. Product identity

- **MUST** — Record product name, one-line description, product category, accountable owner and current lifecycle stage (`idea`, `prototype`, `MVP`, `growth`, `mature`, `sunset`).

### 2. Vision and mission

- **MUST** — State the long-term vision (the future the product creates), the mission (how the product contributes to it) and the core problem space.
- **SHOULD** — Keep the vision to one or two sentences that a non-technical stakeholder can repeat.

### 3. Target users and personas

- **MUST** — Define primary and secondary personas with context, goals, pains and jobs-to-be-done.
- **MUST** — Name the users or segments the product is explicitly **not** built for.
- **SHOULD** — Base personas on research evidence; mark assumptions as `ASSUMPTION`.

### 4. Value proposition

- **MUST** — Map each key benefit to the persona pain or job it addresses.
- **MUST** — State the differentiators: why a user would choose this product over alternatives.

### 5. Positioning and market

- **SHOULD** — List alternatives and competitors (including "do nothing" / manual workarounds) and a positioning statement.
- **MAY** — Include market sizing, pricing hypotheses and go-to-market notes.

### 6. Product principles

- **MUST** — Define 3–7 product principles used to resolve trade-offs (for example "privacy over personalization", "offline first").
- **MUST** — Use these principles when evaluating scope requests and conflicting requirements.

### 7. Capability map

- **MUST** — List product capabilities/modules with status (`live`, `in progress`, `planned`, `deprecated`).
- **MUST** — Link each capability to its PRD requirement IDs and/or `docs/features/` contract.
- **MUST NOT** — Redefine detailed feature behavior here; link to the canonical contract instead.

### 8. Product boundaries

- **MUST** — Record explicit non-goals and out-of-scope areas.
- **MUST** — Treat any request that falls into a non-goal as a scope change requiring a recorded decision in `docs/decision-log.md`.

### 9. Success metrics

- **MUST** — Define one North Star metric plus supporting KPIs, each with baseline, target, measurement source and review cadence.
- **SHOULD** — Include guardrail metrics (quality, performance, cost, user trust) that must not regress.
- **SHOULD** — Align instrumentation with `docs/observability.md`.

### 10. Roadmap themes

- **SHOULD** — Express direction as `now` / `next` / `later` themes linked to `docs/phases.md`.
- **MUST NOT** — Commit to delivery dates here without an approval reference.

### 11. Constraints

- **MUST** — Record business, regulatory/legal, platform, budget and brand constraints.
- **MUST** — Link security/privacy obligations to `docs/security.md` and accessibility targets to `docs/accessibility.md` rather than duplicating them.

### 12. Stakeholders and governance

- **MUST** — Record owner, decision-makers, consulted parties, approval reference and review cadence (at minimum once per phase).

### 13. Glossary

- **SHOULD** — Define canonical domain terms; all other docs and specs **SHOULD** use these terms consistently.

### 14. Conflict resolution

- **MUST** — Surface any conflict between `product.md` and `prd.md`, a feature contract, or design as an open decision in `docs/decision-log.md`.
- **MUST NOT** — Silently resolve such conflicts in code or in documentation.

## Instantiation template

Copy the skeleton below into the project-specific section of this file (or replace this template once adopted) and fill every `TBD`. Keep sections that do not apply and mark them `N/A — <reason>`.

```markdown
## Product definition — <Product name>

| Field | Value |
|---|---|
| Owner | TBD |
| Version | 0.1.0 |
| Status | DRAFT / IN REVIEW / APPROVED |
| Last reviewed | YYYY-MM-DD |
| Approval reference | TBD |

### 1. Identity
- **Name:** TBD
- **One-liner:** TBD
- **Category:** TBD
- **Lifecycle stage:** TBD

### 2. Vision and mission
- **Vision:** TBD
- **Mission:** TBD
- **Problem space:** TBD

### 3. Personas
| ID | Persona | Context | Goals / jobs-to-be-done | Pains | Evidence |
|---|---|---|---|---|---|
| PER-01 | TBD | TBD | TBD | TBD | TBD / ASSUMPTION |

**Not built for:** TBD

### 4. Value proposition
| Benefit | Persona | Pain / job addressed |
|---|---|---|
| TBD | PER-01 | TBD |

**Differentiators:** TBD

### 5. Positioning
- **Alternatives:** TBD
- **Positioning statement:** For <persona> who <need>, <product> is a <category> that <key benefit>. Unlike <alternative>, it <differentiator>.

### 6. Principles
1. TBD
2. TBD
3. TBD

### 7. Capability map
| ID | Capability | Status | PRD IDs | Feature contract |
|---|---|---|---|---|
| CAP-001 | TBD | planned | REQ-TBD | docs/features/TBD |

### 8. Boundaries (non-goals)
- TBD

### 9. Success metrics
| Type | Metric | Baseline | Target | Source | Cadence |
|---|---|---|---|---|---|
| North Star | TBD | TBD | TBD | TBD | TBD |
| KPI | TBD | TBD | TBD | TBD | TBD |
| Guardrail | TBD | TBD | TBD | TBD | TBD |

### 10. Roadmap themes
- **Now:** TBD
- **Next:** TBD
- **Later:** TBD

### 11. Constraints
- **Business / budget:** TBD
- **Regulatory / legal:** TBD (see docs/security.md)
- **Platform:** TBD
- **Accessibility:** TBD (see docs/accessibility.md)
- **Brand:** TBD

### 12. Stakeholders
| Role | Name / team | Responsibility |
|---|---|---|
| Owner | TBD | Final product decisions |
| Decision-maker | TBD | TBD |
| Consulted | TBD | TBD |

### 13. Glossary
| Term | Definition |
|---|---|
| TBD | TBD |
```

## Evidence and change control

- **MUST** record owner, revision/date, relevant approval reference, and traceable evidence in the applicable project instantiation.
- **MUST** route changes to process rules through `docs/guideline-CHANGELOG.md` and formal baseline revision; route feature behavior through approved versioned specs and `docs/CHANGELOG.md`.
- **SHOULD** keep links to canonical artifacts instead of duplicating definitions.

## SDD enforcement

- **MUST** have an approved `product.md` (all MUST sections complete, approval reference recorded) before the first feature specification is approved.
- **MUST** verify every new or changed feature specification traces to a capability (§7) and persona (§3) defined here; a spec without that trace **MUST NOT** be approved.
- **MUST** route changes to vision (§2), personas (§3), principles (§6), boundaries (§8) or North Star metric (§9) through `docs/change-control.md`, with a record in `docs/changes/` and sign-off in `docs/approvals/`.
- **MUST** stop if this document conflicts with approved specifications or guidelines; pursue a governed revision rather than an implicit exception.

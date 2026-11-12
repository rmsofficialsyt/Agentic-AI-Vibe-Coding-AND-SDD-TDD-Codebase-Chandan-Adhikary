# Decision Log

> **Document class:** Living feature/specification  
> **Framework:** SDD  
> **Guideline baseline:** 1.0.0  
> **Status:** Template; project-specific content requires review  

## Purpose

Business, product and delivery decisions.

## Agent read trigger

**MUST** read or consult this file: Before changing resolved choices and at stakeholder approval.

## Normative sections and rules

### 1. Record

- **MUST** — Document decision ID, question, options, rationale, owner and date.

### 2. Impact

- **MUST** — Link affected tasks, specs, budgets, timelines or policies.

### 3. Status

- **MUST** — Distinguish proposed, accepted, superseded and rejected.

### 4. Traceability

- **SHOULD** — Link to architecture ADR for technical decisions.

### 5. Review

- **MUST** — Do not silently overwrite historical decisions; create superseding record.

### 6. Authority

- **MUST** — Record which role may decide each decision class (product, technical, budget, compliance); decisions taken outside that authority are `Proposed` until ratified.

### 7. Reversibility

- **MUST** — Classify each decision as one-way (hard to reverse) or reversible; one-way decisions need explicit approver sign-off and reversible decisions carry a revisit date.

## Instantiation template

Copy into the project instantiation (below this section or into a dedicated file) and replace every placeholder. Keep IDs from `docs/requirements-traceability.md`.

```markdown
| ID | Date | Decision | Context / options considered | Decided by | Impact (FEAT / REQ / phase) | Status | Links |
|---|---|---|---|---|---|---|---|
| DEC-001 | YYYY-MM-DD | [What was decided] | [Why; alternatives rejected] | [Name, role] | [FEAT-###, REQ-###] | Proposed / Accepted / Reversed | [CR-###, ADR-####] |
```

## Evidence and change control

- **MUST** record owner, revision/date, relevant approval reference, and traceable evidence in the applicable project instantiation.
- **MUST** route changes to process rules through `docs/guideline-CHANGELOG.md` and formal baseline revision; route feature behavior through approved versioned specs and `docs/CHANGELOG.md`.
- **SHOULD** keep links to canonical artifacts instead of duplicating definitions.

## SDD enforcement

- **MUST** link every product or delivery decision that changes approved behavior to its CR and the resulting feature version.
- **MUST NOT** use a decision entry as a substitute for an approved feature specification.

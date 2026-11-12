# Accessibility

> **Document class:** Controlled process guideline  
> **Framework:** SDD  
> **Guideline baseline:** 1.0.0  
> **Status:** Template; project-specific content requires review  

## Purpose

Accessibility targets and validation.

## Agent read trigger

**MUST** read or consult this file: Before UI design, implementation, testing and release.

## Normative sections and rules

### 1. Standard

- **MUST** — Record applicable WCAG or platform standard and target level.

### 2. Interaction

- **MUST** — Specify accessible names, keyboard/focus behavior, semantic markup, forms and errors.

### 3. Visual

- **MUST** — Address contrast, responsive zoom, non-color-only status, reduced motion and touch targets.

### 4. Testing

- **MUST** — Combine automated scans with manual keyboard and relevant assistive-technology testing.

### 5. Exceptions

- **MUST** — Record deviation, impact, owner, remediation and approval.

### 6. Artifacts

- **SHOULD** — Document accessible component examples and known constraints.

### 7. Content

- **MUST** — Provide text alternatives for meaningful images, captions or transcripts for media, a declared page language and plain-language error messages.

### 8. Definition of Done

- **MUST** — Include the feature's accessibility criteria in its Definition of Done and run automatable checks in CI.

## Instantiation template

Copy into the project instantiation (below this section or into a dedicated file) and replace every placeholder. Keep IDs from `docs/requirements-traceability.md`.

```markdown
| Field | Value |
|---|---|
| Conformance target | WCAG 2.2 AA (or project-specific) |
| Assistive tech matrix | [screen readers × browsers / platforms] |
| Automated tooling | [tool + CI job] |
| Manual review cadence | [per release / per feature] |

| Feature | Criterion (NFR-FEAT###-##) | Method | Result | Evidence | Date |
|---|---|---|---|---|---|
| FEAT-### | [e.g. keyboard operable] | Automated / Manual | Pass / Fail | [link] | YYYY-MM-DD |
```

## Evidence and change control

- **MUST** record owner, revision/date, relevant approval reference, and traceable evidence in the applicable project instantiation.
- **MUST** route changes to process rules through `docs/guideline-CHANGELOG.md` and formal baseline revision; route feature behavior through approved versioned specs and `docs/CHANGELOG.md`.
- **SHOULD** keep links to canonical artifacts instead of duplicating definitions.

## SDD enforcement

- **MUST** express accessibility targets as `NFR-FEAT###-##` entries in each UI feature contract so they are approved and tested like functional behavior.
- **MUST** block release when an approved accessibility criterion has no passing automated or manual evidence.

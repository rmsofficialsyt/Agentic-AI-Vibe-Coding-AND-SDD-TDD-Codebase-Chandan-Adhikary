# Dependencies

> **Document class:** Controlled process guideline  
> **Framework:** Vibe Coding  
> **Guideline baseline:** 1.0.0  
> **Status:** Template; project-specific content requires review  

## Purpose

Third-party software and vendor governance.

## Agent read trigger

**MUST** read or consult this file: When adding or updating libraries/services.

## Normative sections and rules

### 1. Inventory

- **MUST** — List package/service, version, origin, purpose and owner.

### 2. Versions

- **MUST** — Use lockfiles and supported runtime compatibility checks.

### 3. Security

- **MUST** — Check security advisories, licenses, provenance and transitive risks.

### 4. Review

- **MUST** — Require approval for unplanned framework/vendor changes.

### 5. Updates

- **MUST** — Define routine and urgent patch cadence, verification and rollback.

### 6. SBOM

- **SHOULD** — Create software bill of materials and source attestations for critical releases.

### 7. Costs

- **SHOULD** — Track external API quotas, renewal and exit constraints.

## Evidence and change control

- **MUST** record owner, revision/date, relevant approval reference, and traceable evidence in the applicable project instantiation.
- **MUST** route changes to process rules through `docs/guideline-CHANGELOG.md` and formal baseline revision; route feature behavior through approved versioned specs and `docs/CHANGELOG.md`.
- **SHOULD** keep links to canonical artifacts instead of duplicating definitions.

## Vibe Coding interpretation

- **MAY** use provisional decisions in an isolated prototype, clearly marked `DRAFT`; **MUST** formalize and approve production-bound behavior before shipping.

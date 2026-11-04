# Database

> **Document class:** Living feature/specification  
> **Framework:** Vibe Coding  
> **Guideline baseline:** 1.0.0  
> **Status:** Template; project-specific content requires review  

## Purpose

Persistence architecture, schema, migration and retention contract.

## Agent read trigger

**MUST** read or consult this file: Before schema, query and data lifecycle changes.

## Normative sections and rules

### 1. Model

- **MUST** — Define entities/collections, fields, types, defaults, nullability, constraints and relationships.

### 2. Integrity

- **MUST** — Describe keys, indexes, transactions, concurrency and consistency guarantees.

### 3. Security

- **MUST** — Specify access control, isolation, encryption, classification and audit requirements.

### 4. Lifecycle

- **MUST** — Define retention, deletion, export and backup/restore needs.

### 5. Migrations

- **MUST** — Document forward/backward compatibility, plan, tests and rollback/roll-forward procedures.

### 6. Queries

- **SHOULD** — Record representative critical queries and performance targets.

### 7. Fixtures

- **MUST** — Document deterministic test data and prohibit production secret/data copying.

## Evidence and change control

- **MUST** record owner, revision/date, relevant approval reference, and traceable evidence in the applicable project instantiation.
- **MUST** route changes to process rules through `docs/guideline-CHANGELOG.md` and formal baseline revision; route feature behavior through approved versioned specs and `docs/CHANGELOG.md`.
- **SHOULD** keep links to canonical artifacts instead of duplicating definitions.

## Vibe Coding interpretation

- **MAY** use provisional decisions in an isolated prototype, clearly marked `DRAFT`; **MUST** formalize and approve production-bound behavior before shipping.

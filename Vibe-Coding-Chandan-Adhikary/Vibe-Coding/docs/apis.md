# Apis

> **Document class:** Living feature/specification  
> **Framework:** Vibe Coding  
> **Guideline baseline:** 1.0.0  
> **Status:** Template; project-specific content requires review  

## Purpose

Machine-checkable API and integration behavior contract.

## Agent read trigger

**MUST** read or consult this file: Before endpoint, client, webhook or SDK implementation.

## Normative sections and rules

### 1. Inventory

- **MUST** — Record protocol, consumer, owner, base path and versioning policy.

### 2. Schema

- **MUST** — Specify input/output fields, validation, nullability, status codes and examples.

### 3. Security

- **MUST** — Define authentication, authorization, scopes, rate limits and input sanitization.

### 4. Errors

- **MUST** — Define structured error codes, retryability, correlation IDs and client-safe responses.

### 5. Behavior

- **MUST** — Specify pagination, ordering, idempotency, timeouts and consistency when relevant.

### 6. Compatibility

- **MUST** — Document version strategy, migration/deprecation and consumer impact.

### 7. Tests

- **MUST** — Link consumer/provider contract tests and negative cases.

### 8. Standards

- **SHOULD** — Provide OpenAPI/AsyncAPI/protobuf/GraphQL source as relevant.

## Evidence and change control

- **MUST** record owner, revision/date, relevant approval reference, and traceable evidence in the applicable project instantiation.
- **MUST** route changes to process rules through `docs/guideline-CHANGELOG.md` and formal baseline revision; route feature behavior through approved versioned specs and `docs/CHANGELOG.md`.
- **SHOULD** keep links to canonical artifacts instead of duplicating definitions.

## Vibe Coding interpretation

- **MAY** use provisional decisions in an isolated prototype, clearly marked `DRAFT`; **MUST** formalize and approve production-bound behavior before shipping.

# PRD

> **Document class:** Living feature/specification  
> **Framework:** SDD  
> **Guideline baseline:** 2.0.0  
> **Status:** Template; project-specific content requires review  

## Purpose

Product requirements, technical architecture constraints, and measurable user outcomes.

## Agent read trigger

**MUST** read or consult this file: Discovery; prior to feature approval, technical architecture evaluation, and acceptance sign-off.

## Normative sections and rules

### 1. Problem and audience

- **MUST** — Define customer problem, user/persona, context, and jobs-to-be-done.

### 2. Goals

- **MUST** — Define product outcomes, success metrics, and measurable business targets.

### 3. Scope

- **MUST** — Distinguish in-scope, out-of-scope, future roadmap items, and explicit non-goals.

### 4. Functional Requirements

- **MUST** — Assign stable IDs to functional requirements (`REQ-###`); describe observable behavior, user interactions, and business rules.

### 5. Technical Requirements Guideline

- **MUST** — **System Architecture Pattern:** Define application architecture style (Modular Monolith, Clean/Hexagonal Architecture, Microservices, Event-Driven, Serverless).
- **MUST** — **Tech Stack & Runtime:** Specify runtime (Node.js, Python, Go, Rust), core frameworks (Next.js, FastAPI, Express, etc.), package managers, and toolchains.
- **MUST** — **Data Architecture & Storage:** Specify database engine (PostgreSQL, SQLite, MySQL, Redis, MongoDB), schema modeling/ORM (Prisma, Drizzle, SQLAlchemy), migrations, indexing, and transactional boundaries.
- **MUST** — **API Protocols & Contracts:** Define communication standards (REST, GraphQL, gRPC, WebSocket), payload schema validation (Zod, Pydantic), serialization, and versioning.
- **MUST** — **Security & Identity:** Define authentication mechanisms (OAuth2, JWT, Session, Passkeys), RBAC/ABAC role hierarchies, secret management, CORS, and data encryption (at rest and in transit).
- **MUST** — **Integration & Webhooks:** Detail external services (Payment gateways, SMTP, SMS, Object storage) with retry backoffs and webhook signature verification.
- **MUST** — **Observability & Error Budget:** Define structured JSON logging, distributed tracing (OpenTelemetry), APM metrics, health checks (`/health`, `/ready`), and error reporting thresholds.
- **MUST** — **Deployment & Infrastructure Constraints:** Document execution targets (Docker containers, Kubernetes, Edge, Serverless lambdas), environment variable schemas, and cross-platform compatibility.

### 6. Non-functional Requirements

- **MUST** — Specify applicable security, privacy (GDPR/FERPA/HIPAA), reliability, accessibility (WCAG 2.1 AA), latency (P95 < 200ms), availability (99.9%), and cost boundaries.

### 7. User Journeys & State Coverage

- **MUST** — Cover critical user paths plus loading, empty, validation failure, error, and recovery states.

### 8. Acceptance Criteria

- **MUST** — Link each requirement to objective pass/fail criteria (`AC-FEAT###-##`) and verifiable automated test evidence.

### 9. Dependencies & Platform Constraints

- **MUST** — Record integration, platform, organizational, and timeline constraints.

### 10. Prioritization & Complexity Tiers

- **MUST** — Classify features into explicit complexity categories:
  - **Easy (Low Complexity):** Self-contained, static/simple CRUD, single model, minimal dependencies (1–2 files).
  - **Intermediate (Medium Complexity):** Multi-model relational logic, form validation, auth guards, API integrations (3–6 files).
  - **Hard / Complex (High Complexity):** Multi-tenant RLS, distributed transactions, real-time WebSockets, payment webhooks, background worker pipelines (7+ files).

### 11. Governance & Approval

- **MUST** — Include document owner, version baseline, decision status, and human sign-off references.

### 12. Research & Alternatives

- **MAY** — Include hypotheses, benchmark data, competitor analysis, and trade-off rationales.

## Evidence and change control

- **MUST** record owner, revision/date, relevant approval reference, and traceable evidence in the applicable project instantiation.
- **MUST** route changes to process rules through `docs/guideline-CHANGELOG.md` and formal baseline revision; route feature behavior through approved versioned specs and `docs/CHANGELOG.md`.
- **SHOULD** keep links to canonical artifacts instead of duplicating definitions.

## SDD enforcement

- **MUST** verify the latest approved feature spec version before changing implementation.
- **MUST** stop if this document conflicts with approved guidelines; pursue a guideline revision rather than an implicit exception.

# PRD

> **Document class:** Living feature/specification  
> **Framework:** Vibe-Coding  
> **Guideline baseline:** 2.0.0  
> **Status:** Template; project-specific content requires review  

## Purpose

Product requirements, technical architecture constraints, user vibes, and measurable product outcomes.

## Agent read trigger

**MUST** read or consult this file: Discovery; prior to feature implementation, technical architecture evaluation, and vibe evaluation.

## Normative sections and rules

### 1. Problem and audience

- **MUST** — Define customer problem, user/persona, context, and aesthetic/experience expectations.

### 2. Goals & Vibe Targets

- **MUST** — Define product outcomes, sensory targets (speed, responsiveness, aesthetic feel), and measurable business goals.

### 3. Scope

- **MUST** — Distinguish in-scope, out-of-scope, future roadmap iterations, and explicit non-goals.

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

### 6. Non-functional & Sensory Requirements

- **MUST** — Specify performance (sub-100ms response targets), visual design consistency, accessibility (WCAG 2.1 AA), reliability, and security standards.

### 7. User Journeys & State Coverage

- **MUST** — Cover critical user paths plus loading skeletons, empty states, validation failure micro-interactions, error toasts, and recovery flows.

### 8. Acceptance & Polish Criteria

- **MUST** — Link each requirement to observable sensory criteria and verification evidence.

### 9. Dependencies & Platform Constraints

- **MUST** — Record integration, platform, third-party API, and runtime constraints.

### 10. Prioritization & Complexity Tiers

- **MUST** — Classify features into explicit complexity categories:
  - **Easy (Low Complexity):** Self-contained, static/simple CRUD, single model, minimal dependencies (1–2 files).
  - **Intermediate (Medium Complexity):** Multi-model relational logic, form validation, auth guards, API integrations (3–6 files).
  - **Hard / Complex (High Complexity):** Multi-tenant RLS, distributed transactions, real-time WebSockets, payment webhooks, background worker pipelines (7+ files).

### 11. Governance & Approval

- **MUST** — Include document owner, version baseline, decision status, and developer sign-off references.

### 12. Research & Alternatives

- **MAY** — Include inspiration UI links, component references, benchmark data, and trade-off rationales.

## Evidence and change control

- **MUST** record owner, revision/date, and traceable evidence in the applicable project instantiation.
- **MUST** route process changes through formal baseline revisions and living feature specifications.

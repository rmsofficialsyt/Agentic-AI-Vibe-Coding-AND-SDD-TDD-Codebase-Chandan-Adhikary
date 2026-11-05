# AI-Powered Project Development — Universal Spec-Driven Development (SDD) & TDD Production Guide for Any Project

**Framework:** Spec-Driven Development (SDD) + Test-Driven Development (TDD) · Enterprise Production Software  
**Author:** Chandan Adhikary & Antigravity Engineering  
**Application Scope:** Universal (Enterprise SaaS, Web Apps, Mobile Backends, Microservices, FinTech, HealthTech, AI Agents, E-commerce, DevTools)  
**Reference Example:** EduSphere Enterprise Multi-Tenant School Management System (SMS)  
**Target IDEs:** Claude Code, Cursor, Windsurf, Antigravity, GitHub Copilot, Codex, Trae, VS Code with AI Agents  

---

## Executive Summary & Guiding Philosophy

**Spec-Driven Development (SDD)** paired with **Test-Driven Development (TDD)** is an enterprise-grade engineering methodology designed for high-assurance, zero-defect software engineering. Unlike informal coding, SDD enforces a strict separation of concerns across any software domain:

1. **The Specification is the Law**: No production code is ever written until an explicit, unambiguous specification is drafted, reviewed, verified against acceptance criteria, and formally approved by a human lead.
2. **The Two-Layer Governance Policy**:
   - **Constitutional Guidelines (`docs/`)**: The immutable rules of architecture, security policies, coding standards, and process guidelines.
   - **Executable Specifications (`specs/`)**: The living, version-controlled feature contracts defining data structures, state transitions, API endpoints, and verifiable Acceptance Criteria (`AC-*`).
3. **Strict Test-First Implementation (Red → Green → Refactor)**:
   - **Red**: Write executable unit, integration, and contract tests directly against the approved Acceptance Criteria. Verify that they fail with expected error messages.
   - **Green**: Write the absolute minimum production code required to satisfy the tests.
   - **Refactor**: Clean up the architecture, eliminate duplication, and optimize performance while ensuring all tests remain 100% green.
4. **Zero Hallucination / Zero Scope Creep**: Autonomous AI agents are restricted strictly to approved specifications. Any unapproved feature or undocumented modification is treated as an architectural defect.

---

## How to Use This Universal Guide & Variable Substitution

This guide is designed as a reusable master template for **any software project**. 

### Universal Variable Mapping Reference

Throughout the prompts in this guide, placeholder tokens wrapped in brackets (e.g., `[PROJECT_NAME]`, `[CORE_MODULES]`) indicate where your project-specific parameters belong.

The table below demonstrates how to substitute these variables using the **School Management System (SMS)** reference project as a concrete example:

| Variable Token | Description | School Management System (SMS) Example | FinTech / Banking SaaS Example |
| :--- | :--- | :--- | :--- |
| `[PROJECT_NAME]` | Name of your software application | EduSphere Enterprise SMS | VaultX Enterprise Banking |
| `[PRODUCT_TYPE]` | Architecture & delivery model | Multi-Tenant Enterprise SaaS Platform | Secure Multi-Currency Core Ledger API |
| `[PROJECT_DESCRIPTION]` | Comprehensive product description | K-12 Student Information & Attendance System | High-throughput, double-entry transactional ledger |
| `[TARGET_AUDIENCE]` | Primary user roles & stakeholders | Admins, Principals, Teachers, Students, Parents | Risk Officers, Treasury Operators, Consumers |
| `[REGULATORY_STANDARDS]` | Industry compliance rules & standards | FERPA, COPPA, GDPR, Student Data Privacy | PCI-DSS v4.0, SOC 2 Type II, ISO 27001, GLBA |
| `[BUSINESS_MODEL]` | Commercialization & licensing | Multi-campus B2B annual subscription | Usage-based API volume + enterprise SLA tier |
| `[PRIMARY_FEATURE_SPEC]` | Target feature for first TDD cycle | `specs/002.spec.student-enrollment.md` | `specs/002.spec.double-entry-transfer.md` |
| `[SPEC_AC_PREFIX]` | Prefix for numbered Acceptance Criteria | `AC-ENROLL-*` | `AC-TXN-*` |
| `[TECH_STACK_SUMMARY]` | Selected production technologies | Next.js 15, PostgreSQL (RLS), Prisma, Vitest | Go / Node.js, PostgreSQL (Timescale), Vitest |

---

## Table of Contents

1. [Step 1 — Baseline Framework Setup & Project Renaming](#step-1--baseline-framework-setup--project-renaming)
2. [Step 2 — Specifications Architecture: Flat vs. Modular Dual Formats](#step-2--specifications-architecture-flat-vs-modular-dual-formats)
3. [Step 3 — IDE Detection & Auto-Pruning Policy](#step-3--ide-detection--auto-pruning-policy)
4. [Step 4 — Prompt 1: Master Architecture, R&D & Pre-Development Planning](#step-4--prompt-1-master-architecture-rd--pre-development-planning)
5. [Step 5 — Human Review & Architecture Sign-Off](#step-5--human-review--architecture-sign-off)
6. [Step 6 — Prompt 2: Approved Project Configuration & Harness Setup](#step-6--prompt-2-approved-project-configuration--harness-setup)
7. [Step 7 — Prompt 3: Specification Validation & TDD Readiness Checkpoint](#step-7--prompt-3-specification-validation--tdd-readiness-checkpoint)
8. [Step 8 — Prompt 4: Feature Implementation via Strict TDD (Red-Green-Refactor)](#step-8--prompt-4-feature-implementation-via-strict-tdd-red-green-refactor)
9. [Step 9 — Prompt 5: Production Readiness Audit & Formal Release Gate](#step-9--prompt-5-production-readiness-audit--formal-release-gate)
10. [Complete SDD-TDD Workflow Summary & Governance Rules](#complete-sdd-tdd-workflow-summary--governance-rules)

---

## Step 1 — Baseline Framework Setup & Project Renaming

The foundational scaffolding for any SDD + TDD project resides in the canonical template directory: `SDD-TDD-Chandan-Adhikary/Spec-Driven-Development/`.

### Directory Scaffolding & Renaming
To initialize your project, extract or copy the template folder into your clean workspace and rename it to your target application directory:

```text
# Before:
SDD-TDD-Chandan-Adhikary/Spec-Driven-Development/

# After (Rename to your target project name):
[your-project-name]/
```

*Example:*
- For School Management System: `school-management-system/`
- For Healthcare EMR: `health-records-platform/`
- For FinTech Billing Engine: `enterprise-billing-engine/`

### Critical Repository Boundary Rules
- **Do NOT write application code inside the template directory (`SDD-TDD-Chandan-Adhikary/`)**: The template folder is an immutable distribution asset. Always copy or rename it to a clean working repository before starting development.
- **Lowercase `kebab-case`**: Avoid spaces, uppercase characters, and special symbols in your directory paths.
- **Open at the Project Root**: Always open your IDE (Claude Code, Cursor, Windsurf, Antigravity, VS Code) at the root of `[your-project-name]/` so that AI agents immediately discover `AGENTS.md`, `.agents/`, `specs/`, and `docs/`.

---

## Step 2 — Specifications Architecture: Flat vs. Modular Dual Formats

The SDD framework supports two standard specification formats in the `specs/` directory:

```text
specs/
├── Format 1 (Flat Spec Files - for discrete, cohesive features):
│   ├── 001.spec.[feature-name].md
│   └── 002.spec.[feature-name].md
│
└── Format 2 (Modular Spec Folders - for complex enterprise sub-systems):
    ├── 001.spec.[module-name]/
    │   ├── spec.md
    │   ├── schema.json
    │   └── acceptance-criteria.md
    └── 002.spec.[module-name]/
        ├── spec.md
        ├── schema.json
        └── acceptance-criteria.md
```

### Format Selection Rules
- **Format 1 (Flat)**: Recommended for self-contained, linear features (e.g., User Authentication, Password Reset, Status Change) where requirements, schemas, and Acceptance Criteria fit cleanly into a single document.
- **Format 2 (Modular Folders)**: Recommended for complex enterprise domains (e.g., Billing & Reconciliation Engines, Multi-Party Workflows, Patient Intake) requiring separated JSON Schemas, formal state machine diagrams, and multi-jurisdictional compliance matrices.

*Reference Example (SMS):*
- Flat format: `specs/001.spec.authentication.md`, `specs/002.spec.student-enrollment.md`
- Modular format: `specs/003.spec.gradebook/` (contains `spec.md`, `schema.json`, and `acceptance-criteria.md`)

---

## Step 3 — IDE Detection & Auto-Pruning Policy

Before executing prompts, inspect the active IDE environment according to `docs/ide-compatibility.md`:
- **Universal / Agent Core**: `AGENTS.md` and `.agents/commands/*-ca-agent.md`.
- **Claude Code**: `CLAUDE.md`.
- **Cursor**: `.cursorrules`.
- **Windsurf**: `.windsurfrules`.
- **Antigravity**: `antigravity.json` / workspace configuration.
- **GitHub Copilot**: `.github/copilot-instructions.md`.

### Single-IDE Auto-Pruning
If working exclusively within one IDE (e.g., Claude Code), instruct the agent during Prompt 1 to safely prune unused root adapter files (e.g., removing `.cursorrules` and `.windsurfrules`) to maximize the active context window.

### Multi-IDE Coexistence
If collaborating across a diverse engineering team with multiple editors, retain `AGENTS.md` as the canonical master reference, and maintain editor files as thin pointers referencing `AGENTS.md`.

---

## Step 4 — Prompt 1: Master Architecture, R&D & Pre-Development Planning

> **Mode:** Plan Mode / Ask Mode / Read-Only Planning  
> **Goal:** Direct the AI agent to thoroughly research your target domain, inspect repository governance guidelines, evaluate architecture and regulatory standards, select the optimal tech stack, and present a complete 17-point planning report—**without implementing any application code yet**.

Copy and paste the universal prompt below into your AI assistant, substituting your project values:

```markdown
# PROMPT 1 — MASTER ARCHITECTURE, R&D & PRE-DEVELOPMENT PLANNING

## Your Role
Act as an elite team of senior enterprise technology leaders with 15+ years of experience:
- Senior Enterprise Software Architect (Distributed Systems, Scalability)
- Senior Principal Cybersecurity & Compliance Engineer ([REGULATORY_STANDARDS: e.g., SOC 2, GDPR, HIPAA, PCI-DSS])
- Senior Backend & Database Architect (Database Design, Data Isolation, ACID Transactions)
- Senior Frontend Systems Architect (Modern Frameworks, Accessible Design Systems)
- Senior QA & Test Automation Architect (TDD, Contract Testing, Property-Based Testing)
- Principal SaaS Product Manager & Technical Program Manager

Your objective is to plan a zero-defect, strictly verified, enterprise [PRODUCT_TYPE: e.g., Multi-Tenant SaaS / Core API / Web Platform]. Prioritize mathematical correctness, strict data isolation, regulatory compliance, and testability.

IMPORTANT: WORK IN PLAN MODE ONLY. DO NOT IMPLEMENT APPLICATION CODE. DO NOT INSTALL PACKAGES, ALTER THE DATABASE, OR START DEPLOYMENT.

---

## 1. Project Information
- **Project Name:** [PROJECT_NAME: e.g., EduSphere Enterprise SMS]
- **Product Type:** [PRODUCT_TYPE: e.g., Multi-Tenant Enterprise SaaS Platform]
- **Project Description:** [PROJECT_DESCRIPTION: Comprehensive description of the product, institutional or commercial lifecycle, and primary operations]
- **Target Audience:** [TARGET_AUDIENCE: e.g., Administrators, Operators, End Users, Customers]
- **Target Market / Region:** [TARGET_MARKET: e.g., Global / North America / Europe (Mandatory [REGULATORY_STANDARDS] compliance)]
- **Business Model:** [BUSINESS_MODEL: e.g., Multi-tier B2B Enterprise Subscription / Usage-based SaaS]
- **Development Framework:** Spec-Driven Development (SDD) + Test-Driven Development (TDD)
- **Expected Outcome:** An enterprise-grade, fully audited, provably secure system backed by formal specifications, 100% test-first coverage on business logic, and automated CI/CD verification gates.

---

## 2. Mandatory Repository Inspection
Before planning or proposing any architectural choices:
1. Inspect the existing project root directory.
2. Read `README.md` and `AGENTS.md`.
3. Check the active IDE environment and review `docs/ide-compatibility.md`.
4. Read `docs/INDEX.md`, `docs/constitution.md`, and `docs/rules.md`.
5. Read `docs/spec.md` and inspect the `specs/` directory (both Format 1 Flat and Format 2 Modular samples).
6. Inspect `.agents/commands/*-ca-agent.md` and `.agents/skills/andrej-karpathy-skill/SKILL.md`.
7. Enforce the Two-Layer Policy:
   - Canonical Guidelines (`docs/`) = Immutable process baseline.
   - Specifications (`specs/`) = Living, executable requirement contracts.

Rules:
- MUST treat approved guidelines as the process authority.
- MUST treat approved feature specifications in `specs/` as the feature authority.
- MUST NOT implement unapproved features.
- MUST NOT delete or overwrite existing files without authorization.
- MUST report any contradictory specifications or missing policies.

---

## 3. Research & Development
Conduct rigorous product, technical, and regulatory research:

### 3.1 Product and Regulatory Research
- Regulatory Standards: [REGULATORY_STANDARDS: e.g., GDPR, SOC 2, HIPAA, FERPA] compliance requirements, PII encryption at rest and in transit, and immutable audit logs.
- Multi-tenancy isolation models: Shared database with Row-Level Security (RLS) vs. Database-per-tenant. Evaluate risk, operational cost, and backup/restore ergonomics.

### 3.2 Technical & Architectural Research
- Database transaction isolation levels: Read Committed vs. Repeatable Read for high-concurrency operations.
- Tenant resolution strategies: Subdomain routing, JWT tenant claims, and HTTP headers.
- High-concurrency calculation engines: Atomic updates, immutable audit trails, and data consistency models.

### 3.3 UI/UX & Accessibility Research
- Accessibility Compliance: WCAG 2.1 AA Compliance, complete keyboard navigation, high contrast ratios, and ARIA live regions.
- High-density data presentation: Keyboard-driven cell navigation, virtualized scrolling for large datasets, sticky headers, and instant column filtering.

---

## 4. Required Features

### Core Enterprise Modules
1. **Tenant Onboarding & Institutional Provisioning**:
   - Provisioning new organizations/tenants, configuration profiles, and department structures.
2. **Primary Core Workflow (`specs/002.spec.[PRIMARY_FEATURE].md`)**:
   - [PRIMARY_FEATURE_DESCRIPTION: Detail the core entity lifecycle, verification rules, and automated ID generation].
3. **Audit Logging & Historical State Tracking**:
   - Immutable audit logging: any retrospective change to records requires a recorded actor, timestamp, reason, and signature.
4. **Processing & Calculation Engine**:
   - Business calculations, formula execution, atomic verification, and tamper-evident audit trails.
5. **Billing, Transaction Allocation & Invoicing**:
   - Payment/transaction structures, automated invoicing, reconciliation, and ledger generation.
6. **Role-Based Portals & Granular Access Control**:
   - Strict data masking: Users only access data permitted by their verified organization and role boundaries.

---

## 5. Technology Stack Evaluation
Evaluate the optimal enterprise technology stack for this project:
- **Backend & API Layer:** [e.g., Node.js LTS with TypeScript (Fastify / Next.js) or Python (FastAPI) or Go]
- **Database & Data Layer:** [e.g., PostgreSQL with native Row-Level Security (RLS), Connection Pooling, and Prisma / Drizzle / SQLAlchemy]
- **Frontend Layer:** [e.g., Next.js (App Router), React, TypeScript, Tailwind CSS, shadcn/ui]
- **Testing & Quality Assurance:** [e.g., Vitest / Jest for unit & integration, Supertest for contract tests, Playwright for E2E]
- **Security & Linters:** [e.g., ESLint, Prettier, Zod runtime validation, Trivy / SonarQube for SAST]
- **DevOps & Infrastructure:** Docker multi-stage builds, GitHub Actions CI/CD with mandatory quality gates.

Provide detailed pros, cons, and justification for each component.

---

## 6. Database & Data Architecture
Design an enterprise-grade relational schema with mandatory tenant/entity isolation:
- Multi-tenancy / Data Isolation: Define tenant ownership keys (`tenant_id UUID REFERENCES tenants(id)`) across tables.
- Core Entities: List entity tables, relational foreign keys, and status enums.
- Row-Level Security (RLS) / Access Policies: Define access policies ensuring unauthorized queries return zero rows.
- Audit Logging: Temporal triggers recording `created_by`, `updated_by`, `old_value`, `new_value`, and `timestamp` for all critical record modifications.

---

## 7. UI/UX & Design Requirements
- Design System: Strict adherence to Design Tokens (Spacing, Typography, Elevation, Status colors).
- Accessibility: 100% WCAG 2.1 AA compliance. Zero keyboard traps, full focus indicator visibility.
- Data Presentation: Enterprise data tables with column sorting, multi-column filtering, pagination, and bulk selection.

---

## 8. Agent Skills, Tools & Custom Slash Commands
Inspect and configure agent capabilities from `.agents/`:
- `.agents/skills/andrej-karpathy-skill/SKILL.md`: Heuristics for data-first unit testing and minimal verifiable changes.
- Slash commands:
  - `/tdd-ca-agent`: Enforce strict Red → Green → Refactor test cycles.
  - `/plan-ca-agent`: Architecture validation and spec alignment.
  - `/review-ca-agent`: Code review against security rules and type safety.
  - `/security-audit-ca-agent`: Automated SAST, dependency, and privacy scanning.

---

## 9. System Architecture Planning
- High-Level Architecture (HLD) detailing API Gateway, Tenant Resolver, Auth Middleware, and Database Pooling.
- Low-Level Architecture (LLD) detailing Service-Repository patterns, Domain Error classes, and DTO mappings.
- API Contracts: Strict OpenAPI 3.1 specifications.

---

## 10. Security, Privacy & Regulatory Compliance
- [REGULATORY_STANDARDS] Compliance: Strict audit trails for all sensitive data access.
- Authentication & Authorization: OAuth 2.0 / OIDC with fine-grained Role-Based Access Control (RBAC) and Attribute-Based Access Control (ABAC).
- Secrets Management: Zero plaintext credentials in repository; `.env.example` templates only.

---

## 11. Testing & Quality Assurance Strategy (TDD Policy)
- **Unit Testing:** >90% branch coverage on all domain logic and calculation algorithms.
- **Integration Testing:** Real database container testing for isolation verification.
- **API Contract Testing:** Verifying all endpoints against OpenAPI schemas.
- **Quality Gates:** Zero failing tests, zero TypeScript errors (`tsc --noEmit`), zero linter warnings, zero high/critical vulnerabilities.

---

## 12. Documentation & Repository Plan
Propose explicit updates for:
- `docs/constitution.md` & `docs/rules.md`: Engineering invariants and testing policies.
- `docs/system-architecture.md`, `docs/database.md`, `docs/apis.md`, `docs/security.md`.
- `specs/`: Formulate specification files (`001.spec.authentication.md`, `002.spec.[PRIMARY_FEATURE].md`).
- `docs/release-checklist.md`: Production sign-off criteria.

---

## 13. Project Milestones & Phases
- **Phase 0:** Discovery, Regulatory Architecture & Stack Sign-Off (Current Step).
- **Phase 1:** Core Repository Configuration, Test Harness Setup & Data Isolation Baseline.
- **Phase 2:** Specification Validation & TDD Test Scaffolding for [PRIMARY_FEATURE] (`specs/002.*`).
- **Phase 3:** Feature Implementation via TDD (Red-Green-Refactor).
- **Phase 4:** Secondary Modules Implementation via TDD.
- **Phase 5:** Production Readiness Audit, Security SAST Scan & Formal Release Gate.

---

## 14. Required Output
Produce an exhaustive 17-section planning report:
1. Executive Project Summary
2. Regulatory & Market Research Findings
3. Target Personas & Core Workflows
4. Recommended Feature Scope (MVP vs. Phase 2)
5. Tech Stack Evaluation & Justification
6. Proposed High-Level & Low-Level Architecture
7. Relational Database Schema & Data Isolation Policies
8. UI/UX Design Direction & WCAG 2.1 AA Tokens
9. Security, Privacy & Compliance Governance Model
10. Comprehensive Testing Strategy & TDD Quality Gates
11. Agent Skills & Slash Command Configuration
12. File-by-File Repository Configuration Plan
13. Development Milestones & Phased Execution Plan
14. Risk Register & Mitigation Strategy
15. Key Decisions Requiring Human Approval
16. Test Environment & Container Setup
17. Exact Next-Step Prompt Recommendation

---

## 15. Mandatory Execution Restrictions
- DO NOT write application source code.
- DO NOT create or alter database schemas in a running database.
- DO NOT install packages or dependencies.
- DO NOT approve specifications on behalf of the human lead.
- STOP IMMEDIATELY after presenting the 17-section report and await explicit review.
```

---

## Step 5 — Human Review & Architecture Sign-Off

When your AI assistant finishes generating the 17-section planning report, inspect its proposals before permitting any code execution.

### Critical Verification Checklist
1. **Data Isolation & Multi-Tenancy**: Is data isolation explicitly enforced at the schema and query layer?
2. **Regulatory Compliance**: Does the plan include immutable audit logs for all sensitive operations to satisfy `[REGULATORY_STANDARDS]`?
3. **Specification Quality**: Are specifications assigned clear Acceptance Criteria (`AC-*`) that map directly to unit/integration tests?
4. **TDD Commitment**: Has the agent confirmed that no production code will be written before failing tests are authored and executed?

> **Sign-Off Decision**: If all architectural and compliance gates are met, grant formal approval to proceed to Step 6.

---

## Step 6 — Prompt 2: Approved Project Configuration & Harness Setup

> **Mode:** Configuration Mode  
> **Goal:** Configure repository documentation, establish the database baseline schema, configure the test harness in `tests/`, and verify active IDE adapters.

Execute the following prompt:

```markdown
# PROMPT 2 — APPROVED PROJECT CONFIGURATION & HARNESS SETUP

The project discovery, regulatory architecture, and technology stack for **[PROJECT_NAME]** have been reviewed and formally APPROVED.

**Approved Plan:** Architecture Baseline v1.0.0
**Approved Stack:** [APPROVED_STACK: e.g., Next.js 15 / Node.js 22 LTS, TypeScript, PostgreSQL 16 (RLS), Prisma ORM, Vitest, Zod, Tailwind CSS]
**Approved Governance:** Strict SDD + TDD (Red-Green-Refactor).

Now configure the project repository documentation, test harness, and environment templates according to the approved plan.

---

## Configuration Tasks

### 1. Update Core Repository Architecture Documentation
- Update `docs/INDEX.md` with active links to all architecture and specification assets.
- Configure `docs/system-architecture.md` with the approved High-Level Architecture and tenant resolution flow.
- Configure `docs/database.md` with complete DDL definitions, indexing strategies, and data isolation policies.
- Configure `docs/security.md` with compliance procedures, encryption keys policy, and role-based access matrices.
- Record the architectural baseline in `docs/decision-log.md` (`ADR-001: Architecture & Isolation Baseline`).

### 2. Configure Specification Assets (`specs/`)
- Establish `specs/001.spec.authentication.md` (Draft Status).
- Establish `specs/002.spec.[PRIMARY_FEATURE].md` (Ready for Review).
- Establish `specs/003.spec.[SECONDARY_FEATURE].md` (Draft Status).
- Ensure every specification defines explicit, uniquely numbered Acceptance Criteria (`AC-[MODULE]-[NUMBER]`).

### 3. Configure the Automated Test Harness (`tests/`)
- Initialize test runner configuration (e.g., `vitest.config.ts`) supporting path aliases (`@/*`).
- Configure test directory structure:
  - `tests/unit/`: Domain logic and pure calculation tests.
  - `tests/integration/`: Database and isolation tests.
  - `tests/fixtures/`: Deterministic test mock data and seed fixtures.
- Add an initial sanity test (`tests/unit/sanity.test.ts`) to verify that the test runner executes cleanly.

### 4. Configure Agent Commands & IDE Adapters
- Ensure `.agents/commands/*-ca-agent.md` are accessible in the active IDE.
- Create `.env.example` documenting all required variables with zero real secrets.

---

## Strict Scope Restrictions
- DO NOT implement application features or production endpoints.
- DO NOT modify canonical guideline rules without an authorized version bump.
- Keep all feature specifications in Draft or Review status until explicitly approved in Prompt 3.

## Required Report
Present a summary of:
1. Files created.
2. Files modified.
3. Test harness execution output (e.g., `npm test`).
4. Specification inventory and status matrix.
5. Readiness assessment for Feature 002 (`[PRIMARY_FEATURE]`).
```

---

## Step 7 — Prompt 3: Specification Validation & TDD Readiness Checkpoint

> **Mode:** Specification Validation & Test Authoring (Red Phase)  
> **Goal:** Validate `specs/002.spec.[PRIMARY_FEATURE].md`, formally approve its Acceptance Criteria, and author failing unit/integration tests before writing any production code.

Execute the following prompt:

```markdown
# PROMPT 3 — SPECIFICATION VALIDATION & TDD READINESS: [PRIMARY_FEATURE_NAME]

We are preparing to implement **Feature 002: [PRIMARY_FEATURE_NAME]** (`specs/002.spec.[PRIMARY_FEATURE].md`).

Execute the mandatory SDD specification validation and scaffold the failing TDD test suite.

---

## 1. Specification Audit (`specs/002.spec.[PRIMARY_FEATURE].md`)
Verify that the specification satisfies all SDD quality rules:
- Contains unambiguous business requirements.
- Defines input JSON Schema with strict runtime validation types (e.g., Zod).
- Specifies explicit database foreign key constraints and isolation barriers.
- Defines verifiable Acceptance Criteria:
  - `[SPEC_AC_PREFIX]-001`: System must validate input payloads and generate unique sequential identifiers.
  - `[SPEC_AC_PREFIX]-002`: System must reject invalid business states with appropriate HTTP 422 errors.
  - `[SPEC_AC_PREFIX]-003`: System must enforce strict data barrier isolation across tenants/organizations.
  - `[SPEC_AC_PREFIX]-004`: An immutable audit log entry must be written upon successful completion.

---

## 2. Author Failing Tests (TDD RED PHASE)
Write the test suite in `tests/unit/[PRIMARY_FEATURE].test.ts` and `tests/integration/[PRIMARY_FEATURE]-isolation.test.ts`:
- Test 1: Validate identifier generation & schema conformity (`[SPEC_AC_PREFIX]-001`).
- Test 2: Validate business rule rejections (`[SPEC_AC_PREFIX]-002`).
- Test 3: Validate database isolation barriers (`[SPEC_AC_PREFIX]-003`).
- Test 4: Validate immutable audit log creation (`[SPEC_AC_PREFIX]-004`).

---

## 3. Execute Tests & Verify RED State
Run the test runner using `/tdd-ca-agent`:
`/tdd-ca-agent run tests/unit/[PRIMARY_FEATURE].test.ts`

Confirm that all tests FAIL with clear, expected failure messages (e.g., `Cannot find module '../src/services/[PRIMARY_FEATURE]'`).

---

## Strict Restrictions
- DO NOT implement the production service or write green code yet.
- Present the specification validation report and the verified RED test output.
- STOP and request human authorization to proceed to implementation.
```

---

## Step 8 — Prompt 4: Feature Implementation via Strict TDD (Red-Green-Refactor)

> **Mode:** Implementation Mode (Green & Refactor Phases)  
> **Goal:** Write the minimum production code necessary to pass all failing tests, refactor the implementation for architectural elegance, and execute an atomic commit citing the Spec ID and AC numbers.

Execute the following prompt:

```markdown
# PROMPT 4 — FEATURE IMPLEMENTATION: [PRIMARY_FEATURE_NAME] (GREEN & REFACTOR)

The test suite for **Feature 002: [PRIMARY_FEATURE_NAME]** has been verified in the RED state.

**Approved Spec:** `specs/002.spec.[PRIMARY_FEATURE].md`
**Acceptance Criteria:** `[SPEC_AC_PREFIX]-001`, `[SPEC_AC_PREFIX]-002`, `[SPEC_AC_PREFIX]-003`, `[SPEC_AC_PREFIX]-004`
**Target Tests:** `tests/unit/[PRIMARY_FEATURE].test.ts`

Now implement the production code to satisfy the tests (GREEN phase) and perform clean architectural refactoring.

---

## Implementation Workflow

### 1. Implement Minimum Code (GREEN PHASE)
- Create `src/services/[PRIMARY_FEATURE].service.ts`:
  - Implement runtime input validation with schema definitions.
  - Implement sequential identifier generation.
  - Implement core record persistence with transaction support.
  - Implement temporal audit log creation.
- Execute tests:
  `/tdd-ca-agent run tests/unit/[PRIMARY_FEATURE].test.ts`
- Verify that all tests pass with 100% green status.

### 2. Refactor (REFACTOR PHASE)
- Extract common isolation validation into reusable middleware.
- Optimize database queries to prevent N+1 query patterns.
- Re-run all tests to guarantee zero behavioral regressions.

### 3. Static Analysis & Type Checking
- Run type checking: `npx tsc --noEmit` (or language compiler check).
- Run linter: `npm run lint`.
- Run code review command: `/review-ca-agent src/services/[PRIMARY_FEATURE].service.ts`.

---

## Completion Report
Provide:
1. Implemented Requirement IDs (`[SPEC_AC_PREFIX]-001..004`).
2. Files created and modified.
3. Actual test execution output (100% Green).
4. Proposed atomic git commit message citing Spec and AC IDs.
```

---

## Step 9 — Prompt 5: Production Readiness Audit & Formal Release Gate

> **Mode:** Audit & Release Gate  
> **Goal:** Execute a full-spectrum production audit covering test coverage, SAST security scans, regulatory compliance verification, and formal sign-off in `docs/approvals/`.

Execute the following prompt:

```markdown
# PROMPT 5 — PRODUCTION READINESS AUDIT & RELEASE GATE

Perform an exhaustive production readiness audit on the [PROJECT_NAME] codebase before commercial release.

Validate all verifiable outcomes against the approved specifications and constitutional rules.

---

## Audit Verification Categories

### 1. Comprehensive Test Suite Execution
- Execute full test suite: `npm test -- --coverage` (or language equivalent).
- Verify >90% branch coverage on all business services.
- Verify zero skipped or disabled tests.

### 2. Multi-Layer Security & SAST Audit
- Run the security audit agent command:
  `/security-audit-ca-agent`
- Validate that all database queries enforce isolation barriers.
- Scan for OWASP Top 10 vulnerabilities (SQL injection, broken access control, XSS).
- Verify zero critical or high vulnerabilities in project dependencies.

### 3. Regulatory Privacy & Compliance Verification
- Verify that sensitive PII fields are encrypted at rest.
- Verify that an immutable audit record is created for every critical state mutation.

### 4. Production Build & Bundle Integrity
- Run production build: `npm run build` (or compiler production release).
- Verify Docker container multi-stage build finishes with non-root user execution.

---

## Release Report Required
Generate a formal release report:
- Status for each gate: [PASSED] / [FAILED] / [BLOCKED].
- Release blocker inventory (if any).
- Formal release sign-off document written to `docs/approvals/release-v1.0.0.md`.

STOP and request final human authorization before deployment.
```

---

## Complete SDD-TDD Workflow Summary & Governance Rules

```text
+-------------------------------------------------------------------------------+
|                    THE SPEC-DRIVEN DEVELOPMENT (SDD) WORKFLOW                 |
+-------------------------------------------------------------------------------+
|                                                                               |
|  [Step 1] Framework Setup     --> Extract & rename to '[your-project-name]'.  |
|                                   Inspect .agents/ and select IDE adapter.    |
|                                                                               |
|  [Step 2] Prompt 1: R&D       --> 15-Section Master Prompt in Plan Mode.      |
|                                   Data isolation, compliance standards, HLD.  |
|                                                                               |
|  [Step 3] Human Approval      --> Formal sign-off on architecture & scope.    |
|                                                                               |
|  [Step 4] Prompt 2: Baseline  --> Configure docs/, ADR-001, test harness.     |
|                                                                               |
|  [Step 5] Prompt 3: Spec Val. --> Validate specs/002.* & AC-[MODULE]-001..004.|
|                                   Write FAILING tests (TDD Red Phase).        |
|                                                                               |
|  [Step 6] Prompt 4: TDD Green --> Write minimal production code to pass tests.|
|                                   Refactor architecture. Atomic git commit.   |
|                                                                               |
|  [Step 7] Prompt 5: Release   --> Full test suite, SAST security scan,        |
|                                   Compliance sign-off in docs/approvals/.     |
|                                                                               |
+-------------------------------------------------------------------------------+
```

### Immutable SDD Governance Rules
1. **No Spec, No Code**: Writing implementation code without an approved specification in `specs/` is strictly prohibited.
2. **Tests Must Precede Code**: Any pull request or commit containing production code without accompanying or preceding tests will be rejected automatically.
3. **Traceability Invariant**: Every commit message must cite the active Spec ID and Acceptance Criteria (e.g., `feat([module]): satisfy [SPEC_AC_PREFIX]-001 unique identifier generation`).


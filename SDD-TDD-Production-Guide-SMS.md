# AI-Powered Project Development — Complete Spec-Driven Development (SDD) & TDD Production Guide for School Management System (SMS)

**Framework:** Spec-Driven Development (SDD) + Test-Driven Development (TDD) · Enterprise Production SaaS  
**Author:** Chandan Adhikary  
**Reference Project:** EduSphere Enterprise Multi-Tenant School Management System (SMS)  
**Target IDEs:** Claude Code, Cursor, Windsurf, Antigravity, GitHub Copilot, Codex, Trae, VS Code  

---

## Executive Summary & Guiding Philosophy

**Spec-Driven Development (SDD)** paired with **Test-Driven Development (TDD)** is an enterprise-grade engineering methodology designed for high-assurance, zero-defect software engineering. Unlike informal coding, SDD enforces a strict separation of concerns:
1. **The Specification is the Law**: No code is ever written until an explicit, unambiguous specification is drafted, reviewed, verified against acceptance criteria, and formally approved by a human lead.
2. **The Two-Layer Governance Policy**:
   - **Constitutional Guidelines (`docs/`)**: The immutable rules of architecture, security policies, coding standards, and process guidelines.
   - **Executable Specifications (`specs/`)**: The living, version-controlled feature contracts defining data structures, state transitions, API endpoints, and verifiable Acceptance Criteria (`AC-*`).
3. **Strict Test-First Implementation (Red → Green → Refactor)**:
   - **Red**: Write executable unit, integration, and contract tests directly against the approved Acceptance Criteria. Verify that they fail with expected error messages.
   - **Green**: Write the absolute minimum production code required to satisfy the tests.
   - **Refactor**: Clean up the architecture, eliminate duplication, and optimize performance while ensuring all tests remain 100% green.
4. **Zero Hallucination / Zero Scope Creep**: Autonomous AI agents are restricted to approved specifications. Any unapproved feature or undocumented modification is treated as an architectural defect.

This guide provides an end-to-end, production-ready blueprint for building **EduSphere Enterprise**—a secure, multi-tenant School Management System designed for strict regulatory compliance (FERPA, COPPA, GDPR) and mission-critical reliability.

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

The foundational scaffolding for your SDD + TDD project resides in the canonical template directory: `SDD-TDD-Chandan-Adhikary/Spec-Driven-Development/`.

### Directory Structure & Invariant Rules
To start a new project, copy or extract the template folder into your clean workspace and rename it to your target enterprise project name:

```text
# Before:
SDD-TDD-Chandan-Adhikary/Spec-Driven-Development/

# After:
school-management-system/
```

### Critical Repository Rules
- **Do NOT write application code inside the template directory (`SDD-TDD-Chandan-Adhikary/`)**: The template folder is an immutable distribution asset. Always copy or rename it to a clean working directory before starting development.
- **Lowercase `kebab-case`**: Avoid spaces, uppercase characters, and special symbols in your directory paths.
- **Open at the Project Root**: Always open your IDE at the root of `school-management-system/` so that the AI engine discovers `AGENTS.md`, `.agents/`, `specs/`, and `docs/`.

---

## Step 2 — Specifications Architecture: Flat vs. Modular Dual Formats

The SDD framework supports two standard specification formats in the `specs/` directory:

```text
specs/
├── Format 1 (Flat Spec Files - for straightforward features):
│   ├── 001.spec.authentication.sample.md
│   └── 002.spec.student-enrollment.sample.md
│
└── Format 2 (Modular Spec Folders - for complex enterprise sub-systems):
    ├── 001.spec.authentication.sample/
    │   ├── spec.md
    │   ├── schema.json
    │   └── acceptance-criteria.md
    └── 002.spec.student-enrollment.sample/
        ├── spec.md
        ├── schema.json
        └── acceptance-criteria.md
```

### Format Selection Rules
- **Format 1 (Flat)**: Recommended for single, cohesive features (e.g., Attendance Marking, Password Reset) where all acceptance criteria, API endpoints, and schemas fit cleanly into a single file.
- **Format 2 (Modular Folders)**: Recommended for enterprise sub-systems (e.g., Student Enrollment, Fee Billing Engine, Academic Gradebook) requiring separate JSON Schema contracts, state machine diagrams, and extensive regulatory compliance matrices.

---

## Step 3 — IDE Detection & Auto-Pruning Policy

Before executing prompts, inspect the active IDE environment per `docs/ide-compatibility.md`:
- **Universal / Agent Core**: `AGENTS.md` and `.agents/commands/*-ca-agent.md`.
- **Claude Code**: `CLAUDE.md`.
- **Cursor**: `.cursorrules`.
- **Windsurf**: `.windsurfrules`.
- **Antigravity**: `antigravity.json`.

If working exclusively within one IDE (e.g., Claude Code), prune unused root adapters during Prompt 1 to maximize the model's active context window. If collaborating across multiple IDEs, retain `AGENTS.md` as the canonical master reference.

---

## Step 4 — Prompt 1: Master Architecture, R&D & Pre-Development Planning

> **Mode:** Plan Mode / Ask Mode / Read-Only Planning  
> **Goal:** Direct the AI agent to thoroughly research the School Management System domain, inspect the SDD guidelines, design multi-tenant database isolation, define FERPA/GDPR compliance controls, and present a complete 17-point planning report—**without implementing any application code yet**.

Copy and paste the exact prompt below into your AI assistant:

```markdown
# PROMPT 1 — MASTER ARCHITECTURE, R&D & PRE-DEVELOPMENT PLANNING

## Your Role
Act as an elite team of senior enterprise technology leaders with 15+ years of experience:
- Senior Enterprise Software Architect (Distributed Systems, Multi-Tenancy)
- Senior Principal Cybersecurity & Compliance Engineer (FERPA, COPPA, GDPR, SOC 2)
- Senior Backend & Database Architect (PostgreSQL, Row-Level Security, ACID Transactions)
- Senior Frontend Systems Architect (Next.js, TypeScript, Accessible Design Systems)
- Senior QA & Test Automation Architect (TDD, Contract Testing, Property-Based Testing)
- Principal SaaS Product Manager & Technical Program Manager

Your objective is to plan a zero-defect, strictly verified, multi-tenant enterprise School Management System (SMS) platform. Prioritize mathematical correctness, strict data isolation, regulatory compliance, and testability.

IMPORTANT: WORK IN PLAN MODE ONLY. DO NOT IMPLEMENT APPLICATION CODE. DO NOT INSTALL PACKAGES, ALTER THE DATABASE, OR START DEPLOYMENT.

---

## 1. Project Information
- **Project Name:** EduSphere Enterprise SMS
- **Product Type:** Multi-Tenant Enterprise School Management Platform & SaaS
- **Project Description:** A mission-critical School Management System providing comprehensive institutional lifecycle governance for K-12 school districts, private academies, and multi-campus educational networks. The system governs Student Enrollment & Records (SIS), Timetable Scheduling, Multi-Tier Attendance, Academic Gradebooks (GPA, Standards-based), Fee Invoicing with Audit Trails, and Role-Based Portals for SuperAdmins, Principals, Teachers, Students, and Parents.
- **Target Audience:** School district administrators, campus principals, registrars, academic coordinators, classroom teachers, students, and guardians.
- **Target Market / Region:** Global / North America & Europe (Mandatory FERPA, COPPA, and GDPR compliance).
- **Business Model:** Multi-campus B2B enterprise subscription with strict service-level agreements (SLAs).
- **Development Framework:** Spec-Driven Development (SDD) + Test-Driven Development (TDD).
- **Expected Outcome:** An enterprise-grade, fully audited, provably secure SaaS system backed by formal specifications, 100% test-first coverage on business logic, and automated CI/CD verification gates.

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
- Federal Educational Rights and Privacy Act (FERPA): Student PII encryption, audit logs of record inspections, parent consent workflows.
- Children’s Online Privacy Protection Act (COPPA): Restrictions on data collection for students under 13.
- Multi-tenancy isolation models: Shared database with Row-Level Security (RLS) vs. Database-per-tenant. Evaluate risk, operational cost, and backup/restore ergonomics.

### 3.2 Technical & Architectural Research
- Database transaction isolation levels: Read Committed vs. Repeatable Read for high-concurrency attendance and fee payment processing.
- Multi-tenant tenant resolution strategies: Subdomain routing (`tenant1.edusphere.com`), JWT tenant claims, and HTTP headers (`X-Tenant-ID`).
- High-concurrency Gradebook computation engine: Atomic updates, immutable grade change logs, and mathematical precision for weighted GPA.

### 3.3 UI/UX & Accessibility Research
- WCAG 2.1 AA Compliance: High-contrast ratios, complete keyboard navigation, screen reader accessibility (ARIA live regions for attendance status).
- High-density data tables: Keyboard-driven cell navigation, virtualized scrolling for large student rosters (1,000+ records), sticky headers, and instant column filtering.

---

## 4. Required Features

### Core Enterprise Modules
1. **Tenant Onboarding & Institutional Provisioning**:
   - Provisioning new school campus, academic year definition, grade levels, and department structures.
2. **Student Enrollment & Records Lifecycle (`specs/002.spec.student-enrollment.md`)**:
   - Digital student application, document verification, national student ID assignment, guardian mapping, and automated admission number generation.
3. **Classroom Attendance & Regulatory Audit Logging**:
   - Daily period-by-period and morning homeroom attendance.
   - Immutable audit logging: any retrospective change to an attendance record requires a recorded reason and teacher signature.
4. **Examination Engine & Gradebook**:
   - Custom grading scales (Letter, Percentage, 4.0 GPA, Standards-based).
   - Grade entry with atomic verification and tamper-evident audit trails.
5. **Fee Billing, Scholarship Allocation & Online Reconciliation**:
   - Fee structure definitions (Tuition, Transport, Lab fees), automated invoicing, partial payment tracking, and receipt generation.
6. **FERPA-Compliant Parent-Student Portal**:
   - Strict data masking: Parents only see their verified dependents; teachers only see students enrolled in their assigned classes.

### Additional Recommended Capabilities
- Integration with National Student Clearinghouse and state reporting formats.
- Real-time emergency broadcast notification system (SMS/Email).
- Automated anomaly detection for chronic student absenteeism.

---

## 5. Technology Stack Evaluation
Evaluate the following enterprise technology stack:
- **Backend & API Layer:** Node.js 22 LTS with TypeScript (Fastify / Next.js API Routes) or Python 3.12 (FastAPI).
- **Database & Data Layer:** PostgreSQL 16+ with native Row-Level Security (RLS), Connection Pooling (PgBouncer), and Prisma/Drizzle ORM with strict migration control.
- **Frontend Layer:** Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS v4, shadcn/ui.
- **Testing & Quality Assurance:** Vitest for unit & integration tests, Supertest for API contract tests, Playwright for E2E user journeys, and MSW (Mock Service Worker).
- **Security & Linters:** ESLint, Prettier, Zod runtime validation, SonarQube / Trivy for SAST and container vulnerability scans.
- **DevOps & Infrastructure:** Docker multi-stage builds, GitHub Actions CI/CD with mandatory quality gates.

Provide detailed pros, cons, and justification for each component.

---

## 6. Database & Data Architecture
Design an enterprise-grade relational schema with mandatory tenant isolation:
- Multi-tenancy: Every table must contain a non-nullable `tenant_id UUID REFERENCES tenants(id)`.
- Core Entities: `tenants`, `academic_years`, `users`, `roles_permissions`, `classes`, `students`, `guardians`, `enrollments`, `attendance_records`, `attendance_audit_log`, `grade_items`, `grades`, `invoices`, `payments`.
- Row-Level Security (RLS): Define PostgreSQL RLS policies ensuring that queries without a valid tenant context return zero rows.
- Audit Logging: Temporal triggers recording `created_by`, `updated_by`, `old_value`, `new_value`, and `timestamp` for all grade and attendance modifications.

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
  - `/security-audit-ca-agent`: Automated SAST, dependency, and FERPA privacy scanning.

---

## 9. System Architecture Planning
- High-Level Architecture (HLD) detailing API Gateway, Tenant Resolver, Auth Middleware, and Database Pooling.
- Low-Level Architecture (LLD) detailing Service-Repository patterns, Domain Error classes, and DTO mappings.
- API Contracts: Strict OpenAPI 3.1 specifications.

---

## 10. Security, Privacy & Regulatory Compliance
- FERPA / GDPR Compliance: Strict audit trails for all PII access.
- Authentication & Authorization: OAuth 2.0 / OIDC with fine-grained Role-Based Access Control (RBAC) and Attribute-Based Access Control (ABAC).
- Secrets Management: Zero plaintext credentials in repository; `.env.example` templates only.

---

## 11. Testing & Quality Assurance Strategy (TDD Policy)
- **Unit Testing:** >90% branch coverage on all domain logic, fee calculations, and GPA algorithms.
- **Integration Testing:** Real PostgreSQL container testing for RLS isolation verification.
- **API Contract Testing:** Verifying all endpoints against OpenAPI schemas.
- **Quality Gates:** Zero failing tests, zero TypeScript errors (`tsc --noEmit`), zero ESLint warnings, zero high/critical vulnerabilities.

---

## 12. Documentation & Repository Plan
Propose explicit updates for:
- `docs/constitution.md` & `docs/rules.md`: Engineering invariants and testing policies.
- `docs/system-architecture.md`, `docs/database.md`, `docs/apis.md`, `docs/security.md`.
- `specs/`: Formulate specification files (`001.spec.authentication.md`, `002.spec.student-enrollment.md`, `003.spec.attendance.md`).
- `docs/release-checklist.md`: Production sign-off criteria.

---

## 13. Project Milestones & Phases
- **Phase 0:** Discovery, Regulatory Architecture & Stack Sign-Off (Current Step).
- **Phase 1:** Core Repository Configuration, Test Harness Setup & RLS Baseline.
- **Phase 2:** Specification Validation & TDD Test Scaffolding for Student Enrollment (`specs/002.*`).
- **Phase 3:** Feature Implementation via TDD (Red-Green-Refactor).
- **Phase 4:** Attendance & Academic Gradebook Modules via TDD.
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
7. Relational Database Schema & PostgreSQL RLS Policies
8. UI/UX Design Direction & WCAG 2.1 AA Tokens
9. Security, FERPA & Privacy Governance Model
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
1. **Multi-Tenant Isolation**: Is Row-Level Security (RLS) explicitly enforced with a mandatory `tenant_id` on every table?
2. **Regulatory Compliance**: Does the plan include immutable audit logs for attendance and grade changes to satisfy FERPA requirements?
3. **Specification Quality**: Are specifications assigned clear Acceptance Criteria (`AC-*`) that map directly to unit/integration tests?
4. **TDD Commitment**: Has the agent confirmed that no production code will be written before failing tests are authored and executed?

> **Sign-Off Decision**: If all architectural and compliance gates are met, grant formal approval to proceed to Step 6.

---

## Step 6 — Prompt 2: Approved Project Configuration & Harness Setup

> **Mode:** Configuration Mode  
> **Goal:** Configure repository documentation, establish the PostgreSQL RLS baseline schema, configure the Vitest test harness in `tests/`, and verify active IDE adapters.

Execute the following prompt:

```markdown
# PROMPT 2 — APPROVED PROJECT CONFIGURATION & HARNESS SETUP

The project discovery, regulatory architecture, and technology stack for **EduSphere Enterprise SMS** have been reviewed and formally APPROVED.

**Approved Plan:** Architecture Baseline v1.0.0
**Approved Stack:** Next.js 15 / Node.js 22 LTS, TypeScript, PostgreSQL 16 (RLS), Prisma ORM, Vitest, Zod, Tailwind CSS v4.
**Approved Governance:** Strict SDD + TDD (Red-Green-Refactor).

Now configure the project repository documentation, test harness, and environment templates according to the approved plan.

---

## Configuration Tasks

### 1. Update Core Repository Architecture Documentation
- Update `docs/INDEX.md` with active links to all architecture and specification assets.
- Configure `docs/system-architecture.md` with the approved High-Level Architecture and tenant resolution flow.
- Configure `docs/database.md` with complete DDL definitions, indexing strategies, and PostgreSQL Row-Level Security (RLS) policies.
- Configure `docs/security.md` with FERPA compliance procedures, encryption keys policy, and role-based access matrices.
- Record the architectural baseline in `docs/decision-log.md` (`ADR-001: PostgreSQL Row-Level Security for Multi-Tenancy`).

### 2. Configure Specification Assets (`specs/`)
- Establish `specs/001.spec.authentication.md` (Draft Status).
- Establish `specs/002.spec.student-enrollment.md` (Ready for Review).
- Establish `specs/003.spec.attendance.md` (Draft Status).
- Ensure every specification defines explicit, uniquely numbered Acceptance Criteria (`AC-[MODULE]-[NUMBER]`).

### 3. Configure the Automated Test Harness (`tests/`)
- Initialize `vitest.config.ts` supporting TypeScript path aliases (`@/*`).
- Configure test directory structure:
  - `tests/unit/`: Domain logic and pure calculations.
  - `tests/integration/`: Database and RLS isolation tests.
  - `tests/fixtures/`: Deterministic test mock data and tenant seeds.
- Add an initial sanity test (`tests/unit/sanity.test.ts`) to verify that the test runner executes cleanly.

### 4. Configure Agent Commands & IDE Adapters
- Ensure `.agents/commands/*-ca-agent.md` are accessible in the active IDE.
- Create `.env.example` documenting all required variables (`DATABASE_URL`, `JWT_SECRET`, `PORT`) with zero real secrets.

---

## Strict Scope Restrictions
- DO NOT implement application features or production endpoints.
- DO NOT modify canonical guideline rules without an authorized version bump.
- Keep all feature specifications in Draft or Review status until explicitly approved in Prompt 3.

## Required Report
Present a summary of:
1. Files created.
2. Files modified.
3. Test harness execution output (`npm test`).
4. Specification inventory and status matrix.
5. Readiness assessment for Feature 002 (Student Enrollment).
```

---

## Step 7 — Prompt 3: Specification Validation & TDD Readiness Checkpoint

> **Mode:** Specification Validation & Test Authoring (Red Phase)  
> **Goal:** Validate `specs/002.spec.student-enrollment.md`, formally approve its Acceptance Criteria, and author failing unit/integration tests before writing any production code.

Execute the following prompt:

```markdown
# PROMPT 3 — SPECIFICATION VALIDATION & TDD READINESS: STUDENT ENROLLMENT

We are preparing to implement **Feature 002: Student Enrollment & Records** (`specs/002.spec.student-enrollment.md`).

Execute the mandatory SDD specification validation and scaffold the failing TDD test suite.

---

## 1. Specification Audit (`specs/002.spec.student-enrollment.md`)
Verify that the specification satisfies all SDD quality rules:
- Contains unambiguous business requirements.
- Defines input JSON Schema with strict Zod types.
- Specifies explicit database foreign key constraints (`tenant_id`, `class_id`).
- Defines verifiable Acceptance Criteria:
  - `AC-ENROLL-001`: System must generate a unique, sequential Admission Number (e.g., `ADM-2026-0001`) scoped to the tenant.
  - `AC-ENROLL-002`: System must reject enrollment if student age is below minimum grade policy with an HTTP 422 error.
  - `AC-ENROLL-003`: System must enforce multi-tenant isolation; enrollment data for School A must never be accessible by School B.
  - `AC-ENROLL-004`: An immutable audit log entry must be written upon successful student enrollment.

---

## 2. Author Failing Tests (TDD RED PHASE)
Write the test suite in `tests/unit/student-enrollment.test.ts` and `tests/integration/student-enrollment-rls.test.ts`:
- Test 1: Validate admission number sequence generation (`AC-ENROLL-001`).
- Test 2: Validate validation rejection on under-age student (`AC-ENROLL-002`).
- Test 3: Validate multi-tenant database barrier (`AC-ENROLL-003`).
- Test 4: Validate audit log creation (`AC-ENROLL-004`).

---

## 3. Execute Tests & Verify RED State
Run the test runner using `/tdd-ca-agent`:
`/tdd-ca-agent run tests/unit/student-enrollment.test.ts`

Confirm that all tests FAIL with clear, expected failure messages (e.g., `Cannot find module '../src/services/enrollment'`).

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
# PROMPT 4 — FEATURE IMPLEMENTATION: STUDENT ENROLLMENT (GREEN & REFACTOR)

The test suite for **Feature 002: Student Enrollment** has been verified in the RED state.

**Approved Spec:** `specs/002.spec.student-enrollment.md`
**Acceptance Criteria:** `AC-ENROLL-001`, `AC-ENROLL-002`, `AC-ENROLL-003`, `AC-ENROLL-004`
**Target Tests:** `tests/unit/student-enrollment.test.ts`

Now implement the production code to satisfy the tests (GREEN phase) and perform clean architectural refactoring.

---

## Implementation Workflow

### 1. Implement Minimum Code (GREEN PHASE)
- Create `src/services/enrollment.service.ts`:
  - Implement student input validation with Zod.
  - Implement tenant-scoped admission number generator.
  - Implement student record creation with transaction support.
  - Implement temporal audit log creation (`audit_records`).
- Execute tests:
  `/tdd-ca-agent run tests/unit/student-enrollment.test.ts`
- Verify that all tests pass with 100% green status.

### 2. Refactor (REFACTOR PHASE)
- Extract common tenant validation into reusable middleware.
- Optimize database queries to prevent N+1 query patterns.
- Re-run all tests to guarantee zero behavioral regressions.

### 3. Static Analysis & Type Checking
- Run type checking: `npx tsc --noEmit`.
- Run linter: `npm run lint`.
- Run code review command: `/review-ca-agent src/services/enrollment.service.ts`.

---

## Completion Report
Provide:
1. Implemented Requirement IDs (`AC-ENROLL-001..004`).
2. Files created and modified.
3. Actual test execution output (100% Green).
4. Proposed atomic git commit message citing Spec and AC IDs.
```

---

## Step 9 — Prompt 5: Production Readiness Audit & Formal Release Gate

> **Mode:** Audit & Release Gate  
> **Goal:** Execute a full-spectrum production audit covering test coverage, SAST security scans, FERPA compliance verification, and formal sign-off in `docs/approvals/`.

Execute the following prompt:

```markdown
# PROMPT 5 — PRODUCTION READINESS AUDIT & RELEASE GATE

Perform an exhaustive production readiness audit on the EduSphere Enterprise SMS codebase before commercial release.

Validate all verifiable outcomes against the approved specifications and constitutional rules.

---

## Audit Verification Categories

### 1. Comprehensive Test Suite Execution
- Execute full test suite: `npm test -- --coverage`.
- Verify >90% branch coverage on all business services.
- Verify zero skipped or disabled tests.

### 2. Multi-Tenant Security & SAST Audit
- Run the security audit agent command:
  `/security-audit-ca-agent`
- Validate that all database queries enforce PostgreSQL Row-Level Security (`tenant_id`).
- Scan for OWASP Top 10 vulnerabilities (SQL injection, broken access control, XSS).
- Verify zero critical or high vulnerabilities in npm dependencies (`npm audit`).

### 3. Regulatory Privacy & FERPA Verification
- Verify that student PII fields (medical records, parent contact details) are encrypted at rest.
- Verify that an immutable audit record is created for every student record view and grade modification.

### 4. Production Build & Bundle Integrity
- Run production build: `npm run build`.
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
|  [Step 1] Framework Setup     --> Extract & rename to 'school-management'.    |
|                                   Inspect .agents/ and select IDE adapter.    |
|                                                                               |
|  [Step 2] Prompt 1: R&D       --> 15-Section Master Prompt in Plan Mode.      |
|                                   Multi-tenancy RLS, FERPA compliance, HLD.   |
|                                                                               |
|  [Step 3] Human Approval      --> Formal sign-off on architecture & scope.    |
|                                                                               |
|  [Step 4] Prompt 2: Baseline  --> Configure docs/, ADR-001, Vitest harness.   |
|                                                                               |
|  [Step 5] Prompt 3: Spec Val. --> Validate specs/002.* and AC-ENROLL-001..004.|
|                                   Write FAILING tests (TDD Red Phase).        |
|                                                                               |
|  [Step 6] Prompt 4: TDD Green --> Write minimal production code to pass tests.|
|                                   Refactor architecture. Atomic git commit.   |
|                                                                               |
|  [Step 7] Prompt 5: Release   --> Full test suite, SAST security scan,        |
|                                   FERPA audit sign-off in docs/approvals/.    |
|                                                                               |
+-------------------------------------------------------------------------------+
```

### Immutable SDD Governance Rules
1. **No Spec, No Code**: Writing implementation code without an approved specification in `specs/` is strictly prohibited.
2. **Tests Must Precede Code**: Any pull request containing production code without accompanying or preceding tests will be rejected automatically.
3. **Traceability Invariant**: Every commit message must cite the active Spec ID and Acceptance Criteria (e.g., `feat(enrollment): satisfy AC-ENROLL-001 unique admission number`).

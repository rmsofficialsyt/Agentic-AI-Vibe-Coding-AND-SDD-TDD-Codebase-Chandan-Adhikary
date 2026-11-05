# AI-Powered Project Development — Custom Slash Commands for SDD & TDD
### Operational Reference for `.agents/commands/` & Complete Enterprise SMS SaaS Demo

**Framework:** Spec-Driven Development (SDD) + Test-Driven Development (TDD) · High-Assurance SaaS  
**Author / Engineering Lead:** Chandan Adhikary & Antigravity Engineering  
**Version:** 2.0.0 (Production-Grade Universal Release)  
**Applies to:** Claude Code, Cursor, Windsurf, Antigravity, GitHub Copilot, Codex, Trae, VS Code with AI Agents  

---

## 1. Executive Overview & Formal Governance Architecture

In the **Spec-Driven Development (SDD) + TDD Framework**, custom slash commands serve as **binding compliance gates**. 

When an AI agent receives a slash command (such as `/spec-check-ca-agent` or `/tdd-ca-agent`), it is bound by immutable repository policies defined in `.agents/commands/<name>-ca-agent.md`.

```text
+-------------------------------------------------------------------------------+
|                       SDD + TDD SLASH COMMAND PIPELINE                        |
+-------------------------------------------------------------------------------+
|                                                                               |
|   /plan-ca-agent           --> Enterprise architecture, multi-tenant RLS,     |
|                                FERPA compliance, strict plan mode.            |
|                                                                               |
|   /task-ca-agent           --> Configure docs/, ADRs, and Vitest test harness |
|                                in 'tests/' directory.                         |
|                                                                               |
|   /spec-check-ca-agent     --> Author & validate specs/ (Format 1 or 2)       |
|                                with explicit Acceptance Criteria (AC-*).      |
|                                                                               |
|   /testing-ca-agent        --> Scaffold failing tests (TDD Red Phase)         |
|                                and verify intended failure state.             |
|                                                                               |
|   /tdd-ca-agent            --> Implement MINIMAL code to turn tests green,    |
|                                followed by architectural refactoring.         |
|                                                                               |
|   /review-ca-agent         --> Verify test-to-spec traceability & code diff.  |
|                                                                               |
|   /security-audit-ca-agent --> Run SAST scan, FERPA audit checks, RLS audit.  |
|                                                                               |
|   /release-check-ca-agent  --> Final gate: 100% green tests & signed approval |
|                                in docs/approvals/release-v1.0.0.md.           |
|                                                                               |
+-------------------------------------------------------------------------------+
```

### 1.1 The Invariant Rules of SDD Commands
1. **No Spec, No Code:** The agent is prohibited from writing application source code unless an approved specification exists in `specs/`.
2. **Tests Before Code (Red First):** Any command attempting to implement code before failing tests are executed will be aborted.
3. **Traceability Invariant:** Every commit and pull request must cite the active Spec ID and Acceptance Criteria (e.g. `feat(enrollment): satisfy AC-ENROLL-001`).
4. **Collision Prevention (`-ca-agent` Suffix):** Standard tokens (`/plan`, `/test`, `/review`) are namespace-protected with `-ca-agent` to eliminate collisions with IDE-native commands across Cursor, Claude Code, Windsurf, Antigravity, and VS Code.

---

## 2. Managing `specs/` via Slash Commands: Flat vs. Modular Formats

The SDD framework supports two specification layouts in `specs/`:

```text
specs/
├── Format 1 (Flat Files):
│   ├── 001.spec.authentication.sample.md
│   └── 002.spec.student-enrollment.sample.md
│
└── Format 2 (Modular Folders):
    ├── 001.spec.authentication.sample/
    │   ├── spec.md
    │   ├── schema.json
    │   └── acceptance-criteria.md
    └── 002.spec.student-enrollment.sample/
        ├── spec.md
        ├── schema.json
        └── acceptance-criteria.md
```

Using `/spec-check-ca-agent`, the agent automatically parses either format, validates requirement traceability, and verifies that every feature has unambiguous, testable Acceptance Criteria (`AC-[MODULE]-[NUMBER]`).

---

## 3. The SDD + TDD Slash Command Suite

| Slash Command | File Location | Operational Scope in SDD + TDD |
|---|---|---|
| `/plan-ca-agent` | `.agents/commands/plan-ca-agent.md` | Scoped pre-development research, regulatory compliance modeling (FERPA/GDPR), and architecture baseline in read-only mode. |
| `/task-ca-agent` | `.agents/commands/task-ca-agent.md` | Updating documentation, ADRs, and initializing test harnesses in `tests/`. |
| `/spec-check-ca-agent` | `.agents/commands/spec-check-ca-agent.md` | Validating living specifications in `specs/` against PRDs and database contracts. |
| `/testing-ca-agent` | `.agents/commands/testing-ca-agent.md` | Scaffolding and executing test suites; confirming the Red failing state without altering application code. |
| `/tdd-ca-agent` | `.agents/commands/tdd-ca-agent.md` | Red → Green → Refactor implementation engine; enforces minimal passing code. |
| `/review-ca-agent` | `.agents/commands/review-ca-agent.md` | Pre-commit diff, lint, and security review to prevent unauthorized changes and secret leaks. |
| `/verify-ca-agent` | `.agents/commands/verify-ca-agent.md` | Objective quality gate verification against specifications and acceptance criteria. |
| `/security-audit-ca-agent` | `.agents/commands/security-audit-ca-agent.md` | SAST, secret leak, dependency audit, and PostgreSQL Row-Level Security verification. |
| `/release-check-ca-agent` | `.agents/commands/release-check-ca-agent.md` | Final production gate and evidence-based release authorization in `docs/approvals/`. |
| `/change-request-ca-agent` | `.agents/commands/change-request-ca-agent.md` | Formal change impact assessment before modifying approved specifications. |

---

## 4. Visual Workflow Diagram: The SDD + TDD Flow

```mermaid
flowchart TD
    SetupS["Setup & Project Renaming<br/>(Extract to 'school-management-system')"] --> IDEDetectS{"IDE Detection<br/>(docs/ide-compatibility.md)"}
    IDEDetectS -->|"Single-IDE"| PruneS["Auto-prune unused IDE adapters"]
    IDEDetectS -->|"Multi-IDE"| SyncS["Harmonize active adapters to AGENTS.md"]
    
    PruneS --> PS1["Step S1: /plan-ca-agent<br/>(Plan Mode: Multi-tenant RLS, FERPA compliance, HLD)"]
    SyncS --> PS1
    
    PS1 --> HumanS1{"Human Approval<br/>of Architecture?"}
    HumanS1 -->|"Revise plan"| PS1
    HumanS1 -->|"Approved"| PS2["Step S2: /task-ca-agent<br/>(Configure docs/, ADR-001, Vitest test harness in tests/)"]
    
    PS2 --> PS3["Step S3: /spec-check-ca-agent + /testing-ca-agent<br/>(Author specs/002.*, scaffold failing tests - RED PHASE)"]
    PS3 --> RedPhase["Confirm Red Failing State<br/>(Tests fail with expected assertion errors)"]
    
    RedPhase --> PS4["Step S4: /tdd-ca-agent + /review-ca-agent<br/>(Minimal code -> All tests PASS -> Refactor -> Atomic commit)"]
    PS4 --> GateCheck{"All AC Tests Green<br/>and review clean?"}
    GateCheck -->|"Failing tests"| PS4
    GateCheck -->|"Passed"| NextFeature{"More features<br/>in specs/?"}
    NextFeature -->|"Yes"| PS3
    NextFeature -->|"All complete"| PS5["Step S5: /security-audit-ca-agent + /release-check-ca-agent<br/>(SAST scan, FERPA audit check, signed release approval)"]
    
    PS5 --> ReleaseS["Production Release Authorization<br/>(docs/approvals/release-v1.0.0.md)"]
```

---

## 5. End-to-End Production Demo: Enterprise SMS (EduSphere Enterprise)
### A Complete Step-by-Step Walkthrough via Slash Commands (Purely Instructional — Zero Application Code in Framework Folders)

This section demonstrates the exact slash commands you paste into your AI assistant to build **EduSphere Enterprise SMS** under strict SDD + TDD governance.

> [!IMPORTANT]
> **Pure Template Invariant:**
> The framework folder (`SDD-TDD-Chandan-Adhikary/Spec-Driven-Development/`) is an immutable template. Always copy or extract it to `school-management-system/` before executing these commands.

---

### Step S1: Enterprise Architecture Discovery & Compliance R&D (`/plan-ca-agent`)

**Command Typed into Chat:**
```markdown
/plan-ca-agent Project Name: EduSphere Enterprise School Management System
Product Type: Multi-Tenant Enterprise Educational Platform & SaaS
Product Vision: A mission-critical School Management System for school districts and multi-campus networks. Governs Student Enrollment Lifecycle (SIS), Course Scheduling, Classroom Attendance, Examination Gradebooks, and Fee Invoicing with immutable audit trails.
Target Users: District SuperAdmins, Principals, Registrars, Teachers, Students, Parents.
Compliance Requirements: Strict FERPA (Family Educational Rights and Privacy Act), COPPA, and GDPR compliance.
Architecture: Shared PostgreSQL database with mandatory tenant_id and native Row-Level Security (RLS) policies.
Active IDE: Claude Code (or Cursor)
```

**What the AI Agent Does:**
1. Invokes the `.agents/commands/plan-ca-agent.md` contract in **Plan Mode (Read-Only)**.
2. Detects the active IDE and prunes irrelevant competitor config files per `docs/ide-compatibility.md`.
3. Inspects `AGENTS.md` and repository guidelines.
4. Generates a comprehensive **17-section planning report** covering:
   - High-Level Architecture (HLD) & Low-Level Architecture (LLD).
   - PostgreSQL Row-Level Security (RLS) isolation policy.
   - Immutable audit logging tables (`attendance_audit_log`, `grade_change_log`).
   - Testing strategy: Vitest for unit & integration testing, MSW for network isolation.
5. **Stops and awaits human review.**

---

### Step S2: Approved Project Configuration & Harness Setup (`/task-ca-agent`)

**Command Typed into Chat:**
```markdown
/task-ca-agent The architecture baseline for EduSphere Enterprise SMS has been APPROVED.
1. Update 'docs/INDEX.md', 'docs/system-architecture.md', 'docs/database.md', and 'docs/security.md'.
2. Record 'ADR-001: PostgreSQL Row-Level Security for Multi-Tenancy' in 'docs/decision-log.md'.
3. Initialize the Vitest test harness in 'tests/' with TypeScript path alias support ('@/*').
4. Configure 'tests/unit/', 'tests/integration/', and 'tests/fixtures/'.
5. Create '.env.example' with required database and JWT variables (zero real credentials).

Do not implement application features or production endpoints.
```

**What the AI Agent Does:**
1. Updates all canonical architecture and database documentation in `docs/`.
2. Creates `vitest.config.ts` and directory structure in `tests/`.
3. Adds a sanity test (`tests/unit/sanity.test.ts`) and verifies test runner health with `npm test`.
4. Prepares `.env.example`.
5. Reports configuration status and requests human approval.

---

### Step S3: Specification Validation & Failing Test Scaffolding (`/spec-check-ca-agent` + `/testing-ca-agent`)

**Command Typed into Chat:**
```markdown
/spec-check-ca-agent specs/002.spec.student-enrollment.md
Validate the Student Enrollment specification against the approved architecture.
Ensure it defines the following Acceptance Criteria:
- AC-ENROLL-001: System generates a unique sequential admission number (e.g. 'ADM-2026-0001') scoped to the tenant.
- AC-ENROLL-002: System rejects enrollment if student age is below the grade level minimum with an HTTP 422 error.
- AC-ENROLL-003: System enforces multi-tenant isolation; School A cannot access School B enrollments.
- AC-ENROLL-004: System writes an immutable audit log upon successful enrollment.

Follow immediately with:
/testing-ca-agent Scaffold tests/unit/student-enrollment.test.ts covering AC-ENROLL-001 through AC-ENROLL-004.
Execute the tests and confirm they FAIL in the RED state.
```

**What the AI Agent Does:**
1. Runs `/spec-check-ca-agent` to validate `specs/002.spec.student-enrollment.md`.
2. Scaffolds `tests/unit/student-enrollment.test.ts` covering all 4 Acceptance Criteria.
3. Runs the test suite via `/testing-ca-agent`.
4. Confirms the **RED Phase**: All 4 tests fail with expected errors (`Cannot find module '../src/services/enrollment'`).
5. **Stops and awaits authorization to implement.**

---

### Step S4: Feature Implementation via Strict TDD (`/tdd-ca-agent` + `/review-ca-agent`)

**Command Typed into Chat:**
```markdown
/tdd-ca-agent Implement Feature 002: Student Enrollment according to specs/002.spec.student-enrollment.md.
1. Implement minimum code in 'src/services/enrollment.service.ts' to satisfy all 4 tests in tests/unit/student-enrollment.test.ts.
2. Verify all tests pass (GREEN Phase).
3. Refactor: Optimize query performance and extract tenant verification middleware without breaking tests.
4. Run static type checking ('npx tsc --noEmit') and linting.

Follow immediately with:
/review-ca-agent Inspect git diff and verify acceptance criteria traceability.
```

**What the AI Agent Does:**
1. Creates `src/services/enrollment.service.ts` with Zod input validation and tenant-scoped admission sequencing.
2. Re-runs `tests/unit/student-enrollment.test.ts`—all 4 tests pass (**100% GREEN**).
3. Refactors code cleanly, ensuring zero regressions.
4. Runs `/review-ca-agent`, which inspects the diff and generates a proposed atomic commit message:
   `feat(enrollment): implement student enrollment service satisfying AC-ENROLL-001 through AC-ENROLL-004`.

---

### Step S5: Production Readiness Audit & Release Gate (`/security-audit-ca-agent` + `/release-check-ca-agent`)

**Command Typed into Chat:**
```markdown
/security-audit-ca-agent
Perform an exhaustive security and compliance audit on EduSphere Enterprise SMS:
1. Validate PostgreSQL Row-Level Security enforcement across all queries.
2. Verify FERPA audit trail generation for student record access.
3. Scan for OWASP Top 10 vulnerabilities and dependency CVEs ('npm audit').

Follow immediately with:
/release-check-ca-agent
Execute full test suite with coverage, verify production build, and generate the release sign-off report at 'docs/approvals/release-v1.0.0.md'.
```

**What the AI Agent Does:**
1. Runs `/security-audit-ca-agent`: confirms zero SQL injections, zero RLS bypasses, and zero critical CVEs.
2. Runs `/release-check-ca-agent`: executes `npm test -- --coverage` (>90% branch coverage verified), runs `npm run build`, and writes formal release documentation to `docs/approvals/release-v1.0.0.md`.
3. Reports release readiness and requests final human deployment authorization.

---

## 6. Best Practices for Developers Using SDD Slash Commands

1. **Never Skip `/spec-check-ca-agent`:** Always ensure the specification has explicit Acceptance Criteria (`AC-*`) before authoring tests.
2. **Honor the RED State:** Always run `/testing-ca-agent` before implementing production code to verify that the tests genuinely catch missing functionality.
3. **Commit Atomically with Traceability:** Always cite the Spec ID and AC numbers in git commits to maintain an unbroken audit trail for compliance officers and enterprise clients.

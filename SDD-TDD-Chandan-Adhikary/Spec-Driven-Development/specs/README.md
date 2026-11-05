# Specifications Directory (specs/)

**Role in Spec-Driven Development:** The `specs/` directory contains all official, versioned, and approved feature specifications for the project. In SDD, **no application code is written** until the corresponding feature specification is approved and test suites are scaffolded.

## Dual Format Support (User-Selectable)
During **Prompt 3 (Specification Approval & TDD Readiness)**, the agent MUST ask the user to select their preferred specification layout:

### Format 1: Flat Specification Files
Best for small-to-medium features or teams preferring unified documents:
```text
specs/
├── 001.spec.authentication.md
├── 002.spec.student-enrollment.md
└── 003.spec.fee-billing.md
```
Each flat file contains the full feature scope, user stories, domain invariants, API contracts, database schema, acceptance criteria, and test scenarios.

### Format 2: Modular Feature Directories
Best for complex, multi-layered features requiring isolated context management:
```text
specs/
├── 001.spec.authentication/
│   ├── memory.md     # Working context, state decisions, and scope boundaries
│   ├── rules.md      # Domain invariants, security policies, and validation rules
│   └── task.md       # Traceable TDD tasks, checklists, and acceptance tests
└── 002.spec.student-enrollment/
    ├── memory.md
    ├── rules.md
    └── task.md
```

## Governance Rules
1. **MUST** number features sequentially (`001`, `002`, `003`).
2. **MUST** reference acceptance criteria IDs (e.g. `AC-AUTH-001`) in corresponding unit/integration test files.
3. **MUST NOT** implement any feature behavior absent from an approved specification.
4. Any change to an approved spec requires a formal change request (`/change-request-ca-agent`) and version increment.

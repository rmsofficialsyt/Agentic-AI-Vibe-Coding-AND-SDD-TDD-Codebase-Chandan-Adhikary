# Test Harness Contract

- **MUST** choose stack-appropriate unit, integration, contract and E2E tools before implementation (record them in `docs/tech-stacks.md`).
- **MUST** write tests from approved acceptance criteria and show red→green→refactor for production changes.
- **MUST** use deterministic fixtures and forbid real production credentials or personal data.
- **MUST** report actual commands/results, gate failures and coverage measurements.
- **MUST** run release-blocking suites in CI before promotion.

## Naming and traceability convention

- Each test that verifies an acceptance criterion **MUST** carry its IDs in the test name or description: `TEST-FEAT###-## / AC-FEAT###-##: <behavior>`.
- The mapping `AC → TEST` is declared in the feature's verification table (`docs/features/…`, section 8) and rolled up in `docs/requirements-traceability.md`.
- Tests without an AC reference are allowed only for internal units; they **MUST NOT** be cited as acceptance evidence.

Example (stack-neutral layout):

```text
tests/
├── unit/
│   └── students/admission-number.test.[ext]     # TEST-FEAT002-01 / AC-FEAT002-01
├── integration/
│   └── students/enroll.test.[ext]               # TEST-FEAT002-02, TEST-FEAT002-03
└── e2e/
    └── enrollment.spec.[ext]                    # journey-level checks
```

Example test title: `TEST-FEAT002-03 / AC-FEAT002-03: rejects duplicate student with 409`.

## Project-specific commands (fill after tool selection)

- Install: [COMMAND]
- Unit: [COMMAND]
- Integration: [COMMAND]
- E2E: [COMMAND]
- Coverage: [COMMAND]

---
name: spec-validator
description: "Validate feature specifications in docs/features/ for lifecycle status, ID scheme, Given/When/Then ACs, AC-to-TEST mapping and traceability links."
---

# Skill: spec-validator

**Purpose:** Apply the controlled spec validator workflow to a clearly scoped project task.

## Trigger

- **MUST** use only when current task requires this capability.
## Inputs

- **MUST** read `AGENTS.md`, relevant `docs/` policy, current approved feature/spec and task.
- **MUST** validate against `docs/features/README.md` (location, naming, format, lifecycle) and the ID scheme in `docs/requirements-traceability.md`.
- **MUST** fail validation when an AC lacks Given/When/Then, FR/NFR coverage or a TEST mapping, or when an `APPROVED` feature lacks an approval reference.
## Workflow

1. **MUST** state assumptions, required facts, authorization and intended output.
2. **MUST** inspect authoritative source and project-specific constraints.
3. **MUST** execute domain checks without inventing facts, specs or test evidence.
4. **MUST** flag conflicts, incomplete acceptance criteria or high-risk side effects.
5. **MUST** produce findings, evidence links, blocking status and next approved step.
## Restrictions

- **MUST** not alter controlled guidelines without recorded approved revision.
- **MUST** not implement feature behavior absent from the approved spec.
- **SHOULD** maintain repeatable examples/evaluations before promoting this skill to automated use.

---
description: "Check latest approved version, internal consistency, explicit criteria and conflicts."
argument-hint: "[FEAT-### or docs/features path]"
---

# /spec-check-ca-agent

**Purpose:** Check latest approved version, internal consistency, explicit criteria and conflicts.

## When to run

**MUST** invoke only for a task whose intent and permissions match this command.

## Inputs

- **MUST** capture task ID, goal, guideline baseline, applicable approved spec/version, acceptance IDs and allowed files.
- **MUST** identify required tools and human approval for destructive, external or production effects.

## Procedure

1. **MUST** read `AGENTS.md`, `docs/features/README.md`, `docs/requirements-traceability.md` and the target feature in `docs/features/` (plus `docs/spec.md` in SDD).
2. **MUST** verify the header: `FEAT-###` ID, semantic version, a lifecycle status from `docs/features/README.md`, owner, approver/approval reference (required for `APPROVED`), `CAP-###` and `REQ-###` links.
3. **MUST** verify IDs follow the canonical patterns (`FR-FEAT###-##`, `NFR-FEAT###-##`, `AC-FEAT###-##`, `TEST-FEAT###-##`) and are unique.
4. **MUST** verify every AC has Given/When/Then, covers at least one FR/NFR, and maps to a TEST ID in the verification table.
5. **MUST** flag conflicts with `docs/product.md` boundaries, other features, API/data contracts or ADRs.
6. **MUST** run `python scripts/check_docs.py` and report its real output.
7. **MUST** report a PASS/FAIL table per check, blocking issues and the next authorized action. Never modify the spec during the check.

## Stop conditions

**MUST** stop on an unauthorized feature, baseline conflict, credential exposure, failed blocking gate, or missing approval.

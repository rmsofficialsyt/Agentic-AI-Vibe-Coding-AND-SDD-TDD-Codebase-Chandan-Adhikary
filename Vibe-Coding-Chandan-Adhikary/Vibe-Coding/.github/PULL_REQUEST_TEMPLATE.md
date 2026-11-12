# Pull Request

| Field | Value |
|---|---|
| Task | TASK-### |
| Feature and version | FEAT-### x.y.z (status: `PROTOTYPE` / `DRAFT` / `APPROVED`) |
| Scope | Prototype (isolated, not for production) / Production-bound |
| Acceptance criteria | AC-FEAT###-##, … |

- [ ] **MUST** link the task and feature contract in `docs/features/`; production-bound PRs require an `APPROVED` version.
- [ ] **MUST** describe changes and explicit out-of-scope behavior.
- [ ] **MUST** (production-bound) link test-first evidence for each AC, executed commands and CI; prototype PRs are labelled `DRAFT` and never deployed.
- [ ] **MUST** address security, privacy, API/schema migration, accessibility and performance impacts.
- [ ] **MUST** update documentation, traceability matrix, decision log and changelog as applicable; `scripts/check_docs.py` and `scripts/manifest.py --check` pass.
- [ ] **MUST** obtain authorized review before merge.

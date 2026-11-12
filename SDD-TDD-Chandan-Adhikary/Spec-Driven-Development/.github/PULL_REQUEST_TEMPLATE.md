# Pull Request

| Field | Value |
|---|---|
| Task | TASK-### |
| Feature and version | FEAT-### x.y.z (`APPROVED`) |
| Acceptance criteria | AC-FEAT###-##, … |
| Change request | CR-### or N/A |

- [ ] **MUST** link the approved task, feature ID and exact `APPROVED` spec version (listed in `docs/spec.md`).
- [ ] **MUST** describe changes and explicit out-of-scope behavior.
- [ ] **MUST** link test-first evidence (red → green) for each AC, executed commands and CI.
- [ ] **MUST** address security, privacy, API/schema migration, accessibility and performance impacts.
- [ ] **MUST** update documentation, traceability matrix and changelog as applicable; `scripts/check_docs.py` and `scripts/manifest.py --check` pass.
- [ ] **MUST** obtain authorized review before merge.

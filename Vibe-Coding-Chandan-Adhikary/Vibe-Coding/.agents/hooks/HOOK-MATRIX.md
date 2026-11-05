# Hook Execution Matrix

| Event | Required check | Fallback |
|---|---|---|
| Session start | MUST load baseline and approved scope | Explicit human/agent checklist |
| Before file writes | MUST verify allowed files and spec | PR diff/CI scope validation |
| Before SDD implementation | MUST verify approved version + failing tests | CI/PR test evidence review |
| Pre-commit | MUST scan for secrets, lint and run relevant tests | Protected CI |
| Pre-merge | MUST verify CI, reviews and traceability | Server branch protections |
| Pre-deploy | MUST verify release approval and rollback | Protected deployment gates |

**MUST** verify actual agent platform hook support before enabling. **MUST** specify timeout, failure policy, permissions, audit and test of every executable hook.

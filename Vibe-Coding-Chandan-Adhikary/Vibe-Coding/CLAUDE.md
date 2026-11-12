# Claude Code Adapter — Vibe Coding

**MUST** obey `AGENTS.md`, then applicable `docs/` policies and feature contracts in `docs/features/`. **MUST** verify the CLI version before creating native skills/hooks/commands under `.claude/`.

- **Prototype work** (`PROTOTYPE`/`DRAFT` features, isolated branch/sandbox): iterate fast, label work as draft, never use production credentials or real sensitive data.
- **Production-bound work** (`APPROVED` features only): plan → write and run failing tests for the approved ACs → implement → run CI-equivalent checks → report real evidence.

Recommended workflow: read `docs/INDEX.md` → check the feature status in `docs/features/` → plan → (tests first when production-bound) → implement → verify → report. No native Claude feature is assumed installed.

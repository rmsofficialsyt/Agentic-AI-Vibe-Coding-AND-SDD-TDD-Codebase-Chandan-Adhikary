# GitHub Copilot Adapter — Vibe Coding

**MUST** follow root `AGENTS.md`, then `docs/INDEX.md` and the policies it lists. This file is an adapter, not an alternate authority.

- Prototype work stays isolated and labelled `DRAFT`; production-bound work requires an `APPROVED` feature in `docs/features/` and tests first.
- **MUST** keep feature specifications in `docs/features/`; never create a `specs/` directory.
- **MUST** protect secrets, request approval for destructive or external actions and report real command output.
- Path-scoped rules: `.github/instructions/*.instructions.md`. Verify the installed Copilot version loads both files.

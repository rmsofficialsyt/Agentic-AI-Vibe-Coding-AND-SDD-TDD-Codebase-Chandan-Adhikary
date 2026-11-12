# GitHub Copilot Adapter — SDD

**MUST** follow root `AGENTS.md`, then `docs/INDEX.md` and the policies it lists. This file is an adapter, not an alternate authority.

- Only `APPROVED` feature versions indexed in `docs/spec.md` authorize behavior; write failing tests before production code.
- **MUST** keep feature specifications in `docs/features/`; never create a `specs/` directory.
- **MUST** protect secrets, request approval for destructive or external actions and report real command output.
- Path-scoped rules: `.github/instructions/*.instructions.md`. Verify the installed Copilot version loads both files.

# Hook Execution Matrix

| Event | Config / Script | Required check | Fallback |
|---|---|---|---|
| `SessionStart` | `.agents/hooks.json` → `scripts/hooks/session_start.py` | MUST verify `AGENTS.md`, `docs/`, `.agents/workflows/`, `.agents/skills/` | Explicit human/agent checklist |
| `PreToolUse` (`run_command`) | `.agents/hooks.json` → `scripts/hooks/pre_tool_guard.py` | MUST block `--no-verify` hook bypasses and unsafe deletes | PR diff/CI scope validation |
| `PostToolUse` (`write_file\|edit_file`) | `.agents/hooks.json` → `scripts/hooks/post_edit_check.py` | MUST run `scripts/check_docs.py` when `docs/` or `.agents/` change | Manual `python scripts/check_docs.py` |
| Pre-commit | `.pre-commit-config.yaml` / `.git/hooks/pre-commit` | MUST run `check_docs.py` and `manifest.py --check` | Protected CI (`.github/workflows/docs-ci.yml`) |
| Pre-merge | `.github/workflows/docs-ci.yml` | MUST verify CI, reviews and traceability | Server branch protections |
| Pre-deploy | `docs/release-checklist.md` | MUST verify release approval and rollback | Protected deployment gates |

- **Antigravity:** reads `.agents/hooks.json` automatically at the workspace/git root.
- **Claude Code:** run `python scripts/sync_ide_adapters.py --ides claude` to generate `.claude/settings.json` hook bindings.
- **MUST** specify timeout, failure policy, permissions, audit and test of every executable hook.

# Guideline Baseline Changelog

## [Unreleased] — proposed 1.1.0 (requires human approval)

- **Status:** PROPOSED. Baseline remains `1.0.0` until the project owner approves this revision.
- **Reason:** Project-wide audit found contradictory spec-location rules, framework rules leaking between SDD and Vibe, no shared lifecycle or ID scheme, a cross-origin-exploitable dashboard endpoint, no automated checks and a stale MANIFEST.
- **Added:**
  - `docs/product.md` — governed product definition (identity, vision, personas, value, principles, capability map, boundaries, metrics, roadmap, constraints, stakeholders, glossary) with instantiation template.
  - `docs/features/README.md` — single rule set for feature location, Flat/Modular formats, lifecycle and IDs; expanded `FEATURE-TEMPLATE.md`; rewritten samples.
  - `docs/adrs/ADR-TEMPLATE.md` and `ADR-0001` example; domain extension template; instantiation templates in 12 living docs.
  - `scripts/check_docs.py`, `scripts/manifest.py`, `.github/workflows/docs-ci.yml`, local pre-commit hooks, `.github/copilot-instructions.md`.
  - Mandatory development logging (`logs/*.log` in separate `logs/` directory; `logs/.gitkeep` tracked; `.gitignore` configured).
  - Pre-Step 5 (First Prompting) domain knowledge & system design synthesis: required domain mastery and system architecture before prompt execution, including AI agent consultation protocol.
  - Staged web development (Frontend-First Verification): develop and verify frontend design/features during live demo run before backend persistence, security, or maintenance.
- **Changed rules:**
  - Feature specifications live only in `docs/features/`; a `specs/` directory is prohibited in both frameworks (INDEX, ide-compatibility, READMEs, guides, dashboard aligned).
  - Canonical lifecycle `DRAFT → IN REVIEW → APPROVED → SUPERSEDED | DEPRECATED` (+ `PROTOTYPE` in Vibe) and canonical ID scheme (`CAP`, `REQ`, `NFR`, `FEAT`, `FR/NFR/AC/TEST-FEAT###-##`, `TASK`, `CR`, `APR`, `ADR`, `DEC`, `RISK`, `ERR`, `PER`) in `docs/requirements-traceability.md`.
  - IDE pruning is now confirmed and reversible (dry run, explicit confirmation, committed files only); §7.2 non-destructive switching no longer contradicts §5.
  - Every SDD doc ends with a doc-specific `## SDD enforcement` section; Vibe interpretation sections gained doc-specific rules; Vibe adapters and `AGENTS.md` no longer enforce SDD-only rules.
  - Commands and skills carry YAML frontmatter; command count corrected to 16, skills to 18.
  - Dashboard: Host/Origin checks, per-process token on mutating requests, no CORS, hardened static serving, draft (not self-approving) approval records, reads `docs/features/`.
  - License wording: guideline package is MIT; projects built from it select their own license (`LICENSE-DECISION.md`).
- **Added rules (existing docs):** decision authority and reversibility; risk scoring, acceptance and closure; handoff access transfer, reproducibility and known debt; phase scope change and review; plugin supply chain, isolation and removal; runbook severity, communication and drills; accessibility content and Definition of Done; defect severity scale and private security disclosure; task size and readiness; memory staleness and session handoff; agent provenance and parallel-work merge; AI-suggested package verification; AI-generated code review; test integrity; no bypass of hooks/CI; hook tamper resistance; secrets never in agent context; go/no-go criteria; progressive delivery; no production data in lower environments; no end-of-life stacks; non-deterministic acceptance criteria and AC immutability; Vibe prototype time-box and prompt secrets.
- **Migration impact:** Projects using `specs/` move each spec to `docs/features/NNN-name.md` (flat) or `docs/features/NNN-name/{feature,acceptance,test-plan}.md` (modular) and rename AC IDs to `AC-FEAT###-##`. Run `python scripts/check_docs.py` to find remaining gaps. No product behavior changes.
- **Owner/approver:** TEMPLATE — requires explicit human approval before the baseline version is bumped to 1.1.0.

## [1.0.0] — 2026-11-04

- **Status:** Initial reusable guideline baseline.
- **Reason:** Establish controlled AI-assisted development standards and feature/change governance.
- **Owner/approver:** TEMPLATE — project owner must explicitly adopt baseline before production use.
- **MUST:** Every subsequent guideline revision records version, date, reason, changed rules, migration impact and human approval.
- **MUST:** Feature changes do not alter this log; use `CHANGELOG.md`.

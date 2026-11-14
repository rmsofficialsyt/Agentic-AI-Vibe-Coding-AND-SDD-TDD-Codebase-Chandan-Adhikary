# SDD — Production-Grade AI Development Guide

**Status:** reusable, implementation-ready guideline templates; not an application codebase.

This package defines project discovery, engineering rules, AI-agent governance, spec/test-first workflows, architecture, security, CI/CD, delivery and operations. It includes all proposed document templates and the 11 source-recommended `.txt` playbooks.

## Start here

1. Read [`docs/INDEX.md`](docs/INDEX.md), [`AGENTS.md`](AGENTS.md) and [`docs/rules.md`](docs/rules.md).
2. Complete `docs/product.md` (vision, personas, capabilities), then customize stakeholders, technology and approval authorities.
3. Decide the license for **your project**. This guideline package is MIT-licensed (repository root `LICENSE`); that grant does not choose a license for software you build with it. See `LICENSE-DECISION.md`.
4. Complete `docs/prd.md`, architecture and feature contracts in `docs/features/` (start from `FEATURE-TEMPLATE.md`); approve each feature before production coding.
5. For each production change: CR → impact → approved spec version → failing tests → implementation → gates → CHANGELOG.
6. Configure compatible tool adapters and CI for the actual platform; sample files are not live deployment settings.

## Guideline versus specification policy

- **Guidelines:** fixed baseline `1.0.0`; revisions require reason, date, approval, version and `docs/guideline-CHANGELOG.md` entry.
- **Features:** living approved versioned requirements; changes follow formal intake and TDD before code.
- **Authority:** never implement behavior missing from the latest approved feature spec.
- **Spec location:** `docs/features/` only (no `specs/` directory), indexed by `docs/spec.md`. Two formats per feature: **Flat** `NNN-name.md` or **Modular** `NNN-name/{feature.md, acceptance.md, test-plan.md}` — see `docs/features/README.md`.
- **Lifecycle and IDs:** `DRAFT → IN REVIEW → APPROVED → SUPERSEDED | DEPRECATED`; IDs `CAP-` → `REQ-` → `FEAT-` → `AC-FEAT###-##` → `TEST-FEAT###-##` (`docs/requirements-traceability.md`).

## Framework emphasis

**SDD:** no feature implementation until the exact versioned spec is approved and corresponding tests are written first.

## Repository map

`docs/` — policy, product definition and state; `docs/features/` — feature specifications; `docs/changes/`, `docs/approvals/` — CRs and approvals; `playbooks/` — 11 operation guides; `.agents/` — 18 skills (including `core-engineering-skills`), hooks, 16 collision-free `-ca-agent` commands; `.github/` — adapters, templates and the docs CI workflow; `Project-Manager-Dashboard/` — local In-IDE dashboard (`/dashboard-ca-agent`, port 4200); `scripts/` — `check_docs.py`, `manifest.py`; `tests/` — test harness contract.

## Licensing and contributing

The guideline package is distributed under the MIT License in the repository root `LICENSE`. A project instantiated from these templates **MUST** select and approve its own license before redistribution (`LICENSE-DECISION.md`). All modifications must follow `docs/rules.md` and `docs/code-review.md`; run `python scripts/check_docs.py` and `python scripts/manifest.py --check` before opening a PR.


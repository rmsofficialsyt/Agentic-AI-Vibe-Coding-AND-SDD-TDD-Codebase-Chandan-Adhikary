# Vibe Coding — Production-Grade AI Development Guide

**Status:** reusable, implementation-ready guideline templates; not an application codebase.

This package defines project discovery, engineering rules, AI-agent governance, spec/test-first workflows, architecture, security, CI/CD, delivery and operations. It includes all proposed document templates and the 11 source-recommended `.txt` playbooks.

## Start here

1. Read [`docs/INDEX.md`](docs/INDEX.md), [`AGENTS.md`](AGENTS.md) and [`docs/rules.md`](docs/rules.md).
2. Complete `docs/product.md` (a `DRAFT` with identity, one persona, value proposition and non-goals is enough to start prototyping), then customize stakeholders and technology.
3. Decide the license for **your project**. This guideline package is MIT-licensed (repository root `LICENSE`); that grant does not choose a license for software you build with it. See `LICENSE-DECISION.md`.
4. Prototype against `PROTOTYPE`/`DRAFT` feature contracts in `docs/features/`; formalize and approve each feature before production-bound coding.
5. For each production change: CR → impact → approved spec version → failing tests → implementation → gates → CHANGELOG.
6. Configure compatible tool adapters and CI for the actual platform; sample files are not live deployment settings.

## Guideline versus specification policy

- **Guidelines:** fixed baseline `1.0.0`; revisions require reason, date, approval, version and `docs/guideline-CHANGELOG.md` entry.
- **Features:** living approved versioned requirements; changes follow formal intake and TDD before code.
- **Authority:** never implement behavior missing from the latest approved feature spec.
- **Spec location:** `docs/features/` only. Do not create `specs/`. Format and lifecycle (`PROTOTYPE → DRAFT → IN REVIEW → APPROVED → SUPERSEDED | DEPRECATED`) are defined in `docs/features/README.md`; IDs in `docs/requirements-traceability.md`.

## Framework emphasis

**Vibe:** exploration may use draft requirements in isolated prototypes; production-bound features require full approval and tests.

## Repository map

`docs/` — policy, product definition and state; `docs/features/` — feature contracts; `playbooks/` — 11 operation guides; `.agents/` — 18 skills (including `andrej-karpathy-skill`), hooks, 16 collision-free `-ca-agent` commands; `.github/` — adapters, templates and the docs CI workflow; `Project-Manager-Dashboard/` — local In-IDE dashboard (`/dashboard-ca-agent`, port 4201); `scripts/` — `check_docs.py`, `manifest.py`; `tests/` — test harness contract.

## Licensing and contributing

The guideline package is distributed under the MIT License in the repository root `LICENSE`. A project instantiated from these templates **MUST** select and approve its own license before redistribution (`LICENSE-DECISION.md`). All modifications must follow `docs/rules.md` and `docs/code-review.md`; run `python scripts/check_docs.py` and `python scripts/manifest.py --check` before opening a PR.

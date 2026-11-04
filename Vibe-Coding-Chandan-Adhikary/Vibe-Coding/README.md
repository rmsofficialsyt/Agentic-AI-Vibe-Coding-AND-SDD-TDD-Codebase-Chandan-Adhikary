# Vibe Coding — Production-Grade AI Development Guide

**Status:** reusable, implementation-ready guideline templates; not an application codebase.

This package defines project discovery, engineering rules, AI-agent governance, spec/test-first workflows, architecture, security, CI/CD, delivery and operations. It includes all proposed document templates and the 11 source-recommended `.txt` playbooks.

## Start here

1. Read [`docs/INDEX.md`](docs/INDEX.md), [`AGENTS.md`](AGENTS.md) and [`docs/rules.md`](docs/rules.md).
2. Customize project identity, stakeholders, technology and approval authorities.
3. Decide a project-specific license. **No LICENSE has been issued or assumed.** See `LICENSE-DECISION.md`.
4. Complete requirements, architecture and acceptance criteria; approve the feature spec before production coding.
5. For each production change: CR → impact → approved spec version → failing tests → implementation → gates → CHANGELOG.
6. Configure compatible tool adapters and CI for the actual platform; sample files are not live deployment settings.

## Guideline versus specification policy

- **Guidelines:** fixed baseline `1.0.0`; revisions require reason, date, approval, version and `docs/guideline-CHANGELOG.md` entry.
- **Features:** living approved versioned requirements; changes follow formal intake and TDD before code.
- **Authority:** never implement behavior missing from the latest approved feature spec.
- **Spec location:** `docs/` only, including `docs/features/`. Do not create `specs/`.

## Framework emphasis

**Vibe:** exploration may use draft requirements in isolated prototypes; production-bound features require full approval and tests.

## Repository map

`docs/` — policy/specs and state; `playbooks/` — operation guides; `agent/` — portable skills/hooks/commands; `.github/` — examples for GitHub; `tests/` — test harness contract.

## Licensing and contributing

No license is granted through these templates. Select and approve a real project-specific license before redistribution. All modifications must follow `docs/rules.md` and `docs/code-review.md`.

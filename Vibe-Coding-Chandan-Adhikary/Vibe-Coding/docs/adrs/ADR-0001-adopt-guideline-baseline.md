# ADR-0001: Adopt the documentation guideline baseline (EXAMPLE)

| Field | Value |
|---|---|
| Status | Proposed (example — set to Accepted when the project owner adopts the baseline) |
| Date | [YYYY-MM-DD] |
| Owner | [Engineering lead] |
| Deciders | [Product owner, Engineering lead] |
| Linked features / requirements | All |

## Context

The project needs a single, enforceable source of truth for product intent, feature contracts and engineering process so that human engineers and AI agents make consistent decisions.

## Options considered

| Option | Pros | Cons |
|---|---|---|
| A — Adopt this `docs/` guideline baseline (1.0.0) | Ready-made structure; agent read triggers; traceability IDs; CI checks | Requires tailoring placeholders |
| B — Ad-hoc documentation | No upfront effort | Drift between docs, specs and code; unverifiable agent claims |

## Decision

Adopt option A. `docs/INDEX.md` is the entry point; feature contracts live only in `docs/features/`; process changes go through `docs/guideline-CHANGELOG.md`.

## Consequences

- **Positive:** consistent IDs and lifecycle; automated checks (`scripts/check_docs.py`, `scripts/manifest.py`).
- **Negative / trade-offs:** every placeholder must be tailored before claiming a control is operational.
- **Follow-up work:** complete `docs/product.md`, `docs/prd.md` and `docs/tech-stacks.md`.

## Risks

- Placeholders mistaken for operational controls — mitigated by the `Status: Template` header and review in `/verify-ca-agent`.

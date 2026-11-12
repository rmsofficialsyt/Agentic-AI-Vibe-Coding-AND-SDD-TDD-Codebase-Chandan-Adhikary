# Architecture Decision Records

- **MUST** store numbered, immutable decisions as `ADR-####-short-title.md`, starting from `ADR-TEMPLATE.md`.
- **MUST** supersede rather than overwrite an accepted record: create a new ADR and set the old one's status to `Superseded by ADR-####`.
- **MUST** link each ADR from the affected feature contracts (`Depends on`) and from `docs/system-architecture.md`.

Status values: `Proposed` → `Accepted` → `Superseded` | `Deprecated` (or `Rejected`).

## Files

- `ADR-TEMPLATE.md` — template.
- `ADR-0001-adopt-guideline-baseline.md` — example record.

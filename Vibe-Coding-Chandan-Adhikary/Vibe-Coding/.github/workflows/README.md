# CI/CD Pipeline Template Contract

**MUST** implement platform/stack-specific CI before release. Required stages: approved scope verification, format/lint, type/static checks, unit/integration, changed contracts/E2E, secret/dependency scanning, build/provenance, review and protected deployment. **MUST** avoid storing secrets in workflow examples. **MUST** use project-approved versions and actions. No universal runnable workflow is asserted without selecting the stack.

**Included:** `docs-ci.yml` — stack-independent gate that runs `scripts/check_docs.py` (doc pattern, INDEX registry, links, feature-spec IDs/lifecycle/AC→TEST mapping, agent asset frontmatter) and `scripts/manifest.py --check`. It runs once this package is the repository root of your project; keep it and add the stack-specific stages above.

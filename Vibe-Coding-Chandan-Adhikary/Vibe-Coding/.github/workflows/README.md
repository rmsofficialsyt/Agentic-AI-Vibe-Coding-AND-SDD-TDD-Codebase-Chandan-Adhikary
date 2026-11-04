# CI/CD Pipeline Template Contract

**MUST** implement platform/stack-specific CI before release. Required stages: approved scope verification, format/lint, type/static checks, unit/integration, changed contracts/E2E, secret/dependency scanning, build/provenance, review and protected deployment. **MUST** avoid storing secrets in workflow examples. **MUST** use project-approved versions and actions. No universal runnable workflow is asserted without selecting the stack.

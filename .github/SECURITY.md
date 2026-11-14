# Security Policy

## Supported Versions

We actively provide security patches and updates for the following releases:

| Version | Supported          |
| ------- | ------------------ |
| 2.0.x   | :white_check_mark: |
| 1.0.x   | :x:                |

## Reporting a Vulnerability

The project team and contributors take the security of our frameworks, agents, and templates very seriously. If you discover a security vulnerability, please report it responsibly:

### 1. Private Disclosure
- **Do not** disclose vulnerabilities in public GitHub issues, discussions, or pull requests.
- Submit a private security advisory directly on GitHub via the **Security** tab under **Report a vulnerability**, or email the security maintainer directly.

### 2. Information to Include
To help us triage and resolve the issue quickly, please include:
- A descriptive summary of the vulnerability.
- Steps to reproduce the issue (including any minimal reproduction scripts, prompts, or configuration).
- Affected components, tools, or files.
- Potential impact and attack vectors.
- Proposed mitigations or fixes, if known.

### 3. Response & SLA
- **Initial Acknowledgment:** Within 48 hours of report submission.
- **Triage & Assessment:** Within 5 business days.
- **Fix & Disclosure Timeline:** Critical vulnerabilities will be patched within 14 days, followed by coordinated release notes.

## Security Best Practices for AI Agents

When deploying agents or using `.agents/commands/`:
1. **Never commit secrets:** Never hardcode API keys, database credentials, or private tokens in `.env` files or specifications.
2. **Review Diffs:** Always execute `/review-ca-agent` before committing or merging AI-generated code.
3. **Execute Security Audits:** Run `/security-audit-ca-agent` before any production release to identify potential secret leaks or vulnerable dependencies.


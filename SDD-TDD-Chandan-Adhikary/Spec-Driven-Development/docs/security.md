# Security

> **Document class:** Controlled process guideline  
> **Framework:** SDD  
> **Guideline baseline:** 1.0.0  
> **Status:** Template; project-specific content requires review  

## Purpose

Security, privacy and legal applicability controls.

## Agent read trigger

**MUST** read or consult this file: Discovery, auth/integration work, code review, incident and release.

## Normative sections and rules

### 1. Threat model

- **MUST** — Identify assets, attacker capabilities, trust boundaries, abuse cases and mitigations.

### 2. Identity

- **MUST** — Require strong authentication where needed, secure sessions, least privilege and server-side authorization.

### 3. Secrets

- **MUST** — Store credentials only in approved secret stores or environment injection, never code, logs or sample files.

### 4. Web/API threats

- **MUST** — Assess OWASP risks including access control, injection, SSRF, XSS, CSRF, uploads, rate limits and supply chain as applicable.

### 5. Data

- **MUST** — Classify personal and confidential data; define lawful purpose, minimization, retention, deletion, encryption and access tracking.

### 6. SDLC

- **MUST** — Use secret scanning, dependency checks, appropriate SAST/DAST and documented vulnerability triage.

### 7. Incidents

- **MUST** — Define disclosure, severity, containment, evidence handling and remediation.

### 8. LLM risks

- **MUST** — Where applicable enforce prompt-injection boundaries, output validation, tool permissions and private-data leakage safeguards.

### 9. Compliance

- **MUST** — Document applicable jurisdiction/industry obligations; do not claim compliance without audit evidence.

### 10. Pen tests

- **SHOULD** — Schedule independent tests by product and threat risk.

## Evidence and change control

- **MUST** record owner, revision/date, relevant approval reference, and traceable evidence in the applicable project instantiation.
- **MUST** route changes to process rules through `docs/guideline-CHANGELOG.md` and formal baseline revision; route feature behavior through approved versioned specs and `docs/CHANGELOG.md`.
- **SHOULD** keep links to canonical artifacts instead of duplicating definitions.

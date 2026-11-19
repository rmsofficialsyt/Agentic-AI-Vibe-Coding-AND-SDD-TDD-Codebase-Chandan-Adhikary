# Defect & Error Tracker

> **Document class:** Living feature/specification  
> **Framework:** Vibe Coding  
> **Guideline baseline:** 2.0.0  
> **Status:** Active Standard  

## Purpose

Defect tracking, sensory glitch logging, regression prevention, and resolution history.

## Agent read trigger

**MUST** read or consult this file: Whenever encountering unexpected crashes, UI glitches, test failures, or during `/errorlogs-ca-agent`.

---

## 1. Defect Resolution Flow

```mermaid
flowchart LR
    classDef err fill:#4c0519,stroke:#fb7185,stroke-width:1.5px,color:#fff1f2;
    classDef step fill:#2e1065,stroke:#c084fc,stroke-width:1.5px,color:#faf5ff;
    classDef sensory fill:#064e3b,stroke:#34d399,stroke-width:2px,color:#ecfdf5;
    classDef close fill:#022c22,stroke:#10b981,stroke-width:2px,color:#d1fae5;

    Detect(["<b>🐛 1. Defect Logged</b><br/><sub>Ingest & Assign ERR-###</sub>"]):::err
    Isolate["<b>🔍 2. Isolate Cause</b><br/><sub>Console & Server Logs</sub>"]:::step
    Patch["<b>🛠️ 3. Targeted Patch</b><br/><sub>Surgical Code Diff</sub>"]:::step
    Verify["<b>🌐 4. Live Sensory Check</b><br/><sub>Verify at localhost:3000</sub>"]:::sensory
    Close(["<b>✅ 5. Log & Close Defect</b><br/><sub>Status: RESOLVED</sub>"]):::close

    Detect -->|"Isolate"| Isolate
    Isolate -->|"Patch"| Patch
    Patch -->|"Verify UX"| Verify
    Verify -->|"Confirmed"| Close
```

---

## 2. Severity Classification Matrix

| Severity | Definition & Impact | Resolution Target |
|---|---|---|
| **P0 (Critical)** | Application crash, white screen of death, unhandled runtime exception. | Immediate |
| **P1 (High)** | Core user action fails, form submission broken, auth loop. | Same session |
| **P2 (Medium)** | UI misalignment, layout shift, slow transition, jank. | Next iteration |
| **P3 (Low)** | Minor cosmetic inconsistency, typo, console warning. | Polish phase |

---

## 3. Active & Resolved Defect Log

| Defect ID | Date | Sev | Summary | Impacted Path | Violated AC / Spec Gap | Root Cause / Trigger | Fix (Commit / PR) | Regression Test | Status |
|---|---|---|---|---|---|---|---|---|---|
| `ERR-001` | 13-11-2026 | `P1` | Sample: Mobile menu overflow on small screens | `assets/dashboard.css` | `AC-FEAT001-02` | CSS fixed width on nav container overriding flex | commit `f4e3d2c` | `tests/test_dashboard_responsive.js` | `RESOLVED` |
| `ERR-002` | 16-11-2026 | `P0` | Test runner ENOENT crash when package.json absent | `Project-Manager-Dashboard/server.js` | `AC-FEAT001-03` | Hardcoded npm test command in server action | commit `f9ef182` | `tests/test_ac_contracts.js` | `RESOLVED` |
| `ERR-003` | 16-11-2026 | `P1` | AC inspection sheet displayed placeholder fallback text | `Project-Manager-Dashboard/assets/dashboard.js` | `AC-FEAT001-01` | Modal queried spec.given instead of spec.scenario | commit `f9ef182` | `tests/test_ac_contracts.js` | `RESOLVED` |
| `ERR-004` | 16-11-2026 | `P2` | Unhandled stream event on rapid SSE client reconnection | `Project-Manager-Dashboard/server.js` | `AC-FEAT001-01` | Client socket destroyed before SSE handshake flush | In Triage | `tests/test_sse_stream.js` | `ACTIVE` |

## Evidence and change control

- **MUST** record owner, revision/date, and traceable evidence in the applicable project instantiation.
- **MUST** route process changes through formal baseline revisions and living feature specifications.

## Vibe Coding interpretation

- Treat defect logs and sensory glitch records as active inputs for iterative refactoring.

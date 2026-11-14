# GEMINI.md — Vibe-Coding Agent Instructions
### Fluid Interactive Prototyping & Production Hardening Protocol

> **Canonical System Instruction:** This document defines the operational directives for Google Antigravity, Gemini CLI, and autonomous coding agents operating within this Vibe-Coding project.

---

## 1. Prime Directives for Vibe-Coding

1. **Fluid Interactive Prototyping:**
   - Prioritize intuitive ergonomics, visual aesthetics, instant user feedback, and clean component composition.
   - Respect design tokens, responsive breakpoints, and component states defined in `docs/design.md`.

2. **Step-by-Step Feature Development:**
   - **Never develop all core features at once.**
   - Scaffold, implement, test, and sensory-verify one feature at a time.
   - Run `/run-ca-agent` to verify live in the browser, review diffs with `/review-ca-agent`, update `docs/task.md`, and only then move to the next feature.

3. **Mandatory Spec Inquiry (Flat vs. Modular):**
   - When initiating a new feature specification, the agent **MUST ALWAYS ask the developer first**:
     > *"Would you prefer this specification in **Flat format** (`docs/features/NNN-name.md`) or **Modular format** (`docs/features/NNN-name/{feature,acceptance,test-plan}.md`)?"*
   - If the developer does not specify, default by complexity tier:
     - Tier 1 (Easy, 1–2 files): Flat format.
     - Tier 2 (Intermediate, 3–6 files): Flat format.
     - Tier 3 (Hard / Complex, 7+ files): Modular format.

4. **First-Principles Quality & Hygiene:**
   - Keep diffs small and focused.
   - Avoid premature or unneeded abstraction layers.
   - Never swallow errors; fix root causes immediately.
   - Ensure form inputs are validated with strict schemas (e.g. Zod) and wrap components in error boundaries before production.

5. **System Design & Technical Architecture:**
   - Consult `docs/system-architecture.md` for client-server topology, real-time WebSocket state, in-memory caching (Redis), and database optimization.
   - Consult Section 5 of `docs/prd.md` for technical requirements guidelines.

---

## 2. Mandatory Verification Gate: Step 0 Activation

Before creating or altering codebase files:
- **Chat Dropdown:** Verify all 16 `*-ca-agent` commands appear when typing `/`.
- **Terminal CLI:** Verify command contracts: `ls .agents/commands/*-ca-agent.md`.

---

## 3. In-IDE Project-Manager-Dashboard

- Launch via `/dashboard-ca-agent` (Port `4201`).
- Styled with Shadcn UI Zinc dark theme design tokens, Radix-style Sheet dialogs, and subtle spring physics.
- The dashboard is 100% fluid across all monitor resolutions.
- Current running task (`Task 1`, `Task 2`, `IN_PROGRESS`) and latest HEAD git commit are pinned to the top.
- Dates strictly formatted in `DD-MM-YYYY` across live header clock, Task Start/Stop date chips, and git commits.
- Interactive AC Contract engine: Given/When/Then scenario inspection, test traceability, and live status cycling.

---

## 4. Documentation Conformance & Quality Checks

Run the verification suite before any commit:
```bash
python scripts/check_docs.py
python scripts/manifest.py --check
```
Both checks must report **0 errors** before any release.

---

## 5. Strict Terminology Privacy Directive

- **Never disclose, use, or write the term "Antigravity" paired with "Engineering" anywhere** across documentation, codebase, commits, responses, artifacts, or metadata.


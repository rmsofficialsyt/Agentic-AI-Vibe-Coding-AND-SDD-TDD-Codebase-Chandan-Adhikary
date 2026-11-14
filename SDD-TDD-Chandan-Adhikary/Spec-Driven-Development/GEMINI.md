# GEMINI.md — SDD-TDD Agent Instructions
### Spec-Driven Development (SDD) & Test-Driven Development (TDD) Engineering Protocol

> **Canonical System Instruction:** This document defines the operational directives for Google Antigravity, Gemini CLI, and autonomous coding agents operating within this Spec-Driven Development + TDD project.

---

## 1. Prime Directives for SDD-TDD

1. **The Specification is the Law:**
   - No application code may be written, altered, or refactored without an approved feature contract in `docs/features/` indexed in `docs/spec.md`.
   - Any unapproved feature or undocumented modification is treated as an architectural defect.

2. **Step-by-Step Spec Development Pacing:**
   - **Never develop all core features at once.**
   - Implement strictly one feature specification at a time.
   - Complete the full TDD cycle (Red → Green → Refactor), pass all automated tests, update documentation (`docs/task.md`, `docs/error-tracker.md`), and only then proceed to the next spec.

3. **Mandatory Spec Inquiry (Flat vs. Modular):**
   - When initiating a new feature specification, the agent **MUST ALWAYS ask the developer first**:
     > *"Would you prefer this specification in **Flat format** (`docs/features/NNN-name.md`) or **Modular format** (`docs/features/NNN-name/{feature,acceptance,test-plan}.md`)?"*
   - If the developer does not specify, default by complexity tier:
     - Tier 1 (Easy, 1–2 files): Flat format.
     - Tier 2 (Intermediate, 3–6 files): Flat format.
     - Tier 3 (Hard / Complex, 7+ files): Modular format.

4. **Strict TDD Implementation Cycle (Red → Green → Refactor):**
   - **Red (`/tdd-ca-agent`):** Write failing tests mapped to each `AC-FEAT###-##` and confirm they fail with expected error messages.
   - **Green (`/implement-ca-agent`):** Write the minimal production code necessary to turn all tests green.
   - **Refactor:** Clean architecture, remove duplication, and guarantee 100% passing tests.

5. **System Design & Technical Architecture:**
   - Consult `docs/system-architecture.md` for High-Level Design (HLD), Low-Level Design (LLD), scalability, caching hierarchy, data consistency (ACID vs. BASE), and asynchronous message queuing before modifying services or database schemas.
   - Consult Section 5 of `docs/prd.md` for technical requirements guidelines.

---

## 2. Mandatory Verification Gate: Step 0 Activation

Before creating or altering codebase files:
- **Chat Dropdown:** Verify all 16 `*-ca-agent` commands appear when typing `/`.
- **Terminal CLI:** Verify command contracts: `ls .agents/commands/*-ca-agent.md`.

---

## 3. In-IDE Project-Manager-Dashboard

- Launch via `/dashboard-ca-agent` (Port `4200`).
- The dashboard is 100% fluid across all monitor resolutions.
- Current running task (`Task 1`, `Task 2`, `IN_PROGRESS`) and latest HEAD git commit are pinned to the top.

---

## 4. Documentation Conformance & Quality Checks

Run the verification suite before any commit:
```bash
python scripts/check_docs.py
python scripts/manifest.py --check
```
Both checks must report **0 errors** before any release.

# Skill: andrej-karpathy-skill

**Skill ID:** SKILL-KARPATHY-001  
**Name:** Andrej Karpathy AI Engineering & Vibe Heuristics  
**Version:** 1.0.0  
**Authority:** Core In-Built Capability (.agents/skills/)  
**Applicability:** Universal — Both Vibe Coding & Spec-Driven Development (SDD-TDD)  

---

## 1. Core Philosophy & Mental Models

### 1.1 Software 2.0 / 3.0 Mindset
- **Software 1.0:** Explicit algorithms hand-crafted in code.
- **Software 2.0:** Code written as optimization over neural weights.
- **Software 3.0:** Systems constructed via prompt programming, agent orchestration, and context injection.
- **Rule:** Treat LLMs as probabilistic engines guided by high-signal context, not magic compilers. Never assume zero-shot correctness on complex edge cases.

### 1.2 Dual-Track Operation

#### Track A: Vibe-Coding Heuristics (Fluid & Intuitive)
- **Fast Iteration Latency:** Maintain conversational velocity. Ask for a working prototype in minutes, not days.
- **Visual & Sensory Verification:** Run the development server immediately (`/run-ca-agent`); visually inspect layouts, animations, and flows.
- **Conversational Refinement:** Steer the code iteratively: "Make the card headers bolder", "add a search filter", "handle empty states cleanly".
- **Intuitive Feeling:** If something feels sluggish, clunky, or awkward in the UI, trust that intuition and iterate on the prompt immediately.
- **Hardening for Production:** Once the vibe is right, harden error handling, sanitize inputs, enforce environment variables, and verify security headers before shipping.

#### Track B: SDD-TDD Heuristics (Rigorous & Contract-Bound)
- **Inspect the Raw Data First:** Never author a specification or schema from imagination. Inspect raw database records, JSON payloads, third-party API responses, and user input shapes before writing a single requirement.
- **Single-Batch Overfit / Micro-Baseline:** Before building multi-layer abstractions, repositories, and complex services, make a single end-to-end slice work (e.g. 1 route -> 1 controller -> 1 DB query -> 1 response). Verify it completely, then scale.
- **Tiny Failure-Mode Test Harnesses:** Write unit tests that aggressively probe failure modes: null inputs, oversized payloads, malformed tokens, network timeouts, and concurrency races.
- **Anti-Overengineering:** Reject premature class hierarchies, deep inheritance, and unnecessary microservices. Keep code flat, readable, and directly testable.

---

## 2. Universal Heuristics for Production-Grade Code

1. **Zero Hallucinated Dependencies:**
   - Always verify package names, versions, and API signatures against official documentation before importing.
2. **Deterministic Configuration:**
   - Explicitly define environment variables, defaults, and type schemas. No magic hardcoded strings.
3. **Observability & Logging:**
   - Log inputs, outputs, execution latencies, and error stack traces at key system boundaries.
4. **Token & Context Economy:**
   - Keep prompt contexts concise and focused. Do not pollute agent context with obsolete files or redundant rules.

---

## 3. Workflow Trigger
- **MUST** be loaded during Prompt 1 (Discovery) to establish engineering mindset.
- **MUST** guide Prompt 3 and Prompt 4 implementation choices to prevent over-engineering.
- **MUST** be referenced during code reviews (`/review-ca-agent`) to ensure simplicity and data fidelity.

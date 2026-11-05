# AI-Powered Project Development — Complete Setup & Prompting Guide

Vibe Coding + Spec-Driven Development (SDD) + TDD · Production-Grade SaaS Applications

This guide explains how to use your Vibe Coding or SDD + TDD ZIP templates to start a completely new software project using Claude Code, Cursor, Windsurf, Antigravity, Codex, OpenCode, Trae, or VS Code with AI agents.

The most important principle is: Do not ask the AI agent to start coding immediately. First, make it understand your project, research the requirements, configure the documentation, propose a realistic plan, and obtain your approval.

I'll use a School Management SaaS Platform as the example, but the guide is reusable for ERP, CRM, e-commerce, hospital management, LMS, AI applications, dashboards, and other projects.

## Step 1 — Download and extract your framework

Choose one framework according to your development approach.

### Option A — Vibe Coding
ZIP: `Vibe-Coding-Chandan-Adhikary.zip`  
Extracted folder: `Vibe-Coding/`  
Best for rapid prototyping, UI/UX exploration, iterative development, and visual refinement before production hardening.

### Option B — SDD + TDD
ZIP: `SDD-TDD-Chandan-Adhikary.zip`  
Extracted folder: `Spec-Driven-Development/`  
Best for specification-first engineering, approved features, strict test-first implementation, traceability, and controlled production releases.

Use one framework as the project's canonical baseline, rather than merging both ZIP structures.

## Step 2 — Rename the project folder

Rename the extracted folder according to the software you want to build.

**Example:**
- Before: `Vibe-Coding/` or `Spec-Driven-Development/`
- After: `school-management-saas/`

Use lowercase `kebab-case` names wherever practical. Avoid spaces and special characters in the repository name.

Open the renamed folder in your preferred AI coding IDE. Ensure the IDE opens the project root, so the agent can find `AGENTS.md`, any supported tool-specific instruction files, `docs/`, and `.agents/`.

## Step 3 — Prompt 1: Project discovery, R&D, and complete pre-development configuration

**Mode:** Plan Mode / Ask Mode / Read-only Planning  
**Goal:** Make the agent research and plan the entire project, inspect the existing guidelines, define features, select technologies, and propose configuration updates—without implementing application code.

This is your reusable master prompt. Replace the values in angle brackets with your actual project information.

```markdown
# PROMPT 1 — MASTER PROJECT DISCOVERY, R&D & PRE-DEVELOPMENT PLANNING

## Your Role
Act as a team of senior professionals with 15+ years of experience:
- Senior Project Manager / Technical Program Manager
- Senior Software Architect
- Senior Full-Stack Engineer
- Senior Frontend and UI/UX Engineer
- Senior Backend and Database Engineer
- Senior DevOps / Cloud Engineer
- Senior Cybersecurity Engineer
- Senior QA / Test Automation Engineer
- Senior AI/ML Engineer (when applicable)
- SaaS Product Manager and Business Analyst

Your objective is to plan a scalable, secure, maintainable, production-grade SaaS product using AI-assisted development, Spec-Driven Development, and Test-Driven Development where required by the selected project framework.

Prioritize correctness, product quality, usability, accessibility, maintainability, and fidelity to approved requirements.

IMPORTANT: WORK IN PLAN MODE ONLY. DO NOT IMPLEMENT APPLICATION CODE. DO NOT INSTALL PACKAGES, ALTER THE DATABASE, OR START DEPLOYMENT.

---

## 1. Project Information
Project Name: <PROJECT_NAME>
Product Type: <SaaS / Web Application / Mobile App / Desktop Software / AI-ML Platform / Other>
Project Description:
<Describe the product, its main purpose, business model, and primary workflows.>

Example:
Develop a multi-tenant, subscription-based School Management SaaS platform for schools, administrators, teachers, students, and parents.
The software should simplify academic management, admissions, fees, attendance, communication, examinations, reporting, and school operations.

Target Audience:
<Identify customers, end users, administrators, and any other stakeholders.>

Target Market / Region:
<Country, region, language, and applicable legal requirements.>

Business Model:
<Subscription / Freemium / Enterprise Licensing / One-time Purchase / Other>

Development Framework:
<Vibe Coding OR Spec-Driven Development + TDD>

Expected Outcome:
A polished, tested, scalable, and production-ready software product that satisfies the approved requirements and quality gates.

---

## 2. Mandatory Repository Inspection
Before planning or configuring anything:
1. Inspect the existing project root.
2. Read README.md and AGENTS.md.
3. Read the relevant IDE-specific instruction file if supported.
4. Read docs/INDEX.md, docs/constitution.md, and docs/rules.md where present.
5. Read docs/ide-compatibility.md. Execute active IDE detection: in Single-IDE mode, automatically prune irrelevant IDE configuration files; in Multi-IDE mode, synchronize declared active IDE adapters to canonical AGENTS.md.
6. Identify existing specifications, architecture documents, agent instructions, and operational playbooks.
7. Inspect existing skills, hooks, plugins, connectors, MCP definitions, and collision-free slash commands in .agents/.
8. Determine the current guideline baseline and document statuses.
9. Detect missing, duplicate, contradictory, or obsolete configurations.
10. Respect the existing framework and folder structure.

Rules:
- MUST treat approved guidelines as the process authority.
- MUST treat the latest approved feature specifications as the feature authority.
- MUST NOT implement unapproved features.
- MUST NOT delete or overwrite existing canonical files without authorization.
- For SDD, MUST utilize the official specs/ directory supporting dual user-selected formats (Format 1: Flat files or Format 2: Modular folders) along with the docs/ structure.
- MUST NOT invent capabilities, source files, or research findings.
- MUST report any unresolved contradictions.

---

## 3. Research & Development
Conduct evidence-based product and technical research.

Research the following:

### 3.1 Product and Market Research
- Problem statement and market opportunity.
- Target customer personas.
- User pain points and workflows.
- Existing competing products.
- Industry standards and common functionality.
- Market differentiation opportunities.
- SaaS pricing and business-model options.
- Product adoption and usability considerations.

### 3.2 Technical Research
- Suitable system architectures.
- Frontend and backend frameworks.
- Database technologies.
- Authentication and authorization solutions.
- Multi-tenant architecture options.
- Hosting and cloud infrastructure.
- Third-party integration options.
- Performance and scalability considerations.
- Security and privacy requirements.
- Development and operational costs.

### 3.3 UI/UX Research
- Modern SaaS design patterns.
- Relevant competitor interfaces.
- Dashboard and navigation patterns.
- Responsive design.
- Accessibility requirements.
- Design-system selection.
- Performance-aware animation.
- Loading, empty, error, and success states.

Use current, reliable sources when browsing is available.
Separate verified facts, recommendations, estimates, and assumptions. Provide references for material research findings.
If browsing is unavailable, explicitly identify which conclusions require external verification.

---

## 4. Required Features
Build the feature plan around the following initial requirements.

### Core Features
1. Landing Page
   - Professional SaaS marketing website.
   - Hero section, features, benefits, pricing, FAQ, testimonials where approved, and CTAs.
   - Responsive layouts, accessible navigation, and appropriate SEO.
2. Authentication
   - Evaluate OAuth/OIDC login using Google and GitHub, if appropriate for the target users.
   - Role-based access control (RBAC).
   - Secure sessions.
   - Account recovery and logout.
   - Multi-factor authentication where required.
   - Review whether additional identity providers are necessary.
3. Responsive Application
   - Desktop, laptop, tablet, and mobile support.
   - Keyboard and touch interactions.
   - Responsive navigation.
   - Accessible components and forms.
4. <FEATURE_4>
5. <FEATURE_5>
6. <FEATURE_6>
   ...
7. <FEATURE_50>

### Additional Feature Recommendations
Review the proposed features and suggest useful additions based on:
- Business value.
- User needs.
- Technical dependencies.
- Development cost.
- Security and privacy risks.
- Product differentiation.
- MVP suitability.
- Long-term scalability.

Categorize proposed additions as:
- MVP candidates.
- Phase 2 candidates.
- Future roadmap candidates.
- Optional enhancements.

DO NOT automatically add recommended features to the approved implementation scope.
Every feature recommendation must include its purpose, expected benefit, priority, dependency, and estimated complexity.
Avoid duplicate features.

---

## 5. Technology Stack Evaluation
Evaluate my preferred technologies.

### Preferred Frontend
- React
- Next.js
- TypeScript
- HTML5
- Modern CSS
- Tailwind CSS
- shadcn/ui

### Preferred Backend
- Node.js
- Python
- FastAPI

### Preferred Database
- PostgreSQL
- Supabase
- MongoDB

### Additional Infrastructure
<Hosting provider, object storage, cache, queues, monitoring, analytics, payment provider, etc.>

### Required Evaluation
For each technology, explain:
1. Purpose.
2. Suitability.
3. Benefits.
4. Limitations.
5. Compatibility.
6. Security considerations.
7. Operational complexity.
8. Expected cost implications.
9. Recommended version.
10. Whether it is required, optional, or unnecessary.

Do not use every listed technology automatically.
Select a coherent architecture and justify the recommended combinations.
For example, evaluate Next.js with TypeScript and PostgreSQL, then determine whether a separate FastAPI service is genuinely needed.
Do not introduce redundant backend frameworks or databases without a justified requirement.
Use stable, supported technology versions.
Do not finalize architectural choices without my approval.

---

## 6. Database & Data Architecture
Plan:
- Database selection and rationale.
- Relational or document data model.
- Main entities and relationships.
- ERD.
- Table/collection definitions.
- Primary and foreign keys.
- Indexing and constraints.
- Multi-tenancy and tenant isolation.
- Migration strategy.
- Backup and restoration.
- Encryption and access control.
- Data lifecycle, retention, and deletion.
- Seed and test data.
- Performance considerations.
- Database security and recovery.

For SaaS applications, explicitly evaluate shared-database versus isolated-database tenancy strategies.
Do not create database tables or run migrations during planning.

---

## 7. UI/UX & Design Requirements

### Color Palette
Primary: <HEX_VALUE>  
Secondary: <HEX_VALUE>  
Accent: <HEX_VALUE>  
Background: <HEX_VALUE>  
Text: <HEX_VALUE>  

If colors are unspecified, propose 2–3 coherent accessible palettes for approval.

### Typography
Primary Font: <FONT_NAME>  
Secondary Font: <FONT_NAME>  

Specify typography scales, font weights, line heights, and fallbacks.

### Preferred UI Libraries and Design Patterns
- shadcn/ui
- Tailwind CSS
- Bento Grid
- Modern SaaS dashboards
- Recharts
- Motion and microinteractions
- Appropriate contemporary interface references

Treat Dribbble and similar design sources as inspiration rather than code or component libraries.

### Design Requirements
- Design tokens.
- Component library.
- Screen inventory.
- User journeys.
- Navigation architecture.
- Responsive layouts.
- Light/dark themes where approved.
- Empty, loading, error, and success states.
- Accessibility.
- Motion and reduced-motion support.
- Charts and data visualization.
- Visual consistency.
- Design acceptance criteria.

Website References:  
<INSERT_REFERENCE_URLS>

Analyze the references when accessible.
Identify which elements are suitable for adaptation without copying protected designs or assets.
Propose a unified visual design direction before UI implementation.

---

## 8. Agent Skills, Plugins, MCP & Tools

### Preferred Skills for Evaluation
- Andrej Karpathy-inspired engineering guidance or skills (andrej-karpathy-skill).
- UI/UX Pro Max.
- Awesome Design.
- Motion Design.
- Motion.dev.
- Anime.js-related skills or integrations.
- Project-specific architecture and testing skills.
- Security and accessibility review skills.

### Preferred Plugins / Tools for Evaluation
- Playwright.
- Claude Code plugins where supported.
- IDE-native development tools.
- Documentation tools.
- Database inspection tools.
- Git and repository tools.
- Relevant MCP servers.

### Instructions
1. Check availability and compatibility.
2. Identify official, community, and project-specific tools.
3. Evaluate source trust and maintenance.
4. Identify supported IDE versions.
5. Explain the purpose of each selected tool.
6. Define permissions and security boundaries.
7. Define when the tool should run.
8. Identify overlapping capabilities.
9. Recommend the minimum necessary toolset.
10. Document installation and configuration plans.

Do not install or activate anything without approval.
Do not treat all listed names as verified installable skills or plugins.
Playwright is primarily a testing/automation framework; select the suitable integration method for the chosen IDE.

---

## 9. System Architecture Planning
Produce a proposal covering:
- System context diagram.
- High-level architecture (HLD).
- Low-level architecture (LLD).
- Frontend architecture.
- Backend/service architecture.
- Authentication architecture.
- Multi-tenant architecture.
- Database architecture.
- API contracts.
- State management.
- Background jobs.
- Caching strategy.
- File/object storage.
- Error handling.
- External integrations.
- Infrastructure and hosting.
- Logging, monitoring, and alerting.
- Scalability and reliability.
- Backup and recovery.
- AI/ML architecture if relevant.

Document major decisions and alternatives.

---

## 10. Security, Privacy & Compliance
Define:
- Authentication and authorization.
- Least-privilege access.
- Tenant isolation.
- Secrets management.
- OWASP-aligned protections.
- API security.
- Encryption.
- Data retention.
- Audit logging.
- Rate limiting and abuse protection.
- Secure file uploads where applicable.
- Dependency vulnerability management.
- CI/CD security.
- Privacy requirements based on target regions.
- Applicable regulatory obligations.
- Threat modeling.
- Incident response.
- Disaster recovery.

Do not assume a regulation applies without checking its applicability.

---

## 11. Testing & Quality Assurance
Define a production-oriented testing strategy.
Include:
- Test-Driven Development (TDD).
- Unit testing.
- Integration testing.
- API contract testing.
- End-to-end testing.
- Regression testing.
- Authentication testing.
- Security testing.
- Accessibility testing.
- Responsive testing.
- Cross-browser testing.
- Load and performance testing.
- Database migration testing.
- Failure and recovery testing.
- AI/ML evaluation if relevant.

Recommend appropriate tools for the selected technology stack.
Define measurable quality gates, target coverage, critical journey tests, and release-blocking conditions.
For SDD, tests must be written before production implementation.

---

## 12. Documentation & Repository Configuration Plan
Inspect and propose project-specific content updates for all applicable existing files.

Cover at least:

### Project Foundation
- README.md
- AGENTS.md
- CLAUDE.md
- docs/INDEX.md
- docs/constitution.md
- docs/rules.md
- docs/ide-compatibility.md

### Project Planning
- docs/plan.md (Vibe Coding)
- docs/prompts.md (Vibe Coding)
- docs/prd.md
- docs/spec.md (SDD)
- specs/ (SDD - official feature specifications)
- docs/features/
- docs/task.md
- docs/phases.md

### Technical Documentation
- docs/system-architecture.md
- docs/tech-stacks.md
- docs/database.md
- docs/apis.md
- docs/design.md
- docs/security.md

### Development & Quality
- docs/code-testing.md
- docs/code-review.md
- docs/error-tracker.md
- docs/requirements-traceability.md
- docs/acceptance-criteria.md
- docs/devops.md
- docs/deployment.md
- docs/observability.md

### Agent Configuration
- docs/agents.md
- docs/skills.md
- docs/hooks.md
- docs/plugins.md
- docs/connectors.md
- docs/memory.md
- Relevant IDE-specific adapters.
- Portable agent commands and skills in .agents/.

### Project Management
- docs/risk-register.md
- docs/decision-log.md
- docs/release-checklist.md
- docs/handoff.md
- docs/CHANGELOG.md
- docs/guideline-CHANGELOG.md

Also inspect every other existing document and playbook.
Do not create duplicate files or replace existing framework conventions unnecessarily.

### Two-Layer Policy
- **Guidelines:** Fixed, versioned engineering process baseline.
- **Specifications:** Living, approved, versioned project and feature requirements.

Changing project-specific values within an approved guideline's permitted configuration fields does not authorize changing its mandatory rules.
Any actual guideline-rule change requires explicit revision, approval, version bump, and changelog entry.

---

## 13. Project Management & Milestones
Create a practical development roadmap.

Example:
- Phase 0: Research, discovery, and planning.
- Phase 1: Requirements, specifications, and approvals.
- Phase 2: Architecture, design system, and environment setup.
- Phase 3: Core application foundation.
- Phase 4: Authentication and authorization.
- Phase 5: Core business modules.
- Phase 6: Advanced functionality and integrations.
- Phase 7: Testing, security, and performance hardening.
- Phase 8: Staging, acceptance, and production readiness.
- Phase 9: Production deployment and monitoring.
- Phase 10: Maintenance and continuous improvement.

Adapt these phases to actual dependencies and priorities.
For every milestone, define: scope, deliverables, dependencies, risks, estimated effort, acceptance criteria, quality gates, and required approvals.
Identify the critical path and realistic MVP boundary.

---

## 14. Required Output
Produce a structured planning report with:
1. Executive project summary.
2. Research findings and sources.
3. Product requirements and user personas.
4. Recommended feature inventory.
5. MVP, Phase 2, and future roadmap separation.
6. Technology-stack comparison and recommendation.
7. Proposed architecture.
8. Database and API approach.
9. UI/UX design direction.
10. Security and privacy assessment.
11. Testing strategy.
12. AI agent skill, plugin, hook, and MCP compatibility plan.
13. Complete file-by-file repository configuration plan.
14. Project phases, tasks, milestones, and dependencies.
15. Risks and unresolved questions.
16. Decisions requiring my approval.
17. Exact next-step recommendation.

For each planned file change, report:
- File path.
- Current purpose.
- Proposed project-specific changes.
- Guideline or specification classification.
- Approval requirement.
- Dependencies.
- Verification criteria.

---

## 15. Mandatory Execution Restrictions
DO NOT:
- Write application source code.
- Implement features.
- Create database schemas in a running database.
- Install dependencies or plugins.
- Enable external integrations.
- Deploy applications.
- Delete project files.
- Silently modify guideline rules.
- Invent research results or unavailable tool capabilities.
- Treat suggested features as approved.
- Skip required approvals.

DO:
- Inspect the existing project.
- Analyze and research.
- Identify gaps.
- Propose project-specific configurations.
- Recommend architecture and technologies.
- Create a comprehensive implementation plan.
- Identify required approvals.
- Present the final planning report.

STOP AFTER THE PLANNING REPORT.
Wait for explicit approval before applying documentation changes or starting development.
```

## Step 4 — Review and approve the development plan

After Prompt 1, the AI agent should provide the project plan, recommended stack, architecture, proposed features and documentation-update matrix.

Before proceeding, check whether the plan defines the actual MVP, identifies unnecessary technologies, covers security, and distinguishes required features from optional suggestions.

Do not approve the plan simply because it is detailed. Check that the decisions make sense for your product and budget.

## Step 5 — Prompt 2: Configure the complete project codebase

Once the plan is approved, use this prompt.

```markdown
# PROMPT 2 — APPROVED PROJECT CONFIGURATION

The project discovery, research, and development plan has been reviewed and approved.

Approved Plan: <PLAN_REFERENCE_OR_VERSION>
Approved Technology Stack: <STACK>
Project: <PROJECT_NAME>

Now configure the existing project template according to the approved plan.

## Instructions
1. Read the approved plan and existing project guidelines.
2. Verify the approved guideline baseline.
3. Inventory all files before modification.
4. Update project-specific documentation according to the approved decisions.
5. Create missing project-specific specification documents only when required.
6. Maintain all existing guideline policies.
7. Preserve existing IDE-specific configuration files (or execute approved pruning/coexistence per docs/ide-compatibility.md).
8. Configure agent instructions for the intended coding platform.
9. Prepare documented skills, hooks, commands, plugins, and MCP configuration proposals in .agents/.
10. Configure safe environment variable examples without real credentials.
11. Define project architecture, database contracts, APIs, design system, milestones, and tasks.
12. Add requirements traceability and acceptance criteria.
13. Prepare testing and CI/CD configuration plans.
14. Configure the project's docs/ and specs/ structure (selecting Format 1: Flat files or Format 2: Modular folders in SDD).

## Strict Scope
You are authorized to update project-specific documentation and compatible configuration files according to the approved plan.
Do not implement application features, install dependencies, connect services, run migrations, or deploy.
Do not modify fixed guideline rules without a separately approved guideline revision.
For SDD, keep feature specifications in Draft or Review status until explicit approval is recorded.

## Required Report
After configuration, provide:
- Files created.
- Files modified.
- Files intentionally unchanged.
- Documentation completeness.
- Guideline compliance.
- Spec approval status.
- Agent/IDE compatibility status.
- Configuration checks actually performed.
- Unresolved questions.
- Readiness assessment.

STOP when project configuration is complete. Do not start feature implementation without my next approval.
```

## Step 6 — Prompt 3: Approve SDD specifications and prepare TDD

For the SDD framework, this is a mandatory checkpoint before implementation.

```markdown
# PROMPT 3 — SPECIFICATION VALIDATION & TDD READINESS

Review all project-specific specifications against the approved PRD, architecture, database contracts, API contracts, and UI/UX requirements.

1. Detect ambiguous, contradictory, missing, or untestable requirements.
2. Verify every feature in specs/ has a unique ID, version, scope, and acceptance criteria (confirming user format preference: Format 1 Flat files vs Format 2 Modular folders).
3. Verify requirements-to-test traceability.
4. Review security, accessibility, performance, and failure scenarios.
5. Identify unresolved dependencies and implementation blockers.
6. Propose corrections without silently changing approved specifications.
7. Present the list of feature specifications ready for approval.
8. Produce the TDD test plan for the first authorized feature.
9. Define the expected red -> green -> refactor sequence.
10. Define the merge and release quality gates.

Do not automatically approve specifications on my behalf.
Do not implement application code.
Only specifications explicitly approved by an authorized reviewer may become the implementation baseline.

STOP and present the specification-readiness and approval report.
```

For Vibe Coding, use this step when transitioning from prototype exploration to production-bound development.

## Step 7 — Prompt 4: Develop one approved feature

Once a feature is approved, avoid asking the agent to implement the entire application at once. Work feature by feature or in small independently verifiable work packages.

```markdown
# PROMPT 4 — FEATURE IMPLEMENTATION USING SDD + TDD

Implement the following approved feature:

Project: <PROJECT_NAME>
Feature ID: <FEATURE_ID>
Feature Name: <FEATURE_NAME>
Approved Specification Version: <SPEC_VERSION>
Task ID: <TASK_ID>

## Mandatory Workflow
1. Read canonical guidelines and the latest approved feature specification in specs/.
2. Inspect relevant existing code and contracts.
3. Confirm the implementation scope and affected files.
4. Check dependencies and identify blockers.
5. Write tests based on the approved acceptance criteria.
6. Execute the tests and verify the intended failure state (Red phase).
7. Implement the minimum code needed to satisfy the tests (Green phase).
8. Refactor without changing approved behavior.
9. Run affected unit, integration, and contract tests.
10. Execute relevant E2E, security, accessibility, and performance checks.
11. Verify UI/UX against approved design specifications where applicable.
12. Check for regressions and unauthorized scope changes.
13. Update implementation documentation and test evidence.
14. Record actual results and unresolved issues.

## Rules
- MUST NOT implement features outside the approved specification.
- MUST NOT change the technology stack without approval.
- MUST NOT bypass test-first requirements.
- MUST NOT fabricate test or verification results.
- MUST NOT silently disable failing checks.
- MUST NOT commit, push, merge, or deploy unless those actions are explicitly authorized.
- MUST report any guideline/specification conflict and stop the affected work.

## Completion Report
Provide:
- Implemented requirement IDs.
- Files created or modified.
- Tests written before implementation.
- Commands executed.
- Actual test results.
- UI/UX verification results.
- Security and performance findings.
- Remaining issues.
- Acceptance criteria status.
- Recommendation for the next task.

STOP after this feature is completed and verified.
```

## Step 8 — Prompt 5: Final review and production-readiness validation

```markdown
# PROMPT 5 — PRODUCTION READINESS AUDIT

Perform a comprehensive production-readiness review of the project.

Validate:
1. Approved requirements and feature versions.
2. Requirements traceability.
3. Architecture compliance.
4. Source-code quality.
5. Security and privacy.
6. Authentication and authorization.
7. Database and API correctness.
8. Automated test results.
9. Critical user journeys.
10. Accessibility and responsive behavior.
11. UI/UX fidelity.
12. Performance and scalability.
13. Dependency vulnerabilities.
14. Environment and secrets configuration.
15. Monitoring, logging, and alerting.
16. Backup and recovery.
17. CI/CD and artifact integrity.
18. Deployment and rollback plans.
19. Documentation, runbooks, and handoff.
20. Outstanding defects, risks, and release blockers.

Compare all verifiable implementation outcomes against the latest approved requirements.
Report actual evidence rather than assuming checks passed.

Classify findings as:
- Blocker
- Critical
- High
- Medium
- Low
- Informational

Provide a release readiness report with Passed, Failed, Not Run, and Not Applicable status for each gate.
Do not claim 100% compliance unless all required criteria have been verified.
Do not deploy.

STOP and request explicit release authorization.
```

## Complete workflow overview

1. **Extract and rename project** — Choose Vibe Coding or SDD, and open the project root in your IDE.
2. **Prompt 1: Research and plan** — Produce requirements, recommendations, architecture and documentation changes. No coding.
3. **Human approval** — Confirm product scope, technical approach, budget and design direction.
4. **Prompt 2: Configure project** — Update approved project-specific documentation and safe configurations.
5. **Prompt 3: Validate specs** — Check traceability, acceptance criteria and TDD readiness; approve feature specs.
6. **Prompt 4: Implement feature** — Write tests first, implement one approved scope, verify and review.
7. **Repeat feature cycle** — Continue by milestone, recording every approved requirement change.
8. **Prompt 5: Release audit** — Run all quality gates and request production release authorization.

## Additional professional recommendations

I recommend three adjustments to your original example:

First, write OAuth/OIDC rather than "0Auth." Google and GitHub authentication are potential providers, but their suitability depends on your actual users. For a school-focused product, you may also need Microsoft or institution-managed identity providers.

Second, use HTML5 and modern CSS rather than treating "CSS4" as one universal technology version. CSS features evolve across multiple specifications.

Third, classify your preferred tools correctly: shadcn/ui is a component system, Recharts is for charts, Motion and Anime.js support animation, and Dribbble is a design-inspiration platform. They should not all be treated as interchangeable UI frameworks.

### Recommended starting point

For a new SaaS product, use Prompt 1 first. Let the agent research and propose before you approve technology choices, features, or project-specific changes.

For your SDD framework, Prompt 3 is essential before Prompt 4. It establishes the approved specification and test-first contract that keeps implementation controlled and predictable.

These five prompts form a reusable project-starting workflow that you can apply across your future Vibe Coding and SDD projects.

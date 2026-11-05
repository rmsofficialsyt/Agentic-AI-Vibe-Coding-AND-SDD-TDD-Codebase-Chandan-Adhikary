# AI-Powered Project Development — Complete Vibe-Coding Production Guide for School Management System (SMS)

**Framework:** Vibe Coding Framework · Rapid Prototyping to Production-Hardened SaaS  
**Author:** Chandan Adhikary  
**Reference Project:** EduSphere School Management SaaS Website (SMS)  
**Target IDEs:** Claude Code, Cursor, Windsurf, Antigravity, GitHub Copilot, Codex, Trae, VS Code  

---

## Executive Summary & Guiding Philosophy

**Vibe Coding** is a modern, high-velocity software engineering methodology where human vision and taste guide autonomous AI agents through real-time feedback loops. Instead of writing boilerplate or debating abstract schemas for weeks, you build working software from minute one, evaluate it with your own eyes, iteratively refine the user experience ("the vibe"), and systematically harden the architecture into an enterprise-grade production application.

However, **professional Vibe Coding is not reckless hacking**. True production-grade Vibe Coding follows strict engineering discipline:
1. **Never code without orientation**: Always make the AI agent inspect the repository, detect its IDE environment, and internalize the project architecture before generating code.
2. **Visual feedback over theoretical debate**: Build live interactive screens early so you can test real UX flows rather than imagining them.
3. **Karpathy Heuristics**: Adhere to small, verifiable diffs, avoid over-engineering, maintain clean data pipelines, and verify every step interactively.
4. **Progressive Hardening**: Once the visual flow and feature ergonomics feel right, lock down types, add validation schemas (Zod), implement authentication guards, and verify production builds.

This guide provides an end-to-end, production-ready blueprint for creating **EduSphere**—a multi-tenant, cloud-based School Management SaaS Website serving Administrators, Principals, Teachers, Students, and Parents.

---

## Table of Contents

1. [Step 1 — Baseline Framework Setup & Project Renaming](#step-1--baseline-framework-setup--project-renaming)
2. [Step 2 — IDE Detection & Auto-Pruning Policy](#step-2--ide-detection--auto-pruning-policy)
3. [Step 3 — Prompt 1: Vibe Project Discovery, UI/UX & Tech Stack Evaluation](#step-3--prompt-1-vibe-project-discovery-uiux--tech-stack-evaluation)
4. [Step 4 — Human Review & Aesthetic Sign-Off](#step-4--human-review--aesthetic-sign-off)
5. [Step 5 — Prompt 2: Scaffolding & Live Interactive Shell with `/run-ca-agent`](#step-5--prompt-2-scaffolding--live-interactive-shell-with-run-ca-agent)
6. [Step 6 — Prompt 3: Conversational Vibe-Tuning & Feature Expansion (Karpathy Loops)](#step-6--prompt-3-conversational-vibe-tuning--feature-expansion-karpathy-loops)
7. [Step 7 — Prompt 4: Production Hardening, Validation & Pre-Deployment Audit](#step-7--prompt-4-production-hardening-validation--pre-deployment-audit)
8. [Complete Vibe-Coding Workflow Summary & Best Practices](#complete-vibe-coding-workflow-summary--best-practices)

---

## Step 1 — Baseline Framework Setup & Project Renaming

The foundational scaffolding for your Vibe-Coding project lives in the canonical template directory: `Vibe-Coding-Chandan-Adhikary/Vibe-Coding/`.

### Directory Structure & Invariant Rules
When starting your new project, extract or copy the template folder to your workspace and rename it to your target product name:

```text
# Before:
Vibe-Coding-Chandan-Adhikary/Vibe-Coding/

# After:
school-management-system/
```

### Critical Repository Rules
- **Do NOT write application code inside the template directory (`Vibe-Coding-Chandan-Adhikary/`)**: The template folder is an immutable distribution asset. Always copy or rename it to a clean working directory before starting development.
- **Lowercase `kebab-case`**: Avoid spaces, uppercase characters, and special symbols in your directory paths.
- **Open at the Project Root**: Always open your IDE (Cursor, Claude Code, Windsurf, Antigravity) at the root of `school-management-system/` so that AI agents immediately discover `AGENTS.md`, `.agents/`, and `docs/`.

---

## Step 2 — IDE Detection & Auto-Pruning Policy

The Vibe Coding framework includes native adapters for major AI coding environments. Before beginning work, inspect your active IDE environment according to `docs/ide-compatibility.md`:

### Supported IDE Adapters
- **Universal / Agent Core**: `AGENTS.md` and `.agents/` (canonical commands and skills).
- **Claude Code**: `CLAUDE.md`.
- **Cursor**: `.cursorrules`.
- **Windsurf**: `.windsurfrules`.
- **Antigravity**: `antigravity.json` / workspace configuration.
- **GitHub Copilot**: `.github/copilot-instructions.md`.

### Single-IDE Auto-Pruning
If you are developing exclusively within one IDE (for example, Cursor), you may instruct the agent during Prompt 1 to safely delete unused root adapter files (e.g., removing `.windsurfrules` and `CLAUDE.md`) to prevent context window clutter.

### Multi-IDE Coexistence
If your development team uses multiple editors across team members, retain `AGENTS.md` as the single source of truth, and configure the IDE-specific adapter files as thin pointers referencing `AGENTS.md`.

---

## Step 3 — Prompt 1: Vibe Project Discovery, UI/UX & Tech Stack Evaluation

> **Mode:** Plan Mode / Ask Mode / Read-Only Architecture  
> **Goal:** Direct the AI agent to thoroughly research the School Management System domain, inspect the Vibe-Coding guidelines, evaluate modern UI/UX patterns, select the optimal tech stack, and present a complete 17-point planning report—**without implementing any application code yet**.

Copy and paste the exact prompt below into your AI assistant:

```markdown
# PROMPT 1 — VIBE PROJECT DISCOVERY, UI/UX & TECH STACK EVALUATION

## Your Role
Act as an elite team of senior digital product builders with 15+ years of industry experience:
- Senior SaaS Product Manager & Lead UX Designer
- Senior Full-Stack Vibe-Coding Architect (React, Next.js, Node.js, TypeScript)
- Senior Frontend Design Systems Specialist (Tailwind CSS, shadcn/ui, Framer Motion)
- Senior Cloud & Database Architect (Supabase, PostgreSQL, Prisma)
- Senior QA & Visual Regression Engineer

Your objective is to design a lightning-fast, visually stunning, highly intuitive, and production-ready School Management SaaS Website (SMS) using modern Vibe-Coding principles. Prioritize visual delight, immediate feedback, mobile accessibility for teachers and parents, and clean modular code.

IMPORTANT: WORK IN PLAN MODE ONLY. DO NOT IMPLEMENT APPLICATION CODE. DO NOT INSTALL PACKAGES, CREATE DATABASE MIGRATIONS, OR MODIFY SOURCE CODE.

---

## 1. Project Information
- **Project Name:** EduSphere SMS Website
- **Product Type:** Multi-Tenant School Management SaaS Platform & Portal
- **Project Description:** A modern, cloud-native School Management System designed to eliminate administrative friction for K-12 and private academies. It provides tailored experiences for five distinct user roles: SuperAdmin (Multi-school network manager), School Principal (Institutional oversight), Teachers (Daily classroom workflows), Students (Timetable & grades), and Parents (Attendance alerts & fee payments).
- **Target Audience:** School administrators, principals, classroom teachers, K-12 students, and parents.
- **Target Market / Region:** Global / North America & International schools (strict compliance with student privacy laws like COPPA/FERPA).
- **Business Model:** Multi-tier B2B SaaS subscription (Starter, Professional, Enterprise Campus).
- **Development Framework:** Vibe Coding Framework (Rapid interactive prototyping → iterative visual tuning → production hardening).
- **Expected Outcome:** A production-ready, beautifully designed web application with responsive layouts, instant live feedback, and robust data persistence.

---

## 2. Mandatory Repository Inspection
Before planning or proposing any architectural choices:
1. Inspect the existing project root directory.
2. Read `README.md` and `AGENTS.md`.
3. Check the active IDE environment and review `docs/ide-compatibility.md`.
4. Read `docs/INDEX.md`, `docs/constitution.md`, and `docs/rules.md`.
5. Read `docs/plan.md` and `docs/prompts.md`.
6. Inspect the `.agents/` directory, including portable commands (`.agents/commands/*-ca-agent.md`) and skills (`.agents/skills/andrej-karpathy-skill/SKILL.md`).
7. Identify missing or obsolete files and formulate a clean project documentation baseline.

Rules:
- MUST treat `AGENTS.md` and `docs/constitution.md` as the process authority.
- MUST NOT create a separate `specs/` directory; keep all specifications and living plans inside `docs/`.
- MUST NOT write or generate application code in this step.
- MUST report any file discrepancies or orphaned configurations.

---

## 3. Research & Development
Conduct evidence-based product and UI/UX research on the EdTech SaaS sector:

### 3.1 Product and Market Research
- Analyze market leaders (PowerSchool, Canvas LMS, ClassDojo, Toddle).
- Identify key pain points in existing legacy school software: cluttered table-heavy UIs, sluggish mobile responsiveness, complicated multi-step attendance marking, and opaque parent communication.
- Identify core market differentiators for EduSphere: 30-second mobile attendance workflow, modern bento-grid dashboard, instant WhatsApp/SMS parent notifications, and automated fee invoicing.

### 3.2 Technical Research
- Evaluate client-side state management vs. server-side rendering for real-time classroom updates.
- Evaluate database architectures: Shared PostgreSQL with Row-Level Security (RLS) vs. isolated databases for school tenants.
- Evaluate real-time notification architectures: WebSockets vs. Server-Sent Events (SSE) vs. Supabase Realtime.

### 3.3 UI/UX Research
- Modern SaaS aesthetic: Clean Bento Grid cards, subtle border radius (rounded-xl), high-contrast accessibility (WCAG AA).
- Color psychology in education: Deep Indigo/Navy for institutional trust, warm emerald for positive academic attendance, and gentle amber/rose for alerts.
- High-efficiency micro-interactions: 1-click status toggle pills for attendance, optimistic visual updates on click, smooth drawer transitions on mobile viewports.

---

## 4. Required Features

### Core MVP Features
1. **SaaS Marketing Landing Page**:
   - Hero section with interactive platform preview, key feature bento grid, role-based benefit cards (Admin, Teacher, Parent), interactive pricing tier calculator, customer testimonials, and high-conversion CTAs.
2. **Multi-Role Authentication & Onboarding**:
   - Role-based login (SuperAdmin, Principal, Teacher, Student, Parent) using Supabase Auth or NextAuth.js.
   - Secure session management, password reset, and role-based route middleware.
3. **Responsive Master Dashboard**:
   - Collapsible sidebar navigation with active path highlights.
   - Executive statistics cards (Total Students, Daily Attendance Rate, Pending Invoices, Active Teachers).
   - Quick action shortcuts (Mark Attendance, New Enrollment, Generate Report).
4. **Classroom Attendance Sheet (Vibe Showcase Feature)**:
   - High-density student list filtered by Grade and Section (e.g., Grade 10-A).
   - 1-click "Mark All Present" batch action.
   - Interactive status pill buttons for each student: [Present (Green)] / [Absent (Red)] / [Late (Amber)] / [Excused (Blue)] with immediate visual feedback.
   - Real-time attendance percentage counter updating on every toggle.
5. **Student & Teacher Directory**:
   - Searchable, filterable card and table views.
   - Quick view student profile modal: enrollment date, guardian contact, medical notes, academic track.
6. **Fee Invoicing & Payment Tracker**:
   - Tuition fee invoice generation, status badges (Paid, Pending, Overdue), and payment receipt view.

### Additional Vibe Recommendations
- Class timetable visual scheduler (drag-and-drop calendar).
- Parent-teacher instant direct messaging feed.
- Student report card auto-generation in PDF.

---

## 5. Technology Stack Evaluation
Evaluate the following preferred Vibe-Coding technology stack for EduSphere:
- **Frontend Framework:** Next.js 15 (App Router) with React 19 and TypeScript.
- **Styling & UI Kit:** Tailwind CSS v4, shadcn/ui (Radix Primitives), Lucide React icons.
- **Animation & Micro-interactions:** Framer Motion (for fluid tab switches, modal popups, and badge toggles).
- **Backend & Database:** Next.js Server Actions + Route Handlers, Supabase (Managed PostgreSQL) with Prisma or Drizzle ORM.
- **Validation & State Management:** Zod (runtime schema validation), Zustand or React Server State with Optimistic UI hooks.
- **Tooling & Dev Server:** Node.js 22 LTS, pnpm/npm, Turbopack for sub-second hot reload.

Provide a clear rationale for each technology, its suitability for rapid Vibe iterations, performance characteristics, and ease of production deployment on Vercel or Docker.

---

## 6. Database & Data Architecture
Design a clean, normalized relational schema for PostgreSQL:
- `schools` (id, name, slug, domain, plan, created_at)
- `users` (id, school_id, email, role, full_name, avatar_url)
- `classes` (id, school_id, name, grade_level, section, room_number)
- `students` (id, school_id, class_id, roll_number, first_name, last_name, emergency_contact)
- `attendance_records` (id, school_id, class_id, student_id, date, status, notes, marked_by)
- `fee_invoices` (id, school_id, student_id, amount, due_date, status, payment_reference)

Detail the tenant isolation strategy (shared database with mandatory `school_id` and PostgreSQL Row-Level Security).

---

## 7. UI/UX & Design Requirements
- **Color Palette:**
  - Primary Brand: Deep Indigo (`#4F46E5`)
  - Secondary Accent: Violet (`#7C3AED`)
  - Neutral Background: Slate Light (`#F8FAFC`) / Card White (`#FFFFFF`)
  - Dark Mode Background: Slate Dark (`#0F172A`) / Surface Dark (`#1E293B`)
  - Status Success (Present): Emerald (`#10B981`)
  - Status Danger (Absent): Rose (`#F43F5E`)
  - Status Warning (Late): Amber (`#F59E0B`)
- **Typography:** Inter or Plus Jakarta Sans (clean geometric sans-serif).
- **Layout Architecture:** Responsive collapsible desktop sidebar + bottom mobile action sheet.
- **Visual Feedback:** Instant optimistic UI updates, skeleton loaders, and non-blocking toast notifications.

---

## 8. Agent Skills, Tools & Slash Commands
Evaluate the agent skills and tools available in `.agents/`:
- `.agents/skills/andrej-karpathy-skill/SKILL.md`: Heuristics for small atomic diffs, data-first debugging, and live visual verification.
- Portable agent commands: `/run-ca-agent` (execute and verify), `/review-ca-agent` (code quality review), `/plan-ca-agent` (architecture planning).
- Playwright for automated browser screenshots and visual verification.

---

## 9. System Architecture Planning
- High-Level Architecture (HLD) showing client-server interaction.
- Next.js Server Actions for direct database writes with zero boilerplate.
- Optimistic UI updates with React `useOptimistic` for instantaneous attendance toggles.
- Session handling via secure HttpOnly JWT cookies.

---

## 10. Security, Privacy & Basic Safeguards
- Student privacy compliance: Masking sensitive parent contact details for unauthorized roles.
- Role-based middleware (`middleware.ts`) redirecting unauthenticated users or users with mismatched roles.
- Input validation: All API endpoints and Server Actions sanitized using strict Zod schemas.

---

## 11. Testing & QA Strategy for Vibe Coding
- Step 1: Live visual inspection via browser hot-reloading.
- Step 2: Component smoke testing with Vitest and React Testing Library.
- Step 3: End-to-end critical journey test (Teacher login → Mark Attendance → Verify Database Save) via Playwright.

---

## 12. Documentation & Repository Plan
Propose concrete file updates across the repository:
- `docs/plan.md`: Record the full EduSphere roadmap and architecture decisions.
- `docs/prompts.md`: Maintain the exact sequence of conversational vibe prompts used.
- `docs/features/`: Create living specifications for Attendance, Student Directory, and Invoicing.
- `.agents/`: Configure IDE-specific adapters based on active editor detection.

---

## 13. Project Milestones & Vibe Phases
- **Phase 0:** Discovery, Tech Stack Evaluation & Architecture Sign-Off (Current Step).
- **Phase 1:** Core Next.js Scaffolding, Design Tokens, Landing Page & Dashboard Layout.
- **Phase 2:** Live Classroom Attendance Sheet with optimistic status toggles.
- **Phase 3:** Student Directory & Fee Invoicing Modules.
- **Phase 4:** Production Hardening, Zod Validation, Auth Guards & Production Build Verification.

---

## 14. Required Output
Produce a comprehensive 17-section planning report:
1. Executive Project Summary
2. EdTech Research Findings & Market Benchmarks
3. Target Personas & Core Workflows
4. Recommended Feature Scope (MVP vs. Phase 2)
5. Tech Stack Evaluation & Final Recommendation
6. Proposed System Architecture & Next.js Pattern
7. Relational Database Schema & Tenant Isolation
8. UI/UX Design Direction, Color Palette & Tokens
9. Security & Student Privacy Safeguards
10. Testing & Visual QA Protocol
11. Agent Skills & Slash Command Integration
12. File-by-File Repository Configuration Plan
13. Development Milestones & Phased Execution Plan
14. Potential Risks & Mitigation Strategies
15. Key Decisions Requiring Human Approval
16. Recommended Dev Server Port & Environment Setup
17. Exact Next-Step Prompt Recommendation

---

## 15. Mandatory Execution Restrictions
- DO NOT write application code or create `.tsx`/`.ts` source files.
- DO NOT run package managers (`npm install`, `pnpm add`).
- DO NOT create or modify running database tables.
- DO NOT skip human approval.
- STOP IMMEDIATELY after presenting the 17-section report and await explicit review.
```

---

## Step 4 — Human Review & Aesthetic Sign-Off

When your AI assistant finishes generating the 17-section planning report, inspect its proposals before permitting any code execution.

### Critical Verification Checklist
1. **Scope Realism**: Is the MVP focused on the core dashboard, student directory, and attendance marking, or did the agent inflate the scope with unnecessary microservices?
2. **Design Cohesion**: Does the proposed color palette (Indigo/Slate/Emerald) fit an institutional education product?
3. **Tech Stack Coherence**: Did the agent select a unified stack (Next.js 15 + Tailwind + Supabase/PostgreSQL) rather than mixing unnecessary backend servers?
4. **File Safety**: Did the agent respect the framework layout without inventing unnecessary folders?

> **Sign-Off Decision**: If everything aligns with your goals, approve the plan to proceed to Step 5. If you want adjustments (e.g., "Change the primary color to Emerald Green" or "Add a Guardian WhatsApp column"), ask for the tweak before moving forward.

---

## Step 5 — Prompt 2: Scaffolding & Live Interactive Shell with `/run-ca-agent`

> **Mode:** Coding / Build Mode  
> **Goal:** Scaffold the complete application shell, establish design tokens, build the marketing landing page and authenticated dashboard layout with mock data, and launch the dev server for live visual review.

Execute the following prompt:

```markdown
# PROMPT 2 — SCAFFOLDING & LIVE WORKING UI (VIBE CODING)

The development plan and design direction for **EduSphere SMS** have been reviewed and APPROVED.

**Approved Stack:** Next.js 15 (App Router), TypeScript, Tailwind CSS v4, shadcn/ui, Lucide React, Zod.
**Approved Palette:** Indigo (#4F46E5), Slate (#0F172A), Emerald (#10B981), Rose (#F43F5E), Amber (#F59E0B).

Now scaffold the application shell and get a working interactive user interface running locally.

---

## Implementation Tasks

### 1. Initialize Project Foundation & Styling
- Configure `package.json` with Next.js 15, React 19, Tailwind CSS v4, Lucide React, and clsx/tailwind-merge.
- Configure `globals.css` with the approved color tokens, border radiuses, and light/dark theme CSS variables.
- Scaffold essential utility functions (`lib/utils.ts` for cn helper).

### 2. Build the Public SaaS Landing Page (`app/page.tsx`)
- **Navigation Bar:** Logo, feature anchor links, pricing link, and "Sign In / Launch Demo" button.
- **Hero Section:** Bold headline ("Modern School Management Without the Complexity"), sub-headline, live interactive demo badge, and CTA buttons.
- **Features Bento Grid:** Highlight 30-Second Mobile Attendance, Automated Fee Invoicing, Parent WhatsApp Portal, and Real-Time Analytics.
- **Pricing Calculator:** Interactive tier selector (Starter: $99/mo, Pro: $249/mo, Campus: $499/mo).
- **Footer:** Quick links and copyright notice.

### 3. Build the Authenticated Dashboard Shell (`app/dashboard/layout.tsx`)
- **Collapsible Sidebar:** Navigation links for Overview, Attendance, Students, Teachers, Invoices, and Settings.
- **Top Header:** School selector ("Springfield High School"), active term indicator ("Fall Semester 2026"), search bar, notifications bell, and user avatar dropdown.
- **Dashboard Overview (`app/dashboard/page.tsx`):**
  - Metric Cards: Total Students (1,248), Today's Attendance Rate (96.4%), Pending Fees ($14,250), Active Teachers (78).
  - Quick Action Buttons: [Take Attendance], [Enroll Student], [Create Invoice].
  - Recent Activity Feed with realistic mock data.

### 4. Provide Realistic Mock Data (`lib/mock-data.ts`)
- Pre-populate realistic data for 5 classes (Grade 9-A, Grade 9-B, Grade 10-A, Grade 10-B, Grade 11-A) and 25 students with avatars, roll numbers, and attendance states.

### 5. Launch & Verify Dev Server
- Ensure all TypeScript types pass without errors (`tsc --noEmit`).
- Verify that `npm run dev` starts cleanly on `http://localhost:3000`.

---

## Agent Verification Command
Run the verification using the portable agent runner:
`/run-ca-agent npm run build`

## Required Report
Present a summary of:
1. Files created.
2. Verified visual routes: `/` (Landing Page) and `/dashboard` (Main Shell).
3. Local development server URL.
4. Screenshot or ASCII preview of the dashboard layout.
5. Confirmation of zero build or lint warnings.
```

---

## Step 6 — Prompt 3: Conversational Vibe-Tuning & Feature Expansion (Karpathy Loops)

> **Mode:** Iterative Feature Tuning  
> **Philosophy:** This is the heart of Vibe Coding. You take the live working screen, observe how it feels in your browser, and converse with the agent using **Karpathy Heuristics** (small focused changes, immediate feedback, and intuitive ergonomics).

Execute this prompt to build out the core **Classroom Attendance Sheet**:

```markdown
# PROMPT 3 — CONVERSATIONAL VIBE-TUNING: CLASSROOM ATTENDANCE WORKFLOW

We have the dashboard running. Now let's implement the flagship feature of EduSphere: the **30-Second Classroom Attendance Sheet** at `/dashboard/attendance`.

Follow Andrej Karpathy's heuristics: build the data layer first, make the interaction frictionless, give immediate visual feedback, and keep the diff small and clean.

---

## Feature Requirements: The 30-Second Attendance Sheet

### 1. Header & Filtering Controls
- **Class & Date Selector:** Dropdown to select Class (default: "Grade 10-A") and Date Picker (default: Today).
- **Summary Stat Pill:** Display live counters: `Total: 25 | Present: 22 | Absent: 2 | Late: 1 (92% Present)`.
- **Master Batch Buttons:**
  - `[Mark All Present]` (Emerald button with check icon — 1 click marks all unmarked/absent students as Present).
  - `[Reset All]` (Neutral outlined button).

### 2. High-Density Student Attendance Card Grid
For each student in Grade 10-A:
- **Student Profile:** Avatar, full name, roll number (e.g., `#1004`), and last recorded attendance trend indicator.
- **Interactive Status Toggle Pills:** A group of 4 tactile buttons:
  - `[P]` Present (Active: solid emerald background with white text; Inactive: muted slate).
  - `[A]` Absent (Active: solid rose background with white text; Inactive: muted slate).
  - `[L]` Late (Active: solid amber background with white text; Inactive: muted slate).
  - `[E]` Excused (Active: solid blue background with white text; Inactive: muted slate).
- **Interaction Vibe:**
  - Clicking any status pill instantly toggles the student's status with zero latency (optimistic UI update).
  - The top summary counter updates in real time with a subtle micro-animation.
  - Optional quick note trigger: Clicking a small pencil icon opens an inline note input ("Parent notified - medical appointment").

### 3. Submission & Audio-Visual Confirmation
- Floating bottom action bar on mobile or sticky footer on desktop:
  - `[Save & Finalize Attendance]` button.
  - On click: triggers a celebratory toast notification ("Attendance for Grade 10-A submitted successfully! 24 parents notified.").
  - Changes the status indicator badge from "Draft (Unsaved)" to "Locked & Synced".

---

## Quality & Vibe Checklist
- [ ] No full-page reloads or sluggish spinners.
- [ ] Keyboard accessible: Teachers can use arrow keys and P/A/L shortcuts to fly through the list.
- [ ] Touch targets are at least 44x44px for easy thumb tapping on iPads and phones.
- [ ] Run `/review-ca-agent` on the newly created attendance component to ensure clean React code.
```

---

## Step 7 — Prompt 4: Production Hardening, Validation & Pre-Deployment Audit

> **Mode:** Production Hardening & Pre-Deploy Gate  
> **Goal:** Transition the refined prototype into enterprise-grade production software. Implement runtime validation schemas, secure route middleware, database connection pooling, and verify production builds.

Execute the following prompt:

```markdown
# PROMPT 4 — PRODUCTION HARDENING & PRE-DEPLOYMENT AUDIT

The visual flow and user experience of EduSphere SMS have been thoroughly validated and tuned. Now we must transition this codebase from prototype to **production-hardened SaaS**.

Apply strict engineering controls across validation, security, database persistence, and build stability.

---

## Hardening Tasks

### 1. Strict Runtime Schema Validation (Zod)
- Create `lib/validations/attendance.ts`:
  - Validate attendance submission payloads: `schoolId` (UUID), `classId` (UUID), `date` (ISO string), and array of records `{ studentId: string, status: 'present'|'absent'|'late'|'excused', note?: string }`.
- Create `lib/validations/student.ts`:
  - Validate enrollment forms (names, birth dates, guardian phone numbers, grade levels).

### 2. Multi-Tenant Route Middleware & Auth Guards (`middleware.ts`)
- Protect all `/dashboard/*` routes: Unauthenticated requests automatically redirect to `/login`.
- Enforce role-based access:
  - Teachers can only view and mark attendance for their assigned classes.
  - Invoicing and school billing routes (`/dashboard/invoices`) are restricted to SuperAdmin and Principal roles.
  - Any cross-tenant data access attempt (mismatched `school_id`) immediately aborts with an HTTP 403.

### 3. Error Boundaries & Fallback UI
- Implement `app/dashboard/error.tsx` to catch unexpected client errors gracefully with a friendly recovery button.
- Implement `app/dashboard/loading.tsx` with shimmering skeleton screens matching the exact Bento Grid layout.

### 4. Database Persistence & Connection Pooling
- Configure Prisma or Drizzle ORM client singleton (`lib/db.ts`) with connection pooling for serverless environments.
- Verify that Supabase PostgreSQL Row-Level Security (RLS) policies enforce multi-tenant isolation.

### 5. Production Build & Lint Verification
Execute the following verification steps:
1. Run static type checking: `npx tsc --noEmit`
2. Run linting: `npm run lint`
3. Execute production bundle build: `npm run build`
4. Verify bundle size and ensure server/client component splits are optimized.

---

## Final Audit Report Required
Produce a comprehensive hardening summary:
- Status of Zod validation schemas.
- Route middleware security coverage.
- Lighthouse / Core Web Vitals score projection.
- Production build confirmation.
- Final deployment checklist for Vercel, Supabase, and custom domain setup.
```

---

## Complete Vibe-Coding Workflow Summary & Best Practices

```text
+-------------------------------------------------------------------------------+
|                      THE PRODUCTION VIBE-CODING WORKFLOW                      |
+-------------------------------------------------------------------------------+
|                                                                               |
|  [Step 1] Setup Framework      --> Extract & rename to 'school-management'    |
|                                    Inspect .agents/ and detect IDE.           |
|                                                                               |
|  [Step 2] Prompt 1: Discovery  --> 15-Section Master Prompt. Plan mode only.  |
|                                    Zero premature code. Plan stack & UI/UX.   |
|                                                                               |
|  [Step 3] Human Review         --> Inspect 17-point report.                   |
|                                    Approve color palette, stack & MVP scope.  |
|                                                                               |
|  [Step 4] Prompt 2: Scaffold   --> Next.js 15 + Tailwind + Mock Shell.        |
|                                    Run dev server & test interactive routes.  |
|                                                                               |
|  [Step 5] Prompt 3: Vibe-Tune  --> Karpathy loops: 30-sec Attendance Sheet,   |
|                                    1-click toggle pills, optimistic UI.       |
|                                                                               |
|  [Step 6] Prompt 4: Hardening  --> Zod schemas, auth middleware, RLS,         |
|                                    error boundaries, and 'npm run build'.     |
|                                                                               |
+-------------------------------------------------------------------------------+
```

### Key Vibe-Coding Best Practices
1. **Taste is your superpower**: The AI can write syntax, but you decide whether the interface feels delightful, fast, and effortless. Keep tweaking until it feels right.
2. **Never swallow errors**: If a button feels unresponsive or a layout shifts awkwardly, stop and inspect it immediately using Karpathy's smallest-reproducible-diff rule.
3. **Keep the prompt history clean**: Record successful prompt sequences in `docs/prompts.md` so that future teammates or AI sessions can reproduce your development journey with 100% fidelity.


# Visual Design & UI System Contract

> **Document class:** Living feature/specification  
> **Framework:** Vibe Coding  
> **Guideline baseline:** 2.0.0  
> **Status:** Template; project-specific instantiation requires review  

## Purpose

Design system standards, design tokens, fluid layouts, responsive breakpoints, component states, and micro-interactions.

## Agent read trigger

**MUST** read or consult this file: Before designing or modifying UI components, layouts, sensory effects, animations, or styling.

---

## 1. Design Tokens Specification

### 1.1 Color Roles & Semantic Palette
| Token Name | Dark Mode | Light Mode | Semantic Purpose |
|---|---|---|---|
| `--bg-canvas` | `#070a11` | `#f8fafc` | Deep background canvas |
| `--bg-surface` | `rgba(15, 23, 42, 0.65)` | `rgba(255, 255, 255, 0.90)` | Glassmorphism cards / panels |
| `--border-subtle` | `rgba(255, 255, 255, 0.08)` | `rgba(0, 0, 0, 0.08)` | Subtle container dividers |
| `--primary-accent` | `#06b6d4` (Cyan) | `#0284c7` (Sky Blue) | Interactive actions, active states |
| `--success-state` | `#10b981` (Emerald) | `#059669` (Emerald) | Positive feedback, success alerts |
| `--warning-state` | `#f59e0b` (Amber) | `#d97706` (Amber) | Pending actions, warnings |
| `--error-state` | `#ef4444` (Crimson) | `#dc2626` (Crimson) | Error boundaries, failure alerts |
| `--text-main` | `#f8fafc` | `#0f172a` | High-contrast body typography |
| `--text-muted` | `#94a3b8` | `#64748b` | Secondary descriptions, captions |

### 1.2 Standardized Sizing & Spacing Scale (4px/8px Grid)
All UI components, padding, margins, card dimensions, and iconography MUST strictly adhere to the standardized 4px/8px modular scale:

| Token | Dimension | Rem Equiv. | Standardized UI Application |
|---|---|---|---|
| `--size-1` | `4px` | `0.25rem` | Micro-spacing, inline badges, tight borders |
| `--size-2` | `8px` | `0.50rem` | Icon gaps, compact chip padding, form field vertical gutters |
| `--size-3` | `12px` | `0.75rem` | Mobile card gutters, button horizontal padding (compact) |
| `--size-4` | `16px` | `1.00rem` | Standard component padding, base input height offsets |
| `--size-5` | `20px` | `1.25rem` | Section gutters, standard icon bounding boxes |
| `--size-6` | `24px` | `1.50rem` | Card padding, header heights, desktop grid gutters |
| `--size-8` | `32px` | `2.00rem` | Modal dialog gutters, container padding |
| `--size-11` | `44px` | `2.75rem` | **Minimum Touch Target** (WCAG 2.1 AA accessibility requirement) |
| `--size-12` | `48px` | `3.00rem` | Standard button and input field height |
| `--size-16` | `64px` | `4.00rem` | Navigation bar heights, major milestone spacing |

---

## 2. Dynamic Responsive Breakpoints Matrix

Layouts must be 100% fluid and dynamically responsive across all monitor sizes. Fixed widths (e.g. `1440px`) are strictly prohibited.

```mermaid
flowchart LR
    classDef bp fill:#2e1065,stroke:#c084fc,stroke-width:1.5px,color:#faf5ff;

    Mobile["<b>📱 Mobile (&lt; 640px)</b><br/><small>1-Column Stack • 12px Gutters</small>"]:::bp
    Tablet["<b>📟 Tablet (640px–1024px)</b><br/><small>2-Column Bento • 16px Gutters</small>"]:::bp
    Desktop["<b>💻 Desktop (1024px–1440px)</b><br/><small>3–4 Columns • 20px Gutters</small>"]:::bp
    Ultrawide["<b>🖥️ Ultra-Wide (&gt; 1440px)</b><br/><small>Fluid Auto-Grid • 24px Gutters</small>"]:::bp

    Mobile -->|"Fluid Expand"| Tablet
    Tablet -->|"Fluid Expand"| Desktop
    Desktop -->|"Fluid Expand"| Ultrawide
```

| Breakpoint Name | Viewport Width | Grid Behavior | Padding / Gutters |
|---|---|---|---|
| **Mobile (`sm`)** | `< 640px` | Single column stack; full-width cards | `12px` gutters |
| **Tablet (`md`)** | `640px – 1024px` | 2-column bento grid; collapsible sidebars | `16px` gutters |
| **Desktop (`lg`)** | `1024px – 1440px`| 3 to 4 columns (`minmax(300px, 1fr)`) | `20px` gutters |
| **Ultra-Wide (`xl/2k/4k`)** | `> 1440px` | 100% fluid auto-fill grid; no max-width clamping | `24px` gutters |

---

## 3. Comprehensive Component State Matrix

| State | Visual Treatment | Micro-Interaction |
|---|---|---|
| **Default** | Balanced contrast, smooth borders. | Base elevation. |
| **Hover** | Glow or scale micro-transition (`scale(1.02)`). | Fast 150ms spring transition. |
| **Active / Pressed**| Tactile compression (`scale(0.98)`). | Instant feedback. |
| **Focus Visible** | High-contrast accent ring. | Fully accessible keyboard outline. |
| **Disabled** | Dimmed opacity, neutral cursor. | Excluded from tab index. |
| **Loading** | Fluid shimmer skeleton. | Prevents layout shifts. |
| **Empty State** | Friendly visual illustration + CTA. | Guides next user action. |
| **Error State** | Crimson boundary highlight with clear guidance. | Immediate corrective prompt. |

---

## 4. Visual Quality Gates

- **MUST** provide instant visual feedback on user inputs.
- **MUST** support seamless light/dark theme switching.
- **MUST** look balanced and polished across all resolutions from mobile screens to 4K ultrawide monitors.

---

## 5. Staged Web Application Lifecycle (Frontend-First Verification)

For websites and web applications, development MUST follow strict staged sequencing:
1. **Stage A (Frontend First & Interactive Demo):** Build UI components, responsive layouts, mock data state, and interactive controls first. Run `/run-ca-agent` and verify design aesthetics, user flows, and features interactively in the browser during a live demo.
2. **Stage B (Backend Integration):** Only after frontend design, layout, and feature workflows are completely approved by the developer during the demo run, proceed to backend API implementation and database persistence.
3. **Stage C (Security & Hardening):** Implement authentication, permissions, and security controls.
4. **Stage D (Production Readiness):** Run automated test suites and finalize deployment checklists.

## Evidence and change control

- **MUST** record owner, revision/date, and traceable evidence in the applicable project instantiation.
- **MUST** route process changes through formal baseline revisions and living feature specifications.

## Vibe Coding interpretation

- Treat living plans, design tokens, and sensory specifications as authoritative guides for implementation.

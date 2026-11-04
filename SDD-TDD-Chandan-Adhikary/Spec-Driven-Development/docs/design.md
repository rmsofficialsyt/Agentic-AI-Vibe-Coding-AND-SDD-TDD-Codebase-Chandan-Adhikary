# Design

> **Document class:** Living feature/specification  
> **Framework:** SDD  
> **Guideline baseline:** 1.0.0  
> **Status:** Template; project-specific content requires review  

## Purpose

UI, interaction and visual design contract.

## Agent read trigger

**MUST** read or consult this file: Before UI changes, accessibility and visual QA.

## Normative sections and rules

### 1. Design intent

- **MUST** — Document target journeys, approved references and design principles.

### 2. Tokens

- **MUST** — Specify approved color roles, typography, spacing, radius, motion and responsive breakpoints.

### 3. Screens

- **MUST** — Define screen inventory, navigation, layout and important states.

### 4. Components

- **MUST** — Define reusable components, variants, semantics and interaction patterns.

### 5. State coverage

- **MUST** — Specify loading, empty, error, success, disabled, validation and offline states where relevant.

### 6. Accessibility

- **MUST** — Document focus, keyboard, contrast, labels, assistive-technology behavior and reduced motion.

### 7. Visual QA

- **MUST** — Specify reference viewport/device, screenshots and acceptable deviation criteria.

### 8. Asset rights

- **MUST** — Record license/ownership and appropriate attribution for imagery, fonts and icons.

### 9. Motion

- **SHOULD** — Use restrained interactions that support clarity and performance.

## Evidence and change control

- **MUST** record owner, revision/date, relevant approval reference, and traceable evidence in the applicable project instantiation.
- **MUST** route changes to process rules through `docs/guideline-CHANGELOG.md` and formal baseline revision; route feature behavior through approved versioned specs and `docs/CHANGELOG.md`.
- **SHOULD** keep links to canonical artifacts instead of duplicating definitions.

## SDD enforcement

- **MUST** verify the latest approved feature spec version before changing implementation.
- **MUST** stop if this document conflicts with approved guidelines; pursue a guideline revision rather than an implicit exception.

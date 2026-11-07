# Project-Manager-Dashboard (In-IDE Subproject)

> **Local Machine Only** | **Never Pushed to Remote Repositories** | **Strictly In-IDE Interface**

---

## 🌟 Overview

The **Project-Manager-Dashboard** is an embedded telemetry mission control designed exclusively for local IDE development within the **Spec-Driven Development (SDD-TDD)** framework.

It tracks project progress in real-time by inspecting:
- `docs/task.md` (Granular tasks, micro-subtasks, checklist states, priority tags)
- `docs/phases.md` (Milestone progress and exit gate criteria)
- `specs/*.md` (Acceptance Criteria contract assertions: `AC-*`)
- `docs/error-tracker.md` (Active P0/P1 blockers)
- Local Git telemetry (branch status, dirty files, micro-commits)

---

## ⚡ Quick Start (Inside Your IDE)

### 1. Start the Local Daemon
In your terminal or command prompt:
```bash
# Windows
open-in-ide.bat

# macOS / Linux
bash open-in-ide.sh

# Or directly with Node:
node server.js
```

### 2. Dock the Dashboard in Your IDE (Zero External Browser)
1. In your IDE (Cursor / VS Code / Windsurf / Antigravity), press:
   - **Windows/Linux:** `Ctrl + Shift + P`
   - **macOS:** `Cmd + Shift + P`
2. Type **`Simple Browser: Show`** and press **Enter**.
3. In the URL prompt, enter:
   ```text
   http://127.0.0.1:4200
   ```
4. Drag the tab to **Editor Group 2** (docked to the right of your active code editor).

The dashboard will now live side-by-side with your code, updating in real-time as you and your AI agents edit project files.

---

## 🛡️ Git Exclusion

This folder is excluded from Git tracking in `.gitignore`:
```gitignore
Project-Manager-Dashboard/
```
No files inside this directory will ever be committed or pushed to GitHub.


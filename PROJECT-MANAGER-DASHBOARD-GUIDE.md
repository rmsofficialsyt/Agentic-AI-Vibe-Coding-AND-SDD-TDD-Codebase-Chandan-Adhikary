# In-IDE Project-Manager-Dashboard: Step-by-Step Master Guide
### Zero-Dependency, Real-Time Mission Control for SDD-TDD & Vibe-Coding Frameworks

<div align="center">

[![Mission Control](https://img.shields.io/badge/Telemetry-In--IDE_Mission_Control-blue?style=for-the-badge&logo=visualstudiocode)](.)
[![Ports](https://img.shields.io/badge/Ports-4200_(SDD)_|_4201_(Vibe)-indigo?style=for-the-badge)](.)
[![Zero Dependencies](https://img.shields.io/badge/Dependencies-Zero_External_(Native_Node.js)-teal?style=for-the-badge)](.)
[![Security](https://img.shields.io/badge/Security-Local_127.0.0.1_Only-green?style=for-the-badge)](.)

**Engineering Lead:** Chandan Adhikary · **Standard:** Production-Grade Universal Release  
**Compatibility:** VS Code · Cursor · Windsurf · Antigravity · Webkit / Chromium

[🏛️ Architecture](#1-architectural-overview--design-philosophy) • [⚡ Quick-Start](#2-quick-start-launching-the-dashboard) • [🖥️ IDE Docking](#3-step-by-step-ide-docking-setup) • [📊 Telemetry Modules](#4-key-features--visual-telemetry-modules) • [🔒 Security](#6-security-model--data-privacy) • [🔧 Troubleshooting](#7-troubleshooting--faq)

</div>

---

## 1. Architectural Overview & Design Philosophy

The **Project-Manager-Dashboard** is a zero-dependency, Apple/Linear and Shadcn UI-inspired telemetry dashboard designed specifically for local development workflows. It runs side-by-side with your code inside the IDE, providing live visibility into tasks, acceptance criteria contracts, git commits, milestones, error triage, logs, and AI agent token consumption.

```mermaid
flowchart TD
    subgraph Workspace ["Active IDE Workspace"]
        Tasks["docs/task.md<br/>(Task Hierarchy & State)"]
        Phases["docs/phases.md<br/>(Milestone Gates)"]
        Features["docs/features/**/*.md<br/>(AC Given/When/Then Specs)"]
        Errors["docs/error-tracker.md<br/>(Defect & SLA Matrix)"]
        GitRepo[".git Metadata<br/>(Commits, Branches, Diffs)"]
        Logs["logs/*.log<br/>(Development & Error Streams)"]
        Transcripts["Agent JSONL Transcripts<br/>(Token Telemetry & Cache Hits)"]
    end

    subgraph LocalDaemon ["Zero-Dependency Local Daemon (Native Node.js)"]
        Parser["parser.js<br/>(AST & Regex Extractors)"]
        Server["server.js<br/>(HTTP, SSE, CSRF Guard)"]
        SecurityGuard["127.0.0.1 Binding & Host Check<br/>(DNS-Rebinding Protection)"]
    end

    subgraph ViewportTier ["In-IDE Simple Browser / Native Browser"]
        DashboardUI["Dashboard Viewport (Fluid Bento Grid)<br/>• Active Running Task at Index 0<br/>• Pinned HEAD Git Commit (DD-MM-YYYY)<br/>• Interactive AC Engine & Prev Error Tracker<br/>• Live Logs Explorer & Token Health"]
    end

    Workspace --> Parser
    Parser --> Server
    SecurityGuard --> Server
    Server -->|"Live SSE Telemetry / REST API"| DashboardUI
    DashboardUI -.->|"Interactive Toggles / CSRF Verified"| Server
    Server -.->|"Safe Persistence"| Workspace
```

### Core Design Principles
1. **Zero External Dependencies:** Built using standard Node.js native modules (`http`, `fs`, `path`, `crypto`) with vanilla ES6+ and modern CSS variables. No `npm install` or node_modules required.
2. **Dual-Track Port Isolation:** Runs isolated instances without port collisions:
   - **Port `4200`:** Spec-Driven Development (`SDD-TDD-Chandan-Adhikary/Spec-Driven-Development/`)
   - **Port `4201`:** Vibe-Coding (`Vibe-Coding-Chandan-Adhikary/Vibe-Coding/`)
3. **100% Fluid & Dynamic Layout:** No hardcoded widths. Smoothly scales across compact split editor panes, full vertical monitor orientations, and 4K Ultrawide setups.
4. **Strict Security Sandbox:** Binds exclusively to `127.0.0.1`, enforces origin validation, and issues per-session CSRF security tokens (`X-Dashboard-Token`).

```mermaid
flowchart LR
    subgraph SDDInstance ["Port 4200: SDD-TDD Track"]
        SDDServer["SDD Daemon<br/>(server.js --port=4200)"]
        SDDTarget["SDD Workspace<br/>(Spec-Driven-Development/)"]
    end

    subgraph VibeInstance ["Port 4201: Vibe-Coding Track"]
        VibeServer["Vibe Daemon<br/>(server.js --port=4201)"]
        VibeTarget["Vibe Workspace<br/>(Vibe-Coding/)"]
    end

    subgraph BrowserClient ["Localhost Clients"]
        Client1["IDE Editor 1<br/>http://127.0.0.1:4200"]
        Client2["IDE Editor 2<br/>http://127.0.0.1:4201"]
    end

    SDDServer <--> SDDTarget
    VibeServer <--> VibeTarget
    Client1 <--> SDDServer
    Client2 <--> VibeServer
```

---

## 2. Quick-Start: Launching the Dashboard

You can start the dashboard using any of three methods based on your preferred workflow.

### Method A: Slash Command (Inside Agent Chat)
Simply trigger the registered slash command inside your AI assistant chat window:
```text
/dashboard-ca-agent
```
The agent executes the background runner, verifies port health, and returns the direct local URL.

---

### Method B: Native Shell Launchers (One-Click)

#### On Windows:
Open PowerShell or Command Prompt in the project folder and run:
```powershell
# For SDD-TDD Track
cd SDD-TDD-Chandan-Adhikary\Spec-Driven-Development\Project-Manager-Dashboard
.\open-in-ide.bat

# For Vibe-Coding Track
cd Vibe-Coding-Chandan-Adhikary\Vibe-Coding\Project-Manager-Dashboard
.\open-in-ide.bat
```

#### On macOS & Linux:
Open Terminal in the project directory:
```bash
# For SDD-TDD Track
cd SDD-TDD-Chandan-Adhikary/Spec-Driven-Development/Project-Manager-Dashboard
chmod +x open-in-ide.sh
./open-in-ide.sh

# For Vibe-Coding Track
cd Vibe-Coding-Chandan-Adhikary/Vibe-Coding/Project-Manager-Dashboard
chmod +x open-in-ide.sh
./open-in-ide.sh
```

---

### Method C: Direct Node.js Invocation
Run the server daemon directly with Node.js (v16+ recommended):
```bash
# SDD-TDD Track (Default Port 4200)
node SDD-TDD-Chandan-Adhikary/Spec-Driven-Development/Project-Manager-Dashboard/server.js

# Vibe-Coding Track (Default Port 4201)
node Vibe-Coding-Chandan-Adhikary/Vibe-Coding/Project-Manager-Dashboard/server.js
```

---

## 3. Step-by-Step IDE Docking Setup

For the ultimate distraction-free developer experience, dock the dashboard directly inside your IDE alongside your code.

```mermaid
flowchart TD
    subgraph IDEWindow ["IDE Workspace Window (VS Code / Cursor / Windsurf / Antigravity)"]
        direction LR
        subgraph EditorGroup1 ["Editor Group 1 (Left 60%)"]
            SourceCode["Active Source Code & Specs<br/>• src/auth/login.ts<br/>• docs/features/002-student-enrollment.md"]
        end
        subgraph EditorGroup2 ["Editor Group 2 (Right 40%)"]
            SimpleBrowser["Docked Simple Browser<br/>• http://127.0.0.1:4200 (SDD)<br/>• http://127.0.0.1:4201 (Vibe)<br/>⚡ Current Task Floating on Top<br/>📅 HEAD Commit on Top"]
        end
    end
    subgraph TerminalPane ["Integrated Terminal (Bottom)"]
        DevServer["Active Dev Server / Test Suite / logs/ Streams"]
    end
```

### 4-Step Docking Instructions:
1. **Open Command Palette:**
   - **Windows / Linux:** Press `Ctrl + Shift + P`
   - **macOS:** Press `Cmd + Shift + P`
2. **Launch Internal Browser:**
   - Type **`Simple Browser: Show`** and press **Enter**.
3. **Enter Local URL:**
   - For SDD-TDD: `http://127.0.0.1:4200`
   - For Vibe-Coding: `http://127.0.0.1:4201`
4. **Dock Side-by-Side:**
   - Drag the newly opened Simple Browser tab header over to the right half of your editor window (**Editor Group 2**).
   - Release the mouse when the vertical split drop zone highlights.

> [!TIP]
> The dashboard automatically polls for changes every 2 seconds. When you or your AI agent edit `docs/task.md`, change a test status, or make a git commit, the dashboard updates immediately without manual page refreshes.

---

## 4. Key Features & Visual Telemetry Modules

### 1. Actively Running Task Floats to Top
- **Dynamic Prioritization:** Whichever task is actively flagged as in-progress (`Task 1`, `Task 2`, `IN_PROGRESS`, `RED_TEST_FAIL`, or `RUNNING`) automatically floats to **index 0** at the very top of the Task Command Center.
- **Visual Callout:** Highlighted with a luminous `⚡ CURRENT RUNNING TASK` badge and dedicated status ring.
- **Sequential Preservation:** Completed and pending tasks preserve their logical numerical order beneath the active task.

### 2. Ubiquitous Dates in DD-MM-YYYY
- All timestamps across the dashboard strictly conform to **`DD-MM-YYYY`** formatting:
  - **Live Header Clock:** Real-time clock with seconds and current day (`DD-MM-YYYY HH:mm:ss`).
  - **Task Start & Stop Chips:** Explicit micro-badges (`🟢 Start: 14-11-2026`, `⏹️ Stop: 14-11-2026`).
  - **Milestone & Phase Cards:** Delivery deadlines and completion gates formatted in `DD-MM-YYYY`.
  - **Git Commits Feed:** Every commit timestamp rendered as `DD-MM-YYYY`.

### 3. HEAD Git Commit Always Pinned on Top
- The latest commit to the repository is locked at index 0 of the Git Telemetry panel.
- Badged with a distinct `[HEAD / CURRENT COMMIT]` indicator, short commit hash, commit message, and author info.

### 4. Interactive Acceptance Criteria (AC) Contract Engine
- Automatically parses all spec files in `docs/features/**/spec.md` or flat `docs/features/*.md`.
- Displays individual `AC-FEAT###-##` criteria cards with Given / When / Then scenario breakdown and test traceability mapping.

```mermaid
stateDiagram-v2
    [*] --> PENDING: Ingest Spec (AC-FEAT###-##)
    PENDING --> RED_FAIL: Test Scaffolding (/testing-ca-agent)
    RED_FAIL --> GREEN_PASS: Implementation Satisfied (/tdd-ca-agent)
    GREEN_PASS --> PENDING: Spec Revision / Change Request
    GREEN_PASS --> [*]: Phase Exit Gate Approved
```

### 5. AI Model Profiles & Token Telemetry
- **Model Profile Auto-Detection:** Automatically detects whether you are running Gemini (`gemini-2.5-pro`, `gemini-2.5-flash`), Claude (`claude-3-7-sonnet`), or GPT models.
- **Context Capacity Gauges:** Visual progress bars displaying current context utilization against maximum capacity (e.g., 1M, 200k tokens).
- **Multi-Window Rate Limiting:** Monitors 5-hour rolling windows, hourly limits, and daily consumption with automatic reset countdown timers.

### 6. Prev Error Tracking (Preventive & Defect Matrix)
- **Dedicated Navigation Bar Item:** Quick access with a real-time red badge showing active defect counts (`#nav-errors`, hotkey `7` or `E`).
- **4-Card Bento Summary:** Visual metrics displaying Active Defects, Resolved count, P0 Blocker alerts, and SLA Triage Health percentage.
- **Filter Tabs & Instant Search:** Filter defects instantly by `ALL`, `ACTIVE`, `RESOLVED`, `P0/P1`, or by typing keywords (ID, path, summary).
- **Interactive Radix Sheet Defect Inspector:** Click any defect row to view full root cause analysis, stack traces, impacted paths, and toggle status between `ACTIVE` and `RESOLVED` with 1-click Markdown persistence back to `docs/error-tracker.md`.

### 7. One-Click Pipeline Action Terminal
The dashboard features an integrated command center for triggering automated actions:
- **Run Tests (`btn-run-tests`):** Executes unit and integration test suites.
- **Spec Check (`btn-spec-check`):** Validates spec traceability and acceptance criteria compliance.
- **Code Review (`btn-code-review`):** Audits uncommitted diffs for anti-patterns and lint errors.
- **Security Audit (`btn-security-audit`):** Scans for exposed API keys, secret leaks, and insecure dependencies.
- **Release Verification (`btn-release-verify`):** Runs pre-flight ship/no-ship quality gate checks.

### 8. Live Development Logs Explorer (`logs/` Directory)
The dashboard includes a dedicated Live Development Logs Explorer integrated directly into the navigation bar (`#nav-logs`, hotkey `8` or `L`):
- **Real-Time Navigation Badge:** Displays total count of active `.log` files in the dedicated `logs/` folder (`dev.log`, `test.log`, `server.log`, `error.log`).
- **Log Stream Selector & Tail Controls:** Switch between log streams, tail last 50-500 lines, search keywords, and toggle auto-scroll.
- **Semantic Highlighting:** Distinct monospace line styling for error (red), warn (amber), success (green), and info (cyan).

---

## 5. Configuration & Environment Variables

| Variable | Default Value | Description |
| :--- | :--- | :--- |
| `DASHBOARD_PORT` | `4200` (SDD) / `4201` (Vibe) | Port on which the HTTP daemon listens. |
| `DASHBOARD_PROJECT_ROOT` | Current framework root | Overrides the root directory parsed for docs and git telemetry. |
| `DASHBOARD_TRANSCRIPT` | Auto-detected newest JSONL | Absolute path to agent conversation transcript log for token telemetry. |
| `POLL_INTERVAL_MS` | `2000` | Frontend polling interval in milliseconds. |

---

## 6. Security Model & Data Privacy

```mermaid
sequenceDiagram
    autonumber
    participant Client as Simple Browser (127.0.0.1)
    participant Server as server.js (Local Daemon)
    participant FS as Local Filesystem (docs/)

    Client->>Server: GET / (Initial Page Load)
    Note over Server: Generates per-process CSRF token (X-Dashboard-Token)<br/>Validates Host Header: 127.0.0.1
    Server-->>Client: 200 OK (index.html with injected session token)

    Client->>Server: POST /api/action { action: "run-tests" }<br/>Header: X-Dashboard-Token
    Note over Server: Validates Token & Same-Origin<br/>Rejects non-127.0.0.1 DNS Rebinding
    Server->>FS: Reads docs/task.md & Executes Test Runner
    FS-->>Server: Output / Results
    Server-->>Client: 200 OK { success: true, output: "..." }
```

### Security Directives:
- **127.0.0.1 Binding Only:** Strictly rejects all external and non-local network traffic.
- **DNS-Rebinding Protection:** Validates incoming `Host` headers; drops non-whitelisted requests.
- **CSRF Token Validation:** Mutating endpoints require an `X-Dashboard-Token` issued uniquely per server process.
- **Read-Only Code Isolation:** The daemon reads markdown documentation, git metadata, and local agent logs. It never modifies application source code without explicit user action.

---

## 7. Troubleshooting & FAQ

### Q1: The port is already in use (`EADDRINUSE: 4200` / `4201`).
**Resolution:**
Terminate any orphaned server instance:
```powershell
# Windows
Get-Process -Name node | Where-Object { $_.CommandLine -like "*server.js*" } | Stop-Process

# macOS / Linux
lsof -ti:4200 | xargs kill -9
lsof -ti:4201 | xargs kill -9
```

### Q2: "Failed to save file: The content of the file is newer" warning appears in the IDE.
**Resolution:**
This occurs when Git touches file timestamps during commits. Click **"Overwrite"** on the notification, or run **`File: Revert File`**. The `.gitattributes` file in the repository root guarantees consistent LF endings to prevent recurring conflicts.

### Q3: How do I test the dashboard engines?
**Resolution:** Run the dedicated test suites:
```bash
# SDD-TDD Track
node SDD-TDD-Chandan-Adhikary/Spec-Driven-Development/tests/test_token_telemetry.js
node SDD-TDD-Chandan-Adhikary/Spec-Driven-Development/tests/test_ac_contracts.js
node SDD-TDD-Chandan-Adhikary/Spec-Driven-Development/tests/test_error_tracker.js
node SDD-TDD-Chandan-Adhikary/Spec-Driven-Development/tests/test_logs_feature.js

# Vibe-Coding Track
node Vibe-Coding-Chandan-Adhikary/Vibe-Coding/tests/test_token_telemetry.js
node Vibe-Coding-Chandan-Adhikary/Vibe-Coding/tests/test_ac_contracts.js
node Vibe-Coding-Chandan-Adhikary/Vibe-Coding/tests/test_error_tracker.js
node Vibe-Coding-Chandan-Adhikary/Vibe-Coding/tests/test_logs_feature.js
```

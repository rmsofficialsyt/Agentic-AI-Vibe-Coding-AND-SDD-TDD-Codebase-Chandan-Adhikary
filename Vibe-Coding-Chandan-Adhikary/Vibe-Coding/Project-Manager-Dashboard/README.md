# Project-Manager-Dashboard (In-IDE Subproject)
### Local-Only, Zero-Dependency Telemetry Mission Control for Vibe-Coding

<div align="center">

[![Port](https://img.shields.io/badge/Port-4201-purple?style=for-the-badge&logo=visualstudiocode)](.)
[![Runtime](https://img.shields.io/badge/Runtime-Native_Node.js-green?style=for-the-badge&logo=nodedotjs)](.)
[![Dependencies](https://img.shields.io/badge/Dependencies-Zero_External-teal?style=for-the-badge)](.)
[![Security](https://img.shields.io/badge/Security-Local_127.0.0.1_Only-red?style=for-the-badge)](.)

**Framework Track:** Vibe-Coding · **Host Mode:** In-IDE Simple Browser & Local Daemons  
**Access URL:** `http://127.0.0.1:4201` · **Git Status:** Strictly Gitignored / Machine-Local Only

[🌟 Overview](#-overview) • [🏛️ Architecture](#️-mission-control-architecture) • [⚡ Quick Start](#-quick-start-inside-your-ide) • [📊 Telemetry Modules](#-visual-telemetry-modules) • [🔒 Security Model](#-security-model)

</div>

---

## 🌟 Overview

The **Project-Manager-Dashboard** is an embedded telemetry mission control designed exclusively for local IDE development within the **Vibe-Coding** framework. It runs side-by-side with your code in an IDE split tab (Simple Browser), providing immediate, real-time visibility into prototype iterations, living feature contracts, visual UI milestones, git commits, and agent token usage.

```mermaid
flowchart TD
    subgraph FilesystemState ["Local Filesystem Data Ingestion"]
        Tasks["docs/task.md<br/>(Task Hierarchy & Vibe Iterations)"]
        Phases["docs/phases.md<br/>(Milestone Gate Progress)"]
        LivingSpecs["docs/features/**/*.md<br/>(Living Feature Contracts)"]
        Errors["docs/error-tracker.md<br/>(Defect & Blocker Matrix)"]
        GitMeta[".git Repository<br/>(HEAD, Log, Diff, Branches)"]
        LogsStream["logs/*.log<br/>(dev.log, server.log, error.log)"]
        Transcripts["Agent JSONL Transcripts<br/>(Context Tokens & Hit Rates)"]
    end

    subgraph DaemonEngine ["Node.js Local Daemon (server.js + parser.js)"]
        Watcher["File Polling Engine (Every 2s)"]
        ASTParser["parser.js AST Extractors"]
        SecFilter["Host Header & DNS-Rebind Guard"]
        CSRFManager["X-Dashboard-Token Injector"]
    end

    subgraph UIClient ["In-IDE Simple Browser (http://127.0.0.1:4201)"]
        TaskFloater["⚡ Active Running Task Floated to Top"]
        CommitFeed["📅 Pinned HEAD Commit with DD-MM-YYYY Dates"]
        ACMatrix["Interactive Living Contract Engine"]
        ErrorInspector["Prev Error Tracker & Radix Sheet Inspector"]
        LogViewer["Live Logs Stream Explorer & Search"]
    end

    FilesystemState --> Watcher
    Watcher --> ASTParser
    SecFilter --> DaemonEngine
    CSRFManager --> DaemonEngine
    ASTParser --> UIClient
```

---

## 🏛️ Mission Control Architecture

### Dynamic Prioritization Pipeline
The dashboard dynamically prioritizes the items developers care about most:

```mermaid
flowchart LR
    subgraph TaskStream ["Task Re-Ordering Engine"]
        IncomingTasks["Raw Task List<br/>(Task 1, Task 2, Task 3...)"] --> StateCheck{"Is Any Task<br/>IN_PROGRESS / RUNNING<br/>or RED_TEST_FAIL?"}
        StateCheck -->|"Yes: Match Found"| FloatTop["Float Task to Index 0<br/>Badge: ⚡ CURRENT RUNNING TASK"]
        StateCheck -->|"No: All Idle"| NaturalOrder["Preserve Natural Order"]
    end

    subgraph GitStream ["Git Telemetry Engine"]
        GitLog["Raw Git Log"] --> PinHead["Pin Latest Commit to Top<br/>Badge: [HEAD / CURRENT COMMIT]<br/>Date: 📅 DD-MM-YYYY"]
    end
```

---

## ⚡ Quick Start (Inside Your IDE)

### 1. Start the Local Daemon
In your terminal or command prompt:
```bash
# Windows
open-in-ide.bat

# macOS / Linux
bash open-in-ide.sh

# Or directly with Node.js (Port 4201):
node server.js
```

### 2. Dock the Dashboard in Your IDE (Side-by-Side Viewport)
```mermaid
flowchart TD
    subgraph IDEWindow ["IDE Editor Window"]
        direction LR
        subgraph Col1 ["Editor Group 1 (Active Code)"]
            Code["src/components/hero.tsx<br/>docs/design.md"]
        end
        subgraph Col2 ["Editor Group 2 (Simple Browser Tab)"]
            Dash["http://127.0.0.1:4201<br/>Project-Manager-Dashboard"]
        end
    end
```

1. In your IDE (Cursor, VS Code, Windsurf, Antigravity), press `Ctrl + Shift + P` (or `Cmd + Shift + P` on macOS).
2. Type **`Simple Browser: Show`** and press **Enter**.
3. In the URL prompt, enter:
   ```text
   http://127.0.0.1:4201
   ```
4. Drag the tab to **Editor Group 2** (docked to the right of your active editor).

---

## 📊 Visual Telemetry Modules

1. **Active Running Task on Top:** Whichever task is in progress (`IN_PROGRESS`, `RUNNING`) automatically floats to the top of the Kanban with a highlighted `⚡ CURRENT RUNNING TASK` badge.
2. **HEAD Commit Pinned on Top:** The latest commit is locked at Index 0 with an exact `📅 DD-MM-YYYY` timestamp and author chip.
3. **Living Feature Contract Engine:** Live inspection of living specifications in `docs/features/` with clickable status toggling (`GREEN` / `RED` / `PENDING`).
4. **Prev Error Tracker:** Defect triage matrix with instant search, P0 blocker tracking, and 1-click status persistence to `docs/error-tracker.md`.
5. **Live Logs Explorer:** Real-time stream viewing of `logs/dev.log`, `logs/server.log`, and `logs/error.log` with semantic line highlighting.
6. **Token Telemetry:** Active context usage, cache hit rate, and session savings tracking.

---

## 🔒 Security Model

```mermaid
sequenceDiagram
    autonumber
    participant IDE as IDE Simple Browser
    participant Daemon as server.js (127.0.0.1:4201)
    participant Core as docs/ & src/

    IDE->>Daemon: GET / (Initial Connect)
    Note over Daemon: Validates Host Header: 127.0.0.1:4201<br/>Generates Unique Process CSRF Token
    Daemon-->>IDE: 200 OK (Injected with X-Dashboard-Token)

    IDE->>Daemon: POST /api/action (Trigger Run / Spec Check)<br/>Header: X-Dashboard-Token
    Note over Daemon: Checks CSRF Token & Same-Origin<br/>Blocks External Traffic
    Daemon->>Core: Executes Action via Child Process
    Core-->>Daemon: Command Output
    Daemon-->>IDE: 200 OK { success: true, output: "..." }
```

- **Localhost 127.0.0.1 Binding Only:** Strictly rejects all external and LAN network traffic.
- **DNS-Rebinding Protection:** Rejects any HTTP request whose `Host` header does not match `127.0.0.1:4201` or `localhost:4201`.
- **CSRF Token Validation:** All mutating requests require a valid per-process `X-Dashboard-Token`.
- **Source Code Protection:** Server daemon is strictly read-only regarding application source code.

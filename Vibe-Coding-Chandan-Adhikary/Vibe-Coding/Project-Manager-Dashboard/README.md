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
flowchart TB
    classDef store fill:#1e293b,stroke:#64748b,stroke-width:1.5px,color:#f8fafc;
    classDef daemon fill:#2e1065,stroke:#c084fc,stroke-width:2px,color:#faf5ff;
    classDef client fill:#0f172a,stroke:#38bdf8,stroke-width:2px,color:#f8fafc;
    classDef sec fill:#451a03,stroke:#fbbf24,stroke-width:2px,color:#fffbeb;

    subgraph FilesystemState ["📁 LOCAL WORKSPACE ARTIFACTS & DATA STREAMS"]
        direction LR
        Tasks[("<b>📋 docs/task.md</b><br/><small>Tasks</small>")]:::store
        Phases[("<b>🏁 docs/phases.md</b><br/><small>Milestones</small>")]:::store
        LivingSpecs[("<b>📑 docs/features/</b><br/><small>Specs</small>")]:::store
        Errors[("<b>🐛 docs/error-tracker.md</b><br/><small>Defects</small>")]:::store
        GitMeta[("<b>🗄️ .git/ Repo</b><br/><small>HEAD Commit</small>")]:::store
        LogsStream[("<b>🪵 logs/*.log</b><br/><small>Log Streams</small>")]:::store
        Transcripts[("<b>🤖 JSONL Logs</b><br/><small>Tokens</small>")]:::store
    end

    subgraph DaemonEngine ["⚙️ ZERO-DEPENDENCY LOCAL DAEMON (PORT 4201)"]
        direction LR
        Watcher[["<b>📁 File Watcher</b><br/><small>Poll 2s</small>"]]:::daemon
        ASTParser[["<b>🔍 parser.js AST</b><br/><small>JSON Synthesizer</small>"]]:::daemon
        Server[["<b>🔌 server.js Daemon</b><br/><small>Port 4201</small>"]]:::daemon
        SecFilter["<b>🛡️ DNS-Rebind</b><br/><small>Host Guard</small>"]:::sec
        CSRFManager["<b>🔑 CSRF Guard</b><br/><small>Token Injector</small>"]:::sec
    end

    subgraph UIClient ["🖥️ IN-IDE SIMPLE BROWSER (http://127.0.0.1:4201)"]
        DashboardUI["<b>📊 Mission Control Bento Viewport</b><br/><small>Active Task • HEAD Commit • Contract Engine • Logs • Gauges</small>"]:::client
    end

    FilesystemState -->|"Real-Time Watch"| Watcher
    Watcher -->|"Raw Content"| ASTParser
    ASTParser -->|"Synthesized State"| Server
    SecFilter -->|"Enforces Isolation"| Server
    CSRFManager -->|"Session Token"| Server
    Server ==>|"⚡ Live SSE Telemetry"| DashboardUI
    DashboardUI -.->|"🔒 Interactive Action"| Server
```

---

## 🏛️ Mission Control Architecture

### Dynamic Prioritization Pipeline
The dashboard dynamically prioritizes the items developers care about most:

```mermaid
flowchart LR
    classDef active fill:#451a03,stroke:#fbbf24,stroke-width:2px,color:#fffbeb;
    classDef normal fill:#1e293b,stroke:#64748b,stroke-width:1.5px,color:#f8fafc;
    classDef git fill:#082f49,stroke:#38bdf8,stroke-width:2px,color:#f0f9ff;

    subgraph TaskStream ["📋 TASK STREAM RE-ORDERING ENGINE"]
        IncomingTasks["<b>Raw Task List</b><br/><small>Task 1, Task 2, Task 3...</small>"]:::normal --> StateCheck{"Task Active?"}
        StateCheck -->|"Yes"| FloatTop["<b>⚡ CURRENT RUNNING TASK</b><br/><small>Dynamically Floated to Index 0</small>"]:::active
        StateCheck -->|"No"| NaturalOrder["<b>Preserve Order</b><br/><small>Sequential Numbering</small>"]:::normal
    end

    subgraph GitStream ["🗄️ GIT TELEMETRY STREAM"]
        GitLog["<b>Raw Git Log</b><br/><small>Recent Commit History</small>"]:::git --> PinHead["<b>📅 HEAD COMMIT PINNED</b><br/><small>Index 0 • DD-MM-YYYY Date</small>"]:::git
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
flowchart LR
    classDef code fill:#0f172a,stroke:#38bdf8,stroke-width:1.5px,color:#f8fafc;
    classDef dash fill:#2e1065,stroke:#c084fc,stroke-width:2px,color:#faf5ff;

    subgraph IDEWindow ["🖥️ IDE WORKSPACE WINDOW"]
        direction LR
        subgraph Col1 ["📝 Editor Group 1 (Active Code)"]
            Code["<b>Active Prototype Code & Specs</b><br/><small>src/components/ • docs/design.md</small>"]:::code
        end
        subgraph Col2 ["📊 Editor Group 2 (Simple Browser Tab)"]
            Dash["<b>Docked Simple Browser Viewport</b><br/><small>http://127.0.0.1:4201 • Live Telemetry</small>"]:::dash
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
    participant IDE as 🖥️ IDE Simple Browser (127.0.0.1)
    participant Daemon as 🔌 server.js (Local Daemon: Port 4201)
    participant Core as 📁 docs/ & src/ Components

    IDE->>Daemon: 📡 GET / (Initial Connection)
    Note over Daemon: 🔒 Validates Host: 127.0.0.1:4201<br/>Generates Unique Process CSRF Token
    Daemon-->>IDE: 200 OK (index.html Injected with X-Dashboard-Token)

    IDE->>Daemon: 🔐 POST /api/action (Trigger Run / Spec Check)<br/>Header: X-Dashboard-Token
    Note over Daemon: 🛡️ Verifies CSRF Token & Same-Origin<br/>Rejects External Network DNS Rebinding
    Daemon->>Core: ⚙️ Executes Child Process Command
    Core-->>Daemon: 📊 Command Output Streams
    Daemon-->>IDE: 200 OK { success: true, output: "..." }
```

- **Localhost 127.0.0.1 Binding Only:** Strictly rejects all external and LAN network traffic.
- **DNS-Rebinding Protection:** Rejects any HTTP request whose `Host` header does not match `127.0.0.1:4201` or `localhost:4201`.
- **CSRF Token Validation:** All mutating requests require a valid per-process `X-Dashboard-Token`.
- **Source Code Protection:** Server daemon is strictly read-only regarding application source code.

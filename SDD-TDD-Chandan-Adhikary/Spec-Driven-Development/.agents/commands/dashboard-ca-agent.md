---
description: Start or verify the in-IDE Project-Manager-Dashboard local daemon (SDD-TDD Track)
---

# `/dashboard-ca-agent`

Launch or verify the strictly in-IDE **Project-Manager-Dashboard** for real-time visual tracking, 4-column drag-and-drop Kanban, Claude MOD context window token telemetry, and TDD heartbeat.

## Usage

```text
/dashboard-ca-agent
```

## Agent Directives

1. **Local Daemon Health Check**: Check if the local daemon is running at `http://127.0.0.1:4200/api/state`.
   - If not running, start `node Project-Manager-Dashboard/server.js` as a background process.
2. **IDE Simple Browser Docking**: Instruct the user to dock the dashboard inside their IDE window alongside code:
   - `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac) -> `Simple Browser: Show` -> `http://127.0.0.1:4200`.
   - Alternatively run the VS Code task: `Tasks: Run Task` -> `Start Project Manager Dashboard (Port 4200)`.
3. **Core Dashboard Features Available to User**:
   - **4-Column Drag & Drop Kanban**: Backlog, In Progress (3-task WIP limit), Review/Blocked, and Done with Framer Motion settling physics and bidirectional `docs/task.md` sync.
   - **Claude MOD Context Token Cockpit**: Live 200k context window capacity meter, prompt cache hit rate (95%+), cumulative savings calculator, and `/compact` health advisory.
   - **TDD Heartbeat Radar**: Live oscilloscope waveform, Green/Red pulse, and Acceptance Criteria contract verification (`AC-*`).
   - **Velocity Analytics Hub**: Trajectory burnup curve, 7-day velocity bars, and quality concentric rings.
   - **Telegram-Style Theme Switcher**: 360° spring toggle between Dark and Light mode with audio feedback.
4. **Telemetry Synchronization**: Whenever you update `docs/task.md`, `specs/`, or git activity, the dashboard's live file watcher and SSE stream immediately broadcast updates to the user's IDE view.

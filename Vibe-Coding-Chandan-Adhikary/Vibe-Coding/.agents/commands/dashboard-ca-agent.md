---
description: Start or verify the in-IDE Project-Manager-Dashboard local daemon (Vibe Track)
---

# `/dashboard-ca-agent`

Launch or verify the strictly in-IDE **Project-Manager-Dashboard** for real-time visual tracking in Vibe-Coding.

## Usage

```text
/dashboard-ca-agent
```

## Agent Directives

1. **Check User Requirement**: Verify the user wants the visual Project-Manager-Dashboard active.
2. **Local Daemon Health Check**: Check if the local daemon is running at `http://127.0.0.1:4201/api/state`.
   - If not running, start `node Project-Manager-Dashboard/server.js` as a background process.
3. **IDE Docking Instruction**: Instruct the user to reveal the dashboard inside the IDE window:
   - `Ctrl+Shift+P` -> `Simple Browser: Show` -> `http://127.0.0.1:4201`
4. **Git Protection Verification**: Confirm that `Project-Manager-Dashboard/` is ignored in `.gitignore` and will never be pushed to remote repositories.
5. **Telemetry Synchronization**: Ensure that whenever you update `docs/task.md` or complete a Karpathy loop, the dashboard's live file watcher automatically broadcasts the update to the user's IDE view.


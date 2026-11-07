#!/usr/bin/env bash
echo "=============================================================================="
echo "[Project-Manager-Dashboard] Starting In-IDE Local Daemon (SDD-TDD Track)..."
echo "=============================================================================="

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
cd "$DIR"

node server.js &

echo ""
echo "Daemon is running in background at: http://127.0.0.1:4200"
echo ""
echo "=============================================================================="
echo "[HOW TO DOCK INSIDE YOUR IDE SIMPLE BROWSER]:"
echo "  1. In your IDE (Cursor / VS Code / Windsurf / Antigravity):"
echo "  2. Press Cmd/Ctrl+Shift+P"
echo "  3. Type 'Simple Browser: Show' and press Enter"
echo "  4. Enter URL: http://127.0.0.1:4200"
echo ""
echo "The dashboard will dock into a split editor tab alongside your code."
echo "=============================================================================="

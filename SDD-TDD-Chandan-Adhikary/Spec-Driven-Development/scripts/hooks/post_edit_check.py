#!/usr/bin/env python3
"""PostToolUse hook: run docs conformance check when docs/ or .agents/ files are edited."""
from __future__ import annotations

import json
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent.parent


def main() -> int:
    raw = sys.stdin.read().strip()
    if raw:
        try:
            payload = json.loads(raw)
        except json.JSONDecodeError:
            payload = {"raw": raw}
        text = json.dumps(payload).replace("\\", "/")
        if not any(seg in text for seg in ("docs/", ".agents/", "AGENTS.md")):
            return 0

    checker = ROOT / "scripts" / "check_docs.py"
    if not checker.exists():
        return 0
    proc = subprocess.run([sys.executable, str(checker)], cwd=ROOT, capture_output=True, text=True)
    if proc.returncode != 0:
        print(proc.stdout or proc.stderr, file=sys.stderr)
        return proc.returncode
    return 0


if __name__ == "__main__":
    sys.exit(main())

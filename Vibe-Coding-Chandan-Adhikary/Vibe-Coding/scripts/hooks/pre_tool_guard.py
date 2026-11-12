#!/usr/bin/env python3
"""PreToolUse hook: block obvious destructive shell patterns and hook bypasses."""
from __future__ import annotations

import json
import re
import sys

BLOCKED_PATTERNS = [
    (re.compile(r"\bgit\s+commit\b.*--no-verify\b"), "Blocked: --no-verify bypasses required pre-commit checks."),
    (re.compile(r"\bgit\s+push\b.*--no-verify\b"), "Blocked: --no-verify bypasses required push checks."),
    (re.compile(r"\brm\s+-rf\s+(/|~|\.\.)\b"), "Blocked: unsafe recursive delete target."),
]


def main() -> int:
    raw = sys.stdin.read().strip()
    if not raw:
        return 0
    try:
        payload = json.loads(raw)
    except json.JSONDecodeError:
        payload = {"command": raw}

    text = json.dumps(payload)
    for pattern, message in BLOCKED_PATTERNS:
        if pattern.search(text):
            print(message, file=sys.stderr)
            return 2
    return 0


if __name__ == "__main__":
    sys.exit(main())

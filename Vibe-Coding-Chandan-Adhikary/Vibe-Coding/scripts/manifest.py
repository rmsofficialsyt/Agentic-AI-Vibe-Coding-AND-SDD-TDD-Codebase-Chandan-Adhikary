#!/usr/bin/env python3
"""Generate or verify MANIFEST.json for this framework package.

Usage:
    python scripts/manifest.py            # same as `generate`
    python scripts/manifest.py generate   # rewrite MANIFEST.json from the files in the package
    python scripts/manifest.py --check    # exit 1 if MANIFEST.json is out of date

Files are taken from git (tracked + untracked-but-not-ignored), relative to the package root
(the parent of this scripts/ directory). Text files are hashed after normalizing CRLF to LF so
the result is identical on Windows (autocrlf) and Linux CI. Standard library only.
"""
from __future__ import annotations

import hashlib
import json
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
MANIFEST = ROOT / "MANIFEST.json"
DEFAULTS = {
    "framework": "UNKNOWN",
    "baseline": "1.0.0",
    "created": "2026-11-04",
    "license": "Guideline package: MIT (repository root LICENSE); instantiated project: select per LICENSE-DECISION.md",
}


def list_files() -> list[str]:
    try:
        out = subprocess.run(
            ["git", "ls-files", "--cached", "--others", "--exclude-standard", "-z", "--", "."],
            cwd=ROOT, capture_output=True, check=True,
        ).stdout.decode("utf-8")
        candidates = [rel.replace("\\", "/") for rel in filter(None, out.split("\0"))]
    except (subprocess.CalledProcessError, FileNotFoundError):
        skip = {".git", "__pycache__", "node_modules", ".venv", "dist", "build"}
        candidates = [
            p.relative_to(ROOT).as_posix()
            for p in ROOT.rglob("*")
            if p.is_file() and not any(part in skip for part in p.parts)
        ]
    files = []
    for rel in candidates:
        if rel == "MANIFEST.json" or not (ROOT / rel).is_file():
            continue  # skip the manifest itself and files deleted in the working tree
        files.append(rel)
    return sorted(files)


def file_hash(path: Path) -> str:
    data = path.read_bytes()
    if b"\0" not in data[:8192]:  # treat as text: normalize line endings
        data = data.replace(b"\r\n", b"\n")
    return hashlib.sha256(data).hexdigest()


def build(existing: dict) -> dict:
    meta = {k: existing.get(k, v) for k, v in DEFAULTS.items()}
    if meta["framework"] == "UNKNOWN":
        meta["framework"] = "SDD" if (ROOT / "docs" / "spec.md").exists() else "Vibe Coding"
    files = [{"path": rel, "sha256": file_hash(ROOT / rel)} for rel in list_files()]
    return {
        **meta,
        "hash_note": "sha256 of file bytes; text files normalized to LF line endings before hashing",
        "file_count_excluding_manifest": len(files),
        "files": files,
    }


def render(data: dict) -> str:
    return json.dumps(data, indent=2, ensure_ascii=False) + "\n"


def main(argv: list[str]) -> int:
    existing = json.loads(MANIFEST.read_text(encoding="utf-8")) if MANIFEST.exists() else {}
    expected = build(existing)
    if "--check" in argv:
        current = {f["path"]: f["sha256"] for f in existing.get("files", [])}
        wanted = {f["path"]: f["sha256"] for f in expected["files"]}
        missing = sorted(set(wanted) - set(current))
        extra = sorted(set(current) - set(wanted))
        changed = sorted(p for p in set(wanted) & set(current) if wanted[p] != current[p])
        count_ok = existing.get("file_count_excluding_manifest") == len(wanted)
        if missing or extra or changed or not count_ok:
            for label, items in (("missing from manifest", missing), ("listed but absent", extra), ("hash changed", changed)):
                for item in items:
                    print(f"MANIFEST {label}: {item}")
            if not count_ok:
                print(f"MANIFEST file_count_excluding_manifest is {existing.get('file_count_excluding_manifest')}, expected {len(wanted)}")
            print("Run: python scripts/manifest.py generate")
            return 1
        print(f"MANIFEST.json OK ({len(wanted)} files)")
        return 0
    MANIFEST.write_text(render(expected), encoding="utf-8", newline="\n")
    print(f"MANIFEST.json written ({len(expected['files'])} files)")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))

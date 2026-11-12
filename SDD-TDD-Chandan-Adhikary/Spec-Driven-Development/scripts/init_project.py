#!/usr/bin/env python3
"""Bootstrap this framework after copying it into a project.

Usage:
    python scripts/init_project.py
    python scripts/init_project.py --ides antigravity,claude
    python scripts/init_project.py --clean-samples --install-git-hooks
    python scripts/init_project.py --dry-run
"""
from __future__ import annotations

import argparse
import re
import shutil
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
IS_SDD = (ROOT / "docs" / "spec.md").exists()


def find_git_root(start: Path) -> Path | None:
    cur = start.resolve()
    for parent in (cur, *cur.parents):
        if (parent / ".git").exists():
            return parent
    return None


def clean_samples(dry_run: bool) -> None:
    targets = [
        ROOT / "docs" / "features" / "001-example-feature",
        ROOT / "docs" / "features" / "002-student-enrollment.md",
        ROOT / "docs" / "approvals" / "APR-SAMPLE-001.md",
    ]
    for path in targets:
        if not path.exists():
            continue
        rel = path.relative_to(ROOT).as_posix()
        if dry_run:
            print(f"[dry-run] remove {rel}")
            continue
        if path.is_dir():
            shutil.rmtree(path)
        else:
            path.unlink()
        print(f"removed sample: {rel}")

    spec = ROOT / "docs" / "spec.md"
    if IS_SDD and spec.exists():
        text = spec.read_text(encoding="utf-8").replace("\r\n", "\n")
        cleaned = re.sub(r"^\| FEAT-00[12] \|.*\n", "", text, flags=re.M)
        if cleaned != text:
            if dry_run:
                print("[dry-run] remove sample rows from docs/spec.md")
            else:
                spec.write_text(cleaned, encoding="utf-8", newline="\n")
                print("cleaned sample rows from docs/spec.md")


def install_git_hooks(git_root: Path | None, dry_run: bool) -> None:
    if git_root is None:
        print("WARN: no .git directory found; run 'git init' first to install git hooks.")
        return
    hook = git_root / ".git" / "hooks" / "pre-commit"
    rel_root = ROOT.relative_to(git_root).as_posix() if ROOT != git_root else "."
    prefix = "" if rel_root == "." else f'cd "{rel_root}" && '
    script = (
        "#!/bin/sh\n"
        f"{prefix}python scripts/check_docs.py || exit 1\n"
        f"{prefix}python scripts/manifest.py --check || exit 1\n"
    )
    if dry_run:
        print(f"[dry-run] write {hook}")
        return
    hook.parent.mkdir(parents=True, exist_ok=True)
    hook.write_text(script, encoding="utf-8", newline="\n")
    try:
        hook.chmod(0o755)
    except OSError:
        pass
    print(f"installed pre-commit hook: {hook}")


def main(argv: list[str]) -> int:
    parser = argparse.ArgumentParser(description="Initialize framework in a target project.")
    parser.add_argument("--ides", default="antigravity", help="Comma-separated IDEs for sync_ide_adapters.py")
    parser.add_argument("--clean-samples", action="store_true", help="Remove sample features and sample approvals")
    parser.add_argument("--install-git-hooks", action="store_true", help="Install .git/hooks/pre-commit runner")
    parser.add_argument("--dry-run", action="store_true", help="Preview changes without modifying files")
    args = parser.parse_args(argv)

    git_root = find_git_root(ROOT)
    if git_root and git_root != ROOT:
        print(
            f"WARN: .git root is '{git_root}', not '{ROOT}'. "
            "IDEs discover .agents/ at the workspace/git root; copy .agents/ to the project root if slash commands or skills do not appear.",
            file=sys.stderr,
        )

    sync_cmd = [sys.executable, str(ROOT / "scripts" / "sync_ide_adapters.py"), "--ides", args.ides]
    if args.dry_run:
        sync_cmd.append("--dry-run")
    subprocess.run(sync_cmd, cwd=ROOT, check=True)

    if args.clean_samples:
        clean_samples(args.dry_run)

    if args.install_git_hooks:
        install_git_hooks(git_root, args.dry_run)

    if not args.dry_run:
        subprocess.run([sys.executable, str(ROOT / "scripts" / "check_docs.py")], cwd=ROOT, check=True)
    print("init_project: OK")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))

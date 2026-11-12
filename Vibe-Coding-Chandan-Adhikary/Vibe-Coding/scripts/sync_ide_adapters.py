#!/usr/bin/env python3
"""Sync canonical .agents/ assets (commands, skills, hooks) to IDE-native locations.

Usage:
    python scripts/sync_ide_adapters.py                      # sync Antigravity (.agents/workflows/)
    python scripts/sync_ide_adapters.py --ides all           # sync all supported IDEs
    python scripts/sync_ide_adapters.py --ides claude,cursor # sync specific IDEs
    python scripts/sync_ide_adapters.py --dry-run            # preview without writing
"""
from __future__ import annotations

import argparse
import json
import shutil
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
AGENTS = ROOT / ".agents"
COMMANDS_DIR = AGENTS / "commands"
SKILLS_DIR = AGENTS / "skills"
HOOKS_FILE = AGENTS / "hooks.json"

ALL_IDES = ("antigravity", "claude", "windsurf", "cursor", "copilot")


def write_text(target: Path, content: str, dry_run: bool) -> None:
    if dry_run:
        print(f"[dry-run] write {target.relative_to(ROOT).as_posix()}")
        return
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text(content.replace("\r\n", "\n"), encoding="utf-8", newline="\n")


def copy_tree(src: Path, dst: Path, dry_run: bool) -> None:
    if dry_run:
        print(f"[dry-run] copy  {src.relative_to(ROOT).as_posix()} -> {dst.relative_to(ROOT).as_posix()}")
        return
    if dst.exists():
        shutil.rmtree(dst)
    shutil.copytree(src, dst)


def command_files() -> list[Path]:
    if not COMMANDS_DIR.exists():
        return []
    return sorted(p for p in COMMANDS_DIR.glob("*-ca-agent.md") if p.is_file())


def sync_antigravity(cmds: list[Path], dry_run: bool) -> int:
    wf_dir = AGENTS / "workflows"
    for cmd in cmds:
        write_text(wf_dir / cmd.name, cmd.read_text(encoding="utf-8"), dry_run)
    return len(cmds)


def sync_claude(cmds: list[Path], dry_run: bool) -> int:
    count = 0
    for cmd in cmds:
        write_text(ROOT / ".claude" / "commands" / cmd.name, cmd.read_text(encoding="utf-8"), dry_run)
        count += 1
    if SKILLS_DIR.exists():
        for skill_dir in sorted(d for d in SKILLS_DIR.iterdir() if d.is_dir() and (d / "SKILL.md").exists()):
            copy_tree(skill_dir, ROOT / ".claude" / "skills" / skill_dir.name, dry_run)
            count += 1
    if HOOKS_FILE.exists():
        raw_hooks = json.loads(HOOKS_FILE.read_text(encoding="utf-8"))
        claude_hooks: dict[str, list] = {}
        for _, cfg in raw_hooks.items():
            if isinstance(cfg, dict) and cfg.get("enabled", True) is False:
                continue
            for event in ("SessionStart", "PreToolUse", "PostToolUse", "Stop"):
                if event in cfg:
                    claude_hooks.setdefault(event, []).extend(cfg[event])
        settings_path = ROOT / ".claude" / "settings.json"
        existing = json.loads(settings_path.read_text(encoding="utf-8")) if settings_path.exists() else {}
        existing["hooks"] = claude_hooks
        write_text(settings_path, json.dumps(existing, indent=2) + "\n", dry_run)
        count += 1
    return count


def sync_windsurf(cmds: list[Path], dry_run: bool) -> int:
    for cmd in cmds:
        write_text(ROOT / ".windsurf" / "workflows" / cmd.name, cmd.read_text(encoding="utf-8"), dry_run)
    return len(cmds)


def sync_cursor(cmds: list[Path], dry_run: bool) -> int:
    for cmd in cmds:
        write_text(ROOT / ".cursor" / "commands" / cmd.name, cmd.read_text(encoding="utf-8"), dry_run)
    return len(cmds)


def sync_copilot(cmds: list[Path], dry_run: bool) -> int:
    for cmd in cmds:
        stem = cmd.stem
        write_text(ROOT / ".github" / "prompts" / f"{stem}.prompt.md", cmd.read_text(encoding="utf-8"), dry_run)
    return len(cmds)


def main(argv: list[str]) -> int:
    parser = argparse.ArgumentParser(description="Sync .agents/ commands, skills, and hooks to IDE-native directories.")
    parser.add_argument("--ides", default="antigravity", help="Comma-separated IDEs: antigravity,claude,windsurf,cursor,copilot,all")
    parser.add_argument("--dry-run", action="store_true", help="Preview changes without writing files")
    args = parser.parse_args(argv)

    selected = list(ALL_IDES) if args.ides.strip().lower() == "all" else [
        x.strip().lower() for x in args.ides.split(",") if x.strip()
    ]
    invalid = [x for x in selected if x not in ALL_IDES]
    if invalid:
        print(f"ERROR: unsupported IDE(s): {', '.join(invalid)}. Valid: {', '.join(ALL_IDES)}", file=sys.stderr)
        return 1

    cmds = command_files()
    if not cmds:
        print("ERROR: no *-ca-agent.md files found in .agents/commands/", file=sys.stderr)
        return 1

    handlers = {
        "antigravity": sync_antigravity,
        "claude": sync_claude,
        "windsurf": sync_windsurf,
        "cursor": sync_cursor,
        "copilot": sync_copilot,
    }
    total = 0
    for ide in selected:
        n = handlers[ide](cmds, args.dry_run)
        total += n
        print(f"sync_ide_adapters [{ide}]: {n} item(s) {'planned' if args.dry_run else 'synced'}")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))

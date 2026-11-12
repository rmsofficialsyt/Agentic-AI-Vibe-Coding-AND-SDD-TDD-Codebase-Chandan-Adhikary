#!/usr/bin/env python3
"""Documentation and feature-specification conformance checks.

Usage:  python scripts/check_docs.py        (run from anywhere; exits 1 on any error)

Checks (standard library only):
  1. docs/*.md follow the governed pattern (header block, Purpose, Agent read trigger,
     Evidence and change control, framework closing section).
  2. docs/INDEX.md registers every docs/*.md and every registry link resolves.
  3. Relative markdown links in the package resolve (code blocks are ignored).
  4. No repository-level specs/ directory exists.
  5. Feature specs in docs/features/ use the canonical header, lifecycle status, ID scheme,
     Given/When/Then acceptance criteria and AC -> TEST mapping (see docs/features/README.md).
  6. SDD only: docs/spec.md indexes every feature.
  7. No control characters in text files.
  8. Agent commands and skills carry valid YAML frontmatter.
"""
from __future__ import annotations

import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DOCS = ROOT / "docs"
FEATURES = DOCS / "features"
IS_SDD = (DOCS / "spec.md").exists()
FRAMEWORK = "SDD" if IS_SDD else "Vibe Coding"
CLOSING = "## SDD enforcement" if IS_SDD else "## Vibe Coding interpretation"
STATUSES = ["DRAFT", "IN REVIEW", "APPROVED", "SUPERSEDED", "DEPRECATED"] + ([] if IS_SDD else ["PROTOTYPE"])
EXEMPT_PATTERN = {"INDEX.md", "CHANGELOG.md", "guideline-CHANGELOG.md"}
NON_FEATURE = {"README.md", "FEATURE-TEMPLATE.md"}
TEXT_EXT = {".md", ".mdc", ".txt", ".json", ".yml", ".yaml", ".js", ".html", ".css", ".py", ".sh", ".bat", ".toml"}

errors: list[str] = []
warnings: list[str] = []


def err(msg: str) -> None:
    errors.append(msg)


def rel(p: Path) -> str:
    return p.relative_to(ROOT).as_posix()


def read(p: Path) -> str:
    return p.read_text(encoding="utf-8").replace("\r\n", "\n")


def strip_code(text: str) -> str:
    """Remove fenced code blocks, inline code and HTML comments (keeps line count)."""
    out, fence = [], False
    for line in text.split("\n"):
        if re.match(r"^\s*(```|~~~)", line):
            fence = not fence
            out.append("")
            continue
        out.append("" if fence else re.sub(r"`[^`]*`", "", line))
    return re.sub(r"<!--.*?-->", lambda m: "\n" * m.group(0).count("\n"), "\n".join(out), flags=re.S)


def package_files() -> list[Path]:
    out = subprocess.run(["git", "ls-files", "--cached", "--others", "--exclude-standard", "-z", "--", "."],
                         cwd=ROOT, capture_output=True, check=True).stdout.decode("utf-8")
    return [ROOT / f for f in filter(None, out.split("\0")) if (ROOT / f).is_file()]


# 1. Governed document pattern -------------------------------------------------------------
def check_doc_pattern() -> None:
    for p in sorted(DOCS.glob("*.md")):
        if p.name in EXEMPT_PATTERN:
            continue
        t = read(p)
        name = rel(p)
        if not t.startswith("# "):
            err(f"{name}: first line must be an H1 title")
        for field in ("Document class", "Framework", "Guideline baseline", "Status"):
            if not re.search(rf"^> \*\*{field}:\*\*", t, re.M):
                err(f"{name}: missing header field '> **{field}:**'")
        m = re.search(r"^> \*\*Framework:\*\*\s*(.+?)\s*$", t, re.M)
        if m and m.group(1) != FRAMEWORK:
            err(f"{name}: Framework is '{m.group(1)}', expected '{FRAMEWORK}'")
        if not re.search(r"^## (\d+\.\s+)?Purpose\s*$", t, re.M):
            err(f"{name}: missing '## Purpose' section")
        if "## Agent read trigger" not in t:
            err(f"{name}: missing '## Agent read trigger' section")
        if p.name != "ide-compatibility.md" and "## Evidence and change control" not in t:
            err(f"{name}: missing '## Evidence and change control' section")
        if CLOSING not in t:
            err(f"{name}: missing closing section '{CLOSING}'")


# 2. INDEX registry -------------------------------------------------------------------------
def check_index() -> None:
    index = DOCS / "INDEX.md"
    t = read(index)
    linked = set(re.findall(r"\]\(([^)#\s]+\.md)\)", t))
    for target in linked:
        if not (DOCS / target).exists():
            err(f"docs/INDEX.md: registry link '{target}' does not exist")
    for p in DOCS.glob("*.md"):
        if p.name != "INDEX.md" and p.name not in linked:
            err(f"docs/INDEX.md: '{p.name}' is not registered")


# 3. Relative links ---------------------------------------------------------------------------
LINK = re.compile(r"\[[^\]]*\]\(([^)\s]+)\)")


def check_links(files: list[Path]) -> None:
    for p in files:
        if p.suffix != ".md":
            continue
        for target in LINK.findall(strip_code(read(p))):
            if re.match(r"^(https?:|mailto:|#|/)", target) or "[" in target or "TBD" in target:
                continue
            path = target.split("#", 1)[0]
            if path and not (p.parent / path).exists():
                err(f"{rel(p)}: broken link '{target}'")


# 4. specs/ directory -------------------------------------------------------------------------
def check_no_specs_dir() -> None:
    if (ROOT / "specs").exists():
        err("specs/: repository-level specs/ directory is not permitted; use docs/features/")


# 5. Feature specifications -------------------------------------------------------------------
def header_value(text: str, field: str) -> str | None:
    m = re.search(rf"^\|\s*{re.escape(field)}\s*\|\s*(.+?)\s*\|\s*$", text, re.M)
    return m.group(1) if m else None


def features() -> list[tuple[str, Path, list[Path]]]:
    """Return (number, header_file, all_files) for each feature."""
    found = []
    for p in sorted(FEATURES.iterdir()) if FEATURES.exists() else []:
        if p.name in NON_FEATURE:
            continue
        m = re.match(r"^(\d{3})-[a-z0-9]+(?:-[a-z0-9]+)*(\.md)?$", p.name)
        if not m or (p.is_file() and not m.group(2)) or (p.is_dir() and m.group(2)):
            err(f"{rel(p)}: feature name must be 'NNN-kebab-name.md' (flat) or 'NNN-kebab-name/' (modular)")
            continue
        if p.is_dir():
            parts = [p / "feature.md", p / "acceptance.md", p / "test-plan.md"]
            for part in parts:
                if not part.exists():
                    err(f"{rel(p)}: modular feature is missing {part.name}")
            found.append((m.group(1), p / "feature.md", [x for x in parts if x.exists()]))
        else:
            found.append((m.group(1), p, [p]))
    return found


def check_features() -> list[str]:
    ids = []
    seen_numbers = set()
    for num, header_file, files in features():
        if num in seen_numbers:
            err(f"docs/features: feature number {num} is used more than once")
        seen_numbers.add(num)
        fid = f"FEAT-{num}"
        ids.append(fid)
        if not header_file.exists():
            continue
        h = read(header_file)
        name = rel(header_file)
        if header_value(h, "Feature ID") != fid:
            err(f"{name}: header 'Feature ID' must be {fid}")
        version = header_value(h, "Spec version") or ""
        if not re.match(r"^\d+\.\d+\.\d+$", version):
            err(f"{name}: 'Spec version' must be semantic (x.y.z), got '{version}'")
        status = header_value(h, "Status") or ""
        if not any(status.startswith(s) for s in STATUSES):
            err(f"{name}: 'Status' must start with one of {STATUSES}, got '{status}'")
        if status.startswith("APPROVED"):
            ref = header_value(h, "Approval reference") or ""
            if not ref or ref.lower().startswith(("pending", "[", "tbd")):
                err(f"{name}: APPROVED feature requires an 'Approval reference'")
        for field in ("Product capability", "PRD requirements"):
            if not header_value(h, field):
                err(f"{name}: missing header field '{field}'")

        body = "\n".join(strip_code(read(f)) for f in files)
        for kind in ("FR", "NFR", "AC", "TEST"):
            for bad in re.findall(rf"\b{kind}-FEAT(\d{{3}})-\d{{2}}\b", body):
                if bad != num:
                    err(f"{name}: {kind}-FEAT{bad}-.. belongs to another feature")
        ac_defs = re.findall(rf"^#{{2,6}}\s+(AC-FEAT{num}-\d{{2}})\b", body, re.M)
        if not ac_defs and not status.startswith("PROTOTYPE"):
            err(f"{name}: no acceptance criteria headings '### AC-FEAT{num}-NN: ...'")
        if len(ac_defs) != len(set(ac_defs)):
            err(f"{name}: duplicate acceptance criterion IDs")
        for ac in ac_defs:
            block = body.split(ac, 1)[1].split("\n#", 1)[0]
            for kw in ("Given", "When", "Then"):
                if f"**{kw}**" not in block:
                    err(f"{name}: {ac} is missing '**{kw}**'")
            mapped = re.search(rf"^\|\s*{ac}\s*\|\s*TEST-FEAT{num}-\d{{2}}\s*\|", body, re.M)
            if not mapped and not status.startswith(("PROTOTYPE", "DRAFT")):
                err(f"{name}: {ac} has no TEST mapping in the verification table")
    return ids


# 6. SDD spec index ---------------------------------------------------------------------------
def check_spec_index(ids: list[str]) -> None:
    if not IS_SDD:
        return
    t = read(DOCS / "spec.md")
    for fid in ids:
        if not re.search(rf"^\|\s*{fid}\s*\|", t, re.M):
            err(f"docs/spec.md: feature {fid} is not listed in the catalog table")


# 7. Control characters -----------------------------------------------------------------------
def check_control_chars(files: list[Path]) -> None:
    bad = re.compile(r"[\x00-\x08\x0b\x0c\x0e-\x1f]")
    for p in files:
        if p.suffix not in TEXT_EXT or p.name.endswith(".min.js"):
            continue
        for n, line in enumerate(read(p).split("\n"), 1):
            if bad.search(line):
                err(f"{rel(p)}:{n}: control character found")


# 8. Commands and skills frontmatter -----------------------------------------------------------
def frontmatter(text: str) -> dict[str, str] | None:
    if not text.startswith("---\n"):
        return None
    end = text.find("\n---\n", 4)
    if end < 0:
        return None
    data = {}
    for line in text[4:end].split("\n"):
        if ":" in line:
            k, v = line.split(":", 1)
            data[k.strip()] = v.strip().strip('"')
    return data


def check_agents() -> None:
    cdir = ROOT / ".agents" / "commands"
    for p in sorted(cdir.glob("*.md")):
        if p.name == "README.md":
            continue
        if not p.name.endswith("-ca-agent.md"):
            err(f"{rel(p)}: command files must end with '-ca-agent.md'")
        fm = frontmatter(read(p))
        if not fm or not fm.get("description"):
            err(f"{rel(p)}: missing YAML frontmatter with 'description'")
    for d in sorted((ROOT / ".agents" / "skills").iterdir()):
        skill = d / "SKILL.md"
        if not skill.exists():
            err(f"{rel(d)}: missing SKILL.md")
            continue
        fm = frontmatter(read(skill))
        if not fm or fm.get("name") != d.name or not fm.get("description"):
            err(f"{rel(skill)}: frontmatter must contain name: {d.name} and a description")


def main() -> int:
    files = package_files()
    check_doc_pattern()
    check_index()
    check_links(files)
    check_no_specs_dir()
    ids = check_features()
    check_spec_index(ids)
    check_control_chars(files)
    check_agents()
    for w in warnings:
        print(f"WARN  {w}")
    for e in errors:
        print(f"ERROR {e}")
    status = "FAILED" if errors else "OK"
    print(f"check_docs [{FRAMEWORK}]: {status} - {len(errors)} error(s), {len(warnings)} warning(s), {len(ids)} feature(s)")
    return 1 if errors else 0


if __name__ == "__main__":
    sys.exit(main())

#!/usr/bin/env python3
"""QA validator for Topic Zip registry · vincentian-mind-w01-handbook · VT-Z1～Z6."""

from __future__ import annotations

import csv
import re
import sys
from pathlib import Path

HEADER = [
    "uuid", "layer", "item_type", "subject_id", "is_primary_shadow",
    "p_path", "m_path", "view", "name", "series_seq", "keywords",
    "qutrit", "vsm", "topo_links", "gravity_links", "notes",
]

VT_UUID_RE = re.compile(r"^VT_[a-z0-9_]+$")
QUTRIT_RE = re.compile(r"^[012](/[012]){5}$")
VSM_RE = re.compile(r"^[0-4]{9}$")


def workspace_root() -> Path:
    return Path(__file__).resolve().parent.parent


def main() -> int:
    root = workspace_root()
    csv_path = root / "vincentian-mind-w01-handbook_registry.csv"
    errors: list[str] = []

    with csv_path.open(encoding="utf-8", newline="") as f:
        reader = csv.DictReader(f)
        if reader.fieldnames != HEADER:
            errors.append(f"header mismatch: {reader.fieldnames}")
            rows = []
        else:
            rows = list(reader)

    uuids: set[str] = set()
    topo: dict[str, set[str]] = {}
    primary_by_subject: dict[str, list[str]] = {}

    for i, row in enumerate(rows, start=2):
        uid = row["uuid"]
        uuids.add(uid)
        if not VT_UUID_RE.match(uid):
            errors.append(f"line {i}: invalid uuid '{uid}'")
        m_path = root / row["m_path"]
        if not m_path.is_file():
            errors.append(f"line {i}: shadow missing: {row['m_path']}")
        if row["item_type"] == "episode":
            p = root / (row.get("p_path") or "")
            if not p.is_file():
                errors.append(f"line {i}: delivery missing: {row.get('p_path')}")
        if row["is_primary_shadow"] == "true":
            primary_by_subject.setdefault(row["subject_id"], []).append(uid)
        topo[uid] = {t.strip() for t in (row.get("topo_links") or "").split("|") if t.strip()}

    for sid, primaries in primary_by_subject.items():
        if len(primaries) != 1:
            errors.append(f"VT-Z2: subject '{sid}' has {len(primaries)} primaries")

    for src, targets in topo.items():
        for tgt in targets:
            if tgt not in uuids:
                errors.append(f"unknown topo target '{tgt}' from '{src}'")
            elif src not in topo.get(tgt, set()):
                errors.append(f"VT-Z3: missing reverse {tgt} -> {src}")

    if errors:
        print("QA FAIL:")
        for e in errors:
            print(f"  - {e}")
        return 1
    print(f"QA PASS: {len(rows)} registry rows")
    return 0


if __name__ == "__main__":
    sys.exit(main())

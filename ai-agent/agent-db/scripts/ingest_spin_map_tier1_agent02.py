#!/usr/bin/env python3
"""DEPRECATED (agent-db V2.0 · Batch 2).

Formerly: Copy Spin Map Tier 1 writing refs into agent-db (spin_map_copy).

Use Spin Map read-only + `spin_map_ref` on P-agent shadows instead.
Do not run — existing copies removed in Batch 3.
See: project/constitution/AGENT_DB_V2.0.md
"""

from __future__ import annotations

import sys

if __name__ == "__main__":
    sys.exit(
        "ingest_spin_map_tier1_agent02.py is DEPRECATED (agent-db V2). "
        "Use Spin Map read-only ref; see AGENT_DB_V2.0.md."
    )

# --- legacy implementation below (not executed) ---

import csv
import re
import shutil
from pathlib import Path

SPIN_ROOT = Path("/Users/vincentbook/Documents/Dev/_shared/spin-map/Spin Map Database_Root")
ADB_ROOT = Path(__file__).resolve().parents[1]

TIER1_UUIDS = {
    "0oTBC0BV",
    "6i1IqebQ",
    "TxpluTH3",
    "6F7pdZ7a",
    "R61Wp9W7",
    "YeAFNgOL",
    "ylfpEGNV",
}

BRAIN_CORE = [
    "pk",
    "uuid",
    "p_path",
    "m_path",
    "qutrit",
    "d1",
    "d2",
    "d3",
    "d4",
    "d5",
    "d6",
    "view",
    "keywords",
    "gravity_links",
    "is_primary_shadow",
    "bucket",
    "vsm",
    "audit",
]
BRAIN_EXT = [
    "agent_id",
    "origin",
    "ingress",
    "status",
    "visibility",
    "doc_class",
    "spin_map_uuid",
    "human_verdict",
    "human_review_note",
]

EXT_BLOCK = """
agent_id: edit
agent_name: agent02
origin: spin_map
ingress: spin_map_copy
status: active
visibility: internal
doc_class: reference
spin_map_uuid: "{uuid}"
human_verdict: pending
human_review_note: ""
"""


def load_spin_primaries() -> list[dict[str, str]]:
    rows: list[dict[str, str]] = []
    with (SPIN_ROOT / "Brain.csv").open(newline="", encoding="utf-8") as f:
        for row in csv.DictReader(f):
            if row["uuid"] in TIER1_UUIDS and row["is_primary_shadow"] == "true":
                rows.append(row)
    found = {r["uuid"] for r in rows}
    missing = TIER1_UUIDS - found
    if missing:
        raise SystemExit(f"Missing primary shadow in Spin Map Brain: {missing}")
    return sorted(rows, key=lambda r: r["uuid"])


def next_pks(count: int) -> list[str]:
    brain_path = ADB_ROOT / "Brain.csv"
    max_pk = 20260627120001
    with brain_path.open(newline="", encoding="utf-8") as f:
        for row in csv.DictReader(f):
            pk = int(row["pk"].strip('"'))
            max_pk = max(max_pk, pk)
    return [str(max_pk + i) for i in range(1, count + 1)]


def inject_extensions(yaml_block: str, uuid: str, pk: str) -> str:
    yaml_block = re.sub(r'^pk:\s*".*"', f'pk: "{pk}"', yaml_block, count=1, flags=re.M)
    if "origin: spin_map" in yaml_block:
        return yaml_block
    yaml_block = yaml_block.rstrip() + EXT_BLOCK.format(uuid=uuid)
    return yaml_block


def copy_entity(row: dict[str, str], pk: str) -> None:
    uuid = row["uuid"]
    p_rel = row["p_path"].lstrip("/")
    m_rel = row["m_path"].lstrip("/")

    src_p = SPIN_ROOT / p_rel
    src_m = SPIN_ROOT / m_rel
    dst_p = ADB_ROOT / "Project_Root" / p_rel
    dst_m = ADB_ROOT / "Project_Root" / m_rel

    if not src_p.is_file():
        raise FileNotFoundError(src_p)
    if not src_m.is_file():
        raise FileNotFoundError(src_m)

    dst_p.parent.mkdir(parents=True, exist_ok=True)
    dst_m.parent.mkdir(parents=True, exist_ok=True)

    shutil.copy2(src_p, dst_p)
    shadow_text = src_m.read_text(encoding="utf-8")
    if not shadow_text.startswith("---"):
        raise ValueError(f"Shadow missing YAML front matter: {src_m}")
    parts = shadow_text.split("---", 2)
    new_yaml = inject_extensions(parts[1], uuid, pk)
    dst_m.write_text(f"---{new_yaml}---{parts[2]}", encoding="utf-8")

    print(f"  copied {uuid} -> {p_rel}")


def append_brain(rows: list[dict[str, str]], pks: list[str]) -> None:
    brain_path = ADB_ROOT / "Brain.csv"
    existing_uuids: set[str] = set()
    with brain_path.open(newline="", encoding="utf-8") as f:
        for row in csv.DictReader(f):
            if row.get("spin_map_uuid"):
                existing_uuids.add(row["spin_map_uuid"])
            if row["uuid"] in TIER1_UUIDS and row.get("ingress") == "spin_map_copy":
                existing_uuids.add(row["uuid"])

    with brain_path.open("a", newline="", encoding="utf-8") as f:
        writer = csv.writer(f, quoting=csv.QUOTE_ALL)
        for row, pk in zip(rows, pks):
            if row["uuid"] in existing_uuids:
                print(f"  skip Brain (exists): {row['uuid']}")
                continue
            writer.writerow(
                [
                    pk,
                    row["uuid"],
                    row["p_path"],
                    row["m_path"],
                    row["qutrit"],
                    row["d1"],
                    row["d2"],
                    row["d3"],
                    row["d4"],
                    row["d5"],
                    row["d6"],
                    row["view"],
                    row["keywords"],
                    row["gravity_links"],
                    row["is_primary_shadow"],
                    row["bucket"],
                    row["vsm"],
                    row["audit"],
                    "edit",
                    "spin_map",
                    "spin_map_copy",
                    "active",
                    "internal",
                    "reference",
                    row["uuid"],
                    "pending",
                    "Tier1 Agent2 writing ref",
                ]
            )
            print(f"  Brain +1: {row['uuid']} pk={pk}")


def main() -> None:
    print("Ingest Spin Map Tier 1 -> agent-db")
    rows = load_spin_primaries()
    pks = next_pks(len(rows))
    for row, pk in zip(rows, pks):
        copy_entity(row, pk)
    append_brain(rows, pks)
    print("Done.")


if __name__ == "__main__":
    main()

#!/usr/bin/env python3
"""DEPRECATED (agent-db V2.0 · Batch 2).

Formerly: Copy Spin Map B/A refs for pyramids series → agent-db (spin_map_copy).

Use Spin Map read-only + `spin_map_ref` instead. Do not run.
See: project/constitution/AGENT_DB_V2.0.md
"""

from __future__ import annotations

import sys

if __name__ == "__main__":
    sys.exit(
        "ingest_spin_map_pyramids_agent01.py is DEPRECATED (agent-db V2). "
        "Use Spin Map read-only ref; see AGENT_DB_V2.0.md."
    )

# --- legacy implementation below (not executed) ---

import csv
import re
import shutil
from pathlib import Path

SPIN_ROOT = Path("/Users/vincentbook/Documents/Dev/_shared/spin-map/Spin Map Database_Root")
ADB_ROOT = Path(__file__).resolve().parents[1]

# Series sources.md · B/A only · no Spin Map P01–P12 self-produced drafts
PYRAMIDS_UUIDS = {
    "2MshQLAD",  # Burr · engineering
    "bbh1gjCw",  # Giles · ep4 optional
    "gO5inxjd",  # Maspero · ep1 optional
    "kR3mNpW8",  # Erlitou statistical chronology
    "ky7XuH3B",  # Baikie · ep4 optional
    "nk8jIIvx",  # Petrie
    "phVXjCiA",  # Herodotus
    "SL9cxP8Y",  # Eberhard 3d ed.
    "sOr3Lhqe",  # Rawlinson
    "vT2xQmL5",  # China radiocarbon databank
    "W7F7GRGQ",  # Eberhard 1st ed. · ep4 optional
}

SPIN_P_BUCKET = re.compile(r"^P\d{2}_")

EXT_BLOCK = """
agent_id: search
agent_name: agent01
origin: spin_map
ingress: spin_map_copy
status: active
visibility: internal
doc_class: reference
spin_map_uuid: "{uuid}"
human_verdict: pending
human_review_note: "Pyramids series B/A ref"
"""

GRAVITY_SECTION_RE = re.compile(
    r"\n### gravity_links 說明\n.*?(?=\n### |\n## |\Z)",
    re.DOTALL,
)


def load_spin_all_shadows(uuids: set[str]) -> list[dict[str, str]]:
    rows: list[dict[str, str]] = []
    with (SPIN_ROOT / "Brain.csv").open(newline="", encoding="utf-8") as f:
        for row in csv.DictReader(f):
            if row["uuid"] not in uuids:
                continue
            bucket = row.get("bucket", "")
            if SPIN_P_BUCKET.match(bucket):
                raise SystemExit(
                    f"Refuse Spin Map P* bucket for {row['uuid']}: {bucket}"
                )
            rows.append(row)
    found = {r["uuid"] for r in rows}
    missing = uuids - found
    if missing:
        raise SystemExit(f"Missing shadows in Spin Map Brain: {missing}")
    return sorted(rows, key=lambda r: (r["uuid"], r["m_path"]))


def sanitize_row(row: dict[str, str]) -> dict[str, str]:
    out = dict(row)
    out["gravity_links"] = ""
    out["is_primary_shadow"] = "false"
    return out


def sanitize_yaml(yaml_block: str) -> str:
    yaml_block = re.sub(
        r'^gravity_links:\s*.*$',
        'gravity_links: ""',
        yaml_block,
        count=1,
        flags=re.M,
    )
    yaml_block = re.sub(
        r'^is_primary_shadow:\s*.*$',
        "is_primary_shadow: false",
        yaml_block,
        count=1,
        flags=re.M,
    )
    return yaml_block


def sanitize_body(body: str) -> str:
    return GRAVITY_SECTION_RE.sub("", body)


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
    return yaml_block.rstrip() + EXT_BLOCK.format(uuid=uuid)


def existing_pyramids_m_paths() -> set[str]:
    brain_path = ADB_ROOT / "Brain.csv"
    out: set[str] = set()
    with brain_path.open(newline="", encoding="utf-8") as f:
        for row in csv.DictReader(f):
            if row.get("ingress") != "spin_map_copy":
                continue
            spin_uuid = row.get("spin_map_uuid") or row.get("uuid")
            if spin_uuid in PYRAMIDS_UUIDS:
                out.add(row["m_path"])
    return out


def copy_shadow(row: dict[str, str], pk: str) -> None:
    uuid = row["uuid"]
    p_rel = row["p_path"].lstrip("/")
    m_rel = row["m_path"].lstrip("/")

    src_p = SPIN_ROOT / p_rel
    src_m = SPIN_ROOT / m_rel
    dst_p = ADB_ROOT / "Project_Root" / p_rel
    dst_m = ADB_ROOT / "Project_Root" / m_rel

    if not src_m.is_file():
        raise FileNotFoundError(src_m)

    dst_m.parent.mkdir(parents=True, exist_ok=True)
    if not dst_p.is_file():
        if not src_p.is_file():
            raise FileNotFoundError(src_p)
        dst_p.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(src_p, dst_p)

    shadow_text = src_m.read_text(encoding="utf-8")
    if not shadow_text.startswith("---"):
        raise ValueError(f"Shadow missing YAML front matter: {src_m}")
    parts = shadow_text.split("---", 2)
    new_yaml = sanitize_yaml(inject_extensions(parts[1], uuid, pk))
    new_body = sanitize_body(parts[2])
    dst_m.write_text(f"---{new_yaml}---{new_body}", encoding="utf-8")

    print(f"  shadow {uuid} · {row['view']} -> {m_rel}")


def patch_existing_shadow_file(m_path: str, pk: str) -> None:
    rel = m_path.lstrip("/")
    dst_m = ADB_ROOT / "Project_Root" / rel
    if not dst_m.is_file():
        return
    shadow_text = dst_m.read_text(encoding="utf-8")
    if not shadow_text.startswith("---"):
        return
    parts = shadow_text.split("---", 2)
    new_yaml = sanitize_yaml(parts[1])
    new_yaml = re.sub(r'^pk:\s*".*"', f'pk: "{pk}"', new_yaml, count=1, flags=re.M)
    new_body = sanitize_body(parts[2])
    dst_m.write_text(f"---{new_yaml}---{new_body}", encoding="utf-8")
    print(f"  patched {rel}")


def patch_brain_pyramids_rows() -> None:
    brain_path = ADB_ROOT / "Brain.csv"
    with brain_path.open(newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        fieldnames = reader.fieldnames
        rows = list(reader)

    changed = 0
    for row in rows:
        if row.get("ingress") != "spin_map_copy":
            continue
        spin_uuid = row.get("spin_map_uuid") or row.get("uuid")
        if spin_uuid not in PYRAMIDS_UUIDS:
            continue
        if row["gravity_links"] or row["is_primary_shadow"] != "false":
            row["gravity_links"] = ""
            row["is_primary_shadow"] = "false"
            changed += 1
            patch_existing_shadow_file(row["m_path"], row["pk"].strip('"'))

    if not changed:
        return

    with brain_path.open("w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames, quoting=csv.QUOTE_ALL)
        writer.writeheader()
        writer.writerows(rows)
    print(f"  Brain patched {changed} pyramids rows (gravity + is_primary_shadow)")


def append_brain(rows: list[dict[str, str]], pks: list[str]) -> None:
    existing = existing_pyramids_m_paths()
    brain_path = ADB_ROOT / "Brain.csv"
    with brain_path.open("a", newline="", encoding="utf-8") as f:
        writer = csv.writer(f, quoting=csv.QUOTE_ALL)
        for row, pk in zip(rows, pks):
            if row["m_path"] in existing:
                print(f"  skip Brain (exists): {row['m_path']}")
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
                    "",
                    "false",
                    row["bucket"],
                    row["vsm"],
                    row["audit"],
                    "search",
                    "spin_map",
                    "spin_map_copy",
                    "active",
                    "internal",
                    "reference",
                    row["uuid"],
                    "pending",
                    "Pyramids series B/A ref",
                ]
            )
            print(f"  Brain +1: {row['uuid']} · {row['view']} pk={pk}")


def main() -> None:
    print("Ingest Spin Map pyramids B/A (all shadows) -> agent-db (Agent 1)")
    patch_brain_pyramids_rows()

    all_rows = [sanitize_row(r) for r in load_spin_all_shadows(PYRAMIDS_UUIDS)]
    existing = existing_pyramids_m_paths()
    to_copy = [r for r in all_rows if r["m_path"] not in existing]
    if not to_copy:
        print("All pyramids shadows already in agent-db.")
        return

    pks = next_pks(len(to_copy))
    for row, pk in zip(to_copy, pks):
        copy_shadow(row, pk)
    append_brain(to_copy, pks)
    print(f"Done. Added {len(to_copy)} shadows.")


if __name__ == "__main__":
    main()

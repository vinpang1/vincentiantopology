# project DB

Vincentian Topology **本專案持久資產庫**（文章、外參、財務、法律、站點規格）。憲法：[`project/constitution/PROJECT_DB_V1.0.md`](../project/constitution/PROJECT_DB_V1.0.md)

> **取代** `~/Documents/Vincentian Topology Database/`（2026-06-28 SUPERSEDED）· 驗收：[`database_redesign_acceptance_20260628.md`](../ai-agent/agent-db/docs/audit/database_redesign_acceptance_20260628.md)

## 結構

```
project-db/
├── project.csv               樞（獨立於 Spin Map Brain · agent-db agent_Brain）
├── docs/                     規格（BUCKETS · 02_METADATA · D1–D6 / VSM ref）
├── inbox/                    蟲洞：入庫前暫存（入庫後搬走）
└── Project_Root/
    ├── Physical_Reality/     V01–V05、V12（V06–11 TBC · 禁止入庫）
    └── The_Void_729/         shadow（按需 mkdir）
```

## 邏輯分區

| 櫃 | 用途 |
|----|------|
| **V01** | 外參 |
| **V02** | 全部可交付文章（`vt_site_slug` 分欄目） |
| **V03–V05** | 財務、法律、站點規格 |
| **V12** | 雜項 |
| **V06–11** | TBC · 勿入庫 |

目錄總表：[`docs/BUCKETS.md`](./docs/BUCKETS.md) · 結構：[`docs/STRUCTURE.md`](./docs/STRUCTURE.md)

## 入庫

須完成 **實 + 墟 + project.csv 一行**。

- Metadata：[`docs/02_METADATA.md`](./docs/02_METADATA.md)
- **D1–D6 · vsm**：跟 Spin Map v1.8（[`docs/README.md`](./docs/README.md)）
- Spin Map 全文：`~/Documents/Dev/_shared/spin-map/docs/ai/`（**只讀**）

## 鐵律

- **未 confirm ②** → 禁止文章入 **V02**
- **禁止**回寫 Spin Map · **禁止** `spin_map_copy` 實體複製
- confirm ③ 後方可 export **V02** `exportable` → `project/src/content/`
- **禁止** deploy 未 confirm ③ 的本庫內容

## project.csv

**Spin Map 核心（20 欄）** + **project 擴展（10 欄）** — 見 [`docs/02_METADATA.md`](./docs/02_METADATA.md)

```text
pk,uuid,…,pub_year,pub_year_inferred,vsm,audit,
ingress,doc_class,visibility,spin_map_uuid,vt_site_slug,…
```

`pk` 序號 **本庫獨立**；唔與 Spin Map 或 agent-db 共用。

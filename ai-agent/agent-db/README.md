# agent-db

Vincentian Topology **Agent 工作記憶庫**（P-agent only）。憲法：[`project/constitution/AGENT_DB_V2.0.md`](../project/constitution/AGENT_DB_V2.0.md)

持久資產（文章、外參、財務）→ [`project-db/`](../project-db/) · Spin Map → `~/Documents/Dev/_shared/spin-map`（**只讀**）

## 結構

```
agent-db/
├── agent_Brain.csv           樞（獨立 pk · 唔共用 Spin Map / project.csv）
├── docs/                     規格（STRUCTURE · D1–D6 / VSM ref v1.8）
├── inbox/                    蟲洞：入庫前暫存（入庫後搬走）
└── Project_Root/
    ├── Physical_Reality/     僅 P-agent01–12
    └── The_Void_729/         shadow（按需 mkdir）
```

目錄總表：[`docs/STRUCTURE.md`](./docs/STRUCTURE.md)

## 入庫

須完成 **實 + 墟 + agent_Brain.csv 一行**。

- **P-agent12 備忘**：[`docs/P_AGENT12_MEMO_INGEST.md`](./docs/P_AGENT12_MEMO_INGEST.md)（三件套即止 · 禁止額外同步）
- 檔名鐵律（**须含 agent 名**）：[`docs/FILENAME_INVARIANTS.md`](./docs/FILENAME_INVARIANTS.md)
- **D1–D6 · vsm · pub_year**：跟 Spin Map v1.8（[`docs/README.md`](./docs/README.md)）
- Spin Map 全文：`~/Documents/Dev/_shared/spin-map/docs/ai/`

## 鐵律

- **P-agent 記憶** · confirm ② 交付物入 **project DB**
- **禁止** `spin_map_copy` 實體複製 · **禁止**回寫 Spin Map
- **禁止** deploy 本庫任何內容

## agent_Brain.csv

**Spin Map 核心（20 欄）** + **agent-db 擴展（9 欄）** — 見 [`docs/02_METADATA_INVARIANTS.md`](./docs/02_METADATA_INVARIANTS.md)

```text
pk,uuid,…,pub_year,pub_year_inferred,vsm,audit,
agent_id,origin,ingress,status,visibility,doc_class,spin_map_uuid,human_verdict,human_review_note
```

`human_verdict`：`pending` · `pass` · `fail` · 仅拥有者可改；见憲法 §2.4。

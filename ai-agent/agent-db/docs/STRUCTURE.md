# agent-db · Project_Root 目錄表

> **P-agent only**（V2.0 · 2026-06-28）：本庫 **僅** Agent 工作記憶／會議紀錄。  
> 持久資產 → [`project-db/`](../../../project-db/) · Spin Map → 只讀 ref。  
> 憲法：[AGENT_DB_V2.0.md](../../project/constitution/AGENT_DB_V2.0.md)

---

## 1. 頂層

```text
agent-db/
├── agent_Brain.csv
├── inbox/
└── Project_Root/
    ├── Physical_Reality/     ← 僅 P-agent01–12
    └── The_Void_729/         ← shadow（按需 mkdir）
```

**廢止**：Spin Map B/A/P/M 實體櫃、`ingress: spin_map_copy`（存量 Batch 3 清理）。

---

## 2. P-agent 櫃

| 目錄 | Agent | 用途 |
|------|--------|------|
| P-agent01_Search | 1 | 搜索、草稿、來源評估、會議紀錄 |
| P-agent02_Edit | 2 | 編輯、craft、case study |
| P-agent03_Finance | 3 | 營運（非文章流水） |
| P-agent04_Legal | 4 | 合規 |
| P-agent05 … P-agent11 | — | 預留 |
| P-agent12_Other | — | 雜項 session |

檔名：`YYYYMMDD_agentNN_{descriptor}_{uuid8}.md` → [`FILENAME_INVARIANTS.md`](./FILENAME_INVARIANTS.md)

---

## 3. 落點規則

| 內容 | 落點 |
|------|------|
| Agent session／ops／會議紀錄 | `P-agentNN_*` |
| 草稿流水正本 | P-agent → sync `project/articles/drafts/` |
| confirm ② 文章／外參／財務 | **project DB**（`V02` 等）· **唔**入本庫 |
| Spin Map 材料 | **只讀** · `spin_map_uuid` / 單向 `gravity_links` · **唔** copy 正文 |
| 未整理 | `inbox/` → 入庫後 P-agent 或 project DB |

---

*agent-db STRUCTURE · V2.0 · Batch 2*

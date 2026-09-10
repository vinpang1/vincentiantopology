# Agent 地圖 folder 化 · 驗收

> **日期**：2026-06-28  
> **追蹤**：[`agents/AGENTS_FOLDER_MIGRATION.md`](../../../agents/AGENTS_FOLDER_MIGRATION.md)

---

## 結果

| 批 | 狀態 |
|----|------|
| 0–5 | ✅ 全完成 |

## 新路徑

| Agent | 地圖 |
|-------|------|
| 1 | `ai-agent/agents/agent_01/agent_01.md` |
| 2 | `ai-agent/agents/agent_02/agent_02.md` |
| 3 | `ai-agent/agents/agent_03/agent_03.md` |
| 4 | `ai-agent/agents/agent_04/agent_04.md` |

## 舊檔

`01-search-draft.md` … `04-legal.md` 已改 **stub redirect**（保留過渡連結）。

## grep 驗收

排除：`AGENTS_FOLDER_MIGRATION.md` · `archive/**` · `audit/2026*` · stub 自身

```bash
rg "01-search-draft|agents/02-edit\.md|agents/03-ops|agents/04-legal" \
  --glob '!**/AGENTS_FOLDER_MIGRATION.md' \
  --glob '!**/archive/**' \
  --glob '!**/audit/2026*' \
  --glob '!**/01-search-draft.md' \
  --glob '!**/02-edit.md' \
  --glob '!**/03-ops.md' \
  --glob '!**/04-legal.md'
```

**期望**：0 有效引用。

## 刻意留低

- `audit/20260627_agent02_a2Ed0pS7_review.md` — 歷史審查，記錄遷移前路徑
- P-agent05–11 — 預留，無 folder
- `.cursor/rules/` — 留 repo 根，只改 pointer

備忘入庫 SOP：[`P_AGENT12_MEMO_INGEST.md`](../P_AGENT12_MEMO_INGEST.md)（三件套即止）

---

## 簽署

**驗收** · Agent 地圖 folder 化 Batch 0–5  
2026-06-28

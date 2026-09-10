# Agent 地圖 · Folder 化遷移

> **啟動**：2026-06-28 · Batch 0  
> **上位**：根 [`AGENTS.md`](../../AGENTS.md) · [`project/AGENTS.md`](../../project/AGENTS.md) · [`AGENT_DB_V2.0.md`](../../project/constitution/AGENT_DB_V2.0.md)  
> **執行**：專案擁有者打 `next` / `next batch N` → `@agent-03-ops`（Agent mode）

---

## §0 定案

| 原則 | 定案 |
|------|------|
| 地圖 | 每 agent 一 folder + 主 MD：`agent_0N/agent_0N.md` |
| 正本 | P-agent 流程 **唔搬**；仍在 `agent-db/.../P-agent0N_*/` |
| 內容 | **搬位 + 統一章節**；唔重寫 ops 正文 |
| Cursor | `.cursor/rules/agent-0N-*.mdc` **留原位**；只改 pointer |
| 舊檔 | Batch 5 改 **stub redirect**（預設唔直接刪） |
| P-agent05–12 | 今輪 **唔做** folder（01–04 only） |

### 舊 → 新對照

| Agent | 舊地圖 | 新地圖 | `@` rule | P-agent |
|-------|--------|--------|----------|---------|
| 1 | `agents/01-search-draft.md` | `agents/agent_01/agent_01.md` | `@agent-01-search` | `P-agent01_Search` |
| 2 | `agents/02-edit.md` | `agents/agent_02/agent_02.md` | `@agent-02-edit` | `P-agent02_Edit` |
| 3 | `agents/03-ops.md` | `agents/agent_03/agent_03.md` | `@agent-03-ops` | `P-agent03_Finance` |
| 4 | `agents/04-legal.md` | `agents/agent_04/agent_04.md` | `@agent-04-legal` | `P-agent04_Legal` |

### `agent_0N.md` 固定章節

1. **身份** — `agent_id` · `agent0N` · P-agent · `@` rule · `pipeline_stage`（如適用）
2. **必做流程（唯一）** — pointer → P-agent 正本 + uuid + shadow
3. **記憶／補充**（如有）— 其他 P-agent 檔 pointer 表
4. **規則（上位）** — project 規格連結
5. **職責**
6. **禁止**
7. **完成**

### 相對路徑（Batch 1）

自 `agents/agent_0N/` 出發：

| 舊（`agents/` 根） | 新（`agents/agent_0N/`） |
|--------------------|--------------------------|
| `../agent-db/` | `../../agent-db/` |
| `../../project/` | `../../../project/` |

---

## 批次總覽

| 批 | 名稱 | 狀態 |
|----|------|------|
| **0** | 定案與追蹤檔 | ✅ 2026-06-28 |
| **1** | 建 `agent_01/`–`agent_04/` + 主 MD | ✅ 2026-06-28 |
| **2** | 調用層（`@` rule + 雙 AGENTS） | ✅ 2026-06-28 |
| **3** | P-agent 正本 + README 指向 | ✅ 2026-06-28 |
| **4** | project 區 + 規則檔 + 活躍 drafts | ✅ 2026-06-28 |
| **5** | 舊檔 stub + 全庫掃描 + 驗收 | ✅ 2026-06-28 |

**依賴**：0 → 1 → 2 → 3 → 4 → 5

---

## Batch 0 · 定案與追蹤檔 ✅

### 交付

- [x] 本檔 `ai-agent/agents/AGENTS_FOLDER_MIGRATION.md`
- [x] §0 定案 · 舊→新對照 · 章節模板 · 路徑換算

### 驗收

- [x] 追蹤檔存在 · Batch 1–5 清單齊

---

## Batch 1 · 四個 folder + 主 MD ✅

### 目標

新結構存在；舊四檔暫留。

### 交付

- [x] `agent_01/agent_01.md` ← `01-search-draft.md`
- [x] `agent_02/agent_02.md` ← `02-edit.md`
- [x] `agent_03/agent_03.md` ← `03-ops.md`
- [x] `agent_04/agent_04.md` ← `04-legal.md`
- [x] 相對路徑加深一層 · 章節順序統一

### 驗收

- [x] 四 MD 內部連結可開
- [x] 舊四檔仍在

---

## Batch 2 · 調用層 ✅

### 目標

`@` 後 AI 讀新路徑。

### 交付

- [x] `.cursor/rules/agent-01-search.mdc`
- [x] `.cursor/rules/agent-02-edit.mdc`
- [x] `.cursor/rules/agent-03-ops.mdc`
- [x] `.cursor/rules/agent-04-legal.mdc`
- [x] `.cursor/rules/agent-workflow.mdc`
- [x] 根 `AGENTS.md`
- [x] `project/AGENTS.md`

### 驗收

- [x] 四 mdc「地图」→ `agents/agent_0N/agent_0N.md`
- [x] 雙 AGENTS 主連結為新路徑

---

## Batch 3 · P-agent 指向 ✅

### 目標

正本 `地圖入口` 指新路徑。

### 交付

- [x] P-agent01：`search_ops` · `writing_three_parts` · `writing_citation_tiers` · README
- [x] P-agent02：`edit_ops` · spin_map index · README
- [x] P-agent03：`finance_ops` · `subscription_blueprint` · README
- [x] P-agent04：`legal_ops` · README
- [x] Void ops summary 一行地图引用

### 驗收

- [x] `rg` 舊檔名於 `P-agent0[1-4]/Physical_Reality` 為 0

---

## Batch 4 · project 區 + 規則 + 活躍流水 ✅

### 交付

- [x] `ai-agent/README.md` · `ai-agent/agents/README.md`
- [x] `project/articles/craft/EDIT_RULES.md`
- [x] `project/legal/policies/article_compliance_v0.md`
- [x] `project/finance/README.md` · `project/legal/README.md`
- [x] `project/articles/DRAFTS.md` · `drafts-template/pipeline.md`
- [x] 活躍 `drafts/pyramids-series/` · `草稿區/pyramids-series/pipeline.md`

### 驗收

- [x] `project/` + ai-agent 索引主連結為新路徑

---

## Batch 5 · 收斂 + 驗收 ✅

### 交付

- [x] 舊四檔 → stub redirect
- [x] 根 `MIGRATION.md` 加「Agent 地圖 folder 化」節
- [x] 本檔 Batch 0–5 全 ✅
- [x] `agent-db/docs/audit/agents_folder_migration_20260628.md`

### 全庫 grep

見驗收紀錄 · **0 有效引用**（stub／歷史 audit 除外）✅

---

## 刻意留低

| 項目 | 原因 |
|------|------|
| P-agent05–11 folder | 預留 · 無 `@` rule |
| P-agent12 | 雜項櫃 |
| `.mdc` 搬入 agent folder | Cursor 只認 `.cursor/rules/` |
| 改 P-agent 流程正文 | 今輪只遷移地圖 |

---

## 修改紀錄

| 日期 | 摘要 |
|------|------|
| 2026-06-28 | Batch 0 定案 · 本追蹤檔初版 |
| 2026-06-28 | Batch 1 · `agent_01/`–`agent_04/` + 主 MD |
| 2026-06-28 | Batch 2 · `@` rule + 雙 AGENTS 調用層 |
| 2026-06-28 | Batch 3 · P-agent 正本 + README + Void summary |
| 2026-06-28 | Batch 4 · project 區 + 規則檔 + 活躍 drafts |
| 2026-06-28 | Batch 5 · stub · MIGRATION.md · 驗收 audit · **全批完成** |

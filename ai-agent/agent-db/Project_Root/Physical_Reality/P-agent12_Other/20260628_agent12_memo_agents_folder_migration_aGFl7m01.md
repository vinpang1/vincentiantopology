# 備忘錄 · 四 Agent 地圖 Folder 化

> **作者**：CEO-Vincent（營運整理 · Agent 3）  
> **日期**：2026-06-28  
> **性質**：專案治理備忘 · P-agent12 session  
> **uuid**：`aGFl7m01`  
> **唔** export · 唔改 P-agent 流程正文 · 持久交付資產仍走 project DB（confirm ② 後）

---

## 一、拍板方向

四專職 Agent（01–04）地圖由 **扁平四檔** 改為 **每 agent 獨立 folder + 主 MD**：

| 層 | 定案 |
|----|------|
| **地圖** | `ai-agent/agents/agent_0N/agent_0N.md` — 職責、禁止、上位規則、指向正本 |
| **正本** | **唔搬** · 仍在 `agent-db/.../P-agent0N_*/`（必做流程 + 記憶） |
| **調用** | `.cursor/rules/agent-0N-*.mdc` **留原位** · 只改 pointer |
| **分工** | 地圖 = 短 · P-agent = 長文與持續改善 |

**三層開工順序**（不變）：

```
@ rule → agent_0N/agent_0N.md（地圖）→ P-agent 正本（流程）
```

---

## 二、2026-06-28 完成（Batch 0–5）

| 批 | 內容 | 結果 |
|----|------|------|
| 0 | 定案與追蹤檔 | `ai-agent/agents/AGENTS_FOLDER_MIGRATION.md` |
| 1 | 建四 folder + 主 MD | `agent_01/` … `agent_04/` |
| 2 | 調用層 | 四 mdc + 根／project `AGENTS.md` |
| 3 | P-agent 指向 | 正本 `地圖入口` · README · Void summary |
| 4 | project 區同步 | EDIT_RULES · compliance · DRAFTS · 活躍 drafts |
| 5 | 收斂驗收 | 舊檔 stub · `MIGRATION.md` · audit |

### 舊 → 新對照

| Agent | 舊 | 新 | `@` rule |
|-------|-----|-----|----------|
| 1 | `01-search-draft.md` | `agent_01/agent_01.md` | `@agent-01-search` |
| 2 | `02-edit.md` | `agent_02/agent_02.md` | `@agent-02-edit` |
| 3 | `03-ops.md` | `agent_03/agent_03.md` | `@agent-03-ops` |
| 4 | `04-legal.md` | `agent_04/agent_04.md` | `@agent-04-legal` |

### `agent_0N.md` 固定七章

身份 → 必做流程 → 記憶／補充 → 規則（上位）→ 職責 → 禁止 → 完成

### 驗收

- 全庫 grep：**零**有效舊路徑引用（stub／遷移對照表／歷史 audit 除外）
- 舊四檔改 **一行 stub redirect**（唔直接刪）

---

## 三、團隊須知

1. **@ 調用** 已指新路徑；開工仍須 `@agent-0N-*`，禁止 AI 自行分流。  
2. **P-agent 正本** 係日常操作權威；地圖只 pointer，改善寫正本。  
3. **文章流水**（1→2→4 → ② project DB → ③ Agent 3 export）**唔因 folder 化而改**。  
4. **Agent 3** 地圖在 `agent_03/agent_03.md`；仍 **唔參與** 1→2→4 內容線。

---

## 四、刻意留低

| 項目 | 原因 |
|------|------|
| P-agent05–11 | 預留 · 無 `@` rule · 無 `agent_0N/` folder |
| P-agent12 | 雜項備忘櫃（本 memo 入此） |
| `.mdc` 搬入 agent folder | Cursor 只認 `.cursor/rules/` |
| `audit/20260627_agent02_*` | 歷史審查 · 保留遷移前路徑 |

---

## 五、權威追蹤

- [`ai-agent/agents/AGENTS_FOLDER_MIGRATION.md`](../../../agents/AGENTS_FOLDER_MIGRATION.md)
- [`ai-agent/agent-db/docs/audit/agents_folder_migration_20260628.md`](../../docs/audit/agents_folder_migration_20260628.md)
- 根 [`MIGRATION.md`](../../../../../MIGRATION.md) ·「Agent 地圖 folder 化」節
- 根 [`AGENTS.md`](../../../../../AGENTS.md) · [`project/AGENTS.md`](../../../../../project/AGENTS.md)
- 關聯備忘：[`20260628_agent12_ceo_memo_database_redesign_cEoVn528.md`](./20260628_agent12_ceo_memo_database_redesign_cEoVn528.md) · `cEoVn528`

---

## 簽署

**CEO-Vincent** · Vincentian Topology  
2026-06-28

---

## 修改紀錄

| 日期 | 摘要 |
|------|------|
| 2026-06-28 | 初版入庫 P-agent12 · `agent12_memo_agents_folder_migration` |

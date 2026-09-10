# Vincentian Topology — Agent 指引

外來 Agent（含 Cursor 通用 session）之 **分流入口**。

## 0. 100% 定位 · @ Cursor rule（必須）

**禁止 AI 自行分流。** 开工前用户须 `@` repo 根 `.cursor/rules/` 其中一條。

| 任務 | @ rule | 地圖 | P-agent 必做流程 |
|------|--------|------|------------------|
| 搜尋、起稿 | `@agent-01-search` | [`agent_01/agent_01.md`](../ai-agent/agents/agent_01/agent_01.md) | `P-agent01` · `search_ops_b1Srch9K` |
| 校對 | `@agent-02-edit` | [`agent_02/agent_02.md`](../ai-agent/agents/agent_02/agent_02.md) | `P-agent02` · `edit_ops_a2Ed0pS7` |
| 營運 | `@agent-03-ops` | [`agent_03/agent_03.md`](../ai-agent/agents/agent_03/agent_03.md) | `P-agent03` · `finance_ops_f3Fn7Qp2` |
| 合規 | `@agent-04-legal` | [`agent_04/agent_04.md`](../ai-agent/agents/agent_04/agent_04.md) | `P-agent04` · `legal_ops_c4Lgl2Mx` |

**分工**：`agents/agent_0N/agent_0N.md` = **地圖** · **P-agent 正本** = 必做流程 + 持續改善。

速查：[`../AGENTS.md`](../AGENTS.md) · Cursor workspace 建議開 **repo 根** `vincentian-topology/`。

---

## 1. 必讀（所有 Agent）

1. [`~/Documents/Dev/_shared/governance/PLATFORM_MINIMUM.md`](../../_shared/governance/PLATFORM_MINIMUM.md)
2. [`constitution/EGRESS_V1.0.md`](./constitution/EGRESS_V1.0.md)
3. [`constitution/BLUEPRINT_v2.0.md`](./constitution/BLUEPRINT_v2.0.md)
4. [`constitution/PROJECT_DB_V1.0.md`](./constitution/PROJECT_DB_V1.0.md)
5. [`constitution/AGENT_DB_V2.0.md`](./constitution/AGENT_DB_V2.0.md)
6. [`../ai-agent/agent-db/docs/P_AGENT_MEMORY_PROTOCOL.md`](../ai-agent/agent-db/docs/P_AGENT_MEMORY_PROTOCOL.md) · `AGENT_DB_V2.0` §2.5（`pk` 時間主軸 · 開工記憶）

---

## 2. 分流表（參考 · 仍以 @ rule 為準）

| 若任務涉及… | 派去 | 規格 |
|-------------|------|------|
| 搜尋、fetch、Spin Map B/A、**起稿**、legal fail **退回重做** | **Agent 1** | [`../ai-agent/agents/agent_01/agent_01.md`](../ai-agent/agents/agent_01/agent_01.md) |
| **校對、修飾**、對齊 **edit 規則**、可交付版 | **Agent 2** | [`../ai-agent/agents/agent_02/agent_02.md`](../ai-agent/agents/agent_02/agent_02.md) |
| **發票、記帳、報表** | **Agent 3** | [`../ai-agent/agents/agent_03/agent_03.md`](../ai-agent/agents/agent_03/agent_03.md) |
| **合規審查**、對齊 **compliance 規則** | **Agent 4** | [`../ai-agent/agents/agent_04/agent_04.md`](../ai-agent/agents/agent_04/agent_04.md) |
| **confirm 入 project DB**（AI 執行入庫） | **人工指令** | [`design/EXPORT.md`](./design/EXPORT.md) §B |
| **export／上站／deploy**（confirm ③ 後） | **Agent 3** | [`agent_03/agent_03.md`](../ai-agent/agents/agent_03/agent_03.md) · [`design/EXPORT.md`](./design/EXPORT.md) §C · [`DEPLOY.md`](./design/DEPLOY.md) |
| **網頁設計**（版式、元件） | **Agent 3** | [`agent_03/agent_03.md`](../ai-agent/agents/agent_03/agent_03.md) · `src/` · `design/` |

**混合任務**：按 **當前 `pipeline_stage`** 拆步；每步须 **@ 對應 agent rule**。唔明確時 **問用戶 @ 邊個 rule**。

---

## 3. 文章流水（三個人工關卡）

```
👤 指令 → Agent 1（P-agent 正本 → sync → drafts/）
              ↓
👤 確認 ① 定稿
              ↓
         Agent 2（對齊 edit 規則 · 稿底修改紀錄）
              ↓
         Agent 4（對齊 compliance 規則）
              ├─ fail → 列原因 → 退回 Agent 1（legal_failed → search）
              └─ pass
              ↓
👤 確認 ② 入 project DB → 指令 AI 入庫 → 刪 drafts/{slug}/
              ↓
👤 確認 ③ export／上站 → **@agent-03-ops**（须你先 confirm ③）
```

**Agent 3 不參與** 1→2→4 內容流水 · **confirm ③ 後** 負責 export／deploy／網頁營運。

### pipeline_stage

| stage | 負責 | 下一步 |
|-------|------|--------|
| `search` | Agent 1 | → `awaiting_draft_confirm` |
| `awaiting_draft_confirm` | **用戶 ①** | 定稿 → `draft_confirmed` |
| `draft_confirmed` | — | 用户指令 → Agent 2 |
| `edit` | Agent 2 | → `legal` |
| `legal` | Agent 4 | pass → `awaiting_db_confirm`；fail → `legal_failed` |
| `legal_failed` | Agent 4 列原因 | → Agent 1 · `search` |
| `awaiting_db_confirm` | **用戶 ②** | 入庫指令 → AI 入 **project DB** |
| `confirmed` | — | 已在 project DB；drafts 已刪 |

### 正本與草稿區

- **P-agent**（`agent-db` · P-agent01 等）= Agent 正本
- **drafts/{slug}/** = sync 副本 · 人機合作；**入 project DB 後刪除**
- 同步方向：**P-agent → drafts**（Agent 更新後 sync）

詳 [`articles/DRAFTS.md`](./articles/DRAFTS.md) · 快速入口 repo 根 [`草稿區`](../草稿區/)。

---

## 4. 路徑與權限

| 層 | 路徑 | 權限 |
|---|---|---|
| **Spin Map** | `~/Documents/Dev/_shared/spin-map` | **只讀**；`spin_map_ref` |
| **project DB** | `project-db/` | confirm ② 後資產 · **须用户指令 AI** |
| **agent-db** | `ai-agent/agent-db/` | P-agent 記憶 only |
| **fetch** | `~/Documents/Dev/_shared/fetch/vincentian-topology/` | Agent 1 |
| **本 repo** | 此目錄 | 可讀寫 |

---

## 5. 規則對齊

| Agent | 規則 | 路徑 |
|-------|------|------|
| **2** | edit 規則 | [`articles/craft/`](./articles/craft/) · [`articles/craft/EDIT_RULES.md`](./articles/craft/EDIT_RULES.md) |
| **4** | compliance 規則 | [`legal/policies/article_compliance_v0.md`](./legal/policies/article_compliance_v0.md) · `design/IA.md` 禁發 |

每稿 **底部修改紀錄**；入 project DB 時 **shadow** 記錄全程（見 `EXPORT.md` §B）。

---

## 6. 本 repo 五區

| 區 | 路徑 |
|---|---|
| 1 網頁 | `src/`、`public/`、`design/` |
| 2 文章 | `articles/drafts/`（[`DRAFTS.md`](./articles/DRAFTS.md) · `drafts-template/` · `craft/`）· repo 根 [`草稿區`](../草稿區/) |
| 3 財務 | `finance/` |
| 4 法律 | `legal/` |
| 5 規格 | `constitution/`、**本檔** |

---

## 7. 唯一對外出口

- 公開網頁 **僅** `dist/` · deploy 前 [`design/DEPLOY.md`](./design/DEPLOY.md)

---

## 8. 禁發

`design/IA.md`（如 `KCdl3dH1`, `qpLs5Zya`, `cIT4Y7fF`）。

Cursor：repo 根 `.cursor/rules/agent-0N-*.mdc` · `project/.cursor/rules/articles-craft.mdc`

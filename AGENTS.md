# Vincentian Topology · Agent 調用

> 詳細分流與 pipeline：`project/AGENTS.md` · 規格：`ai-agent/agents/`

## 100% 定位：必须 @ Cursor rule

**禁止** AI 自行猜測 agent 身份。开工前 **必须** `@` 下列 rule 之一：

| 任務 | @ rule | 地圖 → P-agent 流程 |
|------|--------|---------------------|
| 搜索/起稿 | `@agent-01-search` | [`agent_01/agent_01.md`](ai-agent/agents/agent_01/agent_01.md) → `search_ops_b1Srch9K` |
| 校對 | `@agent-02-edit` | [`agent_02/agent_02.md`](ai-agent/agents/agent_02/agent_02.md) → `edit_ops_a2Ed0pS7` |
| 營運 | `@agent-03-ops` | [`agent_03/agent_03.md`](ai-agent/agents/agent_03/agent_03.md) → `finance_ops_f3Fn7Qp2` |
| 合規 | `@agent-04-legal` | [`agent_04/agent_04.md`](ai-agent/agents/agent_04/agent_04.md) → `legal_ops_c4Lgl2Mx` |

规格详情：`project/AGENTS.md` · **`agents/agent_0N/` = 地圖 · P-agent = 流程+記憶**

在 Cursor chat 輸入 `@` → 選 **Agent N · …** rule，再加任務描述。

### 調用示例

```
@agent-01-search  起稿 articles/drafts/my-topic/（或 repo 根 草稿區/my-topic/）· 主題：XXX
@agent-02-edit    校對 articles/drafts/my-topic/ · pipeline_stage: draft_confirmed
@agent-04-legal   審查 articles/drafts/my-topic/ · pipeline_stage: legal
@agent-03-ops     整理 Q2 發票 · project/finance/
@agent-03-ops     confirm ③ 已批 · export slug my-topic → src/content/
@agent-03-ops     改 SiteHeader 樣式 · 小改
```

## 文章流水（三個人工關卡）

```
@agent-01-search → 👤 ① 定稿 → @agent-02-edit → @agent-04-legal
  → fail：@agent-01-search 重做
  → pass → 👤 ② 入 project DB → 👤 ③ confirm → @agent-03-ops export／deploy
```

**Agent 3 不參與** 1→2→4 內容流水 · **confirm ③ 後** 負責發佈／上站。

## 路徑速查

| 層 | 路徑 |
|---|---|
| 規格／網站 | `project/` |
| 草稿（快速） | `草稿區/` → `project/articles/drafts/` |
| agent-db | `ai-agent/agent-db/`（P-agent 記憶） |
| project DB | `project-db/`（持久資產） |
| 四 Agent 規格 | `ai-agent/agents/agent_01/` … `agent_04/` |
| Cursor rules | `.cursor/rules/` |

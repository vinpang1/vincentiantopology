# 草稿區（drafts）

**暫存工作副本**：由 **P-agent 正本 sync 落嚟**，供人機合作。  
**confirm ② 入 project DB 後刪除**本 `{slug}/` 夾。

> **快速入口**：repo 根 [`草稿區`](../../草稿區/)（捷徑 → `articles/drafts/`）· 內裡**只放**進行中嘅 `{slug}/` 稿夾。

## 與 P-agent 關係

| 項目 | 規則 |
|------|------|
| **正本** | `agent-db` · `P-agent01_Search/`（Agent 1 起；2/4 更新 P-agent 對應櫃 session） |
| **副本** | `drafts/{slug}/` ← **sync 自 P-agent** |
| **方向** | Agent 改 P-agent → **sync → drafts**；你改 drafts 時，定稿 confirm ① 前應與 P-agent 一致 |
| **終局** | 入 project DB V02 成功 → **刪** `drafts/{slug}/` |

## 新建

通常由 **@agent-01-search** 起稿（你下指令），唔一定要手動 copy 範本。手動範本：

```bash
cp -R articles/drafts-template articles/drafts/my-slug
```

## 資料夾結構

```
drafts/{slug}/
├── article.md      正文 + frontmatter + 底部「修改紀錄」
├── pipeline.md     流水、人工確認、§Human input（各 Agent）
└── sources.md      （可選）Agent 1 素材
```

## 流水（兩次 confirm + 第三次 export）

```
@agent-01-search → 👤 ① 定稿 → @agent-02-edit → @agent-04-legal
    → fail：列原因 → @agent-01-search
    → pass → 👤 ② 入庫（AI 入 project DB V02 · 刪 drafts）
    → 👤 ③ confirm → @agent-03-ops export／上站
```

地圖 → P-agent 必做流程：根 [`AGENTS.md`](../AGENTS.md) · [`ai-agent/agents/README.md`](../../ai-agent/agents/README.md)（`agent_01/` … `agent_04/`）

### pipeline_stage

| stage | @ rule | 說明 |
|-------|--------|------|
| `search` | @agent-01-search | 搵料、起稿、sync drafts |
| `awaiting_draft_confirm` | **你 ①** | 定稿 |
| `draft_confirmed` | — | 可 @agent-02-edit |
| `edit` | @agent-02-edit | craft / edit_ops |
| `legal` | @agent-04-legal | compliance / legal_ops |
| `legal_failed` | @agent-04-legal → @agent-01-search | 列 `legal_issues` |
| `awaiting_db_confirm` | **你 ②** | 批准入 project DB |
| `confirmed` | — | 已入庫；本夾應已刪 |

**Agent 3 不參與** 1→2→4 · **confirm ③ 後** `@agent-03-ops` 發佈。

## 修改紀錄

每稿 `article.md` **底部**維護 `## 修改紀錄`（Agent 每次改動追加；**行首標 Agent**，例 `Agent 2 · 2026-06-27 · …`）。

入 project DB 時：

| 去向 | 內容 |
|------|------|
| Primary shadow `pipeline_whole` | 全文或摘要 → `revision_log` |
| 各 Agent lens shadow | 按 Agent 篩選 → `## agent_changes` |

詳見 [`design/EXPORT.md`](../design/EXPORT.md) §B3。

## Human input（入庫前必填）

`pipeline.md` 內 **§Human input · Agent N**（範本見 [`drafts-template/pipeline.md`](./drafts-template/pipeline.md)）。

- **你的意見**（方向、用語、書名鎖定、判準型別等）寫入對應 Agent 小節
- confirm ② 入庫時拷入該 Agent 的 `ops_lens`／`search_lens` 等 shadow → `## human_input`
- chat 未整理進 pipeline 的意見 **唔會**自動入庫——定稿／入庫前請補寫

Agent 3 小節可於 confirm ③ 後補 export 指令。

## 入 project DB 後嘅 shadow（文章）

confirm ② 後，每篇 **一個 uuid**（`project-db/` · V02）：

```text
V02 正本（出街稿）
  + pipeline_whole（primary · 中立總帳）
  + auxiliary ×n（AI 按 keyword／topology 按需）
  + Agent 1–4 lens ×4
```

Case study／全 project 复盘 **唔**走呢條線 → `EXPORT.md` §B′（你主動要求；例 `k8CsPy01`）。

## 鐵律

- 未 **confirm ②** 唔入 project DB
- 未 **confirm ③** 唔 export／deploy
- Spin Map 只讀；禁 `spin_map_copy` · 禁 copy `P*`

## 相關

- [`AGENTS.md`](../AGENTS.md) · [`design/EXPORT.md`](../design/EXPORT.md) · 範本 [`drafts-template/`](./drafts-template/)

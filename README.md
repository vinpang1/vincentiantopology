# vincentiantopology

**萬脈同構｜文森思維** — [vincentiantopology.com](https://vincentiantopology.com) 的公開閱讀站與內容工作區（GitHub：`vinpang1/vincentiantopology`）。訂閱／通訊外連：[vincentiantopology.substack.com](https://vincentiantopology.substack.com)。

## 上線線（live line）

| 項目 | 說明 |
|------|------|
| **讀者站** | [vincentiantopology.com](https://vincentiantopology.com)（Vercel 亦見 [vincentiantopology.vercel.app](https://vincentiantopology.vercel.app)） |
| **源碼主線** | `main` — Vercel 自 repo 根 build，產物為 **`project/dist/`**（見根 [`vercel.json`](./vercel.json)） |
| **站內正文** | 僅 `project/src/content/` 經 Astro build 後進入 `dist/`；憲法級出口見 [`project/constitution/EGRESS_V1.0.md`](./project/constitution/EGRESS_V1.0.md) |

本地開發與欄目說明：[`project/README.md`](./project/README.md)。

## 目錄速覽

```
vincentiantopology/
├── project/          Astro 站（src/、design/、articles/、finance/、legal/、constitution/）
├── 草稿區/           捷徑 → project/articles/drafts/（Agent 流水中的進行稿）
├── 待上站/           已備妥、待營運 export（不經 drafts；不會被 Astro 自動載入）
├── project-db/       confirm ② 後的持久資產
├── ai-agent/         四 Agent 規格與 agent-db（P-agent 記憶 · 不出街）
└── AGENTS.md         Cursor 調用入口（須 @ agent rule）
```

## 內容怎麼出街（兩條路）

1. **草稿流水** — `草稿區/` · [`project/articles/DRAFTS.md`](./project/articles/DRAFTS.md)：  
   `@agent-01-search` → 人工 ① 定稿 → `@agent-02-edit` → `@agent-04-legal` → 人工 ② 入 `project-db/` → 人工 ③ → `@agent-03-ops` 依 [`project/design/EXPORT.md`](./project/design/EXPORT.md) 寫入 `project/src/content/` 並 deploy。  
   階段與權限詳表：[`project/AGENTS.md`](./project/AGENTS.md)。

2. **待上站** — [`待上站/`](./待上站/)：已寫好 frontmatter 的稿；同樣要明確指令後由 `@agent-03-ops` copy 至 `src/content/`。說明見 [`待上站/README.md`](./待上站/README.md)。

每次上線前檢查：[`project/design/DEPLOY.md`](./project/design/DEPLOY.md)。

## 從哪裡開始搜／起稿

在 Cursor 先 **`@agent-01-search`**，地圖與必做流程見 [`ai-agent/agents/agent_01/agent_01.md`](./ai-agent/agents/agent_01/agent_01.md)。  
分流表與路徑速查：[`AGENTS.md`](./AGENTS.md) · [`project/AGENTS.md`](./project/AGENTS.md)。

## 規則正本（請查原文，勿在此複製全文）

- 平台底線：`~/Documents/Dev/_shared/governance/PLATFORM_MINIMUM.md`（本機 Dev 宇宙）
- 憲法／藍圖：[`project/constitution/`](./project/constitution/)（含 `BLUEPRINT_v2.0.md`、`EGRESS_V1.0.md`）
- Agent 記憶協議：[`ai-agent/agent-db/docs/P_AGENT_MEMORY_PROTOCOL.md`](./ai-agent/agent-db/docs/P_AGENT_MEMORY_PROTOCOL.md)

遷移紀錄：[`MIGRATION.md`](./MIGRATION.md)。

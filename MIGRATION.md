# Vincentian Topology · 四批次遷移

> 自 `~/Documents/Vincentian Topology` 遷至 `~/Documents/Dev/vincentian-topology/project/`  
> （2026-06-27 自 `~/dev/` 再遷至 `~/Documents/Dev/`，與 AI_agent、fetch_download 等同層）

## 批次總覽

| 批 | 內容 | 狀態 |
|----|------|------|
| **1** | 起 `~/Documents/Dev/`、`project/` 搬遷、`_shared/`（fetch · spin-map · governance） | ✅ 完成 |
| **2** | 改治理文件：constitution、BLUEPRINT v2、README、`.cursor/rules` | ✅ 完成 |
| **3** | 起 `ai-agent/agent-db/` + 四 Agent 規格 + `AGENTS.md` 分流表 | ✅ 完成 |
| **4** | 草稿區 `articles/drafts/{slug}/`、1→2→4 流程、人工確認→A 層→export | ✅ 完成 |

## 批次 1 完成項（2026-06-27）

- [x] `~/Documents/Dev/_shared/governance/PLATFORM_MINIMUM.md`
- [x] `~/Documents/Dev/_shared/fetch/`
- [x] `~/Documents/Dev/_shared/spin-map` → `~/Documents/Spin Map Database`
- [x] `~/Documents/Dev/vincentian-topology/project/`（原 repo 已搬遷）
- [x] 本檔、`~/Documents/Dev/README.md`、專案宇宙 README

## 舊路徑（封存）

| 舊 | 新 |
|----|-----|
| `~/Documents/Vincentian Topology/` | `~/Documents/Dev/vincentian-topology/project/` |
| `~/Documents/Vincentian Topology Database/` | **停用**（批次 2 起文件不再引用；實體未刪） |
| Spin Map | 不搬；經 `~/Documents/Dev/_shared/spin-map` 存取 |

## 批次 2 完成項（2026-06-27）

- [x] `constitution/BLUEPRINT_v2.0.md`
- [x] `constitution/CONSTITUTION_V1.0.md`（專案憲法 · 取代 Project DB 版）
- [x] `constitution/AGENT_DB_V1.0.md`
- [x] `constitution/EGRESS_V1.0.md`（agent-db 禁止出街）
- [x] 舊版移入 `constitution/archive/`
- [x] `README.md`、`AGENTS.md`、`.cursor/rules/vincentian-topology-workflow.mdc`
- [x] `articles/`、`finance/`、`legal/` README

## 批次 3 提示

- 建立 `~/Documents/Dev/vincentian-topology/ai-agent/agent-db/` 目錄骨架
- 建立 `ai-agent/agents/{search,edit,finance,legal}.md`
- 擴充 `AGENTS.md` 分流表

## 批次 3 完成項（2026-06-27）

- [x] `ai-agent/agent-db/`（Brain.csv、inbox、Project_Root、P-agent01–04/12）
- [x] `ai-agent/agents/01`–`04` 規格 + `agents/README.md`
- [x] `project/AGENTS.md` 分流表 + pipeline_stage
- [x] `_shared/fetch/vincentian-topology/`
- [x] `constitution/AGENT_DB_V1.0.md` 路徑定案

## 批次 4 完成項（2026-06-27）

- [x] `articles/drafts/README.md`
- [x] `articles/drafts/_template/`（`article.md`、`pipeline.md`、`sources.md`）
- [x] `design/EXPORT.md`（§A 入 A 層 · §B export · §C 簡圖）
- [x] `articles/ready/README.md`（棄用說明）
- [x] 更新 `articles/README.md`、`AGENTS.md`、`IA.md`、`DEPLOY.md`

## 批次 5 · 併入 Documents/Dev（2026-06-27）

- [x] `~/dev/vincentian-topology/` → `~/Documents/Dev/vincentian-topology/`
- [x] `~/dev/_shared/` → `~/Documents/Dev/_shared/`
- [x] 治理文件、`AGENTS.md`、`.cursor/rules` 路徑改為 `~/Documents/Dev/…`
- [x] `~/dev/README.md` 留 redirect 指標

## 四批次遷移 · 完成

`~/Documents/Dev` 新架構已就緒（與 `AI_agent`、`fetch_download` 等並列）。

## agent-db 基建（2026-06-27）

| 批 | 內容 | 狀態 |
|----|------|------|
| **1** | `Physical_Reality` 37 buckets + P-agent05–11 + `docs/STRUCTURE.md` | ✅ |
| **2** | D1–D6 + VSM 規格 + shadow 模板 | ✅ |
| **3** | `Brain.csv` 標題 + 憲法 Hybrid | ✅ |
| **4** | Review agent02 `a2Ed0pS7` | ✅ |
| **5** | Repair agent02 | ✅ |

### 批 5 完成项（2026-06-27）

- [x] shadow 搬至 `The_Void_729/2/1/2/1/2/2/…`
- [x] d1–d6 数值 · qutrit `2/1/2/1/2/2` · vsm `102140200`
- [x] 补 `doc_summary` / `view_summary` / D1–D6 / V-S 表
- [x] `Brain.csv` 同步 · `audit: pending`
- [x] 删旧 shadow 路径 `1/0/1/0/1/2/…`

**agent-db 基建五批 · 完成**

### V1.2 · human_verdict（2026-06-27）

- [x] `Brain.csv` + shadow YAML：`human_verdict` · `human_review_note`
- [x] `AGENT_DB` §2.6 · `02_METADATA` · 模板 · agents README

### 批 3 完成項（2026-06-27）

- [x] `Brain.csv` 標題：Spin Map 核心 18 欄 + 擴展 7 欄
- [x] 既有 data row 遷至新欄序（`qutrit` 改斜線格式；**d1–d6 待批 5 repair**）
- [x] `AGENT_DB_V1.0.md` → **V1.1**（Hybrid · metadata 對齊）
- [x] `constitution/README.md`、`agent-db/README.md`

### 批 4 完成项（2026-06-27）

- [x] `docs/audit/20260627_agent02_a2Ed0pS7_review.md`（F1–F8 违规 + 批 5 建议 d/vsm/qutrit）

### 流水 v1.1（2026-06-27）

- 三個人工關：① 定稿 · ② 入 A 層 · ③ export（獨立）
- P-agent 正本 → sync drafts → 入庫后 **刪 drafts**
- Agent 4 fail → **Agent 1** 重做
- `EDIT_RULES.md` · `article_compliance_v0.md` · 稿底修改紀錄 → shadow

---

## 三庫重設計（2026-06-28 · Batch 0–5）

> 詳見 [`project/constitution/DATABASE_REDESIGN.md`](project/constitution/DATABASE_REDESIGN.md)

| 批 | 內容 | 狀態 |
|----|------|------|
| **0** | 憲法（PROJECT_DB V1.0 · AGENT_DB V2.0）· `project-db/docs/` 規格草稿 | ✅ |
| **1** | `project-db/` 骨架 · `project.csv` · V 櫃 | ✅ |
| **2** | `agent_Brain.csv` 改名 · agent-db STRUCTURE P-agent only | ✅ |
| **3** | 清理 agent-db `spin_map_copy` Hybrid 層 | ✅ |
| **4** | EXPORT · BLUEPRINT · agents · rules · DRAFTS | ✅ 2026-06-28 |
| **5** | 驗收 · 舊 DB SUPERSEDED · acceptance audit | ✅ 2026-06-28 |

---

## 整理（2026-06-27 · 草稿區捷徑）

- [x] repo 根 `草稿區/` → symlink `project/articles/drafts/`（只放 `{slug}/` 稿夾）
- [x] 說明移至 `articles/DRAFTS.md` · 範本移至 `articles/drafts-template/`
- [x] 刪除棄用 `articles/ready/`
- [x] `src/content/` 佔位稿改 `draft: true`（避免誤上線）
- [x] 合併 Cursor workflow：僅 repo 根 `.cursor/rules/agent-workflow.mdc`（刪 `project/.cursor/rules/vincentian-topology-workflow.mdc`）
- [x] 更新 `README.md`、`AGENTS.md`、`EGRESS` 路徑說明

---

## Agent 地圖 folder 化（2026-06-28 · Batch 0–5）

> 詳見 [`ai-agent/agents/AGENTS_FOLDER_MIGRATION.md`](ai-agent/agents/AGENTS_FOLDER_MIGRATION.md)

| 批 | 內容 | 狀態 |
|----|------|------|
| **0** | 定案與追蹤檔 | ✅ |
| **1** | `agent_01/`–`agent_04/` + `agent_0N.md` | ✅ |
| **2** | `@` rule + 根／project `AGENTS.md` | ✅ |
| **3** | P-agent 正本 `地圖入口` + Void summary | ✅ |
| **4** | project 規則檔 · DRAFTS · 活躍 drafts | ✅ |
| **5** | 舊四檔 stub · 全庫驗收 | ✅ |

### 批 5 完成項（2026-06-28）

- [x] `01-search-draft.md` … `04-legal.md` → stub redirect
- [x] 調用層、P-agent、project 索引已指 `agents/agent_0N/agent_0N.md`
- [x] 驗收紀錄 [`agent-db/docs/audit/agents_folder_migration_20260628.md`](ai-agent/agent-db/docs/audit/agents_folder_migration_20260628.md)

**Agent 地圖 folder 化 · 完成**


# Vincentian Topology

**萬脈同構｜文森思維** — 公開閱讀網站（[vincentiantopology.com](https://vincentiantopology.com)）

> 工作區路徑：`~/Documents/Dev/vincentian-topology/project/`  
> 專案宇宙說明：[`../README.md`](../README.md) · 遷移：[`../MIGRATION.md`](../MIGRATION.md)

## 架構總覽

| 層 | 路徑 | 說明 |
|---|---|---|
| **憲法／藍圖** | [`constitution/`](./constitution/) | 專案最高層治理（v2.0 · agent-db） |
| **本 repo** | 此目錄 | 網站、文章、財務、法律 |
| **agent-db** | `ai-agent/agent-db/` | P-agent01–12 流程+記憶（**禁出街**） |
| **project DB** | `project-db/` | 持久資產（V01–V05、V12） |
| **Spin Map** | `~/Documents/Dev/_shared/spin-map` | 全域寫作庫（**只讀**） |

詳見 [`constitution/BLUEPRINT_v2.0.md`](./constitution/BLUEPRINT_v2.0.md)。

## 守則

| 層 | 規則 |
|---|---|
| **平台底線** | [`~/Documents/Dev/_shared/governance/PLATFORM_MINIMUM.md`](../../_shared/governance/PLATFORM_MINIMUM.md) |
| **Spin Map** | **只讀** · `spin_map_ref`；**禁止**回寫 · **禁止** `spin_map_copy` |
| **agent-db** | P-agent 記憶；**永**不出街 |
| **project DB** | confirm ② 後入庫；confirm ③ 後 export V02 |
| **本 repo** | 上站稿在 `src/content/` |
| **對外出口** | **僅** `dist/`（見 `constitution/EGRESS_V1.0.md`） |

Agent：repo 根 [`../AGENTS.md`](../AGENTS.md)（**@ agent rule**）· 詳情 `AGENTS.md` · 規格 `../ai-agent/agents/` · Cursor：repo 根 `.cursor/rules/`

## 本 repo 五區

| 區 | 路徑 |
|---|---|
| 1 網頁 | `src/`、`public/`、`design/`（BRAND · IA） |
| 2 文章 | [`articles/drafts/`](./articles/drafts/)（只放 `{slug}/`）· 說明 [`DRAFTS.md`](./articles/DRAFTS.md) · 範本 [`drafts-template/`](./articles/drafts-template/) · [`craft/`](./articles/craft/) |
| 3 財務 | `finance/` |
| 4 法律 | `legal/` |
| 5 規格 | `constitution/`、`design/`（EXPORT · DEPLOY）、`AGENTS.md` |

**快速入口**：repo 根 [`草稿區`](../草稿區/)（捷徑 → `articles/drafts/`）

## 欄目

| 路徑 | 中文 | 英文 |
|---|---|---|
| `/intro` | 關於我們 | About Us |
| `/view` | 文森世界 | Vincentian View |
| `/topics` | 專題探討 | Special Topics |
| `/classics` | 經典註解 | Classic Commentary |

- **Subscribe**：外連 placeholder（`src/site.config.ts` → `subscribeUrl`）
- **單向**：無 email 收集、無留言、無站內 Premium 牆

## 開發

```bash
cd ~/Documents/Dev/vincentian-topology/project
npm install
npm run dev
```

瀏覽器：**http://127.0.0.1:4321/**

```bash
npm run build
npm run preview
```

## Logo

官方 logo：`public/logo.png` — 詳見 `design/BRAND.md`

## 文章

**上站稿**在 `src/content/`（`intro/`、`view/`、`topics/`、`classics/`）。佔位稿設 `draft: true`，confirm ③ export 後方為正式上線。

**草稿**（[`articles/DRAFTS.md`](./articles/DRAFTS.md)）· 快速入口 repo 根 [`草稿區`](../草稿區/)

**流水**（[`design/EXPORT.md`](./design/EXPORT.md)）：

```
Agent 1 → 👤① 定稿 → Agent 2 → Agent 4 → (fail→Agent 1) → 👤② 入 project DB（刪 drafts）→ 👤③ export
```

`spin_map_source` 僅供內部追溯，不出現在讀者正文。

## 部署與出門

- **憲法級**：僅 `npm run build` 產物 **`dist/`** 可上傳
- 每次 deploy 前見 [`design/DEPLOY.md`](./design/DEPLOY.md)

## 部署（hosting）

建議 Vercel 或 Cloudflare Pages。詳見 `design/IA.md`。

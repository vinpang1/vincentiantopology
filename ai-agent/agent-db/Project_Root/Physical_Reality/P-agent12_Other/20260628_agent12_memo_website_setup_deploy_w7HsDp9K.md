# 備忘錄 · 網站建立與上站流程

> **作者**：CEO-Vincent（營運整理 · Agent 3 · 源自 2026-06-28 Q&A）  
> **日期**：2026-06-28  
> **性質**：營運／上站 SOP 備忘 · P-agent12 session  
> **uuid**：`w7HsDp9K`  
> **唔** export · 出街稿仍走 project DB V02 → confirm ③ → `src/content/`

---

## 一、拍板方向

公開站 **vincentiantopology.com** 技術棧已定：**Astro 6 靜態站** · build 產物 **`project/dist/`** 為 **唯一** 可上 server 內容（[`EGRESS_V1.0`](../../../../../project/constitution/EGRESS_V1.0.md)）。

| 層 | 定案 |
|----|------|
| **Hosting** | **Vercel** 或 **Cloudflare Pages**（[`project/README.md`](../../../../../project/README.md) · [`design/IA.md`](../../../../../project/design/IA.md)） |
| **版控** | **GitHub Private repo**（配合 AI push → 自動 build／deploy） |
| **Monorepo root** | Hosting **Root Directory = `project`**（唔係 repo 根） |
| **Build** | `npm run build` · Output = **`dist`** |
| **DNS** | 域名現於 GoDaddy · 待脫 Builder · 指去 Vercel／Cloudflare（IA 待辦） |
| **唔用** | GoDaddy Website Builder · 傳統 cPanel／FTP 整 repo 作 web root |

**配合 AI 操作**：code 改喺 repo → push GitHub → 平台自動 build → 只發布 `dist/`；內部 folder（`agent-db`、`finance/`、`legal/` 等）永不上傳。

---

## 二、網頁位置速查

| 層 | 路徑 | 用途 |
|----|------|------|
| 草稿 | `草稿區/` → `project/articles/drafts/` | 寫稿中 |
| 持久庫 | `project-db/`（V02_Articles） | confirm ② 入庫 |
| **出街正文** | `project/src/content/` | confirm ③ export 後 |
| 頁面模板 | `project/src/pages/` | Astro 路由 |
| 靜態資源 | `project/public/` | logo、favicon |
| **Build 產物** | `project/dist/` | **唯一可上 server** |

### URL 欄目（[`design/IA.md`](../../../../../project/design/IA.md)）

| 路徑 | 欄目 |
|------|------|
| `/intro/{slug}` | 入門閱讀 |
| `/view/{slug}` | 文森世界 |
| `/topics/{series}/{episode}` | 專題探討 |
| `/classics/{slug}` | 經典註解 |
| `/about` | About |

---

## 三、文章 → 上站流水

```
@agent-01-search → sync drafts/
    ↓  👤 confirm ① 定稿
@agent-02-edit → @agent-04-legal
    ↓  pass
    ↓  👤 confirm ② 入 project DB V02 · 刪 drafts/
    ↓  👤 confirm ③（另指令）
@agent-03-ops export → src/content/ → npm run build → DEPLOY.md ✓ → deploy
```

| # | 關卡 | 誰做 |
|---|------|------|
| ① | 定稿 | 👤 人工 |
| ② | 入 project DB | 👤 人工指令 AI |
| ③ | export／上站準備 | 👤 人工指令 |
| deploy | 出門檢查 + 上線 | 👤 明確指令 · `@agent-03-ops` |

**鐵律**：未 ② 禁入 project DB · 未 ③ 禁 export · 公開 server 只收 `dist/`。

---

## 四、一次性設定（擁有者人手）

### 階段 A · GitHub

| 步 | 動作 |
|----|------|
| A1 | 註冊／登入 [github.com](https://github.com) |
| A2 | New repository · **Private** · 唔勾 README |
| A3 | 本機 push（repo 根 `vincentian-topology/`） |

```bash
cd ~/Documents/Dev/vincentian-topology
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<帳號>/vincentian-topology.git
git push -u origin main
```

推送前確認：`project/finance/private/`、`project/legal/private/` 已在 `.gitignore`。

### 階段 B · Vercel（建議新手）或 Cloudflare Pages

| 設定項 | 值 |
|--------|-----|
| Root Directory | **`project`** |
| Build command | `npm run build` |
| Output directory | **`dist`** |
| Node | ≥ 22.12 |

Deploy 成功後記低預覽 URL（例 `xxx.vercel.app`）。

### 階段 C · 域名

| 步 | 動作 |
|----|------|
| C1 | Hosting 平台 Add Domain → `vincentiantopology.com` |
| C2 | 跟平台指示改 GoDaddy DNS |
| C3 | 等 DNS 生效 · 開站驗收 |

---

## 五、日常分工（人 vs AI）

| 步 | 負責 |
|----|------|
| 起稿、校對、合規 | `@agent-01-search` / `@agent-02-edit` / `@agent-04-legal` |
| confirm ①②③ | **👤 擁有者** |
| export · build · DEPLOY 檢查 | `@agent-03-ops`（confirm ③ 後） |
| 最終批准 deploy | **👤 擁有者** |
| push → 自動上網 | GitHub 觸發 CI（或 AI 代 push） |

本地預覽：

```bash
cd ~/Documents/Dev/vincentian-topology/project
npm install    # 首次
npm run dev    # http://127.0.0.1:4321/
npm run build
npm run preview
```

---

## 六、Deploy 前必查（[`DEPLOY.md`](../../../../../project/design/DEPLOY.md) 精簡）

- [ ] Hosting output = **`dist`**
- [ ] 今次稿來自 confirm ③ export
- [ ] 出街稿 `draft: false`
- [ ] `dist/` 無 `finance`、`legal`、`constitution`、`articles` 等內部路徑
- [ ] 記 commit hash 方便回滾

---

## 七、刻意留低

| 項目 | 原因 |
|------|------|
| GitHub remote | 2026-06-28 時本機 repo **未** push · 待擁有者完成階段 A |
| DNS 脫 GoDaddy Builder | IA 待辦 · 未驗收 |
| Vercel vs Cloudflare 二揀一 | 文檔並列 · 擁有者開戶時定案 |
| 首篇 confirm ③ export | 日常流水 · 唔阻塞 infra 設定 |

---

## 八、權威追蹤

- [`project/README.md`](../../../../../project/README.md) · 部署（hosting）節
- [`project/design/DEPLOY.md`](../../../../../project/design/DEPLOY.md)
- [`project/design/EXPORT.md`](../../../../../project/design/EXPORT.md)
- [`project/design/IA.md`](../../../../../project/design/IA.md)
- [`project/constitution/EGRESS_V1.0.md`](../../../../../project/constitution/EGRESS_V1.0.md)
- Agent 3 正本：[`20260627_agent03_finance_ops_f3Fn7Qp2.md`](../P-agent03_Finance/20260627_agent03_finance_ops_f3Fn7Qp2.md) · `f3Fn7Qp2`
- 關聯備忘：[`20260628_agent12_ceo_memo_database_redesign_cEoVn528.md`](./20260628_agent12_ceo_memo_database_redesign_cEoVn528.md) · `cEoVn528`

---

## 簽署

**CEO-Vincent** · Vincentian Topology  
2026-06-28

---

## 修改紀錄

| 日期 | 摘要 |
|------|------|
| 2026-06-28 | 初版入庫 P-agent12 · `agent12_memo_website_setup_deploy` · Agent 3 整理 Q&A 流程 |

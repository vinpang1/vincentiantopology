# 備忘錄 · 展示網站整體方案 v1.1

> **作者**：CEO-Vincent（整合 · Agent 3）  
> **日期**：2026-08-22  
> **性質**：營運／上站總藍圖 · P-agent12 session  
> **uuid**：`w9PlV11K`  
> **取代**：v1.0 草稿（未入庫）· **整合並修訂** [`w7HsDp9K`](./20260628_agent12_memo_website_setup_deploy_w7HsDp9K.md)（2026-06-28 SOP）  
> **唔** export · 出街稿仍走 project DB V02 → confirm ③ → `src/content/`

---

## 一、一句話

GitHub Private 存源碼同版本備份 → Vercel 只 build `project/`、只發布 `dist/` → GoDaddy 管域名（DNS 指向 Vercel，唔用 Website Builder）。

讀者只見 Astro build 產物 `project/dist/`。草稿、財務、法律、憲法、agent-db、project-db 唔出現喺公開網站。

**v1.1 寫死：**「唔出街」≠「唔上雲」。若 push 成個 `vincentian-topology` repo，GitHub 伺服器會有內部檔；Vercel 連 repo 時會 clone 成個庫，即使只 build `project/`。公開網頁仍然只有 `dist/`。呢個係刻意用 Private repo 做備份嘅取捨。

---

## 二、專案定位

| 項目 | 內容 |
|------|------|
| **專案名稱** | Vincentian Topology（萬脈同構｜文森思維） |
| **對外網址** | vincentiantopology.com |
| **網站性質** | 單向閱讀展示站（無留言、無 email 收集、無站內付費牆） |
| **技術棧** | Astro 6 靜態站 · Markdown 內容 |
| **版控** | GitHub Private repo |
| **Hosting** | Vercel（建議）或 Cloudflare Pages |
| **域名** | GoDaddy（DNS 指向 Vercel） |
| **開發環境** | Cursor + 四 Agent 流水 |
| **預估 repo 大小** | 幾 MB～幾十 MB（遠低於 GitHub 建議上限） |
| **月費（技術平台）** | GitHub Free + Vercel Hobby ≈ **$0**（域名年費另計） |
| **Hobby 用途** | 個人／非商業；若改公司商業站可能要 Pro |

---

## 三、平台分工

| 平台 | 角色 |
|------|------|
| **GitHub** | 檔案櫃 + 改動日記（源碼、Private repo；可含內部檔） |
| **Vercel** | 廚房 + 門面（Root=`project` → `npm run build` → 發布 `dist/`） |
| **GoDaddy** | 招牌地址（DNS 指向 Vercel） |

日常：改完 → 該走嘅 confirm 做完 → `git push` → Vercel 自動 build → 約 1–3 分鐘網站更新。

**自動 deploy ≠ 跳過 confirm ③。** push `main` 就會上線；未 confirm 嘅稿必須保持 `draft: true`。

### Vercel Hobby 實際額度（v1.1 更正）

| 項目 | 限制 |
|------|------|
| 流量 | 約 **100 GB／月**（Fast Data Transfer） |
| 每次 build | 最長 **45 分鐘**（靜態站通常 1–3 分鐘） |
| 同時 build | **1 條** |
| 每日 deploy | 約 **100 次** |
| 超額 | Hobby 可能 **pause**（唔係自動加錢） |

**唔使用**「Vercel 每月 6,000 分鐘」——該表述不正確。

---

## 四、本機目錄結構

```
~/Documents/Dev/
├── _shared/
│   ├── governance/          平台底線
│   ├── fetch/               搜索下載
│   └── spin-map/            全域寫作庫（只讀，禁回寫）
│
└── vincentian-topology/     ← GitHub repo 根
    ├── 草稿區/              捷徑 → project/articles/drafts/
    ├── project/             網站 + 文章 + 財務 + 法律 + 規格
    ├── project-db/          持久資產（V02 文章等）
    └── ai-agent/agent-db/   P-agent 記憶（禁出街；Private 備份另計）
```

### `project/` 五區

| 區 | 路徑 | 職責 | 公開網站 |
|----|------|------|----------|
| **1 網頁** | `src/`、`public/` | Astro 站 · 上站稿 `src/content/` | 經 build → `dist/` |
| **2 文章** | `articles/drafts/` | 草稿工作區 | 否 |
| **3 財務** | `finance/` | 營運記帳 | 否 |
| **4 法律** | `legal/` | 法務工作稿 | 否 |
| **5 規格** | `constitution/`、`design/` | 憲法、IA、DEPLOY | 否 |

---

## 五、網站欄目（以 [`IA.md`](../../../../../project/design/IA.md) 為準）

| URL | 欄目 |
|-----|------|
| `/` | 首頁 |
| `/intro`、`/intro/{slug}` | 關於我們 |
| `/view`、`/view/{slug}` | 文森世界 |
| `/topics`、`/topics/{系列}/{期}` | 專題探討 |
| `/classics`、`/classics/{slug}` | 經典註解 |
| 外連 | Subscribe（`site.config.ts` placeholder） |

---

## 六、內容流水（三個人工關卡）

```
@agent-01-search 起稿 → sync drafts/
    ↓
👤 ① 定稿
    ↓
@agent-02-edit 校對 → @agent-04-legal 合規
    ↓ (fail → 返 Agent 1)
👤 ② 入 project DB V02 · 刪 drafts/{slug}/
    ↓
👤 ③ confirm export
    ↓
@agent-03-ops export → src/content/ → build → DEPLOY.md ✓ → push 上線
```

| 關卡 | 動作 | 負責 | 禁止 |
|------|------|------|------|
| **①** | 定稿 | 👤 擁有者 | 未定稿唔做 edit |
| **②** | 入 project DB · 刪 drafts | 👤 指令 AI | 未 ② 禁入庫 |
| **③** | export 上站稿 | 👤 指令 AI | 未 ③ 禁 export |
| **deploy** | 出門檢查 + push | 👤 批准 · Agent 3 執行 | 未完成 DEPLOY.md 禁上線 |

Agent 3 **唔參與** 1→2→4 流水；confirm ③ 後先負責 export／deploy。Agent **禁止**自行判定「可以上線」。

### 檔案去向

| 階段 | 檔案位置 |
|------|----------|
| 寫稿中 | `草稿區/` → `project/articles/drafts/{slug}/` |
| 入庫後 | `project-db/`（V02_Articles） |
| 出街前 | `project/src/content/{欄目}/` |
| 讀者見到 | `project/dist/`（`npm run build` 後） |

---

## 七、技術部署方案

### 7.1 建議技術選型

| 層 | 選型 | 理由 |
|----|------|------|
| 前端框架 | **Astro 6** | 靜態站、Markdown 原生、SEO 友好 |
| 版控 | **GitHub Private** | 免費、業界標準、連動 Vercel |
| Hosting | **Vercel**（首選） | Astro 友好、免費額度夠個人站、自動 HTTPS |
| 備選 Hosting | Cloudflare Pages | 同樣免費、全球 CDN |
| 域名 | **GoDaddy**（已有） | 脫 Builder · DNS 指 Vercel |
| 開發工具 | **Cursor** | AI Agent 整合 |

### 7.2 Vercel 關鍵設定（最易錯）

| 設定項 | 值 | 備註 |
|--------|-----|------|
| **Root Directory** | `project` | ⚠️ 唔係 repo 根 |
| **Build command** | `npm run build` | |
| **Output directory** | `dist` | 唯一出街產物 |
| **Node version** | ≥ 22.12 | 對準 `project/package.json` engines |
| **Framework** | Astro | 可自動偵測 |

### 7.3 本機開發指令

```bash
cd ~/Documents/Dev/vincentian-topology/project
npm install          # 首次
npm run dev          # http://127.0.0.1:4321/
npm run build
npm run preview
```

### 7.4 回滾兩層

1. **Vercel dashboard** → 舊 deployment Instant Rollback  
2. **`git revert`** 後再 push

---

## 八、Git 與 gitignore

### 會進 GitHub Private（若 push 成個 repo）

- `project/src/`、`public/`、`articles/`（含進行中 drafts）
- `ai-agent/`、`project-db/`
- `constitution/`、`design/`
- `finance/`、`legal/` 嘅非 private 部分（例如 templates）

### 唔會進 git（`project/.gitignore`，唔係 repo 根 `.gitignore`）

- `project/node_modules/`
- `project/dist/`（Vercel 自己 build）
- `project/.astro/`
- `project/.env`、`.env.production`
- `project/finance/private/`
- `project/legal/private/`

repo 根 `.gitignore` 而家只有 `.DS_Store`、`.idea/`。有效擋敏感區嘅係 **`project/.gitignore`**。

### 第一次 push 必查

```bash
cd ~/Documents/Dev/vincentian-topology
git status    # 必做：核對 staged 名單
```

- [ ] 無 `finance/private/`、`legal/private/`
- [ ] 無 `.env`、私鑰、token
- [ ] 無 `node_modules/`、`dist/`
- [ ] 知悉 `drafts/`、`agent-db/`、`project-db/` 會一併上 Private GitHub

若已經係 git repo，**唔好再** `git init`；睇 `git remote -v` 再 push。

---

## 九、出門鐵律（EGRESS）

公開 server **唯一合法來源** = `npm run build` 產物 **`project/dist/`**

### 永不上公開網站

| 類別 | 路徑 |
|------|------|
| 草稿 | `articles/`（含 `drafts/`） |
| 財務 | `finance/`（含 `private/`） |
| 法律 | `legal/`（含 `private/`） |
| 憲法 | `constitution/` |
| 內部設計 | `design/` |
| AI 記憶 | `ai-agent/agent-db/` |
| 持久庫 | `project-db/`（未經 confirm ③ export 部分） |
| 依賴 | `node_modules/` |
| Spin Map | `~/Documents/Dev/_shared/spin-map`（只讀） |

`public/` 只放讀者理應公開嘅檔（logo、favicon）。禁止放帳目、合約、憲法、草稿、`.env`、私鑰。

---

## 十、Deploy 前檢查（[`DEPLOY.md`](../../../../../project/design/DEPLOY.md)）

- [ ] Hosting Root = `project` · output = `dist` · Node ≥ 22.12
- [ ] 今次稿來自 confirm ③ export
- [ ] 出街稿 `draft: false`
- [ ] `public/` 無敏感檔
- [ ] `finance/private/`、`legal/private/` 未誤 commit（`git status`）
- [ ] build 後抽查 `dist/`：無 `finance`、`legal`、`constitution`、`articles` 等路徑
- [ ] 記 commit hash；知點喺 Vercel 回滾
- [ ] 未完成檢查 → **禁止 deploy**

---

## 十一、實施階段

### Phase 0 · 已完成 ✅

| 項目 | 狀態 |
|------|------|
| `~/Documents/Dev` 結構遷移 | ✅ |
| 憲法、BLUEPRINT v2、四 Agent 規格 | ✅ |
| Astro 站骨架、欄目、佔位稿 | ✅ |
| 草稿區、export 流程文件 | ✅ |
| Cursor rules、AGENTS.md | ✅ |
| 首篇真實內容走完 ①②③ | 進行中（drafts 仍在） |

### Phase 1 · 基礎設施（一次性 · 擁有者人手）

| 步 | 任務 | 狀態 |
|----|------|------|
| A1 | GitHub 帳號 + 2FA + Private repo | ⬜ |
| A2 | `git status` 核對後首次 push | ⬜ |
| B1 | Vercel 連 GitHub（Hobby 個人站） | ⬜ |
| B2 | Root=`project`、Output=`dist`、Node≥22.12 | ⬜ |
| B3 | 確認 `xxx.vercel.app` 可開 | ⬜ |
| C1 | Vercel Add Domain `vincentiantopology.com` | ⬜ |
| C2 | GoDaddy 改 DNS（脫 Builder） | ⬜ |
| C3 | DNS 生效驗收 | ⬜ |

**DNS 過渡：** 改記錄期間舊 Builder 站可能斷、新站未生效。預留 **24–48 小時**窗口。

**Phase 1 完成標準：** `vincentiantopology.com` HTTPS 見到 Astro 首頁。

### Phase 2 · 首篇內容上線

- [ ] 首篇走通 1→2→4 流水
- [ ] 👤 confirm ①②③
- [ ] Agent 3 export + DEPLOY 檢查 + push
- [ ] 各欄目驗收

### Phase 3 · 日常（持續）

| 節奏 | 動作 |
|------|------|
| 有新稿 | 流水 → confirm ①②③ → export → push |
| 改樣式 | 改 `src/` → preview → push |
| 每月 | 抽查 DEPLOY、Vercel 用量（防 pause） |
| 每年 | 續費域名、檢查依賴 |

---

## 十二、日常分工

| 工作 | 誰做 | 工具 |
|------|------|------|
| 起稿、搜索 | Agent 1 | `@agent-01-search` |
| 校對 | Agent 2 | `@agent-02-edit` |
| 合規 | Agent 4 | `@agent-04-legal` |
| export / build / deploy | Agent 3 | `@agent-03-ops`（confirm ③ 後） |
| 三個 confirm | 👤 擁有者 | 人工批准 |
| 最終批准 deploy | 👤 擁有者 | |
| 存版本 | GitHub | `git push`（可 AI 代做，push 前仍要 `git status`） |
| 自動上網 | Vercel | push 觸發 |

### 穩定後最簡流程

1. Cursor／Agent 完成該做嘅流水  
2. 本地 `npm run dev` 或 `preview`（建議）  
3. 新文章：👤 confirm ③  
4. `git status` → commit → push  
5. 等 Vercel build  
6. 打開 vincentiantopology.com 驗收  

---

## 十三、成本

| 項目 | 方案 | 月費 |
|------|------|------|
| GitHub | Free（Private repo） | $0 |
| Vercel | Hobby（個人） | $0 |
| GoDaddy 域名 | 已有 | 年費另計 |
| Cursor | 現有訂閱 | 視方案 |

repo 大小：源碼＋內容通常幾 MB～幾十 MB。GitHub 建議 repo < 5 GB、單檔 < 100 MB。唔需要 Git LFS。

---

## 十四、風險與應對

| 風險 | 應對 |
|------|------|
| 誤 commit `private/` | `project/.gitignore` + 每次 push 前 `git status` |
| Vercel Root 設錯 | 固定 `project`；DEPLOY §A |
| 未 confirm ③ 就上線 | `draft: true`；Agent 3 禁止自行判定 |
| push 即 deploy | 當操作紀律；大改先本地 preview |
| DNS 過渡斷站 | 預留 24–48h；跟 Vercel DNS 指示 |
| 本機硬碟故障 | Private GitHub 備份（含內部檔之取捨） |
| 改壞樣式 | Vercel 回滾 或 `git revert` |
| GitHub token／帳號洩漏 | 2FA；Private = 內部庫一齊暴露 |
| Hobby 當商業用 | 檢查 Vercel 條款；必要時 Pro |

---

## 十五、驗收清單

### 基礎設施

- [ ] `vincentiantopology.com` HTTPS 正常
- [ ] intro / view / topics / classics 可達
- [ ] Mobile 排版正常
- [ ] push `main` 後自動 deploy

### 內容流水

- [ ] 首篇真實文章完成 ①②③
- [ ] `dist/` 抽查無內部路徑
- [ ] drafts 入庫後已刪該 slug

### 安全

- [ ] 公開 URL 訪問內部路徑名 → 404
- [ ] 公開 HTML 無 agent-db／project-db／private 內容
- [ ] `git log`／GitHub 無 `.env`、`private/` 檔

---

## 十六、刻意留低

| 項目 | 狀態／原因 |
|------|------------|
| GitHub remote | 待擁有者 Phase 1 |
| DNS 脫 GoDaddy Builder | IA 待辦 |
| Vercel vs Cloudflare | 建議 Vercel；開戶時定案 |
| Spin Map 入庫 | **不做**（VT 藍圖：Spin Map 零寫入） |
| `project/design/` 獨立 txt | **不做**（本 P-agent12 正本為權威備忘） |
| 舊備忘 `w7HsDp9K` | **保留**歷史；本檔整合修訂 |

---

## 十七、權威文件索引

| 文件 | 路徑 |
|------|------|
| 專案藍圖 | [`BLUEPRINT_v2.0.md`](../../../../../project/constitution/BLUEPRINT_v2.0.md) |
| 唯一出口憲法 | [`EGRESS_V1.0.md`](../../../../../project/constitution/EGRESS_V1.0.md) |
| 部署檢查 | [`DEPLOY.md`](../../../../../project/design/DEPLOY.md) |
| Export 流程 | [`EXPORT.md`](../../../../../project/design/EXPORT.md) |
| 資訊架構 | [`IA.md`](../../../../../project/design/IA.md) |
| 品牌規格 | [`BRAND.md`](../../../../../project/design/BRAND.md) |
| gitignore（有效） | [`project/.gitignore`](../../../../../project/.gitignore) |
| Agent 調用 | [`AGENTS.md`](../../../../../AGENTS.md) |
| Agent 3 ops 正本 | [`f3Fn7Qp2`](../P-agent03_Finance/20260627_agent03_finance_ops_f3Fn7Qp2.md) |
| 姊妹備忘（舊 SOP） | [`w7HsDp9K`](./20260628_agent12_memo_website_setup_deploy_w7HsDp9K.md) |
| 三庫備忘 | [`cEoVn528`](./20260628_agent12_ceo_memo_database_redesign_cEoVn528.md) |
| 平台底線 | [`PLATFORM_MINIMUM.md`](../../../../../../_shared/governance/PLATFORM_MINIMUM.md) |

權威順序：EGRESS / DEPLOY / IA（憲法級）→ 本備忘（營運總藍圖）→ `w7HsDp9K`（歷史 SOP）。

---

## 十八、決策記錄

| 日期 | 決策 |
|------|------|
| 2026-06-20 | Astro 靜態站 |
| 2026-06-28 | GitHub Private + Vercel；Root = `project` |
| 2026-06-28 | 唔用 GoDaddy Website Builder |
| 2026-08-22 | v1.1：寫死「唔出街≠唔上雲」；更正 Vercel 額度；`project/.gitignore`；DNS 過渡；push 即上線紀律 |
| 待定 | 若要內部檔完全唔上雲 → 只 push `project/`（須另拍板） |

---

## 簽署

**CEO-Vincent** · Vincentian Topology  
2026-08-22

---

## 修改紀錄

| 日期 | 摘要 |
|------|------|
| 2026-08-22 | v1.1 入庫 P-agent12 · uuid `w9PlV11K` · 完整計劃書正文 · 整合修訂 `w7HsDp9K` |

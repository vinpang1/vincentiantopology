# 備忘錄 · 網站保安姿態與未公開文件防漏

> **作者**：CEO-Vincent（整理 2026-09-30 Cursor 對話 · Agent 入庫）  
> **日期**：2026-09-30  
> **性質**：專案擁有者決策／認知備忘 · P-agent12 session  
> **uuid**：`w3ScPr9K`  
> **唔** export · **唔** sync `project-db/`（營運認知；技術細節見既有 v1.1 藍圖 `w9PlV11K`）

---

## 一、拍板方向（擁有者優先序）

1. **網站唔承載客戶／讀者 PII**：公開閱讀站；訂閱外連 Substack；站內唔收集 email（延續站點定位）。
2. **核心保安目標**：**未公開文稿同內部檔** 唔好經 **誤設定** 流出公開渠道；假設 deploy／Git 設定正確，唔另開大型合規專案。
3. **唔優先為 DDoS／「大量登入癱瘓站」做專案**：現站 **無站內登入**；靜態站 + Vercel CDN 對個人內容站足夠；待異常流量再檢視即可。
4. **GitHub 應為 Private repo**（同 2026-06-28 SOP `w7HsDp9K`、2026-08-22 藍圖 v1.1 `w9PlV11K`）：monorepo 含 `agent-db`、`project-db`、`articles/drafts` 等；**Private 係刻意取捨**，唔係為阻 Vercel clone（Vercel 經 GitHub App 授權仍可 clone Private repo，只 build `project/`、只發 `dist/`）。

---

## 二、對話整理 · 技術結論

### 2.1 公開網站 vs 公開 Git

| 層 | 設計 | 備註 |
|----|------|------|
| **讀者見到** | `vincentiantopology.com` ← 唯一 **`project/dist/`** | [EGRESS_V1.0](../../../../../project/constitution/EGRESS_V1.0.md) |
| **版控** | **GitHub Private**（應然） | 內部檔可上雲備份，但 **唔對全世界 readable** |
| **runtime 資料庫** | **無** | Astro **static**；無 API／無 SQL → 「hack 網站入庫」唔適用 |

**澄清**：「未公開文件留 GitHub」= 留 **Private Git**；要防係 **Public repo**、**誤 deploy**、**`public/` 誤放敏感檔**，唔係「唔好上 GitHub」。

### 2.2 未公開文件防漏 · 三層（假設無設定錯誤）

| # | 機制 | 效果 |
|---|------|------|
| 1 | Repo **Private** + 帳號 **2FA** | 未授權者拎唔到 monorepo |
| 2 | Hosting 只發 **`dist/`**；Root Directory = **`project`** | 讀者睇 HTML 唔等於睇到 `project-db`／drafts |
| 3 | **`finance/private/`、`legal/private/`、`.env`** 維持 gitignore | 最敏感區連 Private Git 都唔應有 |

### 2.3 2026-09-30 外部核對（Agent 會話）

- Cloud Agent 以 API／匿名 HTTP 查 **`vinpang1/vincentiantopology`**：當時仍標 **PUBLIC**（與備忘應然 **Private** 不一致）。
- **待辦（擁有者）**：登入 **vinpang1** → Settings → **Make private** → 無痕驗證 repo URL 對外人 **404**；Vercel **Git** 確認 repo 仍在 GitHub App 授權清單；試 **Redeploy**。
- 若 repo **曾經 Public**：改 Private **封之後**；已 clone 嘅副本 **唔自動消失**（metadata 類備忘按曾暴露處理，唔喺本備忘重複列憑證）。

### 2.4 安全系數（對本專案目標）

- **網站入庫／站內客戶資料**：**高**（無 DB、無登入）。
- **內部 monorepo 保密**：**Private + 2FA + 習慣** → **中高～高**；若長期 Public → **明顯拉低**。
- **主要剩餘風險**：**GitHub／Vercel／GoDaddy 帳號**（釣魚、重用密碼、無 2FA）→ 可改站／改 DNS／偷 repo；**npm build 鏈**（次要）；**唔**將托管全「外判」俾 GitHub——Vercel、DNS、EGRESS 檢查仍係擁有者責任。

### 2.5 刻意唔做（今次拍板）

- 唔為 DDoS／WAF 專案預先投入。
- 唔為無站內資料而做 PCI／站內 GDPR 專案。
- 備忘 **唔** 改憲法；**唔** 將內容 export 去 `src/content/`。

---

## 三、團隊須知

- Agent／Ops 協助 deploy 時仍須提醒 [DEPLOY.md](project/design/DEPLOY.md) 全表；**禁止** 以 Public repo「方便 Vercel」— Private 已寫死於 `w9PlV11K`。
- 保安相關 **合規審查** 仍走 `@agent-04-legal`；本備忘係 **擁有者營運認知**，非 legal pass 替代。
- 對話中 Cloud Agent **無權** 代 owner 改 GitHub visibility（403）；人手改設定。

---

## 四、權威追蹤

| 主題 | 路徑 |
|------|------|
| 唯一出口 | [`project/constitution/EGRESS_V1.0.md`](../../../../../project/constitution/EGRESS_V1.0.md) |
| Deploy 檢查 | [`project/design/DEPLOY.md`](../../../../../project/design/DEPLOY.md) |
| 網站方案 v1.1 | [`20260822_agent12_memo_website_plan_v11_w9PlV11K.md`](./20260822_agent12_memo_website_plan_v11_w9PlV11K.md) |
| 上站 SOP | [`20260628_agent12_memo_website_setup_deploy_w7HsDp9K.md`](./20260628_agent12_memo_website_setup_deploy_w7HsDp9K.md) |

---

## 簽署

**CEO-Vincent** · Vincentian Topology  
2026-09-30

---

## 修改紀錄

| 日期 | 摘要 |
|------|------|
| 2026-09-30 | 初版入庫 P-agent12 · 整理 Cursor 保安對話 · `agent12_ceo_memo_website_security_posture` |

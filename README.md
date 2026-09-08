# vincentiantopology.com

靜態閱讀站架構（Astro）— **萬脈同構｜文森思維** / *All Things Are One | Vincentian Topology*

> 本 repo 僅含網站架構與空殼頁面，**不含文章正文**。內容將於後續以 Markdown 形式加入 Content Collections。

## 快速開始

```bash
npm install
npm run dev      # 本機開發伺服器（預設 http://localhost:4321）
npm run build    # 產出靜態檔至 dist/
npm run preview  # 預覽 build 結果
```

## 專案結構

```
src/
  site.config.ts      # 站名、導覽、canonical URL
  content/config.ts   # posts 集合 schema（尚無內容檔）
  layouts/            # 共用版型
  components/         # Header、Footer
  pages/              # 路由（首頁 + 四個專區 index）
  styles/global.css   # 極簡排版樣式
```

### 導覽專區

| 路徑 | 中文 | 說明 |
|------|------|------|
| `/` | 首頁 | 站點介紹 |
| `/intro` | 關於我們 | 空列表，待後續文章 |
| `/view` | 文森世界 | 空列表，待後續文章 |
| `/topics` | 專題探討 | 空列表，待後續文章 |
| `/classics` | 經典註解 | 空列表，待後續文章 |

訂閱連結目前為 placeholder（`#subscribe`），尚未串接實際平台。

## 新增文章（日後）

在 `src/content/posts/` 建立 Markdown 檔，frontmatter 需符合 `src/content/config.ts` 中的 schema（`title`、`section`、`pubDate` 等）。`draft: true` 的文章不會出現在列表。

## 部署

建議使用 **Vercel** 或 **Cloudflare Pages**，build 指令 `npm run build`，輸出目錄 `dist/`。

Canonical URL：`https://vincentiantopology.com`

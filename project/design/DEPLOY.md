# 部署與出門檢查（Deploy）

> **憲法級上位**：[constitution/EGRESS_V1.0.md](../constitution/EGRESS_V1.0.md)  
> 文章 export：[EXPORT.md](./EXPORT.md)  
> 每次 deploy／上線前**必須**完成本檢查表。

---

## 原則

- **唯一**上傳至網頁 server 的內容：`npm run build` 產物 **`dist/`**
- **禁止**以 repo 根、`articles/`、`finance/`、`legal/`、`constitution/` 作 web root

---

## §A 部署設定

- [ ] Hosting 的 publish / output directory 為 **`dist`**
- [ ] Build command 為 `npm run build`（或專案固定之正式指令）
- [ ] 無將整個 repo 或內部 folder 設為 static site root
- [ ] 無 `.env`、私鑰在將被 hosting 讀取之路徑

## §B 內容

- [ ] 今次上站稿來自 **confirm ③** 之 export（`design/EXPORT.md` §C）
- [ ] 無誤設 `draft: false` 的未準備稿
- [ ] `public/` 無新增不應公開的檔（帳目、合約、憲法、草稿 PDF 等）

## §C 秘密與內部資料

- [ ] `finance/private/`、`legal/private/` 未 commit 且未 copy 至 `public/` 或 `src/`
- [ ] `git status` 無誤將內部敏感檔 staged
- [ ] agent-db、Spin Map 路徑未誤入 build 產物

## §D Build 後抽查

- [ ] 檢視 `dist/`：無 `finance`、`legal`、`constitution`、`articles` 等路徑或檔名
- [ ] `npm run preview` 或 staging URL 抽樣欄目（intro / view / topics / classics / about）

## §E 記錄（建議）

- [ ] 記下 commit hash 或 deploy 時間，便於回滾

---

*配合 EGRESS 憲法 V1.0 · 2026-06-21*

# 備忘錄 · 讀者搜尋（Brain CSV 概念 · 先定方向）

> **作者**：CEO-Vincent（2026-09-30 Cursor 對話整理 · Agent 入庫）  
> **日期**：2026-09-30  
> **性質**：概念拍板 · **唔係** 實作設計 · P-agent12 session  
> **uuid**：`k7RdSr9K`  
> **唔** export · **唔** 改網站 · **唔** sync `project-db/`

**本備忘只鎖定想法同意見。** 「點樣做」（腳本、UI、托管、同義表格式）留 **下一輪設計**，未拍板前 **禁止** 開工寫搜尋程式。

---

## 一、拍板方向（概念）

想喺公開閱讀站加一個 **無 LLM** 嘅搜尋：讀者打一句自然話，系統喺 **已上站文章** 入面列出相關篇，而唔係生成長文答案。

資料模型借用 **Brain CSV**（`project.csv` 嘅 primary shadow），唔借用成個 agent-db：

| 欄 | 讀者搜尋點用 |
|----|----------------|
| `keywords` | 入口。句入面撞中詞表先當查詢詞；陣列 **越前越重要** |
| `gravity_links` | 由命中文沿 uuid 邊跳去鄰居 |
| `vsm` | 鄰居同第二梯隊嘅相近度（9 位 0–4） |
| `vt_site_slug` | 出連結（只此類公開欄 + 標題） |

**只索引** `visibility=exportable` · `doc_class=article` · `is_primary_shadow=true`。  
**唔索引** `agent_Brain.csv`、草稿、`articles/`、V03–V05、未 confirm ③ 嘅稿。

### 一句查詢（例子）

讀者：「我想搵關於經濟相關心理學嘅文件」

1. 詞表 = 全部可出街文章嘅 `keywords`（閉集）+ 日後可加人手同義表。  
2. 抽出句入面撞中詞表嘅詞 → `經濟`、`心理學`（「我想／關於／相關／文件」係停用詞）。  
3. **Tier 1**：keywords 含呢啲詞；**兩個都中排最前**；同一命中數內，詞喺陣列越前越高。  
4. **Tier 1b**：由 Tier 1 沿 `gravity_links` 列鄰居，用 VSM 相近再排；已出過嘅 uuid 唔重複。  
5. **Tier 2**：其餘文用 keyword 集合相似度（Jaccard）+ 少少 VSM，當第二梯隊。

目標體感：對「搵返相關文章」大約 **LLM 檢索嘅七至八成**；**唔** 追求代寫答案。索引只存標籤圖（keywords、vsm、引力、slug），唔存全文倒排、唔存 embedding，所以 **體積細**。

### 刻意留待下一輪先設計

- Python 定瀏覽器計分、GitHub Actions 點產 `site-brain.json`、Chat 定結果列表 UI。  
- 同義表檔格式、停用詞表、打分權重最終數字。  
- 要不要獨立 API（主站繼續靜態 `dist/` 係偏好，未鎖定）。

---

## 二、意見（入庫時一併記下）

以下係整理對話時嘅判斷，**擁有者可改**；`human_verdict` 仍 `pending`。

### 贊成做（方向啱）

1. **同現有流水夾**：文章本來就要喺 confirm ② 寫 `keywords`、`vsm`、`gravity_links`。搜尋係把呢啲欄 **公開用一次**，唔使另起一套 AI 庫。  
2. **同保安備忘夾**（`w3ScPr9K`）：無客戶資料、無 LLM、索引只含已 export 稿 → 唔擴大「未公開文件流出」面。主站仍可只出 `dist/`。  
3. **成本同空間**：百篇以內，公開 JSON 多數係幾十至幾百 KB，對個人站合理。  
4. **七至八成**：若 keyword 用 **讀者會打嘅字**（唔係內部代號），「搵對幾篇」可以接近 LLM 搜尋嘅七至八成。**唔好** 理解成 chatbot 長答案有七至八成。

### 限制（要預期，唔好過度承諾）

1. **準繩綁 keyword 質素**。寫得差，搜尋就差；呢個係編輯責任，唔係演算法可以補。  
2. **而家 W01 四篇 `gravity_links` 為空** → 上線初期幾乎只有 Tier 1 + Tier 2，引力層係空嘅。值得做，但 **未填邊之前唔好用引力層做賣點**。  
3. **去唔到嘅兩成** 主要係同義詞（「GDP」「行為經濟」對「經濟」）。建議下一輪設計 **細同義表（人手、幾十行）**，仍然無 LLM。  
4. **閉集抽詞** 唔係語意理解：句入面冇撞中詞表，就應講「搵唔到」，唔好亂配。  
5. **唔好索引 agent-db**。P-agent 記憶同讀者搜尋係兩套腦；混埋會把內部備忘帶出街。

### 建議節奏（未開工）

| 步 | 做咩 | 而家 |
|----|------|------|
| 0 | 本備忘鎖定概念 | **今次** |
| 1 | 入庫習慣：新文 keyword 用讀者詞、同系列填 `gravity_links` | 寫稿時開始，唔使等程式 |
| 2 | 下一輪先寫 **實作設計**（仍未寫 code）：索引檔、三層公式定稿、UI、邊度跑 Python | **未做** |
| 3 | 有一批帶引力嘅 export 文之後先做原型 | **未做** |

**意見總結：** 概念值得做，而且應該 **先養 metadata、後寫搜尋**。下一輪先設計「點樣做」；而家唔開工。

---

## 三、團隊須知

- 未有下一份 **實作設計備忘**（或擁有者明確指令）之前，Agent **唔好** 加搜尋 UI、API、或改 Astro `output`。  
- 將來索引腳本 **只讀** exportable primary；禁止掃 `articles/drafts/`、`ai-agent/agent-db/`。  
- 頁面若日後上線，須有一句：搜尋依站內標籤同編目，**唔係** AI 生成答案（合規字句可再交 `@agent-04-legal`）。

---

## 四、權威追蹤

| 主題 | 路徑 |
|------|------|
| project.csv 欄位 | [`project-db/docs/02_METADATA.md`](../../../../../project-db/docs/02_METADATA.md) |
| 唯一出口 | [`project/constitution/EGRESS_V1.0.md`](../../../../../project/constitution/EGRESS_V1.0.md) |
| 網站方案 v1.1 | [`20260822_agent12_memo_website_plan_v11_w9PlV11K.md`](./20260822_agent12_memo_website_plan_v11_w9PlV11K.md) |
| 保安姿態 | [`20260930_agent12_ceo_memo_website_security_posture_w3ScPr9K.md`](./20260930_agent12_ceo_memo_website_security_posture_w3ScPr9K.md) |

---

## 簽署

**CEO-Vincent** · Vincentian Topology  
2026-09-30

---

## 修改紀錄

| 日期 | 摘要 |
|------|------|
| 2026-09-30 | 初版入庫 · 讀者搜尋概念 + 意見 · 實作設計押後 · `k7RdSr9K` |

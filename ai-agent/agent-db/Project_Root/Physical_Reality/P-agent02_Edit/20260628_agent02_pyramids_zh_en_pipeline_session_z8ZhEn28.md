# Session · pyramids · 2026-06-28 創作流水复盘

> **agent02** · **P-agent02 正本** · uuid `z8ZhEn28`  
> **日期**：2026-06-28  
> **系列**：`pyramids` · [`p7SrPl4K`](./20260627_agent01_series_pyramids_plan_p7SrPl4K.md) v0.4  
> **關聯 case**：[`k8CsPy01`](./20260627_agent02_case_pyramids_series_full_k8CsPy01.md) · **併入** session [`r3VsnFbk`](../P-agent01_Search/20260628_agent01_pyramids_v2_reader_revision_session_r3VsnFbk.md)（讀者修訂 · 同日較早）  
> **ingest**：Batch **3/3** ✓ · case `k8CsPy01` patched · `r3VsnFbk` 併入  
> **性質**：創作過程／复盘 · **唔含** article 正文 · **唔** export · **唔** 入 project-db

---

## 0. 範圍與排除

| 記錄 | 排除 |
|------|------|
| 決策、批次、事故、交付物**路徑**、待辦、程序對齊原則 | 四篇 `article.md` / `article.en.md` **全文** |
| zh Agent 2 修訂摘要（用語級） | 桌面整合稿**內文** |
| EN Batch 0–10 流水與術語鎖 | export 稿 · Spin Map P* 複製 |
| 雙語檔案結構與 stage 快照 | project-db V02 文章 entity |

**本檔 = 指針與教訓**；讀正文請開 `project/articles/drafts/`，唔在本 session 重複存稿。

---

## 1. 時間線（2026-06-28）

| 階段 | Agent／動作 | 摘要 |
|------|-------------|------|
| **A** | Agent 2 · 預檢 | 四篇 zh 用詞／語氣審閱（Ask mode · 未改稿） |
| **B** | Agent 2 · 修訂 | 四篇 `article.md` 按預檢修訂 · sync `草稿區/` |
| **C** | 交付 | 桌面 `~/Desktop/金字塔系列-Agent2修訂-20260628.txt` |
| **D** | 策劃 | 用戶定 **EN 11-batch** 保守流水（術語→逐篇譯→逐篇校→系列 QA→legal） |
| **E** | Batch 0 | `pyramids-series/en-glossary.md` · 術語／標題／frontmatter 規則鎖定 |
| **F** | Batch 1–8 | 四篇 `article.en.md` 忠實譯 + 英文 craft 校（shadow `R61Wp9W7` + `TxpluTH3`） |
| **G** | Batch 9 | 系列 EN QA：`dual-axis reading` · `four-cell framework` · toolkit 用語統一 |
| **H** | Batch 10 | `@agent-04-legal` · EN 四篇 **pass** → `en_awaiting_db_confirm` |
| **I** | 交付 | 桌面 `~/Desktop/Pyramids-Series-EN-20260628.txt` |
| **J** | 事故 | `01-…/article.en.md` 誤覆寫為 Ep4 · 已從 agent transcript 還原 + Batch 9–10 修訂 |
| **K** | 討論 | 用戶定案：**中英程序應一致** · EN 曾跳 confirm ①、早於 zh 做 legal → 記為偏離 |
| **L** | 本計劃 | 創作复盘 **3-batch** 入 agent-db（**唔**含文章入 project-db） |

**同日較早** · `r3VsnFbk`（樞 `pk` `20260628120007`）— 讀者修訂（圈號全稱、Ep2 語氣、視覺不對稱、地理—材料）。  
⚠ **过时**（folder-sync Batch 2 · **勿再引用**）：「併入本 session，唔重複開腦」

---

## 2. 關鍵決策

### 2.1 中文修訂（Agent 2 · 階段 B）

| 篇 | 主要改動（用語級 · 無正文） |
|----|------------------------------|
| Ep1 | 對線→對照材料 · 仍有爭議全稱 · 血汗敘事 · 跳格首現釋義 |
| Ep2 | 四格回扣全稱 · 並非空白→並非什麼都沒發生 · 陰謀論→陰謀敘事 · 史書記憶方案 |
| Ep3 | 四格全稱 · 逃逸敘事 · 誠實留白 |
| Ep4 | retrojection 口語化 · 關燈→把討論關掉 · 演練段保留「陰謀論」標籤引用 |

`pipeline_stage` **維持** `awaiting_draft_confirm`（修訂 ≠ confirm ①）。

### 2.2 英文流水（Batch 0–10）

- **母句** `seriesTitle`：*Pyramids: Read the Narrative, Don't Buy the Conclusion*
- **術語鎖**（`en-glossary` batch0）：evidence four-cell framework · dual-axis reading · three gates · escape narrative · narrative drill · not a factual claim
- **篇幅**：四篇合計約 **4,770 words**（Ep1–4 各 ~1,100–1,275）
- **Agent 4**：Ep4 陰謀 drill 免責 intact · Ep3 外星框架 · **pass**

### 2.3 雙語檔案結構

同一 episode 資料夾並存：

- `article.md` · `lang: zh-Hant`
- `article.en.md` · `lang: en`

共用 `slug` / `series` / `episode` / `sources.md`；**流水 stage 分開**。

### 2.4 程序原則（用戶 2026-06-28 定案）

規格線（`DRAFTS.md`）對 **每種語言** 均應為：

```text
起稿 → 👤 confirm ① → @agent-02-edit → @agent-04-legal
  → pass → 👤 confirm ② → project-db → 👤 confirm ③ → export
```

**今次偏離**（待日後對齊，唔當先例）：

| 偏離 | 說明 |
|------|------|
| EN 跳 confirm ① | 用自訂 `en_draft`→`en_edit`，假設 zh Agent 2 稿為母稿 |
| EN 早做 legal | zh 尚未 `@agent-04-legal` |
| 自訂 stage 名 | `en_awaiting_db_confirm` 未對齊 `awaiting_db_confirm` |

**文章入庫**須待中英關卡對齊後另開計劃；**本 session 只記錄過程**。

---

## 3. 流水狀態快照（2026-06-28 末）

| 語言 | 檔 | `pipeline_stage` | 備註 |
|------|-----|------------------|------|
| zh | `article.md` ×4 | `awaiting_draft_confirm` | Agent 2 已修 · **未 confirm ①** · **未 legal** |
| en | `article.en.md` ×4 | `en_awaiting_db_confirm` | legal pass · **未 confirm ②** · stage 待對齊規格 |

| 輔助 | 路徑 | 狀態 |
|------|------|------|
| EN 聖經 | `drafts/pyramids-series/en-glossary.md` | Batch 0–10 tracker ✓ |
| 系列 pipeline | `drafts/pyramids-series/pipeline.md` | zh 仍 `awaiting_draft_confirm` |
| case 正本 | `k8CsPy01` §5 | **待 Batch 3 patch** |

---

## 4. 路徑索引（指針 only）

| 類 | 路徑 |
|----|------|
| zh 草稿 | `project/articles/drafts/0N-pyramid-*/article.md` |
| en 草稿 | `project/articles/drafts/0N-pyramid-*/article.en.md` |
| 系列策劃 | `project/articles/drafts/pyramids-series/` · `p7SrPl4K` |
| EN 術語 | `project/articles/drafts/pyramids-series/en-glossary.md` |
| 桌面 zh | `~/Desktop/金字塔系列-Agent2修訂-20260628.txt` |
| 桌面 en | `~/Desktop/Pyramids-Series-EN-20260628.txt` |
| case 正本 | `P-agent02_Edit/…_case_pyramids_series_full_k8CsPy01.md` |
| 讀者修訂 session | `P-agent01_Search/…_reader_revision_session_r3VsnFbk.md` |

---

## 5. 教訓與 SOP

### 5.1 技術

- **sync**：勿用 glob `cp` 多檔覆蓋單一目標；sync 後驗證 `episode:` / `title:`
- **還原**：誤覆寫可從 agent transcript JSONL 搵 `Write` 紀錄

### 5.2 編輯／雙語

- **雙語專題**：每語言獨立走 `DRAFTS.md` 關卡；母稿連動須 **書面** 寫入 `pipeline.md`
- **case 續篇**：2026-06-28 記憶 → patch `k8CsPy01` §5 + 本 session `z8ZhEn28`；唔開第二個全流水 case uuid
- **复盘入庫**：走 `EXPORT.md` §B′ · agent-db only · **唔貼 article 正文**

### 5.3 Agent 2 本日職責邊界

- ✓ zh 用語修訂 · EN craft 校（Batch 2/4/6/8/9）
- ✓ 本 session 正本 holder（`z8ZhEn28`）
- ✗ 代 confirm ①② · 入 project-db · export · 代 Agent 4

---

## 6. 待辦（唔屬本檔入庫範圍 · 文章線）

| # | 動作 | 語言 |
|---|------|------|
| ① | confirm 定稿 | zh |
| — | `@agent-04-legal`（Ep4 必審） | zh |
| ② | confirm 入 project-db | zh · en（對齊後） |
| ③ | `@agent-03-ops` export | ③ 後 |

| # | 動作 | 本 session ingest |
|---|------|-------------------|
| 2 | shadow + `agent_Brain.csv` | `next 2` |
| 3 | patch `k8CsPy01` + lens 摘要 · `r3VsnFbk` 併入標記 | `next 3` |

---

## 7. 入庫計劃（agent-db · 3 batch）

| Batch | 內容 | 狀態 |
|-------|------|------|
| **1** | 本正文定案（無 article 草稿） | ✓ |
| **2** | primary shadow + `agent_Brain.csv` 一行 | ✓ · pk `20260628120005` |
| **3** | `k8CsPy01` §5 續篇 + 四 lens 摘要 + `gravity_links` | ✓ |

---

## 8. 修改紀錄（本檔）

| 日期 | Agent | 摘要 |
|------|-------|------|
| 2026-06-28 | Agent 2 · edit | Batch 1 · 初版 session 正本 `z8ZhEn28` · 創作复盘定案稿 |
| 2026-06-28 | Agent 2 · edit | Batch 2 · primary shadow + `agent_Brain.csv` pk `20260628120005` |
| 2026-06-28 | Agent 2 · edit | Batch 3 · patch `k8CsPy01` §5–9 · 四 lens · `r3VsnFbk` 併入 |

---

*agent02 · session · z8ZhEn28 · ingest complete 3/3*

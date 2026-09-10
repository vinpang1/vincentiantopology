# Topic Zip 藍圖 · 專題草稿 zip 工作區 v0.1

> **作者**：CEO-Vincent  
> **日期**：2026-07-13  
> **性質**：專案治理藍圖 · P-agent12 正本  
> **uuid**：`tZpBp701`  
> **參與**：**Agent 1–4 均有份** — 1 起稿／引述／外參 · 2 校對 docx／shadow · 3 打包 zip／QA／confirm③ export · 4 合規（詳 §14）  
> **首個實例**：`pyramids-series`（四期金字塔專題）  
> **參考**：Spin Map `MLhWQII4`（日本之旅）、`5JKm4GwS`（大理之旅）zip-project 骨架  
> **上位**：[`AGENT_DB_V2.0.md`](../../../../../project/constitution/AGENT_DB_V2.0.md) · [`BLUEPRINT_v2.0.md`](../../../../../project/constitution/BLUEPRINT_v2.0.md)  
> **鐵律**：**本 project 唔改動 Spin Map DB** · `gravity_links` 只 outbound 只讀引用  
> **沿革**：v0.1（2026-07-13 · 對話定案）

---

## 0. 一句話

**一個 topic（或一系列）= 一個 zip 工作區**；內有 **一張 CSV（虛實合一）** 做索引，**每個實體一個 `VT_*` uuid、一個 `4_md` shadow**；正文、寫法、引述、外參、腳本分櫃存放；**zip 內 `topo_links` 雙向、`gravity_links` 單向指向 Spin Map**。

---

## 1. 解決咩問題

| 問題 | zip 點答 |
|------|----------|
| 日後 topic 多、草稿區散 | 每 topic 一個 `{slug}.zip`，根目錄唔再平铺十幾個夾 |
| 四期金字塔散喺五個夾 | 收做一個封包，開 zip 就係完整系列 |
| Agent／人搵唔到脈絡 | `WORKSPACE.md` + CSV 一張地圖 |
| 引述、YouTube、外參混亂 | `3_citations` vs `5_external` 分櫃 |
| 同 Spin Map 關係不清 | B/A 引證 → `gravity_links`；zip 自己有 `VT_*` 身份 |

---

## 2. 唔係咩

| 唔係 | 說明 |
|------|------|
| Spin Map P12 zip 入庫 | zip 留喺 **本 project 草稿區**，唔寫入 `_shared/spin-map` |
| 日本版雙 CSV | 本 project **一檔** `*_registry.csv`，用 `layer` 分虛實 |
| 旅行 PDF OS | 無訂單 freeze、無 `trip_day`、無 PDF 重建管線（除非日後另加） |
| project DB 終點 | confirm ② 入 **project DB V02** 後，**刪** workspace／zip |
| P-agent 正本取代 | zip 係 **草稿整合工作區**；Agent session 仍寫 P-agent 櫃 |

---

## 3. zip 實體結構

```text
{slug}.zip                          # 例：pyramids-series.zip
│
├── WORKSPACE.md                    # Agent／人類第一個讀
├── {slug}_registry.csv             # 例：pyramids_registry.csv · 虛實合一索引
│
├── 2_csv/
│   └── schema.md                   # 欄位定義（寫死 header）
│
├── 1_articles/                     # 正文交付檔（格式可變；金字塔暫用 docx）
│   ├── ep01_{article-slug}.docx
│   └── …
│
├── 2_craft/                        # 寫法、風格、工具說明、系列 brief
│
├── 3_citations/                    # Spin Map B/A 引述（厚筆記 · 每引述一 MD）
│
├── 4_md/                           # 【必有】每個 CSV 實體一個 shadow MD（薄索引）
│
├── 5_external/                     # 外部資訊 MD（YouTube、網文、fetch 整理等）
│   └── attachments/                # 可選：原始 PDF／圖
│
└── 6_py/                           # 腳本（qa_registry · 轉檔等）
```

### 3.1 雙檔／雙層 MD 規則

| 實體類型 | 交付／厚內容 | shadow（必有） |
|----------|--------------|----------------|
| **文章** | `1_articles/*.docx` | `4_md/VT_episode_*.md` |
| **引述** | `3_citations/*.md`（厚） | `4_md/VT_citation_*.md`（薄） |
| **外參** | `5_external/*.md`（厚） | `4_md/VT_ext_*.md`（薄） |
| **craft／tool／meta** | `2_craft/*.md`（可厚） | `4_md/VT_craft_*.md` 等 |

**公式**（同日本／大理）：

```text
CSV 一行  =  zip 內一個實體
          =  一個 VT_* uuid
          =  一個 4_md shadow（必填）
          +  可選 p_path（docx 等交付檔）
          +  可選厚內容路徑（3_citations／5_external／2_craft）
```

---

## 4. 核心鐵律（VT-Z1～Z6）

| # | 鐵律 |
|---|------|
| **VT-Z1** | zip 內 `uuid` **禁止**用 Spin Map 庫 uuid；只用 `VT_{item_type}_…` |
| **VT-Z2** | 每個 `subject_id` **恰好一個** `is_primary_shadow: true` |
| **VT-Z3** | `topo_links`：**zip 內雙向**（A 列 B ⇔ B 列 A） |
| **VT-Z4** | `gravity_links`：**zip → Spin Map 單向**（8 碼）；**禁止**回寫 Spin Map |
| **VT-Z5** | `qutrit`、`vsm` 定義跟 Spin Map `02_METADATA_INVARIANTS`（含 d4 坍縮） |
| **VT-Z6** | **一張 CSV**；禁止第二張 data CSV（staging 腳本輸出除外） |

---

## 5. CSV：`{slug}_registry.csv`

### 5.1 Header（寫死 · 16 欄）

```text
uuid,layer,item_type,subject_id,is_primary_shadow,p_path,m_path,view,name,series_seq,keywords,qutrit,vsm,topo_links,gravity_links,notes
```

### 5.2 欄位定義

| # | 欄 | 必填 | 說明 |
|---|-----|------|------|
| 1 | `uuid` | ✓ | `VT_{item_type}_{主體}[_{變體}]` · **全表唯一** |
| 2 | `layer` | ✓ | **`实`**｜**`虚`** |
| 3 | `item_type` | ✓ | 見 §5.3 |
| 4 | `subject_id` | ✓ | 邏輯簇 · 例 `VT_sub_episode_ep01` |
| 5 | `is_primary_shadow` | ✓ | `true`｜`false` · 每 subject 一個 `true` |
| 6 | `p_path` | ○ | 交付實體檔 · 文章 → `1_articles/*.docx` |
| 7 | `m_path` | ✓ | shadow · `4_md/VT_*.md` |
| 8 | `view` | ✓ | snake_case 技術視圖名 |
| 9 | `name` | ✓ | 人讀標題 |
| 10 | `series_seq` | ○ | 系列順序 `1`–`n`（**实**層文章用） |
| 11 | `keywords` | ○ | `\|` 分隔 |
| 12 | `qutrit` | ✓ | 六段 `0/1/2` |
| 13 | `vsm` | ✓ | 9 位 `0`–`4` |
| 14 | `topo_links` | ○ | zip 內 uuid · `\|` 分隔 |
| 15 | `gravity_links` | ○ | Spin Map 8 碼 · `\|` 分隔 · **單向** |
| 16 | `notes` | ○ | 厚內容路徑、草稿標記等 |

### 5.3 `item_type` 詞表

| layer | item_type | 說明 | 厚內容櫃 |
|-------|-----------|------|----------|
| **实** | `episode` | 一期正文 | `1_articles/` + `4_md/` |
| **虚** | `series_meta` | 策劃、DELIVERY、pipeline | `2_craft/` |
| **虚** | `craft` | 寫法、voice、語言要求 | `2_craft/` |
| **虚** | `tool` | 本期工具（四格、三關等） | `2_craft/` |
| **虚** | `glossary` | 術語鎖（如 en-glossary） | `2_craft/` |
| **虚** | `citation` | Spin Map B/A 引述 | `3_citations/` |
| **虚** | `external_youtube` | YouTube 筆記 | `5_external/` |
| **虚** | `external_web` | 網文／部落格 | `5_external/` |
| **虚** | `external_article` | 外部長文（非本站稿） | `5_external/` |
| **虚** | `external_fetch` | `_shared/fetch` 整理 | `5_external/` |
| **虚** | `script` | 腳本登記 | `6_py/` |

### 5.4 虛實定義

| **实** | **虚** |
|--------|--------|
| 出街／準出街 **文章**（`episode`） | craft、tool、glossary、series_meta |
| | Spin Map **引述**（`citation`） |
| | **外部資訊**（`external_*`） |
| | 腳本登記（`script`） |

---

## 6. 連結語意

### 6.1 `topo_links`（zip 內部）

- **方向**：雙向（鄰居 uuid 列表；隱含源 = 本行 `uuid`）
- **典型邊**：

```text
VT_series_plan      →  VT_episode_ep01..04
VT_episode_ep01     →  VT_tool_evidence_grid
VT_episode_ep01     →  VT_citation_* | VT_ext_*
VT_citation_*       →  用過該引述的 VT_episode_*
```

### 6.2 `gravity_links`（→ Spin Map DB）

| 實體 | gravity_links |
|------|----------------|
| `VT_episode_*` | 通常 **空** |
| `VT_citation_*` | **必填**對應 B/A uuid |
| `VT_ext_*` | 若外參已入 Spin Map 則填；否則空 |
| 舊 P* 稿 | **唔填** |

---

## 7. `4_md` shadow 規格（每實體必有）

### 7.1 YAML 頭（對齊 CSV 行）

```yaml
---
uuid: VT_episode_ep01
subject_id: VT_sub_episode_ep01
item_type: episode
layer: 实
is_primary_shadow: true
p_path: 1_articles/ep01_pyramid-construction-archaeology.docx
m_path: 4_md/VT_episode_ep01.md
view: ep01_whole
name: "我不知道金字塔是誰建的，但我知道什麼不能當證據"
series_seq: 1
keywords: pyramids|ep1|證據四格
qutrit: "2/1/2/1/2/2"
vsm: "102130210"
topo_links: VT_tool_evidence_grid|VT_citation_nk8jIIvx
gravity_links: ""
---
```

### 7.2 正文區（建議）

- `# doc_summary`
- `## 修改紀錄`
- `### D1～D6 逐維解釋`（對齊 Spin Map 時填）
- `### V-S 矩陣`（對齊 Spin Map 時填）

厚摘錄放 `3_citations/` 或 `5_external/`；shadow 保留摘要與連結。

---

## 8. 六櫃職責

| 櫃 | 職責 |
|----|------|
| `1_articles/` | 正文交付（金字塔暫 **docx**） |
| `2_craft/` | 寫法、工具、glossary、系列 brief |
| `3_citations/` | Spin Map B/A 引述厚筆記；**禁** copy `P*` |
| `4_md/` | 每 CSV 行一個 shadow MD |
| `5_external/` | YouTube、網文、fetch；**唔**取代 `3_citations` |
| `6_py/` | `qa_registry.py` 等 |

---

## 9. `WORKSPACE.md`（zip 入口）

1. **係咩**：slug · 產品線 · zip 版本  
2. **開工順序**：`WORKSPACE.md` → `schema.md` → `*_registry.csv` → 當期 `4_md/VT_episode_*`  
3. **當前 `pipeline_stage`**  
4. **鐵律**：VT-Z1～Z6 · 唔改 Spin Map · confirm ② 後刪 workspace  

---

## 10. 同本 project 文章流水

```text
zip 內起稿／整理
  → sync 或解壓至 草稿區（若 zip 為快照）
  → 👤 confirm ① → @agent-02-edit → @agent-04-legal
  → 👤 confirm ② → 入 project DB V02 → 刪 drafts／workspace
  → 👤 confirm ③ → @agent-03-ops export
```

- **P-agent 正本**仍在 agent-db 各櫃；zip 係草稿 **整合封包**  
- **Agent 3** 可協助打包 zip／QA；**唔**參與 1→2→4 內容審稿  

---

## 11. 日後多 topic 慣例

```text
草稿區/
├── pyramids-series.zip
├── another-topic.zip
└── confirm ② 後刪對應 zip／解壓夾
```

每個新 topic：**fork 本藍圖** → 改 `{slug}`、填 CSV。

---

## 12. 示例 CSV 片段（金字塔）

```csv
uuid,layer,item_type,subject_id,is_primary_shadow,p_path,m_path,view,name,series_seq,keywords,qutrit,vsm,topo_links,gravity_links,notes
VT_series_plan,虚,series_meta,VT_sub_series_plan,true,,4_md/VT_series_plan.md,series_plan_whole,金字塔系列策劃,,pyramids|v0.4,2/1/2/1/2/2,102130200,VT_episode_ep01|VT_episode_ep02|VT_episode_ep03|VT_episode_ep04,,厚文：2_craft/series-plan.md
VT_episode_ep01,实,episode,VT_sub_episode_ep01,true,1_articles/ep01_pyramid-construction-archaeology.docx,4_md/VT_episode_ep01.md,ep01_whole,我不知道金字塔是誰建的…,1,pyramids|ep1|證據四格,2/1/2/1/2/2,102130210,VT_tool_evidence_grid|VT_citation_nk8jIIvx,,stage=awaiting_draft_confirm
VT_citation_nk8jIIvx,虚,citation,VT_sub_citation_nk8jIIvx,true,,4_md/VT_citation_nk8jIIvx.md,citation_petrie,Petrie · Ten years' digging,,petrie|吉薩,1/1/1/0/1/1,001120110,VT_episode_ep01|VT_episode_ep03,nk8jIIvx,厚文：3_citations/nk8jIIvx_petrie_ten_years.md
VT_ext_yt_giza_01,虚,external_youtube,VT_sub_ext_yt_giza_01,true,,4_md/VT_ext_yt_giza_01.md,ext_yt_giza,Giza documentary notes,,youtube|draft,2/1/1/1/2/1,101110200,VT_episode_ep01,,厚文：5_external/VT_ext_yt_giza_01.md; in_article=false
```

---

## 13. 與日本／大理對照

| 項 | 日本／大理 | 本 Topic Zip |
|----|------------|-------------|
| 庫 | Spin Map P12 入庫 | vincentian-topology 草稿區 |
| uuid | `P_*` | **`VT_*`** |
| CSV | scenes + xu 兩檔 | **一檔** + `layer` |
| 每實體 MD | `4_md/P_*.md` | `4_md/VT_*.md` |
| 交付物 | `1_pdf/` | `1_articles/*.docx`（可變） |
| topo | zip 內雙向 | 同 |
| gravity | → Spin Map 單向 | 同 |

---

## 14. Agent 分工速查

| Agent | 同 zip 關係 |
|-------|-------------|
| **1** | 起稿、引述、外參入櫃；更新 CSV／`4_md`；sync 出 zip 或自 zip 解壓工作 |
| **2** | 改 `1_articles`／shadow；**唔**改作層觀點（仍跟 edit_ops） |
| **3** | 打包 zip、跑 `qa_registry`、confirm ③ export（**唔**改草稿觀點） |
| **4** | 審合規；外參／引述邊界（Ep4 陰謀演練等） |

---

## 15. 簽收清單（建 zip 前）

- [ ] 一 topic 一 zip、一 CSV  
- [ ] 每實體：`VT_*` uuid + `4_md` shadow  
- [ ] 文章：`docx` + shadow MD  
- [ ] 引述：`3_citations` + `gravity_links` → Spin Map  
- [ ] 外參：`5_external` 與引述分開  
- [ ] `topo_links` 雙向、`gravity_links` 單向、唔改 Spin Map  
- [ ] `6_py/qa_registry.py` 可驗收  

---

*Topic Zip Blueprint v0.1 · P-agent12 正本 · uuid `tZpBp701` · 2026-07-13*

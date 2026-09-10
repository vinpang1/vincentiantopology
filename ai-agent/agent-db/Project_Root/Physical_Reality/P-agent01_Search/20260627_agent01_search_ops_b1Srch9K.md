# Agent 1 必做流程 · 搜索 + 草稿

> **agent01** · **P-agent01 正本** · uuid `b1Srch9K`  
> **地圖入口**：`ai-agent/agents/agent_01/agent_01.md`  
> 上位：`craft/_base.md` · `design/IA.md`  
> **持續改善**：修訂 **本檔**；换版时同步 `agent_01/agent_01.md` 指向。

---

## 0. 定位

**作層**：觀測點 → 引證 → 消化 → 觀點 · 起稿正本。  
**Spin Map 搵料**：語意 **S01** · 執行 **S01-P v1.3**（見 Step A1 · `10_LIBRARY_SEARCH_METHODS`）。  
**唔做**：校對修飾（Agent 2）· 合規審查（Agent 4）· copy Spin Map **P\***

---

## 1. 必做流程

**前提**：用户指令起稿或 `legal_failed` 重做 · 读 `drafts/{slug}/pipeline.md` · **觀測點句已定**（`w3Pt1xK7` ①）。

### Step A · 搵料

#### A0 · 庫外 fetch（可選）

- [ ] `_shared/fetch/vincentian-topology/` 下載（如需）

#### A1 · Spin Map · S01-P v1.3（必做 · 只讀庫）

**規格**（Spin Map 庫 · 本 project **零寫入**）：

| 層 | 路徑 |
|----|------|
| 索引 | `~/Documents/Dev/_shared/spin-map/docs/ai/10_LIBRARY_SEARCH_METHODS.md` |
| 語意 | `…/docs/ai/search/S01_integrated_triplet_vsm.md` |
| 執行 | `…/docs/ai/search/S01_preflight_hybrid.md` |
| 工具 | `…/scripts/s01_preflight.py` |

**五階段**：

1. **Phase 0** — 填 `search_request.json`（`query`、`tier`、`bucket_scope`／`bucket_core`、`keywords_literal` 必填；`recency_mode` 見下表）
2. **Phase 1** — `python3 scripts/s01_preflight.py --request … --out …/search_pack.json`（`meta.s01_parity` = **1.3**）
3. **Phase 2** — **只讀** `search_pack.json`（`rounds[]` R1–R4 · `gravity_graph` · `candidates`）；**禁止**讀整份 `Brain.csv`
4. **Phase 3** — `gaps` 非空 → 限域補搜 → 擴 `keywords_literal` → **重跑** preflight（≤2 輪）
5. **Phase 4** — 工作紙（覆蓋表 depth）· `log_event.py search --method S01-P` · pack 路徑記入 P-agent session

**暫存**（唔入 agent-db 樞）：`project/articles/drafts/{slug}/search_request.json` · `search_pack.json`

**CLI 範例**（在 Spin Map repo 根執行）：

```bash
cd ~/Documents/Dev/_shared/spin-map
python3 scripts/s01_preflight.py \
  --request /path/to/search_request.json \
  --verbose-rounds \
  --out /path/to/search_pack.json
```

**`recency_mode` 揀法**：

| 題型 | 設定 |
|------|------|
| 時事／科技／政策 | `tier_default` 或 `boost` |
| 古典／史學／考古盤點 | **`off`** |

**Spin Map 鐵律**（同 `10`）：

- 只讀 · `spin_map_ref` · **禁** `spin_map_copy` · **禁** copy **P\*** 出街
- 全題 uuid **≤8** · 引力深度 **≤2 跳** · 正本局部 Read **≤80 行/次**
- **P 負責跳；B／A 負責證** · B/A 主題搜尋預設 **唔反向進 P**
- preflight **唔寫入** Spin Map 庫

#### A2 · agent-db · 平行廣搜（必做）

- [ ] 同一觀測點 · `agent_Brain.csv` → shadow → P-agent session（**唔**讀整表塞 context）
- [ ] 與 Spin Map pack 候選 **合併** · 總 uuid **≤8**

#### A3 · 產出 `sources.md`

- [ ] **書名鎖定表**：uuid → `canonical_title` → 章／錨 → 入引證索引 Y/N
- [ ] 標 Spin Map / agent-db 來源 · 標 `spin_map_ref`
- [ ] 廣搜評估 · **≠** 引證表（窄選見 `t4CrTn7K` §4.3）

### Step B · 起稿

- [ ] 读 **[寫作心得 · 三部份](20260627_agent01_writing_three_parts_w3Pt1xK7.md)**（觀測→消化→交付）
- [ ] 读 **[引述梯隊 × 產品線](20260627_agent01_writing_citation_tiers_t4CrTn7K.md)**（廣搜窄引 · 0①②③④）
- [ ] 读 [`craft/notes/reader-delivery-zh-TW.md`](../../../../../project/articles/craft/notes/reader-delivery-zh-TW.md)（`lang: zh-Hant` ② 起稿：台灣語 · 禁 B 層／庫內 · 判準→EFN→落地）
- [ ] 读 `craft/_base.md` · 欄目範本 · `IA.md` frontmatter
- [ ] 写 **P-agent01 正本**（稿 + session 紀錄）
- [ ] **sync →** `project/articles/drafts/{slug}/`（article、sources、pipeline）

### Step C · 收尾

- [ ] `pipeline_stage: awaiting_draft_confirm`
- [ ] P-agent session：capabilities 使用紀錄

---

## 2. legal_failed 重做

1. 读 `pipeline.md` §3 · `legal_issues`
2. 重做搵料／结构（Step A–B）
3. `pipeline_stage: search` → 完成后再 `awaiting_draft_confirm`

---

## 3. 完成定義

- [ ] §1 全 ✓
- [ ] 未 confirm ① · **唔** 交 Agent 2

---

## 4. 持續改善

| 日期 | 摘要 |
|------|------|
| 2026-06-27 | 初版 search_ops · 地圖分工 |
| 2026-06-27 | Step B 加讀 `t4CrTn7K` 引述梯隊正本 |
| 2026-06-27 | Step B 加讀 `craft/notes/reader-delivery-zh-TW.md`（pyramids 系列沉澱） |
| 2026-06-28 | Step A 對齊 Spin Map S01-P v1.3（`10` · preflight · pack · agent-db 平行廣搜） |
| 2026-06-28 | Step A 加暫存路徑 · CLI 範例 · §0 Spin Map 定位 |

---

*agent01 · search_ops · b1Srch9K*

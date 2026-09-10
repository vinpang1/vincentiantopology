# 備忘錄 · Agent 01 對齊 Spin Map S01-P v1.3

> **作者**：CEO-Vincent  
> **日期**：2026-06-28  
> **性質**：專案治理備忘 · P-agent12 session  
> **uuid**：`s1PAg01K`  
> **唔** export · 唔改 Spin Map 庫 · 操作權威在 P-agent01 正本

---

## 一、拍板方向

Spin Map **2026-06-28** 定案庫內搜尋執行預設 **S01-P v1.3**（語意 S01 · preflight → `search_pack.json`）。  
本 project **Agent 01** 日常搵料須跟此規格，**唔**再手掃整份 Spin Map `Brain.csv`。

| 項目 | 定案 |
|------|------|
| 語意 | S01（四武器 + Recency）· `10_LIBRARY_SEARCH_METHODS.md` |
| 執行 | S01-P v1.3 · `s01_preflight.py` · `meta.s01_parity` = **1.3** |
| Spin Map | **只讀** · `spin_map_ref` · 禁 `spin_map_copy` · 禁 copy P\* 出街 |
| agent-db | 同一觀測點 **平行廣搜**（樞→墟）· 與 pack 合併 uuid **≤8** |
| 廣搜→窄引 | **唔變** · `t4CrTn7K` 梯隊／`sources.md`／引證表分工不變 |

**新流水（Step A）**：

```
觀測點 → Spin Map S01-P pack + agent-db 平行廣搜 → sources.md（≤8）
  → 消化 → 窄選 → 起稿（Step B–C）
```

---

## 二、2026-06-28 完成（本 project）

| 檔 | 變更 |
|----|------|
| `search_ops` `b1Srch9K` | Step A 拆 A0–A3 · S01-P 五階段 · 暫存路徑 · CLI 範例 · §0 定位 |
| `t4CrTn7K` | v0.9 · §2.1 S01-P 執行層 · §4.1 ② 廣搜表述 |
| `agent_01/agent_01.md` | Spin Map 規則列 · 开工順序含 S01-P |
| `agent-01-search.mdc` | 开工第 6 步 S01-P · 禁讀整份 `Brain.csv` |
| P-agent01 shadow | `search_ops` · `t4CrTn7K` summary 同步 |

**暫存**（唔入 agent-db 樞）：`drafts/{slug}/search_request.json` · `search_pack.json`

**`recency_mode`**：時事／科技 `tier_default`｜古典／史學／考古 **`off`**

---

## 三、團隊須知（Agent 1）

1. 開工仍 `@agent-01-search` → 地圖 `agent_01.md` → **`search_ops` 正本逐步執行**。  
2. Spin Map 側：**Phase 0–4** 跟 `search_ops` Step A1；**只讀 pack**，禁止無 pack 開正本廣搜。  
3. **P 負責跳；B/A 負責證** · 廣搜產出 ≠ 引證表。  
4. `ingest_spin_map_pyramids_agent01.py` 仍 **DEPRECATED**（禁 `spin_map_copy`）。  
5. 與備忘 `aGFl7m01`（folder 化）**獨立**；兩者同日完成、互不改流水關卡。

---

## 四、刻意留低

| 項目 | 原因 |
|------|------|
| Spin Map 庫本體 | 本 project 零寫入 |
| 新 `agent01_*` uuid 流程檔 | 改善寫入現有 `b1Srch9K`／`t4CrTn7K` 正本即可 |
| pyramids 實戰試跑 S01-P | 待下一輪起稿時驗證 pack |

---

## 五、權威追蹤（Agent 1 操作）

| 層 | 路徑 |
|----|------|
| 日常操作正本 | `P-agent01_Search/20260627_agent01_search_ops_b1Srch9K.md` |
| 廣搜窄引 | `…/20260627_agent01_writing_citation_tiers_t4CrTn7K.md` |
| Spin Map 索引 | `~/Documents/Dev/_shared/spin-map/docs/ai/10_LIBRARY_SEARCH_METHODS.md` |
| Spin Map 執行 | `…/search/S01_preflight_hybrid.md` |

**關聯備忘**：[`20260628_agent12_memo_agents_folder_migration_aGFl7m01.md`](./20260628_agent12_memo_agents_folder_migration_aGFl7m01.md) · `aGFl7m01` · [`20260628_agent12_ceo_memo_database_redesign_cEoVn528.md`](./20260628_agent12_ceo_memo_database_redesign_cEoVn528.md) · `cEoVn528`

---

## 簽署

**CEO-Vincent** · Vincentian Topology  
2026-06-28

---

## 修改紀錄

| 日期 | 摘要 |
|------|------|
| 2026-06-28 | 初版入庫 P-agent12 · `agent12_memo_agent01_spin_map_s01p` |

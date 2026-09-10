# Agent 1 · 搜索 + 草稿（地圖）

> **agent_id**: `search` · **agent01** · **P-agent**: `P-agent01_Search` · **@ rule**: `@agent-01-search` · **pipeline_stage**: `search`

本檔 **只係地圖**。流程與寫作心得正文 → **P-agent01 記憶層**（下表）。**日後改善只改正本，唔在本檔寫長文。**

---

## 必做流程（唯一）

| 項目 | 路徑 |
|------|------|
| **正本** | [`agent-db/.../P-agent01_Search/20260627_agent01_search_ops_b1Srch9K.md`](../../agent-db/Project_Root/Physical_Reality/P-agent01_Search/20260627_agent01_search_ops_b1Srch9K.md) |
| uuid | `b1Srch9K` |
| shadow | `The_Void_729/2/1/1/1/2/2/20260627_agent01_search_ops_summary_b1Srch9K.md` |

开工：**記憶協議** → **觀測點** → **Spin Map S01-P**（`search_ops` Step A1）→ 讀寫作心得（三部份）→ 引述梯隊 → **逐步执行 search_ops** · 改善 **只改 P-agent 正本**（换版时更新本檔指向）。

---

## 記憶／補充

### 記憶協議（全 Agent · 開工）

| 項目 | 路徑 |
|------|------|
| **正本** | [`agent-db/docs/P_AGENT_MEMORY_PROTOCOL.md`](../../agent-db/docs/P_AGENT_MEMORY_PROTOCOL.md) |
| 憲法 | `project/constitution/AGENT_DB_V2.0.md` §2.5 |
| 要點 | `pk` = 寫入時間主鍵 · 短期重心／長期支持 · 相關召回（link／keywords／vsm／qutrit） |

### 寫作心得（起稿 · 三部份）

| 項目 | 路徑 |
|------|------|
| **正本** | [`agent-db/.../P-agent01_Search/20260627_agent01_writing_three_parts_w3Pt1xK7.md`](../../agent-db/Project_Root/Physical_Reality/P-agent01_Search/20260627_agent01_writing_three_parts_w3Pt1xK7.md) |
| uuid | `w3Pt1xK7` |
| shadow | `The_Void_729/2/1/1/1/2/3/20260627_agent01_writing_three_parts_summary_w3Pt1xK7.md` |

### 寫作補充（引述梯隊 × 產品線）

| 項目 | 路徑 |
|------|------|
| **正本** | [`agent-db/.../P-agent01_Search/20260627_agent01_writing_citation_tiers_t4CrTn7K.md`](../../agent-db/Project_Root/Physical_Reality/P-agent01_Search/20260627_agent01_writing_citation_tiers_t4CrTn7K.md) |
| uuid | `t4CrTn7K` · v0.9（S01-P 廣搜 · **判準四型** → craft/notes/reader-delivery-zh-TW §4） |
| shadow | `The_Void_729/2/1/1/1/2/4/20260627_agent01_writing_citation_tiers_summary_t4CrTn7K.md` |

### Case study · pyramids 全流水

| 項目 | 路徑 |
|------|------|
| lens shadow | `The_Void_729/2/1/2/1/2/2/20260627_agent01_case_pyramids_series_search_lens_k8CsPy01.md` |
| uuid | `k8CsPy01` · 全文見 agent02 正本 `…_case_pyramids_series_full_k8CsPy01.md` |

---

## 規則（上位）

| 來源 | 用途 |
|------|------|
| [`project/articles/craft/_base.md`](../../../project/articles/craft/_base.md) | 觀測點 · 作／寫 · 不變層 |
| [`project/articles/craft/notes/reader-delivery-zh-TW.md`](../../../project/articles/craft/notes/reader-delivery-zh-TW.md) | ② 繁中起稿：台灣語 · 禁內部語 · 通順編排 |
| [`project/design/IA.md`](../../../project/design/IA.md) | 欄目 · frontmatter |
| Spin Map | 搜尋：[`10_LIBRARY_SEARCH_METHODS`](../../../../_shared/spin-map/docs/ai/10_LIBRARY_SEARCH_METHODS.md) → **S01-P v1.3** preflight · 引用：`spin_map_ref` · **禁** copy P\* · **禁** `spin_map_copy` · **禁** 寫庫 |

---

## 職責

- 搵料、fetch、起稿 · P-agent01 正本 → sync `drafts/{slug}/`
- **Agent 4 fail** → 讀 `legal_issues` · 重做 · 再 `awaiting_draft_confirm`

## 禁止

- 未 confirm ① 交 Agent 2 · 入 project DB 文章 · 改 Spin Map · deploy

## 完成

- 正本 §完成定義 ✓ → `pipeline_stage: awaiting_draft_confirm` → 等用户 confirm ①

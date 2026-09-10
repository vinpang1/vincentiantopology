# agent-db · 庫憲法 V1.2（已封存 · Archive）

> **狀態**：2026-06-28 起由 [AGENT_DB_V2.0.md](../AGENT_DB_V2.0.md) 取代（三庫重設計 Batch 0）。  
> **效力（歷史）**：`~/Documents/Dev/vincentian-topology/ai-agent/agent-db/` 之最高操作鐵律。  
> **上位**：[BLUEPRINT_v2.0.md](./BLUEPRINT_v2.0.md)、[`~/Documents/Dev/_shared/governance/PLATFORM_MINIMUM.md`](../../../_shared/governance/PLATFORM_MINIMUM.md)  
> **改動權**：僅專案擁有者  
> **AI 禁止**：未獲明確授權不得刪改、弱化本憲法  
> **沿革**：V1.0 → V1.1（Hybrid + metadata）→ **V1.2**（2026-06-27 · `human_verdict` / `human_review_note`）

**操作規格（跟 Spin Map v1.7.0）**：檔名、shadow、Brain、**D1–D6**、**vsm** — 見 `agent-db/docs/`（02 · 06 · 07 · 08）及 Spin Map `docs/ai/01`–`09`。

---

## §1 庫本體

磁碟路徑（庫根）：

`~/Documents/Dev/vincentian-topology/ai-agent/agent-db/`

正本與 shadow 在 `Project_Root/` 下；`Brain.csv` 在庫根。

| 模塊 | 路徑 | 內容 |
|------|------|------|
| **實** | `Physical_Reality/` | Spin Map **37 buckets** + **P-agent01–12** 擴展櫃 |
| **墟** | `The_Void_729/` | shadow `*.md`（`m_path` 六段 qutrit · 按需 mkdir） |
| **樞** | `Brain.csv` | 索引（Spin Map 核心 18 欄 + agent-db 擴展欄） |

目錄總表：[`agent-db/docs/STRUCTURE.md`](../../ai-agent/agent-db/docs/STRUCTURE.md)

**入庫完成** = 實 + 墟 + 樞。

---

## §2 邏輯分區（Hybrid）

### 2.1 Spin Map 來源層（B / A / P / M）

`Physical_Reality/` 下 **37 個 bucket**（v1.7.0）：

- **B01–B12** 基礎文獻 · **A01–A12** 新聞文章 · **P01–P12** 個人整理 · **M12_Other** 未整理

分類靠 **bucket 子夾 + shadow `bucket` 欄**；Spin Map copy（B/A only）入對應 bucket。

### 2.2 A 層（持久資產 · confirm ② 後）

已登記正本入 **對應 bucket**（唔再平鋪根目錄）：

| 類型 | 典型 metadata | 出街 |
|------|---------------|------|
| 文章（已確認） | `origin: self`、`doc_class: article` | 可 export → `src/content/` |
| 財務登記 | `visibility: internal`、`doc_class: finance` | ❌ |
| 法律登記 | `visibility: internal`、`doc_class: legal` | ❌ |
| Spin Map 副本 | `origin: spin_map`、`ingress: spin_map_copy` | ❌（參考） |

**鐵律**：未 **confirm ②** 禁止文章入 A 層 · 入庫后 **刪** `articles/drafts/{slug}/` · **confirm ③** 方可 export。

### 2.3 P-agent01–12（agent-db 擴展 · 唔等同 Spin Map P*）

| 櫃 | Agent | 用途 |
|----|--------|------|
| P-agent01 | 搜索 + 草稿 | session、來源評估 |
| P-agent02 | 文章編輯 | 改稿思路 |
| P-agent03 | 營運 | 財務／發佈／網頁 |
| P-agent04 | 法律 | 合規筆記 |
| P-agent05–11 | （預留） | — |
| P-agent12 | 雜項 | 未歸類 session |

### 2.4 P-agent 與 drafts

| 項目 | 規則 |
|------|------|
| 正本 | `Physical_Reality/P-agentNN_*/` |
| 副本 | `project/articles/drafts/{slug}/` ← sync 自 P-agent |
| 方向 | Agent 更新 P-agent → sync → drafts |
| 終局 | confirm ② 入 **bucket** A 層 → **刪 drafts** |

**文章 shadow**（confirm ②）：`1 pipeline_whole`（primary）+ `n` auxiliary（keyword／topology 按需）+ `4` Agent lens；見 [`design/EXPORT.md`](../design/EXPORT.md) §B3。**Case study**：holder 正本 + 4 shadow · §B′。

### 2.5 Metadata（D1–D6 · vsm · 跟 Spin Map）

| 項目 | 規則 |
|------|------|
| **d1–d6** | **數值**；shadow 視角座標；見 [`06_SIX_DIMENSIONS.md`](../../ai-agent/agent-db/docs/06_SIX_DIMENSIONS.md) |
| **qutrit** | 由 d 坍縮；格式 `"t1/t2/…/t6"` |
| **vsm** | 9 位 0–4（V1–V9 × S0–S4）；見 [`07_VSM_MATRIX.md`](../../ai-agent/agent-db/docs/07_VSM_MATRIX.md) |
| **Brain.csv** | 核心 18 欄 + 擴展欄；見 [`02_METADATA_INVARIANTS.md`](../../ai-agent/agent-db/docs/02_METADATA_INVARIANTS.md) |
| **檔名** | P-agent：`YYYYMMDD_agentNN_{descriptor}_{uuid8}.md` |

入庫：**實 + shadow + Brain.csv**；YAML 與 Brain **同名同值**。

### 2.6 人類評分（agent-db · 供 Agent 自我反省）

| 欄 | 值 | 說明 |
|----|-----|------|
| **`human_verdict`** | `pending` · `pass` · `fail` | 合格／不合格／未评 |
| **`human_review_note`** | 短文字 | 一句摘要；長文寫 shadow **`### human_review`** |

| 分工 | |
|------|--|
| **`audit`** | Spin Map metadata 结构审 |
| **`human_verdict`** | **僅專案擁有者**對 agent 产出之事後 QC |

Agent **禁止**擅自改 `human_verdict`。开工前可查同 `agent_id` 且 `human_verdict=fail` 之 Brain／shadow 作反省。

---

## §3 入口（Ingress）

| ingress / origin | 來源 | 落點 |
|------------------|------|------|
| `project_native` + 人工確認 | 本 project 產出 | 對應 **bucket**（A 層） |
| `spin_map_copy` | Spin Map **B/A only** | 對應 B/A bucket |
| `session` / `agent_spec` | Agent 工作 | P-agent01–12 |
| fetch 外參 | `_shared/fetch` | 草稿區或 bucket（依流程） |

---

## §4 Spin Map 邊界

- 路徑：`~/Documents/Dev/_shared/spin-map`（只讀）
- **允許** copy：`Physical_Reality/B*`、`Physical_Reality/A*`
- **禁止** copy Spin Map `P*`；**禁止**回寫 Spin Map
- 禁發 uuid：見 `design/IA.md`

---

## §5 與 project/ 關係

```
P-agent 正本 → sync → articles/drafts/{slug}/
    → ① 定稿 → Agent 2 → Agent 4（fail → Agent 1）
    → ② 指令 AI 入 bucket A 層 · 刪 drafts
    → ③ 獨立指令 export
agent-db A 層 → src/content/ → dist/
```

- `finance/`、`legal/` 日常操作在 project/；確認後 **bucket + internal** 登記
- **禁止** deploy agent-db 任何內容

---

## §6 修訂

僅專案擁有者；須回覆含 **「確認」**；舊版移入 `constitution/archive/`。

---

*agent-db 庫憲法 V1.2 · 2026-06-27（+ human_verdict）*

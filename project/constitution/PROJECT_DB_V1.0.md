# project DB · 庫憲法 V1.0

> **效力**：`~/Documents/Dev/vincentian-topology/project-db/` 之最高操作鐵律。  
> **上位**：[BLUEPRINT_v2.0.md](./BLUEPRINT_v2.0.md)、[DATABASE_REDESIGN.md](./DATABASE_REDESIGN.md)、[`~/Documents/Dev/_shared/governance/PLATFORM_MINIMUM.md`](../../../_shared/governance/PLATFORM_MINIMUM.md)  
> **改動權**：僅專案擁有者  
> **AI 禁止**：未獲明確授權不得刪改、弱化本憲法  
> **沿革**：**V1.0**（2026-06-28 · 三庫重設計 Batch 0）

**操作規格（跟 Spin Map v1.8.0）**：檔名、shadow、**D1–D6**、**vsm**、`pub_year` — 權威見 `~/Documents/Dev/_shared/spin-map/docs/ai/`（`01`–`09`）；本庫細則見 [`project-db/docs/`](../../project-db/docs/)。

---

## §0 設計原則

1. **P-agent 層**（`agent-db`）係本 project 的 **agent 記憶、會議紀錄**；以 **單向** `gravity_links` 指向 Spin Map；**唔**要求 Spin Map 回鏈。
2. **本 project 唔改動 Spin Map DB** — 禁止任何寫入、回寫、改 `Brain.csv` 或 shadow。
3. **全平台知識庫統一運作**（同一套 metadata／實墟樞語意），但 **每個 project 分庫**，互唔污染。
4. **project DB** 係 **本 project 獨立** 持久資料庫；底層邏輯與 Spin Map 相同（實／墟／樞），櫃為 **V01–V12**（唔係 Spin Map B/A/P）。

---

## §1 庫本體

磁碟路徑（庫根）：

`~/Documents/Dev/vincentian-topology/project-db/`

正本與 shadow 在 `Project_Root/` 下；**`project.csv`** 在庫根（**唔**叫 `Brain.csv`；與 Spin Map／agent-db 樞檔獨立）。

| 模塊 | 路徑 | 內容 |
|------|------|------|
| **實** | `Physical_Reality/` | **V01–V12** 專案櫃（見 §2） |
| **墟** | `The_Void_729/` | shadow `*.md`（`m_path` 六段 qutrit · 按需 mkdir） |
| **樞** | **`project.csv`** | 索引（Spin Map 核心 **20** 欄 + project 擴展欄） |
| **蟲洞** | `inbox/` | 入庫前暫存；入庫後搬走 |

目錄總表：[`project-db/docs/BUCKETS.md`](../../project-db/docs/BUCKETS.md)

**入庫完成** = 實 + 墟 + 樞（每 shadow 一行 `project.csv`）。

**`pk` 序號**：本庫 **獨立遞增**；禁止與 Spin Map `Brain.csv` 或 agent-db `agent_Brain.csv` 共用。

---

## §2 邏輯分區（V01–V12）

前綴 **`V`** = **Vincentian project 櫃**（唔係 Spin Map 引證層 B）。

| Bucket | 狀態 | 用途 |
|--------|------|------|
| **V01_External_Reference** | 啟用 | 外參：他人文章、PDF、工具文檔 |
| **V02_Articles** | 啟用 | **全部**可交付文章（入門／view／topics／classics 合一；欄目靠 `vt_site_slug`） |
| **V03_Finance** | 啟用 | 財務登記 |
| **V04_Legal** | 啟用 | 法律登記 |
| **V05_Site_Specs** | 啟用 | 站點規格、部署、IA 備忘 |
| **V06–V11** | **TBC** | **禁止入庫**直至專案擁有者啟用並更新 `BUCKETS.md` |
| **V12_Other** | 啟用 | 雜項；整理前暫落，唔長期堆料 |

### 2.1 持久資產（confirm ② 後）

| 類型 | bucket | 典型 metadata | 出街 |
|------|--------|---------------|------|
| 文章（已確認） | V02 | `ingress: deliverable`、`doc_class: article`、`visibility: exportable` | confirm ③ → `src/content/` |
| 外參 | V01 | `doc_class: external_ref`、`visibility: internal` | ❌ |
| 財務 | V03 | `doc_class: finance`、`visibility: internal` | ❌ |
| 法律 | V04 | `doc_class: legal`、`visibility: internal` | ❌ |
| 站點規格 | V05 | `doc_class: ops`、`visibility: internal` | ❌ |

**鐵律**：未 **confirm ②** 禁止文章入 project DB · 入庫后 **刪** `articles/drafts/{slug}/` · **confirm ③** 方可 export。

### 2.2 文章 shadow（confirm ②）

同一 uuid：`1` primary（`{slug}_pipeline_whole`）+ `n` auxiliary（按需）+ `4` Agent lens（可選保留於 agent-db，project DB 至少 primary + 按需層）。見 [`design/EXPORT.md`](../design/EXPORT.md) §B3（Batch 4 起改指向本庫）。

---

## §3 Metadata（跟 Spin Map v1.8.0）

| 項目 | 規則 |
|------|------|
| **d1–d6** | 數值；shadow 視角座標；見 Spin Map [`06_SIX_DIMENSIONS.md`](../../../_shared/spin-map/docs/ai/06_SIX_DIMENSIONS.md) |
| **qutrit** | 由 d 坍縮；`m_path` 六層對齊 |
| **vsm** | 9 位 0–4；見 Spin Map [`02_METADATA_INVARIANTS.md`](../../../_shared/spin-map/docs/ai/02_METADATA_INVARIANTS.md) §vsm |
| **`pub_year`** | 20 欄 schema 一部分；V02 出街年；V01 外參依原文 |
| **`project.csv`** | 核心 20 欄 + 擴展欄；見 [`project-db/docs/02_METADATA.md`](../../project-db/docs/02_METADATA.md) |
| **檔名** | 跟 Spin Map `01_FILENAME_INVARIANTS`；`bucket` 須為 `V*` |

YAML front matter 與 `project.csv` **同名同值**。

### 3.1 project 擴展欄（摘要）

`ingress`、`doc_class`、`visibility`、`spin_map_uuid`、`vt_site_slug`、`vt_working_path`、`linked_p_agent_uuid`、`author`、`source_url`、`notes`

---

## §4 入口（Ingress）

| ingress | 來源 | 落點 |
|---------|------|------|
| `deliverable` | confirm ② 文章 | **V02_Articles** |
| `project_native` | 本 project 產出（財務／法律／站規等） | V03–V05 或 V12 |
| `spin_map_ref` | Spin Map **只讀引用**（**唔** copy 正文入庫） | 通常 V01；`spin_map_uuid` 必填 |

**廢止**：`spin_map_copy` 實體複製入本庫。

---

## §5 引力與 Spin Map 邊界

> 細則：[`project-db/docs/GRAVITY.md`](../../project-db/docs/GRAVITY.md) · Spin Map tier：[`gravity/TIER_DIRECTED_GRAVITY.md`](../../../_shared/spin-map/docs/ai/gravity/TIER_DIRECTED_GRAVITY.md)

| 規則 | 內容 |
|------|------|
| **tier** | project DB `V*` = **tier 3**（登記表） |
| **庫內** | V↔V **雙向**（同 Spin Map 同層規則） |
| **跨庫** | V→Spin Map B/A/P **單向** outbound；**禁止**改 Spin Map |
| **與 agent-db** | confirm ② 可 `linked_p_agent_uuid`；P-agent→V **單向**（記憶指標） |

- Spin Map 路徑：`~/Documents/Dev/_shared/spin-map`（**只讀**）
- **禁止** copy Spin Map `P*` 作引證冒充；出文引證追溯 **B**（W01 閘門）
- 禁發 uuid：見 `design/IA.md`

---

## §6 與 agent-db／project/ 關係

```
agent-db P-agent → sync → articles/drafts/{slug}/
    → ① 定稿 → Agent 2 → Agent 4（fail → Agent 1）
    → ② confirm → 入 project DB（主要 V02）· 刪 drafts
    → ③ confirm → export → src/content/
project DB（V02 exportable）→ dist/（唯一出街稿來源）
```

- `project/finance/`、`project/legal/` 日常操作；confirm 後登記 **V03／V04**
- **禁止** deploy agent-db 任何內容；**禁止** deploy 未 confirm ③ 的 project DB 內容

---

## §7 修訂

僅專案擁有者；須回覆含 **「確認」**；舊版移入 `constitution/archive/`。

---

*project DB 庫憲法 V1.0 · 2026-06-28 · Batch 0*

# agent-db · 庫憲法 V2.0

> **效力**：`~/Documents/Dev/vincentian-topology/ai-agent/agent-db/` 之最高操作鐵律。  
> **上位**：[BLUEPRINT_v2.0.md](./BLUEPRINT_v2.0.md)、[DATABASE_REDESIGN.md](./DATABASE_REDESIGN.md)、[PROJECT_DB_V1.0.md](./PROJECT_DB_V1.0.md)、[`~/Documents/Dev/_shared/governance/PLATFORM_MINIMUM.md`](../../../_shared/governance/PLATFORM_MINIMUM.md)  
> **改動權**：僅專案擁有者  
> **AI 禁止**：未獲明確授權不得刪改、弱化本憲法  
> **沿革**：V1.0 → V1.1（Hybrid）→ V1.2（human_verdict）→ **V2.0**（2026-06-28 · P-agent only · `agent_Brain.csv`）

**操作規格（跟 Spin Map v1.8.0）**：檔名、shadow、**D1–D6**、**vsm**、`pub_year` — 見 `agent-db/docs/` 及 Spin Map `docs/ai/01`–`09`。

**取代**：[archive/AGENT_DB_V1.2.md](./archive/AGENT_DB_V1.2.md)（Hybrid 37 buckets · `Brain.csv` · `spin_map_copy`）。

---

## §0 設計原則

（與 [PROJECT_DB_V1.0.md](./PROJECT_DB_V1.0.md) §0 一致）

1. **P-agent 層**係本 project 的 **agent 記憶、會議紀錄**；**單向** `gravity_links` → Spin Map。
2. **本 project 唔改動 Spin Map DB**。
3. 平台 **規格統一、分庫隔離**。
4. **持久交付資產**入 **project DB**（`project.csv`）；本庫 **唔**再設 A 層／Spin Map B/A/P/M 櫃。

---

## §1 庫本體

磁碟路徑（庫根）：

`~/Documents/Dev/vincentian-topology/ai-agent/agent-db/`

正本與 shadow 在 `Project_Root/` 下；**`agent_Brain.csv`** 在庫根。

| 模塊 | 路徑 | 內容 |
|------|------|------|
| **實** | `Physical_Reality/` | **僅 P-agent01–12** |
| **墟** | `The_Void_729/` | shadow `*.md` |
| **樞** | **`agent_Brain.csv`** | Spin Map 核心 **20** 欄 + agent-db 擴展欄 |
| **蟲洞** | `inbox/` | 入庫前暫存 |

目錄總表：[`agent-db/docs/STRUCTURE.md`](../../ai-agent/agent-db/docs/STRUCTURE.md)

**入庫完成** = 實 + 墟 + 樞。

**`pk` 序號**：本庫 **獨立遞增**。

---

## §2 邏輯分區（P-agent only）

### 2.1 P-agent01–12

| 櫃 | Agent | 用途 |
|----|--------|------|
| P-agent01 | 搜索 + 草稿 | session、來源評估、會議紀錄 |
| P-agent02 | 文章編輯 | 改稿思路、case study |
| P-agent03 | 營運 | 財務／發佈／網頁 ops |
| P-agent04 | 法律 | 合規筆記 |
| P-agent05–11 | （預留） | — |
| P-agent12 | 雜項 | 未歸類 session |

**廢止**：`Physical_Reality/` 下 Spin Map **B01–B12、A01–A12、P01–P12、M12** 及 **`ingress: spin_map_copy`** 實體複製（Batch 3 清理存量）。

### 2.2 P-agent 與 drafts

| 項目 | 規則 |
|------|------|
| 正本 | `Physical_Reality/P-agentNN_*/` |
| 副本 | `project/articles/drafts/{slug}/` ← sync 自 P-agent |
| 方向 | Agent 更新 P-agent → sync → drafts |
| 終局 | confirm ② 入 **project DB**（非本庫）→ **刪 drafts** |

本庫可保留 **agent lens shadow**、`human_verdict`；confirm ② 後以 `linked_p_agent_uuid`（project DB 側）指回 session。

### 2.3 Metadata

| 項目 | 規則 |
|------|------|
| **d1–d6 · vsm · pub_year** | 跟 Spin Map v1.8.0（權威見 `_shared/spin-map/docs/ai/`） |
| **`agent_Brain.csv`** | 見 [`agent-db/docs/02_METADATA_INVARIANTS.md`](../../ai-agent/agent-db/docs/02_METADATA_INVARIANTS.md) |
| **檔名** | `YYYYMMDD_agentNN_{descriptor}_{uuid8}.md` |

### 2.4 人類評分

| 欄 | 說明 |
|----|------|
| **`human_verdict`** | `pending` / `pass` / `fail` · **僅擁有者**可改 |
| **`human_review_note`** | 短摘要；長文寫 shadow `### human_review` |
| **`audit`** | metadata 结构审（Spin Map 語意） |

Agent **禁止**擅自改 `human_verdict`。

### 2.5 P-agent 記憶協議（全 Agent 開工）

1. **`pk` = 寫入樞嘅時間主鍵**（UTC `YYYYMMDD12NNNN`）；記憶時間軸跟 `pk`，唔跟 `uuid`／`pub_year`／`d4`。
2. **短期重心**：時間線上較近 `pk` 嘅相關寫入 — 預設立場；**長期支持**：較早 `pk` 仍相關嘅寫入 — 脈絡與沿革。
3. **相關性召回**（`gravity_links`、`keywords`、`vsm`、`qutrit` 等，**唔寫死**單一路徑）決定讀邊啲；**禁止**只讀最新一行就作答。
4. **操作全文**：[`agent-db/docs/P_AGENT_MEMORY_PROTOCOL.md`](../../ai-agent/agent-db/docs/P_AGENT_MEMORY_PROTOCOL.md)

---

## §3 入口（Ingress）

| ingress | 來源 | 落點 |
|---------|------|------|
| `agent_spec` / `session` | Agent 工作、會議紀錄 | P-agent01–12 |
| `spin_map_ref` | Spin Map **只讀**（uuid 引用；**唔** copy 正文） | P-agent shadow；`spin_map_uuid` |
| fetch 外參 | `_shared/fetch` | 草稿區或 P-agent 筆記（**唔** spin_map_copy） |

**廢止**：`spin_map_copy`、`project_native` 作為本庫持久文章終點（文章終點 → project DB V02）。

---

## §4 引力與 Spin Map 邊界

| tier | 命名空間 | outbound |
|------|----------|----------|
| 0–2 | Spin Map B/A/P | （Spin Map 內規則；**本庫唔改**） |
| **4** | **P-agent\*** | P-agent↔P-agent **雙向**；→ Spin Map B/A/P **單向**；→ project DB V* **單向**（可選，confirm ② 鏈路） |

- Spin Map：`~/Documents/Dev/_shared/spin-map`（**只讀**）
- **禁止** copy Spin Map `P*` 入本庫實體
- **禁止**回寫 Spin Map
- 禁發 uuid：見 `design/IA.md`

---

## §5 與 project DB／project/ 關係

```
P-agent 正本 → sync → drafts/
    → ① 定稿 → Agent 2 → Agent 4
    → ② confirm → project DB（V02 等）
    → ③ export（由 project DB，非本庫）
```

- **禁止** deploy 本庫任何內容
- Agent 3 **不參與** 1→2→4 文章流水

---

## §6 修訂

僅專案擁有者；須回覆含 **「確認」**；V2.0 前正文見 [archive/AGENT_DB_V1.2.md](./archive/AGENT_DB_V1.2.md)。

---

*agent-db 庫憲法 V2.0 · 2026-06-28 · Batch 0 · §2.5 2026-06-28 Batch 6a*

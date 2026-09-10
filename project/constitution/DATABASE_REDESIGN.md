# 三庫重設計 · 改動方案與批次追蹤

> **啟動**：2026-06-28 · Batch 0  
> **上位**：[BLUEPRINT_v2.0.md](./BLUEPRINT_v2.0.md) · [PROJECT_DB_V1.0.md](./PROJECT_DB_V1.0.md) · [AGENT_DB_V2.0.md](./AGENT_DB_V2.0.md)

---

## §0 設計定案

| 原則 | 定案 |
|------|------|
| P-agent | 本 project agent 記憶／會議紀錄；**單向**引力 → Spin Map |
| Spin Map | **零**寫入（本 project） |
| 平台 | 規格統一（Spin Map v1.8）；**分庫**防污染 |
| project DB | 獨立庫；實墟樞同 Spin Map；櫃 **V01–V12** |

### 三庫一覽

| 庫 | 路徑 | 樞檔 | 物理櫃 |
|----|------|------|--------|
| Spin Map | `~/Documents/Dev/_shared/spin-map/` | `Brain.csv` | B/A/P × 01–12 |
| agent-db | `ai-agent/agent-db/` | **`agent_Brain.csv`** | **P-agent01–12** |
| project DB | **`project-db/`** | **`project.csv`** | **V01–V05、V12**（V06–11 TBC） |

### V01–V12

| Bucket | 用途 |
|--------|------|
| V01_External_Reference | 外參 |
| V02_Articles | 全部可交付文章（`vt_site_slug` 分欄目） |
| V03_Finance | 財務 |
| V04_Legal | 法律 |
| V05_Site_Specs | 站點規格 |
| V06–V11 | TBC · **禁止入庫** |
| V12_Other | 雜項 |

---

## 批次總覽

| 批 | 名稱 | 狀態 |
|----|------|------|
| **0** | 憲法與規格定案 | ✅ 2026-06-28 |
| **1** | project DB 骨架 | ✅ 2026-06-28 |
| **2** | agent-db V2 + `agent_Brain.csv` 改名 | ✅ 2026-06-28 |
| **3** | agent-db 存量清理（`spin_map_copy`） | ✅ 2026-06-28 |
| **4** | 流水與治理同步（EXPORT、BLUEPRINT、agents） | ✅ 2026-06-28 |
| **5** | 驗收與封存 | ✅ 2026-06-28 |
| **6a** | P-agent 記憶協議 · 規格定案 | ✅ 2026-06-28 |
| **6b** | P-agent 記憶協議 · Cursor rules | ✅ 2026-06-28 |
| **6c** | P-agent 記憶協議 · 地圖同步與驗收 | ✅ 2026-06-28 |

**執行**：專案擁有者打 `next` / `next batch N` → `@agent-03-ops`（Agent mode）。

**依賴**：0 → 1 → 2 → 3 → 4 → 5 · **6**（6a → 6b → 6c）獨立於 0–5

---

## Batch 0 · 憲法與規格定案 ✅

### 交付

- [x] `constitution/PROJECT_DB_V1.0.md`
- [x] `constitution/AGENT_DB_V2.0.md`
- [x] `constitution/DATABASE_REDESIGN.md`（本檔）
- [x] `project-db/docs/` 規格草稿（`BUCKETS` · `02_METADATA` · `GRAVITY` · `06`/`07`/`08` ref）
- [x] `archive/AGENT_DB_V1.2.md`（V1.2 正文歸檔）
- [x] `constitution/README.md` 索引更新

### 驗收

- [x] §0 四點理念寫入兩庫憲法
- [x] 三樞檔名稱寫死
- [x] V06–11 禁止入庫寫死
- [x] **未**刪 agent-db 資料

---

## Batch 1 · project DB 骨架 ✅

- [x] `project-db/project.csv` 標題列（20 核心 + 10 擴展）
- [x] `Project_Root/Physical_Reality/` V01、V02、V03、V04、V05、V12
- [x] `inbox/README.md`、`project-db/README.md`、`docs/STRUCTURE.md`
- [x] **0** 行資料（白紙庫）

---

## Batch 2 · agent-db V2 + 改名 ✅

- [x] `Brain.csv` → `agent_Brain.csv`（備份 `Brain.csv.bak.batch2`）
- [x] 標題升 v1.8 核心 **20** 欄 + 擴展 **9** 欄（**82** 行遷移）
- [x] `docs/STRUCTURE.md` P-agent only
- [x] `ingest_spin_map_*.py` 標 **DEPRECATED**
- [x] agent-db README · `02_METADATA` · 相關 docs 更新

---

## Batch 3 · agent-db 存量清理 ✅

- [x] 備份 `agent_Brain.csv.bak.batch3_20260628_165429`
- [x] 刪 **71**× `spin_map_copy` 實體與 B/A 櫃
- [x] 保留 **11** P-agent 相關行
- [x] Spin Map 零改動
- [x] [`database_redesign_batch3_20260628.md`](../../ai-agent/agent-db/docs/audit/database_redesign_batch3_20260628.md)

### 可選 Batch 3b

- [ ] 4× `project_native` → project DB V02（confirm ② 時）

---

## Batch 4 · 流水與治理同步 ✅

- [x] `design/EXPORT.md` → project DB
- [x] `BLUEPRINT_v2.0.md` 三庫圖
- [x] `CONSTITUTION_V1.0.md` · `EGRESS_V1.0.md` · `IA.md`
- [x] `AGENTS.md`（根 · project）· `ai-agent/agents/01–04`
- [x] `.cursor/rules/agent-workflow.mdc` · `agent-01`–`03`
- [x] `articles/DRAFTS.md` · `drafts-template` · `finance/README.md`
- [x] `agent-db/docs/FILENAME_INVARIANTS.md`

---

## Batch 5 · 驗收與封存 ✅

- [x] [`database_redesign_acceptance_20260628.md`](../../ai-agent/agent-db/docs/audit/database_redesign_acceptance_20260628.md)
- [x] `~/Documents/Vincentian Topology Database/` 標 **SUPERSEDED**
- [x] P-agent02 Tier 1 殘留 `spin_map_copy` 表述清理

---

## Batch 6 · P-agent 記憶協議 ✅

> **啟動**：2026-06-28 · 對話定案 · `pk` = 寫入時間主鍵 · 短期重心／長期支持

### Batch 6a · 規格定案 ✅

- [x] `ai-agent/agent-db/docs/P_AGENT_MEMORY_PROTOCOL.md`
- [x] `AGENT_DB_V2.0.md` §2.5
- [x] `agent-db/docs/README.md` 索引 `1c`

### Batch 6b · Cursor 執行層 ✅

- [x] `.cursor/rules/agent-workflow.mdc` § P-agent 記憶
- [x] `.cursor/rules/agent-01-search.mdc` … `agent-04-legal.mdc` 开工 step 2

### Batch 6c · 地圖同步與驗收 ✅

- [x] `ai-agent/agents/agent_01` … `agent_04` 地圖 · 記憶協議 pointer
- [x] `project/AGENTS.md` §1 必讀第 6 點
- [x] [`p_agent_memory_protocol_20260628.md`](../../ai-agent/agent-db/docs/audit/p_agent_memory_protocol_20260628.md)

---

## 現況（Batch 5 後）

| 項目 | 數量／狀態 |
|------|------------|
| agent-db `ingress: spin_map_copy` | **0** 行 |
| agent-db 總行 | **11** |
| agent-db `project_native` | **4**（case lens · 待 confirm ② → project DB） |
| project DB 資料行 | **0**（白紙庫） |
| 舊 `Vincentian Topology Database/` | **SUPERSEDED** |

---

## 刻意唔入批次

- 單篇 confirm ② 首次入 project DB（日常）
- Spin Map 任何操作
- confirm ③ export／deploy

---

*三庫重設計 · Batch 0–5 完成 · Batch 6（6a–6c）完成 · 2026-06-28*

# 三庫重設計 · Batch 5 總驗收

> **日期**：2026-06-28  
> **範圍**：Batch 0–5 · Spin Map **零改動**  
> **上位**：[`project/constitution/DATABASE_REDESIGN.md`](../../../../project/constitution/DATABASE_REDESIGN.md)

---

## 1. 驗收結論

| 項目 | 結果 |
|------|------|
| **總體** | **PASS** |
| 三庫隔離 | PASS |
| agent-db P-agent only | PASS |
| project DB 白紙庫 | PASS |
| 治理／流水同步 | PASS |
| 舊庫封存 | PASS |

---

## 2. 三庫現況

| 庫 | 路徑 | 樞檔 | 資料行 | 物理櫃 |
|----|------|------|--------|--------|
| Spin Map | `~/Documents/Dev/_shared/spin-map/` | `Brain.csv` | （未驗） | B/A/P × 01–12 |
| agent-db | `ai-agent/agent-db/` | `agent_Brain.csv` | **11** | P-agent01–12 only |
| project DB | `project-db/` | `project.csv` | **0** | V01–V05、V12 |

---

## 3. 逐批核對

### Batch 0 · 憲法與規格

- [x] `PROJECT_DB_V1.0.md` · `AGENT_DB_V2.0.md` · `DATABASE_REDESIGN.md`
- [x] `project-db/docs/` 規格草稿
- [x] `AGENT_DB_V1.2` 歸檔

### Batch 1 · project DB 骨架

- [x] `project.csv` 30 欄標題
- [x] V01、V02、V03、V04、V05、V12 目錄存在
- [x] V06–11 **未** mkdir
- [x] `inbox/` · README · STRUCTURE

### Batch 2 · agent-db V2

- [x] `Brain.csv` → `agent_Brain.csv`（根目錄 **無** `Brain.csv`）
- [x] 備份 `Brain.csv.bak.batch2` 存在
- [x] v1.8 核心 20 欄 + 擴展 9 欄
- [x] `ingest_spin_map_*.py` 標 DEPRECATED

### Batch 3 · 存量清理

- [x] 備份 `agent_Brain.csv.bak.batch3_20260628_165429`
- [x] `ingress: spin_map_copy` 資料行：**0**
- [x] `Physical_Reality/` 無 B/A/P/M 櫃
- [x] [`database_redesign_batch3_20260628.md`](./database_redesign_batch3_20260628.md)

### Batch 4 · 治理同步

- [x] `EXPORT.md` · `BLUEPRINT_v2.0.md` → project DB 流水
- [x] `CONSTITUTION` · `EGRESS` · `IA` · `AGENTS` · Cursor rules
- [x] 四 Agent 地圖 · P-agent 正本 checklist
- [x] `DRAFTS.md` · README 族 · `FILENAME_INVARIANTS`

### Batch 5 · 封存

- [x] 本驗收檔
- [x] `~/Documents/Vincentian Topology Database/` 標 **SUPERSEDED**
- [x] 現行庫指向 `project-db/`

---

## 4. 鐵律抽樣

| 鐵律 | 驗證 |
|------|------|
| Spin Map 零寫入（本 project） | 未執行任何 Spin Map 寫操作 |
| 禁 `spin_map_copy` 實體 | CSV 無 `ingress=spin_map_copy` 行 |
| P-agent 禁出街 | `EGRESS` · `EXPORT` · agent rules 一致 |
| confirm ② → project DB | `EXPORT.md` §B · `PROJECT_DB_V1.0` |
| confirm ③ → export V02 | `EXPORT.md` §C · Agent 3 正本 |

---

## 5. agent-db 行分佈（11 行）

| ingress | 約數 | 備註 |
|---------|------|------|
| `agent_spec` | 7 | P-agent 必做流程／寫作心得 |
| `project_native` | 4 | case `k8CsPy01` lens（**非**文章終點） |

**關鍵字**欄可能含歷史字串 `spin_map_copy`（case audit）— **唔**等同 ingress。

---

## 6. 刻意保留／未做

| 項目 | 狀態 |
|------|------|
| Batch 3b · 4× `project_native` → project DB V02 | 待用户 confirm ② |
| 單篇日常入 project DB | 日常流水 |
| Spin Map 操作 | 禁止 |
| `archive/AGENT_DB_V1.2.md` 舊語「A 層」 | 歷史封存 |
| case shadow YAML `ingress: spin_map_copy` | 歷史 audit 痕跡（實體已刪） |

---

## 7. 舊庫

| 路徑 | 狀態 |
|------|------|
| `~/Documents/Vincentian Topology Database/` | **SUPERSEDED** → 見該目錄 `README.md` |
| 現行 project DB | `vincentian-topology/project-db/` |

---

## 8. 後續（日常）

1. 文章：drafts → confirm ② → **project DB V02** → 刪 drafts  
2. 財務／法律：confirm ② → **V03／V04**  
3. export：confirm ③ → `@agent-03-ops` → `src/content/`  
4. Spin Map：只讀 · `spin_map_ref` · `spin_map_uuid`

---

*Batch 5 驗收 · 2026-06-28*

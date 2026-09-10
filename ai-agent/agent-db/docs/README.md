# agent-db · 規格閱讀順序

> **跟足 Spin Map v1.7.0**（D1–D6 · vsm · 實墟樞）。權威副本：`~/Documents/Dev/_shared/spin-map/docs/ai/`

## 建議順序

| 順 | 檔 | 用途 |
|----|-----|------|
| 0 | [`STRUCTURE.md`](./STRUCTURE.md) | 目錄 · Hybrid buckets + P-agent |
| 1 | [`FILENAME_INVARIANTS.md`](./FILENAME_INVARIANTS.md) | 檔名（P-agent 须含 agentNN） |
| 1b | [`P_AGENT12_MEMO_INGEST.md`](./P_AGENT12_MEMO_INGEST.md) | **P-agent12 備忘**入庫 SOP（三件套 · 禁止額外同步） |
| 1c | [`P_AGENT_MEMORY_PROTOCOL.md`](./P_AGENT_MEMORY_PROTOCOL.md) | **全 Agent 開工** · `pk` 時間主軸 · 短期重心／長期支持 |
| 2 | [`02_METADATA_INVARIANTS.md`](./02_METADATA_INVARIANTS.md) | YAML ↔ `agent_Brain.csv` · 核心 + 擴展欄 |
| 3 | [`06_SIX_DIMENSIONS.md`](./06_SIX_DIMENSIONS.md) | D1–D6 搜尋軸 |
| 4 | [`07_VSM_MATRIX.md`](./07_VSM_MATRIX.md) | V1–V9 · S0–S4 · `vsm` |
| 5 | [`08_QUTRIT_COLLAPSE.md`](./08_QUTRIT_COLLAPSE.md) | d → qutrit → `m_path` |
| 6 | Spin Map [`04_SHADOW_CREATION_METHOD.md`](../../../_shared/spin-map/docs/ai/04_SHADOW_CREATION_METHOD.md) | shadow 拆檔 · doc/view_summary |
| 7 | [`templates/shadow_primary.md`](./templates/shadow_primary.md) | Primary shadow 空白模板 |
| — | [`audit/`](./audit/) | 入库 Review 报告（批 4+） |

## 憲法

[`../../project/constitution/AGENT_DB_V1.0.md`](../../project/constitution/AGENT_DB_V1.0.md)

## 廢止提醒

- **唔用** 舊 `v1～v16` 浮點欄 → 用 **`vsm`**（9 位）
- **S 態** 係 **S0–S4**（Spin Map 冇 S5）

# 07 — V-S 矩陣 · vsm（project DB）

> **權威正文（寫死跟隨）**：  
> Spin Map [`02_METADATA_INVARIANTS.md`](../../../_shared/spin-map/docs/ai/02_METADATA_INVARIANTS.md) §`vsm`  
> agent-db 對照：[`agent-db/docs/07_VSM_MATRIX.md`](../../ai-agent/agent-db/docs/07_VSM_MATRIX.md)（Batch 2 起升 v1.8 ref）

---

## 要點（摘要）

| 項目 | 規則 |
|------|------|
| 格式 | `vsm: "123456789"` — 9 位，每位 **0–4**（S0–S4） |
| 與 qutrit | **正交** — qutrit → `m_path`；vsm → 語意搜尋 |
| 填寫 | 依 **shadow 內容**獨立評估；同一 uuid 多 shadow 各自 vsm |
| V8 | 若非 `0`，正文須說明反向對應 V1–V6 |
| 防混淆 | `vsm[3]` = V4_Sys **≠** `d4`；`vsm[4]` = V5_Dyn **≠** `d5` |

正文必填：`## view_summary` → `### V-S 矩陣（vsm: "…"）` 九行表。

---

*project-db · ref only · Batch 0*

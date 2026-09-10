# 分層有向引力（project DB · 跨庫）

> **Spin Map 權威**：[`gravity/TIER_DIRECTED_GRAVITY.md`](../../../_shared/spin-map/docs/ai/gravity/TIER_DIRECTED_GRAVITY.md)（v1.8.0）  
> **庫憲法**：[PROJECT_DB_V1.0.md](../../project/constitution/PROJECT_DB_V1.0.md) §5

---

## 1. 欄位語意

`gravity_links` = 該 **primary shadow 的 outbound** 鄰居（`|` 分隔 8 碼 uuid）。

- **唔**假設無向圖
- 跨庫連 Spin Map：**只寫本庫 outbound**；**禁止**改 Spin Map `Brain.csv`

---

## 2. Tier 登記（本 project）

| tier | 命名空間 | outbound 允許 |
|------|----------|----------------|
| 0–2 | Spin Map B/A/P | （Spin Map 內規則；**本庫唔改**） |
| **3** | project DB **`V*`** | V↔V **雙向**；V→Spin Map B/A/P **單向** |
| **4** | agent-db **`P-agent*`** | P-agent↔P-agent **雙向**；→ Spin Map、→ V **單向** |

---

## 3. 防污染

| 規則 | 內容 |
|------|------|
| Spin Map | **零寫入** |
| project → Spin Map | 僅 outbound；Spin Map **唔**回鏈 project uuid |
| project ↔ project | 同 tier 雙向 |
| W01 引證 | 追溯 Spin Map **B**；P 唔入引證表（同 Spin Map 13） |

---

## 4. 寫入（Batch 5+ 可實作）

- 庫內修復／入庫須經 **project 專用** tier 模組（待 Batch 1+ 建立；語意對齊 `gravity_tier.py`）
- **禁止**裸改 CSV 字串後忘記對端／違反 tier

---

*project-db · Batch 0 草稿 · 2026-06-28*

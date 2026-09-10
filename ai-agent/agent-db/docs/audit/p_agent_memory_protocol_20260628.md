# P-agent 記憶協議 · 驗收

> **日期**：2026-06-28  
> **追蹤**：[`DATABASE_REDESIGN.md`](../../../../project/constitution/DATABASE_REDESIGN.md) Batch 6（6a–6c）  
> **正本**：[`P_AGENT_MEMORY_PROTOCOL.md`](../P_AGENT_MEMORY_PROTOCOL.md)

---

## 結果

| 批 | 狀態 | 交付 |
|----|------|------|
| **6a** | ✅ | `P_AGENT_MEMORY_PROTOCOL.md` · `AGENT_DB_V2.0` §2.5 · `docs/README` 1c |
| **6b** | ✅ | `agent-workflow.mdc` · `agent-01`…`04` `.mdc` |
| **6c** | ✅ | `agent_01`…`04` 地圖 · `project/AGENTS.md` §1-6 · 本檔 |

---

## 規格要點（驗收勾選）

- [x] **`pk` = 寫入 `agent_Brain.csv` 嘅時間主鍵**（唔同 `uuid`／`pub_year`／`d4` 混）
- [x] **短期重心**（較近 `pk`）· **長期支持**（較早仍相關 `pk`）
- [x] **相關召回**彈性（`gravity_links`／`keywords`／`vsm`／`qutrit`）· 唔寫死單一路徑
- [x] **禁止** 只讀最新一行就作答
- [x] **樞 → 墟 → 實** 開工步驟寫入 protocol §4
- [x] Cursor **`alwaysApply`**（`agent-workflow`）+ 四 Agent rule 开工 hook

---

## 刻意唔做

- 唔改四份 `*_ops` 正文（地圖 + Cursor 已指向 protocol）
- 唔新入庫 P-agent12 備忘（規格批 · 非 session 備忘）
- 唔改 `agent_Brain.csv`

---

## 修改紀錄

| 日期 | 摘要 |
|------|------|
| 2026-06-28 | Batch 6c 驗收 · P-agent 記憶協議全三批完成 |

---

*p_agent_memory_protocol · Batch 6c · 2026-06-28*

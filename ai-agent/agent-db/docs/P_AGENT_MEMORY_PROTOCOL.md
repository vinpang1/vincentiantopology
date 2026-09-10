# P-agent 記憶協議 · 全 Agent 開工

> **效力**：`agent-db` 內四 Agent（及日後 P-agent05–12）開工前必守  
> **上位**：[AGENT_DB_V2.0.md](../../../project/constitution/AGENT_DB_V2.0.md) §2.5  
> **唔取代**：各 Agent `*_ops` 正本 · Spin Map S01-P

---

## 1. 時間主軸 · `pk`

- **`pk` = 寫入 `agent_Brain.csv` 嘅時間主鍵**（UTC `YYYYMMDD12NNNN`），即入庫時間線上嘅一點。
- **`uuid` = 身份**；同一 `uuid` 可有多行、多個 `pk`（不同 shadow／lens）。
- **唔混淆**：`pub_year`（著作年）· `d4`（閱讀時間姿態）· Spin Map Recency — 各有一套；**Agent 記憶時間軸只跟 `pk`**。

---

## 2. 短期重心 · 長期支持

| 層 | 意思 |
|----|------|
| **短期重心** | 時間線上 **較近 `pk`** 嘅相關寫入 — 預設立場、「而家點做」 |
| **長期支持** | 時間線上 **較早 `pk`**、仍與今次任務相關嘅寫入 — 脈絡、先例、沿革 |

- **整合時**：預設 **較近 `pk` 優先**；較早寫入補背景，唔可以當唔存在。
- **禁止**：只讀時間線上最新一行就作答。

---

## 3. 相關性召回（唔寫死單一路徑）

「今次要讀邊啲記憶」= **相關內容**，唔等於掃全庫每一行。

召回可組合（**彈性**，唔規定固定權重或先後）：

- 本 Agent 櫃 `P-agent0N_*` · 任務 `pipeline`／`slug`／系列 `uuid`
- **`gravity_links`**（含 P↔P 反向）
- **`keywords`** · **`vsm`** · **`qutrit`**（鄰近結構）
- **P-agent12** 治理備忘（三庫、全隊 SOP）— 涉治理／邊界時必讀

**唔**用「只讀最近 N 日 `pk`」截斷範圍。  
一年前的寫入，若仍相關，仍屬長期支持，須讀。

---

## 4. 開工執行（每次 session）

1. **定入口** — 用户指令 · `drafts/{slug}/pipeline.md` · 本櫃 ops `uuid` · 系列 plan。
2. **掃樞** — `agent_Brain.csv`：按任務召回相關行；時間線上 **由近至遠** 排讀序。
3. **樞 → 墟 → 實** — 每個相關 `uuid`：先 **primary shadow**（`is_primary_shadow: true`）；必要時開 `Physical_Reality` 正本。
4. **覆蓋** — 相關子集內 **讀齊** 再作答；session 可簡述用咗邊幾個 `uuid`／`pk`。
5. **衝突** — 預設較近 `pk` 勝；例外：`human_verdict: pass` 治理備忘 · 專職邊界（例：P-agent12 備忘 ≠ 取代 P-agent01 `search_ops` 操作權威）。

---

## 5. 與其他庫

| 庫 | 角色 |
|----|------|
| **Spin Map** | 搵 B/A 證據（S01-P）；**唔**當 P-agent 短期記憶 |
| **project DB** | confirm ② 後持久資產；**唔**當 agent 開工短期重心 |
| **drafts** | P-agent sync 副本；記憶權威在 P-agent 正本 + `agent_Brain.csv` |

---

## 6. 持續改善

修訂 **本檔**；換版時同步 [AGENT_DB_V2.0.md](../../../project/constitution/AGENT_DB_V2.0.md) §2.5 摘要 · `.cursor/rules/agent-workflow.mdc` 指向。

---

## 修改紀錄

| 日期 | 摘要 |
|------|------|
| 2026-06-28 | 初版 · Batch 6a · P-agent 記憶協議（pk 時間主軸 · 短期重心／長期支持） |

---

*P-agent 記憶協議 · Batch 6a*

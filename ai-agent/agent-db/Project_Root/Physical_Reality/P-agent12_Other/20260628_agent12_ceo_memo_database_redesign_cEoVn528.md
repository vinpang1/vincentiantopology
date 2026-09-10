# 備忘錄 · 三庫資料架構重設計

> **作者**：CEO-Vincent  
> **日期**：2026-06-28  
> **性質**：專案擁有者決策備忘 · P-agent12 session  
> **uuid**：`cEoVn528`  
> **唔** export · 持久交付資產見 project DB（confirm ② 後）

---

## 一、拍板方向

確認將 Vincentian Topology 資料層由「agent-db 混合庫」改為 **三庫分離**：

1. **Spin Map** — 共享知識庫；本 project **只讀、零寫入**。
2. **agent-db** — 僅 **P-agent01–12**；四 Agent 流程正本與會議記憶；**永不出街**。
3. **project DB**（`project-db/`）— 全部持久交付資產（文章、外參、財務、法律、站點規格）。
4. 三庫 **metadata 統一**（Spin Map v1.8），**樞檔與物理櫃獨立**，防跨 project 污染。

---

## 二、2026-06-28 完成（Batch 0–5）

| 批 | 內容 | 結果 |
|----|------|------|
| 0 | 庫憲法定案 | `PROJECT_DB_V1.0` · `AGENT_DB_V2.0` |
| 1 | project DB 骨架 | `project.csv` · V01–V05、V12 |
| 2 | agent-db 改名 | `Brain.csv` → `agent_Brain.csv` |
| 3 | Hybrid 清理 | 刪 71× `spin_map_copy` · 保留 P-agent |
| 4 | 治理同步 | 流水改「入 project DB」 |
| 5 | 驗收封存 | 舊 `Vincentian Topology Database/` **SUPERSEDED** |

**三庫現況**：agent-db **11 行** P-agent · project DB **0 行** 白紙庫 · Spin Map 未改動。

---

## 三、文章流水（團隊須跟足）

```
Agent 1 → sync drafts → ① 定稿 → Agent 2 → Agent 4
  → pass → ② 入 project DB V02 · 刪 drafts
  → ③ confirm → Agent 3 export → src/content/ → dist/
```

**鐵律**：未 ② 禁入 project DB · 未 ③ 禁 export · P-agent 禁出街 · 禁 Spin Map 回寫 · 禁 `spin_map_copy`。

財務 V03 · 法律 V04 · 外參 V01 · 欄目靠 `vt_site_slug`。

---

## 四、刻意留低

| 項目 | 原因 |
|------|------|
| Batch 3b · pyramids case lens → V02 | 待逐篇 confirm ② |
| V06–V11 | 禁止入庫，待啟用 |
| 首篇實戰入 project DB | 日常流水 |

---

## 五、權威追蹤

- [`project/constitution/DATABASE_REDESIGN.md`](../../../../../project/constitution/DATABASE_REDESIGN.md)
- [`ai-agent/agent-db/docs/audit/database_redesign_acceptance_20260628.md`](../../docs/audit/database_redesign_acceptance_20260628.md)

---

## 簽署

**CEO-Vincent** · Vincentian Topology  
2026-06-28

---

## 修改紀錄

| 日期 | 摘要 |
|------|------|
| 2026-06-28 | 初版入庫 P-agent12 · `agent12_ceo_memo_database_redesign` |

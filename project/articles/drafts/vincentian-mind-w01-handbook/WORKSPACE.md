# WORKSPACE · vincentian-mind-w01-handbook

> **slug**: `vincentian-mind-w01-handbook`  
> **產品線**: 萬脈同構｜文森思維 · W01 入門手冊（intro 0-1～0-4）  
> **zip 版本**: **v0.4-rewrite** · 2026-08-05  
> **藍圖**: Topic Zip `tZpBp701`  
> **pipeline_stage**: **`awaiting_db_confirm`** · Batch **N** PASS · 草稿區齊套 · **不入 DB**

---

## 1. 狀態

| 層 | 狀態 |
|----|------|
| **草稿區**（本夾） | ✓ **v0.4 v2.1 齊套** · Batch N PASS |
| **封存** | ✓ `2_craft/_archive/v0.3-published-2026-08-03/` |
| **文體 brief** | ✓ `2_craft/style-v0.4.md` |
| **project DB V02** | 舊版 `W01in001`～`004`（**本輪不寫入**） |
| **project/src/content/** | 舊 v0.3 live（**本輪不 export**） |

## 2. Episode 對照

| ep | spin_map | project uuid | 交付檔 | v0.4 |
|----|----------|--------------|--------|------|
| 01 | `kKdhzw4i` | `W01in001` | `ep01_why-read-but-no-opinion.txt` | ✓ v2.1 batch 3 |
| 02 | `KNKGBfzn` | `W01in002` | `ep02_writing-with-ai.txt` | ✓ v2.1 batch 3 |
| 03 | `WXj2tbLg` | `W01in003` | `ep03_evidence-digest-viewpoint.txt` | ✓ v2.1 batch 3 |
| 04 | `Xm95Uvzb` | `W01in004` | `ep04_what-is-ideological-collision.txt` | ✓ v2.1 batch 3 |

## 3. 批次計劃（0–5 + N）

| 批 | Agent | 內容 | 狀態 |
|----|-------|------|------|
| **0** | Agent 3 | 封存 v0.3 · style-v0.4 · WORKSPACE | ✓ |
| **1** | Agent 1 | 重寫 ep01–02 | ✓ |
| **2** | Agent 1 | 重寫 ep03–04 | ✓ |
| **3** | Agent 2 | edit 全四篇 | ✓ |
| **4** | Agent 4 | legal（可 skip） | ✓ pass |
| **5** | Agent 3 | zip 快照 · preflight 快檢 | ✓ |
| **N** | Agent 3 | QA · sync · 不入庫確認 | ✓ **PASS** |

## 4. 下游（本輪）

```text
👤 閱讀草稿區四篇 → 滿意後另開：confirm ② → ③ → @agent-03-ops export
```

## 修改紀錄

| 日期 | 批次 | 說明 |
|------|------|------|
| 2026-08-03 | 0–N | v0.3 published · project DB · dist |
| 2026-08-05 | **0** | 封存 v0.3 → `_archive/` · 開 v0.4 rewrite · revision only |
| 2026-08-05 | **1** | Agent 1 · v0.4 重寫 ep01–02 · style-v0.4 |
| 2026-08-05 | **2** | Agent 1 · v0.4 重寫 ep03–04 · Russell 主軸 · mini-case |
| 2026-08-05 | **3** | Agent 2 · edit_rules 0.1 · 全四篇 v2.1 · `legal`（草稿區 only） |
| 2026-08-05 | **4** | Agent 4 · compliance 0.1 · **pass** · `awaiting_db_confirm` |
| 2026-08-05 | **5** | Agent 3 · zip 快照 · preflight PASS · `2_craft/batch5-preflight.md` |
| 2026-08-05 | **N** | Agent 3 · VT-Z PASS · `2_craft/batchN-signoff.md` · 草稿區齊套 |

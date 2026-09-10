# project DB · Project_Root 目錄表

> **憲法**：[PROJECT_DB_V1.0.md](../../project/constitution/PROJECT_DB_V1.0.md) · **批次**：Batch 1 · 2026-06-28

---

## 1. 頂層

```text
project-db/
├── project.csv
├── inbox/
└── Project_Root/
    ├── Physical_Reality/
    └── The_Void_729/          ← 唔預建 729 格；入庫時按 m_path 建路徑
```

---

## 2. 啟用櫃（V01–V05、V12）

| 目錄 | 用途 |
|------|------|
| `V01_External_Reference` | 外參 |
| `V02_Articles` | 全部可交付文章 |
| `V03_Finance` | 財務 |
| `V04_Legal` | 法律 |
| `V05_Site_Specs` | 站點規格 |
| `V12_Other` | 雜項 |

**V06–V11**：未定義 · **禁止 mkdir · 禁止入庫**（直至 `BUCKETS.md` 更新）。

---

## 3. 落點規則（摘要）

| 內容 | 落點 |
|------|------|
| confirm ② 文章 | `V02_Articles` + `vt_site_slug` |
| 外參登記 | `V01_External_Reference` |
| 財務／法律 confirm 後 | `V03` / `V04` |
| 站點規格備忘 | `V05_Site_Specs` |
| 未整理 | `inbox` → 入庫後 `V12` 或正櫃 |

---

*project-db STRUCTURE · Batch 1*

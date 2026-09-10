# project DB · V01–V12 分類櫃

> **效力**：[PROJECT_DB_V1.0.md](../../project/constitution/PROJECT_DB_V1.0.md) §2  
> **前綴 `V`** = Vincentian **專案櫃**（唔係 Spin Map 引證層 B/A/P）

---

## 啟用櫃

| Bucket | 中文 | 放咩 | `doc_class` | `visibility` |
|--------|------|------|-------------|--------------|
| `V01_External_Reference` | 外參 | 他人文章、PDF、報告、工具文檔 | `external_ref` | `internal` |
| `V02_Articles` | 文章 | **全部**可交付正文（入門／view／topics／classics） | `article` | `exportable` |
| `V03_Finance` | 財務 | 發票、收據、月結、報表副本 | `finance` | `internal` |
| `V04_Legal` | 法律 | 合約、授權、法務往來 | `legal` | `internal` |
| `V05_Site_Specs` | 站點規格 | 部署、IA、DEPLOY 備忘、站點技術 | `ops` | `internal` |
| `V12_Other` | 雜項 | 未分類、inbox 整理前暫落 | `other` | `internal` |

### V02 欄目（不靠多櫃，靠 `vt_site_slug`）

| 本站欄目 | `vt_site_slug` 前綴 |
|----------|---------------------|
| 入門 `/intro` | `intro/` |
| 文森世界 `/view` | `view/` |
| 專題 `/topics` | `topics/` |
| 經典 `/classics` | `classics/` |

---

## TBC 櫃（禁止入庫）

| Bucket | 狀態 |
|--------|------|
| V06–V11 | **未定義** · 勿 mkdir · 勿入庫直至擁有者更新本檔 |

---

## 路徑

```text
/Physical_Reality/{bucket}/YYYYMMDD_{descriptor}_{uuid8}.ext
```

- `bucket` 欄須與 `p_path` **完全一致**
- 檔名鐵律：Spin Map [`01_FILENAME_INVARIANTS`](../../../_shared/spin-map/docs/ai/01_FILENAME_INVARIANTS.md)

---

*project-db · Batch 0 草稿 · 2026-06-28*

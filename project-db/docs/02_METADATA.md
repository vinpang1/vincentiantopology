# 02 — Metadata 鐵律（project DB · `project.csv`）

> **權威語意**：Spin Map v1.8.0 [`02_METADATA_INVARIANTS`](../../../_shared/spin-map/docs/ai/02_METADATA_INVARIANTS.md)  
> **庫憲法**：[PROJECT_DB_V1.0.md](../../project/constitution/PROJECT_DB_V1.0.md)

每個 shadow `.md` 須有 YAML front matter。欄位名 **必須**與 **`project.csv` 標題列**一致。

---

## 1. Spin Map 核心欄（20 欄 · 必填語意同 Spin Map）

```text
pk,uuid,p_path,m_path,qutrit,d1,d2,d3,d4,d5,d6,view,keywords,
gravity_links,is_primary_shadow,bucket,pub_year,pub_year_inferred,vsm,audit
```

- `bucket`：必須為 **`V01`…`V12`** 啟用櫃名（見 [BUCKETS.md](./BUCKETS.md)）
- `d1–d6`：**數值**；坍縮見 [08_QUTRIT_COLLAPSE.md](./08_QUTRIT_COLLAPSE.md)
- `pub_year` / `pub_year_inferred`：跟 Spin Map §pub_year；V02 文章可填出街年

---

## 2. project DB 擴展欄（接在核心 20 欄之後）

```text
ingress,doc_class,visibility,spin_map_uuid,vt_site_slug,vt_working_path,
linked_p_agent_uuid,author,source_url,notes
```

| 欄 | 用途 |
|----|------|
| `ingress` | `deliverable` · `project_native` · `spin_map_ref` |
| `doc_class` | `article` · `external_ref` · `finance` · `legal` · `ops` · `other` |
| `visibility` | `exportable` · `internal` |
| `spin_map_uuid` | Spin Map 來源 uuid（ref 時） |
| `vt_site_slug` | 上站路徑，如 `topics/pyramids/01` |
| `vt_working_path` | 可選；對應 `project/` 工作區路徑 |
| `linked_p_agent_uuid` | confirm ② 前 agent-db session uuid |
| `author` / `source_url` / `notes` | 外參 V01 常用 |

**廢止**：`spin_map_copy`（實體複製）。

---

## 3. `project.csv` 編輯須知

- **編碼**：UTF-8（建議 BOM 協作）
- **`pk`**：`"YYYYMMDD12NNNN"` 雙引號；**本庫獨立序號**
- **`uuid`**：8 碼；**本庫自有**（唔重用 Spin Map uuid 作主鍵）
- **`keywords`**：CSV 用 `|`；YAML 用陣列
- **`vsm`**：9 位 0–4

---

## 4. 正文結構（Metadata 之後）

跟 Spin Map `02` §正文區：

1. `## doc_summary`
2. `## view_summary` — `### D1～D6` · `### V-S 矩陣` ·（有引力時）`### gravity_links 說明`

---

*project-db · Batch 0 草稿 · 2026-06-28*

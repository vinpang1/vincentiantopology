# P-agent12 · 備忘錄入庫 SOP

> **櫃**：`Physical_Reality/P-agent12_Other/`  
> **上位**：[`AGENT_DB_V2.0.md`](../../../project/constitution/AGENT_DB_V2.0.md) · [`FILENAME_INVARIANTS.md`](./FILENAME_INVARIANTS.md) · [`02_METADATA_INVARIANTS.md`](./02_METADATA_INVARIANTS.md)  
> **執行**：`@agent-03-ops`（Agent mode）· 用戶指令「入庫備忘」

---

## 完成定義（仅此三步）

| # | 交付 | 路徑 |
|---|------|------|
| 1 | **正本** | `P-agent12_Other/YYYYMMDD_agent12_{descriptor}_{uuid8}.md` |
| 2 | **Primary shadow** | `The_Void_729/…/YYYYMMDD_{view_slug}_{uuid8}.md`（YAML 与 `agent_Brain.csv` **同值**） |
| 3 | **樞** | `agent_Brain.csv` **一行**（新 `pk` 遞增） |

**入庫完成** = 實 + 墟 + 樞。做完 **停**。

---

## 禁止（除非用户明示）

- 改 `P-agent12_Other/README.md` 備忘列表
- 改 `docs/audit/`、根 `MIGRATION.md`、`AGENTS.md`、`project/AGENTS.md`
- 為備忘做全庫 grep、交叉索引、遷移追蹤檔更新
- 將備忘內容 sync 去 `project-db/`（備忘 **唔** export）

---

## 檔名與 metadata

| 項目 | 規則 |
|------|------|
| 檔名 | `YYYYMMDD_agent12_{descriptor}_{uuid8}.md`（見 `FILENAME_INVARIANTS`） |
| `bucket` | `P-agent12_Other` |
| `doc_class` | `session` |
| `ingress` | `session` |
| `agent_name` | `agent12` |
| `human_verdict` | 預設 **`pending`**（擁有者改 `pass`/`fail`） |

---

## 模板與參考

| 項目 | 路徑 |
|------|------|
| shadow 模板 | [`templates/shadow_primary.md`](./templates/shadow_primary.md) |
| 參考正本 | `…/20260628_agent12_ceo_memo_database_redesign_cEoVn528.md` · `cEoVn528` |
| 參考正本 | `…/20260628_agent12_memo_agents_folder_migration_aGFl7m01.md` · `aGFl7m01` |

正本建議章節：拍板方向 → 完成項 → 團隊須知（可選）→ 刻意留低（可選）→ 權威追蹤（可選）→ 簽署 → 修改紀錄。

---

## 修改紀錄

| 日期 | 摘要 |
|------|------|
| 2026-06-28 | 初版 · 三件套即止 · 禁止額外同步 |

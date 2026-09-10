# 02 — Metadata 鐵律（agent-db · `agent_Brain.csv`）

> **權威語意**：Spin Map v1.8.0 [`02_METADATA_INVARIANTS`](../../../_shared/spin-map/docs/ai/02_METADATA_INVARIANTS.md)  
> 六維：[`06_SIX_DIMENSIONS.md`](./06_SIX_DIMENSIONS.md) · VSM：[`07_VSM_MATRIX.md`](./07_VSM_MATRIX.md)  
> 憲法：[AGENT_DB_V2.0.md](../../../project/constitution/AGENT_DB_V2.0.md)

每個 **shadow `.md`** 須有 YAML front matter（`---`）。欄位名 **必須**與 **`agent_Brain.csv` 標題列**一致（核心欄）。

---

## 1. Spin Map 核心欄（20 欄 · 語意同 Spin Map v1.8）

```yaml
---
# [Metadata] 系統定錨區

pk: "YYYYMMDD12NNNN"
uuid: "xxxxxxxx"
p_path: "/Physical_Reality/P-agent02_Edit/YYYYMMDD_agent02_…_UUID.md"
m_path: "/The_Void_729/t1/t2/t3/t4/t5/t6/YYYYMMDD_slug_UUID.md"
qutrit: "t1/t2/t3/t4/t5/t6"

d1: 0.0
d2: 5.0
d3: 5.0
d4: 0
d5: 0.0
d6: 0.0

view: "snake_case"
keywords: ["tag1", "tag2"]

gravity_links: ""
is_primary_shadow: true

bucket: "P-agent02_Edit"
pub_year: ""
pub_year_inferred: ""
vsm: "102040000"

audit: "pending"
---
```

### 硬性規則

| 欄 | 規則 |
|----|------|
| `d1–d6` | **數值** |
| `qutrit` | 六段 `0/1/2`；须由 d 坍縮推出 |
| `uuid` | 8 碼；同正本檔名 |
| `pk` | UTC `YYYYMMDD12NNNN`；**本庫獨立序號** |
| `bucket` | **僅** `P-agentNN_*`（V2.0） |
| `pub_year` / `pub_year_inferred` | P-agent 通常 `""`；語意同 Spin Map `02` |
| `vsm` | 9 位 0–4 |
| `audit` | `pending` / `pass` / `fail` |

---

## 2. agent-db 擴展欄（CSV 尾 · shadow YAML 可增）

| 欄 | 用途 |
|----|------|
| `agent_id` | `search` / `edit` / `finance` / `legal` |
| `agent_name` | `agent01` … `agent04` |
| `origin` | `self` / `spin_map` |
| `ingress` | `agent_spec` / `session` / `spin_map_ref`（**廢** `spin_map_copy`） |
| `status` | `active` / `archived` |
| `visibility` | `internal`（本庫唔 export） |
| `doc_class` | `agent_ops` / `session` / `reference` 等 |
| `spin_map_uuid` | Spin Map 來源 uuid（**ref only**） |
| `human_verdict` | `pending` / `pass` / `fail` · **僅擁有者**可改 |
| `human_review_note` | 短摘要 |

扩展栏 **唔写入** Spin Map。

**Agent 行为**：禁止擅自改 `human_verdict`。

---

## 3. `agent_Brain.csv` 標題列

**Spin Map 核心（20 欄）**

```text
pk,uuid,p_path,m_path,qutrit,d1,d2,d3,d4,d5,d6,view,keywords,
gravity_links,is_primary_shadow,bucket,pub_year,pub_year_inferred,vsm,audit
```

**agent-db 擴展（接尾）**

```text
agent_id,origin,ingress,status,visibility,doc_class,spin_map_uuid,human_verdict,human_review_note
```

`keywords`：CSV 用 `|`；YAML 用陣列。

> **存量 shadow**：Batch 2 可能暫缺 YAML `pub_year`；新入庫須補齊並與 CSV 同值。

---

## 4. 正文結構（Metadata 之後）

1. **`## doc_summary`**
2. **`## view_summary`** — `### D1～D6` · `### V-S 矩陣`
3. **`### human_review`**（可选）

模板：[`templates/shadow_primary.md`](./templates/shadow_primary.md)

---

## 5. 輸出前檢查

- [ ] `bucket` 為 `P-agentNN_*`
- [ ] `d1–d6` 全为數值；`qutrit` 与 d 一致（**d4=0 → 第四段=1**）
- [ ] YAML 与 `agent_Brain.csv` 同行一致（核心欄）
- [ ] `vsm` 9 位 + 正文 V-S 表
- [ ] Primary 每 uuid 只得一個 `is_primary_shadow: true`
- [ ] `human_verdict` 合法；仅拥有者改分

---

*agent-db 02 · V2.0 · Batch 2*

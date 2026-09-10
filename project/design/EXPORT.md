# Export · 確認關卡、入庫與上站

> **上位**：[EGRESS_V1.0.md](../constitution/EGRESS_V1.0.md) · [PROJECT_DB_V1.0.md](../constitution/PROJECT_DB_V1.0.md) · [AGENT_DB_V2.0.md](../constitution/AGENT_DB_V2.0.md)  
> 草稿流水：[`articles/DRAFTS.md`](../articles/DRAFTS.md) · 稿夾 [`草稿區`](../../草稿區/)

**三個人工關卡**：① 定稿 · ② 入 **project DB** · ③ export／上站（**各自獨立指令**）

---

## §A 確認 ① · 定稿（Agent 1 之後）

**觸發**：Agent 1 完成；`pipeline_stage: awaiting_draft_confirm`

### 檢查

- [ ] P-agent 正本已寫入 · 已 **sync** → `drafts/{slug}/`
- [ ] `sources.md`（如有）齊
- [ ] `pipeline.md` §Human input 已填（至少 Agent 1；其餘階段隨流水追加）
- [ ] 你同意方向／粗稿 → 在 `pipeline.md` §Human-A 簽署
- [ ] `pipeline_stage: draft_confirmed`
- [ ] **明確指令**交 Agent 2（唔自動）

---

## §B 確認 ② · 入 project DB（Agent 4 pass 之後）

**觸發**：Agent 4 pass；`pipeline_stage: awaiting_db_confirm`  
**執行**：你 **confirm ②** 後 **指令 AI 入庫**（唔自動）

> **與 §B′ 分開**：出街 **文章** 走本節 → **V02_Articles**；**Case study／project 复盘** 留 **agent-db** P-agent · 見 [§B′](#b-prime)。

### B1 前置

- [ ] Agent 4 **pass**（`pipeline.md` §Legal；無未解 `legal_failed`）
- [ ] `article.md` 底部 **修改紀錄** 完整（每行標 Agent）
- [ ] `pipeline.md` §Human input · Agent 1–4 已填（Agent 3 可占位「awaiting confirm ③」）
- [ ] 非禁發（`design/IA.md`）
- [ ] 以 **P-agent 正本** 為入庫源（與 drafts 已一致）

### B2 AI 入庫（project DB · 文章 entity）

路徑：`~/Documents/Dev/vincentian-topology/project-db/`

**一個 uuid · 一篇 article · 入庫完成 = 1 實 + N 墟 + N 行 `project.csv`**（同 uuid）。

| 件 | 路徑／規則 |
|----|------------|
| **正本（實）** | `Project_Root/Physical_Reality/V02_Articles/YYYYMMDD_{slug}_{uuid}.md` |
| **欄目** | `vt_site_slug`（如 `topics/pyramids/01`、`view/foo`、`intro/0-1`）· **唔**靠多櫃 |
| **正文** | 可 export 稿（**唔**含 `## 修改紀錄`、pipeline 內部註） |
| **墟（shadow）** | `The_Void_729/` + 每 shadow **一行** `project.csv` |
| **追溯** | `linked_p_agent_uuid` → agent-db session；`ingress: deliverable` |
| **檔名** | Spin Map `01` · [`project-db/docs/02_METADATA.md`](../../project-db/docs/02_METADATA.md) |

**agent-db**：本步 **唔**再入持久文章正本；可選保留 P-agent lens 摘要（非必須）。

### B3 Shadow 結構（文章 · 固定層 + 按需層）

同一 `uuid`、同一 `p_path`（指向 **V02** 正本）。`is_primary_shadow: true` **全 uuid 只得一個**。

```text
① Primary shadow              ×1   view: {slug}_pipeline_whole
② Auxiliary shadow            ×n   AI 按 keyword／topology 按需拆分（n 可為 0）
③ Agent lens shadow           ×0–4 可選：留 agent-db P-agent 或一併入 project DB
────────────────────────────────────────────────────────────────
project.csv 行數（文章）      ≥ 1 + n（lens 若入 project DB 則 +4）
```

#### ① Primary · `{slug}_pipeline_whole`

- **語氣**：中立流水總帳 · **錨定出街正文**（章節／主題／系列位）
- **唔**用單一 Agent 口吻
- **內容**：`doc_summary` · `revision_log` · `agent_pipeline` · `legal_last` · `linked_p_agent_uuid`
- **D1–D6**：整篇文章作為一個閱讀單元評估

#### ② Auxiliary · keyword／topology 拆分

入庫 AI 判斷：若正文有 **多簇 keywords**，或各簇需要 **唔同 D1–D6 → qutrit → `m_path`**，則加 auxiliary shadow；否則 **n = 0**。

| 信號 | 示例 `view` |
|------|-------------|
| 獨立來源簇 | `{slug}_sources_lens` |
| 引證／書名鎖定重 | `{slug}_citations_lens` |
| 合規邊界獨立 | `{slug}_legal_boundary` |
| 系列／跨篇脈絡 | `{slug}_series_context` |
| 敘事 vs 事實 topology 分離 | `{slug}_narrative_lens` 等 |

每個 auxiliary **必須**：

- `is_primary_shadow: false`
- 獨立 `view`、`keywords`、`d1–d6`、`qutrit`、`m_path`
- `doc_summary` 首段寫清 **因何 keyword／topology 要分開**（唔湊數）

規格：`project-db/docs/06_SIX_DIMENSIONS.md`（同一 uuid 多 shadow 各自獨立評估）

#### ③ Agent lens（可選）

可 **留 agent-db** P-agent shadow，或一併寫入 project DB（`is_primary_shadow: false`）。

| Agent | `agent_id` | `view` 示例 |
|-------|------------|-------------|
| 01 | `search` | `{slug}_search_lens` |
| 02 | `edit` | `{slug}_edit_lens` |
| 03 | `finance` | `{slug}_ops_lens` |
| 04 | `legal` | `{slug}_legal_lens` |

正文固定兩節（自 drafts 餵入）：

```markdown
## agent_changes
（自 article.md「修改紀錄」按 Agent 篩選）

## human_input
（自 pipeline.md §Human input · Agent N）
```

- 全部 `is_primary_shadow: false`
- `human_verdict` 評 Agent 質素；**你的意見**放 `human_input`，唔混 verdict
- Agent 3：confirm ② 可占位；**confirm ③** 後 patch export／路徑紀錄（唔開新 uuid）

### B4 Primary shadow YAML 示例

```yaml
ingress: deliverable
doc_class: article
visibility: exportable
bucket: V02_Articles
vt_site_slug: topics/your-slug   # 或 view/… intro/… classics/…
linked_p_agent_uuid: "xxxxxxxx"  # agent-db session
edit_rules_version: "0.1"
compliance_rules_version: "0.1"
agent_pipeline: "search→draft_confirm→edit→legal→db_confirm"
legal_last: pass
revision_log: |
  （自 article.md 底部「修改紀錄」）
view: your_slug_pipeline_whole
is_primary_shadow: true
```

Auxiliary／Agent lens 共用擴展欄，加 `agent_id`（lens 用）、獨立 `view`／`keywords`／`d1–d6`／`qutrit`／`m_path`。

### B5 入庫後

- [ ] `pipeline_stage: confirmed`（若仍有 pipeline 紀錄檔）
- [ ] **刪除** `articles/drafts/{slug}/` 整夾
- [ ] P-agent 該篇 session 可歸檔或保留追溯（唔再 sync 去已刪 drafts）
- [ ] Primary `doc_summary` 或 ingest 清單列出 auxiliary 拆分理由表（供你覆核）

**禁止**：未 confirm ② 入 project DB。

---

## §B′ · Case study／project 复盘（你主動要求） {#b-prime}

**唔**跟單篇 confirm ② 自動觸發。你明確要求「入庫 case／全流水記憶」時才做。

| 項目 | 規則 |
|------|------|
| **正本** | **一個 holder Agent** 的 P-agent 櫃（例 `P-agent02_Edit`） |
| **shadow** | **固定 4**：holder **primary** + 另外 3 Agent **lens**（唔加 auxiliary 拆分，除非日後另定） |
| **Brain** | 4 行 `agent_Brain.csv` |
| **`doc_class`** | `agent_ops` · `ingress: project_native` |
| **出街** | ❌ 唔 export |
| **範例** | uuid `k8CsPy01` · 金字塔系列全流水 |

Holder 揀法：起稿主導 → 01 · 編輯／交付主導 → 02 · 營運主導 → 03 · 合規主導 → 04。

---

## §C 確認 ③ · Export → `src/content/`（獨立指令）

**觸發**：project DB **V02** 已存在；你 **另日／另句** 明講 export 或上站準備。  
**與 confirm ② 無關**——入庫 ≠ 出街。

### C1 來源

- [ ] 正文來自 **project DB V02 正本**（drafts 已刪）
- [ ] 正文 **唔**帶「修改紀錄」段（export 前剝離）· 唔帶 pipeline 內部註

### C2 路徑（`design/IA.md` · 對照 `vt_site_slug`）

| 前綴 | 目標 |
|------|------|
| `intro/` | `src/content/intro/{slug}.md` |
| `view/` | `src/content/view/{slug}.md` |
| `topics/` | `src/content/topics/…` |
| `classics/` | `src/content/classics/{slug}.md` |

### C3 Frontmatter

- [ ] `draft: true` 首次 export（試 build）
- [ ] 出街前 **`draft: false`** → [`DEPLOY.md`](./DEPLOY.md)

### C4 驗證

```bash
cd ~/Documents/Dev/vincentian-topology/project && npm run build
```

### C5 confirm ③ 後

- [ ] patch Agent 03 `ops_lens` shadow（`human_input` + export 紀錄）

---

## §D 關係簡圖

```
Agent 1 → P-agent → sync → drafts/
    ↓  §A ① 定稿
Agent 2 → Agent 4 ──fail──→ Agent 1
    ↓  pass
    ↓  §B ② 入庫 → project DB V02 + (1+n[+4]) shadow + project.csv · 刪 drafts/
    ↓  §C ③ export（你另指令）· patch ops_lens
src/content/ → dist/

Case study（你另指令）→ §B′ agent-db holder + 4 shadow（唔 export）
```

---

*Export v2.0 · 2026-06-28 · 三庫 · project DB V02 · case §B′*

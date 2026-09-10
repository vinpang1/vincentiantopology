# Pipeline · {slug}

> 更新 `article.md` 的 `pipeline_stage` / `agent_last`。P-agent 正本 sync → 本夾。  
> **Human input** 各節在 confirm ② 入庫時寫入對應 Agent shadow（見 `design/EXPORT.md` §B3）。  
> **地圖**：[`ai-agent/agents/README.md`](../../ai-agent/agents/README.md) · `agent_0N/agent_0N.md`

## 1 · Search（@agent-01-search）

- [ ] 已跟 P-agent01 `search_ops_b1Srch9K`
- [ ] P-agent01 正本已寫 · 已 sync → 本夾
- [ ] `sources.md`（如有）
- [ ] → `pipeline_stage: awaiting_draft_confirm`

**備註：**

### Human input · Agent 1

（你在 Search／定稿 ① 階段的意見：方向、系列位、來源、書名鎖定、勿／要 …）

- 

---

## Human-A · 確認 ① 定稿

- [ ] 我已閱讀 sync 後之草稿
- [ ] §Human input · Agent 1 已填
- [ ] `pipeline_stage: draft_confirmed`
- [ ] 已指令 **@agent-02-edit** 開始

**簽署 / 日期：**

---

## 2 · Edit（@agent-02-edit）

- [ ] 已跟 P-agent02 `edit_ops_a2Ed0pS7` · craft / EDIT_RULES
- [ ] 可交付版完成 · 修改紀錄已追加
- [ ] → `pipeline_stage: legal`

**備註：**

### Human input · Agent 2

（校對階段意見：判準型別、台灣語、標題、分段 …）

- 

---

## 3 · Legal（@agent-04-legal）

- [ ] 已跟 P-agent04 `legal_ops_c4Lgl2Mx` · `article_compliance_v0.md` · IA 禁發
- [ ] 結果：`pass` / `fail`

### 若 fail

- **原因**（列明）：
  1.
  2.
- [ ] → `pipeline_stage: legal_failed` → **@agent-01-search** · `search`

### 若 pass

- [ ] 修改紀錄已追加
- [ ] → `pipeline_stage: awaiting_db_confirm`

**備註：**

### Human input · Agent 4

（合規邊界、敘事演練標示、pass 條件 …）

- 

---

## Human-B · 確認 ② 入資料庫

- [ ] Agent 4 已 pass
- [ ] §Human input · Agent 1–4 已填（Agent 3 可占位）
- [ ] 已 **指令 AI** 入 project DB V02（`design/EXPORT.md` §B）
- [ ] `drafts/{slug}/` 已刪除
- [ ] `pipeline_stage: confirmed`（紀錄用）

**簽署 / 日期：**

---

## 4 · Export（確認 ③ · @agent-03-ops）

- [ ] 用户 **confirm ③**
- [ ] `@agent-03-ops` 跟 `design/EXPORT.md` §C
- [ ] `src/content/` · build ·（出街）`DEPLOY.md`

**簽署 / 日期：**

### Human input · Agent 3

（export 指令、上站備註、路徑；confirm ③ 後補 · 入庫後 patch `ops_lens` shadow）

- 

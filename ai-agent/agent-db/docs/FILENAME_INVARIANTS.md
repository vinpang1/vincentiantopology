# agent-db · 檔名鐵律

> 跟 Spin Map [`01_FILENAME_INVARIANTS`](../../../_shared/spin-map/docs/ai/01_FILENAME_INVARIANTS.md)；**P-agent 正本须含 agent 名**。  
> Metadata / D1–D6 / vsm：[`02_METADATA_INVARIANTS.md`](./02_METADATA_INVARIANTS.md) · [`06_SIX_DIMENSIONS.md`](./06_SIX_DIMENSIONS.md) · [`07_VSM_MATRIX.md`](./07_VSM_MATRIX.md)

## 【實】正本（P-agent 櫃內）

```text
YYYYMMDD_agentNN_{descriptor}_{uuid8}.md
```

| 片段 | 規則 |
|------|------|
| `YYYYMMDD` | UTC 歸檔日（八碼） |
| `agentNN` | **必填** · `agent01`–`agent04`（對 P-agent01–04）；預留 `agent05`… |
| `{descriptor}` | snake_case 英文描述（例 `edit_ops`、`search_session`） |
| `{uuid8}` | 8 位英數；同一 entity 終生不變 |

**例**

```text
/Physical_Reality/P-agent02_Edit/20260627_agent02_edit_ops_a2Ed0pS7.md
```

## 【墟】shadow

```text
YYYYMMDD_{view_slug}_{uuid8}.md
```

- `uuid8` **必须**同【實】正本相同 entity
- `view_slug` 建議含 agent：`agent02_edit_ops_summary`
- `m_path` 六段目錄對應 `qutrit`（見 Spin Map `04`）

## 持久資產檔名（project DB）

文章、財務、法律等 **confirm ②** 後入 **`project-db/`**（V01–V05、V12）。檔名規則見 [`project-db/docs/`](../../../project-db/docs/) · 預設仍建議含 `agentNN` 以便追溯。

## 入庫

**實 + 墟 + agent_Brain.csv 一行**；shadow YAML 欄位與 `agent_Brain.csv` **同名同值**（核心欄）。

## Agent 對照

| agentNN | 櫃 | Agent |
|---------|-----|--------|
| agent01 | P-agent01_Search | 搜索+草稿 |
| agent02 | P-agent02_Edit | 文章編輯 |
| agent03 | P-agent03_Finance | 營運（財務／發佈／網頁） |
| agent04 | P-agent04_Legal | 法律 |

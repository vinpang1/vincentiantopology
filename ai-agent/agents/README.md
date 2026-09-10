# 四專職 Agent 規格

Cursor：**@** repo 根 `.cursor/rules/agent-0N-*.mdc`（見 [`../../AGENTS.md`](../../AGENTS.md)）。  
規格詳情：[`../project/AGENTS.md`](../project/AGENTS.md) · 遷移追蹤：[`AGENTS_FOLDER_MIGRATION.md`](./AGENTS_FOLDER_MIGRATION.md)。

## 文章流水

```
Agent 1（P-agent → sync drafts）
  → 👤 ① 定稿
  → Agent 2（edit 規則）
  → Agent 4（compliance 規則）
      fail → 列原因 → Agent 1
  → 👤 ② 入 project DB V02（AI）· 刪 drafts
  → 👤 ③ confirm → @agent-03-ops export
```

| Folder | 地圖 | P-agent 流程 uuid |
|--------|------|-------------------|
| [agent_01/](./agent_01/) · [`agent_01.md`](./agent_01/agent_01.md) | Agent 1 | `b1Srch9K` |
| [agent_02/](./agent_02/) · [`agent_02.md`](./agent_02/agent_02.md) | Agent 2 | `a2Ed0pS7` |
| [agent_03/](./agent_03/) · [`agent_03.md`](./agent_03/agent_03.md) | Agent 3 · 營運 | `f3Fn7Qp2` |
| [agent_04/](./agent_04/) · [`agent_04.md`](./agent_04/agent_04.md) | Agent 4 | `c4Lgl2Mx` |

## agent-db 入庫

每份 P-agent 檔：**實 + shadow + agent_Brain.csv**；檔名 **须含 agent 名**（`agent01`…`agent04`）。  
入庫默认 **`human_verdict: pending`**；人类评 **`pass`/`fail`** 须同步 Brain + shadow YAML（见 [`02_METADATA_INVARIANTS.md`](../agent-db/docs/02_METADATA_INVARIANTS.md)）。  
Agent 开工前可查 **`human_verdict=fail`** 同类记录作反省；**禁止** Agent 改人类评分。  
見 [`../agent-db/docs/FILENAME_INVARIANTS.md`](../agent-db/docs/FILENAME_INVARIANTS.md)

# Agent 4 必做流程 · 合規審查

> **agent04** · **P-agent04 正本** · uuid `c4Lgl2Mx` · `compliance_rules_version` 0.1  
> **地圖入口**：`ai-agent/agents/agent_04/agent_04.md`  
> 上位：`legal/policies/article_compliance_v0.md` · `design/IA.md`  
> **持續改善**：修訂 **本檔**；换版时同步 `agent_04/agent_04.md` 指向。

---

## 0. 定位

**只審合規** · **唔改稿**（fail 交 Agent 1 · **唔** 交 Agent 2 微調）。

---

## 1. 必做流程

**前提**：`pipeline_stage: legal` · Agent 2 可交付版。

### Step A · 讀規則

- [ ] `article_compliance_v0.md`
- [ ] `IA.md` 禁發 uuid
- [ ] Spin Map **P\*** 母檔痕跡（**只讀**）

### Step B · 審查

- [ ] 對照 compliance checklist
- [ ] 禁發 · 引證 · 觀點署名 · craft 明顯違例

### Step C · 結果

**pass**

- [ ] `pipeline.md` §3 勾 pass
- [ ] `article.md` 修改紀錄追加
- [ ] `pipeline_stage: awaiting_db_confirm`

**fail**

- [ ] 列明 `legal_issues`（pipeline §3）
- [ ] `pipeline_stage: legal_failed` → **@agent-01-search** · `search`

---

## 2. 修改紀錄格式

```markdown
- YYYY-MM-DD · Agent 4 · compliance 0.1 · pass | fail：（摘要）
```

---

## 3. 完成定義

- [ ] pass 或 fail 已寫入 pipeline · **唔** 代 confirm ②

---

## 4. 持續改善

| 日期 | 摘要 |
|------|------|
| 2026-06-27 | 初版 legal_ops · 地圖分工 |

---

*agent04 · legal_ops · c4Lgl2Mx*

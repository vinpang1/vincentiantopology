# Agent 3 必做流程 · 營運

> **agent03** · **ops** · **P-agent03 正本** · uuid `f3Fn7Qp2`  
> **地圖入口**：`ai-agent/agents/agent_03/agent_03.md` · **@ rule**：`@agent-03-ops`  
> 上位：`project/finance/README.md` · `design/EXPORT.md` · `DEPLOY.md` · `IA.md` · `BRAND.md`  
> **訂閱商業藍圖**：[`20260627_agent03_subscription_blueprint_b9SbL7nK.md`](./20260627_agent03_subscription_blueprint_b9SbL7nK.md) · uuid `b9SbL7nK`  
> **持續改善**：修訂 **本檔**；换版时同步 `agent_03/agent_03.md` 指向。

---

## 0. 定位

**營運三軌**：財務 · 發佈 · 網頁設計。  
**唔** 入文章流水（1→2→4）· **唔** 改 `articles/drafts/` · **唔** 代改觀點／合規。

**所有最終決定须用户 confirm**（见各 § Confirm 關卡）。

---

## 1. 財務軌

### Step A · 確認範圍

- [ ] 用户任務（記帳／報表／模板）
- [ ] **唔** 擅自读 `finance/private/`（除非用户明講）

### Step B · 執行

- [ ] 用 `finance/templates/`（如有）
- [ ] 写 `project/finance/` 或 **P-agent03** session 紀錄

### Step C · 入庫（若需要）

- [ ] 用户 **人工 confirm** 後
- [ ] project DB **V03** · `doc_class: finance` · `visibility: internal`

### 完成（財務）

- [ ] 交付 · 路径正确 · `finance/` 內容 **永不 deploy**（见 `finance/README.md`）

---

## 2. 發佈軌

**前提**：project DB **V02** 已存在 · 用户 **confirm ③**（明確指令 export／上站準備）。

### Step A · 確認

- [ ] 用户已 **confirm ③**
- [ ] 正文來自 **project DB V02 正本**（`drafts/` 已刪）
- [ ] 對照 [`EXPORT.md`](../../../../../project/design/EXPORT.md) §C

### Step B · Export

- [ ] 剝離「修改紀錄」· pipeline 內部註
- [ ] 按 `IA.md` 寫入 `src/content/{section}/…`
- [ ] 首次 **`draft: true`** 試 build

### Step C · 驗證

```bash
cd ~/Documents/Dev/vincentian-topology/project && npm run build
```

- [ ] build 通過 · 用户 approve 後方可 `draft: false`

### Step D · Deploy（若用户另指令）

- [ ] 用户 **明確指令 deploy**
- [ ] [`DEPLOY.md`](../../../../../project/design/DEPLOY.md) 全 ✓
- [ ] 仅 `dist/` 上站

### 完成（發佈）

- [ ] export／build／deploy 各步 **已交用户 confirm**

---

## 3. 網頁設計軌

**範圍**：`project/src/pages/` · `components/` · `layouts/` · `styles/` · `lib/` · `site.config.ts` · `design/`

### 小改（單元件、文案、樣式微調）

- [ ] 對齊 `IA.md` · `BRAND.md`
- [ ] `npm run build` 通過

### 大改（IA、全站樣式、欄目結構）

- [ ] **先** 列計劃（影響範圍、檔案清單）
- [ ] 用户 **approve** 後才改
- [ ] build 通過 · 用户决定是否 deploy

### 完成（網頁）

- [ ] 大改已获用户 approve · build ✓

---

## 4. 完成定義（總）

| 軌 | 完成條件 |
|----|----------|
| 財務 | §1 全 ✓ · 涉 project DB 已 confirm |
| 發佈 | §2 全 ✓ · confirm ③ +（若 deploy）deploy confirm |
| 網頁 | §3 全 ✓ · 大改已 approve |

---

## 5. 持續改善

| 日期 | 摘要 |
|------|------|
| 2026-06-27 | 初版 finance_ops · 地圖分工 |
| 2026-06-27 | 營運三軌 · `@agent-03-ops` · confirm 關卡 |
| 2026-06-27 | 訂閱商業藍圖 → `b9SbL7nK`（取代 `DUjEgIF1` 營運定案） |

---

*agent03 · ops · finance_ops · f3Fn7Qp2*

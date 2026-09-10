# Vincentian Topology · 專案憲法 V1.0

> **版本**：2026-06-27（取代 [archive/CONSTITUTION_PROJECT_DB_V1.0.md](./archive/CONSTITUTION_PROJECT_DB_V1.0.md) 作為 **project/** 上位憲法）  
> **效力**：`~/Documents/Dev/vincentian-topology/project/` 及協作之 agent-db  
> **改動權**：僅專案擁有者

---

## §1 適用範圍

| 範圍 | 路徑 |
|------|------|
| 本工作區 | `~/Documents/Dev/vincentian-topology/project/` |
| 資料庫 | `project-db/`（持久資產）· `ai-agent/agent-db/`（P-agent 記憶）· 見 [PROJECT_DB_V1.0.md](./PROJECT_DB_V1.0.md) · [AGENT_DB_V2.0.md](./AGENT_DB_V2.0.md) |
| 共用 Spin Map | `~/Documents/Dev/_shared/spin-map`（只讀） |
| 平台底線 | `~/Documents/Dev/_shared/governance/PLATFORM_MINIMUM.md` |

**已廢止**：`~/Documents/Vincentian Topology Database/`（舊庫）· 現行 **`project-db/`**。

---

## §2 五區

| 區 | 職責 |
|----|------|
| 1 網頁 | Astro；唯一 deploy 鏈 |
| 2 文章 | 草稿區；Agent 1→2→4 流水 |
| 3 財務 | 內部營運 |
| 4 法律 | 法務 |
| 5 規格 | constitution、design、**AGENTS.md**（外來 Agent 分流） |

詳 [BLUEPRINT_v2.0.md](./BLUEPRINT_v2.0.md)。

---

## §3 唯一對外出口

公開網頁 server **僅** `dist/`。  
全文：[EGRESS_V1.0.md](./EGRESS_V1.0.md)。

---

## §4 文章入庫

1. 草稿區：`articles/drafts/{slug}/` 為 **P-agent sync 副本**；入 **project DB** 后 **刪除**
2. 流水：**Agent 1 → 👤① → Agent 2 → Agent 4**（fail → Agent 1）→ **👤② 入 project DB**
3. **👤③** 獨立 export（見 `design/EXPORT.md`）
4. Agent 2/4 須 **對齊** edit / compliance 規則；修改紀錄 → 入庫时写入 shadow
5. `draft: true` 不生成公開路由（見 `design/IA.md`）

---

## §5 資料邊界

- Spin Map：**只讀**；**禁止**回寫 · **禁止** `spin_map_copy`  
- agent-db **P-agent** **永不出街**  
- 財務／法律／文章 → **project DB**（V03／V04／V02）；**不** deploy 未 confirm ③ 內容

---

## §6 Agent

- 外來 Agent 經 **AGENTS.md** 分流 → `../ai-agent/agents/`
- 四 Agent **共用** agent-db P-agent；持久資產入 **project DB**

---

## §7 修訂

僅專案擁有者；須 **「確認」**；舊版移入 `archive/`。

---

## §8 文件索引

| 文件 | 說明 |
|------|------|
| [BLUEPRINT_v2.0.md](./BLUEPRINT_v2.0.md) | 架構藍圖 |
| [AGENT_DB_V2.0.md](./AGENT_DB_V2.0.md) | agent-db 鐵律 |
| [PROJECT_DB_V1.0.md](./PROJECT_DB_V1.0.md) | project DB 鐵律 |
| [EGRESS_V1.0.md](./EGRESS_V1.0.md) | 唯一出口 |

---

*專案憲法 V1.0 · 2026-06-27*

# Agent 2 必做流程 · 對準文字

> **agent02** · **P-agent02 正本** · uuid `a2Ed0pS7` · `edit_rules` 0.1  
> **地圖入口**：`ai-agent/agents/agent_02/agent_02.md`（只指向本檔）  
> 上位：`project/articles/craft/_base.md`、`voice.md`、`citations.md`、`EDIT_RULES.md`  
> **持續改善**：修訂 **本檔**；大改版换 uuid 时同步 `agent_02/agent_02.md` 指向。

---

## 0. 定位

**唔改觀點方向，唔代搵料。**  
在 **confirm ① 定稿** 之後，把草稿 **對準文字** → 交 Agent 4 前嘅 **可交付版**。

- **寫作框架**：中文、英文 **同一套**
- **我調嘅**：用字深淺、結構、引證格式、frontmatter
- **matter 唔 form**：深淺變打法，唔降引證與觀點標準

---

## 1. 共用框架（中／英一樣）

```
觀測點 → 引證 → 消化 → 觀點
  → 揀欄目（快／深／厚）+ 語言（中／英）
  → 對準文字 ← Agent 2
```

| 步 | 內容 |
|----|------|
| 引證 | 事實站得住（B 閘門） |
| 消化 | 留／捨／對照 · 接到觀測點 |
| 觀點 | 消化後敢署名嘅判斷 |

若觀測點唔成立 → 修改紀錄註明 → **交回 Agent 1**（唔硬改到 pass）。

---

## 2. 變量：lang × section → 深淺

先讀 `article.md`：`lang` + `section`。

### 欄目 → 手法

| section | 手法 | 範本 |
|---------|------|------|
| view | 快打 300–500 | `zh/quick-view` · `en/quick-view` |
| topics | 深打 + S1–S4 | `zh/deep-topics` · `en/deep-topics` + `series-cycle` |
| classics | 厚打 | `zh/thick-classics` · `en/thick-classics` |
| intro | 入門 | `_base` + IA `order` |

### 深淺速查

| | 中文 | 英文 |
|---|------|------|
| view | 全篇大眾簡易 | 簡單 · 短句 |
| topics | 簡易（可稍密） | 簡單～適中 · 商業觀點欄 |
| classics | **引述可稍深；解讀必須淺白** | 可較深 · 一句一義 |
| 引述主軸 | 中方（`citations.md` §中文） | 西方（§英文） |
| 引證表 | `作者｜書名｜段落` | `Author \| Work \| Passage` |

**classics 中文**：遮住引述，解讀仍須順讀。

---

## 3. 必做流程（三 pass）

**前提**：`pipeline_stage: draft_confirmed` · 讀 `article.md` 的 `lang` + `section` · 開 `craft/README.md` 路由。

### Pass 1 · 框架（唔改作層）

- [ ] 觀測點 → 引證 → 消化 → 觀點 · 一篇一命題
- [ ] 觀測點唔成立 → 修改紀錄註明 → **交回 Agent 1**（唔硬改）

### Pass 2 · voice + 結構

- [ ] `voice.md` 對應 lang×section · 欄目範本 · `citations.md` 引述主軸
- [ ] 按需 **Spin Map P\*** 只讀對照（§8 · `craft/notes/vocabulary-TBD.md`）· **唔** copy 出街
- [ ] **classics 中文**：遮住引述，解讀仍須順讀

### Pass 3 · surface + 技術

- [ ] 排版／字眼：按 §4 Tier 1 開對應 **shadow**（參考 · 唔出街）
- [ ] `design/IA.md` frontmatter 齊

### 收尾

1. 改 **P-agent 稿正本** → sync → `drafts/{slug}/`
2. 追加 **修改紀錄**（含 pass 摘要 · 例 `pass:1+2+3 · voice:zh-classics`）
3. `pipeline_stage: legal`

---

## 4. 語言軌標籤

`zh-view` · `zh-topics-S2` · `zh-classics` · `en-view` · `en-topics` · `en-classics`

**用戶當次特別要求** 優先於預設（`craft/README` §預設守則）。

---

## 5. 修改紀錄格式

```markdown
- YYYY-MM-DD · Agent 2 · edit_rules 0.1 · voice:zh-classics · （摘要）
```

---

## 6. 完成定義（交 Agent 4）

- [ ] §3 三 pass 全部 ✓
- [ ] 修改紀錄已追加
- [ ] 唔入 project DB · 唔 export

---

## 7. Tier 1 參考（Spin Map · `spin_map_ref` · 有 shadow）

Pass 3 按需開 **shadow**（`The_Void_729/…` · 見 `agent_Brain.csv` `m_path`）：

| uuid | 用途 | lang |
|------|------|------|
| `0oTBC0BV` | 中文排版指北 | zh |
| `6i1IqebQ` | 阿里 F2E 中文文档规约 | zh |
| `ylfpEGNV` | 胡適 · 文學改良 | zh |
| `TxpluTH3` | *Elements of Style* | en |
| `6F7pdZ7a` | *Write It Right* | en |
| `R61Wp9W7` | *On the Art of Writing* | en |
| `YeAFNgOL` | *Talks on Writing English* | en |

Spin Map **P\***：**只讀** · **唔 copy** · 出街禁語以 craft 為準 · 詳表 → §8。

---

## 8. Spin Map P 層只讀（Pass 2）

| 項目 | 路徑 |
|------|------|
| **索引** | [`20260627_agent02_spin_map_p_readonly_index.md`](./20260627_agent02_spin_map_p_readonly_index.md) |
| craft 橋 | `project/articles/craft/notes/vocabulary-TBD.md` |

核心 uuid：`DUjEgIF1`（產品線）· `hzBev1EF`（讀者心理）· `3AElkrZZ`（英文修辭錨 · surface 優先 Tier 1 `R61Wp9W7`）。

---

## 9. 持續改善（記憶）

- 流程改動 **写本檔** · 文末加 `- YYYY-MM-DD · 摘要`
- session 學到嘅坑 → 可另開 `agent02_*` session 檔（须 shadow+Brain）

| 日期 | 摘要 |
|------|------|
| 2026-06-27 | 初版 edit_ops |
| 2026-06-27 | 三 pass + Tier 1 路由 · 02-edit 改地圖 |
| 2026-06-27 | §8 P 層只讀索引 + vocabulary 橋接 v0.1 |

---

*agent02 · edit_ops · a2Ed0pS7*

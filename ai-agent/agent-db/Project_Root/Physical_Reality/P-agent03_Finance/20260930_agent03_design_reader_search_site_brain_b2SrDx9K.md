# 設計備忘 · 讀者搜尋 · `site-brain.json` + 三層排序

> **Agent 3 · ops · P-agent03_Finance**  
> **日期**：2026-09-30  
> **承接**：CEO 概念備忘 `k7RdSr9K` · 網站 v1.1 `w9PlV11K` · EGRESS / 保安 `w3ScPr9K`  
> **uuid**：`b2SrDx9K`  
> **性質**：**實作設計**（schema + 伪代码 + pipeline）· **仍未授權寫入 `project/src/` 程式**  
> **唔** export · **唔** sync `project-db/`

---

## 0. 完成定義（本輪）

| 交付 | 狀態 |
|------|------|
| `site-brain.json` schema v1 | 本檔 §2 |
| 對照 Quartz `contentIndex.json` | 本檔 §1 |
| 三 tier 伪代码 | 本檔 §4 |
| Build / runtime / 路徑 | 本檔 §3、§5 |
| 開工寫 Astro / Python | **未拍板** · 需擁有者 **confirm 原型**（見 `k7RdSr9K` §二節奏 step 3） |

---

## 1. 對照 Quartz `contentIndex.json`

Quartz（[jackyzha0/quartz](https://github.com/jackyzha0/quartz) · [graph plugin](https://github.com/quartz-community/graph)）喺 build 產 **`/static/contentIndex.json`**，供 **Search**、**Graph**、**Backlinks** 共用。典型形狀（簡化）：

```json
{
  "links": {
    "path/to/slug-a": ["path/to/slug-b", "path/to/slug-c"]
  },
  "tags": {
    "tutorial": ["path/to/slug-a"]
  }
}
```

另有一組 **page metadata**（title、description、tags 陣列）嵌喺 SPA bundle；Graph 用 `links` 做 **1-hop 鄰居**，Search 用全文／索引插件。

| Quartz | 本專案 `site-brain.json` |
|--------|---------------------------|
| slug path key | **`href`**（由 `vt_site_slug` → `/intro/0-1/` 等） |
| `links[slug]` outgoing | **`gravity_links`**（uuid8 → build 時 resolve 成 `href`）+ 可選 **`quartz_compat.links`** |
| `tags` 倒排 | **`keywords`** 倒排 → 可選 **`quartz_compat.tags`** |
| （無） | **`vsm`** 9 位 · **`uuid`** 穩定 id |
| 全文 search | **刻意唔做** v1；只用 keyword 閉集 + 同義表 |

**設計原則**：保留 **`quartz_compat`** 子物件，日後若要接 Quartz graph 元件或 debug，可對照；**讀者搜尋 v1 只讀 `nodes` + `lexicon`**。

---

## 2. `site-brain.json` schema v1

### 2.1 頂層

```json
{
  "schema_version": "1.0",
  "generated_at": "2026-09-30T12:00:00Z",
  "source_commit": "<optional git sha>",
  "source": "project-db/project.csv",
  "filter": {
    "visibility": "exportable",
    "doc_class": "article",
    "is_primary_shadow": true
  },
  "lexicon": ["AI", "intro", "w01", "引證", "心理學", "經濟", "讀書"],
  "synonyms": {},
  "stopwords": {
    "zh": ["我想", "搵", "關於", "相關", "嘅", "文件", "文章", "請", "幫"],
    "en": ["find", "about", "related", "article", "please"]
  },
  "nodes": {},
  "quartz_compat": {
    "links": {},
    "tags": {}
  }
}
```

### 2.2 `nodes[uuid]`（每篇 exportable 文章一條）

```json
"W01in001": {
  "uuid": "W01in001",
  "href": "/intro/0-1/",
  "title": "為何讀書卻冇觀點",
  "lang": "zh-Hant",
  "keywords": ["w01", "intro", "ep1", "讀書", "觀察點"],
  "vsm": "102130210",
  "gravity_links": []
}
```

| 欄 | 規則 |
|----|------|
| `href` | 尾斜線與 Astro `trailingSlash` 一致；由 `vt_site_slug` 生成 |
| `title` | v1 可取自 `view` 或 export 時 `src/content` frontmatter（build 腳本讀 md title 優先） |
| `keywords` | **順序有意義**（Tier 1 位置分） |
| `gravity_links` | uuid8 列表；build 時 **drop** 非 exportable / 缺失節點 |
| `vsm` | 字串長度 9；缺則 `"000000000"` 並 `audit` log |

### 2.3 `quartz_compat`（衍生、可選）

Build 腳本由 `nodes` 生成：

- `links[href] = [ neighbor_href, ... ]`（來自 resolved `gravity_links`）
- `tags[token] = [ href, ... ]`（來自 `keywords` 展開）

### 2.4 `synonyms` v1.1（人手檔，可空 object）

```json
"synonyms": {
  "GDP": ["經濟"],
  "行為經濟學": ["經濟", "心理學"]
}
```

Build 時 **唔改** `nodes.keywords`；查詢時將 reader token **expand** 成 canonical token 集合。

### 2.5 體積

100 篇 × ~300B ≈ **30KB** 級；加 `quartz_compat` 通常仍 **< 200KB**。

---

## 3. Build pipeline（Python · GitHub Actions）

### 3.1 路徑（建議）

```text
scripts/reader_search/
  build_site_brain.py      # 讀 project.csv → site-brain.json
  lib_csv.py               # 篩選、parse keywords|
  lib_href.py              # vt_site_slug → href
  synonyms.txt             # 可選；或 synonyms.yaml
project/public/site-brain.json   # build 產物 → 入 dist/
```

### 3.2 觸發

- **GitHub Actions**：`paths`: `project-db/project.csv`, `project/src/content/**`, `scripts/reader_search/**`
- Job：`python3 scripts/reader_search/build_site_brain.py --out project/public/site-brain.json`
- 可 commit json 回 repo **或** 只喺 Vercel build step 產（二選一；v1 建議 **commit json** 方便 diff 審核）

### 3.3 輸入鐵律

- **只** 讀 `project-db/project.csv`
- **禁止** 讀 `ai-agent/agent-db/`、`articles/drafts/`
- `gravity_links` resolve 失敗 → 略過該邊 + stderr warning

### 3.4 Runtime 定案（設計拍板）

| 方案 | 決策 |
|------|------|
| 查詢邏輯放 **瀏覽器 JS** | **v1 採用** · 主站保持 Astro **static** · 無 API key |
| FastAPI / Vercel Python | **v1 唔做** |
| Pagefind 全文 | **v2 可選** · 唔阻塞 v1 |

---

## 4. 三 tier 伪代码

以下伪代码與 `k7RdSr9K` 一致；權重可 tune，**實作時常數放 `SEARCH_WEIGHTS` 單一物件**。

### 4.1 共用

```text
function vsm_match(a: string, b: string) -> float:
  // a,b 長度 9；每位 0-4
  score = 0
  for i in 0..8:
    da = int(a[i]); db = int(b[i])
    diff = abs(da - db)
    if diff == 0: score += 1.0
    elif diff == 1: score += 0.5
  return score

function jaccard(A: set, B: set) -> float:
  if A empty and B empty: return 0
  return |A ∩ B| / |A ∪ B|

function expand_query_tokens(raw: string, lexicon, synonyms, stopwords) -> set Q:
  tokens = tokenize_for_matching(raw, lexicon, stopwords)  // 見 §4.2
  Q = set()
  for t in tokens:
    Q.add(t)
    for syn in synonyms.get(t, []):
      Q.add(syn)
  return Q

function keyword_position_bonus(keywords: list, q: set) -> float:
  bonus = 0
  for idx, kw in enumerate(keywords):
    if kw in q:
      bonus += max(0, 20 - idx)   // 越前越高
  return bonus
```

### 4.2 抽詞（閉集 + 長詞優先）

```text
function tokenize_for_matching(raw, lexicon, stopwords) -> list:
  // 1) 將 lexicon 按字串長度降序（中文長詞優先）
  sorted_lex = sort(lexicon, key=len, reverse=true)
  // 2) 在 raw 上做子串掃描（greedy 或 non-overlap 最長匹配）
  hits = []
  for term in sorted_lex:
    if term in raw and term not in stopwords:
      hits.append(term)
  // 3) 英文可選：按空白切 + 小寫，再 filter lexicon
  return unique(hits)
```

若 `Q` 為空 → 回 `{ tier: "none", message: "搵唔到站內標籤，請換關鍵字" }`，**唔** 亂推 Tier 2。

### 4.3 Tier 1 — 直接命中

```text
function tier1(nodes, Q) -> list Result:
  results = []
  for uuid, node in nodes:
    kw_list = node.keywords
    kw_set = set(kw_list)
    hit_count = |kw_set ∩ Q|
    if hit_count == 0: continue
    score = 100 * hit_count + keyword_position_bonus(kw_list, Q)
    results.append({ uuid, href, title, tier: 1, score, hit_count, matched: kw_set ∩ Q })
  sort results by (-score, href)
  return results
```

### 4.4 Tier 1b — 引力鄰居

```text
function tier1b(nodes, tier1_results, Q, seen_uuids) -> list Result:
  results = []
  anchors = tier1_results   // 或只取前 N 篇 anchor
  for r in anchors:
    U = nodes[r.uuid]
    for nid in U.gravity_links:
      if nid in seen_uuids: continue
      if nid not in nodes: continue
      N = nodes[nid]
      s = 80
      s += 10 * vsm_match(U.vsm, N.vsm)
      s += 40 * |set(N.keywords) ∩ Q|
      results.append({ uuid: nid, href: N.href, title: N.title, tier: 1, sub: "gravity", score: s, from: U.uuid })
  dedupe by uuid keeping max(score)
  sort by -score
  return results
```

`seen_uuids` = Tier 1 已出 uuid；1b 結果加入 seen 再跑 Tier 2。

### 4.5 Tier 2 — keyword 相似

```text
function tier2(nodes, anchor_uuid, Q, seen_uuids) -> list Result:
  Ustar = nodes[anchor_uuid]
  A = set(Ustar.keywords)
  results = []
  for uuid, Bnode in nodes:
    if uuid in seen_uuids: continue
    B = set(Bnode.keywords)
    if B ∩ Q != empty: continue   // 已在 Tier 1
    s = 100 * jaccard(A, B) + 5 * vsm_match(Ustar.vsm, Bnode.vsm)
    if s < TIER2_MIN: continue    // 建議 15
    results.append({ uuid, href: Bnode.href, title: Bnode.title, tier: 2, score: s })
  sort by -score; take top 10
  return results
```

`anchor_uuid` = Tier 1 第一個結果之 uuid。

### 4.6 合併回應

```text
function search(raw_query, index) -> Response:
  Q = expand_query_tokens(raw_query, index.lexicon, index.synonyms, index.stopwords)
  if Q empty: return empty_response
  t1 = tier1(index.nodes, Q)
  seen = { r.uuid for r in t1 }
  t1b = tier1b(index.nodes, t1, Q, seen)
  seen |= { r.uuid for r in t1b }
  anchor = t1[0].uuid if t1 else null
  t2 = tier2(index.nodes, anchor, Q, seen) if anchor else []
  return { query_tokens: Q, sections: [
    { label: "直接相關", items: t1 },
    { label: "引力相關", items: t1b },
    { label: "主題相近", items: t2 }
  ]}
```

---

## 5. 前端（設計 sketch · 未實作）

| 項 | 建議 |
|----|------|
| 元件 | `SiteReaderSearch.astro` + 小 `reader-search.ts` |
| 載入 | `fetch('/site-brain.json')` 一次 cache |
| UI | 輸入框 + 三段列表；**唔** 偽裝 LLM 長答 |
| 披露 | 「依站內標籤與編目排序，非 AI 生成」→ legal 可後審 |
| a11y | 結果係 `<ul>` + `<a href>` |

**禁止** 喺 widget 內暴露 `uuid` / `vsm` 俾讀者（除 debug mode）。

---

## 6. 與流水／憲法

- 索引只反映 **已 export** 文章；`project.csv` 有行但 `src/content` 無 md → build **warn** 仍可出 node 或 skip（v1 建議 **skip 無 href 對應 content**）。  
- Deploy 仍只 **EGRESS `dist/`**；`site-brain.json` 只經 `public/` 進 dist。  
- 開工條件：擁有者 confirm **「原型 OK」** 後 `@agent-03-ops` 實作 §3–§5。

---

## 7. 權威追蹤

| 檔 | uuid / 路徑 |
|----|-------------|
| 概念 | `k7RdSr9K` · [`20260930_agent12_ceo_memo_reader_search_k7RdSr9K.md`](../P-agent12_Other/20260930_agent12_ceo_memo_reader_search_k7RdSr9K.md) |
| metadata | [`project-db/docs/02_METADATA.md`](../../../../../project-db/docs/02_METADATA.md) |
| Quartz 參考 | [quartz-community/graph README](https://github.com/quartz-community/graph/blob/main/README.md) |

---

## 修改紀錄

| 日期 | 摘要 |
|------|------|
| 2026-09-30 | Agent 3 初版 · schema v1 · 三 tier 伪代码 · runtime=browser |

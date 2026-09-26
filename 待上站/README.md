# 待上站（ready-to-publish queue）

**已準備好上站的文章放這裏。** 此目錄**不會**被 Astro 載入，**不會**出現在 vincentiantopology.com 公眾頁面。由 **網站營運 bot**（`@agent-03-ops`）在你明確要求發佈時，才會把稿複製到 `project/src/content/…` 並 build／deploy。

## 與草稿區的分別

| | [`草稿區/`](../草稿區/) · [`project/articles/drafts/`](../project/articles/drafts/) | **本目錄 `待上站/`** |
|---|---|---|
| 用途 | Agent 1→2→4 流水、人工 confirm ①② | 已備妥、等 bot 上站 |
| 結構 | `{slug}/` 含 `pipeline.md` 等 | 單篇 `.md` 按欄目分夾 |
| 是否入 project DB | 通常 confirm ② 後入庫 | **唔經** Agent 流水亦可 |
| 公眾可見 | 否（未 export） | 否（未 copy 去 `src/content/`） |

草稿流水說明：[`project/articles/DRAFTS.md`](../project/articles/DRAFTS.md)

## 子目錄 ↔ 網站欄目

| 夾 | 對應 `project/src/content/` |
|---|---|
| `intro/` | 引言系列 |
| `view/` | 觀點 |
| `topics/` | 主題／系列 |
| `classics/` | 經典重讀 |

Frontmatter 須符合 [`project/src/content.config.ts`](../project/src/content.config.ts)。範本：[`_範本/article.md`](./_範本/article.md)。

### 放稿方式

1. 揀對應子目錄，放入**已寫好 frontmatter** 的 `.md`。
2. **`topics/`**：可用 `series-slug/episode-slug.md`，或單一 flat 檔；系列欄位（`series`、`seriesTitle`、`episode`）寫在 frontmatter。
3. **`draft: false`** 表示已可上站（bot 仍要等你的發佈指令）。
4. **不要**自己把檔案 copy 去 `project/src/content/`——除非另有明確「上站／export」指令。

## 上站後

Bot 成功發佈後，把原稿**移入** [`_已上站/`](./_已上站/)（保留 repo 內紀錄，方便對照）。

## 技術保證

- 本目錄在 **repo 根**，不在 `project/src/content/`。
- Astro content collections **只**掃 `src/content/{intro,view,topics,classics}`，因此 **`待上站/` 不會漏上公網**。

## 發佈指令（給 Vincent）

向 `@agent-03-ops` 說明要上哪篇，例如：

```text
@agent-03-ops 待上站 intro/my-article.md → export 上站
```

詳見 [`project/design/EXPORT.md`](../project/design/EXPORT.md) · [`project/design/DEPLOY.md`](../project/design/DEPLOY.md)。

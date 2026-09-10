# 寫作技藝（craft）

內部參考；**不**進 Project DB、**不**上站。

## 預設守則（優先序）

1. **專案擁有者當次明確要求** — 有特別指示時，以該指示為準（可覆蓋本目錄任何條款）。
2. **無特別要求時** — 照本目錄指引執行（`_base` → `citations` → `voice` → 欄目範本 → `series-cycle`）。
3. **本指引唔寫死** — 「偏」「預設」「建議」表示彈性空間；唔湊比例、唔為守規而犧牲觀測點與觀點。

Agent／改稿：若用戶未講例外，跟指引；若用戶講「今次…」「本篇…」「破例…」，跟用戶。

## 閱讀順序

| 檔 | 內容 |
|----|------|
| [`_base.md`](./_base.md) | 觀測點、引證→消化→觀點、作／寫 |
| [`citations.md`](./citations.md) | 中／英引述主軸 · **EFN 首次出場** |
| [`voice.md`](./voice.md) | 用字深淺、市場、欄目語氣 |
| [`notes/reader-delivery-zh-TW.md`](./notes/reader-delivery-zh-TW.md) | ② 繁中讀者交付（台灣語 · 禁內部語 · 通順編排） |
| [`series-cycle.md`](./series-cycle.md) | S1–S4 系列周期（專題專用） |

## 路由表

| 路徑前綴 | 語言 | 手法 | 範本 |
|----------|------|------|------|
| `*/view/*` | 繁中 | 快打 | [`zh/quick-view.md`](./zh/quick-view.md) |
| `*/topics/*` | 繁中 | 深打 + 系列 | [`zh/deep-topics.md`](./zh/deep-topics.md) + `series-cycle.md` |
| `*/classics/*` | 繁中 | 厚打 | [`zh/thick-classics.md`](./zh/thick-classics.md) |
| `*/view/*` | en | Quick | [`en/quick-view.md`](./en/quick-view.md) |
| `*/topics/*` | en | Deep + 系列 | [`en/deep-topics.md`](./en/deep-topics.md) + `series-cycle.md` |
| `*/classics/*` | en | Thick | [`en/thick-classics.md`](./en/thick-classics.md) |
| `*/intro/*` | 繁中 | 入門憲章 | `_base.md`（0 系列可對位 S1–S4） |

技術欄位（frontmatter、URL）→ [`design/IA.md`](../../design/IA.md)

## 待補

- [`notes/vocabulary-TBD.md`](./notes/vocabulary-TBD.md) — 橋接 v0.1（P 層只讀 → craft）；v1.0 前以 `voice.md` 為準

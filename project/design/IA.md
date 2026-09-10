# 資訊架構（IA）

> Vincentian Topology 公開站 · 定稿 2026-06-20

## 原則

- Spin Map **只讀**；文章經 **drafts → project DB V02 → export**
- 單向閱讀：無 email、無留言
- Premium 外判：本站僅 outbound link（`subscribeUrl`）
- Mobile-first 排版

## 站名

| 語言 | 名稱 |
|---|---|
| 中文 | 萬脈同構｜文森思維 |
| 英文 | All Things Are One \| Vincentian Topology |

## Logo

- 檔案：`public/logo.png`（VINCENTIAN TOPOLOGY · 三環拓撲結）
- 規格：`design/BRAND.md`

## URL 地圖

```
/                          首頁
/intro                     關於我們目錄
/intro/{slug}              關於我們單篇
/view                      文森世界列表
/view/{slug}               Vincentian View 單篇
/topics                    專題探討索引（按系列分組）
/topics/{series}/{episode} 專題單篇
/classics                  經典註解列表
/classics/{slug}           經典單篇
```

## 導航

關於我們 · 文森世界 · 專題探討 · 經典註解 · Subscribe（外連）

## 內容對照（Spin Map 產品線）

| 本站欄目 | 庫內線 | 備註 |
|---|---|---|
| 關於我們 `/intro` | 0 關於我們 | 0-1～0-4 |
| 文森世界 `/view` | ① 時事 | Vincentian View |
| 專題探討 `/topics` | ② 專題 | 系列 + 期數 |
| 經典註解 `/classics` | ③ 經典解讀 | 長文 |

## Frontmatter 欄位

```yaml
title: string
description: string (optional)
published: date
lang: zh-Hant | en
spin_map_source: string (optional, internal)
draft: boolean
```

### `draft`（最小安全掣）

- **建議保留**：即使你主要採用「Spin Map 完稿後再搬運」，仍可能出現「搬運後未校對」的中間狀態
- `draft: true` 代表：
  - 列表頁不顯示
  - 靜態頁不生成（路由不存在）
  - 等同「已放入 repo，但未對外」

專題額外：

```yaml
series: slug
seriesTitle: 顯示名
episode: number
```

入門額外：

```yaml
order: 1-4
```

## 禁發（不可從 Spin Map 複製上站）

- P 母檔：`DUjEgIF1`, `sKzlHApr`, `hzBev1EF` 等
- 借題練筆：`KCdl3dH1`, `qpLs5Zya`, `cIT4Y7fF`

## 技術

- Astro 6 + Content Collections
- 靜態輸出 → Vercel / Cloudflare Pages

## 待辦

- [ ] 替換 `subscribeUrl` placeholder
- [ ] 新稿走 `articles/drafts/{slug}/` 流水（見 `design/EXPORT.md`）
- [ ] DNS 脫離 GoDaddy Builder

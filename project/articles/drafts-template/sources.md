# Sources · {slug}

Agent 1 用。記錄 fetch、Spin Map uuid、外連。

## 書名鎖定表（起稿前必填）

正文 EFN、《引證索引》書名 **只准抄本表 `canonical_title`**（來源：Spin Map primary shadow 全書名 → `fetch_download/books.csv` title）。

| uuid / book_id | 作者 | **canonical_title** | 章／錨 | 梯隊 | 入引證索引 |
|----------------|------|---------------------|--------|------|------------|
| | | | | T1/T2/T3 | Y / N |

**綁定檢查**（起稿後）：索引每一行書名 = 本表；正文 EFN《書名》= 本表；`Y` 者正文必有對應作者／論文錨。

## 其他來源

| 類型 | 路徑 / uuid | 備註 |
|------|-------------|------|
| fetch | `~/Documents/Dev/fetch_download/下載/…` | `book_id` 可併入上表 |
| spin_map | uuid | 只讀 · `spin_map_ref`（**唔** `spin_map_copy`） |

**禁止** copy Spin Map `P*`。

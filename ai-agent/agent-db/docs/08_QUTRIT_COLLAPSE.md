# 08 — qutrit 坍缩与 m_path（agent-db）

> 跟 Spin Map [`01_FILENAME_INVARIANTS`](../../../_shared/spin-map/docs/ai/01_FILENAME_INVARIANTS.md) · d 语义见 [`06_SIX_DIMENSIONS.md`](./06_SIX_DIMENSIONS.md)

---

## 1. 从 d 到 qutrit

对 `d1…d6` 分别坍缩为 **0、1、2**，组成六段字符串：

```text
qutrit: "t1/t2/t3/t4/t5/t6"
```

### 坍缩函数（与 Spin Map 一致）

| 输入 | 规则 |
|------|------|
| d1, d5, d6 | `<0.34→0` · `<0.67→1` · else→2 |
| d2 | `<3.5→0` · `<6.5→1` · else→2 |
| d3 | `<3→0` · `<6→1` · else→2 |
| d4 | `-1→0` · `0→1` · `1→2` |

### 示例

```text
d1=0.85  d2=5.0  d3=6.5  d4=0  d5=0.70  d6=0.75
→      2      1      2      1      2       2
qutrit: "2/1/2/1/2/2"
```

```text
d4=0（现在）→ 第四段必须是 1，不是 0
```

`agent_Brain.csv` 的 `qutrit` 栏须用 **斜线格式** `"2/1/2/1/2/2"`（勿写 `212122`）。

---

## 2. m_path 砌法

```text
/The_Void_729/{t1}/{t2}/{t3}/{t4}/{t5}/{t6}/{basename}.md
```

- 每层目录名只能是 **`0`、`1`、`2`**
- `basename` = `YYYYMMDD_{view_slug}_{uuid8}.md`
- `basename` 的 `YYYYMMDD` = 该 shadow **`pk` 前 8 码**（UTC）

### 示例

```text
qutrit: "1/0/1/0/1/2"
m_path: /The_Void_729/1/0/1/0/1/2/20260627_agent02_edit_ops_summary_a2Ed0pS7.md
```

磁盘路径（agent-db）：

```text
Project_Root/The_Void_729/1/0/1/0/1/2/20260627_agent02_edit_ops_summary_a2Ed0pS7.md
```

---

## 3. 四位一体

改 d → 可能改 qutrit → 须同步：

1. shadow YAML（`d*`、`qutrit`、`m_path`）
2. 物理搬档到新 `m_path` 目录
3. `agent_Brain.csv` 同行
4. `audit: pending`

---

## 4. 目录策略

- **不预建** 729 个叶目录
- 入库时 `mkdir -p` 沿 `m_path` 六段创建
- `m_path` 全局唯一（同一路径不可两 shadow）

---

## 5. 自检

- [ ] 六层数字 = qutrit 六段
- [ ] 路径末尾 basename = 墟文件实际名
- [ ] 无中文层名（如 `D1_物质`）
- [ ] qutrit 可由 d1–d6 复算

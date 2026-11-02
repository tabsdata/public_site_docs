# Concatenate Tables

> Concatenate tables with `concat()` and its `how` modes (vertical, vertical_relaxed, diagonal, diagonal_relaxed), with transformer examples and the None-handling rules.

Source: https://docs.tabsdata.com/tutorials/transformations/concatenate-tables

## Stack tables into one

`how` decides what `concat()` does when the inputs do not line up.

AI agent session

❯make a new table that takes the sales\_east and sales\_west tables and stacks their rows into one table

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `concat()` appends rows, and the default how="vertical" is right here because both inputs carry the same three columns with the same types.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["sales_east", "sales_west"],
  output_tables=["sales_all"],
)
def combine_sales(east: TableFrameSpec, west: TableFrameSpec) -> TableFrameSpec:
  return concat([east, west])
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/sales\_all is live — 2 rows from sales\_east then 2 from sales\_west, in that order, columns unchanged:

```
┌────────┬───────┬────────┐
│ region │ month │ amount │
├────────┼───────┼────────┤
│ east   │ jan   │ 10     │
├────────┼───────┼────────┤
│ east   │ feb   │ 20     │
├────────┼───────┼────────┤
│ west   │ jan   │ 30     │
├────────┼───────┼────────┤
│ west   │ feb   │ 40     │
└────────┴───────┴────────┘
```

Transformed tables

sales\_east

| region | month | amount |
| --- | --- | --- |
| east | jan | 10 |
| east | feb | 20 |

2 rows

sales\_west

| region | month | amount |
| --- | --- | --- |
| west | jan | 30 |
| west | feb | 40 |

2 rows

sales\_all

| region | month | amount |
| --- | --- | --- |
| east | jan | 10 |
| east | feb | 20 |
| west | jan | 30 |
| west | feb | 40 |

4 rows

AI agent session

❯make a new table that takes the sales\_east and sales\_west tables and stacks their rows into one table, casting a column that is typed differently in each

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — the columns match and the types do not, so how="vertical\_relaxed" casts amount to a common supertype instead of refusing.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["sales_east", "sales_west"],
  output_tables=["sales_all"],
)
def combine_sales(east: TableFrameSpec, west: TableFrameSpec) -> TableFrameSpec:
  return concat([east, west], how="vertical_relaxed")
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/sales\_all is live — amount came out Float64, so the Int64 value from sales\_east was cast:

```
┌────────┬────────┐
│ region │ amount │
├────────┼────────┤
│ east   │ 10.0   │
├────────┼────────┤
│ west   │ 30.5   │
└────────┴────────┘
```

Transformed tables

sales\_east

| regionString | amountInt64 |
| --- | --- |
| east | 10 |

1 row

sales\_west

| regionString | amountFloat64 |
| --- | --- |
| west | 30.5 |

1 row

sales\_all

| regionString | amountFloat64 |
| --- | --- |
| east | 10.0 |
| west | 30.5 |

2 rows

AI agent session

❯make a new table that takes the sales\_east and sales\_west tables and stacks their rows into one table, unioning the columns only one of them has

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — the columns differ, which how="vertical" rejects. how="diagonal" takes the union of the columns and fills the gaps with null.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["sales_east", "sales_west"],
  output_tables=["sales_all"],
)
def combine_sales(east: TableFrameSpec, west: TableFrameSpec) -> TableFrameSpec:
  return concat([east, west], how="diagonal")
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/sales\_all is live — 4 columns, the union of both inputs. The east row has no discount and the west row has no amount:

```
┌────────┬───────┬────────┬──────────┐
│ region │ month │ amount │ discount │
├────────┼───────┼────────┼──────────┤
│ east   │ jan   │ 10     │ null     │
├────────┼───────┼────────┼──────────┤
│ west   │ jan   │ null   │ 5        │
└────────┴───────┴────────┴──────────┘
```

Transformed tables

sales\_east

| region | month | amount |
| --- | --- | --- |
| east | jan | 10 |

1 row

sales\_west

| region | month | discount |
| --- | --- | --- |
| west | jan | 5 |

1 row

sales\_all

| region | month | amount | discount |
| --- | --- | --- | --- |
| east | jan | 10 | null |
| west | jan | null | 5 |

2 rows

AI agent session

❯make a new table that takes the sales\_east and sales\_west tables and stacks their rows into one table, reconciling both the columns and the types

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — the inputs differ in both their columns and their types, so this needs how="diagonal\_relaxed", which unions the columns and casts to a supertype in one pass.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["sales_east", "sales_west"],
  output_tables=["sales_all"],
)
def combine_sales(east: TableFrameSpec, west: TableFrameSpec) -> TableFrameSpec:
  return concat([east, west], how="diagonal_relaxed")
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/sales\_all is live — the union of both column sets, each column keeping the type it needs:

```
┌────────┬────────┬──────────┐
│ region │ amount │ discount │
├────────┼────────┼──────────┤
│ east   │ 10     │ null     │
├────────┼────────┼──────────┤
│ west   │ null   │ 5.5      │
└────────┴────────┴──────────┘
```

Transformed tables

sales\_east

| regionString | amountInt64 |
| --- | --- |
| east | 10 |

1 row

sales\_west

| regionString | discountFloat64 |
| --- | --- |
| west | 5.5 |

1 row

sales\_all

| regionString | amountInt64 | discountFloat64 |
| --- | --- | --- |
| east | 10 | null |
| west | null | 5.5 |

2 rows

note

`None` entries in the list are skipped. A list that is `None`, empty, or empty once the `None` entries are dropped makes `concat()` return `None`, which leaves the output table on its current version instead of committing a new one.

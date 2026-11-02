# Aggregate and Group

> Aggregation expressions (count, len, sum, mean, median, min, max, first, last, n_unique), group_by with agg, whole-group aggregates, and rank methods in Tabsdata transformers.

Source: https://docs.tabsdata.com/tutorials/transformations/aggregate-and-group

## Aggregate a whole column

AI agent session

❯make a new table that takes the events table and counts the non-null values in the id column

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `count()` on the column, which counts the non-null values and ignores the nulls.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["events"],
  output_tables=["events_id_count"],
)
def count_ids(events: TableFrameSpec) -> TableFrameSpec:
  return events.select(col("id").count())
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/events\_id\_count is live — one row, one column: the non-null ids:

```
┌────┐
│ id │
├────┤
│ 2  │
└────┘
```

Transformed tables

events

| id |
| --- |
| 1 |
| null |
| 3 |

3 rows

events\_id\_count

| id |
| --- |
| 2 |

1 row

AI agent session

❯make a new table that takes the events table and counts every row, including the ones with a null id

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `len()` rather than `count()`. len counts rows, so nulls are included; count skips them.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["events"],
  output_tables=["events_row_count"],
)
def count_rows(events: TableFrameSpec) -> TableFrameSpec:
  return events.select(col("id").len())
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/events\_row\_count is live — one row holding the row count, nulls included:

```
┌────┐
│ id │
├────┤
│ 3  │
└────┘
```

Transformed tables

events

| id |
| --- |
| 1 |
| null |
| 3 |

3 rows

events\_row\_count

| id |
| --- |
| 3 |

1 row

AI agent session

❯make a new table that takes the orders table and totals the amount column

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `sum()` on the column collapses every row into one.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["orders"],
  output_tables=["orders_total"],
)
def total_amount(orders: TableFrameSpec) -> TableFrameSpec:
  return orders.select(col("amount").sum())
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/orders\_total is live — the whole column added up:

```
┌────────┐
│ amount │
├────────┤
│ 60     │
└────────┘
```

Transformed tables

orders

| amount |
| --- |
| 10 |
| 20 |
| 30 |

3 rows

orders\_total

| amount |
| --- |
| 60 |

1 row

AI agent session

❯make a new table that takes the orders table and averages the amount column

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `mean()`, which divides by the count of non-null values rather than by the row count.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["orders"],
  output_tables=["orders_average"],
)
def average_amount(orders: TableFrameSpec) -> TableFrameSpec:
  return orders.select(col("amount").mean())
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/orders\_average is live — the arithmetic mean of the column:

```
┌────────┐
│ amount │
├────────┤
│ 20     │
└────────┘
```

Transformed tables

orders

| amount |
| --- |
| 10 |
| 20 |
| 30 |

3 rows

orders\_average

| amount |
| --- |
| 20 |

1 row

AI agent session

❯make a new table that takes the orders table and takes the median of the amount column

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `median()`, which is the middle value and so is not dragged by an outlier the way mean is.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["orders"],
  output_tables=["orders_median"],
)
def median_amount(orders: TableFrameSpec) -> TableFrameSpec:
  return orders.select(col("amount").median())
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/orders\_median is live — the middle value of the column:

```
┌────────┐
│ amount │
├────────┤
│ 20     │
└────────┘
```

Transformed tables

orders

| amount |
| --- |
| 10 |
| 20 |
| 30 |

3 rows

orders\_median

| amount |
| --- |
| 20 |

1 row

AI agent session

❯make a new table that takes the events table and finds the earliest value in the date column

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `min()` works on dates as well as numbers, since both order.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["events"],
  output_tables=["events_earliest"],
)
def earliest_date(events: TableFrameSpec) -> TableFrameSpec:
  return events.select(col("date").min())
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/events\_earliest is live — the smallest value, which for a Date is the earliest:

```
┌────────────┐
│    date    │
├────────────┤
│ 2024-01-02 │
└────────────┘
```

Transformed tables

events

| date |
| --- |
| 2024-03-15 |
| 2024-01-02 |

2 rows

events\_earliest

| date |
| --- |
| 2024-01-02 |

1 row

AI agent session

❯make a new table that takes the readings table and finds the largest value in the value column

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `max()` on the column.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["readings"],
  output_tables=["readings_highest"],
)
def highest_value(readings: TableFrameSpec) -> TableFrameSpec:
  return readings.select(col("value").max())
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/readings\_highest is live — the largest value in the column:

```
┌───────┐
│ value │
├───────┤
│ 7     │
└───────┘
```

Transformed tables

readings

| value |
| --- |
| 7 |
| 3 |

2 rows

readings\_highest

| value |
| --- |
| 7 |

1 row

AI agent session

❯make a new table that takes the events table and takes the value of the timestamp column from the first row

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `first()` takes the value in the first row as the data arrives, which is not the same as the earliest unless the table is sorted.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["events"],
  output_tables=["events_first"],
)
def first_timestamp(events: TableFrameSpec) -> TableFrameSpec:
  return events.select(col("timestamp").first())
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/events\_first is live — the value from the first row, in arrival order:

```
┌───────────┐
│ timestamp │
├───────────┤
│ 09:00     │
└───────────┘
```

Transformed tables

events

| timestamp |
| --- |
| 09:00 |
| 17:30 |

2 rows

events\_first

| timestamp |
| --- |
| 09:00 |

1 row

AI agent session

❯make a new table that takes the events table and takes the value of the timestamp column from the last row

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `last()`, the same positional idea from the other end.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["events"],
  output_tables=["events_last"],
)
def last_timestamp(events: TableFrameSpec) -> TableFrameSpec:
  return events.select(col("timestamp").last())
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/events\_last is live — the value from the final row:

```
┌───────────┐
│ timestamp │
├───────────┤
│ 17:30     │
└───────────┘
```

Transformed tables

events

| timestamp |
| --- |
| 09:00 |
| 17:30 |

2 rows

events\_last

| timestamp |
| --- |
| 17:30 |

1 row

AI agent session

❯make a new table that takes the items table and counts the distinct values in the category column

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `n_unique()` counts distinct values rather than rows, so a category appearing twice counts once.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["items"],
  output_tables=["items_category_count"],
)
def count_categories(items: TableFrameSpec) -> TableFrameSpec:
  return items.select(col("category").n_unique())
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/items\_category\_count is live — the number of distinct values:

```
┌──────────┐
│ category │
├──────────┤
│ 2        │
└──────────┘
```

Transformed tables

items

| category |
| --- |
| tools |
| toys |
| tools |

3 rows

items\_category\_count

| category |
| --- |
| 2 |

1 row

## Group rows and aggregate

AI agent session

❯make a new table that takes the sales table and totals the sales column and averages the quantity column per category

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `group_by("category").agg(...)`. Each expression in agg becomes one output column, and alias names it.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["sales"],
  output_tables=["sales_by_category"],
)
def sales_by_category(sales: TableFrameSpec) -> TableFrameSpec:
  return sales.group_by("category").agg(
      col("sales").sum().alias("total_sales"),
      col("quantity").mean().alias("avg_quantity")
  )
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/sales\_by\_category is live — one row per category, with the two aggregates you asked for:

```
┌──────────┬─────────────┬──────────────┐
│ category │ total_sales │ avg_quantity │
├──────────┼─────────────┼──────────────┤
│ tools    │ 160         │ 5            │
├──────────┼─────────────┼──────────────┤
│ toys     │ 40          │ 2            │
└──────────┴─────────────┴──────────────┘
```

Transformed tables

sales

| category | sales | quantity |
| --- | --- | --- |
| tools | 100 | 4 |
| toys | 40 | 2 |
| tools | 60 | 6 |

3 rows

sales\_by\_category

| category | total\_sales | avg\_quantity |
| --- | --- | --- |
| tools | 160 | 5 |
| toys | 40 | 2 |

2 rows

AI agent session

❯make a new table that takes the orders table and totals the revenue column and counts the order\_id column per region and product type

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `group_by()` takes several columns, and the group is the combination of their values. Only combinations that occur in the data get a row.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["orders"],
  output_tables=["orders_by_region_type"],
)
def revenue_by_region(orders: TableFrameSpec) -> TableFrameSpec:
  return orders.group_by("region", "product_type").agg(
      col("revenue").sum().alias("total_revenue"),
      col("order_id").count().alias("order_count")
  )
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/orders\_by\_region\_type is live — one row per region and product type pair that exists:

```
┌────────┬──────────────┬───────────────┬─────────────┐
│ region │ product_type │ total_revenue │ order_count │
├────────┼──────────────┼───────────────┼─────────────┤
│ east   │ tool         │ 150           │ 2           │
├────────┼──────────────┼───────────────┼─────────────┤
│ west   │ toy          │ 70            │ 1           │
└────────┴──────────────┴───────────────┴─────────────┘
```

Transformed tables

orders

| region | product\_type | revenue | order\_id |
| --- | --- | --- | --- |
| east | tool | 100 | o1 |
| east | tool | 50 | o2 |
| west | toy | 70 | o3 |

3 rows

orders\_by\_region\_type

| region | product\_type | total\_revenue | order\_count |
| --- | --- | --- | --- |
| east | tool | 150 | 2 |
| west | toy | 70 | 1 |

2 rows

AI agent session

❯make a new table that takes the payments table and totals the amount column per year and month of the timestamp column

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — there is no month column to group on, so `group_by()` takes expressions that derive year and month from the timestamp and groups on the results.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["payments"],
  output_tables=["payments_by_month"],
)
def monthly_totals(payments: TableFrameSpec) -> TableFrameSpec:
  return payments.group_by(
      col("timestamp").dt.year().alias("year"),
      col("timestamp").dt.month().alias("month")
  ).agg(
      col("amount").sum().alias("monthly_total")
  )
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/payments\_by\_month is live — one row per year and month, from a table that had neither column:

```
┌──────┬───────┬───────────────┐
│ year │ month │ monthly_total │
├──────┼───────┼───────────────┤
│ 2024 │ 1     │ 50            │
├──────┼───────┼───────────────┤
│ 2024 │ 2     │ 50            │
└──────┴───────┴───────────────┘
```

Transformed tables

payments

| timestamp | amount |
| --- | --- |
| 2024-01-15 10:00:00 | 30 |
| 2024-01-28 12:00:00 | 20 |
| 2024-02-02 09:00:00 | 50 |

3 rows

payments\_by\_month

| year | month | monthly\_total |
| --- | --- | --- |
| 2024 | 1 | 50 |
| 2024 | 2 | 50 |

2 rows

## Aggregate every column in a group

AI agent session

❯make a new table that takes the sales table and counts the rows in each category

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — the shorthand form. `group_by("category").count()` applies to the frame rather than to a named expression, so you get a count without writing an agg.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["sales"],
  output_tables=["sales_counts"],
)
def count_by_category(sales: TableFrameSpec) -> TableFrameSpec:
  return sales.group_by("category").count()
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/sales\_counts is live — one row per category with its row count:

```
┌──────────┬───────┐
│ category │ sales │
├──────────┼───────┤
│ tools    │ 2     │
├──────────┼───────┤
│ toys     │ 1     │
└──────────┴───────┘
```

Transformed tables

sales

| category | sales |
| --- | --- |
| tools | 100 |
| toys | 40 |
| tools | 60 |

3 rows

sales\_counts

| category | sales |
| --- | --- |
| tools | 2 |
| toys | 1 |

2 rows

AI agent session

❯make a new table that takes the sales table and sums every column other than category, per category

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `group_by("category").sum()` sums every non-key column at once, which is the difference from agg: you name no columns and get all of them.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["sales"],
  output_tables=["sales_sums"],
)
def sum_by_category(sales: TableFrameSpec) -> TableFrameSpec:
  return sales.group_by("category").sum()
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/sales\_sums is live — every non-key column summed inside each category:

```
┌──────────┬───────┐
│ category │ sales │
├──────────┼───────┤
│ tools    │ 160   │
├──────────┼───────┤
│ toys     │ 40    │
└──────────┴───────┘
```

Transformed tables

sales

| category | sales |
| --- | --- |
| tools | 100 |
| toys | 40 |
| tools | 60 |

3 rows

sales\_sums

| category | sales |
| --- | --- |
| tools | 160 |
| toys | 40 |

2 rows

AI agent session

❯make a new table that takes the sales table and averages every column other than category, per category

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `mean()` on the group, applied to every non-key column.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["sales"],
  output_tables=["sales_means"],
)
def mean_by_category(sales: TableFrameSpec) -> TableFrameSpec:
  return sales.group_by("category").mean()
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/sales\_means is live — every non-key column averaged inside each category:

```
┌──────────┬───────┐
│ category │ sales │
├──────────┼───────┤
│ tools    │ 80    │
├──────────┼───────┤
│ toys     │ 40    │
└──────────┴───────┘
```

Transformed tables

sales

| category | sales |
| --- | --- |
| tools | 100 |
| toys | 40 |
| tools | 60 |

3 rows

sales\_means

| category | sales |
| --- | --- |
| tools | 80 |
| toys | 40 |

2 rows

AI agent session

❯make a new table that takes the sales table and takes the smallest value of every column other than category, per category

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `min()` on the group. Each column is reduced on its own, so a row of the output need not match any row of the input.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["sales"],
  output_tables=["sales_mins"],
)
def min_by_category(sales: TableFrameSpec) -> TableFrameSpec:
  return sales.group_by("category").min()
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/sales\_mins is live — the smallest value of each non-key column per category:

```
┌──────────┬───────┐
│ category │ sales │
├──────────┼───────┤
│ tools    │ 60    │
├──────────┼───────┤
│ toys     │ 40    │
└──────────┴───────┘
```

Transformed tables

sales

| category | sales |
| --- | --- |
| tools | 100 |
| toys | 40 |
| tools | 60 |

3 rows

sales\_mins

| category | sales |
| --- | --- |
| tools | 60 |
| toys | 40 |

2 rows

AI agent session

❯make a new table that takes the sales table and takes the largest value of every column other than category, per category

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `max()` on the group, column by column.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["sales"],
  output_tables=["sales_maxes"],
)
def max_by_category(sales: TableFrameSpec) -> TableFrameSpec:
  return sales.group_by("category").max()
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/sales\_maxes is live — the largest value of each non-key column per category:

```
┌──────────┬───────┐
│ category │ sales │
├──────────┼───────┤
│ tools    │ 100   │
├──────────┼───────┤
│ toys     │ 40    │
└──────────┴───────┘
```

Transformed tables

sales

| category | sales |
| --- | --- |
| tools | 100 |
| toys | 40 |
| tools | 60 |

3 rows

sales\_maxes

| category | sales |
| --- | --- |
| tools | 100 |
| toys | 40 |

2 rows

## Rank values

AI agent session

❯make a new table that takes the results table and ranks the score column, with tied scores sharing the average rank

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `rank()` returns a value per row rather than collapsing the table, so it goes through `with_columns`. method="average" is the default and gives tied rows the mean of the ranks they span.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["results"],
  output_tables=["results_ranked"],
)
def rank_average(results: TableFrameSpec) -> TableFrameSpec:
  return results.with_columns(col("score").rank(method="average").alias("avg_rank"))
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/results\_ranked is live — a rank column beside the scores. Ada and Cy tie on 7 and share 2.5:

```
┌────────┬───────┬──────────┐
│ player │ score │ avg_rank │
├────────┼───────┼──────────┤
│ Ada    │ 7     │ 2.5      │
├────────┼───────┼──────────┤
│ Bo     │ 5     │ 1        │
├────────┼───────┼──────────┤
│ Cy     │ 7     │ 2.5      │
└────────┴───────┴──────────┘
```

Transformed tables

results

| player | score |
| --- | --- |
| Ada | 7 |
| Bo | 5 |
| Cy | 7 |

3 rows

results\_ranked

| player | score | avg\_rank |
| --- | --- | --- |
| Ada | 7 | 2.5 |
| Bo | 5 | 1 |
| Cy | 7 | 2.5 |

3 rows

AI agent session

❯make a new table that takes the results table and ranks the score column so tied values take the lower rank

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — method="min" gives every tied row the lowest rank in the tie, which is what competition ranking means.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["results"],
  output_tables=["results_ranked"],
)
def rank_min(results: TableFrameSpec) -> TableFrameSpec:
  return results.with_columns(col("score").rank(method="min").alias("min_rank"))
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/results\_ranked is live — the tie takes 2, and 3 is skipped:

```
┌────────┬───────┬──────────┐
│ player │ score │ min_rank │
├────────┼───────┼──────────┤
│ Ada    │ 7     │ 2        │
├────────┼───────┼──────────┤
│ Bo     │ 5     │ 1        │
├────────┼───────┼──────────┤
│ Cy     │ 7     │ 2        │
└────────┴───────┴──────────┘
```

Transformed tables

results

| player | score |
| --- | --- |
| Ada | 7 |
| Bo | 5 |
| Cy | 7 |

3 rows

results\_ranked

| player | score | min\_rank |
| --- | --- | --- |
| Ada | 7 | 2 |
| Bo | 5 | 1 |
| Cy | 7 | 2 |

3 rows

AI agent session

❯make a new table that takes the results table and ranks the score column so tied values take the higher rank

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — method="max", the same tie handled from the other end.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["results"],
  output_tables=["results_ranked"],
)
def rank_max(results: TableFrameSpec) -> TableFrameSpec:
  return results.with_columns(col("score").rank(method="max").alias("max_rank"))
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/results\_ranked is live — the tie takes 3, and 2 is skipped:

```
┌────────┬───────┬──────────┐
│ player │ score │ max_rank │
├────────┼───────┼──────────┤
│ Ada    │ 7     │ 3        │
├────────┼───────┼──────────┤
│ Bo     │ 5     │ 1        │
├────────┼───────┼──────────┤
│ Cy     │ 7     │ 3        │
└────────┴───────┴──────────┘
```

Transformed tables

results

| player | score |
| --- | --- |
| Ada | 7 |
| Bo | 5 |
| Cy | 7 |

3 rows

results\_ranked

| player | score | max\_rank |
| --- | --- | --- |
| Ada | 7 | 3 |
| Bo | 5 | 1 |
| Cy | 7 | 3 |

3 rows

AI agent session

❯make a new table that takes the results table and ranks the score column with no gaps in the numbers

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — method="dense" is like min except the next distinct value takes the following integer rather than leaving a gap.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["results"],
  output_tables=["results_ranked"],
)
def rank_dense(results: TableFrameSpec) -> TableFrameSpec:
  return results.with_columns(col("score").rank(method="dense").alias("dense_rank"))
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/results\_ranked is live — the tie takes 2 and nothing is skipped:

```
┌────────┬───────┬────────────┐
│ player │ score │ dense_rank │
├────────┼───────┼────────────┤
│ Ada    │ 7     │ 2          │
├────────┼───────┼────────────┤
│ Bo     │ 5     │ 1          │
├────────┼───────┼────────────┤
│ Cy     │ 7     │ 2          │
└────────┴───────┴────────────┘
```

Transformed tables

results

| player | score |
| --- | --- |
| Ada | 7 |
| Bo | 5 |
| Cy | 7 |

3 rows

results\_ranked

| player | score | dense\_rank |
| --- | --- | --- |
| Ada | 7 | 2 |
| Bo | 5 | 1 |
| Cy | 7 | 2 |

3 rows

AI agent session

❯make a new table that takes the results table and ranks the score column so every row gets a distinct number

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — method="ordinal" gives every row its own rank, breaking ties by the order the rows arrive in. method="random" breaks them without regard to order.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["results"],
  output_tables=["results_ranked"],
)
def rank_ordinal(results: TableFrameSpec) -> TableFrameSpec:
  return results.with_columns(col("score").rank(method="ordinal").alias("rank"))
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/results\_ranked is live — every row has a distinct rank, the tie split by arrival order:

```
┌────────┬───────┬──────┐
│ player │ score │ rank │
├────────┼───────┼──────┤
│ Ada    │ 7     │ 2    │
├────────┼───────┼──────┤
│ Bo     │ 5     │ 1    │
├────────┼───────┼──────┤
│ Cy     │ 7     │ 3    │
└────────┴───────┴──────┘
```

Transformed tables

results

| player | score |
| --- | --- |
| Ada | 7 |
| Bo | 5 |
| Cy | 7 |

3 rows

results\_ranked

| player | score | rank |
| --- | --- | --- |
| Ada | 7 | 2 |
| Bo | 5 | 1 |
| Cy | 7 | 3 |

3 rows

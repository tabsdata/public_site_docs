# Reshape Data

> Covers reshaping Tabsdata tables with transformers: pivoting rows to columns with extract_as_columns(), unpivoting with extract_as_rows(), and expanding structs with unnest().

Source: https://docs.tabsdata.com/tutorials/transformations/reshape-data

## Turn row values into columns

AI agent session

❯make a new table that takes the metrics table and gives one row per host and turns each value of the metric\_name column into its own column

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — the metric names are values in a column rather than columns, so this is `extract_as_columns()`. It takes the column holding the names and the column holding the numbers, and everything not named becomes the key that rows collapse on.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["metrics"],
  output_tables=["metrics_wide"],
)
def widen_metrics(metrics: TableFrameSpec) -> TableFrameSpec:
  return metrics.extract_as_columns(
      column="metric_name",
      value_column="metric_value",
  )
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/metrics\_wide is live — 4 rows became 2, one per host, with cpu and mem as columns:

```
┌──────┬─────┬─────┐
│ host │ cpu │ mem │
├──────┼─────┼─────┤
│ web1 │ 80  │ 60  │
├──────┼─────┼─────┤
│ web2 │ 35  │ 45  │
└──────┴─────┴─────┘
```

Transformed tables

metrics

| host | metric\_name | metric\_value |
| --- | --- | --- |
| web1 | cpu | 80 |
| web1 | mem | 60 |
| web2 | cpu | 35 |
| web2 | mem | 45 |

4 rows

metrics\_wide

| host | cpu | mem |
| --- | --- | --- |
| web1 | 80 | 60 |
| web2 | 35 | 45 |

2 rows

## Turn columns into rows

AI agent session

❯make a new table that takes the sales table and folds the three month columns into one row each, per region

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `extract_as_rows()`, the inverse of extract\_as\_columns. It takes the columns to fold in, plus names for the two columns it produces: one holding the old column name, one holding its value.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["sales"],
  output_tables=["sales_long"],
)
def lengthen_sales(sales: TableFrameSpec) -> TableFrameSpec:
  return sales.extract_as_rows(
      columns=["jan_sales", "feb_sales", "mar_sales"],
      variable_name="month",
      value_name="sales",
  )
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/sales\_long is live — 1 row became 3, and month carries the old column names verbatim:

```
┌────────┬───────────┬───────┐
│ region │   month   │ sales │
├────────┼───────────┼───────┤
│ east   │ jan_sales │ 10    │
├────────┼───────────┼───────┤
│ east   │ feb_sales │ 20    │
├────────┼───────────┼───────┤
│ east   │ mar_sales │ 30    │
└────────┴───────────┴───────┘
```

Transformed tables

sales

| region | jan\_sales | feb\_sales | mar\_sales |
| --- | --- | --- | --- |
| east | 10 | 20 | 30 |

1 row

sales\_long

| region | month | sales |
| --- | --- | --- |
| east | jan\_sales | 10 |
| east | feb\_sales | 20 |
| east | mar\_sales | 30 |

3 rows

## Expand a struct column

AI agent session

❯make a new table that takes the people table and expands the fields inside the address struct column into their own columns

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `unnest("address")` replaces the struct column with one column per field, taking the field names as the new column names. The row count does not change.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["people"],
  output_tables=["people_flat"],
)
def flatten_address(people: TableFrameSpec) -> TableFrameSpec:
  return people.unnest("address")
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/people\_flat is live — address is gone, replaced by city and zip:

```
┌───────┬───────────┬───────┐
│ name  │   city    │  zip  │
├───────┼───────────┼───────┤
│ Ada   │ Austin    │ 78701 │
├───────┼───────────┼───────┤
│ Grace │ Arlington │ 22201 │
└───────┴───────────┴───────┘
```

Transformed tables

people

| name | address |
| --- | --- |
| Ada | {city: Austin, zip: 78701} |
| Grace | {city: Arlington, zip: 22201} |

2 rows

people\_flat

| name | city | zip |
| --- | --- | --- |
| Ada | Austin | 78701 |
| Grace | Arlington | 22201 |

2 rows

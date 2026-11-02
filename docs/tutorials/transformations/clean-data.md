# Clean and Sort Data

> Covers handling null and NaN values, sorting rows with sort() and its descending and nulls_last options, and changing column types with cast(), str.to_date/to_datetime/to_time/to_integer, and dt.to_string in Tabsdata transformers.

Source: https://docs.tabsdata.com/tutorials/transformations/clean-data

## Handle null values

AI agent session

❯make a new table that takes the contacts table and drops the rows that have a null in any column

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `drop_nulls()` with no arguments looks at every column, so one null anywhere takes the row.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["contacts"],
  output_tables=["contacts_complete"],
)
def drop_incomplete(contacts: TableFrameSpec) -> TableFrameSpec:
  return contacts.drop_nulls()
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/contacts\_complete is live — the row with a null email went, 2 of 3 rows kept:

```
┌──────┬───────────┐
│ name │   email   │
├──────┼───────────┤
│ Ada  │ ada@x.com │
├──────┼───────────┤
│ Cy   │ cy@x.com  │
└──────┴───────────┘
```

Transformed tables

contacts

| name | email |
| --- | --- |
| Ada | ada@x.com |
| Bo | null |
| Cy | cy@x.com |

3 rows

contacts\_complete

| name | email |
| --- | --- |
| Ada | ada@x.com |
| Cy | cy@x.com |

2 rows

AI agent session

❯make a new table that takes the contacts table and drops the rows with a null in the email or phone column, ignoring nulls elsewhere

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `drop_nulls(subset=[...])` narrows the check to those columns, so a null in any other column no longer costs you the row.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["contacts"],
  output_tables=["contacts_reachable"],
)
def drop_unreachable(contacts: TableFrameSpec) -> TableFrameSpec:
  return contacts.drop_nulls(subset=["email", "phone"])
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/contacts\_reachable is live — only email and phone were checked:

```
┌──────┬───────────┬──────────┐
│ name │   email   │  phone   │
├──────┼───────────┼──────────┤
│ Ada  │ ada@x.com │ 555-0101 │
└──────┴───────────┴──────────┘
```

Transformed tables

contacts

| name | email | phone |
| --- | --- | --- |
| Ada | ada@x.com | 555-0101 |
| Bo | null | 555-0102 |
| Cy | cy@x.com | null |

3 rows

contacts\_reachable

| name | email | phone |
| --- | --- | --- |
| Ada | ada@x.com | 555-0101 |

1 row

AI agent session

❯make a new table that takes the stock table and replaces every null in every column with 0

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `fill_null(0)` applies one value to every column, which only makes sense when they are all numeric.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["stock"],
  output_tables=["stock_filled"],
)
def fill_zeros(stock: TableFrameSpec) -> TableFrameSpec:
  return stock.fill_null(0)
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/stock\_filled is live — every null became 0:

```
┌────────┬──────────┐
│  item  │ quantity │
├────────┼──────────┤
│ widget │ 4        │
├────────┼──────────┤
│ gadget │ 0        │
└────────┴──────────┘
```

Transformed tables

stock

| item | quantity |
| --- | --- |
| widget | 4 |
| gadget | null |

2 rows

stock\_filled

| item | quantity |
| --- | --- |
| widget | 4 |
| gadget | 0 |

2 rows

AI agent session

❯make a new table that takes the accounts table and replaces the nulls in the status column with "unknown", leaving the other columns alone

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — a per-column fill, so it goes through an expression and `with_columns` rather than the frame-wide `fill_null`. Other columns keep their nulls.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["accounts"],
  output_tables=["accounts_status_filled"],
)
def fill_status(accounts: TableFrameSpec) -> TableFrameSpec:
  expr = col("status").fill_null("unknown")
  return accounts.with_columns(expr)
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/accounts\_status\_filled is live — status filled, and the nulls in other columns left as they were:

```
┌──────┬─────────┐
│ name │ status  │
├──────┼─────────┤
│ Ada  │ active  │
├──────┼─────────┤
│ Bo   │ unknown │
└──────┴─────────┘
```

Transformed tables

accounts

| name | status |
| --- | --- |
| Ada | active |
| Bo | null |

2 rows

accounts\_status\_filled

| name | status |
| --- | --- |
| Ada | active |
| Bo | unknown |

2 rows

AI agent session

❯make a new table that takes the orders table and fills the nulls with a different value in each column

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `fill_null()` takes a dict when each column needs its own value, which beats one `with_columns` expression per column.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["orders"],
  output_tables=["orders_filled"],
)
def fill_defaults(orders: TableFrameSpec) -> TableFrameSpec:
  return orders.fill_null({
      "quantity": 0,
      "status": "pending",
      "price": 0.0
  })
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/orders\_filled is live — each column took its own default:

```
┌──────────┬─────────┬───────┐
│ quantity │ status  │ price │
├──────────┼─────────┼───────┤
│ 4        │ pending │ 9.99  │
├──────────┼─────────┼───────┤
│ 0        │ shipped │ 0.0   │
└──────────┴─────────┴───────┘
```

Transformed tables

orders

| quantity | status | price |
| --- | --- | --- |
| 4 | null | 9.99 |
| null | shipped | null |

2 rows

orders\_filled

| quantity | status | price |
| --- | --- | --- |
| 4 | pending | 9.99 |
| 0 | shipped | 0.0 |

2 rows

## Handle NaN values

AI agent session

❯make a new table that takes the readings table and drops the rows that have a NaN in any column

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `drop_nans()` rather than `drop_nulls()`. NaN is a float value, not a missing one, so the null check would leave it in place.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["readings"],
  output_tables=["readings_valid"],
)
def drop_nan_rows(readings: TableFrameSpec) -> TableFrameSpec:
  return readings.drop_nans()
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/readings\_valid is live — the NaN row went:

```
┌────┬───────┬────────────┐
│ id │ ratio │ percentage │
├────┼───────┼────────────┤
│ 1  │ 0.5   │ 90         │
└────┴───────┴────────────┘
```

Transformed tables

readings

| id | ratio | percentage |
| --- | --- | --- |
| 1 | 0.5 | 90 |
| 2 | NaN | 80 |
| 3 | 0.9 | NaN |

3 rows

readings\_valid

| id | ratio | percentage |
| --- | --- | --- |
| 1 | 0.5 | 90 |

1 row

AI agent session

❯make a new table that takes the readings table and drops the rows with a NaN in the ratio or percentage column, ignoring NaN elsewhere

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `drop_nans(subset=[...])`, the same narrowing that `drop_nulls` takes.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["readings"],
  output_tables=["readings_metrics_valid"],
)
def drop_nan_metrics(readings: TableFrameSpec) -> TableFrameSpec:
  return readings.drop_nans(subset=["ratio", "percentage"])
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/readings\_metrics\_valid is live — only ratio and percentage were checked:

```
┌────┬───────┬────────────┐
│ id │ ratio │ percentage │
├────┼───────┼────────────┤
│ 1  │ 0.5   │ 90         │
└────┴───────┴────────────┘
```

Transformed tables

readings

| id | ratio | percentage |
| --- | --- | --- |
| 1 | 0.5 | 90 |
| 2 | NaN | 80 |
| 3 | 0.9 | NaN |

3 rows

readings\_metrics\_valid

| id | ratio | percentage |
| --- | --- | --- |
| 1 | 0.5 | 90 |

1 row

AI agent session

❯make a new table that takes the readings table and replaces every NaN in every column with 0.0

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `fill_nan(0.0)` across the frame. The value is a float because NaN only occurs in float columns.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["readings"],
  output_tables=["readings_nan_filled"],
)
def fill_nan_zeros(readings: TableFrameSpec) -> TableFrameSpec:
  return readings.fill_nan(0.0)
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/readings\_nan\_filled is live — every NaN became 0.0:

```
┌────┬───────┬────────────┐
│ id │ ratio │ percentage │
├────┼───────┼────────────┤
│ 1  │ 0.5   │ 90         │
├────┼───────┼────────────┤
│ 2  │ 0.0   │ 80         │
├────┼───────┼────────────┤
│ 3  │ 0.9   │ 0.0        │
└────┴───────┴────────────┘
```

Transformed tables

readings

| id | ratio | percentage |
| --- | --- | --- |
| 1 | 0.5 | 90 |
| 2 | NaN | 80 |
| 3 | 0.9 | NaN |

3 rows

readings\_nan\_filled

| id | ratio | percentage |
| --- | --- | --- |
| 1 | 0.5 | 90 |
| 2 | 0.0 | 80 |
| 3 | 0.9 | 0.0 |

3 rows

AI agent session

❯make a new table that takes the readings table and replaces the NaN in the rate column with 0.0, leaving the other columns alone

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — per-column again, so an expression through `with_columns`.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["readings"],
  output_tables=["readings_rate_filled"],
)
def fill_rate(readings: TableFrameSpec) -> TableFrameSpec:
  expr = col("rate").fill_nan(0.0)
  return readings.with_columns(expr)
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/readings\_rate\_filled is live — rate filled, NaN elsewhere untouched:

```
┌────┬──────┐
│ id │ rate │
├────┼──────┤
│ 1  │ 0.5  │
├────┼──────┤
│ 2  │ 0.0  │
└────┴──────┘
```

Transformed tables

readings

| id | rate |
| --- | --- |
| 1 | 0.5 |
| 2 | NaN |

2 rows

readings\_rate\_filled

| id | rate |
| --- | --- |
| 1 | 0.5 |
| 2 | 0.0 |

2 rows

## Sort rows

AI agent session

❯make a new table that takes the events table and sorts the rows by the date column, earliest first

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `sort("date")`, which is ascending by default.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["events"],
  output_tables=["events_sorted"],
)
def sort_by_date(events: TableFrameSpec) -> TableFrameSpec:
  return events.sort("date")
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/events\_sorted is live — same rows, earliest date first:

```
┌──────────┬────────────┬───────┐
│ category │    date    │ value │
├──────────┼────────────┼───────┤
│ a        │ 2024-01-15 │ 9     │
├──────────┼────────────┼───────┤
│ b        │ 2024-03-01 │ 2     │
├──────────┼────────────┼───────┤
│ a        │ 2024-05-20 │ 5     │
└──────────┴────────────┴───────┘
```

Transformed tables

events

| category | date | value |
| --- | --- | --- |
| b | 2024-03-01 | 2 |
| a | 2024-01-15 | 9 |
| a | 2024-05-20 | 5 |

3 rows

events\_sorted

| category | date | value |
| --- | --- | --- |
| a | 2024-01-15 | 9 |
| b | 2024-03-01 | 2 |
| a | 2024-05-20 | 5 |

3 rows

AI agent session

❯make a new table that takes the events table and sorts the rows by the date column, latest first

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `descending=True` flips it. The rows are the same rows; only their order changed.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["events"],
  output_tables=["events_sorted_desc"],
)
def sort_by_date_desc(events: TableFrameSpec) -> TableFrameSpec:
  return events.sort("date", descending=True)
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/events\_sorted\_desc is live — latest date first:

```
┌──────────┬────────────┬───────┐
│ category │    date    │ value │
├──────────┼────────────┼───────┤
│ a        │ 2024-05-20 │ 5     │
├──────────┼────────────┼───────┤
│ b        │ 2024-03-01 │ 2     │
├──────────┼────────────┼───────┤
│ a        │ 2024-01-15 │ 9     │
└──────────┴────────────┴───────┘
```

Transformed tables

events

| category | date | value |
| --- | --- | --- |
| b | 2024-03-01 | 2 |
| a | 2024-01-15 | 9 |
| a | 2024-05-20 | 5 |

3 rows

events\_sorted\_desc

| category | date | value |
| --- | --- | --- |
| a | 2024-05-20 | 5 |
| b | 2024-03-01 | 2 |
| a | 2024-01-15 | 9 |

3 rows

AI agent session

❯make a new table that takes the events table and sorts the rows by the category column ascending then the date column descending

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `sort()` takes a list of columns, and `descending` takes a list the same length so each column gets its own direction.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["events"],
  output_tables=["events_sorted_grouped"],
)
def sort_by_category(events: TableFrameSpec) -> TableFrameSpec:
  return events.sort(["category", "date"], descending=[False, True])
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/events\_sorted\_grouped is live — grouped by category, newest first inside each:

```
┌──────────┬────────────┬───────┐
│ category │    date    │ value │
├──────────┼────────────┼───────┤
│ a        │ 2024-05-20 │ 5     │
├──────────┼────────────┼───────┤
│ a        │ 2024-01-15 │ 9     │
├──────────┼────────────┼───────┤
│ b        │ 2024-03-01 │ 2     │
└──────────┴────────────┴───────┘
```

Transformed tables

events

| category | date | value |
| --- | --- | --- |
| b | 2024-03-01 | 2 |
| a | 2024-01-15 | 9 |
| a | 2024-05-20 | 5 |

3 rows

events\_sorted\_grouped

| category | date | value |
| --- | --- | --- |
| a | 2024-05-20 | 5 |
| a | 2024-01-15 | 9 |
| b | 2024-03-01 | 2 |

3 rows

AI agent session

❯make a new table that takes the readings table and sorts the rows by the value column with the nulls at the bottom

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `nulls_last=True`. Without it the nulls sort first, which is rarely what a reader of the table wants.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["readings"],
  output_tables=["readings_sorted"],
)
def sort_nulls_last(readings: TableFrameSpec) -> TableFrameSpec:
  return readings.sort("value", nulls_last=True)
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/readings\_sorted is live — nulls pushed to the bottom:

```
┌────┬───────┐
│ id │ value │
├────┼───────┤
│ 3  │ 3     │
├────┼───────┤
│ 1  │ 7     │
├────┼───────┤
│ 2  │ null  │
└────┴───────┘
```

Transformed tables

readings

| id | value |
| --- | --- |
| 1 | 7 |
| 2 | null |
| 3 | 3 |

3 rows

readings\_sorted

| id | value |
| --- | --- |
| 3 | 3 |
| 1 | 7 |
| 2 | null |

3 rows

## Change a column type

AI agent session

❯make a new table that takes the records table and casts the id column from text to an integer

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `cast(Int64)` on the column through `with_columns`. The values read the same, the type does not.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["records"],
  output_tables=["records_typed"],
)
def cast_id(records: TableFrameSpec) -> TableFrameSpec:
  expr = col("id").cast(Int64)
  return records.with_columns(expr)
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/records\_typed is live — id is Int64 now:

```
┌────┐
│ id │
├────┤
│ 1  │
├────┤
│ 2  │
└────┘
```

Transformed tables

records

| idString |
| --- |
| 1 |
| 2 |

2 rows

records\_typed

| idInt64 |
| --- |
| 1 |
| 2 |

2 rows

AI agent session

❯make a new table that takes the items table and casts the price column to a float

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `cast(Float64)`. Same values, wider type, which starts to matter once you divide with it.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["items"],
  output_tables=["items_typed"],
)
def cast_price(items: TableFrameSpec) -> TableFrameSpec:
  expr = col("price").cast(Float64)
  return items.with_columns(expr)
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/items\_typed is live — price is Float64 now:

```
┌───────┐
│ price │
├───────┤
│ 19.0  │
├───────┤
│ 4.0   │
└───────┘
```

Transformed tables

items

| priceInt64 |
| --- |
| 19 |
| 4 |

2 rows

items\_typed

| priceFloat64 |
| --- |
| 19.0 |
| 4.0 |

2 rows

AI agent session

❯make a new table that takes the accounts table and casts the is\_active column to true and false rather than 1 and 0

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `cast(Boolean)`, which reads 1 as true and 0 as false.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["accounts"],
  output_tables=["accounts_typed"],
)
def cast_active(accounts: TableFrameSpec) -> TableFrameSpec:
  expr = col("is_active").cast(Boolean)
  return accounts.with_columns(expr)
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/accounts\_typed is live — is\_active is Boolean now:

```
┌───────────┐
│ is_active │
├───────────┤
│ true      │
├───────────┤
│ false     │
└───────────┘
```

Transformed tables

accounts

| is\_activeInt64 |
| --- |
| 1 |
| 0 |

2 rows

accounts\_typed

| is\_activeBoolean |
| --- |
| true |
| false |

2 rows

AI agent session

❯make a new table that takes the orders table and casts the id column to text and the amount column to a float

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `cast()` on the frame takes a dict of column to type, shorter than one expression per column.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["orders"],
  output_tables=["orders_typed"],
)
def cast_columns(orders: TableFrameSpec) -> TableFrameSpec:
  return orders.cast({"id": String, "amount": Float64})
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/orders\_typed is live — both columns retyped in one pass:

```
┌────┬────────┐
│ id │ amount │
├────┼────────┤
│ 1  │ 19.0   │
├────┼────────┤
│ 2  │ 4.0    │
└────┴────────┘
```

Transformed tables

orders

| idInt64 | amountInt64 |
| --- | --- |
| 1 | 19 |
| 2 | 4 |

2 rows

orders\_typed

| idString | amountFloat64 |
| --- | --- |
| 1 | 19.0 |
| 2 | 4.0 |

2 rows

AI agent session

❯make a new table that takes the events table and parses the date\_str column into a real date

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `str.to_date()` with the format string. A cast will not do it: the text has to be parsed, not reinterpreted.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["events"],
  output_tables=["events_dated"],
)
def parse_date(events: TableFrameSpec) -> TableFrameSpec:
  expr = col("date_str").str.to_date("%Y-%m-%d")
  return events.with_columns(expr)
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/events\_dated is live — date\_str is a Date now:

```
┌────────────┐
│  date_str  │
├────────────┤
│ 2024-03-15 │
├────────────┤
│ 2024-11-01 │
└────────────┘
```

Transformed tables

events

| date\_strString |
| --- |
| 2024-03-15 |
| 2024-11-01 |

2 rows

events\_dated

| date\_strDate |
| --- |
| 2024-03-15 |
| 2024-11-01 |

2 rows

AI agent session

❯make a new table that takes the events table and parses the ts\_str column into a datetime

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `str.to_datetime()` with a format that carries the time as well as the date.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["events"],
  output_tables=["events_stamped"],
)
def parse_datetime(events: TableFrameSpec) -> TableFrameSpec:
  expr = col("ts_str").str.to_datetime("%Y-%m-%d %H:%M:%S")
  return events.with_columns(expr)
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/events\_stamped is live — ts\_str is a Datetime now:

```
┌─────────────────────┐
│       ts_str        │
├─────────────────────┤
│ 2024-03-15 09:42:17 │
├─────────────────────┤
│ 2024-11-01 23:05:00 │
└─────────────────────┘
```

Transformed tables

events

| ts\_strString |
| --- |
| 2024-03-15 09:42:17 |
| 2024-11-01 23:05:00 |

2 rows

events\_stamped

| ts\_strDatetime |
| --- |
| 2024-03-15 09:42:17 |
| 2024-11-01 23:05:00 |

2 rows

AI agent session

❯make a new table that takes the events table and parses the time\_str column into a time of day

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `str.to_time()`, which keeps the time and attaches no date to it.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["events"],
  output_tables=["events_timed"],
)
def parse_time(events: TableFrameSpec) -> TableFrameSpec:
  expr = col("time_str").str.to_time("%H:%M:%S")
  return events.with_columns(expr)
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/events\_timed is live — time\_str is a Time now:

```
┌──────────┐
│ time_str │
├──────────┤
│ 09:42:17 │
├──────────┤
│ 23:05:00 │
└──────────┘
```

Transformed tables

events

| time\_strString |
| --- |
| 09:42:17 |
| 23:05:00 |

2 rows

events\_timed

| time\_strTime |
| --- |
| 09:42:17 |
| 23:05:00 |

2 rows

AI agent session

❯make a new table that takes the records table and parses the num\_str column into an integer

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `str.to_integer()` parses the digits. `cast(Int64)` reinterprets, this parses.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["records"],
  output_tables=["records_parsed"],
)
def parse_integer(records: TableFrameSpec) -> TableFrameSpec:
  expr = col("num_str").str.to_integer()
  return records.with_columns(expr)
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/records\_parsed is live — num\_str is Int64 now:

```
┌─────────┐
│ num_str │
├─────────┤
│ 42      │
├─────────┤
│ 1337    │
└─────────┘
```

Transformed tables

records

| num\_strString |
| --- |
| 42 |
| 1337 |

2 rows

records\_parsed

| num\_strInt64 |
| --- |
| 42 |
| 1337 |

2 rows

AI agent session

❯make a new table that takes the events table and formats the date column as text in YYYY-MM-DD

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — the other direction, so `dt.to_string()` with the format you want out.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["events"],
  output_tables=["events_formatted"],
)
def format_date(events: TableFrameSpec) -> TableFrameSpec:
  expr = col("date").dt.to_string("%Y-%m-%d")
  return events.with_columns(expr)
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/events\_formatted is live — date is text now:

```
┌────────────┐
│    date    │
├────────────┤
│ 2024-03-15 │
├────────────┤
│ 2024-11-01 │
└────────────┘
```

Transformed tables

events

| dateDate |
| --- |
| 2024-03-15 |
| 2024-11-01 |

2 rows

events\_formatted

| dateString |
| --- |
| 2024-03-15 |
| 2024-11-01 |

2 rows

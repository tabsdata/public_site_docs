# Select and Modify Columns

> Covers Tabsdata column projection in transformers: select() with names, data-type and name-pattern selectors, position selectors, exclude(), drop(), with_columns(), lit(), and rename().

Source: https://docs.tabsdata.com/tutorials/transformations/select-columns

Projection operations allow you to select, transform, and reshape columns in your data.

Use the Tabsdata MCP Integration with claude code or openai codex to easily create new tables

## Select columns by name

AI agent session

❯make a new table that takes the persons table and selects only the first\_name and last\_name columns

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — select() takes plain column-name strings.

Called tabsdata 5 times (ctrl+o to expand)

⏺

The transformer, registered as fv20260812-2 in subscriptions:

```python
@transformer(
  input_tables=["local_files/persons"],
  output_tables=["person_names"],
)
def select_person_names(persons: TableFrameSpec) -> TableFrameSpec:
  return persons.select("first_name", "last_name")
```

⏺

Execution ep20260812-2 — Committed, 0 failures.

⏺

subscriptions/person\_names is live — 2 columns, age dropped:

```
┌────────────┬───────────┐
│ first_name │ last_name │
├────────────┼───────────┤
│ Ada        │ Lovelace  │
├────────────┼───────────┤
│ Grace      │ Hopper    │
└────────────┴───────────┘
```

Transformed tables

persons

| first\_name | last\_name | age |
| --- | --- | --- |
| Ada | Lovelace | 36 |
| Grace | Hopper | 45 |

2 rows

person\_names

| first\_name | last\_name |
| --- | --- |
| Ada | Lovelace |
| Grace | Hopper |

2 rows

## Select columns by data type

AI agent session

❯make a new table that takes the records table and selects only the columns with a numeric type

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — you named a type rather than columns, so this is select() with the cs.numeric() selector, which resolves against whatever columns the table holds at run time.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["records"],
  output_tables=["numeric_only"],
)
def select_numeric(records: TableFrameSpec) -> TableFrameSpec:
  return records.select(cs.numeric())
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/numeric\_only is live — 2 of 4 columns. name is a String and created is a Date, so both dropped out:

```
┌────┬───────┐
│ id │ price │
├────┼───────┤
│ 1  │ 9.99  │
├────┼───────┤
│ 2  │ 4.50  │
└────┴───────┘
```

Transformed tables

records

| idInt64 | priceFloat64 | nameString | createdDate |
| --- | --- | --- | --- |
| 1 | 9.99 | widget | 2024-03-15 |
| 2 | 4.50 | gadget | 2024-11-01 |

2 rows

numeric\_only

| idInt64 | priceFloat64 |
| --- | --- |
| 1 | 9.99 |
| 2 | 4.50 |

2 rows

AI agent session

❯make a new table that takes the records table and selects only the columns with a text type

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — select() with cs.string(), which matches the String dtype rather than anything that looks like text.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["records"],
  output_tables=["strings_only"],
)
def select_strings(records: TableFrameSpec) -> TableFrameSpec:
  return records.select(cs.string())
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/strings\_only is live — 1 of 4 columns:

```
┌────────┐
│  name  │
├────────┤
│ widget │
├────────┤
│ gadget │
└────────┘
```

Transformed tables

records

| idInt64 | priceFloat64 | nameString | createdDate |
| --- | --- | --- | --- |
| 1 | 9.99 | widget | 2024-03-15 |
| 2 | 4.50 | gadget | 2024-11-01 |

2 rows

strings\_only

| nameString |
| --- |
| widget |
| gadget |

2 rows

AI agent session

❯make a new table that takes the records table and selects only the columns with a date or time type

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — select() with cs.temporal(), which covers Date, Datetime and Time rather than Date alone.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["records"],
  output_tables=["dates_only"],
)
def select_temporal(records: TableFrameSpec) -> TableFrameSpec:
  return records.select(cs.temporal())
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/dates\_only is live — 1 of 4 columns:

```
┌────────────┐
│  created   │
├────────────┤
│ 2024-03-15 │
├────────────┤
│ 2024-11-01 │
└────────────┘
```

Transformed tables

records

| idInt64 | priceFloat64 | nameString | createdDate |
| --- | --- | --- | --- |
| 1 | 9.99 | widget | 2024-03-15 |
| 2 | 4.50 | gadget | 2024-11-01 |

2 rows

dates\_only

| createdDate |
| --- |
| 2024-03-15 |
| 2024-11-01 |

2 rows

AI agent session

❯make a new table that takes the records table and selects only the columns typed Int64 or Float64

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — select() with cs.by\_dtype(), which takes the dtypes by name. Narrower than cs.numeric(): an Int32 column is numeric but would not match this.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["records"],
  output_tables=["ints_and_floats"],
)
def select_by_dtype(records: TableFrameSpec) -> TableFrameSpec:
  return records.select(cs.by_dtype(Int64, Float64))
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/ints\_and\_floats is live — 2 of 4 columns:

```
┌────┬───────┐
│ id │ price │
├────┼───────┤
│ 1  │ 9.99  │
├────┼───────┤
│ 2  │ 4.50  │
└────┴───────┘
```

Transformed tables

records

| idInt64 | priceFloat64 | nameString | createdDate |
| --- | --- | --- | --- |
| 1 | 9.99 | widget | 2024-03-15 |
| 2 | 4.50 | gadget | 2024-11-01 |

2 rows

ints\_and\_floats

| idInt64 | priceFloat64 |
| --- | --- |
| 1 | 9.99 |
| 2 | 4.50 |

2 rows

## Select columns by name pattern

AI agent session

❯make a new table that takes the orders table and selects only the columns whose name starts with "customer"

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — select() with cs.starts\_with("customer\_"). Matching the prefix rather than listing the two columns survives a third one arriving upstream.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["orders"],
  output_tables=["customer_cols"],
)
def select_customer_cols(orders: TableFrameSpec) -> TableFrameSpec:
  return orders.select(cs.starts_with("customer_"))
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/customer\_cols is live — 2 of 5 columns:

```
┌─────────────┬───────────────┐
│ customer_id │ customer_name │
├─────────────┼───────────────┤
│ c1          │ Ada           │
├─────────────┼───────────────┤
│ c2          │ Grace         │
└─────────────┴───────────────┘
```

Transformed tables

orders

| customer\_id | customer\_name | price | amount\_1 | note\_id |
| --- | --- | --- | --- | --- |
| c1 | Ada | 10 | 5 | n1 |
| c2 | Grace | 20 | 7 | n2 |

2 rows

customer\_cols

| customer\_id | customer\_name |
| --- | --- |
| c1 | Ada |
| c2 | Grace |

2 rows

AI agent session

❯make a new table that takes the orders table and selects only the columns whose name ends with "\_id"

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — select() with cs.ends\_with("\_id"), so where the columns sit in the table does not matter.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["orders"],
  output_tables=["id_cols"],
)
def select_id_cols(orders: TableFrameSpec) -> TableFrameSpec:
  return orders.select(cs.ends_with("_id"))
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/id\_cols is live — customer\_id and note\_id, which are not adjacent in the source:

```
┌─────────────┬─────────┐
│ customer_id │ note_id │
├─────────────┼─────────┤
│ c1          │ n1      │
├─────────────┼─────────┤
│ c2          │ n2      │
└─────────────┴─────────┘
```

Transformed tables

orders

| customer\_id | customer\_name | price | amount\_1 | note\_id |
| --- | --- | --- | --- | --- |
| c1 | Ada | 10 | 5 | n1 |
| c2 | Grace | 20 | 7 | n2 |

2 rows

id\_cols

| customer\_id | note\_id |
| --- | --- |
| c1 | n1 |
| c2 | n2 |

2 rows

AI agent session

❯make a new table that takes the orders table and selects only the columns whose name contains "price"

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — select() with cs.contains("price"), which matches the substring anywhere in the name, so list\_price would come through too.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["orders"],
  output_tables=["price_cols"],
)
def select_price_cols(orders: TableFrameSpec) -> TableFrameSpec:
  return orders.select(cs.contains("price"))
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/price\_cols is live — 1 of 5 columns matched:

```
┌───────┐
│ price │
├───────┤
│ 10    │
├───────┤
│ 20    │
└───────┘
```

Transformed tables

orders

| customer\_id | customer\_name | price | amount\_1 | note\_id |
| --- | --- | --- | --- | --- |
| c1 | Ada | 10 | 5 | n1 |
| c2 | Grace | 20 | 7 | n2 |

2 rows

price\_cols

| price |
| --- |
| 10 |
| 20 |

2 rows

AI agent session

❯make a new table that takes the orders table and selects only the columns whose name matches "amount\_" followed by digits

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — a prefix match would also take a column like amount\_note, so this needs select() with cs.matches() and an anchored pattern.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["orders"],
  output_tables=["amount_cols"],
)
def select_amount_cols(orders: TableFrameSpec) -> TableFrameSpec:
  return orders.select(cs.matches(r"^amount_\d+$"))
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/amount\_cols is live — 1 of 5 columns matched:

```
┌──────────┐
│ amount_1 │
├──────────┤
│ 5        │
├──────────┤
│ 7        │
└──────────┘
```

Transformed tables

orders

| customer\_id | customer\_name | price | amount\_1 | note\_id |
| --- | --- | --- | --- | --- |
| c1 | Ada | 10 | 5 | n1 |
| c2 | Grace | 20 | 7 | n2 |

2 rows

amount\_cols

| amount\_1 |
| --- |
| 5 |
| 7 |

2 rows

## Select columns by position

AI agent session

❯make a new table that takes the orders table and selects only the first three columns

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — position rather than name or type, so select() with cs.first(3), counting from the left.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["orders"],
  output_tables=["first_three"],
)
def select_first_three(orders: TableFrameSpec) -> TableFrameSpec:
  return orders.select(cs.first(3))
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/first\_three is live — the leading 3 of 5 columns. A publisher that starts emitting a new column in the middle would change what this picks, without erroring:

```
┌─────────────┬───────────────┬───────┐
│ customer_id │ customer_name │ price │
├─────────────┼───────────────┼───────┤
│ c1          │ Ada           │ 10    │
├─────────────┼───────────────┼───────┤
│ c2          │ Grace         │ 20    │
└─────────────┴───────────────┴───────┘
```

Transformed tables

orders

| customer\_id | customer\_name | price | amount\_1 | note\_id |
| --- | --- | --- | --- | --- |
| c1 | Ada | 10 | 5 | n1 |
| c2 | Grace | 20 | 7 | n2 |

2 rows

first\_three

| customer\_id | customer\_name | price |
| --- | --- | --- |
| c1 | Ada | 10 |
| c2 | Grace | 20 |

2 rows

AI agent session

❯make a new table that takes the orders table and selects only the last two columns

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — select() with cs.last(2), counting from the right.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["orders"],
  output_tables=["last_two"],
)
def select_last_two(orders: TableFrameSpec) -> TableFrameSpec:
  return orders.select(cs.last(2))
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/last\_two is live — the trailing 2 of 5 columns:

```
┌──────────┬─────────┐
│ amount_1 │ note_id │
├──────────┼─────────┤
│ 5        │ n1      │
├──────────┼─────────┤
│ 7        │ n2      │
└──────────┴─────────┘
```

Transformed tables

orders

| customer\_id | customer\_name | price | amount\_1 | note\_id |
| --- | --- | --- | --- | --- |
| c1 | Ada | 10 | 5 | n1 |
| c2 | Grace | 20 | 7 | n2 |

2 rows

last\_two

| amount\_1 | note\_id |
| --- | --- |
| 5 | n1 |
| 7 | n2 |

2 rows

AI agent session

❯make a new table that takes the orders table and selects only the columns at positions 0, 2 and 4

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — select() with cs.by\_index(), which takes positions one at a time and is 0-based.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["orders"],
  output_tables=["by_position"],
)
def select_by_index(orders: TableFrameSpec) -> TableFrameSpec:
  return orders.select(cs.by_index(0, 2, 4))
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/by\_position is live — the first, third and fifth columns:

```
┌─────────────┬───────┬─────────┐
│ customer_id │ price │ note_id │
├─────────────┼───────┼─────────┤
│ c1          │ 10    │ n1      │
├─────────────┼───────┼─────────┤
│ c2          │ 20    │ n2      │
└─────────────┴───────┴─────────┘
```

Transformed tables

orders

| customer\_id | customer\_name | price | amount\_1 | note\_id |
| --- | --- | --- | --- | --- |
| c1 | Ada | 10 | 5 | n1 |
| c2 | Grace | 20 | 7 | n2 |

2 rows

by\_position

| customer\_id | price | note\_id |
| --- | --- | --- |
| c1 | 10 | n1 |
| c2 | 20 | n2 |

2 rows

## Select everything except some columns

AI agent session

❯make a new table that takes the records table and selects every column except internal\_id and metadata

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — select() with cs.exclude(), which keeps every column you did not name.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["records"],
  output_tables=["public_cols"],
)
def select_public_cols(records: TableFrameSpec) -> TableFrameSpec:
  return records.select(cs.exclude("internal_id", "metadata"))
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/public\_cols is live — id left standing:

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

| id | internal\_id | metadata |
| --- | --- | --- |
| 1 | x1 | seed |
| 2 | x2 | import |

2 rows

public\_cols

| id |
| --- |
| 1 |
| 2 |

2 rows

## Drop columns

AI agent session

❯make a new table that takes the records table and drops the col1, col2 and col3 columns

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — drop() names what goes rather than what stays, which is the shorter way round here.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["records"],
  output_tables=["records_clean"],
)
def drop_spare_cols(records: TableFrameSpec) -> TableFrameSpec:
  return records.drop("col1", "col2", "col3")
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/records\_clean is live — id left standing:

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

| id | col1 | col2 | col3 |
| --- | --- | --- | --- |
| 1 | a | b | c |
| 2 | d | e | f |

2 rows

records\_clean

| id |
| --- |
| 1 |
| 2 |

2 rows

AI agent session

❯make a new table that takes the readings table and drops every column whose name ends in \_raw

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — selectors work inside drop() as well as select(), so cs.ends\_with("\_raw") clears the family without naming each column.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["readings"],
  output_tables=["readings_clean"],
)
def drop_raw_cols(readings: TableFrameSpec) -> TableFrameSpec:
  return readings.drop(cs.ends_with("_raw"))
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/readings\_clean is live — score\_raw dropped, score and label kept:

```
┌───────┬───────┐
│ score │ label │
├───────┼───────┤
│ 9     │ high  │
├───────┼───────┤
│ 3     │ low   │
└───────┴───────┘
```

Transformed tables

readings

| scoreInt64 | score\_rawFloat64 | labelString |
| --- | --- | --- |
| 9 | 9.4 | high |
| 3 | 2.6 | low |

2 rows

readings\_clean

| scoreInt64 | labelString |
| --- | --- |
| 9 | high |
| 3 | low |

2 rows

## Add or replace columns

AI agent session

❯make a new table that takes the orders table and adds a total column, uppercases the name column, and stamps every row with a currency column

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — with\_columns() rather than select(), since it keeps every column you do not name and select() would keep only the listed ones.

Called tabsdata 4 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["orders"],
  output_tables=["orders_priced"],
)
def add_totals(orders: TableFrameSpec) -> TableFrameSpec:
  return orders.with_columns(
      (col("price") * col("quantity")).alias("total"),
      col("name").str.to_uppercase().alias("name"),
      lit("USD").alias("currency"),
  )
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/orders\_priced is live — price and quantity came through untouched, name was replaced in place because the alias reuses its name, and total and currency are new:

```
┌────────┬───────┬──────────┬───────┬──────────┐
│  name  │ price │ quantity │ total │ currency │
├────────┼───────┼──────────┼───────┼──────────┤
│ WIDGET │ 10    │ 3        │ 30    │ USD      │
├────────┼───────┼──────────┼───────┼──────────┤
│ GADGET │ 4     │ 2        │ 8     │ USD      │
└────────┴───────┴──────────┴───────┴──────────┘
```

Transformed tables

orders

| name | price | quantity |
| --- | --- | --- |
| widget | 10 | 3 |
| gadget | 4 | 2 |

2 rows

orders\_priced

| name | price | quantity | total | currency |
| --- | --- | --- | --- | --- |
| WIDGET | 10 | 3 | 30 | USD |
| GADGET | 4 | 2 | 8 | USD |

2 rows

## Add columns with literal values

AI agent session

❯make a new table that takes the records table and stamps every row with a version, status, is\_valid and pi column

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — four constants rather than expressions over existing columns, so with\_columns() with lit(), which fills a column with the same value for every row.

Called tabsdata 4 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["records"],
  output_tables=["records_stamped"],
)
def add_literals(records: TableFrameSpec) -> TableFrameSpec:
  return records.with_columns(
      lit(1).alias("version"),
      lit("active").alias("status"),
      lit(True).alias("is_valid"),
      lit(3.14159).alias("pi"),
  )
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/records\_stamped is live — 4 new columns beside the id that was already there:

```
┌────┬─────────┬────────┬──────────┬─────────┐
│ id │ version │ status │ is_valid │   pi    │
├────┼─────────┼────────┼──────────┼─────────┤
│ 1  │ 1       │ active │ true     │ 3.14159 │
├────┼─────────┼────────┼──────────┼─────────┤
│ 2  │ 1       │ active │ true     │ 3.14159 │
└────┴─────────┴────────┴──────────┴─────────┘
```

Transformed tables

records

| id |
| --- |
| 1 |
| 2 |

2 rows

records\_stamped

| id | version | status | is\_valid | pi |
| --- | --- | --- | --- | --- |
| 1 | 1 | active | true | 3.14159 |
| 2 | 1 | active | true | 3.14159 |

2 rows

## Keep only derived columns

AI agent session

❯make a new table that takes the orders table and keeps only a full\_name column and a price\_with\_tax column, both derived from other columns

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — "nothing else" makes this select() rather than with\_columns(). The expressions read columns that will not survive into the output, which is fine, they are read before the projection happens.

Called tabsdata 4 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["orders"],
  output_tables=["order_summary"],
)
def select_derived(orders: TableFrameSpec) -> TableFrameSpec:
  return orders.select(
      (col("first_name") + " " + col("last_name")).alias("full_name"),
      (col("price") * 1.1).alias("price_with_tax"),
  )
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/order\_summary is live — first\_name, last\_name and price are gone, and the columns come out in the order the expressions were listed:

```
┌──────────────┬────────────────┐
│  full_name   │ price_with_tax │
├──────────────┼────────────────┤
│ Ada Lovelace │ 11             │
├──────────────┼────────────────┤
│ Grace Hopper │ 22             │
└──────────────┴────────────────┘
```

Transformed tables

orders

| first\_name | last\_name | price |
| --- | --- | --- |
| Ada | Lovelace | 10 |
| Grace | Hopper | 20 |

2 rows

order\_summary

| full\_name | price\_with\_tax |
| --- | --- |
| Ada Lovelace | 11 |
| Grace Hopper | 22 |

2 rows

## Rename columns

AI agent session

❯make a new table that takes the records table and renames the old\_name column to new\_name and the customer\_id column to cust\_id

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — names only, no values touched, so rename() with a dict of old name to new name.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["records"],
  output_tables=["records_renamed"],
)
def rename_cols(records: TableFrameSpec) -> TableFrameSpec:
  return records.rename({
      "old_name": "new_name",
      "customer_id": "cust_id",
  })
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/records\_renamed is live — same data under new headers. This version carries the new names and every earlier version keeps the old ones, so anything downstream reading old\_name breaks on its next run:

```
┌──────────┬─────────┐
│ new_name │ cust_id │
├──────────┼─────────┤
│ Ada      │ c1      │
├──────────┼─────────┤
│ Grace    │ c2      │
└──────────┴─────────┘
```

Transformed tables

records

| old\_name | customer\_id |
| --- | --- |
| Ada | c1 |
| Grace | c2 |

2 rows

records\_renamed

| new\_name | cust\_id |
| --- | --- |
| Ada | c1 |
| Grace | c2 |

2 rows

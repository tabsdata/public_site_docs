# Filter Rows

> Filter rows in a Tabsdata transformer with filter() using col() comparisons, &, |, ~, xor, is_in, is_between, is_null, is_not_nan, and unique() with subset and keep.

Source: https://docs.tabsdata.com/tutorials/transformations/filter-rows

## Filter rows by a comparison

AI agent session

❯make a new table that takes the persons table and keeps only the rows where the age column is greater than 18

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — filter() takes a boolean expression, so this is col("age") > 18.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["persons"],
  output_tables=["adults"],
)
def filter_adults(persons: TableFrameSpec) -> TableFrameSpec:
  return persons.filter(col("age") > 18)
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/adults is live — Bo is 17, so 2 of 3 rows kept:

```
┌──────┬─────┐
│ name │ age │
├──────┼─────┤
│ Ada  │ 25  │
├──────┼─────┤
│ Cy   │ 30  │
└──────┴─────┘
```

Transformed tables

persons

| name | age |
| --- | --- |
| Ada | 25 |
| Bo | 17 |
| Cy | 30 |

3 rows

adults

| name | age |
| --- | --- |
| Ada | 25 |
| Cy | 30 |

2 rows

AI agent session

❯make a new table that takes the accounts table and keeps only the rows where the status column equals "active"

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — filter() with ==. A single = would be an assignment rather than a comparison and would not parse here.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["accounts"],
  output_tables=["active_accounts"],
)
def filter_active(accounts: TableFrameSpec) -> TableFrameSpec:
  return accounts.filter(col("status") == "active")
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/active\_accounts is live — Bo is archived, so 2 of 3 rows kept:

```
┌──────┬────────┐
│ name │ status │
├──────┼────────┤
│ Ada  │ active │
├──────┼────────┤
│ Cy   │ active │
└──────┴────────┘
```

Transformed tables

accounts

| name | status |
| --- | --- |
| Ada | active |
| Bo | archived |
| Cy | active |

3 rows

active\_accounts

| name | status |
| --- | --- |
| Ada | active |
| Cy | active |

2 rows

AI agent session

❯make a new table that takes the items table and keeps only the rows where the category column does not equal "archived"

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — filter() with !=, which keeps every row that is not archived rather than only the ones that are live today.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["items"],
  output_tables=["live_items"],
)
def filter_live(items: TableFrameSpec) -> TableFrameSpec:
  return items.filter(col("category") != "archived")
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/live\_items is live — relic dropped, 2 of 3 rows kept:

```
┌────────┬──────────┐
│  name  │ category │
├────────┼──────────┤
│ widget │ live     │
├────────┼──────────┤
│ gadget │ live     │
└────────┴──────────┘
```

Transformed tables

items

| name | category |
| --- | --- |
| widget | live |
| relic | archived |
| gadget | live |

3 rows

live\_items

| name | category |
| --- | --- |
| widget | live |
| gadget | live |

2 rows

## Combine conditions

AI agent session

❯make a new table that takes the persons table and keeps only the rows where the age column is greater than 18 and less than 65

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — & joins the two conditions, and each side needs its own parentheses because & binds tighter than >. (col("age") > 18).and\_(...) is the method form if you would rather chain.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["persons"],
  output_tables=["working_age"],
)
def filter_working_age(persons: TableFrameSpec) -> TableFrameSpec:
  return persons.filter((col("age") > 18) & (col("age") < 65))
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/working\_age is live — Bo is 17 and Cy is 70, so 1 of 3 rows kept:

```
┌──────┬─────┐
│ name │ age │
├──────┼─────┤
│ Ada  │ 25  │
└──────┴─────┘
```

Transformed tables

persons

| name | age |
| --- | --- |
| Ada | 25 |
| Bo | 17 |
| Cy | 70 |

3 rows

working\_age

| name | age |
| --- | --- |
| Ada | 25 |

1 row

AI agent session

❯make a new table that takes the accounts table and keeps only the rows where the status column is "active" or "pending"

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — | for either condition, with the same parenthesis rule as &. .or\_() is the method form.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["accounts"],
  output_tables=["open_accounts"],
)
def filter_open(accounts: TableFrameSpec) -> TableFrameSpec:
  return accounts.filter((col("status") == "active") | (col("status") == "pending"))
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/open\_accounts is live — Bo is closed, so 2 of 3 rows kept:

```
┌──────┬─────────┐
│ name │ status  │
├──────┼─────────┤
│ Ada  │ active  │
├──────┼─────────┤
│ Cy   │ pending │
└──────┴─────────┘
```

Transformed tables

accounts

| name | status |
| --- | --- |
| Ada | active |
| Bo | closed |
| Cy | pending |

3 rows

open\_accounts

| name | status |
| --- | --- |
| Ada | active |
| Cy | pending |

2 rows

AI agent session

❯make a new table that takes the records table and keeps only the rows where the is\_deleted column is false

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — is\_deleted is already Boolean, so this inverts it with ~ rather than comparing it to false. .not\_() is the method form.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["records"],
  output_tables=["live_records"],
)
def filter_live_records(records: TableFrameSpec) -> TableFrameSpec:
  return records.filter(~(col("is_deleted")))
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/live\_records is live — row 2 dropped, 2 of 3 rows kept:

```
┌────┬────────────┐
│ id │ is_deleted │
├────┼────────────┤
│ 1  │ false      │
├────┼────────────┤
│ 3  │ false      │
└────┴────────────┘
```

Transformed tables

records

| idInt64 | is\_deletedBoolean |
| --- | --- |
| 1 | false |
| 2 | true |
| 3 | false |

3 rows

live\_records

| idInt64 | is\_deletedBoolean |
| --- | --- |
| 1 | false |
| 3 | false |

2 rows

AI agent session

❯make a new table that takes the records table and keeps only the rows where exactly one of the flag\_a and flag\_b columns is true

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — "exactly one" is exclusive or, which is a method rather than an operator: col("flag\_a").xor(col("flag\_b")).

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["records"],
  output_tables=["one_flag_only"],
)
def filter_one_flag(records: TableFrameSpec) -> TableFrameSpec:
  return records.filter(col("flag_a").xor(col("flag_b")))
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/one\_flag\_only is live — row 2 has both flags and row 3 has neither, so 1 of 3 rows kept:

```
┌────┬────────┬────────┐
│ id │ flag_a │ flag_b │
├────┼────────┼────────┤
│ 1  │ true   │ false  │
└────┴────────┴────────┘
```

Transformed tables

records

| idInt64 | flag\_aBoolean | flag\_bBoolean |
| --- | --- | --- |
| 1 | true | false |
| 2 | true | true |
| 3 | false | false |

3 rows

one\_flag\_only

| idInt64 | flag\_aBoolean | flag\_bBoolean |
| --- | --- | --- |
| 1 | true | false |

1 row

## Filter by range or membership

AI agent session

❯make a new table that takes the items table and keeps only the rows where the price column is between 10 and 100

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — is\_between() rather than two comparisons joined by &, and it includes both ends of the range.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["items"],
  output_tables=["mid_price"],
)
def filter_mid_price(items: TableFrameSpec) -> TableFrameSpec:
  return items.filter(col("price").is_between(10.0, 100.0))
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/mid\_price is live — widget is 9.5 and anvil is 250, so 1 of 3 rows kept:

```
┌────────┬───────┐
│  item  │ price │
├────────┼───────┤
│ gadget │ 42    │
└────────┴───────┘
```

Transformed tables

items

| item | price |
| --- | --- |
| widget | 9.5 |
| gadget | 42 |
| anvil | 250 |

3 rows

mid\_price

| item | price |
| --- | --- |
| gadget | 42 |

1 row

AI agent session

❯make a new table that takes the offices table and keeps only the rows where the country column is either USA, Canada or Mexico

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — is\_in() with the list, which stays readable where three == conditions chained with | would not.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["offices"],
  output_tables=["north_america"],
)
def filter_north_america(offices: TableFrameSpec) -> TableFrameSpec:
  return offices.filter(col("country").is_in(["USA", "Canada", "Mexico"]))
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/north\_america is live — Lyon dropped, 2 of 3 rows kept. Mexico matched nothing, which is not an error:

```
┌──────────┬─────────┐
│   city   │ country │
├──────────┼─────────┤
│ Austin   │ USA     │
├──────────┼─────────┤
│ Montreal │ Canada  │
└──────────┴─────────┘
```

Transformed tables

offices

| city | country |
| --- | --- |
| Austin | USA |
| Lyon | France |
| Montreal | Canada |

3 rows

north\_america

| city | country |
| --- | --- |
| Austin | USA |
| Montreal | Canada |

2 rows

AI agent session

❯make a new table that takes the contacts table and keeps only the rows where the email column is not null

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — is\_not\_null() rather than != null. Comparing against null does not evaluate the way a value comparison does, so the check has to be its own method.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["contacts"],
  output_tables=["with_email"],
)
def filter_with_email(contacts: TableFrameSpec) -> TableFrameSpec:
  return contacts.filter(col("email").is_not_null())
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/with\_email is live — Bo has no email, so 2 of 3 rows kept:

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

with\_email

| name | email |
| --- | --- |
| Ada | ada@x.com |
| Cy | cy@x.com |

2 rows

AI agent session

❯make a new table that takes the records table and keeps only the rows where the optional\_field column is null

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — is\_null(), the inverse of is\_not\_null(), which is the one to reach for when the missing rows are the ones you want to look at.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["records"],
  output_tables=["missing_field"],
)
def filter_missing_field(records: TableFrameSpec) -> TableFrameSpec:
  return records.filter(col("optional_field").is_null())
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/missing\_field is live — row 1 has a value, so 2 of 3 rows kept:

```
┌────┬────────────────┐
│ id │ optional_field │
├────┼────────────────┤
│ 2  │ null           │
├────┼────────────────┤
│ 3  │ null           │
└────┴────────────────┘
```

Transformed tables

records

| id | optional\_field |
| --- | --- |
| 1 | set |
| 2 | null |
| 3 | null |

3 rows

missing\_field

| id | optional\_field |
| --- | --- |
| 2 | null |
| 3 | null |

2 rows

AI agent session

❯make a new table that takes the readings table and keeps only the rows where the ratio column is not NaN

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — is\_not\_nan() rather than is\_not\_null(). NaN is a float value rather than a missing one, so a null check would let it through.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["readings"],
  output_tables=["valid_ratios"],
)
def filter_valid_ratios(readings: TableFrameSpec) -> TableFrameSpec:
  return readings.filter(col("ratio").is_not_nan())
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/valid\_ratios is live — row 2 is NaN, so 2 of 3 rows kept:

```
┌────┬───────┐
│ id │ ratio │
├────┼───────┤
│ 1  │ 0.5   │
├────┼───────┤
│ 3  │ 1.25  │
└────┴───────┘
```

Transformed tables

readings

| id | ratio |
| --- | --- |
| 1 | 0.5 |
| 2 | NaN |
| 3 | 1.25 |

3 rows

valid\_ratios

| id | ratio |
| --- | --- |
| 1 | 0.5 |
| 3 | 1.25 |

2 rows

## Keep unique rows

AI agent session

❯make a new table that takes the visits table and removes the rows that are duplicated across every column

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — unique() with no arguments compares every column, so a row collapses only when it matches another one completely.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["visits"],
  output_tables=["visits_deduped"],
)
def dedupe_visits(visits: TableFrameSpec) -> TableFrameSpec:
  return visits.unique()
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/visits\_deduped is live — ada/mon appeared twice, so 3 of 4 rows kept:

```
┌──────┬─────┐
│ user │ day │
├──────┼─────┤
│ ada  │ mon │
├──────┼─────┤
│ bo   │ mon │
├──────┼─────┤
│ cy   │ tue │
└──────┴─────┘
```

Transformed tables

visits

| user | day |
| --- | --- |
| ada | mon |
| bo | mon |
| ada | mon |
| cy | tue |

4 rows

visits\_deduped

| user | day |
| --- | --- |
| ada | mon |
| bo | mon |
| cy | tue |

3 rows

AI agent session

❯make a new table that takes the visits table and keeps one row per customer\_id and date pair

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — unique() with subset, which decides what counts as a duplicate on those two columns alone. spend can differ between duplicates and one of them still goes.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["visits"],
  output_tables=["one_per_day"],
)
def one_visit_per_day(visits: TableFrameSpec) -> TableFrameSpec:
  return visits.unique(subset=["customer_id", "date"])
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/one\_per\_day is live — c1/mon appeared twice with different spend, so 3 of 4 rows kept:

```
┌─────────────┬──────┬───────┐
│ customer_id │ date │ spend │
├─────────────┼──────┼───────┤
│ c1          │ mon  │ 10    │
├─────────────┼──────┼───────┤
│ c2          │ tue  │ 7     │
├─────────────┼──────┼───────┤
│ c1          │ wed  │ 5     │
└─────────────┴──────┴───────┘
```

Transformed tables

visits

| customer\_id | date | spend |
| --- | --- | --- |
| c1 | mon | 10 |
| c1 | mon | 12 |
| c2 | tue | 7 |
| c1 | wed | 5 |

4 rows

one\_per\_day

| customer\_id | date | spend |
| --- | --- | --- |
| c1 | mon | 10 |
| c2 | tue | 7 |
| c1 | wed | 5 |

3 rows

AI agent session

❯make a new table that takes the visits table and keeps one row per value of the customer\_id column, the first of each

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — unique() with subset and keep="first", which takes the earliest row in each group in the order the data arrives.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["visits"],
  output_tables=["first_visit"],
)
def first_visit_per_customer(visits: TableFrameSpec) -> TableFrameSpec:
  return visits.unique(subset=["customer_id"], keep="first")
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/first\_visit is live — one row each for c1 and c2, so 2 of 4 rows kept:

```
┌─────────────┬──────┬───────┐
│ customer_id │ date │ spend │
├─────────────┼──────┼───────┤
│ c1          │ mon  │ 10    │
├─────────────┼──────┼───────┤
│ c2          │ tue  │ 7     │
└─────────────┴──────┴───────┘
```

Transformed tables

visits

| customer\_id | date | spend |
| --- | --- | --- |
| c1 | mon | 10 |
| c1 | mon | 12 |
| c2 | tue | 7 |
| c1 | wed | 5 |

4 rows

first\_visit

| customer\_id | date | spend |
| --- | --- | --- |
| c1 | mon | 10 |
| c2 | tue | 7 |

2 rows

AI agent session

❯make a new table that takes the visits table and keeps one row per value of the customer\_id column, the last of each

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — the same subset with keep="last", which takes the final row in each group instead of the first.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["visits"],
  output_tables=["latest_visit"],
)
def latest_visit_per_customer(visits: TableFrameSpec) -> TableFrameSpec:
  return visits.unique(subset=["customer_id"], keep="last")
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/latest\_visit is live — c1 is now the wed row rather than the mon one:

```
┌─────────────┬──────┬───────┐
│ customer_id │ date │ spend │
├─────────────┼──────┼───────┤
│ c1          │ wed  │ 5     │
├─────────────┼──────┼───────┤
│ c2          │ tue  │ 7     │
└─────────────┴──────┴───────┘
```

Transformed tables

visits

| customer\_id | date | spend |
| --- | --- | --- |
| c1 | mon | 10 |
| c1 | mon | 12 |
| c2 | tue | 7 |
| c1 | wed | 5 |

4 rows

latest\_visit

| customer\_id | date | spend |
| --- | --- | --- |
| c1 | wed | 5 |
| c2 | tue | 7 |

2 rows

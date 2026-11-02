# Clean and Sort Data

Source: https://docs.tabsdata.com/developer/tutorials/transformations/clean-data

Handle missing values and transform data.

## Handling Null Values

Drop rows with any null values

drop\_nulls.py

```python
from tabsdatak.api import TableFrameSpec, transformer

@transformer(
    input_tables=["contacts"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    result = tf.drop_nulls()
    return result
```

contacts

| name | email |
| --- | --- |
| Ada | ada@x.com |
| Bo | null |
| Cy | cy@x.com |

3 rows

result

| name | email |
| --- | --- |
| Ada | ada@x.com |
| Cy | cy@x.com |

2 rows

Drop rows with nulls in specific columns

drop\_nulls.py

```python
from tabsdatak.api import TableFrameSpec, transformer

@transformer(
    input_tables=["contacts"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    result = tf.drop_nulls(subset=["email", "phone"])
    return result
```

contacts

| name | email | phone |
| --- | --- | --- |
| Ada | ada@x.com | 555-0101 |
| Bo | null | 555-0102 |
| Cy | cy@x.com | null |

3 rows

result

| name | email | phone |
| --- | --- | --- |
| Ada | ada@x.com | 555-0101 |

1 row

Fill null values with a constant

fill\_null.py

```python
from tabsdatak.api import TableFrameSpec, transformer

@transformer(
    input_tables=["stock"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    result = tf.fill_null(0)
    return result
```

stock

| item | quantity |
| --- | --- |
| widget | 4 |
| gadget | null |

2 rows

result

| item | quantity |
| --- | --- |
| widget | 4 |
| gadget | 0 |

2 rows

Replace missing values in one column, leaving the others alone.

fill\_null.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["accounts"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    expr = col("status").fill_null("unknown")
    return tf.with_columns(expr)
```

accounts

| name | status |
| --- | --- |
| Ada | active |
| Bo | null |

2 rows

result

| name | status |
| --- | --- |
| Ada | active |
| Bo | unknown |

2 rows

Fill nulls in the entire TableFrame

fill\_null.py

```python
from tabsdatak.api import TableFrameSpec, transformer

@transformer(
    input_tables=["orders"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    result = tf.fill_null({
        "quantity": 0,
        "status": "pending",
        "price": 0.0
    })
    return result
```

orders

| quantity | status | price |
| --- | --- | --- |
| 4 | null | 9.99 |
| null | shipped | null |

2 rows

result

| quantity | status | price |
| --- | --- | --- |
| 4 | pending | 9.99 |
| 0 | shipped | 0.0 |

2 rows

## Handling NaN Values

For floating-point columns:

Drop rows with NaN values

drop\_nans.py

```python
from tabsdatak.api import TableFrameSpec, transformer

@transformer(
    input_tables=["readings"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    result = tf.drop_nans()
    return result
```

readings

| id | ratio | percentage |
| --- | --- | --- |
| 1 | 0.5 | 90 |
| 2 | NaN | 80 |
| 3 | 0.9 | NaN |

3 rows

result

| id | ratio | percentage |
| --- | --- | --- |
| 1 | 0.5 | 90 |

1 row

Drop rows with NaN in either of these columns, ignoring NaN elsewhere.

drop\_nans.py

```python
from tabsdatak.api import TableFrameSpec, transformer

@transformer(
    input_tables=["readings"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    result = tf.drop_nans(subset=["ratio", "percentage"])
    return result
```

readings

| id | ratio | percentage |
| --- | --- | --- |
| 1 | 0.5 | 90 |
| 2 | NaN | 80 |
| 3 | 0.9 | NaN |

3 rows

result

| id | ratio | percentage |
| --- | --- | --- |
| 1 | 0.5 | 90 |

1 row

Fill NaN values

fill\_nan.py

```python
from tabsdatak.api import TableFrameSpec, transformer

@transformer(
    input_tables=["readings"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    result = tf.fill_nan(0.0)
    return result
```

readings

| id | ratio | percentage |
| --- | --- | --- |
| 1 | 0.5 | 90 |
| 2 | NaN | 80 |
| 3 | 0.9 | NaN |

3 rows

result

| id | ratio | percentage |
| --- | --- | --- |
| 1 | 0.5 | 90 |
| 2 | 0.0 | 80 |
| 3 | 0.9 | 0.0 |

3 rows

Replace NaN in one column with a value.

fill\_nan.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["readings"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    expr = col("rate").fill_nan(0.0)
    return tf.with_columns(expr)
```

readings

| id | rate |
| --- | --- |
| 1 | 0.5 |
| 2 | NaN |

2 rows

result

| id | rate |
| --- | --- |
| 1 | 0.5 |
| 2 | 0.0 |

2 rows

## Sorting

Sort by single column (ascending)

sort.py

```python
from tabsdatak.api import TableFrameSpec, transformer

@transformer(
    input_tables=["events"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    result = tf.sort("date")
    return result
```

events

| category | date | value |
| --- | --- | --- |
| b | 2024-03-01 | 2 |
| a | 2024-01-15 | 9 |
| a | 2024-05-20 | 5 |

3 rows

result

| category | date | value |
| --- | --- | --- |
| a | 2024-01-15 | 9 |
| b | 2024-03-01 | 2 |
| a | 2024-05-20 | 5 |

3 rows

Sort descending

sort.py

```python
from tabsdatak.api import TableFrameSpec, transformer

@transformer(
    input_tables=["events"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    result = tf.sort("date", descending=True)
    return result
```

events

| category | date | value |
| --- | --- | --- |
| b | 2024-03-01 | 2 |
| a | 2024-01-15 | 9 |
| a | 2024-05-20 | 5 |

3 rows

result

| category | date | value |
| --- | --- | --- |
| a | 2024-05-20 | 5 |
| b | 2024-03-01 | 2 |
| a | 2024-01-15 | 9 |

3 rows

Sort by multiple columns

sort.py

```python
from tabsdatak.api import TableFrameSpec, transformer

@transformer(
    input_tables=["events"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    result = tf.sort(["category", "date"], descending=[False, True])
    return result
```

events

| category | date | value |
| --- | --- | --- |
| b | 2024-03-01 | 2 |
| a | 2024-01-15 | 9 |
| a | 2024-05-20 | 5 |

3 rows

result

| category | date | value |
| --- | --- | --- |
| a | 2024-05-20 | 5 |
| a | 2024-01-15 | 9 |
| b | 2024-03-01 | 2 |

3 rows

Nulls placement

sort.py

```python
from tabsdatak.api import TableFrameSpec, transformer

@transformer(
    input_tables=["readings"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    result = tf.sort("value", nulls_last=True)
    return result
```

readings

| id | value |
| --- | --- |
| 1 | 7 |
| 2 | null |
| 3 | 3 |

3 rows

result

| id | value |
| --- | --- |
| 3 | 3 |
| 1 | 7 |
| 2 | null |

3 rows

## Type Casting

Cast expression type

cast.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col
from tabsdatak.tableframe.datatypes import Int64

@transformer(
    input_tables=["records"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    expr = col("id").cast(Int64)
    return tf.with_columns(expr)
```

records

| idString |
| --- |
| 1 |
| 2 |

2 rows

result

| idInt64 |
| --- |
| 1 |
| 2 |

2 rows

Convert a column to floating point; the values read the same, the type does not.

cast.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col
from tabsdatak.tableframe.datatypes import Float64

@transformer(
    input_tables=["items"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    expr = col("price").cast(Float64)
    return tf.with_columns(expr)
```

items

| priceInt64 |
| --- |
| 19 |
| 4 |

2 rows

result

| priceFloat64 |
| --- |
| 19.0 |
| 4.0 |

2 rows

Convert 1 and 0 into true and false.

cast.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col
from tabsdatak.tableframe.datatypes import Boolean

@transformer(
    input_tables=["accounts"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    expr = col("is_active").cast(Boolean)
    return tf.with_columns(expr)
```

accounts

| is\_activeInt64 |
| --- |
| 1 |
| 0 |

2 rows

result

| is\_activeBoolean |
| --- |
| true |
| false |

2 rows

Cast entire TableFrame columns

cast.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.datatypes import Float64, String

@transformer(
    input_tables=["orders"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    result = tf.cast({"id": String, "amount": Float64})
    return result
```

orders

| idInt64 | amountInt64 |
| --- | --- |
| 1 | 19 |
| 2 | 4 |

2 rows

result

| idString | amountFloat64 |
| --- | --- |
| 1 | 19.0 |
| 2 | 4.0 |

2 rows

String to date/time

to\_date.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["events"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    expr = col("date_str").str.to_date("%Y-%m-%d")
    return tf.with_columns(expr)
```

events

| date\_strString |
| --- |
| 2024-03-15 |
| 2024-11-01 |

2 rows

result

| date\_strDate |
| --- |
| 2024-03-15 |
| 2024-11-01 |

2 rows

Parse text into a datetime using the given format.

to\_datetime.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["events"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    expr = col("ts_str").str.to_datetime("%Y-%m-%d %H:%M:%S")
    return tf.with_columns(expr)
```

events

| ts\_strString |
| --- |
| 2024-03-15 09:42:17 |
| 2024-11-01 23:05:00 |

2 rows

result

| ts\_strDatetime |
| --- |
| 2024-03-15 09:42:17 |
| 2024-11-01 23:05:00 |

2 rows

Parse text into a time of day, with no date attached.

to\_time.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["events"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    expr = col("time_str").str.to_time("%H:%M:%S")
    return tf.with_columns(expr)
```

events

| time\_strString |
| --- |
| 09:42:17 |
| 23:05:00 |

2 rows

result

| time\_strTime |
| --- |
| 09:42:17 |
| 23:05:00 |

2 rows

Parse text into an integer.

to\_integer.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["records"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    expr = col("num_str").str.to_integer()
    return tf.with_columns(expr)
```

records

| num\_strString |
| --- |
| 42 |
| 1337 |

2 rows

result

| num\_strInt64 |
| --- |
| 42 |
| 1337 |

2 rows

Date to string

to\_string.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["events"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    expr = col("date").dt.to_string("%Y-%m-%d")
    return tf.with_columns(expr)
```

events

| dateDate |
| --- |
| 2024-03-15 |
| 2024-11-01 |

2 rows

result

| dateString |
| --- |
| 2024-03-15 |
| 2024-11-01 |

2 rows

See [TableFrame API Guide](https://docs.tabsdata.com/developer/guide/tables) for the whole API in one place.

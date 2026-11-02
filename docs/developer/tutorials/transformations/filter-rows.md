# Filter Rows

Source: https://docs.tabsdata.com/developer/tutorials/transformations/filter-rows

Filter operations allow you to select rows based on conditions.

## Basic Filtering

Use `filter()` with boolean expressions:

Simple comparison

filter.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["persons"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    result = tf.filter(col("age") > 18)
    return result
```

persons

| name | age |
| --- | --- |
| Ada | 25 |
| Bo | 17 |
| Cy | 30 |

3 rows

result

| name | age |
| --- | --- |
| Ada | 25 |
| Cy | 30 |

2 rows

Equality check

filter.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["accounts"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    result = tf.filter(col("status") == "active")
    return result
```

accounts

| name | status |
| --- | --- |
| Ada | active |
| Bo | archived |
| Cy | active |

3 rows

result

| name | status |
| --- | --- |
| Ada | active |
| Cy | active |

2 rows

Not equal

filter.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["items"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    result = tf.filter(col("category") != "archived")
    return result
```

items

| name | category |
| --- | --- |
| widget | live |
| relic | archived |
| gadget | live |

3 rows

result

| name | category |
| --- | --- |
| widget | live |
| gadget | live |

2 rows

## Combining Conditions

Combine multiple conditions using logical operators:

AND conditions (two syntaxes)

filter.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["persons"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    result = tf.filter((col("age") > 18) & (col("age") < 65))
    return result
```

persons

| name | age |
| --- | --- |
| Ada | 25 |
| Bo | 17 |
| Cy | 70 |

3 rows

result

| name | age |
| --- | --- |
| Ada | 25 |

1 row

Method form of &, for chaining conditions without extra parentheses.

filter.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["persons"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    result = tf.filter((col("age") > 18).and_(col("age") < 65))
    return result
```

persons

| name | age |
| --- | --- |
| Ada | 25 |
| Bo | 17 |
| Cy | 70 |

3 rows

result

| name | age |
| --- | --- |
| Ada | 25 |

1 row

OR conditions

filter.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["accounts"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    result = tf.filter((col("status") == "active") | (col("status") == "pending"))
    return result
```

accounts

| name | status |
| --- | --- |
| Ada | active |
| Bo | closed |
| Cy | pending |

3 rows

result

| name | status |
| --- | --- |
| Ada | active |
| Cy | pending |

2 rows

Method form of |, keeping rows that satisfy either condition.

filter.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["accounts"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    result = tf.filter((col("status") == "active").or_(col("status") == "pending"))
    return result
```

accounts

| name | status |
| --- | --- |
| Ada | active |
| Bo | closed |
| Cy | pending |

3 rows

result

| name | status |
| --- | --- |
| Ada | active |
| Cy | pending |

2 rows

NOT condition

filter.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["records"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    result = tf.filter(~(col("is_deleted")))
    return result
```

records

| idInt64 | is\_deletedBoolean |
| --- | --- |
| 1 | false |
| 2 | true |
| 3 | false |

3 rows

result

| idInt64 | is\_deletedBoolean |
| --- | --- |
| 1 | false |
| 3 | false |

2 rows

Method form of ~, keeping rows where the column is false.

not.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["records"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    result = tf.filter(col("is_deleted").not_())
    return result
```

records

| idInt64 | is\_deletedBoolean |
| --- | --- |
| 1 | false |
| 2 | true |
| 3 | false |

3 rows

result

| idInt64 | is\_deletedBoolean |
| --- | --- |
| 1 | false |
| 3 | false |

2 rows

XOR condition

filter.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["records"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    result = tf.filter(col("flag_a").xor(col("flag_b")))
    return result
```

records

| idInt64 | flag\_aBoolean | flag\_bBoolean |
| --- | --- | --- |
| 1 | true | false |
| 2 | true | true |
| 3 | false | false |

3 rows

result

| idInt64 | flag\_aBoolean | flag\_bBoolean |
| --- | --- | --- |
| 1 | true | false |

1 row

## Range and Membership Checks

Between (inclusive)

is\_between.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["items"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    result = tf.filter(col("price").is_between(10.0, 100.0))
    return result
```

items

| item | price |
| --- | --- |
| widget | 9.5 |
| gadget | 42 |
| anvil | 250 |

3 rows

result

| item | price |
| --- | --- |
| gadget | 42 |

1 row

In a set of values

is\_in.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["offices"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    result = tf.filter(col("country").is_in(["USA", "Canada", "Mexico"]))
    return result
```

offices

| city | country |
| --- | --- |
| Austin | USA |
| Lyon | France |
| Montreal | Canada |

3 rows

result

| city | country |
| --- | --- |
| Austin | USA |
| Montreal | Canada |

2 rows

Null checks

is\_not\_null.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["contacts"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    result = tf.filter(col("email").is_not_null())
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

Keep only the rows missing a value in that column.

is\_null.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["records"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    result = tf.filter(col("optional_field").is_null())
    return result
```

records

| id | optional\_field |
| --- | --- |
| 1 | set |
| 2 | null |
| 3 | null |

3 rows

result

| id | optional\_field |
| --- | --- |
| 2 | null |
| 3 | null |

2 rows

NaN checks (for floating point)

is\_not\_nan.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["readings"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    result = tf.filter(col("ratio").is_not_nan())
    return result
```

readings

| id | ratio |
| --- | --- |
| 1 | 0.5 |
| 2 | NaN |
| 3 | 1.25 |

3 rows

result

| id | ratio |
| --- | --- |
| 1 | 0.5 |
| 3 | 1.25 |

2 rows

## Limiting Results

First N rows

limit.py

```python
from tabsdatak.api import TableFrameSpec, transformer

@transformer(
    input_tables=["records"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    result = tf.head(2)
    return result
```

records

| id |
| --- |
| 1 |
| 2 |
| 3 |
| 4 |

4 rows

result

| id |
| --- |
| 1 |
| 2 |

2 rows

First N rows, same result as head()

limit.py

```python
from tabsdatak.api import TableFrameSpec, transformer

@transformer(
    input_tables=["records"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    result = tf.limit(2)
    return result
```

records

| id |
| --- |
| 1 |
| 2 |
| 3 |
| 4 |

4 rows

result

| id |
| --- |
| 1 |
| 2 |

2 rows

Last N rows

limit.py

```python
from tabsdatak.api import TableFrameSpec, transformer

@transformer(
    input_tables=["records"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    result = tf.tail(2)
    return result
```

records

| id |
| --- |
| 1 |
| 2 |
| 3 |
| 4 |

4 rows

result

| id |
| --- |
| 3 |
| 4 |

2 rows

Rows starting at an offset

limit.py

```python
from tabsdatak.api import TableFrameSpec, transformer

@transformer(
    input_tables=["records"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    result = tf.slice(offset=1, length=2)
    return result
```

records

| id |
| --- |
| 1 |
| 2 |
| 3 |
| 4 |

4 rows

result

| id |
| --- |
| 2 |
| 3 |

2 rows

Single first row

limit.py

```python
from tabsdatak.api import TableFrameSpec, transformer

@transformer(
    input_tables=["records"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    result = tf.first()
    return result
```

records

| id |
| --- |
| 1 |
| 2 |
| 3 |
| 4 |

4 rows

result

| id |
| --- |
| 1 |

1 row

Single last row

limit.py

```python
from tabsdatak.api import TableFrameSpec, transformer

@transformer(
    input_tables=["records"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    result = tf.last()
    return result
```

records

| id |
| --- |
| 1 |
| 2 |
| 3 |
| 4 |

4 rows

result

| id |
| --- |
| 4 |

1 row

## Unique Values

Remove duplicate rows (De-duplication):

Unique across all columns

unique.py

```python
from tabsdatak.api import TableFrameSpec, transformer

@transformer(
    input_tables=["visits"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    result = tf.unique()
    return result
```

visits

| user | day |
| --- | --- |
| ada | mon |
| bo | mon |
| ada | mon |
| cy | tue |

4 rows

result

| user | day |
| --- | --- |
| ada | mon |
| bo | mon |
| cy | tue |

3 rows

Unique based on specific columns

unique.py

```python
from tabsdatak.api import TableFrameSpec, transformer

@transformer(
    input_tables=["visits"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    result = tf.unique(subset=["customer_id", "date"])
    return result
```

visits

| customer\_id | date | spend |
| --- | --- | --- |
| c1 | mon | 10 |
| c1 | mon | 12 |
| c2 | tue | 7 |
| c1 | wed | 5 |

4 rows

result

| customer\_id | date | spend |
| --- | --- | --- |
| c1 | mon | 10 |
| c2 | tue | 7 |
| c1 | wed | 5 |

3 rows

Keep first or last occurrence

unique.py

```python
from tabsdatak.api import TableFrameSpec, transformer

@transformer(
    input_tables=["visits"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    result = tf.unique(subset=["customer_id"], keep="first")
    return result
```

visits

| customer\_id | date | spend |
| --- | --- | --- |
| c1 | mon | 10 |
| c1 | mon | 12 |
| c2 | tue | 7 |
| c1 | wed | 5 |

4 rows

result

| customer\_id | date | spend |
| --- | --- | --- |
| c1 | mon | 10 |
| c2 | tue | 7 |

2 rows

One row per customer, keeping the last occurrence rather than the first.

unique.py

```python
from tabsdatak.api import TableFrameSpec, transformer

@transformer(
    input_tables=["visits"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    result = tf.unique(subset=["customer_id"], keep="last")
    return result
```

visits

| customer\_id | date | spend |
| --- | --- | --- |
| c1 | mon | 10 |
| c1 | mon | 12 |
| c2 | tue | 7 |
| c1 | wed | 5 |

4 rows

result

| customer\_id | date | spend |
| --- | --- | --- |
| c1 | wed | 5 |
| c2 | tue | 7 |

2 rows

See [TableFrame API Guide](https://docs.tabsdata.com/developer/guide/tables) for the whole API in one place.

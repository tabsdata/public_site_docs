# Select and Modify Columns

Source: https://docs.tabsdata.com/developer/tutorials/transformations/select-columns

Projection operations allow you to select, transform, and reshape columns in your data.

## Selecting Columns

Use `select()` to choose specific columns. Multiple syntax forms are supported:

Select a column using col() expressions

select.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["people"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    result = tf.select(col("first_name"), col("last_name"))
    return result
```

people

| first\_name | last\_name | age |
| --- | --- | --- |
| Ada | Lovelace | 36 |
| Grace | Hopper | 45 |

2 rows

result

| first\_name | last\_name |
| --- | --- |
| Ada | Lovelace |
| Grace | Hopper |

2 rows

Select a column using column names directly

select.py

```python
from tabsdatak.api import TableFrameSpec, transformer

@transformer(
    input_tables=["people"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    result = tf.select("first_name", "last_name")
    return result
```

people

| first\_name | last\_name | age |
| --- | --- | --- |
| Ada | Lovelace | 36 |
| Grace | Hopper | 45 |

2 rows

result

| first\_name | last\_name |
| --- | --- |
| Ada | Lovelace |
| Grace | Hopper |

2 rows

Select multiple columns using a list of column names

select.py

```python
from tabsdatak.api import TableFrameSpec, transformer

@transformer(
    input_tables=["people"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    result = tf.select(["first_name", "last_name"])
    return result
```

people

| first\_name | last\_name | age |
| --- | --- | --- |
| Ada | Lovelace | 36 |
| Grace | Hopper | 45 |

2 rows

result

| first\_name | last\_name |
| --- | --- |
| Ada | Lovelace |
| Grace | Hopper |

2 rows

## Column Selectors

Tabsdata provides powerful selectors to dynamically select columns by type or pattern:

**By Data Type:**

Select all numeric columns

numeric.py

```python
from tabsdatak.api import TableFrameSpec, transformer
import tabsdatak.tableframe.selectors as cs

@transformer(
    input_tables=["records"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    result = tf.select(cs.numeric())
    return result
```

records

| idInt64 | priceFloat64 | nameString | createdDate |
| --- | --- | --- | --- |
| 1 | 9.99 | widget | 2024-03-15 |
| 2 | 4.50 | gadget | 2024-11-01 |

2 rows

result

| idInt64 | priceFloat64 |
| --- | --- |
| 1 | 9.99 |
| 2 | 4.50 |

2 rows

Select all string columns

string.py

```python
from tabsdatak.api import TableFrameSpec, transformer
import tabsdatak.tableframe.selectors as cs

@transformer(
    input_tables=["records"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    result = tf.select(cs.string())
    return result
```

records

| idInt64 | priceFloat64 | nameString | createdDate |
| --- | --- | --- | --- |
| 1 | 9.99 | widget | 2024-03-15 |
| 2 | 4.50 | gadget | 2024-11-01 |

2 rows

result

| nameString |
| --- |
| widget |
| gadget |

2 rows

Select all temporal columns (date, datetime, time)

temporal.py

```python
from tabsdatak.api import TableFrameSpec, transformer
import tabsdatak.tableframe.selectors as cs

@transformer(
    input_tables=["records"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    result = tf.select(cs.temporal())
    return result
```

records

| idInt64 | priceFloat64 | nameString | createdDate |
| --- | --- | --- | --- |
| 1 | 9.99 | widget | 2024-03-15 |
| 2 | 4.50 | gadget | 2024-11-01 |

2 rows

result

| createdDate |
| --- |
| 2024-03-15 |
| 2024-11-01 |

2 rows

Select by specific dtype

by\_dtype.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.datatypes import Int64, Float64
import tabsdatak.tableframe.selectors as cs

@transformer(
    input_tables=["records"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    result = tf.select(cs.by_dtype(Int64, Float64))
    return result
```

records

| idInt64 | priceFloat64 | nameString | createdDate |
| --- | --- | --- | --- |
| 1 | 9.99 | widget | 2024-03-15 |
| 2 | 4.50 | gadget | 2024-11-01 |

2 rows

result

| idInt64 | priceFloat64 |
| --- | --- |
| 1 | 9.99 |
| 2 | 4.50 |

2 rows

**By Pattern:**

Select columns starting with a prefix

starts\_with.py

```python
from tabsdatak.api import TableFrameSpec, transformer
import tabsdatak.tableframe.selectors as cs

@transformer(
    input_tables=["orders"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    result = tf.select(cs.starts_with("customer_"))
    return result
```

orders

| customer\_id | customer\_name | price | amount\_1 | note\_id |
| --- | --- | --- | --- | --- |
| c1 | Ada | 10 | 5 | n1 |
| c2 | Grace | 20 | 7 | n2 |

2 rows

result

| customer\_id | customer\_name |
| --- | --- |
| c1 | Ada |
| c2 | Grace |

2 rows

Select columns ending with a suffix

ends\_with.py

```python
from tabsdatak.api import TableFrameSpec, transformer
import tabsdatak.tableframe.selectors as cs

@transformer(
    input_tables=["orders"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    result = tf.select(cs.ends_with("_id"))
    return result
```

orders

| customer\_id | customer\_name | price | amount\_1 | note\_id |
| --- | --- | --- | --- | --- |
| c1 | Ada | 10 | 5 | n1 |
| c2 | Grace | 20 | 7 | n2 |

2 rows

result

| customer\_id | note\_id |
| --- | --- |
| c1 | n1 |
| c2 | n2 |

2 rows

Select columns containing a substring

contains.py

```python
from tabsdatak.api import TableFrameSpec, transformer
import tabsdatak.tableframe.selectors as cs

@transformer(
    input_tables=["orders"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    result = tf.select(cs.contains("price"))
    return result
```

orders

| customer\_id | customer\_name | price | amount\_1 | note\_id |
| --- | --- | --- | --- | --- |
| c1 | Ada | 10 | 5 | n1 |
| c2 | Grace | 20 | 7 | n2 |

2 rows

result

| price |
| --- |
| 10 |
| 20 |

2 rows

Select columns matching a regex pattern

matches.py

```python
from tabsdatak.api import TableFrameSpec, transformer
import tabsdatak.tableframe.selectors as cs

@transformer(
    input_tables=["orders"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    result = tf.select(cs.matches(r"^amount_\d+$"))
    return result
```

orders

| customer\_id | customer\_name | price | amount\_1 | note\_id |
| --- | --- | --- | --- | --- |
| c1 | Ada | 10 | 5 | n1 |
| c2 | Grace | 20 | 7 | n2 |

2 rows

result

| amount\_1 |
| --- |
| 5 |
| 7 |

2 rows

**By Position:**

Select first N columns

first.py

```python
from tabsdatak.api import TableFrameSpec, transformer
import tabsdatak.tableframe.selectors as cs

@transformer(
    input_tables=["orders"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    result = tf.select(cs.first(3))
    return result
```

orders

| customer\_id | customer\_name | price | amount\_1 | note\_id |
| --- | --- | --- | --- | --- |
| c1 | Ada | 10 | 5 | n1 |
| c2 | Grace | 20 | 7 | n2 |

2 rows

result

| customer\_id | customer\_name | price |
| --- | --- | --- |
| c1 | Ada | 10 |
| c2 | Grace | 20 |

2 rows

Select last N columns

last.py

```python
from tabsdatak.api import TableFrameSpec, transformer
import tabsdatak.tableframe.selectors as cs

@transformer(
    input_tables=["orders"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    result = tf.select(cs.last(2))
    return result
```

orders

| customer\_id | customer\_name | price | amount\_1 | note\_id |
| --- | --- | --- | --- | --- |
| c1 | Ada | 10 | 5 | n1 |
| c2 | Grace | 20 | 7 | n2 |

2 rows

result

| amount\_1 | note\_id |
| --- | --- |
| 5 | n1 |
| 7 | n2 |

2 rows

Select columns by positional index

by\_index.py

```python
from tabsdatak.api import TableFrameSpec, transformer
import tabsdatak.tableframe.selectors as cs

@transformer(
    input_tables=["orders"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    result = tf.select(cs.by_index(0, 2, 4))
    return result
```

orders

| customer\_id | customer\_name | price | amount\_1 | note\_id |
| --- | --- | --- | --- | --- |
| c1 | Ada | 10 | 5 | n1 |
| c2 | Grace | 20 | 7 | n2 |

2 rows

result

| customer\_id | price | note\_id |
| --- | --- | --- |
| c1 | 10 | n1 |
| c2 | 20 | n2 |

2 rows

**Excluding Columns:**

Select all columns except specific ones

exclude.py

```python
from tabsdatak.api import TableFrameSpec, transformer
import tabsdatak.tableframe.selectors as cs

@transformer(
    input_tables=["records"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    result = tf.select(cs.exclude("internal_id", "metadata"))
    return result
```

records

| id | internal\_id | metadata |
| --- | --- | --- |
| 1 | x1 | seed |
| 2 | x2 | import |

2 rows

result

| id |
| --- |
| 1 |
| 2 |

2 rows

Combine with other selectors

ends\_with.py

```python
from tabsdatak.api import TableFrameSpec, transformer
import tabsdatak.tableframe.selectors as cs

@transformer(
    input_tables=["readings"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    result = tf.select(cs.numeric() - cs.ends_with("_raw"))
    return result
```

readings

| scoreInt64 | score\_rawFloat64 | labelString |
| --- | --- | --- |
| 9 | 9.4 | high |
| 3 | 2.6 | low |

2 rows

result

| scoreInt64 |
| --- |
| 9 |
| 3 |

2 rows

## Adding and Modifying Columns

Use `with_columns()` to add new columns or modify existing ones without dropping other columns:

Add new columns, or replace exisitng ones.

with\_columns.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col, lit

@transformer(
    input_tables=["orders"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    result = tf.with_columns(
      # Add a new calculated column
        (col("price") * col("quantity")).alias("total"),
      # Modify an existing column
        col("name").str.to_uppercase().alias("name"),
      # Add a literal value column
        lit("USD").alias("currency")
    )
    return result
```

orders

| name | price | quantity |
| --- | --- | --- |
| widget | 10 | 3 |
| gadget | 4 | 2 |

2 rows

result

| name | price | quantity | total | currency |
| --- | --- | --- | --- | --- |
| WIDGET | 10 | 3 | 30 | USD |
| GADGET | 4 | 2 | 8 | USD |

2 rows

## Dropping Columns

Use `drop()` to remove columns:

Drop a single column using the column name

drop.py

```python
from tabsdatak.api import TableFrameSpec, transformer

@transformer(
    input_tables=["records"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    result = tf.drop("temporary_column")
    return result
```

records

| id | temporary\_column |
| --- | --- |
| 1 | tmp |
| 2 | tmp |

2 rows

result

| id |
| --- |
| 1 |
| 2 |

2 rows

Drop multiple columns using column names

drop.py

```python
from tabsdatak.api import TableFrameSpec, transformer

@transformer(
    input_tables=["records"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    result = tf.drop("col1", "col2", "col3")
    return result
```

records

| id | col1 | col2 | col3 |
| --- | --- | --- | --- |
| 1 | a | b | c |
| 2 | d | e | f |

2 rows

result

| id |
| --- |
| 1 |
| 2 |

2 rows

Drop one or more columns using selectors

ends\_with.py

```python
from tabsdatak.api import TableFrameSpec, transformer
import tabsdatak.tableframe.selectors as cs

@transformer(
    input_tables=["readings"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    result = tf.drop(cs.ends_with("_raw"))
    return result
```

readings

| scoreInt64 | score\_rawFloat64 | labelString |
| --- | --- | --- |
| 9 | 9.4 | high |
| 3 | 2.6 | low |

2 rows

result

| scoreInt64 | labelString |
| --- | --- |
| 9 | high |
| 3 | low |

2 rows

## Renaming Columns

Use `rename()` to change column names:

Give columns new names, leaving their values untouched.

rename.py

```python
from tabsdatak.api import TableFrameSpec, transformer

@transformer(
    input_tables=["records"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    result = tf.rename({
        "old_name": "new_name",
        "customer_id": "cust_id"
    })
    return result
```

records

| old\_name | customer\_id |
| --- | --- |
| Ada | c1 |
| Grace | c2 |

2 rows

result

| new\_name | cust\_id |
| --- | --- |
| Ada | c1 |
| Grace | c2 |

2 rows

## Column Aliasing

Use `alias()` on expressions to name computed columns:

Keep only the listed expressions, in the order given.

select.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["orders"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    result = tf.select(
        (col("first_name") + " " + col("last_name")).alias("full_name"),
        (col("price") * 1.1).alias("price_with_tax")
    )
    return result
```

orders

| first\_name | last\_name | price |
| --- | --- | --- |
| Ada | Lovelace | 10 |
| Grace | Hopper | 20 |

2 rows

result

| full\_name | price\_with\_tax |
| --- | --- |
| Ada Lovelace | 11 |
| Grace Hopper | 22 |

2 rows

## Literal Values

Create constant value columns:

Add literal value columns

with\_columns.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import lit

@transformer(
    input_tables=["records"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    result = tf.with_columns(
        lit(1).alias("version"),
        lit("active").alias("status"),
        lit(True).alias("is_valid"),
        lit(3.14159).alias("pi")
    )
    return result
```

records

| id |
| --- |
| 1 |
| 2 |

2 rows

result

| id | version | status | is\_valid | pi |
| --- | --- | --- | --- | --- |
| 1 | 1 | active | true | 3.14159 |
| 2 | 1 | active | true | 3.14159 |

2 rows

See [TableFrame API Guide](https://docs.tabsdata.com/developer/guide/tables) for the whole API in one place.

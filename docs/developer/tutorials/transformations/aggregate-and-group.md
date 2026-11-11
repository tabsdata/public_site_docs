# Aggregate and Group

Source: https://docs.tabsdata.com/developer/tutorials/transformations/aggregate-and-group

Aggregate data to compute summary statistics.

## Basic Aggregations

Non-null count

count.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["events"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    return tf.select(col("id").count())
```

events

| id |
| --- |
| 1 |
| null |
| 3 |

3 rows

result

| id |
| --- |
| 2 |

1 row

Total count including nulls

len.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["events"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    return tf.select(col("id").len())
```

events

| id |
| --- |
| 1 |
| null |
| 3 |

3 rows

result

| id |
| --- |
| 3 |

1 row

Total of every value

sum.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["orders"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    return tf.select(col("amount").sum())
```

orders

| amount |
| --- |
| 10 |
| 20 |
| 30 |

3 rows

result

| amount |
| --- |
| 60 |

1 row

Arithmetic mean

mean.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["orders"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    return tf.select(col("amount").mean())
```

orders

| amount |
| --- |
| 10 |
| 20 |
| 30 |

3 rows

result

| amount |
| --- |
| 20 |

1 row

Middle value once sorted

median.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["orders"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    return tf.select(col("amount").median())
```

orders

| amount |
| --- |
| 10 |
| 20 |
| 30 |

3 rows

result

| amount |
| --- |
| 20 |

1 row

Earliest value

min.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["events"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    return tf.select(col("date").min())
```

events

| date |
| --- |
| 2024-03-15 |
| 2024-01-02 |

2 rows

result

| date |
| --- |
| 2024-01-02 |

1 row

Largest value

max.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["readings"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    return tf.select(col("value").max())
```

readings

| value |
| --- |
| 7 |
| 3 |

2 rows

result

| value |
| --- |
| 7 |

1 row

Value in the first row

first.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["events"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    return tf.select(col("timestamp").first())
```

events

| timestamp |
| --- |
| 09:00 |
| 17:30 |

2 rows

result

| timestamp |
| --- |
| 09:00 |

1 row

Value in the last row

last.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["events"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    return tf.select(col("timestamp").last())
```

events

| timestamp |
| --- |
| 09:00 |
| 17:30 |

2 rows

result

| timestamp |
| --- |
| 17:30 |

1 row

How many distinct values

n\_unique.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["items"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    return tf.select(col("category").n_unique())
```

items

| category |
| --- |
| tools |
| toys |
| tools |

3 rows

result

| category |
| --- |
| 2 |

1 row

## Group By Operations

Use `group_by()` to aggregate by groups:

Group rows by unique values within a single column

agg.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["sales"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    result = tf.group_by("category").agg(
        col("sales").sum().alias("total_sales"),
        col("quantity").mean().alias("avg_quantity")
    )
    return result
```

sales

| category | sales | quantity |
| --- | --- | --- |
| tools | 100 | 4 |
| toys | 40 | 2 |
| tools | 60 | 6 |

3 rows

result

| category | total\_sales | avg\_quantity |
| --- | --- | --- |
| tools | 160 | 5 |
| toys | 40 | 2 |

2 rows

Group rows by unique value combinations across two or more columns

agg.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["orders"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    result = tf.group_by("region", "product_type").agg(
        col("revenue").sum().alias("total_revenue"),
        col("order_id").count().alias("order_count")
    )
    return result
```

orders

| region | product\_type | revenue | order\_id |
| --- | --- | --- | --- |
| east | tool | 100 | o1 |
| east | tool | 50 | o2 |
| west | toy | 70 | o3 |

3 rows

result

| region | product\_type | total\_revenue | order\_count |
| --- | --- | --- | --- |
| east | tool | 150 | 2 |
| west | toy | 70 | 1 |

2 rows

Group by expression

group\_by.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["payments"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    result = tf.group_by(
        col("timestamp").dt.year().alias("year"),
        col("timestamp").dt.month().alias("month")
    ).agg(
        col("amount").sum().alias("monthly_total")
    )
    return result
```

payments

| timestamp | amount |
| --- | --- |
| 2024-01-15 10:00:00 | 30 |
| 2024-01-28 12:00:00 | 20 |
| 2024-02-02 09:00:00 | 50 |

3 rows

result

| year | month | monthly\_total |
| --- | --- | --- |
| 2024 | 1 | 50 |
| 2024 | 2 | 50 |

2 rows

## Shorthand Group Aggregations

For simple aggregations:

Count per group

count.py

```python
from tabsdatak.api import TableFrameSpec, transformer

@transformer(
    input_tables=["sales"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    result = tf.group_by("category").len(name="count")
    return result
```

sales

| category | sales |
| --- | --- |
| tools | 100 |
| toys | 40 |
| tools | 60 |

3 rows

result

| category | count |
| --- | --- |
| tools | 2 |
| toys | 1 |

2 rows

Sum per group

sum.py

```python
from tabsdatak.api import TableFrameSpec, transformer

@transformer(
    input_tables=["sales"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    result = tf.group_by("category").sum()
    return result
```

sales

| category | sales |
| --- | --- |
| tools | 100 |
| toys | 40 |
| tools | 60 |

3 rows

result

| category | sales |
| --- | --- |
| tools | 160 |
| toys | 40 |

2 rows

Mean per group

mean.py

```python
from tabsdatak.api import TableFrameSpec, transformer

@transformer(
    input_tables=["sales"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    result = tf.group_by("category").mean()
    return result
```

sales

| category | sales |
| --- | --- |
| tools | 100 |
| toys | 40 |
| tools | 60 |

3 rows

result

| category | sales |
| --- | --- |
| tools | 80 |
| toys | 40 |

2 rows

Min/Max per group

min.py

```python
from tabsdatak.api import TableFrameSpec, transformer

@transformer(
    input_tables=["sales"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    result = tf.group_by("category").min()
    return result
```

sales

| category | sales |
| --- | --- |
| tools | 100 |
| toys | 40 |
| tools | 60 |

3 rows

result

| category | sales |
| --- | --- |
| tools | 60 |
| toys | 40 |

2 rows

Largest value per group, column by column.

max.py

```python
from tabsdatak.api import TableFrameSpec, transformer

@transformer(
    input_tables=["sales"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    result = tf.group_by("category").max()
    return result
```

sales

| category | sales |
| --- | --- |
| tools | 100 |
| toys | 40 |
| tools | 60 |

3 rows

result

| category | sales |
| --- | --- |
| tools | 100 |
| toys | 40 |

2 rows

## Ranking

Assign ranks to values:

The average of the ranks that would have been assigned to all the tied values is assigned to each value.

rank.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["results"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    result = tf.with_columns(col("score").rank(method="average").alias("avg_rank"))
    return result
```

results

| player | score |
| --- | --- |
| Ada | 7 |
| Bo | 5 |
| Cy | 7 |

3 rows

result

| player | score | avg\_rank |
| --- | --- | --- |
| Ada | 7 | 2.5 |
| Bo | 5 | 1 |
| Cy | 7 | 2.5 |

3 rows

The minimum of the ranks that would have been assigned to all the tied values is assigned to each value. (This is also referred to as “competition” ranking.)

rank.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["results"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    result = tf.with_columns(col("score").rank(method="min").alias("min_rank"))
    return result
```

results

| player | score |
| --- | --- |
| Ada | 7 |
| Bo | 5 |
| Cy | 7 |

3 rows

result

| player | score | min\_rank |
| --- | --- | --- |
| Ada | 7 | 2 |
| Bo | 5 | 1 |
| Cy | 7 | 2 |

3 rows

The maximum of the ranks that would have been assigned to all the tied values is assigned to each value.

rank.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["results"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    result = tf.with_columns(col("score").rank(method="max").alias("max_rank"))
    return result
```

results

| player | score |
| --- | --- |
| Ada | 7 |
| Bo | 5 |
| Cy | 7 |

3 rows

result

| player | score | max\_rank |
| --- | --- | --- |
| Ada | 7 | 3 |
| Bo | 5 | 1 |
| Cy | 7 | 3 |

3 rows

Like ‘min’, but the rank of the next highest element is assigned the rank immediately after those assigned to the tied elements.

rank.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["results"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    result = tf.with_columns(col("score").rank(method="dense").alias("dense_rank"))
    return result
```

results

| player | score |
| --- | --- |
| Ada | 7 |
| Bo | 5 |
| Cy | 7 |

3 rows

result

| player | score | dense\_rank |
| --- | --- | --- |
| Ada | 7 | 2 |
| Bo | 5 | 1 |
| Cy | 7 | 2 |

3 rows

All values are given a distinct rank, corresponding to the order that the values occur in the Series.

rank.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["results"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    result = tf.with_columns(col("score").rank(method="ordinal").alias("rank"))
    return result
```

results

| player | score |
| --- | --- |
| Ada | 7 |
| Bo | 5 |
| Cy | 7 |

3 rows

result

| player | score | rank |
| --- | --- | --- |
| Ada | 7 | 2 |
| Bo | 5 | 1 |
| Cy | 7 | 3 |

3 rows

Like ‘ordinal’, but the rank for ties is not dependent on the order that the values occur in the Series.

rank.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["source"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    result = tf.with_columns(col("score").rank(method="random").alias("random_rank"))
    return result
```

See [TableFrame API Guide](https://docs.tabsdata.com/developer/guide/tables) for the whole API in one place.

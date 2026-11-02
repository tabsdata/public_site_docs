# Reshape Data

Source: https://docs.tabsdata.com/developer/tutorials/transformations/reshape-data

Extract specific data patterns from tables.

## Extract as Columns

Pivot unique values into columns:

Extract unique values from a column as separate columns

extract\_as\_columns.py

```python
from tabsdatak.api import TableFrameSpec, transformer

@transformer(
    input_tables=["metrics"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    result = tf.extract_as_columns(
        column="metric_name",
        value_column="metric_value"
    )
    return result
```

metrics

| host | metric\_name | metric\_value |
| --- | --- | --- |
| web1 | cpu | 80 |
| web1 | mem | 60 |
| web2 | cpu | 35 |
| web2 | mem | 45 |

4 rows

result

| host | cpu | mem |
| --- | --- | --- |
| web1 | 80 | 60 |
| web2 | 35 | 45 |

2 rows

## Extract as Rows

Unpivot columns into rows:

Melt multiple columns into rows

extract\_as\_rows.py

```python
from tabsdatak.api import TableFrameSpec, transformer

@transformer(
    input_tables=["sales"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    result = tf.extract_as_rows(
        columns=["jan_sales", "feb_sales", "mar_sales"],
        variable_name="month",
        value_name="sales"
    )
    return result
```

sales

| region | jan\_sales | feb\_sales | mar\_sales |
| --- | --- | --- | --- |
| east | 10 | 20 | 30 |

1 row

result

| region | month | sales |
| --- | --- | --- |
| east | jan\_sales | 10 |
| east | feb\_sales | 20 |
| east | mar\_sales | 30 |

3 rows

## Unnesting

Flatten nested structures:

Expands struct fields to columns

unnest.py

```python
from tabsdatak.api import TableFrameSpec, transformer

@transformer(
    input_tables=["people"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    result = tf.unnest("address")  # Expands struct fields to columns
    return result
```

people

| name | address |
| --- | --- |
| Ada | {city: Austin, zip: 78701} |
| Grace | {city: Arlington, zip: 22201} |

2 rows

result

| name | city | zip |
| --- | --- | --- |
| Ada | Austin | 78701 |
| Grace | Arlington | 22201 |

2 rows

See [TableFrame API Guide](https://docs.tabsdata.com/developer/guide/tables) for the whole API in one place.

# Concatenate Tables

Source: https://docs.tabsdata.com/developer/tutorials/transformations/concatenate-tables

Combine rows from two or more Tabsdata Tables. A transformer declares one `input_tables` entry per table and takes a parameter for each.

## Concatenation

`concat()` stacks TableFrames by appending their rows. `how` decides what happens when the inputs do not line up:

The default, so it can be left off. Every input must share the same columns and the same types.

concat.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import concat

@transformer(
    input_tables=["sales_east", "sales_west"],
    output_tables=["sales_all"],
)
def transform(east: TableFrameSpec, west: TableFrameSpec) -> TableFrameSpec:
    result = concat([east, west])
    return result
```

sales\_east

| region | month | amount |
| --- | --- | --- |
| east | jan | 10 |
| east | feb | 20 |

2 rows

sales\_west

| region | month | amount |
| --- | --- | --- |
| west | jan | 30 |
| west | feb | 40 |

2 rows

sales\_all

| region | month | amount |
| --- | --- | --- |
| east | jan | 10 |
| east | feb | 20 |
| west | jan | 30 |
| west | feb | 40 |

4 rows

Same columns required, but a column typed differently in each input is cast to a common supertype.

concat.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import concat

@transformer(
    input_tables=["sales_east", "sales_west"],
    output_tables=["sales_all"],
)
def transform(east: TableFrameSpec, west: TableFrameSpec) -> TableFrameSpec:
    result = concat([east, west], how="vertical_relaxed")
    return result
```

sales\_east

| regionString | amountInt64 |
| --- | --- |
| east | 10 |

1 row

sales\_west

| regionString | amountFloat64 |
| --- | --- |
| west | 30.5 |

1 row

sales\_all

| regionString | amountFloat64 |
| --- | --- |
| east | 10.0 |
| west | 30.5 |

2 rows

Union of the columns, with the gaps filled with null. Types must still match where a column appears in both.

concat.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import concat

@transformer(
    input_tables=["sales_east", "sales_west"],
    output_tables=["sales_all"],
)
def transform(east: TableFrameSpec, west: TableFrameSpec) -> TableFrameSpec:
    result = concat([east, west], how="diagonal")
    return result
```

sales\_east

| region | month | amount |
| --- | --- | --- |
| east | jan | 10 |

1 row

sales\_west

| region | month | discount |
| --- | --- | --- |
| west | jan | 5 |

1 row

sales\_all

| region | month | amount | discount |
| --- | --- | --- | --- |
| east | jan | 10 | null |
| west | jan | null | 5 |

2 rows

Diagonal plus supertype casting: unions the columns and reconciles the types in one pass.

concat.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import concat

@transformer(
    input_tables=["sales_east", "sales_west"],
    output_tables=["sales_all"],
)
def transform(east: TableFrameSpec, west: TableFrameSpec) -> TableFrameSpec:
    result = concat([east, west], how="diagonal_relaxed")
    return result
```

sales\_east

| regionString | amountInt64 |
| --- | --- |
| east | 10 |

1 row

sales\_west

| regionString | discountFloat64 |
| --- | --- |
| west | 5.5 |

1 row

sales\_all

| regionString | amountInt64 | discountFloat64 |
| --- | --- | --- |
| east | 10 | null |
| west | null | 5.5 |

2 rows

note

`None` entries in the list are skipped. A list that is `None`, empty, or empty once the `None` entries are dropped makes `concat()` return `None`, which leaves the output table on its current version instead of committing a new one.

See [`concat`](https://docs.tabsdata.com/api/category/tableframe/concat) for the full signature.

# Filter

> An operator that removes the rows selected by `criteria` from the target table.

Source: https://docs.tabsdata.com/api/category/dataquality/dq-operator/filter

class

```python
class Filter(
    to_table: TableNameSpec | None = None,
    include_quality_columns: IncludeQualityColumnsSpec = 'none',
    criteria: Criteria,
)
```

Bases: [CriteriaOperator](https://docs.tabsdata.com/api/category/dataquality/dq-operator/criteriaoperator)

**Categories:** dq-operator

An operator that removes the rows selected by `criteria` from the target table. Removed rows are discarded or redirected to another table.

## Examples

Drop every row a classifier failed:

```python
Filter(AnyFailed())
```

Keep them instead, in a table of their own, together with the verdict columns that explain the removal:

```python
Filter(
    AnyFailed(),
    to_table="rejected",
    include_quality_columns="criteria",
)
```

## Parameters

parameter

`to_table`[TableNameSpec](https://docs.tabsdata.com/api/module/tabsdatak-api#tabsdatak.api.TableNameSpec) | None ([str](https://docs.python.org/3/library/stdtypes.html#str) | None)

Table to redirect the removed rows to; a valid table name. If `None` (default), they are discarded.

parameter

`include_quality_columns`[IncludeQualityColumnsSpec](https://docs.tabsdata.com/api/module/tabsdatak-dataquality#tabsdatak.dataquality.IncludeQualityColumnsSpec) (Literal\['none', 'criteria', 'all'\])

Verdict columns to carry into `to_table`: `"none"`, `"criteria"` or `"all"` (default `"none"`). The target table never carries them, so any value other than `"none"` requires `to_table`.

parameter

`criteria`[Criteria](https://docs.tabsdata.com/api/category/dataquality/dq-operator/criteria)

Selects the rows to remove.

## Methods

method

`validate_quality_columns_have_a_table`

```python
def validate_quality_columns_have_a_table() -> Filter
```

method

`to_dict`

```python
def to_dict() -> dict[str, Any]
```

method

`to_json`

```python
def to_json(indent: int | None = None) -> str
```

**Parameters:**

parameter

`indent`[int](https://docs.python.org/3/builtins/functions.html#int) | None

method

`from_dict`

```python
def from_dict(d: dict[str, Any]) -> Any
```

**Parameters:**

parameter

`d`[dict](https://docs.python.org/3/builtins/stdtypes.html#dict)\[[str](https://docs.python.org/3/builtins/stdtypes.html#str), [Any](https://docs.python.org/3/library/typing.html#typing.Any)\]

method

`from_json`

```python
def from_json(s: str | bytes) -> Any
```

**Parameters:**

parameter

`s`[str](https://docs.python.org/3/builtins/stdtypes.html#str) | [bytes](https://docs.python.org/3/builtins/stdtypes.html#bytes)

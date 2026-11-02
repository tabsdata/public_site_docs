# Select

> An operator that copies the rows selected by `criteria` to another table, leaving the target table unchanged.

Source: https://docs.tabsdata.com/api/category/dataquality/dq-operator/select

class

```python
class Select(
    to_table: TableNameSpec,
    include_quality_columns: IncludeQualityColumnsSpec = 'none',
    criteria: Criteria,
)
```

Bases: [CriteriaOperator](https://docs.tabsdata.com/api/category/dataquality/dq-operator/criteriaoperator)

**Categories:** dq-operator

An operator that copies the rows selected by `criteria` to another table, leaving the target table unchanged.

## Examples

Copy the failing rows out for review, leaving the table untouched:

```python
Select(AnyFailed(), to_table="to_review")
```

## Parameters

parameter

`to_table`[TableNameSpec](https://docs.tabsdata.com/api/module/tabsdatak-api#tabsdatak.api.TableNameSpec) ([str](https://docs.python.org/3/library/stdtypes.html#str))

Table the selected rows are written to; a valid table name (required).

parameter

`include_quality_columns`[IncludeQualityColumnsSpec](https://docs.tabsdata.com/api/module/tabsdatak-dataquality#tabsdatak.dataquality.IncludeQualityColumnsSpec) (Literal\['none', 'criteria', 'all'\])

Verdict columns to carry into `to_table`: `"none"`, `"criteria"` or `"all"` (default `"none"`).

parameter

`criteria`[Criteria](https://docs.tabsdata.com/api/category/dataquality/dq-operator/criteria)

Selects the rows to copy.

## Methods

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

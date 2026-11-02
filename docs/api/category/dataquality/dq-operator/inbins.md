# InBins

> A category criteria that selects rows whose bin is one of the given bins.

Source: https://docs.tabsdata.com/api/category/dataquality/dq-operator/inbins

class

```python
class InBins(column_name: ColumnNameSpec, bins: BinsCriteriaSpec)
```

Bases: [CategoryCriteria](https://docs.tabsdata.com/api/category/dataquality/dq-operator/categorycriteria)

**Categories:** dq-operator

A category criteria that selects rows whose bin is one of the given bins. Use with [`Filter`](https://docs.tabsdata.com/api/category/dataquality/dq-operator/filter), [`Select`](https://docs.tabsdata.com/api/category/dataquality/dq-operator/select) or [`Fail`](https://docs.tabsdata.com/api/category/dataquality/dq-operator/fail).

## Examples

```python
InBins(column_name="value_category", bins={0, 1, 2, "underflow"})
```

## Parameters

parameter

`column_name`[ColumnNameSpec](https://docs.tabsdata.com/api/module/tabsdatak-dataquality#tabsdatak.dataquality.ColumnNameSpec) ([str](https://docs.python.org/3/library/stdtypes.html#str))

Name of the column holding the bin index a [`ScaleCategorizer`](https://docs.tabsdata.com/api/category/dataquality/dq-classifier/scalecategorizer) produced.

parameter

`bins`[BinsCriteriaSpec](https://docs.tabsdata.com/api/module/tabsdatak-dataquality#tabsdatak.dataquality.BinsCriteriaSpec) (Set\[StrictInt | Literal\['none', 'nan', 'underflow', 'overflow'\]\])

Bins to match; a non-empty set of bin indices (0 to 100) and/or the special bins `"none"`, `"nan"`, `"underflow"` and `"overflow"`.

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

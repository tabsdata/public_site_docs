# Summary

> An operator that writes a data quality summary (one row per classifier: verdict tallies, or bin counts for a categorizer) to a table.

Source: https://docs.tabsdata.com/api/category/dataquality/dq-operator/summary

class

```python
class Summary(
    table: TableNameSpec | None = None,
    trends: Trends | None = None,
    tags: TagsSpec | None = field(default=None, kw_only=True),
)
```

Bases: [TagOperator](https://docs.tabsdata.com/api/category/dataquality/dq-operator/tagoperator)

**Categories:** dq-operator

An operator that writes a data quality summary (one row per classifier: verdict tallies, or bin counts for a categorizer) to a table.

## Examples

```python
Summary()
```

Name the report table, and restrict it to the classifiers carrying a tag:

```python
Summary(table="orders_quality", tags=["required"])
```

Also maintain a rolling trend table with the default retention:

```python
Summary(trends=Trends())
```

## Parameters

parameter

`table`[TableNameSpec](https://docs.tabsdata.com/api/module/tabsdatak-api#tabsdatak.api.TableNameSpec) | None ([str](https://docs.python.org/3/library/stdtypes.html#str) | None)

Table to write the report to; a valid table name. If `None` (default), a table named `<target>_dq_summary` is used.

parameter

`trends`Trends | None

The rolling trend table derived from this report. If `None` (default), no trend table is maintained; pass `Trends()` for one with the default retention.

parameter

`tags`[TagsSpec](https://docs.tabsdata.com/api/module/tabsdatak-dataquality#tabsdatak.dataquality.TagsSpec) | None ([list](https://docs.python.org/3/library/stdtypes.html#list)\[[str](https://docs.python.org/3/library/stdtypes.html#str)\] | None)

Optional list of tags; only classifiers carrying a matching tag are included.

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

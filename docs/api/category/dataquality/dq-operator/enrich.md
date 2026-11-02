# Enrich

> An operator that appends each classifier's verdict column to the target table.

Source: https://docs.tabsdata.com/api/category/dataquality/dq-operator/enrich

class

```python
class Enrich(
    to_table: TableNameSpec | None = None,
    tags: TagsSpec | None = field(default=None, kw_only=True),
)
```

Bases: [TagOperator](https://docs.tabsdata.com/api/category/dataquality/dq-operator/tagoperator)

**Categories:** dq-operator

An operator that appends each classifier's verdict column to the target table. No rows are removed.

## Examples

```python
Enrich()
```

Write the enriched rows to another table instead of adding the verdict columns in place:

```python
Enrich(to_table="checked_enriched")
```

## Parameters

parameter

`to_table`[TableNameSpec](https://docs.tabsdata.com/api/module/tabsdatak-api#tabsdatak.api.TableNameSpec) | None ([str](https://docs.python.org/3/library/stdtypes.html#str) | None)

Table to write the enriched rows to; a valid table name. If `None` (default), the target table is enriched in place.

parameter

`tags`[TagsSpec](https://docs.tabsdata.com/api/module/tabsdatak-dataquality#tabsdatak.dataquality.TagsSpec) | None ([list](https://docs.python.org/3/library/stdtypes.html#list)\[[str](https://docs.python.org/3/library/stdtypes.html#str)\] | None)

Optional list of tags; only classifiers carrying a matching tag are applied.

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

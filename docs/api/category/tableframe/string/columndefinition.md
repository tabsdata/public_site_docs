# ColumnDefinition

> The column one Grok capture produces: its name and data type.

Source: https://docs.tabsdata.com/api/category/tableframe/string/columndefinition

class

```python
class ColumnDefinition(name: str | None = None, dtype: ColumnDataType = String)
```

**Categories:** projection, string

The column one Grok capture produces: its name and data type.

One of these per capture makes up the `schema` passed to `TableFrame.grok`, keyed by capture name. The captured text is parsed into `dtype`; a row that does not match leaves the column null.

## Examples

```python
tf.grok(
    "logs",
    r"%{WORD:user}-%{INT:year}",
    {
        "user": ColumnDefinition("user", String),
        "year": ColumnDefinition("year", Int64),
    },
)
```

A `name` that differs from the capture renames the column it produces -- here the `user` capture lands in a column called `who`:

```python
tf.grok(
    "logs",
    r"%{WORD:user}-.*",
    {"user": ColumnDefinition("who", String)},
)
```

## Parameters

parameter

`name`[str](https://docs.python.org/3/builtins/stdtypes.html#str) | None

Name of the column to add. `None` (the default) keeps the capture's own name, and any other value renames it.

parameter

`dtype`[ColumnDataType](https://docs.tabsdata.com/api/category/tableframe/columndatatype) (DataType | [type](https://docs.python.org/3/library/functions.html#type)\[DataType\])

Data type the captured text is parsed into, from `tabsdatak.tableframe.datatypes` -- a type ([`Int64`](https://docs.tabsdata.com/api/module/tabsdatak-tableframe-datatypes#tabsdatak.tableframe.datatypes.Int64)) or an instance where it is parameterized (`Datetime("us")`). Defaults to [`String`](https://docs.tabsdata.com/api/module/tabsdatak-tableframe-datatypes#tabsdatak.tableframe.datatypes.String), which keeps the text as captured.

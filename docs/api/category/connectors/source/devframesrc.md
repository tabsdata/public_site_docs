# DevFrameSrc

> Source emitting in-line dataframes for `@publisher` as `LazyFrame` s -- one slot per `Data`.

Source: https://docs.tabsdata.com/api/category/connectors/source/devframesrc

class

```python
class DevFrameSrc(data: list[Data])
```

Bases: [Src](https://docs.tabsdata.com/api/category/connectors/source/src)

**Categories:** source

Source emitting in-line dataframes for `@publisher` as `LazyFrame`\\ s -- one slot per [`Data`](https://docs.tabsdata.com/api/category/connectors/source/data).

Emits what [`DataGenSrc`](https://docs.tabsdata.com/api/category/connectors/source/datagensrc) emits, chunking included.

## Examples

```python
@publisher(
    source=DevFrameSrc(data=[Data(rows_df, chunk_size=5)]),
    output_tables=["rows"],
)
def gen(rows: TableFrameSpec):
    return rows
```

## Parameters

parameter

`data`[list](https://docs.python.org/3/builtins/stdtypes.html#list)\[[Data](https://docs.tabsdata.com/api/category/connectors/source/data)\]

The [`Data`](https://docs.tabsdata.com/api/category/connectors/source/data) entries to emit, one output slot each. Their combined base64-parquet size may not exceed 10 MB.

## Methods

method

`validate`

```python
def validate()
```

Validate the combined [`Data`](https://docs.tabsdata.com/api/category/connectors/source/data) payload fits the 10 MB budget.

Called by the framework; raises `DevValidateException`.

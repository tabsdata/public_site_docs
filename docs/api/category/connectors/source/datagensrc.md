# DataGenSrc

> Source emitting in-line dataframes for `@publisher` -- one slot per `Data`.

Source: https://docs.tabsdata.com/api/category/connectors/source/datagensrc

class

```python
class DataGenSrc(data: list[Data])
```

Bases: [Src](https://docs.tabsdata.com/api/category/connectors/source/src)

**Categories:** source

Source emitting in-line dataframes for `@publisher` -- one slot per [`Data`](https://docs.tabsdata.com/api/category/connectors/source/data).

## Examples

Publish multiple in-line frames, one output slot per [`Data`](https://docs.tabsdata.com/api/category/connectors/source/data):

```python
@publisher(
    source=DataGenSrc(data=[Data(rows_df), Data(narrow_df)]),
    output_tables=["rows", "narrow"],
)
def gen(rows: TableFrameSpec, narrow: TableFrameSpec):
    return rows, narrow
```

Chunked emission -- `chunk_size` emits the next N rows each run; re-run to walk the frame, and the slot arrives as `None` once exhausted:

```python
@publisher(
    source=DataGenSrc(data=[Data(big_df, chunk_size=5)]),
    output_tables=["chunk"],
)
def gen_chunk(chunk: TableFrameSpec):
    return chunk
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

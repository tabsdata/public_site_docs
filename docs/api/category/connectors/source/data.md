# Data

> One dataframe emitted by `DataGenSrc` or `DevFrameSrc`, optionally chunked.

Source: https://docs.tabsdata.com/api/category/connectors/source/data

class

```python
class Data(df: Any, chunk_size: int | None = None)
```

**Categories:** source

One dataframe emitted by [`DataGenSrc`](https://docs.tabsdata.com/api/category/connectors/source/datagensrc) or [`DevFrameSrc`](https://docs.tabsdata.com/api/category/connectors/source/devframesrc), optionally chunked.

A [`Data`](https://docs.tabsdata.com/api/category/connectors/source/data) wraps a Polars or Pandas dataframe (a Pandas frame is converted to Polars on construction) plus a per-run `chunk_size`:

-   `chunk_size=None` -- the whole dataframe is emitted on every run.
-   `chunk_size=N` -- `N` rows are emitted per run, advancing an offset kept in the plugin's per-flow state; once the offset reaches the end the slot yields `None` (no more rows).

On the wire a [`Data`](https://docs.tabsdata.com/api/category/connectors/source/data) serialises to `{"parquet": <base64>, "chunk_size": <int|null>}`: the dataframe is written to parquet and base64-encoded on serialisation, and decoded back to a Polars frame on deserialisation so the plugin can hand it over as its output. Like [`Secret`](https://docs.tabsdata.com/api/category/connectors/credentials/secret), it round-trips via its own pydantic core schema rather than the descriptor envelope.

## Parameters

parameter

`df`[Any](https://docs.python.org/3/library/typing.html#typing.Any)

A Polars or Pandas `DataFrame` to emit.

parameter

`chunk_size`[int](https://docs.python.org/3/builtins/functions.html#int) | None

Optional positive row count per run; `None` (the default) emits the whole frame every run.

## Properties

property

`frame`[Any](https://docs.python.org/3/library/typing.html#typing.Any)

The wrapped dataframe as a Polars `DataFrame`.

## Methods

method

`parquet_b64`

```python
def parquet_b64() -> str
```

The dataframe as base64-encoded parquet (computed once).

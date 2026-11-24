# stream_publisher

> Decorate a function as a stream publisher.

Source: https://docs.tabsdata.com/api/category/functions/functions/stream-publisher

function

```python
def stream_publisher(
    source: StreamSrc,
    output_tables: TableNamesSpec,
    *,
    batch_min_secs: int | None = None,
    batch_max_secs: int | None = None,
    batch_idle_secs: int | None = None,
    batch_max_rows: int | None = None,
    batch_max_bytes: int | None = None,
    on_tables: OnTablesActionSpec | None = None,
    flush_interval_mins: FlushIntervalSpec | None = None,
) -> Callable
```

**Categories:** functions

Decorate a function as a stream publisher.

Consumes a long-lived change stream (CDC, log/queue tail). The function takes one [`TableFramesSpec`](https://docs.tabsdata.com/api/module/tabsdatak-api#tabsdatak.api.TableFramesSpec) parameter per source slot (always array mode) plus an _optional_ trailing `ctx: TransactionCtx`, and returns one [`TableFrame`](https://docs.tabsdata.com/api/category/tableframe/tableframe/tableframe) per output table. The function runs once per batch, in the transaction that commits it, so `ctx` is that transaction's context. A slot with no data in the batch holds one empty frame with the columns of the last batch that had data, and is `[]` while no batch has had data for it.

Each batch is one unit: its outputs commit in the same transaction or not at all, so the tables of one stream advance together.

Several outputs are annotated as a fixed-length tuple, one element per output; `tuple[TableFrameSpec, ...]` is refused at import.

The batch thresholds bound the batches the function receives, the same way for every stream source (see [`BatchThresholds`](https://docs.tabsdata.com/api/category/functions/functions/batchthresholds)): at least one of `batch_max_secs`, `batch_max_rows` and `batch_max_bytes` is required. When a stream batch closes, it is staged for processing, and at that point the source's position (such as the Kafka offsets) is committed. The staged batch is then scheduled for processing, which may not start right away because a previous batch may still be processing. Its table version is written when that processing ends.

The stream starts consuming as soon as the function is registered. To register the functions that read its tables first, register it with `tdk fn register --disabled`, and start it with `tdk stream enable` once they are in place.

## Parameters

parameter

`source`[StreamSrc](https://docs.tabsdata.com/api/category/connectors/source/streamsrc)

The [`StreamSrc`](https://docs.tabsdata.com/api/category/connectors/source/streamsrc) to consume.

parameter

`output_tables`[TableNamesSpec](https://docs.tabsdata.com/api/module/tabsdatak-api#tabsdatak.api.TableNamesSpec) ([list](https://docs.python.org/3/library/stdtypes.html#list)\[[str](https://docs.python.org/3/library/stdtypes.html#str)\])

Non-empty list of local table names to emit, one per return slot (valid table names, see [`publisher`](https://docs.tabsdata.com/api/category/functions/functions/publisher)).

parameter

`batch_min_secs`[int](https://docs.python.org/3/builtins/functions.html#int) | None

Shortest interval between two batches, 60 by default and never less.

parameter

`batch_max_secs`[int](https://docs.python.org/3/builtins/functions.html#int) | None

Longest interval between two batches while data waits; `None` (the default) for no time limit.

parameter

`batch_idle_secs`[int](https://docs.python.org/3/builtins/functions.html#int) | None

Longest interval between two batches while no data waits; `None` (the default) for no empty batches.

parameter

`batch_max_rows`[int](https://docs.python.org/3/builtins/functions.html#int) | None

Rows that stage a batch; `None` (the default) for no limit.

parameter

`batch_max_bytes`[int](https://docs.python.org/3/builtins/functions.html#int) | None

Bytes that stage a batch; `None` (the default) for no limit.

parameter

`on_tables`[OnTablesActionSpec](https://docs.tabsdata.com/api/module/tabsdatak-api#tabsdatak.api.OnTablesActionSpec) | None ([list](https://docs.python.org/3/library/stdtypes.html#list)\[[OnTablesAction](https://docs.tabsdata.com/api/module/tabsdatak-api#tabsdatak.api.OnTablesAction)\] | None)

Optional list of [`OnTablesAction`](https://docs.tabsdata.com/api/module/tabsdatak-api#tabsdatak.api.OnTablesAction) side-effects.

parameter

`flush_interval_mins`[FlushIntervalSpec](https://docs.tabsdata.com/api/module/tabsdatak-api#tabsdatak.api.FlushIntervalSpec) | None ([int](https://docs.python.org/3/library/functions.html#int) | None)

Deprecated, replaced by `batch_max_secs`: taken as `batch_max_secs = flush_interval_mins * 60`, with a warning, and refused next to any batch setting.

## Returns

The decorator that wraps the function as a stream-publisher

## Raises

-   `ApiException` — If the function signature is invalid, if the batch thresholds are not consistent, or if `flush_interval_mins` is given next to a batch threshold.

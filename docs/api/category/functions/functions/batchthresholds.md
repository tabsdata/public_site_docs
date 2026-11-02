# BatchThresholds

> How a stream publisher's batches are bounded in time and size.

Source: https://docs.tabsdata.com/api/category/functions/functions/batchthresholds

class

```python
class BatchThresholds(
    min_secs: BatchSecondsSpec = _api.BATCH_FLOOR_SECS,
    max_secs: BatchSecondsSpec | None = None,
    idle_secs: BatchSecondsSpec | None = None,
    max_rows: BatchRowsSpec | None = None,
    max_bytes: BatchBytesSpec | None = None,
)
```

**Categories:** functions

How a stream publisher's batches are bounded in time and size.

A batch is the set of files one function run receives. Batches are spaced at least `min_secs` apart; with data waiting, one is staged at most `max_secs` after the previous one, or earlier once it holds `max_rows` rows or `max_bytes` bytes; with nothing waiting, an empty one is staged `idle_secs` after the previous one, so the function runs on a cadence while the source is quiet. A `None` is no limit, and at least one of `max_secs`, `max_rows` and `max_bytes` is set, so data never waits forever.

## Parameters

parameter

`min_secs`[BatchSecondsSpec](https://docs.tabsdata.com/api/module/tabsdatak-api#tabsdatak.api.BatchSecondsSpec) ([int](https://docs.python.org/3/library/functions.html#int))

Shortest interval between two batches, 60 by default and never less.

parameter

`max_secs`[BatchSecondsSpec](https://docs.tabsdata.com/api/module/tabsdatak-api#tabsdatak.api.BatchSecondsSpec) | None ([int](https://docs.python.org/3/library/functions.html#int) | None)

Longest interval between two batches while data waits.

parameter

`idle_secs`[BatchSecondsSpec](https://docs.tabsdata.com/api/module/tabsdatak-api#tabsdatak.api.BatchSecondsSpec) | None ([int](https://docs.python.org/3/library/functions.html#int) | None)

Longest interval between two batches while no data waits, `None` (the default) for no empty batches.

parameter

`max_rows`[BatchRowsSpec](https://docs.tabsdata.com/api/module/tabsdatak-api#tabsdatak.api.BatchRowsSpec) | None ([int](https://docs.python.org/3/library/functions.html#int) | None)

Rows that stage a batch as soon as `min_secs` allows.

parameter

`max_bytes`[BatchBytesSpec](https://docs.tabsdata.com/api/module/tabsdatak-api#tabsdatak.api.BatchBytesSpec) | None ([int](https://docs.python.org/3/library/functions.html#int) | None)

Bytes that stage a batch as soon as `min_secs` allows.

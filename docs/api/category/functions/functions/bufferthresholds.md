# BufferThresholds

> How a stream publisher's in-memory buffer is bounded before it is written to a file: `max_rows` rows, `max_bytes` bytes (`None` for no byte limit) or `max_secs` since the last write.

Source: https://docs.tabsdata.com/api/category/functions/functions/bufferthresholds

class

```python
class BufferThresholds(
    max_rows: BatchRowsSpec,
    max_bytes: BatchBytesSpec | None,
    max_secs: BatchSecondsSpec,
)
```

**Categories:** functions

How a stream publisher's in-memory buffer is bounded before it is written to a file: `max_rows` rows, `max_bytes` bytes (`None` for no byte limit) or `max_secs` since the last write.

## Parameters

parameter

`max_rows`[BatchRowsSpec](https://docs.tabsdata.com/api/module/tabsdatak-api#tabsdatak.api.BatchRowsSpec) ([int](https://docs.python.org/3/library/functions.html#int))

parameter

`max_bytes`[BatchBytesSpec](https://docs.tabsdata.com/api/module/tabsdatak-api#tabsdatak.api.BatchBytesSpec) | None ([int](https://docs.python.org/3/library/functions.html#int) | None)

parameter

`max_secs`[BatchSecondsSpec](https://docs.tabsdata.com/api/module/tabsdatak-api#tabsdatak.api.BatchSecondsSpec) ([int](https://docs.python.org/3/library/functions.html#int))

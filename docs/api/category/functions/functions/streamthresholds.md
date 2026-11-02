# StreamThresholds

> The thresholds of a stream publisher's data flow, one substructure per level: `batch` (what a function run receives), `buffer` (the in-memory buffer written to files) and `poll` (the source polling).

Source: https://docs.tabsdata.com/api/category/functions/functions/streamthresholds

class

```python
class StreamThresholds(
    batch: BatchThresholds,
    buffer: BufferThresholds | None = None,
    poll: PollThresholds | None = None,
)
```

**Categories:** functions

The thresholds of a stream publisher's data flow, one substructure per level: `batch` (what a function run receives), `buffer` (the in-memory buffer written to files) and `poll` (the source polling). The batch thresholds come from the [`stream_publisher`](https://docs.tabsdata.com/api/category/functions/functions/stream-publisher) definition; the others are `None` there and filled in by the connector from its own settings until they move to the definition as well.

## Parameters

parameter

`batch`[BatchThresholds](https://docs.tabsdata.com/api/category/functions/functions/batchthresholds)

parameter

`buffer`[BufferThresholds](https://docs.tabsdata.com/api/category/functions/functions/bufferthresholds) | None

parameter

`poll`[PollThresholds](https://docs.tabsdata.com/api/category/functions/functions/pollthresholds) | None

# Functions

Source: https://docs.tabsdata.com/api/category/functions/functions/

|  |  |
| --- | --- |
| [`BatchThresholds`](https://docs.tabsdata.com/api/category/functions/functions/batchthresholds) | How a stream publisher's batches are bounded in time and size. |
| [`BufferThresholds`](https://docs.tabsdata.com/api/category/functions/functions/bufferthresholds) | How a stream publisher's in-memory buffer is bounded before it is written to a file: `max_rows` rows, `max_bytes` bytes (`None` for no byte limit) or `max_secs` since the last write. |
| [`FlowCtx`](https://docs.tabsdata.com/api/category/functions/functions/flowctx) | Flow-level identifiers (project / collection / function) shared by every role that runs inside a trx -- plugins _and_ user-decorated functions. |
| [`FunctionCtx`](https://docs.tabsdata.com/api/category/functions/functions/functionctx) | Context handed to a user-decorated function (`@publisher` / `@transformer` / `@subscriber`) that declares a trailing `ctx` parameter. |
| [`PollThresholds`](https://docs.tabsdata.com/api/category/functions/functions/pollthresholds) | How a stream publisher polls its source: `max_secs` is the budget of one ingestion iteration, `idle_secs` the wait before the next one when the iteration read nothing. |
| [`publisher`](https://docs.tabsdata.com/api/category/functions/functions/publisher) | Decorate a function as a batch publisher. |
| [`stream_publisher`](https://docs.tabsdata.com/api/category/functions/functions/stream-publisher) | Decorate a function as a stream publisher. |
| [`StreamThresholds`](https://docs.tabsdata.com/api/category/functions/functions/streamthresholds) | The thresholds of a stream publisher's data flow, one substructure per level: `batch` (what a function run receives), `buffer` (the in-memory buffer written to files) and `poll` (the source polling). |
| [`subscriber`](https://docs.tabsdata.com/api/category/functions/functions/subscriber) | Decorate a function as a subscriber (push tables to an external destination). |
| [`transformer`](https://docs.tabsdata.com/api/category/functions/functions/transformer) | Decorate a function as a transformer (table-to-table, no external connection). |

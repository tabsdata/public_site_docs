# Stream Publishers

> How @stream_publisher reads a CDC log or a Kafka topic continuously, and how the batch parameters decide when the function runs.

Source: https://docs.tabsdata.com/guide/functions/stream-publishers

A stream publisher reads data continuously from a stream source, such as a CDC log or a Kafka topic, and publishes it into Tabsdata tables in batches.

A regular publisher runs when it is triggered and reads what is in the source at that moment. A stream publisher has no trigger. Registering it starts a worker that keeps reading the source, collects what it reads, and runs the function once per batch. The `batch_*` parameters of `@stream_publisher` decide when a batch is complete.

These sources work with `@stream_publisher`:

| Source | Reads | Page |
| --- | --- | --- |
| `PostgresCdcStreamSrc` | Postgres changes, from the WAL | [Postgres CDC](https://docs.tabsdata.com/guide/connectors/postgres-cdc) |
| `MySQLCdcStreamSrc` | MySQL changes, from the binlog | [MySQL CDC](https://docs.tabsdata.com/guide/connectors/mysql-cdc) |
| `Db2CdcStreamSrc` | Db2 changes, from the SQL Replication CD tables | [Db2 CDC](https://docs.tabsdata.com/guide/connectors/db2-cdc) |
| `KafkaStreamSrc` | Messages from Kafka topics | [Kafka](https://docs.tabsdata.com/guide/connectors/kafka) |

All of them use the batch parameters described on this page.

## In Action

Tabsdata server

collection · events

Kafka topic

Kafka

Kafka · external

Reachable

Connection

conn-kafka.yaml

Stream Publisher

stream\_page\_views

Table

page\_views

//events

No versions yet

## Example

stream\_sales\_changes.py

```python
from tabsdatak.api import TableFrameSpec, TableFramesSpec, stream_publisher
from tabsdatak.conn.postgres import PostgresCdcStreamSrc
from tabsdatak.tableframe.functions import concat

@stream_publisher(
    source=PostgresCdcStreamSrc(
        tables=["public.orders", "public.customers"],
        replication_slot="tabsdata_sales",
        start_from="full",
    ),
    output_tables=["orders_changes", "customers_changes"],
    batch_max_secs=300,
    batch_max_rows=50_000,
)
def stream_sales_changes(
    orders: TableFramesSpec,
    customers: TableFramesSpec,
) -> tuple[TableFrameSpec, TableFrameSpec]:
    return concat(orders), concat(customers)
```

-   `source` is the stream source. Its connection comes from the collection the function is registered in, as for any publisher.
-   `output_tables` are the Tabsdata tables the function writes, in the order the function returns them.
-   `batch_max_secs` and `batch_max_rows` decide when a batch is handed to the function: here, every 5 minutes, or sooner once 50,000 changes are waiting, but never more often than once a minute.
-   The function receives one parameter per source slot. Each parameter is a list of frames: the data read for that slot since the previous batch. `concat` combines them into one frame.

## Parameters

```python
stream_publisher(
    source,
    output_tables,
    *,
    batch_min_secs=None,
    batch_max_secs=None,
    batch_max_rows=None,
    batch_max_bytes=None,
    batch_idle_secs=None,
    on_tables=None,
    flush_interval_mins=None,
)
```

| Parameter | Type |  |
| --- | --- | --- |
| `source` | `StreamSrc` | required |
| `output_tables` | `list[str]` | required |
| `batch_min_secs` | `int` | optional |
| `batch_max_secs` | `int` | optional |
| `batch_max_rows` | `int` | optional |
| `batch_max_bytes` | `int` | optional |
| `batch_idle_secs` | `int` | optional |
| `on_tables` | `list[OnTablesAction]` | optional |
| `flush_interval_mins` | `int` | deprecated |

`source` and `output_tables` can be given by position or by name. The other parameters must be given by name.

#### `source`

The stream source to read: one of the sources in the table above.

#### `output_tables`

The tables the function writes, as a non-empty list of table names. The number of output tables does not have to match the number of source slots.

#### `on_tables`

Actions to run on the output tables, such as [data quality](https://docs.tabsdata.com/guide/data-quality) checks, as for a regular publisher.

## Batch parameters

A batch is everything the worker has read since the previous batch. Each batch runs the function once, and the function's output tables are committed together: every batch adds one version to each output table.

| Parameter | Default | Description |
| --- | --- | --- |
| `batch_min_secs` | `60` | The shortest time between two batches, in seconds. Never less than 60. |
| `batch_max_secs` | none | Seconds after the previous batch at which data that is waiting is handed to the function. |
| `batch_max_rows` | none | Rows waiting that make a batch due. |
| `batch_max_bytes` | none | Bytes waiting that make a batch due. |
| `batch_idle_secs` | none | Seconds after the previous batch at which, if no data is waiting, the function runs with an empty batch. |

At least one of `batch_max_secs`, `batch_max_rows` and `batch_max_bytes` is required.

### When a batch is handed to the function

The worker checks after every read from the source. Counting from the previous batch (or from when the worker started):

-   **When data is waiting**, a batch is due once `batch_min_secs` have passed **and** any of these is true:
    -   `batch_max_secs` have passed,
    -   at least `batch_max_rows` rows are waiting,
    -   at least `batch_max_bytes` bytes are waiting.
-   **When no data is waiting**, nothing happens, unless `batch_idle_secs` is set. Once `batch_idle_secs` have passed, the function runs with an empty batch.

As a result:

-   `batch_min_secs` is a floor for every other setting. If 50,000 rows arrive 10 seconds after a batch, they wait until `batch_min_secs` have passed, and more rows keep joining them in the meantime.
-   `batch_max_rows` and `batch_max_bytes` make a batch due; they do not cap its size. A batch holds everything that is waiting when it closes, which can be more than the threshold.
-   Rows and bytes are counted over all the slots of the source together, not per table. For a CDC source, one row is one change. Bytes are approximate: the size of the data files already written plus an estimate of what is still in memory.
-   `batch_max_secs` counts from the previous batch, not from when the data arrived. After a quiet period longer than `batch_max_secs`, the first data to arrive is handed over right away.

Batches are processed one at a time, in order. Tabsdata looks for new batches about every 30 seconds, so a batch can start up to that long after it is due. If the function takes longer than the batch interval, batches queue up and are processed in turn.

### Validation

The batch parameters are checked when the function is decorated. A violation raises error `API_29`:

-   `batch_min_secs`, `batch_max_secs` and `batch_idle_secs` must be whole numbers of seconds, at least `60`.
-   `batch_max_rows` and `batch_max_bytes` must be whole numbers, at least `1`.
-   `batch_max_secs` must be at least `batch_min_secs`.
-   `batch_idle_secs` must be at least `batch_max_secs`, or, without `batch_max_secs`, at least `batch_min_secs`.
-   At least one of `batch_max_secs`, `batch_max_rows` and `batch_max_bytes` must be set.

### Choosing the parameters

| Goal | Parameters | Result |
| --- | --- | --- |
| Steady, bounded latency | `batch_max_secs=120` | A batch every 2 minutes while data arrives. |
| Size first, with a time bound | `batch_max_rows=100_000, batch_max_secs=900` | A batch as soon as 100,000 rows are waiting, and at least every 15 minutes. |
| Large batches, few runs | `batch_min_secs=600, batch_max_secs=3600` | At most one batch every 10 minutes, and at least one an hour while data arrives. |
| Runs even when the source is quiet | `batch_max_secs=300, batch_idle_secs=3600` | A batch every 5 minutes while data arrives, and an empty run every hour when nothing arrives, for example to keep downstream functions on a schedule. |

### Buffer settings and batch parameters

Stream sources also have buffer settings in their `src_cfg`, such as `tabsdata.cdc.buffer.max_rows` or `tabsdata.kafka.buffer.max_rows`. Buffer settings and batch parameters work at different levels:

-   **Buffer settings** decide when the worker writes what it has read from memory to a data file. They bound the worker's memory.
-   **Batch parameters** decide when the files written so far, and anything still in memory, are handed to the function as one batch.

Most streams only need the batch parameters. The buffer settings of each source are listed on its connector page.

## Stream Publisher Code Anatomy

stream\_sales\_changes.py

```
1from tabsdatak.api import TableFrameSpec, TableFramesSpec, stream_publisher2from tabsdatak.conn.postgres import PostgresCdcStreamSrc3from tabsdatak.tableframe.functions import concat4 5 1@stream_publisher(2    source=PostgresCdcStreamSrc(3        tables=["public.orders", "public.customers"],9        replication_slot="tabsdata_sales",10        start_from="full",11    ),4    output_tables=["orders_changes", "customers_changes"],5    batch_max_secs=300,14    batch_max_rows=50_000,15)67def stream_sales_changes(17    orders: TableFramesSpec,18    customers: TableFramesSpec,19) -> tuple[TableFrameSpec, TableFrameSpec]:8    return concat(orders), concat(customers)
```

-   Defines the stream source, output Tables, and the conditions that make a batch due.
    
    -   Reads changes continuously from Postgres. The Collection's Connection provides the server address and credentials.
        
    -   Each tracked table is one source slot, in the order listed.
        
    -   Tabsdata Tables that receive the values returned by the function.
        
    -   A batch is due after five minutes or when 50,000 rows are waiting, whichever happens first after the minimum interval.
        
-   Receives one list of frames per source slot and returns one frame per output Table.
    
    -   The arguments receive the frames collected for each source slot since the previous batch.
        
    -   `concat` combines each slot's frames. The returned values map to `output_tables` in order.
        

## The function

A stream publisher function has one parameter per source slot, annotated `TableFramesSpec`, and returns one `TableFrameSpec` per output table.

-   **Slots.** A CDC source has one slot per entry in its `tables`, in the same order. A Kafka source has a single slot.
-   **Parameters.** Each parameter receives a list of frames with the data read for that slot since the previous batch. For a CDC source, the list holds at most one frame. For Kafka, it can hold several, possibly with different schemas; combine them with `concat(frames, how="diagonal_relaxed")` if their columns can differ.
-   **Empty batches.** A slot with no new data receives an empty list. `concat` of an empty list returns `None`.
-   **Return value.** A tuple with one element per output table, in the order of `output_tables`. With a single output table, the frame can be returned on its own. Returning `None` for a table means no new data: it commits a new version that holds the same data as the previous version.
-   **No other parameters.** A stream publisher cannot declare a `ctx` parameter or any parameter beyond its slots.

`concat` is imported from `tabsdatak.tableframe.functions`.

## Lifecycle

-   **Register.** `tdk fn register` starts the worker. The function must be registered in a source collection whose connection matches the source; see the source's connector page.
-   **Disable and enable.** `tdk stream disable` stops the worker; `tdk stream enable` starts it again, from where it stopped. `tdk stream list` shows the stream publishers and their state.
-   **Update.** `tdk fn update` restarts the worker with the new code and settings. It resumes from where it stopped.
-   **Delete.** Deleting the function stops the worker. Check the source's connector page for anything left on the source system, such as a Postgres replication slot.
-   **Failures.** If the worker fails, Tabsdata restarts it, waiting one minute after the first failure and doubling the wait after each further failure, up to 30 minutes.
-   **Start over.** `tdk fn update --reset-stage` discards the stream's recorded position. The stream starts again as if it were new: from the source's starting position, or with a new full load for a CDC source with `start_from="full"`.

On a restart, the stream reads again whatever it had not yet handed to the function. A CDC stream publishes every change once, even across restarts. A Kafka stream is at least once: after a restart, some messages may be published again.

### CDC full load

The full load of a CDC source (`start_from="full"`) is not subject to the batch parameters. It is handed to the function as one batch, covering every tracked table, as soon as it has been read. If the load fails or is interrupted, it is discarded and runs again from the start. The batch parameters apply to the changes that follow.

## `flush_interval_mins` (deprecated)

`flush_interval_mins` was the only batch setting before 2.2.0. It is deprecated, and is converted to `batch_max_secs = flush_interval_mins * 60`, so it must be at least `1`.

-   It cannot be combined with any `batch_*` parameter. Doing so raises error `API_30`.
-   It raises a Python `DeprecationWarning` when the function is decorated, and the worker logs a warning when it starts. Python hides `DeprecationWarning` by default, so the worker log is where the warning shows.

To migrate, replace `flush_interval_mins=N` with `batch_max_secs=N * 60`.

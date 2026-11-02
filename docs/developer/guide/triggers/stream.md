# Stream Triggers

Source: https://docs.tabsdata.com/developer/guide/triggers/stream

A stream trigger runs a Function each time a batch of streamed data is due. It is the only trigger a `@stream_publisher` has: that decorator takes no `trigger_by` at all.

_Video: A Kafka stream triggering a Function run when a batch is due_

```python
from tabsdatak.api import stream_publisher, TableFramesSpec, TableFrameSpec
from tabsdatak.conn.kafka import KafkaStreamSrc
from tabsdatak.tableframe.functions import concat


@stream_publisher(
    source=KafkaStreamSrc(
        topic="users",
        data_format="avro",
        schema=AVRO_SCHEMA,
    ),
    batch_max_secs=300,
    batch_max_rows=500,
    output_tables=["users"],
)
def ingest(users: TableFramesSpec) -> TableFrameSpec:
    return concat(users)
```

## How a batch becomes a run

A stream worker reads the source continuously. What it reads is buffered in memory and written out to data files as the buffer fills. When a batch is due, the files written so far, and anything still in memory, are staged and handed to the Function as one batch. The Function runs once per batch and commits a new Version of each of its output Tables.

The worker is long-lived and independent of the Function. It keeps reading while the previous batch is being processed, so a slow Function does not drop records. Batches are processed one at a time, in order, and if the Function takes longer than the batch interval, batches queue up and are processed in turn.

## When a batch is due

The `batch_*` parameters of `@stream_publisher` decide when a batch is due:

-   `batch_min_secs` is the shortest time between two batches, and never less than 60 seconds.
-   Once `batch_min_secs` have passed, a batch is due when `batch_max_secs` have passed, or when at least `batch_max_rows` rows or `batch_max_bytes` bytes are waiting. At least one of the three is required.
-   With no data waiting, nothing runs, unless `batch_idle_secs` is set. Once `batch_idle_secs` have passed, the Function runs with an empty batch.

Tabsdata looks for new batches about every 30 seconds, so a batch can start up to that long after it is due. See [Batch parameters](https://docs.tabsdata.com/developer/guide/functions/stream-publishers#batch-parameters) for the full rules and examples.

The buffer settings in a source's `src_cfg`, such as `tabsdata.kafka.buffer.max_rows`, only decide when the worker writes what it has read to a file. They do not make a batch due.

## Available stream sources

| Source | System | Output Tables |
| --- | --- | --- |
| `KafkaStreamSrc` | Apache Kafka | the Tables named in `output_tables` |
| `MySQLCdcStreamSrc` | MySQL | one per tracked Table |
| `PostgresCdcStreamSrc` | PostgreSQL | one per tracked Table |
| `Db2CdcStreamSrc` | IBM Db2 | one per tracked Table |

All four are registered as stream sources, which `tdk connection types` shows in the **Mode** column as `Stream Source`. Like ordinary sources they belong to a `sources` Collection, and the address and credentials live on that Collection's Connection rather than on the source object.

The CDC sources track a list of qualified Table names and resume from a stored position. Postgres additionally requires a logical replication slot, since the WAL it reads is retained on the server until the consumer confirms it. See [Postgres CDC](https://docs.tabsdata.com/developer/guide/connectors/postgres-cdc), [MySQL CDC](https://docs.tabsdata.com/developer/guide/connectors/mysql-cdc), [Db2 CDC](https://docs.tabsdata.com/developer/guide/connectors/db2-cdc), and [Kafka](https://docs.tabsdata.com/developer/guide/connectors/kafka).

## Constraints on the Function

A `@stream_publisher` differs from the other decorators in three ways:

-   It takes one `TableFramesSpec` parameter per source slot, always in array mode, because a batch is a list of frames rather than a single frame.
-   It returns one `TableFrame` per output Table, the same as a Publisher.
-   It must **not** declare a `ctx` parameter. It runs inside the runtime's stream loop rather than per-transaction, so there is no `TrxCtx` at the call boundary and declaring one fails registration.

See [Stream Publishers](https://docs.tabsdata.com/developer/guide/functions/stream-publishers) for the decorator's parameters and lifecycle.

# Trigger off CDC in an SQL Database

Source: https://docs.tabsdata.com/developer/tutorials/trigger-setup/cdc

Before you begin

[Create a Project](https://docs.tabsdata.com/developer/tutorials/managing-projects/create)

A CDC stream source reads a database's replication log and emits one Tabsdata table per tracked table. Every insert, update, and delete arrives, rather than whatever a `SELECT` happens to see when it runs.

Three databases have a CDC source, each with its own connection type:

| Connection type | Database | Class |
| --- | --- | --- |
| `mysql-cdc` | MySQL | `MySQLCdcStreamSrc` |
| `postgres-cdc` | PostgreSQL | `PostgresCdcStreamSrc` |
| `db2-cdc` | IBM Db2 | `Db2CdcStreamSrc` |

What runs the publisher is a **batch** rather than a clock or an upstream commit. The stream worker reads the log continuously, and when a batch is due, by the `batch_*` parameters of `@stream_publisher`, it hands the changes captured since the previous batch to the publisher. `@stream_publisher` takes no `trigger_by`.

Step 1Create the connection

```bash
tdk connection template --type mysql-cdc --file conn-cdc.yaml
```

Fill in the URI and the credentials, then create the collection:

```bash
tdk collection create \
  --name inventory \
  --group sources \
  --conn-file conn-cdc.yaml
```

All three CDC types register with direction `stream-src`, which maps to the `sources` group.

Step 2Write the stream publisher

read\_changes.py

```python
from tabsdatak.api import TableFrameSpec, TableFramesSpec, stream_publisher
from tabsdatak.conn.mysql import MySQLCdcStreamSrc
from tabsdatak.tableframe.functions import concat


@stream_publisher(
    source=MySQLCdcStreamSrc(
        tables=["shop.products", "shop.stock"],
        start_from="tail",
    ),
    batch_max_secs=300,
    output_tables=["products", "stock"],
)
def read_changes(
    products: TableFramesSpec,
    stock: TableFramesSpec,
) -> tuple[TableFrameSpec, TableFrameSpec]:
    return concat(products), concat(stock)
```

One output table per tracked table, in order, and one `TableFramesSpec` parameter per slot. Each parameter is a list of frames, and `concat` folds it into one, or returns `None` when the batch carried nothing for that table. The function must **not** declare a `ctx` parameter: it runs inside the runtime's stream loop rather than per-transaction.

Step 3Register it

```bash
tdk fn register \
  --coll inventory \
  --path read_changes.py::read_changes
```

Registration starts the stream worker, which begins consuming the log.

## Where the stream starts

`start_from` decides what the worker reads first. `"full"` starts with a full load of the tracked tables and then switches to the changes. For PostgreSQL, `"head"` starts at the oldest retained WAL, `"tail"` starts at the current LSN, and an `LsnPosition` starts at a position you name. Starting at the tail skips the history and streams only what arrives from now on.

## PostgreSQL needs a replication slot

PostgreSQL logical replication is slot-based, so `PostgresCdcStreamSrc` takes fields the other two do not:

| Field | Purpose |
| --- | --- |
| `replication_slot` | The slot name, required |
| `replication_slot_behavior` | `"reuse"` (default) or `"create"` |
| `publication_name` | Optional publication to read from |
| `columns_format` | `"columns"` (default), `"struct"`, or `"map"` |
| `flatten_columns` | Defaults to `True` |

## Batch timing

`batch_max_secs=300` hands the changes to the publisher at least every 5 minutes while they arrive. `batch_max_rows` or `batch_max_bytes` make a batch due sooner once that many rows or bytes are waiting, but never sooner than `batch_min_secs`, which is at least 60 seconds. The buffer settings in `src_cfg` only decide when the worker writes to a file. See [Batch parameters](https://docs.tabsdata.com/developer/guide/functions/stream-publishers#batch-parameters).

## Drivers

warning

PostgreSQL CDC needs the `psycopg2-binary` driver, which Tabsdata does not redistribute. Add the driver with `tdkserver venv update`, as described in [Installing Third-Party Database Drivers](https://docs.tabsdata.com/developer/server-admin/third-party-database-drivers).

## What to do next

[Trigger off a Kafka Stream](https://docs.tabsdata.com/developer/tutorials/trigger-setup/kafka) covers the fourth stream source, which uses the same batch parameters against a topic.

See [Stream Triggers](https://docs.tabsdata.com/developer/guide/triggers/stream) for how a batch becomes a run, and [MySQL CDC](https://docs.tabsdata.com/developer/guide/connectors/mysql-cdc) for every option of the source.

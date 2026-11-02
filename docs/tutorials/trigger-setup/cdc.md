# Trigger off CDC in an SQL Database

> Covers CDC stream sources for MySQL, PostgreSQL, and IBM Db2 (`MySQLCdcStreamSrc`, `PostgresCdcStreamSrc`, `Db2CdcStreamSrc`) with `start_from`, replication slots, and batch timing for `@stream_publisher`.

Source: https://docs.tabsdata.com/tutorials/trigger-setup/cdc

Before you begin

[Quickstart a Server](https://docs.tabsdata.com/server-admin/quickstart) or [Start a Server](https://docs.tabsdata.com/server-admin/start)

[Connect to MCP](https://docs.tabsdata.com/guide/connect-agent)

A CDC stream source reads a database's replication log and emits one Tabsdata table per tracked table. Every insert, update, and delete arrives, rather than whatever a `SELECT` happens to see when it runs.

Three databases have a CDC source, each with its own connection type:

| Connection type | Database | Class |
| --- | --- | --- |
| `mysql-cdc` | MySQL | `MySQLCdcStreamSrc` |
| `postgres-cdc` | PostgreSQL | `PostgresCdcStreamSrc` |
| `db2-cdc` | IBM Db2 | `Db2CdcStreamSrc` |

What runs the publisher is a **batch** rather than a clock or an upstream commit. The stream worker reads the log continuously, and when a batch is due, by the `batch_*` parameters of `@stream_publisher`, it hands the changes captured since the previous batch to the publisher.

The database URI and its credentials live on the collection's connection, not in the function, so the collection has to exist with a CDC connection bound to it before a stream publisher can be registered there.

AI agent session

❯stream changes from the shop.products and shop.stock tables in mysql

⏺

Needs a stream publisher, and a source collection with a `mysql-cdc` connection to hold it. Four values left, then I generate and register. Reply with them one per line, or point me at a file that has them:

-   collection name
-   database URI and credentials
-   tables to track
-   where in the log to start

❯see 

Read 1 file, called tabsdata 2 times (ctrl+o to expand)

⏺

Password found. Reading back what is not secret: mysql://db.internal:3306/shop, tracking shop.products and shop.stock, starting at the tail, collection inventory.

Called tabsdata 3 times (ctrl+o to expand)

⏺

Collection **inventory** created in group `sources`, with a `MySQLCdcStreamSrcConn` to db.internal:3306. Connection check passed and binlog access confirmed.

⏺

Generating — `MySQLCdcStreamSrc` tracking both tables. A CDC source emits one output table per tracked table, so this one has two.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The stream publisher, registered in inventory:

```python
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

Called tabsdata 2 times (ctrl+o to expand)

⏺

Execution committed, 0 failures.

⏺

inventory/products and inventory/stock are live — the worker is reading the binlog from the current position:

```
┌───────────────┬──────────────┬───────┐
│ tracked table │ output table │ start │
├───────────────┼──────────────┼───────┤
│ shop.products │ products     │ tail  │
├───────────────┼──────────────┼───────┤
│ shop.stock    │ stock        │ tail  │
└───────────────┴──────────────┴───────┘
```

One output table per tracked table, in order, and one input slot per output table. The function declares no transaction context, since it runs inside the runtime's stream loop rather than per-transaction.

## Where the stream starts

`start_from` decides what the worker reads first. `"full"` starts with a full load of the tracked tables and then switches to the changes. For PostgreSQL, `"head"` starts at the oldest retained WAL, `"tail"` starts at the current LSN, and an `LsnPosition` starts at a position you name. Starting at the tail skips the history and streams only what arrives from now on.

## PostgreSQL needs a replication slot

PostgreSQL logical replication is slot-based, so its source takes fields the other two do not.

AI agent session

❯set the same thing up against postgres instead

Called tabsdata 3 times (ctrl+o to expand)

⏺

Switched to `PostgresCdcStreamSrc`, which needs a logical replication slot. The stream publisher now sets `replication_slot`, and `replication_slot_behavior` defaults to reusing an existing slot rather than creating one.

```
┌───────────────────────────┬──────────────┐
│           field           │    value     │
├───────────────────────────┼──────────────┤
│ replication_slot          │ tabsdata_cdc │
├───────────────────────────┼──────────────┤
│ replication_slot_behavior │ reuse        │
├───────────────────────────┼──────────────┤
│ columns_format            │ columns      │
├───────────────────────────┼──────────────┤
│ flatten_columns           │ true         │
└───────────────────────────┴──────────────┘
```

⏺

`publication_name` is optional. `columns_format` also accepts `struct` and `map` if you would rather keep the change payload nested.

## Batch timing

`batch_max_secs=300` hands the changes to the publisher at least every 5 minutes while they arrive. `batch_max_rows` or `batch_max_bytes` make a batch due sooner once that many rows or bytes are waiting, but never sooner than `batch_min_secs`, which is at least 60 seconds. See [Batch parameters](https://docs.tabsdata.com/guide/functions/stream-publishers#batch-parameters).

## Drivers

warning

MySQL CDC needs the `mysql-connector-python` driver and PostgreSQL CDC needs the `psycopg2-binary` driver, which Tabsdata does not redistribute. Add the driver with `tdkserver venv update`, as described in [Installing Third-Party Database Drivers](https://docs.tabsdata.com/server-admin/third-party-database-drivers).

## What to do next

[Trigger off a Kafka Stream](https://docs.tabsdata.com/tutorials/trigger-setup/kafka) covers the fourth stream source, which uses the same batch parameters against a topic.

See [Stream Triggers](https://docs.tabsdata.com/guide/triggers/stream) for how a batch becomes a run, and [MySQL CDC](https://docs.tabsdata.com/guide/connectors/mysql-cdc) for every option of the source.

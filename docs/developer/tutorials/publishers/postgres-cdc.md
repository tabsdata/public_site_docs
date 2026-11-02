# Publish data from Postgres CDC

Source: https://docs.tabsdata.com/developer/tutorials/publishers/postgres-cdc

Before you begin

[Quickstart a Server](https://docs.tabsdata.com/developer/server-admin/quickstart) or [Start a Server](https://docs.tabsdata.com/developer/server-admin/start)

[Create a Project](https://docs.tabsdata.com/developer/tutorials/managing-projects/create)

warning

The PostgreSQL CDC connector needs the `psycopg2-binary` driver, which Tabsdata does not redistribute. See [Installing Third-Party Database Drivers](https://docs.tabsdata.com/developer/server-admin/third-party-database-drivers) to add it to your Tabsdata server.

The PostgreSQL CDC publisher captures row-level changes (inserts, updates, deletes) from a PostgreSQL database using WAL logical replication, decoded by the `wal2json` output plugin. Postgres logical replication requires a replication slot — a persistent cursor on the WAL the database will not garbage-collect until the consumer confirms. A long-lived stream worker hands the captured changes to the publisher in batches, so this uses `@stream_publisher` rather than `@publisher`.

What you’ll do

1.  [Configure a connection to Postgres](#configure-a-connection-to-postgres)
2.  [Write and Register the Stream Publisher](#write-and-register-the-stream-publisher)

## Configure a connection to Postgres

Step 1Generate a connection template

```bash
tdk connection template --type postgres-cdc --file conn-postgres-cdc.yaml
```

Step 2Fill in the URI and credentials, and bind it to a collection

```bash
tdk collection create --name sales_cdc --group sources --conn-file conn-postgres-cdc.yaml
```

`PostgresCdcStreamSrcConn` mirrors the batch `PostgresSrcConn` for the URI and credentials, but the connecting role must carry the `REPLICATION` attribute. The replication slot and publication live on the publisher's source object instead of the connection, so one connection can front several sources as long as each uses a distinct slot.

## Write and Register the Stream Publisher

Step 3Build the stream publisher file locally

read\_sales\_changes.py

```
1from tabsdatak.api import stream_publisher, TableFrameSpec, TableFramesSpec2from tabsdatak.conn.postgres import PostgresCdcStreamSrc3from tabsdatak.tableframe.functions import concat4 5@stream_publisher(6  source=PostgresCdcStreamSrc(1      tables=["sales.orders", "sales.customers"],2      replication_slot="sales_cdc_slot",3      replication_slot_behavior="create",4      start_from="tail",11  ),5  batch_max_secs=120,6  output_tables=["orders_changes", "customers_changes"],14)7def read_sales_changes(orders: TableFramesSpec, customers: TableFramesSpec) -> tuple[TableFrameSpec, TableFrameSpec]:8  return concat(orders), concat(customers)
```

-   Qualified schema.table names to track.
    
-   Logical replication slot this source attaches to.
    
-   "create" makes the slot if missing; "reuse" (default) requires it to already exist.
    
-   "tail" begins at the current WAL position and never backfills.
    
-   Hands the captured changes to the function at least every 120 seconds.
    
-   One output table per tracked table, in the same order.
    
-   One TableFramesSpec parameter per source slot, always array mode. No ctx parameter.
    
-   One frame per output table, the same order as output\_tables. concat folds each slot's list of frames into one, or returns None when the batch carried nothing for that table.
    

`start_from` also accepts `"full"` for a full load of the tracked tables followed by their changes, `"head"` to replay from the oldest retained WAL, or an explicit `LsnPosition(lsn=...)`. A stream publisher takes no `trigger_by` and must not declare a `ctx` parameter — it runs inside the runtime's stream loop rather than per-transaction.

Step 4Register the stream publisher into the collection

```bash
tdk fn register --coll sales_cdc --path read_sales_changes.py::read_sales_changes
```

## Batches and buffering

`batch_max_secs=120` hands the captured changes to the function at least every two minutes. `batch_max_rows` and `batch_max_bytes` make a batch due sooner once that many changes or bytes are waiting, but never sooner than `batch_min_secs`, which is at least 60 seconds. See [Batch parameters](https://docs.tabsdata.com/developer/guide/functions/stream-publishers#batch-parameters).

The `src_cfg` buffer settings, such as `tabsdata.cdc.buffer.max_rows`, only decide when the worker writes the changes it holds in memory to a file. They do not make a batch due. See [`src_cfg`](https://docs.tabsdata.com/developer/guide/connectors/postgres-cdc#src_cfg) on the Postgres CDC page for every accepted key.

```python
source=PostgresCdcStreamSrc(
    tables=["sales.orders"],
    replication_slot="sales_cdc_slot",
    start_from="tail",
    src_cfg={"tabsdata.cdc.buffer.max_rows": 5000},
)
```

## Output row shape

`columns_format` (default `"columns"`, or `"struct"` / `"map"`) and `flatten_columns` (default `True`) control how the new — and, where present, old — column values lay out on each emitted change row.

## Limitations

-   `TRUNCATE` is captured as a `t` row with wal2json format version `2`, the default.
-   All tables must exist in the source database before the stream publisher is registered.
-   Schema changes on tracked tables (`ALTER TABLE`, `ADD COLUMN`, `DROP COLUMN`) are picked up automatically.
-   Abandoned replication slots cause unbounded WAL growth. Monitor slot lag via `pg_replication_slots` and drop unused slots promptly.

## PostgreSQL Setup to Enable CDC

> Refer to the [PostgreSQL documentation](https://www.postgresql.org/docs/) for comprehensive and up-to-date configuration instructions.

### Server Configuration

Add the following to `postgresql.conf` and restart the server:

```ini
wal_level = logical
max_replication_slots = 4    # at least 1 per CDC consumer
max_wal_senders = 4          # at least 1 per CDC consumer
```

### Install wal2json

The `wal2json` extension must be installed on the PostgreSQL server. On Debian/Ubuntu, it is available as a system package:

```shell
# Adjust version number to match your PostgreSQL version
apt-get install postgresql-17-wal2json
```

For installation instructions and detailed documentation, see the [wal2json project](https://github.com/eulerto/wal2json).

### Create a CDC User

```sql
CREATE ROLE cdc_user WITH LOGIN REPLICATION PASSWORD 'cdc_password';
GRANT CONNECT ON DATABASE sales TO cdc_user;
GRANT USAGE ON SCHEMA sales TO cdc_user;
GRANT SELECT ON ALL TABLES IN SCHEMA sales TO cdc_user;
```

### Set Replica Identity

For full before-image data on updates and deletes, set `REPLICA IDENTITY FULL` on each table you want to capture. Without this, only primary key columns are included in the before-image.

```sql
ALTER TABLE orders REPLICA IDENTITY FULL;
ALTER TABLE customers REPLICA IDENTITY FULL;
```

orders\_changes

Tabsdata›Collections›sales\_cdc›orders\_changes

### Schema

Table schema defines the structure of a table by listing its columns and their data types.

| Object | Type |
| --- | --- |
| order\_id | i64 |
| customer\_id | i64 |
| order\_total | f64 |
| status | str |

# Postgres CDC

> Reference for the Tabsdata Postgres CDC stream source: prerequisites, the full load, change rows, and the connection.

Source: https://docs.tabsdata.com/guide/connectors/postgres-cdc

The Postgres CDC connector lets Tabsdata capture the changes made to Postgres tables (inserts, updates, deletes and truncates) as they are committed, and publish them into Tabsdata tables.

With `start_from="full"`, the stream starts with a full load: it takes a consistent snapshot of the tracked tables and then switches to change capture from the exact point of that snapshot, with no gaps and no duplicates. The full load and the change capture are one stream publisher, so there is nothing to reconcile between them.

The `PostgresCdcStreamSrc` connector can be used by a [stream publisher](https://docs.tabsdata.com/guide/functions/stream-publishers) function to follow the Postgres write-ahead log (WAL) through a logical replication slot and write every captured change into a Tabsdata table.

Unlike `PostgresSrc`, which runs queries on a trigger, a CDC source runs continuously: registering the stream publisher starts a long-lived worker that keeps reading the WAL until the function is disabled or deleted.

## Publisher

The `PostgresCdcStreamSrc` connector can be used by a stream publisher function to capture changes from Postgres into Tabsdata tables. [See the full publisher walkthrough](https://docs.tabsdata.com/tutorials/publishers/postgres-cdc)

The stream publisher is registered in a collection created with a `PostgresCdcStreamSrcConn` connection. The connection, and how to create the collection, are described in [Connection](#connection), at the end of this page.

### Prerequisites

-   The server runs with `wal_level = logical`.
-   The [wal2json](https://github.com/eulerto/wal2json) logical decoding output plugin, version 2.0 or later, is installed on the server.
-   The connecting role has the `REPLICATION` attribute.
-   Every tracked table has a replica identity: a primary key that is not `DEFERRABLE`, or `REPLICA IDENTITY FULL`, or `REPLICA IDENTITY USING INDEX` on a unique index. A table without one is refused, because Postgres would drop its updates and deletes from the WAL.
-   A tracked table with large text columns needs `REPLICA IDENTITY FULL`, or the `postgres.cdc.unchanged_large_text_as_null` setting described under [`src_cfg`](#src_cfg).
-   For `start_from="full"`, the connecting role can also `SELECT` every tracked table.

### Publisher

Configure `PostgresCdcStreamSrc` as the `source` of a `@stream_publisher` function to select the tables whose changes Tabsdata captures.

stream\_sales\_changes.py

```python
from tabsdatak.api import TableFrameSpec, TableFramesSpec, stream_publisher
from tabsdatak.conn.postgres import PostgresCdcStreamSrc
from tabsdatak.tableframe.functions import concat

@stream_publisher(
    source=PostgresCdcStreamSrc(
        tables=[
            "public.orders",
            "public.customers",
        ],
        replication_slot="tabsdata_sales",
        start_from="full",
    ),
    batch_max_secs=120,
    output_tables=["orders_changes", "customers_changes"],
)
def stream_sales_changes(
    orders: TableFramesSpec,
    customers: TableFramesSpec,
) -> tuple[TableFrameSpec, TableFrameSpec]:
    return concat(orders), concat(customers)
```

-   required
    
-   required
    
-   required
    
-   optional
    
-   optional
    
-   optional
    
-   optional
    
-   optional
    

`batch_max_secs=120` hands the captured changes to the function at least every two minutes. The `batch_*` parameters decide when a batch of changes is handed to the function, and are the same for every stream source. See [Stream Publishers](https://docs.tabsdata.com/guide/functions/stream-publishers#batch-parameters) for all of them.

A stream publisher differs from a regular publisher in three ways:

-   It has no trigger. Registering it starts the stream worker, which runs until the function is disabled or deleted.
-   Each element of `tables` is one function parameter, and each parameter receives a list of frames: the changes captured for that table since the previous batch. Fold them with `concat`, which also returns `None` when the batch carried nothing for that table.
-   The function must not declare a `ctx` parameter.

### Function Config Parameters

#### `tables`

Defines the Postgres tables whose changes are captured, as qualified `schema.table` names.

Each element in `tables` represents one source slot and maps positionally to an argument in the publisher function and to an entry in `output_tables`.

For example:

```python
PostgresCdcStreamSrc(
    tables=[
        "public.orders",
        "public.customers",
    ],
    replication_slot="tabsdata_sales",
    start_from="tail",
)
```

#### `replication_slot`

The logical replication slot the stream reads through. Postgres keeps the WAL the slot has not yet consumed, which is what lets the stream resume where it left off after a restart. Each stream publisher needs its own slot.

Tabsdata never drops the slot, not even when the function is deleted. A slot that is no longer read makes the server keep WAL indefinitely, so drop it with `pg_drop_replication_slot('<slot>')` once its stream is gone.

#### `start_from`

Where the stream starts the first time it runs. Later runs resume from the position the stream has recorded.

-   `"full"`: a full load of every tracked table, then the changes committed after it. See [Full load](#full-load).
-   `"tail"`: only changes committed after the stream starts.
-   `"head"`: replay from the oldest WAL the slot retains.
-   `LsnPosition(lsn=...)`: an explicit WAL position, given as the 64-bit integer that `pg_current_wal_lsn() - '0/0'::pg_lsn` returns.

#### Full load

With `start_from="full"`, the stream first emits every row of each tracked table and then captures the changes from the exact position of that snapshot. The snapshot is consistent across all the tracked tables, and no change is missed or repeated between the snapshot and the change capture.

-   Each table's snapshot is preceded by one `LOAD` row (`@td.cdc.meta.op = "l"`), and its rows arrive as inserts. A `LOAD` row tells the consumer to empty its copy of the table before applying the rows that follow.
-   No table is locked. The snapshot is the one Postgres exports when a replication slot is created: the stream's own slot when the stream creates it, or otherwise a temporary slot that is created for the load and dropped once the load is read.

To resynchronize a destination later, keep `start_from="full"` and reset the function's stage:

```bash
tdk fn update --reset-stage <other options>
```

The stream then starts again with a new full load and its `LOAD` rows. Resetting the stage with any other `start_from` restarts at that position and sends no `LOAD` row.

#### `replication_slot_behavior`

`"reuse"` (the default) requires the slot to exist already, for example when a DBA provisions it. `"create"` creates the slot, and does nothing if it already exists.

#### `publication_name`

A Postgres publication that scopes what the slot decodes (wal2json's `publication_names` option).

#### `columns_format`

How each change row lays out the table's column values: `"columns"` (the default), `"struct"` or `"map"`. See [Change rows](#change-rows).

#### `flatten_columns`

When `True` (the default), the new column values are written as ordinary top-level columns, so each change row reads like a row of the source table. `columns_format` then only shapes the old values. See [Change rows](#change-rows).

#### `src_cfg`

Sets additional source configuration. Only these keys are accepted:

| Key | Default | Description |
| --- | --- | --- |
| `tabsdata.cdc.buffer.max_rows` | `10000` | Rows buffered in the worker before they are written out to a file. |
| `tabsdata.cdc.buffer.max_bytes` | none | Bytes buffered before they are written out. Measuring bytes costs time on every change; prefer bounding by rows. |
| `tabsdata.cdc.buffer.max_secs` | `60` | Longest time a change waits in the buffer. |
| `tabsdata.cdc.poll.max_secs` | `1` | Longest time one read of the WAL waits for changes. |
| `tabsdata.cdc.poll.idle_secs` | `1` | Pause after a read that found no changes. |
| `tabsdata.cdc.max_large_text_length` | `1024` | Longest value, in characters, accepted from an unbounded text column. A longer value fails the stream. |
| `tabsdata.cdc.fetch_size` | `100000` | Rows fetched per round trip while reading the full load. |
| `tabsdata.cdc.chunk_size` | `100000` | Rows per chunk while writing the full load. |
| `postgres.cdc.wal2json_format_version` | `2` | wal2json output format, `1` or `2`. Truncates are only captured with `2`. |
| `postgres.cdc.unchanged_large_text_as_null` | unset | Set to `true` to accept that, on a table without `REPLICA IDENTITY FULL`, an update that does not touch a large text column delivers that column as null. When unset, such a table refuses to start the stream. |
| `postgres.cdc.accept_gap` | unset | Lets a stopped stream resume past one reported gap between its position and the slot's. Give the value exactly as the error message prints it; it matches no other gap. |
| `postgres.cdc.logging_level` | `40` | Logging verbosity of the connector, as a Python logging level number (`10` debug, `20` info, `30` warning, `40` error). |

The buffer settings control when captured changes are written to files inside the worker. When those files are handed to the function is controlled by the [batch parameters](https://docs.tabsdata.com/guide/functions/stream-publishers#batch-parameters) of `@stream_publisher`.

## Change rows

Every row the stream emits is one change. Besides the column values, each row carries change metadata:

| Column | Type | Description |
| --- | --- | --- |
| `@td.cdc.meta.op` | `str` | The operation: `"i"` insert, `"u"` update, `"d"` delete, `"t"` truncate, `"l"` load (start of a full load). |
| `@td.cdc.meta.tx` | `str` | The source transaction id. Full load rows carry `initial-load`. |
| `@td.cdc.meta.sq` | `int` | The change's sequence within its transaction. |
| `@td.cdc.meta.ts` | `datetime` (UTC) | When the transaction committed. Full load rows carry the time the snapshot was taken. |
| `@td.cdc.meta.seg` | `decimal` | The position of the transaction's commit in the WAL. Full load rows carry `-1`. |
| `@td.cdc.meta.ord` | `decimal` | The position of the change within the transaction. Ordering by `seg` and then `ord` gives the order the changes were committed in. |
| `@td.cdc.meta.fmt` | `str` | The `columns_format` the row was produced with. |
| `@td.cdc.meta.flat` | `bool` | The `flatten_columns` setting the row was produced with. |
| `@td.cdc.meta.sch` | `str` | A hash of the source table's schema when the change was captured. It changes when the table's columns change. |

The column values are laid out according to `flatten_columns` and `columns_format`:

|  | New values | Old values |
| --- | --- | --- |
| `flatten_columns=True` (default) | One top-level column per source column, with the source column's name. | Depends on `columns_format`. |
| `columns_format="columns"` (default) | `@td.cdc.data.col.new.<column>` per column, when not flattened. | `@td.cdc.data.col.old.<column>` per column. |
| `columns_format="struct"` | `@td.cdc.data.row.new`, one struct, when not flattened. | `@td.cdc.data.row.old`, one struct. |
| `columns_format="map"` | `@td.cdc.data.map.new`, a JSON object as a string, when not flattened. | `@td.cdc.data.map.old`, a JSON object as a string. |

What each operation carries:

| Operation | New values | Old values |
| --- | --- | --- |
| Insert (`i`) | The inserted row. | Empty. |
| Update (`u`) | The row after the update. | The row before the update. Postgres logs the complete previous row only for tables with `REPLICA IDENTITY FULL`; otherwise only the replica identity columns are present. |
| Delete (`d`) | The deleted row. Without `REPLICA IDENTITY FULL`, only the replica identity columns are present. | Empty. |
| Truncate (`t`), Load (`l`) | Empty. | Empty. |

Empty values are null columns with `"columns"`, a struct whose fields are all null with `"struct"`, and a JSON object whose values are all null with `"map"`.

A `LOAD` row tells the consumer to empty its copy of the table before applying the rows that follow. A `TRUNCATE` row reports that the source table was truncated.

`bytea` and `oid` columns are not captured: they always arrive as null.

Use `"columns"` with `flatten_columns=True` for changes that land in a table and get queried. Use `"struct"` or `"map"` when the source table's schema may change while the stream runs, to carry the values opaquely instead of changing the output table's columns.

## Operational notes

-   Stopping a stream does not lose changes: the slot keeps the WAL, and the stream resumes from its recorded position. The server also keeps that WAL until the stream consumes it, or until the slot is dropped.
-   If the slot is dropped or invalidated, the server is restored from a backup, or the stream's position no longer matches the server, the stream fails with an error explaining what happened. In most of those cases the fix is a new full load: reset the stage with `start_from="full"`.
-   A slot can only be read by one connection at a time. A stream whose slot is still held by another connection fails after a timeout.

## Connection

Postgres CDC stream publishers use `PostgresCdcStreamSrcConn` to define the database connection and credentials used by the stream.

conn-postgres-cdc.yaml

```yaml
kind: connectionDef
apiVersion: '1.0'
type: tabsdatak.conn.postgres:PostgresCdcStreamSrcConn
spec:
  uri: 'postgres://db.internal:5432/sales'
  credentials:
    kind: userPasswordCredentials
    apiVersion: '1.0'
    type: tabsdatak.conn.common.types:UserPassword
    spec:
      user: 'secret:tabsdata_cdc'
      password: 'secret:example-password'
```

-   required
    
-   required
    
-   optional
    
-   optional
    

### Create the collection

A stream publisher is registered in a source collection, and a source collection is created with its connection. Every function registered in the collection uses that connection.

Generate a connection template, which lists all the connection fields:

```bash
tdk connection template --type postgres-cdc --file conn-postgres-cdc.yaml
```

Edit the template file with the Postgres connection information, check it, and create the collection with it:

```bash
tdk connection validate --file conn-postgres-cdc.yaml
```

```bash
tdk collection create --name sales_cdc --conn-file conn-postgres-cdc.yaml
```

Then register the stream publisher in the collection:

```bash
tdk fn register --coll sales_cdc --path stream_sales_changes.py::stream_sales_changes
```

-   The collection goes in the `sources` group, because the connection is a source connection. `--group` can be left out; if it is given, it must be `sources`.
-   `secret:<value>` gives a secret value in the file itself. `$secret:<ENV_VAR>` reads it from an environment variable when the collection is created, so the value never appears in the file. Either way, Tabsdata stores the secret separately, and the stored connection only shows a placeholder.
-   Functions in the collection must use the connector of its connection: `PostgresCdcStreamSrc` for a collection created with `PostgresCdcStreamSrcConn`. Transformers go in a collection of their own.
-   To change the connection later, for example to rotate a password, run `tdk collection update --name sales_cdc --conn-file conn-postgres-cdc.yaml`. The connector cannot change; to use another one, create another collection.
-   Creating a source or destination collection requires permission to manage the project.
-   A batch `PostgresSrc` publisher cannot share this collection, because it uses a different connection (`postgres-sql-in`).

### Connection Config Parameters

#### `uri`

The SQLAlchemy-style connection URI: `postgres://host:port/database` (or `postgresql://`). Written as a plain value here, but accepts `secret:` too.

#### `credentials`

The database user and password, spliced into the URI at connect time. `UserPassword` requires a `user` and `password`. The role must have the `REPLICATION` attribute.

#### `entity_whitelist`

A YAML list of regular expressions, not a comma-separated string. It is checked to be a list of valid regular expressions, but it has no effect yet: it does not limit which tables a stream can track. Leave it out.

#### `conn_cfg`

psycopg2 connection keywords such as `sslmode`, `sslrootcert`, `connect_timeout` or `application_name`. They apply to every connection the stream opens: catalog reads, the full load and the replication connection.

The replication slot is configured on the publisher, not on the connection, so one connection can serve several stream publishers as long as each uses its own slot.

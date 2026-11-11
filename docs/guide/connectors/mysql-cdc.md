# MySQL CDC

> Reference for the Tabsdata MySQL CDC stream source: prerequisites, the full load, change rows, and the connection.

Source: https://docs.tabsdata.com/guide/connectors/mysql-cdc

The MySQL CDC connector lets Tabsdata capture the changes made to MySQL tables (inserts, updates, deletes and truncates) as they are committed, and publish them into Tabsdata tables.

With `start_from="full"`, the stream starts with a full load: it takes a consistent snapshot of the tracked tables and then switches to change capture from the exact point of that snapshot, with no gaps and no duplicates when the global read lock is taken. Where the server refuses the lock, the limits in [Full load without the global read lock](#full-load-without-the-global-read-lock) apply. The full load and the change capture are one stream publisher, so there is nothing to reconcile between them.

The `MySQLCdcStreamSrc` connector can be used by a [stream publisher](https://docs.tabsdata.com/guide/functions/stream-publishers) function to follow the MySQL binary log (binlog) as a replica would and write every captured change into a Tabsdata table.

Unlike `MySQLSrc`, which runs queries on a trigger, a CDC source runs continuously: registering the stream publisher starts a long-lived worker that keeps reading the binlog until the function is disabled or deleted.

## Publisher

The `MySQLCdcStreamSrc` connector can be used by a stream publisher function to capture changes from MySQL into Tabsdata tables. [See the full publisher walkthrough](https://docs.tabsdata.com/tutorials/publishers/mysql-cdc)

The stream publisher is registered in a collection created with a `MySQLCdcStreamSrcConn` connection. The connection, and how to create the collection, are described in [Connection](#connection), at the end of this page.

### Prerequisites

-   The server's binlog is set up for row-based capture: `log_bin = ON`, `binlog_format = ROW`, `binlog_row_image = FULL` and `gtid_mode = ON`. The stream checks these at start and refuses a server that does not have them.
-   The connecting user holds the replication privileges a binlog reader needs (`REPLICATION SLAVE` and `REPLICATION CLIENT`).
-   When streaming from a replica, the replica runs with `log_replica_updates = ON`, and with `replica_preserve_commit_order = ON` if it applies transactions in parallel.
-   For `start_from="full"`, the connecting user also holds `SELECT` on every tracked table, and `RELOAD` where the server grants it, for the global read lock. The tracked tables are InnoDB. Managed services such as Amazon RDS and Aurora refuse the global read lock, and the full load still runs there with the same transactional consistency.

### Publisher

Configure `MySQLCdcStreamSrc` as the `source` of a `@stream_publisher` function to select the tables whose changes Tabsdata captures.

stream\_sales\_changes.py

```python
from tabsdatak.api import TableFrameSpec, TableFramesSpec, stream_publisher
from tabsdatak.conn.mysql import MySQLCdcStreamSrc
from tabsdatak.tableframe.functions import concat

@stream_publisher(
    source=MySQLCdcStreamSrc(
        tables=[
            "sales.orders",
            "sales.customers",
        ],
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

Defines the MySQL tables whose changes are captured, as qualified `database.table` names.

Each element in `tables` represents one source slot and maps positionally to an argument in the publisher function and to an entry in `output_tables`. A table listed twice is refused with `CONN_37`.

For example:

```python
MySQLCdcStreamSrc(
    tables=[
        "sales.orders",
        "sales.customers",
    ],
    start_from="tail",
)
```

#### `start_from`

Where the stream starts the first time it runs. Later runs resume from the position the stream has recorded.

-   `"full"`: a full load of every tracked table, then the changes committed after it. See [Full load](#full-load).
-   `"tail"`: only changes committed after the stream starts.
-   `"head"`: replay from the oldest change still in binlog retention.
-   `GtidPosition(gtid="<uuid>:<n>")`: after a global transaction id. The given GTIDs count as already read, and the stream starts with the next transaction. A range such as `"<uuid>:1-<n>"` is accepted too.
-   `BinlogPosition(file="mysql-bin.000001", pos=4)`: from a binlog file and byte offset, as `SHOW BINARY LOG STATUS` or `SHOW BINLOG EVENTS` report them. Position `4` is the start of a file.
-   `TimestampPosition(ts=...)`: from the first binlog event at or after a point in time. A naive datetime is read as UTC. A time before the oldest retained binlog is refused.

#### Full load

With `start_from="full"`, the stream first emits every row of each tracked table and then captures the changes from the exact binlog position of that snapshot. The snapshot is consistent across all the tracked tables, and when the global read lock is taken, no change is missed or repeated between the snapshot and the change capture.

-   Each table's snapshot is preceded by one `LOAD` row (`@td.cdc.meta.op = "l"`), and its rows arrive as inserts. A `LOAD` row tells the consumer to empty its copy of the table before applying the rows that follow.
-   The tables are read in one consistent-snapshot transaction. To pin that snapshot to a binlog position, the stream briefly takes the global read lock. The lock is held only while the position is read, not while the tables are scanned. On servers that refuse the lock, such as Amazon RDS and Aurora, the load runs without it; see [Full load without the global read lock](#full-load-without-the-global-read-lock).

To resynchronize a destination later, keep `start_from="full"` and reset the function's stage:

```bash
tdk fn update --reset-stage <other options>
```

The stream then starts again with a new full load and its `LOAD` rows. Resetting the stage with any other `start_from` restarts at that position and sends no `LOAD` row.

#### Full load without the global read lock

Without the lock, the snapshot is not pinned to one binlog position. The connector brackets the load with the binlog position before and after it, and deduplicates the changes that fall inside that window. The lockless load has these limits:

-   A table with a primary key is deduplicated by key. A keyless table cannot be matched row by row, so its changes inside the window arrive twice.
-   A key swap, a `TRUNCATE` or a schema change during the load fails the stream with `CDC_23` to `CDC_25`.
-   The `map` format fails the load with `CDC_26`.
-   A load with more changes in its window than `tabsdata.cdc.initial_load.max_window_changes` fails with `CDC_29`.

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
| `tabsdata.cdc.poll.max_secs` | `1` | Longest time one read of the binlog waits for changes. |
| `tabsdata.cdc.poll.idle_secs` | `1` | Pause after a read that found no changes. |
| `tabsdata.cdc.max_large_text_length` | `1024` | Longest value, in characters, accepted from an unbounded text column. A longer value fails the stream. |
| `tabsdata.cdc.initial_load.max_window_changes` | `100000` | Most changes the full load can hold in its window when it runs without the global read lock. Above it the load fails with `CDC_29`. |
| `tabsdata.cdc.fetch_size` | `100000` | Rows fetched per round trip while reading the full load. |
| `tabsdata.cdc.chunk_size` | `100000` | Rows per chunk while writing the full load. |
| `mysql.cdc.logging_level` | `40` | Logging verbosity of the connector, as a Python logging level number (`10` debug, `20` info, `30` warning, `40` error). |

The buffer settings control when captured changes are written to files inside the worker. When those files are handed to the function is controlled by the [batch parameters](https://docs.tabsdata.com/guide/functions/stream-publishers#batch-parameters) of `@stream_publisher`.

## Change rows

Every row the stream emits is one change. Besides the column values, each row carries change metadata:

| Column | Type | Description |
| --- | --- | --- |
| `@td.cdc.meta.op` | `str` | The operation: `"i"` insert, `"u"` update, `"d"` delete, `"t"` truncate, `"l"` load (start of a full load). |
| `@td.cdc.meta.tx` | `str` | The transaction's GTID. Full load rows carry `initial-load`. |
| `@td.cdc.meta.sq` | `int` | The change's sequence within its transaction. |
| `@td.cdc.meta.ts` | `datetime` (UTC) | When the transaction committed. Full load rows carry the time the snapshot was taken. |
| `@td.cdc.meta.seg` | `decimal` | The transaction's number in its GTID. Full load rows carry `-1`. |
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
| Update (`u`) | The row after the update. | The complete row before the update. |
| Delete (`d`) | The deleted row. | Empty. |
| Truncate (`t`), Load (`l`) | Empty. | Empty. |

Empty values are null columns with `"columns"`, a struct whose fields are all null with `"struct"`, and a JSON object whose values are all null with `"map"`.

A `LOAD` row tells the consumer to empty its copy of the table before applying the rows that follow. A `TRUNCATE` row reports that the source table was truncated.

`BLOB` columns are not captured: they always arrive as null.

`TIMESTAMP` columns are rewritten to the server time zone's wall clock. When that zone is unknown, the connector uses UTC and logs one warning.

Use `"columns"` with `flatten_columns=True` for changes that land in a table and get queried. Use `"struct"` or `"map"` when the source table's schema may change while the stream runs, to carry the values opaquely instead of changing the output table's columns.

## Operational notes

-   MariaDB is not supported. A `mariadb://` URI is accepted, but the server check fails with `MYSQL_27`, because MariaDB has no `gtid_mode`.
-   MySQL has no replication slot, so a stopped stream holds nothing on the server. It resumes from its recorded GTID, provided the server still retains the binlogs from that point. If they were purged, the stream fails and needs a new full load: reset the stage with `start_from="full"`.
-   A stream follows one source server. Switching it to another server (for example after a failover) is not supported: the new server's changes would be dropped as already published. Start a new stream instead.

## Connection

MySQL CDC stream publishers use `MySQLCdcStreamSrcConn` to define the database connection and credentials used by the stream.

conn-mysql-cdc.yaml

```yaml
kind: connectionDef
apiVersion: '1.0'
type: tabsdatak.conn.mysql:MySQLCdcStreamSrcConn
spec:
  uri: 'mysql://db.internal:3306/sales'
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
    
-   optional
    

### Create the collection

A stream publisher is registered in a source collection, and a source collection is created with its connection. Every function registered in the collection uses that connection.

Generate a connection template, which lists all the connection fields:

```bash
tdk connection template --type mysql-cdc --file conn-mysql-cdc.yaml
```

Edit the template file with the MySQL connection information, check it, and create the collection with it:

```bash
tdk connection validate --file conn-mysql-cdc.yaml
```

```bash
tdk collection create --name sales_cdc --conn-file conn-mysql-cdc.yaml
```

Then register the stream publisher in the collection:

```bash
tdk fn register --coll sales_cdc --path stream_sales_changes.py::stream_sales_changes
```

-   The collection goes in the `sources` group, because the connection is a source connection. `--group` can be left out; if it is given, it must be `sources`.
-   `secret:<value>` gives a secret value in the file itself. `$secret:<ENV_VAR>` reads it from an environment variable when the collection is created, so the value never appears in the file. Either way, Tabsdata stores the secret separately, and the stored connection only shows a placeholder.
-   Functions in the collection must use the connector of its connection: `MySQLCdcStreamSrc` for a collection created with `MySQLCdcStreamSrcConn`. Transformers go in a collection of their own.
-   To change the connection later, for example to rotate a password, run `tdk collection update --name sales_cdc --conn-file conn-mysql-cdc.yaml`. The connector cannot change; to use another one, create another collection.
-   Creating a source or destination collection requires permission to manage the project.
-   A batch `MySQLSrc` publisher cannot share this collection, because it uses a different connection (`mysql-sql-in`).

### Connection Config Parameters

#### `uri`

The SQLAlchemy-style connection URI: `mysql://host:port/database`. Written as a plain value here, but accepts `secret:` too.

#### `credentials`

The database user and password, spliced into the URI at connect time. `UserPassword` requires a `user` and `password`.

#### `server_id`

The replica id the stream registers with when it reads the binlog. Defaults to `512`.

MySQL admits one replica per `server_id`: a second stream connecting with the same id disconnects the first. Give every stream publisher reading the same MySQL server its own connection with a distinct `server_id`, and keep them clear of the ids your real replicas use.

#### `entity_whitelist`

A YAML list of regular expressions, not a comma-separated string. It is checked to be a list of valid regular expressions, but it has no effect yet: it does not limit which tables a stream can track. Leave it out.

#### `conn_cfg`

pymysql connection keywords such as `ssl_ca`, `ssl_cert`, `ssl_key`, `ssl_disabled`, `charset` or `connect_timeout`. They apply to every connection the stream opens: catalog reads, the binlog reader, the full load and the server checks.

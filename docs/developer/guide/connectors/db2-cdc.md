# Db2 CDC

> Reference for the Tabsdata Db2 CDC stream source: SQL Replication prerequisites, the full load, change rows, and the connection.

Source: https://docs.tabsdata.com/developer/guide/connectors/db2-cdc

The Db2 CDC connector lets Tabsdata capture the changes made to Db2 tables (inserts, updates and deletes) and publish them into Tabsdata tables.

With `start_from="full"`, the stream starts with a full load: it takes a consistent snapshot of the tracked tables and then switches to change capture from the exact point of that snapshot, with no gaps. Duplicates are removed under the rules in [Full load limits](#full-load-limits).

The `Db2CdcStreamSrc` connector can be used by a [stream publisher](https://docs.tabsdata.com/developer/guide/functions/stream-publishers) function to read the change-data (CD) tables that Db2 SQL Replication fills, and write every captured change into a Tabsdata table.

Unlike `Db2Src`, which runs queries on a trigger, a CDC source runs continuously: registering the stream publisher starts a long-lived worker that keeps reading the CD tables until the function is disabled or deleted.

## Publisher

The `Db2CdcStreamSrc` connector can be used by a stream publisher function to capture changes from Db2 into Tabsdata tables. [See the full publisher walkthrough](https://docs.tabsdata.com/developer/tutorials/publishers/db2-cdc)

The stream publisher is registered in a collection created with a `Db2CdcStreamSrcConn` connection. The connection, and how to create the collection, are described in [Connection](#connection), at the end of this page.

### Prerequisites

Db2 CDC builds on Db2 SQL Replication: the ASN Capture program (`asncap`) reads the Db2 log and copies each change of a registered table into that table's CD table. Tabsdata reads the CD tables.

-   SQL Replication is set up in the source database: the `ASN` capture control tables exist, and `asncap` is running.
-   Each tracked source table is registered for capture (a row in `ASN.IBMSNAP_REGISTER`), with an active registration and its own CD table. Every column is registered with its before-image; a registration without before-images is refused.
-   The connecting user can `SELECT` the CD tables and `ASN.IBMSNAP_REGISTER`, `ASN.IBMSNAP_PRUNCNTL` and `ASN.IBMSNAP_RESTART`, and `ASN.IBMSNAP_UOW` when starting from `"tail"` or a timestamp.
-   For `start_from="full"`, the connecting user can also `SELECT` every tracked source table and `EXECUTE` the `SYSPROC.MON_GET_TRANSACTION_LOG` table function (for example through the `SYSMON` authority), and no tracked table is registered to capture updates as a delete plus an insert (`CHG_UPD_TO_DEL_INS = 'Y'`).

### Publisher

Configure `Db2CdcStreamSrc` as the `source` of a `@stream_publisher` function to select the CD tables whose changes Tabsdata captures.

stream\_sales\_changes.py

```python
from tabsdatak.api import TableFrameSpec, TableFramesSpec, stream_publisher
from tabsdatak.conn.db2 import Db2CdcStreamSrc
from tabsdatak.tableframe.functions import concat

@stream_publisher(
    source=Db2CdcStreamSrc(
        tables=[
            "ASN.CD_ORDERS",
            "ASN.CD_CUSTOMERS",
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
    

`batch_max_secs=120` hands the captured changes to the function at least every two minutes. The `batch_*` parameters decide when a batch of changes is handed to the function, and are the same for every stream source. See [Stream Publishers](https://docs.tabsdata.com/developer/guide/functions/stream-publishers#batch-parameters) for all of them.

A stream publisher differs from a regular publisher in three ways:

-   It has no trigger. Registering it starts the stream worker, which runs until the function is disabled or deleted.
-   Each element of `tables` is one function parameter, and each parameter receives a list of frames: the changes captured for that table since the previous batch. Fold them with `concat`, which also returns `None` when the batch carried nothing for that table.
-   The function must not declare a `ctx` parameter.

### Function Config Parameters

#### `tables`

Defines the CD tables to read, as qualified `cd_schema.cd_table` names. These are the change-data tables, not the source tables. The connector finds each CD table's source table through `ASN.IBMSNAP_REGISTER`. Db2 folds unquoted names to uppercase, so write them in uppercase.

Each element in `tables` represents one source slot and maps positionally to an argument in the publisher function and to an entry in `output_tables`. A table listed twice is refused with `CONN_37`.

For example:

```python
Db2CdcStreamSrc(
    tables=[
        "ASN.CD_ORDERS",
        "ASN.CD_CUSTOMERS",
    ],
    start_from="tail",
)
```

#### `start_from`

Where the stream starts the first time it runs. Later runs resume from the position the stream has recorded, which it keeps for each CD table separately.

-   `"full"`: a full load of every tracked source table, then the changes captured after it. See [Full load](#full-load).
-   `"tail"`: only changes captured after the stream starts.
-   `"head"`: every change still in each CD table.
-   `CommitSeqPosition(seq="...")`: one commit sequence for every table, as the hex form of the 16-byte `IBMSNAP_COMMITSEQ` value.
-   `TableCommitSeqPosition(seqs={"ASN.CD_ORDERS": "...", ...})`: a commit sequence per CD table, for example after re-snapshotting some tables. Every CD table in `tables` must be listed; a table left out fails the stream.
-   `TimestampPosition(ts=...)`: from the first commit at or after a point in time, looked up in `ASN.IBMSNAP_UOW`. A naive datetime is read in the Db2 server's time zone.

#### Full load

With `start_from="full"`, the stream first emits every row of each tracked source table and then captures the changes from the CD tables. No change is missed between the load and the change capture. Duplicates are removed under the rules in [Full load limits](#full-load-limits).

-   Each table's snapshot is preceded by one `LOAD` row (`@td.cdc.meta.op = "l"`), and its rows arrive as inserts. A `LOAD` row tells the consumer to empty its copy of the table before applying the rows that follow.
-   The full load reads the source tables rather than the CD tables, and locks nothing. The changes committed while the tables are read are taken from the CD tables and reconciled with the rows read, and duplicates are removed under the rules in [Full load limits](#full-load-limits).
-   `asncap` must be running, since the load waits for Capture to reach the end of the load before handing over to the change stream.

To resynchronize a destination later, keep `start_from="full"` and reset the function's stage:

```bash
tdk fn update --reset-stage <other options>
```

The stream then starts again with a new full load and its `LOAD` rows. Resetting the stage with any other `start_from` restarts at that position and sends no `LOAD` row.

#### Full load limits

The load holds no snapshot. A change committed while the tables are read is loaded and replayed, then deduplicated under the rules of the MySQL lockless load. The limits are:

-   A keyless table cannot be matched row by row, so its changes inside the window arrive twice.
-   The `map` format fails the load with `CDC_26`.
-   A DDL change or a `TRUNCATE` during the load fails the stream with `CDC_23` to `CDC_25`.
-   A change that Db2 records as `CHG_UPD_TO_DEL_INS` fails the stream with `DB2_35`.
-   A load with more changes than `tabsdata.cdc.initial_load.max_window_changes` fails with `CDC_29`.

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
| `tabsdata.cdc.poll.max_secs` | `1` | Longest time one read of the CD tables waits for changes. |
| `tabsdata.cdc.poll.idle_secs` | `1` | Pause after a read that found no changes. |
| `tabsdata.cdc.fetch_size` | `100000` | Rows fetched per round trip. |
| `tabsdata.cdc.chunk_size` | `100000` | Rows per chunk while writing the full load. |
| `tabsdata.cdc.initial_load.max_window_changes` | `100000` | Most changes that may be committed to the tracked tables while the full load reads them. Above it, the load fails; run it again at a quieter time or raise the limit. |
| `tabsdata.cdc.max_large_text_length` | `1024` | Longest value, in characters, accepted from an unbounded text column. A longer value fails the stream. |
| `db2.cdc.logging_level` | `40` | Logging verbosity of the connector, as a Python logging level number (`10` debug, `20` info, `30` warning, `40` error). |

The buffer settings control when captured changes are written to files inside the worker. When those files are handed to the function is controlled by the [batch parameters](https://docs.tabsdata.com/developer/guide/functions/stream-publishers#batch-parameters) of `@stream_publisher`.

## Change rows

Every row the stream emits is one change. Besides the column values, each row carries change metadata:

| Column | Type | Description |
| --- | --- | --- |
| `@td.cdc.meta.op` | `str` | The operation: `"i"` insert, `"u"` update, `"d"` delete, `"l"` load (start of a full load). |
| `@td.cdc.meta.tx` | `str` | The commit sequence of the transaction, in hex. Full load rows carry `initial-load`. |
| `@td.cdc.meta.sq` | `int` | The change's sequence (`IBMSNAP_INTENTSEQ`). |
| `@td.cdc.meta.ts` | `datetime` (UTC) | When the transaction committed. Full load rows carry the time the snapshot was taken. |
| `@td.cdc.meta.seg` | `decimal` | The transaction's commit sequence (`IBMSNAP_COMMITSEQ`). Full load rows carry `-1`. |
| `@td.cdc.meta.ord` | `decimal` | The change's sequence (`IBMSNAP_INTENTSEQ`). Ordering by `seg` and then `ord` gives the order the changes were committed in. |
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
| Update (`u`) | The row after the update. | The row before the update. |
| Delete (`d`) | The deleted row. | Empty. |
| Load (`l`) | Empty. | Empty. |

Empty values are null columns with `"columns"`, a struct whose fields are all null with `"struct"`, and a JSON object whose values are all null with `"map"`.

A `LOAD` row tells the consumer to empty its copy of the table before applying the rows that follow.

SQL Replication does not copy LOB or XML values into the CD tables, so those columns always arrive as null.

`TRUNCATE` is not captured. To pick up a truncated table, reset the stage with `start_from="full"`.

Use `"columns"` with `flatten_columns=True` for changes that land in a table and get queried. Use `"struct"` or `"map"` when the source table's schema may change while the stream runs, to carry the values opaquely instead of changing the output table's columns.

## Operational notes

-   The stream reads only what `asncap` has captured. If Capture stops, the stream sees no new changes until it is running again.
-   If a tracked table is deregistered, its registration is deactivated, Capture cold-starts, or pruning removes CD rows the stream has not read yet, the stream fails with an error explaining what happened. The fix is to restore the registration if needed and run a new full load: reset the stage with `start_from="full"`.
-   A CD table added to `tables` after the stream started has no recorded position, so the stream fails until a new full load runs.

## Connection

Db2 CDC stream publishers use `Db2CdcStreamSrcConn` to define the database connection and credentials used by the stream.

conn-db2-cdc.yaml

```yaml
kind: connectionDef
apiVersion: '1.0'
type: tabsdatak.conn.db2:Db2CdcStreamSrcConn
spec:
  uri: 'db2://db.internal:50000/SALES'
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
tdk connection template --type db2-cdc --file conn-db2-cdc.yaml
```

Edit the template file with the Db2 connection information, check it, and create the collection with it:

```bash
tdk connection validate --file conn-db2-cdc.yaml
```

```bash
tdk collection create --name sales_cdc --conn-file conn-db2-cdc.yaml
```

Then register the stream publisher in the collection:

```bash
tdk fn register --coll sales_cdc --path stream_sales_changes.py::stream_sales_changes
```

-   The collection goes in the `sources` group, because the connection is a source connection. `--group` can be left out; if it is given, it must be `sources`.
-   `secret:<value>` gives a secret value in the file itself. `$secret:<ENV_VAR>` reads it from an environment variable when the collection is created, so the value never appears in the file. Either way, Tabsdata stores the secret separately, and the stored connection only shows a placeholder.
-   Functions in the collection must use the connector of its connection: `Db2CdcStreamSrc` for a collection created with `Db2CdcStreamSrcConn`. Transformers go in a collection of their own.
-   To change the connection later, for example to rotate a password, run `tdk collection update --name sales_cdc --conn-file conn-db2-cdc.yaml`. The connector cannot change; to use another one, create another collection.
-   Creating a source or destination collection requires permission to manage the project.
-   A batch `Db2Src` publisher cannot share this collection, because it uses a different connection (`db2-sql-in`).

### Connection Config Parameters

#### `uri`

The SQLAlchemy-style connection URI: `db2://host:port/database` (or `ibm_db_sa://`). Written as a plain value here, but accepts `secret:` too.

#### `credentials`

The database user and password, spliced into the URI at connect time. `UserPassword` requires a `user` and `password`.

#### `entity_whitelist`

A YAML list of regular expressions, not a comma-separated string. It is checked to be a list of valid regular expressions, but it has no effect yet: it does not limit which tables a stream can track. Leave it out.

#### `conn_cfg`

ibm\_db connection keywords, forwarded as SQLAlchemy `connect_args` to every connection the stream opens, including the full load's.

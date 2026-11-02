# Publish data from Db2 CDC

Source: https://docs.tabsdata.com/developer/tutorials/publishers/db2-cdc

Before you begin

[Quickstart a Server](https://docs.tabsdata.com/developer/server-admin/quickstart) or [Start a Server](https://docs.tabsdata.com/developer/server-admin/start)

[Create a Project](https://docs.tabsdata.com/developer/tutorials/managing-projects/create)

The Db2 CDC publisher captures row-level changes (inserts, updates, deletes) from a Db2 database using SQL Replication. Db2 SQL Replication captures changes into shadow CD (Change Data) tables that the ASN capture program (`asncap`) populates in the background, so `tables` names the CD tables rather than the original source tables — the connector resolves the source table from `ASN.IBMSNAP_REGISTER` automatically. A long-lived stream worker hands the captured changes to the publisher in batches, so this uses `@stream_publisher` rather than `@publisher`.

What you’ll do

1.  [Configure a connection to Db2](#configure-a-connection-to-db2)
2.  [Write and Register the Stream Publisher](#write-and-register-the-stream-publisher)

## Configure a connection to Db2

Step 1Generate a connection template

```bash
tdk connection template --type db2-cdc --file conn-db2-cdc.yaml
```

Step 2Fill in the URI and credentials, and bind it to a collection

```bash
tdk collection create --name sales_cdc --group sources --conn-file conn-db2-cdc.yaml
```

## Write and Register the Stream Publisher

Step 3Build the stream publisher file locally

read\_sales\_changes.py

```
1from tabsdatak.api import stream_publisher, TableFrameSpec, TableFramesSpec2from tabsdatak.conn.db2 import Db2CdcStreamSrc3from tabsdatak.tableframe.functions import concat4 5@stream_publisher(6  source=Db2CdcStreamSrc(1      tables=["ASN.TD_T__ORDERS", "ASN.TD_T__CUSTOMERS"],2      start_from="tail",9  ),3  batch_max_secs=120,4  output_tables=["orders_changes", "customers_changes"],12)5def read_sales_changes(orders: TableFramesSpec, customers: TableFramesSpec) -> tuple[TableFrameSpec, TableFrameSpec]:6  return concat(orders), concat(customers)
```

-   Qualified cd\_schema.cd\_table names of the CD tables to track, not the source tables.
    
-   "tail" begins at each table's current watermark and never backfills.
    
-   Hands the captured changes to the function at least every 120 seconds.
    
-   One output table per tracked CD table, in the same order.
    
-   One TableFramesSpec parameter per source slot, always array mode. No ctx parameter.
    
-   One frame per output table, the same order as output\_tables. concat folds each slot's list of frames into one, or returns None when the batch carried nothing for that table.
    

`start_from` also accepts `"full"` for a full load of the tracked tables followed by their changes, `"head"` to replay each tracked CD table from the origin, or an explicit `CommitSeqPosition(seq=...)`, `TableCommitSeqPosition(seqs={...})`, or `TimestampPosition(ts=...)`. A stream publisher takes no `trigger_by` and must not declare a `ctx` parameter — it runs inside the runtime's stream loop rather than per-transaction.

Step 4Register the stream publisher into the collection

```bash
tdk fn register --coll sales_cdc --path read_sales_changes.py::read_sales_changes
```

## Batches and buffering

`batch_max_secs=120` hands the captured changes to the function at least every two minutes. `batch_max_rows` and `batch_max_bytes` make a batch due sooner once that many changes or bytes are waiting, but never sooner than `batch_min_secs`, which is at least 60 seconds. See [Batch parameters](https://docs.tabsdata.com/developer/guide/functions/stream-publishers#batch-parameters).

The `src_cfg` buffer settings, such as `tabsdata.cdc.buffer.max_rows`, only decide when the worker writes the changes it holds in memory to a file. They do not make a batch due. See [`src_cfg`](https://docs.tabsdata.com/developer/guide/connectors/db2-cdc#src_cfg) on the Db2 CDC page for every accepted key.

```python
source=Db2CdcStreamSrc(
    tables=["ASN.TD_T__ORDERS"],
    start_from="tail",
    src_cfg={"tabsdata.cdc.buffer.max_rows": 5000},
)
```

## Output row shape

`columns_format` (default `"columns"`, or `"struct"` / `"map"`) and `flatten_columns` (default `True`) control how the new — and, where present, old — column values lay out on each emitted change row.

## Limitations

-   `TRUNCATE TABLE` operations are not captured.
-   All CD tables must exist before the stream publisher is registered; the connector does not perform runtime table discovery.
-   Schema changes on tracked tables are supported, but performing one on a table with CDC enabled is a complex administration effort on the Db2 side. Stop the stream publisher while schema changes are being made.

## Db2 Setup to Enable CDC

> Refer to the [IBM Db2 documentation](https://www.ibm.com/docs/en/db2) for comprehensive and up-to-date configuration instructions.

### Enable Archive Logging

SQL Replication requires archive logging so the capture agent can read the recovery log.

```shell
mkdir $HOME/archive
mkdir $HOME/backup

db2 UPDATE DB CFG FOR sales USING logarchmeth1 disk:$HOME/archive/

db2 BACKUP DB sales TO $HOME/backup/
```

A full backup is required after enabling archive logging.

### Create ASN Control Tables

The ASN control tables store capture metadata. Create them using the `asnclp` tool:

```shell
asnclp << EOF
SET SERVER CAPTURE TO DB sales;
SET CAPTURE SCHEMA SOURCE ASN;
CREATE CONTROL TABLES FOR CAPTURE SERVER;
EOF
```

### Start the Capture Agent

```shell
asncap capture_server=sales capture_schema=ASN &
```

The capture agent must be running before the connector can capture changes.

### Register Tables for Capture

```shell
asnclp << EOF
SET SERVER CAPTURE TO DB sales;
SET CAPTURE SCHEMA SOURCE ASN;
SET RUN SCRIPT NOW STOP ON SQL ERROR ON;
CREATE REGISTRATION (
    sales_schema.orders
)
DIFFERENTIAL REFRESH
IMAGE BOTH
PREFIX _
CAPTURE ALL;
EOF
```

| Option | Description |
| --- | --- |
| DIFFERENTIAL REFRESH | Only changed rows are captured, not full table snapshots. |
| IMAGE BOTH | Both before-image and after-image are recorded for updates. |
| PREFIX \_ | Before-image column names are prefixed with underscore. |
| CAPTURE ALL | All column changes are captured. |

### Create a CDC User

```sql
GRANT SELECT ON TABLE ASN.ibmsnap_register TO USER cdc_user;
GRANT SELECT ON TABLE ASN.TD_T__ORDERS TO USER cdc_user;
GRANT SELECT ON TABLE ASN.TD_T__CUSTOMERS TO USER cdc_user;
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

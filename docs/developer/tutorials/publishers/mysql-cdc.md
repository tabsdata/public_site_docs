# Publish data from MySQL CDC

Source: https://docs.tabsdata.com/developer/tutorials/publishers/mysql-cdc

Before you begin

[Quickstart a Server](https://docs.tabsdata.com/developer/server-admin/quickstart) or [Start a Server](https://docs.tabsdata.com/developer/server-admin/start)

[Create a Project](https://docs.tabsdata.com/developer/tutorials/managing-projects/create)

The MySQL CDC publisher captures row-level changes (inserts, updates, deletes) from a MySQL database by reading its binary log (binlog) in real time. A long-lived stream worker follows the binlog and hands the captured changes to the publisher in batches, so this uses `@stream_publisher` rather than `@publisher`.

What you’ll do

1.  [Configure a connection to MySQL](#configure-a-connection-to-mysql)
2.  [Write and Register the Stream Publisher](#write-and-register-the-stream-publisher)

## Configure a connection to MySQL

Step 1Generate a connection template

```bash
tdk connection template --type mysql-cdc --file conn-mysql-cdc.yaml
```

Step 2Fill in the URI and credentials, and bind it to a collection

```bash
tdk collection create --name sales_cdc --group sources --conn-file conn-mysql-cdc.yaml
```

The connection holds the URI and credentials for `MySQLCdcStreamSrcConn`, which is separate from the batch `MySQLSrcConn` connector: it also reserves a `server_id`, the replica identifier the binlog stream uses. Each concurrent CDC connection against the same MySQL server needs a distinct `server_id`.

## Write and Register the Stream Publisher

Step 3Build the stream publisher file locally

read\_sales\_changes.py

```
1from tabsdatak.api import stream_publisher, TableFrameSpec, TableFramesSpec2from tabsdatak.conn.mysql import MySQLCdcStreamSrc3from tabsdatak.tableframe.functions import concat4 5@stream_publisher(6  source=MySQLCdcStreamSrc(1      tables=["sales.orders", "sales.customers"],2      start_from="tail",9  ),3  batch_max_secs=120,4  output_tables=["orders_changes", "customers_changes"],12)5def read_sales_changes(orders: TableFramesSpec, customers: TableFramesSpec) -> tuple[TableFrameSpec, TableFrameSpec]:6  return concat(orders), concat(customers)
```

-   Qualified schema.table names to track.
    
-   "tail" begins at the current binlog position and never backfills.
    
-   Hands the captured changes to the function at least every 120 seconds.
    
-   One output table per tracked table, in the same order.
    
-   One TableFramesSpec parameter per source slot, always array mode. No ctx parameter.
    
-   One frame per output table, the same order as output\_tables. concat folds each slot's list of frames into one, or returns None when the batch carried nothing for that table.
    

`start_from` also accepts `"full"` for a full load of the tracked tables followed by their changes, `"head"` to begin at the oldest retained binlog, or an explicit `GtidPosition(gtid=...)`, `BinlogPosition(file=..., pos=...)`, or `TimestampPosition(ts=...)`. A stream publisher takes no `trigger_by` and must not declare a `ctx` parameter — it runs inside the runtime's stream loop rather than per-transaction.

Step 4Register the stream publisher into the collection

```bash
tdk fn register --coll sales_cdc --path read_sales_changes.py::read_sales_changes
```

## Batches and buffering

`batch_max_secs=120` hands the captured changes to the function at least every two minutes. `batch_max_rows` and `batch_max_bytes` make a batch due sooner once that many changes or bytes are waiting, but never sooner than `batch_min_secs`, which is at least 60 seconds. See [Batch parameters](https://docs.tabsdata.com/developer/guide/functions/stream-publishers#batch-parameters).

The `src_cfg` buffer settings, such as `tabsdata.cdc.buffer.max_rows`, only decide when the worker writes the changes it holds in memory to a file. They do not make a batch due. See [`src_cfg`](https://docs.tabsdata.com/developer/guide/connectors/mysql-cdc#src_cfg) on the MySQL CDC page for every accepted key.

```python
source=MySQLCdcStreamSrc(
    tables=["sales.orders"],
    start_from="tail",
    src_cfg={"tabsdata.cdc.buffer.max_rows": 5000},
)
```

## Output row shape

`columns_format` (default `"columns"`, or `"struct"` / `"map"`) and `flatten_columns` (default `True`) control how the new — and, where present, old — column values lay out on each emitted change row.

## Limitations

-   `TRUNCATE TABLE` is captured as a `t` row.
-   All tables must exist in the source database before the stream publisher is registered. Tables created afterward are not captured.
-   Schema changes on tracked tables (`ALTER TABLE`, `ADD COLUMN`, `DROP COLUMN`) are picked up automatically.

## MySQL Setup to Enable CDC

> Refer to the [MySQL documentation](https://dev.mysql.com/doc/) for comprehensive and up-to-date configuration instructions.

### Server Configuration

Add the following to your MySQL configuration file (`my.cnf` or `my.ini`) and restart the server:

```ini
[mysqld]
server-id                = 1
log_bin                  = mysql-bin
binlog_format            = ROW
binlog_row_image         = FULL
gtid_mode                = ON
enforce_gtid_consistency = ON
```

| Parameter | Description |
| --- | --- |
| server-id | Enables binary logging with a unique server identifier. |
| binlog\_format = ROW | Row-based format captures individual column values rather than SQL statements. |
| binlog\_row\_image = FULL | Logs all columns for every change, not just modified ones. |
| gtid\_mode = ON | Required for resuming from a precise position across server restarts. |

### Create a CDC User

```sql
CREATE USER 'cdc_user'@'%' IDENTIFIED BY 'cdc_password';
GRANT REPLICATION SLAVE, REPLICATION CLIENT ON *.* TO 'cdc_user'@'%';
GRANT SELECT ON sales.* TO 'cdc_user'@'%';
FLUSH PRIVILEGES;
```

`REPLICATION SLAVE` and `REPLICATION CLIENT` are the minimum privileges needed to connect as a binlog reader. `SELECT` is required for the initial table schema discovery.

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

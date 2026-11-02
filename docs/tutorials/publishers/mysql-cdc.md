# Publish data from MySQL CDC

> Publishes MySQL binlog changes to Tabsdata tables with @stream_publisher and MySQLCdcStreamSrc, covering start_from options, batch_max_secs, output_tables, and the mysql-connector-python driver requirement.

Source: https://docs.tabsdata.com/tutorials/publishers/mysql-cdc

Before you begin

[Quickstart a Server](https://docs.tabsdata.com/server-admin/quickstart) or [Start a Server](https://docs.tabsdata.com/server-admin/start)

[Connect to MCP](https://docs.tabsdata.com/guide/connect-agent)

warning

The MySQL CDC connector needs the `mysql-connector-python` driver, which Tabsdata does not redistribute. See [Installing Third-Party Database Drivers](https://docs.tabsdata.com/server-admin/third-party-database-drivers) to add it to your Tabsdata server.

## Follow the binlog instead of re-reading tables

A CDC source uses `@stream_publisher` rather than `@publisher`. A long-lived worker follows the MySQL binlog, and each time a batch is due it hands the changes captured since the previous batch to the publisher, which commits them. One output table per tracked table, so `tables` and `output_tables` line up position by position.

warning

There are several ways to pass secrets into Tabsdata. See [Secrets Management](https://docs.tabsdata.com/guide/secrets-management/) for more info if you are planning to have an LLM register secrets into Tabsdata's credential store.

AI agent session

❯Can you stream CDC changes to the orders and customers tables out of mysql

Listed 1 directory, called tabsdata 3 times (ctrl+o to expand)

⏺

That is a MySQL CDC stream publisher. Its guide and connection template are loaded. Five values left, then I generate and register. Reply with them one per line, or point me at a file that has them:

-   collection name
-   connection URI
-   user and password
-   tables to track, fully qualified
-   where to start reading, and how often to hand over a batch

❯everything you need is in 

Read 1 file, called tabsdata 2 times (ctrl+o to expand)

⏺

Password found. Reading back what is not secret: uri mysql://db.internal:3306/sales, tracking sales.orders and sales.customers, starting from tail, collection sales\_cdc.

Called tabsdata 4 times (ctrl+o to expand)

⏺

Collection **sales\_cdc** created in group `sources`, with a `MySQLCdcStreamSrcConn` to db.internal:3306. Connection check passed, and the user has the replication grants the binlog reader needs.

Called tabsdata 2 times (ctrl+o to expand)

⏺

The stream publisher, registered in `sales_cdc`. `start_from="tail"` means the worker begins at the current binlog position and never backfills, so the first version holds only changes committed after registration:

```python
@stream_publisher(
  source=MySQLCdcStreamSrc(
      tables=["sales.orders", "sales.customers"],
      start_from="tail",
  ),
  batch_max_secs=120,
  output_tables=["orders_changes", "customers_changes"],
)
def read_sales_changes(
  orders: TableFramesSpec,
  customers: TableFramesSpec,
) -> tuple[TableFrameSpec, TableFrameSpec]:
  return (concat(orders), concat(customers))
```

Called tabsdata 6 times (ctrl+o to expand)

⏺

Stream worker started. First batch committed within 2 minutes, 0 failures.

⏺

Two tables are live in **sales\_cdc**, and both gain a version per batch:

```
┌───────────────────┬─────────────────┬───────────────────┐
│       table       │    tracking     │ rows this version │
├───────────────────┼─────────────────┼───────────────────┤
│ orders_changes    │ sales.orders    │ 1,842             │
├───────────────────┼─────────────────┼───────────────────┤
│ customers_changes │ sales.customers │ 96                │
└───────────────────┴─────────────────┴───────────────────┘
```

`start_from` also accepts `"full"` for a full load of the tracked tables followed by their changes, `"head"` to begin at the oldest retained binlog, or an explicit position. Rows carry the change operation, so a downstream transformer can apply inserts, updates and deletes rather than treating every row as new. A stream publisher takes no `trigger_by` and must not declare a `ctx` parameter.

See [MySQL CDC](https://docs.tabsdata.com/guide/connectors/mysql-cdc) for every option of the source.

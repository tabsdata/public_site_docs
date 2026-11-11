# Publish data from Db2 CDC

> Covers publishing Db2 change data capture with @stream_publisher and Db2CdcStreamSrc: tables, start_from options (tail, full, head), batch_max_secs, and output_tables.

Source: https://docs.tabsdata.com/tutorials/publishers/db2-cdc

Before you begin

[Quickstart a Server](https://docs.tabsdata.com/server-admin/quickstart) or [Start a Server](https://docs.tabsdata.com/server-admin/start)

[Configure Your AI Agent](https://docs.tabsdata.com/guide/connect-agent)

## Follow the change log instead of re-reading tables

A CDC source uses `@stream_publisher` rather than `@publisher`. A long-lived worker follows the Db2 change log, and each time a batch is due it hands the changes captured since the previous batch to the publisher, which commits them. One output table per tracked table, so `tables` and `output_tables` line up position by position.

warning

There are several ways to pass secrets into Tabsdata. See [Secrets Management](https://docs.tabsdata.com/guide/secrets-management/) for more info if you are planning to have an LLM register secrets into Tabsdata's credential store.

AI agent session

❯Can you publish changes to the ORDERS and CUSTOMERS tables out of db2

Listed 1 directory, called tabsdata 3 times (ctrl+o to expand)

⏺

That is change data capture rather than a query read, so this is a Db2 CDC stream publisher. Its guide and connection template are loaded. Five values left, then I generate and register. Reply with them one per line, or point me at a file that has them:

-   collection name
-   connection URI
-   user and password
-   tables to track, fully qualified
-   where to start reading, and how often to hand over a batch

❯everything you need is in 

Read 1 file, called tabsdata 2 times (ctrl+o to expand)

⏺

Password found. Reading back what is not secret: uri db2+ibm\_db://db.internal:50000/sales, tracking SALES.ORDERS and SALES.CUSTOMERS, starting from tail, collection sales\_cdc.

Called tabsdata 4 times (ctrl+o to expand)

⏺

Collection **sales\_cdc** created in group `sources`, with a `Db2CdcStreamSrcConn` to db.internal:50000/sales. Connection check passed, and both tables have change capture enabled.

Called tabsdata 2 times (ctrl+o to expand)

⏺

The stream publisher, registered in `sales_cdc`. `start_from="tail"` means the worker begins at the current log position and never backfills, so the first version holds only changes committed after registration:

```python
@stream_publisher(
  source=Db2CdcStreamSrc(
      tables=["SALES.ORDERS", "SALES.CUSTOMERS"],
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
│ orders_changes    │ SALES.ORDERS    │ 1,842             │
├───────────────────┼─────────────────┼───────────────────┤
│ customers_changes │ SALES.CUSTOMERS │ 96                │
└───────────────────┴─────────────────┴───────────────────┘
```

`start_from` also accepts `"full"` for a full load of the tracked tables followed by their changes, `"head"` to begin at the oldest retained log, or an explicit position. Rows carry the change operation, so a downstream transformer can apply inserts, updates and deletes rather than treating every row as new. A stream publisher takes no `trigger_by` and must not declare a `ctx` parameter.

See [Db2 CDC](https://docs.tabsdata.com/guide/connectors/db2-cdc) for every option of the source.

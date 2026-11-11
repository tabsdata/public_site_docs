# Publish data from Postgres CDC

> Publishes Postgres CDC changes from tracked tables via @stream_publisher and a logical replication slot, covering PostgresCdcStreamSrc options, start_from, and slot behavior.

Source: https://docs.tabsdata.com/tutorials/publishers/postgres-cdc

Before you begin

[Quickstart a Server](https://docs.tabsdata.com/server-admin/quickstart) or [Start a Server](https://docs.tabsdata.com/server-admin/start)

[Configure Your AI Agent](https://docs.tabsdata.com/guide/connect-agent)

warning

The PostgreSQL CDC connector needs the `psycopg2-binary` driver, which Tabsdata does not redistribute. See [Installing Third-Party Database Drivers](https://docs.tabsdata.com/server-admin/third-party-database-drivers) to add it to your Tabsdata server.

## Follow the WAL instead of re-reading tables

A CDC source uses `@stream_publisher` rather than `@publisher`. A long-lived worker follows the write-ahead log through a logical replication slot, and each time a batch is due it hands the changes captured since the previous batch to the publisher, which commits them. One output table per tracked table, so `tables` and `output_tables` line up position by position.

Postgres is the one CDC source that needs a replication slot named up front, because the slot is what holds the WAL position between runs.

warning

There are several ways to pass secrets into Tabsdata. See [Secrets Management](https://docs.tabsdata.com/guide/secrets-management/) for more info if you are planning to have an LLM register secrets into Tabsdata's credential store.

AI agent session

❯Can you stream CDC changes to the orders and customers tables out of postgres

Listed 1 directory, called tabsdata 3 times (ctrl+o to expand)

⏺

That is a Postgres CDC stream publisher. Its guide and connection template are loaded. Six values left, then I generate and register. Reply with them one per line, or point me at a file that has them:

-   collection name
-   connection URI
-   user and password
-   tables to track, fully qualified
-   replication slot name
-   where to start reading, and how often to hand over a batch

❯everything you need is in 

Read 1 file, called tabsdata 2 times (ctrl+o to expand)

⏺

Password found. Reading back what is not secret: uri postgres://db.internal:5432/sales, tracking public.orders and public.customers, slot tabsdata\_sales, starting from tail, collection sales\_cdc.

Called tabsdata 4 times (ctrl+o to expand)

⏺

Collection **sales\_cdc** created in group `sources`, with a `PostgresCdcStreamSrcConn` to db.internal:5432/sales. Connection check passed, `wal_level` is `logical`, and the slot tabsdata\_sales already exists so the default `"reuse"` behavior applies.

Called tabsdata 2 times (ctrl+o to expand)

⏺

The stream publisher, registered in `sales_cdc`. `flatten_columns` defaults to true, so each source column arrives as its own column rather than nested inside a struct:

```python
@stream_publisher(
  source=PostgresCdcStreamSrc(
      tables=["public.orders", "public.customers"],
      replication_slot="tabsdata_sales",
      replication_slot_behavior="reuse",
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
┌───────────────────┬──────────────────┬───────────────────┐
│       table       │     tracking     │ rows this version │
├───────────────────┼──────────────────┼───────────────────┤
│ orders_changes    │ public.orders    │ 1,842             │
├───────────────────┼──────────────────┼───────────────────┤
│ customers_changes │ public.customers │ 96                │
└───────────────────┴──────────────────┴───────────────────┘
```

Set `replication_slot_behavior` to `"create"` to have the connector make the slot instead of expecting it. `start_from` also accepts `"full"` for a full load of the tracked tables followed by their changes, `"head"` for the oldest retained WAL, or an explicit LSN.

Tabsdata never drops the slot, not even when the function is deleted, and a slot that is no longer read makes the server keep WAL indefinitely. Drop it with `pg_drop_replication_slot('<slot>')` once its stream is gone. See [Postgres CDC](https://docs.tabsdata.com/guide/connectors/postgres-cdc) for every option of the source.

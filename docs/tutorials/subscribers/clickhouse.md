# Subscribe data to ClickHouse

> Writes Tabsdata subscriber output to ClickHouse tables using ClickHouseDest, with S3 staging, if_table_exists and schema_evolution options, and the tabsdata[clickhouse] install requirement.

Source: https://docs.tabsdata.com/tutorials/subscribers/clickhouse

Before you begin

[Quickstart a Server](https://docs.tabsdata.com/server-admin/quickstart) or [Start a Server](https://docs.tabsdata.com/server-admin/start)

[Connect to MCP](https://docs.tabsdata.com/guide/connect-agent)

## Write tables out to ClickHouse

One entry in `tables` per input table, in order. `if_table_exists="replace"` rebuilds each destination table from the frame, so a changed schema does not fail the run.

warning

There are several ways to pass secrets into Tabsdata. See [Secrets Management](https://docs.tabsdata.com/guide/secrets-management/) for more info if you are planning to have an LLM register secrets into Tabsdata's credential store.

AI agent session

❯Can you write the sales vendors and items tables out to clickhouse

Listed 1 directory, called tabsdata 3 times (ctrl+o to expand)

⏺

That is a subscriber, so it goes in a destination collection rather than a source one. The guide and connection template are loaded. Three values left, then I generate and register. Reply with them one per line, or point me at a file that has them:

-   collection name
-   destination address and credentials
-   target tables

❯everything you need is in 

Read 1 file, called tabsdata 2 times (ctrl+o to expand)

⏺

Both credential sets found, the database one and the staging one. Reading back what is not secret: clickhouse.internal:8123, database analytics, staging in acme-staging, collection analytics.

Called tabsdata 4 times (ctrl+o to expand)

⏺

Connection written to , and collection **analytics** created from it in group `destinations`. Connection check passed.

Called tabsdata 2 times (ctrl+o to expand)

⏺

The subscriber, registered in `analytics`:

```python
from tabsdatak.api import subscriber, TableFrameSpec
from tabsdatak.conn.clickhouse import ClickHouseDest


@subscriber(
  destination=ClickHouseDest(
      tables=["vendors", "items"],
      if_table_exists="replace",
      schema_evolution="strict",
  ),
  input_tables=["sales/vendors", "sales/items"],
)
def write_sales(
  vendors: TableFrameSpec,
  items: TableFrameSpec,
) -> tuple[TableFrameSpec, TableFrameSpec]:
  return (vendors, items)
```

Called tabsdata 6 times (ctrl+o to expand)

⏺

Execution committed, 0 failures. The frames were staged as Parquet in acme-staging, then loaded.

⏺

Two tables written in **analytics**, one per input table:

```
┌─────────┬───────────────┬───────┐
│  table  │  from table   │ rows  │
├─────────┼───────────────┼───────┤
│ vendors │ sales/vendors │ 312   │
├─────────┼───────────────┼───────┤
│ items   │ sales/items   │ 8,940 │
└─────────┴───────────────┴───────┘
```

Input tables are written as `collection/table`, since a subscriber reads from collections other than its own. A subscriber declares no `output_tables`: it returns one frame per destination slot, and returning `None` for a slot writes nothing that run.

Without `trigger_by`, the subscriber runs whenever any of its input tables gets a new commit, so an export stays current without a schedule.

The connector ships separately from the core package, so `pip install 'tabsdata[clickhouse]'` has to have run in the environment the server uses.

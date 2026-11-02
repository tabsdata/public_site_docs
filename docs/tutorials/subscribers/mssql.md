# Subscribe data to SQL Server

> Writes Tabsdata tables to SQL Server with the @subscriber decorator and MSSQLDest, covering connection URI and credentials, if_table_exists options, and the collection/table input format.

Source: https://docs.tabsdata.com/tutorials/subscribers/mssql

Before you begin

[Quickstart a Server](https://docs.tabsdata.com/server-admin/quickstart) or [Start a Server](https://docs.tabsdata.com/server-admin/start)

[Connect to MCP](https://docs.tabsdata.com/guide/connect-agent)

## Write tables out to SQL Server

One entry in `tables` per input table, in order. `if_table_exists="replace"` rebuilds each destination table from the frame, so a changed schema does not fail the run.

warning

There are several ways to pass secrets into Tabsdata. See [Secrets Management](https://docs.tabsdata.com/guide/secrets-management/) for more info if you are planning to have an LLM register secrets into Tabsdata's credential store.

AI agent session

❯Can you write the sales vendors and items tables out to sql server

Listed 1 directory, called tabsdata 3 times (ctrl+o to expand)

⏺

That is a subscriber, so it goes in a destination collection rather than a source one. The guide and connection template are loaded. Three values left, then I generate and register. Reply with them one per line, or point me at a file that has them:

-   collection name
-   destination address and credentials
-   target tables

❯everything you need is in 

Read 1 file, called tabsdata 2 times (ctrl+o to expand)

⏺

Credentials found. Reading back what is not secret: db.internal:1433/warehouse over ODBC Driver 18, collection warehouse, tables vendors and items.

Called tabsdata 4 times (ctrl+o to expand)

⏺

Connection written to , and collection **warehouse** created from it in group `destinations`. Connection check passed.

Called tabsdata 2 times (ctrl+o to expand)

⏺

The subscriber, registered in `warehouse`:

```python
from tabsdatak.api import subscriber, TableFrameSpec
from tabsdatak.conn.mssql import MSSQLDest


@subscriber(
  destination=MSSQLDest(
      tables=["dbo.vendors", "dbo.items"],
      if_table_exists="replace",
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

Execution committed, 0 failures.

⏺

Two tables written in **warehouse**, one per input table:

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

# Subscribe data to MongoDB

> Writes Tabsdata input tables to MongoDB collections using a @subscriber with MongoDBDest, covering collections_with_ids, if_collection_exists, update_existing, and the connectionDef YAML.

Source: https://docs.tabsdata.com/tutorials/subscribers/mongodb

Before you begin

[Quickstart a Server](https://docs.tabsdata.com/server-admin/quickstart) or [Start a Server](https://docs.tabsdata.com/server-admin/start)

[Configure Your AI Agent](https://docs.tabsdata.com/guide/connect-agent)

## Write tables out to MongoDB

One entry in `collections` per input table, in order. `if_collection_exists` decides whether an existing collection is replaced or added to.

warning

There are several ways to pass secrets into Tabsdata. See [Secrets Management](https://docs.tabsdata.com/guide/secrets-management/) for more info if you are planning to have an LLM register secrets into Tabsdata's credential store.

AI agent session

❯Can you write the sales vendors and items tables out to mongodb

Listed 1 directory, called tabsdata 3 times (ctrl+o to expand)

⏺

That is a subscriber, so it goes in a destination collection rather than a source one. The guide and connection template are loaded. Three values left, then I generate and register. Reply with them one per line, or point me at a file that has them:

-   collection name
-   destination address and credentials
-   target collections

❯everything you need is in 

Read 1 file, called tabsdata 2 times (ctrl+o to expand)

⏺

Credentials found. Reading back what is not secret: uri mongodb://db.internal:27017/warehouse, collection warehouse, target collections vendors and items.

Called tabsdata 4 times (ctrl+o to expand)

⏺

Connection written to , and collection **warehouse** created from it in group `destinations`. Connection check passed.

Called tabsdata 2 times (ctrl+o to expand)

⏺

The subscriber, registered in `warehouse`:

```python
from tabsdatak.api import subscriber, TableFrameSpec
from tabsdatak.conn.mongodb import MongoDBDest


@subscriber(
  destination=MongoDBDest(
      collections_with_ids=[
          ("sales_db.vendors", None),
          ("sales_db.items", "item_id"),
      ],
      if_collection_exists="replace",
      update_existing=True,
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

Two collections written in **warehouse**, one per input table:

```
┌────────────┬───────────────┬───────────┐
│ collection │  from table   │ documents │
├────────────┼───────────────┼───────────┤
│ vendors    │ sales/vendors │ 312       │
├────────────┼───────────────┼───────────┤
│ items      │ sales/items   │ 8,940     │
└────────────┴───────────────┴───────────┘
```

Input tables are written as `collection/table`, since a subscriber reads from collections other than its own. A subscriber declares no `output_tables`: it returns one frame per destination slot, and returning `None` for a slot writes nothing that run.

Without `trigger_by`, the subscriber runs whenever any of its input tables gets a new commit, so an export stays current without a schedule.

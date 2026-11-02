# Subscribe data to local files

> Writes Tabsdata tables to local Parquet files using a subscriber with LocalFileDest, covering paths, input_tables, output handling, and trigger_by.

Source: https://docs.tabsdata.com/tutorials/subscribers/local-file-system

Before you begin

[Quickstart a Server](https://docs.tabsdata.com/server-admin/quickstart) or [Start a Server](https://docs.tabsdata.com/server-admin/start)

[Connect to MCP](https://docs.tabsdata.com/guide/connect-agent)

## Write tables out to local files

One entry in `paths` per input table, in order, so each table lands as its own Parquet object.

warning

There are several ways to pass secrets into Tabsdata. See [Secrets Management](https://docs.tabsdata.com/guide/secrets-management/) for more info if you are planning to have an LLM register secrets into Tabsdata's credential store.

AI agent session

❯Can you write the hr departments and employees tables out to disk as parquet

Listed 1 directory, called tabsdata 3 times (ctrl+o to expand)

⏺

That is a subscriber, so it goes in a destination collection rather than a source one. The guide and connection template are loaded. Three values left, then I generate and register. Reply with them one per line, or point me at a file that has them:

-   collection name
-   destination address and credentials
-   target objects

❯everything you need is in 

Read 1 file, called tabsdata 2 times (ctrl+o to expand)

⏺

No credentials needed for a local destination, so nothing here is secret.

Called tabsdata 4 times (ctrl+o to expand)

⏺

Connection written to , and collection **exports** created from it in group `destinations`. Connection check passed.

Called tabsdata 2 times (ctrl+o to expand)

⏺

The subscriber, registered in `exports`:

```python
from tabsdatak.api import subscriber, TableFrameSpec
from tabsdatak.conn.localfile import LocalFileDest


@subscriber(
  destination=LocalFileDest(
      paths=["departments_${EXEC_PLAN_TS}.parquet", "employees_${EXEC_PLAN_TS}.parquet"],
  ),
  input_tables=["hr/departments", "hr/employees"],
)
def write_files(
  departments: TableFrameSpec,
  employees: TableFrameSpec,
) -> tuple[TableFrameSpec, TableFrameSpec]:
  return (departments, employees)
```

Called tabsdata 6 times (ctrl+o to expand)

⏺

Execution committed, 0 failures.

⏺

Two objects written under `/data/exports`, one per input table:

```
┌─────────────────────┬────────────────┬───────┬────────┐
│       object        │   from table   │ rows  │ bytes  │
├─────────────────────┼────────────────┼───────┼────────┤
│ departments.parquet │ hr/departments │ 14    │ 2.1 KB │
├─────────────────────┼────────────────┼───────┼────────┤
│ employees.parquet   │ hr/employees   │ 1,204 │ 86 KB  │
└─────────────────────┴────────────────┴───────┴────────┘
```

Input tables are written as `collection/table`, since a subscriber reads from collections other than its own. A subscriber declares no `output_tables`: it returns one frame per destination slot, and returning `None` for a slot writes nothing that run.

Without `trigger_by`, the subscriber runs whenever any of its input tables gets a new commit, so an export stays current without a schedule.

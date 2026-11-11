# Publish data from Azure Blob Storage

> Publishes CSV and other blobs from an Azure Blob Storage container into Tabsdata tables, covering `AzureBlobSrc` paths and globs, the `AzureBlobSrcConn` connection, account key credentials, `file_info`, and `initial_last_modified`.

Source: https://docs.tabsdata.com/tutorials/publishers/azure

Before you begin

[Quickstart a Server](https://docs.tabsdata.com/server-admin/quickstart) or [Start a Server](https://docs.tabsdata.com/server-admin/start)

[Configure Your AI Agent](https://docs.tabsdata.com/guide/connect-agent)

## Ingest blobs from a container

Each entry in `paths` fills one input slot and produces one output table. An exact blob name fills its slot with a single frame; a glob fills it with one frame per matched blob, which the function folds down to one.

warning

There are several ways to pass secrets into Tabsdata. See [Secrets Management](https://docs.tabsdata.com/guide/secrets-management/) for more info if you are planning to have an LLM register secrets into Tabsdata's credential store.

AI agent session

❯Can you publish departments.csv and all monthly employee files out of azure blob storage

Listed 1 directory, called tabsdata 3 times (ctrl+o to expand)

⏺

The Azure Blob publisher guide and connection template are loaded. Four values left, then I generate and register. Reply with them one per line, or point me at a file that has them:

-   collection name
-   container
-   account name and account key
-   blob names or patterns

❯everything you need is in 

Read 1 file, called tabsdata 2 times (ctrl+o to expand)

⏺

Account key found. Reading back what is not secret: container acme-ingest, account acmeingeststorage, collection hr\_src, base path /hr.

Called tabsdata 4 times (ctrl+o to expand)

⏺

Connection written to , and collection **hr\_src** created from it in group `sources` with `base_path` `/hr`. Connection check passed. `employees_*.csv` matches 3 blobs under `/hr`:

-   employees\_2026\_01.csv
-   employees\_2026\_02.csv
-   employees\_2026\_03.csv

Called tabsdata 2 times (ctrl+o to expand)

⏺

The publisher, registered in `hr_src`. The exact name returns its one frame, and the glob folds its three with `concat()`:

```python
@publisher(
  source=AzureBlobSrc(
      paths=["departments.csv", "employees_*.csv"],
      file_info="uri",
  ),
  output_tables=["departments", "employees"],
)
def read_hr(
  departments: TableFramesSpec,
  employees: TableFramesSpec,
) -> tuple[TableFrameSpec, TableFrameSpec]:
  return (departments[0], concat(employees))
```

Called tabsdata 6 times (ctrl+o to expand)

⏺

Execution committed, 0 failures.

⏺

Two tables are live in **hr\_src**. `file_info="uri"` added a column naming the blob each row came from, which is how the three months stay distinguishable after the concat:

```
┌─────────────┬──────────────────────────────────┬───────┬─────────┐
│    table    │               from               │ rows  │ columns │
├─────────────┼──────────────────────────────────┼───────┼─────────┤
│ departments │ departments.csv                  │ 14    │ 4       │
├─────────────┼──────────────────────────────────┼───────┼─────────┤
│ employees   │ 3 blobs matching employees_*.csv │ 3,612 │ 12      │
└─────────────┴──────────────────────────────────┴───────┴─────────┘
```

Paths resolve against the connection's `base_path`, so the publisher names blobs and never the container. `initial_last_modified` limits a run to blobs modified after a timestamp, and the cutoff advances on every later run.

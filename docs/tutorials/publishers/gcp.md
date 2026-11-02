# Publish data from Google Cloud Storage

> Publishes objects from a Google Cloud Storage bucket into Tabsdata tables using a GCS source connection with a service account JSON key, `paths` globs, and `initial_last_modified`.

Source: https://docs.tabsdata.com/tutorials/publishers/gcp

Before you begin

[Quickstart a Server](https://docs.tabsdata.com/server-admin/quickstart) or [Start a Server](https://docs.tabsdata.com/server-admin/start)

[Connect to MCP](https://docs.tabsdata.com/guide/connect-agent)

## Ingest objects from a bucket

Each entry in `paths` fills one input slot and produces one output table. Credentials are a service account JSON key rather than an id and secret pair, so the whole key goes in as one value.

warning

There are several ways to pass secrets into Tabsdata. See [Secrets Management](https://docs.tabsdata.com/guide/secrets-management/) for more info if you are planning to have an LLM register secrets into Tabsdata's credential store.

AI agent session

❯Can you publish departments.csv and the monthly employees files out of google cloud storage

Listed 1 directory, called tabsdata 3 times (ctrl+o to expand)

⏺

The GCS publisher guide and connection template are loaded. Four values left, then I generate and register. Reply with them one per line, or point me at a file that has them:

-   collection name
-   bucket and project
-   service account JSON key
-   object names or patterns

❯everything you need is in 

Read 2 files, called tabsdata 2 times (ctrl+o to expand)

⏺

Service account key read from ~/acme-sa.json and held as one secret value. Reading back what is not secret: bucket acme-ingest, project acme-analytics, collection hr\_src, base path /hr.

Called tabsdata 4 times (ctrl+o to expand)

⏺

Connection written to , and collection **hr\_src** created from it in group `sources` with `base_path` `/hr`. Connection check passed. `employees_*.csv` matches 3 objects under `/hr`:

-   employees\_2026\_01.csv
-   employees\_2026\_02.csv
-   employees\_2026\_03.csv

Called tabsdata 2 times (ctrl+o to expand)

⏺

The publisher, registered in `hr_src`. The exact name returns its one frame, and the glob folds its three with `concat()`:

```python
@publisher(
  source=GCSSrc(
      paths=["departments.csv", "employees_*.csv"],
      initial_last_modified="2026-01-01T00:00:00Z",
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

Two tables are live in **hr\_src**. `initial_last_modified` was set to the start of the year, so this first run took only objects modified since then:

```
┌─────────────┬────────────────────────────────────┬───────┬─────────┐
│    table    │                from                │ rows  │ columns │
├─────────────┼────────────────────────────────────┼───────┼─────────┤
│ departments │ departments.csv                    │ 14    │ 3       │
├─────────────┼────────────────────────────────────┼───────┼─────────┤
│ employees   │ 3 objects matching employees_*.csv │ 3,612 │ 11      │
└─────────────┴────────────────────────────────────┴───────┴─────────┘
```

The cutoff advances on its own after that first run, so each later trigger reads only what arrived since the previous one. Paths resolve against the connection's `base_path`, so the publisher names objects and never the bucket.

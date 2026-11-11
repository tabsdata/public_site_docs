# Publish data from SQL Server

> Publishes SQL Server query results to Tabsdata with an MSSQLSrc source, covering the mssql+pyodbc connection URI, ODBC driver setting, credentials, and the queries and output_tables options.

Source: https://docs.tabsdata.com/tutorials/publishers/mssql

Before you begin

[Quickstart a Server](https://docs.tabsdata.com/server-admin/quickstart) or [Start a Server](https://docs.tabsdata.com/server-admin/start)

[Configure Your AI Agent](https://docs.tabsdata.com/guide/connect-agent)

## Ingest query results from SQL Server

Each entry in `queries` produces one output table. The URI carries the ODBC driver name, which is the part most often wrong on a first attempt.

warning

There are several ways to pass secrets into Tabsdata. See [Secrets Management](https://docs.tabsdata.com/guide/secrets-management/) for more info if you are planning to have an LLM register secrets into Tabsdata's credential store.

AI agent session

❯Can you publish the country and city tables out of sql server

Listed 1 directory, called tabsdata 3 times (ctrl+o to expand)

⏺

The SQL Server publisher guide and connection template are loaded. Four values left, then I generate and register. Reply with them one per line, or point me at a file that has them:

-   collection name
-   connection URI, including the ODBC driver
-   user and password
-   tables to read

❯everything you need is in 

Read 1 file, called tabsdata 2 times (ctrl+o to expand)

⏺

Password found. Reading back what is not secret: db.internal:1433/warehouse over ODBC Driver 18, collection warehouse\_src, tables dbo.country and dbo.city.

Called tabsdata 4 times (ctrl+o to expand)

⏺

Connection written to , and collection **warehouse\_src** created from it in group `sources`. Connection check passed.

Called tabsdata 2 times (ctrl+o to expand)

⏺

The publisher, registered in `warehouse_src`:

```python
@publisher(
  source=MSSQLSrc(
      queries=[
          "SELECT * FROM dbo.country",
          "SELECT * FROM dbo.city",
      ],
  ),
  output_tables=["country", "city"],
)
def read_warehouse(
  country: TableFramesSpec,
  city: TableFramesSpec,
) -> tuple[TableFrameSpec, TableFrameSpec]:
  return (country[0], city[0])
```

Called tabsdata 6 times (ctrl+o to expand)

⏺

Execution committed, 0 failures.

⏺

Two tables are live in **warehouse\_src**. The schema prefix stays in the query and the output table names drop it:

```
┌─────────┬───────────────────────────┬───────┬─────────┐
│  table  │           from            │ rows  │ columns │
├─────────┼───────────────────────────┼───────┼─────────┤
│ country │ SELECT * FROM dbo.country │ 239   │ 15      │
├─────────┼───────────────────────────┼───────┼─────────┤
│ city    │ SELECT * FROM dbo.city    │ 4,079 │ 5       │
└─────────┴───────────────────────────┴───────┴─────────┘
```

Output table names are yours to choose and need not match the source table. `dbo.country` becomes `country` here because the schema prefix carries no meaning once the rows are in Tabsdata.

# Publish data from Postgres

> Publishes query results from a PostgreSQL database into Tabsdata with the PostgresSrc source, PostgresSrcConn connection, and psycopg2-binary driver requirement.

Source: https://docs.tabsdata.com/tutorials/publishers/postgres

Before you begin

[Quickstart a Server](https://docs.tabsdata.com/server-admin/quickstart) or [Start a Server](https://docs.tabsdata.com/server-admin/start)

[Connect to MCP](https://docs.tabsdata.com/guide/connect-agent)

warning

The PostgreSQL connector needs the `psycopg2-binary` driver, which Tabsdata does not redistribute. See [Installing Third-Party Database Drivers](https://docs.tabsdata.com/server-admin/third-party-database-drivers) to add it to your Tabsdata server.

## Ingest query results from Postgres

Each entry in `queries` produces one output table, so the query list and the table list line up position by position.

warning

There are several ways to pass secrets into Tabsdata. See [Secrets Management](https://docs.tabsdata.com/guide/secrets-management/) for more info if you are planning to have an LLM register secrets into Tabsdata's credential store.

AI agent session

❯Can you publish the country and city tables out of postgres

Listed 1 directory, called tabsdata 3 times (ctrl+o to expand)

⏺

The Postgres publisher guide and connection template are loaded. Four values left, then I generate and register. Reply with them one per line, or point me at a file that has them:

-   collection name
-   connection URI
-   user and password
-   tables to read

❯everything you need is in 

Read 1 file, called tabsdata 2 times (ctrl+o to expand)

⏺

Password found. Reading back what is not secret: uri postgres://db.internal:5432/world, collection world\_src, tables country and city.

Called tabsdata 4 times (ctrl+o to expand)

⏺

Connection written to , and collection **world\_src** created from it in group `sources`. Connection check passed.

Called tabsdata 2 times (ctrl+o to expand)

⏺

The publisher, registered in `world_src`:

```python
@publisher(
  source=PostgresSrc(
      queries=[
          "SELECT * FROM country",
          "SELECT * FROM city",
      ],
  ),
  output_tables=["country", "city"],
)
def read_world(
  country: TableFramesSpec,
  city: TableFramesSpec,
) -> tuple[TableFrameSpec, TableFrameSpec]:
  return (country[0], city[0])
```

Called tabsdata 6 times (ctrl+o to expand)

⏺

Execution committed, 0 failures.

⏺

Two tables are live in **world\_src**, one per query, in the order the queries were listed:

```
┌─────────┬───────────────────────┬───────┬─────────┐
│  table  │         from          │ rows  │ columns │
├─────────┼───────────────────────┼───────┼─────────┤
│ country │ SELECT * FROM country │ 239   │ 15      │
├─────────┼───────────────────────┼───────┼─────────┤
│ city    │ SELECT * FROM city    │ 4,079 │ 5       │
└─────────┴───────────────────────┴───────┴─────────┘
```

The connection carries the URI and the credentials, so the publisher holds SQL and nothing about where the database is. Registering the same code into a second source collection reads the same queries against a different server.

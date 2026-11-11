# Publish data from Oracle

> Publishes query results from an Oracle database into Tabsdata with the OracleSrc source, covering the oracledb driver requirement, connection YAML, and the queries and output_tables arguments of @publisher.

Source: https://docs.tabsdata.com/tutorials/publishers/oracle

Before you begin

[Quickstart a Server](https://docs.tabsdata.com/server-admin/quickstart) or [Start a Server](https://docs.tabsdata.com/server-admin/start)

[Configure Your AI Agent](https://docs.tabsdata.com/guide/connect-agent)

warning

The Oracle connector needs the `oracledb` driver, which Tabsdata does not redistribute. See [Installing Third-Party Database Drivers](https://docs.tabsdata.com/server-admin/third-party-database-drivers) to add it to your Tabsdata server.

## Ingest query results from Oracle

Each entry in `queries` produces one output table. Oracle identifiers are upper case unless they were created quoted, so the queries carry upper case names while the output tables use whatever you name them.

warning

There are several ways to pass secrets into Tabsdata. See [Secrets Management](https://docs.tabsdata.com/guide/secrets-management/) for more info if you are planning to have an LLM register secrets into Tabsdata's credential store.

AI agent session

❯Can you publish the COUNTRY and CITY tables out of oracle

Listed 1 directory, called tabsdata 3 times (ctrl+o to expand)

⏺

The Oracle publisher guide and connection template are loaded. Four values left, then I generate and register. Reply with them one per line, or point me at a file that has them:

-   collection name
-   connection URI
-   user and password
-   tables to read

❯everything you need is in 

Read 1 file, called tabsdata 2 times (ctrl+o to expand)

⏺

Password found. Reading back what is not secret: uri oracle://db.internal:1521/world, collection world\_src, tables COUNTRY and CITY.

Called tabsdata 4 times (ctrl+o to expand)

⏺

Connection written to , and collection **world\_src** created from it in group `sources`. Connection check passed.

Called tabsdata 2 times (ctrl+o to expand)

⏺

The publisher, registered in `world_src`:

```python
@publisher(
  source=OracleSrc(
      queries=[
          "SELECT * FROM COUNTRY",
          "SELECT * FROM CITY",
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

Two tables are live in **world\_src**, named in lower case even though the queries are upper case:

```
┌─────────┬───────────────────────┬───────┬─────────┐
│  table  │         from          │ rows  │ columns │
├─────────┼───────────────────────┼───────┼─────────┤
│ country │ SELECT * FROM COUNTRY │ 239   │ 15      │
├─────────┼───────────────────────┼───────┼─────────┤
│ city    │ SELECT * FROM CITY    │ 4,079 │ 5       │
└─────────┴───────────────────────┴───────┴─────────┘
```

Column names arrive as Oracle reports them, which is upper case for unquoted identifiers. A transformer downstream can rename them if the rest of your pipeline expects lower case.

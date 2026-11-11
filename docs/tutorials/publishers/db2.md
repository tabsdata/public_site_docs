# Publish data from Db2

> Publishes query results from a Db2 database into Tabsdata via the db2+ibm_db connector, with Db2Src queries, output tables, and connection setup.

Source: https://docs.tabsdata.com/tutorials/publishers/db2

Before you begin

[Quickstart a Server](https://docs.tabsdata.com/server-admin/quickstart) or [Start a Server](https://docs.tabsdata.com/server-admin/start)

[Configure Your AI Agent](https://docs.tabsdata.com/guide/connect-agent)

## Ingest query results from Db2

Each entry in `queries` produces one output table. The URI uses the `db2+ibm_db` scheme, which is the driver the connector reads through.

warning

There are several ways to pass secrets into Tabsdata. See [Secrets Management](https://docs.tabsdata.com/guide/secrets-management/) for more info if you are planning to have an LLM register secrets into Tabsdata's credential store.

AI agent session

❯Can you publish the COUNTRY and CITY tables out of db2

Listed 1 directory, called tabsdata 3 times (ctrl+o to expand)

⏺

The Db2 publisher guide and connection template are loaded. Four values left, then I generate and register. Reply with them one per line, or point me at a file that has them:

-   collection name
-   connection URI
-   user and password
-   tables to read

❯everything you need is in 

Read 1 file, called tabsdata 2 times (ctrl+o to expand)

⏺

Password found. Reading back what is not secret: uri db2+ibm\_db://db.internal:50000/world, collection world\_src, tables COUNTRY and CITY.

Called tabsdata 4 times (ctrl+o to expand)

⏺

Connection written to , and collection **world\_src** created from it in group `sources`. Connection check passed.

Called tabsdata 2 times (ctrl+o to expand)

⏺

The publisher, registered in `world_src`:

```python
@publisher(
  source=Db2Src(
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

Two tables are live in **world\_src**, one per query, in the order the queries were listed:

```
┌─────────┬───────────────────────┬───────┬─────────┐
│  table  │         from          │ rows  │ columns │
├─────────┼───────────────────────┼───────┼─────────┤
│ country │ SELECT * FROM COUNTRY │ 239   │ 15      │
├─────────┼───────────────────────┼───────┼─────────┤
│ city    │ SELECT * FROM CITY    │ 4,079 │ 5       │
└─────────┴───────────────────────┴───────┴─────────┘
```

For change data capture rather than a full read on every run, see [Publish data from Db2 CDC](https://docs.tabsdata.com/tutorials/publishers/db2-cdc), which uses a stream publisher instead.

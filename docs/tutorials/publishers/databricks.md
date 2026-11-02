# Publish data from Databricks

> Publishes Databricks SQL query results to Tabsdata tables using the DatabricksSrc connector, with {placeholder} substitution via initial_values, staging volumes, and warehouse or warehouse_id options.

Source: https://docs.tabsdata.com/tutorials/publishers/databricks

Before you begin

[Quickstart a Server](https://docs.tabsdata.com/server-admin/quickstart) or [Start a Server](https://docs.tabsdata.com/server-admin/start)

[Connect to MCP](https://docs.tabsdata.com/guide/connect-agent)

## Ingest query results from Databricks

Each entry in `queries` produces one output table. A query can carry `{placeholder}` names that `initial_values` fills in, which is how one publisher reads the same tables out of a different catalog or schema without the SQL changing.

warning

There are several ways to pass secrets into Tabsdata. See [Secrets Management](https://docs.tabsdata.com/guide/secrets-management/) for more info if you are planning to have an LLM register secrets into Tabsdata's credential store.

AI agent session

❯Can you publish the country and city tables out of databricks

Listed 1 directory, called tabsdata 3 times (ctrl+o to expand)

⏺

The Databricks publisher guide and connection template are loaded. Five values left, then I generate and register. Reply with them one per line, or point me at a file that has them:

-   collection name
-   workspace host URL and access token
-   staging volume
-   warehouse
-   tables to read

❯everything you need is in 

Read 1 file, called tabsdata 2 times (ctrl+o to expand)

⏺

Token found, and the host URL is a secret field too, so both are held out of the stored document. Reading back what is not secret: volume main.default.tabsdata\_stage, warehouse analytics\_wh, catalog main, schema default, collection world\_src.

Called tabsdata 4 times (ctrl+o to expand)

⏺

Connection written to , and collection **world\_src** created from it in group `sources`, reading through the analytics\_wh warehouse and staging in main.default.tabsdata\_stage. Connection check passed.

Called tabsdata 2 times (ctrl+o to expand)

⏺

The publisher, registered in `world_src`. Catalog and schema are placeholders rather than literals, so the same code runs against another catalog by changing one dict:

```python
@publisher(
  source=DatabricksSrc(
      queries=[
          "SELECT * FROM {catalog}.{schema}.country",
          "SELECT * FROM {catalog}.{schema}.city",
      ],
      initial_values={"catalog": "main", "schema": "default"},
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

Execution committed, 0 failures. The read went through the warehouse and landed in the staging volume before Tabsdata picked it up.

⏺

Two tables are live in **world\_src**, one per query, in the order the queries were listed:

```
┌─────────┬──────────────────────┬───────┬─────────┐
│  table  │         from         │ rows  │ columns │
├─────────┼──────────────────────┼───────┼─────────┤
│ country │ main.default.country │ 239   │ 15      │
├─────────┼──────────────────────┼───────┼─────────┤
│ city    │ main.default.city    │ 4,079 │ 5       │
└─────────┴──────────────────────┴───────┴─────────┘
```

`warehouse` and `warehouse_id` name the same thing two ways and are mutually exclusive, so the connection carries one or the other. The staging volume has to be a managed Databricks volume the token can write to, since the connector unloads through it rather than streaming rows.

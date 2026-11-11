# Publish data from MySQL

> Publishes query results from a MySQL database into Tabsdata tables using MySQLSrc, a connectionDef YAML, and secret references.

Source: https://docs.tabsdata.com/tutorials/publishers/mysql

Before you begin

[Quickstart a Server](https://docs.tabsdata.com/server-admin/quickstart) or [Start a Server](https://docs.tabsdata.com/server-admin/start)

[Configure Your AI Agent](https://docs.tabsdata.com/guide/connect-agent)

## Ingest query results from MySQL

Each entry in `queries` produces one output table, so the query list and the table list line up position by position.

warning

There are several ways to pass secrets into Tabsdata. See [Secrets Management](https://docs.tabsdata.com/guide/secrets-management/) for more info if you are planning to have an LLM register secrets into Tabsdata's credential store.

AI agent session

❯Can you publish the country, city and country\_language tables out of mysql

Listed 1 directory, called tabsdata 3 times (ctrl+o to expand)

⏺

The MySQL publisher guide and connection template are loaded. Four values left, then I generate and register. Reply with them one per line, or point me at a file that has them:

-   collection name
-   connection URI
-   user and password
-   tables to read

❯everything you need is in 

Read 1 file, called tabsdata 2 times (ctrl+o to expand)

⏺

Password found. Reading back what is not secret: uri mysql://db.internal:3306/world, collection world\_src, three tables.

Called tabsdata 4 times (ctrl+o to expand)

⏺

Connection written to , and collection **world\_src** created from it in group `sources`. Connection check passed.

Called tabsdata 2 times (ctrl+o to expand)

⏺

The publisher, registered in `world_src`:

```python
@publisher(
  source=MySQLSrc(
      queries=[
          "SELECT * FROM country",
          "SELECT * FROM city",
          "SELECT * FROM country_language",
      ],
  ),
  output_tables=["country", "city", "country_language"],
)
def read_world(
  country: TableFramesSpec,
  city: TableFramesSpec,
  country_language: TableFramesSpec,
) -> tuple[TableFrameSpec, TableFrameSpec, TableFrameSpec]:
  return (country[0], city[0], country_language[0])
```

Called tabsdata 6 times (ctrl+o to expand)

⏺

Execution committed, 0 failures.

⏺

Three tables are live in **world\_src**, one per query, in the order the queries were listed:

```
┌──────────────────┬────────────────────────────────┬───────┬─────────┐
│      table       │              from              │ rows  │ columns │
├──────────────────┼────────────────────────────────┼───────┼─────────┤
│ country          │ SELECT * FROM country          │ 239   │ 15      │
├──────────────────┼────────────────────────────────┼───────┼─────────┤
│ city             │ SELECT * FROM city             │ 4,079 │ 5       │
├──────────────────┼────────────────────────────────┼───────┼─────────┤
│ country_language │ SELECT * FROM country_language │ 984   │ 4       │
└──────────────────┴────────────────────────────────┴───────┴─────────┘
```

The connection carries the URI and the credentials, so the publisher holds SQL and nothing about where the database is. Registering the same code into a second source collection reads the same queries against a different server.

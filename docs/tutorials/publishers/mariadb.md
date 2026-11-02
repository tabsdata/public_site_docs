# Publish data from MariaDB

> Publishes MariaDB query results as Tabsdata tables through the MySQL connector, covering the MySQLSrcConn connection, MySQLSrc source, and the mysql-connector-python driver requirement.

Source: https://docs.tabsdata.com/tutorials/publishers/mariadb

Before you begin

[Quickstart a Server](https://docs.tabsdata.com/server-admin/quickstart) or [Start a Server](https://docs.tabsdata.com/server-admin/start)

[Connect to MCP](https://docs.tabsdata.com/guide/connect-agent)

warning

The MariaDB connector needs the `mysql-connector-python` driver, which Tabsdata does not redistribute. See [Installing Third-Party Database Drivers](https://docs.tabsdata.com/server-admin/third-party-database-drivers) to add it to your Tabsdata server.

## Ingest query results from MariaDB

MariaDB speaks the MySQL wire protocol, so the MySQL connector reads it: the connection type is `MySQLSrcConn` and the source class is `MySQLSrc`. Each entry in `queries` produces one output table.

warning

There are several ways to pass secrets into Tabsdata. See [Secrets Management](https://docs.tabsdata.com/guide/secrets-management/) for more info if you are planning to have an LLM register secrets into Tabsdata's credential store.

AI agent session

❯Can you publish the orders and customers tables out of mariadb

Listed 1 directory, called tabsdata 3 times (ctrl+o to expand)

⏺

MariaDB is read through the MySQL connector, and its guide and connection template are loaded. Four values left, then I generate and register. Reply with them one per line, or point me at a file that has them:

-   collection name
-   connection URI
-   user and password
-   tables to read

❯everything you need is in 

Read 1 file, called tabsdata 2 times (ctrl+o to expand)

⏺

Password found. Reading back what is not secret: uri mysql://maria.internal:3306/sales, collection sales\_src, tables orders and customers.

Called tabsdata 4 times (ctrl+o to expand)

⏺

Connection written to , with the MySQL connector type and the MariaDB URI, and collection **sales\_src** created from it in group `sources`. Connection check passed.

Called tabsdata 2 times (ctrl+o to expand)

⏺

The publisher, registered in `sales_src`:

```python
@publisher(
  source=MySQLSrc(
      queries=[
          "SELECT * FROM orders",
          "SELECT * FROM customers",
      ],
  ),
  output_tables=["orders", "customers"],
)
def read_sales(
  orders: TableFramesSpec,
  customers: TableFramesSpec,
) -> tuple[TableFrameSpec, TableFrameSpec]:
  return (orders[0], customers[0])
```

Called tabsdata 6 times (ctrl+o to expand)

⏺

Execution committed, 0 failures.

⏺

Two tables are live in **sales\_src**, one per query, in the order the queries were listed:

```
┌───────────┬─────────────────────────┬────────┬─────────┐
│   table   │          from           │  rows  │ columns │
├───────────┼─────────────────────────┼────────┼─────────┤
│ orders    │ SELECT * FROM orders    │ 48,112 │ 9       │
├───────────┼─────────────────────────┼────────┼─────────┤
│ customers │ SELECT * FROM customers │ 3,204  │ 7       │
└───────────┴─────────────────────────┴────────┴─────────┘
```

The `mysql://` scheme is correct for MariaDB. Nothing in the connection or the publisher names MariaDB specifically, so a server migrated between the two needs no change here.

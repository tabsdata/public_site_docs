# MariaDB

> Reference for the Tabsdata MariaDB connector.

Source: https://docs.tabsdata.com/guide/connectors/mariadb

The MariaDB connector lets Tabsdata run queries against MariaDB and write tables into MariaDB.

The `MySQLSrc` connector can be used by a publisher function to read data from MariaDB into a Tabsdata table.

The `MySQLDest` connector can be used by a subscriber function to write data from a Tabsdata table into MariaDB.

## Publisher

The `MySQLSrc` connector can be used by a publisher function to read data from MariaDB into a Tabsdata table. [See the full publisher walkthrough](https://docs.tabsdata.com/tutorials/publishers/mariadb)

The publisher is registered in a collection created with a `MySQLSrcConn` connection. The connection, and how to create the collection, are described in [Publisher connection](#publisher-connection), at the end of this page.

### Prerequisites

-   The MariaDB server is reachable from the Tabsdata server.
-   The connection user can run every query in `queries` and read every referenced table or view.

### Publisher

Configure `MySQLSrc` as the `source` of a publisher function to select the queries that Tabsdata runs against MariaDB.

publish\_orders.py

```python
from tabsdatak.api import publisher
from tabsdatak.conn.mysql import MySQLSrc

@publisher(
    source=MySQLSrc(
        queries=[
            "SELECT * FROM orders",
        ],
    ),
    output_tables=["orders"],
)
def publish_orders(orders):
    return orders
```

-   required
    
-   optional
    
-   optional
    

### Function Config Parameters

#### `queries`

Defines the SQL queries the publisher runs against MariaDB.

Each element in `queries` represents one source slot and maps positionally to an argument in the publisher function.

For example:

```python
MySQLSrc(
    queries=[
        "SELECT * FROM country",
        "SELECT * FROM city",
    ],
)
```

#### `initial_values`

The first-run values for named parameters in `queries`, written `:name`. On later runs each parameter takes the value the publisher stored with `ctx.set_attr(name, value)`, so a query can read only the rows added since the last run.

Parameters bind values such as IDs and timestamps, not identifiers. Schema and table names have to be written into the query.

For example:

```python
from tabsdatak.api import TableFrameSpec, TrxCtx, publisher
from tabsdatak.conn.mysql import MySQLSrc


@publisher(
    source=MySQLSrc(
        queries=["SELECT * FROM orders WHERE id > :last_id ORDER BY id"],
        initial_values={"last_id": 0},
    ),
    output_tables=["orders"],
)
def publish_orders(orders: TableFrameSpec, ctx: TrxCtx) -> TableFrameSpec:
    row = orders.max_for("id")
    if row is not None and row["id"] is not None:
        ctx.set_attr("last_id", int(row["id"]))
    return orders
```

#### `src_cfg`

Sets additional source configuration.

## Subscriber

The `MySQLDest` connector can be used by a subscriber function to write data from a Tabsdata table into MariaDB. [See the full subscriber walkthrough](https://docs.tabsdata.com/tutorials/subscribers/mariadb)

The subscriber is registered in a collection created with a `MySQLDestConn` connection. The connection, and how to create the collection, are described in [Subscriber connection](#subscriber-connection), at the end of this page.

### Prerequisites

-   The MariaDB server is reachable from the Tabsdata server.
-   The connection user can create missing destination tables and insert rows. With `if_table_exists="replace"`, it also needs to drop and create tables, and with `schema_evolution="update"`, to alter them.

### Subscriber

Configure `MySQLDest` as the `destination` of a subscriber function to define which tables Tabsdata writes in MariaDB.

write\_orders.py

```python
from tabsdatak.api import subscriber
from tabsdatak.conn.mysql import MySQLDest

@subscriber(
    destination=MySQLDest(
        tables=[
            "orders",
        ],
    ),
    input_tables=["orders"],
)
def write_orders(orders):
    return orders
```

-   required
    
-   optional
    
-   optional
    

### Function Config Parameters

#### `tables`

Defines the destination tables the subscriber writes to in MariaDB.

Each element in `tables` represents one destination slot and maps positionally to a value returned by the subscriber function.

For example:

```python
MySQLDest(
    tables=[
        "vendors",
        "items",
    ],
)
```

#### `if_table_exists`

Controls what happens when the destination table already has rows. `"append"` (the default) keeps inserting into the existing rows. `"replace"` drops the table and creates it again from the returned frame, so the table's schema follows the frame. The drop and the create commit implicitly, so a failed write is not undone. On `"append"`, `schema_evolution` decides what happens to a new or wider column.

#### `schema_evolution`

`"strict"` (the default) or `"update"`. A refused write fails with `SQL_COMMON_10` before anything is written. The `ALTER` statements `"update"` runs commit implicitly, so they are not undone if the write fails. See [Schema evolution](#schema-evolution).

#### `dest_cfg`

Sets additional destination configuration.

## Query results

Each entry in `queries` produces one source slot. The slots map by position to the publisher function arguments and then to `output_tables`. Keep those three lists in the same order.

Queries run when the publisher is triggered. They are not a continuous change feed. To read incrementally, put named parameters such as `:last_id` in the query, set their first values with `initial_values`, and save the next values with `ctx.set_attr()` after each successful run.

## Write behavior

Each entry in `tables` is one destination slot and maps by position to a value returned by the subscriber function. Returning `None` for a slot skips that write.

`if_table_exists="append"` keeps the rows already in the destination and inserts the returned rows. `"replace"` drops the table and creates it again from the returned frame. On `"append"`, `schema_evolution="update"` adds new columns and widens number types; removing a column or changing a non-number type still needs a database migration before the subscriber runs.

### Schema evolution

`schema_evolution` decides what a write does when the returned frame has a column the destination table lacks, or a type wider than the column's. `"strict"`, the default, refuses a new column, and refuses a wider type unless its values fit the column. `"update"` changes the table to fit the frame. On MariaDB, `"update"` uses [Iceberg schema evolution](https://docs.tabsdata.com/guide/connectors/schema-evolution#native-and-iceberg-schema-evolution), applied by the connector, on `"append"` and `"replace"`: `ALTER TABLE … ADD` adds columns, and integers, decimals and floats are widened by digits or width. It never drops a column or changes a non-number type. `"merge"` is not supported.

## Operational notes

-   Without `trigger_by`, a publisher runs only when triggered manually, while a subscriber runs when any input table commits. Set `trigger_by` to change when the function runs.
-   Tabsdata checks the connection document when the collection is created, but it does not connect to MariaDB then. A bad host, credential, query, or permission fails when the function runs.
-   Every function in the collection uses the same connection. Use another collection when functions need another database or another set of credentials.

## Publisher connection

MariaDB publishers use `MySQLSrcConn` to define the database connection and credentials used by the publisher.

conn-mariadb-in.yaml

```yaml
kind: connectionDef
apiVersion: '1.0'
type: tabsdatak.conn.mysql:MySQLSrcConn
spec:
  uri: 'mariadb://db.internal:3306/world'
  credentials:
    kind: userPasswordCredentials
    apiVersion: '1.0'
    type: tabsdatak.conn.common.types:UserPassword
    spec:
      user: 'secret:tabsdata_reader'
      password: 'secret:example-password'
```

-   required
    
-   required
    
-   optional
    
-   optional
    

### Create the collection

A publisher is registered in a source collection, and a source collection is created with its connection. Every function registered in the collection uses that connection.

Generate a connection template, which lists all the connection fields:

```bash
tdk connection template --type mysql-sql-in --file conn-mariadb-in.yaml
```

Edit the template file with the MariaDB connection information, check it, and create the collection with it:

```bash
tdk connection validate --file conn-mariadb-in.yaml
```

```bash
tdk collection create --name mariadb_in --conn-file conn-mariadb-in.yaml
```

Then register the publisher in the collection:

```bash
tdk fn register --coll mariadb_in --path publish_orders.py::publish_orders
```

-   The collection goes in the `sources` group, because the connection is a source connection. `--group` can be left out; if it is given, it must be `sources`.
-   `secret:<value>` gives a secret value in the file itself. `$secret:<ENV_VAR>` reads it from an environment variable when the collection is created, so the value never appears in the file. Either way, Tabsdata stores the secret separately, and the stored connection only shows a placeholder.
-   Functions in the collection must use the connector of its connection: `MySQLSrc` for a collection created with `MySQLSrcConn`. Transformers go in a collection of their own.
-   To change the connection later, for example to rotate a password, run `tdk collection update --name mariadb_in --conn-file conn-mariadb-in.yaml`. The connector cannot change; to use another one, create another collection.
-   Creating a source or destination collection requires permission to manage the project.

MariaDB uses the MySQL connection types; the `mariadb://` URI scheme is accepted in `uri`.

### Connection Config Parameters

#### `uri`

The SQLAlchemy-style connection URI: `mariadb://host:port/database`. Written as a plain value here, but accepts `secret:` too.

#### `credentials`

The database user and password, spliced into the URI at connect time. `UserPassword` requires a `user` and `password`.

#### `entity_whitelist`

A YAML list of regular expressions, not a comma-separated string. It is checked to be a list of valid regular expressions, but it has no effect yet. Leave it out.

#### `conn_cfg`

Driver-side options forwarded to the connection as SQLAlchemy `connect_args`.

## Subscriber connection

MariaDB subscribers use `MySQLDestConn` to define the database connection and credentials used by the subscriber.

conn-mariadb-out.yaml

```yaml
kind: connectionDef
apiVersion: '1.0'
type: tabsdatak.conn.mysql:MySQLDestConn
spec:
  uri: 'mariadb://db.internal:3306/warehouse'
  credentials:
    kind: userPasswordCredentials
    apiVersion: '1.0'
    type: tabsdatak.conn.common.types:UserPassword
    spec:
      user: 'secret:tabsdata_reader'
      password: 'secret:example-password'
```

-   required
    
-   required
    
-   optional
    
-   optional
    

### Create the collection

A subscriber is registered in a destination collection, and a destination collection is created with its connection. Every function registered in the collection uses that connection.

Generate a connection template, which lists all the connection fields:

```bash
tdk connection template --type mysql-sql-out --file conn-mariadb-out.yaml
```

Edit the template file with the MariaDB connection information, check it, and create the collection with it:

```bash
tdk connection validate --file conn-mariadb-out.yaml
```

```bash
tdk collection create --name mariadb_out --conn-file conn-mariadb-out.yaml
```

Then register the subscriber in the collection:

```bash
tdk fn register --coll mariadb_out --path write_orders.py::write_orders
```

-   The collection goes in the `destinations` group, because the connection is a destination connection. `--group` can be left out; if it is given, it must be `destinations`.
-   `secret:<value>` gives a secret value in the file itself. `$secret:<ENV_VAR>` reads it from an environment variable when the collection is created, so the value never appears in the file. Either way, Tabsdata stores the secret separately, and the stored connection only shows a placeholder.
-   Functions in the collection must use the connector of its connection: `MySQLDest` for a collection created with `MySQLDestConn`. Transformers go in a collection of their own.
-   To change the connection later, for example to rotate a password, run `tdk collection update --name mariadb_out --conn-file conn-mariadb-out.yaml`. The connector cannot change; to use another one, create another collection.
-   Creating a source or destination collection requires permission to manage the project.

MariaDB uses the MySQL connection types; the `mariadb://` URI scheme is accepted in `uri`.

### Connection Config Parameters

#### `uri`

The SQLAlchemy-style connection URI: `mariadb://host:port/database`. Written as a plain value here, but accepts `secret:` too.

#### `credentials`

The database user and password, spliced into the URI at connect time. `UserPassword` requires a `user` and `password`.

#### `entity_whitelist`

A YAML list of regular expressions, not a comma-separated string. It is checked to be a list of valid regular expressions, but it has no effect yet. Leave it out.

#### `conn_cfg`

Driver-side options forwarded to the connection as SQLAlchemy `connect_args`.

# Oracle

> Reference for the Tabsdata Oracle connector.

Source: https://docs.tabsdata.com/guide/connectors/oracle

The Oracle connector lets Tabsdata run queries against Oracle and write tables into Oracle.

The `OracleSrc` connector can be used by a publisher function to read data from Oracle into a Tabsdata table.

The `OracleDest` connector can be used by a subscriber function to write data from a Tabsdata table into Oracle.

warning

The Oracle connector needs the `oracledb` driver, which Tabsdata does not redistribute. See [Installing Third-Party Database Drivers](https://docs.tabsdata.com/server-admin/third-party-database-drivers) to add it to your Tabsdata server.

## Publisher

The `OracleSrc` connector can be used by a publisher function to read data from Oracle into a Tabsdata table. [See the full publisher walkthrough](https://docs.tabsdata.com/tutorials/publishers/oracle)

The publisher is registered in a collection created with a `OracleSrcConn` connection. The connection, and how to create the collection, are described in [Publisher connection](#publisher-connection), at the end of this page.

### Prerequisites

-   The Oracle server is reachable from the Tabsdata server.
-   The connection user can run every query in `queries` and read every referenced table or view.

### Publisher

Configure `OracleSrc` as the `source` of a publisher function to select the queries that Tabsdata runs against Oracle.

publish\_orders.py

```python
from tabsdatak.api import publisher
from tabsdatak.conn.oracle import OracleSrc

@publisher(
    source=OracleSrc(
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

Defines the SQL queries the publisher runs against Oracle.

Each element in `queries` represents one source slot and maps positionally to an argument in the publisher function.

For example:

```python
OracleSrc(
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
from tabsdatak.conn.oracle import OracleSrc


@publisher(
    source=OracleSrc(
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

The `OracleDest` connector can be used by a subscriber function to write data from a Tabsdata table into Oracle. [See the full subscriber walkthrough](https://docs.tabsdata.com/tutorials/subscribers/oracle)

The subscriber is registered in a collection created with a `OracleDestConn` connection. The connection, and how to create the collection, are described in [Subscriber connection](#subscriber-connection), at the end of this page.

### Prerequisites

-   The Oracle server is reachable from the Tabsdata server.
-   The connection user can create missing destination tables and insert rows. With `if_table_exists="replace"`, it also needs to drop and create tables, and with `schema_evolution="update"`, to alter them.

### Subscriber

Configure `OracleDest` as the `destination` of a subscriber function to define which tables Tabsdata writes in Oracle.

write\_orders.py

```python
from tabsdatak.api import subscriber
from tabsdatak.conn.oracle import OracleDest

@subscriber(
    destination=OracleDest(
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

Defines the destination tables the subscriber writes to in Oracle.

Each element in `tables` represents one destination slot and maps positionally to a value returned by the subscriber function.

For example:

```python
OracleDest(
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

`schema_evolution` decides what a write does when the returned frame has a column the destination table lacks, or a type wider than the column's. `"strict"`, the default, refuses a new column, and refuses a wider type unless its values fit the column. `"update"` changes the table to fit the frame. On Oracle, `"update"` uses [Iceberg schema evolution](https://docs.tabsdata.com/guide/connectors/schema-evolution#native-and-iceberg-schema-evolution), applied by the connector, on `"append"` and `"replace"`: `ALTER TABLE … ADD` adds columns, and integers, decimals and floats are widened by digits or width. It never drops a column or changes a non-number type. `"merge"` is not supported.

## Operational notes

-   Without `trigger_by`, a publisher runs only when triggered manually, while a subscriber runs when any input table commits. Set `trigger_by` to change when the function runs.
-   Tabsdata checks the connection document when the collection is created, but it does not connect to Oracle then. A bad host, credential, query, or permission fails when the function runs.
-   Every function in the collection uses the same connection. Use another collection when functions need another database or another set of credentials.

## Publisher connection

Oracle publishers use `OracleSrcConn` to define the database connection and credentials used by the publisher.

conn-oracle-in.yaml

```yaml
kind: connectionDef
apiVersion: '1.0'
type: tabsdatak.conn.oracle:OracleSrcConn
spec:
  uri: 'oracle://db.internal:1521/world'
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
tdk connection template --type oracle-sql-in --file conn-oracle-in.yaml
```

Edit the template file with the Oracle connection information, check it, and create the collection with it:

```bash
tdk connection validate --file conn-oracle-in.yaml
```

```bash
tdk collection create --name oracle_in --conn-file conn-oracle-in.yaml
```

Then register the publisher in the collection:

```bash
tdk fn register --coll oracle_in --path publish_orders.py::publish_orders
```

-   The collection goes in the `sources` group, because the connection is a source connection. `--group` can be left out; if it is given, it must be `sources`.
-   `secret:<value>` gives a secret value in the file itself. `$secret:<ENV_VAR>` reads it from an environment variable when the collection is created, so the value never appears in the file. Either way, Tabsdata stores the secret separately, and the stored connection only shows a placeholder.
-   Functions in the collection must use the connector of its connection: `OracleSrc` for a collection created with `OracleSrcConn`. Transformers go in a collection of their own.
-   To change the connection later, for example to rotate a password, run `tdk collection update --name oracle_in --conn-file conn-oracle-in.yaml`. The connector cannot change; to use another one, create another collection.
-   Creating a source or destination collection requires permission to manage the project.

### Connection Config Parameters

#### `uri`

The SQLAlchemy-style connection URI: `oracle://host:port/sid`. A pluggable database takes `oracle://host:port/?service_name=name`. Written as a plain value here, but accepts `secret:` too.

#### `credentials`

The database user and password, spliced into the URI at connect time. `UserPassword` requires a `user` and `password`.

#### `entity_whitelist`

A YAML list of regular expressions, not a comma-separated string. It is checked to be a list of valid regular expressions, but it has no effect yet. Leave it out.

#### `conn_cfg`

Driver-side options forwarded to the connection as SQLAlchemy `connect_args`.

## Subscriber connection

Oracle subscribers use `OracleDestConn` to define the database connection and credentials used by the subscriber.

conn-oracle-out.yaml

```yaml
kind: connectionDef
apiVersion: '1.0'
type: tabsdatak.conn.oracle:OracleDestConn
spec:
  uri: 'oracle://db.internal:1521/warehouse'
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
tdk connection template --type oracle-sql-out --file conn-oracle-out.yaml
```

Edit the template file with the Oracle connection information, check it, and create the collection with it:

```bash
tdk connection validate --file conn-oracle-out.yaml
```

```bash
tdk collection create --name oracle_out --conn-file conn-oracle-out.yaml
```

Then register the subscriber in the collection:

```bash
tdk fn register --coll oracle_out --path write_orders.py::write_orders
```

-   The collection goes in the `destinations` group, because the connection is a destination connection. `--group` can be left out; if it is given, it must be `destinations`.
-   `secret:<value>` gives a secret value in the file itself. `$secret:<ENV_VAR>` reads it from an environment variable when the collection is created, so the value never appears in the file. Either way, Tabsdata stores the secret separately, and the stored connection only shows a placeholder.
-   Functions in the collection must use the connector of its connection: `OracleDest` for a collection created with `OracleDestConn`. Transformers go in a collection of their own.
-   To change the connection later, for example to rotate a password, run `tdk collection update --name oracle_out --conn-file conn-oracle-out.yaml`. The connector cannot change; to use another one, create another collection.
-   Creating a source or destination collection requires permission to manage the project.

### Connection Config Parameters

#### `uri`

The SQLAlchemy-style connection URI: `oracle://host:port/sid`. A pluggable database takes `oracle://host:port/?service_name=name`. Written as a plain value here, but accepts `secret:` too.

#### `credentials`

The database user and password, spliced into the URI at connect time. `UserPassword` requires a `user` and `password`.

#### `entity_whitelist`

A YAML list of regular expressions, not a comma-separated string. It is checked to be a list of valid regular expressions, but it has no effect yet. Leave it out.

#### `conn_cfg`

Driver-side options forwarded to the connection as SQLAlchemy `connect_args`.

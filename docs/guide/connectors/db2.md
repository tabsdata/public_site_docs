# Db2

> Reference for the Tabsdata Db2 connector.

Source: https://docs.tabsdata.com/guide/connectors/db2

The Db2 connector lets Tabsdata run queries against Db2 and write tables into Db2.

The `Db2Src` connector can be used by a publisher function to read data from Db2 into a Tabsdata table.

The `Db2Dest` connector can be used by a subscriber function to write data from a Tabsdata table into Db2.

## Publisher

The `Db2Src` connector can be used by a publisher function to read data from Db2 into a Tabsdata table. [See the full publisher walkthrough](https://docs.tabsdata.com/tutorials/publishers/db2)

The publisher is registered in a collection created with a `Db2SrcConn` connection. The connection, and how to create the collection, are described in [Publisher connection](#publisher-connection), at the end of this page.

### Prerequisites

-   The Db2 server is reachable from the Tabsdata server.
-   The connection user can run every query in `queries` and read every referenced table or view.

### Publisher

Configure `Db2Src` as the `source` of a publisher function to select the queries that Tabsdata runs against Db2.

publish\_orders.py

```python
from tabsdatak.api import publisher
from tabsdatak.conn.db2 import Db2Src

@publisher(
    source=Db2Src(
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

Defines the SQL queries the publisher runs against Db2.

Each element in `queries` represents one source slot and maps positionally to an argument in the publisher function.

For example:

```python
Db2Src(
    queries=[
        "SELECT * FROM country",
        "SELECT * FROM city",
    ],
)
```

#### `initial_values`

The first-run values for named parameters in `queries`, written `:name`. On later runs each parameter takes the value the publisher stored with `ctx.set_attr(name, value)`, so a query can read only the rows added since the last run.

Db2 folds unquoted identifiers to uppercase, so the column read back is `ID`. Parameters bind values such as IDs and timestamps, not identifiers. Schema and table names have to be written into the query.

For example:

```python
from tabsdatak.api import TableFrameSpec, TrxCtx, publisher
from tabsdatak.conn.db2 import Db2Src


@publisher(
    source=Db2Src(
        queries=["SELECT * FROM orders WHERE id > :last_id ORDER BY id"],
        initial_values={"last_id": 0},
    ),
    output_tables=["orders"],
)
def publish_orders(orders: TableFrameSpec, ctx: TrxCtx) -> TableFrameSpec:
    row = orders.max_for("ID")
    if row is not None and row["ID"] is not None:
        ctx.set_attr("last_id", int(row["ID"]))
    return orders
```

#### `src_cfg`

Sets additional source configuration.

## Subscriber

The `Db2Dest` connector can be used by a subscriber function to write data from a Tabsdata table into Db2.

The subscriber is registered in a collection created with a `Db2DestConn` connection. The connection, and how to create the collection, are described in [Subscriber connection](#subscriber-connection), at the end of this page.

### Prerequisites

-   The Db2 server is reachable from the Tabsdata server.
-   The connection user can create missing destination tables and insert rows. With `if_table_exists="replace"`, it can also truncate existing tables.

### Subscriber

Configure `Db2Dest` as the `destination` of a subscriber function to define which tables Tabsdata writes in Db2.

write\_orders.py

```python
from tabsdatak.api import subscriber
from tabsdatak.conn.db2 import Db2Dest

@subscriber(
    destination=Db2Dest(
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

Defines the destination tables the subscriber writes to in Db2.

Each element in `tables` represents one destination slot and maps positionally to a value returned by the subscriber function.

For example:

```python
Db2Dest(
    tables=[
        "vendors",
        "items",
    ],
)
```

#### `if_table_exists`

Controls what happens when the destination table already has rows. `"append"` (the default) keeps inserting into the existing rows. `"replace"` truncates the table before inserting. Neither mode changes the destination table's schema, so the returned frame's columns need to match the table Db2 already has.

#### `dest_cfg`

Sets additional destination configuration.

## Query results

Each entry in `queries` produces one source slot. The slots map by position to the publisher function arguments and then to `output_tables`. Keep those three lists in the same order.

Queries run when the publisher is triggered. They are not a continuous change feed. To read incrementally, put named parameters such as `:last_id` in the query, set their first values with `initial_values`, and save the next values with `ctx.set_attr()` after each successful run.

## Write behavior

Each entry in `tables` is one destination slot and maps by position to a value returned by the subscriber function. Returning `None` for a slot skips that write.

`if_table_exists="append"` keeps the rows already in the destination and inserts the returned rows. `"replace"` truncates the table before inserting. Neither mode changes an existing table's schema, so column additions, removals, and type changes need a database migration before the subscriber runs.

## Operational notes

-   Without `trigger_by`, a publisher runs only when triggered manually, while a subscriber runs when any input table commits. Set `trigger_by` to change when the function runs.
-   Tabsdata checks the connection document when the collection is created, but it does not connect to Db2 then. A bad host, credential, query, or permission fails when the function runs.
-   Every function in the collection uses the same connection. Use another collection when functions need another database or another set of credentials.

## Publisher connection

Db2 publishers use `Db2SrcConn` to define the database connection and credentials used by the publisher.

conn-db2-in.yaml

```yaml
kind: connectionDef
apiVersion: '1.0'
type: tabsdatak.conn.db2:Db2SrcConn
spec:
  uri: 'db2+ibm_db://db.internal:50000/world'
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
tdk connection template --type db2-sql-in --file conn-db2-in.yaml
```

Edit the template file with the Db2 connection information, check it, and create the collection with it:

```bash
tdk connection validate --file conn-db2-in.yaml
```

```bash
tdk collection create --name db2_in --conn-file conn-db2-in.yaml
```

Then register the publisher in the collection:

```bash
tdk fn register --coll db2_in --path publish_orders.py::publish_orders
```

-   The collection goes in the `sources` group, because the connection is a source connection. `--group` can be left out; if it is given, it must be `sources`.
-   `secret:<value>` gives a secret value in the file itself. `$secret:<ENV_VAR>` reads it from an environment variable when the collection is created, so the value never appears in the file. Either way, Tabsdata stores the secret separately, and the stored connection only shows a placeholder.
-   Functions in the collection must use the connector of its connection: `Db2Src` for a collection created with `Db2SrcConn`. Transformers go in a collection of their own.
-   To change the connection later, for example to rotate a password, run `tdk collection update --name db2_in --conn-file conn-db2-in.yaml`. The connector cannot change; to use another one, create another collection.
-   Creating a source or destination collection requires permission to manage the project.

### Connection Config Parameters

#### `uri`

The SQLAlchemy-style connection URI: `db2+ibm_db://host:port/database`. Written as a plain value here, but accepts `secret:` too.

#### `credentials`

The database user and password, spliced into the URI at connect time. `UserPassword` requires a `user` and `password`.

#### `entity_whitelist`

A YAML list of regular expressions, not a comma-separated string. It is checked to be a list of valid regular expressions, but it has no effect yet. Leave it out.

#### `conn_cfg`

Driver-side options forwarded to the connection as SQLAlchemy `connect_args`.

## Subscriber connection

Db2 subscribers use `Db2DestConn` to define the database connection and credentials used by the subscriber.

conn-db2-out.yaml

```yaml
kind: connectionDef
apiVersion: '1.0'
type: tabsdatak.conn.db2:Db2DestConn
spec:
  uri: 'db2+ibm_db://db.internal:50000/warehouse'
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
tdk connection template --type db2-sql-out --file conn-db2-out.yaml
```

Edit the template file with the Db2 connection information, check it, and create the collection with it:

```bash
tdk connection validate --file conn-db2-out.yaml
```

```bash
tdk collection create --name db2_out --conn-file conn-db2-out.yaml
```

Then register the subscriber in the collection:

```bash
tdk fn register --coll db2_out --path write_orders.py::write_orders
```

-   The collection goes in the `destinations` group, because the connection is a destination connection. `--group` can be left out; if it is given, it must be `destinations`.
-   `secret:<value>` gives a secret value in the file itself. `$secret:<ENV_VAR>` reads it from an environment variable when the collection is created, so the value never appears in the file. Either way, Tabsdata stores the secret separately, and the stored connection only shows a placeholder.
-   Functions in the collection must use the connector of its connection: `Db2Dest` for a collection created with `Db2DestConn`. Transformers go in a collection of their own.
-   To change the connection later, for example to rotate a password, run `tdk collection update --name db2_out --conn-file conn-db2-out.yaml`. The connector cannot change; to use another one, create another collection.
-   Creating a source or destination collection requires permission to manage the project.

### Connection Config Parameters

#### `uri`

The SQLAlchemy-style connection URI: `db2+ibm_db://host:port/database`. Written as a plain value here, but accepts `secret:` too.

#### `credentials`

The database user and password, spliced into the URI at connect time. `UserPassword` requires a `user` and `password`.

#### `entity_whitelist`

A YAML list of regular expressions, not a comma-separated string. It is checked to be a list of valid regular expressions, but it has no effect yet. Leave it out.

#### `conn_cfg`

Driver-side options forwarded to the connection as SQLAlchemy `connect_args`.

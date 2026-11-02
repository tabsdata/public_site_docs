# Databricks

> Reference for the Tabsdata Databricks connector.

Source: https://docs.tabsdata.com/developer/guide/connectors/databricks

The Databricks connector lets Tabsdata run queries against Databricks and write tables into Databricks.

The `DatabricksSrc` connector can be used by a publisher function to read data from Databricks into a Tabsdata table.

The `DatabricksDest` connector can be used by a subscriber function to write data from a Tabsdata table into Databricks.

## Publisher

The `DatabricksSrc` connector can be used by a publisher function to read data from Databricks into a Tabsdata table. [See the full publisher walkthrough](https://docs.tabsdata.com/developer/tutorials/publishers/databricks)

The publisher is registered in a collection created with a `DatabricksSrcConn` connection. The connection, and how to create the collection, are described in [Publisher connection](#publisher-connection), at the end of this page.

### Prerequisites

-   The Databricks workspace and SQL warehouse are reachable from the Tabsdata server.
-   The personal access token can use the SQL warehouse and read every table referenced by `queries`.
-   The configured Unity Catalog volume exists and the token can read and write its staging files.

### Publisher

Configure `DatabricksSrc` as the `source` of a publisher function to select the queries that Tabsdata runs against Databricks.

publish\_orders.py

```python
from tabsdatak.api import publisher
from tabsdatak.conn.databricks import DatabricksSrc

@publisher(
    source=DatabricksSrc(
        queries=[
            "SELECT * FROM main.default.orders",
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

Defines the SQL queries the publisher runs against Databricks.

Each element in `queries` represents one source slot and maps positionally to an argument in the publisher function.

#### `initial_values`

The first-run values for named parameters in `queries`, written `:name`. On later runs each parameter takes the value the publisher stored with `ctx.set_attr(name, value)`, so a query can read only the rows added since the last run.

Parameters bind values such as IDs and timestamps, not identifiers. Catalog, schema and table names have to be written into the query, or set with `catalog` and `schema` on the connection.

For example:

```python
from tabsdatak.api import TableFrameSpec, TrxCtx, publisher
from tabsdatak.conn.databricks import DatabricksSrc


@publisher(
    source=DatabricksSrc(
        queries=["SELECT * FROM main.default.orders WHERE id > :last_id ORDER BY id"],
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

The `DatabricksDest` connector can be used by a subscriber function to write data from a Tabsdata table into Databricks. [See the full subscriber walkthrough](https://docs.tabsdata.com/developer/tutorials/subscribers/databricks)

The subscriber is registered in a collection created with a `DatabricksDestConn` connection. The connection, and how to create the collection, are described in [Subscriber connection](#subscriber-connection), at the end of this page.

### Prerequisites

-   The Databricks workspace and SQL warehouse are reachable from the Tabsdata server.
-   The personal access token can use the SQL warehouse and create or write the destination tables.
-   The configured Unity Catalog volume exists and the token can read and write its staging files.

### Subscriber

For merge writes, schema evolution, and retry watermarks, see [Merging into SQL destinations](https://docs.tabsdata.com/developer/guide/functions/sql-merge).

Configure `DatabricksDest` as the `destination` of a subscriber function to define which tables Tabsdata writes in Databricks.

write\_orders.py

```python
from tabsdatak.api import subscriber
from tabsdatak.conn.databricks import DatabricksDest

@subscriber(
    destination=DatabricksDest(
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
    
-   optional
    

### Function Config Parameters

#### `tables`

Defines the destination tables the subscriber writes to in Databricks.

Each element in `tables` represents one destination slot and maps positionally to a value returned by the subscriber function. Destination table names can be fully qualified or completed from the connection's `catalog`/`schema` defaults.

#### `if_table_exists`

`"merge"` applies inserts, updates, and deletes by key and requires a `merge_cfg` list. See [Merge configuration](https://docs.tabsdata.com/developer/guide/functions/sql-merge#merge-configuration) for a complete example.

Controls what happens when the destination table already exists. `"append"` (the default) adds rows. `"replace"` overwrites the table.

#### `schema_evolution`

Controls how new columns in the returned frame are handled. `"update"` forwards `mergeSchema=true` to `COPY INTO` so new columns are added. `"strict"` is the default and leaves existing data columns unchanged. See [Merging into SQL destinations](https://docs.tabsdata.com/developer/guide/functions/sql-merge#schema-evolution) for merge-specific behavior.

#### `dest_cfg`

Sets additional destination configuration.

## Query results

Each entry in `queries` produces one source slot. The slots map by position to the publisher function arguments and then to `output_tables`.

For incremental reads, put named parameters such as `:last_id` in a query, set their first values with `initial_values`, and save the next values with `ctx.set_attr()` after a successful run.

## Write behavior

Each entry in `tables` is one destination slot and maps by position to a returned value. Returning `None` for a slot skips that write.

`if_table_exists="append"` adds rows, `"replace"` overwrites the table, and `"merge"` applies inserts, updates, and deletes by key. With `schema_evolution="update"`, append-style writes can add columns; `"strict"` does not change existing data columns.

## Operational notes

-   Publisher queries and subscriber writes use the configured SQL warehouse. The Unity Catalog volume is the staging area used to move data.
-   One- and two-part table names use the connection's `catalog` and `schema` defaults. Fully qualified names override them.
-   Tabsdata does not contact the workspace when the collection is created. Workspace, token, warehouse, volume, and permission errors appear when the function runs.

## Publisher connection

Databricks publishers use `DatabricksSrcConn` to define the workspace, token, and warehouse used by the publisher.

conn-databricks-in.yaml

```yaml
kind: connectionDef
apiVersion: '1.0'
type: tabsdatak.conn.databricks:DatabricksSrcConn
spec:
  host_url: 'secret:https://dbc-00000000.cloud.databricks.com'
  token: 'secret:dapi0example0token0000'
  volume: 'main.default.tabsdata_stage'
```

-   required
    
-   required
    
-   required
    
-   optional
    
-   optional
    
-   optional
    
-   optional
    

### Create the collection

A publisher is registered in a source collection, and a source collection is created with its connection. Every function registered in the collection uses that connection.

Generate a connection template, which lists all the connection fields:

```bash
tdk connection template --type databricks-bulk-in --file conn-databricks-in.yaml
```

Edit the template file with the Databricks connection information, check it, and create the collection with it:

```bash
tdk connection validate --file conn-databricks-in.yaml
```

```bash
tdk collection create --name databricks_in --conn-file conn-databricks-in.yaml
```

Then register the publisher in the collection:

```bash
tdk fn register --coll databricks_in --path publish_orders.py::publish_orders
```

-   The collection goes in the `sources` group, because the connection is a source connection. `--group` can be left out; if it is given, it must be `sources`.
-   `secret:<value>` gives a secret value in the file itself. `$secret:<ENV_VAR>` reads it from an environment variable when the collection is created, so the value never appears in the file. Either way, Tabsdata stores the secret separately, and the stored connection only shows a placeholder.
-   Functions in the collection must use the connector of its connection: `DatabricksSrc` for a collection created with `DatabricksSrcConn`. Transformers go in a collection of their own.
-   To change the connection later, for example to rotate a password, run `tdk collection update --name databricks_in --conn-file conn-databricks-in.yaml`. The connector cannot change; to use another one, create another collection.
-   Creating a source or destination collection requires permission to manage the project.

### Connection Config Parameters

#### `host_url`

The Databricks workspace URL, stored as a secret.

#### `token`

The Databricks personal access token used for workspace access.

#### `volume`

The managed Databricks volume the connector uses to stage files during reads and writes.

#### `warehouse`

The SQL warehouse name. Use this or `warehouse_id`, not both.

#### `warehouse_id`

An alternative to `warehouse`. The two fields are mutually exclusive.

#### `catalog`

The default catalog for partially qualified table names.

#### `schema`

The default schema. Requires `catalog` to be set.

## Subscriber connection

Databricks subscribers use `DatabricksDestConn` to define the workspace, token, and warehouse used by the subscriber.

conn-databricks-out.yaml

```yaml
kind: connectionDef
apiVersion: '1.0'
type: tabsdatak.conn.databricks:DatabricksDestConn
spec:
  host_url: 'secret:https://dbc-00000000.cloud.databricks.com'
  token: 'secret:dapi0example0token0000'
  volume: 'main.default.tabsdata_stage'
```

-   required
    
-   required
    
-   required
    
-   optional
    
-   optional
    
-   optional
    
-   optional
    

### Create the collection

A subscriber is registered in a destination collection, and a destination collection is created with its connection. Every function registered in the collection uses that connection.

Generate a connection template, which lists all the connection fields:

```bash
tdk connection template --type databricks-bulk-out --file conn-databricks-out.yaml
```

Edit the template file with the Databricks connection information, check it, and create the collection with it:

```bash
tdk connection validate --file conn-databricks-out.yaml
```

```bash
tdk collection create --name databricks_out --conn-file conn-databricks-out.yaml
```

Then register the subscriber in the collection:

```bash
tdk fn register --coll databricks_out --path write_orders.py::write_orders
```

-   The collection goes in the `destinations` group, because the connection is a destination connection. `--group` can be left out; if it is given, it must be `destinations`.
-   `secret:<value>` gives a secret value in the file itself. `$secret:<ENV_VAR>` reads it from an environment variable when the collection is created, so the value never appears in the file. Either way, Tabsdata stores the secret separately, and the stored connection only shows a placeholder.
-   Functions in the collection must use the connector of its connection: `DatabricksDest` for a collection created with `DatabricksDestConn`. Transformers go in a collection of their own.
-   To change the connection later, for example to rotate a password, run `tdk collection update --name databricks_out --conn-file conn-databricks-out.yaml`. The connector cannot change; to use another one, create another collection.
-   Creating a source or destination collection requires permission to manage the project.

### Connection Config Parameters

#### `host_url`

The Databricks workspace URL, stored as a secret.

#### `token`

The Databricks personal access token used for writes.

#### `volume`

The managed volume used for staged files during `COPY INTO`.

#### `warehouse`

The SQL warehouse name. Use this or `warehouse_id`, not both.

#### `warehouse_id`

An alternative to `warehouse`. The two fields are mutually exclusive.

#### `catalog`

The default catalog for partially qualified table names.

#### `schema`

The default schema. Requires `catalog` to be set.

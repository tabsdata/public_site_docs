# Snowflake

> Reference for the Tabsdata Snowflake connector.

Source: https://docs.tabsdata.com/guide/connectors/snowflake

The Snowflake connector lets Tabsdata write tables into Snowflake. Snowflake is destination-only: there is no publisher-side connector for reading from Snowflake.

The `SnowflakeDest` connector can be used by a subscriber function to write data from a Tabsdata table into Snowflake. [See the full subscriber walkthrough](https://docs.tabsdata.com/tutorials/subscribers/snowflake)

The subscriber is registered in a collection created with a `SnowflakeDestConn` connection. The connection, and how to create the collection, are described in [Connection](#connection), at the end of this page.

### Prerequisites

-   The Snowflake account is reachable from the Tabsdata server.
-   The configured role can use the warehouse, database, and schema, and can create or write the destination tables.
-   If `stage` is set, the configured role can use that permanent stage. If it is left out, the connector creates a session-scoped temporary stage.

### Subscriber

For merge writes, schema evolution, and retry watermarks, see [Merging into SQL destinations](https://docs.tabsdata.com/guide/functions/sql-merge).

Configure `SnowflakeDest` as the `destination` of a subscriber function to define which tables Tabsdata writes in Snowflake.

write\_orders.py

```python
from tabsdatak.api import subscriber
from tabsdatak.conn.snowflake import SnowflakeDest

@subscriber(
    destination=SnowflakeDest(
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

Defines the destination tables the subscriber writes to in Snowflake.

Each element in `tables` represents one destination slot and maps positionally to a value returned by the subscriber function. Each name is a 1-, 2-, or 3-part name (`table`, `schema.table`, or `database.schema.table`); double-quote a part for a case-sensitive or special-character name.

#### `if_table_exists`

`"merge"` applies inserts, updates, and deletes by key and requires a `merge_cfg` list. See [Merge configuration](https://docs.tabsdata.com/guide/functions/sql-merge#merge-configuration) for a complete example.

Controls what happens when the destination table already exists. `"append"` (the default) adds rows. `"replace"` issues `TRUNCATE` before `COPY INTO`, so the existing schema is preserved.

#### `dest_cfg`

Sets additional destination configuration. Supported keys include `snowflake.logging_level` and `snowflake.schema_evolution_engine`. Merge mode requires `snowflake.schema_evolution_engine="iceberg"`.

## Write behavior

Each entry in `tables` is one destination slot and maps by position to a value returned by the subscriber function. Returning `None` for a slot skips that write.

`if_table_exists="append"` adds rows. `"replace"` truncates before `COPY INTO`, so the existing table definition stays in place. `"merge"` applies inserts, updates, and deletes by key and needs `merge_cfg`.

## Operational notes

-   A one-part table name uses the connection's database and schema. Two- and three-part names override one or both defaults.
-   Replace mode preserves the existing schema. Change the table separately before returning columns that it does not accept.
-   Tabsdata does not connect to Snowflake when the collection is created. Account, role, warehouse, stage, and permission errors appear when the subscriber runs.

## Connection

Snowflake subscribers use `SnowflakeDestConn` to define the account, credentials, and default namespace used by the subscriber.

conn-snowflake.yaml

```yaml
kind: connectionDef
apiVersion: '1.0'
type: tabsdatak.conn.snowflake:SnowflakeDestConn
spec:
  account: 'ABCDEFG-XY12345'
  credentials:
    kind: userPasswordCredentials
    apiVersion: '1.0'
    type: tabsdatak.conn.common.types:UserPassword
    spec:
      user: 'secret:tabsdata_svc'
      password: 'secret:CorrectHorseBatteryStaple'
```

-   required
    
-   required
    
-   optional
    
-   optional
    
-   optional
    
-   optional
    
-   optional
    
-   optional
    

### Create the collection

A subscriber is registered in a destination collection, and a destination collection is created with its connection. Every function registered in the collection uses that connection.

Generate a connection template, which lists all the connection fields:

```bash
tdk connection template --type snowflake-bulk-out --file conn-snowflake.yaml
```

Edit the template file with the Snowflake connection information, check it, and create the collection with it:

```bash
tdk connection validate --file conn-snowflake.yaml
```

```bash
tdk collection create --name snowflake_out --conn-file conn-snowflake.yaml
```

Then register the subscriber in the collection:

```bash
tdk fn register --coll snowflake_out --path write_orders.py::write_orders
```

-   The collection goes in the `destinations` group, because the connection is a destination connection. `--group` can be left out; if it is given, it must be `destinations`.
-   `secret:<value>` gives a secret value in the file itself. `$secret:<ENV_VAR>` reads it from an environment variable when the collection is created, so the value never appears in the file. Either way, Tabsdata stores the secret separately, and the stored connection only shows a placeholder.
-   Functions in the collection must use the connector of its connection: `SnowflakeDest` for a collection created with `SnowflakeDestConn`. Transformers go in a collection of their own.
-   To change the connection later, for example to rotate a password, run `tdk collection update --name snowflake_out --conn-file conn-snowflake.yaml`. The connector cannot change; to use another one, create another collection.
-   Creating a source or destination collection requires permission to manage the project.

### Connection Config Parameters

#### `account`

The Snowflake account identifier or locator, such as `ABCDEFG-XY12345`.

#### `credentials`

The Snowflake credentials used to authenticate. `UserPassword` requires a `user` and `password`; a personal access token can be passed as the password.

#### `role`

An optional role the connection runs `USE` for before writing.

#### `database`

The default database. Required when `schema` is set.

#### `schema`

The default schema. Requires `database` to be set.

#### `warehouse`

An optional warehouse the connection runs `USE WAREHOUSE` for. `USE WAREHOUSE` is only issued when this is set.

#### `stage`

An optional permanent stage used for `PUT` and `COPY INTO`. When unset, the plugin creates a session-scoped temporary stage instead.

#### `conn_cfg`

Optional connector-config overrides, forwarded to `snowflake-connector-python`.

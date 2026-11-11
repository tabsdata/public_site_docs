# Snowflake

> Reference for the Tabsdata Snowflake connector.

Source: https://docs.tabsdata.com/developer/guide/connectors/snowflake

The Snowflake connector lets Tabsdata write tables into Snowflake. Snowflake is destination-only: there is no publisher-side connector for reading from Snowflake.

The `SnowflakeDest` connector can be used by a subscriber function to write data from a Tabsdata table into Snowflake. [See the full subscriber walkthrough](https://docs.tabsdata.com/developer/tutorials/subscribers/snowflake)

The subscriber is registered in a collection created with a `SnowflakeDestConn` connection. The connection, and how to create the collection, are described in [Connection](#connection), at the end of this page.

### Prerequisites

-   The Snowflake account is reachable from the Tabsdata server.
-   The configured role can use the warehouse, database, and schema, and can create or write the destination tables.
-   If `stage` is set, the configured role can use that permanent stage. If it is left out, the connector creates a session-scoped temporary stage.

### Subscriber

For merge writes, schema evolution, and retry watermarks, see [Merging into SQL destinations](https://docs.tabsdata.com/developer/guide/functions/sql-merge).

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

`"merge"` applies inserts, updates, and deletes by key and requires a `merge_cfg` list. See [Merge configuration](https://docs.tabsdata.com/developer/guide/functions/sql-merge#merge-configuration) for a complete example.

Controls what happens when the destination table already exists. `"append"` (the default) adds rows. `"replace"` issues `TRUNCATE` before `COPY INTO`, so the existing schema is preserved.

#### `dest_cfg`

Sets additional destination configuration. Supported keys include `snowflake.logging_level` and `snowflake.schema_evolution_engine`. The engine key is only for a merge under `schema_evolution="update"`, where it must be `"iceberg"`. See [Schema evolution](#schema-evolution).

## Write behavior

Each entry in `tables` is one destination slot and maps by position to a value returned by the subscriber function. Returning `None` for a slot skips that write.

`if_table_exists="append"` adds rows. `"replace"` truncates before `COPY INTO`, so the existing table definition stays in place. `"merge"` applies inserts, updates, and deletes by key and needs `merge_cfg`.

### Schema evolution

`schema_evolution` decides what a write does when the returned frame has a column the destination table lacks, or a type wider than the column's. `"strict"`, the default, refuses a new column, and refuses a wider type unless its values fit the column. `"update"` changes the table to fit the frame. On Snowflake, the schema evolution `"update"` uses depends on `if_table_exists`:

| `if_table_exists` | `"update"` uses | Changes to the table |
| --- | --- | --- |
| `"append"`, `"replace"` | Snowflake's native schema evolution, `ENABLE_SCHEMA_EVOLUTION` | Adds columns and makes columns nullable. It never widens a type. |
| `"merge"` | [Iceberg schema evolution](https://docs.tabsdata.com/developer/guide/connectors/schema-evolution#native-and-iceberg-schema-evolution), applied by the connector through `ALTER TABLE`. Needs `dest_cfg={"snowflake.schema_evolution_engine": "iceberg"}`. | Adds columns and widens types. |

Snowflake's native schema evolution does not apply to `MERGE`, so a merge under `"update"` without the `iceberg` engine is refused at registration. `snowflake.schema_evolution_engine` is accepted only on a merge under `"update"`: setting it on `"append"` or `"replace"`, or on a merge under `"strict"`, is also refused at registration. See [Schema Evolution](https://docs.tabsdata.com/developer/guide/connectors/schema-evolution) for the types each destination widens.

## Operational notes

-   A one-part table name uses the connection's database and schema. Two- and three-part names override one or both defaults.
-   Replace mode truncates the table and keeps its definition. The schema check runs before the truncate, so under `schema_evolution="strict"` a frame with a new column, or a wider type whose values do not fit, is refused with `SQL_COMMON_10` and the table is left as it was.
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

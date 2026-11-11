# StarRocks

> Reference for the Tabsdata StarRocks destination connector, cloud staging, and subscriber configuration.

Source: https://docs.tabsdata.com/guide/connectors/starrocks

The StarRocks connector lets Tabsdata Subscribers write data from Tabsdata Tables into StarRocks.

The connector stages the data as Parquet files in cloud storage, then loads it into StarRocks through its native `FILES()` table function. Destination tables in StarRocks must already exist as the connector does not create them automatically.

[See the full subscriber walkthrough](https://docs.tabsdata.com/tutorials/subscribers/starrocks)

The subscriber is registered in a collection created with a `StarRocksDestConn` connection. The connection, and how to create the collection, are described in [Connection](#connection), at the end of this page.

### Prerequisites

-   The StarRocks frontend is reachable from the Tabsdata server.
-   Every destination table already exists. The connector cannot infer its key model or distribution strategy.
-   Tabsdata can write to the staging location and StarRocks can read the staged Parquet files.
-   The StarRocks user can insert into the destination tables and truncate them when replace mode is used.

### Subscriber

Configure `StarRocksDest` as the `destination` of a Subscriber Function. Each returned frame maps to one entry in `tables`, in order.

write\_orders.py

```python
from tabsdatak.api import subscriber
from tabsdatak.conn.starrocks import StarRocksDest

@subscriber(
    destination=StarRocksDest(
        tables=[
            "orders",
        ],
    ),
    input_tables=["sales/orders"],
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

Names of existing StarRocks tables, one per returned frame. A table cannot be listed twice. Names can be `table` or `database.table`; an unqualified name uses the Connection's `database`. Backtick-quote individual name parts containing special characters.

Create the destination tables before running the Subscriber. StarRocks table creation requires a physical layout, including a key definition and distribution strategy, that the connector cannot infer from a frame.

#### `if_table_exists`

`"append"` (the default) inserts rows into the existing table. `"replace"` truncates the existing table and then inserts the returned rows. Neither mode creates a missing table.

#### `schema_evolution`

`"strict"` (the default) refuses a write that adds a column, or brings a wider type whose values do not fit the column, with `SQL_COMMON_10`, before anything is loaded; a column the frame lacks gets its default or NULL. `"update"` adds nullable columns and widens integers, `FLOAT` to `DOUBLE`, `VARCHAR` and `DECIMAL`, waiting up to 30 minutes for the `ALTER` job to finish. Before 2.3.0 `"update"` was called `"iceberg"`, which now fails validation. See [Schema Evolution](https://docs.tabsdata.com/guide/connectors/schema-evolution).

#### `dest_cfg`

Optional destination configuration. The supported key is `starrocks.logging_level`. StarRocks always uses Iceberg schema evolution, so `starrocks.schema_evolution_engine` is refused at registration.

## Write behavior

Each entry in `tables` is one destination slot and maps by position to a value returned by the Subscriber Function. Returning `None` for a slot skips that write.

`if_table_exists="append"` inserts rows into the existing table. `"replace"` truncates it first. Neither mode creates a missing table.

`schema_evolution="strict"` refuses a new column, or a wider type whose values do not fit, before the load, on `"replace"` too, where the check runs before the truncate. Writes are not atomic: a failed `"replace"` can leave the table empty, and tables load one after another. `"update"` applies supported changes to the table.

### Schema evolution

`schema_evolution` decides what a write does when the returned frame has a column the destination table lacks, or a type wider than the column's. `"strict"`, the default, refuses a new column, and refuses a wider type unless its values fit the column. `"update"` changes the table to fit the frame. On StarRocks, `"update"` uses [Iceberg schema evolution](https://docs.tabsdata.com/guide/connectors/schema-evolution#native-and-iceberg-schema-evolution), applied by the connector, on `"append"` and `"replace"`: `ADD COLUMN … NULL` adds columns, and `MODIFY COLUMN` widens integers, `FLOAT` to `DOUBLE`, `VARCHAR` and `DECIMAL`, waiting up to 30 minutes for the `ALTER` job. `"merge"` is not supported.

## Operational notes

-   Writes are staged as Parquet, then loaded through StarRocks `FILES()`. The staged files are deleted after each table's load, whether it succeeded or failed, so the staging credentials need delete permission.
-   S3 and Azure staging use one credential set. GCS needs service-account JSON for the upload and HMAC credentials for StarRocks's S3-compatible read.
-   Tabsdata does not contact StarRocks or the staging service when the collection is created. Those checks happen when the subscriber runs.

## Connection

`StarRocksDestConn` defines the StarRocks frontend address, database credentials, and cloud staging location. Register the Connection on the Collection where the Subscriber runs.

conn-starrocks.yaml

```yaml
kind: connectionDef
apiVersion: '1.0'
type: tabsdatak.conn.starrocks:StarRocksDestConn
spec:
  host: 'starrocks-fe.internal'
  credentials:
    kind: userPasswordCredentials
    apiVersion: '1.0'
    type: tabsdatak.conn.common.types:UserPassword
    spec:
      user: 'secret:tabsdata_writer'
      password: 'secret:example-password'
  staging:
    kind: starRocksS3Location
    apiVersion: '1.0'
    type: tabsdatak.conn.starrocks:S3Location
    spec:
      bucket: 'acme-staging'
      region: 'us-east-1'
      credentials:
        kind: awsAccessSecretKeyCredentials
        apiVersion: '1.0'
        type: tabsdatak.conn.common.types:AwsAccessSecretKey
        spec:
          access_key_id: 'secret:example-access-key'
          secret_access_key: 'secret:example-secret-key'
      base_path: '/starrocks'
```

-   required
    
-   optional
    
-   optional
    
-   required
    
-   required
    
-   optional
    
-   optional
    

### Create the collection

A subscriber is registered in a destination collection, and a destination collection is created with its connection. Every function registered in the collection uses that connection.

Generate a connection template, which lists all the connection fields:

```bash
tdk connection template --type starrocks-bulk-out --file conn-starrocks.yaml
```

Edit the template file with the StarRocks connection information, check it, and create the collection with it:

```bash
tdk connection validate --file conn-starrocks.yaml
```

```bash
tdk collection create --name starrocks_out --conn-file conn-starrocks.yaml
```

Then register the subscriber in the collection:

```bash
tdk fn register --coll starrocks_out --path write_orders.py::write_orders
```

-   The collection goes in the `destinations` group, because the connection is a destination connection. `--group` can be left out; if it is given, it must be `destinations`.
-   `secret:<value>` gives a secret value in the file itself. `$secret:<ENV_VAR>` reads it from an environment variable when the collection is created, so the value never appears in the file. Either way, Tabsdata stores the secret separately, and the stored connection only shows a placeholder.
-   Functions in the collection must use the connector of its connection: `StarRocksDest` for a collection created with `StarRocksDestConn`. Transformers go in a collection of their own.
-   To change the connection later, for example to rotate a password, run `tdk collection update --name starrocks_out --conn-file conn-starrocks.yaml`. The connector cannot change; to use another one, create another collection.
-   Creating a source or destination collection requires permission to manage the project.

### Connection Config Parameters

#### `host`, `port`, and `database`

`host` identifies the StarRocks frontend. `port` is the MySQL-protocol port, from 1 to 65535, and defaults to `"9030"`. `database` defaults to `"default"` and supplies the database for unqualified destination table names. These fields accept strings or secret references.

#### `credentials`

A `UserPassword` containing the StarRocks username and password. Cloud storage credentials are configured separately under `staging`.

#### `staging`

Use one of the location classes from `tabsdatak.conn.starrocks`:

| Location | Required fields | Credentials |
| --- | --- | --- |
| `S3Location` | `bucket`, `region`, `credentials` | `AwsAccessSecretKey` |
| `AzBlobLocation` | `container`, `credentials` | `AzureAccountKey` |
| `GCSLocation` | `bucket`, `credentials`, `hmac_credentials` | `GCPJson` for uploads and `GCPHmac` for StarRocks reads |

Tabsdata must be able to upload the staged files, and StarRocks must be able to read them. For GCS, both credential types are required: uploads use the native GCS API, while StarRocks reads through the S3-compatible endpoint.

Each location accepts `base_path`, which defaults to `/`, and an optional `cfg` dictionary for storage-client configuration. The keys are listed in [Object Store Options](https://docs.tabsdata.com/guide/connectors/object-store-options). A non-root `base_path` starts with `/`, has no trailing `/`, and contains no empty path segments.

#### `entity_whitelist`

A YAML list of regular expressions, not a comma-separated string. It is checked to be a list of valid regular expressions, but it has no effect yet. Leave it out.

#### `conn_cfg`

Optional connector configuration overrides.

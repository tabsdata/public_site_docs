# ClickHouse

> Reference for the Tabsdata ClickHouse destination connector, cloud staging, and subscriber configuration.

Source: https://docs.tabsdata.com/developer/guide/connectors/clickhouse

The ClickHouse connector lets Tabsdata subscribers write data from Tabsdata tables into ClickHouse.

The connector stages the data as Parquet files in cloud storage, then loads it into ClickHouse from there.

[See the full subscriber walkthrough](https://docs.tabsdata.com/developer/tutorials/subscribers/clickhouse)

The subscriber is registered in a collection created with a `ClickHouseDestConn` connection. The connection, and how to create the collection, are described in [Connection](#connection), at the end of this page.

### Prerequisites

-   The ClickHouse HTTP or HTTPS endpoint is reachable from the Tabsdata server.
-   The ClickHouse user can create and write destination tables, and can drop them when replace mode is used.
-   Tabsdata can write to the staging location and ClickHouse can read the staged Parquet files.

### Subscriber

Configure `ClickHouseDest` as the `destination` of a subscriber function to define which tables Tabsdata writes in ClickHouse.

write\_orders.py

```python
from tabsdatak.api import subscriber, TableFrameSpec
from tabsdatak.conn.clickhouse import ClickHouseDest

@subscriber(
    destination=ClickHouseDest(
        tables=[
            "orders",
        ],
    ),
    input_tables=["orders"],
)
def write_orders(orders: TableFrameSpec) -> TableFrameSpec:
    return orders
```

-   required
    
-   optional
    
-   optional
    
-   optional
    

### Function Config Parameters

#### `tables`

Defines the destination tables the subscriber writes to in ClickHouse, as a non-empty list. A table cannot be listed twice, and names that differ only in quoting count as the same. Each name is `table` or `database.table`; quote a part with backticks if it has special characters.

Each element in `tables` represents one destination slot and maps positionally to a value returned by the subscriber function.

#### `if_table_exists`

`"append"` (the default) adds rows to the existing table. `"replace"` overwrites the table: the first run creates it, and later runs drop and recreate it.

#### `schema_evolution`

`"strict"` (the default) refuses a write that adds a column, brings a wider type whose values do not fit the column, or writes NULL into a non-`Nullable` column, with `SQL_COMMON_10`, before anything is loaded. Column order is ignored, a narrower type fits, and a column the frame lacks is written as NULL. `"update"` adds `Nullable` columns, makes columns nullable and widens integers up to 64 bits and `Float32` to `Float64`; it never drops or reorders columns. Before 2.3.0 `"update"` was called `"iceberg"`, which now fails validation. See [Schema Evolution](https://docs.tabsdata.com/developer/guide/connectors/schema-evolution).

#### `dest_cfg`

Sets additional destination configuration. The accepted key is `clickhouse.logging_level`. ClickHouse always uses Iceberg schema evolution, so `clickhouse.schema_evolution_engine` is refused at registration.

## Write behavior

Each entry in `tables` is one destination slot and maps by position to a value returned by the subscriber function. Returning `None` for a slot skips that write.

`if_table_exists="append"` adds rows. `"replace"` drops and recreates the table. Because the table is recreated, any engine, `ORDER BY` or `PARTITION BY` set on it is lost; a table the connector creates uses `ENGINE = MergeTree() ORDER BY tuple()`. To keep a layout, create the table first and use `"append"`. Neither mode runs in a transaction: if the insert fails after `"replace"`, the table is left empty, and a failed create leaves no table. Multiple tables are written one after another.

With `schema_evolution="strict"`, a new column, or a wider type whose values do not fit, is refused; `"update"` applies supported schema changes.

### Schema evolution

`schema_evolution` decides what a write does when the returned frame has a column the destination table lacks, or a type wider than the column's. `"strict"`, the default, refuses a new column, and refuses a wider type unless its values fit the column. `"update"` changes the table to fit the frame. On ClickHouse, `"update"` uses [Iceberg schema evolution](https://docs.tabsdata.com/developer/guide/connectors/schema-evolution#native-and-iceberg-schema-evolution), applied by the connector, on `"append"` and `"replace"`: it adds `Nullable` columns, makes columns nullable, widens integers up to 64 bits, signed and unsigned, and widens `Float32` to `Float64`. `"merge"` is not supported.

## Operational notes

-   The connector stages Parquet files before ClickHouse reads them. A run needs both staging access and ClickHouse access.
-   Staged files are deleted after each run, whether or not the write succeeds. The cleanup lists every object under `base_path` whose first path segment sorts at or below the run's upload ID. Give each subscriber its own `base_path`: a `base_path` of `/` reaches the whole bucket, and two subscribers on one prefix can delete each other's files. The staging credentials need list and delete permission on that prefix, as well as upload.
-   GCS staging needs service-account JSON for uploads and HMAC credentials for ClickHouse's S3-compatible reads.
-   The ClickHouse server reads the staged files itself, so it needs network access to the staging store. S3 uses AWS unless `obstore.endpoint` is set; Azure uses `core.windows.net` unless `obstore.endpoint` is set; GCS always uses `storage.googleapis.com` and refuses an endpoint with `CLICKHOUSE_12`.
-   Tabsdata does not contact ClickHouse or the staging service when the collection is created. Those checks happen when the subscriber runs.

## Connection

ClickHouse subscribers use `ClickHouseDestConn` to define the server, the credentials, and the cloud storage the data is staged in.

conn-clickhouse.yaml

```yaml
kind: connectionDef
apiVersion: '1.0'
type: tabsdatak.conn.clickhouse:ClickHouseDestConn
spec:
  host: 'clickhouse.internal'
  credentials:
    kind: userPasswordCredentials
    apiVersion: '1.0'
    type: tabsdatak.conn.common.types:UserPassword
    spec:
      user: 'secret:tabsdata_writer'
      password: 'secret:example-password'
  staging:
    kind: clickHouseS3Location
    apiVersion: '1.0'
    type: tabsdatak.conn.clickhouse:S3Location
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
      base_path: '/clickhouse'
```

-   required
    
-   optional
    
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
tdk connection template --type clickhouse-bulk-out --file conn-clickhouse.yaml
```

Edit the template file with the ClickHouse connection information, check it, and create the collection with it:

```bash
tdk connection validate --file conn-clickhouse.yaml
```

```bash
tdk collection create --name clickhouse_out --conn-file conn-clickhouse.yaml
```

Then register the subscriber in the collection:

```bash
tdk fn register --coll clickhouse_out --path write_orders.py::write_orders
```

-   The collection goes in the `destinations` group, because the connection is a destination connection. `--group` can be left out; if it is given, it must be `destinations`.
-   `secret:<value>` gives a secret value in the file itself. `$secret:<ENV_VAR>` reads it from an environment variable when the collection is created, so the value never appears in the file. Either way, Tabsdata stores the secret separately, and the stored connection only shows a placeholder.
-   Functions in the collection must use the connector of its connection: `ClickHouseDest` for a collection created with `ClickHouseDestConn`. Transformers go in a collection of their own.
-   To change the connection later, for example to rotate a password, run `tdk collection update --name clickhouse_out --conn-file conn-clickhouse.yaml`. The connector cannot change; to use another one, create another collection.
-   Creating a source or destination collection requires permission to manage the project.

### Connection Config Parameters

#### `host`, `port`, `database` and `secure`

`host` identifies the ClickHouse server. `port` is the HTTP(S) port, from 1 to 65535, and defaults to `"8123"`. `database` defaults to `"default"` and supplies the database for destination table names without one. `secure` is `"true"` for HTTPS and `"false"` (the default) for HTTP. It does not change the port, so set `port` as well; HTTPS ClickHouse is usually on 8443.

#### `credentials`

A `UserPassword` containing the ClickHouse username and password. Cloud storage credentials are configured separately under `staging`.

#### `staging`

Use one of the location classes from `tabsdatak.conn.clickhouse`:

| Location | Required fields | Credentials |
| --- | --- | --- |
| `S3Location` | `bucket`, `region`, `credentials` | `AwsAccessSecretKey` |
| `AzBlobLocation` | `container`, `credentials` | `AzureAccountKey` |
| `GCSLocation` | `bucket`, `credentials`, `hmac_credentials` | `GCPJson` for uploads and `GCPHmac` for ClickHouse reads |

Tabsdata must be able to upload the staged files, and ClickHouse must be able to read them. For GCS, both credential types are required: uploads use the native GCS API, while ClickHouse reads through the S3-compatible endpoint. Keys under `cfg` on the location configure the object store; see [Object Store Options](https://docs.tabsdata.com/developer/guide/connectors/object-store-options).

#### `entity_whitelist`

A YAML list of regular expressions, not a comma-separated string. It is checked to be a list of valid regular expressions, but it has no effect yet. Leave it out.

#### `conn_cfg`

Optional connector configuration.

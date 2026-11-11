# BigQuery

> Reference for the Tabsdata BigQuery connector.

Source: https://docs.tabsdata.com/guide/connectors/bigquery

The BigQuery connector lets Tabsdata write tables into BigQuery. BigQuery is destination-only: there is no publisher-side connector for reading from BigQuery.

The `BigQueryDest` connector can be used by a subscriber function to write data from a Tabsdata table into BigQuery. [See the full subscriber walkthrough](https://docs.tabsdata.com/tutorials/subscribers/bigquery)

The subscriber is registered in a collection created with a `BigQueryDestConn` connection. The connection, and how to create the collection, are described in [Connection](#connection), at the end of this page.

### Prerequisites

-   The BigQuery project and dataset exist, and the service account can create and load tables in them.
-   The GCS staging bucket exists. The service account can write staged Parquet files there and BigQuery can load them.
-   The project and dataset are set either in each table name or as connection defaults.

### Subscriber

For merge writes, schema evolution, and retry watermarks, see [Merging into SQL destinations](https://docs.tabsdata.com/guide/functions/sql-merge).

Configure `BigQueryDest` as the `destination` of a subscriber function to define which tables Tabsdata writes in BigQuery.

write\_orders.py

```python
from tabsdatak.api import subscriber
from tabsdatak.conn.bigquery import BigQueryDest

@subscriber(
    destination=BigQueryDest(
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

Defines the destination tables the subscriber writes to in BigQuery.

Each element in `tables` represents one destination slot and maps positionally to a value returned by the subscriber function. Each name is `[[project.]dataset.]table`; a bare `table` or `dataset.table` is completed from the connection's `project`/`dataset` defaults. BigQuery wraps the whole name in one backtick pair, e.g. `` `my-project.ds.t` ``.

#### `if_table_exists`

`"merge"` applies inserts, updates, and deletes by key and requires a `merge_cfg` list. See [Merge configuration](https://docs.tabsdata.com/guide/functions/sql-merge#merge-configuration) for a complete example.

Controls what happens when the destination table already exists. `"append"` (the default) adds rows. `"replace"` drops and recreates the table.

#### `schema_evolution`

Controls what happens when the returned frame has a column the table lacks or a wider type. `"update"` adds and widens columns. `"strict"` is the default: an append fails in the load job (`BIGQUERY_7`), and a merge is refused before it runs (`SQL_COMMON_10`). See [Schema Evolution](https://docs.tabsdata.com/guide/connectors/schema-evolution).

#### `dest_cfg`

Sets additional destination configuration. Supported keys include `bigquery.logging_level` and `bigquery.schema_evolution_engine`. The engine key is only for a merge under `schema_evolution="update"`, where it must be `"iceberg"`. See [Schema evolution](#schema-evolution).

## Write behavior

Each entry in `tables` is one destination slot and maps by position to a value returned by the subscriber function. Returning `None` for a slot skips that write.

`if_table_exists="append"` adds rows. `"replace"` drops and recreates the table. `"merge"` applies inserts, updates, and deletes by key and needs `merge_cfg`.

With `schema_evolution="strict"`, a frame with a new column, or a wider type whose values do not fit, fails instead of changing the table. `"update"` adds and widens columns before the load.

### Schema evolution

`schema_evolution` decides what a write does when the returned frame has a column the destination table lacks, or a type wider than the column's. `"strict"`, the default, refuses a new column, and refuses a wider type unless its values fit the column. `"update"` changes the table to fit the frame. On BigQuery, the schema evolution `"update"` uses depends on `if_table_exists`:

| `if_table_exists` | `"update"` uses | Changes to the table |
| --- | --- | --- |
| `"append"`, `"replace"` | BigQuery's native schema evolution | Adds columns and makes columns nullable. It never widens a type. |
| `"merge"` | [Iceberg schema evolution](https://docs.tabsdata.com/guide/connectors/schema-evolution#native-and-iceberg-schema-evolution), applied by the connector through `ALTER TABLE`. Needs `dest_cfg={"bigquery.schema_evolution_engine": "iceberg"}`. | Adds columns and widens types. |

BigQuery's native schema evolution does not apply to `MERGE`, so a merge under `"update"` without the `iceberg` engine is refused at registration. `bigquery.schema_evolution_engine` is accepted only on a merge under `"update"`: setting it on `"append"` or `"replace"`, or on a merge under `"strict"`, is also refused at registration. See [Schema Evolution](https://docs.tabsdata.com/guide/connectors/schema-evolution) for the types each destination widens.

## Operational notes

-   Each write is staged as Parquet in GCS before the BigQuery load job runs. Both the staging write and the BigQuery load must succeed.
-   Bare table names use the connection's `project` and `dataset`. Fully qualified names override those defaults.
-   Tabsdata does not contact GCS or BigQuery when the collection is created. Connection and permission errors appear when the subscriber runs.

## Connection

BigQuery subscribers use `BigQueryDestConn` to define the GCS staging location and credentials used by the subscriber. The connector stages each write as parquet in GCS, then runs a load job against BigQuery referencing that object.

conn-bigquery.yaml

```yaml
kind: connectionDef
apiVersion: '1.0'
type: tabsdatak.conn.bigquery:BigQueryDestConn
spec:
  staging:
    bucket: 'acme-stage'
    credentials:
      kind: gcpJsonCredentials
      apiVersion: '1.0'
      type: tabsdatak.conn.common.types:GCPJson
      spec:
        json: 'secret:{"type": "service_account", ...}'
    base_path: '/bigquery'
  credentials:
    kind: gcpJsonCredentials
    apiVersion: '1.0'
    type: tabsdatak.conn.common.types:GCPJson
    spec:
      json: 'secret:{"type": "service_account", ...}'
```

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
tdk connection template --type bigquery-bulk-out --file conn-bigquery.yaml
```

Edit the template file with the BigQuery connection information, check it, and create the collection with it:

```bash
tdk connection validate --file conn-bigquery.yaml
```

```bash
tdk collection create --name bigquery_out --conn-file conn-bigquery.yaml
```

Then register the subscriber in the collection:

```bash
tdk fn register --coll bigquery_out --path write_orders.py::write_orders
```

-   The collection goes in the `destinations` group, because the connection is a destination connection. `--group` can be left out; if it is given, it must be `destinations`.
-   `secret:<value>` gives a secret value in the file itself. `$secret:<ENV_VAR>` reads it from an environment variable when the collection is created, so the value never appears in the file. Either way, Tabsdata stores the secret separately, and the stored connection only shows a placeholder.
-   Functions in the collection must use the connector of its connection: `BigQueryDest` for a collection created with `BigQueryDestConn`. Transformers go in a collection of their own.
-   To change the connection later, for example to rotate a password, run `tdk collection update --name bigquery_out --conn-file conn-bigquery.yaml`. The connector cannot change; to use another one, create another collection.
-   Creating a source or destination collection requires permission to manage the project.

### Connection Config Parameters

#### `staging`

The `GCSLocation` used as the parquet staging bucket for load jobs: a `bucket`, `credentials` (GCP service-account JSON), and `base_path` (defaults to `/`, same rules as other connectors' `base_path`: starts with `/`, cannot end with `/`, cannot contain empty path segments).

#### `credentials`

The GCP service-account JSON credentials (`GCPJson`) used to run the BigQuery load job, separate from the credentials on `staging` used to upload to GCS.

#### `project`

The default GCP project id. Required when `dataset` is set.

#### `dataset`

The default BigQuery dataset id. Requires `project` to be set.

#### `entity_whitelist`

A YAML list of regular expressions, not a comma-separated string. It is checked to be a list of valid regular expressions, but it has no effect yet. Leave it out.

#### `conn_cfg`

Optional connector configuration overrides.

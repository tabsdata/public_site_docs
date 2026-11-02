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

Controls how new columns in the returned frame are handled. `"update"` allows new columns. `"strict"` is the default and leaves existing data columns unchanged. See [Merging into SQL destinations](https://docs.tabsdata.com/guide/functions/sql-merge#schema-evolution) for merge-specific behavior.

#### `dest_cfg`

Sets additional destination configuration. Supported keys include `bigquery.logging_level` and `bigquery.schema_evolution_engine`. Merge mode requires `bigquery.schema_evolution_engine="iceberg"`.

## Write behavior

Each entry in `tables` is one destination slot and maps by position to a value returned by the subscriber function. Returning `None` for a slot skips that write.

`if_table_exists="append"` adds rows. `"replace"` drops and recreates the table. `"merge"` applies inserts, updates, and deletes by key and needs `merge_cfg`.

With `schema_evolution="strict"`, new columns are not added to an existing table. `"update"` allows new columns during append-style writes.

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

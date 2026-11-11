# BigQuery (sample layout)

> Sample restructure of the BigQuery connector page, ordered by task: connect, write, merge, then how writes behave.

Source: https://docs.tabsdata.com/guide/connectors/bigquery-sample

The BigQuery connector writes Tabsdata tables into BigQuery. It is destination-only: there is no publisher for reading from BigQuery.

[See the full subscriber walkthrough](https://docs.tabsdata.com/tutorials/subscribers/bigquery)

## Before you start

-   The BigQuery project and dataset exist, and the service account can create and load tables in them.
-   The GCS staging bucket exists. The service account can write staged Parquet files there and BigQuery can load them.
-   The project and dataset are set either in each table name or as connection defaults.

## Connect to BigQuery

A BigQuery subscriber is registered in a destination collection created with a `BigQueryDestConn` connection. The connection holds the GCS bucket each write is staged in and the credentials for the load job: the connector stages each write as Parquet in GCS, then runs a BigQuery load job against that object.

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
    

1.  Generate a connection template, which lists all the connection fields:
    
    ```bash
    tdk connection template --type bigquery-bulk-out --file conn-bigquery.yaml
    ```
    
2.  Edit the file with the BigQuery connection information, then check it:
    
    ```bash
    tdk connection validate --file conn-bigquery.yaml
    ```
    
3.  Create the collection with it:
    
    ```bash
    tdk collection create --name bigquery_out --conn-file conn-bigquery.yaml
    ```
    

More on the connection and the collection

-   The collection goes in the `destinations` group, because the connection is a destination connection. `--group` can be left out; if it is given, it must be `destinations`.
-   `secret:<value>` gives a secret value in the file itself. `$secret:<ENV_VAR>` reads it from an environment variable when the collection is created, so the value never appears in the file. Either way, Tabsdata stores the secret separately, and the stored connection only shows a placeholder.
-   To change the connection later, for example to rotate a key, run `tdk collection update --name bigquery_out --conn-file conn-bigquery.yaml`. The connector cannot change; to use another one, create another collection.
-   Every function registered in the collection uses its connection. Functions in the collection must use the connector of that connection: `BigQueryDest` for a collection created with `BigQueryDestConn`. Transformers go in a collection of their own.
-   Creating a source or destination collection requires permission to manage the project.

### Connection parameters

| Field | Type | Description |
| --- | --- | --- |
| `staging` | `GCSLocation` | GCS bucket, credentials (GCP service-account JSON) and `base_path` used as the Parquet staging area for load jobs. `base_path` defaults to `/`; it starts with `/`, cannot end with `/`, and cannot contain empty path segments. |
| `credentials` | `GCPJson` | GCP service-account JSON credentials used to run the BigQuery load job, separate from the credentials on `staging` used to upload to GCS. |
| `project` | `str` | Default GCP project id. Required when `dataset` is set. |
| `dataset` | `str` | Default BigQuery dataset id. Requires `project`. |
| `entity_whitelist` | `list[str]` | A YAML list of regular expressions, not a comma-separated string. It is checked to be a list of valid regular expressions, but it has no effect yet. Leave it out. |
| `conn_cfg` | `dict` | Optional connector configuration overrides. |

## Write a table to BigQuery

Configure `BigQueryDest` as the `destination` of a subscriber function. Each entry in `tables` is one destination slot and maps by position to a value the function returns.

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
    

Register the subscriber in the collection:

```bash
tdk fn register --coll bigquery_out --path write_orders.py::write_orders
```

### Subscriber parameters

| Field | Type | Description |
| --- | --- | --- |
| `tables` | `list[str]` | Destination tables, one per returned value, in order. Each is `[[project.]dataset.]table`: a bare `table` or `dataset.table` is completed from the connection's `project` and `dataset` defaults, and a fully qualified name overrides them. BigQuery wraps the whole name in one backtick pair, for example `` `my-project.ds.t` ``. |
| `if_table_exists` | `str` | `"append"` (the default) adds rows. `"replace"` drops and recreates the table. `"merge"` applies inserts, updates, and deletes by key and needs `merge_cfg`; see [Merge changes into a table](#merge-changes-into-a-table). |
| `schema_evolution` | `str` | `"strict"` (the default) refuses a new column, and a wider type unless its values fit the column. `"update"` changes the table. See [Schema evolution](#schema-evolution). |
| `dest_cfg` | `dict` | Accepts `bigquery.logging_level` and `bigquery.schema_evolution_engine`. The engine key is only for a merge under `schema_evolution="update"`, where it must be `"iceberg"`. |

## Merge changes into a table

`if_table_exists="merge"` applies inserts, updates, and deletes by key, and needs a `merge_cfg` list. `MergeCfg` is imported from the same module as the destination:

```python
from tabsdatak.api import subscriber, TableFrameSpec
from tabsdatak.conn.bigquery import BigQueryDest, MergeCfg


@subscriber(
    destination=BigQueryDest(
        tables=["orders"],
        if_table_exists="merge",
        merge_cfg=[MergeCfg(on=["order_id"], op_column="op")],
    ),
    input_tables=["capture/order_changes"],
)
def load_orders(changes: TableFrameSpec) -> TableFrameSpec:
    return changes
```

A merge under `schema_evolution="update"` also needs `dest_cfg={"bigquery.schema_evolution_engine": "iceberg"}`. See [Merge configuration](https://docs.tabsdata.com/guide/functions/sql-merge#merge-configuration) for a complete example, and [Merging into SQL destinations](https://docs.tabsdata.com/guide/functions/sql-merge) for the operation column and retry watermarks.

## How writes behave

`if_table_exists="append"` adds rows. `"replace"` drops and recreates the table. `"merge"` applies inserts, updates, and deletes by key. Returning `None` for a slot skips that write.

Each write is staged as Parquet in GCS before the BigQuery load job runs, and both must succeed. Tabsdata does not contact GCS or BigQuery when the collection is created, so connection and permission errors appear when the subscriber runs.

### Schema evolution

`schema_evolution` decides what a write does when the returned frame has a column the destination table lacks, or a type wider than the column's. `"strict"`, the default, refuses a new column, and refuses a wider type unless its values fit the column. `"update"` changes the table to fit the frame. On BigQuery, the schema evolution `"update"` uses depends on `if_table_exists`:

| `if_table_exists` | `"update"` uses | Changes to the table |
| --- | --- | --- |
| `"append"`, `"replace"` | BigQuery's native schema evolution | Adds columns and makes columns nullable. It never widens a type. |
| `"merge"` | [Iceberg schema evolution](https://docs.tabsdata.com/guide/connectors/schema-evolution#native-and-iceberg-schema-evolution), applied by the connector through `ALTER TABLE`. Needs `dest_cfg={"bigquery.schema_evolution_engine": "iceberg"}`. | Adds columns and widens types. |

BigQuery's native schema evolution does not apply to `MERGE`, so a merge under `"update"` without the `iceberg` engine is refused at registration. `bigquery.schema_evolution_engine` is accepted only on a merge under `"update"`: setting it on `"append"` or `"replace"`, or on a merge under `"strict"`, is also refused at registration. See [Schema Evolution](https://docs.tabsdata.com/guide/connectors/schema-evolution) for the types each destination widens.

Under `"strict"`, an append fails in the load job (`BIGQUERY_7`), and a merge is refused before it runs (`SQL_COMMON_10`).

## Resources

-   [`BigQueryDest`](https://docs.tabsdata.com/api/category/connectors/destination/bigquerydest), [`BigQueryDestConn`](https://docs.tabsdata.com/api/category/connectors/destination/bigquerydestconn) and [`MergeCfg`](https://docs.tabsdata.com/api/category/connectors/destination/mergecfg-bigquery) in the API reference
-   [Subscriber walkthrough](https://docs.tabsdata.com/tutorials/subscribers/bigquery)
-   [Merging into SQL destinations](https://docs.tabsdata.com/guide/functions/sql-merge)
-   [Schema Evolution](https://docs.tabsdata.com/guide/connectors/schema-evolution)

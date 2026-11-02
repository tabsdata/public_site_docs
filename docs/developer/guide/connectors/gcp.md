# Google Cloud Storage

> Reference for the Tabsdata Google Cloud Storage connector.

Source: https://docs.tabsdata.com/developer/guide/connectors/gcp

The Google Cloud Storage connector lets Tabsdata read files from and write files to Google Cloud Storage.

The `GCSSrc` connector can be used by a publisher function to read data from Google Cloud Storage into a Tabsdata table.

The `GCSDest` connector can be used by a subscriber function to write data from a Tabsdata table into Google Cloud Storage.

## Supported formats

| Format | Publish | Subscribe |
| --- | --- | --- |
| `AUTO` | Yes | Yes |
| `CSV` | Yes | Yes |
| `JSON` | Yes | Yes |
| `AVRO` | Yes | Yes |
| `PARQUET` | Yes | Yes |
| `LOG` | Yes | No |

## Publisher

The `GCSSrc` connector can be used by a publisher function to read data from Google Cloud Storage into a Tabsdata table. [See the full publisher walkthrough](https://docs.tabsdata.com/developer/tutorials/publishers/gcp)

The publisher is registered in a collection created with a `GCSSrcConn` connection. The connection, and how to create the collection, are described in [Publisher connection](#publisher-connection), at the end of this page.

### Prerequisites

-   The bucket exists and is reachable from the Tabsdata server.
-   The service account can list the bucket and read every object matched by `paths`.
-   The object format and compression match `format` and `format_cfg`.

### Publisher

Configure `GCSSrc` as the `source` of a publisher function to select the files that Tabsdata reads from Google Cloud Storage.

publish\_orders.py

```python
from tabsdatak.api import publisher
from tabsdatak.conn.gcs import GCSSrc, SrcFileFormat

@publisher(
    source=GCSSrc(
        paths=[
            "incoming/orders.parquet",
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
    
-   optional
    
-   optional
    

### Function Config Parameters

#### `paths`

Defines the files that the publisher reads from Google Cloud Storage.

Each path is relative to the `base_path` configured in `GCSSrcConn`. Source paths:

-   cannot begin or end with `/`
-   cannot contain empty path segments
-   can contain a `*` glob in the final path segment

For example:

```python
GCSSrc(
    paths=[
        "orders/2026/*.parquet",
        "customers/customers.csv",
    ]
)
```

Each element in `paths` represents one source slot and maps positionally to an argument in the publisher function.

When a path uses a glob to match multiple files, the matching files are provided through the corresponding publisher input.

#### `format`

Sets the format used to read the source files.

Supported formats are `AUTO`, `CSV`, `JSON`, `AVRO`, `PARQUET`, and `LOG`. The default is `AUTO`, which determines the format from the file extension.

#### `format_cfg`

Sets format-specific reader options. Configuration is keyed by `SrcFileFormat`.

#### `initial_last_modified`

Sets the initial cutoff for incremental ingestion.

On the first run, Tabsdata imports files modified at or after the specified timestamp. The cutoff then advances so subsequent runs only import newer files.

#### `src_cfg`

Sets additional source configuration.

The following options are supported:

| Option | Description |
| --- | --- |
| `tabsdata.file.chunk_size` | Controls the size of chunks used when reading files. |
| `tabsdata.src_metadata.drop` | When `True`, excludes the `@td.file.path` metadata column. |

By default, rows read from Google Cloud Storage include a `@td.file.path` metadata column containing the source file's URI.

## Subscriber

The `GCSDest` connector can be used by a subscriber function to write data from a Tabsdata table into Google Cloud Storage. [See the full subscriber walkthrough](https://docs.tabsdata.com/developer/tutorials/subscribers/gcp)

The subscriber is registered in a collection created with a `GCSDestConn` connection. The connection, and how to create the collection, are described in [Subscriber connection](#subscriber-connection), at the end of this page.

### Prerequisites

-   The bucket exists and is reachable from the Tabsdata server.
-   The service account can create and write objects under the configured `base_path`.
-   The destination path is relative and does not contain a glob.

### Subscriber

Configure `GCSDest` as the `destination` of a subscriber function to define where Tabsdata writes files in Google Cloud Storage.

write\_orders.py

```python
from tabsdatak.api import subscriber
from tabsdatak.conn.gcs import GCSDest, DestFileFormat

@subscriber(
    destination=GCSDest(
        paths=[
            "exports/orders.parquet",
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

#### `paths`

Defines where the subscriber writes files in Google Cloud Storage.

Each path is relative to the `base_path` configured in `GCSDestConn`. Destination paths:

-   cannot begin or end with `/`
-   cannot contain empty path segments
-   cannot contain globs

Each element in `paths` represents one destination slot and maps positionally to a value returned by the subscriber function.

Destination paths can contain variables that Tabsdata substitutes when the subscriber runs:

| Variable | Value |
| --- | --- |
| `${EXEC_PLAN_ID}` | Current execution plan ID. |
| `${TRX_ID}` | Current transaction ID. |
| `${EXEC_PLAN_TS}` | Timestamp when the execution plan started. |

For example:

```python
GCSDest(
    paths=[
        "exports/${EXEC_PLAN_ID}/orders.parquet",
    ]
)
```

Dynamic paths can be used to create a new object for each execution instead of overwriting an existing object.

#### `format`

Sets the format used to write the destination file.

Supported formats are `AUTO`, `CSV`, `JSON`, `AVRO`, and `PARQUET`. The default is `AUTO`, which determines the format from the destination file extension.

#### `format_cfg`

Sets format-specific writer options. Configuration is keyed by `DestFileFormat`.

#### `dest_cfg`

Sets additional destination configuration.

The `tabsdata.file.chunk_size` option controls the size of chunks used when writing files.

## File behavior

Each entry in a publisher's `paths` is one source slot. A literal path reads one object; a final-segment `*` glob can read several. The slots map by position to the publisher function arguments and then to `output_tables`.

`initial_last_modified` sets the cutoff for the first run. After a successful run, Tabsdata advances the cutoff so the same unchanged objects are not published again.

Each entry in a subscriber's `paths` is one destination slot and maps by position to a returned value. Use `${EXEC_PLAN_ID}`, `${TRX_ID}`, or `${EXEC_PLAN_TS}` in a path when every run needs a new object. A fixed path writes to the same location again.

## Operational notes

-   Without `trigger_by`, a publisher runs only when triggered manually, while a subscriber runs when any input table commits. Set `trigger_by` to change when the function runs.
-   Tabsdata validates the connection document when the collection is created, but it does not contact Google Cloud Storage then. A bad path, credential, or permission fails when the function runs.
-   Globs are allowed only for publisher source paths, and only in the final path segment. Subscriber destination paths cannot contain globs.
-   All configured paths are relative to the connection's `base_path`.

## Publisher connection

Google Cloud Storage publishers use `GCSSrcConn` to define the bucket and credentials used by the publisher.

conn-gcs-in.yaml

```yaml
kind: connectionDef
apiVersion: '1.0'
type: tabsdatak.conn.gcs:GCSSrcConn
spec:
  bucket: 'acme-ingest'
  credentials:
    kind: gcpJsonCredentials
    apiVersion: '1.0'
    type: tabsdatak.conn.common.types:GCPJson
    spec:
      json: 'secret:{"type":"service_account",...}'
```

-   required
    
-   required
    
-   optional
    
-   optional
    
-   optional
    

### Create the collection

A publisher is registered in a source collection, and a source collection is created with its connection. Every function registered in the collection uses that connection.

Generate a connection template, which lists all the connection fields:

```bash
tdk connection template --type gcs-file-in --file conn-gcs-in.yaml
```

Edit the template file with the Google Cloud Storage connection information, check it, and create the collection with it:

```bash
tdk connection validate --file conn-gcs-in.yaml
```

```bash
tdk collection create --name gcs_in --conn-file conn-gcs-in.yaml
```

Then register the publisher in the collection:

```bash
tdk fn register --coll gcs_in --path publish_orders.py::publish_orders
```

-   The collection goes in the `sources` group, because the connection is a source connection. `--group` can be left out; if it is given, it must be `sources`.
-   `secret:<value>` gives a secret value in the file itself. `$secret:<ENV_VAR>` reads it from an environment variable when the collection is created, so the value never appears in the file. Either way, Tabsdata stores the secret separately, and the stored connection only shows a placeholder.
-   Functions in the collection must use the connector of its connection: `GCSSrc` for a collection created with `GCSSrcConn`. Transformers go in a collection of their own.
-   To change the connection later, for example to rotate a password, run `tdk collection update --name gcs_in --conn-file conn-gcs-in.yaml`. The connector cannot change; to use another one, create another collection.
-   Creating a source or destination collection requires permission to manage the project.

### Connection Config Parameters

#### `bucket`

The name of the GCS bucket that contains the files to publish.

#### `credentials`

The service-account JSON credential used to access the bucket. `GCPJson` requires a `json` key holding the full service-account key document.

#### `project`

Optional GCP project id associated with the bucket.

#### `base_path`

Sets the base path within the bucket. All paths configured in `GCSSrc` are relative to this path.

`base_path` starts with `/`, cannot end with `/`, and cannot contain empty path segments. The default is `/`.

#### `conn_cfg`

Optional connector configuration overrides.

## Subscriber connection

Google Cloud Storage subscribers use `GCSDestConn` to define the bucket and credentials used by the subscriber.

conn-gcs-out.yaml

```yaml
kind: connectionDef
apiVersion: '1.0'
type: tabsdatak.conn.gcs:GCSDestConn
spec:
  bucket: 'acme-exports'
  credentials:
    kind: gcpJsonCredentials
    apiVersion: '1.0'
    type: tabsdatak.conn.common.types:GCPJson
    spec:
      json: 'secret:{"type":"service_account",...}'
```

-   required
    
-   required
    
-   optional
    
-   optional
    
-   optional
    

### Create the collection

A subscriber is registered in a destination collection, and a destination collection is created with its connection. Every function registered in the collection uses that connection.

Generate a connection template, which lists all the connection fields:

```bash
tdk connection template --type gcs-file-out --file conn-gcs-out.yaml
```

Edit the template file with the Google Cloud Storage connection information, check it, and create the collection with it:

```bash
tdk connection validate --file conn-gcs-out.yaml
```

```bash
tdk collection create --name gcs_out --conn-file conn-gcs-out.yaml
```

Then register the subscriber in the collection:

```bash
tdk fn register --coll gcs_out --path write_orders.py::write_orders
```

-   The collection goes in the `destinations` group, because the connection is a destination connection. `--group` can be left out; if it is given, it must be `destinations`.
-   `secret:<value>` gives a secret value in the file itself. `$secret:<ENV_VAR>` reads it from an environment variable when the collection is created, so the value never appears in the file. Either way, Tabsdata stores the secret separately, and the stored connection only shows a placeholder.
-   Functions in the collection must use the connector of its connection: `GCSDest` for a collection created with `GCSDestConn`. Transformers go in a collection of their own.
-   To change the connection later, for example to rotate a password, run `tdk collection update --name gcs_out --conn-file conn-gcs-out.yaml`. The connector cannot change; to use another one, create another collection.
-   Creating a source or destination collection requires permission to manage the project.

### Connection Config Parameters

#### `bucket`

The name of the GCS bucket where the subscriber writes files.

#### `credentials`

The service-account JSON credential used to access the bucket. `GCPJson` requires a `json` key holding the full service-account key document.

#### `project`

Optional GCP project id associated with the bucket.

#### `base_path`

Sets the base path within the bucket. All paths configured in `GCSDest` are relative to this path.

`base_path` starts with `/`, cannot end with `/`, and cannot contain empty path segments. The default is `/`.

#### `conn_cfg`

Optional connector configuration overrides.

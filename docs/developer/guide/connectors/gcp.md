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
| `EXCEL` | Yes | No |

## Publisher

The `GCSSrc` connector can be used by a publisher function to read data from Google Cloud Storage into a Tabsdata table. [See the full publisher walkthrough](https://docs.tabsdata.com/developer/tutorials/publishers/gcp)

The publisher is registered in a collection created with a `GCSSrcConn` connection. The connection, and how to create the collection, are described in [Publisher connection](#publisher-connection), at the end of this page.

### Prerequisites

-   The bucket exists and is reachable from the Tabsdata server.
-   The service account can list the bucket and read every object matched by `paths`.
-   Compressed objects need `include_compressed=True`; see [`include_compressed`](#include_compressed).

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
-   cannot be `.` or `..`, or contain a `${...}` token
-   can contain a `*` glob in the final path segment. `*` matches any run of characters and `?` matches one character; in directory segments, both are literal.

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

Supported formats are `AUTO`, `CSV`, `JSON`, `AVRO`, `PARQUET`, `LOG`, and `EXCEL`. The default is `AUTO`, which determines the format from the file extension. `AUTO` resolves the format for each file from its own extension. For a compressed file, that is the extension before the compression extension. A file whose extension names no format fails the run. A source whose files resolve to different formats also fails the run. `EXCEL` reads `.xlsx` workbooks only. Pick a sheet with a `#n` suffix on the path, such as `paths=["book.xlsx#2"]`; the sheet number starts at 1 and counts hidden sheets, and `#0` is refused. Its `format_cfg` takes `has_header`.

#### `format_cfg`

Sets format-specific reader options. Configuration is keyed by `SrcFileFormat`.

For `CSV`, `has_header=False` reads the first row as data. The columns are then named `column_0`, `column_1`, ... `skip_lines` skips that many lines at the start of each file before the header is read. A `""` field is read as an empty string.

#### `include_compressed`

When `True`, the publisher reads compressed objects. A path that ends in a compression extension fails validation without it. The compression extensions are `.gz`, `.zlib`, `.zst`, `.zstd`, `.bz2`, `.xz`, `.lz4` and `.br`, plus single-entry `.zip` and `.tar` archives. The format comes from the name before the compression extension, so `orders.csv.gz` is read as CSV. An archive must hold one file, and a name can have only one compression extension.

#### `purge`

When `True`, the publisher deletes each matched object that the cursor skipped, if its modification time is at or after `initial_last_modified`. `purge` requires `initial_last_modified`; without it the run fails with `FILE_COMMON_35`. Deletion runs for each slot after that slot's frames are read.

warning

`purge` deletes data, including a late object that the cursor skipped before the publisher ever read it. It needs delete permission on the source objects.

#### `initial_last_modified`

Sets the initial cutoff for incremental ingestion.

On the first run, Tabsdata imports files modified at or after the specified timestamp. The cutoff then advances so subsequent runs only import newer files. The value must be timezone-aware, for example `datetime(2026, 1, 1, tzinfo=timezone.utc)`.

#### `src_cfg`

Sets additional source configuration.

The following options are supported:

| Option | Description |
| --- | --- |
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
| `${TRIGGERED_ON}` | Timestamp in file-safe form, such as `20260604T083428.376Z`. Replaces `${EXEC_PLAN_TS}`. |
| `${EXEC_PLAN_TS}` | Timestamp when the execution plan started. Deprecated since 2.3.0; use `${TRIGGERED_ON}`. |

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

## File behavior

Each entry in a publisher's `paths` is one source slot. A literal path reads one object; a final-segment `*` glob can read several. The slots map by position to the publisher function arguments and then to `output_tables`. Each slot receives one frame per matched object, oldest object first by modification time and then by name. A slot with no matches receives an empty list. Subdirectories are not searched.

`initial_last_modified` sets the cutoff for the first run. After a successful run, Tabsdata advances the cutoff so the same unchanged objects are not published again. Without `initial_last_modified`, every run reads every matched object. The cutoff is kept for each slot position and pattern, so reordering `paths` resets it. A late object whose modification time is older than the newest object already taken is skipped. An object that shares a modification time with another is taken once, and overlapping globs import the same object twice.

Each entry in a subscriber's `paths` is one destination slot and maps by position to a returned value. Use `${EXEC_PLAN_ID}`, `${TRX_ID}`, or `${TRIGGERED_ON}` in a path when every run needs a new object. `${TRIGGERED_ON}` is a timestamp in file-safe form, such as `20260604T083428.376Z`. `${EXEC_PLAN_TS}` still works, but it is deprecated since 2.3.0 and logs a warning. A fixed path writes to the same location again.

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

Optional connector configuration overrides. Keys that start with `obstore.` configure the object store; see [Object Store Options](https://docs.tabsdata.com/developer/guide/connectors/object-store-options).

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

Optional connector configuration overrides. Keys that start with `obstore.` configure the object store; see [Object Store Options](https://docs.tabsdata.com/developer/guide/connectors/object-store-options).

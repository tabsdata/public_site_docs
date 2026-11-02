# Local File System

> Reference for the Tabsdata Local File System connector.

Source: https://docs.tabsdata.com/guide/connectors/local-file-system

The Local File System connector lets Tabsdata read files from and write files to the server's own filesystem.

The `LocalFileSrc` connector can be used by a publisher function to read data from local files into a Tabsdata table.

The `LocalFileDest` connector can be used by a subscriber function to write data from a Tabsdata table into local files.

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

The `LocalFileSrc` connector can be used by a publisher function to read data from local files into a Tabsdata table. [See the full publisher walkthrough](https://docs.tabsdata.com/tutorials/publishers/local-file-system)

The publisher is registered in a collection created with a `LocalFileSrcConn` connection. The connection, and how to create the collection, are described in [Publisher connection](#publisher-connection), at the end of this page.

### Prerequisites

-   The configured `base_path` exists on the Tabsdata server and is readable by the function worker.
-   Every source path stays under `base_path`; parent-directory segments are refused.
-   The file format and compression match `format` and `format_cfg`.

### Publisher

Configure `LocalFileSrc` as the `source` of a publisher function to select the files that Tabsdata reads from disk.

publish\_orders.py

```python
from tabsdatak.api import publisher
from tabsdatak.conn.localfile import LocalFileSrc, SrcFileFormat

@publisher(
    source=LocalFileSrc(
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

Defines the files that the publisher reads from disk.

Each path is relative to the `base_path` configured in `LocalFileSrcConn`. Source paths:

-   cannot begin or end with `/`
-   cannot contain empty path segments
-   can contain a `*` glob in the final path segment

For example:

```python
LocalFileSrc(
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

By default, rows read from disk include a `@td.file.path` metadata column containing the source file's path.

## Subscriber

The `LocalFileDest` connector can be used by a subscriber function to write data from a Tabsdata table into local files. [See the full subscriber walkthrough](https://docs.tabsdata.com/tutorials/subscribers/local-file-system)

The subscriber is registered in a collection created with a `LocalFileDestConn` connection. The connection, and how to create the collection, are described in [Subscriber connection](#subscriber-connection), at the end of this page.

### Prerequisites

-   The configured `base_path` exists on the Tabsdata server and is writable by the function worker.
-   Every destination path stays under `base_path`; parent-directory segments and globs are refused.
-   Enough disk space is available for the files written by the run.

### Subscriber

Configure `LocalFileDest` as the `destination` of a subscriber function to define where Tabsdata writes files on disk.

write\_orders.py

```python
from tabsdatak.api import subscriber
from tabsdatak.conn.localfile import LocalFileDest, DestFileFormat

@subscriber(
    destination=LocalFileDest(
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

Defines where the subscriber writes files on disk.

Each path is relative to the `base_path` configured in `LocalFileDestConn`. Destination paths:

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
LocalFileDest(
    paths=[
        "exports/${EXEC_PLAN_ID}/orders.parquet",
    ]
)
```

Dynamic paths can be used to create a new file for each execution instead of overwriting an existing one.

#### `format`

Sets the format used to write the destination file.

Supported formats are `AUTO`, `CSV`, `JSON`, `AVRO`, and `PARQUET`. The default is `AUTO`, which determines the format from the destination file extension.

#### `format_cfg`

Sets format-specific writer options. Configuration is keyed by `DestFileFormat`.

#### `dest_cfg`

Sets additional destination configuration.

The `tabsdata.file.chunk_size` option controls the size of chunks used when writing files.

## File behavior

Each entry in a publisher's `paths` is one source slot. A literal path reads one file; a final-segment `*` glob can read several. The slots map by position to the publisher function arguments and then to `output_tables`.

`initial_last_modified` sets the cutoff for the first run. After a successful run, Tabsdata advances the cutoff so the same unchanged files are not published again.

Each entry in a subscriber's `paths` is one destination slot and maps by position to a returned value. Use `${EXEC_PLAN_ID}`, `${TRX_ID}`, or `${EXEC_PLAN_TS}` in a path when every run needs a new file. A fixed path writes to the same location again.

## Operational notes

-   Without `trigger_by`, a publisher runs only when triggered manually, while a subscriber runs when any input table commits. Set `trigger_by` to change when the function runs.
-   Tabsdata validates the connection document when the collection is created, but it does not contact local filesystem then. A bad path, credential, or permission fails when the function runs.
-   Globs are allowed only for publisher source paths, and only in the final path segment. Subscriber destination paths cannot contain globs.
-   All configured paths are relative to the connection's `base_path`.

## Publisher connection

Local File System publishers use `LocalFileSrcConn` to define the root filesystem path used by the publisher. Unlike the cloud storage connectors, there is no bucket and no credentials: the connector reads directly off the server's own disk.

conn-local-in.yaml

```yaml
kind: connectionDef
apiVersion: '1.0'
type: tabsdatak.conn.localfile:LocalFileSrcConn
spec:
  base_path: '/data/hr'
```

-   required
    
-   optional
    

### Create the collection

A publisher is registered in a source collection, and a source collection is created with its connection. Every function registered in the collection uses that connection.

Generate a connection template, which lists all the connection fields:

```bash
tdk connection template --type local-file-in --file conn-local-in.yaml
```

Edit the template file with the Local File System connection information, check it, and create the collection with it:

```bash
tdk connection validate --file conn-local-in.yaml
```

```bash
tdk collection create --name local_in --conn-file conn-local-in.yaml
```

Then register the publisher in the collection:

```bash
tdk fn register --coll local_in --path publish_orders.py::publish_orders
```

-   The collection goes in the `sources` group, because the connection is a source connection. `--group` can be left out; if it is given, it must be `sources`.
-   `secret:<value>` gives a secret value in the file itself. `$secret:<ENV_VAR>` reads it from an environment variable when the collection is created, so the value never appears in the file. Either way, Tabsdata stores the secret separately, and the stored connection only shows a placeholder.
-   Functions in the collection must use the connector of its connection: `LocalFileSrc` for a collection created with `LocalFileSrcConn`. Transformers go in a collection of their own.
-   To change the connection later, for example to rotate a password, run `tdk collection update --name local_in --conn-file conn-local-in.yaml`. The connector cannot change; to use another one, create another collection.
-   Creating a source or destination collection requires permission to manage the project.

### Connection Config Parameters

#### `base_path`

The absolute filesystem path that acts as the root for all paths the publisher reads. Unlike the cloud storage connectors, `base_path` is required here: there is no bucket to fall back on, so the server needs a starting point on disk.

#### `conn_cfg`

Optional connector configuration overrides.

## Subscriber connection

Local File System subscribers use `LocalFileDestConn` to define the root filesystem path used by the subscriber. Unlike the cloud storage connectors, there is no bucket and no credentials: the connector writes directly onto the server's own disk.

conn-local-out.yaml

```yaml
kind: connectionDef
apiVersion: '1.0'
type: tabsdatak.conn.localfile:LocalFileDestConn
spec:
  base_path: '/data/exports'
```

-   required
    
-   optional
    

### Create the collection

A subscriber is registered in a destination collection, and a destination collection is created with its connection. Every function registered in the collection uses that connection.

Generate a connection template, which lists all the connection fields:

```bash
tdk connection template --type local-file-out --file conn-local-out.yaml
```

Edit the template file with the Local File System connection information, check it, and create the collection with it:

```bash
tdk connection validate --file conn-local-out.yaml
```

```bash
tdk collection create --name local_out --conn-file conn-local-out.yaml
```

Then register the subscriber in the collection:

```bash
tdk fn register --coll local_out --path write_orders.py::write_orders
```

-   The collection goes in the `destinations` group, because the connection is a destination connection. `--group` can be left out; if it is given, it must be `destinations`.
-   `secret:<value>` gives a secret value in the file itself. `$secret:<ENV_VAR>` reads it from an environment variable when the collection is created, so the value never appears in the file. Either way, Tabsdata stores the secret separately, and the stored connection only shows a placeholder.
-   Functions in the collection must use the connector of its connection: `LocalFileDest` for a collection created with `LocalFileDestConn`. Transformers go in a collection of their own.
-   To change the connection later, for example to rotate a password, run `tdk collection update --name local_out --conn-file conn-local-out.yaml`. The connector cannot change; to use another one, create another collection.
-   Creating a source or destination collection requires permission to manage the project.

### Connection Config Parameters

#### `base_path`

The absolute filesystem path that acts as the root for all paths the subscriber writes. Unlike the cloud storage connectors, `base_path` is required here: there is no bucket to fall back on, so the server needs a starting point on disk.

#### `conn_cfg`

Optional connector configuration overrides.

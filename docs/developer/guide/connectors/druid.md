# Apache Druid

> Reference for the Tabsdata Apache Druid destination connector, cloud staging, and subscriber configuration.

Source: https://docs.tabsdata.com/developer/guide/connectors/druid

The Apache Druid connector lets Tabsdata subscribers write data from Tabsdata tables into Druid datasources.

The connector stages the data as Parquet files in cloud storage, then submits a Druid ingestion task that loads it from there.

[See the full subscriber walkthrough](https://docs.tabsdata.com/developer/tutorials/subscribers/druid)

The subscriber is registered in a collection created with a `DruidDestConn` connection. The connection, and how to create the collection, are described in [Connection](#connection), at the end of this page.

### Prerequisites

-   The Druid Overlord API is reachable from the Tabsdata server.
-   The Overlord credentials can submit and inspect ingestion tasks.
-   Tabsdata can write to the S3 or Azure staging location and Druid can read the staged Parquet files.

### Subscriber

Configure `DruidDest` as the `destination` of a subscriber function to define which datasources Tabsdata writes in Druid.

write\_events.py

```python
from tabsdatak.api import subscriber, TableFrameSpec
from tabsdatak.conn.druid import DruidDest

@subscriber(
    destination=DruidDest(
        tables=[
            "events",
        ],
    ),
    input_tables=["events"],
)
def write_events(events: TableFrameSpec) -> TableFrameSpec:
    return events
```

-   required
    
-   optional
    
-   optional
    
-   optional
    
-   optional
    
-   optional
    
-   optional
    
-   optional
    
-   optional
    

### Function Config Parameters

#### `tables`

Defines the Druid datasources the subscriber writes to. Each name is 1 to 128 characters, does not start with `.` or `_`, and contains no `/`, backslash or NUL.

Each element in `tables` represents one destination slot and maps positionally to a value returned by the subscriber function.

#### `if_table_exists`

`"append"` (the default) adds rows to the datasource. `"replace"` overwrites it.

#### `time_column`

The column Druid uses as its primary `__time` field. Druid requires a time column on every datasource; when the rows have none, leave `time_column` unset and the ingest time is used instead.

#### `segment_granularity`

The time span of each Druid segment: `ALL` (the default), `NONE`, `SECOND`, `MINUTE`, `FIFTEEN_MINUTE`, `THIRTY_MINUTE`, `HOUR`, `SIX_HOUR`, `DAY`, `WEEK`, `MONTH`, `QUARTER` or `YEAR`.

#### `max_concurrent_subtasks`, `max_rows_per_segment`, `max_rows_in_memory` and `http_timeout_sec`

Tuning for the ingestion task: its concurrency (default `1`), the row cap per segment (default `5000000`), the in-memory row cap per task (default `1000000`), and the HTTP request timeout in seconds (default `300`).

#### `dest_cfg`

Sets additional destination configuration. The accepted keys are `druid.logging_level`, `druid.poll_interval_seconds`, `druid.retry_attempts` and `druid.retry_backoff_seconds`.

## Write behavior

Each entry in `tables` is one destination slot and maps by position to a value returned by the subscriber function. Returning `None` for a slot skips that write.

`if_table_exists="append"` adds data to the datasource. `"replace"` overwrites it. `time_column` selects the row timestamp used as Druid `__time`; without it, the connector uses the ingest time.

## Operational notes

-   The connection is to the Overlord API, not a SQL endpoint.
-   A write finishes only after the submitted ingestion task finishes. `http_timeout_sec`, polling, retry, and backoff settings control how Tabsdata waits for it.
-   `segment_granularity` and the row limits change the ingestion task, not the Tabsdata input table.
-   Tabsdata does not contact Druid or the staging service when the collection is created. Those checks happen when the subscriber runs.

## Connection

Druid subscribers use `DruidDestConn` to define the Overlord, the credentials, and the cloud storage the data is staged in.

conn-druid.yaml

```yaml
kind: connectionDef
apiVersion: '1.0'
type: tabsdatak.conn.druid:DruidDestConn
spec:
  overlord_url: 'http://druid-overlord.internal:8081'
  credentials:
    kind: userPasswordCredentials
    apiVersion: '1.0'
    type: tabsdatak.conn.common.types:UserPassword
    spec:
      user: 'secret:tabsdata_writer'
      password: 'secret:example-password'
  staging:
    kind: druidS3Location
    apiVersion: '1.0'
    type: tabsdatak.conn.druid:S3Location
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
      base_path: '/druid'
```

-   required
    
-   required
    
-   required
    
-   optional
    

### Create the collection

A subscriber is registered in a destination collection, and a destination collection is created with its connection. Every function registered in the collection uses that connection.

Generate a connection template, which lists all the connection fields:

```bash
tdk connection template --type druid-bulk-out --file conn-druid.yaml
```

Edit the template file with the Druid connection information, check it, and create the collection with it:

```bash
tdk connection validate --file conn-druid.yaml
```

```bash
tdk collection create --name druid_out --conn-file conn-druid.yaml
```

Then register the subscriber in the collection:

```bash
tdk fn register --coll druid_out --path write_events.py::write_events
```

-   The collection goes in the `destinations` group, because the connection is a destination connection. `--group` can be left out; if it is given, it must be `destinations`.
-   `secret:<value>` gives a secret value in the file itself. `$secret:<ENV_VAR>` reads it from an environment variable when the collection is created, so the value never appears in the file. Either way, Tabsdata stores the secret separately, and the stored connection only shows a placeholder.
-   Functions in the collection must use the connector of its connection: `DruidDest` for a collection created with `DruidDestConn`. Transformers go in a collection of their own.
-   To change the connection later, for example to rotate a password, run `tdk collection update --name druid_out --conn-file conn-druid.yaml`. The connector cannot change; to use another one, create another collection.
-   Creating a source or destination collection requires permission to manage the project.

### Connection Config Parameters

#### `overlord_url`

The `http://` or `https://` URL of the Druid Overlord, for example `http://druid.example:8081`. Accepts `secret:` too.

#### `credentials`

A `UserPassword` used for HTTP basic authentication with the Overlord. Cloud storage credentials are configured separately under `staging`.

#### `staging`

An `S3Location` or an `AzBlobLocation` from `tabsdatak.conn.druid`, where the Parquet files are staged before ingestion. Tabsdata must be able to upload the staged files, and Druid must be able to read them.

#### `conn_cfg`

Optional connector configuration.

# Subscribe data to StarRocks

Source: https://docs.tabsdata.com/developer/tutorials/subscribers/starrocks

Before you begin

[Quickstart a Server](https://docs.tabsdata.com/developer/server-admin/quickstart) or [Start a Server](https://docs.tabsdata.com/developer/server-admin/start)

[Create a Project](https://docs.tabsdata.com/developer/tutorials/managing-projects/create)

The StarRocks connector is destination-only. It stages Parquet files in cloud storage and then loads them through the native `FILES()` path in StarRocks.

Each entry in `tables` takes one input table, in order, and writes it to that destination table.

The connector ships separately from the core package:

```bash
pip install 'tabsdata[starrocks]'
```

What you’ll do

1.  [Configure a connection to StarRocks](#configure-a-connection-to-starrocks)
2.  [Write and Register a Subscriber Function](#write-and-register-a-subscriber-function)
3.  [Trigger the subscriber function](#trigger-the-subscriber-function)

## Configure a connection to StarRocks

The connection holds the server address, the credentials, and a `staging` block naming the cloud storage the load goes through. Rows reach StarRocks as Parquet staged in that location rather than row by row, so the staging credentials have to be writable as well as readable.

Step 1Generate a connection template using the CLI

```bash
tdk connection template --type starrocks-bulk-out --file conn-starrocks.yaml
```

The file lands in your working directory.

Step 2Fill in the server, the credentials, and the staging location

conn-starrocks.yaml

```yaml
kind: connectionDef
apiVersion: '1.0'
type: tabsdatak.conn.starrocks:StarRocksDestConn
spec:
  host: 'starrocks-fe.internal'
  port: '9030'
  database: 'analytics'
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
          access_key_id: 'secret:AKIAIOSFODNN7EXAMPLE'
          secret_access_key: 'secret:wJalrXUtnFEMI0EXAMPLEKEY'
      base_path: '/starrocks'
```

Credentials are written as `secret:<value>`, a literal secret. The CLI strips the value out of the document before it reaches the server and stores it separately, so the file you keep on disk is the only place the plain value ever appears. Reads return the secret's name, never its value.

Step 3Validate the filled-in template (optional)

```bash
tdk connection validate --file conn-starrocks.yaml
```

## Create the collection

A destination collection is created together with its connection, which is why `--conn-file` is required rather than optional, and why the group is `destinations` rather than `sources`.

Step 4Create the collection and bind the connection to it

```bash
tdk collection create --name analytics --group destinations --conn-file conn-starrocks.yaml
```

Every subscriber registered in `analytics` from now on writes through this one connection.

## Write and Register a Subscriber Function

Step 5Build the subscriber file locally

write\_sales.py

```python
from tabsdatak.api import subscriber, TableFrameSpec
from tabsdatak.conn.starrocks import StarRocksDest


@subscriber(
    destination=StarRocksDest(
        tables=["vendors", "items"],
        if_table_exists="append",
        schema_evolution="strict",
    ),
    input_tables=["sales/vendors", "sales/items"],
)
def write_sales(
    vendors: TableFrameSpec,
    items: TableFrameSpec,
) -> tuple[TableFrameSpec, TableFrameSpec]:
    return (vendors, items)
```

Input tables are referenced as `collection/table`, since a subscriber reads from collections other than its own. A subscriber declares no `output_tables`: it returns one frame per destination slot, and returning `None` for a slot writes nothing.

Step 6Register the subscriber into the collection

```bash
tdk fn register --coll analytics --path write_sales.py::write_sales
```

Re-register after every code change. See [Subscribers](https://docs.tabsdata.com/developer/guide/functions/subscribers) for the rest of the registration flags.

## Trigger the subscriber function

Step 7Run the subscriber

```bash
tdk fn trigger --coll analytics --name write_sales
```

Tabsdata stages the frames as Parquet, then loads them into the destination.

Step 8Verify the data arrived

```bash
mysql -h starrocks.internal -P 9030 analytics -e "select * from vendors limit 5;"
```

## StarRocks-Specific Distinctions

-   The target tables must already exist. StarRocks requires physical layout such as key definitions and distribution strategy, so the connector does not create missing tables for you.
-   The connection supports S3, Azure Blob, or GCS staging.
-   GCS staging requires both service-account JSON for uploads and HMAC credentials so StarRocks can read the staged files through the S3-compatible endpoint.
-   `schema_evolution` supports `"strict"` and `"iceberg"`.

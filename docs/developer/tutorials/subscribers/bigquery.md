# Subscribe data to BigQuery

Source: https://docs.tabsdata.com/developer/tutorials/subscribers/bigquery

Before you begin

[Quickstart a Server](https://docs.tabsdata.com/developer/server-admin/quickstart) or [Start a Server](https://docs.tabsdata.com/developer/server-admin/start)

[Create a Project](https://docs.tabsdata.com/developer/tutorials/managing-projects/create)

The BigQuery connector lets a **subscriber** write Tabsdata tables out to BigQuery.

Each entry in `tables` takes one input table, in order, and writes it to that destination table.

Setting one up takes two files and four commands: a connection document, the destination collection that carries it, and the subscriber registered into that collection.

What you’ll do

1.  [Configure a connection to BigQuery](#configure-a-connection-to-bigquery)
2.  [Write and Register a Subscriber Function](#write-and-register-a-subscriber-function)
3.  [Trigger the subscriber function](#trigger-the-subscriber-function)

## Configure a connection to BigQuery

The connection holds the URI and the credentials, so the subscriber names destination tables and nothing about where the database is.

Step 1Generate a connection template using the CLI

```bash
tdk connection template --type bigquery-bulk-out --file conn-bigquery.yaml
```

The file lands in your working directory.

Step 2Fill in the URI and the credentials

tip

Click a field to expand its details and highlight where it sits in the file; type your own values to build a file you can copy straight out. Toggle optional fields to add or remove them. Credential fields show a sample value and cannot be edited here.

conn-bigquery.yaml

```yaml
kind: connectionDef
apiVersion: '1.0'
type: tabsdatak.conn.bigquery:BigQueryDestConn
spec:
  staging:
    kind: bigQueryGcsLocation
    apiVersion: '1.0'
    type: tabsdatak.conn.bigquery:GCSLocation
    spec:
      bucket: 'acme-staging'
      credentials:
        kind: gcpJsonCredentials
        apiVersion: '1.0'
        type: tabsdatak.conn.common.types:GCPJson
        spec:
          json: 'secret:{"type":"service_account",...}'
      base_path: '/bigquery'
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
    

Credentials are written as `secret:<value>`, a literal secret. The CLI strips the value out of the document before it reaches the server and stores it separately, so the file you keep on disk is the only place the plain value ever appears. Reads return the secret's name, never its value. See [Connections](https://docs.tabsdata.com/developer/guide/connections) for the full syntax.

Step 3Validate the filled-in template (optional)

```bash
tdk connection validate --file conn-bigquery.yaml
```

## Create the collection

A destination collection is created together with its connection, which is why `--conn-file` is required rather than optional, and why the group is `destinations` rather than `sources`.

Step 4Create the collection and bind the connection to it

```bash
tdk collection create --name warehouse --group destinations --conn-file conn-bigquery.yaml
```

Every subscriber registered in `warehouse` from now on writes through this one connection. Changing environments means swapping the connection rather than editing the Python file.

## Write and Register a Subscriber Function

Step 5Build the subscriber file locally

write\_sales.py

```python
from tabsdatak.api import subscriber, TableFrameSpec
from tabsdatak.conn.bigquery import BigQueryDest


@subscriber(
    destination=BigQueryDest(
        tables=["vendors", "items"],
        if_table_exists="replace",
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
tdk fn register --coll warehouse --path write_sales.py::write_sales
```

Re-register after every code change. See [Subscribers](https://docs.tabsdata.com/developer/guide/functions/subscribers) for the rest of the registration flags.

## Trigger the subscriber function

Step 7Run the subscriber

```bash
tdk fn trigger --coll warehouse --name write_sales
```

Tabsdata writes one destination table per entry on the server.

Step 8Verify the data arrived

```bash
bq query --use_legacy_sql=false "select * from warehouse.vendors limit 5"
```

## Table Names and Schema Evolution

BigQuery table names can be fully qualified or completed from the connection defaults. `schema_evolution="update"` allows new columns during append-style writes; `"strict"` rejects schema changes.

## Merge changes into the destination

To apply inserts, updates, and deletes by key, see [Merging into SQL destinations](https://docs.tabsdata.com/developer/guide/functions/sql-merge). The guide covers merge configuration, schema evolution, and retry watermarks.

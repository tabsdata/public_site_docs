# Subscribe data to Google Cloud Storage

Source: https://docs.tabsdata.com/developer/tutorials/subscribers/gcp

Before you begin

[Quickstart a Server](https://docs.tabsdata.com/developer/server-admin/quickstart) or [Start a Server](https://docs.tabsdata.com/developer/server-admin/start)

[Create a Project](https://docs.tabsdata.com/developer/tutorials/managing-projects/create)

This tutorial shows how to set up a Google Cloud Storage subscriber that writes one or more Tabsdata Tables into a bucket

What you’ll do

1.  [Configure a connection to GCP](#configure-a-connection-to-gcp)
2.  [Write and Register a Subscriber Function](#write-and-register-a-subscriber-function)
3.  [Trigger the subscriber function](#trigger-the-subscriber-function)

## Configure a connection to GCP

A **Connection** is a resource that stores the configuration and credentials needed to access an external system. Subscribers use the credentials stored in a connection to authenticate with GCP.

Step 1Generate a connection template

```bash
tdk connection template --type gcs-file-out --file conn-gcs.yaml
```

This creates a connection document within your working directory under the file name specified in the `--file` cli command.

Step 2Fill in the bucket, the project, and the credentials within the connection document

tip

Click a field to expand its details and highlight where it sits in the file; type your own values to build a file you can copy straight out. Toggle optional fields to add or remove them. Credential fields show a sample value and cannot be edited here.

conn-gcs.yaml

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
    

Fill in the bucket name, project, credentials, and base path.

Credentials are written as `secret:<value>`, a literal secret. The CLI strips the value out of the document before it reaches the server and stores it separately, so the file you keep on disk is the only place the plain value ever appears. Reads return the secret's name, never its value. See [Connections](https://docs.tabsdata.com/developer/guide/connections) for the full syntax.

Step 3Validate the filled-in connection document (optional)

```bash
tdk connection validate --file conn-gcs.yaml
```

## Bind connection document to a collection

The filled-in connection document must be attached to a collection that contains (or will contain) the function using the connection credentials.

Step 4Bind connection to a new or existing collection

-   Create a New Collection
-   Attach to an Existing Collection

```bash
tdk collection create --name exports --group destinations --conn-file conn-gcs.yaml
```

```bash
tdk collection update --name exports --conn-file conn-gcs.yaml
```

## Write and Register a Subscriber Function

Step 5Build the subscriber file locally

write\_files.py

```
1from tabsdatak.api import subscriber, TableFrameSpec2from tabsdatak.conn.gcs import GCSDest3 4 5@subscriber(6  destination=GCSDest(1      paths=["departments_${EXEC_PLAN_TS}.parquet", "employees_${EXEC_PLAN_TS}.parquet"],8  ),2  input_tables=["hr/departments", "hr/employees"],10)3def write_files(departments, employees):4  return (departments, employees)
```

-   GCS paths to write to. Each element positionally maps to a function argument on line 11.
    
-   Tabsdata tables function input is read from. Each name maps positionally to a function argument on line 11.
    
-   Data read from the input tables, positionally mapped and represented as Python function arguments.
    
-   Data the function writes, mapped positionally to destination paths defined on line 7.
    

Each element in the `input_tables` parameter represents a Tabsdata table to be written to Google Cloud Storage and maps positionally to an argument in the function body.

Each value in the function body's return statement maps positionally to a GCS path in the `paths` parameter, which determines where that table is written in the bucket.

Step 6Register the subscriber into the collection

```bash
tdk fn register --coll exports --path write_files.py::write_files
```

## Trigger the subscriber function

Step 7Trigger the subscriber

```bash
tdk fn trigger --coll exports --name write_files
```

Tabsdata writes one object per path on the server.

## Paths and Run Tokens

Use relative paths in `GCSDest(paths=[...])`. Destination paths can contain `${EXEC_PLAN_ID}`, `${TRX_ID}`, and `${EXEC_PLAN_TS}`, which are resolved when the subscriber writes the files.

# Subscribe data to local files

Source: https://docs.tabsdata.com/developer/tutorials/subscribers/local-file-system

Before you begin

[Quickstart a Server](https://docs.tabsdata.com/developer/server-admin/quickstart) or [Start a Server](https://docs.tabsdata.com/developer/server-admin/start)

[Create a Project](https://docs.tabsdata.com/developer/tutorials/managing-projects/create)

This tutorial shows how to set up a local file subscriber that writes one or more Tabsdata Tables onto the server's filesystem.

What you’ll do

1.  [Configure a connection to your local file system](#configure-a-connection-to-your-local-file-system)
2.  [Write and Register a Subscriber Function](#write-and-register-a-subscriber-function)
3.  [Trigger the subscriber function](#trigger-the-subscriber-function)

## Configure a connection to your local file system

A **Connection** is a resource that stores the configuration and credentials needed to access an external system. Subscribers use the `base_path` stored in a connection to resolve files on the filesystem.

Step 1Generate a connection template

```bash
tdk connection template --type local-file-out --file conn-local.yaml
```

This creates a connection document within your working directory under the file name specified in the `--file` cli command.

Step 2Fill in the base path within the connection document

tip

Click a field to expand its details and highlight where it sits in the file; type your own values to build a file you can copy straight out. Toggle optional fields to add or remove them. Credential fields show a sample value and cannot be edited here.

conn-local.yaml

```yaml
kind: connectionDef
apiVersion: '1.0'
type: tabsdatak.conn.localfile:LocalFileDestConn
spec:
  base_path: '/data/exports'
```

-   required
    

Fill in the base path.

Step 3Validate the filled-in connection document (optional)

```bash
tdk connection validate --file conn-local.yaml
```

## Bind connection document to a collection

The filled-in connection document must be attached to a collection that contains (or will contain) the function using the connection credentials.

Step 4Bind connection to a new or existing collection

-   Create a New Collection
-   Attach to an Existing Collection

```bash
tdk collection create --name exports --group destinations --conn-file conn-local.yaml
```

```bash
tdk collection update --name exports --conn-file conn-local.yaml
```

## Write and Register a Subscriber Function

Step 5Build the subscriber file locally

write\_files.py

```
1from tabsdatak.api import subscriber, TableFrameSpec2from tabsdatak.conn.localfile import LocalFileDest3 4 5@subscriber(6  destination=LocalFileDest(1      paths=["departments_${EXEC_PLAN_TS}.parquet", "employees_${EXEC_PLAN_TS}.parquet"],8  ),2  input_tables=["hr/departments", "hr/employees"],10)3def write_files(departments, employees):4  return (departments, employees)
```

-   Local file paths to write to. Each element positionally maps to a function argument on line 11.
    
-   Tabsdata tables function input is read from. Each name maps positionally to a function argument on line 11.
    
-   Data read from the input tables, positionally mapped and represented as Python function arguments.
    
-   Data the function writes, mapped positionally to destination paths defined on line 7.
    

Each element in the `input_tables` parameter represents a Tabsdata table to be written to the local filesystem and maps positionally to an argument in the function body.

Each value in the function body's return statement maps positionally to a local path in the `paths` parameter, which determines where that table is written on disk.

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

Use relative paths in `LocalFileDest(paths=[...])`. Destination paths can contain `${EXEC_PLAN_ID}`, `${TRX_ID}`, and `${EXEC_PLAN_TS}`, which are resolved when the subscriber writes the files.

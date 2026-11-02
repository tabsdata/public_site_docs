# Publish data from local files

Source: https://docs.tabsdata.com/developer/tutorials/publishers/local-file-system

Before you begin

[Quickstart a Server](https://docs.tabsdata.com/developer/server-admin/quickstart) or [Start a Server](https://docs.tabsdata.com/developer/server-admin/start)

[Create a Project](https://docs.tabsdata.com/developer/tutorials/managing-projects/create)

This tutorial shows how to set up a local file publisher that reads one or more files off the server's filesystem and writes them into one or more Tabsdata Tables.

What you’ll do

1.  [Configure a connection to your local file system](#configure-a-connection-to-your-local-file-system)
2.  [Write and Register a Publisher Function](#write-and-register-a-publisher-function)
3.  [Trigger the publisher function](#trigger-the-publisher-function)

## Configure a connection to your local file system

A **Connection** is a resource that stores the configuration and credentials needed to access an external system. Publishers use the `base_path` stored in a connection to resolve files on the filesystem.

Step 1Generate a connection template

```bash
tdk connection template --type local-file-in --file conn-local.yaml
```

This creates a connection document within your working directory under the file name specified in the `--file` cli command.

Step 2Fill in the base path within the connection document

tip

Click a field to expand its details and highlight where it sits in the file; type your own values to build a file you can copy straight out. Toggle optional fields to add or remove them. Credential fields show a sample value and cannot be edited here.

conn-local.yaml

```yaml
kind: connectionDef
apiVersion: '1.0'
type: tabsdatak.conn.localfile:LocalFileSrcConn
spec:
  base_path: '/data/hr'
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
tdk collection create --name hr_files --group sources --conn-file conn-local.yaml
```

```bash
tdk collection update --name hr_files --conn-file conn-local.yaml
```

## Write and Register a Publisher Function

Step 5Build the publisher file locally

read\_files.py

```
1from tabsdatak.api import publisher, TableFrameSpec, TableFramesSpec2from tabsdatak.conn.localfile import LocalFileSrc3from tabsdatak.tableframe.functions import concat4 5 6@publisher(7  source=LocalFileSrc(1      paths=["departments.csv", "employees_*.csv"],9  ),2  output_tables=["departments", "employees"],11)3def read_files(departments, employees):4  return (departments[0], concat(employees))
```

-   Local file paths to read. Each element positionally maps to a function argument on line 12.
    
-   Tabsdata tables function output is written to. Each name maps positionally to data returned on line 13.
    
-   Data read from the local filesystem, positionally mapped and represented as Python function arguments. A path with no glob arrives as a single-element list; departments.csv matches exactly one file, so departments\[0\] is that file. A glob can match several, so employees is concat()-ed into one table.
    
-   Data the function outputs, mapped positionally to output tables defined on line 10.
    

Each entry in the `paths` parameter represents the data contained in the file or files at that local path. Each `paths` entry maps positionally to an argument in the function body. Because Tabsdata supports wildcard expansion, a path can match either a single file, represented as a single-element list of TableFrames, or multiple files, represented as a list containing one TableFrame for each matched file. Since each output table takes exactly one TableFrame, a publisher combines a multi-file match with `concat()` before returning it; a single-file match just needs `[0]` to unwrap the list.

Variables listed in the function body's return statement represent output data and map positionally to the Tabsdata tables declared in the `output_tables` parameter.

Step 6Register the publisher into the collection

```bash
tdk fn register --coll hr_files --path read_files.py::read_files
```

## Trigger the publisher function

Step 7Trigger the publisher

```bash
tdk fn trigger --coll hr_files --name read_files
```

Step 8Inspect the resulting tables

```bash
tdk table list --coll hr_files
tdk table data --coll hr_files --name departments
```

departments

Tabsdata›Collections›hr\_files›departments

### Schema

Table schema defines the structure of a table by listing its columns and their data types.

| Object | Type |
| --- | --- |
| department\_id | i64 |
| department\_name | str |
| manager\_id | i64 |

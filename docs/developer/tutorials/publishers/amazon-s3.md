# Publish data from Amazon S3

Source: https://docs.tabsdata.com/developer/tutorials/publishers/amazon-s3

Before you begin

[Quickstart a Server](https://docs.tabsdata.com/developer/server-admin/quickstart) or [Start a Server](https://docs.tabsdata.com/developer/server-admin/start)

[Create a Project](https://docs.tabsdata.com/developer/tutorials/managing-projects/create)

This tutorial shows how to set up an Amazon S3 publisher that reads one or more files out of an S3 bucket and writes them into one or more Tabsdata Tables

What you’ll do

1.  [Configure a connection to S3](#configure-a-connection-to-s3)
2.  [Write and Register a Publisher Function](#write-and-register-a-publisher-function)
3.  [Trigger the publisher function](#trigger-the-publisher-function)

## Configure a connection to S3

A **Connection** is a resource that stores the configuration and credentials needed to access an external system. Publishers use the credentials stored in a connection to authenticate with AWS.

Step 1Generate a connection template

```bash
tdk connection template --type s3-file-in --file conn-s3.yaml
```

This creates a connection document within your working directory under the file name specified in the `--file` cli command.

Step 2Fill in the bucket, the region, and the credentials within the connection document

tip

Click a field to expand its details and highlight where it sits in the file; type your own values to build a file you can copy straight out. Toggle optional fields to add or remove them. Credential fields show a sample value and cannot be edited here.

conn-s3.yaml

```yaml
kind: connectionDef
apiVersion: '1.0'
type: tabsdatak.conn.s3:S3SrcConn
spec:
  bucket: 'acme-ingest'
  region: 'us-east-1'
  credentials:
    kind: awsAccessSecretKeyCredentials
    apiVersion: '1.0'
    type: tabsdatak.conn.common.types:AwsAccessSecretKey
    spec:
      access_key_id: 'secret:AKIAIOSFODNN7EXAMPLE'
      secret_access_key: 'secret:wJalrXUtnFEMI0EXAMPLEKEY'
```

-   required
    
-   required
    
-   required
    
-   optional
    

Fill in the bucket name, region, access\_key\_id, secret\_access\_key, and base path.

Credentials are written as `secret:<value>`, a literal secret. The CLI strips the value out of the document before it reaches the server and stores it separately, so the file you keep on disk is the only place the plain value ever appears. Reads return the secret's name, never its value. See [Connections](https://docs.tabsdata.com/developer/guide/connections) for the full syntax.

Step 3Validate the filled-in connection document (optional)

```bash
tdk connection validate --file conn-s3.yaml
```

## Bind connection document to a collection

the filled-in connection document must be attached to a collection that contains (or will contain) the function using the connection credentials.

Step 4Bind connection to a new or existing collection

-   Create a New Collection
-   Attach to an Existing Collection

```bash
tdk collection create --name hr_files --group sources --conn-file conn-s3.yaml
```

```bash
tdk collection update --name hr_files --conn-file conn-s3.yaml
```

## Write and Register a Publisher Function

Step 5Build the publisher file locally

read\_files.py

```
1from tabsdatak.api import publisher, TableFrameSpec, TableFramesSpec2from tabsdatak.conn.s3 import S3Src3 4 5@publisher(6  source=S3Src(1      paths=["departments.csv", "employees.csv"],8  ),2  output_tables=["departments", "employees"],10)3def read_files(departments, employees):4  return (departments[0], employees[0])
```

-   S3 paths to read. Each element positionally maps to a function argument on line 11.
    
-   Tabsdata tables function output is written to. Each name maps positionally to data returned on line 12.
    
-   Data ingested from S3, positionally mapped and represented as Python function arguments.
    
-   Data the function outputs, mapped positionally to output tables defined on line 9.
    

Each entry in the `paths` parameter represents the data contained in the file or files at that S3 path. Each `paths` entry maps positionally to an argument in the function body. Because Tabsdata supports wildcard expansion, a path can match either a single file, represented as a single-element list of TableFrames, or multiple files, represented as a list containing one TableFrame for each matched file.

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

Tabsdata imports the matching files on the server and writes one versioned table per path.

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

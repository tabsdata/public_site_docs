# Publish data from Db2

Source: https://docs.tabsdata.com/developer/tutorials/publishers/db2

Before you begin

[Quickstart a Server](https://docs.tabsdata.com/developer/server-admin/quickstart) or [Start a Server](https://docs.tabsdata.com/developer/server-admin/start)

[Create a Project](https://docs.tabsdata.com/developer/tutorials/managing-projects/create)

This tutorial shows how to set up a Db2 publisher that runs one or more `SELECT` queries against a Db2 database and writes the results into Tabsdata Tables.

What you’ll do

1.  [Configure a connection to Db2](#configure-a-connection-to-db2)
2.  [Write and Register a Publisher Function](#write-and-register-a-publisher-function)
3.  [Trigger the publisher function](#trigger-the-publisher-function)

## Configure a connection to Db2

A **Connection** is a resource that stores the configuration and credentials needed to access an external system. Publishers use the credentials stored in a connection to authenticate with Db2.

Step 1Generate a connection template

```bash
tdk connection template --type db2-sql-in --file conn-db2.yaml
```

This creates a connection document within your working directory under the file name specified in the `--file` cli command.

Step 2Fill in the URI and the credentials within the connection document

tip

Click a field to expand its details and highlight where it sits in the file; type your own values to build a file you can copy straight out. Toggle optional fields to add or remove them. Credential fields show a sample value and cannot be edited here.

conn-db2.yaml

```yaml
kind: connectionDef
apiVersion: '1.0'
type: tabsdatak.conn.db2:Db2SrcConn
spec:
  uri: 'db2+ibm_db://db.internal:50000/world'
  credentials:
    kind: userPasswordCredentials
    apiVersion: '1.0'
    type: tabsdatak.conn.common.types:UserPassword
    spec:
      user: 'secret:tabsdata_reader'
      password: 'secret:example-password'
```

-   required
    
-   required
    

Fill in the URI and the credentials.

Credentials are written as `secret:<value>`, a literal secret. The CLI strips the value out of the document before it reaches the server and stores it separately, so the file you keep on disk is the only place the plain value ever appears. Reads return the secret's name, never its value. See [Connections](https://docs.tabsdata.com/developer/guide/connections) for the full syntax.

Step 3Validate the filled-in connection document (optional)

```bash
tdk connection validate --file conn-db2.yaml
```

## Bind connection document to a collection

The filled-in connection document must be attached to a collection that contains (or will contain) the function using the connection credentials.

Step 4Bind connection to a new or existing collection

-   Create a New Collection
-   Attach to an Existing Collection

```bash
tdk collection create --name world --group sources --conn-file conn-db2.yaml
```

```bash
tdk collection update --name world --conn-file conn-db2.yaml
```

## Write and Register a Publisher Function

Step 5Build the publisher file locally

read\_world.py

```
1from tabsdatak.api import publisher, TableFrameSpec2from tabsdatak.conn.db2 import Db2Src3 4 5@publisher(6  source=Db2Src(1      queries=[8          "SELECT * FROM COUNTRY",9          "SELECT * FROM CITY",10      ],11  ),2  output_tables=["country", "city"],13)3def read_world(country, city):4  return (country, city)
```

-   SQL queries to run against Db2. Each query positionally maps to a function argument on line 14.
    
-   Tabsdata tables function output is written to. Each name maps positionally to data returned on line 15.
    
-   Data queried from Db2, positionally mapped and represented as Python function arguments.
    
-   Data the function outputs, mapped positionally to output tables defined on line 12.
    

Each entry in the `queries` parameter represents the data returned by running that query against Db2. Each `queries` entry maps positionally to an argument in the function body.

Variables listed in the function body's return statement represent output data and map positionally to the Tabsdata tables declared in the `output_tables` parameter.

Step 6Register the publisher into the collection

```bash
tdk fn register --coll world --path read_world.py::read_world
```

## Trigger the publisher function

Step 7Trigger the publisher

```bash
tdk fn trigger --coll world --name read_world
```

Tabsdata runs the queries on the server and writes one versioned table per query.

Step 8Inspect the resulting tables

```bash
tdk table list --coll world
tdk table data --coll world --name city
```

city

Tabsdata›Collections›world›city

### Schema

Table schema defines the structure of a table by listing its columns and their data types.

| Object | Type |
| --- | --- |
| city\_id | i64 |
| city\_name | str |
| country\_id | i64 |
| population | i64 |

# Subscribe data to Postgres

Source: https://docs.tabsdata.com/developer/tutorials/subscribers/postgres

Before you begin

[Quickstart a Server](https://docs.tabsdata.com/developer/server-admin/quickstart) or [Start a Server](https://docs.tabsdata.com/developer/server-admin/start)

[Create a Project](https://docs.tabsdata.com/developer/tutorials/managing-projects/create)

This tutorial shows how to set up a Postgres subscriber that writes one or more Tabsdata Tables into a PostgreSQL database.

warning

The PostgreSQL connector needs the `psycopg2-binary` driver, which Tabsdata does not redistribute. See [Installing Third-Party Database Drivers](https://docs.tabsdata.com/developer/server-admin/third-party-database-drivers) to add it to your Tabsdata server.

What you’ll do

1.  [Configure a connection to Postgres](#configure-a-connection-to-postgres)
2.  [Write and Register a Subscriber Function](#write-and-register-a-subscriber-function)
3.  [Trigger the subscriber function](#trigger-the-subscriber-function)

## Configure a connection to Postgres

A **Connection** is a resource that stores the configuration and credentials needed to access an external system. Subscribers use the credentials stored in a connection to authenticate with Postgres.

Step 1Generate a connection template

```bash
tdk connection template --type postgres-sql-out --file conn-postgres.yaml
```

This creates a connection document within your working directory under the file name specified in the `--file` cli command.

Step 2Fill in the URI and the credentials within the connection document

tip

Click a field to expand its details and highlight where it sits in the file; type your own values to build a file you can copy straight out. Toggle optional fields to add or remove them. Credential fields show a sample value and cannot be edited here.

conn-postgres.yaml

```yaml
kind: connectionDef
apiVersion: '1.0'
type: tabsdatak.conn.postgres:PostgresDestConn
spec:
  uri: 'postgres://db.internal:5432/warehouse'
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
    
-   optional
    
-   optional
    

Fill in the URI and the credentials.

Credentials are written as `secret:<value>`, a literal secret. The CLI strips the value out of the document before it reaches the server and stores it separately, so the file you keep on disk is the only place the plain value ever appears. Reads return the secret's name, never its value. See [Connections](https://docs.tabsdata.com/developer/guide/connections) for the full syntax.

Step 3Validate the filled-in connection document (optional)

```bash
tdk connection validate --file conn-postgres.yaml
```

## Bind connection document to a collection

The filled-in connection document must be attached to a collection that contains (or will contain) the function using the connection credentials.

Step 4Bind connection to a new or existing collection

-   Create a New Collection
-   Attach to an Existing Collection

```bash
tdk collection create --name warehouse --group destinations --conn-file conn-postgres.yaml
```

```bash
tdk collection update --name warehouse --conn-file conn-postgres.yaml
```

## Write and Register a Subscriber Function

Step 5Build the subscriber file locally

write\_sales.py

```
1from tabsdatak.api import subscriber, TableFrameSpec2from tabsdatak.conn.postgres import PostgresDest3 4 5@subscriber(6  destination=PostgresDest(1      tables=["vendors", "items"],8      if_table_exists="replace",9  ),2  input_tables=["sales/vendors", "sales/items"],11)3def write_sales(vendors, items):4  return (vendors, items)
```

-   Destination tables to write to. Each element positionally maps to a function argument on line 12.
    
-   Tabsdata tables function input is read from. Each name maps positionally to a function argument on line 12.
    
-   Data read from the input tables, positionally mapped and represented as Python function arguments.
    
-   Data the function writes, mapped positionally to destination tables defined on line 7.
    

Each entry in the `tables` parameter represents a destination table in your Postgres database. Each `tables` entry maps positionally to an argument in the function body.

`if_table_exists="append"` (the default) keeps inserting into the existing rows, and `"replace"` truncates the table before inserting.

Variables listed in the function body's return statement represent input data and map positionally to the destination tables declared in the `tables` parameter.

Step 6Register the subscriber into the collection

```bash
tdk fn register --coll warehouse --path write_sales.py::write_sales
```

## Trigger the subscriber function

Step 7Trigger the subscriber

```bash
tdk fn trigger --coll warehouse --name write_sales
```

Tabsdata writes one destination table per entry on the server.

## Triggering the Subscriber

Without an explicit `trigger_by`, a subscriber runs only on a manual trigger. Add `trigger_by=[...]` when you need it to run automatically as its input tables get new commits.

## None and Schema Changes

If an input table dependency does not exist for a run, the subscriber can receive `None` instead of a frame. Returning `None` means there is nothing to write for that output slot, which avoids unnecessary duplicate writes.

Neither mode changes the destination table's schema: `"replace"` truncates the existing rows before inserting, and `"append"` adds to them without touching what's already there. Either way, the returned frame's columns need to match the table PostgreSQL already has, so column additions, removals, or type changes need a manual migration first.

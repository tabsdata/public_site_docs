# Publish data from a Salesforce SOQL query

Source: https://docs.tabsdata.com/developer/tutorials/publishers/salesforce

Before you begin

[Quickstart a Server](https://docs.tabsdata.com/developer/server-admin/quickstart) or [Start a Server](https://docs.tabsdata.com/developer/server-admin/start)

[Create a Project](https://docs.tabsdata.com/developer/tutorials/managing-projects/create)

This tutorial shows how to set up a Salesforce publisher that runs one or more SOQL queries against a Salesforce org and writes the results into Tabsdata Tables.

What you’ll do

1.  [Configure a connection to Salesforce](#configure-a-connection-to-salesforce)
2.  [Write and Register a Publisher Function](#write-and-register-a-publisher-function)
3.  [Trigger the publisher function](#trigger-the-publisher-function)

## Configure a connection to Salesforce

A **Connection** is a resource that stores the configuration and credentials needed to access an external system. Publishers use the credentials stored in a connection to authenticate with Salesforce.

Step 1Generate a connection template

```bash
tdk connection template --type salesforce-sosql-in --file conn-salesforce.yaml
```

Step 2Fill in the username, password, and security token within the connection document

conn-salesforce.yaml

```yaml
kind: connectionDef
apiVersion: '1.0'
type: tabsdatak.conn.salesforce:SalesforceSrcConn
spec:
  credentials:
    kind: salesforceTokenCredentials
    apiVersion: '1.0'
    type: tabsdatak.conn.common.types:SalesforceToken
    spec:
      username: 'secret:integration@acme.com'
      password: 'secret:example-password'
      security_token: 'secret:exampleSecurityToken00'
```

To find your security token, open **View Profile** in Salesforce, go to **Settings**, and choose **Reset My Security Token**.

Step 3Validate the filled-in connection document (optional)

```bash
tdk connection validate --file conn-salesforce.yaml
```

## Bind connection document to a collection

The filled-in connection document must be attached to a collection that contains (or will contain) the function using the connection credentials.

Step 4Bind connection to a new or existing collection

-   Create a New Collection
-   Attach to an Existing Collection

```bash
tdk collection create --name sf_src --group sources --conn-file conn-salesforce.yaml
```

```bash
tdk collection update --name sf_src --conn-file conn-salesforce.yaml
```

## Write and Register a Publisher Function

Step 5Build the publisher file locally

read\_sales.py

```
1from tabsdatak.api import publisher, TableFrameSpec, TableFramesSpec2from tabsdatak.conn.salesforce import SalesforceSrc3 4 5@publisher(6  source=SalesforceSrc(1      queries=[8          "SELECT Id, AccountId, FirstName, LastName, Email, SystemModStamp "9          "FROM Contact WHERE SystemModStamp > $lastModified",10          "SELECT Name, Type, SystemModStamp "11          "FROM Account WHERE SystemModStamp > $lastModified",12      ],13      initial_last_modified="2026-01-01T00:00:00.000+0000",14  ),2  output_tables=["contacts", "accounts"],16)3def read_sales(contacts, accounts):4  return (contacts[0], accounts[0])
```

-   SOQL queries to run against Salesforce. Each query positionally maps to a function argument on line 17.
    
-   Tabsdata tables function output is written to. Each name maps positionally to data returned on line 18.
    
-   Data queried from Salesforce, positionally mapped and represented as Python function arguments.
    
-   Data the function outputs, mapped positionally to output tables defined on line 15.
    

Each entry in the `queries` list parameter represents the data returned by executing that query within Salesforce. Each `queries` entry maps positionally to an argument in the function body.

Variables listed in the function body's return statement represent output data and map positionally to the Tabsdata tables declared in the `output_tables` parameter.

Step 6Register the publisher into the collection

```bash
tdk fn register --coll sf_src --path read_sales.py::read_sales
```

## Trigger the publisher function

Step 7Trigger the publisher

```bash
tdk fn trigger --coll sf_src --name read_sales
```

Step 8Inspect the resulting tables

```bash
tdk table list --coll sf_src
tdk table data --coll sf_src --name contacts
```

contacts

Tabsdata›Collections›sf\_src›contacts

### Schema

Table schema defines the structure of a table by listing its columns and their data types.

| Object | Type |
| --- | --- |
| Id | str |
| AccountId | str |
| FirstName | str |
| LastName | str |
| Email | str |

## Incremental reads with `$lastModified`

Every Salesforce object carries a `SystemModStamp` column, and Tabsdata reads it to publish only the rows that changed since the previous run. Two things have to be true for that to work: `SystemModStamp` appears in the `SELECT` list, and the `WHERE` clause compares it against the `$lastModified` placeholder.

On the first run `$lastModified` takes the value of `initial_last_modified`. On every later run it takes the highest `SystemModStamp` seen so far, so each trigger reads forward from where the last one stopped.

Deletions are invisible to that comparison, because a deleted row stops appearing rather than getting a newer timestamp. Set `include_deleted` to `True` to read deleted records too, which is what makes an incremental load able to tell that a row went away.

## Publisher parameters

| Parameter | Required | What it does |
| --- | --- | --- |
| `queries` | yes | SOQL queries, one per output table, in order |
| `initial_last_modified` | no | Starting timestamp for the first incremental run |
| `include_deleted` | no | Reads deleted records as well. Defaults to `False` |
| `instance_url` | no | Disambiguates the org when the credentials map to several |
| `version` | no | Salesforce API version. Defaults to the latest |

## None, and keeping the previous data

A query that returns no rows fills its slot with `None` rather than an empty frame. Returning `None` for a table commits a new version that keeps the previous data, which is the usual outcome of an incremental run with nothing new to read:

read\_when\_available.py

```python
@publisher(
    source=SalesforceSrc(
        queries=["SELECT Id, Email, SystemModStamp FROM Contact "
                 "WHERE SystemModStamp > $lastModified"],
        initial_last_modified="2026-01-01T00:00:00.000+0000",
    ),
    output_tables=["contacts"],
)
def read_when_available(contacts):
    if contacts is None:
        return (None,)
    return (contacts[0],)
```

## Troubleshooting

**Authentication fails.** Check that the username is the Salesforce username and not the email address, and that the security token matches the current password. Resetting either one invalidates the token.

**Every run re-reads everything.** The query is missing `$lastModified` in its `WHERE` clause, or `SystemModStamp` is missing from the `SELECT` list. Both are required for the incremental read.

**Rows disappear from the source but stay in the table.** `include_deleted` defaults to `False`, so deletions are not read at all.

**Wrong org.** One set of credentials that maps to several orgs needs `instance_url` on the connection to pick between them.

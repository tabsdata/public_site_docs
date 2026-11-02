# Publish data from Salesforce Reports

Source: https://docs.tabsdata.com/developer/tutorials/publishers/salesforce-reports

Before you begin

[Quickstart a Server](https://docs.tabsdata.com/developer/server-admin/quickstart) or [Start a Server](https://docs.tabsdata.com/developer/server-admin/start)

[Create a Project](https://docs.tabsdata.com/developer/tutorials/managing-projects/create)

This tutorial shows how to set up a Salesforce Reports publisher that reads a report that already exists in Salesforce and writes its rows into a Tabsdata Table.

What you’ll do

1.  [Configure a connection to Salesforce](#configure-a-connection-to-salesforce)
2.  [Write and Register a Publisher Function](#write-and-register-a-publisher-function)
3.  [Trigger the publisher function](#trigger-the-publisher-function)

## Configure a connection to Salesforce

A **Connection** is a resource that stores the configuration and credentials needed to access an external system. Publishers use the credentials stored in a connection to authenticate with Salesforce.

Step 1Generate a connection template

```bash
tdk connection template --type salesforce-report-in --file conn-sf-report.yaml
```

Step 2Fill in the username, password, and security token within the connection document

conn-sf-report.yaml

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
tdk connection validate --file conn-sf-report.yaml
```

## Bind connection document to a collection

The filled-in connection document must be attached to a collection that contains (or will contain) the function using the connection credentials.

Step 4Bind connection to a new or existing collection

-   Create a New Collection
-   Attach to an Existing Collection

```bash
tdk collection create --name sf_reports --group sources --conn-file conn-sf-report.yaml
```

```bash
tdk collection update --name sf_reports --conn-file conn-sf-report.yaml
```

## Write and Register a Publisher Function

Step 5Build the publisher file locally

read\_contacts.py

```
1from tabsdatak.api import publisher, TableFrameSpec, TableFramesSpec2from tabsdatak.conn.salesforce import SalesforceReportSrc3 4 5@publisher(6  source=SalesforceReportSrc(1      reports=["contacts"],8      column_name_strategy="columnName",9      filter=[10          ("COUNTRY", "equals", "USA"),11          ("COUNTRY", "equals", "France"),12      ],13      filter_logic="1 or 2",14      last_modified_column="LAST_MODIFIED_DATE",15      initial_last_modified="2026-01-01T00:00:00.000+0000",16  ),2  output_tables=["contacts"],18)3def read_contacts(contacts):4  return (contacts[0],)
```

-   Salesforce report to read. Its single element maps to the function argument on line 19.
    
-   Tabsdata table the report rows are written to, matching the value returned on line 20.
    
-   Report rows read from Salesforce, represented as a Python function argument.
    
-   Data the function outputs, mapped to the output table defined on line 17.
    

Each entry in the `reports` list parameter represents the data within that report. Each `reports` entry maps positionally to an argument in the function body.

Variables listed in the function body's return statement represent output data and map positionally to the Tabsdata tables declared in the `output_tables` parameter.

Step 6Register the publisher into the collection

```bash
tdk fn register --coll sf_reports --path read_contacts.py::read_contacts
```

## Trigger the publisher function

Step 7Trigger the publisher

```bash
tdk fn trigger --coll sf_reports --name read_contacts
```

Step 8Inspect the resulting table

```bash
tdk table list --coll sf_reports
tdk table data --coll sf_reports --name contacts
```

contacts

Tabsdata›Collections›sf\_reports›contacts

### Schema

Table schema defines the structure of a table by listing its columns and their data types.

| Object | Type |
| --- | --- |
| FIRST\_NAME | str |
| LAST\_NAME | str |
| EMAIL | str |
| COUNTRY | str |

## Naming a report, and naming its columns

`reports` takes one report or a list of them, referenced by id or by name. Which of the two is meant is inferred from the value, and `find_report_by` states it outright when the inference would guess wrong. A report referenced by name uses what Salesforce calls the report unique name, also shown as the developer name, rather than the label displayed in the UI.

`column_name_strategy` decides where the output column names come from. A Salesforce report carries both a `columnName` and a `label` for every column: `CREATED_ALIAS` against `alias`, for instance. The choice sets the column names in the resulting Tabsdata table, and it also sets the names the filters have to use, so a filter written against labels breaks when the strategy is `columnName`.

## Filters

Each filter is a tuple of a column, an operator, and a value, in the form Salesforce report queries already use. More than one filter goes in a list.

`filter_logic` states how those filters combine, referring to them by position: the first filter in the list is `1`, the second is `2`, and so on. `"1 or 2"` accepts a row matching either, and `"1 or (2 and 3)"` groups them. Without `filter_logic`, the filters carry no stated relationship between them.

## Incremental reads

`initial_last_modified` sets where the first run starts, as a string in Salesforce datetime format with the timezone included. `last_modified_column` names the column the comparison runs against, and that column has to be in the report for the read to work. It defaults to `None`, which reads the whole report on every run.

## Publisher parameters

| Parameter | Required | What it does |
| --- | --- | --- |
| `reports` | yes | One report or a list, by id or by name |
| `column_name_strategy` | no | `columnName` (default) or `label`, setting output column names |
| `find_report_by` | no | `id` or `name`, when the reference is ambiguous |
| `filter` | no | Tuples of column, operator, value |
| `filter_logic` | no | How the filters combine, by position |
| `initial_last_modified` | no | Starting timestamp for the first incremental run |
| `last_modified_column` | no | Report column driving the incremental read |

## Troubleshooting

**A filter matches nothing.** Filters use whichever names `column_name_strategy` selected, so a filter written against `alias` fails under `columnName` and needs `CREATED_ALIAS` instead.

**The report is not found by name.** Salesforce matches the report unique name, not the label in the UI. Set `find_report_by` to `name` and pass the unique name, or reference the report by id.

**Every run re-reads the whole report.** `last_modified_column` is unset, or the column it names is missing from the report definition.

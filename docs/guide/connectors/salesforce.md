# Salesforce

> Reference for the Tabsdata Salesforce connectors: SOQL queries, reports, and the shared connection.

Source: https://docs.tabsdata.com/guide/connectors/salesforce

The Salesforce connectors let Tabsdata read data from Salesforce into Tabsdata tables.

The `SalesforceSrc` connector can be used by a publisher function to run a SOQL query against Salesforce and write the result into a Tabsdata table.

The `SalesforceReportSrc` connector can be used by a publisher function to read Salesforce reports into Tabsdata tables.

Both connectors use the same connection class, `SalesforceSrcConn`, so one collection can hold both kinds of publisher.

## Publisher

The `SalesforceSrc` connector can be used by a publisher function to read the result of a SOQL query into a Tabsdata table. [See the full publisher walkthrough](https://docs.tabsdata.com/tutorials/publishers/salesforce)

The publisher is registered in a collection created with a `SalesforceSrcConn` connection. The connection, and how to create the collection, are described in [Connection](#connection), at the end of this page.

### Prerequisites

-   API access is enabled for the Salesforce user.
-   The username, password, and security token are valid for the instance.
-   The user can read every object and field referenced by the SOQL query.

### Publisher

Configure `SalesforceSrc` as the `source` of a publisher function to select the SOQL query that Tabsdata runs against Salesforce.

publish\_accounts.py

```python
from tabsdatak.api import publisher, TableFrameSpec
from tabsdatak.conn.salesforce import SalesforceSrc

@publisher(
    source=SalesforceSrc(
        queries=["SELECT Id, Name FROM Account"],
    ),
    output_tables=["accounts"],
)
def publish_accounts(accounts: TableFrameSpec) -> TableFrameSpec:
    return accounts
```

-   required
    
-   optional
    
-   optional
    
-   optional
    
-   optional
    

### Function Config Parameters

#### `queries`

A list holding one SOQL query. The list currently takes exactly one entry, and its result maps to the one argument of the publisher function and the one entry in `output_tables`.

#### `include_deleted`

When `True`, the query also reads deleted rows, through the `queryAll` endpoint. Defaults to `False`.

#### `initial_last_modified`

A cutoff substituted for any `$lastModified` token in the query, for example `WHERE SystemModStamp > $lastModified`, so a run reads only the records changed after it. The cutoff stays the same on every run; the connector does not move it forward. A query that uses `$lastModified` without `initial_last_modified` fails with `SALESFORCE_11`.

#### `api_version`

Overrides the Salesforce API version, written `<major>.<minor>`, for example `"60.0"`.

#### `src_cfg`

Sets additional source configuration. The accepted keys are `salesforce.logging_level` and `tabsdata.src_metadata.drop`.

## Report publisher

The `SalesforceReportSrc` connector can be used by a publisher function to read Salesforce reports into Tabsdata tables. [See the full report walkthrough](https://docs.tabsdata.com/tutorials/publishers/salesforce-reports)

The publisher is registered in a collection created with a `SalesforceSrcConn` connection. The connection, and how to create the collection, are described in [Connection](#connection), at the end of this page.

### Prerequisites

-   API access is enabled for the Salesforce user.
-   The user can open every report in `reports` and read the fields used by its filters.
-   Incremental reads need the last-modified column to be present in the report.

### Report publisher

Configure `SalesforceReportSrc` as the `source` of a publisher function to select the reports that Tabsdata reads.

publish\_customers.py

```python
from tabsdatak.api import publisher, TableFrameSpec
from tabsdatak.conn.salesforce import SalesforceReportSrc

@publisher(
    source=SalesforceReportSrc(
        reports=[
            "00O000000000001",
        ],
    ),
    output_tables=["customers"],
)
def publish_customers(customers: TableFrameSpec) -> TableFrameSpec:
    return customers
```

-   required
    
-   optional
    
-   optional
    
-   optional
    
-   optional
    
-   optional
    
-   optional
    
-   optional
    

### Function Config Parameters

#### `reports`

The reports to read, as report ids (15 or 18 alphanumeric characters) or report names, as a non-empty list.

Each element in `reports` represents one source slot and maps positionally to an argument in the publisher function and to an entry in `output_tables`.

#### `column_name_strategy`

`"columnName"` (the default) names the columns after the report's API column names. `"label"` uses the display labels.

#### `find_report_by`

How an entry of `reports` is looked up. Unset, an entry that looks like an id is looked up as an id and anything else as a name. `"id"` or `"name"` forces one lookup, for an entry that could be either.

#### `filter`

A list of `(column, operator, value)` triples applied on the Salesforce server before the report is downloaded. `operator` is one of `equals`, `notEqual`, `lessThan`, `greaterThan`, `lessOrEqual`, `greaterOrEqual`, `contains`, `notContain`, `startsWith`, `includes` or `excludes`.

#### `filter_logic`

A boolean expression over the `filter` entries, numbered from 1, for example `"(1 AND 2) OR 3"`.

#### `last_modified_column` and `initial_last_modified`

An incremental read: only the rows whose `last_modified_column` is after `initial_last_modified` are read. Each of the two requires the other. The cutoff is fixed, so every run filters on the same `initial_last_modified` value. The condition is added as one more filter, combined with AND onto `filter_logic`. A naive datetime is read as UTC. If the column is not in the report, the run fails with `SALESFORCE_19`.

#### `src_cfg`

Sets additional source configuration. The accepted keys are `salesforce.logging_level` and `tabsdata.src_metadata.drop`.

## Result rows

`SalesforceSrc.queries` currently takes one SOQL query, which produces the publisher's one source slot. The selected Salesforce fields become columns in that slot.

For incremental SOQL reads, include `SystemModStamp` in the selected fields and compare it with `$lastModified`. The first run uses `initial_last_modified`; every run uses `initial_last_modified` as the cutoff, so the read does not move forward on its own. To read from a later point, change `initial_last_modified` in the function. Set `include_deleted=True` when deleted records also need to be returned.

Each entry in `SalesforceReportSrc.reports` produces one source slot. Report ids or names, publisher arguments, and `output_tables` map by position. Report filters are applied by Salesforce before the rows are downloaded.

## Operational notes

-   SOQL and report publishers use the same `SalesforceSrcConn`, so both can be registered in one source collection.
-   A report incremental read needs both `last_modified_column` and `initial_last_modified`. Without them, the full report is read on each run.
-   A report with more than 2,000 detail rows fails with `SALESFORCE_21`; it is not truncated. Narrow the report with `filter` or `last_modified_column`, or read the data with a SOQL query through `SalesforceSrc`.
-   Report generation is polled every 5 seconds and fails with `SALESFORCE_20` after 600 seconds. HTTP requests time out after 30 seconds to connect and 300 seconds to read.
-   Returning `None` from the publisher commits a new table version that keeps the previous data.
-   Tabsdata does not contact Salesforce when the collection is created. Login, object, report, field, and API-version errors appear when the function runs.

## Connection

Salesforce publishers use `SalesforceSrcConn` to define the Salesforce login used by both connectors.

conn-salesforce.yaml

```yaml
kind: connectionDef
apiVersion: '1.0'
type: tabsdatak.conn.salesforce:SalesforceSrcConn
spec:
  credentials:
    kind: salesforceTokenCredentials
    apiVersion: '1.0'
    type: tabsdatak.conn.salesforce:SalesforceTokenCredentials
    spec:
      username: 'secret:integration@acme.com'
      password: 'secret:example-password'
      security_token: 'secret:exampleSecurityToken00'
```

-   required
    
-   optional
    
-   optional
    
-   optional
    
-   optional
    
-   optional
    

### Create the collection

A publisher is registered in a source collection, and a source collection is created with its connection. Every function registered in the collection uses that connection.

Generate a connection template, which lists all the connection fields:

```bash
tdk connection template --type salesforce-sosql-in --file conn-salesforce.yaml
```

Edit the template file with the Salesforce connection information, check it, and create the collection with it:

```bash
tdk connection validate --file conn-salesforce.yaml
```

```bash
tdk collection create --name salesforce_in --conn-file conn-salesforce.yaml
```

Then register the publisher in the collection:

```bash
tdk fn register --coll salesforce_in --path publish_accounts.py::publish_accounts
```

-   The collection goes in the `sources` group, because the connection is a source connection. `--group` can be left out; if it is given, it must be `sources`.
-   `secret:<value>` gives a secret value in the file itself. `$secret:<ENV_VAR>` reads it from an environment variable when the collection is created, so the value never appears in the file. Either way, Tabsdata stores the secret separately, and the stored connection only shows a placeholder.
-   Functions in the collection must use the connector of its connection: `SalesforceSrc` or `SalesforceReportSrc` for a collection created with `SalesforceSrcConn`. Transformers go in a collection of their own.
-   To change the connection later, for example to rotate a password, run `tdk collection update --name salesforce_in --conn-file conn-salesforce.yaml`. The connector cannot change; to use another one, create another collection.
-   Creating a source or destination collection requires permission to manage the project.
-   The template type can be `salesforce-sosql-in` or `salesforce-report-in`. Both write the same `SalesforceSrcConn`, so a collection created from either holds both kinds of publisher.

### Connection Config Parameters

#### `credentials`

A `SalesforceTokenCredentials` with the `username`, `password` and `security_token` of the Salesforce user.

#### `instance_url`

An explicit instance URL. It must be an `https://` URL on a Salesforce domain (`salesforce.com`, `force.com`, `cloudforce.com` or `salesforce-setup.com`). Accepts `secret:` too.

#### `category` and `objects`

Hints for entity discovery, used only by the explorer. `category` has no effect yet. `objects` is a non-empty list of Salesforce object API names, each 1 to 80 characters, starting with a letter, optionally ending in `__c` or `__r`.

#### `entity_whitelist`

A YAML list of regular expressions, not a comma-separated string. It is checked to be a list of valid regular expressions, but it has no effect yet. Leave it out.

#### `conn_cfg`

Optional connector configuration.

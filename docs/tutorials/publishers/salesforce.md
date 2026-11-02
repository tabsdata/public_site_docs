# Publish data from a Salesforce SOQL query

> Publishes Salesforce SOQL query results into Tabsdata tables with the SalesforceSrc source, covering queries, initial_last_modified, the $lastModified incremental filter, include_deleted, and the tabsdata[salesforce] install.

Source: https://docs.tabsdata.com/tutorials/publishers/salesforce

Before you begin

[Quickstart a Server](https://docs.tabsdata.com/server-admin/quickstart) or [Start a Server](https://docs.tabsdata.com/server-admin/start)

[Connect to MCP](https://docs.tabsdata.com/guide/connect-agent)

## Ingest SOQL query results

Each entry in `queries` produces one output table, so the query list and the table list line up position by position. A query written against `SystemModStamp` reads only what changed since the previous run.

warning

There are several ways to pass secrets into Tabsdata. See [Secrets Management](https://docs.tabsdata.com/guide/secrets-management/) for more info if you are planning to have an LLM register secrets into Tabsdata's credential store.

AI agent session

❯Can you publish contacts and accounts out of salesforce, only what has changed since the start of the year

Listed 1 directory, called tabsdata 3 times (ctrl+o to expand)

⏺

The Salesforce publisher guide and connection template are loaded. Four values left, then I generate and register. Reply with them one per line, or point me at a file that has them:

-   collection name
-   username, password and security token
-   objects to query
-   timestamp to start from

❯everything you need is in 

Read 1 file, called tabsdata 2 times (ctrl+o to expand)

⏺

All three credentials found. Note that Salesforce wants the username rather than the email on the account; reader@acme.example is being used as given. Reading back what is not secret: objects Contact and Account, starting from 2026-01-01, collection sf\_src.

Called tabsdata 4 times (ctrl+o to expand)

⏺

Connection written to , and collection **sf\_src** created from it in group `sources`. Connection check passed, and the instance URL was inferred from the credentials.

Called tabsdata 2 times (ctrl+o to expand)

⏺

The publisher, registered in `sf_src`. Both queries select `SystemModStamp` and compare it against `$lastModified`, which is what makes the read incremental rather than a full pull every run:

```python
@publisher(
  source=SalesforceSrc(
      queries=[
          "SELECT Id, AccountId, FirstName, LastName, Email, SystemModStamp "
          "FROM Contact WHERE SystemModStamp > $lastModified",
          "SELECT Name, Type, SystemModStamp "
          "FROM Account WHERE SystemModStamp > $lastModified",
      ],
      initial_last_modified="2026-01-01T00:00:00.000+0000",
  ),
  output_tables=["contacts", "accounts"],
)
def read_sales(
  contacts: TableFramesSpec,
  accounts: TableFramesSpec,
) -> tuple[TableFrameSpec, TableFrameSpec]:
  return (contacts[0], accounts[0])
```

Called tabsdata 6 times (ctrl+o to expand)

⏺

Execution committed, 0 failures.

⏺

Two tables are live in **sf\_src**, holding rows modified since 2026-01-01 rather than the whole object:

```
┌──────────┬─────────┬───────┬─────────┐
│  table   │  from   │ rows  │ columns │
├──────────┼─────────┼───────┼─────────┤
│ contacts │ Contact │ 8,402 │ 6       │
├──────────┼─────────┼───────┼─────────┤
│ accounts │ Account │ 1,190 │ 3       │
└──────────┴─────────┴───────┴─────────┘
```

On the next run `$lastModified` takes the highest `SystemModStamp` already read rather than the `initial_last_modified` value, so each trigger picks up where the last one stopped.

Deleted rows are invisible to that comparison, since a deleted row stops appearing instead of getting a newer timestamp. Ask for `include_deleted` when the pipeline needs to know that a row went away.

The connector ships separately from the core package, so `pip install 'tabsdata[salesforce]'` has to have run in the environment the server uses.

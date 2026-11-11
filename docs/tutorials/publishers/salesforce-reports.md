# Publish data from Salesforce Reports

> Publishes Salesforce report data into Tabsdata using SalesforceReportSrc, covering report name or id lookup with find_report_by, column_name_strategy, filter and filter_logic options, and incremental last_modified_column.

Source: https://docs.tabsdata.com/tutorials/publishers/salesforce-reports

Before you begin

[Quickstart a Server](https://docs.tabsdata.com/server-admin/quickstart) or [Start a Server](https://docs.tabsdata.com/server-admin/start)

[Configure Your AI Agent](https://docs.tabsdata.com/guide/connect-agent)

## Ingest a Salesforce report

A report publisher names a report that already exists in Salesforce rather than a query you write. The report's own definition decides which columns come back, so the publisher adds filters instead of selecting columns.

warning

There are several ways to pass secrets into Tabsdata. See [Secrets Management](https://docs.tabsdata.com/guide/secrets-management/) for more info if you are planning to have an LLM register secrets into Tabsdata's credential store.

AI agent session

❯Can you publish the contacts report out of salesforce, US and France rows only

Listed 1 directory, called tabsdata 3 times (ctrl+o to expand)

⏺

The Salesforce Reports publisher guide and connection template are loaded. Four values left, then I generate and register. Reply with them one per line, or point me at a file that has them:

-   collection name
-   username, password and security token
-   report name or id
-   filters, and how they combine

❯everything you need is in 

Read 1 file, called tabsdata 2 times (ctrl+o to expand)

⏺

All three credentials found. Reading back what is not secret: report contacts, column names from columnName, two country filters combined as 1 or 2, collection sf\_reports.

Called tabsdata 4 times (ctrl+o to expand)

⏺

Connection written to , and collection **sf\_reports** created from it in group `sources`. Connection check passed, and the report resolved by name.

Called tabsdata 2 times (ctrl+o to expand)

⏺

The publisher, registered in `sf_reports`. `column_name_strategy="columnName"` means the filters have to use the report's `columnName` values, so `COUNTRY` rather than the label a reader sees in the UI:

```python
@publisher(
  source=SalesforceReportSrc(
      report=["contacts"],
      column_name_strategy="columnName",
      filter=[
          ("COUNTRY", "equals", "USA"),
          ("COUNTRY", "equals", "France"),
      ],
      filter_logic="1 or 2",
  ),
  output_tables=["contacts"],
)
def read_contacts(contacts: TableFramesSpec) -> tuple[TableFrameSpec]:
  return (contacts[0],)
```

Called tabsdata 6 times (ctrl+o to expand)

⏺

Execution committed, 0 failures. The filters ran on the Salesforce side, so only matching rows crossed the wire.

⏺

**sf\_reports/contacts** is live, holding the report's own columns named from `columnName`:

```
┌─────────────────┬────────────┐
│      field      │   value    │
├─────────────────┼────────────┤
│ collection      │ sf_reports │
├─────────────────┼────────────┤
│ table           │ contacts   │
├─────────────────┼────────────┤
│ report          │ contacts   │
├─────────────────┼────────────┤
│ rows            │ 2,341      │
├─────────────────┼────────────┤
│ columns         │ 9          │
├─────────────────┼────────────┤
│ filters applied │ 1 or 2     │
└─────────────────┴────────────┘
```

`filter_logic` refers to filters by position, so `1` is the first filter in the list and `2` the second. `"1 or (2 and 3)"` groups three of them. Without it, the filters carry no stated relationship.

A report referenced by name uses what Salesforce calls the report unique name, also shown as the developer name, rather than the label in the UI. `find_report_by` states whether a value is an id or a name when the inference would guess wrong.

For an incremental read, `last_modified_column` names the column the comparison runs against, and that column has to be part of the report definition.

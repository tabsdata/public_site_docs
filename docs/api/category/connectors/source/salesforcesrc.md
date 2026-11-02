# SalesforceSrc

> Salesforce SOQL source for `@publisher` -- one query.

Source: https://docs.tabsdata.com/api/category/connectors/source/salesforcesrc

class

```python
class SalesforceSrc(
    queries: QueriesSpec,
    include_deleted: bool = False,
    initial_last_modified: datetime | None = None,
    api_version: ApiVersionSpec | None = None,
    src_cfg: SrcCfgSpec | None = None,
)
```

Bases: [Src](https://docs.tabsdata.com/api/category/connectors/source/src)

**Categories:** source

Salesforce SOQL source for `@publisher` -- one query.

Every table this source publishes automatically carries two metadata columns: `@td.salesforce.soql`, the query that produced the row as it was sent to Salesforce (any `$lastModified` token already substituted), and `@td.salesforce.last_modified`, the `initial_last_modified` cutoff it ran with (empty when unset). Setting the `src_cfg` key `tabsdata.src_metadata.drop` to `True` leaves them off.

## Examples

Publish an SObject query, including deleted rows (queryAll):

```python
@publisher(
    source=SalesforceSrc(
        queries=["SELECT Id, Name FROM Account"],
        include_deleted=True,
    ),
    output_tables=["accounts"],
)
def ingest(accounts: TableFrameSpec) -> TableFrameSpec:
    return accounts
```

## Parameters

parameter

`queries`[QueriesSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-salesforce#tabsdatak.conn.salesforce.QueriesSpec) ([list](https://docs.python.org/3/library/stdtypes.html#list)\[[str](https://docs.python.org/3/library/stdtypes.html#str)\])

SOQL query list; today exactly one entry (one output slot). The list shape leaves room for future multi-query support.

parameter

`include_deleted`[bool](https://docs.python.org/3/builtins/functions.html#bool)

When true, also scan deleted rows (queryAll).

parameter

`initial_last_modified`[datetime](https://docs.python.org/3/library/datetime.html#datetime.datetime) | None

Optional cutoff substituted for any `$lastModified` token in the SOQL string.

parameter

`api_version`[ApiVersionSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-salesforce#tabsdatak.conn.salesforce.ApiVersionSpec) | None ([str](https://docs.python.org/3/library/stdtypes.html#str) | None)

Optional API-version override, e.g. `"60.0"` (`<major>.<minor>`, 1-3 digit major, 1-2 digit minor).

parameter

`src_cfg`[SrcCfgSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-salesforce#tabsdatak.conn.salesforce.SrcCfgSpec) | None (Mapping\[Literal\['salesforce.logging\_level', 'tabsdata.src\_metadata.drop'\], [Any](https://docs.python.org/3/library/typing.html#typing.Any)\] | None)

Optional connector config over the keys `salesforce.logging_level` and `tabsdata.src_metadata.drop`.

# SalesforceReportSrc

> Salesforce report source for `@publisher` -- Tabular reports only.

Source: https://docs.tabsdata.com/api/category/connectors/source/salesforcereportsrc

class

```python
class SalesforceReportSrc(
    reports: ReportsSpec,
    column_name_strategy: Literal['columnName', 'label'] = 'columnName',
    find_report_by: Literal['id', 'name'] | None = None,
    filter: FilterSpec | None = None,
    filter_logic: str | None = None,
    last_modified_column: str | None = None,
    initial_last_modified: datetime | None = None,
    src_cfg: SrcCfgSpec | None = None,
)
```

Bases: [Src](https://docs.tabsdata.com/api/category/connectors/source/src)

**Categories:** source

Salesforce report source for `@publisher` -- Tabular reports only.

Every table this source publishes automatically carries two metadata columns: `@td.salesforce.report_id`, the resolved report id that produced the row (even when `reports` named the report by name), and `@td.salesforce.last_modified`, the source's `initial_last_modified` cutoff (empty when unset). Setting the `src_cfg` key `tabsdata.src_metadata.drop` to `True` leaves them off.

## Examples

Publish a Tabular report by id, filtered server-side before download:

```python
@publisher(
    source=SalesforceReportSrc(
        reports=["00O000000000001"],
        filter=[("Type", "equals", "Customer")],
    ),
    output_tables=["customers"],
)
def ingest(customers: TableFrameSpec) -> TableFrameSpec:
    return customers
```

## Parameters

parameter

`reports`[ReportsSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-salesforce#tabsdatak.conn.salesforce.ReportsSpec) ([list](https://docs.python.org/3/library/stdtypes.html#list)\[[str](https://docs.python.org/3/library/stdtypes.html#str)\])

Report ids or names, one output slot per entry (non-empty list).

parameter

`column_name_strategy`[Literal](https://docs.python.org/3/library/typing.html#typing.Literal)\['columnName', 'label'\]

`"columnName"` (default, API names) or `"label"` (display names).

parameter

`find_report_by`[Literal](https://docs.python.org/3/library/typing.html#typing.Literal)\['id', 'name'\] | None

Lookup strategy for a `reports` entry that could be either a report id (15- or 18-char alphanumeric) or a report name -- `"id"` forces id lookup, `"name"` forces name lookup. Leave unset to auto-detect; set it to break the tie when both forms resolve.

parameter

`filter`[FilterSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-salesforce#tabsdatak.conn.salesforce.FilterSpec) | None ([list](https://docs.python.org/3/library/stdtypes.html#list)\[[tuple](https://docs.python.org/3/library/stdtypes.html#tuple)\[[str](https://docs.python.org/3/library/stdtypes.html#str), Literal\['equals', 'notEqual', 'lessThan', 'greaterThan', 'lessOrEqual', 'greaterOrEqual', 'contains', 'notContain', 'startsWith', 'includes', 'excludes', 'within', 'between'\], [str](https://docs.python.org/3/library/stdtypes.html#str)\]\] | None)

Optional list of `(column, operator, value)` triples applied on the server before download. `operator` is one of `equals`, `notEqual`, `lessThan`, `greaterThan`, `lessOrEqual`, `greaterOrEqual`, `contains`, `notContain`, `startsWith`, `includes`, `excludes`, `within` or `between`.

parameter

`filter_logic`[str](https://docs.python.org/3/builtins/stdtypes.html#str) | None

Optional boolean expression over the `filter` entries, e.g. `"(1 AND 2) OR 3"`.

parameter

`last_modified_column`[str](https://docs.python.org/3/builtins/stdtypes.html#str) | None

Optional column for incremental last-modified filtering; requires `initial_last_modified` (and vice versa).

parameter

`initial_last_modified`[datetime](https://docs.python.org/3/library/datetime.html#datetime.datetime) | None

Cutoff datetime; requires `last_modified_column`.

parameter

`src_cfg`[SrcCfgSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-salesforce#tabsdatak.conn.salesforce.SrcCfgSpec) | None (Mapping\[Literal\['salesforce.logging\_level', 'tabsdata.src\_metadata.drop'\], [Any](https://docs.python.org/3/library/typing.html#typing.Any)\] | None)

Optional connector config over the keys `salesforce.logging_level` and `tabsdata.src_metadata.drop`.

## Methods

method

`validate`

```python
def validate()
```

Validate the last-modified column and cutoff are set together.

Called by the framework; raises `SalesforceValidateException`.

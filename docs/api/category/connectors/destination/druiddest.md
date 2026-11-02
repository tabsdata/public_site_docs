# DruidDest

> Druid destination for `@subscriber` -- one slot per datasource.

Source: https://docs.tabsdata.com/api/category/connectors/destination/druiddest

class

```python
class DruidDest(
    tables: DruidTableNamesSpec,
    if_table_exists: IfTableExistsSpec = 'append',
    time_column: str | None = None,
    segment_granularity: SegmentGranularitySpec = 'ALL',
    max_concurrent_subtasks: int = 1,
    max_rows_per_segment: int = 5000000,
    max_rows_in_memory: int = 1000000,
    http_timeout_sec: int = 300,
    dest_cfg: DestCfgSpec | None = None,
)
```

Bases: [Dest](https://docs.tabsdata.com/api/category/connectors/destination/dest)

**Categories:** destination

Druid destination for `@subscriber` -- one slot per datasource.

## Examples

Overwrite the datasource on every run instead of appending:

```python
@subscriber(
    destination=DruidDest(tables=["events"], if_table_exists="replace"),
    input_tables=["mycoll/events"],
)
def publish(events: TableFrameSpec) -> TableFrameSpec:
    return events
```

## Parameters

parameter

`tables`[DruidTableNamesSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-druid#tabsdatak.conn.druid.DruidTableNamesSpec) ([list](https://docs.python.org/3/library/stdtypes.html#list)\[[str](https://docs.python.org/3/library/stdtypes.html#str)\])

Datasource names, one write slot per entry (each 1-128 chars, not starting with `.` or `_`, and containing no `/`, backslash or NUL).

parameter

`if_table_exists`[IfTableExistsSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-druid#tabsdatak.conn.druid.IfTableExistsSpec) (Literal\['append', 'replace'\])

`"append"` (default) or `"replace"` (overwrite the datasource).

parameter

`time_column`[str](https://docs.python.org/3/builtins/stdtypes.html#str) | None

Name of the row-level timestamp column Druid uses as its primary `__time` field at ingest. Druid requires a time column on every datasource; if the rows carry none, leave unset and the ingestion spec falls back to the current ingest time.

parameter

`segment_granularity`[SegmentGranularitySpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-druid#tabsdatak.conn.druid.SegmentGranularitySpec) (Literal\['ALL', 'NONE', 'SECOND', 'MINUTE', 'FIFTEEN\_MINUTE', 'THIRTY\_MINUTE', 'HOUR', 'SIX\_HOUR', 'DAY', 'WEEK', 'MONTH', 'QUARTER', 'YEAR'\])

Druid segment grain -- one of `ALL` (default), `NONE`, `SECOND`, `MINUTE`, `FIFTEEN_MINUTE`, `THIRTY_MINUTE`, `HOUR`, `SIX_HOUR`, `DAY`, `WEEK`, `MONTH`, `QUARTER` or `YEAR`.

parameter

`max_concurrent_subtasks`[int](https://docs.python.org/3/builtins/functions.html#int)

Druid ingestion-task concurrency (default 1).

parameter

`max_rows_per_segment`[int](https://docs.python.org/3/builtins/functions.html#int)

Per-segment row cap (default 5,000,000).

parameter

`max_rows_in_memory`[int](https://docs.python.org/3/builtins/functions.html#int)

Per-task in-memory row cap (default 1,000,000).

parameter

`http_timeout_sec`[int](https://docs.python.org/3/builtins/functions.html#int)

HTTP request timeout in seconds (default 300).

parameter

`dest_cfg`[DestCfgSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-druid#tabsdatak.conn.druid.DestCfgSpec) | None (Mapping\[Literal\['druid.logging\_level', 'druid.poll\_interval\_seconds', 'druid.retry\_attempts', 'druid.retry\_backoff\_seconds'\], [Any](https://docs.python.org/3/library/typing.html#typing.Any)\] | None)

Optional connector config over the keys `druid.logging_level`, `druid.poll_interval_seconds`, `druid.retry_attempts` and `druid.retry_backoff_seconds`.

# MySQLCdcStreamSrc

> MySQL CDC stream source for `@stream_publisher`.

Source: https://docs.tabsdata.com/api/category/connectors/source/mysqlcdcstreamsrc

class

```python
class MySQLCdcStreamSrc(
    tables: MySQLCdcTableNamesSpec,
    start_from: MySQLCdcStartFromSpec,
    columns_format: CdcColumnsFormatSpec = 'columns',
    flatten_columns: bool = True,
    src_cfg: CdcSrcCfgSpec | None = None,
)
```

Bases: [StreamSrc](https://docs.tabsdata.com/api/category/connectors/source/streamsrc)

**Categories:** source

MySQL CDC stream source for `@stream_publisher`.

A streaming change-data-capture source: it emits one tableframe-batch per binlog flush across the tracked tables. The decorated `@stream_publisher` function receives the flushed batch as a list of frames and must NOT declare a `ctx` parameter.

## Parameters

parameter

`tables`[MySQLCdcTableNamesSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-mysql#tabsdatak.conn.mysql.MySQLCdcTableNamesSpec) ([list](https://docs.python.org/3/library/stdtypes.html#list)\[[str](https://docs.python.org/3/library/stdtypes.html#str)\])

Qualified `schema.table` names to track, each listed once.

parameter

`start_from`[MySQLCdcStartFromSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-mysql#tabsdatak.conn.mysql.MySQLCdcStartFromSpec) (Literal\['full'\] | Literal\['head', 'tail'\] | [GtidPosition](https://docs.tabsdata.com/api/category/connectors/source/gtidposition) | [BinlogPosition](https://docs.tabsdata.com/api/category/connectors/source/binlogposition) | TimestampPosition)

Where to begin reading when no prior offset is persisted -- `"full"`, the `"head"` / `"tail"` keyword, a [`GtidPosition`](https://docs.tabsdata.com/api/category/connectors/source/gtidposition), a [`BinlogPosition`](https://docs.tabsdata.com/api/category/connectors/source/binlogposition) or a `TimestampPosition`. Required.

`"full"` first emits a full snapshot of every tracked table (rows marked as inserts, preceded by a `LOAD` control row per table) and then captures changes from the exact position of that snapshot.

To resynchronise a destination later, keep `start_from="full"` and reset the function's stage (`tdk fn update --reset-stage`): a fresh stage holds no stream state, so the stream starts again with the snapshot and emits the `LOAD` rows first. A stage reset with any other `start_from` restarts there and sends no `LOAD` row.

Beyond the privileges plain CDC needs, the connecting user must hold `SELECT` on every tracked table, since the snapshot reads the tables themselves rather than the binlog. The server must run with `gtid_mode=ON`, and the tracked tables must be InnoDB. With `RELOAD`, the snapshot is pinned to its exact binlog position by a global read lock held only while the position is read, not while the tables are scanned. Where that lock is refused, as managed services such as Amazon RDS and Aurora refuse it, the load takes no lock: it reads the changes committed while it ran and keeps only those the loaded rows do not already hold. A table without a primary key is not deduplicated that way, so such a change may then arrive twice.

parameter

`columns_format`[CdcColumnsFormatSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-mysql#tabsdatak.conn.mysql.CdcColumnsFormatSpec) (Literal\['columns', 'struct', 'map'\])

Layout for the new (and old, when present) columns payload on each change row -- `"columns"` (default), `"struct"` or `"map"`.

parameter

`flatten_columns`[bool](https://docs.python.org/3/builtins/functions.html#bool)

When `True` (default), the new columns are inlined as top-level columns, so the downstream consumer sees an ordinary tabular row and `columns_format` then only affects the old-columns layout.

parameter

`src_cfg`[CdcSrcCfgSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-mysql#tabsdatak.conn.mysql.CdcSrcCfgSpec) | None (Mapping\[Literal\['tabsdata.cdc.poll.max\_secs', 'mysql.cdc.logging\_level', 'tabsdata.cdc.buffer.max\_rows', 'tabsdata.cdc.buffer.max\_bytes', 'tabsdata.cdc.buffer.max\_secs', 'tabsdata.cdc.poll.idle\_secs', 'tabsdata.cdc.max\_large\_text\_length', 'tabsdata.cdc.fetch\_size', 'tabsdata.cdc.chunk\_size', 'tabsdata.cdc.initial\_load.max\_window\_changes'\], [Any](https://docs.python.org/3/library/typing.html#typing.Any)\] | None)

Optional config mapping over the allowed CDC keys only -- buffer thresholds (the batch limits are the `@stream_publisher` batch settings) and polling cadence. The plugin falls back to its built-in defaults for missing keys. A byte threshold is measured on every change and slows ingestion down; bounding by rows is the cheap option and the preferred one. `tabsdata.cdc.initial_load.max_window_changes` bounds the changes a load without the global read lock reads and deduplicates after its snapshot (100,000 by default).

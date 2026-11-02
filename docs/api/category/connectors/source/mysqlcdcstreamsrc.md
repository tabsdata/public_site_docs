# MySQLCdcStreamSrc

> MySQL CDC stream source for `@stream_publisher`.

Source: https://docs.tabsdata.com/api/category/connectors/source/mysqlcdcstreamsrc

class

```python
class MySQLCdcStreamSrc(
    tables: list[MySQLTableNameSpec],
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

`tables`[list](https://docs.python.org/3/builtins/stdtypes.html#list)\[[MySQLTableNameSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-mysql#tabsdatak.conn.mysql.MySQLTableNameSpec)\] ([list](https://docs.python.org/3/library/stdtypes.html#list)\[[str](https://docs.python.org/3/library/stdtypes.html#str)\])

Qualified `schema.table` names to track.

parameter

`start_from`[MySQLCdcStartFromSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-mysql#tabsdatak.conn.mysql.MySQLCdcStartFromSpec) (Literal\['full'\] | Literal\['head', 'tail'\] | [GtidPosition](https://docs.tabsdata.com/api/category/connectors/source/gtidposition) | [BinlogPosition](https://docs.tabsdata.com/api/category/connectors/source/binlogposition) | TimestampPosition)

Where to begin reading when no prior offset is persisted -- `"full"`, the `"head"` / `"tail"` keyword, a [`GtidPosition`](https://docs.tabsdata.com/api/category/connectors/source/gtidposition), a [`BinlogPosition`](https://docs.tabsdata.com/api/category/connectors/source/binlogposition) or a `TimestampPosition`. Required.

`"full"` first emits a full snapshot of every tracked table (rows marked as inserts, preceded by a `LOAD` control row per table) and then captures changes from the exact position of that snapshot.

To resynchronise a destination later, keep `start_from="full"` and reset the function's stage (`tdk fn update --reset-stage`): a fresh stage holds no stream state, so the stream starts again with the snapshot and emits the `LOAD` rows first. A stage reset with any other `start_from` restarts there and sends no `LOAD` row.

Beyond the privileges plain CDC needs, the connecting user must hold `SELECT` on every tracked table, since the snapshot reads the tables themselves rather than the binlog, and, where the server grants it, `RELOAD` (to briefly take the global read lock that pins the snapshot to a binlog position). The server must run with `gtid_mode=ON`, and the tracked tables must be InnoDB. The lock is held only while the position is read, not while the tables are scanned. Managed services such as Amazon RDS and Aurora refuse the global read lock, and the initial load still runs there with the same transactional consistency.

parameter

`columns_format`[CdcColumnsFormatSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-mysql#tabsdatak.conn.mysql.CdcColumnsFormatSpec) (Literal\['columns', 'struct', 'map'\])

Layout for the new (and old, when present) columns payload on each change row -- `"columns"` (default), `"struct"` or `"map"`.

parameter

`flatten_columns`[bool](https://docs.python.org/3/builtins/functions.html#bool)

When `True` (default), the new columns are inlined as top-level columns, so the downstream consumer sees an ordinary tabular row and `columns_format` then only affects the old-columns layout.

parameter

`src_cfg`[CdcSrcCfgSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-mysql#tabsdatak.conn.mysql.CdcSrcCfgSpec) | None (Mapping\[Literal\['tabsdata.cdc.poll.max\_secs', 'mysql.cdc.logging\_level', 'tabsdata.cdc.buffer.max\_rows', 'tabsdata.cdc.buffer.max\_bytes', 'tabsdata.cdc.buffer.max\_secs', 'tabsdata.cdc.poll.idle\_secs', 'tabsdata.cdc.max\_large\_text\_length', 'tabsdata.cdc.fetch\_size', 'tabsdata.cdc.chunk\_size'\], [Any](https://docs.python.org/3/library/typing.html#typing.Any)\] | None)

Optional config mapping over the allowed CDC keys only -- buffer thresholds (the batch limits are the `@stream_publisher` batch settings) and polling cadence. The plugin falls back to its built-in defaults for missing keys. A byte threshold is measured on every change and slows ingestion down; bounding by rows is the cheap option and the preferred one.

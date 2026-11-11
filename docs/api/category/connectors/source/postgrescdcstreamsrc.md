# PostgresCdcStreamSrc

> Postgres CDC stream source for `@stream_publisher`.

Source: https://docs.tabsdata.com/api/category/connectors/source/postgrescdcstreamsrc

class

```python
class PostgresCdcStreamSrc(
    tables: PostgresCdcTableNamesSpec,
    replication_slot: str,
    start_from: PostgresCdcStartFromSpec,
    replication_slot_behavior: ReplicationSlotBehaviorSpec = 'reuse',
    publication_name: str | None = None,
    columns_format: CdcColumnsFormatSpec = 'columns',
    flatten_columns: bool = True,
    src_cfg: CdcSrcCfgSpec | None = None,
)
```

Bases: [StreamSrc](https://docs.tabsdata.com/api/category/connectors/source/streamsrc)

**Categories:** source

Postgres CDC stream source for `@stream_publisher`.

A streaming change-data-capture source: it emits one tableframe-batch per WAL flush across the tracked tables. Postgres logical replication requires a replication slot -- a persistent cursor on the WAL the database will not garbage-collect until the consumer confirms. `replication_slot` names it and `replication_slot_behavior` controls create vs reuse. The decorated `@stream_publisher` function receives the flushed batch as a list of frames and must NOT declare a `ctx` parameter.

## Parameters

parameter

`tables`[PostgresCdcTableNamesSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-postgres#tabsdatak.conn.postgres.PostgresCdcTableNamesSpec) ([list](https://docs.python.org/3/library/stdtypes.html#list)\[[str](https://docs.python.org/3/library/stdtypes.html#str)\])

Qualified `schema.table` names to track, each listed once.

parameter

`replication_slot`[str](https://docs.python.org/3/builtins/stdtypes.html#str)

Logical replication slot to attach to.

parameter

`start_from`[PostgresCdcStartFromSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-postgres#tabsdatak.conn.postgres.PostgresCdcStartFromSpec) (Literal\['full'\] | Literal\['head', 'tail'\] | [LsnPosition](https://docs.tabsdata.com/api/category/connectors/source/lsnposition))

Where to begin -- `"full"`, `"head"` (replay from the oldest retained WAL), `"tail"` (current WAL LSN) or an [`LsnPosition`](https://docs.tabsdata.com/api/category/connectors/source/lsnposition). Required.

`"full"` first emits a full snapshot of every tracked table (rows marked as inserts, preceded by a `LOAD` control row per table) and then captures changes from the exact position of that snapshot.

To resynchronise a destination later, keep `start_from="full"` and reset the function's stage (`tdk fn update --reset-stage`): a fresh stage holds no stream state, so the stream starts again with the snapshot and emits the `LOAD` rows first. A stage reset with any other `start_from` restarts there and sends no `LOAD` row.

Beyond the privileges plain CDC needs, the connecting role must be able to `SELECT` every tracked table, since the snapshot reads the tables themselves rather than the write-ahead log. No table is locked.

The snapshot is the one the server exports as it creates a slot, together with the position it is consistent at, so no change is repeated or missed. With `"create"` that slot is the stream's own; with `"reuse"`, which leaves the stream's slot to whoever provisioned it -- it must already exist -- or when the slot to create is already there, it is a temporary slot beside the stream's, which the server drops once the load is read.

parameter

`replication_slot_behavior`[ReplicationSlotBehaviorSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-postgres#tabsdatak.conn.postgres.ReplicationSlotBehaviorSpec) (Literal\['create', 'reuse'\])

`"reuse"` (default, slot must exist) or `"create"` (create it, no-op if it exists). It also selects how a `"full"` start snapshots -- see `start_from`.

parameter

`publication_name`[str](https://docs.python.org/3/builtins/stdtypes.html#str) | None

Optional publication scoping the slot's output (wal2json's `publication_names` option).

parameter

`columns_format`[CdcColumnsFormatSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-postgres#tabsdatak.conn.postgres.CdcColumnsFormatSpec) (Literal\['columns', 'struct', 'map'\])

Layout for the new (and old) columns payload on each change row -- `"columns"` (default), `"struct"` or `"map"`.

parameter

`flatten_columns`[bool](https://docs.python.org/3/builtins/functions.html#bool)

When `True` (default), the new columns are inlined as top-level columns.

parameter

`src_cfg`[CdcSrcCfgSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-postgres#tabsdatak.conn.postgres.CdcSrcCfgSpec) | None (Mapping\[Literal\['tabsdata.cdc.poll.max\_secs', 'postgres.cdc.logging\_level', 'postgres.cdc.wal2json\_format\_version', 'postgres.cdc.unchanged\_large\_text\_as\_null', 'postgres.cdc.accept\_gap', 'tabsdata.cdc.buffer.max\_rows', 'tabsdata.cdc.buffer.max\_bytes', 'tabsdata.cdc.buffer.max\_secs', 'tabsdata.cdc.poll.idle\_secs', 'tabsdata.cdc.max\_large\_text\_length', 'tabsdata.cdc.fetch\_size', 'tabsdata.cdc.chunk\_size'\], [Any](https://docs.python.org/3/library/typing.html#typing.Any)\] | None)

Optional config mapping over the allowed CDC keys only -- buffer thresholds (the batch limits are the `@stream_publisher` batch settings), polling cadence, wal2json format version, the large text length limit and `postgres.cdc.unchanged_large_text_as_null`. A byte threshold is measured on every change and slows ingestion down; bounding by rows is the cheap option and the preferred one. `postgres.cdc.unchanged_large_text_as_null` accepts that, on a table without `REPLICA IDENTITY FULL`, an UPDATE not touching a large text column delivers it as null; when unset, such a table refuses to start the stream. `postgres.cdc.accept_gap` lets a stream resume past the one gap a POSTGRES\_25 failure names, given as that failure prints it; it matches no later gap.

# Db2CdcStreamSrc

> Db2 CDC stream source for `@stream_publisher`.

Source: https://docs.tabsdata.com/api/category/connectors/source/db2cdcstreamsrc

class

```python
class Db2CdcStreamSrc(
    tables: Db2CdcTableNamesSpec,
    start_from: Db2CdcStartFromSpec,
    columns_format: CdcColumnsFormatSpec = 'columns',
    flatten_columns: bool = True,
    src_cfg: CdcSrcCfgSpec | None = None,
)
```

Bases: [StreamSrc](https://docs.tabsdata.com/api/category/connectors/source/streamsrc)

**Categories:** source

Db2 CDC stream source for `@stream_publisher`.

A streaming change-data-capture source: it emits one tableframe-batch per capture-table flush across the tracked CD (change-data) tables. Db2 SQL Replication captures changes into shadow CD tables that the ASN capture program (`asncap`) populates in the background. `tables` lists the CD tables (not the source tables); the ingester resolves the source via `ASN.IBMSNAP_REGISTER`. The decorated `@stream_publisher` function receives the flushed batch as a list of frames and must NOT declare a `ctx` parameter.

## Parameters

parameter

`tables`[Db2CdcTableNamesSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-db2#tabsdatak.conn.db2.Db2CdcTableNamesSpec) ([list](https://docs.python.org/3/library/stdtypes.html#list)\[[str](https://docs.python.org/3/library/stdtypes.html#str)\])

Qualified `cd_schema.cd_table` CD table names, each listed once.

parameter

`start_from`[Db2CdcStartFromSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-db2#tabsdatak.conn.db2.Db2CdcStartFromSpec) (Literal\['full'\] | Literal\['head', 'tail'\] | [CommitSeqPosition](https://docs.tabsdata.com/api/category/connectors/source/commitseqposition) | [TableCommitSeqPosition](https://docs.tabsdata.com/api/category/connectors/source/tablecommitseqposition) | TimestampPosition)

Where to begin -- `"full"`, `"head"` (replay each tracked CD table from the origin), `"tail"` (each table's current watermark), a [`CommitSeqPosition`](https://docs.tabsdata.com/api/category/connectors/source/commitseqposition), a [`TableCommitSeqPosition`](https://docs.tabsdata.com/api/category/connectors/source/tablecommitseqposition) or a `TimestampPosition`. Required.

`"full"` first emits a full snapshot of every tracked source table (rows marked as inserts, preceded by a `LOAD` control row per table) and then captures changes from the exact position of that snapshot.

To resynchronise a destination later, keep `start_from="full"` and reset the function's stage (`tdk fn update --reset-stage`): a fresh stage holds no stream state, so the stream starts again with the snapshot and emits the `LOAD` rows first. A stage reset with any other `start_from` restarts there and sends no `LOAD` row.

Beyond the privileges plain CDC needs, the connecting user must be able to `SELECT` every tracked _source_ table (plain CDC only reads the CD tables), since the snapshot reads the source tables themselves, and needs `EXECUTE` on `SYSPROC.MON_GET_TRANSACTION_LOG` or `SYSMON` authority to read the log position the snapshot is pinned to. No table is locked.

parameter

`columns_format`[CdcColumnsFormatSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-db2#tabsdatak.conn.db2.CdcColumnsFormatSpec) (Literal\['columns', 'struct', 'map'\])

Layout for the new (and old) columns payload on each change row -- `"columns"` (default), `"struct"` or `"map"`.

parameter

`flatten_columns`[bool](https://docs.python.org/3/builtins/functions.html#bool)

When `True` (default), the new columns are inlined as top-level columns.

parameter

`src_cfg`[CdcSrcCfgSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-db2#tabsdatak.conn.db2.CdcSrcCfgSpec) | None (Mapping\[Literal\['tabsdata.cdc.poll.max\_secs', 'db2.cdc.logging\_level', 'tabsdata.cdc.buffer.max\_rows', 'tabsdata.cdc.buffer.max\_bytes', 'tabsdata.cdc.buffer.max\_secs', 'tabsdata.cdc.poll.idle\_secs', 'tabsdata.cdc.max\_large\_text\_length', 'tabsdata.cdc.fetch\_size', 'tabsdata.cdc.chunk\_size', 'tabsdata.cdc.initial\_load.max\_window\_changes'\], [Any](https://docs.python.org/3/library/typing.html#typing.Any)\] | None)

Optional config mapping over the allowed CDC keys only -- buffer thresholds (the batch limits are the `@stream_publisher` batch settings), polling cadence, server-side fetch size. A byte threshold is measured on every change and slows ingestion down; bounding by rows is the cheap option and the preferred one.

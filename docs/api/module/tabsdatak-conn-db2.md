# tabsdatak.conn.db2

> tabsdatak.conn.db2 API reference.

Source: https://docs.tabsdata.com/api/module/tabsdatak-conn-db2

|  |  |
| --- | --- |
| [`CdcColumnsFormatSpec`](#tabsdatak.conn.db2.CdcColumnsFormatSpec) | Layout of the change-values payload on each emitted row: one of `"columns"`, `"struct"` or `"map"`. |
| [`CdcSrcCfgKey`](#tabsdatak.conn.db2.CdcSrcCfgKey) |  |
| [`CdcSrcCfgSpec`](#tabsdatak.conn.db2.CdcSrcCfgSpec) |  |
| [`CommitSeqPosition`](https://docs.tabsdata.com/api/category/connectors/source/commitseqposition) | CDC start position: one global commit sequence for every table. |
| [`CredentialsSpec`](#tabsdatak.conn.db2.CredentialsSpec) | The credential type for Db2 connections: `UserPassword` (user + password), spliced into the URI by the engine factory. |
| [`Db2CdcStartFromSpec`](#tabsdatak.conn.db2.Db2CdcStartFromSpec) | Where a Db2 CDC stream begins: `"full"` (a snapshot of every tracked source table, then the changes after it), a `"head"` / `"tail"` keyword, a `CommitSeqPosition`, a `TableCommitSeqPosition` or a `TimestampPosition`. |
| [`Db2CdcStreamSrc`](https://docs.tabsdata.com/api/category/connectors/source/db2cdcstreamsrc) | Db2 CDC stream source for `@stream_publisher`. |
| [`Db2CdcStreamSrcConn`](https://docs.tabsdata.com/api/category/connectors/source/db2cdcstreamsrcconn) | Db2 CDC connection used by `Db2CdcStreamSrc`. |
| [`Db2CdcTableNamesSpec`](#tabsdatak.conn.db2.Db2CdcTableNamesSpec) | The tables a Db2 CDC stream tracks (see `Db2TableNameSpec`), each at most once: names that differ only in quoting, or in the case of an unquoted part (upper-cased, as Db2 folds them), are the same table. |
| [`Db2Dest`](https://docs.tabsdata.com/api/category/connectors/destination/db2dest) | Db2 destination for `@subscriber` -- one target table per slot. |
| [`Db2DestConn`](https://docs.tabsdata.com/api/category/connectors/destination/db2destconn) | Db2 connection used by `Db2Dest`. |
| [`Db2Src`](https://docs.tabsdata.com/api/category/connectors/source/db2src) | Db2 source for `@publisher` -- one output slot per query. |
| [`Db2SrcConn`](https://docs.tabsdata.com/api/category/connectors/source/db2srcconn) | Db2 connection used by `Db2Src`. |
| [`Db2TableNameSpec`](#tabsdatak.conn.db2.Db2TableNameSpec) | A Db2 table name, either `table` or `schema.table` (at most two dot-separated parts). |
| [`Db2TableNamesSpec`](#tabsdatak.conn.db2.Db2TableNamesSpec) | A list of Db2 table names (see `Db2TableNameSpec`), each at most once: names that differ only in quoting, or in the case of an unquoted part (upper-cased, as Db2 folds them), are the same table. |
| [`DestCfgKey`](#tabsdatak.conn.db2.DestCfgKey) |  |
| [`DestCfgSpec`](#tabsdatak.conn.db2.DestCfgSpec) |  |
| [`IfTableExistsSpec`](#tabsdatak.conn.db2.IfTableExistsSpec) |  |
| [`QueriesSpec`](#tabsdatak.conn.db2.QueriesSpec) | A non-empty, ordered list of SELECT statements -- one output slot per query. |
| [`RelativePositionSpec`](#tabsdatak.conn.db2.RelativePositionSpec) | Relative CDC start position: `"head"` rewinds to the oldest row still retained in each tracked CD table; `"tail"` skips to each CD table's current watermark (only later changes are emitted). |
| [`SchemaEvolutionSpec`](#tabsdatak.conn.db2.SchemaEvolutionSpec) | Write disposition when the target table exists: `"append"` adds rows; `"replace"` truncates before insert. |
| [`SrcCfgKey`](#tabsdatak.conn.db2.SrcCfgKey) |  |
| [`SrcCfgSpec`](#tabsdatak.conn.db2.SrcCfgSpec) |  |
| [`TableCommitSeqPosition`](https://docs.tabsdata.com/api/category/connectors/source/tablecommitseqposition) | CDC start position: independent commit sequence per table. |
| [`TimestampPosition`](https://docs.tabsdata.com/api/category/connectors/source/timestampposition-db2) | CDC start position given as a wall-clock timestamp. |
| [`UriSpec`](#tabsdatak.conn.db2.UriSpec) | A SQLAlchemy-style Db2 URI, e.g. |

* * *

## CdcColumnsFormatSpec

type\_alias

```python
CdcColumnsFormatSpec: Literal['columns', 'struct', 'map']
```

Layout of the change-values payload on each emitted row: one of `"columns"`, `"struct"` or `"map"`.

* * *

## CdcSrcCfgKey

type\_alias

```python
CdcSrcCfgKey: Literal['tabsdata.cdc.poll.max_secs', 'db2.cdc.logging_level', 'tabsdata.cdc.buffer.max_rows', 'tabsdata.cdc.buffer.max_bytes', 'tabsdata.cdc.buffer.max_secs', 'tabsdata.cdc.poll.idle_secs', 'tabsdata.cdc.max_large_text_length', 'tabsdata.cdc.fetch_size', 'tabsdata.cdc.chunk_size', 'tabsdata.cdc.initial_load.max_window_changes']
```

* * *

## CdcSrcCfgSpec

type\_alias

```python
CdcSrcCfgSpec: Mapping[CdcSrcCfgKey, Any]
```

**Resolved type:**

```python
Mapping[Literal['tabsdata.cdc.poll.max_secs', 'db2.cdc.logging_level', 'tabsdata.cdc.buffer.max_rows', 'tabsdata.cdc.buffer.max_bytes', 'tabsdata.cdc.buffer.max_secs', 'tabsdata.cdc.poll.idle_secs', 'tabsdata.cdc.max_large_text_length', 'tabsdata.cdc.fetch_size', 'tabsdata.cdc.chunk_size', 'tabsdata.cdc.initial_load.max_window_changes'], Any]
```

* * *

## CredentialsSpec

type\_alias

```python
CredentialsSpec: UserPassword
```

The credential type for Db2 connections: [`UserPassword`](https://docs.tabsdata.com/api/category/connectors/credentials/userpassword) (user + password), spliced into the URI by the engine factory.

* * *

## Db2CdcStartFromSpec

type\_alias

```python
Db2CdcStartFromSpec: Union[Literal['full'], RelativePositionSpec, CommitSeqPosition, TableCommitSeqPosition, TimestampPosition]
```

**Resolved type:**

```python
Literal['full'] |
Literal['head', 'tail'] |
CommitSeqPosition |
TableCommitSeqPosition |
TimestampPosition
```

Where a Db2 CDC stream begins: `"full"` (a snapshot of every tracked source table, then the changes after it), a `"head"` / `"tail"` keyword, a [`CommitSeqPosition`](https://docs.tabsdata.com/api/category/connectors/source/commitseqposition), a [`TableCommitSeqPosition`](https://docs.tabsdata.com/api/category/connectors/source/tablecommitseqposition) or a `TimestampPosition`.

* * *

## Db2CdcTableNamesSpec

type\_alias

```python
Db2CdcTableNamesSpec: list[Db2TableNameSpec]
```

**Resolved type:**

```python
list[str]
```

The tables a Db2 CDC stream tracks (see [`Db2TableNameSpec`](https://docs.tabsdata.com/api/module/tabsdatak-conn-db2#tabsdatak.conn.db2.Db2TableNameSpec)), each at most once: names that differ only in quoting, or in the case of an unquoted part (upper-cased, as Db2 folds them), are the same table.

* * *

## Db2TableNameSpec

type\_alias

```python
Db2TableNameSpec: str
```

A Db2 table name, either `table` or `schema.table` (at most two dot-separated parts). Parts may be double-quoted, using the doubled double-quote convention to embed a literal quote.

* * *

## Db2TableNamesSpec

type\_alias

```python
Db2TableNamesSpec: list[Db2TableNameSpec]
```

**Resolved type:**

```python
list[str]
```

A list of Db2 table names (see [`Db2TableNameSpec`](https://docs.tabsdata.com/api/module/tabsdatak-conn-db2#tabsdatak.conn.db2.Db2TableNameSpec)), each at most once: names that differ only in quoting, or in the case of an unquoted part (upper-cased, as Db2 folds them), are the same table.

* * *

## DestCfgKey

type\_alias

```python
DestCfgKey: Literal['db2.logging_level', 'db2.schema_evolution_engine', 'tabsdata.sql.write_engine', 'tabsdata.sql.chunk_size']
```

* * *

## DestCfgSpec

type\_alias

```python
DestCfgSpec: Mapping[DestCfgKey, Any]
```

**Resolved type:**

```python
Mapping[Literal['db2.logging_level', 'db2.schema_evolution_engine', 'tabsdata.sql.write_engine', 'tabsdata.sql.chunk_size'], Any]
```

* * *

## IfTableExistsSpec

type\_alias

```python
IfTableExistsSpec: Literal['append', 'replace']
```

* * *

## QueriesSpec

type\_alias

```python
QueriesSpec: list[str]
```

A non-empty, ordered list of SELECT statements -- one output slot per query.

* * *

## RelativePositionSpec

type\_alias

```python
RelativePositionSpec: Literal['head', 'tail']
```

Relative CDC start position: `"head"` rewinds to the oldest row still retained in each tracked CD table; `"tail"` skips to each CD table's current watermark (only later changes are emitted).

* * *

## SchemaEvolutionSpec

type\_alias

```python
SchemaEvolutionSpec: Literal['strict', 'update']
```

Write disposition when the target table exists: `"append"` adds rows; `"replace"` truncates before insert.

* * *

## SrcCfgKey

type\_alias

```python
SrcCfgKey: Literal['db2.logging_level', 'tabsdata.sql.read_engine', 'tabsdata.sql.chunk_size', 'tabsdata.src_metadata.drop']
```

* * *

## SrcCfgSpec

type\_alias

```python
SrcCfgSpec: Mapping[SrcCfgKey, Any]
```

**Resolved type:**

```python
Mapping[Literal['db2.logging_level', 'tabsdata.sql.read_engine', 'tabsdata.sql.chunk_size', 'tabsdata.src_metadata.drop'], Any]
```

* * *

## UriSpec

type\_alias

```python
UriSpec: StrOrSecretSpec
```

**Resolved type:**

```python
str | Secret
```

A SQLAlchemy-style Db2 URI, e.g. `db2+ibm_db://host:port/db`. The scheme must be `db2` or `ibm_db_sa` (an optional `+driver` is allowed). Accepts a plain string or a [`Secret`](https://docs.tabsdata.com/api/category/connectors/credentials/secret).

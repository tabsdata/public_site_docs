# tabsdatak.conn.postgres

> tabsdatak.conn.postgres API reference.

Source: https://docs.tabsdata.com/api/module/tabsdatak-conn-postgres

|  |  |
| --- | --- |
| [`CdcColumnsFormatSpec`](#tabsdatak.conn.postgres.CdcColumnsFormatSpec) | Layout of the change-values payload on each emitted row: one of `"columns"`, `"struct"` or `"map"`. |
| [`CdcSrcCfgKey`](#tabsdatak.conn.postgres.CdcSrcCfgKey) |  |
| [`CdcSrcCfgSpec`](#tabsdatak.conn.postgres.CdcSrcCfgSpec) |  |
| [`CredentialsSpec`](#tabsdatak.conn.postgres.CredentialsSpec) | The credential type for Postgres connections: `UserPassword` (user + password), spliced into the URI by the engine factory. |
| [`DestCfgKey`](#tabsdatak.conn.postgres.DestCfgKey) |  |
| [`DestCfgSpec`](#tabsdatak.conn.postgres.DestCfgSpec) |  |
| [`IfTableExistsSpec`](#tabsdatak.conn.postgres.IfTableExistsSpec) | Write disposition when the target table exists: `"append"` adds rows; `"replace"` truncates before insert. |
| [`LsnPosition`](https://docs.tabsdata.com/api/category/connectors/source/lsnposition) | CDC start position: a WAL Log Sequence Number. |
| [`PostgresCdcStartFromSpec`](#tabsdatak.conn.postgres.PostgresCdcStartFromSpec) | Where a Postgres CDC stream begins: `"full"` (a snapshot of every tracked table, then the changes after it), a `"head"` / `"tail"` keyword or an `LsnPosition`. |
| [`PostgresCdcStreamSrc`](https://docs.tabsdata.com/api/category/connectors/source/postgrescdcstreamsrc) | Postgres CDC stream source for `@stream_publisher`. |
| [`PostgresCdcStreamSrcConn`](https://docs.tabsdata.com/api/category/connectors/source/postgrescdcstreamsrcconn) | Postgres CDC connection used by `PostgresCdcStreamSrc`. |
| [`PostgresDest`](https://docs.tabsdata.com/api/category/connectors/destination/postgresdest) | Postgres destination for `@subscriber` -- one target table per slot. |
| [`PostgresDestConn`](https://docs.tabsdata.com/api/category/connectors/destination/postgresdestconn) | Postgres connection used by `PostgresDest`. |
| [`PostgresSrc`](https://docs.tabsdata.com/api/category/connectors/source/postgressrc) | Postgres source for `@publisher` -- one output slot per query. |
| [`PostgresSrcConn`](https://docs.tabsdata.com/api/category/connectors/source/postgressrcconn) | Postgres connection used by `PostgresSrc`. |
| [`PostgresTableNameSpec`](#tabsdatak.conn.postgres.PostgresTableNameSpec) | A Postgres table name -- `table`, `schema.table` or `database.schema.table` (at most three dot-separated parts). |
| [`PostgresTableNamesSpec`](#tabsdatak.conn.postgres.PostgresTableNamesSpec) | A list of Postgres table names (see `PostgresTableNameSpec`). |
| [`QueriesSpec`](#tabsdatak.conn.postgres.QueriesSpec) | A non-empty, ordered list of SELECT statements -- one output slot per query. |
| [`RelativePositionSpec`](#tabsdatak.conn.postgres.RelativePositionSpec) | Relative CDC start position: `"head"` rewinds to the oldest change still retained on the replication slot; `"tail"` skips to the current WAL position (only changes made after the stream starts are emitted). |
| [`ReplicationSlotBehaviorSpec`](#tabsdatak.conn.postgres.ReplicationSlotBehaviorSpec) | Logical replication slot strategy: `"reuse"` (default) requires the named slot to already exist; `"create"` creates it, doing nothing if it already exists. |
| [`SrcCfgKey`](#tabsdatak.conn.postgres.SrcCfgKey) |  |
| [`SrcCfgSpec`](#tabsdatak.conn.postgres.SrcCfgSpec) |  |
| [`UriSpec`](#tabsdatak.conn.postgres.UriSpec) | A SQLAlchemy-style Postgres URI, e.g. |
| [`Wal2JsonFormatVersionSpec`](#tabsdatak.conn.postgres.Wal2JsonFormatVersionSpec) | wal2json output-plugin format version: `2` (default, per-action messages with explicit begin/commit framing) or `1` (the older whole-transaction batch payload). |

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
CdcSrcCfgKey: Literal['tabsdata.cdc.poll.max_secs', 'postgres.cdc.logging_level', 'postgres.cdc.wal2json_format_version', 'postgres.cdc.unchanged_large_text_as_null', 'postgres.cdc.accept_gap', 'tabsdata.cdc.buffer.max_rows', 'tabsdata.cdc.buffer.max_bytes', 'tabsdata.cdc.buffer.max_secs', 'tabsdata.cdc.poll.idle_secs', 'tabsdata.cdc.max_large_text_length', 'tabsdata.cdc.fetch_size', 'tabsdata.cdc.chunk_size', 'tabsdata.cdc.initial_load.max_window_changes']
```

* * *

## CdcSrcCfgSpec

type\_alias

```python
CdcSrcCfgSpec: Mapping[CdcSrcCfgKey, Any]
```

**Resolved type:**

```python
Mapping[Literal['tabsdata.cdc.poll.max_secs', 'postgres.cdc.logging_level', 'postgres.cdc.wal2json_format_version', 'postgres.cdc.unchanged_large_text_as_null', 'postgres.cdc.accept_gap', 'tabsdata.cdc.buffer.max_rows', 'tabsdata.cdc.buffer.max_bytes', 'tabsdata.cdc.buffer.max_secs', 'tabsdata.cdc.poll.idle_secs', 'tabsdata.cdc.max_large_text_length', 'tabsdata.cdc.fetch_size', 'tabsdata.cdc.chunk_size', 'tabsdata.cdc.initial_load.max_window_changes'], Any]
```

* * *

## CredentialsSpec

type\_alias

```python
CredentialsSpec: UserPassword
```

The credential type for Postgres connections: [`UserPassword`](https://docs.tabsdata.com/api/category/connectors/credentials/userpassword) (user

-   password), spliced into the URI by the engine factory.

* * *

## DestCfgKey

type\_alias

```python
DestCfgKey: Literal['postgres.logging_level', 'tabsdata.sql.write_engine', 'tabsdata.sql.chunk_size']
```

* * *

## DestCfgSpec

type\_alias

```python
DestCfgSpec: Mapping[DestCfgKey, Any]
```

**Resolved type:**

```python
Mapping[Literal['postgres.logging_level', 'tabsdata.sql.write_engine', 'tabsdata.sql.chunk_size'], Any]
```

* * *

## IfTableExistsSpec

type\_alias

```python
IfTableExistsSpec: Literal['append', 'replace']
```

Write disposition when the target table exists: `"append"` adds rows; `"replace"` truncates before insert.

* * *

## PostgresCdcStartFromSpec

type\_alias

```python
PostgresCdcStartFromSpec: Union[Literal['full'], RelativePositionSpec, LsnPosition]
```

**Resolved type:**

```python
Literal['full'] | Literal['head', 'tail'] | LsnPosition
```

Where a Postgres CDC stream begins: `"full"` (a snapshot of every tracked table, then the changes after it), a `"head"` / `"tail"` keyword or an [`LsnPosition`](https://docs.tabsdata.com/api/category/connectors/source/lsnposition).

* * *

## PostgresTableNameSpec

type\_alias

```python
PostgresTableNameSpec: str
```

A Postgres table name -- `table`, `schema.table` or `database.schema.table` (at most three dot-separated parts). Parts may be double-quoted, using the doubled double-quote convention to embed a literal quote.

* * *

## PostgresTableNamesSpec

type\_alias

```python
PostgresTableNamesSpec: list[PostgresTableNameSpec]
```

**Resolved type:**

```python
list[str]
```

A list of Postgres table names (see [`PostgresTableNameSpec`](https://docs.tabsdata.com/api/module/tabsdatak-conn-postgres#tabsdatak.conn.postgres.PostgresTableNameSpec)).

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

Relative CDC start position: `"head"` rewinds to the oldest change still retained on the replication slot; `"tail"` skips to the current WAL position (only changes made after the stream starts are emitted).

* * *

## ReplicationSlotBehaviorSpec

type\_alias

```python
ReplicationSlotBehaviorSpec: Literal['create', 'reuse']
```

Logical replication slot strategy: `"reuse"` (default) requires the named slot to already exist; `"create"` creates it, doing nothing if it already exists.

* * *

## SrcCfgKey

type\_alias

```python
SrcCfgKey: Literal['postgres.logging_level', 'tabsdata.sql.read_engine', 'tabsdata.sql.chunk_size', 'tabsdata.src_metadata.drop']
```

* * *

## SrcCfgSpec

type\_alias

```python
SrcCfgSpec: Mapping[SrcCfgKey, Any]
```

**Resolved type:**

```python
Mapping[Literal['postgres.logging_level', 'tabsdata.sql.read_engine', 'tabsdata.sql.chunk_size', 'tabsdata.src_metadata.drop'], Any]
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

A SQLAlchemy-style Postgres URI, e.g. `postgres+psycopg2://host:port/db`. The scheme must be `postgres` or `postgresql` (an optional `+driver` is allowed). Accepts a plain string or a [`Secret`](https://docs.tabsdata.com/api/category/connectors/credentials/secret).

* * *

## Wal2JsonFormatVersionSpec

type\_alias

```python
Wal2JsonFormatVersionSpec: Literal[1, 2]
```

wal2json output-plugin format version: `2` (default, per-action messages with explicit begin/commit framing) or `1` (the older whole-transaction batch payload).

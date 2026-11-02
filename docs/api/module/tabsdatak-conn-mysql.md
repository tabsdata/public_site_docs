# tabsdatak.conn.mysql

> tabsdatak.conn.mysql API reference.

Source: https://docs.tabsdata.com/api/module/tabsdatak-conn-mysql

|  |  |
| --- | --- |
| [`BinlogPosition`](https://docs.tabsdata.com/api/category/connectors/source/binlogposition) | CDC start position: a binlog file + byte offset. |
| [`CdcColumnsFormatSpec`](#tabsdatak.conn.mysql.CdcColumnsFormatSpec) | Layout of the change-values payload on each emitted row: one of `"columns"`, `"struct"` or `"map"`. |
| [`CdcSrcCfgKey`](#tabsdatak.conn.mysql.CdcSrcCfgKey) |  |
| [`CdcSrcCfgSpec`](#tabsdatak.conn.mysql.CdcSrcCfgSpec) |  |
| [`CredentialsSpec`](#tabsdatak.conn.mysql.CredentialsSpec) | The credential type for MySQL connections: `UserPassword` (user + password), spliced into the URI by the engine factory. |
| [`DEFAULT_SERVER_ID`](#tabsdatak.conn.mysql.DEFAULT_SERVER_ID) | Default MySQL replica `server_id` for the binlog stream (512). |
| [`DestCfgKey`](#tabsdatak.conn.mysql.DestCfgKey) |  |
| [`DestCfgSpec`](#tabsdatak.conn.mysql.DestCfgSpec) |  |
| [`GtidPosition`](https://docs.tabsdata.com/api/category/connectors/source/gtidposition) | CDC start position: a MySQL Global Transaction ID. |
| [`IfTableExistsSpec`](#tabsdatak.conn.mysql.IfTableExistsSpec) | Write disposition when the target table exists: `"append"` adds rows; `"replace"` truncates before insert. |
| [`MySQLCdcStartFromSpec`](#tabsdatak.conn.mysql.MySQLCdcStartFromSpec) | Where a MySQL CDC stream begins: `"full"` (a snapshot of every tracked table, then the changes after it), a `"head"` / `"tail"` keyword, a `GtidPosition`, a `BinlogPosition` or a `TimestampPosition`. |
| [`MySQLCdcStreamSrc`](https://docs.tabsdata.com/api/category/connectors/source/mysqlcdcstreamsrc) | MySQL CDC stream source for `@stream_publisher`. |
| [`MySQLCdcStreamSrcConn`](https://docs.tabsdata.com/api/category/connectors/source/mysqlcdcstreamsrcconn) | MySQL CDC connection used by `MySQLCdcStreamSrc`. |
| [`MySQLDest`](https://docs.tabsdata.com/api/category/connectors/destination/mysqldest) | MySQL destination for `@subscriber` -- one target table per slot. |
| [`MySQLDestConn`](https://docs.tabsdata.com/api/category/connectors/destination/mysqldestconn) | MySQL connection used by `MySQLDest`. |
| [`MySQLSrc`](https://docs.tabsdata.com/api/category/connectors/source/mysqlsrc) | MySQL source for `@publisher` -- one output slot per query. |
| [`MySQLSrcConn`](https://docs.tabsdata.com/api/category/connectors/source/mysqlsrcconn) | MySQL connection used by `MySQLSrc`. |
| [`MySQLTableNameSpec`](#tabsdatak.conn.mysql.MySQLTableNameSpec) | A MySQL table name, either `table` or `database.table` (at most two dot-separated parts). |
| [`MySQLTableNamesSpec`](#tabsdatak.conn.mysql.MySQLTableNamesSpec) | A list of MySQL table names (see `MySQLTableNameSpec`). |
| [`QueriesSpec`](#tabsdatak.conn.mysql.QueriesSpec) | A non-empty, ordered list of SELECT statements -- one output slot per query. |
| [`RelativePositionSpec`](#tabsdatak.conn.mysql.RelativePositionSpec) | Relative CDC start position: `"head"` rewinds to the oldest change still in binlog retention; `"tail"` skips to the live edge (only later changes are emitted). |
| [`SrcCfgKey`](#tabsdatak.conn.mysql.SrcCfgKey) |  |
| [`SrcCfgSpec`](#tabsdatak.conn.mysql.SrcCfgSpec) |  |
| [`TimestampPosition`](https://docs.tabsdata.com/api/category/connectors/source/timestampposition-mysql) | CDC start position given as a wall-clock timestamp. |
| [`UriSpec`](#tabsdatak.conn.mysql.UriSpec) | A SQLAlchemy-style MySQL URI, e.g. |

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
CdcSrcCfgKey: Literal['tabsdata.cdc.poll.max_secs', 'mysql.cdc.logging_level', 'tabsdata.cdc.buffer.max_rows', 'tabsdata.cdc.buffer.max_bytes', 'tabsdata.cdc.buffer.max_secs', 'tabsdata.cdc.poll.idle_secs', 'tabsdata.cdc.max_large_text_length', 'tabsdata.cdc.fetch_size', 'tabsdata.cdc.chunk_size']
```

* * *

## CdcSrcCfgSpec

type\_alias

```python
CdcSrcCfgSpec: Mapping[CdcSrcCfgKey, Any]
```

**Resolved type:**

```python
Mapping[Literal['tabsdata.cdc.poll.max_secs', 'mysql.cdc.logging_level', 'tabsdata.cdc.buffer.max_rows', 'tabsdata.cdc.buffer.max_bytes', 'tabsdata.cdc.buffer.max_secs', 'tabsdata.cdc.poll.idle_secs', 'tabsdata.cdc.max_large_text_length', 'tabsdata.cdc.fetch_size', 'tabsdata.cdc.chunk_size'], Any]
```

* * *

## CredentialsSpec

type\_alias

```python
CredentialsSpec: UserPassword
```

The credential type for MySQL connections: [`UserPassword`](https://docs.tabsdata.com/api/category/connectors/credentials/userpassword) (user + password), spliced into the URI by the engine factory.

* * *

## DEFAULT\_SERVER\_ID

constant

```python
DEFAULT_SERVER_ID = 512
```

Default MySQL replica `server_id` for the binlog stream (512). Each concurrent CDC replica must use a unique id across the cluster.

* * *

## DestCfgKey

type\_alias

```python
DestCfgKey: Literal['mysql.logging_level', 'tabsdata.sql.write_engine', 'tabsdata.sql.chunk_size']
```

* * *

## DestCfgSpec

type\_alias

```python
DestCfgSpec: Mapping[DestCfgKey, Any]
```

**Resolved type:**

```python
Mapping[Literal['mysql.logging_level', 'tabsdata.sql.write_engine', 'tabsdata.sql.chunk_size'], Any]
```

* * *

## IfTableExistsSpec

type\_alias

```python
IfTableExistsSpec: Literal['append', 'replace']
```

Write disposition when the target table exists: `"append"` adds rows; `"replace"` truncates before insert.

* * *

## MySQLCdcStartFromSpec

type\_alias

```python
MySQLCdcStartFromSpec: Union[Literal['full'], RelativePositionSpec, GtidPosition, BinlogPosition, TimestampPosition]
```

**Resolved type:**

```python
Literal['full'] |
Literal['head', 'tail'] |
GtidPosition |
BinlogPosition |
TimestampPosition
```

Where a MySQL CDC stream begins: `"full"` (a snapshot of every tracked table, then the changes after it), a `"head"` / `"tail"` keyword, a [`GtidPosition`](https://docs.tabsdata.com/api/category/connectors/source/gtidposition), a [`BinlogPosition`](https://docs.tabsdata.com/api/category/connectors/source/binlogposition) or a `TimestampPosition`.

* * *

## MySQLTableNameSpec

type\_alias

```python
MySQLTableNameSpec: str
```

A MySQL table name, either `table` or `database.table` (at most two dot-separated parts). Parts may be backtick-quoted, using the doubled-backtick convention to embed a literal backtick.

* * *

## MySQLTableNamesSpec

type\_alias

```python
MySQLTableNamesSpec: list[MySQLTableNameSpec]
```

**Resolved type:**

```python
list[str]
```

A list of MySQL table names (see [`MySQLTableNameSpec`](https://docs.tabsdata.com/api/module/tabsdatak-conn-mysql#tabsdatak.conn.mysql.MySQLTableNameSpec)).

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

Relative CDC start position: `"head"` rewinds to the oldest change still in binlog retention; `"tail"` skips to the live edge (only later changes are emitted).

* * *

## SrcCfgKey

type\_alias

```python
SrcCfgKey: Literal['mysql.logging_level', 'tabsdata.sql.read_engine', 'tabsdata.sql.chunk_size', 'tabsdata.src_metadata.drop']
```

* * *

## SrcCfgSpec

type\_alias

```python
SrcCfgSpec: Mapping[SrcCfgKey, Any]
```

**Resolved type:**

```python
Mapping[Literal['mysql.logging_level', 'tabsdata.sql.read_engine', 'tabsdata.sql.chunk_size', 'tabsdata.src_metadata.drop'], Any]
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

A SQLAlchemy-style MySQL URI, e.g. `mysql+mysqlconnector://host:port/db`. The scheme must be `mysql` or `mariadb` (an optional `+driver` is allowed). Accepts a plain string or a [`Secret`](https://docs.tabsdata.com/api/category/connectors/credentials/secret).

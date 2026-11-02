# tabsdatak.conn.oracle

> tabsdatak.conn.oracle API reference.

Source: https://docs.tabsdata.com/api/module/tabsdatak-conn-oracle

|  |  |
| --- | --- |
| [`CredentialsSpec`](#tabsdatak.conn.oracle.CredentialsSpec) | The credential type for Oracle connections: `UserPassword` (user + password), spliced into the URI by the engine factory. |
| [`DestCfgKey`](#tabsdatak.conn.oracle.DestCfgKey) |  |
| [`DestCfgSpec`](#tabsdatak.conn.oracle.DestCfgSpec) |  |
| [`IfTableExistsSpec`](#tabsdatak.conn.oracle.IfTableExistsSpec) | Write disposition when the target table exists: `"append"` adds rows; `"replace"` truncates before insert. |
| [`OracleDest`](https://docs.tabsdata.com/api/category/connectors/destination/oracledest) | Oracle destination for `@subscriber` -- one target table per slot. |
| [`OracleDestConn`](https://docs.tabsdata.com/api/category/connectors/destination/oracledestconn) | Oracle connection used by `OracleDest`. |
| [`OracleSrc`](https://docs.tabsdata.com/api/category/connectors/source/oraclesrc) | Oracle source for `@publisher` -- one output slot per query. |
| [`OracleSrcConn`](https://docs.tabsdata.com/api/category/connectors/source/oraclesrcconn) | Oracle connection used by `OracleSrc`. |
| [`OracleTableNameSpec`](#tabsdatak.conn.oracle.OracleTableNameSpec) | An Oracle table name, either `table` or `schema.table` (at most two dot-separated parts). |
| [`OracleTableNamesSpec`](#tabsdatak.conn.oracle.OracleTableNamesSpec) | A list of Oracle table names (see `OracleTableNameSpec`). |
| [`QueriesSpec`](#tabsdatak.conn.oracle.QueriesSpec) | A non-empty, ordered list of SELECT statements -- one output slot per query. |
| [`SrcCfgKey`](#tabsdatak.conn.oracle.SrcCfgKey) |  |
| [`SrcCfgSpec`](#tabsdatak.conn.oracle.SrcCfgSpec) |  |
| [`UriSpec`](#tabsdatak.conn.oracle.UriSpec) | A SQLAlchemy-style Oracle URI, e.g. |

* * *

## CredentialsSpec

type\_alias

```python
CredentialsSpec: UserPassword
```

The credential type for Oracle connections: [`UserPassword`](https://docs.tabsdata.com/api/category/connectors/credentials/userpassword) (user + password), spliced into the URI by the engine factory.

* * *

## DestCfgKey

type\_alias

```python
DestCfgKey: Literal['oracle.logging_level', 'tabsdata.sql.write_engine', 'tabsdata.sql.chunk_size']
```

* * *

## DestCfgSpec

type\_alias

```python
DestCfgSpec: Mapping[DestCfgKey, Any]
```

**Resolved type:**

```python
Mapping[Literal['oracle.logging_level', 'tabsdata.sql.write_engine', 'tabsdata.sql.chunk_size'], Any]
```

* * *

## IfTableExistsSpec

type\_alias

```python
IfTableExistsSpec: Literal['append', 'replace']
```

Write disposition when the target table exists: `"append"` adds rows; `"replace"` truncates before insert.

* * *

## OracleTableNameSpec

type\_alias

```python
OracleTableNameSpec: str
```

An Oracle table name, either `table` or `schema.table` (at most two dot-separated parts). Parts may be double-quoted; Oracle has no way to embed a literal double-quote inside a quoted identifier.

* * *

## OracleTableNamesSpec

type\_alias

```python
OracleTableNamesSpec: list[OracleTableNameSpec]
```

**Resolved type:**

```python
list[str]
```

A list of Oracle table names (see [`OracleTableNameSpec`](https://docs.tabsdata.com/api/module/tabsdatak-conn-oracle#tabsdatak.conn.oracle.OracleTableNameSpec)).

* * *

## QueriesSpec

type\_alias

```python
QueriesSpec: list[str]
```

A non-empty, ordered list of SELECT statements -- one output slot per query.

* * *

## SrcCfgKey

type\_alias

```python
SrcCfgKey: Literal['oracle.logging_level', 'tabsdata.sql.read_engine', 'tabsdata.sql.chunk_size', 'tabsdata.src_metadata.drop']
```

* * *

## SrcCfgSpec

type\_alias

```python
SrcCfgSpec: Mapping[SrcCfgKey, Any]
```

**Resolved type:**

```python
Mapping[Literal['oracle.logging_level', 'tabsdata.sql.read_engine', 'tabsdata.sql.chunk_size', 'tabsdata.src_metadata.drop'], Any]
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

A SQLAlchemy-style Oracle URI, e.g. `oracle+oracledb://host:port/service`. The scheme must be `oracle` (an optional `+driver` is allowed). Accepts a plain string or a [`Secret`](https://docs.tabsdata.com/api/category/connectors/credentials/secret).

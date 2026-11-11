# tabsdatak.conn.mssql

> tabsdatak.conn.mssql API reference.

Source: https://docs.tabsdata.com/api/module/tabsdatak-conn-mssql

|  |  |
| --- | --- |
| [`CredentialsSpec`](#tabsdatak.conn.mssql.CredentialsSpec) | The credential type for MSSQL connections: `UserPassword` (user + password). |
| [`DestCfgKey`](#tabsdatak.conn.mssql.DestCfgKey) |  |
| [`DestCfgSpec`](#tabsdatak.conn.mssql.DestCfgSpec) |  |
| [`IfTableExistsSpec`](#tabsdatak.conn.mssql.IfTableExistsSpec) |  |
| [`MSSQLDest`](https://docs.tabsdata.com/api/category/connectors/destination/mssqldest) | MSSQL destination for `@subscriber` -- one output slot per table. |
| [`MSSQLDestConn`](https://docs.tabsdata.com/api/category/connectors/destination/mssqldestconn) | MSSQL connection used by `MSSQLDest`. |
| [`MSSQLSrc`](https://docs.tabsdata.com/api/category/connectors/source/mssqlsrc) | MSSQL source for `@publisher` -- one output slot per query. |
| [`MSSQLSrcConn`](https://docs.tabsdata.com/api/category/connectors/source/mssqlsrcconn) | MSSQL connection used by `MSSQLSrc`. |
| [`MSSQLTableNameSpec`](#tabsdatak.conn.mssql.MSSQLTableNameSpec) |  |
| [`MSSQLTableNamesSpec`](#tabsdatak.conn.mssql.MSSQLTableNamesSpec) | A list of MSSQL table names (see `MSSQLTableNameSpec`), each at most once: names that differ only in quoting or in case are the same table, as SQL Server's default collation ignores the case of a name, quoted or not. |
| [`QueriesSpec`](#tabsdatak.conn.mssql.QueriesSpec) |  |
| [`SchemaEvolutionSpec`](#tabsdatak.conn.mssql.SchemaEvolutionSpec) |  |
| [`SrcCfgKey`](#tabsdatak.conn.mssql.SrcCfgKey) |  |
| [`SrcCfgSpec`](#tabsdatak.conn.mssql.SrcCfgSpec) |  |
| [`UriSpec`](#tabsdatak.conn.mssql.UriSpec) |  |

* * *

## CredentialsSpec

type\_alias

```python
CredentialsSpec: UserPassword
```

The credential type for MSSQL connections: [`UserPassword`](https://docs.tabsdata.com/api/category/connectors/credentials/userpassword) (user + password).

* * *

## DestCfgKey

type\_alias

```python
DestCfgKey: Literal['mssql.logging_level', 'mssql.schema_evolution_engine', 'tabsdata.sql.write_engine', 'tabsdata.sql.chunk_size']
```

* * *

## DestCfgSpec

type\_alias

```python
DestCfgSpec: Mapping[DestCfgKey, Any]
```

**Resolved type:**

```python
Mapping[Literal['mssql.logging_level', 'mssql.schema_evolution_engine', 'tabsdata.sql.write_engine', 'tabsdata.sql.chunk_size'], Any]
```

* * *

## IfTableExistsSpec

type\_alias

```python
IfTableExistsSpec: Literal['append', 'replace']
```

* * *

## MSSQLTableNameSpec

type\_alias

```python
MSSQLTableNameSpec: str
```

* * *

## MSSQLTableNamesSpec

type\_alias

```python
MSSQLTableNamesSpec: list[MSSQLTableNameSpec]
```

**Resolved type:**

```python
list[str]
```

A list of MSSQL table names (see [`MSSQLTableNameSpec`](https://docs.tabsdata.com/api/module/tabsdatak-conn-mssql#tabsdatak.conn.mssql.MSSQLTableNameSpec)), each at most once: names that differ only in quoting or in case are the same table, as SQL Server's default collation ignores the case of a name, quoted or not.

* * *

## QueriesSpec

type\_alias

```python
QueriesSpec: list[str]
```

* * *

## SchemaEvolutionSpec

type\_alias

```python
SchemaEvolutionSpec: Literal['strict', 'update']
```

* * *

## SrcCfgKey

type\_alias

```python
SrcCfgKey: Literal['mssql.logging_level', 'tabsdata.sql.read_engine', 'tabsdata.sql.chunk_size', 'tabsdata.src_metadata.drop']
```

* * *

## SrcCfgSpec

type\_alias

```python
SrcCfgSpec: Mapping[SrcCfgKey, Any]
```

**Resolved type:**

```python
Mapping[Literal['mssql.logging_level', 'tabsdata.sql.read_engine', 'tabsdata.sql.chunk_size', 'tabsdata.src_metadata.drop'], Any]
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

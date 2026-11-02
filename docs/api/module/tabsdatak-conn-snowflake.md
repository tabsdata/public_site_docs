# tabsdatak.conn.snowflake

> tabsdatak.conn.snowflake API reference.

Source: https://docs.tabsdata.com/api/module/tabsdatak-conn-snowflake

|  |  |
| --- | --- |
| [`AccountSpec`](#tabsdatak.conn.snowflake.AccountSpec) |  |
| [`CredentialsSpec`](#tabsdatak.conn.snowflake.CredentialsSpec) | The credential type for Snowflake connections: `UserPassword` (user + password / PAT). |
| [`DestCfgKey`](#tabsdatak.conn.snowflake.DestCfgKey) |  |
| [`DestCfgSpec`](#tabsdatak.conn.snowflake.DestCfgSpec) |  |
| [`IdentifierSpec`](#tabsdatak.conn.snowflake.IdentifierSpec) |  |
| [`IfTableExistsSpec`](#tabsdatak.conn.snowflake.IfTableExistsSpec) |  |
| [`MergeCfg`](https://docs.tabsdata.com/api/category/connectors/destination/mergecfg-snowflake) | How `if_table_exists="merge"` matches incoming rows onto a target table. |
| [`MergeCfgSpec`](#tabsdatak.conn.snowflake.MergeCfgSpec) | One `MergeCfg` per entry in `SnowflakeDest.tables`, in the same order. |
| [`MergeColumnSpec`](#tabsdatak.conn.snowflake.MergeColumnSpec) |  |
| [`MergeColumnsSpec`](#tabsdatak.conn.snowflake.MergeColumnsSpec) |  |
| [`NameSpec`](#tabsdatak.conn.snowflake.NameSpec) |  |
| [`SchemaEvolutionEngineSpec`](#tabsdatak.conn.snowflake.SchemaEvolutionEngineSpec) | Which machinery evolves the target's schema. |
| [`SchemaEvolutionSpec`](#tabsdatak.conn.snowflake.SchemaEvolutionSpec) |  |
| [`SnowflakeColumnSpec`](#tabsdatak.conn.snowflake.SnowflakeColumnSpec) |  |
| [`SnowflakeDest`](https://docs.tabsdata.com/api/category/connectors/destination/snowflakedest) | Snowflake destination for `@subscriber` -- one output slot per table. |
| [`SnowflakeDestConn`](https://docs.tabsdata.com/api/category/connectors/destination/snowflakedestconn) | Snowflake account connection. |
| [`SnowflakeTableNameSpec`](#tabsdatak.conn.snowflake.SnowflakeTableNameSpec) |  |
| [`SnowflakeTableNamesSpec`](#tabsdatak.conn.snowflake.SnowflakeTableNamesSpec) |  |

* * *

## AccountSpec

type\_alias

```python
AccountSpec: StrOrSecretSpec
```

**Resolved type:**

```python
str | Secret
```

* * *

## CredentialsSpec

type\_alias

```python
CredentialsSpec: UserPassword
```

The credential type for Snowflake connections: [`UserPassword`](https://docs.tabsdata.com/api/category/connectors/credentials/userpassword) (user + password / PAT).

* * *

## DestCfgKey

type\_alias

```python
DestCfgKey: Literal['snowflake.logging_level', 'snowflake.schema_evolution_engine']
```

* * *

## DestCfgSpec

type\_alias

```python
DestCfgSpec: Mapping[DestCfgKey, Any]
```

**Resolved type:**

```python
Mapping[Literal['snowflake.logging_level', 'snowflake.schema_evolution_engine'], Any]
```

* * *

## IdentifierSpec

type\_alias

```python
IdentifierSpec: StrOrSecretSpec
```

**Resolved type:**

```python
str | Secret
```

* * *

## IfTableExistsSpec

type\_alias

```python
IfTableExistsSpec: Literal['append', 'replace', 'merge']
```

* * *

## MergeCfgSpec

type\_alias

```python
MergeCfgSpec: list[MergeCfg]
```

One `MergeCfg` per entry in `SnowflakeDest.tables`, in the same order.

A list even for a single table, so that reading a merge config off a destination never depends on how many tables it happens to write.

* * *

## MergeColumnSpec

type\_alias

```python
MergeColumnSpec: SnowflakeColumnSpec
```

**Resolved type:**

```python
str
```

* * *

## MergeColumnsSpec

type\_alias

```python
MergeColumnsSpec: list[SnowflakeColumnSpec]
```

**Resolved type:**

```python
list[str]
```

* * *

## NameSpec

type\_alias

```python
NameSpec: IdentifierSpec
```

**Resolved type:**

```python
str | Secret
```

* * *

## SchemaEvolutionEngineSpec

type\_alias

```python
SchemaEvolutionEngineSpec: Literal['native', 'iceberg']
```

Which machinery evolves the target's schema. `"native"` leans on Snowflake's own `ENABLE_SCHEMA_EVOLUTION`, which `COPY INTO` honours; `"iceberg"` has the connector diff the target against the incoming file and emit the `ALTER` statements itself.

* * *

## SchemaEvolutionSpec

type\_alias

```python
SchemaEvolutionSpec: Literal['update', 'strict']
```

* * *

## SnowflakeColumnSpec

type\_alias

```python
SnowflakeColumnSpec: str
```

* * *

## SnowflakeTableNameSpec

type\_alias

```python
SnowflakeTableNameSpec: str
```

* * *

## SnowflakeTableNamesSpec

type\_alias

```python
SnowflakeTableNamesSpec: list[SnowflakeTableNameSpec]
```

**Resolved type:**

```python
list[str]
```

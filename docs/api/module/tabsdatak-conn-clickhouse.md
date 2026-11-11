# tabsdatak.conn.clickhouse

> tabsdatak.conn.clickhouse API reference.

Source: https://docs.tabsdata.com/api/module/tabsdatak-conn-clickhouse

|  |  |
| --- | --- |
| [`AzBlobLocation`](https://docs.tabsdata.com/api/category/connectors/destination/azbloblocation-clickhouse) | Azure Blob staging area for `ClickHouseDest`. |
| [`ClickHouseDest`](https://docs.tabsdata.com/api/category/connectors/destination/clickhousedest) | ClickHouse destination for `@subscriber` -- one output slot per table. |
| [`ClickHouseDestConn`](https://docs.tabsdata.com/api/category/connectors/destination/clickhousedestconn) | ClickHouse connection. |
| [`ClickHouseTableNameSpec`](#tabsdatak.conn.clickhouse.ClickHouseTableNameSpec) |  |
| [`ClickHouseTableNamesSpec`](#tabsdatak.conn.clickhouse.ClickHouseTableNamesSpec) | A list of ClickHouse table names (see `ClickHouseTableNameSpec`), each at most once: names that differ only in quoting, or in the case of an unquoted part (unchanged, as ClickHouse names are case-sensitive), are the same table. |
| [`CloudLocation`](https://docs.tabsdata.com/api/category/connectors/destination/cloudlocation-clickhouse) | Abstract base for a ClickHouse `staging` cloud location. |
| [`CredentialsSpec`](#tabsdatak.conn.clickhouse.CredentialsSpec) | The credential type for ClickHouse connections: `UserPassword` (user + password). |
| [`DatabaseSpec`](#tabsdatak.conn.clickhouse.DatabaseSpec) |  |
| [`DestCfgKey`](#tabsdatak.conn.clickhouse.DestCfgKey) |  |
| [`DestCfgSpec`](#tabsdatak.conn.clickhouse.DestCfgSpec) |  |
| [`GCSLocation`](https://docs.tabsdata.com/api/category/connectors/destination/gcslocation-clickhouse) | GCS staging area for `ClickHouseDest`. |
| [`IfTableExistsSpec`](#tabsdatak.conn.clickhouse.IfTableExistsSpec) |  |
| [`S3Location`](https://docs.tabsdata.com/api/category/connectors/destination/s3location-clickhouse) | S3 staging area for `ClickHouseDest`. |
| [`SchemaEvolutionEngineSpec`](#tabsdatak.conn.clickhouse.SchemaEvolutionEngineSpec) | Which machinery evolves the target's schema. |
| [`SchemaEvolutionSpec`](#tabsdatak.conn.clickhouse.SchemaEvolutionSpec) |  |

* * *

## ClickHouseTableNameSpec

type\_alias

```python
ClickHouseTableNameSpec: str
```

* * *

## ClickHouseTableNamesSpec

type\_alias

```python
ClickHouseTableNamesSpec: list[ClickHouseTableNameSpec]
```

**Resolved type:**

```python
list[str]
```

A list of ClickHouse table names (see [`ClickHouseTableNameSpec`](https://docs.tabsdata.com/api/module/tabsdatak-conn-clickhouse#tabsdatak.conn.clickhouse.ClickHouseTableNameSpec)), each at most once: names that differ only in quoting, or in the case of an unquoted part (unchanged, as ClickHouse names are case-sensitive), are the same table.

* * *

## CredentialsSpec

type\_alias

```python
CredentialsSpec: UserPassword
```

The credential type for ClickHouse connections: [`UserPassword`](https://docs.tabsdata.com/api/category/connectors/credentials/userpassword) (user + password).

* * *

## DatabaseSpec

type\_alias

```python
DatabaseSpec: StrOrSecretSpec
```

**Resolved type:**

```python
str | Secret
```

* * *

## DestCfgKey

type\_alias

```python
DestCfgKey: Literal['clickhouse.logging_level', 'clickhouse.schema_evolution_engine']
```

* * *

## DestCfgSpec

type\_alias

```python
DestCfgSpec: Mapping[DestCfgKey, Any]
```

**Resolved type:**

```python
Mapping[Literal['clickhouse.logging_level', 'clickhouse.schema_evolution_engine'], Any]
```

* * *

## IfTableExistsSpec

type\_alias

```python
IfTableExistsSpec: Literal['append', 'replace']
```

* * *

## SchemaEvolutionEngineSpec

type\_alias

```python
SchemaEvolutionEngineSpec: Literal['iceberg']
```

Which machinery evolves the target's schema. ClickHouse has no schema evolution of its own, so the only engine is `"iceberg"`: the connector diffs the target against the incoming batch and emits the `ALTER` statements itself.

* * *

## SchemaEvolutionSpec

type\_alias

```python
SchemaEvolutionSpec: Literal['strict', 'update']
```

# tabsdatak.conn.starrocks

> tabsdatak.conn.starrocks API reference.

Source: https://docs.tabsdata.com/api/module/tabsdatak-conn-starrocks

|  |  |
| --- | --- |
| [`AzBlobLocation`](https://docs.tabsdata.com/api/category/connectors/destination/azbloblocation-starrocks) | Azure Blob staging area for `StarRocksDest`. |
| [`CloudLocation`](https://docs.tabsdata.com/api/category/connectors/destination/cloudlocation-starrocks) | Abstract base for a StarRocks `staging` cloud location. |
| [`CredentialsSpec`](#tabsdatak.conn.starrocks.CredentialsSpec) | The credential type for StarRocks connections: `UserPassword` (user + password). |
| [`DatabaseSpec`](#tabsdatak.conn.starrocks.DatabaseSpec) |  |
| [`DestCfgKey`](#tabsdatak.conn.starrocks.DestCfgKey) |  |
| [`DestCfgSpec`](#tabsdatak.conn.starrocks.DestCfgSpec) |  |
| [`GCSLocation`](https://docs.tabsdata.com/api/category/connectors/destination/gcslocation-starrocks) | GCS staging area for `StarRocksDest`. |
| [`IfTableExistsSpec`](#tabsdatak.conn.starrocks.IfTableExistsSpec) |  |
| [`S3Location`](https://docs.tabsdata.com/api/category/connectors/destination/s3location-starrocks) | S3 staging area for `StarRocksDest`. |
| [`SchemaEvolutionSpec`](#tabsdatak.conn.starrocks.SchemaEvolutionSpec) |  |
| [`StarRocksDest`](https://docs.tabsdata.com/api/category/connectors/destination/starrocksdest) | StarRocks destination for `@subscriber` -- one output slot per table. |
| [`StarRocksDestConn`](https://docs.tabsdata.com/api/category/connectors/destination/starrocksdestconn) | StarRocks connection. |
| [`StarRocksTableNameSpec`](#tabsdatak.conn.starrocks.StarRocksTableNameSpec) |  |
| [`StarRocksTableNamesSpec`](#tabsdatak.conn.starrocks.StarRocksTableNamesSpec) |  |

* * *

## CredentialsSpec

type\_alias

```python
CredentialsSpec: UserPassword
```

The credential type for StarRocks connections: [`UserPassword`](https://docs.tabsdata.com/api/category/connectors/credentials/userpassword) (user + password).

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
DestCfgKey: Literal['starrocks.logging_level']
```

* * *

## DestCfgSpec

type\_alias

```python
DestCfgSpec: Mapping[DestCfgKey, Any]
```

**Resolved type:**

```python
Mapping[Literal['starrocks.logging_level'], Any]
```

* * *

## IfTableExistsSpec

type\_alias

```python
IfTableExistsSpec: Literal['append', 'replace']
```

* * *

## SchemaEvolutionSpec

type\_alias

```python
SchemaEvolutionSpec: Literal['strict', 'iceberg']
```

* * *

## StarRocksTableNameSpec

type\_alias

```python
StarRocksTableNameSpec: str
```

* * *

## StarRocksTableNamesSpec

type\_alias

```python
StarRocksTableNamesSpec: list[StarRocksTableNameSpec]
```

**Resolved type:**

```python
list[str]
```

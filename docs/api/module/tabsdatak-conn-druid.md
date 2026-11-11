# tabsdatak.conn.druid

> tabsdatak.conn.druid API reference.

Source: https://docs.tabsdata.com/api/module/tabsdatak-conn-druid

|  |  |
| --- | --- |
| [`AzBlobLocation`](https://docs.tabsdata.com/api/category/connectors/destination/azbloblocation-druid) | Azure Blob staging area for `DruidDest`. |
| [`CloudLocation`](https://docs.tabsdata.com/api/category/connectors/destination/cloudlocation-druid) | Abstract base for a `DruidDest` cloud staging area. |
| [`CredentialsSpec`](#tabsdatak.conn.druid.CredentialsSpec) |  |
| [`DatasourceSpec`](#tabsdatak.conn.druid.DatasourceSpec) |  |
| [`DestCfgKey`](#tabsdatak.conn.druid.DestCfgKey) |  |
| [`DestCfgSpec`](#tabsdatak.conn.druid.DestCfgSpec) |  |
| [`DruidDest`](https://docs.tabsdata.com/api/category/connectors/destination/druiddest) | Druid destination for `@subscriber` -- one slot per datasource. |
| [`DruidDestConn`](https://docs.tabsdata.com/api/category/connectors/destination/druiddestconn) | Druid Overlord connection used by `DruidDest`. |
| [`DruidTableNameSpec`](#tabsdatak.conn.druid.DruidTableNameSpec) |  |
| [`DruidTableNamesSpec`](#tabsdatak.conn.druid.DruidTableNamesSpec) | A list of Druid datasources (see `DruidTableNameSpec`), each at most once; datasource names are case-sensitive. |
| [`IfTableExistsSpec`](#tabsdatak.conn.druid.IfTableExistsSpec) |  |
| [`S3Location`](https://docs.tabsdata.com/api/category/connectors/destination/s3location-druid) | S3 staging area for `DruidDest`. |
| [`SegmentGranularitySpec`](#tabsdatak.conn.druid.SegmentGranularitySpec) |  |
| [`UrlSpec`](#tabsdatak.conn.druid.UrlSpec) |  |

* * *

## CredentialsSpec

type\_alias

```python
CredentialsSpec: UserPassword
```

* * *

## DatasourceSpec

type\_alias

```python
DatasourceSpec: str
```

* * *

## DestCfgKey

type\_alias

```python
DestCfgKey: Literal['druid.logging_level', 'druid.poll_interval_seconds', 'druid.retry_attempts', 'druid.retry_backoff_seconds']
```

* * *

## DestCfgSpec

type\_alias

```python
DestCfgSpec: Mapping[DestCfgKey, Any]
```

**Resolved type:**

```python
Mapping[Literal['druid.logging_level', 'druid.poll_interval_seconds', 'druid.retry_attempts', 'druid.retry_backoff_seconds'], Any]
```

* * *

## DruidTableNameSpec

type\_alias

```python
DruidTableNameSpec: DatasourceSpec
```

**Resolved type:**

```python
str
```

* * *

## DruidTableNamesSpec

type\_alias

```python
DruidTableNamesSpec: list[DruidTableNameSpec]
```

**Resolved type:**

```python
list[str]
```

A list of Druid datasources (see [`DruidTableNameSpec`](https://docs.tabsdata.com/api/module/tabsdatak-conn-druid#tabsdatak.conn.druid.DruidTableNameSpec)), each at most once; datasource names are case-sensitive.

* * *

## IfTableExistsSpec

type\_alias

```python
IfTableExistsSpec: Literal['append', 'replace']
```

* * *

## SegmentGranularitySpec

type\_alias

```python
SegmentGranularitySpec: Literal['ALL', 'NONE', 'SECOND', 'MINUTE', 'FIFTEEN_MINUTE', 'THIRTY_MINUTE', 'HOUR', 'SIX_HOUR', 'DAY', 'WEEK', 'MONTH', 'QUARTER', 'YEAR']
```

* * *

## UrlSpec

type\_alias

```python
UrlSpec: StrOrSecretSpec
```

**Resolved type:**

```python
str | Secret
```

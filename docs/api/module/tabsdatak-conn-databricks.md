# tabsdatak.conn.databricks

> tabsdatak.conn.databricks API reference.

Source: https://docs.tabsdata.com/api/module/tabsdatak-conn-databricks

|  |  |
| --- | --- |
| [`CredentialsSpec`](#tabsdatak.conn.databricks.CredentialsSpec) | The credential type for Databricks connections: a bare `Secret` holding the personal access token (PAT). |
| [`DatabricksColumnSpec`](#tabsdatak.conn.databricks.DatabricksColumnSpec) |  |
| [`DatabricksDest`](https://docs.tabsdata.com/api/category/connectors/destination/databricksdest) | Databricks destination for `@subscriber` -- one output slot per table. |
| [`DatabricksDestConn`](https://docs.tabsdata.com/api/category/connectors/destination/databricksdestconn) | Databricks workspace connection used by `DatabricksDest`. |
| [`DatabricksSrc`](https://docs.tabsdata.com/api/category/connectors/source/databrickssrc) | Databricks source for `@publisher` -- one output slot per query. |
| [`DatabricksSrcConn`](https://docs.tabsdata.com/api/category/connectors/source/databrickssrcconn) | Databricks workspace connection used by `DatabricksSrc`. |
| [`DatabricksTableNameSpec`](#tabsdatak.conn.databricks.DatabricksTableNameSpec) |  |
| [`DatabricksTableNamesSpec`](#tabsdatak.conn.databricks.DatabricksTableNamesSpec) |  |
| [`DatabricksTokenSpec`](#tabsdatak.conn.databricks.DatabricksTokenSpec) |  |
| [`DestCfgKey`](#tabsdatak.conn.databricks.DestCfgKey) |  |
| [`DestCfgSpec`](#tabsdatak.conn.databricks.DestCfgSpec) |  |
| [`HostUrlSpec`](#tabsdatak.conn.databricks.HostUrlSpec) |  |
| [`IdentifierSpec`](#tabsdatak.conn.databricks.IdentifierSpec) |  |
| [`IfTableExistsSpec`](#tabsdatak.conn.databricks.IfTableExistsSpec) |  |
| [`MergeCfg`](https://docs.tabsdata.com/api/category/connectors/destination/mergecfg-databricks) | How `if_table_exists="merge"` matches incoming rows onto a target table. |
| [`MergeCfgSpec`](#tabsdatak.conn.databricks.MergeCfgSpec) | One `MergeCfg` per entry in `DatabricksDest.tables`, in the same order. |
| [`MergeColumnSpec`](#tabsdatak.conn.databricks.MergeColumnSpec) |  |
| [`MergeColumnsSpec`](#tabsdatak.conn.databricks.MergeColumnsSpec) |  |
| [`QueriesSpec`](#tabsdatak.conn.databricks.QueriesSpec) |  |
| [`SchemaEvolutionSpec`](#tabsdatak.conn.databricks.SchemaEvolutionSpec) |  |
| [`SrcCfgKey`](#tabsdatak.conn.databricks.SrcCfgKey) |  |
| [`SrcCfgSpec`](#tabsdatak.conn.databricks.SrcCfgSpec) |  |
| [`VolumeSpec`](#tabsdatak.conn.databricks.VolumeSpec) |  |
| [`WarehouseIdSpec`](#tabsdatak.conn.databricks.WarehouseIdSpec) |  |
| [`WarehouseSpec`](#tabsdatak.conn.databricks.WarehouseSpec) |  |

* * *

## CredentialsSpec

type\_alias

```python
CredentialsSpec: DatabricksTokenSpec
```

**Resolved type:**

```python
Secret
```

The credential type for Databricks connections: a bare [`Secret`](https://docs.tabsdata.com/api/category/connectors/credentials/secret) holding the personal access token (PAT).

* * *

## DatabricksColumnSpec

type\_alias

```python
DatabricksColumnSpec: str
```

* * *

## DatabricksTableNameSpec

type\_alias

```python
DatabricksTableNameSpec: str
```

* * *

## DatabricksTableNamesSpec

type\_alias

```python
DatabricksTableNamesSpec: list[DatabricksTableNameSpec]
```

**Resolved type:**

```python
list[str]
```

* * *

## DatabricksTokenSpec

type\_alias

```python
DatabricksTokenSpec: Secret
```

* * *

## DestCfgKey

type\_alias

```python
DestCfgKey: Literal['databricks.logging_level']
```

* * *

## DestCfgSpec

type\_alias

```python
DestCfgSpec: Mapping[DestCfgKey, Any]
```

**Resolved type:**

```python
Mapping[Literal['databricks.logging_level'], Any]
```

* * *

## HostUrlSpec

type\_alias

```python
HostUrlSpec: Secret
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

One `MergeCfg` per entry in `DatabricksDest.tables`, in the same order.

A list even for a single table, so that reading a merge config off a destination never depends on how many tables it happens to write.

* * *

## MergeColumnSpec

type\_alias

```python
MergeColumnSpec: DatabricksColumnSpec
```

**Resolved type:**

```python
str
```

* * *

## MergeColumnsSpec

type\_alias

```python
MergeColumnsSpec: list[DatabricksColumnSpec]
```

**Resolved type:**

```python
list[str]
```

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
SchemaEvolutionSpec: Literal['update', 'strict']
```

* * *

## SrcCfgKey

type\_alias

```python
SrcCfgKey: Literal['databricks.logging_level', 'tabsdata.src_metadata.drop']
```

* * *

## SrcCfgSpec

type\_alias

```python
SrcCfgSpec: Mapping[SrcCfgKey, Any]
```

**Resolved type:**

```python
Mapping[Literal['databricks.logging_level', 'tabsdata.src_metadata.drop'], Any]
```

* * *

## VolumeSpec

type\_alias

```python
VolumeSpec: StrOrSecretSpec
```

**Resolved type:**

```python
str | Secret
```

* * *

## WarehouseIdSpec

type\_alias

```python
WarehouseIdSpec: StrOrSecretSpec
```

**Resolved type:**

```python
str | Secret
```

* * *

## WarehouseSpec

type\_alias

```python
WarehouseSpec: StrOrSecretSpec
```

**Resolved type:**

```python
str | Secret
```

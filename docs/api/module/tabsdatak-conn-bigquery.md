# tabsdatak.conn.bigquery

> tabsdatak.conn.bigquery API reference.

Source: https://docs.tabsdata.com/api/module/tabsdatak-conn-bigquery

|  |  |
| --- | --- |
| [`BigQueryColumnSpec`](#tabsdatak.conn.bigquery.BigQueryColumnSpec) |  |
| [`BigQueryDest`](https://docs.tabsdata.com/api/category/connectors/destination/bigquerydest) | BigQuery destination for `@subscriber` -- one output slot per table. |
| [`BigQueryDestConn`](https://docs.tabsdata.com/api/category/connectors/destination/bigquerydestconn) | BigQuery connection. |
| [`BigQueryTableNameSpec`](#tabsdatak.conn.bigquery.BigQueryTableNameSpec) |  |
| [`BigQueryTableNamesSpec`](#tabsdatak.conn.bigquery.BigQueryTableNamesSpec) | A list of BigQuery table names (see `BigQueryTableNameSpec`), each at most once; table names are case-sensitive. |
| [`CloudLocation`](https://docs.tabsdata.com/api/category/connectors/destination/cloudlocation-bigquery) | Abstract base for a BigQuery `staging` location. |
| [`CredentialsSpec`](#tabsdatak.conn.bigquery.CredentialsSpec) | The credential type for BigQuery connections: `GCPJson` (service-account JSON key). |
| [`DatasetSpec`](#tabsdatak.conn.bigquery.DatasetSpec) |  |
| [`DestCfgKey`](#tabsdatak.conn.bigquery.DestCfgKey) |  |
| [`DestCfgSpec`](#tabsdatak.conn.bigquery.DestCfgSpec) |  |
| [`GCSLocation`](https://docs.tabsdata.com/api/category/connectors/destination/gcslocation-bigquery) | GCS staging area for `BigQueryDest`. |
| [`IfTableExistsSpec`](#tabsdatak.conn.bigquery.IfTableExistsSpec) |  |
| [`MergeCfg`](https://docs.tabsdata.com/api/category/connectors/destination/mergecfg-bigquery) | How `if_table_exists="merge"` matches incoming rows onto a target table. |
| [`MergeCfgSpec`](#tabsdatak.conn.bigquery.MergeCfgSpec) | One `MergeCfg` per entry in `BigQueryDest.tables`, in the same order. |
| [`MergeColumnSpec`](#tabsdatak.conn.bigquery.MergeColumnSpec) |  |
| [`MergeColumnsSpec`](#tabsdatak.conn.bigquery.MergeColumnsSpec) |  |
| [`ProjectSpec`](#tabsdatak.conn.bigquery.ProjectSpec) |  |
| [`SchemaEvolutionEngineSpec`](#tabsdatak.conn.bigquery.SchemaEvolutionEngineSpec) | Which machinery evolves the target's schema. |
| [`SchemaEvolutionSpec`](#tabsdatak.conn.bigquery.SchemaEvolutionSpec) |  |

* * *

## BigQueryColumnSpec

type\_alias

```python
BigQueryColumnSpec: str
```

* * *

## BigQueryTableNameSpec

type\_alias

```python
BigQueryTableNameSpec: str
```

* * *

## BigQueryTableNamesSpec

type\_alias

```python
BigQueryTableNamesSpec: list[BigQueryTableNameSpec]
```

**Resolved type:**

```python
list[str]
```

A list of BigQuery table names (see [`BigQueryTableNameSpec`](https://docs.tabsdata.com/api/module/tabsdatak-conn-bigquery#tabsdatak.conn.bigquery.BigQueryTableNameSpec)), each at most once; table names are case-sensitive.

* * *

## CredentialsSpec

type\_alias

```python
CredentialsSpec: GCPJson
```

The credential type for BigQuery connections: [`GCPJson`](https://docs.tabsdata.com/api/category/connectors/credentials/gcpjson) (service-account JSON key).

* * *

## DatasetSpec

type\_alias

```python
DatasetSpec: StrOrSecretSpec
```

**Resolved type:**

```python
str | Secret
```

* * *

## DestCfgKey

type\_alias

```python
DestCfgKey: Literal['bigquery.logging_level', 'bigquery.schema_evolution_engine']
```

* * *

## DestCfgSpec

type\_alias

```python
DestCfgSpec: Mapping[DestCfgKey, Any]
```

**Resolved type:**

```python
Mapping[Literal['bigquery.logging_level', 'bigquery.schema_evolution_engine'], Any]
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

One `MergeCfg` per entry in `BigQueryDest.tables`, in the same order.

A list even for a single table, so that reading a merge config off a destination never depends on how many tables it happens to write.

* * *

## MergeColumnSpec

type\_alias

```python
MergeColumnSpec: BigQueryColumnSpec
```

**Resolved type:**

```python
str
```

* * *

## MergeColumnsSpec

type\_alias

```python
MergeColumnsSpec: list[BigQueryColumnSpec]
```

**Resolved type:**

```python
list[str]
```

* * *

## ProjectSpec

type\_alias

```python
ProjectSpec: StrOrSecretSpec
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

Which machinery evolves the target's schema. `"native"` leans on BigQuery's own `schema_update_options` on the load job; `"iceberg"` has the connector diff the target against the incoming batch and emit the `ALTER` statements itself.

* * *

## SchemaEvolutionSpec

type\_alias

```python
SchemaEvolutionSpec: Literal['update', 'strict']
```

# tabsdatak.conn.gcs

> tabsdatak.conn.gcs API reference.

Source: https://docs.tabsdata.com/api/module/tabsdatak-conn-gcs

|  |  |
| --- | --- |
| [`CredentialsSpec`](#tabsdatak.conn.gcs.CredentialsSpec) | The credential type for GCS connections: `GCPJson` (a GCP service-account JSON key). |
| [`DestCfgKey`](#tabsdatak.conn.gcs.DestCfgKey) |  |
| [`DestCfgSpec`](#tabsdatak.conn.gcs.DestCfgSpec) |  |
| [`GCSDest`](https://docs.tabsdata.com/api/category/connectors/destination/gcsdest) | GCS destination for `@subscriber` -- one target file per path. |
| [`GCSDestConn`](https://docs.tabsdata.com/api/category/connectors/destination/gcsdestconn) | GCS connection used by `GCSDest`. |
| [`GCSSrc`](https://docs.tabsdata.com/api/category/connectors/source/gcssrc) | GCS source for `@publisher` -- one output slot per path. |
| [`GCSSrcConn`](https://docs.tabsdata.com/api/category/connectors/source/gcssrcconn) | GCS connection used by `GCSSrc`. |
| [`ProjectSpec`](#tabsdatak.conn.gcs.ProjectSpec) | A GCP project id: any non-empty string. |
| [`SrcCfgKey`](#tabsdatak.conn.gcs.SrcCfgKey) |  |
| [`SrcCfgSpec`](#tabsdatak.conn.gcs.SrcCfgSpec) |  |

* * *

## CredentialsSpec

type\_alias

```python
CredentialsSpec: GCPJson
```

The credential type for GCS connections: [`GCPJson`](https://docs.tabsdata.com/api/category/connectors/credentials/gcpjson) (a GCP service-account JSON key).

* * *

## DestCfgKey

type\_alias

```python
DestCfgKey: Literal['tabsdata.file.chunk_size']
```

* * *

## DestCfgSpec

type\_alias

```python
DestCfgSpec: Mapping[DestCfgKey, Any]
```

**Resolved type:**

```python
Mapping[Literal['tabsdata.file.chunk_size'], Any]
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

A GCP project id: any non-empty string. Accepts a plain string or a [`Secret`](https://docs.tabsdata.com/api/category/connectors/credentials/secret).

* * *

## SrcCfgKey

type\_alias

```python
SrcCfgKey: Literal['tabsdata.file.chunk_size', 'tabsdata.src_metadata.drop']
```

* * *

## SrcCfgSpec

type\_alias

```python
SrcCfgSpec: Mapping[SrcCfgKey, Any]
```

**Resolved type:**

```python
Mapping[Literal['tabsdata.file.chunk_size', 'tabsdata.src_metadata.drop'], Any]
```

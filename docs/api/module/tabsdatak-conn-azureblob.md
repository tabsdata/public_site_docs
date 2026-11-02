# tabsdatak.conn.azureblob

> tabsdatak.conn.azureblob API reference.

Source: https://docs.tabsdata.com/api/module/tabsdatak-conn-azureblob

|  |  |
| --- | --- |
| [`AzureBlobDest`](https://docs.tabsdata.com/api/category/connectors/destination/azureblobdest) | Azure Blob destination for `@subscriber` -- one target file per path. |
| [`AzureBlobDestConn`](https://docs.tabsdata.com/api/category/connectors/destination/azureblobdestconn) | Azure Blob connection used by `AzureBlobDest`. |
| [`AzureBlobSrc`](https://docs.tabsdata.com/api/category/connectors/source/azureblobsrc) | Azure Blob source for `@publisher` -- one output slot per path. |
| [`AzureBlobSrcConn`](https://docs.tabsdata.com/api/category/connectors/source/azureblobsrcconn) | Azure Blob connection used by `AzureBlobSrc`. |
| [`CredentialsSpec`](#tabsdatak.conn.azureblob.CredentialsSpec) | The credential type for Azure Blob connections: `AzureAccountKey` (storage account name + account key). |
| [`DestCfgKey`](#tabsdatak.conn.azureblob.DestCfgKey) |  |
| [`DestCfgSpec`](#tabsdatak.conn.azureblob.DestCfgSpec) |  |
| [`SrcCfgKey`](#tabsdatak.conn.azureblob.SrcCfgKey) |  |
| [`SrcCfgSpec`](#tabsdatak.conn.azureblob.SrcCfgSpec) |  |

* * *

## CredentialsSpec

type\_alias

```python
CredentialsSpec: AzureAccountKey
```

The credential type for Azure Blob connections: [`AzureAccountKey`](https://docs.tabsdata.com/api/category/connectors/credentials/azureaccountkey) (storage account name + account key).

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

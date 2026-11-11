# AzBlobLocation

> Azure Blob staging area for `ClickHouseDest`.

Source: https://docs.tabsdata.com/api/category/connectors/destination/azbloblocation-clickhouse

class

```python
class AzBlobLocation(
    container: AzContainerSpec,
    credentials: AzureAccountKey,
    base_path: CloudRelativePathSpec = '/',
    cfg: CfgSpec | None = None,
)
```

Bases: [CloudLocation](https://docs.tabsdata.com/api/category/connectors/destination/cloudlocation-clickhouse)

**Categories:** destination

Azure Blob staging area for [`ClickHouseDest`](https://docs.tabsdata.com/api/category/connectors/destination/clickhousedest).

The plugin uploads parquet to the container, then references it via ClickHouse's `azureBlobStorage()` table function to ingest it.

## Parameters

parameter

`container`[AzContainerSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-common-types#tabsdatak.conn.common.types.AzContainerSpec) ([str](https://docs.python.org/3/library/stdtypes.html#str) | [Secret](https://docs.tabsdata.com/api/category/connectors/credentials/secret))

A valid Azure Blob container name.

parameter

`credentials`[AzureAccountKey](https://docs.tabsdata.com/api/category/connectors/credentials/azureaccountkey)

Azure storage account name / key credentials.

parameter

`base_path`[CloudRelativePathSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-common-types#tabsdatak.conn.common.types.CloudRelativePathSpec) ([str](https://docs.python.org/3/library/stdtypes.html#str) | [Secret](https://docs.tabsdata.com/api/category/connectors/credentials/secret))

Blob-name prefix from the container root; starts with `/`, has no trailing `/` and no empty segments (`//`) (the leading `/` is trimmed when forming the blob name). Defaults to `/`.

parameter

`cfg`[CfgSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-common-types#tabsdatak.conn.common.types.CfgSpec) | None ([dict](https://docs.python.org/3/library/stdtypes.html#dict) | None)

Optional config dict; its `obstore.*` keys configure the store parquet is staged through. `obstore.endpoint` (e.g. Azurite) also becomes the account URL ClickHouse reads the staged file from.

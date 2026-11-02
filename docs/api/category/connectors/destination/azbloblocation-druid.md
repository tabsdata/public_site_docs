# AzBlobLocation

> Azure Blob staging area for `DruidDest`.

Source: https://docs.tabsdata.com/api/category/connectors/destination/azbloblocation-druid

class

```python
class AzBlobLocation(
    container: AzContainerSpec,
    credentials: AzureAccountKey,
    base_path: CloudRelativePathSpec = '/',
    cfg: CfgSpec | None = None,
)
```

Bases: [CloudLocation](https://docs.tabsdata.com/api/category/connectors/destination/cloudlocation-druid)

**Categories:** destination

Azure Blob staging area for [`DruidDest`](https://docs.tabsdata.com/api/category/connectors/destination/druiddest).

The plugin uploads parquet to the container, then issues a Druid ingestion spec referencing the Azure input source.

## Parameters

parameter

`container`[AzContainerSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-common-types#tabsdatak.conn.common.types.AzContainerSpec) ([str](https://docs.python.org/3/library/stdtypes.html#str) | [Secret](https://docs.tabsdata.com/api/category/connectors/credentials/secret))

A valid Azure Blob container name.

parameter

`credentials`[AzureAccountKey](https://docs.tabsdata.com/api/category/connectors/credentials/azureaccountkey)

[`AzureAccountKey`](https://docs.tabsdata.com/api/category/connectors/credentials/azureaccountkey) storage-account credentials.

parameter

`base_path`[CloudRelativePathSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-common-types#tabsdatak.conn.common.types.CloudRelativePathSpec) ([str](https://docs.python.org/3/library/stdtypes.html#str) | [Secret](https://docs.tabsdata.com/api/category/connectors/credentials/secret))

Path prefix from the container root; starts with `/`, has no trailing `/` and no empty segments (`//`) (the leading `/` is trimmed when forming the blob name). Defaults to `/`.

parameter

`cfg`[CfgSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-common-types#tabsdatak.conn.common.types.CfgSpec) | None ([dict](https://docs.python.org/3/library/stdtypes.html#dict) | None)

Optional connector config for the Azure Blob client (see [`CfgSpec`](https://docs.tabsdata.com/api/module/tabsdatak-conn-common-types#tabsdatak.conn.common.types.CfgSpec)).

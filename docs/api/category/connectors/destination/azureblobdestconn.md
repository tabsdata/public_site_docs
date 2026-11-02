# AzureBlobDestConn

> Azure Blob connection used by `AzureBlobDest`.

Source: https://docs.tabsdata.com/api/category/connectors/destination/azureblobdestconn

class

```python
class AzureBlobDestConn(
    container: AzContainerSpec,
    credentials: CredentialsSpec,
    base_path: CloudRelativePathSpec = '/',
    conn_cfg: CfgSpec | None = None,
)
```

Bases: [Conn](https://docs.tabsdata.com/api/category/spi/spi/conn)

**Categories:** destination

Azure Blob connection used by [`AzureBlobDest`](https://docs.tabsdata.com/api/category/connectors/destination/azureblobdest).

Field-identical to [`AzureBlobSrcConn`](https://docs.tabsdata.com/api/category/connectors/source/azureblobsrcconn) but a distinct class; source and destination connections are separate types and cannot be used in place of one another. See [`AzureBlobSrcConn`](https://docs.tabsdata.com/api/category/connectors/source/azureblobsrcconn) for the field meanings.

## Parameters

parameter

`container`[AzContainerSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-common-types#tabsdatak.conn.common.types.AzContainerSpec) ([str](https://docs.python.org/3/library/stdtypes.html#str) | [Secret](https://docs.tabsdata.com/api/category/connectors/credentials/secret))

parameter

`credentials`[CredentialsSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-azureblob#tabsdatak.conn.azureblob.CredentialsSpec) ([AzureAccountKey](https://docs.tabsdata.com/api/category/connectors/credentials/azureaccountkey))

parameter

`base_path`[CloudRelativePathSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-common-types#tabsdatak.conn.common.types.CloudRelativePathSpec) ([str](https://docs.python.org/3/library/stdtypes.html#str) | [Secret](https://docs.tabsdata.com/api/category/connectors/credentials/secret))

parameter

`conn_cfg`[CfgSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-common-types#tabsdatak.conn.common.types.CfgSpec) | None ([dict](https://docs.python.org/3/library/stdtypes.html#dict) | None)

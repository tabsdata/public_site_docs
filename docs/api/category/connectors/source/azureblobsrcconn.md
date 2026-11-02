# AzureBlobSrcConn

> Azure Blob connection used by `AzureBlobSrc`.

Source: https://docs.tabsdata.com/api/category/connectors/source/azureblobsrcconn

class

```python
class AzureBlobSrcConn(
    container: AzContainerSpec,
    credentials: CredentialsSpec,
    base_path: CloudRelativePathSpec = '/',
    conn_cfg: CfgSpec | None = None,
)
```

Bases: [Conn](https://docs.tabsdata.com/api/category/spi/spi/conn)

**Categories:** source

Azure Blob connection used by [`AzureBlobSrc`](https://docs.tabsdata.com/api/category/connectors/source/azureblobsrc).

Registered on a collection; the runtime resolves it and hands it to the plugin at run time. Each field accepts a plain string or a [`Secret`](https://docs.tabsdata.com/api/category/connectors/credentials/secret).

## Parameters

parameter

`container`[AzContainerSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-common-types#tabsdatak.conn.common.types.AzContainerSpec) ([str](https://docs.python.org/3/library/stdtypes.html#str) | [Secret](https://docs.tabsdata.com/api/category/connectors/credentials/secret))

A valid Azure Blob container name: 3-63 characters, lowercase letters and digits with single (non-leading, non-trailing) hyphens.

parameter

`credentials`[CredentialsSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-azureblob#tabsdatak.conn.azureblob.CredentialsSpec) ([AzureAccountKey](https://docs.tabsdata.com/api/category/connectors/credentials/azureaccountkey))

Azure [`AzureAccountKey`](https://docs.tabsdata.com/api/category/connectors/credentials/azureaccountkey) credentials (account name

-   account key).

parameter

`base_path`[CloudRelativePathSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-common-types#tabsdatak.conn.common.types.CloudRelativePathSpec) ([str](https://docs.python.org/3/library/stdtypes.html#str) | [Secret](https://docs.tabsdata.com/api/category/connectors/credentials/secret))

Blob-name prefix from the container root; starts with `/`, has no trailing `/` and no empty segments (`//`) (the leading `/` is trimmed when forming the blob name). Defaults to `/`.

parameter

`conn_cfg`[CfgSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-common-types#tabsdatak.conn.common.types.CfgSpec) | None ([dict](https://docs.python.org/3/library/stdtypes.html#dict) | None)

Optional connector-config dict (see [`CfgSpec`](https://docs.tabsdata.com/api/module/tabsdatak-conn-common-types#tabsdatak.conn.common.types.CfgSpec)).

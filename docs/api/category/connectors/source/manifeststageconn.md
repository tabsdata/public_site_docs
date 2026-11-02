# ManifestStageConn

> Connection for `ManifestStageSrc` -- one stage backend.

Source: https://docs.tabsdata.com/api/category/connectors/source/manifeststageconn

class

```python
class ManifestStageConn(
    local: LocalFileSrcConn | None,
    s3: S3SrcConn | None,
    az: AzureBlobSrcConn | None,
    gcs: GCSSrcConn | None,
)
```

Bases: [Conn](https://docs.tabsdata.com/api/category/spi/spi/conn)

**Categories:** source

Connection for [`ManifestStageSrc`](https://docs.tabsdata.com/api/category/connectors/source/manifeststagesrc) -- one stage backend.

Exactly one of `local` / `s3` / `az` / `gcs` must be set; it points at the stage root the streamer pod writes to. The others stay `None`.

## Parameters

parameter

`local`[LocalFileSrcConn](https://docs.tabsdata.com/api/category/connectors/source/localfilesrcconn) | None

parameter

`s3`[S3SrcConn](https://docs.tabsdata.com/api/category/connectors/source/s3srcconn) | None

parameter

`az`[AzureBlobSrcConn](https://docs.tabsdata.com/api/category/connectors/source/azureblobsrcconn) | None

parameter

`gcs`[GCSSrcConn](https://docs.tabsdata.com/api/category/connectors/source/gcssrcconn) | None

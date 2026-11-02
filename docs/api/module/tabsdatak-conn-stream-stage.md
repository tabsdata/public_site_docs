# tabsdatak.conn.stream.stage

> tabsdatak.conn.stream.stage API reference.

Source: https://docs.tabsdata.com/api/module/tabsdatak-conn-stream-stage

|  |  |
| --- | --- |
| [`logger`](#tabsdatak.conn.stream.stage.logger) |  |
| [`ManifestStageConn`](https://docs.tabsdata.com/api/category/connectors/source/manifeststageconn) | Connection for `ManifestStageSrc` -- one stage backend. |
| [`ManifestStageSrc`](https://docs.tabsdata.com/api/category/connectors/source/manifeststagesrc) | Stream-stage source -- materialises the files in one manifest. |
| [`ManifestStageSrcPlugin`](#tabsdatak.conn.stream.stage.ManifestStageSrcPlugin) |  |

* * *

## logger

attribute

```python
logger = logging.getLogger(__name__)
```

* * *

## ManifestStageSrcPlugin

class

```python
class ManifestStageSrcPlugin
```

Bases: [SrcPlugin](https://docs.tabsdata.com/api/category/spi/spi/srcplugin)

method

`read_in`

```python
def read_in(
    ctx: SrcPluginCtx,
    conn: ManifestStageConn,
    src: ManifestStageSrc,
) -> list[list[TableFileInput]]
```

**Parameters:**

parameter

`ctx`[SrcPluginCtx](https://docs.tabsdata.com/api/category/spi/spi/srcpluginctx)

parameter

`conn`[ManifestStageConn](https://docs.tabsdata.com/api/category/connectors/source/manifeststageconn)

parameter

`src`[ManifestStageSrc](https://docs.tabsdata.com/api/category/connectors/source/manifeststagesrc)

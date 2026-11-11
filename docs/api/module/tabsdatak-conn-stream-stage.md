# tabsdatak.conn.stream.stage

> tabsdatak.conn.stream.stage API reference.

Source: https://docs.tabsdata.com/api/module/tabsdatak-conn-stream-stage

|  |  |
| --- | --- |
| [`logger`](#tabsdatak.conn.stream.stage.logger) |  |
| [`ManifestStageSrcPlugin`](#tabsdatak.conn.stream.stage.ManifestStageSrcPlugin) |  |
| [`StageConnection`](#tabsdatak.conn.stream.stage.StageConnection) |  |

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
    conn: _StreamStageSrcConn,
    src: StreamStageSrc,
) -> list[Iterable[LazyFrameInput]]
```

**Parameters:**

parameter

`ctx`[SrcPluginCtx](https://docs.tabsdata.com/api/category/spi/spi/srcpluginctx)

parameter

`conn`\_StreamStageSrcConn

parameter

`src`[StreamStageSrc](https://docs.tabsdata.com/api/category/spi/spi/streamstagesrc)

method

`next_manifest`

```python
def next_manifest(ctx: SrcPluginCtx, location: StorageLocation, root: str) -> str | None
```

**Parameters:**

parameter

`ctx`[SrcPluginCtx](https://docs.tabsdata.com/api/category/spi/spi/srcpluginctx)

parameter

`location`StorageLocation

parameter

`root`[str](https://docs.python.org/3/builtins/stdtypes.html#str)

method

`read_manifest`

```python
def read_manifest(location: StorageLocation, path: str) -> list[list[str]]
```

**Parameters:**

parameter

`location`StorageLocation

parameter

`path`[str](https://docs.python.org/3/builtins/stdtypes.html#str)

method

`table`

```python
def table(location: StorageLocation, root: str, name: str) -> LazyFrameInput
```

**Parameters:**

parameter

`location`StorageLocation

parameter

`root`[str](https://docs.python.org/3/builtins/stdtypes.html#str)

parameter

`name`[str](https://docs.python.org/3/builtins/stdtypes.html#str)

* * *

## StageConnection

class

```python
class StageConnection(location: StorageLocation)
```

Bases: [Protocol](https://docs.python.org/3/library/typing.html#typing.Protocol)

**Parameters:**

parameter

`location`StorageLocation

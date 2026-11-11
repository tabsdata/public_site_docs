# StageFileStats

> One table file `StreamSrcPluginCtx.stage` wrote to the stage.

Source: https://docs.tabsdata.com/api/category/spi/spi/stagefilestats

class

```python
class StageFileStats(name: str, rows: int, bytes: int)
```

**Categories:** spi

One table file `StreamSrcPluginCtx.stage` wrote to the stage.

## Parameters

parameter

`name`[str](https://docs.python.org/3/builtins/stdtypes.html#str)

The file's name in its batch, not its full location.

parameter

`rows`[int](https://docs.python.org/3/builtins/functions.html#int)

The rows it holds.

parameter

`bytes`[int](https://docs.python.org/3/builtins/functions.html#int)

Its size on the stage.

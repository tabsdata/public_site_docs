# StreamSrcPlugin

> Plugin implementing the long-running side of a `StreamSrc` subclass (CDC, log tail, queue tail).

Source: https://docs.tabsdata.com/api/category/spi/spi/streamsrcplugin

class

```python
class StreamSrcPlugin
```

Bases: [ABC](https://docs.python.org/3/library/abc.html#abc.ABC)

**Categories:** spi

Plugin implementing the long-running side of a [`StreamSrc`](https://docs.tabsdata.com/api/category/connectors/source/streamsrc) subclass (CDC, log tail, queue tail).

## Methods

method

`run`

```python
def run(ctx: StreamSrcPluginCtx, conn: C, stream_src: SS)
```

Drive the change stream until `ctx.active` flips to `False` or a signal arrives. Implementations seed from config when `ctx.first_stage` else from `ctx.stream_state`, then call `ctx.stage` for batches as they complete (honouring `ctx.thresholds`).

**Parameters:**

parameter

`ctx`[StreamSrcPluginCtx](https://docs.tabsdata.com/api/category/spi/spi/streamsrcpluginctx)

parameter

`conn`C

parameter

`stream_src`SS

# PluginCtx

> Common context surface shared by every plugin variant (batch source, stream source, destination).

Source: https://docs.tabsdata.com/api/category/spi/spi/pluginctx

class

```python
class PluginCtx
```

Bases: [FlowCtx](https://docs.tabsdata.com/api/category/spi/spi/flowctx), [ABC](https://docs.python.org/3/library/abc.html#abc.ABC)

**Categories:** spi

Common context surface shared by every plugin variant (batch source, stream source, destination).

Extends [`FlowCtx`](https://docs.tabsdata.com/api/category/spi/spi/flowctx) with the per-trx working directory where the plugin materialises parquet files.

## Properties

property

`work_dir`[Path](https://docs.python.org/3/library/pathlib.html#pathlib.Path)

Per-trx scratch directory the plugin writes parquet to. Cleaned up by the runtime after the trx completes.

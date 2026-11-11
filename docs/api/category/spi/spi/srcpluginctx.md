# SrcPluginCtx

> Context handed to `SrcPlugin.read_in` -- combines `TransactionCtx` (trx identifiers + per-flow attributes) with `PluginCtx` (flow identifiers + work dir).

Source: https://docs.tabsdata.com/api/category/spi/spi/srcpluginctx

class

```python
class SrcPluginCtx
```

Bases: [TransactionCtx](https://docs.tabsdata.com/api/module/tabsdatak-api#tabsdatak.api.TransactionCtx), [PluginCtx](https://docs.tabsdata.com/api/category/spi/spi/pluginctx), [ABC](https://docs.python.org/3/library/abc.html#abc.ABC)

**Categories:** spi

Context handed to `SrcPlugin.read_in` -- combines [`TransactionCtx`](https://docs.tabsdata.com/api/module/tabsdatak-api#tabsdatak.api.TransactionCtx) (trx identifiers + per-flow attributes) with [`PluginCtx`](https://docs.tabsdata.com/api/category/spi/spi/pluginctx) (flow identifiers + work dir).

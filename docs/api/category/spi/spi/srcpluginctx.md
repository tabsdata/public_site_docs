# SrcPluginCtx

> Context handed to `SrcPlugin.read_in` -- combines `TrxCtx` (trx identifiers + scratch state) with `PluginCtx` (flow identifiers + work dir).

Source: https://docs.tabsdata.com/api/category/spi/spi/srcpluginctx

class

```python
class SrcPluginCtx
```

Bases: [TrxCtx](https://docs.tabsdata.com/api/module/tabsdatak-api#tabsdatak.api.TrxCtx), [PluginCtx](https://docs.tabsdata.com/api/category/spi/spi/pluginctx), [ABC](https://docs.python.org/3/library/abc.html#abc.ABC)

**Categories:** spi

Context handed to `SrcPlugin.read_in` -- combines [`TrxCtx`](https://docs.tabsdata.com/api/module/tabsdatak-api#tabsdatak.api.TrxCtx) (trx identifiers + scratch state) with [`PluginCtx`](https://docs.tabsdata.com/api/category/spi/spi/pluginctx) (flow identifiers + work dir).

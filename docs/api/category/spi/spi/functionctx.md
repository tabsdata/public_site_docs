# FunctionCtx

> Context handed to a user-decorated function (`@publisher` / `@transformer` / `@subscriber`) that declares a trailing `ctx` parameter.

Source: https://docs.tabsdata.com/api/category/spi/spi/functionctx

class

```python
class FunctionCtx
```

Bases: [TrxCtx](https://docs.tabsdata.com/api/module/tabsdatak-api#tabsdatak.api.TrxCtx), [FlowCtx](https://docs.tabsdata.com/api/category/spi/spi/flowctx), [ABC](https://docs.python.org/3/library/abc.html#abc.ABC)

**Categories:** spi

Context handed to a user-decorated function (`@publisher` / `@transformer` / `@subscriber`) that declares a trailing `ctx` parameter.

Combines [`TrxCtx`](https://docs.tabsdata.com/api/module/tabsdatak-api#tabsdatak.api.TrxCtx) (trx identifiers + per-flow scratch state via `get_attr` / `set_attr`) with [`FlowCtx`](https://docs.tabsdata.com/api/category/spi/spi/flowctx) (flow identifiers), so the function can read state from the previous run and persist state for the next. Unlike [`SrcPluginCtx`](https://docs.tabsdata.com/api/category/spi/spi/srcpluginctx) / [`DestContext`](https://docs.tabsdata.com/api/category/spi/spi/destcontext) it does not inherit [`PluginCtx`](https://docs.tabsdata.com/api/category/spi/spi/pluginctx) -- user functions never see plugin-only surface such as `work_dir`.

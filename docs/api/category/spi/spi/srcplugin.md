# SrcPlugin

> Plugin implementing the read-side of a `Src` subclass.

Source: https://docs.tabsdata.com/api/category/spi/spi/srcplugin

class

```python
class SrcPlugin
```

Bases: [ABC](https://docs.python.org/3/library/abc.html#abc.ABC)

**Categories:** spi

Plugin implementing the read-side of a [`Src`](https://docs.tabsdata.com/api/category/connectors/source/src) subclass.

## Methods

method

`read_in`

```python
def read_in(ctx: SrcPluginCtx, conn: C, src: S) -> list[list[TableFileInput]]
```

Materialise `src`'s output slots to parquet under `ctx.work_dir`.

**Parameters:**

parameter

`ctx`[SrcPluginCtx](https://docs.tabsdata.com/api/category/spi/spi/srcpluginctx)

The [`SrcPluginCtx`](https://docs.tabsdata.com/api/category/spi/spi/srcpluginctx) for this trx (work dir, state).

parameter

`conn`C

The resolved connection.

parameter

`src`S

The [`Src`](https://docs.tabsdata.com/api/category/connectors/source/src) config declared on the flow.

**Returns:**

One inner list of [`TableFileInput`](https://docs.tabsdata.com/api/category/spi/spi/tablefileinput) per output slot. In

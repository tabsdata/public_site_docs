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

The return annotation of `read_in` is the plugin's contract with the runtime: `list[Iterable[LazyFrameInput]]` returns `LazyFrame`\\ s, which the runtime lands as `read_in` produces them; `list[list[TableFileInput]]`, or no annotation, is the legacy form, local parquet files.

## Methods

method

`read_in`

```python
def read_in(ctx: SrcPluginCtx, conn: C, src: S) -> SrcTablesSpec
```

Read `src` into the publisher's inputs.

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

One entry per input, by position: position `i` is the `i`\-th

# DestPlugin

> Plugin implementing the write-side of a `Dest` subclass.

Source: https://docs.tabsdata.com/api/category/spi/spi/destplugin

class

```python
class DestPlugin
```

Bases: [ABC](https://docs.python.org/3/library/abc.html#abc.ABC), [Generic](https://docs.python.org/3/library/typing.html#typing.Generic)

**Categories:** spi

Plugin implementing the write-side of a [`Dest`](https://docs.tabsdata.com/api/category/connectors/destination/dest) subclass.

The third type argument is the plugin's contract with the runtime: `list[pl.LazyFrame]` (`DestPlugin[MyConn, MyDest, list[pl.LazyFrame]]`) receives each of the subscriber's outputs as a `LazyFrame` scanning it from storage, and `write_out`'s `tables` is annotated with the same type. Without it, the legacy form, `tables` is a list of local parquet files. [`DestDef`](https://docs.tabsdata.com/api/category/spi/spi/destdef) refuses any other type, and a `tables` annotation that differs. Import polars at module level, so the annotation resolves at runtime.

## Methods

method

`write_out`

```python
def write_out(ctx: DestContext, conn: _C, dest: _D, tables: _T)
```

Push the subscriber's outputs in `tables` to `dest`.

**Parameters:**

parameter

`ctx`[DestContext](https://docs.tabsdata.com/api/category/spi/spi/destcontext)

The [`DestContext`](https://docs.tabsdata.com/api/category/spi/spi/destcontext) for this trx.

parameter

`conn`\_C

The resolved connection.

parameter

`dest`\_D

The [`Dest`](https://docs.tabsdata.com/api/category/connectors/destination/dest) config declared on the flow.

parameter

`tables`\_T

One table per target, by position, in the form the plugin declares: `LazyFrame`s, or local parquet files. The runtime guarantees as many tables as `dest`'s declared target count.

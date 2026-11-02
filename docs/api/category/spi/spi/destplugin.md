# DestPlugin

> Plugin implementing the write-side of a `Dest` subclass.

Source: https://docs.tabsdata.com/api/category/spi/spi/destplugin

class

```python
class DestPlugin
```

Bases: [ABC](https://docs.python.org/3/library/abc.html#abc.ABC)

**Categories:** spi

Plugin implementing the write-side of a [`Dest`](https://docs.tabsdata.com/api/category/connectors/destination/dest) subclass.

## Methods

method

`write_out`

```python
def write_out(ctx: DestContext, conn: C, dest: D, tables: list[TableFileSpec])
```

Push the per-slot parquet files in `tables` to `dest`.

**Parameters:**

parameter

`ctx`[DestContext](https://docs.tabsdata.com/api/category/spi/spi/destcontext)

The [`DestContext`](https://docs.tabsdata.com/api/category/spi/spi/destcontext) for this trx.

parameter

`conn`C

The resolved connection.

parameter

`dest`D

The [`Dest`](https://docs.tabsdata.com/api/category/connectors/destination/dest) config declared on the flow.

parameter

`tables`[list](https://docs.python.org/3/builtins/stdtypes.html#list)\[[TableFileSpec](https://docs.tabsdata.com/api/module/tabsdatak-spi#tabsdatak.spi.TableFileSpec)\] ([list](https://docs.python.org/3/library/stdtypes.html#list)\[Path\])

One parquet file per target; the runtime guarantees `len(tables)` equals `dest`'s declared target count.

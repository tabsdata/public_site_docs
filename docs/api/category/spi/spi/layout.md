# Layout

> How the columns of a `LazyFrameInput` frame hold its table.

Source: https://docs.tabsdata.com/api/category/spi/spi/layout

class

```python
class Layout(COLUMNAR = 'columnar', SERIALIZED = 'serialized')
```

Bases: [Enum](https://docs.python.org/3/library/enum.html#enum.Enum)

**Categories:** spi

How the columns of a [`LazyFrameInput`](https://docs.tabsdata.com/api/category/spi/spi/lazyframeinput) frame hold its table.

-   `COLUMNAR` -- One column per source column.
-   `SERIALIZED` -- One [`String`](https://docs.tabsdata.com/api/module/tabsdatak-tableframe-datatypes#tabsdatak.tableframe.datatypes.String) column with one value per source row.

## Parameters

parameter

`COLUMNAR`

parameter

`SERIALIZED`

# TableMode

> How a `SrcPlugin` returns slot contents -- the length of each inner list in `SrcPlugin.read_in`'s return.

Source: https://docs.tabsdata.com/api/category/spi/spi/tablemode

class

```python
class TableMode(SINGLE = 'single', ARRAY = 'array')
```

Bases: [Enum](https://docs.python.org/3/library/enum.html#enum.Enum)

**Categories:** spi

How a [`SrcPlugin`](https://docs.tabsdata.com/api/category/spi/spi/srcplugin) returns slot contents -- the length of each inner list in `SrcPlugin.read_in`'s return.

-   `SINGLE` -- exactly one [`TableFileInput`](https://docs.tabsdata.com/api/category/spi/spi/tablefileinput) per output slot.
-   `ARRAY` -- one or more [`TableFileInput`](https://docs.tabsdata.com/api/category/spi/spi/tablefileinput) per output slot (file-shard style).

## Parameters

parameter

`SINGLE`

parameter

`ARRAY`

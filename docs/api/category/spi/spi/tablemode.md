# TableMode

> How the data a `SrcPlugin` lands for one publisher input is served to the function.

Source: https://docs.tabsdata.com/api/category/spi/spi/tablemode

class

```python
class TableMode(SINGLE = 'single', ARRAY = 'array')
```

Bases: [Enum](https://docs.python.org/3/library/enum.html#enum.Enum)

**Categories:** spi

How the data a [`SrcPlugin`](https://docs.tabsdata.com/api/category/spi/spi/srcplugin) lands for one publisher input is served to the function. Declared once, on the [`SrcDef`](https://docs.tabsdata.com/api/category/spi/spi/srcdef).

-   `SINGLE` -- one table: the frames (or files) `read_in` returns for the input are chunks of that table, concatenated.
-   `ARRAY` -- a list of tables, one per frame (or file).

## Parameters

parameter

`SINGLE`

parameter

`ARRAY`

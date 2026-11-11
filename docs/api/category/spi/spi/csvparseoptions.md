# CsvParseOptions

> How the `String` values of a CSV source are typed.

Source: https://docs.tabsdata.com/api/category/spi/spi/csvparseoptions

class

```python
class CsvParseOptions(decimal_comma: bool = False)
```

Bases: [ParseOptions](https://docs.tabsdata.com/api/category/spi/spi/parseoptions)

**Categories:** spi

How the [`String`](https://docs.tabsdata.com/api/module/tabsdatak-tableframe-datatypes#tabsdatak.tableframe.datatypes.String) values of a CSV source are typed.

## Parameters

parameter

`decimal_comma`[bool](https://docs.python.org/3/builtins/functions.html#bool)

Floats use `,` as their decimal separator.

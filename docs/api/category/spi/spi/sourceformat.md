# SourceFormat

> The format the `String` values of a frame come from.

Source: https://docs.tabsdata.com/api/category/spi/spi/sourceformat

class

```python
class SourceFormat(CSV = 'csv', NDJSON = 'ndjson')
```

Bases: [Enum](https://docs.python.org/3/library/enum.html#enum.Enum)

**Categories:** spi

The format the [`String`](https://docs.tabsdata.com/api/module/tabsdatak-tableframe-datatypes#tabsdatak.tableframe.datatypes.String) values of a frame come from.

-   `CSV` -- Each value is a CSV cell.
-   `NDJSON` -- Each value is a JSON object.

## Parameters

parameter

`CSV`

parameter

`NDJSON`

## Properties

property

`parse_options_class`[type](https://docs.python.org/3/builtins/functions.html#type)\[[ParseOptions](https://docs.tabsdata.com/api/category/spi/spi/parseoptions)\]

The [`ParseOptions`](https://docs.tabsdata.com/api/category/spi/spi/parseoptions) subclass of the format.

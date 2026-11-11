# FrameMetadata

> How the frame of a `LazyFrameInput` is served to the function.

Source: https://docs.tabsdata.com/api/category/spi/spi/framemetadata

class

```python
class FrameMetadata(
    schema: pl.Schema | None = None,
    layout: Layout = Layout.COLUMNAR,
    format: SourceFormat | None = None,
    typed: bool = True,
    parsing: ParseOptions | None = None,
    columns: MetadataSpec | None = None,
)
```

**Categories:** spi

How the frame of a [`LazyFrameInput`](https://docs.tabsdata.com/api/category/spi/spi/lazyframeinput) is served to the function.

## Parameters

parameter

`schema`pl.Schema | None

The types each column is served with, in order. `None` serves the frame with its own types. With a schema:

-   a column already of its type is served as it is;
-   a [`String`](https://docs.tabsdata.com/api/module/tabsdatak-tableframe-datatypes#tabsdatak.tableframe.datatypes.String) column is parsed into its type;
-   any other column is cast to its type.

A value that cannot be parsed or cast fails the function.

parameter

`layout`[Layout](https://docs.tabsdata.com/api/category/spi/spi/layout)

How the frame's columns hold the table.

parameter

`format`[SourceFormat](https://docs.tabsdata.com/api/category/spi/spi/sourceformat) | None

The format the frame's [`String`](https://docs.tabsdata.com/api/module/tabsdatak-tableframe-datatypes#tabsdatak.tableframe.datatypes.String) values come from. Required by `Layout.SERIALIZED` and by untyped frames.

parameter

`typed`[bool](https://docs.python.org/3/builtins/functions.html#bool)

Whether each column holds values of its real type. `False` when other types are stored as text, such as the cells of a CSV file or the rows of an NDJSON file.

parameter

`parsing`[ParseOptions](https://docs.tabsdata.com/api/category/spi/spi/parseoptions) | None

How the format's values are split and typed, an instance of its `SourceFormat.parse_options_class`. `None` takes the format's defaults.

parameter

`columns`[MetadataSpec](https://docs.tabsdata.com/api/module/tabsdatak-spi#tabsdatak.spi.MetadataSpec) | None ([dict](https://docs.python.org/3/library/stdtypes.html#dict)\[[str](https://docs.python.org/3/library/stdtypes.html#str), [str](https://docs.python.org/3/library/stdtypes.html#str) | [int](https://docs.python.org/3/library/functions.html#int) | [float](https://docs.python.org/3/library/functions.html#float) | [bool](https://docs.python.org/3/library/functions.html#bool)\] | None)

Each entry is added as a column holding its value on every row, by convention named with a leading `@`.

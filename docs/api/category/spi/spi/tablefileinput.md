# TableFileInput

> One parquet file `SrcPlugin.read_in` produces for an output slot, paired with optional metadata to carry alongside it.

Source: https://docs.tabsdata.com/api/category/spi/spi/tablefileinput

class

```python
class TableFileInput(file: Path, metadata: MetadataSpec | None = None)
```

**Categories:** spi

One parquet file `SrcPlugin.read_in` produces for an output slot, paired with optional metadata to carry alongside it.

## Parameters

parameter

`file`[Path](https://docs.python.org/3/library/pathlib.html#pathlib.Path)

Path to the parquet file the plugin materialised under `ctx.work_dir`.

parameter

`metadata`[MetadataSpec](https://docs.tabsdata.com/api/module/tabsdatak-spi#tabsdatak.spi.MetadataSpec) | None ([dict](https://docs.python.org/3/library/stdtypes.html#dict)\[[str](https://docs.python.org/3/library/stdtypes.html#str), [str](https://docs.python.org/3/library/stdtypes.html#str) | [int](https://docs.python.org/3/library/functions.html#int) | [float](https://docs.python.org/3/library/functions.html#float) | [bool](https://docs.python.org/3/library/functions.html#bool)\] | None)

Optional per-file [`MetadataSpec`](https://docs.tabsdata.com/api/module/tabsdatak-spi#tabsdatak.spi.MetadataSpec). Each entry is added as a metadata column on `file`'s table, by convention named with a leading `@`. `None` (the common case) attaches nothing -- see [`to_table_file_inputs`](https://docs.tabsdata.com/api/category/spi/spi/to-table-file-inputs).

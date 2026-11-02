# to_table_file_inputs

> Wrap per-slot parquet paths as `TableFileInput` s with no metadata -- the shape `SrcPlugin.read_in` returns.

Source: https://docs.tabsdata.com/api/category/spi/spi/to-table-file-inputs

function

```python
def to_table_file_inputs(files: list[list[TableFileSpec]]) -> list[list[TableFileInput]]
```

**Categories:** spi

Wrap per-slot parquet paths as [`TableFileInput`](https://docs.tabsdata.com/api/category/spi/spi/tablefileinput)\\ s with no metadata -- the shape `SrcPlugin.read_in` returns.

A reader that produces bare [`TableFileSpec`](https://docs.tabsdata.com/api/module/tabsdatak-spi#tabsdatak.spi.TableFileSpec) paths funnels them through this helper; one that has per-file metadata constructs [`TableFileInput`](https://docs.tabsdata.com/api/category/spi/spi/tablefileinput) directly instead. Imported from `tabsdatak.spi`.

## Parameters

parameter

`files`[list](https://docs.python.org/3/builtins/stdtypes.html#list)\[[list](https://docs.python.org/3/builtins/stdtypes.html#list)\[[TableFileSpec](https://docs.tabsdata.com/api/module/tabsdatak-spi#tabsdatak.spi.TableFileSpec)\]\] ([list](https://docs.python.org/3/library/stdtypes.html#list)\[[list](https://docs.python.org/3/library/stdtypes.html#list)\[Path\]\])

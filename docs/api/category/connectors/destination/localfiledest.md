# LocalFileDest

> LocalFile destination for `@subscriber` -- one target file per path.

Source: https://docs.tabsdata.com/api/category/connectors/destination/localfiledest

class

```python
class LocalFileDest(
    paths: DestPathsSpec,
    format: DestFileFormat = DestFileFormat.AUTO,
    format_cfg: DestFormatCfgSpec | None = None,
    dest_cfg: DestCfgSpec | None = None,
)
```

Bases: [Dest](https://docs.tabsdata.com/api/category/connectors/destination/dest)

**Categories:** destination

LocalFile destination for `@subscriber` -- one target file per path.

## Parameters

parameter

`paths`DestPathsSpec ([list](https://docs.python.org/3/library/stdtypes.html#list)\[[str](https://docs.python.org/3/library/stdtypes.html#str)\])

Target paths relative to the connection's `base_path`, one write slot per entry. Each path is relative (no leading `/`), must not end with `/`, and must not contain empty segments (`//`). Globs are not allowed; the tokens `${EXEC_PLAN_ID}`, `${TRX_ID}` and `${EXEC_PLAN_TS}` are substituted at write time. Backslashes and NUL are not allowed.

parameter

`format`DestFileFormat

Output format -- one of `AUTO`, `CSV`, `JSON`, `AVRO`, `PARQUET`. `AUTO` (the default) infers it from the file extension.

parameter

`format_cfg`DestFormatCfgSpec | None ([dict](https://docs.python.org/3/library/stdtypes.html#dict)\[DestFileFormat, [dict](https://docs.python.org/3/library/stdtypes.html#dict)\[Literal\['separator', 'quote\_char', 'eol\_char', 'include\_header', 'datetime\_format', 'date\_format', 'time\_format', 'float\_scientific', 'float\_precision', 'null\_value', 'quote\_style', 'maintain\_order'\], [Any](https://docs.python.org/3/library/typing.html#typing.Any)\] | [dict](https://docs.python.org/3/library/stdtypes.html#dict)\] | None)

Optional per-format writer options (dest-side keys only), keyed by the `DestFileFormat`.

parameter

`dest_cfg`[DestCfgSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-localfile#tabsdatak.conn.localfile.DestCfgSpec) | None (Mapping\[Literal\['tabsdata.file.chunk\_size'\], [Any](https://docs.python.org/3/library/typing.html#typing.Any)\] | None)

Optional connector config; supports the key `tabsdata.file.chunk_size`.

## Methods

method

`validate`

```python
def validate()
```

Cross-field validation of `format_cfg` (dest side).

Called by the framework; raises `LocalFileValidateException` on failure.

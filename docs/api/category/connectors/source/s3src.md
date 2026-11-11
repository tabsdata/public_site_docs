# S3Src

> S3 source for `@publisher` -- one output slot per path.

Source: https://docs.tabsdata.com/api/category/connectors/source/s3src

class

```python
class S3Src(
    paths: SrcPathsSpec,
    format: SrcFileFormat = SrcFileFormat.AUTO,
    format_cfg: SrcFormatCfgSpec | None = None,
    initial_last_modified: datetime | None = None,
    src_cfg: SrcCfgSpec | None = None,
    purge: bool = False,
    include_compressed: bool = False,
)
```

Bases: [Src](https://docs.tabsdata.com/api/category/connectors/source/src)

**Categories:** source

S3 source for `@publisher` -- one output slot per path.

Every table this source publishes automatically carries a `@td.file.path` metadata column: the `s3://` object URI the row was read from. A path that globs several files reports the specific file each row came from, and a worksheet read from a workbook keeps its `#<n>` fragment, so the value can be pasted straight back into `paths`. Setting the `src_cfg` key `tabsdata.src_metadata.drop` to `True` leaves the column off.

## Parameters

parameter

`paths`SrcPathsSpec ([list](https://docs.python.org/3/library/stdtypes.html#list)\[[str](https://docs.python.org/3/library/stdtypes.html#str)\])

Source paths relative to the connection's `base_path`, one output slot per entry. Each path is relative (no leading `/`), must not end with `/`, and must not contain empty segments (`//`). A path may use a `*` glob in its final segment only; backslashes, NUL and `${...}` tokens are not allowed. An `.xlsx` path may end with `#<n>` to name the worksheet -- `1`\-based over every sheet the workbook declares, hidden ones included. Two paths may name different sheets of one workbook, giving a slot each.

parameter

`format`SrcFileFormat

File format, by extension:

-   `AUTO` (the default): taken from each file's extension, the one before a compression or archive extension if it ends in one (`a.json.gz` and `a.json.zip` are `JSON`). Every file a source takes must resolve to the same format, and a file whose extension names none (`a.b.zip`) fails the run. Any other format reads every file as that format, whatever its name.
-   `AVRO`: `.avro`.
-   `CSV`: `.csv`.
-   `EXCEL`: `.xlsx`; one worksheet, named by the path's `#<n>` fragment.
-   `JSON`: `.json`, `.jsonl`, `.ndjson`; one JSON object per line.
-   `LOG`: `.log`; one row per line.
-   `PARQUET`: `.parquet`, `.pq`.

parameter

`format_cfg`SrcFormatCfgSpec | None ([dict](https://docs.python.org/3/library/stdtypes.html#dict)\[SrcFileFormat, [dict](https://docs.python.org/3/library/stdtypes.html#dict)\[Literal\['separator', 'quote\_char', 'eol\_char', 'encoding', 'null\_values', 'missing\_is\_null', 'truncate\_ragged\_lines', 'comment\_prefix', 'try\_parse\_dates', 'decimal\_comma', 'has\_header', 'skip\_lines', 'skip\_rows', 'skip\_rows\_after\_header', 'raise\_if\_empty', 'ignore\_errors'\], [Any](https://docs.python.org/3/library/typing.html#typing.Any)\] | [dict](https://docs.python.org/3/library/stdtypes.html#dict)\[ExcelSrcKey, [Any](https://docs.python.org/3/library/typing.html#typing.Any)\] | [dict](https://docs.python.org/3/library/stdtypes.html#dict)\[EbcdicSrcKey, [Any](https://docs.python.org/3/library/typing.html#typing.Any)\] | [dict](https://docs.python.org/3/library/stdtypes.html#dict)\] | None)

Optional per-format reader options (source-side keys only), keyed by the `SrcFileFormat`. `EXCEL` takes `has_header` (default `True`); with `False` the first row is data and the columns are named `column_1`, `column_2`, ...

parameter

`initial_last_modified`[datetime](https://docs.python.org/3/library/datetime.html#datetime.datetime) | None

Optional cutoff for incremental ingestion. The first run imports only files modified at or after this timestamp; the cutoff then advances each run so only newer files are re-imported.

parameter

`src_cfg`[SrcCfgSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-s3#tabsdatak.conn.s3.SrcCfgSpec) | None (Mapping\[Literal\['tabsdata.file.chunk\_size', 'tabsdata.src\_metadata.drop'\], [Any](https://docs.python.org/3/library/typing.html#typing.Any)\] | None)

Optional connector config; supported keys are `tabsdata.file.chunk_size` and `tabsdata.src_metadata.drop`.

parameter

`purge`[bool](https://docs.python.org/3/builtins/functions.html#bool)

Delete each source file that is older than the incremental `initial_last_modified` cursor. Files older than the original `initial_last_modified` timestamp set at registration time are never deleted -- they were never read. Only valid when `initial_last_modified` is set; the default is `False`.

parameter

`include_compressed`[bool](https://docs.python.org/3/builtins/functions.html#bool)

Also take compressed files and archives. A path takes a file whose name matches it plus one compression or archive extension (`data/*.json` takes `a.json.gz`, not `a.json.csv`), and a file whose name ends in one only when this is `True`; a path that itself ends in one requires it. The extension alone names the codec or the archive, and the name before it the format:

-   `.br`: Brotli.
-   `.bz2`: bzip2.
-   `.gz`: gzip.
-   `.lz4`: LZ4 frame.
-   `.tar`: a tar archive holding exactly one file.
-   `.xz`: XZ.
-   `.zip`: a zip archive holding exactly one file.
-   `.zlib`: zlib.
-   `.zst`, `.zstd`: Zstandard.

A file has at most one of these extensions: an archive inside a compressed file (`a.csv.tar.gz`) is not read. Defaults to `False`.

## Methods

method

`validate`

```python
def validate()
```

Cross-field validation of `format`, `paths` and `format_cfg` (source side).

Called by the framework; raises `S3ValidateException` on failure.

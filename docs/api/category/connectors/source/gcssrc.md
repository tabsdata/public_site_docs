# GCSSrc

> GCS source for `@publisher` -- one output slot per path.

Source: https://docs.tabsdata.com/api/category/connectors/source/gcssrc

class

```python
class GCSSrc(
    paths: SrcPathsSpec,
    format: SrcFileFormat = SrcFileFormat.AUTO,
    format_cfg: SrcFormatCfgSpec | None = None,
    initial_last_modified: datetime | None = None,
    src_cfg: SrcCfgSpec | None = None,
    purge: bool = False,
)
```

Bases: [Src](https://docs.tabsdata.com/api/category/connectors/source/src)

**Categories:** source

GCS source for `@publisher` -- one output slot per path.

Every table this source publishes automatically carries a `@td.file.path` metadata column: the `gs://` object URI the row was read from. A path that globs several files reports the specific file each row came from, and a worksheet read from a workbook keeps its `#<n>` fragment, so the value can be pasted straight back into `paths`. Setting the `src_cfg` key `tabsdata.src_metadata.drop` to `True` leaves the column off.

## Examples

Read a single object, selecting the CSV format explicitly:

```python
@publisher(
    source=GCSSrc(paths=["export.csv"], format=SrcFileFormat.CSV),
    output_tables=["rows"],
)
def ingest(rows: TableFramesSpec) -> TableFrameSpec:
    return rows[0] if rows else None
```

Incremental read: only objects modified at or after the cutoff are imported, and the cutoff advances each run:

```python
@publisher(
    source=GCSSrc(
        paths=["parquet/orders.parquet"],
        initial_last_modified=datetime(2024, 1, 1, tzinfo=timezone.utc),
    ),
    output_tables=["orders"],
)
def ingest_new(orders: TableFramesSpec) -> TableFrameSpec:
    return orders[0] if orders else None
```

## Parameters

parameter

`paths`SrcPathsSpec ([list](https://docs.python.org/3/library/stdtypes.html#list)\[[str](https://docs.python.org/3/library/stdtypes.html#str)\])

Source paths relative to the connection's `base_path`, one output slot per entry. Each path is relative (no leading `/`), must not end with `/`, and must not contain empty segments (`//`). A path may use a `*` glob in its final segment only; backslashes, NUL and `${...}` tokens are not allowed. An `.xlsx` path may end with `#<n>` to name the worksheet -- `1`\-based over every sheet the workbook declares, hidden ones included. Two paths may name different sheets of one workbook, giving a slot each.

parameter

`format`SrcFileFormat

File format -- one of `AUTO`, `CSV`, `JSON`, `AVRO`, `PARQUET`, `LOG`, `EXCEL`. `AUTO` (the default) infers it from the file extension. `EXCEL` reads one worksheet of an `.xlsx` workbook, named by the path's `#<n>` fragment.

parameter

`format_cfg`SrcFormatCfgSpec | None ([dict](https://docs.python.org/3/library/stdtypes.html#dict)\[SrcFileFormat, [dict](https://docs.python.org/3/library/stdtypes.html#dict)\[Literal\['separator', 'quote\_char', 'eol\_char', 'encoding', 'null\_values', 'missing\_is\_null', 'truncate\_ragged\_lines', 'comment\_prefix', 'try\_parse\_dates', 'decimal\_comma', 'has\_header', 'skip\_rows', 'skip\_rows\_after\_header', 'raise\_if\_empty', 'ignore\_errors'\], [Any](https://docs.python.org/3/library/typing.html#typing.Any)\] | [dict](https://docs.python.org/3/library/stdtypes.html#dict)\[ExcelSrcKey, [Any](https://docs.python.org/3/library/typing.html#typing.Any)\] | [dict](https://docs.python.org/3/library/stdtypes.html#dict)\[EbcdicSrcKey, [Any](https://docs.python.org/3/library/typing.html#typing.Any)\] | [dict](https://docs.python.org/3/library/stdtypes.html#dict)\] | None)

Optional per-format reader options (source-side keys only), keyed by the `SrcFileFormat`. `EXCEL` takes `has_header` (default `True`); with `False` the first row is data and the columns are named `column_1`, `column_2`, ...

parameter

`initial_last_modified`[datetime](https://docs.python.org/3/library/datetime.html#datetime.datetime) | None

Optional cutoff for incremental ingestion. The first run imports only files modified at or after this timestamp; the cutoff then advances each run so only newer files are re-imported.

parameter

`src_cfg`[SrcCfgSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-gcs#tabsdatak.conn.gcs.SrcCfgSpec) | None (Mapping\[Literal\['tabsdata.file.chunk\_size', 'tabsdata.src\_metadata.drop'\], [Any](https://docs.python.org/3/library/typing.html#typing.Any)\] | None)

Optional connector config; supported keys are `tabsdata.file.chunk_size` and `tabsdata.src_metadata.drop`.

parameter

`purge`[bool](https://docs.python.org/3/builtins/functions.html#bool)

Delete each source file that is older than the incremental `initial_last_modified` cursor. Files older than the original `initial_last_modified` timestamp set at registration time are never deleted -- they were never read. Only valid when `initial_last_modified` is set; the default is `False`.

## Methods

method

`validate`

```python
def validate()
```

Cross-field validation of `format`, `paths` and `format_cfg` (source side).

Called by the framework; raises `GCSValidateException` on failure.

# StreamStageSrcPlugin

> Hidden batch-side (publisher) source that ingests a stream stage's manifests.

Source: https://docs.tabsdata.com/api/category/spi/spi/streamstagesrcplugin

class

```python
class StreamStageSrcPlugin
```

Bases: [SrcPlugin](https://docs.tabsdata.com/api/category/spi/spi/srcplugin)

**Categories:** spi

Hidden batch-side (publisher) source that ingests a stream stage's manifests.

A [`StreamSrcPlugin`](https://docs.tabsdata.com/api/category/spi/spi/streamsrcplugin) only _stages_ data (accumulates batches into storage and records each in a manifest); every [`StreamSrc`](https://docs.tabsdata.com/api/category/connectors/source/streamsrc) needs a paired hidden [`SrcPlugin`](https://docs.tabsdata.com/api/category/spi/spi/srcplugin) on the batch side to consume it, which must be this class or a subclass. Each execution consumes exactly one manifest -- the oldest unconsumed one -- advancing a per-flow cursor; it yields zero output slots when none remain.

The manifest scan + ingest is fixed in `read_in` and **must not be overridden**; customise the ingested data (e.g. de-duplication) by overriding `process_files` instead. To register a customised variant, pair a [`StreamStageSrc`](https://docs.tabsdata.com/api/category/spi/spi/streamstagesrc) subclass with this plugin in a [`SrcDef`](https://docs.tabsdata.com/api/category/spi/spi/srcdef) whose `cardinality` returns `-1` (disables the slot-count check) and whose `explorer` is `None`.

## Methods

method

`read_in`

```python
def read_in(
    ctx: SrcPluginCtx,
    conn: _StreamStageSrcConn,
    src: StreamStageSrc,
) -> list[list[TableFileInput]]
```

Ingest the oldest unconsumed manifest's files.

Final -- subclasses must **not** override this; customise the ingested data via `process_files` instead.

**Parameters:**

parameter

`ctx`[SrcPluginCtx](https://docs.tabsdata.com/api/category/spi/spi/srcpluginctx)

parameter

`conn`\_StreamStageSrcConn

parameter

`src`[StreamStageSrc](https://docs.tabsdata.com/api/category/spi/spi/streamstagesrc)

method

`process_files`

```python
def process_files(
    _ctx: SrcPluginCtx,
    files: list[list[TableFileInput]],
) -> list[list[TableFileInput]]
```

Hook for subclass post-processing of the ingested files (e.g. de-duplication).

Receives the per-slot file lists `read_in` materialised from the manifest and returns the per-slot file lists the plugin ultimately yields. The base implementation returns `files` unchanged.

**Parameters:**

parameter

`_ctx`[SrcPluginCtx](https://docs.tabsdata.com/api/category/spi/spi/srcpluginctx)

parameter

`files`[list](https://docs.python.org/3/builtins/stdtypes.html#list)\[[list](https://docs.python.org/3/builtins/stdtypes.html#list)\[[TableFileInput](https://docs.tabsdata.com/api/category/spi/spi/tablefileinput)\]\]

# SPI

Source: https://docs.tabsdata.com/api/category/spi/spi/

|  |  |
| --- | --- |
| [`check_plugin_param_type`](https://docs.tabsdata.com/api/category/spi/spi/check-plugin-param-type) | Validate a plugin method's parameter type matches `expected`. |
| [`Conn`](https://docs.tabsdata.com/api/category/spi/spi/conn) | Abstract base for every connection. |
| [`ConnMetaModel`](https://docs.tabsdata.com/api/category/spi/spi/connmetamodel) | Abstract base for a connection _kind_ (SQL, objects, storage, ...). |
| [`CsvParseOptions`](https://docs.tabsdata.com/api/category/spi/spi/csvparseoptions) | How the `String` values of a CSV source are typed. |
| [`DestContext`](https://docs.tabsdata.com/api/category/spi/spi/destcontext) | Context handed to `DestPlugin.write_out` -- combines `TransactionCtx` with `PluginCtx`. |
| [`DestDef`](https://docs.tabsdata.com/api/category/spi/spi/destdef) | Entry-point registration for a `Dest` binding. |
| [`DestPlugin`](https://docs.tabsdata.com/api/category/spi/spi/destplugin) | Plugin implementing the write-side of a `Dest` subclass. |
| [`Entity`](https://docs.tabsdata.com/api/category/spi/spi/entity) | Abstract base for an entity within a connection. |
| [`Explorer`](https://docs.tabsdata.com/api/category/spi/spi/explorer) | Optional connector capability for ad-hoc inspection of a live `Conn`: catalog metadata and arbitrary query execution. |
| [`FrameMetadata`](https://docs.tabsdata.com/api/category/spi/spi/framemetadata) | How the frame of a `LazyFrameInput` is served to the function. |
| [`Layout`](https://docs.tabsdata.com/api/category/spi/spi/layout) | How the columns of a `LazyFrameInput` frame hold its table. |
| [`LazyFrameInput`](https://docs.tabsdata.com/api/category/spi/spi/lazyframeinput) | One table `SrcPlugin.read_in` produces for a publisher input: its data, as a polars `LazyFrame`, and the metadata that says how to serve it. |
| [`NdjsonParseOptions`](https://docs.tabsdata.com/api/category/spi/spi/ndjsonparseoptions) | How the rows of an NDJSON source are split and typed. |
| [`ParseOptions`](https://docs.tabsdata.com/api/category/spi/spi/parseoptions) | How the `String` values of a `SourceFormat` are split and typed when served. |
| [`PluginCtx`](https://docs.tabsdata.com/api/category/spi/spi/pluginctx) | Common context surface shared by every plugin variant (batch source, stream source, destination). |
| [`SourceFormat`](https://docs.tabsdata.com/api/category/spi/spi/sourceformat) | The format the `String` values of a frame come from. |
| [`SrcDef`](https://docs.tabsdata.com/api/category/spi/spi/srcdef) | Entry-point registration for a batch `Src` binding. |
| [`SrcPlugin`](https://docs.tabsdata.com/api/category/spi/spi/srcplugin) | Plugin implementing the read-side of a `Src` subclass. |
| [`SrcPluginCtx`](https://docs.tabsdata.com/api/category/spi/spi/srcpluginctx) | Context handed to `SrcPlugin.read_in` -- combines `TransactionCtx` (trx identifiers + per-flow attributes) with `PluginCtx` (flow identifiers + work dir). |
| [`StageFileStats`](https://docs.tabsdata.com/api/category/spi/spi/stagefilestats) | One table file `StreamSrcPluginCtx.stage` wrote to the stage. |
| [`StreamSrcDef`](https://docs.tabsdata.com/api/category/spi/spi/streamsrcdef) | Entry-point registration for a `StreamSrc` binding. |
| [`StreamSrcPlugin`](https://docs.tabsdata.com/api/category/spi/spi/streamsrcplugin) | Plugin implementing the long-running side of a `StreamSrc` subclass (CDC, log tail, queue tail). |
| [`StreamSrcPluginCtx`](https://docs.tabsdata.com/api/category/spi/spi/streamsrcpluginctx) | Context handed to `StreamSrcPlugin.run` -- the plugin's long-lived control surface. |
| [`StreamStageSrc`](https://docs.tabsdata.com/api/category/spi/spi/streamstagesrc) | Config type for the hidden batch source that ingests a stream's staged manifests. |
| [`StreamStageSrcPlugin`](https://docs.tabsdata.com/api/category/spi/spi/streamstagesrcplugin) | Hidden batch-side (publisher) source that ingests a stream stage's manifests. |
| [`TableFileInput`](https://docs.tabsdata.com/api/category/spi/spi/tablefileinput) | One parquet file `SrcPlugin.read_in` produces for an output slot, paired with optional metadata to carry alongside it. |
| [`TableMode`](https://docs.tabsdata.com/api/category/spi/spi/tablemode) | How the data a `SrcPlugin` lands for one publisher input is served to the function. |
| [`to_lazy_frame_inputs`](https://docs.tabsdata.com/api/category/spi/spi/to-lazy-frame-inputs) | Wrap per-input `LazyFrame`\\ s as `LazyFrameInput`\\ s with no metadata -- the shape `SrcPlugin.read_in` returns. |
| [`to_table_file_inputs`](https://docs.tabsdata.com/api/category/spi/spi/to-table-file-inputs) | Wrap per-slot parquet paths as `TableFileInput`\\ s with no metadata -- the shape `SrcPlugin.read_in` returns. |

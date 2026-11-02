# tabsdatak.spi

> tabsdatak.spi API reference.

Source: https://docs.tabsdata.com/api/module/tabsdatak-spi

|  |  |
| --- | --- |
| [`check_plugin_param_type`](https://docs.tabsdata.com/api/category/spi/spi/check-plugin-param-type) | Validate a plugin method's parameter type matches `expected`. |
| [`CommitStateFn`](#tabsdatak.spi.CommitStateFn) |  |
| [`Conn`](https://docs.tabsdata.com/api/category/spi/spi/conn) | Abstract base for every connection. |
| [`ConnMetaModel`](https://docs.tabsdata.com/api/category/spi/spi/connmetamodel) | Abstract base for a connection _kind_ (SQL, objects, storage, ...). |
| [`DestContext`](https://docs.tabsdata.com/api/category/spi/spi/destcontext) | Context handed to `DestPlugin.write_out` -- combines `TrxCtx` with `PluginCtx`. |
| [`DestDef`](https://docs.tabsdata.com/api/category/spi/spi/destdef) | Entry-point registration for a `Dest` binding. |
| [`DestPlugin`](https://docs.tabsdata.com/api/category/spi/spi/destplugin) | Plugin implementing the write-side of a `Dest` subclass. |
| [`Entity`](https://docs.tabsdata.com/api/category/spi/spi/entity) | Abstract base for an entity within a connection. |
| [`Explorer`](https://docs.tabsdata.com/api/category/spi/spi/explorer) | Optional connector capability for ad-hoc inspection of a live `Conn`: catalog metadata and arbitrary query execution. |
| [`FilesSpec`](#tabsdatak.spi.FilesSpec) |  |
| [`FlowCtx`](https://docs.tabsdata.com/api/category/spi/spi/flowctx) | Flow-level identifiers (collection / function) shared by every role that runs inside a trx -- plugins _and_ user-decorated functions. |
| [`FunctionCtx`](https://docs.tabsdata.com/api/category/spi/spi/functionctx) | Context handed to a user-decorated function (`@publisher` / `@transformer` / `@subscriber`) that declares a trailing `ctx` parameter. |
| [`MetadataSpec`](#tabsdatak.spi.MetadataSpec) |  |
| [`PluginCtx`](https://docs.tabsdata.com/api/category/spi/spi/pluginctx) | Common context surface shared by every plugin variant (batch source, stream source, destination). |
| [`SrcDef`](https://docs.tabsdata.com/api/category/spi/spi/srcdef) | Entry-point registration for a batch `Src` binding. |
| [`SrcPlugin`](https://docs.tabsdata.com/api/category/spi/spi/srcplugin) | Plugin implementing the read-side of a `Src` subclass. |
| [`SrcPluginCtx`](https://docs.tabsdata.com/api/category/spi/spi/srcpluginctx) | Context handed to `SrcPlugin.read_in` -- combines `TrxCtx` (trx identifiers + scratch state) with `PluginCtx` (flow identifiers + work dir). |
| [`StreamSrcDef`](https://docs.tabsdata.com/api/category/spi/spi/streamsrcdef) | Entry-point registration for a `StreamSrc` binding. |
| [`StreamSrcPlugin`](https://docs.tabsdata.com/api/category/spi/spi/streamsrcplugin) | Plugin implementing the long-running side of a `StreamSrc` subclass (CDC, log tail, queue tail). |
| [`StreamSrcPluginCtx`](https://docs.tabsdata.com/api/category/spi/spi/streamsrcpluginctx) | Context handed to `StreamSrcPlugin.run` -- the plugin's long-lived control surface. |
| [`StreamStageSrc`](https://docs.tabsdata.com/api/category/spi/spi/streamstagesrc) | Config type for the hidden batch source that ingests a stream's staged manifests. |
| [`StreamStageSrcPlugin`](https://docs.tabsdata.com/api/category/spi/spi/streamstagesrcplugin) | Hidden batch-side (publisher) source that ingests a stream stage's manifests. |
| [`StreamStateSpec`](#tabsdatak.spi.StreamStateSpec) |  |
| [`TableFileInput`](https://docs.tabsdata.com/api/category/spi/spi/tablefileinput) | One parquet file `SrcPlugin.read_in` produces for an output slot, paired with optional metadata to carry alongside it. |
| [`TableFileSpec`](#tabsdatak.spi.TableFileSpec) |  |
| [`TableMode`](https://docs.tabsdata.com/api/category/spi/spi/tablemode) | How a `SrcPlugin` returns slot contents -- the length of each inner list in `SrcPlugin.read_in`'s return. |
| [`to_table_file_inputs`](https://docs.tabsdata.com/api/category/spi/spi/to-table-file-inputs) | Wrap per-slot parquet paths as `TableFileInput`\\ s with no metadata -- the shape `SrcPlugin.read_in` returns. |

* * *

## CommitStateFn

type\_alias

```python
CommitStateFn: Callable[[], None]
```

* * *

## FilesSpec

type\_alias

```python
FilesSpec: list[TableFileSpec]
```

**Resolved type:**

```python
list[Path]
```

* * *

## MetadataSpec

type\_alias

```python
MetadataSpec: dict[str, _MetadataBasicType]
```

**Resolved type:**

```python
dict[str, str | int | float | bool]
```

* * *

## StreamStateSpec

type\_alias

```python
StreamStateSpec: Union[BasicDictSpec, CommitStateFn]
```

**Resolved type:**

```python
dict[str, str | int | float | bool] | Callable[[], None]
```

* * *

## TableFileSpec

type\_alias

```python
TableFileSpec: Path
```

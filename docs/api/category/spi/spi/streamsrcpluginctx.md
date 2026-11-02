# StreamSrcPluginCtx

> Context handed to `StreamSrcPlugin.run` -- the plugin's long-lived control surface.

Source: https://docs.tabsdata.com/api/category/spi/spi/streamsrcpluginctx

class

```python
class StreamSrcPluginCtx
```

Bases: [PluginCtx](https://docs.tabsdata.com/api/category/spi/spi/pluginctx), [ABC](https://docs.python.org/3/library/abc.html#abc.ABC)

**Categories:** spi

Context handed to `StreamSrcPlugin.run` -- the plugin's long-lived control surface.

-   `active` -- loop predicate the plugin polls.
-   `first_stage` -- whether nothing has been staged yet, so the plugin seeds from config rather than from `stream_state`.
-   `stream_state` -- the per-flow resume state persisted by the last [`BasicDictSpec`](https://docs.tabsdata.com/api/module/tabsdatak-api#tabsdatak.api.BasicDictSpec) handed to `stage`.
-   `thresholds` -- the [`StreamThresholds`](https://docs.tabsdata.com/api/category/functions/functions/streamthresholds) of the function's definition: the `batch` level bounding what the plugin stages (how far apart batches are at least, how long data may wait at most, how long the stream may go without a batch, and the rows and bytes that stage one); the `buffer` and `poll` levels when the definition names them.
-   `stage` -- publish a batch and commit its new resume state.
-   `checkpoint` -- commit a new resume state with no batch.

## Properties

property

`active`[bool](https://docs.python.org/3/builtins/functions.html#bool)

`True` while the runtime wants the plugin to keep polling. The plugin loop should exit (cleanly) once this is `False`.

property

`first_stage`[bool](https://docs.python.org/3/builtins/functions.html#bool)

`True` until the first batch has been staged + committed.

The plugin uses it to decide where to seed its resume position: when `first_stage` is `True` nothing has been published yet, so seed from the source's configured initial values; otherwise a prior batch exists, so resume from `stream_state` (or, when the external system owns the offset, from the external system).

property

`stream_state`[BasicDictSpec](https://docs.tabsdata.com/api/module/tabsdatak-api#tabsdatak.api.BasicDictSpec) | None ([dict](https://docs.python.org/3/library/stdtypes.html#dict)\[[str](https://docs.python.org/3/library/stdtypes.html#str), [str](https://docs.python.org/3/library/stdtypes.html#str) | [int](https://docs.python.org/3/library/functions.html#int) | [float](https://docs.python.org/3/library/functions.html#float) | [bool](https://docs.python.org/3/library/functions.html#bool)\] | None)

The per-flow resume state persisted by the most recent [`BasicDictSpec`](https://docs.tabsdata.com/api/module/tabsdatak-api#tabsdatak.api.BasicDictSpec) handed to `stage`.

`None` when the last commit handed `stage` a [`CommitStateFn`](https://docs.tabsdata.com/api/module/tabsdatak-spi#tabsdatak.spi.CommitStateFn) callable (a `lambda`) instead of a [`BasicDictSpec`](https://docs.tabsdata.com/api/module/tabsdatak-api#tabsdatak.api.BasicDictSpec) -- i.e. the _external_ system owns the offset and Tabsdata keeps no state. Distinguish "first run" (nothing staged yet) via `first_stage`, not by this being `None`.

property

`thresholds`[StreamThresholds](https://docs.tabsdata.com/api/category/functions/functions/streamthresholds)

The [`StreamThresholds`](https://docs.tabsdata.com/api/category/functions/functions/streamthresholds) of the function's definition: the batch bounds the plugin stages by, the same for every stream source.

## Methods

method

`stage`

```python
def stage(tables_files: list[list[Path]], new_state: StreamStateSpec)
```

Publish a batch and commit its new resume state in one step.

**Parameters:**

parameter

`tables_files`[list](https://docs.python.org/3/builtins/stdtypes.html#list)\[[list](https://docs.python.org/3/builtins/stdtypes.html#list)\[[Path](https://docs.python.org/3/library/pathlib.html#pathlib.Path)\]\]

Per-output-table parquet files, positional by index (entry `i` -> table `i`; an empty inner list means no files for that table). Files must live under `work_dir`.

parameter

`new_state`[StreamStateSpec](https://docs.tabsdata.com/api/module/tabsdatak-spi#tabsdatak.spi.StreamStateSpec) ([dict](https://docs.python.org/3/library/stdtypes.html#dict)\[[str](https://docs.python.org/3/library/stdtypes.html#str), [str](https://docs.python.org/3/library/stdtypes.html#str) | [int](https://docs.python.org/3/library/functions.html#int) | [float](https://docs.python.org/3/library/functions.html#float) | [bool](https://docs.python.org/3/library/functions.html#bool)\] | Callable\[\[\], None\])

The new resume state -- a [`BasicDictSpec`](https://docs.tabsdata.com/api/module/tabsdatak-api#tabsdatak.api.BasicDictSpec) the runtime persists, or a [`CommitStateFn`](https://docs.tabsdata.com/api/module/tabsdatak-spi#tabsdatak.spi.CommitStateFn) it invokes for its side effect (external system owns the offset).

method

`checkpoint`

```python
def checkpoint(new_state: BasicDictSpec)
```

Commit a new resume state without publishing anything: the position moved past source data that carried nothing to stage.

It replaces the state `stage` last persisted, and is read back through `stream_state` like it. Call it only once `first_stage` is `False`: a state is what tells the next run that this stream has staged before.

**Parameters:**

parameter

`new_state`[BasicDictSpec](https://docs.tabsdata.com/api/module/tabsdatak-api#tabsdatak.api.BasicDictSpec) ([dict](https://docs.python.org/3/library/stdtypes.html#dict)\[[str](https://docs.python.org/3/library/stdtypes.html#str), [str](https://docs.python.org/3/library/stdtypes.html#str) | [int](https://docs.python.org/3/library/functions.html#int) | [float](https://docs.python.org/3/library/functions.html#float) | [bool](https://docs.python.org/3/library/functions.html#bool)\])

The new resume state, persisted as is.

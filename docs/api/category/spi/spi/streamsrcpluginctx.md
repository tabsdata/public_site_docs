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
-   `stream_state` -- the per-flow resume state persisted by the last [`BasicDictSpec`](https://docs.tabsdata.com/api/module/tabsdatak-api#tabsdatak.api.BasicDictSpec) handed to `stage` or `checkpoint`.
-   `thresholds` -- the [`StreamThresholds`](https://docs.tabsdata.com/api/category/functions/functions/streamthresholds) of the function's definition: the `batch` level bounding what the plugin stages (how far apart batches are at least, how long data may wait at most, how long the stream may go without a batch, and the rows and bytes that stage one); the `buffer` and `poll` levels when the definition names them.
-   `stage` -- send tables to the stage, publish them as a batch and commit its new resume state, together or apart.
-   `scan` -- read back a table sent and not yet published.
-   `unstage` -- drop tables sent and not yet published.
-   `pending` -- what was sent and not yet published.
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

property

`pending`[list](https://docs.python.org/3/builtins/stdtypes.html#list)\[[list](https://docs.python.org/3/builtins/stdtypes.html#list)\[[StageFileStats](https://docs.tabsdata.com/api/category/spi/spi/stagefilestats)\]\]

The [`StageFileStats`](https://docs.tabsdata.com/api/category/spi/spi/stagefilestats) of every table sent and not yet published, per output table.

## Methods

method

`stage`

```python
def stage(
    tables_files: list[list[Path]] | list[Iterable[LazyFrameInput] | None] | None,
    new_state: StreamStateSpec | None = None,
) -> list[list[StageFileStats]] | None
```

Send tables to the stage, publish them as a batch, and commit the batch's new resume state.

Tables sent and not yet published are pending, per output table. The arguments say what one call does:

-   `stage(tables, new_state)` sends `tables`, then publishes everything pending as one batch and commits `new_state`.
-   `stage(tables)` (or `stage(tables, None)`) only sends `tables`; send as often as memory demands, and publish them later.
-   `stage(None, new_state)` publishes everything pending (an empty batch when nothing is) and commits `new_state`.
-   `stage(files, new_state)`, with lists of local parquet files, is the legacy form: it uploads the files and publishes them with anything pending. It is deprecated in favour of sending [`LazyFrameInput`](https://docs.tabsdata.com/api/category/spi/spi/lazyframeinput) tables.

**Parameters:**

parameter

`tables_files`[list](https://docs.python.org/3/builtins/stdtypes.html#list)\[[list](https://docs.python.org/3/builtins/stdtypes.html#list)\[[Path](https://docs.python.org/3/library/pathlib.html#pathlib.Path)\]\] | [list](https://docs.python.org/3/builtins/stdtypes.html#list)\[[Iterable](https://docs.python.org/3/library/typing.html#typing.Iterable)\[[LazyFrameInput](https://docs.tabsdata.com/api/category/spi/spi/lazyframeinput)\] | None\] | None

Per-output-table entries, positional by index (entry `i` -> table `i`), one for every output table. Each is the tables to send for it -- [`LazyFrameInput`](https://docs.tabsdata.com/api/category/spi/spi/lazyframeinput)\\ s, a list or any iterable, taken and sunk one at a time -- or `None` (or an empty list) for no table. In the legacy form, each is a list of parquet files under `work_dir`. `None` to send nothing.

parameter

`new_state`[StreamStateSpec](https://docs.tabsdata.com/api/module/tabsdatak-spi#tabsdatak.spi.StreamStateSpec) | None ([dict](https://docs.python.org/3/library/stdtypes.html#dict)\[[str](https://docs.python.org/3/library/stdtypes.html#str), [str](https://docs.python.org/3/library/stdtypes.html#str) | [int](https://docs.python.org/3/library/functions.html#int) | [float](https://docs.python.org/3/library/functions.html#float) | [bool](https://docs.python.org/3/library/functions.html#bool)\] | Callable\[\[\], None\] | None)

The new resume state -- a [`BasicDictSpec`](https://docs.tabsdata.com/api/module/tabsdatak-api#tabsdatak.api.BasicDictSpec) the runtime persists, or a [`CommitStateFn`](https://docs.tabsdata.com/api/module/tabsdatak-spi#tabsdatak.spi.CommitStateFn) it invokes for its side effect (external system owns the offset). `None` to send without publishing.

**Returns:**

When it sends [`LazyFrameInput`](https://docs.tabsdata.com/api/category/spi/spi/lazyframeinput) tables, the [`StageFileStats`](https://docs.tabsdata.com/api/category/spi/spi/stagefilestats) of the

method

`scan`

```python
def scan(file: StageFileStats) -> pl.LazyFrame
```

Read back a table sent and not yet published, as it was sent, from where it is staged.

Use it to work on what was sent without keeping it: e.g. to de-duplicate a load against the changes read after it, sending the result and unstaging what it replaces.

**Parameters:**

parameter

`file`[StageFileStats](https://docs.tabsdata.com/api/category/spi/spi/stagefilestats)

The table, as `stage` returned it or `pending` lists it.

method

`unstage`

```python
def unstage(files: Iterable[StageFileStats] | None = None)
```

Drop tables sent and not yet published, so no batch publishes them, and delete their files as far as it can. The resume state does not change.

-   `unstage()` drops every one, e.g. to start over from `stream_state`.
-   `unstage(files)` drops only `files`.

**Parameters:**

parameter

`files`[Iterable](https://docs.python.org/3/library/typing.html#typing.Iterable)\[[StageFileStats](https://docs.tabsdata.com/api/category/spi/spi/stagefilestats)\] | None

The tables to drop, as `stage` returned them or `pending` lists them.

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

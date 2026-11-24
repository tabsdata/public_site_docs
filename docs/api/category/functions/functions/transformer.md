# transformer

> Decorate a function as a transformer (table-to-table, no external connection).

Source: https://docs.tabsdata.com/api/category/functions/functions/transformer

function

```python
def transformer(
    input_tables: CollTableVersionsNamesSpec,
    output_tables: TableNamesSpec,
    trigger_by: TransformerTriggerBySpec | None = None,
    on_tables: OnTablesActionSpec | None = None,
) -> Callable
```

**Categories:** functions

Decorate a function as a transformer (table-to-table, no external connection).

Reads `input_tables` and emits `output_tables`. The function takes one parameter per input table ([`TableFrameSpec`](https://docs.tabsdata.com/api/module/tabsdatak-api#tabsdatak.api.TableFrameSpec) or [`TableFramesSpec`](https://docs.tabsdata.com/api/module/tabsdatak-api#tabsdatak.api.TableFramesSpec)) plus an _optional_ trailing `ctx: TransactionCtx`, and returns one [`TableFrame`](https://docs.tabsdata.com/api/category/tableframe/tableframe/tableframe) per output table. An input slot is `None` (an element, in a list slot) while its table has no version with data yet.

Return an empty frame with the output's columns when there are no rows to write. When an `@NEW` input brings no version, read the same table at `@HEAD` too and run on its `clear()`, or return `None` while it is `None`. Returning `None` keeps the output's current data: its new version stands for the previous one, and a reader of that output at `@NEW` receives that data again.

A transformer is one computation over the tables it lists, and runs as one unit: a run computes all its outputs, they commit in the same transaction or not at all, and `tdk table flow` shows every input upstream of each output.

Several outputs are annotated as a fixed-length tuple, one element per output; `tuple[TableFrameSpec, ...]` is refused at import.

## Parameters

parameter

`input_tables`[CollTableVersionsNamesSpec](https://docs.tabsdata.com/api/module/tabsdatak-api#tabsdatak.api.CollTableVersionsNamesSpec) ([list](https://docs.python.org/3/library/stdtypes.html#list)\[[str](https://docs.python.org/3/library/stdtypes.html#str)\])

Non-empty list of `[collection/]table[@versions]` references to read (`collection/` may be omitted for a same-collection table; `@versions` selects a version, a `v..v` range, a comma-separated list, or `NEW`). A range, a list or `NEW` hands over one [`TableFrame`](https://docs.tabsdata.com/api/category/tableframe/tableframe/tableframe) per version, so its parameter must be a [`TableFramesSpec`](https://docs.tabsdata.com/api/module/tabsdatak-api#tabsdatak.api.TableFramesSpec). `NEW` is every version committed since the function's previous run, oldest first, and every version the table has on the function's first run. Each version is delivered to one run: a recovered run keeps its versions, and a cancelled run's versions go to the next run. `HEAD` is resolved when the execution plan starts; see `trigger_by` for the inputs read in the version the same plan writes.

parameter

`output_tables`[TableNamesSpec](https://docs.tabsdata.com/api/module/tabsdatak-api#tabsdatak.api.TableNamesSpec) ([list](https://docs.python.org/3/library/stdtypes.html#list)\[[str](https://docs.python.org/3/library/stdtypes.html#str)\])

Non-empty list of local table names to emit, one per return slot (valid table names, see [`publisher`](https://docs.tabsdata.com/api/category/functions/functions/publisher)).

parameter

`trigger_by`[TransformerTriggerBySpec](https://docs.tabsdata.com/api/module/tabsdatak-api#tabsdatak.api.TransformerTriggerBySpec) | None ([CronTrigger](https://docs.tabsdata.com/api/category/functions/trigger/crontrigger) | [TablesTrigger](https://docs.tabsdata.com/api/category/functions/trigger/tablestrigger) | [AllTablesTrigger](https://docs.tabsdata.com/api/category/functions/trigger/alltablestrigger) | None)

When the function runs on its own:

-   `None` (default) or `AllTablesTrigger()`: on a new version of any input table, other than the ones it writes.
-   `TablesTrigger(tables=[...])`: on a new version of any of those tables only, inputs or not.
-   `CronTrigger(mask=...)`: on the schedule only.
-   `TablesTrigger(tables=[])`: never; only when run manually.

Only triggers order the functions of an execution plan. An input gets the version written in the same plan only when its writer runs before the function through triggers, directly or further upstream; otherwise the function reads the input's version from before the plan, without waiting for the write. The default triggers on every input, so every input is read in the same plan's version; with [`TablesTrigger`](https://docs.tabsdata.com/api/category/functions/trigger/tablestrigger), list every input the function must read in that version.

parameter

`on_tables`[OnTablesActionSpec](https://docs.tabsdata.com/api/module/tabsdatak-api#tabsdatak.api.OnTablesActionSpec) | None ([list](https://docs.python.org/3/library/stdtypes.html#list)\[[OnTablesAction](https://docs.tabsdata.com/api/module/tabsdatak-api#tabsdatak.api.OnTablesAction)\] | None)

Optional list of [`OnTablesAction`](https://docs.tabsdata.com/api/module/tabsdatak-api#tabsdatak.api.OnTablesAction) side-effects.

## Returns

The decorator that wraps the function as a transformer

## Raises

-   `ApiException` — If the function signature does not match the `input_tables` / `output_tables` counts.

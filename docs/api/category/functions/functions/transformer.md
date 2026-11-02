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

Reads `input_tables` and emits `output_tables`. The function takes one parameter per input table ([`TableFrameSpec`](https://docs.tabsdata.com/api/module/tabsdatak-api#tabsdatak.api.TableFrameSpec) or [`TableFramesSpec`](https://docs.tabsdata.com/api/module/tabsdatak-api#tabsdatak.api.TableFramesSpec)) plus an _optional_ trailing `ctx: TrxCtx`, and returns one [`TableFrame`](https://docs.tabsdata.com/api/category/tableframe/tableframe/tableframe) per output table. Any input slot may be `None` when the upstream table produced no batch.

## Parameters

parameter

`input_tables`[CollTableVersionsNamesSpec](https://docs.tabsdata.com/api/module/tabsdatak-api#tabsdatak.api.CollTableVersionsNamesSpec) ([list](https://docs.python.org/3/library/stdtypes.html#list)\[[str](https://docs.python.org/3/library/stdtypes.html#str)\])

Non-empty list of `[collection/]table[@versions]` references to read (`collection/` may be omitted for a same-collection table; `@versions` selects a version, a `v..v` range, a comma-separated list, or `NEW`).

parameter

`output_tables`[TableNamesSpec](https://docs.tabsdata.com/api/module/tabsdatak-api#tabsdatak.api.TableNamesSpec) ([list](https://docs.python.org/3/library/stdtypes.html#list)\[[str](https://docs.python.org/3/library/stdtypes.html#str)\])

Non-empty list of local table names to emit, one per return slot (valid table names, see [`publisher`](https://docs.tabsdata.com/api/category/functions/functions/publisher)).

parameter

`trigger_by`[TransformerTriggerBySpec](https://docs.tabsdata.com/api/module/tabsdatak-api#tabsdatak.api.TransformerTriggerBySpec) | None ([CronTrigger](https://docs.tabsdata.com/api/category/functions/trigger/crontrigger) | [TablesTrigger](https://docs.tabsdata.com/api/category/functions/trigger/tablestrigger) | [AllTablesTrigger](https://docs.tabsdata.com/api/category/functions/trigger/alltablestrigger) | None)

Optional [`CronTrigger`](https://docs.tabsdata.com/api/category/functions/trigger/crontrigger) / [`TablesTrigger`](https://docs.tabsdata.com/api/category/functions/trigger/tablestrigger) / [`AllTablesTrigger`](https://docs.tabsdata.com/api/category/functions/trigger/alltablestrigger); if omitted, a commit to any input table triggers the function.

parameter

`on_tables`[OnTablesActionSpec](https://docs.tabsdata.com/api/module/tabsdatak-api#tabsdatak.api.OnTablesActionSpec) | None ([list](https://docs.python.org/3/library/stdtypes.html#list)\[[OnTablesAction](https://docs.tabsdata.com/api/module/tabsdatak-api#tabsdatak.api.OnTablesAction)\] | None)

Optional list of [`OnTablesAction`](https://docs.tabsdata.com/api/module/tabsdatak-api#tabsdatak.api.OnTablesAction) side-effects.

## Returns

The decorator that wraps the function as a transformer

## Raises

-   `ApiException` — If the function signature does not match the `input_tables` / `output_tables` counts.

# publisher

> Decorate a function as a batch publisher.

Source: https://docs.tabsdata.com/api/category/functions/functions/publisher

function

```python
def publisher(
    source: Src,
    output_tables: TableNamesSpec,
    trigger_by: PublisherTriggerBySpec | None = None,
    on_tables: OnTablesActionSpec | None = None,
) -> Callable
```

**Categories:** functions

Decorate a function as a batch publisher.

Pulls from `source` and emits `output_tables`. The function takes one parameter per source slot -- [`TableFrameSpec`](https://docs.tabsdata.com/api/module/tabsdatak-api#tabsdatak.api.TableFrameSpec) (single mode) or [`TableFramesSpec`](https://docs.tabsdata.com/api/module/tabsdatak-api#tabsdatak.api.TableFramesSpec) (array mode) -- plus an _optional_ trailing `ctx: TransactionCtx`, and returns one [`TableFrame`](https://docs.tabsdata.com/api/category/tableframe/tableframe/tableframe) per output table (a lone output may be returned bare rather than as a 1-tuple). A slot may be `None` when an upstream batch is absent.

## Parameters

parameter

`source`[Src](https://docs.tabsdata.com/api/category/connectors/source/src)

The [`Src`](https://docs.tabsdata.com/api/category/connectors/source/src) to pull from; its slot cardinality fixes the parameter count.

parameter

`output_tables`[TableNamesSpec](https://docs.tabsdata.com/api/module/tabsdatak-api#tabsdatak.api.TableNamesSpec) ([list](https://docs.python.org/3/library/stdtypes.html#list)\[[str](https://docs.python.org/3/library/stdtypes.html#str)\])

Non-empty list of local table names to emit, one per return slot. Each name must start with a letter and use only letters, digits and underscores (max 64 chars).

parameter

`trigger_by`[PublisherTriggerBySpec](https://docs.tabsdata.com/api/module/tabsdatak-api#tabsdatak.api.PublisherTriggerBySpec) | None ([CronTrigger](https://docs.tabsdata.com/api/category/functions/trigger/crontrigger) | [TablesTrigger](https://docs.tabsdata.com/api/category/functions/trigger/tablestrigger) | None)

When the function runs on its own:

-   `None` (default) or `TablesTrigger(tables=[])`: never; only when run manually.
-   `TablesTrigger(tables=[...])`: on a new version of any of those tables.
-   `CronTrigger(mask=...)`: on the schedule.

parameter

`on_tables`[OnTablesActionSpec](https://docs.tabsdata.com/api/module/tabsdatak-api#tabsdatak.api.OnTablesActionSpec) | None ([list](https://docs.python.org/3/library/stdtypes.html#list)\[[OnTablesAction](https://docs.tabsdata.com/api/module/tabsdatak-api#tabsdatak.api.OnTablesAction)\] | None)

Optional list of [`OnTablesAction`](https://docs.tabsdata.com/api/module/tabsdatak-api#tabsdatak.api.OnTablesAction) side-effects.

## Returns

The decorator that wraps the function as a publisher descriptor.

## Raises

-   `ApiException` — If the function signature does not match the source slot count / `output_tables` count.

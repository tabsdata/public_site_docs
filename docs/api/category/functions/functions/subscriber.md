# subscriber

> Decorate a function as a subscriber (push tables to an external destination).

Source: https://docs.tabsdata.com/api/category/functions/functions/subscriber

function

```python
def subscriber(
    destination: Dest,
    input_tables: CollTableVersionsNamesSpec,
    trigger_by: SubscriberTriggerBySpec | None = None,
) -> Callable
```

**Categories:** functions

Decorate a function as a subscriber (push tables to an external destination).

Reads `input_tables` and writes to `destination`. The function takes one parameter per input table ([`TableFrameSpec`](https://docs.tabsdata.com/api/module/tabsdatak-api#tabsdatak.api.TableFrameSpec), or [`TableFramesSpec`](https://docs.tabsdata.com/api/module/tabsdatak-api#tabsdatak.api.TableFramesSpec) for a read of several versions such as `@NEW`) plus an _optional_ trailing `ctx: TransactionCtx`, and returns one [`TableFrame`](https://docs.tabsdata.com/api/category/tableframe/tableframe/tableframe) per destination slot -- that return value is what gets written. Return `None` for a slot to leave its target as it is; with `None` in every slot, the destination writes nothing.

A destination appended to reads its tables at `@NEW`, so each version is written once, even when several commit between two runs; a destination replaced every run reads them at `@HEAD`.

A subscriber hands all its slots to the destination in one write; a destination with a `transactional` option writes them in one session, which is one commit where the database can roll back what the write does (see the destination's page).

Several slots are annotated as a fixed-length tuple, one element per slot; `tuple[TableFrameSpec, ...]` is refused at import.

## Parameters

parameter

`destination`[Dest](https://docs.tabsdata.com/api/category/connectors/destination/dest)

The [`Dest`](https://docs.tabsdata.com/api/category/connectors/destination/dest) to write to; its slot cardinality fixes the number of return slots.

parameter

`input_tables`[CollTableVersionsNamesSpec](https://docs.tabsdata.com/api/module/tabsdatak-api#tabsdatak.api.CollTableVersionsNamesSpec) ([list](https://docs.python.org/3/library/stdtypes.html#list)\[[str](https://docs.python.org/3/library/stdtypes.html#str)\])

Non-empty list of `[collection/]table[@versions]` references to ship (same form as [`transformer`](https://docs.tabsdata.com/api/category/functions/functions/transformer)).

parameter

`trigger_by`[SubscriberTriggerBySpec](https://docs.tabsdata.com/api/module/tabsdatak-api#tabsdatak.api.SubscriberTriggerBySpec) | None ([CronTrigger](https://docs.tabsdata.com/api/category/functions/trigger/crontrigger) | [TablesTrigger](https://docs.tabsdata.com/api/category/functions/trigger/tablestrigger) | [AllTablesTrigger](https://docs.tabsdata.com/api/category/functions/trigger/alltablestrigger) | None)

When the function runs on its own; the same options, and the same rule for which input versions it reads, as [`transformer`](https://docs.tabsdata.com/api/category/functions/functions/transformer), by default on a new version of any input table.

## Returns

The decorator that wraps the function as a subscriber

## Raises

-   `ApiException` — If the function signature does not match the `input_tables` count / destination slot count.

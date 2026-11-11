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

Reads `input_tables` and writes to `destination`. The function takes one [`TableFrameSpec`](https://docs.tabsdata.com/api/module/tabsdatak-api#tabsdatak.api.TableFrameSpec) parameter per input table plus an _optional_ trailing `ctx: TransactionCtx`, and returns one [`TableFrame`](https://docs.tabsdata.com/api/category/tableframe/tableframe/tableframe) per destination slot -- that return value is what gets written; return `None` for a slot to write nothing.

## Parameters

parameter

`destination`[Dest](https://docs.tabsdata.com/api/category/connectors/destination/dest)

The [`Dest`](https://docs.tabsdata.com/api/category/connectors/destination/dest) to write to; its slot cardinality fixes the number of return slots.

parameter

`input_tables`[CollTableVersionsNamesSpec](https://docs.tabsdata.com/api/module/tabsdatak-api#tabsdatak.api.CollTableVersionsNamesSpec) ([list](https://docs.python.org/3/library/stdtypes.html#list)\[[str](https://docs.python.org/3/library/stdtypes.html#str)\])

Non-empty list of `[collection/]table[@versions]` references to ship (same form as [`transformer`](https://docs.tabsdata.com/api/category/functions/functions/transformer)).

parameter

`trigger_by`[SubscriberTriggerBySpec](https://docs.tabsdata.com/api/module/tabsdatak-api#tabsdatak.api.SubscriberTriggerBySpec) | None ([CronTrigger](https://docs.tabsdata.com/api/category/functions/trigger/crontrigger) | [TablesTrigger](https://docs.tabsdata.com/api/category/functions/trigger/tablestrigger) | [AllTablesTrigger](https://docs.tabsdata.com/api/category/functions/trigger/alltablestrigger) | None)

When the function runs on its own; the same options as [`transformer`](https://docs.tabsdata.com/api/category/functions/functions/transformer), by default on a new version of any input table.

## Returns

The decorator that wraps the function as a subscriber

## Raises

-   `ApiException` — If the function signature does not match the `input_tables` count / destination slot count.

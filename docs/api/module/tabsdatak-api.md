# tabsdatak.api

> tabsdatak.api API reference.

Source: https://docs.tabsdata.com/api/module/tabsdatak-api

|  |  |
| --- | --- |
| [`AllTablesTrigger`](https://docs.tabsdata.com/api/category/functions/trigger/alltablestrigger) | Fire when _any_ upstream table the function reads from produces a new batch. |
| [`BasicDictSpec`](#tabsdatak.api.BasicDictSpec) |  |
| [`BasicTypeSpec`](#tabsdatak.api.BasicTypeSpec) |  |
| [`BatchBytesSpec`](#tabsdatak.api.BatchBytesSpec) |  |
| [`BatchRowsSpec`](#tabsdatak.api.BatchRowsSpec) |  |
| [`BatchSecondsSpec`](#tabsdatak.api.BatchSecondsSpec) |  |
| [`BatchThresholds`](https://docs.tabsdata.com/api/category/functions/functions/batchthresholds) | How a stream publisher's batches are bounded in time and size. |
| [`BufferThresholds`](https://docs.tabsdata.com/api/category/functions/functions/bufferthresholds) | How a stream publisher's in-memory buffer is bounded before it is written to a file: `max_rows` rows, `max_bytes` bytes (`None` for no byte limit) or `max_secs` since the last write. |
| [`CollTableNameSpec`](#tabsdatak.api.CollTableNameSpec) |  |
| [`CollTableNamesSpec`](#tabsdatak.api.CollTableNamesSpec) |  |
| [`CollTableVersionsNameSpec`](#tabsdatak.api.CollTableVersionsNameSpec) |  |
| [`CollTableVersionsNamesSpec`](#tabsdatak.api.CollTableVersionsNamesSpec) |  |
| [`ContextKeySpec`](#tabsdatak.api.ContextKeySpec) |  |
| [`CronMaskSpec`](#tabsdatak.api.CronMaskSpec) |  |
| [`CronTrigger`](https://docs.tabsdata.com/api/category/functions/trigger/crontrigger) | Fire on a cron schedule. |
| [`Dest`](https://docs.tabsdata.com/api/category/connectors/destination/dest) | Abstract destination. |
| [`FlushIntervalSpec`](#tabsdatak.api.FlushIntervalSpec) |  |
| [`OnTablesAction`](#tabsdatak.api.OnTablesAction) | Abstract base for declarative table-side-effect actions. |
| [`OnTablesActionSpec`](#tabsdatak.api.OnTablesActionSpec) |  |
| [`PollThresholds`](https://docs.tabsdata.com/api/category/functions/functions/pollthresholds) | How a stream publisher polls its source: `max_secs` is the budget of one ingestion iteration, `idle_secs` the wait before the next one when the iteration read nothing. |
| [`publisher`](https://docs.tabsdata.com/api/category/functions/functions/publisher) | Decorate a function as a batch publisher. |
| [`PublisherTriggerBySpec`](#tabsdatak.api.PublisherTriggerBySpec) |  |
| [`Secret`](https://docs.tabsdata.com/api/category/connectors/credentials/secret) | Reference to a secret value, used for credential fields. |
| [`Src`](https://docs.tabsdata.com/api/category/connectors/source/src) | Abstract batch source. |
| [`stream_publisher`](https://docs.tabsdata.com/api/category/functions/functions/stream-publisher) | Decorate a function as a stream publisher. |
| [`StreamSrc`](https://docs.tabsdata.com/api/category/connectors/source/streamsrc) | Abstract stream source. |
| [`StreamThresholds`](https://docs.tabsdata.com/api/category/functions/functions/streamthresholds) | The thresholds of a stream publisher's data flow, one substructure per level: `batch` (what a function run receives), `buffer` (the in-memory buffer written to files) and `poll` (the source polling). |
| [`StrOrSecretSpec`](https://docs.tabsdata.com/api/category/connectors/credentials/strorsecretspec) | A connector field that accepts either a plain string or a `Secret`. |
| [`subscriber`](https://docs.tabsdata.com/api/category/functions/functions/subscriber) | Decorate a function as a subscriber (push tables to an external destination). |
| [`SubscriberTriggerBySpec`](#tabsdatak.api.SubscriberTriggerBySpec) |  |
| [`TableFrameSpec`](#tabsdatak.api.TableFrameSpec) |  |
| [`TableFramesSpec`](#tabsdatak.api.TableFramesSpec) |  |
| [`TableNameSpec`](#tabsdatak.api.TableNameSpec) |  |
| [`TableNamesSpec`](#tabsdatak.api.TableNamesSpec) |  |
| [`TablesTrigger`](https://docs.tabsdata.com/api/category/functions/trigger/tablestrigger) | Fire when one of a named set of upstream tables produces a new batch. |
| [`transformer`](https://docs.tabsdata.com/api/category/functions/functions/transformer) | Decorate a function as a transformer (table-to-table, no external connection). |
| [`TransformerTriggerBySpec`](#tabsdatak.api.TransformerTriggerBySpec) |  |
| [`Trigger`](https://docs.tabsdata.com/api/category/functions/trigger/trigger) | Abstract base for the trigger family. |
| [`TrxCtx`](#tabsdatak.api.TrxCtx) | Per-trx context handed by the runtime to every decorated function and connector plugin. |

* * *

## BasicDictSpec

type\_alias

```python
BasicDictSpec: dict[str, BasicTypeSpec]
```

**Resolved type:**

```python
dict[str, str | int | float | bool]
```

* * *

## BasicTypeSpec

type\_alias

```python
BasicTypeSpec: Union[str, int, float, bool]
```

**Resolved type:**

```python
str | int | float | bool
```

* * *

## BatchBytesSpec

type\_alias

```python
BatchBytesSpec: int
```

* * *

## BatchRowsSpec

type\_alias

```python
BatchRowsSpec: int
```

* * *

## BatchSecondsSpec

type\_alias

```python
BatchSecondsSpec: int
```

* * *

## CollTableNameSpec

type\_alias

```python
CollTableNameSpec: str
```

* * *

## CollTableNamesSpec

type\_alias

```python
CollTableNamesSpec: list[CollTableNameSpec]
```

**Resolved type:**

```python
list[str]
```

* * *

## CollTableVersionsNameSpec

type\_alias

```python
CollTableVersionsNameSpec: str
```

* * *

## CollTableVersionsNamesSpec

type\_alias

```python
CollTableVersionsNamesSpec: list[CollTableVersionsNameSpec]
```

**Resolved type:**

```python
list[str]
```

* * *

## ContextKeySpec

type\_alias

```python
ContextKeySpec: str
```

* * *

## CronMaskSpec

type\_alias

```python
CronMaskSpec: str
```

* * *

## FlushIntervalSpec

type\_alias

```python
FlushIntervalSpec: int
```

* * *

## OnTablesAction

class

```python
class OnTablesAction
```

Bases: [ABC](https://docs.python.org/3/library/abc.html#abc.ABC), `JsonSerde`

Abstract base for declarative table-side-effect actions.

An action fires alongside a function's normal output (e.g. publish a notification, write an audit row) and only when the function's primary output succeeds. Passed via the `on_tables` argument of `@publisher` / `@stream_publisher` / `@transformer`.

* * *

## OnTablesActionSpec

type\_alias

```python
OnTablesActionSpec: list[OnTablesAction]
```

* * *

## PublisherTriggerBySpec

type\_alias

```python
PublisherTriggerBySpec: Union[CronTrigger, TablesTrigger]
```

**Resolved type:**

```python
CronTrigger | TablesTrigger
```

* * *

## SubscriberTriggerBySpec

type\_alias

```python
SubscriberTriggerBySpec: Union[CronTrigger, TablesTrigger, AllTablesTrigger]
```

**Resolved type:**

```python
CronTrigger | TablesTrigger | AllTablesTrigger
```

* * *

## TableFrameSpec

type\_alias

```python
TableFrameSpec: TableFrame | None
```

* * *

## TableFramesSpec

type\_alias

```python
TableFramesSpec: list[TableFrame | None] | None
```

* * *

## TableNameSpec

type\_alias

```python
TableNameSpec: str
```

* * *

## TableNamesSpec

type\_alias

```python
TableNamesSpec: list[TableNameSpec]
```

**Resolved type:**

```python
list[str]
```

* * *

## TransformerTriggerBySpec

type\_alias

```python
TransformerTriggerBySpec: Union[CronTrigger, TablesTrigger, AllTablesTrigger]
```

**Resolved type:**

```python
CronTrigger | TablesTrigger | AllTablesTrigger
```

* * *

## TrxCtx

class

```python
class TrxCtx
```

Bases: [ABC](https://docs.python.org/3/library/abc.html#abc.ABC)

Per-trx context handed by the runtime to every decorated function and connector plugin.

A function receives it by declaring a trailing `ctx: TrxCtx` parameter (not allowed on `@stream_publisher`). Carries trx-level identifiers (`exec_plan_id`, `trx_id`, `exec_plan_ts`), a per-flow scratch store that survives across invocations (`get_attr` / `set_attr`), and a metadata sink (`add_metadata`).

property

`exec_plan_id`[str](https://docs.python.org/3/builtins/stdtypes.html#str)

Unique id of the running execution plan.

property

`trx_id`[str](https://docs.python.org/3/builtins/stdtypes.html#str)

Unique id of the current trx within the plan.

property

`exec_plan_ts`[str](https://docs.python.org/3/builtins/stdtypes.html#str)

ISO-8601 timestamp of when the plan started.

method

`get_attr`

```python
def get_attr(attr: ContextKeySpec) -> BasicTypeSpec | None
```

Read a per-flow scratch value (returns `None` if unset).

**Parameters:**

parameter

`attr`[ContextKeySpec](https://docs.tabsdata.com/api/module/tabsdatak-api#tabsdatak.api.ContextKeySpec) ([str](https://docs.python.org/3/library/stdtypes.html#str))

method

`set_attr`

```python
def set_attr(attr: ContextKeySpec, val: BasicTypeSpec | None)
```

Write a per-flow scratch value -- persists across trx invocations within the same flow.

Connectors may reserve namespaces under this scratch store for their own internal bookkeeping (`file-lastmod.*` is the only one today). Writing to such names from user code can corrupt connector state -- pick names that don't collide with these prefixes.

**Parameters:**

parameter

`attr`[ContextKeySpec](https://docs.tabsdata.com/api/module/tabsdatak-api#tabsdatak.api.ContextKeySpec) ([str](https://docs.python.org/3/library/stdtypes.html#str))

parameter

`val`[BasicTypeSpec](https://docs.tabsdata.com/api/module/tabsdatak-api#tabsdatak.api.BasicTypeSpec) | None ([str](https://docs.python.org/3/library/stdtypes.html#str) | [int](https://docs.python.org/3/library/functions.html#int) | [float](https://docs.python.org/3/library/functions.html#float) | [bool](https://docs.python.org/3/library/functions.html#bool) | None)

method

`add_metadata`

```python
def add_metadata(attr: ContextKeySpec, val: BasicTypeSpec | None)
```

Attach trx-level metadata for observability / lineage. Not durable across trx invocations.

**Parameters:**

parameter

`attr`[ContextKeySpec](https://docs.tabsdata.com/api/module/tabsdatak-api#tabsdatak.api.ContextKeySpec) ([str](https://docs.python.org/3/library/stdtypes.html#str))

parameter

`val`[BasicTypeSpec](https://docs.tabsdata.com/api/module/tabsdatak-api#tabsdatak.api.BasicTypeSpec) | None ([str](https://docs.python.org/3/library/stdtypes.html#str) | [int](https://docs.python.org/3/library/functions.html#int) | [float](https://docs.python.org/3/library/functions.html#float) | [bool](https://docs.python.org/3/library/functions.html#bool) | None)

# Trigger a Function from a Table Commit

Source: https://docs.tabsdata.com/developer/tutorials/trigger-setup/table-commit

Before you begin

[Create a Project](https://docs.tabsdata.com/developer/tutorials/managing-projects/create)

A table trigger runs a function whenever a table it watches receives a new commit. This is how a pipeline advances on its own: a publisher lands data, the transformer watching that table runs, and the subscriber watching the transformer's output runs after it.

Transformers and subscribers already work this way without being told to. Omit `trigger_by` and a commit to any of the function's input tables triggers it.

`trigger_by` is for the two cases the default does not cover: triggering off fewer tables than the function reads, and triggering off tables it does not read at all.

Step 1Write the function against its input tables

summarize.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col


@transformer(
    input_tables=["orders"],
    output_tables=["orders_by_region"],
)
def summarize(orders: TableFrameSpec) -> TableFrameSpec:
    return orders.group_by("region").agg(col("amount").sum())
```

With no `trigger_by`, a commit to `orders` runs this transformer.

Step 2Register it

```bash
tdk fn register \
  --coll sales \
  --path summarize.py::summarize
```

Step 3Trigger the upstream function and watch the chain

```bash
tdk fn trigger --coll sales --name read_orders
```

The publisher commits `orders`, which triggers `summarize` in the same execution plan. Both appear in the run listing:

```bash
tdk fnrun list --coll sales
```

## Narrowing which input tables trigger

A commit to any input table triggers the function, and `trigger_by` narrows that set:

```python
@transformer(
    input_tables=["orders", "regions"],
    output_tables=["orders_by_region"],
    trigger_by=["orders"],
)
```

`regions` is still read on every run and still supplies its current data. It no longer starts one, which suits a lookup table whose edits do not warrant recomputing the summary.

This is not about avoiding duplicate runs. A plan that commits both `orders` and `regions` runs this transformer once either way, because the plan covers every downstream function and orders them by dependency rather than firing one run per committed table.

## Triggering off a table the function does not read

`trigger_by` accepts tables that are not inputs at all, which is how a function runs in response to something it does not consume. `input_tables` and `trigger_by` are two independent lists — one controls what the function reads, the other what starts it, and neither has to be a subset of the other:

```python
@transformer(
    input_tables=["orders", "regions"],
    output_tables=["orders_by_region"],
    trigger_by=["orders", "ops/refresh_signal"],
)
def summarize(orders: TableFrameSpec, regions: TableFrameSpec) -> TableFrameSpec:
    return orders.group_by("region").agg(col("amount").sum())
```

`regions` is read on every run but never starts one, since it is absent from `trigger_by`. `ops/refresh_signal` starts a run despite never being read, since it is absent from `input_tables`. A commit to `ops/refresh_signal` runs the transformer even though it reads nothing from that table. A publisher uses the same mechanism: it has no `input_tables` at all, so a table reference in `trigger_by` is the only way a Tabsdata commit can start it.

Reference a table outside the function's own collection as `collection/table`. Cross-collection references work within one project. A reference to a table in another project surfaces as `Dependency table '<x>' does not exist`, because row-level security hides it rather than reporting it as forbidden.

## Turning automatic triggering off

An empty list disables it, leaving the function manual-only:

```python
trigger_by=[]
```

## A commit does not mean the data changed

A publisher writing three tables commits all three on every run, whether or not the rows in a given table differ from last time, and every commit triggers whatever watches that table. A run that returns `None` for a table is the exception: that keeps the current version instead of committing a new one, so nothing downstream fires.

## What to do next

[Schedule a Cron Trigger](https://docs.tabsdata.com/developer/tutorials/trigger-setup/cron) to run a function on a clock instead, which is what a publisher usually needs.

See [Table Commit Triggers](https://docs.tabsdata.com/developer/guide/triggers/table-commit) for how the trigger behaves.

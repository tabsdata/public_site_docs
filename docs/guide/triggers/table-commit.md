# Table Commit Triggers

> Configures Table commit triggers via the `trigger_by` decorator option: default, empty-list, and named-Table behavior, cross-Collection `collection/table` references, and returning None to skip commits.

Source: https://docs.tabsdata.com/guide/triggers/table-commit

A Table trigger runs a Function whenever one of the Tables it watches receives a new Version. This is what makes a pipeline cascade: a Publisher commits, the Transformers reading that Table run, they commit in turn, and the chain continues to the Subscribers at the end.

_Video: A new Table Version triggering a Function run_

Configure it with the `trigger_by` list on the decorator.

## The three configurations

**Omitted.** Transformers and Subscribers fire on a commit to any of their input Tables. Publishers have no input Tables, so they get no automatic trigger at all and run manually or on a schedule.

**An empty list.** `trigger_by=[]` disables automatic triggering. Use it when a Transformer or Subscriber should read its input Tables but not wake up when they change.

**A non-empty list.** The Function watches exactly the Tables named and nothing else. This is how you trigger on a subset of the input Tables, or on a Table the Function does not read at all.

```python
@transformer(
    trigger_by=["sales", "inventory/stock"],
    input_tables=["sales"],
    output_tables=["sales_by_rep"],
)
def summarize(sales: TableFrameSpec) -> TableFrameSpec:
    return sales
```

## Referencing another Collection's Tables

Write a Table outside the Function's own Collection as `collection/table`, as `inventory/stock` does above. Unqualified names resolve inside the Function's own Collection.

Cross-Collection references work only within a single Project. A reference that crosses Projects surfaces as `Dependency table '<x>' does not exist`, because the row is not visible rather than missing.

A Table cannot trigger the Function that writes it.

## A commit is not the same as a change

Every run that returns data commits a new Version, whether or not the rows differ from the previous one. A Publisher writing three Tables commits all three on every run, so a Function watching any of them fires each time, even for the Tables whose contents were identical.

Returning `None` from a slot also commits a new Version, one that keeps the Table's previous data, so downstream Functions watching that Table fire for it too. See [`None` inputs and outputs](https://docs.tabsdata.com/guide/functions/#none-inputs-and-outputs).

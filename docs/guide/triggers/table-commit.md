# Table Commit Triggers

> Configures Table commit triggers via the `trigger_by` decorator option: default, empty-list, and named-Table behavior, cross-Collection `collection/table` references, and returning None to skip commits.

Source: https://docs.tabsdata.com/guide/triggers/table-commit

A Table Commit Trigger executes a Function whenever one of its specified Tables commits a new version. This allows functions to execute automatically as data moves between them. For example, when a Publisher commits a new Table version, it can trigger a Transformer, which then commits its own output and triggers downstream Functions.

_Video: A new Table Version triggering a Function run_

Table Commit Triggers are configured using the `trigger_by` parameter in a Function's decorator.

## Configuring Table Commit Triggers

There are three ways to configure a Table Commit Trigger:

-   **Omitting `trigger_by`:** Transformers and Subscribers automatically execute when any of their input Tables commits a new version. Publishers have no input Tables, so they do not receive automatic Table Commit Triggers.
-   **Providing an empty list:** Setting `trigger_by=TablesTrigger(tables=[])` disables automatic Table Commit Triggers. The Function can still read its input Tables, but commits to those Tables will not trigger an execution.
-   **Specifying a list of Tables:** The Function executes when any Table in the list commits a new version. This allows you to trigger a Function using only certain input Tables or even Tables that the Function does not read.

For example:

-   Omitted
-   Empty list
-   Partial input table trigger
-   Non-input table trigger

```python
@transformer(
    input_tables=["sales", "inventory"],
    output_tables=["sales_by_rep"],
)
def summarize(sales: TableFrameSpec, inventory: TableFrameSpec) -> TableFrameSpec:
    return sales
```

```python
@transformer(
    trigger_by=TablesTrigger(tables=[]),
    input_tables=["sales", "inventory"],
    output_tables=["sales_by_rep"],
)
def summarize(sales: TableFrameSpec, inventory: TableFrameSpec) -> TableFrameSpec:
    return sales
```

```python
@transformer(
    trigger_by=TablesTrigger(tables=["sales"]),
    input_tables=["sales", "inventory"],
    output_tables=["sales_by_rep"],
)
def summarize(sales: TableFrameSpec, inventory: TableFrameSpec) -> TableFrameSpec:
    return sales
```

```python
@transformer(
    trigger_by=TablesTrigger(tables=["ops/refresh_signal"]),
    input_tables=["sales", "inventory"],
    output_tables=["sales_by_rep"],
)
def summarize(sales: TableFrameSpec, inventory: TableFrameSpec) -> TableFrameSpec:
    return sales
```

Functions can also be [disabled](https://docs.tabsdata.com/guide/execution-and-triggers#enabled-and-disabled-functions). Disabled Functions do not execute when their trigger Tables commit new versions, preventing downstream Functions from executing through them.

## Table Commit Triggers and Dependency Configuration

When a Function has multiple input Tables, the Tables specified in `trigger_by` also determine execution order within an execution.

Tabsdata uses `trigger_by` to establish execution dependencies. If a Function reads an input Table that isn't listed as a trigger, it does not wait for that Table to be updated.

For example, the following Transformer reads both `sales` and `inventory`, but only triggers on commits to `sales`:

```python
@transformer(
    input_tables=["sales", "inventory"],
    output_tables=["sales_with_stock"],
    trigger_by=TablesTrigger(tables=["sales"]),
)
def sales_with_stock(sales: TableFrameSpec, inventory: TableFrameSpec) -> TableFrameSpec:
    return sales.join(inventory, on="product_id")
```

If both `sales` and `inventory` tables are updated in the same execution plan, the Transformer only receives the update from the `sales` table. Unless `inventory` is upstream of a specified trigger Table, the Transformer reads the version that existed before the execution plan started. This modified behavior will not cause the function to fail, which may lead to silently passing stale data through the workflow.

If both `sales` and `inventory` were set to trigger this Function, then this Function would receive the newest version of both `sales` and `inventory`.

This restriction prevents circular execution dependencies, since Tabsdata only checks trigger relationships for cycles.

The behavior also applies to Table version references:

-   **`@HEAD`:** Resolves to the latest version available to the Function within the execution plan.
-   **`@HEAD^`, `@HEAD~N`, and version ranges:** Resolve relative to that same version.

To ensure the Function reads updated versions of all its input Tables, include each input in `trigger_by`, or simply omit `trigger_by` since all input Tables are used as triggers by default.

## Referencing Tables in other Collections

Functions can use Tables from other Collections within the same Project by specifying the Collection name:

`collection/table`

For example, `inventory/stock` references the `stock` Table in the `inventory` Collection. Without a Collection name, Tabsdata assumes the Table belongs to the Function's own Collection.

Cross-Collection references are only supported within the same Project. Referencing a Table in another Project produces a `Dependency table '<x>' does not exist` error because the Table is not accessible from the current Project.

A Function also cannot use its own output Table as a trigger.

## Table commits vs. data changes

Table Commit Triggers respond to new Table versions, not changes to the data itself.

Every successful Function execution commits a new version of each output Table, regardless of whether its contents have changed.

For example, a Publisher with three output Tables commits a new version of all three Tables on every successful run. Any downstream Function watching those Tables will execute, even if their data remains identical to the previous version.

This also applies when a Function returns `None`. Although `None` preserves the data from the previous Table version, a new version is still committed and triggers downstream Functions.

See [`None` as output](https://docs.tabsdata.com/guide/functions/#none-as-output) for more information.

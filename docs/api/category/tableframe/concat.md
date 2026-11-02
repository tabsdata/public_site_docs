# concat

> Stack several `TableFrame`s into one by appending their rows.

Source: https://docs.tabsdata.com/api/category/tableframe/concat

function

```python
def concat(items: TableFramesSpec, *, how: ConcatMethod = 'vertical') -> TableFrameSpec
```

**Categories:** union

Stack several [`TableFrame`](https://docs.tabsdata.com/api/category/tableframe/tableframe/tableframe)s into one by appending their rows.

## Parameters

parameter

`items`[TableFramesSpec](https://docs.tabsdata.com/api/module/tabsdatak-api#tabsdatak.api.TableFramesSpec) ([list](https://docs.python.org/3/library/stdtypes.html#list)\[[TableFrame](https://docs.tabsdata.com/api/category/tableframe/tableframe/tableframe) | None\] | None)

The [`TableFrame`](https://docs.tabsdata.com/api/category/tableframe/tableframe/tableframe)s to concatenate. `None` entries are skipped; `None`, an empty iterable, or one that is empty after skipping yields `None`.

parameter

`how`ConcatMethod (Literal\['vertical', 'vertical\_relaxed', 'diagonal', 'diagonal\_relaxed', 'horizontal', 'horizontal\_extend', 'align', 'align\_full', 'align\_inner', 'align\_left', 'align\_right'\])

How to line up columns -- `"vertical"` (default; every input must share the same columns and types), `"vertical_relaxed"` (same, but cast to a common supertype), `"diagonal"` (union of columns, missing ones filled with null), or `"diagonal_relaxed"` (diagonal plus supertype casting).

## Returns

The combined [`TableFrame`](https://docs.tabsdata.com/api/category/tableframe/tableframe/tableframe), or `None` when there is nothing to

## Examples

```python
concat([tf, other])
```

`diagonal` unions the columns of frames whose schemas differ, filling the gaps with null:

```python
concat([tf, other], how="diagonal")
```

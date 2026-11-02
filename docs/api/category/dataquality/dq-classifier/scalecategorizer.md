# ScaleCategorizer

> A classifier that assigns each value to a bin defined by a `Scale`.

Source: https://docs.tabsdata.com/api/category/dataquality/dq-classifier/scalecategorizer

class

```python
class ScaleCategorizer(
    column_names: ColumnNamesWithAltSpec | None = None,
    on_missing_column: OnInvalidColumnSpec = 'ignore',
    on_wrong_type: OnInvalidColumnSpec = 'ignore',
    on_wrong_value: OnInvalidValueSpec = 'ignore',
    scale: Scale = field(kw_only=True),
    tags: TagsSpec | None = field(default=None, kw_only=True),
    prefix: PrefixSpec | None = field(default=None, kw_only=True),
)
```

Bases: [Categorizer](https://docs.tabsdata.com/api/category/dataquality/dq-classifier/categorizer)

**Categories:** dq-classifier

A classifier that assigns each value to a bin defined by a [`Scale`](https://docs.tabsdata.com/api/category/dataquality/dq-classifier/scale). Applies to numeric columns. The verdict column holds the bin index (or a reserved sentinel for null / nan / under- / overflow); pair it with an [`InBins`](https://docs.tabsdata.com/api/category/dataquality/dq-operator/inbins) or [`NotInBins`](https://docs.tabsdata.com/api/category/dataquality/dq-operator/notinbins) criteria.

## Examples

```python
ScaleCategorizer(["value"], scale=LinearScale(0.0, 10.0, bins=5))
```

## Parameters

parameter

`column_names`[ColumnNamesWithAltSpec](https://docs.tabsdata.com/api/module/tabsdatak-dataquality#tabsdatak.dataquality.ColumnNamesWithAltSpec) | None ([list](https://docs.python.org/3/library/stdtypes.html#list)\[[str](https://docs.python.org/3/library/stdtypes.html#str) | [tuple](https://docs.python.org/3/library/stdtypes.html#tuple)\[[str](https://docs.python.org/3/library/stdtypes.html#str), [str](https://docs.python.org/3/library/stdtypes.html#str) | None\]\] | None)

Columns to classify. Each entry is a column name, or a `(column, verdict_column)` tuple naming the column the verdict lands in; the two forms can be mixed. `None` (the default) classifies every user column, skipping the types this classifier does not support (see `on_wrong_type`). A verdict column that is not named explicitly is the source column plus this classifier's suffix (a column `amount` lands in `amount_category`).

parameter

`on_missing_column`[OnInvalidColumnSpec](https://docs.tabsdata.com/api/module/tabsdatak-dataquality#tabsdatak.dataquality.OnInvalidColumnSpec) (Literal\['ignore', 'fail'\])

What to do when a named column is not in the table: `"ignore"` (the default) leaves it out, `"fail"` aborts the check.

parameter

`on_wrong_type`[OnInvalidColumnSpec](https://docs.tabsdata.com/api/module/tabsdatak-dataquality#tabsdatak.dataquality.OnInvalidColumnSpec) (Literal\['ignore', 'fail'\])

What to do when a column's data type is not one this classifier supports: `"ignore"` (the default) leaves it out, `"fail"` aborts the check.

parameter

`on_wrong_value`[OnInvalidValueSpec](https://docs.tabsdata.com/api/module/tabsdatak-dataquality#tabsdatak.dataquality.OnInvalidValueSpec) (Literal\['ignore', 'fail'\])

What to do when a value cannot be evaluated against this classifier: `"ignore"` (the default) yields a null verdict, `"fail"` aborts the check.

parameter

`scale`[Scale](https://docs.tabsdata.com/api/category/dataquality/dq-classifier/scale)

The [`Scale`](https://docs.tabsdata.com/api/category/dataquality/dq-classifier/scale) (e.g. [`LinearScale`](https://docs.tabsdata.com/api/category/dataquality/dq-classifier/linearscale), [`LogarithmicScale`](https://docs.tabsdata.com/api/category/dataquality/dq-classifier/logarithmicscale)) that maps values to bins.

parameter

`tags`[TagsSpec](https://docs.tabsdata.com/api/module/tabsdatak-dataquality#tabsdatak.dataquality.TagsSpec) | None ([list](https://docs.python.org/3/library/stdtypes.html#list)\[[str](https://docs.python.org/3/library/stdtypes.html#str)\] | None)

Optional labels for this classifier. An operator given the same tag applies only to the classifiers carrying it; untagged operators apply to all of them.

parameter

`prefix`PrefixSpec | None ([str](https://docs.python.org/3/library/stdtypes.html#str) | None)

Prepended verbatim to every verdict column name this classifier produces, inferred or explicit. `None` (the default) uses `@td.dq.`; `""` adds no prefix; any other string is used as given.

## Methods

method

`supported_dtypes`

```python
def supported_dtypes() -> frozenset
```

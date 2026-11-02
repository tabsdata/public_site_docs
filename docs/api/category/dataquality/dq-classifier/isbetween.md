# IsBetween

> A boolean classifier that checks whether a value is inside a range.

Source: https://docs.tabsdata.com/api/category/dataquality/dq-classifier/isbetween

class

```python
class IsBetween(
    column_names: ColumnNamesWithAltSpec | None = None,
    min_val: RangeValueSpec | None = None,
    max_val: RangeValueSpec | None = None,
    closed_on: RangeClosedOnSpec = 'both',
    on_missing_column: OnInvalidColumnSpec = 'ignore',
    on_wrong_type: OnInvalidColumnSpec = 'ignore',
    on_wrong_value: OnInvalidValueSpec = 'ignore',
    tags: TagsSpec | None = field(default=None, kw_only=True),
    prefix: PrefixSpec | None = field(default=None, kw_only=True),
)
```

Bases: [BetweenClassifier](https://docs.tabsdata.com/api/category/dataquality/dq-classifier/betweenclassifier)

**Categories:** dq-classifier

A boolean classifier that checks whether a value is inside a range. Applies to non-boolean columns.

## Examples

```python
IsBetween(["value"], min_val=0.0, max_val=10.0, closed_on="both")
```

## Parameters

parameter

`column_names`[ColumnNamesWithAltSpec](https://docs.tabsdata.com/api/module/tabsdatak-dataquality#tabsdatak.dataquality.ColumnNamesWithAltSpec) | None ([list](https://docs.python.org/3/library/stdtypes.html#list)\[[str](https://docs.python.org/3/library/stdtypes.html#str) | [tuple](https://docs.python.org/3/library/stdtypes.html#tuple)\[[str](https://docs.python.org/3/library/stdtypes.html#str), [str](https://docs.python.org/3/library/stdtypes.html#str) | None\]\] | None)

Columns to classify. Each entry is a column name, or a `(column, verdict_column)` tuple naming the column the verdict lands in; the two forms can be mixed. `None` (the default) classifies every user column, skipping the types this classifier does not support (see `on_wrong_type`). A verdict column that is not named explicitly is the source column plus this classifier's suffix (a column `amount` lands in `amount_is_between`).

parameter

`min_val`[RangeValueSpec](https://docs.tabsdata.com/api/module/tabsdatak-dataquality#tabsdatak.dataquality.RangeValueSpec) | None ([int](https://docs.python.org/3/library/functions.html#int) | [float](https://docs.python.org/3/library/functions.html#float) | [bool](https://docs.python.org/3/library/functions.html#bool) | [str](https://docs.python.org/3/library/stdtypes.html#str) | [date](https://docs.python.org/3/library/datetime.html#datetime.date) | [time](https://docs.python.org/3/library/datetime.html#datetime.time) | [datetime](https://docs.python.org/3/library/datetime.html#datetime.datetime) | [timedelta](https://docs.python.org/3/library/datetime.html#datetime.timedelta) | [bytes](https://docs.python.org/3/library/stdtypes.html#bytes) | [Decimal](https://docs.tabsdata.com/api/module/tabsdatak-tableframe-datatypes#tabsdatak.tableframe.datatypes.Decimal) | None)

Lower bound; `None` leaves the low side unbounded.

parameter

`max_val`[RangeValueSpec](https://docs.tabsdata.com/api/module/tabsdatak-dataquality#tabsdatak.dataquality.RangeValueSpec) | None ([int](https://docs.python.org/3/library/functions.html#int) | [float](https://docs.python.org/3/library/functions.html#float) | [bool](https://docs.python.org/3/library/functions.html#bool) | [str](https://docs.python.org/3/library/stdtypes.html#str) | [date](https://docs.python.org/3/library/datetime.html#datetime.date) | [time](https://docs.python.org/3/library/datetime.html#datetime.time) | [datetime](https://docs.python.org/3/library/datetime.html#datetime.datetime) | [timedelta](https://docs.python.org/3/library/datetime.html#datetime.timedelta) | [bytes](https://docs.python.org/3/library/stdtypes.html#bytes) | [Decimal](https://docs.tabsdata.com/api/module/tabsdatak-tableframe-datatypes#tabsdatak.tableframe.datatypes.Decimal) | None)

Upper bound; `None` leaves the high side unbounded. When both are given they must be the same type and `min_val` must not exceed `max_val`.

parameter

`closed_on`[RangeClosedOnSpec](https://docs.tabsdata.com/api/module/tabsdatak-dataquality#tabsdatak.dataquality.RangeClosedOnSpec) (Literal\['none', 'lower', 'upper', 'both'\])

Which bounds are inclusive: `"none"`, `"lower"`, `"upper"` or `"both"` (default `"both"`).

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

`tags`[TagsSpec](https://docs.tabsdata.com/api/module/tabsdatak-dataquality#tabsdatak.dataquality.TagsSpec) | None ([list](https://docs.python.org/3/library/stdtypes.html#list)\[[str](https://docs.python.org/3/library/stdtypes.html#str)\] | None)

Optional labels for this classifier. An operator given the same tag applies only to the classifiers carrying it; untagged operators apply to all of them.

parameter

`prefix`PrefixSpec | None ([str](https://docs.python.org/3/library/stdtypes.html#str) | None)

Prepended verbatim to every verdict column name this classifier produces, inferred or explicit. `None` (the default) uses `@td.dq.`; `""` adds no prefix; any other string is used as given.

## Methods

method

`to_dict`

```python
def to_dict() -> dict[str, Any]
```

method

`to_json`

```python
def to_json(indent: int | None = None) -> str
```

**Parameters:**

parameter

`indent`[int](https://docs.python.org/3/builtins/functions.html#int) | None

method

`from_dict`

```python
def from_dict(d: dict[str, Any]) -> Any
```

**Parameters:**

parameter

`d`[dict](https://docs.python.org/3/builtins/stdtypes.html#dict)\[[str](https://docs.python.org/3/builtins/stdtypes.html#str), [Any](https://docs.python.org/3/library/typing.html#typing.Any)\]

method

`from_json`

```python
def from_json(s: str | bytes) -> Any
```

**Parameters:**

parameter

`s`[str](https://docs.python.org/3/builtins/stdtypes.html#str) | [bytes](https://docs.python.org/3/builtins/stdtypes.html#bytes)

method

`supported_dtypes`

```python
def supported_dtypes() -> frozenset
```

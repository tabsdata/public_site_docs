# IdentityScale

> A scale with one bin per integer step over `[min_val, max_val]` (used with `ScaleCategorizer`).

Source: https://docs.tabsdata.com/api/category/dataquality/dq-classifier/identityscale

class

```python
class IdentityScale(
    min_val: ScaleIdentityLimitSpec,
    max_val: ScaleIdentityLimitSpec,
    use_bin_zero: bool = False,
)
```

Bases: [Scale](https://docs.tabsdata.com/api/category/dataquality/dq-classifier/scale)

**Categories:** dq-classifier

A scale with one bin per integer step over `[min_val, max_val]` (used with [`ScaleCategorizer`](https://docs.tabsdata.com/api/category/dataquality/dq-classifier/scalecategorizer)).

Bin `i` holds the integer `min_val + i`. `min_val` itself shares bin 1 with `min_val + 1`, unless `use_bin_zero` is `True`: then it gets bin 0 and every integer in the range has its own bin.

## Examples

One bin per whole value in the range -- here a bin for each score from 1 to 5, with 1 in bin 0:

```python
ScaleCategorizer(
    ["score"],
    scale=IdentityScale(1, 5, use_bin_zero=True),
)
```

## Parameters

parameter

`min_val`[ScaleIdentityLimitSpec](https://docs.tabsdata.com/api/module/tabsdatak-dataquality#tabsdatak.dataquality.ScaleIdentityLimitSpec) (StrictInt)

Lowest integer of the scale; a whole number.

parameter

`max_val`[ScaleIdentityLimitSpec](https://docs.tabsdata.com/api/module/tabsdatak-dataquality#tabsdatak.dataquality.ScaleIdentityLimitSpec) (StrictInt)

Highest integer of the scale; a whole number strictly greater than `min_val` and no more than 100 above it (the span is the bin count).

parameter

`use_bin_zero`[bool](https://docs.python.org/3/builtins/functions.html#bool)

If `False`, the minimum value belongs to the first bin; if `True`, `min_val` gets its own bin 0.

## Properties

property

`bins`[int](https://docs.python.org/3/builtins/functions.html#int)

The number of bins, derived from the (min, max) range.

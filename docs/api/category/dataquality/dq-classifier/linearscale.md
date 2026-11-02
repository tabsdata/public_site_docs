# LinearScale

> A scale that splits `[min_val, max_val]` into equal-width bins (used with `ScaleCategorizer`).

Source: https://docs.tabsdata.com/api/category/dataquality/dq-classifier/linearscale

class

```python
class LinearScale(
    min_val: ScaleLimitSpec,
    max_val: ScaleLimitSpec,
    bins: BinCountSpec = MAX_BINS,
    use_bin_zero: bool = False,
)
```

Bases: [Scale](https://docs.tabsdata.com/api/category/dataquality/dq-classifier/scale)

**Categories:** dq-classifier

A scale that splits `[min_val, max_val]` into equal-width bins (used with [`ScaleCategorizer`](https://docs.tabsdata.com/api/category/dataquality/dq-classifier/scalecategorizer)).

## Examples

Ten equally wide bins between 0 and 100:

```python
ScaleCategorizer(["amount"], scale=LinearScale(0.0, 100.0, bins=10))
```

## Parameters

parameter

`min_val`[ScaleLimitSpec](https://docs.tabsdata.com/api/module/tabsdatak-dataquality#tabsdatak.dataquality.ScaleLimitSpec) (StrictInt | StrictFloat)

Lowest value of the scale; an int or float.

parameter

`max_val`[ScaleLimitSpec](https://docs.tabsdata.com/api/module/tabsdatak-dataquality#tabsdatak.dataquality.ScaleLimitSpec) (StrictInt | StrictFloat)

Highest value of the scale; strictly greater than `min_val`.

parameter

`bins`[BinCountSpec](https://docs.tabsdata.com/api/module/tabsdatak-dataquality#tabsdatak.dataquality.BinCountSpec) (StrictInt)

Number of bins to split the range into; a whole number from 1 to 100 (default 100).

parameter

`use_bin_zero`[bool](https://docs.python.org/3/builtins/functions.html#bool)

If `False`, the minimum value belongs to the first bin; if `True`, `min_val` gets its own bin 0.

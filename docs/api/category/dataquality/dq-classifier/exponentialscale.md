# ExponentialScale

> A scale whose bin edges are spaced exponentially over `[min_val, max_val]` (used with `ScaleCategorizer`).

Source: https://docs.tabsdata.com/api/category/dataquality/dq-classifier/exponentialscale

class

```python
class ExponentialScale(
    min_val: ScaleLimitSpec,
    max_val: ScaleLimitSpec,
    base: ScaleBaseSpec = math.e,
    bins: BinCountSpec = MAX_BINS,
    use_bin_zero: bool = False,
)
```

Bases: [Scale](https://docs.tabsdata.com/api/category/dataquality/dq-classifier/scale)

**Categories:** dq-classifier

A scale whose bin edges are spaced exponentially over `[min_val, max_val]` (used with [`ScaleCategorizer`](https://docs.tabsdata.com/api/category/dataquality/dq-classifier/scalecategorizer)).

The edges grow geometrically, so the bins widen as values grow, the mirror of [`LogarithmicScale`](https://docs.tabsdata.com/api/category/dataquality/dq-classifier/logarithmicscale). A range with `min_val <= 0` is shifted to positive values before the edges are computed.

## Examples

Bins that widen as values grow -- useful for long-tailed values. Here the edges are 10, 100 and 1000:

```python
ScaleCategorizer(
    ["amount"],
    scale=ExponentialScale(1.0, 1000.0, base=10.0, bins=3),
)
```

## Parameters

parameter

`min_val`[ScaleLimitSpec](https://docs.tabsdata.com/api/module/tabsdatak-dataquality#tabsdatak.dataquality.ScaleLimitSpec) (StrictInt | StrictFloat)

Lowest value of the scale; an int or float.

parameter

`max_val`[ScaleLimitSpec](https://docs.tabsdata.com/api/module/tabsdatak-dataquality#tabsdatak.dataquality.ScaleLimitSpec) (StrictInt | StrictFloat)

Highest value of the scale; strictly greater than `min_val`.

parameter

`base`[ScaleBaseSpec](https://docs.tabsdata.com/api/module/tabsdatak-dataquality#tabsdatak.dataquality.ScaleBaseSpec) (StrictFloat)

Base of the exponent; a float greater than 0 (default `e`).

parameter

`bins`[BinCountSpec](https://docs.tabsdata.com/api/module/tabsdatak-dataquality#tabsdatak.dataquality.BinCountSpec) (StrictInt)

Number of bins; a whole number from 1 to 100 (default 100).

parameter

`use_bin_zero`[bool](https://docs.python.org/3/builtins/functions.html#bool)

If `False`, the minimum value belongs to the first bin; if `True`, `min_val` gets its own bin 0.

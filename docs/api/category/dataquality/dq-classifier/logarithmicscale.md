# LogarithmicScale

> A scale whose bin edges are spaced logarithmically over `[min_val, max_val]` (used with `ScaleCategorizer`).

Source: https://docs.tabsdata.com/api/category/dataquality/dq-classifier/logarithmicscale

class

```python
class LogarithmicScale(
    min_val: ScaleLimitSpec,
    max_val: ScaleLimitSpec,
    base: ScaleBaseSpec = math.e,
    bins: BinCountSpec = MAX_BINS,
    use_bin_zero: bool = False,
)
```

Bases: [Scale](https://docs.tabsdata.com/api/category/dataquality/dq-classifier/scale)

**Categories:** dq-classifier

A scale whose bin edges are spaced logarithmically over `[min_val, max_val]` (used with [`ScaleCategorizer`](https://docs.tabsdata.com/api/category/dataquality/dq-classifier/scalecategorizer)).

The edges are the logarithms of evenly spaced points between `base ** min_val` and `base ** max_val`, so the bins narrow as values grow and values near `max_val` are resolved most finely.

## Examples

Bins that narrow as values grow -- here with edges at about 2.52, 2.82 and 3:

```python
ScaleCategorizer(
    ["amount"],
    scale=LogarithmicScale(0.0, 3.0, base=10.0, bins=3),
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

Base of the logarithm; a float greater than 0 (default `e`). `base ** min_val` and `base ** max_val` must not overflow a float.

parameter

`bins`[BinCountSpec](https://docs.tabsdata.com/api/module/tabsdatak-dataquality#tabsdatak.dataquality.BinCountSpec) (StrictInt)

Number of bins; a whole number from 1 to 100 (default 100).

parameter

`use_bin_zero`[bool](https://docs.python.org/3/builtins/functions.html#bool)

If `False`, the minimum value belongs to the first bin; if `True`, `min_val` gets its own bin 0.

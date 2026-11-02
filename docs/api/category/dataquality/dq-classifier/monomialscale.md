# MonomialScale

> A power-law scale over `[min_val, max_val]` whose bin widths grow as a power of the value (used with `ScaleCategorizer`).

Source: https://docs.tabsdata.com/api/category/dataquality/dq-classifier/monomialscale

class

```python
class MonomialScale(
    min_val: ScaleLimitSpec,
    max_val: ScaleLimitSpec,
    power: ScalePowerSpec,
    bins: BinCountSpec = MAX_BINS,
    use_bin_zero: bool = False,
)
```

Bases: [Scale](https://docs.tabsdata.com/api/category/dataquality/dq-classifier/scale)

**Categories:** dq-classifier

A power-law scale over `[min_val, max_val]` whose bin widths grow as a power of the value (used with [`ScaleCategorizer`](https://docs.tabsdata.com/api/category/dataquality/dq-classifier/scalecategorizer)).

## Examples

Bins whose width grows with a power of the value, so small values are resolved more finely:

```python
ScaleCategorizer(
    ["amount"],
    scale=MonomialScale(0.0, 100.0, power=2.0, bins=10),
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

`power`[ScalePowerSpec](https://docs.tabsdata.com/api/module/tabsdatak-dataquality#tabsdatak.dataquality.ScalePowerSpec) (StrictFloat)

Exponent of the power-law spacing; a float greater than 0.

parameter

`bins`[BinCountSpec](https://docs.tabsdata.com/api/module/tabsdatak-dataquality#tabsdatak.dataquality.BinCountSpec) (StrictInt)

Number of bins; a whole number from 1 to 100 (default 100).

parameter

`use_bin_zero`[bool](https://docs.python.org/3/builtins/functions.html#bool)

If `False`, the minimum value belongs to the first bin; if `True`, `min_val` gets its own bin 0.

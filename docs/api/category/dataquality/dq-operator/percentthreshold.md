# PercentThreshold

> A `Fail` threshold expressed as a percentage of the table's rows.

Source: https://docs.tabsdata.com/api/category/dataquality/dq-operator/percentthreshold

class

```python
class PercentThreshold(percent: PercentSpec)
```

Bases: [Threshold](https://docs.tabsdata.com/api/category/dataquality/dq-operator/threshold)

**Categories:** dq-operator

A [`Fail`](https://docs.tabsdata.com/api/category/dataquality/dq-operator/fail) threshold expressed as a percentage of the table's rows.

## Examples

Fail when a twentieth of the table is selected:

```python
Fail(AnyFailed(), PercentThreshold(5))
```

## Parameters

parameter

`percent`[PercentSpec](https://docs.tabsdata.com/api/module/tabsdatak-dataquality#tabsdatak.dataquality.PercentSpec) (StrictInt | StrictFloat)

Percentage of rows (0 to 100) that, when reached, triggers the failure.

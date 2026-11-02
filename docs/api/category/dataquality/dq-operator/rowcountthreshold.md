# RowCountThreshold

> A `Fail` threshold expressed as an absolute number of rows.

Source: https://docs.tabsdata.com/api/category/dataquality/dq-operator/rowcountthreshold

class

```python
class RowCountThreshold(row_count: RowCountSpec)
```

Bases: [Threshold](https://docs.tabsdata.com/api/category/dataquality/dq-operator/threshold)

**Categories:** dq-operator

A [`Fail`](https://docs.tabsdata.com/api/category/dataquality/dq-operator/fail) threshold expressed as an absolute number of rows.

## Examples

Fail as soon as one row is selected:

```python
Fail(AnyFailed(), RowCountThreshold(1))
```

## Parameters

parameter

`row_count`[RowCountSpec](https://docs.tabsdata.com/api/module/tabsdatak-dataquality#tabsdatak.dataquality.RowCountSpec) (StrictInt)

Row count that, when reached, triggers the failure; a non-negative whole number.

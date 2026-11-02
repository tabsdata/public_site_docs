# CategoryCriteria

> Abstract base for criteria over a categorizer's bin assignments.

Source: https://docs.tabsdata.com/api/category/dataquality/dq-operator/categorycriteria

class

```python
class CategoryCriteria(column_name: ColumnNameSpec, bins: BinsCriteriaSpec)
```

Bases: [Criteria](https://docs.tabsdata.com/api/category/dataquality/dq-operator/criteria), [ABC](https://docs.python.org/3/library/abc.html#abc.ABC)

**Categories:** dq-operator

Abstract base for criteria over a categorizer's bin assignments.

## Examples

The concrete category criteria are [`InBins`](https://docs.tabsdata.com/api/category/dataquality/dq-operator/inbins) and [`NotInBins`](https://docs.tabsdata.com/api/category/dataquality/dq-operator/notinbins):

```python
InBins(column_name="amount_bin", bins={0, 1})
NotInBins(column_name="amount_bin", bins={"overflow"})
```

## Parameters

parameter

`column_name`[ColumnNameSpec](https://docs.tabsdata.com/api/module/tabsdatak-dataquality#tabsdatak.dataquality.ColumnNameSpec) ([str](https://docs.python.org/3/library/stdtypes.html#str))

Name of the column holding the bin index produced by a [`ScaleCategorizer`](https://docs.tabsdata.com/api/category/dataquality/dq-classifier/scalecategorizer).

parameter

`bins`[BinsCriteriaSpec](https://docs.tabsdata.com/api/module/tabsdatak-dataquality#tabsdatak.dataquality.BinsCriteriaSpec) (Set\[StrictInt | Literal\['none', 'nan', 'underflow', 'overflow'\]\])

Bins to match; a non-empty set of bin indices (0 to 100) and/ or the special bins `"none"`, `"nan"`, `"underflow"` and `"overflow"`.

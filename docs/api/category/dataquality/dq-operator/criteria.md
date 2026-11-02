# Criteria

> Selects rows for a `Filter`, `Select` or `Fail` operator.

Source: https://docs.tabsdata.com/api/category/dataquality/dq-operator/criteria

class

```python
class Criteria
```

Bases: [ABC](https://docs.python.org/3/library/abc.html#abc.ABC), `JsonSerde`

**Categories:** dq-operator

Selects rows for a [`Filter`](https://docs.tabsdata.com/api/category/dataquality/dq-operator/filter), [`Select`](https://docs.tabsdata.com/api/category/dataquality/dq-operator/select) or [`Fail`](https://docs.tabsdata.com/api/category/dataquality/dq-operator/fail) operator.

A criteria turns classifier verdicts into a per-row selection: boolean criteria ([`AllOk`](https://docs.tabsdata.com/api/category/dataquality/dq-operator/allok) / [`AnyFailed`](https://docs.tabsdata.com/api/category/dataquality/dq-operator/anyfailed)) read boolean classifiers; category criteria ([`InBins`](https://docs.tabsdata.com/api/category/dataquality/dq-operator/inbins) / [`NotInBins`](https://docs.tabsdata.com/api/category/dataquality/dq-operator/notinbins)) read a categorizer's bins.

## Examples

A criteria turns verdicts into a row selection for [`Filter`](https://docs.tabsdata.com/api/category/dataquality/dq-operator/filter), [`Select`](https://docs.tabsdata.com/api/category/dataquality/dq-operator/select) or [`Fail`](https://docs.tabsdata.com/api/category/dataquality/dq-operator/fail):

```python
Filter(AnyFailed())
Select(InBins(column_name="amount_bin", bins={0}), to_table="low")
```

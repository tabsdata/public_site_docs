# CriteriaOperator

> An operator that uses a criteria to select records.

Source: https://docs.tabsdata.com/api/category/dataquality/dq-operator/criteriaoperator

class

```python
class CriteriaOperator(criteria: Criteria)
```

Bases: [Operator](https://docs.tabsdata.com/api/category/dataquality/dq-operator/operator), [ABC](https://docs.python.org/3/library/abc.html#abc.ABC)

**Categories:** dq-operator

An operator that uses a criteria to select records.

## Examples

The operators driven by a criteria are [`Filter`](https://docs.tabsdata.com/api/category/dataquality/dq-operator/filter), [`Select`](https://docs.tabsdata.com/api/category/dataquality/dq-operator/select) and [`Fail`](https://docs.tabsdata.com/api/category/dataquality/dq-operator/fail):

```python
Filter(AnyFailed())
Select(AnyFailed(), to_table="rejected")
Fail(AnyFailed(), PercentThreshold(1))
```

## Parameters

parameter

`criteria`[Criteria](https://docs.tabsdata.com/api/category/dataquality/dq-operator/criteria)

Selects the rows this operator acts on.

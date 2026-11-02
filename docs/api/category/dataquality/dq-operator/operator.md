# Operator

> Abstract base class for all data quality operators.

Source: https://docs.tabsdata.com/api/category/dataquality/dq-operator/operator

class

```python
class Operator
```

Bases: [ABC](https://docs.python.org/3/library/abc.html#abc.ABC), `JsonSerde`

**Categories:** dq-operator

Abstract base class for all data quality operators.

An operator acts on the verdicts produced by a [`DataQuality`](https://docs.tabsdata.com/api/category/dataquality/dataquality) action's classifiers: append them ([`Enrich`](https://docs.tabsdata.com/api/category/dataquality/dq-operator/enrich)), summarize them ([`Summary`](https://docs.tabsdata.com/api/category/dataquality/dq-operator/summary)), filter or select rows by a [`Criteria`](https://docs.tabsdata.com/api/category/dataquality/dq-operator/criteria) ([`Filter`](https://docs.tabsdata.com/api/category/dataquality/dq-operator/filter) / [`Select`](https://docs.tabsdata.com/api/category/dataquality/dq-operator/select)), or abort the transaction ([`Fail`](https://docs.tabsdata.com/api/category/dataquality/dq-operator/fail)). Collect operators in `DataQuality(operators=[...])`.

## Examples

Operators are the acting half of a check; pass concrete ones to `DataQuality(operators=[...])`:

```python
DataQuality(
    table="checked",
    classifiers=[IsNotNull(["customer_id"])],
    operators=[Enrich(), Summary()],
)
```

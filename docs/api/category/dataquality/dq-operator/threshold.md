# Threshold

> Abstract base class for the thresholds used by the `Fail` operator.

Source: https://docs.tabsdata.com/api/category/dataquality/dq-operator/threshold

class

```python
class Threshold
```

Bases: [ABC](https://docs.python.org/3/library/abc.html#abc.ABC), `JsonSerde`

**Categories:** dq-operator

Abstract base class for the thresholds used by the [`Fail`](https://docs.tabsdata.com/api/category/dataquality/dq-operator/fail) operator.

A threshold sets how many selected rows trigger the failure: an absolute count ([`RowCountThreshold`](https://docs.tabsdata.com/api/category/dataquality/dq-operator/rowcountthreshold)) or a percentage ([`PercentThreshold`](https://docs.tabsdata.com/api/category/dataquality/dq-operator/percentthreshold)).

## Examples

A threshold says how many selected rows make [`Fail`](https://docs.tabsdata.com/api/category/dataquality/dq-operator/fail) abort:

```python
Fail(AnyFailed(), RowCountThreshold(1))
Fail(AnyFailed(), PercentThreshold(5))
```

# BoolClassifier

> Abstract base class for classifiers with a boolean verdict.

Source: https://docs.tabsdata.com/api/category/dataquality/dq-classifier/boolclassifier

class

```python
class BoolClassifier
```

Bases: [Classifier](https://docs.tabsdata.com/api/category/dataquality/dq-classifier/classifier), [ABC](https://docs.python.org/3/library/abc.html#abc.ABC)

**Categories:** dq-classifier

Abstract base class for classifiers with a boolean verdict.

Each row is labelled `True` or `False` (or a reserved sentinel for null / nan). Boolean verdicts are consumed by the [`AllOk`](https://docs.tabsdata.com/api/category/dataquality/dq-operator/allok) and [`AnyFailed`](https://docs.tabsdata.com/api/category/dataquality/dq-operator/anyfailed) criteria used in [`Filter`](https://docs.tabsdata.com/api/category/dataquality/dq-operator/filter) / [`Select`](https://docs.tabsdata.com/api/category/dataquality/dq-operator/select) / [`Fail`](https://docs.tabsdata.com/api/category/dataquality/dq-operator/fail).

## Examples

Every boolean classifier labels each row `True` or `False`, one verdict column per classified column:

```python
IsPositive(["amount"])
```

## Methods

method

`supported_dtypes`

```python
def supported_dtypes() -> frozenset
```

Returns the set of data types supported by boolean classifiers.

# Categorizer

> Abstract base class for classifiers that assign each value to a bin.

Source: https://docs.tabsdata.com/api/category/dataquality/dq-classifier/categorizer

class

```python
class Categorizer
```

Bases: [Classifier](https://docs.tabsdata.com/api/category/dataquality/dq-classifier/classifier), [ABC](https://docs.python.org/3/library/abc.html#abc.ABC)

**Categories:** dq-classifier

Abstract base class for classifiers that assign each value to a bin.

Bin verdicts are consumed by the [`InBins`](https://docs.tabsdata.com/api/category/dataquality/dq-operator/inbins) and [`NotInBins`](https://docs.tabsdata.com/api/category/dataquality/dq-operator/notinbins) criteria.

## Examples

A categorizer labels each row with a bin number instead of a boolean; [`ScaleCategorizer`](https://docs.tabsdata.com/api/category/dataquality/dq-classifier/scalecategorizer) is the concrete one:

```python
ScaleCategorizer(["amount"], scale=LinearScale(0.0, 100.0, bins=4))
```

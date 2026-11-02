# Classifier

> Abstract base class for all data quality classifiers.

Source: https://docs.tabsdata.com/api/category/dataquality/dq-classifier/classifier

class

```python
class Classifier
```

Bases: [ABC](https://docs.python.org/3/library/abc.html#abc.ABC), `JsonSerde`

**Categories:** dq-classifier

Abstract base class for all data quality classifiers.

A classifier evaluates one or more columns and writes a per-row verdict into a new column. Collect classifiers in a [`DataQuality`](https://docs.tabsdata.com/api/category/dataquality/dataquality) action (`classifiers=[...]`) alongside the operators that act on their verdicts. Concrete classifiers are frozen; build one per rule.

Concrete classifiers share these construction fields (a few fix `on_wrong_type` / `on_wrong_value` and do not expose them):

## Examples

Classifiers are the labelling half of a check; pass concrete ones to `DataQuality(classifiers=[...])`:

```python
DataQuality(
    table="checked",
    classifiers=[IsNotNull(["customer_id"]), IsPositive(["amount"])],
    operators=[Enrich()],
)
```

## Methods

method

`supported_dtypes`

```python
def supported_dtypes() -> frozenset
```

Returns the set of data types supported by this classifier.

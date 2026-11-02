# Scale

> Abstract base class for the scales used by `ScaleCategorizer`.

Source: https://docs.tabsdata.com/api/category/dataquality/dq-classifier/scale

class

```python
class Scale
```

Bases: [ABC](https://docs.python.org/3/library/abc.html#abc.ABC), `JsonSerde`

**Categories:** dq-classifier

Abstract base class for the scales used by [`ScaleCategorizer`](https://docs.tabsdata.com/api/category/dataquality/dq-classifier/scalecategorizer).

A scale defines how a numeric range is divided into bins. Concrete scales differ only in how the bin edges are spaced.

## Examples

A scale maps a value to a bin for [`ScaleCategorizer`](https://docs.tabsdata.com/api/category/dataquality/dq-classifier/scalecategorizer):

```python
ScaleCategorizer(
    ["amount"],
    scale=LinearScale(0.0, 100.0, bins=10),
)
```

# Fail

> An operator that fails (aborts) the current transaction when the rows selected by `criteria` reach `threshold`.

Source: https://docs.tabsdata.com/api/category/dataquality/dq-operator/fail

class

```python
class Fail(threshold: Threshold, criteria: Criteria)
```

Bases: [CriteriaOperator](https://docs.tabsdata.com/api/category/dataquality/dq-operator/criteriaoperator)

**Categories:** dq-operator

An operator that fails (aborts) the current transaction when the rows selected by `criteria` reach `threshold`.

## Examples

Abort the transaction on the first failing row:

```python
Fail(AnyFailed(), RowCountThreshold(1))
```

Tolerate a little bad data instead, and fail only past a percentage:

```python
Fail(AnyFailed(), PercentThreshold(5))
```

## Parameters

parameter

`threshold`[Threshold](https://docs.tabsdata.com/api/category/dataquality/dq-operator/threshold)

The [`RowCountThreshold`](https://docs.tabsdata.com/api/category/dataquality/dq-operator/rowcountthreshold) or [`PercentThreshold`](https://docs.tabsdata.com/api/category/dataquality/dq-operator/percentthreshold) that, when reached, fails the transaction.

parameter

`criteria`[Criteria](https://docs.tabsdata.com/api/category/dataquality/dq-operator/criteria)

Selects the rows counted against the threshold.

## Methods

method

`to_dict`

```python
def to_dict() -> dict[str, Any]
```

method

`to_json`

```python
def to_json(indent: int | None = None) -> str
```

**Parameters:**

parameter

`indent`[int](https://docs.python.org/3/builtins/functions.html#int) | None

method

`from_dict`

```python
def from_dict(d: dict[str, Any]) -> Any
```

**Parameters:**

parameter

`d`[dict](https://docs.python.org/3/builtins/stdtypes.html#dict)\[[str](https://docs.python.org/3/builtins/stdtypes.html#str), [Any](https://docs.python.org/3/library/typing.html#typing.Any)\]

method

`from_json`

```python
def from_json(s: str | bytes) -> Any
```

**Parameters:**

parameter

`s`[str](https://docs.python.org/3/builtins/stdtypes.html#str) | [bytes](https://docs.python.org/3/builtins/stdtypes.html#bytes)

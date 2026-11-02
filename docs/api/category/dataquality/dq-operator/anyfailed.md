# AnyFailed

> A boolean criteria that selects rows where at least one boolean classifier fails (`False`).

Source: https://docs.tabsdata.com/api/category/dataquality/dq-operator/anyfailed

class

```python
class AnyFailed(
    none_is_ok: bool = False,
    nan_is_ok: bool = False,
    tags: TagsSpec | None = field(default=None, kw_only=True),
)
```

Bases: [BoolCriteria](https://docs.tabsdata.com/api/category/dataquality/dq-operator/boolcriteria)

**Categories:** dq-operator

A boolean criteria that selects rows where at least one boolean classifier fails (`False`). Use with [`Filter`](https://docs.tabsdata.com/api/category/dataquality/dq-operator/filter), [`Select`](https://docs.tabsdata.com/api/category/dataquality/dq-operator/select) or [`Fail`](https://docs.tabsdata.com/api/category/dataquality/dq-operator/fail).

## Examples

```python
Filter(AnyFailed())
```

Scope it to the classifiers carrying a tag:

```python
AnyFailed(tags=["required"])
```

## Parameters

parameter

`none_is_ok`[bool](https://docs.python.org/3/builtins/functions.html#bool)

Treat a null verdict as passing (default `False`).

parameter

`nan_is_ok`[bool](https://docs.python.org/3/builtins/functions.html#bool)

Treat a `NaN` verdict as passing (default `False`).

parameter

`tags`[TagsSpec](https://docs.tabsdata.com/api/module/tabsdatak-dataquality#tabsdatak.dataquality.TagsSpec) | None ([list](https://docs.python.org/3/library/stdtypes.html#list)\[[str](https://docs.python.org/3/library/stdtypes.html#str)\] | None)

Optional tags; only the classifiers carrying a matching tag are considered.

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

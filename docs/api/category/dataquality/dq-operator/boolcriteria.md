# BoolCriteria

> Abstract base for criteria over boolean classifier verdicts.

Source: https://docs.tabsdata.com/api/category/dataquality/dq-operator/boolcriteria

class

```python
class BoolCriteria(
    none_is_ok: bool = False,
    nan_is_ok: bool = False,
    tags: TagsSpec | None = field(default=None, kw_only=True),
)
```

Bases: [Criteria](https://docs.tabsdata.com/api/category/dataquality/dq-operator/criteria), [ABC](https://docs.python.org/3/library/abc.html#abc.ABC)

**Categories:** dq-operator

Abstract base for criteria over boolean classifier verdicts.

## Examples

The concrete boolean criteria are [`AllOk`](https://docs.tabsdata.com/api/category/dataquality/dq-operator/allok) and [`AnyFailed`](https://docs.tabsdata.com/api/category/dataquality/dq-operator/anyfailed):

```python
Filter(AnyFailed())
Select(AllOk(), to_table="clean")
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

Optional list of tags; only classifiers carrying a matching tag are considered.

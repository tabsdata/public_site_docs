# TagOperator

> An operator that is scoped to classifiers by tag.

Source: https://docs.tabsdata.com/api/category/dataquality/dq-operator/tagoperator

class

```python
class TagOperator(tags: TagsSpec | None = field(default=None, kw_only=True))
```

Bases: [Operator](https://docs.tabsdata.com/api/category/dataquality/dq-operator/operator), [ABC](https://docs.python.org/3/library/abc.html#abc.ABC)

**Categories:** dq-operator

An operator that is scoped to classifiers by tag.

## Examples

A tagged operator applies only to the classifiers carrying that tag:

```python
DataQuality(
    table="checked",
    classifiers=[IsNotNull(["customer_id"], tags=["required"])],
    operators=[Summary(tags=["required"])],
)
```

## Parameters

parameter

`tags`[TagsSpec](https://docs.tabsdata.com/api/module/tabsdatak-dataquality#tabsdatak.dataquality.TagsSpec) | None ([list](https://docs.python.org/3/library/stdtypes.html#list)\[[str](https://docs.python.org/3/library/stdtypes.html#str)\] | None)

Optional tags; only the classifiers carrying a matching tag are applied.

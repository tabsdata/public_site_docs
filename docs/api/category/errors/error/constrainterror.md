# ConstraintError

> A field-value rule failure, carrying the `ErrorCode` describing it.

Source: https://docs.tabsdata.com/api/category/errors/error/constrainterror

class

```python
class ConstraintError(code: ErrorCode, **kwargs: Any = {}, extra)
```

Bases: [ValueError](https://docs.python.org/3/builtins/exceptions.html#ValueError)

**Categories:** error

A field-value rule failure, carrying the [`ErrorCode`](https://docs.tabsdata.com/api/category/errors/error/errorcode) describing it.

Raised by `tabsdatak._api.Rule` when a field's text fails one of its checks. Subclasses `ValueError` so pydantic collects it like any other field error: the field location and every sibling field's failure survive into the enclosing `ValidationError`, which a bare [`TabsdataException`](https://docs.tabsdata.com/api/category/errors/error/tabsdataexception) would short-circuit. `_render_cause` reads `code` back off the instance so the rendered message carries the specific code rather than pydantic's generic "Value error" prefix.

## Parameters

parameter

`code`[ErrorCode](https://docs.tabsdata.com/api/category/errors/error/errorcode)

The [`ErrorCode`](https://docs.tabsdata.com/api/category/errors/error/errorcode) for the rule that failed.

parameter

`**kwargs`[Any](https://docs.python.org/3/library/typing.html#typing.Any)

parameter

`extra`

The kwargs used to render the message.

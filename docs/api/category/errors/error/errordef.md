# ErrorDef

> Static description of one error site: the exception class to raise plus a `str.format_map` message template.

Source: https://docs.tabsdata.com/api/category/errors/error/errordef

class

```python
class ErrorDef(exception: Type['TabsdataException'], message_template: str)
```

**Categories:** error

Static description of one error site: the exception class to raise plus a `str.format_map` message template.

## Parameters

parameter

`exception`[Type](https://docs.python.org/3/library/typing.html#typing.Type)\['TabsdataException'\]

[`TabsdataException`](https://docs.tabsdata.com/api/category/errors/error/tabsdataexception) subclass to instantiate.

parameter

`message_template`[str](https://docs.python.org/3/builtins/stdtypes.html#str)

Format string applied with the kwargs from `ErrorCode.exception` (missing keys are left as `{name}` placeholders).

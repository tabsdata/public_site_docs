# TabsdataException

> Base class for every framework error.

Source: https://docs.tabsdata.com/api/category/errors/error/tabsdataexception

class

```python
class TabsdataException(
    api_error: ErrorCode | None = None,
    message: str = '',
    cause: Exception | None = None,
    extra: dict[str, Any] | None = None,
    **kwargs: Any = {},
    source: str | None,
)
```

Bases: [Exception](https://docs.python.org/3/builtins/exceptions.html#Exception)

**Categories:** error

Base class for every framework error.

## Parameters

parameter

`api_error`[ErrorCode](https://docs.tabsdata.com/api/category/errors/error/errorcode) | None

The originating [`ErrorCode`](https://docs.tabsdata.com/api/category/errors/error/errorcode).

parameter

`message`[str](https://docs.python.org/3/builtins/stdtypes.html#str)

parameter

`cause`[Exception](https://docs.python.org/3/builtins/exceptions.html#Exception) | None

Optional underlying exception.

parameter

`extra`[dict](https://docs.python.org/3/builtins/stdtypes.html#dict)\[[str](https://docs.python.org/3/builtins/stdtypes.html#str), [Any](https://docs.python.org/3/library/typing.html#typing.Any)\] | None

The kwargs used to render the message.

parameter

`**kwargs`[Any](https://docs.python.org/3/library/typing.html#typing.Any)

parameter

`source`[str](https://docs.python.org/3/builtins/stdtypes.html#str) | None

When `TABSDATA_DEBUG_FRAMES` is enabled, a `filename:lineno: source` snippet pinpointing the user's call site; otherwise `None`.

# ErrorCode

> Abstract base for connector error-code enums.

Source: https://docs.tabsdata.com/api/category/errors/error/errorcode

class

```python
class ErrorCode
```

Bases: [Enum](https://docs.python.org/3/library/enum.html#enum.Enum)

**Categories:** error

Abstract base for connector error-code enums.

Concrete subclasses declare variants whose values are [`ErrorDef`](https://docs.tabsdata.com/api/category/errors/error/errordef) instances. Call `exception` to render a template and raise the bound exception.

## Examples

```python
raise MysqlErrorCode.MYSQL_5.exception(
    cause=sqlalchemy_err, uri=conn.uri,
)
```

## Methods

method

`message`

```python
def message(**kwargs: Any = {}) -> str
```

Render this code's message template without raising.

**Parameters:**

parameter

`**kwargs`[Any](https://docs.python.org/3/library/typing.html#typing.Any)

Substituted into the template; missing keys are left as `{name}` placeholders.

method

`exception`

```python
def exception(cause: Exception | None = None, **kwargs: Any = {}) -> 'TabsdataException'
```

Build a [`TabsdataException`](https://docs.tabsdata.com/api/category/errors/error/tabsdataexception) for this code.

**Parameters:**

parameter

`cause`[Exception](https://docs.python.org/3/builtins/exceptions.html#Exception) | None

Underlying exception to chain via `__cause__` (the framework also sets `__suppress_context__` so the traceback reads as `raise ... from cause`).

parameter

`**kwargs`[Any](https://docs.python.org/3/library/typing.html#typing.Any)

Substituted into the message template; surplus keys are stashed on the exception's `extra`.

**Returns:**

The bound [`TabsdataException`](https://docs.tabsdata.com/api/category/errors/error/tabsdataexception) subclass instance, ready to

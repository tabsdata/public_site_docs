# check_plugin_param_type

> Validate a plugin method's parameter type matches `expected`.

Source: https://docs.tabsdata.com/api/category/spi/spi/check-plugin-param-type

function

```python
def check_plugin_param_type(
    plugin_cls: type,
    method_name: str,
    param_name: str,
    expected: type,
)
```

**Categories:** spi

Validate a plugin method's parameter type matches `expected`.

Resolves `plugin_cls.<method_name>`'s type hints and requires the `param_name` parameter to be annotated with a class that `expected` is a subclass of. Skips silently when the parameter has no concrete annotation (e.g. an inherited abstract method whose type is still a TypeVar), so the check only fires on concretely typed plugins. Used by the `*Def` validators.

## Parameters

parameter

`plugin_cls`[type](https://docs.python.org/3/builtins/functions.html#type)

The plugin class to inspect.

parameter

`method_name`[str](https://docs.python.org/3/builtins/stdtypes.html#str)

The method whose parameter is checked.

parameter

`param_name`[str](https://docs.python.org/3/builtins/stdtypes.html#str)

The parameter to check.

parameter

`expected`[type](https://docs.python.org/3/builtins/functions.html#type)

The type the parameter's annotation must accept.

## Raises

-   `ValueError` — If the method is missing or the annotation rejects `expected`.

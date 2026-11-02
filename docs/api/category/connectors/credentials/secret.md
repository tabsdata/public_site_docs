# Secret

> Reference to a secret value, used for credential fields.

Source: https://docs.tabsdata.com/api/category/connectors/credentials/secret

class

```python
class Secret(value: str | None = None)
```

**Categories:** credentials

Reference to a secret value, used for credential fields.

A [`Secret`](https://docs.tabsdata.com/api/category/connectors/credentials/secret) is either _hydrated_ -- `Secret("hunter2")`, whose `value()` returns the value -- or _dehydrated_ -- `Secret()`, whose `value()` raises. `None` is the dehydrated sentinel and is never a valid value. It always serializes to the redacted marker `":secret:"`, so the value never lands in the serialized form and `str(secret)` is always redacted.

## Parameters

parameter

`value`[str](https://docs.python.org/3/builtins/stdtypes.html#str) | None

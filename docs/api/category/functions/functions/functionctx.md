# FunctionCtx

> Context handed to a user-decorated function (`@publisher` / `@transformer` / `@subscriber`) that declares a trailing `ctx` parameter.

Source: https://docs.tabsdata.com/api/category/functions/functions/functionctx

class

```python
class FunctionCtx
```

Bases: [TransactionCtx](https://docs.tabsdata.com/api/module/tabsdatak-api#tabsdatak.api.TransactionCtx), [FlowCtx](https://docs.tabsdata.com/api/category/functions/functions/flowctx), [ABC](https://docs.python.org/3/library/abc.html#abc.ABC)

**Categories:** functions

Context handed to a user-decorated function (`@publisher` / `@transformer` / `@subscriber`) that declares a trailing `ctx` parameter.

Combines [`TransactionCtx`](https://docs.tabsdata.com/api/module/tabsdatak-api#tabsdatak.api.TransactionCtx) (trx identifiers + per-flow attributes via `get_attr` / `set_attr`) with [`FlowCtx`](https://docs.tabsdata.com/api/category/functions/functions/flowctx) (flow identifiers), so the function can read state from the previous run and persist state for the next. It also gives the function the secrets of its project (`secret_names` / `secret`). Unlike the plugin contexts of `tabsdatak.spi` it does not carry plugin-only surface such as `work_dir`.

## Properties

property

`secret_names`[list](https://docs.python.org/3/builtins/stdtypes.html#list)\[[str](https://docs.python.org/3/builtins/stdtypes.html#str)\]

Names of the secrets of the function's project.

## Methods

method

`secret_keys`

```python
def secret_keys(name: str) -> list[str]
```

Keys of the project secret `name`.

Secret names ignore case. Raises `KeyError` when the project has no secret with that name.

**Parameters:**

parameter

`name`[str](https://docs.python.org/3/builtins/stdtypes.html#str)

method

`secret`

```python
def secret(name: str, key: str | None = None) -> str
```

Value of a key of a project secret.

Accepts the secret and the key separately, `secret("aws", "key1")`, or joined by a dot, `secret("aws.key1")`. Secret names and keys ignore case. Raises `KeyError` when the project has no such secret or key.

**Parameters:**

parameter

`name`[str](https://docs.python.org/3/builtins/stdtypes.html#str)

parameter

`key`[str](https://docs.python.org/3/builtins/stdtypes.html#str) | None

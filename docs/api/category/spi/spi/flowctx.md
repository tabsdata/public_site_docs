# FlowCtx

> Flow-level identifiers (collection / function) shared by every role that runs inside a trx -- plugins *and* user-decorated functions.

Source: https://docs.tabsdata.com/api/category/spi/spi/flowctx

class

```python
class FlowCtx
```

Bases: [ABC](https://docs.python.org/3/library/abc.html#abc.ABC)

**Categories:** spi

Flow-level identifiers (collection / function) shared by every role that runs inside a trx -- plugins _and_ user-decorated functions.

Carries no plugin-specific surface (no `work_dir`).

## Properties

property

`collection_id`[str](https://docs.python.org/3/builtins/stdtypes.html#str)

Unique id of the collection the function belongs to.

property

`collection_name`[str](https://docs.python.org/3/builtins/stdtypes.html#str)

Human-readable collection name.

property

`function_id`[str](https://docs.python.org/3/builtins/stdtypes.html#str)

Unique id of the running function.

property

`function_name`[str](https://docs.python.org/3/builtins/stdtypes.html#str)

Human-readable function name.

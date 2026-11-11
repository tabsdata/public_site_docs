# FlowCtx

> Flow-level identifiers (project / collection / function) shared by every role that runs inside a trx -- plugins *and* user-decorated functions.

Source: https://docs.tabsdata.com/api/category/functions/functions/flowctx

class

```python
class FlowCtx
```

Bases: `FlowCtxLegacy`, [ABC](https://docs.python.org/3/library/abc.html#abc.ABC)

**Categories:** functions

Flow-level identifiers (project / collection / function) shared by every role that runs inside a trx -- plugins _and_ user-decorated functions.

Carries no plugin-specific surface (no `work_dir`).

## Properties

property

`project_id`[str](https://docs.python.org/3/builtins/stdtypes.html#str)

Unique id of the project the function belongs to.

property

`project`[str](https://docs.python.org/3/builtins/stdtypes.html#str)

Project name.

property

`collection_id`[str](https://docs.python.org/3/builtins/stdtypes.html#str)

Unique id of the collection the function belongs to.

property

`collection`[str](https://docs.python.org/3/builtins/stdtypes.html#str)

Collection name.

property

`function_id`[str](https://docs.python.org/3/builtins/stdtypes.html#str)

Unique id of the function, the same across its versions and runs.

property

`function`[str](https://docs.python.org/3/builtins/stdtypes.html#str)

Function name.

property

`function_version_id`[str](https://docs.python.org/3/builtins/stdtypes.html#str)

Unique id of the function version that runs (the patched version, when a patch applies).

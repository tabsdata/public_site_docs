# DatabricksSrc

> Databricks source for `@publisher` -- one output slot per query.

Source: https://docs.tabsdata.com/api/category/connectors/source/databrickssrc

class

```python
class DatabricksSrc(
    queries: QueriesSpec,
    initial_values: BasicDictSpec | None = None,
    src_cfg: SrcCfgSpec | None = None,
)
```

Bases: [Src](https://docs.tabsdata.com/api/category/connectors/source/src)

**Categories:** source

Databricks source for `@publisher` -- one output slot per query.

Every table this source publishes automatically carries two metadata columns: `@td.sql.query`, the text of the query that produced the row, and `@td.sql.initial_values`, the JSON serialization of the bind values that query ran with (an empty JSON object when it has no binds). Setting the `src_cfg` key `tabsdata.src_metadata.drop` to `True` leaves them off.

## Parameters

parameter

`queries`[QueriesSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-databricks#tabsdatak.conn.databricks.QueriesSpec) ([list](https://docs.python.org/3/library/stdtypes.html#list)\[[str](https://docs.python.org/3/library/stdtypes.html#str)\])

SQL statements, one output slot per entry, run through the Statement Execution API.

parameter

`initial_values`[BasicDictSpec](https://docs.tabsdata.com/api/module/tabsdatak-api#tabsdatak.api.BasicDictSpec) | None ([dict](https://docs.python.org/3/library/stdtypes.html#dict)\[[str](https://docs.python.org/3/library/stdtypes.html#str), [str](https://docs.python.org/3/library/stdtypes.html#str) | [int](https://docs.python.org/3/library/functions.html#int) | [float](https://docs.python.org/3/library/functions.html#float) | [bool](https://docs.python.org/3/library/functions.html#bool)\] | None)

Optional `{bind_name: value}` seed dict. Each name binds into the query as a `:var` statement parameter (typed, native binding); it seeds the first run only, after which the plugin reads `ctx.get_attr(bind_name)` and the function persists new values with `ctx.set_attr(bind_name, ...)`.

parameter

`src_cfg`[SrcCfgSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-databricks#tabsdatak.conn.databricks.SrcCfgSpec) | None (Mapping\[Literal\['databricks.logging\_level', 'tabsdata.src\_metadata.drop'\], [Any](https://docs.python.org/3/library/typing.html#typing.Any)\] | None)

Optional connector config; supported keys are `databricks.logging_level` and `tabsdata.src_metadata.drop`.

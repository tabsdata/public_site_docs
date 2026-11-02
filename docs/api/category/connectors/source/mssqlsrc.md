# MSSQLSrc

> MSSQL source for `@publisher` -- one output slot per query.

Source: https://docs.tabsdata.com/api/category/connectors/source/mssqlsrc

class

```python
class MSSQLSrc(
    queries: QueriesSpec,
    transactional: bool = True,
    schema_overrides: SchemaOverrideSpec | None = None,
    initial_values: BasicDictSpec | None = None,
    src_cfg: SrcCfgSpec | None = None,
)
```

Bases: [Src](https://docs.tabsdata.com/api/category/connectors/source/src)

**Categories:** source

MSSQL source for `@publisher` -- one output slot per query.

Every table this source publishes automatically carries two metadata columns: `@td.sql.query`, the text of the query that produced the row, and `@td.sql.initial_values`, the JSON serialization of the bind values that query ran with (an empty JSON object when it has no binds). Setting the `src_cfg` key `tabsdata.src_metadata.drop` to `True` leaves them off.

## Examples

Publish multiple SQL Server tables, one output slot per query in order:

```python
@publisher(
    source=MSSQLSrc(
        queries=[
            "SELECT * FROM wld_country",
            "SELECT * FROM wld_city",
        ],
    ),
    output_tables=["ms_country", "ms_city"],
)
def ingest(country: TableFrameSpec, city: TableFrameSpec):
    return country, city
```

Incremental read -- SQL Server has no `LIMIT`, so page with `OFFSET ... FETCH NEXT` (which needs `ORDER BY`); an `initial_values` bind seeds `:wm` on the first run and `ctx` advances it each run:

```python
@publisher(
    source=MSSQLSrc(
        queries=[
            "SELECT * FROM wld_city WHERE id > :wm "
            "ORDER BY id OFFSET 0 ROWS FETCH NEXT 10 ROWS ONLY"
        ],
        initial_values={"wm": 0},
    ),
    output_tables=["ms_city_inc"],
)
def ingest_inc(city: TableFrameSpec, ctx: TrxCtx):
    if city is not None:
        row = city.max_for("id")
        if row is not None and row["id"] is not None:
            ctx.set_attr("wm", int(row["id"]))
    return city
```

## Parameters

parameter

`queries`[QueriesSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-mssql#tabsdatak.conn.mssql.QueriesSpec) ([list](https://docs.python.org/3/library/stdtypes.html#list)\[[str](https://docs.python.org/3/library/stdtypes.html#str)\])

SELECT statements, one output slot per entry.

parameter

`transactional`[bool](https://docs.python.org/3/builtins/functions.html#bool)

When `True` (the default), run all queries in one transactional session.

parameter

`schema_overrides`SchemaOverrideSpec | None ([list](https://docs.python.org/3/library/stdtypes.html#list)\[[dict](https://docs.python.org/3/library/stdtypes.html#dict)\[[str](https://docs.python.org/3/library/stdtypes.html#str), DataType\] | None\] | None)

Optional per-query column dtype hints; when given, must have the same length as `queries`.

parameter

`initial_values`[BasicDictSpec](https://docs.tabsdata.com/api/module/tabsdatak-api#tabsdatak.api.BasicDictSpec) | None ([dict](https://docs.python.org/3/library/stdtypes.html#dict)\[[str](https://docs.python.org/3/library/stdtypes.html#str), [str](https://docs.python.org/3/library/stdtypes.html#str) | [int](https://docs.python.org/3/library/functions.html#int) | [float](https://docs.python.org/3/library/functions.html#float) | [bool](https://docs.python.org/3/library/functions.html#bool)\] | None)

Optional `{bind_name: value}` seed dict. Each name binds into the query as a SQLAlchemy `:var` parameter; it seeds the first run only, after which the plugin reads `ctx.get_attr(bind_name)` and the function persists new values with `ctx.set_attr(bind_name, ...)`.

parameter

`src_cfg`[SrcCfgSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-mssql#tabsdatak.conn.mssql.SrcCfgSpec) | None (Mapping\[Literal\['mssql.logging\_level', 'tabsdata.sql.read\_engine', 'tabsdata.sql.chunk\_size', 'tabsdata.src\_metadata.drop'\], [Any](https://docs.python.org/3/library/typing.html#typing.Any)\] | None)

Optional connector config; supported keys are `mssql.logging_level`, `tabsdata.sql.read_engine`, `tabsdata.sql.chunk_size` and `tabsdata.src_metadata.drop`.

## Methods

method

`validate`

```python
def validate()
```

Cross-field validation: `schema_overrides` length must match `queries`.

Called by the framework; raises `MSSQLValidateException`.

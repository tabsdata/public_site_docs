# PostgresSrc

> Postgres source for `@publisher` -- one output slot per query.

Source: https://docs.tabsdata.com/api/category/connectors/source/postgressrc

class

```python
class PostgresSrc(
    queries: QueriesSpec,
    transactional: bool = True,
    schema_overrides: SchemaOverrideSpec | None = None,
    initial_values: BasicDictSpec | None = None,
    src_cfg: SrcCfgSpec | None = None,
)
```

Bases: [Src](https://docs.tabsdata.com/api/category/connectors/source/src)

**Categories:** source

Postgres source for `@publisher` -- one output slot per query.

Every table this source publishes automatically carries two metadata columns: `@td.sql.query`, the text of the query that produced the row, and `@td.sql.initial_values`, the JSON serialization of the bind values that query ran with (an empty JSON object when it has no binds). Setting the `src_cfg` key `tabsdata.src_metadata.drop` to `True` leaves them off.

## Examples

Publish multiple Postgres tables, one output slot per query in order:

```python
@publisher(
    source=PostgresSrc(
        queries=[
            "SELECT * FROM wld_country",
            "SELECT * FROM wld_city",
        ],
    ),
    output_tables=["pg_country", "pg_city"],
)
def ingest(country: TableFrameSpec, city: TableFrameSpec):
    return country, city
```

Incremental read: an `initial_values` bind seeds the `:wm` watermark on the first run, then `ctx` advances it each run:

```python
@publisher(
    source=PostgresSrc(
        queries=[
            "SELECT * FROM wld_city WHERE id > :wm ORDER BY id LIMIT 10",
        ],
        initial_values={"wm": 0},
    ),
    output_tables=["pg_city_inc"],
)
def ingest_inc(city: TableFrameSpec, ctx: TransactionCtx):
    if city is not None:
        row = city.max_for("id")
        if row is not None and row["id"] is not None:
            ctx.set_attr("wm", int(row["id"]))
    return city
```

## Parameters

parameter

`queries`[QueriesSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-postgres#tabsdatak.conn.postgres.QueriesSpec) ([list](https://docs.python.org/3/library/stdtypes.html#list)\[[str](https://docs.python.org/3/library/stdtypes.html#str)\])

SELECT statements; one output slot per query, in order.

parameter

`transactional`[bool](https://docs.python.org/3/builtins/functions.html#bool)

When `True` (default), run all queries inside one transactional session.

parameter

`schema_overrides`SchemaOverrideSpec | None ([list](https://docs.python.org/3/library/stdtypes.html#list)\[[dict](https://docs.python.org/3/library/stdtypes.html#dict)\[[str](https://docs.python.org/3/library/stdtypes.html#str), DataType\] | None\] | None)

Optional per-query column dtype hints. When given it must have exactly one entry per query (same length and order as `queries`); each entry is a `{column: DataType}` map or `None`.

parameter

`initial_values`[BasicDictSpec](https://docs.tabsdata.com/api/module/tabsdatak-api#tabsdatak.api.BasicDictSpec) | None ([dict](https://docs.python.org/3/library/stdtypes.html#dict)\[[str](https://docs.python.org/3/library/stdtypes.html#str), [str](https://docs.python.org/3/library/stdtypes.html#str) | [int](https://docs.python.org/3/library/functions.html#int) | [float](https://docs.python.org/3/library/functions.html#float) | [bool](https://docs.python.org/3/library/functions.html#bool)\] | None)

Optional `{bind_name: value}` seed dict. Each name is bound into the query as a SQLAlchemy `:var` parameter at execute time, and acts as the first-run seed: the plugin reads `ctx.get_attr(bind_name)` per bind and falls back to this value when the ctx store has no entry. Persist the next value with `ctx.set_attr(bind_name, v)`.

parameter

`src_cfg`[SrcCfgSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-postgres#tabsdatak.conn.postgres.SrcCfgSpec) | None (Mapping\[Literal\['postgres.logging\_level', 'tabsdata.sql.read\_engine', 'tabsdata.sql.chunk\_size', 'tabsdata.src\_metadata.drop'\], [Any](https://docs.python.org/3/library/typing.html#typing.Any)\] | None)

Optional config mapping over the allowed keys only (`postgres.logging_level`, `tabsdata.sql.read_engine`, `tabsdata.sql.chunk_size`, `tabsdata.src_metadata.drop`).

## Methods

method

`validate`

```python
def validate()
```

Check `schema_overrides` has one entry per query.

Called by the framework; raises `PostgresValidateException` when the lengths differ.

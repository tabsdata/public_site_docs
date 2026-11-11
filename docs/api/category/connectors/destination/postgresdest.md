# PostgresDest

> Postgres destination for `@subscriber` -- one target table per slot.

Source: https://docs.tabsdata.com/api/category/connectors/destination/postgresdest

class

```python
class PostgresDest(
    tables: PostgresTableNamesSpec,
    if_table_exists: IfTableExistsSpec = 'append',
    transactional: bool = True,
    schema_evolution: SchemaEvolutionSpec = 'strict',
    dest_cfg: DestCfgSpec | None = None,
)
```

Bases: [Dest](https://docs.tabsdata.com/api/category/connectors/destination/dest)

**Categories:** destination

Postgres destination for `@subscriber` -- one target table per slot.

## Parameters

parameter

`tables`[PostgresTableNamesSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-postgres#tabsdatak.conn.postgres.PostgresTableNamesSpec) ([list](https://docs.python.org/3/library/stdtypes.html#list)\[[str](https://docs.python.org/3/library/stdtypes.html#str)\])

Target table names, qualified or bare (see [`PostgresTableNameSpec`](https://docs.tabsdata.com/api/module/tabsdatak-conn-postgres#tabsdatak.conn.postgres.PostgresTableNameSpec)); one input slot per table, in order.

parameter

`if_table_exists`[IfTableExistsSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-postgres#tabsdatak.conn.postgres.IfTableExistsSpec) (Literal\['append', 'replace'\])

`"append"` (default) adds rows; `"replace"` truncates the table before inserting.

parameter

`transactional`[bool](https://docs.python.org/3/builtins/functions.html#bool)

When `True` (default), wrap every table write in one transactional session.

parameter

`schema_evolution`[SchemaEvolutionSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-postgres#tabsdatak.conn.postgres.SchemaEvolutionSpec) (Literal\['strict', 'update'\])

What a write does when the batch's columns differ from the table's. `"replace"` makes the table the batch's own, so it is not affected. `"strict"` (the default) refuses a batch with a column the table lacks; `"update"` adds the column and widens a number column the batch has outgrown (a larger integer, double precision, a decimal that keeps every digit); other type differences are left to the database, where a value a column cannot hold fails the write. A column the batch lacks is written NULL either way.

parameter

`dest_cfg`[DestCfgSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-postgres#tabsdatak.conn.postgres.DestCfgSpec) | None (Mapping\[Literal\['postgres.logging\_level', 'postgres.schema\_evolution\_engine', 'tabsdata.sql.write\_engine', 'tabsdata.sql.chunk\_size'\], [Any](https://docs.python.org/3/library/typing.html#typing.Any)\] | None)

Optional config mapping over the allowed keys only (`postgres.logging_level`, `tabsdata.sql.write_engine`, `tabsdata.sql.chunk_size`). `postgres.schema_evolution_engine` takes only `"iceberg"`, the default.

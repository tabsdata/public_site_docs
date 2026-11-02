# PostgresDest

> Postgres destination for `@subscriber` -- one target table per slot.

Source: https://docs.tabsdata.com/api/category/connectors/destination/postgresdest

class

```python
class PostgresDest(
    tables: PostgresTableNamesSpec,
    if_table_exists: IfTableExistsSpec = 'append',
    transactional: bool = True,
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

`dest_cfg`[DestCfgSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-postgres#tabsdatak.conn.postgres.DestCfgSpec) | None (Mapping\[Literal\['postgres.logging\_level', 'tabsdata.sql.write\_engine', 'tabsdata.sql.chunk\_size'\], [Any](https://docs.python.org/3/library/typing.html#typing.Any)\] | None)

Optional config mapping over the allowed keys only (`postgres.logging_level`, `tabsdata.sql.write_engine`, `tabsdata.sql.chunk_size`).

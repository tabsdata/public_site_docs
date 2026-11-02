# MSSQLDest

> MSSQL destination for `@subscriber` -- one output slot per table.

Source: https://docs.tabsdata.com/api/category/connectors/destination/mssqldest

class

```python
class MSSQLDest(
    tables: MSSQLTableNamesSpec,
    if_table_exists: IfTableExistsSpec = 'append',
    transactional: bool = True,
    dest_cfg: DestCfgSpec | None = None,
)
```

Bases: [Dest](https://docs.tabsdata.com/api/category/connectors/destination/dest)

**Categories:** destination

MSSQL destination for `@subscriber` -- one output slot per table.

## Parameters

parameter

`tables`[MSSQLTableNamesSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-mssql#tabsdatak.conn.mssql.MSSQLTableNamesSpec) ([list](https://docs.python.org/3/library/stdtypes.html#list)\[[str](https://docs.python.org/3/library/stdtypes.html#str)\])

Target table names, one write slot per entry. Each is a 1-, 2- or 3-part name (`table`, `schema.table` or `database.schema.table`); bracket-quote a part (`[name]`) to allow special characters.

parameter

`if_table_exists`[IfTableExistsSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-mssql#tabsdatak.conn.mssql.IfTableExistsSpec) (Literal\['append', 'replace'\])

`"append"` (the default) adds rows; `"replace"` truncates the table before inserting.

parameter

`transactional`[bool](https://docs.python.org/3/builtins/functions.html#bool)

When `True` (the default), wrap every table write in one transactional session.

parameter

`dest_cfg`[DestCfgSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-mssql#tabsdatak.conn.mssql.DestCfgSpec) | None (Mapping\[Literal\['mssql.logging\_level', 'tabsdata.sql.write\_engine', 'tabsdata.sql.chunk\_size'\], [Any](https://docs.python.org/3/library/typing.html#typing.Any)\] | None)

Optional connector config; supported keys are `mssql.logging_level`, `tabsdata.sql.write_engine` and `tabsdata.sql.chunk_size`.

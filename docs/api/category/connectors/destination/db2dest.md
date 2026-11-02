# Db2Dest

> Db2 destination for `@subscriber` -- one target table per slot.

Source: https://docs.tabsdata.com/api/category/connectors/destination/db2dest

class

```python
class Db2Dest(
    tables: Db2TableNamesSpec,
    if_table_exists: IfTableExistsSpec = 'append',
    transactional: bool = True,
    dest_cfg: DestCfgSpec | None = None,
)
```

Bases: [Dest](https://docs.tabsdata.com/api/category/connectors/destination/dest)

**Categories:** destination

Db2 destination for `@subscriber` -- one target table per slot.

## Parameters

parameter

`tables`[Db2TableNamesSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-db2#tabsdatak.conn.db2.Db2TableNamesSpec) ([list](https://docs.python.org/3/library/stdtypes.html#list)\[[str](https://docs.python.org/3/library/stdtypes.html#str)\])

Target table names, qualified or bare (see [`Db2TableNameSpec`](https://docs.tabsdata.com/api/module/tabsdatak-conn-db2#tabsdatak.conn.db2.Db2TableNameSpec)); one input slot per table, in order.

parameter

`if_table_exists`[IfTableExistsSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-db2#tabsdatak.conn.db2.IfTableExistsSpec) (Literal\['append', 'replace'\])

`"append"` (default) adds rows; `"replace"` truncates the table before inserting.

parameter

`transactional`[bool](https://docs.python.org/3/builtins/functions.html#bool)

When `True` (default), wrap every table write in one transactional session.

parameter

`dest_cfg`[DestCfgSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-db2#tabsdatak.conn.db2.DestCfgSpec) | None (Mapping\[Literal\['db2.logging\_level', 'tabsdata.sql.write\_engine', 'tabsdata.sql.chunk\_size'\], [Any](https://docs.python.org/3/library/typing.html#typing.Any)\] | None)

Optional config mapping over the allowed keys only (`db2.logging_level`, `tabsdata.sql.write_engine`, `tabsdata.sql.chunk_size`).

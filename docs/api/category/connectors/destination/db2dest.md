# Db2Dest

> Db2 destination for `@subscriber` -- one target table per slot.

Source: https://docs.tabsdata.com/api/category/connectors/destination/db2dest

class

```python
class Db2Dest(
    tables: Db2TableNamesSpec,
    if_table_exists: IfTableExistsSpec = 'append',
    transactional: bool = True,
    schema_evolution: SchemaEvolutionSpec = 'strict',
    dest_cfg: DestCfgSpec | None = None,
)
```

Bases: [Dest](https://docs.tabsdata.com/api/category/connectors/destination/dest)

**Categories:** destination

Db2 destination for `@subscriber` -- one target table per slot.

A table the connector creates gets its column types from the returned frame, with every column nullable and no primary key. To choose keys, indexes or partitioning, create the table before the first run; `"replace"` keeps its definition. `if_table_exists` applies to every table in `tables`; to replace some tables and append to others, use two subscribers.

## Parameters

parameter

`tables`[Db2TableNamesSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-db2#tabsdatak.conn.db2.Db2TableNamesSpec) ([list](https://docs.python.org/3/library/stdtypes.html#list)\[[str](https://docs.python.org/3/library/stdtypes.html#str)\])

Target table names, qualified or bare (see [`Db2TableNameSpec`](https://docs.tabsdata.com/api/module/tabsdatak-conn-db2#tabsdatak.conn.db2.Db2TableNameSpec)); one input slot per table, in order.

parameter

`if_table_exists`[IfTableExistsSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-db2#tabsdatak.conn.db2.IfTableExistsSpec) (Literal\['append', 'replace'\])

`"append"` (default) adds rows; `"replace"` truncates the table before inserting, so an empty frame empties it. A slot returned as `None` leaves its table as it is.

parameter

`transactional`[bool](https://docs.python.org/3/builtins/functions.html#bool)

When `True` (default), wrap every table write in one transactional session.

parameter

`schema_evolution`[SchemaEvolutionSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-db2#tabsdatak.conn.db2.SchemaEvolutionSpec) (Literal\['strict', 'update'\])

What a write does when the batch's columns differ from the table's, a replace included. `"strict"` (the default) refuses a batch with a column the table lacks, or with a number wider than the column's unless every value fits it; `"update"` adds the column and widens a number column the batch has outgrown (a larger integer, double precision, a decimal that keeps every digit); other type differences are left to the database, where a value a column cannot hold fails the write. A column the batch lacks is written NULL either way.

parameter

`dest_cfg`[DestCfgSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-db2#tabsdatak.conn.db2.DestCfgSpec) | None (Mapping\[Literal\['db2.logging\_level', 'tabsdata.sql.write\_engine', 'tabsdata.sql.chunk\_size'\], [Any](https://docs.python.org/3/library/typing.html#typing.Any)\] | None)

Optional config mapping over the allowed keys only (`db2.logging_level`, `tabsdata.sql.write_engine`, `tabsdata.sql.chunk_size`).

## Methods

method

`validate`

```python
def validate()
```

Cross-field validation: `if_table_exists`, `schema_evolution` and the engine form a combination this destination offers.

Called by the framework; raises `SqlCommonValidateException`.

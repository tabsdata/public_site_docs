# StarRocksDest

> StarRocks destination for `@subscriber` -- one output slot per table.

Source: https://docs.tabsdata.com/api/category/connectors/destination/starrocksdest

class

```python
class StarRocksDest(
    tables: StarRocksTableNamesSpec,
    if_table_exists: IfTableExistsSpec = 'append',
    schema_evolution: SchemaEvolutionSpec = 'strict',
    dest_cfg: DestCfgSpec | None = None,
)
```

Bases: [Dest](https://docs.tabsdata.com/api/category/connectors/destination/dest)

**Categories:** destination

StarRocks destination for `@subscriber` -- one output slot per table.

The target tables must already exist; this destination does not create them (StarRocks table creation needs physical layout -- a key definition and a `DISTRIBUTED BY` clause -- that cannot be inferred from the data). Writing to a missing table fails with a StarRocks table-not-found error.

## Examples

Append to an existing table -- row count grows each run:

```python
@subscriber(
    destination=StarRocksDest(
        tables=["wld_country"], if_table_exists="append"
    ),
    input_tables=["subs_tables/wld_country"],
)
def out_append(country: TableFrameSpec) -> TableFrameSpec:
    return country
```

Replace truncates the target table, then reloads it:

```python
@subscriber(
    destination=StarRocksDest(
        tables=["wld_city"], if_table_exists="replace"
    ),
    input_tables=["subs_tables/wld_city"],
)
def out_replace(city: TableFrameSpec) -> TableFrameSpec:
    return city
```

## Parameters

parameter

`tables`[StarRocksTableNamesSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-starrocks#tabsdatak.conn.starrocks.StarRocksTableNamesSpec) ([list](https://docs.python.org/3/library/stdtypes.html#list)\[[str](https://docs.python.org/3/library/stdtypes.html#str)\])

Target table names, one write slot per entry; each must reference an existing table. Each is a 1- or 2-part name (`table` or `database.table`); backtick-quote a part for special characters.

parameter

`if_table_exists`[IfTableExistsSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-starrocks#tabsdatak.conn.starrocks.IfTableExistsSpec) (Literal\['append', 'replace'\])

`"append"` (the default) issues `INSERT INTO`; `"replace"` issues `TRUNCATE` + `INSERT INTO` against the existing table.

parameter

`schema_evolution`[SchemaEvolutionSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-starrocks#tabsdatak.conn.starrocks.SchemaEvolutionSpec) (Literal\['strict', 'update'\])

What a write does when the batch's columns differ from the table's. `"strict"` (the default) refuses a batch with a column the table lacks or a wider type, except that a text column takes any text (StarRocks refuses a value too long for it) and a narrower number column takes a batch whose values all fit it; `"update"` adds the column and widens the type, and refuses a change StarRocks cannot make. A column the batch lacks is written NULL either way.

parameter

`dest_cfg`[DestCfgSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-starrocks#tabsdatak.conn.starrocks.DestCfgSpec) | None (Mapping\[Literal\['starrocks.logging\_level', 'starrocks.schema\_evolution\_engine'\], [Any](https://docs.python.org/3/library/typing.html#typing.Any)\] | None)

Optional connector config. Supported keys: `starrocks.logging_level`, and `starrocks.schema_evolution_engine` -- `"iceberg"`, the default and only engine: StarRocks has no schema evolution of its own. A column type change runs as a StarRocks job, which the write waits for before loading.

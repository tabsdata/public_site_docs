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

`schema_evolution`[SchemaEvolutionSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-starrocks#tabsdatak.conn.starrocks.SchemaEvolutionSpec) (Literal\['strict', 'iceberg'\])

`"strict"` (the default) rejects schema changes; `"iceberg"` applies Iceberg-style schema deltas.

parameter

`dest_cfg`[DestCfgSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-starrocks#tabsdatak.conn.starrocks.DestCfgSpec) | None (Mapping\[Literal\['starrocks.logging\_level'\], [Any](https://docs.python.org/3/library/typing.html#typing.Any)\] | None)

Optional connector config; the only supported key is `starrocks.logging_level`.

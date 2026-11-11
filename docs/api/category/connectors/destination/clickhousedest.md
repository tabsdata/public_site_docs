# ClickHouseDest

> ClickHouse destination for `@subscriber` -- one output slot per table.

Source: https://docs.tabsdata.com/api/category/connectors/destination/clickhousedest

class

```python
class ClickHouseDest(
    tables: ClickHouseTableNamesSpec,
    if_table_exists: IfTableExistsSpec = 'append',
    schema_evolution: SchemaEvolutionSpec = 'strict',
    dest_cfg: DestCfgSpec | None = None,
)
```

Bases: [Dest](https://docs.tabsdata.com/api/category/connectors/destination/dest)

**Categories:** destination

ClickHouse destination for `@subscriber` -- one output slot per table.

## Examples

Write a table with the `replace` disposition -- the first run creates it, later runs drop and recreate it (row count stays):

```python
@subscriber(
    destination=ClickHouseDest(
        tables=["cap_replace"],
        if_table_exists="replace",
    ),
    input_tables=["caps_input/cap_rows"],
)
def out_replace(rows: TableFrameSpec) -> TableFrameSpec:
    return rows
```

Append rows with a wider schema and let ClickHouse evolve the table -- `schema_evolution="update"` adds the new column rather than failing on the mismatch (`"strict"` would reject it):

```python
@subscriber(
    destination=ClickHouseDest(
        tables=["cap_evolve"],
        if_table_exists="append",
        schema_evolution="update",
    ),
    input_tables=["caps_input/cap_evo_v2"],
)
def evolve(rows: TableFrameSpec) -> TableFrameSpec:
    return rows
```

## Parameters

parameter

`tables`[ClickHouseTableNamesSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-clickhouse#tabsdatak.conn.clickhouse.ClickHouseTableNamesSpec) ([list](https://docs.python.org/3/library/stdtypes.html#list)\[[str](https://docs.python.org/3/library/stdtypes.html#str)\])

Target table names (non-empty), one write slot per entry. Each is a 1- or 2-part name (`table` or `database.table`); backtick-quote a part for special characters.

parameter

`if_table_exists`[IfTableExistsSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-clickhouse#tabsdatak.conn.clickhouse.IfTableExistsSpec) (Literal\['append', 'replace'\])

`"append"` (the default) adds rows; `"replace"` overwrites the table.

parameter

`schema_evolution`[SchemaEvolutionSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-clickhouse#tabsdatak.conn.clickhouse.SchemaEvolutionSpec) (Literal\['strict', 'update'\])

What a write does when the batch's columns differ from the table's. `"replace"` makes the table the batch's own, so it is not affected. `"strict"` (the default) refuses a batch with a column the table lacks or a wider type; `"update"` adds the column and widens the type, and refuses a change ClickHouse cannot make. A column the batch lacks is written NULL either way.

parameter

`dest_cfg`[DestCfgSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-clickhouse#tabsdatak.conn.clickhouse.DestCfgSpec) | None (Mapping\[Literal\['clickhouse.logging\_level', 'clickhouse.schema\_evolution\_engine'\], [Any](https://docs.python.org/3/library/typing.html#typing.Any)\] | None)

Optional connector config. Supported keys: `clickhouse.logging_level`, and `clickhouse.schema_evolution_engine` -- `"iceberg"`, the default and only engine: ClickHouse has no schema evolution of its own.

## Methods

method

`validate`

```python
def validate()
```

Cross-field validation: `tables` must be non-empty.

Called by the framework; raises `ClickHouseValidateException`.

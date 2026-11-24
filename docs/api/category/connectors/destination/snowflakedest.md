# SnowflakeDest

> Snowflake destination for `@subscriber` -- one output slot per table.

Source: https://docs.tabsdata.com/api/category/connectors/destination/snowflakedest

class

```python
class SnowflakeDest(
    tables: SnowflakeTableNamesSpec,
    if_table_exists: IfTableExistsSpec = 'append',
    schema_evolution: SchemaEvolutionSpec = 'strict',
    merge_cfg: MergeCfgSpec | None = None,
    watermark_column: SnowflakeColumnSpec | None = None,
    dest_cfg: DestCfgSpec | None = None,
)
```

Bases: [Dest](https://docs.tabsdata.com/api/category/connectors/destination/dest)

**Categories:** destination

Snowflake destination for `@subscriber` -- one output slot per table.

## Examples

Append rows to a table -- the default disposition, which accumulates across runs:

```python
@subscriber(
    destination=SnowflakeDest(
        tables=["cap_append"],
        if_table_exists="append",
    ),
    input_tables=["caps_input/cap_rows@NEW"],
)
def load_append(rows: TableFramesSpec) -> TableFrameSpec:
    return concat(rows)
```

Replace mode truncates the target before `COPY INTO`, preserving the existing schema on reload:

```python
@subscriber(
    destination=SnowflakeDest(
        tables=["cap_replace"],
        if_table_exists="replace",
    ),
    input_tables=["caps_input/cap_rows"],
)
def load_replace(rows: TableFrameSpec) -> TableFrameSpec:
    return rows
```

Merge mode upserts by key instead of accumulating, and applies the CDC tombstones the incoming `op` column marks:

```python
@subscriber(
    destination=SnowflakeDest(
        tables=["cap_merge"],
        if_table_exists="merge",
        merge_cfg=[MergeCfg(on=["cap_id"], op_column="op")],
        schema_evolution="update",
        dest_cfg={"snowflake.schema_evolution_engine": "iceberg"},
    ),
    input_tables=["caps_input/cap_changes@NEW"],
)
def load_merge(changes: TableFramesSpec) -> TableFrameSpec:
    return concat(changes)
```

## Parameters

parameter

`tables`[SnowflakeTableNamesSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-snowflake#tabsdatak.conn.snowflake.SnowflakeTableNamesSpec) ([list](https://docs.python.org/3/library/stdtypes.html#list)\[[str](https://docs.python.org/3/library/stdtypes.html#str)\])

Target table names, one write slot per entry. Each is a 1-, 2- or 3-part name (`table`, `schema.table` or `database.schema.table`); double-quote a part for case-sensitive / special-char names.

parameter

`if_table_exists`[IfTableExistsSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-snowflake#tabsdatak.conn.snowflake.IfTableExistsSpec) (Literal\['append', 'replace', 'merge'\])

`"append"` (the default) adds rows; `"replace"` issues `TRUNCATE` before `COPY INTO` (so the existing schema is preserved); `"merge"` stages the rows and `MERGE`s them onto the target by the keys in `merge_cfg`, updating, deleting or inserting each one. A slot returned as `None` leaves its table as it is.

parameter

`schema_evolution`[SchemaEvolutionSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-snowflake#tabsdatak.conn.snowflake.SchemaEvolutionSpec) (Literal\['update', 'strict'\])

What a write does when the batch's columns differ from the table's. `"strict"` (the default) refuses a batch with a column the table lacks or a wider type; `"update"` adds the column and widens the type, and refuses a change Snowflake cannot make. A column the batch lacks is written NULL either way, and a merge keeps its stored value in the rows it updates.

parameter

`merge_cfg`[MergeCfgSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-snowflake#tabsdatak.conn.snowflake.MergeCfgSpec) | None ([list](https://docs.python.org/3/library/stdtypes.html#list)\[MergeCfg\] | None)

Required by -- and only valid with -- `if_table_exists="merge"`: how incoming rows are matched onto existing ones. A list, one entry per table in `tables` and in the same order -- a single table takes a one-entry list.

parameter

`watermark_column`[SnowflakeColumnSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-snowflake#tabsdatak.conn.snowflake.SnowflakeColumnSpec) | None ([str](https://docs.python.org/3/library/stdtypes.html#str) | None)

An optional column stamped with the id of the trx the write belongs to, making the write idempotent: a rerun that finds the target already carrying this trx's id writes nothing rather than applying the same batch twice. Every table in `tables` is stamped in the same column. The target gains the column under either `schema_evolution` setting -- a watermark no row can be stamped in would do nothing at all -- and rows written before it existed keep a NULL there.

A merge stamps through the `MERGE` itself; an append writes the column into the batch it stages, so the `COPY` stamps the rows it loads. A replace is refused it, having nothing to make idempotent -- it truncates and reloads, so a rerun already leaves the same rows behind.

parameter

`dest_cfg`[DestCfgSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-snowflake#tabsdatak.conn.snowflake.DestCfgSpec) | None (Mapping\[Literal\['snowflake.logging\_level', 'snowflake.schema\_evolution\_engine'\], [Any](https://docs.python.org/3/library/typing.html#typing.Any)\] | None)

Optional connector config. Supported keys: `snowflake.logging_level`, and `snowflake.schema_evolution_engine`, written only as `"iceberg"` and only with `if_table_exists="merge"` and `schema_evolution="update"`: a merge evolves the target by diffing it against the batch and running the `ALTER` statements itself, adding a column and widening one whose type the batch has outgrown. Append and replace always evolve natively, which only ever adds a column or relaxes one to nullable, never widens one.

## Methods

method

`validate`

```python
def validate()
```

Cross-field validation: `merge_cfg` and `if_table_exists="merge"` require each other, a list of configs must line up with `tables`, `watermark_column` is not a replace's to name, and the disposition, policy and engine form a combination the destination offers.

Called by the framework; raises `SnowflakeValidateException`.

# DatabricksDest

> Databricks destination for `@subscriber` -- one output slot per table.

Source: https://docs.tabsdata.com/api/category/connectors/destination/databricksdest

class

```python
class DatabricksDest(
    tables: DatabricksTableNamesSpec,
    if_table_exists: IfTableExistsSpec = 'append',
    schema_evolution: SchemaEvolutionSpec = 'strict',
    merge_cfg: MergeCfgSpec | None = None,
    watermark_column: DatabricksColumnSpec | None = None,
    dest_cfg: DestCfgSpec | None = None,
)
```

Bases: [Dest](https://docs.tabsdata.com/api/category/connectors/destination/dest)

**Categories:** destination

Databricks destination for `@subscriber` -- one output slot per table.

## Examples

Overwrite a Databricks table on each run:

```python
@subscriber(
    destination=DatabricksDest(
        tables=["cap_replace"],
        if_table_exists="replace",
    ),
    input_tables=["caps_input/cap_rows"],
)
def publish(rows: TableFrameSpec) -> TableFrameSpec:
    return rows
```

Append rows and let `COPY INTO` add new columns via `schema_evolution`:

```python
@subscriber(
    destination=DatabricksDest(
        tables=["cap_evolve"],
        if_table_exists="append",
        schema_evolution="update",
    ),
    input_tables=["caps_input/cap_evo_v2"],
)
def evolve(rows: TableFrameSpec) -> TableFrameSpec:
    return rows
```

Merge mode merges incoming rows onto the target by the keys in `merge_cfg`:

```python
@subscriber(
    destination=DatabricksDest(
        tables=["cap_merge"],
        if_table_exists="merge",
        merge_cfg=[
            MergeCfg(
                on=["cap_id"],
                op_column="op",
            )
        ],
    ),
    input_tables=["caps_input/cap_merge_v2"],
)
def merge(rows: TableFrameSpec) -> TableFrameSpec:
    return rows
```

## Parameters

parameter

`tables`[DatabricksTableNamesSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-databricks#tabsdatak.conn.databricks.DatabricksTableNamesSpec) ([list](https://docs.python.org/3/library/stdtypes.html#list)\[[str](https://docs.python.org/3/library/stdtypes.html#str)\])

Target table names, one write slot per entry. Each is a 1-, 2- or 3-part name (`table`, `schema.table` or `catalog.schema.table`); backtick-quote a part for special characters. Partial names are completed from the connection's `catalog` / `schema` defaults.

parameter

`if_table_exists`[IfTableExistsSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-databricks#tabsdatak.conn.databricks.IfTableExistsSpec) (Literal\['append', 'replace', 'merge'\])

`"append"` (the default) adds rows; `"replace"` overwrites the table. `"merge"` merges rows.

parameter

`schema_evolution`[SchemaEvolutionSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-databricks#tabsdatak.conn.databricks.SchemaEvolutionSpec) (Literal\['update', 'strict'\])

`"strict"` (the default) rejects schema changes; `"update"` adds new columns and performs type widening on existing columns of the target to match the schema of the incoming data.

parameter

`merge_cfg`[MergeCfgSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-databricks#tabsdatak.conn.databricks.MergeCfgSpec) | None ([list](https://docs.python.org/3/library/stdtypes.html#list)\[MergeCfg\] | None)

Required by -- and only valid with -- `if_table_exists="merge"`: how incoming rows are matched onto existing ones. A list, one entry per table in `tables` and in the same order -- a single table takes a one-entry list.

parameter

`watermark_column`[DatabricksColumnSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-databricks#tabsdatak.conn.databricks.DatabricksColumnSpec) | None ([str](https://docs.python.org/3/library/stdtypes.html#str) | None)

An optional column stamped with the id of the trx the write belongs to, making the write idempotent: a rerun that finds the target already carrying this trx's id writes nothing rather than applying the same batch twice. Every table in `tables` is stamped in the same column. The target gains the column under either `schema_evolution` setting -- a watermark no row can be stamped in would do nothing at all -- and rows written before it existed keep a NULL there.

A merge stamps through the `MERGE` itself; an append writes the column into the batch it stages, so `COPY INTO` stamps the rows it loads. A replace is refused it, having nothing to make idempotent -- it rewrites the table wholesale, so a rerun already leaves the same rows behind.

parameter

`dest_cfg`[DestCfgSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-databricks#tabsdatak.conn.databricks.DestCfgSpec) | None (Mapping\[Literal\['databricks.logging\_level'\], [Any](https://docs.python.org/3/library/typing.html#typing.Any)\] | None)

Optional connector config; the only supported key is `databricks.logging_level`.

## Methods

method

`validate`

```python
def validate()
```

Cross-field validation: `merge_cfg` and `if_table_exists="merge"` require each other, a list of configs must line up with `tables`, and `watermark_column` is not a replace's to name.

Called by the framework; raises `DatabricksValidateException`.

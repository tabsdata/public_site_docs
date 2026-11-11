# BigQueryDest

> BigQuery destination for `@subscriber` -- one output slot per table.

Source: https://docs.tabsdata.com/api/category/connectors/destination/bigquerydest

class

```python
class BigQueryDest(
    tables: BigQueryTableNamesSpec,
    if_table_exists: IfTableExistsSpec = 'append',
    schema_evolution: SchemaEvolutionSpec = 'strict',
    merge_cfg: MergeCfgSpec | None = None,
    watermark_column: BigQueryColumnSpec | None = None,
    dest_cfg: DestCfgSpec | None = None,
)
```

Bases: [Dest](https://docs.tabsdata.com/api/category/connectors/destination/dest)

**Categories:** destination

BigQuery destination for `@subscriber` -- one output slot per table.

## Examples

Overwrite the target table each run with `if_table_exists="replace"`:

```python
@subscriber(
    destination=BigQueryDest(
        tables=["`cap_replace`"],
        if_table_exists="replace",
    ),
    input_tables=["caps_input/cap_rows"],
)
def publish(rows: TableFrameSpec) -> TableFrameSpec:
    return rows
```

Append a wider frame; `schema_evolution="update"` adds the new column:

```python
@subscriber(
    destination=BigQueryDest(
        tables=["`cap_evolve`"],
        if_table_exists="append",
        schema_evolution="update",
    ),
    input_tables=["caps_input/cap_evo_v2"],
)
def evolve(v2: TableFrameSpec) -> TableFrameSpec:
    return v2
```

Merge mode merges incoming rows onto the target by the keys in `merge_cfg`:

```python
@subscriber(
    destination=BigQueryDest(
        tables=["`cap_merge`"],
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

`tables`[BigQueryTableNamesSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-bigquery#tabsdatak.conn.bigquery.BigQueryTableNamesSpec) ([list](https://docs.python.org/3/library/stdtypes.html#list)\[[str](https://docs.python.org/3/library/stdtypes.html#str)\])

Target table names, one write slot per entry. Each is `[[project.]dataset.]table`; a bare `table` or `dataset.table` is completed from the connection's `project` / `dataset` defaults. BigQuery wraps the whole name in one backtick pair, e.g. `my-project.ds.t`.

parameter

`if_table_exists`[IfTableExistsSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-bigquery#tabsdatak.conn.bigquery.IfTableExistsSpec) (Literal\['append', 'replace', 'merge'\])

`"append"` (the default) adds rows; `"replace"` drops and recreates the table; `"merge"` merges rows.

parameter

`schema_evolution`[SchemaEvolutionSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-bigquery#tabsdatak.conn.bigquery.SchemaEvolutionSpec) (Literal\['update', 'strict'\])

What a write does when the batch's columns differ from the table's. `"replace"` makes the table the batch's own, so it is not affected. `"strict"` (the default) refuses a batch with a column the table lacks or a wider type; `"update"` adds the column and widens the type, and refuses a change BigQuery cannot make. A column the batch lacks is written NULL either way, and a merge keeps its stored value in the rows it updates.

parameter

`merge_cfg`[MergeCfgSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-bigquery#tabsdatak.conn.bigquery.MergeCfgSpec) | None ([list](https://docs.python.org/3/library/stdtypes.html#list)\[MergeCfg\] | None)

Required by -- and only valid with -- `if_table_exists="merge"`: how incoming rows are matched onto existing ones. A list, one entry per table in `tables` and in the same order -- a single table takes a one-entry list.

parameter

`watermark_column`[BigQueryColumnSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-bigquery#tabsdatak.conn.bigquery.BigQueryColumnSpec) | None ([str](https://docs.python.org/3/library/stdtypes.html#str) | None)

An optional column stamped with the id of the trx the write belongs to, making the write idempotent: a rerun that finds the target already carrying this trx's id writes nothing rather than applying the same batch twice. Every table in `tables` is stamped in the same column. The target gains the column under either `schema_evolution` setting -- a watermark no row can be stamped in would do nothing at all -- and rows written before it existed keep a NULL there.

A merge stamps through the `MERGE` itself; an append writes the column into the batch it stages, so the load job stamps the rows it loads. A replace is refused it, having nothing to make idempotent -- it rewrites the table wholesale, so a rerun already leaves the same rows behind.

parameter

`dest_cfg`[DestCfgSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-bigquery#tabsdatak.conn.bigquery.DestCfgSpec) | None (Mapping\[Literal\['bigquery.logging\_level', 'bigquery.schema\_evolution\_engine'\], [Any](https://docs.python.org/3/library/typing.html#typing.Any)\] | None)

Optional connector config. Supported keys: `bigquery.logging_level`, and `bigquery.schema_evolution_engine` -- `"iceberg"` (the default when unset) or `"native"`. `"iceberg"` diffs the target against the incoming batch and runs the `ALTER` statements itself: it adds a column and widens one whose type the batch has outgrown, and refuses a change BigQuery could not make. `"native"` leaves `schema_evolution="update"` to BigQuery's `schema_update_options` on the load job, which only ever adds a column or relaxes one to nullable, never widens one; a `MERGE` takes no load-job options, so `if_table_exists="merge"` refuses `"native"`. Under `schema_evolution="strict"` both engines refuse a batch with a new column or a wider type.

## Methods

method

`validate`

```python
def validate()
```

Cross-field validation: `merge_cfg` and `if_table_exists="merge"` require each other, a list of configs must line up with `tables`, `watermark_column` is not a replace's to name, and merging refuses `schema_evolution_engine="native"`.

Called by the framework; raises `BigQueryValidateException`.

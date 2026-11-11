# Merging into SQL destinations

> How Subscriber Functions apply inserts, updates, and deletes to Snowflake, BigQuery, and Databricks tables.

Source: https://docs.tabsdata.com/developer/guide/functions/sql-merge

When source data changes, a [Subscriber Function](https://docs.tabsdata.com/developer/guide/functions/subscribers) may need to update or delete records already written to the destination, as well as insert new records.

To do so, Tabsdata supports **merge** writes. Users specify key columns to match records and an operation column that tells Tabsdata whether to insert, update, or delete each row. The Subscriber returns the changes, and the connector applies them to the destination table.

Merge writes are supported by the [Snowflake](https://docs.tabsdata.com/developer/guide/connectors/snowflake), [BigQuery](https://docs.tabsdata.com/developer/guide/connectors/bigquery), and [Databricks](https://docs.tabsdata.com/developer/guide/connectors/databricks) connectors.

## Merge configuration

To configure a merge, set `if_table_exists="merge"` on the destination and pass a `merge_cfg` list containing the key and operation columns for each table.

For example, this Subscriber reads order changes from Tabsdata and applies them to `ORDERS` in Snowflake:

```python
from tabsdatak.api import subscriber, TableFrameSpec
from tabsdatak.conn.snowflake import MergeCfg, SnowflakeDest


@subscriber(
    destination=SnowflakeDest(
        tables=["ORDERS"],
        if_table_exists="merge",
        merge_cfg=[MergeCfg(on=["order_id"], op_column="op")],
        schema_evolution="update",
        dest_cfg={"snowflake.schema_evolution_engine": "iceberg"},
    ),
    input_tables=["capture/order_changes"],
)
def load_orders(changes: TableFrameSpec) -> TableFrameSpec:
    return changes
```

Here, `on=["order_id"]` matches records by order ID, while `op_column="op"` identifies the column containing the operation. The Function returns the changes from `capture/order_changes` for the connector to write.

Because a Subscriber can write to several tables, the `MergeCfg` entries must follow the order of `tables`, and both lists must have the same length. Use a list even for a single table. The `merge_cfg` setting is required for merge writes and cannot be used with other write modes.

The `on` setting requires at least one key column, and those columns must exist in both the incoming data and the destination when the merge runs. If several columns form the key, all their values must match.

`MergeCfg` is imported from the same connector module as the destination. On Snowflake and BigQuery, a merge under `schema_evolution="update"` needs `"iceberg"` set as the schema evolution engine in `dest_cfg`. See [Schema evolution](#schema-evolution).

## Row operations

After matching records by key, Tabsdata uses the operation column to decide what to write. In the example above, `op` accepts these values:

| Marker | Operation |
| --- | --- |
| `i` | Insert the row if its key does not exist in the destination. |
| `u` | Update the row matching its key. |
| `d` | Delete the row matching its key. |
| `l` | Load: the row comes from an initial load. The destination is emptied before the load's rows are inserted. |
| `t` | Truncate: the destination is emptied. |

An insert leaves an existing record unchanged, while an update or delete does nothing if the record is missing.

Uppercase `I`, `U`, `D`, `L` and `T` are also accepted, but spaces are not removed, so `" d "` is invalid. Tabsdata removes rows with invalid or null operations before processing the batch.

Because the operation column is used to control the write, Tabsdata excludes it when creating the destination table or updating its schema.

### Load and truncate markers

`l` and `t` reset the table. When a batch contains one, the changes before the last reset are discarded, and the destination's rows are replaced in one statement by what follows it. A CDC stream that uses `start_from="full"` or captures table truncates sends these markers.

## Multiple changes to one record

A record may change several times within the same batch. Tabsdata combines changes with the same key before writing them, using the first and last valid operations to determine the result.

These operations follow the row order in the materialized batch, so the order returned by the Function matters:

| First operation | Last operation | Result |
| --- | --- | --- |
| Insert | Insert or update | Insert using the latest row. |
| Insert | Delete | No destination write for this key. |
| Update or delete | Insert or update | Update using the latest row. |
| Update or delete | Delete | Delete the matching record. |

For example, `i → u → d → i` inserts the latest row because the final change adds the record again. With `i → u → d`, nothing is written because the record was created and deleted in the same batch.

For a delete, Tabsdata keeps the data from the last insert or update for that key, or the first row if all operations are deletes. This allows delete records to contain just the key columns and operation.

The destination therefore receives the combined change, without storing the intermediate changes as history.

## Destination tables and columns

If the destination table does not exist, all three connectors can create it from the staged data's schema, excluding the operation column. The database and schema or dataset must already exist, and the Connection must have the required permissions.

For existing tables, Snowflake and BigQuery write columns shared by the incoming data and the destination. Updates leave the keys unchanged, while inserts include them.

Columns found only in the destination are left unchanged on updates and omitted from inserts, where the destination's defaults and constraints apply.

A batch with a column the destination lacks is refused under `schema_evolution="strict"`, with `SQL_COMMON_10`, before the merge runs; under `update` the column is added. Values written to shared columns must still satisfy the destination's types and constraints.

Databricks handles column matching through Delta's merge rules, and `update` uses `MERGE WITH SCHEMA EVOLUTION`, which excludes the operation column. The operation marker should therefore use a separate column from the data being written.

## Schema evolution

Incoming data may contain new columns or values too large for the destination's current column types. **Schema evolution** controls whether Tabsdata can change the table to accept that data.

Set `schema_evolution` on the destination to choose the behavior. All three destinations default to `"strict"`:

| Setting | Behavior |
| --- | --- |
| `"strict"` | Refuses a new column, and a wider type unless its values fit the column, with `SQL_COMMON_10`, before the merge runs. A configured watermark column is an exception. |
| `"update"` | Allows new data columns and supported type widening. |

`strict` accepts a wider type when its values fit the column, and an incoming type narrower than the column's. Making a column nullable counts as widening and is refused. A column the batch lacks keeps its stored value. [Schema Evolution](https://docs.tabsdata.com/developer/guide/connectors/schema-evolution) has the same policy for every table destination and write mode.

Snowflake's and BigQuery's native schema evolution does not apply to `MERGE`. A Snowflake or BigQuery merge under `"update"` needs the `iceberg` engine set in `dest_cfg`, and is refused at registration without it:

```python
# SnowflakeDest
dest_cfg={"snowflake.schema_evolution_engine": "iceberg"}

# BigQueryDest
dest_cfg={"bigquery.schema_evolution_engine": "iceberg"}
```

The `iceberg` engine compares the incoming and destination schemas and applies supported changes through `ALTER TABLE`. It controls how schemas are compared; it does not convert the destination into an Apache Iceberg table. Under `"strict"`, a merge that sets the engine is refused at registration.

Databricks uses Delta's `MERGE WITH SCHEMA EVOLUTION` for `schema_evolution="update"`, so it does not require a `schema_evolution_engine` setting. On each merge, Tabsdata also sets the destination table's `delta.enableTypeWidening` property to `true` for `update` or `false` for `strict`.

### Type widening

Type widening allows a column to store larger values, such as longer strings or numbers with greater precision. The supported changes depend on the destination:

| Destination | Supported widening |
| --- | --- |
| Snowflake | Wider `VARCHAR` lengths and greater `NUMBER` precision at the same scale. The connector does not widen between different base types. |
| BigQuery | Supported numeric promotions, including `INT64 → NUMERIC → BIGNUMERIC → FLOAT64`, and wider type parameters. |
| Databricks | Type changes supported by Delta type widening. |

Setting `schema_evolution="update"` allows these supported changes. If the incoming data requires a conversion outside these rules, the write can still fail.

## Retrying a write

A Subscriber may retry a write after data has already reached the destination. To recognize these retries, Tabsdata can store the Transaction ID in a **watermark column**. If that ID is already in the table, Tabsdata skips the write.

Set `watermark_column` on the destination to enable this check:

```python
SnowflakeDest(
    tables=["ORDERS"],
    if_table_exists="merge",
    merge_cfg=[MergeCfg(on=["order_id"], op_column="op")],
    watermark_column="wm",
)
```

The configured name applies to all tables listed in the destination. If the column is missing, Tabsdata adds it even when `schema_evolution="strict"`. Existing rows have `NULL` in the new column, while inserted and updated rows receive the current Transaction ID.

The watermark name must differ from the key columns and operation column, following the destination's rules for uppercase and lowercase names. Watermarks work with `append` and `merge`, but not with `replace`.

Retries use the same Transaction ID, while new Transactions have different IDs and write normally. The check depends on a matching ID remaining in the destination. A batch containing only deletes leaves no new watermark value.

## Connector differences

The connectors differ in how they stage data, change schemas, and match column names:

| Behavior | Snowflake | BigQuery | Databricks |
| --- | --- | --- | --- |
| Staging | Snowflake stage, then a `TEMPORARY` table | GCS, then a staging table `<target>_<8 hex characters>` beside the target | Unity Catalog volume, then a staging table `<target>_<8 hex characters>` beside the target |
| Schema changes under `update` | Connector applies `ALTER TABLE` using Iceberg schema comparison | Connector applies `ALTER TABLE` using Iceberg schema comparison | Delta merge schema evolution |
| Engine for merge | `iceberg`, required under `update` | `iceberg`, required under `update` | No engine setting |
| Column names | Unquoted names resolve as uppercase; double quotes preserve case | Case-insensitive; backticks quote names | Case-insensitive; backticks quote names |

The BigQuery and Databricks staging tables are real tables, so the Connection needs permission to create and drop them, and a run that is killed can leave one behind.

For example, Snowflake resolves an unquoted `order_id` as uppercase, so `on=["order_id"]` matches a stored `ORDER_ID` column. BigQuery and Databricks match column names without considering case, including when those names are quoted.

BigQuery also requires destination table names to be enclosed in backticks, as in ``tables=["`orders`"]``.

## Errors

Tabsdata checks the configuration before writing and validates the incoming data during execution. The following conditions can cause the merge to fail:

| Condition | Result |
| --- | --- |
| Merge mode without `merge_cfg`, or `merge_cfg` without merge mode | Configuration error. |
| `merge_cfg` is not a list, or its length differs from `tables` | Configuration error. |
| Empty `on`, or an operation column that matches a key | Configuration error. |
| Snowflake or BigQuery merge under `update` without `schema_evolution_engine="iceberg"`, or under `strict` with an engine set | Refused at registration. |
| The same table listed twice in `tables` | Refused at registration (`CONN_37`). Databricks compares names ignoring case, Snowflake folds unquoted parts to uppercase, and BigQuery compares them verbatim. |
| A watermark with `replace`, or a watermark name that matches a key or operation column | Configuration error. |
| Missing operation or key columns in the incoming batch | Runtime error. |
| A new column, or a wider type whose values do not fit, under `strict` | Refused before the merge (`SQL_COMMON_10`). |
| No shared data columns between the batch and destination | Runtime error. |
| Several incoming columns match the same configured column name | Runtime error. |

For field definitions, see the `MergeCfg` API reference for [Snowflake](https://docs.tabsdata.com/api/category/connectors/destination/mergecfg-snowflake), [BigQuery](https://docs.tabsdata.com/api/category/connectors/destination/mergecfg-bigquery), and [Databricks](https://docs.tabsdata.com/api/category/connectors/destination/mergecfg-databricks).

# MergeCfg

> How `if_table_exists='merge'` matches incoming rows onto a target table.

Source: https://docs.tabsdata.com/api/category/connectors/destination/mergecfg-bigquery

class

```python
class MergeCfg(on: MergeColumnsSpec, op_column: MergeColumnSpec)
```

Bases: `DescriptorBase`

**Categories:** destination

How `if_table_exists="merge"` matches incoming rows onto a target table.

The BigQuery spelling of the shared `MergeCfg`. Columns are named as BigQuery resolves them: case-insensitively, so `on=["order_id"]` hits `ORDER_ID` and `OrderId` alike -- a table cannot hold two columns whose names differ only in case. Backticks are for a flexible column name; unlike Snowflake, quoting does not make a name case-sensitive.

Every incoming row carries a marker in `op_column` saying what to do with it, and the marker is what decides which clause claims the row:

-   `'i'` -- insert the row, if it matches no key.
-   `'u'` -- update the row it matches.
-   `'d'` -- delete the row it matches.

The idempotency watermark is named on the destination rather than here -- see `BigQueryDest.watermark_column`. It belongs to the write, not to the way one table's rows are matched, so a [`BigQueryDest`](https://docs.tabsdata.com/api/category/connectors/destination/bigquerydest) naming a list of configs still stamps every one of its targets with the same column.

## Examples

A CDC feed whose `op` column says what to do with each row:

```python
MergeCfg(on=["order_id", "customer_id"], op_column="op")
```

## Parameters

parameter

`on`[MergeColumnsSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-bigquery#tabsdatak.conn.bigquery.MergeColumnsSpec) ([list](https://docs.python.org/3/library/stdtypes.html#list)\[[str](https://docs.python.org/3/library/stdtypes.html#str)\])

The key columns rows are matched by, joined with `AND`. Must be present on both sides. Each is a BigQuery column name -- bare, or backtick-quoted for a flexible name.

parameter

`op_column`[MergeColumnSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-bigquery#tabsdatak.conn.bigquery.MergeColumnSpec) ([str](https://docs.python.org/3/library/stdtypes.html#str))

The column holding each row's `i` / `u` / `d` marker. Read to decide each row's fate and never written, so the target does not need the column and will not gain it.

## Methods

method

`validate`

```python
def validate()
```

Field validation, delegated to the shared config: `on` names at least one key and `op_column` does not collide with one of them.

Called by the framework; raises `SqlCommonValidateException`.

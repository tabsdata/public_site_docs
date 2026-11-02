# MergeCfg

> How `if_table_exists='merge'` matches incoming rows onto a target table.

Source: https://docs.tabsdata.com/api/category/connectors/destination/mergecfg-snowflake

class

```python
class MergeCfg(on: MergeColumnsSpec, op_column: MergeColumnSpec)
```

Bases: `DescriptorBase`

**Categories:** destination

How `if_table_exists="merge"` matches incoming rows onto a target table.

The Snowflake spelling of the shared `MergeCfg`: the connector stages the incoming parquet into a session-scoped temp table, then runs one `MERGE` per target table.

Columns are named the way the target stores them: an unquoted name is upper-folded (so `on=["order_id"]` hits `ORDER_ID`), a double-quoted one is case-sensitive and taken verbatim.

Every incoming row carries a marker in `op_column` saying what to do with it, and the marker is what decides which clause claims the row:

-   `'i'` -- insert the row, if it matches no key.
-   `'u'` -- update the row it matches.
-   `'d'` -- delete the row it matches.

The marker is lower-cased before it is compared, so a feed emitting `'I'` / `'U'` / `'D'` works as well as one emitting lower case. Anything else matches no clause and the row is passed over.

An update writes every column both sides share except the keys, which are what the row matched on; an insert writes those and the keys. Columns the target has and the incoming data does not keep their value on an update and take a NULL on an insert.

The idempotency watermark is named on the destination rather than here -- see `SnowflakeDest.watermark_column`. It belongs to the write, not to the way one table's rows are matched, so a [`SnowflakeDest`](https://docs.tabsdata.com/api/category/connectors/destination/snowflakedest) naming a list of configs still stamps every one of its targets with the same column.

## Examples

A CDC feed whose `op` column says what to do with each row:

```python
MergeCfg(on=["order_id", "customer_id"], op_column="op")
```

## Parameters

parameter

`on`[MergeColumnsSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-snowflake#tabsdatak.conn.snowflake.MergeColumnsSpec) ([list](https://docs.python.org/3/library/stdtypes.html#list)\[[str](https://docs.python.org/3/library/stdtypes.html#str)\])

The key columns rows are matched by, joined with `AND`. Must be present on both sides. Each is a Snowflake column identifier -- unquoted, or double-quoted for a case-sensitive / special-char name.

parameter

`op_column`[MergeColumnSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-snowflake#tabsdatak.conn.snowflake.MergeColumnSpec) ([str](https://docs.python.org/3/library/stdtypes.html#str))

The column holding each row's `i` / `u` / `d` marker. Read to decide each row's fate and never written, so the target does not need the column and will not gain it.

## Methods

method

`validate`

```python
def validate()
```

Field validation, delegated to the shared config: `on` names at least one key and `op_column` does not collide with one of them.

Called by the framework; raises `SqlCommonValidateException`.

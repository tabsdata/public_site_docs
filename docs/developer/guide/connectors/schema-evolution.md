# Schema Evolution

> What strict and update do when a write brings a new column or a wider type, per table destination: the write behavior matrix, type widening, native and Iceberg schema evolution, and the permissions update needs.

Source: https://docs.tabsdata.com/developer/guide/connectors/schema-evolution

Every table destination takes a `schema_evolution` setting that decides what happens when a write brings a column the destination table does not have, or a value type wider than the column's. The table destinations are Databricks, Snowflake, BigQuery, ClickHouse, StarRocks, Postgres, MySQL, MariaDB, Microsoft SQL Server, Oracle and Db2. The same two values apply to append, replace and merge on all of them, but what each one does differs by destination. Druid cannot enforce a schema, so `"update"` is its only value and its default.

## Policies

`schema_evolution` takes one of two values:

| Value | What it does |
| --- | --- |
| `"strict"` | Refuses a new column, and refuses a wider type unless its values fit the column, with error `SQL_COMMON_10`, before any data is loaded. |
| `"update"` | Adds new columns, widens types and makes columns nullable. It never drops or reorders columns. |

Under either value, a column the batch lacks is written as NULL on append and keeps its stored value on merge.

Renamed in 2.3.0

ClickHouse and StarRocks called `update` `"iceberg"` before 2.3.0. A function that still sets `schema_evolution="iceberg"` fails validation after the upgrade; change it to `"update"`.

## Behavior per destination

What each destination does with a new or wider column, and how it carries out `replace`:

| Destination | `strict` append | `strict` replace | `strict` merge | `update` | `replace` mechanism | `replace` atomic |
| --- | --- | --- | --- | --- | --- | --- |
| Databricks | Fails in `COPY INTO` (`DATABRICKS_9`) | Schema follows the batch | Refused before the `MERGE` (`SQL_COMMON_10`) | Append: `mergeSchema` and `delta.enableTypeWidening`. Merge: `MERGE WITH SCHEMA EVOLUTION` and widening | `CREATE OR REPLACE … read_files() LIMIT 0`, then `COPY INTO` | No |
| Snowflake | Refused before `COPY` | Refused: the schema check runs before the `TRUNCATE` | Refused | Append and replace: native `ENABLE_SCHEMA_EVOLUTION`, adds columns and makes columns nullable. Merge: Iceberg engine, set in `dest_cfg`; `ALTER` adds columns and widens `VARCHAR` length and `NUMBER` precision | `TRUNCATE`, then `COPY INTO`; the table definition is kept | No |
| BigQuery | Fails in the load job (`BIGQUERY_7`) | Schema replaced | Refused | Append and replace: native, adds columns and relaxes `REQUIRED`, never widens. Merge: Iceberg engine, set in `dest_cfg`; `ALTER` adds and widens, and `REQUIRED` stays `REQUIRED` | `WRITE_TRUNCATE` load job | Yes |
| ClickHouse | Refused before the load on a new column, a wider type whose values do not fit, or a NULL into a non-`Nullable` column. Column order is ignored, a narrower type fits, a missing column is NULL | Schema follows the batch | Not supported | Adds `Nullable` columns, makes columns nullable, widens `Int8` up to `Int64`, `UInt` likewise, and `Float32` to `Float64` | Stage, `DROP TABLE IF EXISTS`, `CREATE … MergeTree() ORDER BY tuple()`, `INSERT` by name | No |
| StarRocks | Refused before the load on a new column, or a wider type whose values do not fit. A missing column gets its default or NULL | Same check, then `TRUNCATE` and `INSERT`; the table must exist | Not supported | `ADD COLUMN … NULL`; `MODIFY COLUMN` widens integers, `FLOAT` to `DOUBLE`, `VARCHAR` and `DECIMAL`, waiting up to 30 minutes for the `ALTER` job | `TRUNCATE`, then `INSERT … SELECT FROM FILES()` | No |
| Druid | Refused at registration | Refused at registration | Not supported | The default and only value: schema discovery adds columns, and a missing column reads as NULL | `index_parallel` with `dropExisting` over 1970 to 2100 | Per datasource |
| Postgres, MySQL, MariaDB, SQL Server, Oracle, Db2 | Refused on a new column, or a wider type whose values do not fit (`SQL_COMMON_10`) | Schema follows the batch | Not supported | `ALTER TABLE … ADD`; widens integers, decimals and floats by digits or width. Db2 then runs `REORG`. No drops, and no retyping of non-number columns | `DROP TABLE IF EXISTS`, then the table is created on write | Postgres, SQL Server and Db2: inside `transactional`. MySQL, MariaDB and Oracle: no, and their `update` `ALTER`s commit implicitly |

A write to several tables runs one table after another and is not atomic across tables, except on the relational destinations with `transactional=True`. The Databricks and BigQuery merge staging tables are real tables named `<target>_<8 hex characters>`, created next to the target; only Snowflake's is `TEMPORARY`.

## Type widening under `update`

Each destination widens only these types:

| Destination | Widens |
| --- | --- |
| Snowflake | `VARCHAR` length and `NUMBER` precision, on merge |
| BigQuery | `INT64` to `BIGNUMERIC` to `FLOAT64`, on merge |
| ClickHouse | Integers up to 64 bits, signed and unsigned, and `Float32` to `Float64` |
| StarRocks | Integers, `FLOAT` to `DOUBLE`, `VARCHAR` and `DECIMAL` |
| Postgres, MySQL, MariaDB, SQL Server, Oracle, Db2 | Integers, decimals and floats, by digits or width |

A change outside these rules fails the write.

## Native and Iceberg schema evolution

Under `"update"`, a destination changes the table in one of two ways. Native schema evolution is the destination's own: the load or merge statement adds the columns. Iceberg schema evolution is applied by the connector: it compares the incoming and destination schemas following Apache Iceberg's evolution rules, and runs the `ALTER TABLE` statements before the write. It does not convert the destination into an Apache Iceberg table.

| Destination | `append` and `replace` | `merge` |
| --- | --- | --- |
| Databricks | Native | Native |
| Snowflake, BigQuery | Native | Iceberg, set in `dest_cfg` |
| ClickHouse, StarRocks, Postgres, MySQL, MariaDB, SQL Server, Oracle, Db2 | Iceberg | Not supported |
| Druid | Native | Not supported |

Snowflake's and BigQuery's native schema evolution adds columns and makes columns nullable, but never widens a type, and does not apply to `MERGE`. A Snowflake or BigQuery merge under `"update"` needs the Iceberg engine set in `dest_cfg`:

```python
dest_cfg={"snowflake.schema_evolution_engine": "iceberg"}
dest_cfg={"bigquery.schema_evolution_engine": "iceberg"}
```

Without it, the merge is refused at registration. The engine setting is accepted only on a Snowflake or BigQuery merge under `"update"`; on any other write mode or destination, and under `"strict"`, registration refuses `<database>.schema_evolution_engine`.

## Permissions

`update` needs permission to `ALTER` the destination table. Db2 also runs `REORG` through `ADMIN_CMD` after an `ALTER`, and BigQuery creates and deletes a temporary external table. On the relational destinations, `replace` drops and recreates the table, so it needs `DROP` and `CREATE`.

See [Merge into SQL destinations](https://docs.tabsdata.com/developer/guide/functions/sql-merge) for merge, and each destination's page for its other settings.

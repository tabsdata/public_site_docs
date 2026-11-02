# Destinations

Source: https://docs.tabsdata.com/api/category/connectors/destination/

|  |  |
| --- | --- |
| [`AzBlobLocation`](https://docs.tabsdata.com/api/category/connectors/destination/azbloblocation-clickhouse) | Azure Blob staging area for `ClickHouseDest`. |
| [`AzBlobLocation`](https://docs.tabsdata.com/api/category/connectors/destination/azbloblocation-druid) | Azure Blob staging area for `DruidDest`. |
| [`AzBlobLocation`](https://docs.tabsdata.com/api/category/connectors/destination/azbloblocation-starrocks) | Azure Blob staging area for `StarRocksDest`. |
| [`AzureBlobDest`](https://docs.tabsdata.com/api/category/connectors/destination/azureblobdest) | Azure Blob destination for `@subscriber` -- one target file per path. |
| [`AzureBlobDestConn`](https://docs.tabsdata.com/api/category/connectors/destination/azureblobdestconn) | Azure Blob connection used by `AzureBlobDest`. |
| [`BigQueryDest`](https://docs.tabsdata.com/api/category/connectors/destination/bigquerydest) | BigQuery destination for `@subscriber` -- one output slot per table. |
| [`BigQueryDestConn`](https://docs.tabsdata.com/api/category/connectors/destination/bigquerydestconn) | BigQuery connection. |
| [`ClickHouseDest`](https://docs.tabsdata.com/api/category/connectors/destination/clickhousedest) | ClickHouse destination for `@subscriber` -- one output slot per table. |
| [`ClickHouseDestConn`](https://docs.tabsdata.com/api/category/connectors/destination/clickhousedestconn) | ClickHouse connection. |
| [`CloudLocation`](https://docs.tabsdata.com/api/category/connectors/destination/cloudlocation-bigquery) | Abstract base for a BigQuery `staging` location. |
| [`CloudLocation`](https://docs.tabsdata.com/api/category/connectors/destination/cloudlocation-clickhouse) | Abstract base for a ClickHouse `staging` cloud location. |
| [`CloudLocation`](https://docs.tabsdata.com/api/category/connectors/destination/cloudlocation-druid) | Abstract base for a `DruidDest` cloud staging area. |
| [`CloudLocation`](https://docs.tabsdata.com/api/category/connectors/destination/cloudlocation-starrocks) | Abstract base for a StarRocks `staging` cloud location. |
| [`DatabricksDest`](https://docs.tabsdata.com/api/category/connectors/destination/databricksdest) | Databricks destination for `@subscriber` -- one output slot per table. |
| [`DatabricksDestConn`](https://docs.tabsdata.com/api/category/connectors/destination/databricksdestconn) | Databricks workspace connection used by `DatabricksDest`. |
| [`Db2Dest`](https://docs.tabsdata.com/api/category/connectors/destination/db2dest) | Db2 destination for `@subscriber` -- one target table per slot. |
| [`Db2DestConn`](https://docs.tabsdata.com/api/category/connectors/destination/db2destconn) | Db2 connection used by `Db2Dest`. |
| [`Dest`](https://docs.tabsdata.com/api/category/connectors/destination/dest) | Abstract destination. |
| [`DruidDest`](https://docs.tabsdata.com/api/category/connectors/destination/druiddest) | Druid destination for `@subscriber` -- one slot per datasource. |
| [`DruidDestConn`](https://docs.tabsdata.com/api/category/connectors/destination/druiddestconn) | Druid Overlord connection used by `DruidDest`. |
| [`GCSDest`](https://docs.tabsdata.com/api/category/connectors/destination/gcsdest) | GCS destination for `@subscriber` -- one target file per path. |
| [`GCSDestConn`](https://docs.tabsdata.com/api/category/connectors/destination/gcsdestconn) | GCS connection used by `GCSDest`. |
| [`GCSLocation`](https://docs.tabsdata.com/api/category/connectors/destination/gcslocation-bigquery) | GCS staging area for `BigQueryDest`. |
| [`GCSLocation`](https://docs.tabsdata.com/api/category/connectors/destination/gcslocation-clickhouse) | GCS staging area for `ClickHouseDest`. |
| [`GCSLocation`](https://docs.tabsdata.com/api/category/connectors/destination/gcslocation-starrocks) | GCS staging area for `StarRocksDest`. |
| [`LocalFileDest`](https://docs.tabsdata.com/api/category/connectors/destination/localfiledest) | LocalFile destination for `@subscriber` -- one target file per path. |
| [`LocalFileDestConn`](https://docs.tabsdata.com/api/category/connectors/destination/localfiledestconn) | LocalFile connection used by `LocalFileDest`. |
| [`MergeCfg`](https://docs.tabsdata.com/api/category/connectors/destination/mergecfg-bigquery) | How `if_table_exists="merge"` matches incoming rows onto a target table. |
| [`MergeCfg`](https://docs.tabsdata.com/api/category/connectors/destination/mergecfg-databricks) | How `if_table_exists="merge"` matches incoming rows onto a target table. |
| [`MergeCfg`](https://docs.tabsdata.com/api/category/connectors/destination/mergecfg-snowflake) | How `if_table_exists="merge"` matches incoming rows onto a target table. |
| [`MongoDBDest`](https://docs.tabsdata.com/api/category/connectors/destination/mongodbdest) | MongoDB destination for `@subscriber` -- one slot per collection. |
| [`MongoDBDestConn`](https://docs.tabsdata.com/api/category/connectors/destination/mongodbdestconn) | MongoDB connection used by `MongoDBDest`. |
| [`MSSQLDest`](https://docs.tabsdata.com/api/category/connectors/destination/mssqldest) | MSSQL destination for `@subscriber` -- one output slot per table. |
| [`MSSQLDestConn`](https://docs.tabsdata.com/api/category/connectors/destination/mssqldestconn) | MSSQL connection used by `MSSQLDest`. |
| [`MySQLDest`](https://docs.tabsdata.com/api/category/connectors/destination/mysqldest) | MySQL destination for `@subscriber` -- one target table per slot. |
| [`MySQLDestConn`](https://docs.tabsdata.com/api/category/connectors/destination/mysqldestconn) | MySQL connection used by `MySQLDest`. |
| [`OracleDest`](https://docs.tabsdata.com/api/category/connectors/destination/oracledest) | Oracle destination for `@subscriber` -- one target table per slot. |
| [`OracleDestConn`](https://docs.tabsdata.com/api/category/connectors/destination/oracledestconn) | Oracle connection used by `OracleDest`. |
| [`PostgresDest`](https://docs.tabsdata.com/api/category/connectors/destination/postgresdest) | Postgres destination for `@subscriber` -- one target table per slot. |
| [`PostgresDestConn`](https://docs.tabsdata.com/api/category/connectors/destination/postgresdestconn) | Postgres connection used by `PostgresDest`. |
| [`S3Dest`](https://docs.tabsdata.com/api/category/connectors/destination/s3dest) | S3 destination for `@subscriber` -- one target file per path. |
| [`S3DestConn`](https://docs.tabsdata.com/api/category/connectors/destination/s3destconn) | S3 connection used by `S3Dest`. |
| [`S3Location`](https://docs.tabsdata.com/api/category/connectors/destination/s3location-clickhouse) | S3 staging area for `ClickHouseDest`. |
| [`S3Location`](https://docs.tabsdata.com/api/category/connectors/destination/s3location-druid) | S3 staging area for `DruidDest`. |
| [`S3Location`](https://docs.tabsdata.com/api/category/connectors/destination/s3location-starrocks) | S3 staging area for `StarRocksDest`. |
| [`SnowflakeDest`](https://docs.tabsdata.com/api/category/connectors/destination/snowflakedest) | Snowflake destination for `@subscriber` -- one output slot per table. |
| [`SnowflakeDestConn`](https://docs.tabsdata.com/api/category/connectors/destination/snowflakedestconn) | Snowflake account connection. |
| [`StarRocksDest`](https://docs.tabsdata.com/api/category/connectors/destination/starrocksdest) | StarRocks destination for `@subscriber` -- one output slot per table. |
| [`StarRocksDestConn`](https://docs.tabsdata.com/api/category/connectors/destination/starrocksdestconn) | StarRocks connection. |
| [`TrashDest`](https://docs.tabsdata.com/api/category/connectors/destination/trashdest) | Destination that discards the frame for `@subscriber` -- a sink to nowhere. |
| [`TrashDestConn`](https://docs.tabsdata.com/api/category/connectors/destination/trashdestconn) | Connection for `TrashDest` -- no configuration. |

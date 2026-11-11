# Sources

Source: https://docs.tabsdata.com/api/category/connectors/source/

|  |  |
| --- | --- |
| [`AwsGlueSchemaRegistry`](https://docs.tabsdata.com/api/category/connectors/source/awsglueschemaregistry) | AWS Glue schema registry attached to a `KafkaStreamSrcConn`. |
| [`AzureBlobSrc`](https://docs.tabsdata.com/api/category/connectors/source/azureblobsrc) | Azure Blob source for `@publisher` -- one output slot per path. |
| [`AzureBlobSrcConn`](https://docs.tabsdata.com/api/category/connectors/source/azureblobsrcconn) | Azure Blob connection used by `AzureBlobSrc`. |
| [`BinlogPosition`](https://docs.tabsdata.com/api/category/connectors/source/binlogposition) | CDC start position: a binlog file + byte offset. |
| [`CommitSeqPosition`](https://docs.tabsdata.com/api/category/connectors/source/commitseqposition) | CDC start position: one global commit sequence for every table. |
| [`ConfluentSchemaRegistry`](https://docs.tabsdata.com/api/category/connectors/source/confluentschemaregistry) | Confluent-style schema registry attached to a `KafkaStreamSrcConn`. |
| [`Data`](https://docs.tabsdata.com/api/category/connectors/source/data) | One dataframe emitted by `DataGenSrc` or `DevFrameSrc`, optionally chunked. |
| [`DatabricksSrc`](https://docs.tabsdata.com/api/category/connectors/source/databrickssrc) | Databricks source for `@publisher` -- one output slot per query. |
| [`DatabricksSrcConn`](https://docs.tabsdata.com/api/category/connectors/source/databrickssrcconn) | Databricks workspace connection used by `DatabricksSrc`. |
| [`DataGenSrc`](https://docs.tabsdata.com/api/category/connectors/source/datagensrc) | Source emitting in-line dataframes for `@publisher` -- one slot per `Data`. |
| [`DataGenSrcConn`](https://docs.tabsdata.com/api/category/connectors/source/datagensrcconn) | Connection for `DataGenSrc` -- no configuration. |
| [`Db2CdcStreamSrc`](https://docs.tabsdata.com/api/category/connectors/source/db2cdcstreamsrc) | Db2 CDC stream source for `@stream_publisher`. |
| [`Db2CdcStreamSrcConn`](https://docs.tabsdata.com/api/category/connectors/source/db2cdcstreamsrcconn) | Db2 CDC connection used by `Db2CdcStreamSrc`. |
| [`Db2Src`](https://docs.tabsdata.com/api/category/connectors/source/db2src) | Db2 source for `@publisher` -- one output slot per query. |
| [`Db2SrcConn`](https://docs.tabsdata.com/api/category/connectors/source/db2srcconn) | Db2 connection used by `Db2Src`. |
| [`DevFrameSrc`](https://docs.tabsdata.com/api/category/connectors/source/devframesrc) | Source emitting in-line dataframes for `@publisher` as `LazyFrame`\\ s -- one slot per `Data`. |
| [`DevFrameSrcConn`](https://docs.tabsdata.com/api/category/connectors/source/devframesrcconn) | Connection for `DevFrameSrc` -- no configuration. |
| [`GCSSrc`](https://docs.tabsdata.com/api/category/connectors/source/gcssrc) | GCS source for `@publisher` -- one output slot per path. |
| [`GCSSrcConn`](https://docs.tabsdata.com/api/category/connectors/source/gcssrcconn) | GCS connection used by `GCSSrc`. |
| [`GtidPosition`](https://docs.tabsdata.com/api/category/connectors/source/gtidposition) | CDC start position: a MySQL Global Transaction ID. |
| [`KafkaStreamSrc`](https://docs.tabsdata.com/api/category/connectors/source/kafkastreamsrc) | Kafka streaming source for `@stream_publisher` -- one batch per due batch limit. |
| [`KafkaStreamSrcConn`](https://docs.tabsdata.com/api/category/connectors/source/kafkastreamsrcconn) | Kafka connection used by `KafkaStreamSrc`. |
| [`LocalFileSrc`](https://docs.tabsdata.com/api/category/connectors/source/localfilesrc) | LocalFile source for `@publisher` -- one output slot per path. |
| [`LocalFileSrcConn`](https://docs.tabsdata.com/api/category/connectors/source/localfilesrcconn) | LocalFile connection used by `LocalFileSrc`. |
| [`LsnPosition`](https://docs.tabsdata.com/api/category/connectors/source/lsnposition) | CDC start position: a WAL Log Sequence Number. |
| [`MSSQLSrc`](https://docs.tabsdata.com/api/category/connectors/source/mssqlsrc) | MSSQL source for `@publisher` -- one output slot per query. |
| [`MSSQLSrcConn`](https://docs.tabsdata.com/api/category/connectors/source/mssqlsrcconn) | MSSQL connection used by `MSSQLSrc`. |
| [`MySQLCdcStreamSrc`](https://docs.tabsdata.com/api/category/connectors/source/mysqlcdcstreamsrc) | MySQL CDC stream source for `@stream_publisher`. |
| [`MySQLCdcStreamSrcConn`](https://docs.tabsdata.com/api/category/connectors/source/mysqlcdcstreamsrcconn) | MySQL CDC connection used by `MySQLCdcStreamSrc`. |
| [`MySQLSrc`](https://docs.tabsdata.com/api/category/connectors/source/mysqlsrc) | MySQL source for `@publisher` -- one output slot per query. |
| [`MySQLSrcConn`](https://docs.tabsdata.com/api/category/connectors/source/mysqlsrcconn) | MySQL connection used by `MySQLSrc`. |
| [`OracleSrc`](https://docs.tabsdata.com/api/category/connectors/source/oraclesrc) | Oracle source for `@publisher` -- one output slot per query. |
| [`OracleSrcConn`](https://docs.tabsdata.com/api/category/connectors/source/oraclesrcconn) | Oracle connection used by `OracleSrc`. |
| [`PostgresCdcStreamSrc`](https://docs.tabsdata.com/api/category/connectors/source/postgrescdcstreamsrc) | Postgres CDC stream source for `@stream_publisher`. |
| [`PostgresCdcStreamSrcConn`](https://docs.tabsdata.com/api/category/connectors/source/postgrescdcstreamsrcconn) | Postgres CDC connection used by `PostgresCdcStreamSrc`. |
| [`PostgresSrc`](https://docs.tabsdata.com/api/category/connectors/source/postgressrc) | Postgres source for `@publisher` -- one output slot per query. |
| [`PostgresSrcConn`](https://docs.tabsdata.com/api/category/connectors/source/postgressrcconn) | Postgres connection used by `PostgresSrc`. |
| [`S3Src`](https://docs.tabsdata.com/api/category/connectors/source/s3src) | S3 source for `@publisher` -- one output slot per path. |
| [`S3SrcConn`](https://docs.tabsdata.com/api/category/connectors/source/s3srcconn) | S3 connection used by `S3Src`. |
| [`SalesforceReportSrc`](https://docs.tabsdata.com/api/category/connectors/source/salesforcereportsrc) | Salesforce report source for `@publisher` -- Tabular reports only. |
| [`SalesforceSrc`](https://docs.tabsdata.com/api/category/connectors/source/salesforcesrc) | Salesforce SOQL source for `@publisher` -- one query. |
| [`SalesforceSrcConn`](https://docs.tabsdata.com/api/category/connectors/source/salesforcesrcconn) | Salesforce org connection used by `SalesforceSrc` / `SalesforceReportSrc`. |
| [`Src`](https://docs.tabsdata.com/api/category/connectors/source/src) | Abstract batch source. |
| [`StreamSrc`](https://docs.tabsdata.com/api/category/connectors/source/streamsrc) | Abstract stream source. |
| [`TableCommitSeqPosition`](https://docs.tabsdata.com/api/category/connectors/source/tablecommitseqposition) | CDC start position: independent commit sequence per table. |
| [`TimestampPosition`](https://docs.tabsdata.com/api/category/connectors/source/timestampposition-db2) | CDC start position given as a wall-clock timestamp. |
| [`TimestampPosition`](https://docs.tabsdata.com/api/category/connectors/source/timestampposition-mysql) | CDC start position given as a wall-clock timestamp. |

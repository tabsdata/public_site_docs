# Connectors

> The connectors built into Tabsdata, and the source and destination classes each one provides.

Source: https://docs.tabsdata.com/guide/connectors/

A **connector** is the set of Python classes Tabsdata uses to read from or write to one external system. Every built-in connector is part of the `tabsdatak.conn` package and provides a source class, a destination class, or both, along with the connection types that hold the system's address and credentials.

A publisher uses a connector's source class to read from the external system and write into Tabsdata tables. A subscriber uses a connector's destination class to read from Tabsdata tables and write out to the external system. Neither class stores credentials. The address and credentials live on the [connection](https://docs.tabsdata.com/guide/connections) of the collection the function is registered in, so the same connection is shared by every publisher or subscriber in that collection.

Kafka and the three CDC connectors provide a stream source class instead of a source class. A [stream publisher](https://docs.tabsdata.com/guide/functions/stream-publishers) uses a stream source to consume the external system continuously, and runs each time a batch of messages or changes rolls over instead of on a manual, cron, or table trigger.

## Built-in connectors

Each connector's page covers its connection fields and the options of its classes, and links to a full walkthrough in Tutorials.

| Connector | Publisher | Stream publisher | Subscriber |
| --- | --- | --- | --- |
| [Amazon S3](https://docs.tabsdata.com/guide/connectors/amazon-s3) | `S3Src` |  | `S3Dest` |
| [Apache Druid](https://docs.tabsdata.com/guide/connectors/druid) |  |  | `DruidDest` |
| [Azure Blob Storage](https://docs.tabsdata.com/guide/connectors/azure) | `AzureBlobSrc` |  | `AzureBlobDest` |
| [BigQuery](https://docs.tabsdata.com/guide/connectors/bigquery) |  |  | `BigQueryDest` |
| [ClickHouse](https://docs.tabsdata.com/guide/connectors/clickhouse) |  |  | `ClickHouseDest` |
| [Databricks](https://docs.tabsdata.com/guide/connectors/databricks) | `DatabricksSrc` |  | `DatabricksDest` |
| [Db2](https://docs.tabsdata.com/guide/connectors/db2) | `Db2Src` |  | `Db2Dest` |
| [Db2 CDC](https://docs.tabsdata.com/guide/connectors/db2-cdc) |  | `Db2CdcStreamSrc` |  |
| [Google Cloud Storage](https://docs.tabsdata.com/guide/connectors/gcp) | `GCSSrc` |  | `GCSDest` |
| [Kafka](https://docs.tabsdata.com/guide/connectors/kafka) |  | `KafkaStreamSrc` |  |
| [Local File System](https://docs.tabsdata.com/guide/connectors/local-file-system) | `LocalFileSrc` |  | `LocalFileDest` |
| [MariaDB](https://docs.tabsdata.com/guide/connectors/mariadb) | `MySQLSrc` |  | `MySQLDest` |
| [MongoDB](https://docs.tabsdata.com/guide/connectors/mongodb) |  |  | `MongoDBDest` |
| [MSSQL](https://docs.tabsdata.com/guide/connectors/mssql) | `MSSQLSrc` |  | `MSSQLDest` |
| [MySQL](https://docs.tabsdata.com/guide/connectors/mysql) | `MySQLSrc` |  | `MySQLDest` |
| [MySQL CDC](https://docs.tabsdata.com/guide/connectors/mysql-cdc) |  | `MySQLCdcStreamSrc` |  |
| [Oracle](https://docs.tabsdata.com/guide/connectors/oracle) | `OracleSrc` |  | `OracleDest` |
| [Postgres](https://docs.tabsdata.com/guide/connectors/postgres) | `PostgresSrc` |  | `PostgresDest` |
| [Postgres CDC](https://docs.tabsdata.com/guide/connectors/postgres-cdc) |  | `PostgresCdcStreamSrc` |  |
| [Salesforce](https://docs.tabsdata.com/guide/connectors/salesforce) | `SalesforceSrc`, `SalesforceReportSrc` |  |  |
| [Snowflake](https://docs.tabsdata.com/guide/connectors/snowflake) |  |  | `SnowflakeDest` |
| [StarRocks](https://docs.tabsdata.com/guide/connectors/starrocks) |  |  | `StarRocksDest` |

note

The Oracle and Postgres connectors need a database driver that Tabsdata does not redistribute. See [Installing Third-Party Database Drivers](https://docs.tabsdata.com/server-admin/third-party-database-drivers) to add the driver to your Tabsdata server.

## Other systems

To connect a system that has no built-in connector, write a custom connector. See [Custom Connectors](https://docs.tabsdata.com/guide/plugins).

# Subscribers

Source: https://docs.tabsdata.com/developer/tutorials/subscribers/

A subscriber is a Tabsdata function that reads from tables in the Tabsdata server and writes them to external destinations such as file systems or databases. For example, you can create a subscriber to write the Tabsdata tables that it is subscribed to and write them to an AWS S3 instance.

## How the pieces fit together

A subscriber setup mirrors a publisher's, with the flow reversed: existing **Tabsdata tables** feed a **subscriber function**, which writes them out through a **connection** owned by a destination collection. Explore the pieces below (click any asset, or its ? for context), then trigger the subscriber to sync data out:

Tabsdata server

collection · warehouse

Table

vendors

//sales

Committed

Table

items

//sales

Committed

Connection

conn-mysql-dest.yaml

Subscriber

write\_sales

Database

MySQL

MySQL · external

Not yet synced

When you define a subscriber, you specify the name of the subscriber, the Tabsdata tables to write, and destination properties to write to. By default a subscriber is triggered by a new commit to any of its input tables.

To create and run a Tabsdata subscriber, complete the following tasks:

**Define a subscriber** - Define a subscriber to configure the parameters that govern the writing of data from the Tabsdata server. The syntax for defining a subscriber differs depending on the system that the subscriber writes to. For details, see the supported destination connectors below.

**Register the subscriber** - Register the subscriber with a Tabsdata collection. A subscriber can read from tables outside the collection it is registered with. For information about registering functions, see here.

**Execute the subscriber** - Execute the subscriber by initiating its trigger. Once executed, the subscriber reads the Tabsdata tables, and writes the output data to the external systems. By default, subscribers are triggered when any of the input tables receive a new commit. However, you can define any Tabsdata table to act as a trigger for a subscriber. For more information, see here.

Below is the list of destination connectors that are currently supported natively in Tabsdata. Beyond these, you can connect with other external systems as per your need using connector plugins.

-   [Local File System](https://docs.tabsdata.com/developer/tutorials/subscribers/local-file-system)
-   [Amazon S3](https://docs.tabsdata.com/developer/tutorials/subscribers/amazon-s3)
-   [AWS Glue - Iceberg tables](https://docs.tabsdata.com/developer/tutorials/subscribers/aws-iceberg)
-   [Azure Blob Storage](https://docs.tabsdata.com/developer/tutorials/subscribers/azure)
-   [BigQuery](https://docs.tabsdata.com/developer/tutorials/subscribers/bigquery)
-   [ClickHouse](https://docs.tabsdata.com/developer/tutorials/subscribers/clickhouse)
-   [Databricks](https://docs.tabsdata.com/developer/tutorials/subscribers/databricks)
-   [Apache Druid](https://docs.tabsdata.com/developer/tutorials/subscribers/druid)
-   [Google Cloud Storage](https://docs.tabsdata.com/developer/tutorials/subscribers/gcp)
-   [MariaDB](https://docs.tabsdata.com/developer/tutorials/subscribers/mariadb)
-   [MongoDB](https://docs.tabsdata.com/developer/tutorials/subscribers/mongodb)
-   [Microsoft SQL Server](https://docs.tabsdata.com/developer/tutorials/subscribers/mssql)
-   [MySQL](https://docs.tabsdata.com/developer/tutorials/subscribers/mysql)
-   [Oracle](https://docs.tabsdata.com/developer/tutorials/subscribers/oracle)
-   [Postgres](https://docs.tabsdata.com/developer/tutorials/subscribers/postgres)
-   [Snowflake](https://docs.tabsdata.com/developer/tutorials/subscribers/snowflake)
-   [StarRocks](https://docs.tabsdata.com/developer/tutorials/subscribers/starrocks)

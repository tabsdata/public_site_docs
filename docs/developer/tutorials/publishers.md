# Publishers

Source: https://docs.tabsdata.com/developer/tutorials/publishers/

A publisher is a Tabsdata function that reads data from an external source, such as file system or database, and writes the data to one or more tables in the Tabsdata server.

## Publisher Architecture

POub Every publisher setup has the same three assets: a **connection template** that knows how to reach the external system, a **collection** that owns the connection, and a **publisher function** registered into the collection. Explore them below (click any asset, or its ? for context), then trigger the publisher to see versioned tables land:

Tabsdata server

collection · world

Database

PostgreSQL

PostgreSQL · external

Reachable

Connection

conn-postgres.yaml

Publisher

read\_world

Table

country

//world

No versions yet

Table

city

//world

No versions yet

Here is an example publisher named `read_sales`. It reads three sales csv files, checks if their last modified date is after 1st Jan 2021, and writes them to the Tabsdata tables of the same name. This publisher executes automatically as soon as a new commit occurs on the `new_customer` table:

```python
import tabsdata as td


@td.publisher(
    source=td.LocalFileSource(
        [
            "/users/username/opt/sales-staging/us/us_sales.csv",
            "/users/username/opt/sales-staging/eu/eu_sales.csv",
            "/users/username/opt/sales-staging/emea/emea_sales.csv",
        ],
        initial_last_modified="2021-01-01",
    ),
    tables=["us_sales", "eu_sales", "emea_sales"],
    trigger_by="new_customer",
)
def read_sales(tf1: td.TableFrame, tf2: td.TableFrame, tf3: td.TableFrame):
    return tf1, tf2, tf3
```

When you define a publisher, you specify the name of the publisher, the data to read, and the names of the Tabsdata tables to write to. If you want the publisher to execute automatically, you need to specify the Tabsdata tables that will trigger the publisher when a commit occurs for one of those tables in the `trigger_by` parameter.

To create and run a Tabsdata publisher, complete the following tasks:

-   **Define a publisher** - Define a publisher to configure the parameters that govern the reading of data into the Tabsdata server. The syntax for defining a publisher differs depending on the system that the publisher reads from. For details, see the supported source connectors below.
-   **Register the publisher** - Register the publisher with a Tabsdata collection. A publisher can only write output tables to the collection that it is registered with. For information about registering functions, see here.
-   **Execute the publisher** - Execute the publisher by initiating a trigger. Once executed, the publisher takes the input data, processes it as defined in the function logic, and writes the output tables in the Tabsdata server. By default, publishers do not have any triggers. For more information about executing a function, see here.

Below is the list of sources connectors that are currently supported natively in Tabsdata. Beyond these, you can connect with other external systems as per your need using connector plugins.

-   [Local File System](https://docs.tabsdata.com/developer/tutorials/publishers/local-file-system)
-   [Amazon S3](https://docs.tabsdata.com/developer/tutorials/publishers/amazon-s3)
-   [Azure Blob Storage](https://docs.tabsdata.com/developer/tutorials/publishers/azure)
-   [Databricks](https://docs.tabsdata.com/developer/tutorials/publishers/databricks)
-   [Db2](https://docs.tabsdata.com/developer/tutorials/publishers/db2)
-   [Db2 CDC](https://docs.tabsdata.com/developer/tutorials/publishers/db2-cdc)
-   [Google Cloud Storage](https://docs.tabsdata.com/developer/tutorials/publishers/gcp)
-   [Kafka](https://docs.tabsdata.com/developer/tutorials/publishers/kafka)
-   [MariaDB](https://docs.tabsdata.com/developer/tutorials/publishers/mariadb)
-   [Microsoft SQL Server](https://docs.tabsdata.com/developer/tutorials/publishers/mssql)
-   [MySQL CDC](https://docs.tabsdata.com/developer/tutorials/publishers/mysql-cdc)
-   [MySQL](https://docs.tabsdata.com/developer/tutorials/publishers/mysql)
-   [Oracle](https://docs.tabsdata.com/developer/tutorials/publishers/oracle)
-   [Postgres](https://docs.tabsdata.com/developer/tutorials/publishers/postgres)
-   [PostgreSQL CDC](https://docs.tabsdata.com/developer/tutorials/publishers/postgres-cdc)
-   [Salesforce SOQL Query](https://docs.tabsdata.com/developer/tutorials/publishers/salesforce)
-   [Salesforce Reports](https://docs.tabsdata.com/developer/tutorials/publishers/salesforce-reports)
-   [Grok for Log Files](https://docs.tabsdata.com/developer/tutorials/publishers/grok-for-log-files)

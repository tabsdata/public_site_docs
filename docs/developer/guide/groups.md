# Groups

> How Groups organize Collections by data direction and transformation stage.

Source: https://docs.tabsdata.com/developer/guide/groups

A **Group** is an organizational layer inside a tabsdata project that organizes workflow steps according to their role in the workflow. By default, all tabsdata projects come with three groups: **sources, default, and destinations**

1\. the **sources** group stores everything related to ingesting data from external systems

2\. the **default** group stores everything related to transforming data inside tabsdata

3\. the **destinations** group stores everything related to loading data into external systems

Groups separate workflow resources based on type of data movement

Database

postgres

Tabsdata Server

`sources`

Publisher

load\_users

Table

users

`default`

Transformer

rank\_users

Table

top\_users

`destinations`

Subscriber

sync\_users

Warehouse

snowflake

## Modifying Groups

The **sources, default,** and **destinations** groups are special groups that must exist in your workflow. They are dedicated spaces for registering publisher and subscriber functions and cannot be modified, duplicated, or removed from your project.

Outside these three system groups, users can create any number of groups to organize their transformer functions.

## Use Cases for Groups

Groups are useful for separating workflow steps that happen across tabsdata server boundaries (ingestion, load) from workflow steps that happen inside the tabsdata server (transform).

Groups are also useful for separating data transformation workflow steps by the type of data transformation being done.

For example, a popular data design pattern is the [Medallion Architecture](https://www.databricks.com/blog/what-is-medallion-architecture) for Data Integration, which breaks data transformation into three layers:

-   **Bronze:** Layer that ingests raw source data from external systems with the goal of having as close of a representation to data in the external system
-   **Silver:** Layer that cleans, dedupes, normalizes, and joins related entities
-   **Gold:** Layer that applies granular, business-specific transformations and creates "consumer-ready" tables.

Users looking to implement this design pattern in tabsdata can do so with five groups within Tabsdata: two built-in groups (sources, destinations) and three custom groups (bronze, silver, gold).

External systems

Group`sources`Publishers

Ingest from external systems.

Built in

Group`bronze`Transformers

Raw data, kept as close to the external system as possible.

User created

Group`silver`Transformers

Cleaned, deduped, normalized, and joined.

User created

Group`gold`Transformers

Business-specific transformations, consumer-ready tables.

User created

Group`destinations`Subscribers

Write out to external systems.

Built in

External systems

## Visualizing Groups

The Projects view in the Tabsdata UI shows how data moves between Groups, including the number of Tables, rows, and bytes moving through each stage.

## Managing Groups

The `sources`, `default`, and `destinations` Groups are created with every Project. These system Groups cannot be renamed or deleted.

Custom Groups can be created, renamed, and deleted within a Project.

See [Create a Group](https://docs.tabsdata.com/developer/tutorials/managing-groups/create), [Update a Group](https://docs.tabsdata.com/developer/tutorials/managing-groups/update), and [Delete a Group](https://docs.tabsdata.com/developer/tutorials/managing-groups/delete) for step-by-step instructions.

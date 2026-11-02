# Lineage

> How Tabsdata records where each table version came from and how to view that lineage in the Tabsdata UI.

Source: https://docs.tabsdata.com/guide/lineage

Any number of factors can evolve over the course of a data pipeline's lifecycle, including the shape of processed data, the logic used to move and transform that data, and when specific data was scheduled to be processed. This is called **Data Lineage**.

Tabsdata's built-in data lineage automatically stores immutable versions of tables and functions as they are modified, preserving a record of how your workflows change over time. This allows users to travel back to historical versions of table data, examine the code that produced them, and see how their workflow logic has evolved.

_Video: In the Tabsdata UI, the trigger time of the newest execution plan is highlighted and the plan is opened from the Executions list, the pub_customers function on its graph is right-clicked to show its code, and the customers table is right-clicked and Go to sample opens the version the plan wrote._

## How Lineage Is Recorded

All Tabsdata functions declare the Tables they read from and write to. This allows Tabsdata to infer dependencies and execution order, a core mechanic that enables Automatic Orchestration and Execution Plans.

Because dependencies are declared ahead of time, Tabsdata automatically links each table version to the function and function code that produced it. These versions are then grouped into an execution plan, along with the other tables and functions affected by the execution.

## Table History

Each time a Function run successfully returns data, Tabsdata creates a new, immutable table version while preserving all previous versions of the table's data and schema.

_Video: In the Tabsdata UI, two older versions of the customers table are selected in turn from the Collections panel, and the Sample tab shows the email and region values that changed between them._

Functions can also read previous Table versions. An input written as `customers@HEAD^` reads the version before the latest, and `customers@HEAD~2..HEAD` reads a range of versions ending at the latest.

Uses the latest version of customers as input.

## Schema History

Each Table version stores its own schema, so a Table's version history records changes to its schema as well as its data. Comparing the schema of one Table version with another shows which columns were added, removed, or changed type.

_Video: In the Tabsdata UI, the customers table version before a schema change is opened, then the table version marked New data with schema changes, and the Schema tab shows region added, signup_date changed from str to date, and fax removed._

## Function History

Functions have their own version history. Whenever a Function is updated, Tabsdata creates a new Function version, retaining a changelog of all previous versions of the function's code.

_Video: In the Tabsdata UI, the two older versions of the pub_customers function are opened in turn from the Collections panel, and the Snippet tab shows the lines of its query that changed between versions._

## Viewing Lineage

In the Tabsdata [User Interface](https://docs.tabsdata.com/guide/user-interface), lineage can be viewed from Tables, Execution Plans, and Functions.

### Tables

Opening a Table shows three tabs: **Schema**, **Lineage**, and **Sample**. The Lineage tab shows a graph of the Execution Plan that wrote the selected table version. This execution plan is unique to the specific table version, and exploring the lineage of other versions can show the evolution of a particular execution plan.

orders\_clean

Tabsdata›Collections›sales›orders\_clean

### Schema

Table schema defines the structure of a table by listing its columns and their data types.

| Object | Type |
| --- | --- |
| order\_id | i64 |
| customer\_id | i64 |
| amount | f64 |
| ordered\_at | datetime |

# Tables

Source: https://docs.tabsdata.com/developer/guide/tables

Tables are a unique feature of Tabsdata. Unlike other data integration tools that discard intermediate data after execution, Tabsdata stores the data produced by functions in persistent, versioned Tables.

Tables make it easier to monitor and debug workflows, inspect data from previous executions, track schema changes over time, and understand how data moves through a Project.

Because Tables persist between executions, they can also be used as inputs by other functions and allow Tabsdata to automatically orchestrate workflows based on new data being committed.

## Table Versions

Every Table maintains a complete version history. Each successful function execution that writes data to a Table creates a new **version** containing its own data and schema.

Previous versions remain available, allowing users and functions to access the state of a Table from a specific execution. Each version also includes metadata about the execution that produced it and the function code used during that execution.

persons

Tabsdata›Collections›input›persons

### Schema

Table schema defines the structure of a table by listing its columns and their data types.

| Object | Type |
| --- | --- |
| first\_name | str |
| last\_name | str |
| age | i64 |
| nationality | str |
| city | str |

version

Because each Table version maintains its own schema, schema changes between executions do not cause previous versions of the Table to become invalid.

## Tables in Action

Tables store the data that moves through a Tabsdata workflow. Functions read from and write to Tables depending on their role in the workflow.

Publisher functions ingest data from external systems and write it to Tabsdata Tables.

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

Transformer functions read from Tabsdata Tables, transform the data, and write the results to new Tables.

collection · world

collection · insights · data product

Table

country

//world

Committed

Table

city

//world

Committed

Transformer

find\_big\_cities

Table

big\_cities

//insights

No versions yet

Subscriber functions read from Tabsdata Tables and write the data to external systems.

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

## Referring to a Table

Functions refer to their input Tables using the following format:

`[collection/]table[@version]`

If the Collection is omitted, Tabsdata looks for the Table within the Function's own Collection.

For example:

```text
persons
input/persons
input/persons@HEAD
```

The version can be used to select a specific version or set of versions of the Table:

-   `HEAD` selects the latest version.
-   `HEAD^` selects the version immediately before `HEAD`.
-   `HEAD~N` selects a version relative to `HEAD`.
-   `INITIAL` selects the first version.
-   A specific version ID selects that version.
-   Comma-separated version IDs select multiple versions.
-   `a..b` selects a range of versions.

If no version is specified, the Function reads from `HEAD`.

Tables can also be referenced across Collections within the same Project. Tables in another Project cannot be referenced.

## Private Tables

Tables whose names begin with `_` are **private Tables**.

Private Tables can only be read by Functions within their own Collection. This makes them useful for intermediate data that needs to move between Functions in a Collection without being accessible to the rest of the Project.

For example:

```text
_cleaned_customers
```

A Function in the same Collection can use `_cleaned_customers` as an input, while Functions in other Collections cannot access it.

## Tables and Triggers

A new Table commit can also trigger downstream Functions.

Transformers and Subscribers are automatically triggered when a new commit is made to one of their input Tables. This allows data to continue moving through a workflow as upstream Functions complete.

A commit does not necessarily mean that the data itself changed. When a Publisher writes multiple Tables, it creates a new commit for each Table on every successful execution, even if the rows in a Table are identical to its previous version.

Each commit can trigger Functions that use that Table as an input.

See [Working with Triggers](https://docs.tabsdata.com/developer/guide/triggers) to control which input Tables trigger a Function.

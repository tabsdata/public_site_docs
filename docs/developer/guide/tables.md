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

-   `HEAD` selects the latest version. A version committed with `None` reads as the last version that had data.
-   `HEAD^` selects the version immediately before `HEAD`.
-   `HEAD~N` selects a version relative to `HEAD`.
-   `INITIAL` selects the first version.
-   A specific version ID selects that version.
-   Comma-separated version IDs select multiple versions.
-   `a..b` selects a range of versions.
-   `NEW` selects every version committed since the Function's previous run, oldest first, as a list. On the Function's first run, it selects every version the Table has. It includes versions committed with `None`, which read as the previous data. It is an empty list when no version was committed. See [Registering Functions in a pipeline](https://docs.tabsdata.com/developer/guide/functions/#registering-functions-in-a-pipeline).

| Table reference | Table state | Function input |
| --- | --- | --- |
| `persons` | `[v1, v2, v3, v4]` | `v4` |
| `persons@HEAD` | `[v1, v2, v3, None]` | `v3` |
| `persons@HEAD^` | `[v1, v2, v3, v4]` | `v3` |
| `persons@HEAD~2` | `[v1, v2, v3, v4]` | `v2` |
| `persons@INITIAL` | `[v1, v2, v3, v4]` | `v1` |
| `persons@HEAD~3,HEAD~1` | `[v1, v2, v3, v4]` | `[v1, v3]` |
| `persons@HEAD~2..HEAD` | `[v1, v2, v3, v4]` | `[v2, v3, v4]` |
| `persons@NEW` | `[v1, v2 ǀ v3, v4]` | `[v3, v4]` |
| `persons@NEW` | `[v1, v2 ǀ None, v4]` | `[v2, v4]` |
| `persons@NEW` | `[ǀ v1, v2]` | `[v1, v2]` |
| `persons@NEW` | `[v1, v2 ǀ]` | `[]` |

If no version is specified, the Function reads from `HEAD`.

`HEAD` is resolved when the execution plan starts. A Table the same plan writes, but not upstream of the Function's triggers, resolves to its version from before the plan; `HEAD^`, `HEAD~N` and ranges shift back the same way. See [Table Commit Triggers](https://docs.tabsdata.com/developer/guide/triggers/table-commit#table-commit-triggers-and-dependency-configuration).

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

Such a commit still triggers the Functions that read the Table, and a Function reading it at `@NEW` receives it. A commit from returning `None` holds the previous data. A commit from an empty frame has no rows. See [`None` as output](https://docs.tabsdata.com/developer/guide/functions/#none-as-output).

Each commit can trigger Functions that use that Table as an input.

See [Trigger Overview](https://docs.tabsdata.com/developer/guide/execution-and-triggers#trigger_by) to control which input Tables trigger a Function.

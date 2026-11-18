# Functions

> How Tabsdata Functions define, connect, and execute the steps in a data workflow.

Source: https://docs.tabsdata.com/guide/functions/

A Tabsdata **Function** is Tabsdata's operational unit of work and defines a single step that reads data from or writes data to a Tabsdata Table.

Tabsdata Functions build on the familiar model of a regular Python function, where data comes in through a parameter, the function performs work on that parameter, and the result is returned through the return statement.

Tabsdata extends this model to data integration by abstracting data sources and destinations into the simple parameters and return statement of a Python function.

Users define their inputs, which can be a SQL query against a database, a file in object storage, or a Tabsdata Table. They then define where they want the output data to be written, whether that is a database table, a file in object storage, or another Tabsdata Table.

Tabsdata handles retrieving, converting, and moving the data between those systems. While the data is being passed through the Function, Tabsdata materializes it as a DataFrame object that users can transform through an expression-based API.

This allows users to work with tabular data independently of where it is physically stored or how it needs to be moved between systems.

## Function types

There are three types of Tabsdata functions:

1.  **publishers:** read data from external systems and _publish_ data into Tabsdata Tables
2.  **transformers:** read data from Tabsdata Tables and write data into Tabsdata Tables
3.  **subscribers:** read data from Tabsdata Tables and _subscribe_ data into Tabsdata Tables

Publishers

External SystemTabsdata Table

Reads an external system and writes Tabsdata Tables.

Transformers

Tabsdata TableTabsdata Table

Reads Tabsdata Tables and writes new Tabsdata Tables.

Subscribers

Tabsdata TableExternal System

Reads Tabsdata Tables and writes an external system.

## Inputs and outputs

The decorator maps declared inputs to the Python callable's parameters. It also maps returned values to output Tables or to destination slots in an external system. The number and order of parameters and returned values must match the corresponding declarations.

Publishers and Subscribers use a Connector for the system-specific read or write operation. The Collection's [Connection](https://docs.tabsdata.com/guide/connections) supplies the configuration and credentials used by that Connector. Transformers work entirely with Tabsdata Tables and do not use an external Connection.

Output Tables belong to the Collection where the Function is registered. Input Table references can identify Tables in other Collections within the same Project, allowing Functions to connect into a larger workflow.

## `None` inputs and outputs

A parameter or a returned value is `None` when there is no data at that position. `None` is not the same as a `TableFrame` with zero rows: an empty `TableFrame` is data and replaces the previous data, while `None` keeps it. `None` never invalidates data already in Tabsdata.

A `None` parameter has a different meaning for each Function type:

| Function | A parameter is `None` when |
| --- | --- |
| Publisher | The external system has no new data for that source slot. A slot that takes a list of frames receives `None`, not an empty list. The Publisher still runs, and can return data anyway. |
| Transformer, Subscriber | The requested input version does not exist, the input Table has never been produced, or the Table had no data up to that version. The value alone does not tell these cases apart. |

A version range, such as `orders@HEAD~3..HEAD`, reaches a Transformer or Subscriber as a list with one element per version, oldest first. A `None` element is a version that does not exist or that has no data yet. A range of a fixed size, such as `HEAD~3..HEAD`, always has that many elements, and its `None` elements are always at the oldest end, because once a Table has data every later version has data too. A range from `INITIAL`, such as `INITIAL..HEAD`, has one element per existing version and can be empty.

### Returning `None`

Every successful run commits a new version of each of its output tables. What you return for a table decides what that version holds:

-   A `TableFrame` is new data. The version holds it, and it replaces the table's previous data. This is true even for a frame with zero rows: the table is now empty.
-   `None` means "no changes for this table". The version is still committed, but it holds no data of its own. Reading it gives the data of the last version that did change the table.

A version committed with `None` is a version like any other. It triggers the functions that depend on the table, and a function reading the table at `@NEW` receives it, with the unchanged data, as one of the new versions.

A Subscriber has destination slots instead of output Tables. Returning `None` for a slot sends no new data to it. The Connector still runs and decides what `None` does to the external system; each Connector page describes it under **Write behavior**. A Subscriber also runs for a version committed with `None`: return `None` to leave the external system as it is, or the frame to write the data again.

When a Table version has no data, the UI and `tdk` say so, and say whether the version does not exist or has no data, instead of showing an empty table. `tdk` writes that message to stderr and exits with a non-zero code.

## Triggers

A [Trigger](https://docs.tabsdata.com/guide/execution-and-triggers) determines when a Function starts. A Transformer or Subscriber without `trigger_by` runs whenever one of its input Tables commits a new version. A Publisher has no input Tables, so without `trigger_by` it runs only when triggered manually. Set `trigger_by` to a schedule, or to one or more Table references, to control what starts the Function.

## Registration

Registration sends the Function definition, source code, and required bundle metadata to the Server. A Function name must be unique within its Collection.

Register a decorated callable from a Python file with:

```bash
tdk fn register --coll <collection_name> --path <path_to_python_file>::<function_name>
```

Pass `--update` when the same command should update an existing Function with that name. Registration records the definition; it does not execute the Function.

See [Register a Function](https://docs.tabsdata.com/tutorials/managing-functions/register) for the full procedure.

## Execution

A manual Trigger can start any registered Function:

```bash
tdk fn trigger --coll <collection_name> --name <function_name>
```

The Server evaluates the Function's dependencies and creates an Execution Plan. Each Function included in that plan gets a Function Run, and a [Worker](https://docs.tabsdata.com/guide/execution/workers) executes each attempt. A successful run that produces Tables creates new [Table Versions](https://docs.tabsdata.com/guide/tables); the Server keeps the registered Function definition after the Worker exits.

Function code does not run in the CLI process that sends the command. The CLI requests the Trigger, while the Server coordinates and records the execution.

# Functions

> How Tabsdata Functions define, connect, and execute the steps in a data workflow.

Source: https://docs.tabsdata.com/developer/guide/functions/

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

Publishers and Subscribers use a Connector for the system-specific read or write operation. The Collection's [Connection](https://docs.tabsdata.com/developer/guide/connections) supplies the configuration and credentials used by that Connector. Transformers work entirely with Tabsdata Tables and do not use an external Connection.

Output Tables belong to the Collection where the Function is registered. Input Table references can identify Tables in other Collections within the same Project, allowing Functions to connect into a larger workflow.

### Table Version References

Tabsdata maintains a version history for each Table, allowing Functions to read the latest version, a previous version, or multiple versions at once.

Functions reference Table versions using the following format:

`[collection/]table[@version]`

The Collection name is optional. If omitted, Tabsdata looks for the Table in the Function's own Collection. If no version is specified, Tabsdata uses `@HEAD`, which refers to the latest version.

For example, `orders`, `orders@HEAD`, and `sales/orders@HEAD` all reference the latest version of the `orders` Table, assuming `orders` is in the `sales` Collection.

**Supported version references**

| Reference | Description |
| --- | --- |
| `orders@HEAD` | The latest Table version. |
| `orders@HEAD^` | The version immediately before `HEAD`. |
| `orders@HEAD~3` | The version three versions before `HEAD`. |
| `orders@INITIAL` | The first Table version. |
| `orders@NEW` | All versions committed since the Function's previous run. |
| `orders@HEAD~3..HEAD` | The four most recent versions, including `HEAD`. |
| `orders@INITIAL..HEAD` | All existing versions, from the first to the latest. |
| `orders@HEAD,HEAD~2` | A list containing the latest version and the version two versions before it. |

Functions can also reference a specific version using its version ID.

**Referencing multiple versions**

Version ranges use `..` to specify a starting and ending version. Ranges are endpoint inclusive and are returned as a list of `TableFrame` objects ordered from oldest to newest.

For example, `orders@HEAD~3..HEAD` returns the four latest versions of the `orders` Table.

For ranges with a defined size, if a requested version does not exist or has no data, Tabsdata returns `None` at that position in the list.

Ranges without a defined size, such as those starting with `INITIAL`, generally omit `None` values and only include existing versions containing data. An exception occurs when a Table has only a single commit containing `None`, in which case the returned list contains `[None]`. If no versions exist, an empty list (`[]`) is returned.

The special reference `@NEW` returns all versions committed since the Function's previous run, and every version of the Table on the Function's first run. If no new versions have been committed, Tabsdata returns an empty list (`[]`).

| Table reference | Table state | Function input |
| --- | --- | --- |
| `orders@HEAD~3..HEAD` | `[v1, v2, v3, v4]` | `[v1, v2, v3, v4]` |
| `orders@HEAD~3..HEAD` | `[v1, v2]` | `[None, None, v1, v2]` |
| `orders@HEAD~3..HEAD` | `[None, v2, v3, v4]` | `[None, v2, v3, v4]` |
| `orders@INITIAL..HEAD` | `[None, v2, v3]` | `[v2, v3]` |
| `orders@INITIAL..HEAD` | `[None]` | `[None]` |
| `orders@INITIAL..HEAD` | `[]` | `[]` |
| `orders@NEW` | `[v1, v2, v3, v4 ǀ v5, v6]` | `[v5, v6]` |
| `orders@NEW` | `[ǀ v1, v2, v3]` | `[v1, v2, v3]` |
| `orders@NEW` | `[v1, v2, v3 ǀ]` | `[]` |

`ǀ` marks the Function's previous run. `None` marks a version with no data.

## `None` as input

Tabsdata Functions generally accept a `TableFrameSpec`, or a `TableFramesSpec` for a list of frames, as input. A `TableFrameSpec` represents tabular data, similar to a Polars `LazyFrame`. Functions can also receive `None`, depending on the Function type and whether data is available.

### `None` vs. an empty `TableFrame`

Tabsdata will attempt to provide an empty `TableFrame` when possible and will only default to `None` when no reference data is available.

This is because a `TableFrame` requires a defined schema. If no previous run has produced data, Tabsdata will not know the expected columns and must pass `None` instead.

The distinction is important:

-   **`None`** indicates that no data is available and does not invalidate existing Table data.
-   **An empty `TableFrame`** contains zero rows but has a defined schema. It is treated as data and can replace existing Table data.

Empty TableFrame objects are preferable to None because they support operations like joins and concatenations without requiring additional handling. None values, on the other hand, require additional logic to handle missing data.

### Publishers

Publishers receive `None` when a source has never produced data for a particular input slot. For example, a file source pointing to a path where no files have appeared yet.

There are a few exceptions:

-   **Sources expecting a list of `TableFrame` objects** receive an empty list (`[]`) instead of `None`.
-   **SQL queries and Salesforce sObjects** define their own schemas. Because Tabsdata already knows the expected columns, their slots receive an empty `TableFrame` even if no previous run has produced data.

For file-based Publishers, the behavior also depends on the `incremental` setting:

-   **`incremental=True`:** If no new files are found, Tabsdata uses the schema from the most recent run that produced data to provide an empty `TableFrame`. If no previous run has produced data, `None` is passed instead.
-   **`incremental=False`:** If no new files are found, Tabsdata passes an empty list (`[]`), regardless of whether previous runs have produced data.

### Transformers and Subscribers

Transformers and Subscribers can receive `None` in three situations:

1.  The input Table has never been produced because its Publisher has not run.
2.  The requested Table version does not exist. For example, requesting `HEAD~1` when the Table only has one version.
3.  The Publisher has run, but has only committed `None` to the input Table.

In each case, `None` indicates that data is not available for the requested Table version.

### Special cases: `@NEW` and version ranges

**`@NEW`**

Transformers and Subscribers can use `@NEW` to request all Table versions committed since the Function's previous run. On the Function's first run, `@NEW` is every version the Table has; see [Registering Functions in a pipeline](#registering-functions-in-a-pipeline).

If no new versions have been committed, Tabsdata passes an empty list (`[]`) instead of `None`.

**Handling empty `@NEW` inputs**

A Transformer can execute even when no new versions are available for one of its `@NEW` inputs. This can happen when another input triggers the Function, when a scheduled trigger runs, or when the Function is executed manually.

In these cases, the `@NEW` input receives an empty list (`[]`). If the Transformer needs an empty `TableFrame` instead, it can read the same Table using `@HEAD` and call `clear()`. This creates an empty `TableFrame` with the Table's existing schema, allowing the Transformer to perform operations that require a defined schema.

| Table reference | Table state | Function input |
| --- | --- | --- |
| `orders@NEW` | `[v1, v2, v3, v4 ǀ v5, v6]` | `[v5, v6]` |
| `orders@NEW` | `[ǀ v1, v2, v3]` | `[v1, v2, v3]` |
| `orders@NEW` | `[v1, v2, v3 ǀ]` | `[]` |

`ǀ` marks the Function's previous run.

**Table version ranges**

Transformers and Subscribers can also request multiple versions of a Table using a version range.

For example, `orders@HEAD~3..HEAD` requests the four most recent versions of the `orders` Table, from oldest to newest.

Tabsdata returns these versions as a list of `TableFrame` objects. If a requested version does not exist or has no data, `None` is returned at that position in the list.

For example:

```python
[None, frame_v2, frame_v3, frame_v4]
```

Here, the oldest requested version is unavailable, while the other three versions contain data.

Unlike a fixed range, a range beginning with `INITIAL`, such as `orders@INITIAL..HEAD`, includes only existing versions. If no versions exist, the result can be an empty list.

### Registering Functions in a pipeline

Functions are registered individually using `tdk fn register`. Because a Function can only reference input Tables produced by already registered Functions, pipelines must be registered in order, starting with Publishers, followed by Transformers, and finally Subscribers.

Functions can begin executing as soon as their triggers are activated, meaning a Publisher might commit new Table versions before the rest of the pipeline has been registered.

However, these versions are not lost. Functions reading from `@NEW` receive all Table versions committed since their previous execution. For Functions that have never run, this includes every existing Table version, ordered from oldest to newest. Keep in mind that registering a Function does not automatically trigger its first execution. For Table-triggered Functions, another commit to one of their trigger Tables is required.

This is generally not an issue for Publishers using a `CronTrigger`, since they only execute on their configured schedule. Stream Publishers, however, begin consuming data immediately after registration.

To prevent a stream Publisher from processing data before the rest of the pipeline is registered, you can register it in a disabled state and enable it once the downstream Functions are in place:

```shell
tdk fn register --coll sales --path stream_orders.py::stream_orders --disabled
tdk fn register --coll sales --path clean_orders.py::clean_orders
tdk fn register --coll sales --path export_orders.py::export_orders
tdk stream enable --coll sales --name stream_orders
```

## `None` as output

Every successful Function run commits a new version of each output Table. The value returned by the Function determines what data is stored in that version.

-   **`TableFrame`:** The returned data is committed as a new version of the table.
-   **`None`:** The Table's data remains unchanged. A new version is committed to the table. However, it doesn't contain any data of its own. Instead, it references the table's most recent version that contained data.

### How `None` affects downstream Functions

A Table version committed with `None` behaves like any other version. It triggers downstream Functions that depend on the Table and is included when a Function requests new versions using `@NEW`.

Because `None` preserves the previous data, downstream Functions reading at `@NEW` receive that data again.

For example, consider a Table that stores individual batches of data and a downstream Transformer that processes each batch using `@NEW`. If the upstream Function returns `None`, the Transformer receives the previous batch again, potentially processing the same data twice.

For this reason, **Functions should return an empty `TableFrame` when there is no new batch to process**, rather than `None`.

Returning `None` is appropriate when the Table's existing data should remain unchanged. For example:

-   A Function produces a new snapshot, but the data fails validation. Returning `None` preserves the last valid snapshot.
-   A Table accumulates data across runs, but the latest run has nothing new to add.

### Subscribers

Unlike Publishers and Transformers, Subscribers return data to destination slots rather than output Tables.

Returning `None` for a destination slot indicates that no new data is being sent. However, the Connector still executes and determines how `None` affects the external system. Refer to the **Write behavior** section of each Connector's documentation for details.

Subscribers also execute when an upstream Table commits a version containing `None`. Depending on the intended behavior, a Subscriber can:

-   Return `None` to leave the destination unchanged, subject to the Connector's write behavior.
-   Return a `TableFrame` to write the existing data to the destination again.

### Viewing Table versions without data

When a Table version does not contain data, the Tabsdata UI and `tdk` display a message instead of an empty Table. The message distinguishes between a version that does not exist and a version that exists but contains no data of its own.

When using `tdk`, this message is written to stderr, and the command exits with a non-zero exit code.

## Triggers

A [Trigger](https://docs.tabsdata.com/developer/guide/execution-and-triggers) determines when a Function starts. A Transformer or Subscriber without `trigger_by` runs whenever one of its input Tables commits a new version. A Publisher has no input Tables, so without `trigger_by` it runs only when triggered manually. Set `trigger_by` to a schedule, or to one or more Table references, to control what starts the Function.

## Registration

Registration sends the Function definition, source code, and required bundle metadata to the Server. A Function name must be unique within its Collection.

Register a decorated callable from a Python file with:

```bash
tdk fn register --coll <collection_name> --path <path_to_python_file>::<function_name>
```

Pass `--update` when the same command should update an existing Function with that name. Registration records the definition; it does not execute the Function.

See [Register a Function](https://docs.tabsdata.com/developer/tutorials/managing-functions/register) for the full procedure.

## Execution

A manual Trigger can start any registered Function:

```bash
tdk fn trigger --coll <collection_name> --name <function_name>
```

The Server evaluates the Function's dependencies and creates an Execution Plan. Each Function included in that plan gets a Function Run, and a [Worker](https://docs.tabsdata.com/developer/guide/execution/workers) executes each attempt. A successful run that produces Tables creates new [Table Versions](https://docs.tabsdata.com/developer/guide/tables); the Server keeps the registered Function definition after the Worker exits.

Function code does not run in the CLI process that sends the command. The CLI requests the Trigger, while the Server coordinates and records the execution.

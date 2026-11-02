# Automatic Orchestration

> How Tabsdata determines which functions to run and in what order based on the tables they read and write.

Source: https://docs.tabsdata.com/guide/automatic-orchestration

In Tabsdata, **Automatic Orchestration** handles the order in which Functions run based on the Tables they read and write. Instead of requiring users to manually define a DAG, Tabsdata uses the declared dependencies between Tables and Functions to determine what needs to run. When a Function is triggered, Tabsdata automatically identifies any downstream Functions that depend on its output and executes them in the appropriate order.

_Video: A publisher is triggered from the CLI, Tabsdata builds an execution plan by following the tables each function declares, and each table that gets new data starts the function that reads it, until the plan commits new versions of customers and customers_clean._

## Traditional Orchestration

Traditionally, orchestrating a data pipeline involves manually defining a Directed Acyclic Graph (DAG) that specifies how each step depends on the others and the order in which they should execute.

As a pipeline grows or changes, the DAG has to be updated to account for any new or modified dependencies. This also means that adding a new step to a pipeline requires updating its orchestration logic, even if the step's inputs and outputs are already known.

## How Tabsdata Orchestrates Functions

In Tabsdata, Functions do not pass data directly to one another. Instead, Functions write their output to Tabsdata Tables, which can then be read by other Functions.

Each Function declares the Tables it reads from and writes to as part of its decorator:

-   **Publishers** declare the Tables they write to using `output_tables`.
-   **Transformers** declare the Tables they read from using `input_tables` and the Tables they write to using `output_tables`.
-   **Subscribers** declare the Tables they read from using `input_tables`.

Because these dependencies are declared ahead of time, Tabsdata already knows which Functions depend on each other. When a Function writes a new version of a Table, Tabsdata can identify every downstream Function that reads from it.

For example, registering a new Transformer that reads from the `customers` Table automatically adds it to the workflow. The next time `customers` receives a new version, Tabsdata knows to execute the Transformer without requiring any changes to an existing DAG.

## Tables as Triggers

In Tabsdata, new Table versions are what trigger downstream Functions to run.

By default, Transformers and Subscribers run whenever one of their input Tables receives a new version, unless a different trigger is specified using `trigger_by`.

Publishers do not have input Tables, so they can be triggered manually, through a cron schedule, or by a Table specified in `trigger_by`. Stream Publishers are triggered whenever a new batch of data is ready from their stream source.

See [Execution and Triggers](https://docs.tabsdata.com/guide/execution-and-triggers) for more information about the available trigger types.

## Execution Plans

Whenever a Function is triggered, Tabsdata uses the declared Table dependencies to build an [Execution Plan](https://docs.tabsdata.com/guide/execution/execution-plans) containing all the downstream Functions that need to run.

The Execution Plan determines the order in which Functions execute, including Functions across different Collections, so that each Function runs after the Tables it depends on have been updated.

As the plan executes, each Function reads the data written by the upstream Functions in that same execution. However, Tabsdata does not commit any of the new Table versions until every Function in the Execution Plan has completed successfully.

If any Function fails, none of the new Table versions are committed. This prevents partially completed workflows from leaving Tables in inconsistent states.

Tabsdata also records which Table versions each Function read and wrote during the execution, allowing users to trace how data was produced and how it moved through the workflow. See [Lineage](https://docs.tabsdata.com/guide/lineage) for more information.

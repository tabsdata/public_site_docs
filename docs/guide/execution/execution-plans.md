# Execution Plans

> Explains the execution plan DAG Tabsdata builds when a Function is triggered, how Functions pass data through Tables, determinism, and the tdk plan, trx, fnrun, and worker commands.

Source: https://docs.tabsdata.com/guide/execution/execution-plans

An **execution plan** is the Directed Acyclic Graph that Tabsdata automatically builds and executes whenever a function is triggered.

Tabsdata Functions are self describing, allowing Tabsdata to infer a Function's dependencies and automatically fire it when needed.

## How Tabsdata Automates Orchestration

In other systems, DAG nodes need to be manually wired together, with explicit declaration of what data one node passes to the other.

In Tabsdata, Functions never directly pass data to other Functions. Instead, Functions write tabular data into Tables and other Functions use those tables as input. When a Table gets new data, all functions that use it as input get triggered.

tip

Your Functions are also your data flow. Click on a Publisher, Transformer, or Subscriber to see the Execution Plan that is created if that Function is triggered.

Click any node to trace its dependencies

## Determinism

Execution plans are idempotent and deterministic. When an execution plan is generated, it contains a full snapshot of metadata and configurations used for the plan; such as start and stop timestamps, function code used for the plan, source data ingested, Table data generated, and data written out of Tabsdata

## Execution Plan Architecture

An Execution Plan is a DAG of all Functions Tabsdata intends to execute. A plan contains transactions, function runs, and workers. Click into each resource to learn more about what they do.

A function is triggered

creates

[Execution plan](https://docs.tabsdata.com/guide/execution/execution-plans)One per function triggered

[Transactions](https://docs.tabsdata.com/guide/execution/transactions)One per collection in the execution plan

[Function runs](https://docs.tabsdata.com/guide/execution/function-runs)One per function in the transaction

[Workers](https://docs.tabsdata.com/guide/execution/workers)One per attempted code execution (max 3)

## Inspecting a plan

Four commands cover the four levels: `tdk plan`, `tdk trx`, `tdk fnrun`, and `tdk worker`. See the [CLI Guide](https://docs.tabsdata.com/cli/tdk/#execution) for what each one accepts.

[Execution & Triggers](https://docs.tabsdata.com/guide/execution-and-triggers) covers what fires a plan in the first place, along with the pristine-state guarantee it carries.

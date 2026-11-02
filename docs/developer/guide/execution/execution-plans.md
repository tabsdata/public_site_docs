# Execution Plans

Source: https://docs.tabsdata.com/developer/guide/execution/execution-plans

An **execution plan** is the Directed Acyclic Graph that Tabsdata automatically builds whenever a function is triggered. Rather than running only the function you triggered, Tabsdata follows the data dependencies to work out every other function that has to run as a result, and puts them in the order those dependencies require. A single plan can cross several collections.

## The graph

A plan is a **directed acyclic graph**. Each node is a function, and each edge is a table that one function writes and another reads. So when you trigger a publisher, Tabsdata runs that publisher first, then runs every transformer that reads the tables it produced, and keeps working downstream until it reaches the subscribers.

## Where the dependencies come from

Tabsdata works the edges out from the tables each function already declares. A publisher writes to its output tables, a transformer reads tables and writes others, and a subscriber reads tables and writes outside the server. Wherever one function's output table is another function's input table, the second function depends on the first, and that is the edge Tabsdata walks when it builds the plan.

The event that sets this in motion is a **table commit**. A transformer or subscriber is triggered by a commit to any of its input tables unless `trigger_by` narrows it to a specific set, and because every function commits to its own output tables when it finishes, those commits trigger whatever reads them in turn. That cascade is how a single trigger becomes a plan covering many functions. See [Triggers](https://docs.tabsdata.com/developer/guide/triggers) for how to configure which tables count.

One consequence worth knowing: a commit does not necessarily mean the data changed. A publisher that writes three tables commits to all three every time it runs, whether or not any of them ended up different, and dependents fire on the commit rather than on a diff.

## Determinism

Execution plans are 100% deterministic. Before anything runs, Tabsdata fixes and records both the graph itself and the exact table versions each function will read and write, so the same starting point always produces the same plan over the same data.

## What a plan is made of

A plan nests three levels below itself, and each level is where a different question gets answered: a transaction is what commits, a function run is one function executing, and a worker is the process doing the work.

A function is triggered

creates

[Execution plan](https://docs.tabsdata.com/developer/guide/execution/execution-plans)One per function triggered

[Transactions](https://docs.tabsdata.com/developer/guide/execution/transactions)One per collection in the execution plan

[Function runs](https://docs.tabsdata.com/developer/guide/execution/function-runs)One per function in the transaction

[Workers](https://docs.tabsdata.com/developer/guide/execution/workers)One per attempted code execution (max 3)

## Inspecting a plan

Four commands cover the four levels: `tdk plan`, `tdk trx`, `tdk fnrun`, and `tdk worker`. See the [CLI Guide](https://docs.tabsdata.com/cli/tdk/#execution) for what each one accepts.

[Execution & Triggers](https://docs.tabsdata.com/developer/guide/execution-and-triggers) covers what fires a plan in the first place, along with the pristine-state guarantee it carries.

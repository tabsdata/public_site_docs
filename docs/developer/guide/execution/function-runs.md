# Function Runs

Source: https://docs.tabsdata.com/developer/guide/execution/function-runs

A **Function Run** represents a single execution of a Function in Tabsdata.

Whenever a Function is executed as part of an [Execution Plan](https://docs.tabsdata.com/developer/guide/execution/execution-plans), Tabsdata creates a Function Run to track that individual execution. If an Execution Plan contains multiple Functions, each Function gets its own Function Run.

Function Runs allow Tabsdata to track the execution of each Function independently, including its status, logs, inputs, outputs, and the Worker responsible for executing it.

## Function Runs in an Execution Plan

An Execution Plan describes the set of Functions that need to run and the order in which they need to run. Function Runs represent the individual executions that take place within that plan.

For example, an Execution Plan containing a Publisher, Transformer, and Subscriber would create a separate Function Run for each Function:

```text
Execution Plan
├── Publisher Function Run
├── Transformer Function Run
└── Subscriber Function Run
```

This makes it possible to see the status of each individual Function rather than only whether the Execution Plan as a whole succeeded or failed.

## Function Runs and Workers

Function Runs are executed by [Workers](https://docs.tabsdata.com/developer/guide/execution/workers).

When a Function is ready to run, Tabsdata assigns its Function Run to a Worker. The Worker performs the actual processing required by the Function and reports the status of the Function Run back to Tabsdata.

This separation allows multiple Function Runs to be processed independently and, when possible, in parallel. Runs of the same function run one at a time, in trigger order (best effort). In case of failures, function runs can be assigned to new workers and retried.

## Function Runs and Transactions

The data produced by a Function Run is written as part of a [Transaction](https://docs.tabsdata.com/developer/guide/execution/transactions).

A successful Function Run can produce changes to one or more Tables, but those changes do not become available simply because the Function Run finished. They become available when the Transaction containing those changes is committed.

This allows Tabsdata to keep the execution of an individual Function separate from the process of publishing its output.

## Function Run Status

Each Function Run has its own status throughout its execution.

This makes Function Runs useful for understanding where an Execution Plan is currently running or where a failure occurred. If one Function fails in a plan containing several Functions, you can identify the specific Function Run that failed and inspect its logs without treating the Execution Plan as a single unit.

## Recovery and Replay

Because each Function execution is tracked as its own Function Run, Tabsdata can operate on individual runs after they have been created.

A failed Function Run can be **recovered**, allowing Tabsdata to retry that execution without starting the entire workflow again.

A completed Function Run can also be **replayed**, allowing the Function to execute again using the same inputs. Functions can be replayed even if the source data the function relies on has changed.

## Inspecting Function Runs

Function Runs can be inspected through the TDK to view their status, logs, and other execution information.

For example, you can view the logs produced by a specific Function Run:

```bash
tdk fnrun logs --fnrun FNRUN
```

Or retrieve information about the Function Run itself:

```bash
tdk fnrun get --fnrun FNRUN
```

See the [CLI Guide](https://docs.tabsdata.com/cli/tdk/#execution) for the complete set of commands for inspecting, recovering, and replaying Function Runs.

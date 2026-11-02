# Execution & Triggers

Source: https://docs.tabsdata.com/developer/guide/execution-and-triggers

## Triggers

A **trigger** configures _when_ a function runs. There are four ways a function can be fired:

Manually

When you run it

Run it yourself with `tdk fn trigger`. This is the default for publishers, which have no input tables to fire them.

On a schedule

At set times

A cron schedule fires the function at set times, whether or not anything upstream has changed.

On new data

When an input Table receives new data

The function fires whenever an upstream table it depends on gets a new version. Watch every table it reads, or narrow it to a specific set.

On a stream batch

When a batch of streamed data is due

A stream publisher takes no `trigger_by` at all. It fires each time a stream worker, such as SQL CDC or Kafka, hands over a batch.

See [Working with Triggers](https://docs.tabsdata.com/developer/guide/triggers) for how to configure each mode in code.

## Automatic orchestration

No matter which trigger fires a function, Tabsdata doesn't run just that one function. It follows the data dependencies and builds an [execution plan](https://docs.tabsdata.com/developer/guide/execution/execution-plans): the graph of every function that must run as a result, in the correct order, across collections. There is no orchestration for you to wire up.

## Pristine state

Every table in an execution plan stays in sync, because new data is only committed if every function in the plan succeeds. A partial failure commits nothing.

# Execution & Triggers

> Covers the four Tabsdata function trigger types (manual via `tdk fn trigger` or the UI, CRON schedule, new-data on input table versions, and stream workers such as SQL CDC and Kafka), plus automatic execution plans and streaming publishers.

Source: https://docs.tabsdata.com/guide/execution-and-triggers

## Triggers

A **trigger** decides _when_ a Function runs. There are four kinds of triggers:

Manually

When you run it

When a function is executed through the `tdk fn trigger` CLI Command or through the `trigger` button in the Tabsdata UI

On a schedule

At set times

When a function is executed on a CRON schedule

On new data

When an input Table receives new data

Execute the Function whenever an input Table receives a new Version.

On a stream batch

When a batch of streamed data is due

Execute the Function each time a stream worker, such as SQL CDC or Kafka, hands over a batch

## Automatic orchestration

No matter which trigger fires a function, Tabsdata doesn't run just that one function. It follows the data dependencies and builds an [execution plan](https://docs.tabsdata.com/guide/execution/execution-plans): the graph of every function that must run as a result, in the correct order, across collections. There is no orchestration for you to wire up.

## Pristine state

Every table in an execution plan stays in sync, because new data is only committed if every function in the plan succeeds. A partial failure commits nothing.

## Streaming publishers

A normal publisher pulls a batch of data each time it runs. A **streaming publisher** stays running continuously, creating new table versions as data arrives: for change-data-capture feeds, log tails, and message queues like [Kafka](https://docs.tabsdata.com/tutorials/publishers/kafka).

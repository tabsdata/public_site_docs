# Transactions

Source: https://docs.tabsdata.com/developer/guide/execution/transactions

Tabsdata publishes the output of an [execution plan](https://docs.tabsdata.com/developer/guide/execution/execution-plans) only once every function in that plan has succeeded. This guarantee is called **pristine state**, and it is why a failed run leaves your tables reading exactly as they did before it started. [Execution & Triggers](https://docs.tabsdata.com/developer/guide/execution-and-triggers) describes the guarantee in full.

A **transaction** is the unit Tabsdata uses to enforce it, and Tabsdata draws the boundary at the collection.

## The collection is the commit boundary

A collection holds the connections, functions, and tables for one step of a workflow. Tabsdata creates one transaction for every collection an execution plan touches, and commits all the tables it changed in that collection at the same moment. Anyone querying the collection therefore sees either the whole of the plan's output or none of it.

## Multi-transactional across collections

An execution plan can span several collections, and Tabsdata commits each one under its own transaction, so a single plan normally has more than one. This is what makes a plan **multi-transactional**, and it means the commit boundaries follow the collection boundaries your workflow already has.

## Inspecting transactions

`tdk trx` works the same way as `tdk plan`, except that you identify a transaction with `--trx` instead of `--plan`:

```bash
$ tdk trx list [--status R] [--coll C] [--fn F]
$ tdk trx get --trx TRX
```

See the [CLI Guide](https://docs.tabsdata.com/cli/tdk/#execution) for the full set of commands and the status codes each accepts.

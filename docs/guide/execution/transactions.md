# Transactions

> Explains how transactions group Table changes within a Collection so they commit together, preserve pristine state on failure, and make execution plans multi-transactional across Collections.

Source: https://docs.tabsdata.com/guide/execution/transactions

A **transaction** groups together changes made to Tables within a Collection during an [execution plan](https://docs.tabsdata.com/guide/execution/execution-plans). These changes are committed together, meaning they become available at the same time.

Transactions help Tabsdata maintain **pristine state**. If an execution plan fails before a transaction is committed, its output is not published and the affected Tables remain in their previous state. This prevents incomplete or partially processed data from becoming available to users or downstream Functions.

See [Execution & Triggers](https://docs.tabsdata.com/guide/execution-and-triggers) for more information about pristine state.

## Collection Transactions

In Tabsdata, a Collection acts as a transaction boundary.

When an execution plan processes Functions within a Collection, changes made to that Collection's Tables are grouped into a transaction. Once the transaction is successfully committed, all of those changes become available together.

This ensures that users and other Functions do not read a Collection while only some of its Tables have been updated.

## Transactions Across Collections

A single execution plan can process Functions across multiple Collections. Because each Collection has its own transaction, an execution plan may contain multiple transactions.

For example, if an execution plan processes Functions across three Collections, each Collection handles and commits its Table changes through its own transaction.

This is why execution plans in Tabsdata are **multi-transactional**.

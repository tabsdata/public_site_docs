# Collections

> How Collections contain Functions, Tables, and Connections and define transaction boundaries.

Source: https://docs.tabsdata.com/developer/guide/collections

A **Collection** is an organizational layer inside of a group that stores tables and functions. Collections help manage credentials for functions and define transaction boundaries for tables.

### Collections for Credential Storage

A Function is responsible for moving, and sometimes transforming, data from one place to another. Publishers and Subscribers that read from or write data to external systems also need a way to securely access sensitive credentials for those systems.

Instead of hardcoding credentials directly into Function logic, Tabsdata abstracts credential management into a separate resource called a **Connection**. A Connection is defined in a `.yaml` file and bound to a **Collection**. Any Function registered to the same Collection can access those credentials at runtime.

This allows users to store their credentials once and then securely provision those credentials to as many functions that need them. [Learn more about connections here](https://docs.tabsdata.com/developer/guide/connections).

### Collections as Transaction Boundaries

Triggering a Tabsdata Function creates an Execution Plan that executes the triggering Function along with any functions downstream dependent to it. Because an Execution Plan can span multiple Functions, Tabsdata needs to determine which data should be committed or rolled back if the Execution Plan fails partway through.

Collections act as transaction boundaries within an Execution Plan. Tabsdata treats each participating Collection as a separate transaction and commits data to its Tables only when all participating Functions within that Collection complete successfully. If a Function within the transaction fails, Tabsdata rolls back all changes made to Tables within that transaction.

## Managing Collections

After creating a Collection, users can register Functions into that collection. If a collection is created inside the **sources** or **destinations** group, it can only store publisher or subscriber functions respectively and requires a **connection** to be bound

Deleting a Collection removes the Collection and the resources it contains without affecting other Collections in the Project.

See [Create a Collection](https://docs.tabsdata.com/developer/tutorials/managing-collections/create), [Update a Collection](https://docs.tabsdata.com/developer/tutorials/managing-collections/update), and [Delete a Collection](https://docs.tabsdata.com/developer/tutorials/managing-collections/delete) for step-by-step instructions.

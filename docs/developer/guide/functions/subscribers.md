# Subscribers

> How @subscriber reads Tabsdata tables, maps function returns to destination slots, and writes to an external system.

Source: https://docs.tabsdata.com/developer/guide/functions/subscribers

A subscriber reads Tabsdata tables and writes to an external system. The function can filter, rename, or otherwise prepare the data before it is written.

A subscriber belongs to a destination collection. That collection's connection provides the address and credentials for the destination.

## In Action

Tabsdata server

collection · warehouse

Table

vendors

//sales

Committed

Table

items

//sales

Committed

Connection

conn-mysql-dest.yaml

Subscriber

write\_sales

Database

MySQL

MySQL · external

Not yet synced

## Parameters

```python
subscriber(
    destination,
    input_tables,
    trigger_by=None,
)
```

| Parameter | Type |  |
| --- | --- | --- |
| `destination` | `Dest` | required |
| `input_tables` | `list[str]` | required |
| `trigger_by` | `CronTrigger \| TablesTrigger \| AllTablesTrigger` | optional |

#### `destination`

The destination to write to. The destination class decides where the data is written and how many slots the function must return.

The destination uses the connection of the collection where the subscriber is registered. The page for each connector lists its destination classes and settings.

#### `input_tables`

A non-empty list of table references in the form `[collection/]table[@versions]`. Omit the collection for a table in the subscriber's collection. Use `@versions` to select a version, a version range, a comma-separated list, or `NEW`.

Each entry maps to one function parameter, in list order.

#### `trigger_by`

The trigger that starts the subscriber automatically: a `CronTrigger`, `TablesTrigger`, or `AllTablesTrigger`. Without `trigger_by`, a commit to any input table triggers the subscriber. A subscriber can also be run manually.

The trigger decides when the function runs. The version selector in `input_tables` decides which data it sends. See [Execution & Triggers](https://docs.tabsdata.com/developer/guide/execution-and-triggers).

## Subscriber Code Anatomy

sales-sub.py

```
1from tabsdatak.api import subscriber, TableFrameSpec2import tabsdatak.api.tableframe as tdf3from tabsdatak.conn.mysql import MySQLDest4 5 1@subscriber(2    destination=MySQLDest(8        tables=["vendors", "items"],9        if_table_exists="replace",10    ),3    input_tables=["sales/vendors", "sales/items"],12)45def write_sales(vendors: TableFrameSpec, items: TableFrameSpec):6    vendors = vendors.filter(tdf.col("active") == 1)7    return (vendors, items)
```

-   Defines the input Tables and destination for the Subscriber.
    
    -   Writes data to the external system. The Collection's Connection provides the address and credentials.
        
    -   Tabsdata Tables to read. This Subscriber reads `vendors` and `items` from the `sales` Collection.
        
-   Receives the input data and returns the data to write to MySQL.
    
    -   The `vendors` and `items` arguments receive the data from `input_tables` in the order listed.
        
    -   Filters the vendors to include only active vendors.
        
    -   The returned data is written to the destination Tables in the order listed in `tables`. Returning `None` for a Table skips the write.
        

## The function

A subscriber function has one parameter per input table and returns one frame per destination slot.

-   **Parameters.** Inputs are passed to the function in `input_tables` order. Each parameter is a `TableFrameSpec`. An input can be `None` when the requested upstream batch is absent.
-   **Context.** The function can have a final `ctx: TrxCtx` parameter to keep values between successful runs.
-   **Return value.** Return values map to the destination slots in destination order. One slot can be returned on its own; several slots are returned as a tuple. Returning `None` for a slot skips that write.
-   **Slot counts.** The number of input tables does not have to match the number of destination slots. The function can combine several inputs into one write or create several destination tables from one input.

Tabsdata checks the slot counts and function signature when the subscriber is registered.

## Connections and collections

All subscribers in a destination collection use the same connection. Each subscriber has its own input tables, destination settings, and code.

Input tables can come from the subscriber's collection or another collection. Updating the collection's connection changes how every subscriber in that collection reaches the external system.

## Lifecycle

-   **Register.** `tdk fn register` uploads the subscriber. Its collection and connection must already exist.
-   **Run.** A manual, scheduled, or table trigger starts a transaction and resolves the requested input versions.
-   **Write.** The function's returned frames are handed to the destination. The transaction succeeds only after the destination write succeeds.
-   **Update.** `tdk fn update` replaces the code and decorator settings.
-   **Delete.** Deleting the function stops future writes. It does not remove data already written to the external system.

For step-by-step guides on building a subscriber for a specific external system, see [Subscribers](https://docs.tabsdata.com/developer/tutorials/subscribers/) under How-to Guides.

For inserts, updates, and deletes into Snowflake, BigQuery, or Databricks, see [Merging into SQL destinations](https://docs.tabsdata.com/developer/guide/functions/sql-merge).

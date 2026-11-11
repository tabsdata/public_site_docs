# Publishers

> How @publisher reads an external system, maps source slots to function parameters, and writes versioned Tabsdata tables.

Source: https://docs.tabsdata.com/guide/functions/publishers

A publisher reads data from an external system and publishes it to Tabsdata tables. Each run reads the source, calls the function, and commits the returned tables together.

Unlike a stream publisher, a regular publisher does not keep reading. It reads the source only when it runs. The publisher must be registered in a source collection whose connection matches the source.

## In Action

Tabsdata server

collection · world

Database

PostgreSQL

PostgreSQL · external

Reachable

Connection

conn-postgres.yaml

Publisher

read\_world

Table

country

//world

No versions yet

Table

city

//world

No versions yet

## Parameters

```python
publisher(
    source,
    output_tables,
    trigger_by=None,
    on_tables=None,
)
```

| Parameter | Type |  |
| --- | --- | --- |
| `source` | `Src` | required |
| `output_tables` | `list[str]` | required |
| `trigger_by` | `CronTrigger \| TablesTrigger` | optional |
| `on_tables` | `list[OnTablesAction]` | optional |

#### `source`

The source to read. The source class decides what is read and how many slots are passed to the function. A SQL source has one slot per query. A file source can read several files into one slot.

The source does not contain the server address or credentials. Those come from the connection of the collection where the publisher is registered. The page for each connector lists its source classes and settings.

#### `output_tables`

A non-empty list of local table names, one for each value the function returns. A name must start with a letter, use only letters, numbers, and underscores, and be no longer than 64 characters.

The source slot count and output table count do not have to match. A publisher can combine several source slots into one table or derive several tables from one slot.

#### `trigger_by`

The trigger that starts the publisher automatically: a `CronTrigger` or `TablesTrigger`. Without `trigger_by`, the publisher runs only when triggered manually. See [Execution & Triggers](https://docs.tabsdata.com/guide/execution-and-triggers).

#### `on_tables`

Actions to run on the output tables after the publisher succeeds, such as [data quality](https://docs.tabsdata.com/guide/data-quality) checks.

## Publisher Code Anatomy

read\_world.py

```
1from tabsdatak.api import publisher, TableFrameSpec2from tabsdatak.conn.postgres import PostgresSrc3 4 1@publisher(2    source=PostgresSrc(3        queries=[8            "SELECT * FROM country",9            "SELECT * FROM city",10        ],11    ),4    output_tables=["country", "city"],13)56def read_world(country: TableFrameSpec, city: TableFrameSpec) -> tuple[TableFrameSpec, TableFrameSpec]:7    return (country, city)
```

-   Defines the source and output Tables for the Publisher.
    
    -   Reads data from the external system. The Collection's Connection provides the address and credentials.
        
    -   SQL queries that read the country and city data from Postgres.
        
    -   Tabsdata Tables where the returned data is written.
        
-   Receives the query results and returns the data to write to the output Tables.
    
    -   The `country` and `city` arguments receive the query results in the order listed in `queries`.
        
    -   The returned data is written to the Tables listed in `output_tables`, in that order. Returning `None` for a Table leaves its current version unchanged.
        

## The function

A publisher function has one parameter per source slot and returns one frame per output table.

-   **Parameters.** Source slots are passed to the function in source order. Annotate a parameter as `TableFrameSpec` for one frame or `TableFramesSpec` for a list of frames. A slot is `None` when the external system has no new data for it; see [`None` inputs and outputs](https://docs.tabsdata.com/guide/functions/#none-inputs-and-outputs).
-   **Context.** The function can have a final `ctx: TransactionCtx` parameter. Use `ctx` to keep values between successful runs. For example, an incremental SQL publisher can save its last processed ID with `ctx.set_attr()` and use it in the next query. Type it `FunctionCtx` to also read the run's identifiers and the project's secrets.
-   **Return value.** Return values map to `output_tables` in order. One output can be returned on its own; several outputs are returned as a tuple. Returning `None` for one output commits a new version that keeps that table's previous data.
-   **Slot counts.** The number of source slots does not have to match the number of output tables. The function can combine several inputs into one table or create several tables from one input.

Tabsdata checks the slot counts and function signature when the publisher is registered.

## Connections and collections

All publishers in a source collection use the same connection. Each publisher has its own source settings, code, and output tables.

The connection is created with the collection. Updating a connection changes how every publisher in that collection reaches the external system.

## Lifecycle

-   **Register.** `tdk fn register` uploads the publisher. Its collection and connection must already exist.
-   **Run.** A manual, cron, or table trigger starts a transaction. The source is read before the function runs.
-   **Commit.** A successful run commits the output tables together. Each commit adds a table version.
-   **Update.** `tdk fn update` replaces the code and decorator settings.
-   **Delete.** Deleting the function stops future runs but does not delete its output tables or their versions.

For step-by-step guides on building a publisher for a specific external system, see [Publishers](https://docs.tabsdata.com/tutorials/publishers/) under How-to Guides.

# Transformers

> How @transformer reads Tabsdata tables, maps versions to function parameters, and commits transformed output tables.

Source: https://docs.tabsdata.com/developer/guide/functions/transformers

A transformer reads Tabsdata tables, transforms their data, and writes the result back to Tabsdata. It does not read or write an external system, so it does not use a connection.

## In Action

collection · world

collection · insights · data product

Table

country

//world

Committed

Table

city

//world

Committed

Transformer

find\_big\_cities

Table

big\_cities

//insights

No versions yet

## Parameters

```python
transformer(
    input_tables,
    output_tables,
    trigger_by=None,
    on_tables=None,
)
```

| Parameter | Type |  |
| --- | --- | --- |
| `input_tables` | `list[str]` | required |
| `output_tables` | `list[str]` | required |
| `trigger_by` | `CronTrigger \| TablesTrigger \| AllTablesTrigger` | optional |
| `on_tables` | `list[OnTablesAction]` | optional |

#### `input_tables`

A non-empty list of table references in the form `[collection/]table[@versions]`. Omit the collection for a table in the transformer's collection. Use `@versions` to select a version, a version range, a comma-separated list, or `NEW`.

Each entry maps to one function parameter. A single-version reference receives a `TableFrameSpec`; a reference that selects several versions receives a `TableFramesSpec`.

#### `output_tables`

A non-empty list of local table names, one for each value returned by the function. The output tables belong to the transformer's collection. Each name must start with a letter, contain only letters, numbers, and underscores, and be no longer than 64 characters.

#### `trigger_by`

The trigger that starts the transformer automatically: a `CronTrigger`, `TablesTrigger`, or `AllTablesTrigger`. Without `trigger_by`, a commit to any input table triggers the transformer. A transformer can also be run manually.

The trigger decides when the function runs. The version selector in `input_tables` decides which versions it reads. See [Execution & Triggers](https://docs.tabsdata.com/developer/guide/execution-and-triggers).

#### `on_tables`

Actions to run on the output tables after the transformer succeeds, such as [data quality](https://docs.tabsdata.com/developer/guide/data-quality) checks.

## Transformer Code Anatomy

find\_big\_cities.py

```
1from tabsdatak.api import transformer, TableFrameSpec2import tabsdatak.api.tableframe as tdf3 4 1@transformer(2    input_tables=["world/country", "world/city"],3    output_tables=["big_cities"],8)45def find_big_cities(country: TableFrameSpec, city: TableFrameSpec) -> tuple[TableFrameSpec]:6    countries = country.rename({"name": "country_name"}).drop(11        ["population", "continent"]12    )13    joined = city.join(countries, left_on="country_code", right_on="code")7    return (joined.filter(tdf.col("population") > 3_000_000),)
```

-   Defines the input and output Tables for the Transformer.
    
    -   Tabsdata Tables to read. Use `collection/table` to reference a Table in another Collection.
        
    -   Tables where the transformed data is written. These belong to the Transformer's Collection.
        
-   Reads the country and city data, joins it, and returns cities with a population above three million.
    
    -   The arguments receive the data from `input_tables` in the order listed. An argument is `None` if the requested Table version does not exist.
        
    -   Renames the country name column, removes unused columns, and joins the country and city data.
        
    -   The returned data is written to the Tables listed in `output_tables`, in that order. Returning `None` for a Table leaves its current version unchanged.
        

## The function

A transformer function has one parameter per input table and returns one frame per output table.

-   **Parameters.** Inputs are passed to the function in `input_tables` order. Annotate a parameter as `TableFrameSpec` for one frame or `TableFramesSpec` for a list of frames. An input can be `None` when the requested upstream batch is absent.
-   **Context.** The function can have a final `ctx: TrxCtx` parameter to keep values between successful runs.
-   **Return value.** Return values map to `output_tables` in order. One output can be returned on its own; several outputs are returned as a tuple. Returning `None` for one output leaves that table's current version unchanged.

Tabsdata checks the input count, output count, and function signature when the transformer is registered.

## Collections and table versions

A transformer can read tables from its own collection or another collection. Its output tables are always local to the collection where the transformer is registered.

Table references are resolved when a run starts. When a trigger starts a larger execution plan, Tabsdata passes the versions produced for that transaction through the plan so downstream transformers read a consistent set of data.

## Lifecycle

-   **Register.** `tdk fn register` uploads the transformer to its collection. No connection is required.
-   **Run.** A manual, scheduled, or table trigger starts a transaction and resolves the requested input versions.
-   **Commit.** A successful run commits the output tables together. Each commit adds a table version.
-   **Update.** `tdk fn update` replaces the code and decorator settings.
-   **Delete.** Deleting the function stops future runs but does not delete its output tables or their versions.

For step-by-step guidance on building a transformer, see [Transformers](https://docs.tabsdata.com/developer/guide/transformers) under How-to Guides.

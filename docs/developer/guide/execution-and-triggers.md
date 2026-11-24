# Execution & Triggers

Source: https://docs.tabsdata.com/developer/guide/execution-and-triggers

## Triggers

A **trigger** configures _when_ a function runs. There are four ways a function can be fired:

Manually

When you run it

Run it yourself with `tdk fn trigger`. This is the default for publishers, which have no input tables to fire them.

On new data

When an input Table receives new data

The function fires whenever an upstream table it depends on gets a new version. Watch every table it reads, or narrow it to a specific set.

On a schedule

At set times

A cron schedule fires the function at set times, whether or not anything upstream has changed.

On a stream batch

When a batch of streamed data is due

A stream publisher takes no `trigger_by` at all. It fires each time a stream worker, such as SQL CDC or Kafka, hands over a batch.

## Manual Triggers

Manual triggers are initiated by a CLI command.

For example, you can trigger a publisher to read sales data from a database table and publish it to the Tabsdata server.

You can manually trigger any enabled Tabsdata function, even those with a specified automated trigger.

### Using CLI

To trigger a function, use the following command in a command line interface:

```bash
$ tdk fn trigger --coll <collection_name> --name <function_name>
```

Where:

-   `<collection_name>` is the name of the collection in the Tabsdata server that the function is registered with.
-   `<function_name>` is the name of the function to be executed. This name is defined when the function is registered.

## Automated Triggers

Automated triggers are initiated by a new commit to one of the tables associated with the function. For example, you might define an inventory subscriber function that exports data from a Tabsdata inventory table to AWS S3 every time the inventory table receives a commit.

Note that a commit does not always include changes in the table data. For example, a publisher that writes to three tables performs a commit to all three tables with each execution, irrespective of whether there is a change in data for any of the tables.

Since the functions are automatically triggered which in turn create a new commit to other tables, Tabsdata enables a cascading workflow of updates to downstream tables.

### trigger\_by

Triggers in Tabsdata functions are defined using the `trigger_by` property.

Below are the different ways in which `trigger_by` can be configured:

#### Not Defining

If the `trigger_by` property is not defined, the behavior depends on the default behaviour of the function:

**Publishers:** By default, publishers do not have any triggers. If `trigger_by` is not defined, the publisher can only be triggered manually.

**Transformers:** By default, transformers are triggered by a commit to any of their input tables. Hence, if `trigger_by` is not defined, the transformer will automatically respond to new commits to any of its input tables. To specify different trigger tables, define the `trigger_by` tables using a non-empty array.

**Subscribers:** By default, subscribers are triggered by a commit to any of their input tables. Hence, if `trigger_by` is not defined, the subscriber will automatically respond to new commits to any of its input tables. To specify different trigger tables, define the `trigger_by` tables using a non-empty array.

#### Defining an Empty Array

```python
trigger_by = TablesTrigger(tables=[])
```

Setting `trigger_by` to a `TablesTrigger` with an empty array disables automatic triggering. This is useful for transformers and subscribers when you want to prevent them from being triggered by their input tables.

#### Defining a Non-Empty Array

```python
trigger_by = TablesTrigger(tables=["<table_name>", "<collection_name>/<table_name>"])
```

Setting `trigger_by` to a `TablesTrigger` with a non-empty array explicitly defines which tables can trigger the function. If you want the functions to be triggered by a subset of their input tables or by external tables, list them in the array. To reference tables outside the function’s collection, use the format `<collection_name>/<table_name>`.

Only those tables listed in the `TablesTrigger` array will trigger the function. List as many as needed.

Inputs not listed don't order the run: when the same plan writes one of them, and its writer is not upstream of a listed table, the Function reads its version from before the plan. List every input it must read fresh.

## Cron Triggers

With Cron triggers, Publishers, Subscribers, and Transformers can be configured to run periodically within Tabsdata without the need for manual triggers or external schedulers.

Similar to automated triggers, you work with the `trigger_by` parameter. However, unlike automated triggers, the `trigger_by` parameter must be configured with a `CronTrigger` object.

The `CronTrigger` object requires a Unix crontab `mask`.

note

Tabsdata uses the **UTC timezone** to interpret all crontab schedules.

### Configuration Parameters

#### The mask Parameter

The `mask` parameter defines the frequency of the execution. It follows the standard Unix crontab specification consisting of **5 elements** with minute precision.

-   **Syntax:** `Minute Hour Day Month Day-of-Week`
-   **Extensions:** `@yearly`, `@annually`, `@monthly`, `@weekly`, `@daily`, `@midnight`, `@hourly` and `@every <duration>` are also supported.

##### Examples

| Mask | Description |
| --- | --- |
| 0,30 \* \* \* \* | Runs every 30 minutes (at the top of the hour and at minute 30). |
| 0 0 \* \* \* | Runs daily at the beginning of the day (00:00 UTC). |
| 0 22 \* \* FRI | Runs at 10:00 PM (22:00 UTC) every Friday. |

##### References

-   [Open Group Base Specification: Crontab](https://pubs.opengroup.org/onlinepubs/9799919799/utilities/crontab.html)
-   [Wikipedia: Cron](https://en.wikipedia.org/wiki/Cron)

### Trigger Scheduling Lifecycle

The execution of Cron triggers is dependent on the enabled status of the function.

1.  **Registration:** When registering or updating a function, it can be set as **enabled** (default) or **disabled** via the `tdk` command line interface.
    
    ```bash
    tdk fn register --coll <collection_name> --path <file>.py::<function_name> --disabled
    tdk fn update --coll <collection_name> --name <function_name> --path <file>.py::<function_name> --disabled
    ```
    
2.  **Runtime Control:** An existing function can be toggled between enabled and disabled states with `tdk fn enable` / `tdk fn disable`.
    
    ```bash
    tdk fn enable --coll <collection_name> --name <function_name>
    tdk fn disable --coll <collection_name> --name <function_name>
    ```
    
    -   **Enabled:** Tabsdata will trigger the function according to the defined crontab mask.
    -   **Disabled:** Tabsdata will ignore the crontab mask and the function will not trigger automatically.

### Example

The following is an example of a Publisher configured to trigger at the beginning of every hour.

```python
from tabsdatak.api import CronTrigger, publisher, TableFrameSpec
from tabsdatak.conn.mysql import MySQLSrc


@publisher(
    trigger_by=CronTrigger("0 * * * *"),
    source=MySQLSrc(
        queries=["SELECT * FROM my_table"],
    ),
    output_tables=["my_table"],
)
def my_publisher(my_table: TableFrameSpec) -> TableFrameSpec:
    return my_table
```

The connection details (host, credentials) live on the collection's connection file, not in the function. See [MySQL](https://docs.tabsdata.com/developer/tutorials/publishers/mysql) for the full setup.

## Enabled and disabled Functions

A Function is registered enabled unless `tdk fn register` is given `--disabled`, and `tdk fn enable` / `tdk fn disable` switch it later (`tdk stream` and `tdk cron` have the same commands for their Functions). A disabled Function is not run by any trigger:

-   a commit to one of its trigger Tables does not plan it, and Functions downstream of it do not run through it;
-   its cron schedule is ignored;
-   a stream publisher's worker is stopped, and does not consume;
-   `tdk fn trigger` refuses it.

Enabling a Function does not run it; its next run comes from its next trigger. `tdk fn update` enables a disabled Function unless `--disabled` is given again.

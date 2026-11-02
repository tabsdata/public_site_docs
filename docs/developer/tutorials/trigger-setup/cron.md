# Schedule a Cron Trigger

Source: https://docs.tabsdata.com/developer/tutorials/trigger-setup/cron

Before you begin

[Create a Project](https://docs.tabsdata.com/developer/tutorials/managing-projects/create)

A `CronTrigger` runs a function at fixed times whether or not any upstream data changed. It is the right trigger for a publisher, which has nothing inside Tabsdata to signal that its external system has new rows.

Tabsdata reads every crontab schedule in **UTC**.

Step 1Add a CronTrigger to the function

read\_orders.py

```python
from tabsdatak.api import CronTrigger, TableFrameSpec, publisher
from tabsdatak.conn.mysql import MySQLSrc


@publisher(
    source=MySQLSrc(
        queries=["SELECT * FROM orders"],
    ),
    output_tables=["orders"],
    trigger_by=CronTrigger("0 * * * *"),
)
def read_orders(orders: TableFrameSpec) -> TableFrameSpec:
    return orders
```

`"0 * * * *"` fires at the top of every hour. The mask is standard 5-field crontab syntax, `Minute Hour Day Month Day-of-Week`, with minute precision. Extensions like `@hourly` and `@daily` are not supported.

| Mask | When it runs |
| --- | --- |
| `0,30 * * * *` | Every 30 minutes, on the hour and at minute 30 |
| `0 0 * * *` | Daily at 00:00 UTC |
| `0 22 * * FRI` | Fridays at 22:00 UTC |

Step 2Register the function

```bash
tdk fn register \
  --coll sales \
  --path read_orders.py::read_orders
```

The schedule starts from the moment registration succeeds. Re-register with `--update` after any change to the mask.

Step 3Confirm the schedule took

```bash
tdk fn get --coll sales --name read_orders
```

## Bounding the schedule to a window

`start` and `end` limit when the mask applies. Both take a timezone-aware Python `datetime` or an ISO 8601 string in UTC:

```python
trigger_by=CronTrigger(
    "0 * * * *",
    start="2026-01-01T00:00:00Z",
    end="2026-04-01T00:00:00Z",
)
```

Omit them and the mask applies indefinitely from registration.

## Pausing a schedule

A cron schedule only fires while its function is enabled, so pausing one is a matter of disabling the function rather than editing the mask:

```bash
tdk fn disable --coll sales --name read_orders
tdk fn enable  --coll sales --name read_orders
```

A disabled function keeps its registration and its mask, and Tabsdata ignores the mask until it is enabled again. Register a function `--disabled` to add it without starting its schedule.

## What to do next

A cron trigger fires on a clock regardless of upstream state. To run a function because data actually arrived, see [Trigger a Function from a Table Commit](https://docs.tabsdata.com/developer/tutorials/trigger-setup/table-commit).

See [Cron Triggers](https://docs.tabsdata.com/developer/guide/triggers/cron) for how the trigger behaves.

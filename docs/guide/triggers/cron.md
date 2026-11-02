# Cron Triggers

> Cron triggers in Tabsdata: crontab mask syntax with UTC schedules, optional start and end window, and enabling or disabling Functions with tdk fn enable and disable. Wait, that's over-long and has a colon-style fragment. Corrected: Cron Triggers: five-field Unix crontab masks run in UTC, optional start and end windows, and enabling or disabling Functions with tdk fn enable/disable.

Source: https://docs.tabsdata.com/guide/triggers/cron

A scheduled trigger runs a Function at fixed times, whether or not any upstream data has changed. Publishers, Transformers, and Subscribers can all use one.

_Video: A cron schedule triggering a Function run_

Configure it by passing a `CronTrigger` to `trigger_by`.

```python
from tabsdatak.api import CronTrigger, publisher, TableFrameSpec
from tabsdatak.conn.mysql import MySQLSrc


@publisher(
    trigger_by=CronTrigger("0 * * * *"),
    source=MySQLSrc(queries=["SELECT * FROM sales"]),
    output_tables=["sales"],
)
def read_sales(sales: TableFrameSpec) -> TableFrameSpec:
    return sales
```

## The mask

The first argument is a standard Unix crontab mask with five fields and minute precision:

```text
Minute Hour Day Month Day-of-Week
```

| Mask | Runs |
| --- | --- |
| `0,30 * * * *` | every 30 minutes, on the hour and at minute 30 |
| `0 0 * * *` | daily at 00:00 |
| `0 22 * * FRI` | Fridays at 22:00 |

Non-standard shorthands such as `@hourly` and `@daily` are **not** supported.

note

All crontab schedules are interpreted in **UTC**.

## Limiting the window

`CronTrigger` also takes optional `start` and `end` parameters, each either a timezone-aware Python `datetime` or an ISO 8601 string in UTC (`2026-01-01T12:00:00Z`).

With them set, the mask only fires between those two times. With them omitted, it fires indefinitely from the moment the Function is registered.

## Enabled and disabled Functions

A cron schedule only runs while its Function is enabled. Registration defaults to enabled, and `tdk fn register` takes `--enabled` / `--disabled` explicitly. An already-registered Function is toggled with `tdk fn enable` and `tdk fn disable`.

A disabled Function ignores its mask entirely. It does not queue missed runs and fire them on re-enable.

## Where credentials come from

The example above names a MySQL query but carries no host and no password. Those live on the Collection's Connection. See [Connections](https://docs.tabsdata.com/guide/connections).

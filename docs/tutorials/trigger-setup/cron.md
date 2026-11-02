# Schedule a Cron Trigger

> Schedules a Tabsdata publisher to run at fixed times with a CronTrigger crontab mask read in UTC, for sources with no upstream change signal.

Source: https://docs.tabsdata.com/tutorials/trigger-setup/cron

Before you begin

[Quickstart a Server](https://docs.tabsdata.com/server-admin/quickstart) or [Start a Server](https://docs.tabsdata.com/server-admin/start)

[Connect to MCP](https://docs.tabsdata.com/guide/connect-agent)

A scheduled trigger runs a function at fixed times whether or not any upstream data changed. It is the right trigger for a publisher, which has nothing inside Tabsdata to signal that its external system has new rows.

Tabsdata reads every crontab schedule in **UTC**.

AI agent session

❯make read\_orders in the sales collection run at the top of every hour

⏺

Needs a schedule on the publisher. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — a `CronTrigger` with the mask `0 * * * *`, which fires at minute 0 of every hour. Tabsdata reads the mask in UTC.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The publisher, registered in sales:

```python
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

Called tabsdata 2 times (ctrl+o to expand)

⏺

Execution committed, 0 failures.

⏺

sales/orders is live — the schedule starts now and fires at the next hour boundary:

```
┌──────────┬─────────────────┐
│  field   │      value      │
├──────────┼─────────────────┤
│ function │ read_orders     │
├──────────┼─────────────────┤
│ mask     │ 0 * * * *       │
├──────────┼─────────────────┤
│ timezone │ UTC             │
├──────────┼─────────────────┤
│ enabled  │ true            │
├──────────┼─────────────────┤
│ next run │ top of the hour │
└──────────┴─────────────────┘
```

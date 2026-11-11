# Manually Trigger a Function

> Describes running a Tabsdata function on demand via a manual trigger, including testing scheduled functions and the default for publishers with no trigger configured.

Source: https://docs.tabsdata.com/tutorials/trigger-setup/manual

Before you begin

[Quickstart a Server](https://docs.tabsdata.com/server-admin/quickstart) or [Start a Server](https://docs.tabsdata.com/server-admin/start)

[Configure Your AI Agent](https://docs.tabsdata.com/guide/connect-agent)

A manual trigger runs a function on demand. Any function can be triggered this way, including one that already carries a schedule, which makes it the way to test a function before trusting it to a cron mask.

A publisher with no trigger configured runs only when triggered manually. That is the default for publishers, since nothing inside Tabsdata can signal that an external system has new data.

AI agent session

❯run the read\_orders publisher in the sales collection

Called tabsdata 2 times (ctrl+o to expand)

⏺

Triggering **read\_orders**. The plan covers three functions, since `summarize` reads `orders` and `write_report` reads `orders_by_region`.

Called tabsdata 4 times (ctrl+o to expand)

⏺

Execution committed, 0 failures.

⏺

All three ran in dependency order:

```
┌──────────────┬─────────────┬───────────┐
│   function   │    kind     │  outcome  │
├──────────────┼─────────────┼───────────┤
│ read_orders  │ publisher   │ committed │
├──────────────┼─────────────┼───────────┤
│ summarize    │ transformer │ committed │
├──────────────┼─────────────┼───────────┤
│ write_report │ subscriber  │ committed │
└──────────────┴─────────────┴───────────┘
```

⏺

Nothing commits unless every function in the plan succeeds, so a failure in `summarize` would have left `orders` at the version it held beforehand.

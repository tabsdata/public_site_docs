# Manually Trigger a Function

Source: https://docs.tabsdata.com/developer/tutorials/trigger-setup/manual

Before you begin

[Create a Project](https://docs.tabsdata.com/developer/tutorials/managing-projects/create)

`tdk fn trigger` runs a registered function on demand. Any function can be triggered this way, including one that already carries a `trigger_by` schedule, so a manual trigger is how you test a function before trusting it to a cron mask.

A publisher with no `trigger_by` runs only when triggered manually. That is the default for publishers, since nothing upstream inside Tabsdata can signal that an external system has new data.

Step 1Trigger the function

```bash
tdk fn trigger \
  --coll sales \
  --name read_orders
```

The command waits for the plan to finish and reports each function as it completes. Pass `--detach` to return immediately instead.

Step 2Check what the run produced

```bash
tdk table list --coll sales
tdk table data --coll sales --name orders
```

## Triggering runs more than one function

A trigger does not run one function in isolation. Tabsdata builds an execution plan covering every function downstream of the one you named, and runs them in dependency order: a transformer reading the publisher's output runs next, then a subscriber reading that transformer's output. Nothing commits unless every function in the plan succeeds.

Name the plan to make it easier to find afterward:

```bash
tdk fn trigger \
  --coll sales \
  --name read_orders \
  --plan-name nightly-backfill
```

## Watching the run

```bash
tdk fnrun list --coll sales --fn read_orders
```

The listing carries each run's id, which is what the log and recovery commands take:

```bash
tdk fnrun logs --fnrun <run_id>
tdk fnrun recover --fnrun <run_id>
```

`recover` resumes the plan a failed run belongs to rather than starting a new one.

## What to do next

Automate it. [Schedule a Cron Trigger](https://docs.tabsdata.com/developer/tutorials/trigger-setup/cron) runs the function on a clock, and [Trigger a Function from a Table Commit](https://docs.tabsdata.com/developer/tutorials/trigger-setup/table-commit) runs it when an upstream table gets new data.

See [Manual Triggers](https://docs.tabsdata.com/developer/guide/triggers/manual) for how the trigger behaves, and [`tdk fn trigger`](https://docs.tabsdata.com/cli/tdk/fn/trigger) for the full option list.

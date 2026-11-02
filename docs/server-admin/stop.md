# Stop a Server

> Explains how to stop a running Tabsdata server with `tdkserver stop` while keeping its registration, configuration, tables and functions, plus checking runs with `tdk fnrun list` and restarting after config changes.

Source: https://docs.tabsdata.com/server-admin/stop

Before you begin

[Install Tabsdata](https://docs.tabsdata.com/server-admin/install)

[Initialize a Server](https://docs.tabsdata.com/server-admin/initialize)

[Create a Server](https://docs.tabsdata.com/server-admin/create)

[Start a Server](https://docs.tabsdata.com/server-admin/start)

`tdkserver stop` shuts down a running instance's services and leaves everything else in place. The instance stays registered, its configuration is untouched, and the tables and function code it holds survive, so a later [start](https://docs.tabsdata.com/server-admin/start) picks up where the stop left off.

Step 1Stop the instance

```bash
tdkserver stop --instance myinstance
```

The command prints the values it resolved and waits for confirmation. Pass `--yes` to skip the prompt.

Step 2Confirm it stopped

```bash
tdkserver status --instance myinstance
```

## Running functions

Stopping the server stops its workers with it, so a function run in flight does not finish. Nothing partial is committed: a run only commits when every function in its execution plan succeeds, so an interrupted run leaves the tables at the version they held beforehand. Check for active work before stopping:

```bash
tdk fnrun list --status running
```

## Picking up a configuration change

A configuration edit reaches a running instance through a restart rather than a stop:

```bash
tdkserver restart --instance myinstance
```

## What to do next

[Start a Server](https://docs.tabsdata.com/server-admin/start) to bring the same instance back up, or [Delete a Server](https://docs.tabsdata.com/server-admin/delete) to discard it.

See [`tdkserver stop`](https://docs.tabsdata.com/cli/tdkserver/stop) for the full option list.

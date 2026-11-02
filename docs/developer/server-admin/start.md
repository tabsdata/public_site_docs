# Start a Server

Source: https://docs.tabsdata.com/developer/server-admin/start

Before you begin

[Create a Server](https://docs.tabsdata.com/developer/server-admin/create)

`tdkserver start` brings up the services of an instance that [`tdkserver create`](https://docs.tabsdata.com/developer/server-admin/create) already built. Until the instance is running, `tdk` has nothing to connect to.

Step 1Start the instance

```bash
tdkserver start --instance myinstance
```

The command prints the values it resolved and waits for confirmation. Pass `--yes` to skip the prompt, and `--verbose` to watch each step as it runs rather than a progress line.

Step 2Confirm the server is up

```bash
tdkserver status --instance myinstance
```

Step 3Log in

```bash
tdk login --server localhost:2457 --user admin
```

Use the base port the instance was created with. `login` prompts for the password rather than taking it as an argument, which keeps it out of your shell history. From here, `tdk project create` and the rest of the CLI reach the running server.

## Log level

`--loglevel` sets how much the kminus orchestrator and pod runner record, from `trace` through `error`:

```bash
tdkserver start --instance myinstance --loglevel debug
```

The value is saved as the instance's log level and reused by later starts, so a plain `tdkserver start` keeps whatever was set last. The flag applies only to the `kminus` provider.

## Restarting

`tdkserver restart` stops and starts in one command, which is what picks up a configuration change on a running instance.

## What to do next

The server is ready for work. [Create a project](https://docs.tabsdata.com/tutorials/managing-projects/create) to hold your groups and collections.

See [`tdkserver start`](https://docs.tabsdata.com/cli/tdkserver/start) for the full option list.

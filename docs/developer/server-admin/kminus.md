# Deploy Tabsdata on k-minus

> Quickstart a local Tabsdata Server or manage its k-minus lifecycle step by step.

Source: https://docs.tabsdata.com/developer/server-admin/kminus

k-minus is Tabsdata's default deployment provider. It runs Kubernetes-style pods as native processes in a Python environment instead of Docker containers.

Use Quickstart to deploy with the default configuration. Use the individual lifecycle commands when you want to edit the configuration before creating and starting the Server.

Before you begin

[Install Tabsdata](https://docs.tabsdata.com/developer/server-admin/install)

## Quickstart a Server

`tdkserver quickstart` bundles [initializing](#initialize-a-server), [creating](#create-a-server), and [starting](#start-a-server) a Tabsdata server into a single command, using a default configuration for compute and storage.

### Start a Tabsdata server

`tdkserver quickstart` runs in the foreground and keeps running. That's normal. Leave it open and use a **new terminal** for the following steps.

```bash
tdkserver quickstart --instance myinstance
```

note

If you plan to use the PostgreSQL connectors, they need a database driver that Tabsdata cannot redistribute. Pass it in a requirements file with `--requirements` when you create the instance. `tdkserver quickstart` and `tdkserver init` both take it. See [Installing Third-Party Database Drivers](https://docs.tabsdata.com/developer/server-admin/third-party-database-drivers):

```bash
tdkserver quickstart --requirements <REQS_FILE>
```

To add it to an instance that already exists, use `tdkserver venv update`. Its `--name` takes a comma-separated list of virtual environments. Leave it out to update all of them:

```bash
tdkserver venv update --instance <TABSDATA_INSTANCE> --name fn,ag --requirements <REQS_FILE>
```

### Check Tabsdata Server Status

View all your Tabsdata Instances

```bash
tdkserver list
```

Output

```
Instances
┌────────────┬────────────────────────────────────┬──────────┬─────────┬─────────┬─────────┬─────────────────┬───────────────┬───────────────────────┐
│ Name       │ Folder                             │ Provider │ Version │ State   │ Status  │ API Server Port │ Database Port │ API Server URL        │
├────────────┼────────────────────────────────────┼──────────┼─────────┼─────────┼─────────┼─────────────────┼───────────────┼───────────────────────┤
│ myinstance │ ~/.tabsdata/instances/myinstance   │ kminus   │ 2.0.2   │ created │ Running │ 2457            │ 2460          │ http://localhost:2457 │
└────────────┴────────────────────────────────────┴──────────┴─────────┴─────────┴─────────┴─────────────────┴───────────────┴───────────────────────┘
```

View the status of the Tabsdata Instance you just deployed.

```bash
tdkserver status --instance myinstance
```

Output

```
Deployments
┌──────────────────────┬─────────┬───────┬─────┐
│ Name                 │ Status  │ Ready │ Age │
├──────────────────────┼─────────┼───────┼─────┤
│ srv-aiagent          │ Running │ 1/1   │ 1m  │
│ srv-aitdk            │ Running │ 1/1   │ 1m  │
│ srv-apiserver        │ Running │ 1/1   │ 1m  │
│ srv-catalog-classify │ Running │ 1/1   │ 1m  │
│ srv-database         │ Running │ 1/1   │ 1m  │
│ srv-embedder         │ Running │ 1/1   │ 1m  │
└──────────────────────┴─────────┴───────┴─────┘

Pods
┌───────────────────────────────────────┬─────────┬───────┬─────┐
│ Name                                  │ Status  │ Ready │ Age │
├───────────────────────────────────────┼─────────┼───────┼─────┤
│ srv-aiagent-6c9697fcc4-2wl6n          │ Running │ 1/1   │ 1m  │
│ srv-aitdk-6b8b6764c-8wlzt             │ Running │ 1/1   │ 1m  │
│ srv-apiserver-597b4799cf-x6btf        │ Running │ 1/1   │ 1m  │
│ srv-catalog-classify-587769cd89-cnr8d │ Running │ 1/1   │ 1m  │
│ srv-database-8448f99777-8tsbj         │ Running │ 1/1   │ 1m  │
│ srv-embedder-5d7b9bcc7c-xg977         │ Running │ 1/1   │ 1m  │
└───────────────────────────────────────┴─────────┴───────┴─────┘

CronJobs
No rows found.

Jobs
┌────────────────┬──────────┬─────────────┬─────┐
│ Name           │ Status   │ Completions │ Age │
├────────────────┼──────────┼─────────────┼─────┤
│ ini-inspector  │ Complete │ 1/1         │ 1m  │
│ ini-venvloader │ Complete │ 1/1         │ 1m  │
└────────────────┴──────────┴─────────────┴─────┘
```

tip

`tdkserver` commands usually require an `--instance` flag that specifies the specific instance you want to interact with. If no `--instance` flag is passed, Tabsdata defaults the instance name to `tabsdata`

### Log in

```bash
tdk login --server localhost --user admin --password tabsdata
```

## Initialize a Server

`tdkserver init` produces an editable config folder for a Tabsdata instance within `~/.tabsdata`, pre-filled with default values.

### Initialize an instance

```bash
tdkserver init --instance myinstance --provider kminus
```

The config folder is written to `~/.tabsdata/instances/myinstance/`.

The default configuration is what is used by `tdkserver quickstart` which bundles initializing, creating, and starting a server

Edit the config files the command produced, if you need to change anything.

## Create a Server

`tdkserver create` builds an instance from the config folder that [`tdkserver init`](#initialize-a-server) produced. Creating an instance does not start it, so the config is still editable up to this point and the server begins serving only once you [start it](#start-a-server).

Step 1Create the instance

```bash
tdkserver create --instance myinstance
```

Omit `--instance` and the name defaults to `tabsdata`.

The command prints a summary of the values it resolved from the config folder and waits for confirmation before it builds anything. Read the summary: it is the last point at which a wrong database or storage value costs nothing to fix. Pass `--yes` to skip the prompt in a script, or `--details false` to drop the summary.

Step 2Check the instance was created

```bash
tdkserver list
```

The instance appears with its name and state. It is not running yet.

### Ports

Every service in the instance takes a port, assigned sequentially from a single base value. `--port` sets that base, defaulting to `2457`:

```bash
tdkserver create --instance myinstance --port 3000
```

Two instances on one machine need base ports far enough apart that their ranges do not overlap.

The instance keeps its configuration across stops and starts, so creating it is a one-time step.

See [`tdkserver create`](https://docs.tabsdata.com/cli/tdkserver/create) for the full option list.

## Start a Server

`tdkserver start` brings up the services of an instance that [`tdkserver create`](#create-a-server) already built. Until the instance is running, `tdk` has nothing to connect to.

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

### Log level

`--loglevel` sets how much the kminus orchestrator and pod runner record, from `trace` through `error`:

```bash
tdkserver start --instance myinstance --loglevel debug
```

The value is saved as the instance's log level and reused by later starts, so a plain `tdkserver start` keeps whatever was set last. The flag applies only to the `kminus` provider.

### Restarting

`tdkserver restart` stops and starts in one command, which is what picks up a configuration change on a running instance.

### What to do next

The server is ready for work. [Create a project](https://docs.tabsdata.com/tutorials/managing-projects/create) to hold your groups and collections.

See [`tdkserver start`](https://docs.tabsdata.com/cli/tdkserver/start) for the full option list.

## Stop a Server

`tdkserver stop` shuts down a running instance's services and leaves everything else in place. The instance stays registered, its configuration is untouched, and the tables and function code it holds survive, so a later [start](#start-a-server) picks up where the stop left off.

Step 1Stop the instance

```bash
tdkserver stop --instance myinstance
```

The command prints the values it resolved and waits for confirmation. Pass `--yes` to skip the prompt.

Step 2Confirm it stopped

```bash
tdkserver status --instance myinstance
```

### Running functions

Stopping the server stops its workers with it, so a function run in flight does not finish. Nothing partial is committed: a run only commits when every function in its execution plan succeeds, so an interrupted run leaves the tables at the version they held beforehand. Check for active work before stopping:

```bash
tdk fnrun list --status running
```

### Picking up a configuration change

A configuration edit reaches a running instance through a restart rather than a stop:

```bash
tdkserver restart --instance myinstance
```

See [`tdkserver stop`](https://docs.tabsdata.com/cli/tdkserver/stop) for the full option list.

## Delete a Server

To permanently remove the instance, follow [Delete a Server](https://docs.tabsdata.com/developer/server-admin/delete).

# Deploy Tabsdata on k-minus

> Quickstart a local Tabsdata Server or manage its k-minus lifecycle step by step.

Source: https://docs.tabsdata.com/server-admin/kminus

k-minus is Tabsdata's default deployment provider. It runs Kubernetes-style pods as native processes in a Python environment instead of Docker containers.

Use Quickstart to deploy with the default configuration. Use the individual lifecycle commands when you want to edit the configuration before creating and starting the Server.

Before you begin

[Install Tabsdata](https://docs.tabsdata.com/server-admin/install)

## Quickstart a Server

`tdkserver quickstart` bundles [initializing](#initialize-a-server), [creating](#create-a-server), and [starting](#start-a-server) a Tabsdata server into a single command, using a default configuration for compute and storage.

### Start the Tabsdata server

`tdkserver quickstart` initializes and deploys a Tabsdata Instance. The command should take around 30 seconds to fully execute.

-   Anthropic
-   OpenAI

```bash
export ANTHROPIC_KEY=<key>
tdkserver quickstart --config anthropic-key=env:ANTHROPIC_KEY
```

```bash
export OPENAI_KEY=<key>
tdkserver quickstart --config openai-key=env:OPENAI_KEY
```

note

If you plan to use the PostgreSQL connectors, they need a database driver that Tabsdata cannot redistribute. Pass it in a requirements file with `--requirements` when you create the instance. `tdkserver quickstart` and `tdkserver init` both take it. See [Installing Third-Party Database Drivers](https://docs.tabsdata.com/server-admin/third-party-database-drivers):

```bash
tdkserver quickstart --requirements <REQS_FILE>
```

To add it to an instance that already exists, use `tdkserver venv update`. Its `--name` takes a comma-separated list of virtual environments. Leave it out to update all of them:

```bash
tdkserver venv update --instance <TABSDATA_INSTANCE> --name fn,ag --requirements <REQS_FILE>
```

### Check Tabsdata server status

View all your Tabsdata Instances

```bash
tdkserver list
```

Output

```
Instances
┌──────────┬──────────────────────────────────────────────────┬──────────┬─────────┬─────────┬─────────┬─────────────────┬───────────────┬───────────────────────┐
│ Name     │ Folder                                           │ Provider │ Version │ State   │ Status  │ API Server Port │ Database Port │ API Server URL        │
├──────────┼──────────────────────────────────────────────────┼──────────┼─────────┼─────────┼─────────┼─────────────────┼───────────────┼───────────────────────┤
│ tabsdata │ ~/.tabsdata/instances/tabsdata                   │ kminus   │ 2.0.2   │ created │ Running │ 2457            │ 2460          │ http://localhost:2457 │
└──────────┴──────────────────────────────────────────────────┴──────────┴─────────┴─────────┴─────────┴─────────────────┴───────────────┴───────────────────────┘
```

View the status of the Tabsdata Instance you just deployed.

```bash
tdkserver status
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

Or access the UI at [http://localhost:2457/login](http://localhost:2457/login)

## Initialize a Server

`tdkserver init` produces an editable config folder for a Tabsdata instance within `~/.tabsdata`, pre-filled with default values.

### Initialize an instance

```bash
tdkserver init --instance myinstance --provider kminus
```

Output

```
About to initialize tabsdata instance:
- instance.....: myinstance
- provider.....: kminus
- log level....: debug (default)
Proceed with the initialization? [y/yes/n/no]: y
▶ Creating tabsdata instance folder                                                                                            
✔ Created tabsdata instance folder at ~/.tabsdata/instances/myinstance (0s)                               
▶ Initializing tabsdata templates                                                                                            
✔ Initialized tabsdata templates in ~/.tabsdata/instances/myinstance/init/input (0s)                      
▶ Writing tabsdata instance settings                                                                                           
✔ Wrote tabsdata instance settings (0s)                                                                                       
Initialized tabsdata instance 'myinstance'.
- state........: initialized
- version......: 2.0.0
- log level....: debug
- provider.....: kminus
- instance name: myinstance
- kubeconfig...: ~/.tabsdata/instances/myinstance/cluster/config/kubeconfig.yaml
- namespace....: default

╭─────────────────────────────────────────────────────────────────────╮
│ Inspect and edit the config in the instance's init folder, then run │
│ 'tdkserver create --instance myinstance' to create the instance.    │
╰─────────────────────────────────────────────────────────────────────╯
```

The config folder is written to `~/.tabsdata/instances/myinstance/`.

The default configuration is what is used by `tdkserver quickstart` which bundles initializing, creating, and starting a server

Edit the config files the command produced, if you need to change anything.

## Create a Server

After [initializing](#initialize-a-server) a server, `tdkserver create` builds an instance from the config folder that [`tdkserver init`](#initialize-a-server) produced.

Step 1Set the LLM API key

`tdkserver create` builds the aiagent pod, so the LLM key has to be in the environment before running it, not before [`tdkserver init`](#initialize-a-server):

-   Anthropic
-   OpenAI

```bash
export ANTHROPIC_KEY="sk-ant-..."
```

```bash
export OPENAI_KEY="sk-..."
```

Step 2Create an instance

```bash
tdkserver create --instance myinstance
```

A server's name is unique and is used internally for identification. The name provided to `--instance` is used to find the config folder created during initialization.

Step 3Check the instance was created

```bash
tdkserver list
```

Output

```
Instances
┌──────────┬──────────────────────────────────────────────────┬──────────┬─────────┬─────────┬─────────┬─────────────────┬───────────────┬───────────────────────┐
│ Name     │ Folder                                           │ Provider │ Version │ State   │ Status  │ API Server Port │ Database Port │ API Server URL        │
├──────────┼──────────────────────────────────────────────────┼──────────┼─────────┼─────────┼─────────┼─────────────────┼───────────────┼───────────────────────┤
│ tabsdata │ ~/.tabsdata/instances/tabsdata                   │ kminus   │ 2.0.2   │ created │ Stopped │ 2457            │ 2460          │ http://localhost:2457 │
└──────────┴──────────────────────────────────────────────────┴──────────┴─────────┴─────────┴─────────┴─────────────────┴───────────────┴───────────────────────┘
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

Step 1Start an instance

```bash
tdkserver start --instance myinstance
```

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

To permanently remove the instance, follow [Delete a Server](https://docs.tabsdata.com/server-admin/delete).

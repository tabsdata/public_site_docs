# Create a Server

> Covers `tdkserver create --instance`, which builds a server instance from the init config folder, setting the LLM API key, port assignment with `--port`, and checking with `tdkserver list`.

Source: https://docs.tabsdata.com/server-admin/create

Before you begin

[Install Tabsdata](https://docs.tabsdata.com/server-admin/install)

[Initialize a Server](https://docs.tabsdata.com/server-admin/initialize)

After [initializing](https://docs.tabsdata.com/server-admin/initialize) a server, `tdkserver create` builds an instance from the config folder that [`tdkserver init`](https://docs.tabsdata.com/server-admin/initialize) produced.

Step 1Set the LLM API key

`tdkserver create` builds the aiagent pod, so the LLM key has to be in the environment before running it, not before [`tdkserver init`](https://docs.tabsdata.com/server-admin/initialize):

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

## Ports

Every service in the instance takes a port, assigned sequentially from a single base value. `--port` sets that base, defaulting to `2457`:

```bash
tdkserver create --instance myinstance --port 3000
```

Two instances on one machine need base ports far enough apart that their ranges do not overlap.

## What to do next

[Start a Server](https://docs.tabsdata.com/server-admin/start). The instance keeps its configuration across stops and starts, so creating it is a one-time step.

See [`tdkserver create`](https://docs.tabsdata.com/cli/tdkserver/create) for the full option list.

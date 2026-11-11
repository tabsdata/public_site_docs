# Quickstart a Server

> Quickstart a Tabsdata server with `tdkserver quickstart`, covering the default kminus, eks, aks and gke providers, the `--config`, `--fill` and `--yes` options, and login.

Source: https://docs.tabsdata.com/server-admin/quickstart

Before you begin

[Install Tabsdata](https://docs.tabsdata.com/server-admin/install)

`tdkserver quickstart` bundles [initializing](https://docs.tabsdata.com/server-admin/initialize), [creating](https://docs.tabsdata.com/server-admin/create), and [starting](https://docs.tabsdata.com/server-admin/start) a Tabsdata server into a single command, using a default configuration for compute and storage.

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

## What is Quickstart

`quickstart` bundles initializing, creating, and running a server using a default configuration. For custom deployment, do [Initialize a Server](https://docs.tabsdata.com/server-admin/initialize), [Create a Server](https://docs.tabsdata.com/server-admin/create), and [Start a Server](https://docs.tabsdata.com/server-admin/start).

## Settings and cloud providers

`--config` sets a value of the instance configuration, as `ADDRESS=VALUE` or `@FILE`, and can be repeated. A value that starts with `env:` is read from an environment variable. Every setting is checked before the instance folder is created.

```bash
tdkserver quickstart --config tabsdata:pods.service.resources.memory=8Gi
```

A custom Python package index is set the same way:

```bash
tdkserver quickstart --config tabsdata:pods.global.envs.UV_INDEX=http://localhost:8000/+simple
```

`--provider` takes `kminus`, `eks`, `aks` or `gke`. Without it, `quickstart` uses the provider set for the session with `tdkserver set`, and falls back to `kminus`. A cloud provider needs one of `--kubeconfig`, `--context` or `--current`.

`--fill` opens the provider's configuration stub in an editor in the terminal before anything is created. `Ctrl+Q` saves and continues, `Ctrl+S` saves, and `Esc` cancels. The filled stub is kept in `<instance>/init/fill/stub.yaml`.

```bash
tdkserver quickstart --provider gke --current --fill
```

`--fill` needs an interactive terminal. For an unattended install, copy the stubs into the Tabsdata home folder with `tdkserver stubs`, fill one in, and pass it with `--config @FILE`:

```bash
tdkserver stubs
```

```bash
tdkserver quickstart --provider gke --context my-gke-context --config @settings.yaml --yes
```

If `quickstart` fails on a new instance, the partial instance is moved to trash. A `kminus` instance is stopped first, and a cloud instance has its cluster resources deleted first.

`--anthropic-key`, `--openai-key` and `--uv-index` still work, with a deprecation warning, and are converted into the matching `--config` setting. See [`tdkserver quickstart`](https://docs.tabsdata.com/cli/tdkserver/quickstart) for every option.

# Quickstart a Server

Source: https://docs.tabsdata.com/developer/server-admin/quickstart

Before you begin

[Install Tabsdata](https://docs.tabsdata.com/developer/server-admin/install)

`tdkserver quickstart` bundles [initializing](https://docs.tabsdata.com/developer/server-admin/initialize), [creating](https://docs.tabsdata.com/developer/server-admin/create), and [starting](https://docs.tabsdata.com/developer/server-admin/start) a Tabsdata server into a single command, using a default configuration for compute and storage.

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

## What is Quickstart

`quickstart` bundles initializing, creating, and running a server using a default configuration. For custom deployment, do [Initialize a Server](https://docs.tabsdata.com/developer/server-admin/initialize), [Create a Server](https://docs.tabsdata.com/developer/server-admin/create), and [Start a Server](https://docs.tabsdata.com/developer/server-admin/start).

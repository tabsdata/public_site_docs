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

If you plan to use the MySQL or PostgreSQL CDC connectors, they need database drivers that Tabsdata cannot redistribute. After the quickstart completes, add them with `tdkserver venv update`, as described in [Installing Third-Party Database Drivers](https://docs.tabsdata.com/developer/server-admin/third-party-database-drivers):

```bash
tdkserver venv update --instance <TABSDATA_INSTANCE> --name fn --requirements <REQS_FILE>
tdkserver venv update --instance <TABSDATA_INSTANCE> --name ag --requirements <REQS_FILE>
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
┌───────────────┬─────────┬───────┬─────┐
│ Name          │ Status  │ Ready │ Age │
├───────────────┼─────────┼───────┼─────┤
│ srv-aiagent   │ Running │ 1/1   │ 15s │
│ srv-apiserver │ Running │ 1/1   │ 15s │
│ srv-database  │ Running │ 1/1   │ 24s │
└───────────────┴─────────┴───────┴─────┘
Pods                                                      
┌────────────────────────────────┬─────────┬───────┬─────┐
│ Name                           │ Status  │ Ready │ Age │
├────────────────────────────────┼─────────┼───────┼─────┤
│ srv-aiagent-7476c88484-4klx8   │ Running │ 2/2   │ 15s │
│ srv-apiserver-56bbbb559d-8cnxl │ Running │ 1/1   │ 15s │
│ srv-database-fd4f8f85-dsxcj    │ Running │ 1/1   │ 24s │
└────────────────────────────────┴─────────┴───────┴─────┘
CronJobs                                                            
┌──────────────────┬─────────┬─────────────┬─────────────────┬─────┐
│ Name             │ Status  │ Expression  │ Explanation     │ Age │
├──────────────────┼─────────┼─────────────┼─────────────────┼─────┤
│ srv-aiembeddings │ Running │ */5 * * * * │ Every 5 minutes │ 6s  │
│ srv-aimetadata   │ Running │ */5 * * * * │ Every 5 minutes │ 6s  │
└──────────────────┴─────────┴─────────────┴─────────────────┴─────┘
Jobs                                             
┌────────────────┬──────────┬─────────────┬─────┐
│ Name           │ Status   │ Completions │ Age │
├────────────────┼──────────┼─────────────┼─────┤
│ ini-inspector  │ Complete │ 1/1         │ 16s │
│ ini-venvloader │ Complete │ 1/1         │ 17s │
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

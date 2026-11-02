# Initialize a Server

> Covers `tdkserver init`, which writes an editable config folder under ~/.tabsdata/instances/<name> with default settings, using options like --instance and --provider, before creating and starting a server.

Source: https://docs.tabsdata.com/server-admin/initialize

Before you begin

[Install Tabsdata](https://docs.tabsdata.com/server-admin/install)

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

## What to do next

1.  Edit the config files the command produced, if you need to change anything.
2.  [Create a Server](https://docs.tabsdata.com/server-admin/create) using the config
3.  [Start a Server](https://docs.tabsdata.com/server-admin/start).

To accept the defaults and get all three in one command, use [Quickstart a Server](https://docs.tabsdata.com/server-admin/quickstart) instead.

Deploying on AWS EKS starts here too, with values for the database, storage and cluster. See [Install Tabsdata on AWS EKS](https://docs.tabsdata.com/server-admin/eks-install).

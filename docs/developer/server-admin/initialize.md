# Initialize a Server

Source: https://docs.tabsdata.com/developer/server-admin/initialize

Before you begin

[Install Tabsdata](https://docs.tabsdata.com/developer/server-admin/install)

`tdkserver init` produces an editable config folder for a Tabsdata instance within `~/.tabsdata`, pre-filled with default values.

### Initialize an instance

```bash
tdkserver init --instance myinstance --provider kminus
```

The config folder is written to `~/.tabsdata/instances/myinstance/`.

The default configuration is what is used by `tdkserver quickstart` which bundles initializing, creating, and starting a server

## What to do next

1.  Edit the config files the command produced, if you need to change anything.
2.  [Create a Server](https://docs.tabsdata.com/developer/server-admin/create) using the config
3.  [Start a Server](https://docs.tabsdata.com/developer/server-admin/start).

To accept the defaults and get all three in one command, use [Quickstart a Server](https://docs.tabsdata.com/developer/server-admin/quickstart) instead.

Deploying on AWS EKS starts here too, with values for the database, storage and cluster. See [Install Tabsdata on AWS EKS](https://docs.tabsdata.com/developer/server-admin/eks-install).

# Start a Server

> Describes starting a Tabsdata server instance with the `tdkserver start` command, including the `--instance` option, after an instance has been built by `tdkserver create`.

Source: https://docs.tabsdata.com/server-admin/start

Before you begin

[Install Tabsdata](https://docs.tabsdata.com/server-admin/install)

[Initialize a Server](https://docs.tabsdata.com/server-admin/initialize)

[Create a Server](https://docs.tabsdata.com/server-admin/create)

`tdkserver start` brings up the services of an instance that [`tdkserver create`](https://docs.tabsdata.com/server-admin/create) already built. Until the instance is running, `tdk` has nothing to connect to.

Step 1Start an instance

```bash
tdkserver start --instance myinstance
```

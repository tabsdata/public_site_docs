# Create a Server

Source: https://docs.tabsdata.com/developer/server-admin/create

Before you begin

[Install Tabsdata](https://docs.tabsdata.com/developer/server-admin/install)

[Initialize a Server](https://docs.tabsdata.com/developer/server-admin/initialize)

`tdkserver create` builds an instance from the config folder that [`tdkserver init`](https://docs.tabsdata.com/developer/server-admin/initialize) produced. Creating an instance does not start it, so the config is still editable up to this point and the server begins serving only once you [start it](https://docs.tabsdata.com/developer/server-admin/start).

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

## Ports

Every service in the instance takes a port, assigned sequentially from a single base value. `--port` sets that base, defaulting to `2457`:

```bash
tdkserver create --instance myinstance --port 3000
```

Two instances on one machine need base ports far enough apart that their ranges do not overlap.

## What to do next

[Start a Server](https://docs.tabsdata.com/developer/server-admin/start). The instance keeps its configuration across stops and starts, so creating it is a one-time step.

See [`tdkserver create`](https://docs.tabsdata.com/cli/tdkserver/create) for the full option list.

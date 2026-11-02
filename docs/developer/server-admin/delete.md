# Delete a Server

Source: https://docs.tabsdata.com/developer/server-admin/delete

Before you begin

[Stop a Server](https://docs.tabsdata.com/developer/server-admin/stop)

warning

Trashing an instance discards everything it holds: the projects inside it, the tables and every version of their data, the registered function code, and the execution history. This cannot be reversed.

`tdkserver trash` removes a local kminus instance and its data. The command is `trash` rather than `delete`, and it applies to local kminus instances. An EKS deployment is torn down through its own uninstall path instead.

Step 1Stop the instance

```bash
tdkserver stop --instance myinstance
```

Step 2Trash the instance

```bash
tdkserver trash --instance myinstance
```

The command prints a summary of what it is about to discard and waits for confirmation. Read the instance name in that summary before agreeing to it, since there is nothing to recover afterward.

Step 3Confirm the instance is gone

```bash
tdkserver list
```

The instance no longer appears, and its name is free for reuse.

## Keeping the data

Nothing in the instance survives the trash, so anything worth keeping has to leave the server first. A subscriber writes a table out to an external system, which is the supported way to get data off an instance. See [Subscribers](https://docs.tabsdata.com/guide/functions/subscribers).

## What to do next

[Quickstart a Server](https://docs.tabsdata.com/developer/server-admin/quickstart) for a fresh instance with default configuration, or [Initialize a Server](https://docs.tabsdata.com/developer/server-admin/initialize) to set the configuration yourself.

See [`tdkserver trash`](https://docs.tabsdata.com/cli/tdkserver/trash) for the full option list.

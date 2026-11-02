# Delete a Project

Source: https://docs.tabsdata.com/developer/tutorials/managing-projects/delete

Before you begin

[Create a Project](https://docs.tabsdata.com/developer/tutorials/managing-projects/create)

warning

Deleting a project deletes all resources nested inside of it, including function code, execution logs, and table data. This action cannot be reversed.

Step 1Check what the project holds

```bash
tdk group list --proj finance
tdk collection list --proj finance
```

Step 2Delete it

```bash
tdk project delete \
  --name finance
```

`--confirm` takes the literal string `delete`. Anything else, including `y` or `yes`, cancels the command and leaves the project standing.

## What deletion does

Every group and collection in the project is deleted with it, along with the tables those collections held and the functions registered in them.

The project's name is freed and can be reused immediately.

See [`tdk project delete`](https://docs.tabsdata.com/cli/tdk/project/delete) for the full option list.

# Delete a Group

Source: https://docs.tabsdata.com/developer/tutorials/managing-groups/delete

Before you begin

[Create a Group](https://docs.tabsdata.com/developer/tutorials/managing-groups/create)

Deleting a group deletes the collections inside it. Like the other deletes, it takes a typed confirmation.

Step 1Check what the group holds

```bash
tdk collection list --proj finance --group bronze
```

Every collection listed here goes with the group.

Step 2Delete it

```bash
tdk group delete \
  --proj finance \
  --name bronze \
  --confirm delete
```

`--confirm` takes the literal string `delete`. The three system groups cannot be deleted, so this only ever applies to a group you created.

## What deletion does

The group's collections are deleted with it, along with their tables and functions. Functions in _other_ collections that depended on those tables are frozen rather than deleted: they stay registered and stop running until they are re-registered against tables that exist.

See [`tdk group delete`](https://docs.tabsdata.com/cli/tdk/group/delete) for the full option list.

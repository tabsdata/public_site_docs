# Delete a Collection

Source: https://docs.tabsdata.com/developer/tutorials/managing-collections/delete

Before you begin

[Create a Collection](https://docs.tabsdata.com/developer/tutorials/managing-collections/create)

Deleting a collection deletes its functions and tables, and freezes functions elsewhere that read from it. It takes a typed confirmation.

Step 1Check what depends on the collection

```bash
tdk table list --proj finance --coll sales_src
```

Functions in other collections that read these tables are frozen by the delete, so it is worth knowing which tables those are.

Step 2Delete it

```bash
tdk collection delete \
  --proj finance \
  --name sales_src
```

`--confirm` takes the literal string `delete`.

## What deletion does

The delete is a soft delete with a cascade, in this order:

1.  The collection row is renamed to `deleted_<id>`, which frees the original name for immediate reuse.
2.  Functions in _other_ collections that depend on its tables are set to `Frozen`. A frozen function stays registered and stops running until it is re-registered against tables that exist.
3.  Its tables, triggers and dependencies are set to `Deleted`, and its own functions are set to `Deleted`.
4.  Scheduled cron and stage workers are stopped.
5.  After the commit, the connection's stored content is deleted on a best-effort basis.

Function status is one of `Active`, `Frozen` or `Deleted`, so a frozen function is visible in a listing rather than silently gone.

See [`tdk collection delete`](https://docs.tabsdata.com/cli/tdk/collection/delete) for the full option list.

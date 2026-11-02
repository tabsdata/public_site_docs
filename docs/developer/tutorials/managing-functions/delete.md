# Delete a Function

Source: https://docs.tabsdata.com/developer/tutorials/managing-functions/delete

Before you begin

[Register a Function](https://docs.tabsdata.com/developer/tutorials/managing-functions/register)

Step 1Delete the function

```bash
tdk fn delete --coll reporting --name summarize --confirm delete
```

`--confirm` takes the literal word `delete`. Omit it and `tdk` prompts for it instead.

Step 2Confirm it is gone

```bash
tdk fn list --coll reporting
```

## What deleting does not touch

Deleting a function does not delete the tables it wrote. Other functions that depend on those tables are frozen — they stay registered and stop running until re-registered against tables that still exist — rather than deleted along with the function that produced them.

See [`tdk fn delete`](https://docs.tabsdata.com/cli/tdk/fn/delete) for the full option list.

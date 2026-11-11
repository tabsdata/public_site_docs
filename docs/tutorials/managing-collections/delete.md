# Delete a Collection

> Deletes a Tabsdata collection through an AI agent session, showing the dependency check, confirmation step, cascade of functions and tables, and frozen functions in other collections.

Source: https://docs.tabsdata.com/tutorials/managing-collections/delete

Before you begin

[Install Tabsdata](https://docs.tabsdata.com/server-admin/install)

[Configure Your AI Agent](https://docs.tabsdata.com/guide/connect-agent)

[Create a Project](https://docs.tabsdata.com/tutorials/managing-projects/create)

[Create a Collection](https://docs.tabsdata.com/tutorials/managing-collections/create)

AI agent session

❯delete the billing collection

Called tabsdata 1 time (ctrl+o to expand)

⏺

This collection holds 3 functions and 4 tables, and 1 function in another collection reads one of those tables. Confirm by writing `delete`.

❯delete

Called tabsdata 2 times (ctrl+o to expand)

⏺

**billing** is gone. The name is free again immediately, so you can recreate it under the same name straight away.

```
┌────────────────────────────┬───────────┐
│           field            │   value   │
├────────────────────────────┼───────────┤
│ deleted                    │ billing   │
├────────────────────────────┼───────────┤
│ functions deleted          │ 3         │
├────────────────────────────┼───────────┤
│ tables deleted             │ 4         │
├────────────────────────────┼───────────┤
│ functions frozen elsewhere │ 1         │
├────────────────────────────┼───────────┤
│ name now                   │ available │
└────────────────────────────┴───────────┘
```

⏺

The frozen function is the one to look at: it stays registered and stops running until it is re-registered against tables that exist. Functions outside the collection are frozen, not deleted, so nothing you built elsewhere is thrown away.

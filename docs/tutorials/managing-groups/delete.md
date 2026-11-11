# Delete a Group

> Deletes a Tabsdata group and every collection and table it contains, with a confirmation step and notes on how dependent functions are left frozen.

Source: https://docs.tabsdata.com/tutorials/managing-groups/delete

Before you begin

[Install Tabsdata](https://docs.tabsdata.com/server-admin/install)

[Configure Your AI Agent](https://docs.tabsdata.com/guide/connect-agent)

[Create a Project](https://docs.tabsdata.com/tutorials/managing-projects/create)

[Create a Group](https://docs.tabsdata.com/tutorials/managing-groups/create)

AI agent session

❯delete the raw group

Called tabsdata 1 time (ctrl+o to expand)

⏺

This group holds 2 collections. Deleting it deletes them and everything they contain. Confirm by writing `delete`.

❯delete

Called tabsdata 2 times (ctrl+o to expand)

⏺

**raw** is gone, along with its 2 collections.

```
┌─────────────────────┬───────────┐
│        field        │   value   │
├─────────────────────┼───────────┤
│ deleted             │ raw       │
├─────────────────────┼───────────┤
│ project             │ finance   │
├─────────────────────┼───────────┤
│ collections removed │ 2         │
├─────────────────────┼───────────┤
│ name now            │ available │
└─────────────────────┴───────────┘
```

⏺

Functions in other collections that read tables from those collections are now frozen rather than deleted: they stay registered and stop running until you re-register them against tables that exist.

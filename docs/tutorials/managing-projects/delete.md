# Delete a Project

> Deletes a Tabsdata project through the AI agent, showing the confirmation step and the groups and collections removed with it, and that the name becomes available for reuse.

Source: https://docs.tabsdata.com/tutorials/managing-projects/delete

Before you begin

[Install Tabsdata](https://docs.tabsdata.com/server-admin/install)

[Configure Your AI Agent](https://docs.tabsdata.com/guide/connect-agent)

[Create a Project](https://docs.tabsdata.com/tutorials/managing-projects/create)

AI agent session

❯delete the billing project

Called tabsdata 1 time (ctrl+o to expand)

⏺

This project holds 3 groups and 2 collections. All of them are deleted with it. Confirm by writing `delete`.

❯delete

Called tabsdata 2 times (ctrl+o to expand)

⏺

**billing** is gone, and the name is free for reuse.

```
┌─────────────────────┬───────────┐
│        field        │   value   │
├─────────────────────┼───────────┤
│ deleted             │ billing   │
├─────────────────────┼───────────┤
│ groups removed      │ 3         │
├─────────────────────┼───────────┤
│ collections removed │ 2         │
├─────────────────────┼───────────┤
│ name now            │ available │
└─────────────────────┴───────────┘
```

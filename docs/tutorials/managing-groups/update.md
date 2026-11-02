# Update a Group

> Updates an existing Tabsdata group's name and description, with notes on which system groups (default, sources, destinations) cannot be renamed.

Source: https://docs.tabsdata.com/tutorials/managing-groups/update

Before you begin

[Install Tabsdata](https://docs.tabsdata.com/server-admin/install)

[Connect to MCP](https://docs.tabsdata.com/guide/connect-agent)

[Create a Project](https://docs.tabsdata.com/tutorials/managing-projects/create)

[Create a Group](https://docs.tabsdata.com/tutorials/managing-groups/create)

AI agent session

❯rename the bronze group to raw and describe it as landing tables, no transforms

Called tabsdata 2 times (ctrl+o to expand)

⏺

Renamed. The collections in it kept their type, since type is fixed at creation and a rename does not touch it.

```
┌───────────────┬───────────────────────────────┐
│     field     │             value             │
├───────────────┼───────────────────────────────┤
│ name          │ raw                           │
├───────────────┼───────────────────────────────┤
│ previous name │ bronze                        │
├───────────────┼───────────────────────────────┤
│ description   │ Landing tables, no transforms │
├───────────────┼───────────────────────────────┤
│ project       │ finance                       │
├───────────────┼───────────────────────────────┤
│ collections   │ 2                             │
└───────────────┴───────────────────────────────┘
```

⏺

Worth knowing: `default`, `sources` and `destinations` are system groups and will refuse this. Renaming one is not something the server allows.

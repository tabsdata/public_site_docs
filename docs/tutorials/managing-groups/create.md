# Create a Group

> Shows how to create a group in a Tabsdata project via the MCP agent, covering the name and description fields, the data product collection type, and the seeded sources and destinations groups.

Source: https://docs.tabsdata.com/tutorials/managing-groups/create

Before you begin

[Install Tabsdata](https://docs.tabsdata.com/server-admin/install)

[Connect to MCP](https://docs.tabsdata.com/guide/connect-agent)

[Create a Project](https://docs.tabsdata.com/tutorials/managing-projects/create)

AI agent session

❯create a group called bronze for the raw ingest tables

Called tabsdata 2 times (ctrl+o to expand)

⏺

**bronze** is created in the finance project, alongside the three groups that came with it.

```
┌─────────────────┬───────────────────┐
│      field      │       value       │
├─────────────────┼───────────────────┤
│ name            │ bronze            │
├─────────────────┼───────────────────┤
│ description     │ Raw ingest tables │
├─────────────────┼───────────────────┤
│ project         │ finance           │
├─────────────────┼───────────────────┤
│ collection type │ data product      │
├─────────────────┼───────────────────┤
│ collections     │ 0                 │
└─────────────────┴───────────────────┘
```

⏺

A collection created in `bronze` is a data product collection, the same as one created in `default`: it holds transformers and carries no connection. Only the two seeded groups `sources` and `destinations` produce connection-backed collections.

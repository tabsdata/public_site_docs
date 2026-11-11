# Create a Collection

> Shows how to create a Tabsdata collection through an AI agent, covering collection types (data product vs. source/destination), the default group, connection requirements, and the group-connection mismatch error.

Source: https://docs.tabsdata.com/tutorials/managing-collections/create

Before you begin

[Install Tabsdata](https://docs.tabsdata.com/server-admin/install)

[Configure Your AI Agent](https://docs.tabsdata.com/guide/connect-agent)

[Create a Project](https://docs.tabsdata.com/tutorials/managing-projects/create)

AI agent session

❯create a collection called subscriptions for the billing transformers

Called tabsdata 2 times (ctrl+o to expand)

⏺

**subscriptions** is created in the `default` group, which makes it a data product collection: it holds transformers and carries no connection.

```
┌──────────────┬──────────────────────┐
│    field     │        value         │
├──────────────┼──────────────────────┤
│ name         │ subscriptions        │
├──────────────┼──────────────────────┤
│ description  │ Billing transformers │
├──────────────┼──────────────────────┤
│ project      │ finance              │
├──────────────┼──────────────────────┤
│ group        │ default              │
├──────────────┼──────────────────────┤
│ type         │ data product         │
├──────────────┼──────────────────────┤
│ connection   │ none                 │
├──────────────┼──────────────────────┤
│ storage path │ /                    │
└──────────────┴──────────────────────┘
```

⏺

Ask for a source or destination collection instead and I would need a connection document with it, because those are created with their connection rather than given one later. The group you name and the connection you pass have to agree, and a mismatch is an error rather than a silent choice.

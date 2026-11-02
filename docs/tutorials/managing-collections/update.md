# Update a Collection

> Explains how to rename a Tabsdata collection and update its description using an agent session, noting that a rename does not change the group and that a source or destination collection's connection is renamed with it. Wait, that's over 160 characters and too long. Corrected: Renames a Tabsdata collection and updates its description, with notes that the group cannot change and that renaming a source or destination collection also renames its connection.

Source: https://docs.tabsdata.com/tutorials/managing-collections/update

Before you begin

[Install Tabsdata](https://docs.tabsdata.com/server-admin/install)

[Connect to MCP](https://docs.tabsdata.com/guide/connect-agent)

[Create a Project](https://docs.tabsdata.com/tutorials/managing-projects/create)

[Create a Collection](https://docs.tabsdata.com/tutorials/managing-collections/create)

AI agent session

❯rename the subscriptions collection to billing and describe it as invoicing and dunning transformers

Called tabsdata 2 times (ctrl+o to expand)

⏺

Renamed. The functions and tables inside kept their names; only the collection changed.

```
┌───────────────┬────────────────────────────────────┐
│     field     │               value                │
├───────────────┼────────────────────────────────────┤
│ name          │ billing                            │
├───────────────┼────────────────────────────────────┤
│ previous name │ subscriptions                      │
├───────────────┼────────────────────────────────────┤
│ description   │ Invoicing and dunning transformers │
├───────────────┼────────────────────────────────────┤
│ group         │ default                            │
├───────────────┼────────────────────────────────────┤
│ type          │ data product                       │
├───────────────┼────────────────────────────────────┤
│ connection    │ none                               │
└───────────────┴────────────────────────────────────┘
```

⏺

Two things this does not do. It cannot move the collection to another group, so the type stays what it was. And on a source or destination collection a rename renames the connection too, since the connection is named by its collection.

# Update a Collection

> Updates an existing Tabsdata collection's name and description through the agent or CLI, covering rename behavior, the group and type limits, and connection side effects.

Source: https://docs.tabsdata.com/tutorials/managing-collections/update

Before you begin

[Install Tabsdata](https://docs.tabsdata.com/server-admin/install)

[Configure Your AI Agent](https://docs.tabsdata.com/guide/connect-agent)

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

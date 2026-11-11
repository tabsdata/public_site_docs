# Update a Project

> Explains how to update a Tabsdata project's name and description with an AI agent, noting that the project id and its groups and collections are preserved.

Source: https://docs.tabsdata.com/tutorials/managing-projects/update

Before you begin

[Install Tabsdata](https://docs.tabsdata.com/server-admin/install)

[Configure Your AI Agent](https://docs.tabsdata.com/guide/connect-agent)

[Create a Project](https://docs.tabsdata.com/tutorials/managing-projects/create)

AI agent session

❯rename the finance project to billing and describe it as subscription billing and invoicing

Called tabsdata 2 times (ctrl+o to expand)

⏺

Renamed. The groups and collections inside came along untouched, and the id is unchanged, so anything holding the id still resolves.

```
┌───────────────┬────────────────────────────────────┐
│     field     │               value                │
├───────────────┼────────────────────────────────────┤
│ name          │ billing                            │
├───────────────┼────────────────────────────────────┤
│ previous name │ finance                            │
├───────────────┼────────────────────────────────────┤
│ description   │ Subscription billing and invoicing │
├───────────────┼────────────────────────────────────┤
│ id            │ 06fvco21l5q73d44ecrdii68k0         │
└───────────────┴────────────────────────────────────┘
```

⏺

One thing to know: the old name is free again the moment the rename commits, so a second project could take `finance` straight away.

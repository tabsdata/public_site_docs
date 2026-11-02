# Register a Function

> Registers a Tabsdata function from a Python file into a collection, covering the register command, the name, description, and collection options, and how versions and updates behave.

Source: https://docs.tabsdata.com/tutorials/managing-functions/register

Before you begin

[Install Tabsdata](https://docs.tabsdata.com/server-admin/install)

[Connect to MCP](https://docs.tabsdata.com/guide/connect-agent)

[Create a Collection](https://docs.tabsdata.com/tutorials/managing-collections/create)

AI agent session

❯register a transformer that totals orders by region into the reporting collection

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — group\_by on region with a summed amount.

Called tabsdata 3 times (ctrl+o to expand)

⏺

Registered as **summarize** in `reporting`, description "Rolls orders up by region":

```
┌────────────┬───────────┐
│   field    │   value   │
├────────────┼───────────┤
│ name       │ summarize │
├────────────┼───────────┤
│ collection │ reporting │
├────────────┼───────────┤
│ state      │ active    │
├────────────┼───────────┤
│ version    │ 1         │
└────────────┴───────────┘
```

⏺

Registering the same file again creates a new version rather than erroring, as long as I pass update. Without it, a second registration under the same name is rejected.

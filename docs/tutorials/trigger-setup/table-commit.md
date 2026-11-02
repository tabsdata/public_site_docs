# Trigger a Function from a Table Commit

> Controls which input tables fire a Tabsdata function on commit using the trigger_by parameter, including an empty list to disable automatic triggering.

Source: https://docs.tabsdata.com/tutorials/trigger-setup/table-commit

Before you begin

[Quickstart a Server](https://docs.tabsdata.com/server-admin/quickstart) or [Start a Server](https://docs.tabsdata.com/server-admin/start)

[Connect to MCP](https://docs.tabsdata.com/guide/connect-agent)

By default, functions trigger when any of their input tables receives new data. The `trigger_by` parameter lets users specify a subset of input tables that should trigger the function instead, or disable automatic triggering entirely.

AI agent session

❯make a transformer that reads the orders and regions tables and totals orders by region, but set it to only trigger on commits to the orders table

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — trigger\_by narrows the default trigger set to orders alone. regions is still read on every run and still supplies its current data, it just no longer starts one.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in sales:

```python
@transformer(
  input_tables=["orders", "regions"],
  output_tables=["orders_by_region"],
  trigger_by=["orders"],
)
def summarize(orders: TableFrameSpec, regions: TableFrameSpec) -> TableFrameSpec:
  return orders.group_by("region").agg(col("amount").sum())
```

⏺

This is not about avoiding duplicate runs. A plan that commits both tables runs the transformer once either way, since the plan covers every downstream function and orders them by dependency rather than firing one run per committed table.

AI agent session

❯make a transformer that reads the orders and regions tables and totals orders by region, and only trigger it off commits to the purchases table

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — trigger\_by names purchases alone. input\_tables and trigger\_by are independent lists: orders and regions are both read but silent, and purchases starts a run despite never being read.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in sales:

```python
@transformer(
  input_tables=["orders", "regions"],
  output_tables=["orders_by_region"],
  trigger_by=["purchases"],
)
def summarize(orders: TableFrameSpec, regions: TableFrameSpec) -> TableFrameSpec:
  return orders.group_by("region").agg(col("amount").sum())
```

⏺

A publisher uses the same mechanism. It has no input tables at all, so naming a table in trigger\_by is the only way a Tabsdata commit can start it.

⏺

`collection/table` references work within one project. A reference to a table in another project reports `Dependency table '<x>' does not exist`, because row-level security hides it rather than reporting it as forbidden.

AI agent session

❯make a transformer that reads the orders and regions tables and totals orders by region, but don't trigger it automatically at all — I'll run it manually

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — an empty trigger\_by. Orders and regions are both still read as inputs, and neither commit starts a run any more.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in sales:

```python
@transformer(
  input_tables=["orders", "regions"],
  output_tables=["orders_by_region"],
  trigger_by=[],
)
def summarize(orders: TableFrameSpec, regions: TableFrameSpec) -> TableFrameSpec:
  return orders.group_by("region").agg(col("amount").sum())
```

⏺

This runs only when triggered directly, with `tdk fn trigger`.

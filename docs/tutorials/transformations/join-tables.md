# Join Tables

> Joins two Tabsdata tables with `join()` on one or more key columns, covering the inner, left, right, full, semi and anti join types, `left_on`/`right_on`, and `suffix` for duplicate names.

Source: https://docs.tabsdata.com/tutorials/transformations/join-tables

Every session on this page joins the same two tables. `orders` has three rows and `customers` has three, and they overlap on two `customer_id` values: `o3` points at `c9`, which no customer has, and `c3` has no order. What each join does with those two odd rows is the whole difference between them.

```text
orders                        customers
order_id  customer_id  amount   customer_id  name
o1        c1           10       c1           Ada
o2        c2           20       c2           Grace
o3        c9           5        c3           Cy
```

## Join two tables

AI agent session

❯make a new table that takes the orders and customers tables and joins them on the customer\_id column, dropping the orders with no customer

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — two input tables, so the transformer takes a slot each, and `join()` on customer\_id. Dropping the unmatched orders is the default, how="inner", so it can be left off.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["orders", "customers"],
  output_tables=["order_names"],
)
def join_orders(orders: TableFrameSpec, customers: TableFrameSpec) -> TableFrameSpec:
  return orders.join(customers, on="customer_id")
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/order\_names is live — 2 of 3 orders. o3 points at c9 and dropped out, and c3 never appears because it has no order:

```
┌──────────┬─────────────┬────────┬───────┐
│ order_id │ customer_id │ amount │ name  │
├──────────┼─────────────┼────────┼───────┤
│ o1       │ c1          │ 10     │ Ada   │
├──────────┼─────────────┼────────┼───────┤
│ o2       │ c2          │ 20     │ Grace │
└──────────┴─────────────┴────────┴───────┘
```

Transformed tables

orders

| order\_id | customer\_id | amount |
| --- | --- | --- |
| o1 | c1 | 10 |
| o2 | c2 | 20 |
| o3 | c9 | 5 |

3 rows

customers

| customer\_id | name |
| --- | --- |
| c1 | Ada |
| c2 | Grace |
| c3 | Cy |

3 rows

order\_names

| order\_id | customer\_id | amount | name |
| --- | --- | --- | --- |
| o1 | c1 | 10 | Ada |
| o2 | c2 | 20 | Grace |

2 rows

AI agent session

❯make a new table that takes the orders and customers tables and joins them on the customer\_id column, keeping every order

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — "every order" makes this how="left". Orders with no matching customer stay, with null in the columns that came from customers.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["orders", "customers"],
  output_tables=["order_names"],
)
def join_orders(orders: TableFrameSpec, customers: TableFrameSpec) -> TableFrameSpec:
  return orders.join(customers, on="customer_id", how="left")
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/order\_names is live — all 3 orders, o3 with a null name:

```
┌──────────┬─────────────┬────────┬───────┐
│ order_id │ customer_id │ amount │ name  │
├──────────┼─────────────┼────────┼───────┤
│ o1       │ c1          │ 10     │ Ada   │
├──────────┼─────────────┼────────┼───────┤
│ o2       │ c2          │ 20     │ Grace │
├──────────┼─────────────┼────────┼───────┤
│ o3       │ c9          │ 5      │ null  │
└──────────┴─────────────┴────────┴───────┘
```

Transformed tables

orders

| order\_id | customer\_id | amount |
| --- | --- | --- |
| o1 | c1 | 10 |
| o2 | c2 | 20 |
| o3 | c9 | 5 |

3 rows

customers

| customer\_id | name |
| --- | --- |
| c1 | Ada |
| c2 | Grace |
| c3 | Cy |

3 rows

order\_names

| order\_id | customer\_id | amount | name |
| --- | --- | --- | --- |
| o1 | c1 | 10 | Ada |
| o2 | c2 | 20 | Grace |
| o3 | c9 | 5 | null |

3 rows

AI agent session

❯make a new table that takes the orders and customers tables and joins them on the customer\_id column, keeping every customer

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — how="right" keeps every row of the table passed to join() rather than the one it is called on, so the customer with no order survives instead of the order with no customer.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["orders", "customers"],
  output_tables=["customer_orders"],
)
def join_customers(orders: TableFrameSpec, customers: TableFrameSpec) -> TableFrameSpec:
  return orders.join(customers, on="customer_id", how="right")
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/customer\_orders is live — all 3 customers. c3 has no order, so the order columns are null, and o3 is gone:

```
┌──────────┬─────────────┬────────┬───────┐
│ order_id │ customer_id │ amount │ name  │
├──────────┼─────────────┼────────┼───────┤
│ o1       │ c1          │ 10     │ Ada   │
├──────────┼─────────────┼────────┼───────┤
│ o2       │ c2          │ 20     │ Grace │
├──────────┼─────────────┼────────┼───────┤
│ null     │ c3          │ null   │ Cy    │
└──────────┴─────────────┴────────┴───────┘
```

Transformed tables

orders

| order\_id | customer\_id | amount |
| --- | --- | --- |
| o1 | c1 | 10 |
| o2 | c2 | 20 |
| o3 | c9 | 5 |

3 rows

customers

| customer\_id | name |
| --- | --- |
| c1 | Ada |
| c2 | Grace |
| c3 | Cy |

3 rows

customer\_orders

| order\_id | customer\_id | amount | name |
| --- | --- | --- | --- |
| o1 | c1 | 10 | Ada |
| o2 | c2 | 20 | Grace |
| null | c3 | null | Cy |

3 rows

AI agent session

❯make a new table that takes the orders and customers tables and joins them on the customer\_id column, keeping every row from both

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — how="full" keeps unmatched rows from both sides, so this is the only join here that loses nothing. It is spelled "full" rather than "outer".

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["orders", "customers"],
  output_tables=["orders_customers"],
)
def join_all(orders: TableFrameSpec, customers: TableFrameSpec) -> TableFrameSpec:
  return orders.join(customers, on="customer_id", how="full")
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/orders\_customers is live — 4 rows, one per matched pair plus o3 and c3 each carrying nulls on the side they have no row for:

```
┌──────────┬─────────────┬────────┬───────┐
│ order_id │ customer_id │ amount │ name  │
├──────────┼─────────────┼────────┼───────┤
│ o1       │ c1          │ 10     │ Ada   │
├──────────┼─────────────┼────────┼───────┤
│ o2       │ c2          │ 20     │ Grace │
├──────────┼─────────────┼────────┼───────┤
│ o3       │ c9          │ 5      │ null  │
├──────────┼─────────────┼────────┼───────┤
│ null     │ c3          │ null   │ Cy    │
└──────────┴─────────────┴────────┴───────┘
```

Transformed tables

orders

| order\_id | customer\_id | amount |
| --- | --- | --- |
| o1 | c1 | 10 |
| o2 | c2 | 20 |
| o3 | c9 | 5 |

3 rows

customers

| customer\_id | name |
| --- | --- |
| c1 | Ada |
| c2 | Grace |
| c3 | Cy |

3 rows

orders\_customers

| order\_id | customer\_id | amount | name |
| --- | --- | --- | --- |
| o1 | c1 | 10 | Ada |
| o2 | c2 | 20 | Grace |
| o3 | c9 | 5 | null |
| null | c3 | null | Cy |

4 rows

AI agent session

❯make a new table that takes the orders and customers tables and keeps the orders whose customer\_id column is in the customers table, adding no customer columns

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — how="semi" filters rather than widens: it keeps the left rows that have a match and adds no columns from the right table. That is what "without adding customer columns" asks for.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["orders", "customers"],
  output_tables=["known_orders"],
)
def keep_known_orders(orders: TableFrameSpec, customers: TableFrameSpec) -> TableFrameSpec:
  return orders.join(customers, on="customer_id", how="semi")
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/known\_orders is live — same three columns as orders, 2 of 3 rows:

```
┌──────────┬─────────────┬────────┐
│ order_id │ customer_id │ amount │
├──────────┼─────────────┼────────┤
│ o1       │ c1          │ 10     │
├──────────┼─────────────┼────────┤
│ o2       │ c2          │ 20     │
└──────────┴─────────────┴────────┘
```

Transformed tables

orders

| order\_id | customer\_id | amount |
| --- | --- | --- |
| o1 | c1 | 10 |
| o2 | c2 | 20 |
| o3 | c9 | 5 |

3 rows

customers

| customer\_id | name |
| --- | --- |
| c1 | Ada |
| c2 | Grace |
| c3 | Cy |

3 rows

known\_orders

| order\_id | customer\_id | amount |
| --- | --- | --- |
| o1 | c1 | 10 |
| o2 | c2 | 20 |

2 rows

AI agent session

❯make a new table that takes the orders and customers tables and keeps the orders whose customer\_id column is not in the customers table

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — how="anti" is the inverse of semi, keeping the left rows with no match and adding no columns. This is the shape to reach for when you are hunting orphans.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["orders", "customers"],
  output_tables=["orphan_orders"],
)
def find_orphan_orders(orders: TableFrameSpec, customers: TableFrameSpec) -> TableFrameSpec:
  return orders.join(customers, on="customer_id", how="anti")
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/orphan\_orders is live — o3 alone, the order pointing at c9:

```
┌──────────┬─────────────┬────────┐
│ order_id │ customer_id │ amount │
├──────────┼─────────────┼────────┤
│ o3       │ c9          │ 5      │
└──────────┴─────────────┴────────┘
```

Transformed tables

orders

| order\_id | customer\_id | amount |
| --- | --- | --- |
| o1 | c1 | 10 |
| o2 | c2 | 20 |
| o3 | c9 | 5 |

3 rows

customers

| customer\_id | name |
| --- | --- |
| c1 | Ada |
| c2 | Grace |
| c3 | Cy |

3 rows

orphan\_orders

| order\_id | customer\_id | amount |
| --- | --- | --- |
| o3 | c9 | 5 |

1 row

## Join on more than one column

AI agent session

❯make a new table that takes the visits and targets tables and joins them on both the customer\_id and date columns

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `on` takes a list when the key is more than one column, and a row matches only when every column in the list agrees.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["visits", "targets"],
  output_tables=["visits_vs_target"],
)
def join_on_day(visits: TableFrameSpec, targets: TableFrameSpec) -> TableFrameSpec:
  return visits.join(targets, on=["customer_id", "date"])
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/visits\_vs\_target is live — the c1/tue visit had no target row for that day, so it dropped:

```
┌─────────────┬──────┬───────┬────────┐
│ customer_id │ date │ spend │ target │
├─────────────┼──────┼───────┼────────┤
│ c1          │ mon  │ 10    │ 12     │
├─────────────┼──────┼───────┼────────┤
│ c2          │ mon  │ 7     │ 5      │
└─────────────┴──────┴───────┴────────┘
```

Transformed tables

visits

| customer\_id | date | spend |
| --- | --- | --- |
| c1 | mon | 10 |
| c2 | mon | 7 |
| c1 | tue | 4 |

3 rows

targets

| customer\_id | date | target |
| --- | --- | --- |
| c1 | mon | 12 |
| c2 | mon | 5 |

2 rows

visits\_vs\_target

| customer\_id | date | spend | target |
| --- | --- | --- | --- |
| c1 | mon | 10 | 12 |
| c2 | mon | 7 | 5 |

2 rows

AI agent session

❯make a new table that takes the visits and targets tables and joins them where the key columns are called cust\_id and visit\_date on one side

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — the names differ between the two tables, so `on` will not do it. `left_on` and `right_on` take the two lists instead, and they have to be the same length and in the same order.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["visits", "targets"],
  output_tables=["visits_vs_target"],
)
def join_on_day(visits: TableFrameSpec, targets: TableFrameSpec) -> TableFrameSpec:
  return visits.join(
      targets,
      left_on=["cust_id", "visit_date"],
      right_on=["customer_id", "date"],
  )
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/visits\_vs\_target is live — matched on the same two values under their own names:

```
┌─────────┬────────────┬───────┬────────┐
│ cust_id │ visit_date │ spend │ target │
├─────────┼────────────┼───────┼────────┤
│ c1      │ mon        │ 10    │ 12     │
├─────────┼────────────┼───────┼────────┤
│ c2      │ mon        │ 7     │ 5      │
└─────────┴────────────┴───────┴────────┘
```

Transformed tables

visits

| cust\_id | visit\_date | spend |
| --- | --- | --- |
| c1 | mon | 10 |
| c2 | mon | 7 |
| c1 | tue | 4 |

3 rows

targets

| customer\_id | date | target |
| --- | --- | --- |
| c1 | mon | 12 |
| c2 | mon | 5 |

2 rows

visits\_vs\_target

| cust\_id | visit\_date | spend | target |
| --- | --- | --- | --- |
| c1 | mon | 10 | 12 |
| c2 | mon | 7 | 5 |

2 rows

## Handle duplicate column names

AI agent session

❯make a new table that takes the orders and returns tables and joins them on the id column, renaming the amount column that both of them carry

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — both sides carry amount, and only the join key is merged into one column. `suffix` renames the right-hand copy of every other collision.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["orders", "returns"],
  output_tables=["orders_returns"],
)
def join_returns(orders: TableFrameSpec, returns: TableFrameSpec) -> TableFrameSpec:
  return orders.join(returns, on="id", suffix="_return")
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/orders\_returns is live — id appears once, and the returns table's amount came through as amount\_return:

```
┌────┬────────┬───────────────┐
│ id │ amount │ amount_return │
├────┼────────┼───────────────┤
│ o1 │ 10     │ 4             │
├────┼────────┼───────────────┤
│ o2 │ 20     │ 20            │
└────┴────────┴───────────────┘
```

Transformed tables

orders

| id | amount |
| --- | --- |
| o1 | 10 |
| o2 | 20 |

2 rows

returns

| id | amount |
| --- | --- |
| o1 | 4 |
| o2 | 20 |

2 rows

orders\_returns

| id | amount | amount\_return |
| --- | --- | --- |
| o1 | 10 | 4 |
| o2 | 20 | 20 |

2 rows

# Join Tables

Source: https://docs.tabsdata.com/developer/tutorials/transformations/join-tables

A transformer reads one or more Tabsdata Tables and writes new Tabsdata Tables. Joining two of them is the most common case: declare both under `input_tables` and the function takes a parameter for each.

See [Transformers](https://docs.tabsdata.com/developer/guide/functions/transformers) for the anatomy of a transformer Function.

Every block below joins the same two tables. `orders` has three rows and `customers` has three, overlapping on two `customer_id` values: `o3` points at `c9`, which no customer has, and `c3` has no order. What a join does with those two rows is the whole difference between the types.

## Join Types

Set the type with `how`. Every one of these joins on `customer_id`:

Only the rows that match on both sides. The default.

join.py

```python
from tabsdatak.api import TableFrameSpec, transformer

@transformer(
    input_tables=["orders", "customers"],
    output_tables=["order_names"],
)
def transform(orders: TableFrameSpec, customers: TableFrameSpec) -> TableFrameSpec:
    result = orders.join(customers, on="customer_id")
    return result
```

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

Every row from the table join() is called on, nulls where there is no match.

join.py

```python
from tabsdatak.api import TableFrameSpec, transformer

@transformer(
    input_tables=["orders", "customers"],
    output_tables=["order_names"],
)
def transform(orders: TableFrameSpec, customers: TableFrameSpec) -> TableFrameSpec:
    result = orders.join(customers, on="customer_id", how="left")
    return result
```

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

Every row from the table passed to join(), nulls where there is no match.

join.py

```python
from tabsdatak.api import TableFrameSpec, transformer

@transformer(
    input_tables=["orders", "customers"],
    output_tables=["customer_orders"],
)
def transform(orders: TableFrameSpec, customers: TableFrameSpec) -> TableFrameSpec:
    result = orders.join(customers, on="customer_id", how="right")
    return result
```

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

Every row from both sides. The only join here that drops nothing.

join.py

```python
from tabsdatak.api import TableFrameSpec, transformer

@transformer(
    input_tables=["orders", "customers"],
    output_tables=["orders_customers"],
)
def transform(orders: TableFrameSpec, customers: TableFrameSpec) -> TableFrameSpec:
    result = orders.join(customers, on="customer_id", how="full")
    return result
```

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

Left rows that have a match. Filters rather than widens: no columns are added.

join.py

```python
from tabsdatak.api import TableFrameSpec, transformer

@transformer(
    input_tables=["orders", "customers"],
    output_tables=["known_orders"],
)
def transform(orders: TableFrameSpec, customers: TableFrameSpec) -> TableFrameSpec:
    result = orders.join(customers, on="customer_id", how="semi")
    return result
```

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

Left rows with no match, and no columns added. The inverse of semi.

join.py

```python
from tabsdatak.api import TableFrameSpec, transformer

@transformer(
    input_tables=["orders", "customers"],
    output_tables=["orphan_orders"],
)
def transform(orders: TableFrameSpec, customers: TableFrameSpec) -> TableFrameSpec:
    result = orders.join(customers, on="customer_id", how="anti")
    return result
```

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

## Join on Multiple Columns

A key can span several columns, and the two sides can name them differently:

One key spanning several columns. A row matches only when every column agrees.

join.py

```python
from tabsdatak.api import TableFrameSpec, transformer

@transformer(
    input_tables=["visits", "targets"],
    output_tables=["visits_vs_target"],
)
def transform(visits: TableFrameSpec, targets: TableFrameSpec) -> TableFrameSpec:
    result = visits.join(targets, on=["customer_id", "date"])
    return result
```

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

Keys named differently on each side. Both lists must be the same length and order.

join.py

```python
from tabsdatak.api import TableFrameSpec, transformer

@transformer(
    input_tables=["visits", "targets"],
    output_tables=["visits_vs_target"],
)
def transform(visits: TableFrameSpec, targets: TableFrameSpec) -> TableFrameSpec:
    result = visits.join(
        targets,
        left_on=["cust_id", "visit_date"],
        right_on=["customer_id", "date"],
    )
    return result
```

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

## Handling Duplicate Column Names

When both tables carry a column of the same name, the right-hand one needs a new name:

Renames the right-hand copy of every colliding column. The join key stays single.

join.py

```python
from tabsdatak.api import TableFrameSpec, transformer

@transformer(
    input_tables=["orders", "returns"],
    output_tables=["orders_returns"],
)
def transform(orders: TableFrameSpec, returns: TableFrameSpec) -> TableFrameSpec:
    result = orders.join(returns, on="id", suffix="_return")
    return result
```

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

See [TableFrame API Guide](https://docs.tabsdata.com/developer/guide/tables) for the whole API in one place.

# Transform Numbers

> Arithmetic, rounding, powers, logs, trigonometry, and row-to-row differences for Tabsdata table columns, with the transformer code for each operator and method.

Source: https://docs.tabsdata.com/tutorials/transformations/numbers

## Arithmetic

AI agent session

❯make a new table that takes the orders table and adds 10 to the price column

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — the `+` operator works directly on a column expression, so no method call is needed. `add()` is the method form and does the same thing.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["orders"],
  output_tables=["orders_bumped"],
)
def bump_price(orders: TableFrameSpec) -> TableFrameSpec:
  expr = col("price") + 10
  return orders.with_columns(expr)
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/orders\_bumped is live — 10 added to every price:

```
┌───────┐
│ price │
├───────┤
│ 110   │
├───────┤
│ 50    │
└───────┘
```

Transformed tables

orders

| price |
| --- |
| 100 |
| 40 |

2 rows

orders\_bumped

| price |
| --- |
| 110 |
| 50 |

2 rows

AI agent session

❯make a new table that takes the orders table and subtracts the discount column from the price column

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `-` between two columns subtracts row by row. `sub()` is the method form.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["orders"],
  output_tables=["orders_net"],
)
def net_price(orders: TableFrameSpec) -> TableFrameSpec:
  expr = col("price") - col("discount")
  return orders.with_columns(expr)
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/orders\_net is live — discount taken off each price:

```
┌───────┬──────────┐
│ price │ discount │
├───────┼──────────┤
│ 85    │ 15       │
├───────┼──────────┤
│ 35    │ 5        │
└───────┴──────────┘
```

Transformed tables

orders

| price | discount |
| --- | --- |
| 100 | 15 |
| 40 | 5 |

2 rows

orders\_net

| price | discount |
| --- | --- |
| 85 | 15 |
| 35 | 5 |

2 rows

AI agent session

❯make a new table that takes the orders table and multiplies the quantity column by the unit\_price column

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `*` between two columns multiplies row by row. `mul()` is the method form.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["orders"],
  output_tables=["orders_totalled"],
)
def line_total(orders: TableFrameSpec) -> TableFrameSpec:
  expr = col("quantity") * col("unit_price")
  return orders.with_columns(expr)
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/orders\_totalled is live — quantity times unit price per row:

```
┌──────────┬────────────┐
│ quantity │ unit_price │
├──────────┼────────────┤
│ 30       │ 10         │
├──────────┼────────────┤
│ 9        │ 4.5        │
└──────────┴────────────┘
```

Transformed tables

orders

| quantity | unit\_price |
| --- | --- |
| 3 | 10 |
| 2 | 4.5 |

2 rows

orders\_totalled

| quantity | unit\_price |
| --- | --- |
| 30 | 10 |
| 9 | 4.5 |

2 rows

AI agent session

❯make a new table that takes the orders table and divides the total column by the count column

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `/` divides row by row and yields a float. `truediv()` is the method form.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["orders"],
  output_tables=["orders_per_unit"],
)
def per_unit(orders: TableFrameSpec) -> TableFrameSpec:
  expr = col("total") / col("count")
  return orders.with_columns(expr)
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/orders\_per\_unit is live — total divided by count per row:

```
┌───────┬───────┐
│ total │ count │
├───────┼───────┤
│ 30    │ 3     │
├───────┼───────┤
│ 12.5  │ 4     │
└───────┴───────┘
```

Transformed tables

orders

| total | count |
| --- | --- |
| 90 | 3 |
| 50 | 4 |

2 rows

orders\_per\_unit

| total | count |
| --- | --- |
| 30 | 3 |
| 12.5 | 4 |

2 rows

AI agent session

❯make a new table that takes the pairs table and adds the b column to the a column

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `add()` is the method form of `+`, and it reads better when you are chaining several operations off one expression.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["pairs"],
  output_tables=["pairs_sum"],
)
def add_columns(pairs: TableFrameSpec) -> TableFrameSpec:
  expr = col("a").add(col("b"))
  return pairs.with_columns(expr)
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/pairs\_sum is live — a plus b per row:

```
┌────┬───┐
│ a  │ b │
├────┼───┤
│ 9  │ 2 │
├────┼───┤
│ 13 │ 4 │
└────┴───┘
```

Transformed tables

pairs

| a | b |
| --- | --- |
| 7 | 2 |
| 9 | 4 |

2 rows

pairs\_sum

| a | b |
| --- | --- |
| 9 | 2 |
| 13 | 4 |

2 rows

AI agent session

❯make a new table that takes the pairs table and subtracts the b column from the a column

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `sub()`, the method form of `-`.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["pairs"],
  output_tables=["pairs_difference"],
)
def sub_columns(pairs: TableFrameSpec) -> TableFrameSpec:
  expr = col("a").sub(col("b"))
  return pairs.with_columns(expr)
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/pairs\_difference is live — a minus b per row:

```
┌───┬───┐
│ a │ b │
├───┼───┤
│ 5 │ 2 │
├───┼───┤
│ 5 │ 4 │
└───┴───┘
```

Transformed tables

pairs

| a | b |
| --- | --- |
| 7 | 2 |
| 9 | 4 |

2 rows

pairs\_difference

| a | b |
| --- | --- |
| 5 | 2 |
| 5 | 4 |

2 rows

AI agent session

❯make a new table that takes the pairs table and multiplies the a column by the b column

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `mul()`, the method form of `*`.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["pairs"],
  output_tables=["pairs_product"],
)
def mul_columns(pairs: TableFrameSpec) -> TableFrameSpec:
  expr = col("a").mul(col("b"))
  return pairs.with_columns(expr)
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/pairs\_product is live — a times b per row:

```
┌────┬───┐
│ a  │ b │
├────┼───┤
│ 14 │ 2 │
├────┼───┤
│ 36 │ 4 │
└────┴───┘
```

Transformed tables

pairs

| a | b |
| --- | --- |
| 7 | 2 |
| 9 | 4 |

2 rows

pairs\_product

| a | b |
| --- | --- |
| 14 | 2 |
| 36 | 4 |

2 rows

AI agent session

❯make a new table that takes the pairs table and divides the a column by the b column

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `truediv()` is the method form of `/`, and it always produces a float rather than truncating.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["pairs"],
  output_tables=["pairs_quotient"],
)
def div_columns(pairs: TableFrameSpec) -> TableFrameSpec:
  expr = col("a").truediv(col("b"))
  return pairs.with_columns(expr)
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/pairs\_quotient is live — a divided by b per row:

```
┌──────┬───┐
│  a   │ b │
├──────┼───┤
│ 3.5  │ 2 │
├──────┼───┤
│ 2.25 │ 4 │
└──────┴───┘
```

Transformed tables

pairs

| a | b |
| --- | --- |
| 7 | 2 |
| 9 | 4 |

2 rows

pairs\_quotient

| a | b |
| --- | --- |
| 3.5 | 2 |
| 2.25 | 4 |

2 rows

AI agent session

❯make a new table that takes the pairs table and takes the remainder of the a column divided by the b column

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `mod()` gives the remainder, which is the operation to reach for when you want "every nth row" or a bucket index.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["pairs"],
  output_tables=["pairs_remainder"],
)
def mod_columns(pairs: TableFrameSpec) -> TableFrameSpec:
  expr = col("a").mod(col("b"))  # Modulo
  return pairs.with_columns(expr)
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/pairs\_remainder is live — the remainder per row:

```
┌───┬───┐
│ a │ b │
├───┼───┤
│ 1 │ 2 │
├───┼───┤
│ 1 │ 4 │
└───┴───┘
```

Transformed tables

pairs

| a | b |
| --- | --- |
| 7 | 2 |
| 9 | 4 |

2 rows

pairs\_remainder

| a | b |
| --- | --- |
| 1 | 2 |
| 1 | 4 |

2 rows

## Round and clip

AI agent session

❯make a new table that takes the items table and rounds the price column to 2 decimal places

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `round(2)` rounds to that many decimal places.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["items"],
  output_tables=["items_rounded"],
)
def round_price(items: TableFrameSpec) -> TableFrameSpec:
  expr = col("price").round(2)  # Round to 2 decimal places
  return items.with_columns(expr)
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/items\_rounded is live — price to 2 decimal places:

```
┌────────┬───────┐
│  item  │ price │
├────────┼───────┤
│ widget │ 19.99 │
├────────┼───────┤
│ gadget │ 4.2   │
└────────┴───────┘
```

Transformed tables

items

| item | price |
| --- | --- |
| widget | 19.9876 |
| gadget | 4.201 |

2 rows

items\_rounded

| item | price |
| --- | --- |
| widget | 19.99 |
| gadget | 4.2 |

2 rows

AI agent session

❯make a new table that takes the readings table and rounds the value column to 3 significant figures

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `round_sig_figs(3)` counts significant digits rather than decimal places, so the number of decimals varies with magnitude.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["readings"],
  output_tables=["readings_rounded"],
)
def round_value(readings: TableFrameSpec) -> TableFrameSpec:
  expr = col("value").round_sig_figs(3)  # Round to 3 significant figures
  return readings.with_columns(expr)
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/readings\_rounded is live — 3 significant figures, so the decimal count differs per row:

```
┌──────────┐
│  value   │
├──────────┤
│ 1230     │
├──────────┤
│ 0.000988 │
└──────────┘
```

Transformed tables

readings

| value |
| --- |
| 1234.5678 |
| 0.00098765 |

2 rows

readings\_rounded

| value |
| --- |
| 1230 |
| 0.000988 |

2 rows

AI agent session

❯make a new table that takes the orders table and rounds the amount column down to a whole number

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `floor()` always goes down, which for a negative number means away from zero.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["orders"],
  output_tables=["orders_floored"],
)
def floor_amount(orders: TableFrameSpec) -> TableFrameSpec:
  expr = col("amount").floor()  # Round down
  return orders.with_columns(expr)
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/orders\_floored is live — each amount rounded down:

```
┌────────┐
│ amount │
├────────┤
│ 19     │
├────────┤
│ -4     │
└────────┘
```

Transformed tables

orders

| amount |
| --- |
| 19.7 |
| \-3.2 |

2 rows

orders\_floored

| amount |
| --- |
| 19 |
| \-4 |

2 rows

AI agent session

❯make a new table that takes the orders table and rounds the amount column up to a whole number

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `ceil()` always goes up.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["orders"],
  output_tables=["orders_ceiled"],
)
def ceil_amount(orders: TableFrameSpec) -> TableFrameSpec:
  expr = col("amount").ceil()  # Round up
  return orders.with_columns(expr)
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/orders\_ceiled is live — each amount rounded up:

```
┌────────┐
│ amount │
├────────┤
│ 20     │
├────────┤
│ -3     │
└────────┘
```

Transformed tables

orders

| amount |
| --- |
| 19.7 |
| \-3.2 |

2 rows

orders\_ceiled

| amount |
| --- |
| 20 |
| \-3 |

2 rows

AI agent session

❯make a new table that takes the results table and clamps the score column between 0 and 100

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `clip()` pulls anything outside the bounds to the nearest bound rather than dropping the row.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["results"],
  output_tables=["results_clipped"],
)
def clip_score(results: TableFrameSpec) -> TableFrameSpec:
  expr = col("score").clip(lower_bound=0, upper_bound=100)
  return results.with_columns(expr)
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/results\_clipped is live — values outside 0 to 100 pulled to the bound:

```
┌───────┐
│ score │
├───────┤
│ 100   │
├───────┤
│ 0     │
├───────┤
│ 73    │
└───────┘
```

Transformed tables

results

| score |
| --- |
| 142 |
| \-8 |
| 73 |

3 rows

results\_clipped

| score |
| --- |
| 100 |
| 0 |
| 73 |

3 rows

## Powers, roots and logs

AI agent session

❯make a new table that takes the readings table and takes the absolute value of the change column

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `abs()` drops the sign.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["readings"],
  output_tables=["readings_absolute"],
)
def abs_change(readings: TableFrameSpec) -> TableFrameSpec:
  expr = col("change").abs()
  return readings.with_columns(expr)
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/readings\_absolute is live — the sign dropped:

```
┌────────┐
│ change │
├────────┤
│ 4.5    │
├────────┤
│ 2      │
└────────┘
```

Transformed tables

readings

| change |
| --- |
| \-4.5 |
| 2 |

2 rows

readings\_absolute

| change |
| --- |
| 4.5 |
| 2 |

2 rows

AI agent session

❯make a new table that takes the readings table and takes the sign of the value column

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `sign()` returns -1, 0 or 1 rather than the value itself.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["readings"],
  output_tables=["readings_signs"],
)
def sign_value(readings: TableFrameSpec) -> TableFrameSpec:
  expr = col("value").sign()  # Returns -1, 0, or 1
  return readings.with_columns(expr)
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/readings\_signs is live — -1, 0 or 1 per row:

```
┌───────┐
│ value │
├───────┤
│ -1    │
├───────┤
│ 0     │
├───────┤
│ 1     │
└───────┘
```

Transformed tables

readings

| value |
| --- |
| \-4 |
| 0 |
| 7 |

3 rows

readings\_signs

| value |
| --- |
| \-1 |
| 0 |
| 1 |

3 rows

AI agent session

❯make a new table that takes the readings table and negates the value column

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `neg()` flips the sign of every value.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["readings"],
  output_tables=["readings_negated"],
)
def neg_value(readings: TableFrameSpec) -> TableFrameSpec:
  expr = col("value").neg()  # Negate
  return readings.with_columns(expr)
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/readings\_negated is live — every sign flipped:

```
┌───────┐
│ value │
├───────┤
│ 4     │
├───────┤
│ -7    │
└───────┘
```

Transformed tables

readings

| value |
| --- |
| \-4 |
| 7 |

2 rows

readings\_negated

| value |
| --- |
| 4 |
| \-7 |

2 rows

AI agent session

❯make a new table that takes the values table and squares the x column

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `pow(2)` raises the column to that power.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["values"],
  output_tables=["values_squared"],
)
def square_x(values: TableFrameSpec) -> TableFrameSpec:
  expr = col("x").pow(2)  # Square
  return values.with_columns(expr)
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/values\_squared is live — each value squared:

```
┌─────┐
│  x  │
├─────┤
│ 64  │
├─────┤
│ 729 │
└─────┘
```

Transformed tables

values

| x |
| --- |
| 8 |
| 27 |

2 rows

values\_squared

| x |
| --- |
| 64 |
| 729 |

2 rows

AI agent session

❯make a new table that takes the values table and takes the square root of the x column

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `sqrt()`. A negative input gives NaN rather than an error, so a `filter` or a `clip` first is worth considering.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["values"],
  output_tables=["values_rooted"],
)
def sqrt_x(values: TableFrameSpec) -> TableFrameSpec:
  expr = col("x").sqrt()  # Square root
  return values.with_columns(expr)
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/values\_rooted is live — the square root per row:

```
┌────────┐
│   x    │
├────────┤
│ 3      │
├────────┤
│ 1.4142 │
└────────┘
```

Transformed tables

values

| x |
| --- |
| 9 |
| 2 |

2 rows

values\_rooted

| x |
| --- |
| 3 |
| 1.4142 |

2 rows

AI agent session

❯make a new table that takes the values table and takes the cube root of the x column

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `cbrt()`, which unlike sqrt is defined for negative inputs.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["values"],
  output_tables=["values_rooted"],
)
def cbrt_x(values: TableFrameSpec) -> TableFrameSpec:
  expr = col("x").cbrt()  # Cube root
  return values.with_columns(expr)
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/values\_rooted is live — the cube root per row:

```
┌───┐
│ x │
├───┤
│ 3 │
├───┤
│ 2 │
└───┘
```

Transformed tables

values

| x |
| --- |
| 27 |
| 8 |

2 rows

values\_rooted

| x |
| --- |
| 3 |
| 2 |

2 rows

AI agent session

❯make a new table that takes the values table and takes the natural log of the x column

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `log()` with no argument is the natural log, base e.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["values"],
  output_tables=["values_logged"],
)
def log_x(values: TableFrameSpec) -> TableFrameSpec:
  expr = col("x").log()  # Natural logarithm
  return values.with_columns(expr)
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/values\_logged is live — the natural log per row:

```
┌────────┐
│   x    │
├────────┤
│ 0      │
├────────┤
│ 2.3026 │
└────────┘
```

Transformed tables

values

| x |
| --- |
| 1 |
| 10 |

2 rows

values\_logged

| x |
| --- |
| 0 |
| 2.3026 |

2 rows

AI agent session

❯make a new table that takes the values table and takes the base-10 log of the x column

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `log10()`, which is the one you want for orders of magnitude.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["values"],
  output_tables=["values_logged"],
)
def log10_x(values: TableFrameSpec) -> TableFrameSpec:
  expr = col("x").log10()  # Base-10 logarithm
  return values.with_columns(expr)
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/values\_logged is live — the base-10 log per row:

```
┌───┐
│ x │
├───┤
│ 0 │
├───┤
│ 1 │
└───┘
```

Transformed tables

values

| x |
| --- |
| 1 |
| 10 |

2 rows

values\_logged

| x |
| --- |
| 0 |
| 1 |

2 rows

AI agent session

❯make a new table that takes the values table and takes the log of 1 plus the x column

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `log1p()` rather than log(1 + x). It keeps precision when x is very small, where the addition would lose it.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["values"],
  output_tables=["values_logged"],
)
def log1p_x(values: TableFrameSpec) -> TableFrameSpec:
  expr = col("x").log1p()  # log(1 + x)
  return values.with_columns(expr)
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/values\_logged is live — log(1 + x) per row:

```
┌────────┐
│   x    │
├────────┤
│ 0      │
├────────┤
│ 0.6931 │
└────────┘
```

Transformed tables

values

| x |
| --- |
| 0 |
| 1 |

2 rows

values\_logged

| x |
| --- |
| 0 |
| 0.6931 |

2 rows

AI agent session

❯make a new table that takes the values table and raises e to the power of the x column

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `exp()`, the inverse of `log()`.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["values"],
  output_tables=["values_exponentiated"],
)
def exp_x(values: TableFrameSpec) -> TableFrameSpec:
  expr = col("x").exp()  # e^x
  return values.with_columns(expr)
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/values\_exponentiated is live — e raised to each value:

```
┌────────┐
│   x    │
├────────┤
│ 1      │
├────────┤
│ 2.7183 │
└────────┘
```

Transformed tables

values

| x |
| --- |
| 0 |
| 1 |

2 rows

values\_exponentiated

| x |
| --- |
| 1 |
| 2.7183 |

2 rows

## Trigonometry

AI agent session

❯make a new table that takes the readings table and takes the sine of the angle column

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `sin()`. The input is read in radians, so use `radians()` first if the column holds degrees.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["readings"],
  output_tables=["readings_sine"],
)
def sin_angle(readings: TableFrameSpec) -> TableFrameSpec:
  expr = col("angle").sin()
  return readings.with_columns(expr)
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/readings\_sine is live — the sine of each angle:

```
┌────────┐
│ angle  │
├────────┤
│ 0      │
├────────┤
│ 0.8415 │
└────────┘
```

Transformed tables

readings

| angle |
| --- |
| 0 |
| 1 |

2 rows

readings\_sine

| angle |
| --- |
| 0 |
| 0.8415 |

2 rows

AI agent session

❯make a new table that takes the readings table and takes the cosine of the angle column

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `cos()`, also in radians.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["readings"],
  output_tables=["readings_cosine"],
)
def cos_angle(readings: TableFrameSpec) -> TableFrameSpec:
  expr = col("angle").cos()
  return readings.with_columns(expr)
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/readings\_cosine is live — the cosine of each angle:

```
┌────────┐
│ angle  │
├────────┤
│ 1      │
├────────┤
│ 0.5403 │
└────────┘
```

Transformed tables

readings

| angle |
| --- |
| 0 |
| 1 |

2 rows

readings\_cosine

| angle |
| --- |
| 1 |
| 0.5403 |

2 rows

AI agent session

❯make a new table that takes the readings table and takes the tangent of the angle column

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `tan()`, in radians.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["readings"],
  output_tables=["readings_tangent"],
)
def tan_angle(readings: TableFrameSpec) -> TableFrameSpec:
  expr = col("angle").tan()
  return readings.with_columns(expr)
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/readings\_tangent is live — the tangent of each angle:

```
┌────────┐
│ angle  │
├────────┤
│ 0      │
├────────┤
│ 1.5574 │
└────────┘
```

Transformed tables

readings

| angle |
| --- |
| 0 |
| 1 |

2 rows

readings\_tangent

| angle |
| --- |
| 0 |
| 1.5574 |

2 rows

AI agent session

❯make a new table that takes the readings table and takes the cotangent of the angle column

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `cot()`, the reciprocal of tan.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["readings"],
  output_tables=["readings_cotangent"],
)
def cot_angle(readings: TableFrameSpec) -> TableFrameSpec:
  expr = col("angle").cot()
  return readings.with_columns(expr)
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/readings\_cotangent is live — the cotangent of each angle:

```
┌─────────┐
│  angle  │
├─────────┤
│ 0.6421  │
├─────────┤
│ -0.4577 │
└─────────┘
```

Transformed tables

readings

| angle |
| --- |
| 1 |
| 2 |

2 rows

readings\_cotangent

| angle |
| --- |
| 0.6421 |
| \-0.4577 |

2 rows

AI agent session

❯make a new table that takes the readings table and takes the arcsine of the x column

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `arcsin()` returns radians, and its input has to be between -1 and 1.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["readings"],
  output_tables=["readings_arcsine"],
)
def arcsin_x(readings: TableFrameSpec) -> TableFrameSpec:
  expr = col("x").arcsin()
  return readings.with_columns(expr)
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/readings\_arcsine is live — the arcsine in radians:

```
┌────────┐
│   x    │
├────────┤
│ 0      │
├────────┤
│ 0.5236 │
└────────┘
```

Transformed tables

readings

| x |
| --- |
| 0 |
| 0.5 |

2 rows

readings\_arcsine

| x |
| --- |
| 0 |
| 0.5236 |

2 rows

AI agent session

❯make a new table that takes the readings table and takes the arccosine of the x column

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `arccos()`, same domain limit as arcsin.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["readings"],
  output_tables=["readings_arccosine"],
)
def arccos_x(readings: TableFrameSpec) -> TableFrameSpec:
  expr = col("x").arccos()
  return readings.with_columns(expr)
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/readings\_arccosine is live — the arccosine in radians:

```
┌────────┐
│   x    │
├────────┤
│ 1.5708 │
├────────┤
│ 1.0472 │
└────────┘
```

Transformed tables

readings

| x |
| --- |
| 0 |
| 0.5 |

2 rows

readings\_arccosine

| x |
| --- |
| 1.5708 |
| 1.0472 |

2 rows

AI agent session

❯make a new table that takes the readings table and takes the arctangent of the x column

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `arctan()`, which accepts any real input.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["readings"],
  output_tables=["readings_arctangent"],
)
def arctan_x(readings: TableFrameSpec) -> TableFrameSpec:
  expr = col("x").arctan()
  return readings.with_columns(expr)
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/readings\_arctangent is live — the arctangent in radians:

```
┌────────┐
│   x    │
├────────┤
│ 0      │
├────────┤
│ 0.4636 │
└────────┘
```

Transformed tables

readings

| x |
| --- |
| 0 |
| 0.5 |

2 rows

readings\_arctangent

| x |
| --- |
| 0 |
| 0.4636 |

2 rows

AI agent session

❯make a new table that takes the readings table and takes the hyperbolic sine of the x column

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `sinh()`, the hyperbolic form rather than the circular one.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["readings"],
  output_tables=["readings_hyperbolic"],
)
def sinh_x(readings: TableFrameSpec) -> TableFrameSpec:
  expr = col("x").sinh()
  return readings.with_columns(expr)
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/readings\_hyperbolic is live — the hyperbolic sine:

```
┌────────┐
│   x    │
├────────┤
│ 0      │
├────────┤
│ 0.5211 │
└────────┘
```

Transformed tables

readings

| x |
| --- |
| 0 |
| 0.5 |

2 rows

readings\_hyperbolic

| x |
| --- |
| 0 |
| 0.5211 |

2 rows

AI agent session

❯make a new table that takes the readings table and takes the hyperbolic cosine of the x column

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `cosh()`.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["readings"],
  output_tables=["readings_hyperbolic"],
)
def cosh_x(readings: TableFrameSpec) -> TableFrameSpec:
  expr = col("x").cosh()
  return readings.with_columns(expr)
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/readings\_hyperbolic is live — the hyperbolic cosine:

```
┌────────┐
│   x    │
├────────┤
│ 1      │
├────────┤
│ 1.1276 │
└────────┘
```

Transformed tables

readings

| x |
| --- |
| 0 |
| 0.5 |

2 rows

readings\_hyperbolic

| x |
| --- |
| 1 |
| 1.1276 |

2 rows

AI agent session

❯make a new table that takes the readings table and takes the hyperbolic tangent of the x column

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `tanh()`, which flattens any input into the range -1 to 1.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["readings"],
  output_tables=["readings_hyperbolic"],
)
def tanh_x(readings: TableFrameSpec) -> TableFrameSpec:
  expr = col("x").tanh()
  return readings.with_columns(expr)
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/readings\_hyperbolic is live — the hyperbolic tangent:

```
┌────────┐
│   x    │
├────────┤
│ 0      │
├────────┤
│ 0.4621 │
└────────┘
```

Transformed tables

readings

| x |
| --- |
| 0 |
| 0.5 |

2 rows

readings\_hyperbolic

| x |
| --- |
| 0 |
| 0.4621 |

2 rows

AI agent session

❯make a new table that takes the readings table and converts the degrees column to radians

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `radians()`. Every trig function here takes radians, so this is usually the step before them.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["readings"],
  output_tables=["readings_radians"],
)
def to_radians(readings: TableFrameSpec) -> TableFrameSpec:
  expr = col("degrees").radians()  # Degrees to radians
  return readings.with_columns(expr)
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/readings\_radians is live — degrees converted to radians:

```
┌─────────┐
│ degrees │
├─────────┤
│ 3.1416  │
├─────────┤
│ 1.5708  │
└─────────┘
```

Transformed tables

readings

| degrees |
| --- |
| 180 |
| 90 |

2 rows

readings\_radians

| degrees |
| --- |
| 3.1416 |
| 1.5708 |

2 rows

AI agent session

❯make a new table that takes the readings table and converts the radians column to degrees

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `degrees()`, the conversion back for output.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["readings"],
  output_tables=["readings_degrees"],
)
def to_degrees(readings: TableFrameSpec) -> TableFrameSpec:
  expr = col("radians").degrees()  # Radians to degrees
  return readings.with_columns(expr)
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/readings\_degrees is live — radians converted to degrees:

```
┌─────────┐
│ radians │
├─────────┤
│ 180     │
├─────────┤
│ 90.0002 │
└─────────┘
```

Transformed tables

readings

| radians |
| --- |
| 3.14159 |
| 1.5708 |

2 rows

readings\_degrees

| radians |
| --- |
| 180 |
| 90.0002 |

2 rows

## Compare with earlier rows

AI agent session

❯make a new table that takes the readings table and takes the change in the value column from the previous row

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `diff()` compares each row with the one before it, so the first row has no predecessor and comes out null. It reads the table in its current order.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["readings"],
  output_tables=["readings_delta"],
)
def row_delta(readings: TableFrameSpec) -> TableFrameSpec:
  expr = col("value").diff()  # Difference from previous row
  return readings.with_columns(expr)
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/readings\_delta is live — the change from the previous row, null on the first:

```
┌───────┐
│ value │
├───────┤
│ null  │
├───────┤
│ 3     │
├───────┤
│ -4    │
└───────┘
```

Transformed tables

readings

| value |
| --- |
| 10 |
| 13 |
| 9 |

3 rows

readings\_delta

| value |
| --- |
| null |
| 3 |
| \-4 |

3 rows

AI agent session

❯make a new table that takes the readings table and takes the change in the value column from 2 rows back

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `diff(n=2)` looks two rows back, so the first two rows come out null.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["readings"],
  output_tables=["readings_delta_2"],
)
def row_delta_2(readings: TableFrameSpec) -> TableFrameSpec:
  expr = col("value").diff(n=2)  # Difference from 2 rows ago
  return readings.with_columns(expr)
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/readings\_delta\_2 is live — the change from 2 rows back:

```
┌───────┐
│ value │
├───────┤
│ null  │
├───────┤
│ null  │
├───────┤
│ -1    │
└───────┘
```

Transformed tables

readings

| value |
| --- |
| 10 |
| 13 |
| 9 |

3 rows

readings\_delta\_2

| value |
| --- |
| null |
| null |
| \-1 |

3 rows

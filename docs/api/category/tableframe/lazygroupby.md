# LazyGroupBy

> Pending group-by over a `TableFrame`, produced by `group_by`.

Source: https://docs.tabsdata.com/api/category/tableframe/lazygroupby

class

```python
class LazyGroupBy(lgb, parent, by)
```

**Categories:** aggregation

Pending group-by over a [`TableFrame`](https://docs.tabsdata.com/api/category/tableframe/tableframe/tableframe), produced by `group_by`.

Obtain one from `TableFrame.group_by(...)`, then call `.agg(...)` with reducing expressions such as `col("v").sum()`. The reduction shortcut methods (`sum` / `min` / `max` / `mean` / `median` / `n_unique`) reduce EVERY column and can fail on a table's hidden system columns; prefer `agg(col(...).<reduction>())`. `count` and `len` are always safe.

## Examples

```python
tf.group_by("g").agg(col("a").mean().alias("average"))
```

Wrap a grouper; created by `TableFrame.group_by`, not directly.

## Parameters

parameter

`lgb`

parameter

`parent`

parameter

`by`

## Methods

method

`agg`

```python
def agg(
    *aggs: IntoExpr | Iterable[IntoExpr] = (),
    **named_aggs: IntoExpr = {},
) -> TableFrame
```

Reduce each group to one row using the given expressions.

Each expression is a column reduction -- typically `col(name)` plus a reducer and an `alias`. The result has one row per group: the group key column(s) followed by the aggregated columns.

**Parameters:**

parameter

`*aggs`IntoExpr | [Iterable](https://docs.python.org/3/library/typing.html#typing.Iterable)\[IntoExpr\] ([int](https://docs.python.org/3/library/functions.html#int) | [float](https://docs.python.org/3/library/functions.html#float) | [Decimal](https://docs.tabsdata.com/api/module/tabsdatak-tableframe-datatypes#tabsdatak.tableframe.datatypes.Decimal) | [date](https://docs.python.org/3/library/datetime.html#datetime.date) | [time](https://docs.python.org/3/library/datetime.html#datetime.time) | [datetime](https://docs.python.org/3/library/datetime.html#datetime.datetime) | [timedelta](https://docs.python.org/3/library/datetime.html#datetime.timedelta) | [str](https://docs.python.org/3/library/stdtypes.html#str) | [bool](https://docs.python.org/3/library/functions.html#bool) | [bytes](https://docs.python.org/3/library/stdtypes.html#bytes) | [list](https://docs.python.org/3/library/stdtypes.html#list)\[[Any](https://docs.python.org/3/library/typing.html#typing.Any)\] | [Expr](https://docs.tabsdata.com/api/category/tableframe/tableframe/expr) | [str](https://docs.python.org/3/library/stdtypes.html#str) | None | Iterable\[[int](https://docs.python.org/3/library/functions.html#int) | [float](https://docs.python.org/3/library/functions.html#float) | [Decimal](https://docs.tabsdata.com/api/module/tabsdatak-tableframe-datatypes#tabsdatak.tableframe.datatypes.Decimal) | [date](https://docs.python.org/3/library/datetime.html#datetime.date) | [time](https://docs.python.org/3/library/datetime.html#datetime.time) | [datetime](https://docs.python.org/3/library/datetime.html#datetime.datetime) | [timedelta](https://docs.python.org/3/library/datetime.html#datetime.timedelta) | [str](https://docs.python.org/3/library/stdtypes.html#str) | [bool](https://docs.python.org/3/library/functions.html#bool) | [bytes](https://docs.python.org/3/library/stdtypes.html#bytes) | [list](https://docs.python.org/3/library/stdtypes.html#list)\[[Any](https://docs.python.org/3/library/typing.html#typing.Any)\] | [Expr](https://docs.tabsdata.com/api/category/tableframe/tableframe/expr) | [str](https://docs.python.org/3/library/stdtypes.html#str) | None\])

Aggregation expressions to compute per group.

parameter

`**named_aggs`IntoExpr ([int](https://docs.python.org/3/library/functions.html#int) | [float](https://docs.python.org/3/library/functions.html#float) | [Decimal](https://docs.tabsdata.com/api/module/tabsdatak-tableframe-datatypes#tabsdatak.tableframe.datatypes.Decimal) | [date](https://docs.python.org/3/library/datetime.html#datetime.date) | [time](https://docs.python.org/3/library/datetime.html#datetime.time) | [datetime](https://docs.python.org/3/library/datetime.html#datetime.datetime) | [timedelta](https://docs.python.org/3/library/datetime.html#datetime.timedelta) | [str](https://docs.python.org/3/library/stdtypes.html#str) | [bool](https://docs.python.org/3/library/functions.html#bool) | [bytes](https://docs.python.org/3/library/stdtypes.html#bytes) | [list](https://docs.python.org/3/library/stdtypes.html#list)\[[Any](https://docs.python.org/3/library/typing.html#typing.Any)\] | [Expr](https://docs.tabsdata.com/api/category/tableframe/tableframe/expr) | [str](https://docs.python.org/3/library/stdtypes.html#str) | None)

Aggregation expressions as keyword arguments, where the keyword names the output column.

**Example:**

```python
tf.group_by("k").agg(col("v").sum().alias("s"))
tf.group_by("k").agg(col("v").mean().alias("m"))
```

method

`len`

```python
def len(name: str | None = None) -> TableFrame
```

Count the rows in each group.

Safe on any [`TableFrame`](https://docs.tabsdata.com/api/category/tableframe/tableframe/tableframe) (it counts rows, not column values).

**Parameters:**

parameter

`name`[str](https://docs.python.org/3/builtins/stdtypes.html#str) | None

Name for the count column (default `"len"`).

**Example:**

```python
tf.group_by("g").len()
```

Name the output column to keep it distinct from the data:

```python
tf.group_by("g").len("rows")
```

method

`max`

```python
def max() -> TableFrame
```

Take the maximum of each non-key column within each group.

Reduces EVERY column; may fail on a table's hidden system columns through storage. Prefer `agg(col(...).max())`.

**Example:**

```python
tf.group_by("g").agg(col("a").max().alias("largest"))
```

method

`mean`

```python
def mean() -> TableFrame
```

Average each non-key column within each group.

Reduces EVERY column; may fail on a table's hidden system columns through storage. Prefer `agg(col(...).mean())`.

**Example:**

```python
tf.group_by("g").agg(col("a").mean().alias("average"))
```

method

`median`

```python
def median() -> TableFrame
```

Take the median of each non-key column within each group.

Reduces EVERY column; may fail on a table's hidden system columns through storage. Prefer `agg(col(...).median())`.

**Example:**

```python
tf.group_by("g").agg(col("a").median().alias("middle"))
```

method

`min`

```python
def min() -> TableFrame
```

Take the minimum of each non-key column within each group.

Reduces EVERY column; may fail on a table's hidden system columns through storage. Prefer `agg(col(...).min())`.

**Example:**

```python
tf.group_by("g").agg(col("a").min().alias("smallest"))
```

method

`n_unique`

```python
def n_unique() -> TableFrame
```

Count the distinct values of each non-key column within each group.

Reduces EVERY column; may fail on a table's hidden system columns through storage. Prefer `agg(col(...).n_unique())`.

**Example:**

```python
tf.group_by("g").agg(col("a").n_unique().alias("distinct"))
```

method

`sum`

```python
def sum() -> TableFrame
```

Sum each non-key column within each group.

Reduces EVERY column; may fail on a table's hidden system columns through storage. Prefer `agg(col(...).sum())`.

**Example:**

```python
tf.group_by("g").agg(col("a").sum().alias("total"))
```

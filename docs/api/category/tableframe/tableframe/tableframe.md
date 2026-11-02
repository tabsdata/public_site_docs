# TableFrame

> A lazy, immutable tabular frame -- Tabsdata's wrapper over polars `LazyFrame`.

Source: https://docs.tabsdata.com/api/category/tableframe/tableframe/tableframe

class

```python
class TableFrame
```

Bases: `EngineFrame`

**Categories:** tableframe

A lazy, immutable tabular frame -- Tabsdata's wrapper over polars `LazyFrame`.

Every operation returns a new [`TableFrame`](https://docs.tabsdata.com/api/category/tableframe/tableframe/tableframe) without mutating the input. Instances arrive as arguments (and are returned) in `@publisher` / `@transformer` / `@subscriber` functions; build one directly with `TableFrame.from_polars` / `from_pandas` / `from_dict` / `empty`. Reference columns with [`col`](https://docs.tabsdata.com/api/category/tableframe/projection/col) and constants with [`lit`](https://docs.tabsdata.com/api/category/tableframe/lit) (both from `tabsdatak.tableframe.functions`).

## Examples

```python
tf = TableFrame.from_dict({"g": ["x", "y", "x"], "v": [1, 2, 3]})
tf.filter(col("v") > 1).group_by("g").agg(col("v").sum().alias("total"))
```

## Properties

property

`columns`[list](https://docs.python.org/3/builtins/stdtypes.html#list)\[[str](https://docs.python.org/3/builtins/stdtypes.html#str)\]

Names of this [`TableFrame`](https://docs.tabsdata.com/api/category/tableframe/tableframe/tableframe)'s columns, in column order.

#VERIFY: may expose hidden `$TD.*` system columns; the old API filtered to user columns only.

property

`dtypes`[list](https://docs.python.org/3/builtins/stdtypes.html#list)\[[DataType](https://docs.tabsdata.com/api/module/tabsdatak-tableframe-datatypes#tabsdatak.tableframe.datatypes.DataType)\]

Data type of each column, in column order.

#VERIFY: may expose hidden `$TD.*` system columns; the old API filtered to user columns only.

property

`schema`[Schema](https://docs.tabsdata.com/api/category/tableframe/schema)

Ordered mapping of column name to data type, as a [`Schema`](https://docs.tabsdata.com/api/category/tableframe/schema).

#VERIFY: may expose hidden `$TD.*` system columns; the old API filtered to user columns only.

property

`width`[int](https://docs.python.org/3/builtins/functions.html#int)

Number of columns in this [`TableFrame`](https://docs.tabsdata.com/api/category/tableframe/tableframe/tableframe).

#VERIFY: may count hidden `$TD.*` system columns; the old API filtered to user columns only.

## Methods

method

`explain`

```python
def explain(
    *,
    format: ExplainFormat = 'plain',
    optimized: bool = True,
    type_coercion: bool = True,
    predicate_pushdown: bool = True,
    projection_pushdown: bool = True,
    simplify_expression: bool = True,
    slice_pushdown: bool = True,
    comm_subplan_elim: bool = True,
    comm_subexpr_elim: bool = True,
    cluster_with_columns: bool = True,
    collapse_joins: bool = True,
    streaming: bool = False,
    engine: EngineType = 'auto',
    tree_format: bool | None = None,
    optimizations: Any = ...,
) -> str
```

Return the query plan of this [`TableFrame`](https://docs.tabsdata.com/api/category/tableframe/tableframe/tableframe) as text.

The remaining boolean flags each toggle one query-plan optimization (predicate/projection pushdown, common-subplan elimination, ...); leave them at their defaults unless diagnosing the plan.

**Parameters:**

parameter

`format`ExplainFormat (Literal\['plain', 'tree'\])

`"plain"` or `"tree"` rendering.

parameter

`optimized`[bool](https://docs.python.org/3/builtins/functions.html#bool)

Show the optimized plan (default) rather than the raw logical plan.

parameter

`type_coercion`[bool](https://docs.python.org/3/builtins/functions.html#bool)

parameter

`predicate_pushdown`[bool](https://docs.python.org/3/builtins/functions.html#bool)

parameter

`projection_pushdown`[bool](https://docs.python.org/3/builtins/functions.html#bool)

parameter

`simplify_expression`[bool](https://docs.python.org/3/builtins/functions.html#bool)

parameter

`slice_pushdown`[bool](https://docs.python.org/3/builtins/functions.html#bool)

parameter

`comm_subplan_elim`[bool](https://docs.python.org/3/builtins/functions.html#bool)

parameter

`comm_subexpr_elim`[bool](https://docs.python.org/3/builtins/functions.html#bool)

parameter

`cluster_with_columns`[bool](https://docs.python.org/3/builtins/functions.html#bool)

parameter

`collapse_joins`[bool](https://docs.python.org/3/builtins/functions.html#bool)

parameter

`streaming`[bool](https://docs.python.org/3/builtins/functions.html#bool)

Show the plan for streaming execution.

parameter

`engine`EngineType (Literal\['auto', 'in-memory', 'streaming', 'gpu'\])

Target engine -- `"auto"`, `"in-memory"`, `"streaming"` or `"gpu"`.

parameter

`tree_format`[bool](https://docs.python.org/3/builtins/functions.html#bool) | None

parameter

`optimizations`[Any](https://docs.python.org/3/library/typing.html#typing.Any)

**Example:**

```python
tf.filter(col("a") > 2).explain()
```

The tree rendering is easier to read for a deep plan:

```python
tf.explain(format="tree")
```

method

`show_graph`

```python
def show_graph(
    *,
    optimized: bool = True,
    show: bool = True,
    output_path: str | Path | None = None,
    raw_output: bool = False,
    figsize: tuple[float, float] = (16.0, 12.0),
    type_coercion: bool = True,
    _type_check: bool = True,
    predicate_pushdown: bool = True,
    projection_pushdown: bool = True,
    simplify_expression: bool = True,
    slice_pushdown: bool = True,
    comm_subplan_elim: bool = True,
    comm_subexpr_elim: bool = True,
    cluster_with_columns: bool = True,
    collapse_joins: bool = True,
    engine: EngineType = 'auto',
    plan_stage: PlanStage | None = None,
    _check_order: bool = True,
    optimizations: Any = ...,
) -> str | None
```

Render the query plan of this [`TableFrame`](https://docs.tabsdata.com/api/category/tableframe/tableframe/tableframe) as a graph.

The remaining boolean flags toggle individual query-plan optimizations; leave them at their defaults unless diagnosing the plan.

**Parameters:**

parameter

`optimized`[bool](https://docs.python.org/3/builtins/functions.html#bool)

Graph the optimized plan (default) rather than the raw logical plan.

parameter

`show`[bool](https://docs.python.org/3/builtins/functions.html#bool)

Display the graph (needs Graphviz); set `False` to only return or write it.

parameter

`output_path`[str](https://docs.python.org/3/builtins/stdtypes.html#str) | [Path](https://docs.python.org/3/library/pathlib.html#pathlib.Path) | None

If given, write the rendered graph to this path.

parameter

`raw_output`[bool](https://docs.python.org/3/builtins/functions.html#bool)

Return the raw DOT string instead of rendering.

parameter

`figsize`[tuple](https://docs.python.org/3/builtins/stdtypes.html#tuple)\[[float](https://docs.python.org/3/builtins/functions.html#float), [float](https://docs.python.org/3/builtins/functions.html#float)\]

Figure size as `(width, height)` in inches.

parameter

`type_coercion`[bool](https://docs.python.org/3/builtins/functions.html#bool)

parameter

`_type_check`[bool](https://docs.python.org/3/builtins/functions.html#bool)

parameter

`predicate_pushdown`[bool](https://docs.python.org/3/builtins/functions.html#bool)

parameter

`projection_pushdown`[bool](https://docs.python.org/3/builtins/functions.html#bool)

parameter

`simplify_expression`[bool](https://docs.python.org/3/builtins/functions.html#bool)

parameter

`slice_pushdown`[bool](https://docs.python.org/3/builtins/functions.html#bool)

parameter

`comm_subplan_elim`[bool](https://docs.python.org/3/builtins/functions.html#bool)

parameter

`comm_subexpr_elim`[bool](https://docs.python.org/3/builtins/functions.html#bool)

parameter

`cluster_with_columns`[bool](https://docs.python.org/3/builtins/functions.html#bool)

parameter

`collapse_joins`[bool](https://docs.python.org/3/builtins/functions.html#bool)

parameter

`engine`EngineType (Literal\['auto', 'in-memory', 'streaming', 'gpu'\])

Engine whose plan is graphed; `"auto"` by default.

parameter

`plan_stage`PlanStage | None (Literal\['ir', 'physical'\] | None)

Plan stage to graph, `"ir"` or `"physical"`. Only the streaming engine has a separate physical stage. When omitted it graphs the `"ir"` stage and polars warns that the default becomes `"physical"` in Polars 2.0; pass `plan_stage="ir"` to keep the current output without the warning.

parameter

`_check_order`[bool](https://docs.python.org/3/builtins/functions.html#bool)

parameter

`optimizations`[Any](https://docs.python.org/3/library/typing.html#typing.Any)

**Example:**

```python
tf.show_graph()  # opens the rendered plan; needs Graphviz
```

Skip the viewer and take the DOT source instead:

```python
tf.show_graph(show=False, raw_output=True)
```

method

`inspect`

```python
def inspect(fmt: str = '{}') -> TableFrame
```

Print this [`TableFrame`](https://docs.tabsdata.com/api/category/tableframe/tableframe/tableframe) mid-chain and pass it through unchanged.

Handy for debugging a chained pipeline: it returns the same [`TableFrame`](https://docs.tabsdata.com/api/category/tableframe/tableframe/tableframe) so it can sit between other operations.

**Parameters:**

parameter

`fmt`[str](https://docs.python.org/3/builtins/stdtypes.html#str)

Format string applied to the printed frame.

**Example:**

```python
tf.filter(col("a") > 1).inspect().select("a", "b")
```

method

`sort`

```python
def sort(
    by: IntoExpr | Iterable[IntoExpr],
    *more_by: IntoExpr = (),
    descending: bool | Sequence[bool] = False,
    nulls_last: bool | Sequence[bool] = False,
    maintain_order: bool = False,
    multithreaded: bool = True,
) -> TableFrame
```

Sort the rows by one or more columns or expressions.

**Parameters:**

parameter

`by`IntoExpr | [Iterable](https://docs.python.org/3/library/typing.html#typing.Iterable)\[IntoExpr\] ([int](https://docs.python.org/3/library/functions.html#int) | [float](https://docs.python.org/3/library/functions.html#float) | [Decimal](https://docs.tabsdata.com/api/module/tabsdatak-tableframe-datatypes#tabsdatak.tableframe.datatypes.Decimal) | [date](https://docs.python.org/3/library/datetime.html#datetime.date) | [time](https://docs.python.org/3/library/datetime.html#datetime.time) | [datetime](https://docs.python.org/3/library/datetime.html#datetime.datetime) | [timedelta](https://docs.python.org/3/library/datetime.html#datetime.timedelta) | [str](https://docs.python.org/3/library/stdtypes.html#str) | [bool](https://docs.python.org/3/library/functions.html#bool) | [bytes](https://docs.python.org/3/library/stdtypes.html#bytes) | [list](https://docs.python.org/3/library/stdtypes.html#list)\[[Any](https://docs.python.org/3/library/typing.html#typing.Any)\] | [Expr](https://docs.tabsdata.com/api/category/tableframe/tableframe/expr) | [str](https://docs.python.org/3/library/stdtypes.html#str) | None | Iterable\[[int](https://docs.python.org/3/library/functions.html#int) | [float](https://docs.python.org/3/library/functions.html#float) | [Decimal](https://docs.tabsdata.com/api/module/tabsdatak-tableframe-datatypes#tabsdatak.tableframe.datatypes.Decimal) | [date](https://docs.python.org/3/library/datetime.html#datetime.date) | [time](https://docs.python.org/3/library/datetime.html#datetime.time) | [datetime](https://docs.python.org/3/library/datetime.html#datetime.datetime) | [timedelta](https://docs.python.org/3/library/datetime.html#datetime.timedelta) | [str](https://docs.python.org/3/library/stdtypes.html#str) | [bool](https://docs.python.org/3/library/functions.html#bool) | [bytes](https://docs.python.org/3/library/stdtypes.html#bytes) | [list](https://docs.python.org/3/library/stdtypes.html#list)\[[Any](https://docs.python.org/3/library/typing.html#typing.Any)\] | [Expr](https://docs.tabsdata.com/api/category/tableframe/tableframe/expr) | [str](https://docs.python.org/3/library/stdtypes.html#str) | None\])

Column name(s) or expression(s) to sort by.

parameter

`*more_by`IntoExpr ([int](https://docs.python.org/3/library/functions.html#int) | [float](https://docs.python.org/3/library/functions.html#float) | [Decimal](https://docs.tabsdata.com/api/module/tabsdatak-tableframe-datatypes#tabsdatak.tableframe.datatypes.Decimal) | [date](https://docs.python.org/3/library/datetime.html#datetime.date) | [time](https://docs.python.org/3/library/datetime.html#datetime.time) | [datetime](https://docs.python.org/3/library/datetime.html#datetime.datetime) | [timedelta](https://docs.python.org/3/library/datetime.html#datetime.timedelta) | [str](https://docs.python.org/3/library/stdtypes.html#str) | [bool](https://docs.python.org/3/library/functions.html#bool) | [bytes](https://docs.python.org/3/library/stdtypes.html#bytes) | [list](https://docs.python.org/3/library/stdtypes.html#list)\[[Any](https://docs.python.org/3/library/typing.html#typing.Any)\] | [Expr](https://docs.tabsdata.com/api/category/tableframe/tableframe/expr) | [str](https://docs.python.org/3/library/stdtypes.html#str) | None)

Additional sort keys, as positional arguments.

parameter

`descending`[bool](https://docs.python.org/3/builtins/functions.html#bool) | [Sequence](https://docs.python.org/3/library/typing.html#typing.Sequence)\[[bool](https://docs.python.org/3/builtins/functions.html#bool)\]

Sort descending; a single bool, or one per sort key.

parameter

`nulls_last`[bool](https://docs.python.org/3/builtins/functions.html#bool) | [Sequence](https://docs.python.org/3/library/typing.html#typing.Sequence)\[[bool](https://docs.python.org/3/builtins/functions.html#bool)\]

Place nulls last; a single bool, or one per sort key.

parameter

`maintain_order`[bool](https://docs.python.org/3/builtins/functions.html#bool)

Keep the input order of tied rows.

parameter

`multithreaded`[bool](https://docs.python.org/3/builtins/functions.html#bool)

**Example:**

```python
tf.sort("k", descending=True)
tf.sort(["k", "n"], descending=[True, False])
```

method

`cast`

```python
def cast(
    dtypes: Mapping[ColumnNameOrSelector | PolarsDataType, PolarsDataType | PythonDataType] | PolarsDataType | Schema,
    *,
    strict: bool = True,
) -> TableFrame
```

Cast columns to new data types.

Data types come from `tabsdatak.tableframe.datatypes`.

**Parameters:**

parameter

`dtypes`[Mapping](https://docs.python.org/3/library/typing.html#typing.Mapping)\[ColumnNameOrSelector | PolarsDataType, PolarsDataType | PythonDataType\] | PolarsDataType | [Schema](https://docs.tabsdata.com/api/category/tableframe/schema) (Mapping\[[str](https://docs.python.org/3/library/stdtypes.html#str) | [Any](https://docs.python.org/3/library/typing.html#typing.Any) | DataType, DataType | [type](https://docs.python.org/3/library/functions.html#type)\[[int](https://docs.python.org/3/library/functions.html#int)\] | [type](https://docs.python.org/3/library/functions.html#type)\[[float](https://docs.python.org/3/library/functions.html#float)\] | [type](https://docs.python.org/3/library/functions.html#type)\[[bool](https://docs.python.org/3/library/functions.html#bool)\] | [type](https://docs.python.org/3/library/functions.html#type)\[[str](https://docs.python.org/3/library/stdtypes.html#str)\] | [type](https://docs.python.org/3/library/functions.html#type)\[[date](https://docs.python.org/3/library/datetime.html#datetime.date)\] | [type](https://docs.python.org/3/library/functions.html#type)\[[time](https://docs.python.org/3/library/datetime.html#datetime.time)\] | [type](https://docs.python.org/3/library/functions.html#type)\[[datetime](https://docs.python.org/3/library/datetime.html#datetime.datetime)\] | [type](https://docs.python.org/3/library/functions.html#type)\[[timedelta](https://docs.python.org/3/library/datetime.html#datetime.timedelta)\] | [type](https://docs.python.org/3/library/functions.html#type)\[[list](https://docs.python.org/3/library/stdtypes.html#list)\[[Any](https://docs.python.org/3/library/typing.html#typing.Any)\]\] | [type](https://docs.python.org/3/library/functions.html#type)\[[tuple](https://docs.python.org/3/library/stdtypes.html#tuple)\[[Any](https://docs.python.org/3/library/typing.html#typing.Any), ...\]\] | [type](https://docs.python.org/3/library/functions.html#type)\[[bytes](https://docs.python.org/3/library/stdtypes.html#bytes)\] | [type](https://docs.python.org/3/library/functions.html#type)\[[object](https://docs.python.org/3/library/functions.html#object)\] | [type](https://docs.python.org/3/library/functions.html#type)\[[Decimal](https://docs.tabsdata.com/api/module/tabsdatak-tableframe-datatypes#tabsdatak.tableframe.datatypes.Decimal)\] | [type](https://docs.python.org/3/library/functions.html#type)\[None\]\] | DataType | [Schema](https://docs.tabsdata.com/api/category/tableframe/schema))

A single data type applied to every column, a mapping of column (name or selector) to its target data type, or a [`Schema`](https://docs.tabsdata.com/api/category/tableframe/schema).

parameter

`strict`[bool](https://docs.python.org/3/builtins/functions.html#bool)

If `True` (default), raise when a value cannot be cast; if `False`, unconvertible values become null.

**Example:**

```python
tf.cast({"a": Float64, "b": String})
tf.cast({"id": Int8}, strict=False)
```

method

`clear`

```python
def clear(n: int = 0) -> TableFrame
```

Return a frame with the same schema but no data.

**Parameters:**

parameter

`n`[int](https://docs.python.org/3/builtins/functions.html#int)

Number of all-null rows to produce. `0` (default) yields a zero-row frame; a positive `n` yields `n` rows of nulls.

**Example:**

```python
tf.clear()
```

A positive `n` keeps the schema and yields that many all-null rows:

```python
tf.clear(3)
```

method

`filter`

```python
def filter(
    *predicates: IntoExprColumn | Iterable[IntoExprColumn] | bool | list[bool] = (),
    **constraints: Any = {},
) -> TableFrame
```

Keep only the rows matching every given predicate.

**Parameters:**

parameter

`*predicates`IntoExprColumn | [Iterable](https://docs.python.org/3/library/typing.html#typing.Iterable)\[IntoExprColumn\] | [bool](https://docs.python.org/3/builtins/functions.html#bool) | [list](https://docs.python.org/3/builtins/stdtypes.html#list)\[[bool](https://docs.python.org/3/builtins/functions.html#bool)\] ([Expr](https://docs.tabsdata.com/api/category/tableframe/tableframe/expr) | [str](https://docs.python.org/3/library/stdtypes.html#str) | Iterable\[[Expr](https://docs.tabsdata.com/api/category/tableframe/tableframe/expr) | [str](https://docs.python.org/3/library/stdtypes.html#str)\] | [bool](https://docs.python.org/3/library/functions.html#bool) | [list](https://docs.python.org/3/library/stdtypes.html#list)\[[bool](https://docs.python.org/3/library/functions.html#bool)\])

Boolean expressions; a row is kept only if it satisfies ALL of them (they are AND-ed together).

parameter

`**constraints`[Any](https://docs.python.org/3/library/typing.html#typing.Any)

Column-equality shortcuts as keyword arguments -- `filter(g="x")` means `filter(col("g") == "x")`.

**Example:**

```python
tf.filter(col("a") > 2)
tf.filter((col("a") > 1) & (col("a") < 5))
tf.filter(col("g").is_in(["x", "y"]))
tf.filter(g="x")
```

method

`select`

```python
def select(
    *exprs: IntoExpr | Iterable[IntoExpr] = (),
    **named_exprs: IntoExpr = {},
) -> TableFrame
```

Select and/or derive columns, dropping every other column.

**Parameters:**

parameter

`*exprs`IntoExpr | [Iterable](https://docs.python.org/3/library/typing.html#typing.Iterable)\[IntoExpr\] ([int](https://docs.python.org/3/library/functions.html#int) | [float](https://docs.python.org/3/library/functions.html#float) | [Decimal](https://docs.tabsdata.com/api/module/tabsdatak-tableframe-datatypes#tabsdatak.tableframe.datatypes.Decimal) | [date](https://docs.python.org/3/library/datetime.html#datetime.date) | [time](https://docs.python.org/3/library/datetime.html#datetime.time) | [datetime](https://docs.python.org/3/library/datetime.html#datetime.datetime) | [timedelta](https://docs.python.org/3/library/datetime.html#datetime.timedelta) | [str](https://docs.python.org/3/library/stdtypes.html#str) | [bool](https://docs.python.org/3/library/functions.html#bool) | [bytes](https://docs.python.org/3/library/stdtypes.html#bytes) | [list](https://docs.python.org/3/library/stdtypes.html#list)\[[Any](https://docs.python.org/3/library/typing.html#typing.Any)\] | [Expr](https://docs.tabsdata.com/api/category/tableframe/tableframe/expr) | [str](https://docs.python.org/3/library/stdtypes.html#str) | None | Iterable\[[int](https://docs.python.org/3/library/functions.html#int) | [float](https://docs.python.org/3/library/functions.html#float) | [Decimal](https://docs.tabsdata.com/api/module/tabsdatak-tableframe-datatypes#tabsdatak.tableframe.datatypes.Decimal) | [date](https://docs.python.org/3/library/datetime.html#datetime.date) | [time](https://docs.python.org/3/library/datetime.html#datetime.time) | [datetime](https://docs.python.org/3/library/datetime.html#datetime.datetime) | [timedelta](https://docs.python.org/3/library/datetime.html#datetime.timedelta) | [str](https://docs.python.org/3/library/stdtypes.html#str) | [bool](https://docs.python.org/3/library/functions.html#bool) | [bytes](https://docs.python.org/3/library/stdtypes.html#bytes) | [list](https://docs.python.org/3/library/stdtypes.html#list)\[[Any](https://docs.python.org/3/library/typing.html#typing.Any)\] | [Expr](https://docs.tabsdata.com/api/category/tableframe/tableframe/expr) | [str](https://docs.python.org/3/library/stdtypes.html#str) | None\])

Column names or expressions to keep; each expression becomes a column (name it with `Expr.alias`).

parameter

`**named_exprs`IntoExpr ([int](https://docs.python.org/3/library/functions.html#int) | [float](https://docs.python.org/3/library/functions.html#float) | [Decimal](https://docs.tabsdata.com/api/module/tabsdatak-tableframe-datatypes#tabsdatak.tableframe.datatypes.Decimal) | [date](https://docs.python.org/3/library/datetime.html#datetime.date) | [time](https://docs.python.org/3/library/datetime.html#datetime.time) | [datetime](https://docs.python.org/3/library/datetime.html#datetime.datetime) | [timedelta](https://docs.python.org/3/library/datetime.html#datetime.timedelta) | [str](https://docs.python.org/3/library/stdtypes.html#str) | [bool](https://docs.python.org/3/library/functions.html#bool) | [bytes](https://docs.python.org/3/library/stdtypes.html#bytes) | [list](https://docs.python.org/3/library/stdtypes.html#list)\[[Any](https://docs.python.org/3/library/typing.html#typing.Any)\] | [Expr](https://docs.tabsdata.com/api/category/tableframe/tableframe/expr) | [str](https://docs.python.org/3/library/stdtypes.html#str) | None)

Expressions as keyword arguments, where the keyword is the output column name.

**Example:**

```python
tf.select("a", "b")
tf.select((col("a") * 2).alias("a2"))
tf.select(a2=col("a") * 2)
```

method

`group_by`

```python
def group_by(
    *by: IntoExpr | Iterable[IntoExpr] = (),
    maintain_order: bool = False,
    **named_by: IntoExpr = {},
) -> LazyGroupBy
```

Group rows by one or more keys for aggregation.

Returns a [`LazyGroupBy`](https://docs.tabsdata.com/api/category/tableframe/lazygroupby); call `.agg(...)` on it with reducing expressions to produce one row per group. Prefer `agg(col(...).<reduction>())` over the [`LazyGroupBy`](https://docs.tabsdata.com/api/category/tableframe/lazygroupby) reduction shortcuts (see [`LazyGroupBy`](https://docs.tabsdata.com/api/category/tableframe/lazygroupby)).

**Parameters:**

parameter

`*by`IntoExpr | [Iterable](https://docs.python.org/3/library/typing.html#typing.Iterable)\[IntoExpr\] ([int](https://docs.python.org/3/library/functions.html#int) | [float](https://docs.python.org/3/library/functions.html#float) | [Decimal](https://docs.tabsdata.com/api/module/tabsdatak-tableframe-datatypes#tabsdatak.tableframe.datatypes.Decimal) | [date](https://docs.python.org/3/library/datetime.html#datetime.date) | [time](https://docs.python.org/3/library/datetime.html#datetime.time) | [datetime](https://docs.python.org/3/library/datetime.html#datetime.datetime) | [timedelta](https://docs.python.org/3/library/datetime.html#datetime.timedelta) | [str](https://docs.python.org/3/library/stdtypes.html#str) | [bool](https://docs.python.org/3/library/functions.html#bool) | [bytes](https://docs.python.org/3/library/stdtypes.html#bytes) | [list](https://docs.python.org/3/library/stdtypes.html#list)\[[Any](https://docs.python.org/3/library/typing.html#typing.Any)\] | [Expr](https://docs.tabsdata.com/api/category/tableframe/tableframe/expr) | [str](https://docs.python.org/3/library/stdtypes.html#str) | None | Iterable\[[int](https://docs.python.org/3/library/functions.html#int) | [float](https://docs.python.org/3/library/functions.html#float) | [Decimal](https://docs.tabsdata.com/api/module/tabsdatak-tableframe-datatypes#tabsdatak.tableframe.datatypes.Decimal) | [date](https://docs.python.org/3/library/datetime.html#datetime.date) | [time](https://docs.python.org/3/library/datetime.html#datetime.time) | [datetime](https://docs.python.org/3/library/datetime.html#datetime.datetime) | [timedelta](https://docs.python.org/3/library/datetime.html#datetime.timedelta) | [str](https://docs.python.org/3/library/stdtypes.html#str) | [bool](https://docs.python.org/3/library/functions.html#bool) | [bytes](https://docs.python.org/3/library/stdtypes.html#bytes) | [list](https://docs.python.org/3/library/stdtypes.html#list)\[[Any](https://docs.python.org/3/library/typing.html#typing.Any)\] | [Expr](https://docs.tabsdata.com/api/category/tableframe/tableframe/expr) | [str](https://docs.python.org/3/library/stdtypes.html#str) | None\])

Column name(s) or expression(s) to group by.

parameter

`maintain_order`[bool](https://docs.python.org/3/builtins/functions.html#bool)

Emit groups in the order they first appear.

parameter

`**named_by`IntoExpr ([int](https://docs.python.org/3/library/functions.html#int) | [float](https://docs.python.org/3/library/functions.html#float) | [Decimal](https://docs.tabsdata.com/api/module/tabsdatak-tableframe-datatypes#tabsdatak.tableframe.datatypes.Decimal) | [date](https://docs.python.org/3/library/datetime.html#datetime.date) | [time](https://docs.python.org/3/library/datetime.html#datetime.time) | [datetime](https://docs.python.org/3/library/datetime.html#datetime.datetime) | [timedelta](https://docs.python.org/3/library/datetime.html#datetime.timedelta) | [str](https://docs.python.org/3/library/stdtypes.html#str) | [bool](https://docs.python.org/3/library/functions.html#bool) | [bytes](https://docs.python.org/3/library/stdtypes.html#bytes) | [list](https://docs.python.org/3/library/stdtypes.html#list)\[[Any](https://docs.python.org/3/library/typing.html#typing.Any)\] | [Expr](https://docs.tabsdata.com/api/category/tableframe/tableframe/expr) | [str](https://docs.python.org/3/library/stdtypes.html#str) | None)

Grouping expressions as keyword arguments, where the keyword names the group column.

**Example:**

```python
tf.group_by("k").agg(col("v").sum().alias("s"))
```

method

`join`

```python
def join(
    other: TableFrame,
    on: str | Expr | Sequence[str | Expr] | None = None,
    how: JoinStrategy = 'inner',
    *,
    left_on: str | Expr | Sequence[str | Expr] | None = None,
    right_on: str | Expr | Sequence[str | Expr] | None = None,
    suffix: str = '_right',
) -> TableFrame
```

Join this [`TableFrame`](https://docs.tabsdata.com/api/category/tableframe/tableframe/tableframe) with another on one or more keys.

#MANUAL CHANGE POST GEN: dropped the generated params `validate`, `nulls_equal`, `coalesce`, `maintain_order`, `allow_parallel`, `force_parallel` -- the runtime does not accept them (TypeError).

**Parameters:**

parameter

`other`[TableFrame](https://docs.tabsdata.com/api/category/tableframe/tableframe/tableframe)

The right [`TableFrame`](https://docs.tabsdata.com/api/category/tableframe/tableframe/tableframe) to join with.

parameter

`on`[str](https://docs.python.org/3/builtins/stdtypes.html#str) | [Expr](https://docs.tabsdata.com/api/category/tableframe/tableframe/expr) | [Sequence](https://docs.python.org/3/library/typing.html#typing.Sequence)\[[str](https://docs.python.org/3/builtins/stdtypes.html#str) | [Expr](https://docs.tabsdata.com/api/category/tableframe/tableframe/expr)\] | None

Key column(s) present in BOTH frames. Use this OR `left_on`/`right_on`, never both; omit it for `how="cross"`.

parameter

`how`JoinStrategy (Literal\['inner', 'left', 'right', 'full', 'semi', 'anti', 'cross', 'outer'\])

Join strategy -- one of `"inner"`, `"left"`, `"right"`, `"full"` (a.k.a. `"outer"`), `"cross"`, `"semi"` or `"anti"`. `"semi"` keeps left rows that have a match, `"anti"` keeps those that do not, and `"cross"` is the cartesian product (takes no keys).

parameter

`left_on`[str](https://docs.python.org/3/builtins/stdtypes.html#str) | [Expr](https://docs.tabsdata.com/api/category/tableframe/tableframe/expr) | [Sequence](https://docs.python.org/3/library/typing.html#typing.Sequence)\[[str](https://docs.python.org/3/builtins/stdtypes.html#str) | [Expr](https://docs.tabsdata.com/api/category/tableframe/tableframe/expr)\] | None

Key column(s) on the left frame, paired positionally with `right_on` when the join keys have different names.

parameter

`right_on`[str](https://docs.python.org/3/builtins/stdtypes.html#str) | [Expr](https://docs.tabsdata.com/api/category/tableframe/tableframe/expr) | [Sequence](https://docs.python.org/3/library/typing.html#typing.Sequence)\[[str](https://docs.python.org/3/builtins/stdtypes.html#str) | [Expr](https://docs.tabsdata.com/api/category/tableframe/tableframe/expr)\] | None

Key column(s) on the right frame; use with `left_on`.

parameter

`suffix`[str](https://docs.python.org/3/builtins/stdtypes.html#str)

Suffix added to right-frame columns whose names collide with the left frame (default `"_right"`).

**Example:**

```python
left.join(right, on="id", how="inner")
left.join(right, left_on="id", right_on="rid")
left.join(right, how="cross")
```

method

`with_columns`

```python
def with_columns(
    *exprs: IntoExpr | Iterable[IntoExpr] = (),
    **named_exprs: IntoExpr = {},
) -> TableFrame
```

Add or replace columns, keeping all existing ones.

Like `select` but non-destructive: the given expressions are added, and any whose name matches an existing column replaces it in place.

**Parameters:**

parameter

`*exprs`IntoExpr | [Iterable](https://docs.python.org/3/library/typing.html#typing.Iterable)\[IntoExpr\] ([int](https://docs.python.org/3/library/functions.html#int) | [float](https://docs.python.org/3/library/functions.html#float) | [Decimal](https://docs.tabsdata.com/api/module/tabsdatak-tableframe-datatypes#tabsdatak.tableframe.datatypes.Decimal) | [date](https://docs.python.org/3/library/datetime.html#datetime.date) | [time](https://docs.python.org/3/library/datetime.html#datetime.time) | [datetime](https://docs.python.org/3/library/datetime.html#datetime.datetime) | [timedelta](https://docs.python.org/3/library/datetime.html#datetime.timedelta) | [str](https://docs.python.org/3/library/stdtypes.html#str) | [bool](https://docs.python.org/3/library/functions.html#bool) | [bytes](https://docs.python.org/3/library/stdtypes.html#bytes) | [list](https://docs.python.org/3/library/stdtypes.html#list)\[[Any](https://docs.python.org/3/library/typing.html#typing.Any)\] | [Expr](https://docs.tabsdata.com/api/category/tableframe/tableframe/expr) | [str](https://docs.python.org/3/library/stdtypes.html#str) | None | Iterable\[[int](https://docs.python.org/3/library/functions.html#int) | [float](https://docs.python.org/3/library/functions.html#float) | [Decimal](https://docs.tabsdata.com/api/module/tabsdatak-tableframe-datatypes#tabsdatak.tableframe.datatypes.Decimal) | [date](https://docs.python.org/3/library/datetime.html#datetime.date) | [time](https://docs.python.org/3/library/datetime.html#datetime.time) | [datetime](https://docs.python.org/3/library/datetime.html#datetime.datetime) | [timedelta](https://docs.python.org/3/library/datetime.html#datetime.timedelta) | [str](https://docs.python.org/3/library/stdtypes.html#str) | [bool](https://docs.python.org/3/library/functions.html#bool) | [bytes](https://docs.python.org/3/library/stdtypes.html#bytes) | [list](https://docs.python.org/3/library/stdtypes.html#list)\[[Any](https://docs.python.org/3/library/typing.html#typing.Any)\] | [Expr](https://docs.tabsdata.com/api/category/tableframe/tableframe/expr) | [str](https://docs.python.org/3/library/stdtypes.html#str) | None\])

Expressions to add; name each with `Expr.alias`.

parameter

`**named_exprs`IntoExpr ([int](https://docs.python.org/3/library/functions.html#int) | [float](https://docs.python.org/3/library/functions.html#float) | [Decimal](https://docs.tabsdata.com/api/module/tabsdatak-tableframe-datatypes#tabsdatak.tableframe.datatypes.Decimal) | [date](https://docs.python.org/3/library/datetime.html#datetime.date) | [time](https://docs.python.org/3/library/datetime.html#datetime.time) | [datetime](https://docs.python.org/3/library/datetime.html#datetime.datetime) | [timedelta](https://docs.python.org/3/library/datetime.html#datetime.timedelta) | [str](https://docs.python.org/3/library/stdtypes.html#str) | [bool](https://docs.python.org/3/library/functions.html#bool) | [bytes](https://docs.python.org/3/library/stdtypes.html#bytes) | [list](https://docs.python.org/3/library/stdtypes.html#list)\[[Any](https://docs.python.org/3/library/typing.html#typing.Any)\] | [Expr](https://docs.tabsdata.com/api/category/tableframe/tableframe/expr) | [str](https://docs.python.org/3/library/stdtypes.html#str) | None)

Expressions as keyword arguments, where the keyword is the output column name.

**Example:**

```python
tf.with_columns((col("a") + 1).alias("c"))
tf.with_columns(c=col("a") + col("b"))
```

method

`drop`

```python
def drop(
    *columns: ColumnNameOrSelector | Iterable[ColumnNameOrSelector] = (),
    strict: bool = True,
) -> TableFrame
```

Remove the named columns.

**Parameters:**

parameter

`*columns`ColumnNameOrSelector | [Iterable](https://docs.python.org/3/library/typing.html#typing.Iterable)\[ColumnNameOrSelector\] ([str](https://docs.python.org/3/library/stdtypes.html#str) | [Any](https://docs.python.org/3/library/typing.html#typing.Any) | Iterable\[[str](https://docs.python.org/3/library/stdtypes.html#str) | [Any](https://docs.python.org/3/library/typing.html#typing.Any)\])

Column name(s) or selector(s) to drop, as several positional arguments or a single list.

parameter

`strict`[bool](https://docs.python.org/3/builtins/functions.html#bool)

If `True` (default), raise when a named column is missing; if `False`, silently ignore missing names.

**Example:**

```python
tf.drop("a", "b")
tf.drop(["b", "c"])
```

method

`rename`

```python
def rename(
    mapping: Mapping[str, str] | Callable[[str], str],
    *,
    strict: bool = True,
) -> TableFrame
```

Rename columns.

#VERIFY: the callable form (a function over column names) has a known system-column divergence (xp `failing` sub-suite); the dict form is the reliable one.

**Parameters:**

parameter

`mapping`[Mapping](https://docs.python.org/3/library/typing.html#typing.Mapping)\[[str](https://docs.python.org/3/builtins/stdtypes.html#str), [str](https://docs.python.org/3/builtins/stdtypes.html#str)\] | [Callable](https://docs.python.org/3/library/typing.html#typing.Callable)\[\[[str](https://docs.python.org/3/builtins/stdtypes.html#str)\], [str](https://docs.python.org/3/builtins/stdtypes.html#str)\]

A dict of `{old_name: new_name}` (the reliable form), or a callable applied to each existing column name to produce its new name.

parameter

`strict`[bool](https://docs.python.org/3/builtins/functions.html#bool)

If `True` (default), raise when a key in `mapping` is not an existing column.

**Example:**

```python
tf.rename({"a": "x", "b": "y"})
```

method

`slice`

```python
def slice(offset: int, length: int | None = None) -> TableFrame
```

Return `length` rows starting at row `offset`.

**Parameters:**

parameter

`offset`[int](https://docs.python.org/3/builtins/functions.html#int)

Zero-based index of the first row to keep.

parameter

`length`[int](https://docs.python.org/3/builtins/functions.html#int) | None

Number of rows to keep; `None` keeps all rows from `offset` to the end.

**Example:**

```python
tf.slice(1, 2)  # two rows, starting at the second
```

Omit the length to take everything from `offset` on:

```python
tf.slice(2)
```

method

`limit`

```python
def limit(n: int = 5) -> TableFrame
```

Return the first `n` rows (an alias of `head`).

**Parameters:**

parameter

`n`[int](https://docs.python.org/3/builtins/functions.html#int)

Number of rows to keep.

**Example:**

```python
tf.limit(3)
```

method

`head`

```python
def head(n: int = 5) -> TableFrame
```

Return the first `n` rows.

**Parameters:**

parameter

`n`[int](https://docs.python.org/3/builtins/functions.html#int)

Number of rows to keep.

**Example:**

```python
tf.head(3)
```

method

`tail`

```python
def tail(n: int = 5) -> TableFrame
```

Return the last `n` rows.

**Parameters:**

parameter

`n`[int](https://docs.python.org/3/builtins/functions.html#int)

Number of rows to keep.

**Example:**

```python
tf.tail(3)
```

method

`last`

```python
def last() -> TableFrame
```

Return the last row as a one-row [`TableFrame`](https://docs.tabsdata.com/api/category/tableframe/tableframe/tableframe).

**Example:**

```python
tf.sort("id").last()
```

method

`first`

```python
def first() -> TableFrame
```

Return the first row as a one-row [`TableFrame`](https://docs.tabsdata.com/api/category/tableframe/tableframe/tableframe).

**Example:**

```python
tf.sort("id").first()
```

method

`fill_null`

```python
def fill_null(
    value: Any | Expr | None = None,
    strategy: FillNullStrategy | None = None,
    limit: int | None = None,
    *,
    matches_supertype: bool = True,
) -> TableFrame
```

Replace null values with a value or a fill strategy.

Provide either `value` or `strategy`, not both.

**Parameters:**

parameter

`value`[Any](https://docs.python.org/3/library/typing.html#typing.Any) | [Expr](https://docs.tabsdata.com/api/category/tableframe/tableframe/expr) | None

Value (or expression) to substitute for nulls.

parameter

`strategy`FillNullStrategy | None (Literal\['forward', 'backward', 'min', 'max', 'mean', 'zero', 'one'\] | None)

Fill rule instead of a value -- one of `"forward"`, `"backward"`, `"min"`, `"max"`, `"mean"`, `"zero"` or `"one"`.

parameter

`limit`[int](https://docs.python.org/3/builtins/functions.html#int) | None

With `"forward"` / `"backward"`, the maximum number of consecutive nulls to fill.

parameter

`matches_supertype`[bool](https://docs.python.org/3/builtins/functions.html#bool)

Cast the fill value to the column's supertype when their types differ.

**Example:**

```python
tf.fill_null(0)
tf.sort("id").fill_null(strategy="forward", limit=1)
```

method

`fill_nan`

```python
def fill_nan(value: int | float | Expr | None) -> TableFrame
```

Replace floating-point `NaN` values with the given value.

Targets `NaN` entries in float columns -- distinct from `fill_null`, which replaces nulls.

**Parameters:**

parameter

`value`[int](https://docs.python.org/3/builtins/functions.html#int) | [float](https://docs.python.org/3/builtins/functions.html#float) | [Expr](https://docs.tabsdata.com/api/category/tableframe/tableframe/expr) | None

Value (or expression) to substitute for `NaN`.

**Example:**

```python
tf.fill_nan(0.0)
```

method

`unique`

```python
def unique(
    subset: IntoExpr | Collection[IntoExpr] | None = None,
    *,
    keep: UniqueKeepStrategy = 'any',
    maintain_order: bool = False,
) -> TableFrame
```

Remove duplicate rows.

#VERIFY: omitting `subset` (dedup on all columns) has a known system-column divergence (xp `failing` sub-suite); pass `subset` explicitly.

**Parameters:**

parameter

`subset`IntoExpr | [Collection](https://docs.python.org/3/library/typing.html#typing.Collection)\[IntoExpr\] | None ([int](https://docs.python.org/3/library/functions.html#int) | [float](https://docs.python.org/3/library/functions.html#float) | [Decimal](https://docs.tabsdata.com/api/module/tabsdatak-tableframe-datatypes#tabsdatak.tableframe.datatypes.Decimal) | [date](https://docs.python.org/3/library/datetime.html#datetime.date) | [time](https://docs.python.org/3/library/datetime.html#datetime.time) | [datetime](https://docs.python.org/3/library/datetime.html#datetime.datetime) | [timedelta](https://docs.python.org/3/library/datetime.html#datetime.timedelta) | [str](https://docs.python.org/3/library/stdtypes.html#str) | [bool](https://docs.python.org/3/library/functions.html#bool) | [bytes](https://docs.python.org/3/library/stdtypes.html#bytes) | [list](https://docs.python.org/3/library/stdtypes.html#list)\[[Any](https://docs.python.org/3/library/typing.html#typing.Any)\] | [Expr](https://docs.tabsdata.com/api/category/tableframe/tableframe/expr) | [str](https://docs.python.org/3/library/stdtypes.html#str) | None | Collection\[[int](https://docs.python.org/3/library/functions.html#int) | [float](https://docs.python.org/3/library/functions.html#float) | [Decimal](https://docs.tabsdata.com/api/module/tabsdatak-tableframe-datatypes#tabsdatak.tableframe.datatypes.Decimal) | [date](https://docs.python.org/3/library/datetime.html#datetime.date) | [time](https://docs.python.org/3/library/datetime.html#datetime.time) | [datetime](https://docs.python.org/3/library/datetime.html#datetime.datetime) | [timedelta](https://docs.python.org/3/library/datetime.html#datetime.timedelta) | [str](https://docs.python.org/3/library/stdtypes.html#str) | [bool](https://docs.python.org/3/library/functions.html#bool) | [bytes](https://docs.python.org/3/library/stdtypes.html#bytes) | [list](https://docs.python.org/3/library/stdtypes.html#list)\[[Any](https://docs.python.org/3/library/typing.html#typing.Any)\] | [Expr](https://docs.tabsdata.com/api/category/tableframe/tableframe/expr) | [str](https://docs.python.org/3/library/stdtypes.html#str) | None\] | None)

Column(s) whose values define a duplicate; pass this explicitly. When omitted, all columns are considered.

parameter

`keep`UniqueKeepStrategy (Literal\['first', 'last', 'any', 'none'\])

Which duplicate to keep -- `"any"` (default, fastest), `"first"`, `"last"` or `"none"` (drop every duplicated row).

parameter

`maintain_order`[bool](https://docs.python.org/3/builtins/functions.html#bool)

Preserve the input row order.

**Example:**

```python
tf.unique(subset="a")
tf.unique(subset="k", keep="last")
```

method

`drop_nans`

```python
def drop_nans(
    subset: ColumnNameOrSelector | Collection[ColumnNameOrSelector] | None = None,
) -> TableFrame
```

Drop rows containing floating-point `NaN` values.

**Parameters:**

parameter

`subset`ColumnNameOrSelector | [Collection](https://docs.python.org/3/library/typing.html#typing.Collection)\[ColumnNameOrSelector\] | None ([str](https://docs.python.org/3/library/stdtypes.html#str) | [Any](https://docs.python.org/3/library/typing.html#typing.Any) | Collection\[[str](https://docs.python.org/3/library/stdtypes.html#str) | [Any](https://docs.python.org/3/library/typing.html#typing.Any)\] | None)

Column(s) to check for `NaN`; when omitted, all columns are considered.

**Example:**

```python
tf.drop_nans("v")
```

Omit the subset to drop a row when any float column holds NaN:

```python
tf.drop_nans()
```

method

`drop_nulls`

```python
def drop_nulls(
    subset: ColumnNameOrSelector | Collection[ColumnNameOrSelector] | None = None,
) -> TableFrame
```

Drop rows containing null values.

**Parameters:**

parameter

`subset`ColumnNameOrSelector | [Collection](https://docs.python.org/3/library/typing.html#typing.Collection)\[ColumnNameOrSelector\] | None ([str](https://docs.python.org/3/library/stdtypes.html#str) | [Any](https://docs.python.org/3/library/typing.html#typing.Any) | Collection\[[str](https://docs.python.org/3/library/stdtypes.html#str) | [Any](https://docs.python.org/3/library/typing.html#typing.Any)\] | None)

Column(s) to check for nulls; when omitted, all columns are considered.

**Example:**

```python
tf.drop_nulls("v")
```

Omit the subset to drop a row when any column is null:

```python
tf.drop_nulls()
```

method

`unnest`

```python
def unnest(
    columns: ColumnNameOrSelector | Collection[ColumnNameOrSelector] | None = None,
    *more_columns: ColumnNameOrSelector = (),
    separator: str | None = None,
) -> TableFrame
```

Expand struct columns into one column per field.

Each named struct column is replaced, in place, by its fields as top-level columns. With no columns given, every struct column is expanded.

**Parameters:**

parameter

`columns`ColumnNameOrSelector | [Collection](https://docs.python.org/3/library/typing.html#typing.Collection)\[ColumnNameOrSelector\] | None ([str](https://docs.python.org/3/library/stdtypes.html#str) | [Any](https://docs.python.org/3/library/typing.html#typing.Any) | Collection\[[str](https://docs.python.org/3/library/stdtypes.html#str) | [Any](https://docs.python.org/3/library/typing.html#typing.Any)\] | None)

Struct column(s) to expand; all struct columns when omitted.

parameter

`*more_columns`ColumnNameOrSelector ([str](https://docs.python.org/3/library/stdtypes.html#str) | [Any](https://docs.python.org/3/library/typing.html#typing.Any))

Additional struct columns, as positional arguments.

parameter

`separator`[str](https://docs.python.org/3/builtins/stdtypes.html#str) | None

If given, prefix each new column with its parent name and this separator to avoid name clashes.

**Example:**

```python
tf.unnest("s")
tf.unnest("s", "t")
```

Expand every struct column at once:

```python
tf.unnest()
```

method

`grok`

```python
def grok(
    expr: str | Expr,
    pattern: str,
    schema: Mapping[str, ColumnDefinition],
) -> TableFrame
```

Parse unstructured text into columns with a Grok pattern.

Matches `pattern` against a string column and appends one column per named capture, keeping every existing column. A row whose text does not match gets null in each new column, so a bad line never fails the read. [`ColumnDefinition`](https://docs.tabsdata.com/api/category/tableframe/projection/columndefinition) (from `tabsdatak.tableframe.grok`) names each new column and gives its data type.

**Parameters:**

parameter

`expr`[str](https://docs.python.org/3/builtins/stdtypes.html#str) | [Expr](https://docs.tabsdata.com/api/category/tableframe/tableframe/expr)

Name of the string column to parse, or an expression resolving to one.

parameter

`pattern`[str](https://docs.python.org/3/builtins/stdtypes.html#str)

Grok pattern whose named captures (`%{WORD:user}`) become the new columns.

parameter

`schema`[Mapping](https://docs.python.org/3/library/typing.html#typing.Mapping)\[[str](https://docs.python.org/3/builtins/stdtypes.html#str), [ColumnDefinition](https://docs.tabsdata.com/api/category/tableframe/projection/columndefinition)\]

Mapping of capture name to the [`ColumnDefinition`](https://docs.tabsdata.com/api/category/tableframe/projection/columndefinition) describing the column it produces. A definition whose `name` differs from the capture renames the output column; its `dtype` is what the captured text is parsed into.

**Returns:**

A new [`TableFrame`](https://docs.tabsdata.com/api/category/tableframe/tableframe/tableframe) with one column added per capture.

**Example:**

```python
tf.grok(
    "logs",
    r"%{WORD:user}-%{WORD:action}-%{INT:year}",
    {
        "user": ColumnDefinition("user", String),
        "action": ColumnDefinition("action", String),
        "year": ColumnDefinition("year", Int64),
    },
)
```

A definition can rename the capture, and the source column may be given as an expression:

```python
tf.grok(
    col("logs"),
    r"%{WORD:user}-.*",
    {"user": ColumnDefinition("who", String)},
)
```

When a pattern repeats a capture name, the extra columns are disambiguated with a numeric suffix (`field`, `field[1]`).

method

`udf`

```python
def udf(on: str | Expr | list[str | Expr], function: UDF) -> TableFrame
```

Append the columns a user defined function computes.

`function` reads the columns `on` selects, and nothing else, and its output columns are appended to the frame, keeping every existing column. An output column named like an existing one replaces it. The function runs as part of the lazy plan, streaming over the data one batch at a time: `on_batch` receives a pyarrow array per input column, and `on_element` a Python value per input column, row by row. `function` is a `UDF` subclass instance, or a plain function or lambda turned into one with the `on_batch` / `on_element` decorators; see `tabsdatak.tableframe.udf`.

**Parameters:**

parameter

`on`[str](https://docs.python.org/3/builtins/stdtypes.html#str) | [Expr](https://docs.tabsdata.com/api/category/tableframe/tableframe/expr) | [list](https://docs.python.org/3/builtins/stdtypes.html#list)\[[str](https://docs.python.org/3/builtins/stdtypes.html#str) | [Expr](https://docs.tabsdata.com/api/category/tableframe/tableframe/expr)\]

Name of the input column, an expression resolving to one or more columns, or a list of them. They are passed to the function in this order, and each column at most once.

parameter

`function`UDF

The `UDF` computing the output columns.

**Returns:**

A new [`TableFrame`](https://docs.tabsdata.com/api/category/tableframe/tableframe/tableframe) with the function's output columns.

**Raises:**

-   `UDFDefinitionException` — When `on` selects no column, a column twice or a column the frame does not have, or `function` is not a `UDF` or is not defined correctly.
-   `SystemColumnWriteError` — When an output column is a `$td.*` system column.
-   `UDFOutputException` — When the data is processed, if the function returns a different number of columns or rows than it should, or values that do not fit an output data type.
-   `UDFException` — When the data is processed, if the function raises an error of its own, which becomes its cause.

**Example:**

```python
import pyarrow as pa
import pyarrow.compute as pc

class Total(UDF):
    def __init__(self):
        super().__init__(("total", Int64))

    def on_batch(
        self, arrays: list[pa.Int64Array]
    ) -> list[pa.Int64Array]:
        return [pc.add(arrays[0], arrays[1])]

tf.udf(["a", "b"], Total())
```

Row by row, receiving each input as its own argument:

```python
class Ratio(UDFUnpacked):
    def __init__(self):
        super().__init__(("ratio", Float64))

    def on_element(self, numerator: int, denominator: int) -> list[float]:
        return [numerator / denominator]

tf.udf(col("a", "n"), Ratio())
```

A plain function, or an inline lambda:

```python
@on_element(("ratio", Float64))
def ratio(numerator: int, denominator: int) -> float:
    return numerator / denominator

tf.udf(["a", "n"], ratio)
tf.udf("name", on_element(("upper", String))(lambda name: name.upper()))
```

Renaming the output columns, when the function is created or afterwards: every output column gets a new name, a prefix, a suffix or any of them together, and keeps its data type. This lets the same function be applied more than once:

```python
class Bounds(UDF):
    def __init__(self):
        super().__init__([("low", Int64), ("high", Int64)])

    def on_element(self, values: list[int]) -> list[int]:
        return [min(values), max(values)]

@on_element(("ratio", Float64))
def ratio(numerator: int, denominator: int) -> float:
    return numerator / denominator

tf.udf(["a", "b"], Bounds(output_names=["smallest", "largest"]))
tf.udf(["a", "b"], Bounds().with_names(["smallest", "largest"]))
tf.udf(["a", "n"], ratio.with_names("a_per_n"))
tf.udf(["a", "b"], Bounds(output_prefix="ab_")).udf(
    ["c", "n"], Bounds(output_prefix="cn_")
)
tf.udf(["b", "n"], ratio.with_names(output_suffix="_b_per_n"))
```

method

`from_polars`

```python
def from_polars(data = None, schema = None) -> TableFrame
```

Build a [`TableFrame`](https://docs.tabsdata.com/api/category/tableframe/tableframe/tableframe) from a polars frame.

Takes a polars `DataFrame` or `LazyFrame`; any other input type raises. The system columns are seeded on top of the given data.

**Parameters:**

parameter

`data`

The polars `DataFrame` or `LazyFrame` to wrap. `None` yields an empty frame.

parameter

`schema`

Optional `{column: data type}` mapping to cast the data to; the data keeps its own types when omitted.

**Returns:**

A new [`TableFrame`](https://docs.tabsdata.com/api/category/tableframe/tableframe/tableframe) over the given data.

**Example:**

```python
TableFrame.from_polars(pl.DataFrame({"a": [1, 2, 3]}))
TableFrame.from_polars(pl.LazyFrame({"a": [1, 2, 3]}))
```

method

`from_pandas`

```python
def from_pandas(data = None, schema = None) -> TableFrame
```

Build a [`TableFrame`](https://docs.tabsdata.com/api/category/tableframe/tableframe/tableframe) from a pandas `DataFrame`.

**Parameters:**

parameter

`data`

The pandas `DataFrame` to convert. `None` yields an empty frame.

parameter

`schema`

Optional `{column: data type}` mapping to cast the data to; the types pandas inferred are kept when omitted.

**Returns:**

A new [`TableFrame`](https://docs.tabsdata.com/api/category/tableframe/tableframe/tableframe) over the given data.

**Example:**

```python
TableFrame.from_pandas(pd.DataFrame({"a": [1, 2, 3]}))
```

method

`from_dict`

```python
def from_dict(data = None, schema = None) -> TableFrame
```

Build a [`TableFrame`](https://docs.tabsdata.com/api/category/tableframe/tableframe/tableframe) from a `{column: values}` dict.

Every value list must have the same length -- one entry per row.

**Parameters:**

parameter

`data`

Mapping of column name to the column's values. `None` yields an empty frame.

parameter

`schema`

Optional `{column: data type}` mapping to cast the columns to; types are inferred from the values when omitted.

**Returns:**

A new [`TableFrame`](https://docs.tabsdata.com/api/category/tableframe/tableframe/tableframe) over the given data.

**Example:**

```python
TableFrame.from_dict({"g": ["x", "y"], "v": [1, 2]})
```

Pin the column types instead of having them inferred:

```python
TableFrame.from_dict({"v": [1, 2]}, schema={"v": Float64})
```

method

`empty`

```python
def empty(schema = None) -> TableFrame
```

Build a [`TableFrame`](https://docs.tabsdata.com/api/category/tableframe/tableframe/tableframe) with no rows.

**Parameters:**

parameter

`schema`

Optional `{column: data type}` mapping giving the frame its columns. Without it the frame has no columns either.

**Returns:**

A new, empty [`TableFrame`](https://docs.tabsdata.com/api/category/tableframe/tableframe/tableframe).

**Example:**

```python
TableFrame.empty(schema={"id": Int64, "name": String})
```

With no schema the result has neither rows nor columns -- useful as the starting point of a [`concat`](https://docs.tabsdata.com/api/category/tableframe/concat):

```python
TableFrame.empty()
```

method

`extract_one`

```python
def extract_one(
    with_connector_columns: bool = False,
    fail_if_empty: bool = False,
) -> dict[str, DataType | None] | None
```

Return the only row as a column-to-value dictionary.

Internal columns are always dropped; connector columns are kept only when with\_connector\_columns is set. Fails if the TableFrame has more than one row. Returns None when the TableFrame is empty, unless fail\_if\_empty is set, in which case it fails.

**Parameters:**

parameter

`with_connector_columns`[bool](https://docs.python.org/3/builtins/functions.html#bool)

Keep the connector columns a source attached to the row instead of dropping them.

parameter

`fail_if_empty`[bool](https://docs.python.org/3/builtins/functions.html#bool)

Raise instead of returning `None` when there is no row to extract.

**Returns:**

The row as `{column: value}`, or `None` when the frame is

**Example:**

```python
tf.filter(col("id") == 1).extract_one()
```

Reading a single aggregate out of a frame is the common use:

```python
tf.select(col("v").sum().alias("total")).extract_one()
```

method

`max_for`

```python
def max_for(
    *cols: str = (),
    fail_if_empty: bool = False,
) -> dict[str, DataType | None] | None
```

Return the given columns of the row that ranks highest by them.

Each column is compared in its own natural order (numbers numerically, dates chronologically, strings alphabetically). The columns are ordered comparison keys: the first is primary, each subsequent one breaks ties on the previous. Returns None when the TableFrame is empty, unless fail\_if\_empty is set, in which case it fails.

**Parameters:**

parameter

`*cols`[str](https://docs.python.org/3/builtins/stdtypes.html#str)

Columns to rank by, in priority order; the same columns are the ones returned.

parameter

`fail_if_empty`[bool](https://docs.python.org/3/builtins/functions.html#bool)

Raise instead of returning `None` when the frame has no rows.

**Returns:**

The named columns of the top-ranking row as `{column: value}`,

**Example:**

```python
tf.max_for("v")
```

With several keys the later ones break ties on the earlier:

```python
tf.max_for("g", "v")
```

method

`min_for`

```python
def min_for(
    *cols: str = (),
    fail_if_empty: bool = False,
) -> dict[str, DataType | None] | None
```

Return the given columns of the row that ranks lowest by them.

Each column is compared in its own natural order (numbers numerically, dates chronologically, strings alphabetically). The columns are ordered comparison keys: the first is primary, each subsequent one breaks ties on the previous. Returns None when the TableFrame is empty, unless fail\_if\_empty is set, in which case it fails.

**Parameters:**

parameter

`*cols`[str](https://docs.python.org/3/builtins/stdtypes.html#str)

Columns to rank by, in priority order; the same columns are the ones returned.

parameter

`fail_if_empty`[bool](https://docs.python.org/3/builtins/functions.html#bool)

Raise instead of returning `None` when the frame has no rows.

**Returns:**

The named columns of the bottom-ranking row as

**Example:**

```python
tf.min_for("v")
```

A cursor over an incremental read is the common use -- the lowest unprocessed key:

```python
tf.filter(col("processed").not_()).min_for("id")
```

# Expr

> A lazy column expression evaluated against a `TableFrame`.

Source: https://docs.tabsdata.com/api/category/tableframe/tableframe/expr

class

```python
class Expr
```

**Categories:** tableframe

A lazy column expression evaluated against a [`TableFrame`](https://docs.tabsdata.com/api/category/tableframe/tableframe/tableframe).

Create expressions with [`col`](https://docs.tabsdata.com/api/category/tableframe/projection/col) / [`lit`](https://docs.tabsdata.com/api/category/tableframe/lit) from `tabsdatak.tableframe.functions` and pass them to a frame's `select`, `filter`, `with_columns` or `group_by().agg`. Operators are element-wise; reducers (`sum`, `mean`, `min` ...) collapse a group. Date/time and string helpers live under `dt` and `str`.

## Examples

```python
tf.with_columns((col("a") * 2).alias("doubled"))
tf.group_by("g").agg(col("a").sum().alias("total"))
```

## Properties

property

`dt`[ExprDateTimeNameSpace](https://docs.tabsdata.com/api/category/tableframe/exprdatetimenamespace)

Namespace of date and time operations for temporal columns.

property

`str`[ExprStringNameSpace](https://docs.tabsdata.com/api/category/tableframe/string/exprstringnamespace)

Namespace of string operations for string columns.

## Methods

method

`sqrt`

```python
def sqrt() -> Expr
```

Square root of each element.

**Example:**

```python
tf.select(col("v").sqrt().alias("root"))
```

method

`cbrt`

```python
def cbrt() -> Expr
```

Cube root of each element.

**Example:**

```python
tf.select(col("v").cbrt().alias("root"))
```

method

`log10`

```python
def log10() -> Expr
```

Base-10 logarithm of each element.

**Example:**

```python
tf.select(col("v").log10().alias("magnitude"))
```

method

`exp`

```python
def exp() -> Expr
```

Exponential (`e` raised to each element).

**Example:**

```python
tf.select(col("v").exp().alias("growth"))
```

method

`erf`

```python
def erf() -> Expr
```

Error function of each element.

**Example:**

```python
tf.select(col("v").erf().alias("erf"))
```

method

`erfc`

```python
def erfc() -> Expr
```

Complementary error function (`1 - erf`) of each element.

**Example:**

```python
tf.select(col("v").erfc().alias("erfc"))
```

method

`alias`

```python
def alias(name: Any) -> Expr
```

Rename the output column of this expression.

**Parameters:**

parameter

`name`[Any](https://docs.python.org/3/library/typing.html#typing.Any)

New column name. Must be a valid identifier (letters, digits, underscores; starting with a letter or underscore) up to 100 characters.

**Example:**

```python
tf.select(col("a").alias("identifier"))
```

An expression keeps no name of its own, so alias every computed column:

```python
tf.with_columns((col("a") * 2).alias("doubled"))
```

method

`not_`

```python
def not_() -> Expr
```

Logical negation of a boolean expression.

**Example:**

```python
tf.filter(col("flag").not_())
```

method

`is_null`

```python
def is_null() -> Expr
```

Return whether each element is null.

**Example:**

```python
tf.filter(col("v").is_null())
```

method

`is_not_null`

```python
def is_not_null() -> Expr
```

Return whether each element is not null.

**Example:**

```python
tf.filter(col("v").is_not_null())
```

method

`is_finite`

```python
def is_finite() -> Expr
```

Return whether each floating-point element is finite.

**Example:**

```python
tf.filter(col("v").is_finite())
```

method

`is_infinite`

```python
def is_infinite() -> Expr
```

Return whether each floating-point element is infinite.

**Example:**

```python
tf.filter(col("v").is_infinite())
```

method

`is_nan`

```python
def is_nan() -> Expr
```

Return whether each floating-point element is NaN.

**Example:**

```python
tf.filter(col("v").is_nan())
```

method

`is_not_nan`

```python
def is_not_nan() -> Expr
```

Return whether each floating-point element is not NaN.

**Example:**

```python
tf.filter(col("v").is_not_nan())
```

method

`count`

```python
def count() -> Expr
```

Count the non-null elements in the group; see `len`.

**Example:**

```python
tf.group_by("g").agg(col("v").count().alias("filled"))
```

method

`len`

```python
def len() -> Expr
```

Count all rows in the group, including nulls; see `count`.

**Example:**

```python
tf.group_by("g").agg(col("v").len().alias("rows"))
```

method

`slice`

```python
def slice(offset: int | Expr, length: int | Expr | None = None) -> Expr
```

Take a contiguous slice of the column's values.

**Parameters:**

parameter

`offset`[int](https://docs.python.org/3/builtins/functions.html#int) | [Expr](https://docs.tabsdata.com/api/category/tableframe/tableframe/expr)

Start index; a negative value counts from the end.

parameter

`length`[int](https://docs.python.org/3/builtins/functions.html#int) | [Expr](https://docs.tabsdata.com/api/category/tableframe/tableframe/expr) | None

Number of values to take; all remaining if omitted.

**Example:**

```python
tf.select(col("a").slice(1, 2))
```

A negative offset counts from the end:

```python
tf.select(col("a").slice(-2))  # the last two values
```

method

`floor`

```python
def floor() -> Expr
```

Round each element down to the nearest integer.

**Example:**

```python
tf.select(col("v").floor().alias("floor"))
```

method

`ceil`

```python
def ceil() -> Expr
```

Round each element up to the nearest integer.

**Example:**

```python
tf.select(col("v").ceil().alias("ceil"))
```

method

`round`

```python
def round(decimals: int = 0, mode: RoundMode = 'half_to_even') -> Expr
```

Round floating-point elements to a number of decimals.

**Parameters:**

parameter

`decimals`[int](https://docs.python.org/3/builtins/functions.html#int)

Number of decimal places to keep; non-negative.

parameter

`mode`RoundMode (Literal\['half\_to\_even', 'half\_away\_from\_zero', 'to\_zero'\])

Tie-breaking rule, one of `half_to_even`, `half_away_from_zero` or `to_zero`.

**Example:**

```python
tf.select(col("v").round(2).alias("rounded"))
```

method

`round_sig_figs`

```python
def round_sig_figs(digits: int) -> Expr
```

Round elements to a number of significant figures.

**Parameters:**

parameter

`digits`[int](https://docs.python.org/3/builtins/functions.html#int)

Number of significant figures to keep; positive.

**Example:**

```python
tf.select(col("v").round_sig_figs(2).alias("approx"))
```

method

`cast`

```python
def cast(
    dtype: PolarsDataType | type[Any],
    *,
    strict: bool = True,
    wrap_numerical: bool = False,
) -> Expr
```

Cast the expression to a different data type.

**Parameters:**

parameter

`dtype`PolarsDataType | [type](https://docs.python.org/3/builtins/functions.html#type)\[[Any](https://docs.python.org/3/library/typing.html#typing.Any)\] (DataType | [type](https://docs.python.org/3/library/functions.html#type)\[[Any](https://docs.python.org/3/library/typing.html#typing.Any)\])

Target data type (e.g. `pl.Int64`, `pl.Float64`, `pl.String`).

parameter

`strict`[bool](https://docs.python.org/3/builtins/functions.html#bool)

If `True`, raise on values that do not fit the target; if `False`, set them to null instead.

parameter

`wrap_numerical`[bool](https://docs.python.org/3/builtins/functions.html#bool)

If `True`, wrap on numeric overflow rather than raising.

**Example:**

```python
tf.select(col("a").cast(Float64))
```

With `strict=False` an unconvertible value becomes null instead of raising:

```python
tf.select(col("name").cast(Int64, strict=False))
```

method

`fill_null`

```python
def fill_null(
    value: Any | Expr | None = None,
    strategy: FillNullStrategy | None = None,
    limit: int | None = None,
) -> Expr
```

Replace null values with a value or a fill strategy.

Pass either `value` or `strategy`, not both.

**Parameters:**

parameter

`value`[Any](https://docs.python.org/3/library/typing.html#typing.Any) | [Expr](https://docs.tabsdata.com/api/category/tableframe/tableframe/expr) | None

Value or expression to substitute for nulls.

parameter

`strategy`FillNullStrategy | None (Literal\['forward', 'backward', 'min', 'max', 'mean', 'zero', 'one'\] | None)

Fill strategy instead of `value`: one of `forward`, `backward`, `min`, `max`, `mean`, `zero` or `one`.

parameter

`limit`[int](https://docs.python.org/3/builtins/functions.html#int) | None

Maximum consecutive nulls to fill with `forward` or `backward`.

**Example:**

```python
tf.with_columns(col("v").fill_null(0.0))
```

A strategy fills from the neighbouring rows instead of a constant:

```python
tf.sort("id").with_columns(col("v").fill_null(strategy="forward"))
```

method

`fill_nan`

```python
def fill_nan(value: int | float | Expr | None) -> Expr
```

Replace NaN values with the given value.

Only affects NaN, not null. Use `fill_null` for nulls.

**Parameters:**

parameter

`value`[int](https://docs.python.org/3/builtins/functions.html#int) | [float](https://docs.python.org/3/builtins/functions.html#float) | [Expr](https://docs.tabsdata.com/api/category/tableframe/tableframe/expr) | None

Value or expression to substitute for NaN.

**Example:**

```python
tf.with_columns(col("v").fill_nan(0.0))
```

method

`max`

```python
def max() -> Expr
```

Return the maximum element in the group.

**Example:**

```python
tf.group_by("g").agg(col("a").max().alias("largest"))
```

method

`min`

```python
def min() -> Expr
```

Return the minimum element in the group.

**Example:**

```python
tf.group_by("g").agg(col("a").min().alias("smallest"))
```

method

`sum`

```python
def sum() -> Expr
```

Return the sum of the elements in the group.

**Example:**

```python
tf.group_by("g").agg(col("a").sum().alias("total"))
```

method

`mean`

```python
def mean() -> Expr
```

Return the mean of the elements in the group.

**Example:**

```python
tf.group_by("g").agg(col("a").mean().alias("average"))
```

method

`median`

```python
def median() -> Expr
```

Return the median of the elements in the group.

**Example:**

```python
tf.group_by("g").agg(col("a").median().alias("middle"))
```

method

`n_unique`

```python
def n_unique() -> Expr
```

Count the distinct elements in the group.

**Example:**

```python
tf.group_by("g").agg(col("a").n_unique().alias("distinct"))
```

method

`first`

```python
def first(*, ignore_nulls: bool = False) -> Expr
```

Return the first element in the group.

**Parameters:**

parameter

`ignore_nulls`[bool](https://docs.python.org/3/builtins/functions.html#bool)

If `True`, return the first non-null element.

**Example:**

```python
tf.sort("id").group_by("g").agg(col("a").first().alias("earliest"))
```

method

`last`

```python
def last(*, ignore_nulls: bool = False) -> Expr
```

Return the last element in the group.

**Parameters:**

parameter

`ignore_nulls`[bool](https://docs.python.org/3/builtins/functions.html#bool)

If `True`, return the last non-null element.

**Example:**

```python
tf.sort("id").group_by("g").agg(col("a").last().alias("latest"))
```

method

`is_unique`

```python
def is_unique() -> Expr
```

Return whether each element occurs only once in the column.

**Example:**

```python
tf.filter(col("g").is_unique())
```

method

`filter`

```python
def filter(
    *predicates: IntoExprColumn | Iterable[IntoExprColumn] = (),
    **constraints: Any = {},
) -> Expr
```

Keep only the values that satisfy the given predicates.

Values whose predicate is not `True` (including null) are dropped. Typically used inside an aggregation.

**Parameters:**

parameter

`*predicates`IntoExprColumn | [Iterable](https://docs.python.org/3/library/typing.html#typing.Iterable)\[IntoExprColumn\] ([Expr](https://docs.tabsdata.com/api/category/tableframe/tableframe/expr) | [str](https://docs.python.org/3/library/stdtypes.html#str) | Iterable\[[Expr](https://docs.tabsdata.com/api/category/tableframe/tableframe/expr) | [str](https://docs.python.org/3/library/stdtypes.html#str)\])

Boolean expressions to apply.

parameter

`**constraints`[Any](https://docs.python.org/3/library/typing.html#typing.Any)

`column=value` keyword filters, combined with `predicates` using logical `and`.

**Example:**

```python
tf.group_by("g").agg(
    col("a").filter(col("a") > 1).sum().alias("big_total"),
)
```

method

`and_`

```python
def and_(*others: Any = ()) -> Expr
```

Bitwise `and` with the given expressions (integer or boolean).

**Parameters:**

parameter

`*others`[Any](https://docs.python.org/3/library/typing.html#typing.Any)

Expressions to combine with logical/bitwise `and`.

**Example:**

```python
tf.filter(col("flag").and_(col("a") > 2))
```

method

`or_`

```python
def or_(*others: Any = ()) -> Expr
```

Bitwise `or` with the given expressions (integer or boolean).

**Parameters:**

parameter

`*others`[Any](https://docs.python.org/3/library/typing.html#typing.Any)

Expressions to combine with logical/bitwise `or`.

**Example:**

```python
tf.filter(col("flag").or_(col("a") > 3))
```

method

`eq`

```python
def eq(other: Any) -> Expr
```

Element-wise equality, equivalent to `expr == other`.

**Parameters:**

parameter

`other`[Any](https://docs.python.org/3/library/typing.html#typing.Any)

Value or expression to compare against. A null on either side yields null; use `eq_missing` to treat two nulls as equal.

**Example:**

```python
tf.filter(col("g").eq("x"))
```

method

`eq_missing`

```python
def eq_missing(other: Any) -> Expr
```

Element-wise equality where two nulls compare as equal.

**Parameters:**

parameter

`other`[Any](https://docs.python.org/3/library/typing.html#typing.Any)

Value or expression to compare against.

**Example:**

```python
tf.select(col("v").eq(None).alias("eq"))  # null everywhere
tf.select(col("v").eq_missing(None).alias("eq_missing"))  # True on nulls
```

method

`ge`

```python
def ge(other: Any) -> Expr
```

Element-wise greater-than-or-equal, like `expr >= other`.

**Parameters:**

parameter

`other`[Any](https://docs.python.org/3/library/typing.html#typing.Any)

Value or expression to compare against.

**Example:**

```python
tf.filter(col("a").ge(2))
```

method

`gt`

```python
def gt(other: Any) -> Expr
```

Element-wise greater-than, like `expr > other`.

**Parameters:**

parameter

`other`[Any](https://docs.python.org/3/library/typing.html#typing.Any)

Value or expression to compare against.

**Example:**

```python
tf.filter(col("a").gt(2))
```

method

`le`

```python
def le(other: Any) -> Expr
```

Element-wise less-than-or-equal, like `expr <= other`.

**Parameters:**

parameter

`other`[Any](https://docs.python.org/3/library/typing.html#typing.Any)

Value or expression to compare against.

**Example:**

```python
tf.filter(col("a").le(2))
```

method

`lt`

```python
def lt(other: Any) -> Expr
```

Element-wise less-than, like `expr < other`.

**Parameters:**

parameter

`other`[Any](https://docs.python.org/3/library/typing.html#typing.Any)

Value or expression to compare against.

**Example:**

```python
tf.filter(col("a").lt(2))
```

method

`ne`

```python
def ne(other: Any) -> Expr
```

Element-wise inequality, equivalent to `expr != other`.

**Parameters:**

parameter

`other`[Any](https://docs.python.org/3/library/typing.html#typing.Any)

Value or expression to compare against. A null on either side yields null; use `ne_missing` to treat two nulls as equal.

**Example:**

```python
tf.filter(col("g").ne("x"))
```

method

`ne_missing`

```python
def ne_missing(other: Any) -> Expr
```

Element-wise inequality where two nulls compare as equal.

**Parameters:**

parameter

`other`[Any](https://docs.python.org/3/library/typing.html#typing.Any)

Value or expression to compare against.

**Example:**

```python
tf.select(col("v").ne_missing(None).alias("filled"))
```

method

`add`

```python
def add(other: Any) -> Expr
```

Add `other`; for strings, concatenate. Same as `+`.

**Parameters:**

parameter

`other`[Any](https://docs.python.org/3/library/typing.html#typing.Any)

Value or expression to add or concatenate.

**Example:**

```python
tf.with_columns(col("a").add(1).alias("next"))
```

method

`floordiv`

```python
def floordiv(other: Any) -> Expr
```

Floor division by `other`. Same as `//`.

**Parameters:**

parameter

`other`[Any](https://docs.python.org/3/library/typing.html#typing.Any)

Value or expression to divide by.

**Example:**

```python
tf.select(col("a").floordiv(2).alias("halved"))
```

method

`mod`

```python
def mod(other: Any) -> Expr
```

Modulo (remainder) by `other`. Same as `%`.

**Parameters:**

parameter

`other`[Any](https://docs.python.org/3/library/typing.html#typing.Any)

Value or expression to divide by.

**Example:**

```python
tf.select(col("a").mod(2).alias("parity"))
```

method

`mul`

```python
def mul(other: Any) -> Expr
```

Multiply by `other`. Same as `*`.

**Parameters:**

parameter

`other`[Any](https://docs.python.org/3/library/typing.html#typing.Any)

Value or expression to multiply by.

**Example:**

```python
tf.with_columns(col("a").mul(10).alias("scaled"))
```

method

`sub`

```python
def sub(other: Any) -> Expr
```

Subtract `other`. Same as `-`.

**Parameters:**

parameter

`other`[Any](https://docs.python.org/3/library/typing.html#typing.Any)

Value or expression to subtract.

**Example:**

```python
tf.with_columns(col("b").sub(col("a")).alias("gap"))
```

method

`neg`

```python
def neg() -> Expr
```

Unary negation of each element. Same as unary `-`.

**Example:**

```python
tf.select(col("a").neg().alias("negated"))
```

method

`truediv`

```python
def truediv(other: Any) -> Expr
```

True (floating-point) division by `other`. Same as `/`.

**Parameters:**

parameter

`other`[Any](https://docs.python.org/3/library/typing.html#typing.Any)

Value or expression to divide by.

**Example:**

```python
tf.select(col("b").truediv(col("a")).alias("ratio"))
```

method

`pow`

```python
def pow(exponent: IntoExprColumn | int | float) -> Expr
```

Raise each element to the power of `exponent`. Same as `**`.

**Parameters:**

parameter

`exponent`IntoExprColumn | [int](https://docs.python.org/3/builtins/functions.html#int) | [float](https://docs.python.org/3/builtins/functions.html#float) ([Expr](https://docs.tabsdata.com/api/category/tableframe/tableframe/expr) | [str](https://docs.python.org/3/library/stdtypes.html#str) | [int](https://docs.python.org/3/library/functions.html#int) | [float](https://docs.python.org/3/library/functions.html#float))

Value or expression to use as the exponent.

**Example:**

```python
tf.select(col("a").pow(2).alias("squared"))
```

method

`xor`

```python
def xor(other: Any) -> Expr
```

Bitwise `xor` with `other` (integer or boolean). Same as `^`.

**Parameters:**

parameter

`other`[Any](https://docs.python.org/3/library/typing.html#typing.Any)

Value or expression to combine with `xor`.

**Example:**

```python
tf.select(col("flag").xor(True).alias("toggled"))
```

method

`is_in`

```python
def is_in(other: Expr | Collection[Any], *, nulls_equal: bool = False) -> Expr
```

Return whether each element is contained in `other`.

**Parameters:**

parameter

`other`[Expr](https://docs.tabsdata.com/api/category/tableframe/tableframe/expr) | [Collection](https://docs.python.org/3/library/typing.html#typing.Collection)\[[Any](https://docs.python.org/3/library/typing.html#typing.Any)\]

Collection or expression of allowed values.

parameter

`nulls_equal`[bool](https://docs.python.org/3/builtins/functions.html#bool)

If `True`, a null element matches a null in `other`.

**Example:**

```python
tf.filter(col("g").is_in(["x", "y"]))
```

method

`is_between`

```python
def is_between(
    lower_bound: IntoExpr,
    upper_bound: IntoExpr,
    closed: ClosedInterval = 'both',
) -> Expr
```

Return whether each element lies between two bounds.

**Parameters:**

parameter

`lower_bound`IntoExpr ([int](https://docs.python.org/3/library/functions.html#int) | [float](https://docs.python.org/3/library/functions.html#float) | [Decimal](https://docs.tabsdata.com/api/module/tabsdatak-tableframe-datatypes#tabsdatak.tableframe.datatypes.Decimal) | [date](https://docs.python.org/3/library/datetime.html#datetime.date) | [time](https://docs.python.org/3/library/datetime.html#datetime.time) | [datetime](https://docs.python.org/3/library/datetime.html#datetime.datetime) | [timedelta](https://docs.python.org/3/library/datetime.html#datetime.timedelta) | [str](https://docs.python.org/3/library/stdtypes.html#str) | [bool](https://docs.python.org/3/library/functions.html#bool) | [bytes](https://docs.python.org/3/library/stdtypes.html#bytes) | [list](https://docs.python.org/3/library/stdtypes.html#list)\[[Any](https://docs.python.org/3/library/typing.html#typing.Any)\] | [Expr](https://docs.tabsdata.com/api/category/tableframe/tableframe/expr) | [str](https://docs.python.org/3/library/stdtypes.html#str) | None)

Lower bound value or expression.

parameter

`upper_bound`IntoExpr ([int](https://docs.python.org/3/library/functions.html#int) | [float](https://docs.python.org/3/library/functions.html#float) | [Decimal](https://docs.tabsdata.com/api/module/tabsdatak-tableframe-datatypes#tabsdatak.tableframe.datatypes.Decimal) | [date](https://docs.python.org/3/library/datetime.html#datetime.date) | [time](https://docs.python.org/3/library/datetime.html#datetime.time) | [datetime](https://docs.python.org/3/library/datetime.html#datetime.datetime) | [timedelta](https://docs.python.org/3/library/datetime.html#datetime.timedelta) | [str](https://docs.python.org/3/library/stdtypes.html#str) | [bool](https://docs.python.org/3/library/functions.html#bool) | [bytes](https://docs.python.org/3/library/stdtypes.html#bytes) | [list](https://docs.python.org/3/library/stdtypes.html#list)\[[Any](https://docs.python.org/3/library/typing.html#typing.Any)\] | [Expr](https://docs.tabsdata.com/api/category/tableframe/tableframe/expr) | [str](https://docs.python.org/3/library/stdtypes.html#str) | None)

Upper bound value or expression.

parameter

`closed`ClosedInterval (Literal\['left', 'right', 'both', 'none'\])

Which ends are inclusive: `both` (default), `left`, `right` or `none`.

**Example:**

```python
tf.filter(col("a").is_between(2, 4))
```

Both bounds are inclusive by default; `closed` narrows them:

```python
tf.filter(col("a").is_between(2, 4, closed="left"))
```

method

`hash`

```python
def hash(seed: int = 0) -> Expr
```

Hash each element to a 64-bit unsigned integer.

**Parameters:**

parameter

`seed`[int](https://docs.python.org/3/builtins/functions.html#int)

Seed for the hash.

**Example:**

```python
tf.select(col("email").hash().alias("fingerprint"))
```

method

`reinterpret`

```python
def reinterpret(
    *,
    signed: bool | None = None,
    dtype: PolarsDataType | None = None,
) -> Expr
```

Reinterpret a 64-bit integer's bits as another integer type.

Reinterprets the raw bits (no value conversion); for a real conversion use `cast`. Only valid on 64-bit integer columns.

**Parameters:**

parameter

`signed`[bool](https://docs.python.org/3/builtins/functions.html#bool) | None

If `True` reinterpret as signed, if `False` as unsigned.

parameter

`dtype`PolarsDataType | None (DataType | None)

Explicit target integer type; overrides `signed`.

**Example:**

```python
tf.select(col("a").reinterpret(signed=False).alias("bits"))
```

method

`abs`

```python
def abs() -> Expr
```

Absolute value of each element.

**Example:**

```python
tf.select(col("v").abs().alias("size"))
```

method

`rank`

```python
def rank(
    method: RankMethod = 'average',
    *,
    descending: bool = False,
    seed: int | None = None,
) -> Expr
```

Assign a rank to each element within the column.

**Parameters:**

parameter

`method`RankMethod (Literal\['average', 'min', 'max', 'dense', 'ordinal', 'random'\])

Tie-handling method: `average` (default), `min`, `max`, `dense`, `ordinal` or `random`.

parameter

`descending`[bool](https://docs.python.org/3/builtins/functions.html#bool)

If `True`, rank from largest to smallest.

parameter

`seed`[int](https://docs.python.org/3/builtins/functions.html#int) | None

Random seed, used only when `method` is `random`.

**Example:**

```python
tf.with_columns(col("a").rank().alias("position"))
```

`method` decides how ties are resolved, and `descending` ranks the largest value first:

```python
tf.with_columns(col("a").rank("dense", descending=True).alias("place"))
```

method

`diff`

```python
def diff(n: int | IntoExpr = 1, null_behavior: NullBehavior = 'ignore') -> Expr
```

Difference between each element and one `n` rows away.

Works on numeric and temporal columns. Order-dependent, so sort first for a deterministic result.

**Parameters:**

parameter

`n`[int](https://docs.python.org/3/builtins/functions.html#int) | IntoExpr ([int](https://docs.python.org/3/library/functions.html#int) | [int](https://docs.python.org/3/library/functions.html#int) | [float](https://docs.python.org/3/library/functions.html#float) | [Decimal](https://docs.tabsdata.com/api/module/tabsdatak-tableframe-datatypes#tabsdatak.tableframe.datatypes.Decimal) | [date](https://docs.python.org/3/library/datetime.html#datetime.date) | [time](https://docs.python.org/3/library/datetime.html#datetime.time) | [datetime](https://docs.python.org/3/library/datetime.html#datetime.datetime) | [timedelta](https://docs.python.org/3/library/datetime.html#datetime.timedelta) | [str](https://docs.python.org/3/library/stdtypes.html#str) | [bool](https://docs.python.org/3/library/functions.html#bool) | [bytes](https://docs.python.org/3/library/stdtypes.html#bytes) | [list](https://docs.python.org/3/library/stdtypes.html#list)\[[Any](https://docs.python.org/3/library/typing.html#typing.Any)\] | [Expr](https://docs.tabsdata.com/api/category/tableframe/tableframe/expr) | [str](https://docs.python.org/3/library/stdtypes.html#str) | None)

Rows to look back; negative looks forward.

parameter

`null_behavior`NullBehavior (Literal\['ignore', 'drop'\])

How to handle nulls: `ignore` or `drop`.

**Example:**

```python
tf.sort("id").with_columns(col("a").diff().alias("change"))
```

method

`clip`

```python
def clip(
    lower_bound: NumericLiteral | TemporalLiteral | IntoExprColumn | None = None,
    upper_bound: NumericLiteral | TemporalLiteral | IntoExprColumn | None = None,
) -> Expr
```

Clamp each element to the given bounds.

Values below `lower_bound` become it, values above `upper_bound` become it, values in range are unchanged. Provide at least one bound.

**Parameters:**

parameter

`lower_bound`NumericLiteral | TemporalLiteral | IntoExprColumn | None ([int](https://docs.python.org/3/library/functions.html#int) | [float](https://docs.python.org/3/library/functions.html#float) | [Decimal](https://docs.tabsdata.com/api/module/tabsdatak-tableframe-datatypes#tabsdatak.tableframe.datatypes.Decimal) | [date](https://docs.python.org/3/library/datetime.html#datetime.date) | [time](https://docs.python.org/3/library/datetime.html#datetime.time) | [datetime](https://docs.python.org/3/library/datetime.html#datetime.datetime) | [timedelta](https://docs.python.org/3/library/datetime.html#datetime.timedelta) | [Expr](https://docs.tabsdata.com/api/category/tableframe/tableframe/expr) | [str](https://docs.python.org/3/library/stdtypes.html#str) | None)

Minimum allowed value; `None` for no lower bound.

parameter

`upper_bound`NumericLiteral | TemporalLiteral | IntoExprColumn | None ([int](https://docs.python.org/3/library/functions.html#int) | [float](https://docs.python.org/3/library/functions.html#float) | [Decimal](https://docs.tabsdata.com/api/module/tabsdatak-tableframe-datatypes#tabsdatak.tableframe.datatypes.Decimal) | [date](https://docs.python.org/3/library/datetime.html#datetime.date) | [time](https://docs.python.org/3/library/datetime.html#datetime.time) | [datetime](https://docs.python.org/3/library/datetime.html#datetime.datetime) | [timedelta](https://docs.python.org/3/library/datetime.html#datetime.timedelta) | [Expr](https://docs.tabsdata.com/api/category/tableframe/tableframe/expr) | [str](https://docs.python.org/3/library/stdtypes.html#str) | None)

Maximum allowed value; `None` for no upper bound.

**Example:**

```python
tf.with_columns(col("a").clip(2, 3).alias("clipped"))
```

One bound may be omitted to clamp on a single side:

```python
tf.with_columns(col("a").clip(lower_bound=2).alias("at_least_two"))
```

method

`sign`

```python
def sign() -> Expr
```

Return the sign of each element (-1, 0 or 1).

**Example:**

```python
tf.select(col("v").sign().alias("sign"))
```

method

`sin`

```python
def sin() -> Expr
```

Sine of each element, in radians.

**Example:**

```python
tf.select(col("v").sin().alias("sin"))
```

method

`cos`

```python
def cos() -> Expr
```

Cosine of each element, in radians.

**Example:**

```python
tf.select(col("v").cos().alias("cos"))
```

method

`tan`

```python
def tan() -> Expr
```

Tangent of each element, in radians.

**Example:**

```python
tf.select(col("v").tan().alias("tan"))
```

method

`cot`

```python
def cot() -> Expr
```

Cotangent of each element, in radians.

**Example:**

```python
tf.select(col("v").cot().alias("cot"))
```

method

`arcsin`

```python
def arcsin() -> Expr
```

Inverse sine of each element.

**Example:**

```python
tf.select(col("v").arcsin().alias("arcsin"))
```

method

`arccos`

```python
def arccos() -> Expr
```

Inverse cosine of each element.

**Example:**

```python
tf.select(col("v").arccos().alias("arccos"))
```

method

`arctan`

```python
def arctan() -> Expr
```

Inverse tangent of each element.

**Example:**

```python
tf.select(col("v").arctan().alias("arctan"))
```

method

`sinh`

```python
def sinh() -> Expr
```

Hyperbolic sine of each element.

**Example:**

```python
tf.select(col("v").sinh().alias("sinh"))
```

method

`cosh`

```python
def cosh() -> Expr
```

Hyperbolic cosine of each element.

**Example:**

```python
tf.select(col("v").cosh().alias("cosh"))
```

method

`tanh`

```python
def tanh() -> Expr
```

Hyperbolic tangent of each element.

**Example:**

```python
tf.select(col("v").tanh().alias("tanh"))
```

method

`arcsinh`

```python
def arcsinh() -> Expr
```

Inverse hyperbolic sine of each element.

**Example:**

```python
tf.select(col("v").arcsinh().alias("arcsinh"))
```

method

`arccosh`

```python
def arccosh() -> Expr
```

Inverse hyperbolic cosine of each element.

**Example:**

```python
tf.select(col("v").arccosh().alias("arccosh"))
```

method

`arctanh`

```python
def arctanh() -> Expr
```

Inverse hyperbolic tangent of each element.

**Example:**

```python
tf.select(col("v").arctanh().alias("arctanh"))
```

method

`degrees`

```python
def degrees() -> Expr
```

Convert each element from radians to degrees.

**Example:**

```python
tf.select(col("v").degrees().alias("degrees"))
```

method

`radians`

```python
def radians() -> Expr
```

Convert each element from degrees to radians.

**Example:**

```python
tf.select(col("v").radians().alias("radians"))
```

method

`log`

```python
def log(base: float | IntoExpr = 2.718281828459045) -> Expr
```

Logarithm of each element to the given base.

**Parameters:**

parameter

`base`[float](https://docs.python.org/3/builtins/functions.html#float) | IntoExpr ([float](https://docs.python.org/3/library/functions.html#float) | [int](https://docs.python.org/3/library/functions.html#int) | [float](https://docs.python.org/3/library/functions.html#float) | [Decimal](https://docs.tabsdata.com/api/module/tabsdatak-tableframe-datatypes#tabsdatak.tableframe.datatypes.Decimal) | [date](https://docs.python.org/3/library/datetime.html#datetime.date) | [time](https://docs.python.org/3/library/datetime.html#datetime.time) | [datetime](https://docs.python.org/3/library/datetime.html#datetime.datetime) | [timedelta](https://docs.python.org/3/library/datetime.html#datetime.timedelta) | [str](https://docs.python.org/3/library/stdtypes.html#str) | [bool](https://docs.python.org/3/library/functions.html#bool) | [bytes](https://docs.python.org/3/library/stdtypes.html#bytes) | [list](https://docs.python.org/3/library/stdtypes.html#list)\[[Any](https://docs.python.org/3/library/typing.html#typing.Any)\] | [Expr](https://docs.tabsdata.com/api/category/tableframe/tableframe/expr) | [str](https://docs.python.org/3/library/stdtypes.html#str) | None)

Logarithm base; defaults to `e` (natural logarithm).

**Example:**

```python
tf.select(col("v").log().alias("ln"))
```

Pass a base for a logarithm other than the natural one:

```python
tf.select(col("v").log(2).alias("log2"))
```

method

`log1p`

```python
def log1p() -> Expr
```

Natural logarithm of `1 + element`.

**Example:**

```python
tf.select(col("v").log1p().alias("log1p"))
```

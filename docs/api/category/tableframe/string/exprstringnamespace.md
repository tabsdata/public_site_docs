# ExprStringNameSpace

> String methods, accessed via `Expr.str`.

Source: https://docs.tabsdata.com/api/category/tableframe/string/exprstringnamespace

class

```python
class ExprStringNameSpace
```

**Categories:** string

String methods, accessed via `Expr.str`.

## Examples

```python
tf.with_columns(col("name").str.to_uppercase().alias("upper"))
```

## Methods

method

`to_date`

```python
def to_date(
    format: str | None = None,
    *,
    strict: bool = True,
    exact: bool = True,
    cache: bool = True,
) -> Expr
```

Parse each string into a date.

**Parameters:**

parameter

`format`[str](https://docs.python.org/3/builtins/stdtypes.html#str) | None

chrono-style date format (e.g. `%Y-%m-%d`); inferred when omitted.

parameter

`strict`[bool](https://docs.python.org/3/builtins/functions.html#bool)

If `True`, raise on an unparseable string; if `False`, set it to null.

parameter

`exact`[bool](https://docs.python.org/3/builtins/functions.html#bool)

If `True`, the whole string must match; if `False`, match a date found anywhere in it.

parameter

`cache`[bool](https://docs.python.org/3/builtins/functions.html#bool)

Cache parsing of repeated strings.

**Example:**

```python
tf.select(col("day").str.to_date("%Y-%m-%d").alias("date"))
```

Omit the format to have it inferred, and pass `strict=False` to null out the strings that do not parse:

```python
tf.select(col("day").str.to_date(strict=False).alias("date"))
```

method

`to_datetime`

```python
def to_datetime(
    format: str | None = None,
    *,
    time_unit: TimeUnit | None = None,
    time_zone: str | None = None,
    strict: bool = True,
    exact: bool = True,
    cache: bool = True,
    ambiguous: Ambiguous | Expr = 'raise',
) -> Expr
```

Parse each string into a datetime.

**Parameters:**

parameter

`format`[str](https://docs.python.org/3/builtins/stdtypes.html#str) | None

chrono-style datetime format; inferred when omitted.

parameter

`time_unit`TimeUnit | None (Literal\['ns', 'us', 'ms'\] | None)

Resolution of the result: `ns`, `us` or `ms`.

parameter

`time_zone`[str](https://docs.python.org/3/builtins/stdtypes.html#str) | None

Time zone to attach to the result.

parameter

`strict`[bool](https://docs.python.org/3/builtins/functions.html#bool)

If `True`, raise on an unparseable string; if `False`, set it to null.

parameter

`exact`[bool](https://docs.python.org/3/builtins/functions.html#bool)

If `True`, the whole string must match; if `False`, match a datetime found anywhere in it.

parameter

`cache`[bool](https://docs.python.org/3/builtins/functions.html#bool)

Cache parsing of repeated strings.

parameter

`ambiguous`Ambiguous | [Expr](https://docs.tabsdata.com/api/category/tableframe/tableframe/expr) (Literal\['earliest', 'latest', 'raise', 'null'\] | [Expr](https://docs.tabsdata.com/api/category/tableframe/tableframe/expr))

Policy for ambiguous local times: `earliest`, `latest`, `raise` or `null`.

**Example:**

```python
tf.select(col("when").str.to_datetime("%Y-%m-%d %H:%M:%S"))
```

method

`to_time`

```python
def to_time(
    format: str | None = None,
    *,
    strict: bool = True,
    cache: bool = True,
) -> Expr
```

Parse each string into a time.

**Parameters:**

parameter

`format`[str](https://docs.python.org/3/builtins/stdtypes.html#str) | None

chrono-style time format (e.g. `%H:%M:%S`); inferred when omitted.

parameter

`strict`[bool](https://docs.python.org/3/builtins/functions.html#bool)

If `True`, raise on an unparseable string; if `False`, set it to null.

parameter

`cache`[bool](https://docs.python.org/3/builtins/functions.html#bool)

Cache parsing of repeated strings.

**Example:**

```python
tf.select(col("clock").str.to_time("%H:%M:%S").alias("time"))
```

method

`len_bytes`

```python
def len_bytes() -> Expr
```

Number of bytes in each string (not characters).

**Example:**

```python
tf.select(col("name").str.len_bytes().alias("bytes"))
```

method

`len_chars`

```python
def len_chars() -> Expr
```

Number of characters in each string (not bytes).

**Example:**

```python
tf.select(col("name").str.len_chars().alias("chars"))
```

method

`to_uppercase`

```python
def to_uppercase() -> Expr
```

Convert each string to uppercase.

**Example:**

```python
tf.with_columns(col("name").str.to_uppercase().alias("upper"))
```

method

`to_lowercase`

```python
def to_lowercase() -> Expr
```

Convert each string to lowercase.

**Example:**

```python
tf.with_columns(col("name").str.to_lowercase().alias("lower"))
```

method

`to_titlecase`

```python
def to_titlecase() -> Expr
```

Title-case each string, capitalizing the first letter of a word.

**Example:**

```python
tf.with_columns(col("name").str.to_titlecase().alias("title"))
```

method

`strip_chars`

```python
def strip_chars(characters: IntoExpr = None) -> Expr
```

Trim the given characters from both ends of each string.

**Parameters:**

parameter

`characters`IntoExpr ([int](https://docs.python.org/3/library/functions.html#int) | [float](https://docs.python.org/3/library/functions.html#float) | [Decimal](https://docs.tabsdata.com/api/module/tabsdatak-tableframe-datatypes#tabsdatak.tableframe.datatypes.Decimal) | [date](https://docs.python.org/3/library/datetime.html#datetime.date) | [time](https://docs.python.org/3/library/datetime.html#datetime.time) | [datetime](https://docs.python.org/3/library/datetime.html#datetime.datetime) | [timedelta](https://docs.python.org/3/library/datetime.html#datetime.timedelta) | [str](https://docs.python.org/3/library/stdtypes.html#str) | [bool](https://docs.python.org/3/library/functions.html#bool) | [bytes](https://docs.python.org/3/library/stdtypes.html#bytes) | [list](https://docs.python.org/3/library/stdtypes.html#list)\[[Any](https://docs.python.org/3/library/typing.html#typing.Any)\] | [Expr](https://docs.tabsdata.com/api/category/tableframe/tableframe/expr) | [str](https://docs.python.org/3/library/stdtypes.html#str) | None)

Set of characters to remove, in any order; whitespace when omitted.

**Example:**

```python
tf.with_columns(col("name").str.strip_chars().alias("trimmed"))
```

Pass the characters to remove to strip something other than whitespace:

```python
tf.select(col("email").str.strip_chars(".moc").alias("stripped"))
```

method

`strip_chars_start`

```python
def strip_chars_start(characters: IntoExpr = None) -> Expr
```

Trim the given characters from the start of each string.

**Parameters:**

parameter

`characters`IntoExpr ([int](https://docs.python.org/3/library/functions.html#int) | [float](https://docs.python.org/3/library/functions.html#float) | [Decimal](https://docs.tabsdata.com/api/module/tabsdatak-tableframe-datatypes#tabsdatak.tableframe.datatypes.Decimal) | [date](https://docs.python.org/3/library/datetime.html#datetime.date) | [time](https://docs.python.org/3/library/datetime.html#datetime.time) | [datetime](https://docs.python.org/3/library/datetime.html#datetime.datetime) | [timedelta](https://docs.python.org/3/library/datetime.html#datetime.timedelta) | [str](https://docs.python.org/3/library/stdtypes.html#str) | [bool](https://docs.python.org/3/library/functions.html#bool) | [bytes](https://docs.python.org/3/library/stdtypes.html#bytes) | [list](https://docs.python.org/3/library/stdtypes.html#list)\[[Any](https://docs.python.org/3/library/typing.html#typing.Any)\] | [Expr](https://docs.tabsdata.com/api/category/tableframe/tableframe/expr) | [str](https://docs.python.org/3/library/stdtypes.html#str) | None)

Set of characters to remove, in any order; whitespace when omitted.

**Example:**

```python
tf.select(col("name").str.strip_chars_start().alias("lstripped"))
```

method

`strip_chars_end`

```python
def strip_chars_end(characters: IntoExpr = None) -> Expr
```

Trim the given characters from the end of each string.

**Parameters:**

parameter

`characters`IntoExpr ([int](https://docs.python.org/3/library/functions.html#int) | [float](https://docs.python.org/3/library/functions.html#float) | [Decimal](https://docs.tabsdata.com/api/module/tabsdatak-tableframe-datatypes#tabsdatak.tableframe.datatypes.Decimal) | [date](https://docs.python.org/3/library/datetime.html#datetime.date) | [time](https://docs.python.org/3/library/datetime.html#datetime.time) | [datetime](https://docs.python.org/3/library/datetime.html#datetime.datetime) | [timedelta](https://docs.python.org/3/library/datetime.html#datetime.timedelta) | [str](https://docs.python.org/3/library/stdtypes.html#str) | [bool](https://docs.python.org/3/library/functions.html#bool) | [bytes](https://docs.python.org/3/library/stdtypes.html#bytes) | [list](https://docs.python.org/3/library/stdtypes.html#list)\[[Any](https://docs.python.org/3/library/typing.html#typing.Any)\] | [Expr](https://docs.tabsdata.com/api/category/tableframe/tableframe/expr) | [str](https://docs.python.org/3/library/stdtypes.html#str) | None)

Set of characters to remove, in any order; whitespace when omitted.

**Example:**

```python
tf.select(col("name").str.strip_chars_end().alias("rstripped"))
```

method

`strip_prefix`

```python
def strip_prefix(prefix: IntoExpr) -> Expr
```

Remove `prefix` from the start of each string if present.

**Parameters:**

parameter

`prefix`IntoExpr ([int](https://docs.python.org/3/library/functions.html#int) | [float](https://docs.python.org/3/library/functions.html#float) | [Decimal](https://docs.tabsdata.com/api/module/tabsdatak-tableframe-datatypes#tabsdatak.tableframe.datatypes.Decimal) | [date](https://docs.python.org/3/library/datetime.html#datetime.date) | [time](https://docs.python.org/3/library/datetime.html#datetime.time) | [datetime](https://docs.python.org/3/library/datetime.html#datetime.datetime) | [timedelta](https://docs.python.org/3/library/datetime.html#datetime.timedelta) | [str](https://docs.python.org/3/library/stdtypes.html#str) | [bool](https://docs.python.org/3/library/functions.html#bool) | [bytes](https://docs.python.org/3/library/stdtypes.html#bytes) | [list](https://docs.python.org/3/library/stdtypes.html#list)\[[Any](https://docs.python.org/3/library/typing.html#typing.Any)\] | [Expr](https://docs.tabsdata.com/api/category/tableframe/tableframe/expr) | [str](https://docs.python.org/3/library/stdtypes.html#str) | None)

Exact prefix to remove.

**Example:**

```python
tf.select(col("email").str.strip_prefix("ada").alias("rest"))
```

method

`strip_suffix`

```python
def strip_suffix(suffix: IntoExpr) -> Expr
```

Remove `suffix` from the end of each string if present.

**Parameters:**

parameter

`suffix`IntoExpr ([int](https://docs.python.org/3/library/functions.html#int) | [float](https://docs.python.org/3/library/functions.html#float) | [Decimal](https://docs.tabsdata.com/api/module/tabsdatak-tableframe-datatypes#tabsdatak.tableframe.datatypes.Decimal) | [date](https://docs.python.org/3/library/datetime.html#datetime.date) | [time](https://docs.python.org/3/library/datetime.html#datetime.time) | [datetime](https://docs.python.org/3/library/datetime.html#datetime.datetime) | [timedelta](https://docs.python.org/3/library/datetime.html#datetime.timedelta) | [str](https://docs.python.org/3/library/stdtypes.html#str) | [bool](https://docs.python.org/3/library/functions.html#bool) | [bytes](https://docs.python.org/3/library/stdtypes.html#bytes) | [list](https://docs.python.org/3/library/stdtypes.html#list)\[[Any](https://docs.python.org/3/library/typing.html#typing.Any)\] | [Expr](https://docs.tabsdata.com/api/category/tableframe/tableframe/expr) | [str](https://docs.python.org/3/library/stdtypes.html#str) | None)

Exact suffix to remove.

**Example:**

```python
tf.select(col("email").str.strip_suffix(".com").alias("rest"))
```

method

`pad_start`

```python
def pad_start(length: int | IntoExprColumn, fill_char: str = ' ') -> Expr
```

Left-pad each string to `length` with a fill character.

Strings already at or over `length` are unchanged.

**Parameters:**

parameter

`length`[int](https://docs.python.org/3/builtins/functions.html#int) | IntoExprColumn ([int](https://docs.python.org/3/library/functions.html#int) | [Expr](https://docs.tabsdata.com/api/category/tableframe/tableframe/expr) | [str](https://docs.python.org/3/library/stdtypes.html#str))

Target length.

parameter

`fill_char`[str](https://docs.python.org/3/builtins/stdtypes.html#str)

Single character used for padding.

**Example:**

```python
tf.select(col("qty").str.pad_start(6, "-").alias("padded"))
```

method

`pad_end`

```python
def pad_end(length: int | IntoExprColumn, fill_char: str = ' ') -> Expr
```

Right-pad each string to `length` with a fill character.

Strings already at or over `length` are unchanged.

**Parameters:**

parameter

`length`[int](https://docs.python.org/3/builtins/functions.html#int) | IntoExprColumn ([int](https://docs.python.org/3/library/functions.html#int) | [Expr](https://docs.tabsdata.com/api/category/tableframe/tableframe/expr) | [str](https://docs.python.org/3/library/stdtypes.html#str))

Target length.

parameter

`fill_char`[str](https://docs.python.org/3/builtins/stdtypes.html#str)

Single character used for padding.

**Example:**

```python
tf.select(col("qty").str.pad_end(6, "-").alias("padded"))
```

method

`zfill`

```python
def zfill(length: int | IntoExprColumn) -> Expr
```

Left-pad each numeric string with zeros to `length`.

A leading sign is preserved before the zeros. Strings already at or over `length` are unchanged.

**Parameters:**

parameter

`length`[int](https://docs.python.org/3/builtins/functions.html#int) | IntoExprColumn ([int](https://docs.python.org/3/library/functions.html#int) | [Expr](https://docs.tabsdata.com/api/category/tableframe/tableframe/expr) | [str](https://docs.python.org/3/library/stdtypes.html#str))

Target length.

**Example:**

```python
tf.select(col("qty").str.zfill(5).alias("padded"))  # "42" -> "00042"
```

method

`contains`

```python
def contains(pattern: str | Expr, *, literal: bool = False, strict: bool = True) -> Expr
```

Return whether each string contains `pattern`.

**Parameters:**

parameter

`pattern`[str](https://docs.python.org/3/builtins/stdtypes.html#str) | [Expr](https://docs.tabsdata.com/api/category/tableframe/tableframe/expr)

Regular expression, or a literal when `literal` is `True`.

parameter

`literal`[bool](https://docs.python.org/3/builtins/functions.html#bool)

Treat `pattern` as a literal string, not a regex.

parameter

`strict`[bool](https://docs.python.org/3/builtins/functions.html#bool)

If `True`, raise on an invalid regex.

**Example:**

```python
tf.filter(col("email").str.contains("@example"))
```

The pattern is a regular expression unless `literal` is set:

```python
tf.filter(col("email").str.contains(".com", literal=True))
```

method

`find`

```python
def find(pattern: str | Expr, *, literal: bool = False, strict: bool = True) -> Expr
```

Return the index of the first match of `pattern`, or null.

**Parameters:**

parameter

`pattern`[str](https://docs.python.org/3/builtins/stdtypes.html#str) | [Expr](https://docs.tabsdata.com/api/category/tableframe/tableframe/expr)

Regular expression, or a literal when `literal` is `True`.

parameter

`literal`[bool](https://docs.python.org/3/builtins/functions.html#bool)

Treat `pattern` as a literal string, not a regex.

parameter

`strict`[bool](https://docs.python.org/3/builtins/functions.html#bool)

If `True`, raise on an invalid regex.

**Example:**

```python
tf.select(col("email").str.find("@").alias("at"))
```

method

`ends_with`

```python
def ends_with(suffix: str | Expr) -> Expr
```

Return whether each string ends with `suffix`.

**Parameters:**

parameter

`suffix`[str](https://docs.python.org/3/builtins/stdtypes.html#str) | [Expr](https://docs.tabsdata.com/api/category/tableframe/tableframe/expr)

Literal suffix to test for.

**Example:**

```python
tf.filter(col("email").str.ends_with(".com"))
```

method

`starts_with`

```python
def starts_with(prefix: str | Expr) -> Expr
```

Return whether each string starts with `prefix`.

**Parameters:**

parameter

`prefix`[str](https://docs.python.org/3/builtins/stdtypes.html#str) | [Expr](https://docs.tabsdata.com/api/category/tableframe/tableframe/expr)

Literal prefix to test for.

**Example:**

```python
tf.filter(col("email").str.starts_with("ada"))
```

method

`extract`

```python
def extract(pattern: IntoExprColumn, group_index: int = 1) -> Expr
```

Extract a regex capture group from each string.

Returns null where the pattern does not match.

**Parameters:**

parameter

`pattern`IntoExprColumn ([Expr](https://docs.tabsdata.com/api/category/tableframe/tableframe/expr) | [str](https://docs.python.org/3/library/stdtypes.html#str))

Regular expression with one or more capture groups.

parameter

`group_index`[int](https://docs.python.org/3/builtins/functions.html#int)

1-based group to return; `0` returns the whole match.

**Example:**

```python
col("email").str.extract(r"(.+)@(.+)", 2)  # the domain
```

method

`count_matches`

```python
def count_matches(pattern: str | Expr, *, literal: bool = False) -> Expr
```

Count non-overlapping matches of `pattern` in each string.

**Parameters:**

parameter

`pattern`[str](https://docs.python.org/3/builtins/stdtypes.html#str) | [Expr](https://docs.tabsdata.com/api/category/tableframe/tableframe/expr)

Regular expression, or a literal when `literal` is `True`.

parameter

`literal`[bool](https://docs.python.org/3/builtins/functions.html#bool)

Treat `pattern` as a literal string, not a regex.

**Example:**

```python
tf.select(
    col("email").str.count_matches(".", literal=True).alias("dots"),
)
```

method

`replace`

```python
def replace(
    pattern: str | Expr,
    value: str | Expr,
    *,
    literal: bool = False,
    n: int = 1,
) -> Expr
```

Replace matches of `pattern` with `value` in each string.

**Parameters:**

parameter

`pattern`[str](https://docs.python.org/3/builtins/stdtypes.html#str) | [Expr](https://docs.tabsdata.com/api/category/tableframe/tableframe/expr)

Regular expression, or a literal when `literal` is `True`.

parameter

`value`[str](https://docs.python.org/3/builtins/stdtypes.html#str) | [Expr](https://docs.tabsdata.com/api/category/tableframe/tableframe/expr)

Replacement string; may reference capture groups.

parameter

`literal`[bool](https://docs.python.org/3/builtins/functions.html#bool)

Treat `pattern` as a literal string, not a regex.

parameter

`n`[int](https://docs.python.org/3/builtins/functions.html#int)

Number of matches to replace, counted from the left.

**Example:**

```python
tf.with_columns(col("email").str.replace("example", "acme"))
```

Only the first match is replaced; use `replace_all` for every match:

```python
tf.select(col("email").str.replace(r"[aeiou]", "*").alias("masked"))
```

method

`replace_all`

```python
def replace_all(
    pattern: str | Expr,
    value: str | Expr,
    *,
    literal: bool = False,
) -> Expr
```

Replace all matches of `pattern` with `value` in each string.

**Parameters:**

parameter

`pattern`[str](https://docs.python.org/3/builtins/stdtypes.html#str) | [Expr](https://docs.tabsdata.com/api/category/tableframe/tableframe/expr)

Regular expression, or a literal when `literal` is `True`.

parameter

`value`[str](https://docs.python.org/3/builtins/stdtypes.html#str) | [Expr](https://docs.tabsdata.com/api/category/tableframe/tableframe/expr)

Replacement string; may reference capture groups.

parameter

`literal`[bool](https://docs.python.org/3/builtins/functions.html#bool)

Treat `pattern` as a literal string, not a regex.

**Example:**

```python
tf.select(col("email").str.replace_all(r"[aeiou]", "*"))
```

method

`reverse`

```python
def reverse() -> Expr
```

Reverse the characters of each string.

**Example:**

```python
tf.select(col("name").str.reverse().alias("reversed"))
```

method

`slice`

```python
def slice(
    offset: int | IntoExprColumn,
    length: int | IntoExprColumn | None = None,
) -> Expr
```

Extract a substring at an offset for a given length.

**Parameters:**

parameter

`offset`[int](https://docs.python.org/3/builtins/functions.html#int) | IntoExprColumn ([int](https://docs.python.org/3/library/functions.html#int) | [Expr](https://docs.tabsdata.com/api/category/tableframe/tableframe/expr) | [str](https://docs.python.org/3/library/stdtypes.html#str))

Start index; a negative value counts from the end.

parameter

`length`[int](https://docs.python.org/3/builtins/functions.html#int) | IntoExprColumn | None ([int](https://docs.python.org/3/library/functions.html#int) | [Expr](https://docs.tabsdata.com/api/category/tableframe/tableframe/expr) | [str](https://docs.python.org/3/library/stdtypes.html#str) | None)

Number of characters; to the end of the string when omitted.

**Example:**

```python
tf.select(col("email").str.slice(0, 3).alias("prefix"))
```

A negative offset counts from the end of the string:

```python
tf.select(col("email").str.slice(-3).alias("tld"))
```

method

`head`

```python
def head(n: int | IntoExprColumn) -> Expr
```

Return the first `n` characters of each string.

**Parameters:**

parameter

`n`[int](https://docs.python.org/3/builtins/functions.html#int) | IntoExprColumn ([int](https://docs.python.org/3/library/functions.html#int) | [Expr](https://docs.tabsdata.com/api/category/tableframe/tableframe/expr) | [str](https://docs.python.org/3/library/stdtypes.html#str))

Number of leading characters; a negative value drops that many from the end.

**Example:**

```python
tf.select(col("email").str.head(3).alias("first_three"))
```

method

`tail`

```python
def tail(n: int | IntoExprColumn) -> Expr
```

Return the last `n` characters of each string.

**Parameters:**

parameter

`n`[int](https://docs.python.org/3/builtins/functions.html#int) | IntoExprColumn ([int](https://docs.python.org/3/library/functions.html#int) | [Expr](https://docs.tabsdata.com/api/category/tableframe/tableframe/expr) | [str](https://docs.python.org/3/library/stdtypes.html#str))

Number of trailing characters; a negative value drops that many from the start.

**Example:**

```python
tf.select(col("email").str.tail(3).alias("last_three"))
```

method

`to_integer`

```python
def to_integer(
    *,
    base: int | IntoExprColumn = 10,
    dtype: PolarsIntegerType = Int64,
    strict: bool = True,
) -> Expr
```

Parse each string into an integer.

#MANUAL CHANGE POST GEN: default `dtype` is the Tabsdata alias [`Int64`](https://docs.tabsdata.com/api/module/tabsdatak-tableframe-datatypes#tabsdatak.tableframe.datatypes.Int64) from `tabsdatak.tableframe.datatypes` (import added); the generated stub referenced a bare, unimported [`Int64`](https://docs.tabsdata.com/api/module/tabsdatak-tableframe-datatypes#tabsdatak.tableframe.datatypes.Int64).

**Parameters:**

parameter

`base`[int](https://docs.python.org/3/builtins/functions.html#int) | IntoExprColumn ([int](https://docs.python.org/3/library/functions.html#int) | [Expr](https://docs.tabsdata.com/api/category/tableframe/tableframe/expr) | [str](https://docs.python.org/3/library/stdtypes.html#str))

Numeric base for parsing (e.g. `10`, `2`, `16`).

parameter

`dtype`PolarsIntegerType ([type](https://docs.python.org/3/library/functions.html#type)\[[Any](https://docs.python.org/3/library/typing.html#typing.Any)\])

Target integer type -- a Tabsdata datatype (e.g. [`Int64`](https://docs.tabsdata.com/api/module/tabsdatak-tableframe-datatypes#tabsdatak.tableframe.datatypes.Int64), [`Int32`](https://docs.tabsdata.com/api/module/tabsdatak-tableframe-datatypes#tabsdatak.tableframe.datatypes.Int32), [`UInt16`](https://docs.tabsdata.com/api/module/tabsdatak-tableframe-datatypes#tabsdatak.tableframe.datatypes.UInt16)), not a raw polars one.

parameter

`strict`[bool](https://docs.python.org/3/builtins/functions.html#bool)

If `True`, raise on an unparseable string; if `False`, set it to null.

**Example:**

```python
tf.select(col("qty").str.to_integer().alias("count"))
```

Parse in another base, or widen the result type:

```python
tf.select(col("qty").str.to_integer(base=16, dtype=Int32))
```

method

`contains_any`

```python
def contains_any(patterns: IntoExpr, *, ascii_case_insensitive: bool = False) -> Expr
```

Return whether each string contains any of the patterns.

**Parameters:**

parameter

`patterns`IntoExpr ([int](https://docs.python.org/3/library/functions.html#int) | [float](https://docs.python.org/3/library/functions.html#float) | [Decimal](https://docs.tabsdata.com/api/module/tabsdatak-tableframe-datatypes#tabsdatak.tableframe.datatypes.Decimal) | [date](https://docs.python.org/3/library/datetime.html#datetime.date) | [time](https://docs.python.org/3/library/datetime.html#datetime.time) | [datetime](https://docs.python.org/3/library/datetime.html#datetime.datetime) | [timedelta](https://docs.python.org/3/library/datetime.html#datetime.timedelta) | [str](https://docs.python.org/3/library/stdtypes.html#str) | [bool](https://docs.python.org/3/library/functions.html#bool) | [bytes](https://docs.python.org/3/library/stdtypes.html#bytes) | [list](https://docs.python.org/3/library/stdtypes.html#list)\[[Any](https://docs.python.org/3/library/typing.html#typing.Any)\] | [Expr](https://docs.tabsdata.com/api/category/tableframe/tableframe/expr) | [str](https://docs.python.org/3/library/stdtypes.html#str) | None)

Collection of substrings to search for.

parameter

`ascii_case_insensitive`[bool](https://docs.python.org/3/builtins/functions.html#bool)

Match ASCII letters case-insensitively.

**Example:**

```python
tf.filter(col("email").str.contains_any(["example", "navy"]))
```

method

`replace_many`

```python
def replace_many(
    patterns: IntoExpr | Mapping[str, str],
    replace_with: IntoExpr = ...,
    *,
    ascii_case_insensitive: bool = False,
    leftmost: bool = False,
) -> Expr
```

Replace all occurrences of many substrings at once.

**Parameters:**

parameter

`patterns`IntoExpr | [Mapping](https://docs.python.org/3/library/typing.html#typing.Mapping)\[[str](https://docs.python.org/3/builtins/stdtypes.html#str), [str](https://docs.python.org/3/builtins/stdtypes.html#str)\] ([int](https://docs.python.org/3/library/functions.html#int) | [float](https://docs.python.org/3/library/functions.html#float) | [Decimal](https://docs.tabsdata.com/api/module/tabsdatak-tableframe-datatypes#tabsdatak.tableframe.datatypes.Decimal) | [date](https://docs.python.org/3/library/datetime.html#datetime.date) | [time](https://docs.python.org/3/library/datetime.html#datetime.time) | [datetime](https://docs.python.org/3/library/datetime.html#datetime.datetime) | [timedelta](https://docs.python.org/3/library/datetime.html#datetime.timedelta) | [str](https://docs.python.org/3/library/stdtypes.html#str) | [bool](https://docs.python.org/3/library/functions.html#bool) | [bytes](https://docs.python.org/3/library/stdtypes.html#bytes) | [list](https://docs.python.org/3/library/stdtypes.html#list)\[[Any](https://docs.python.org/3/library/typing.html#typing.Any)\] | [Expr](https://docs.tabsdata.com/api/category/tableframe/tableframe/expr) | [str](https://docs.python.org/3/library/stdtypes.html#str) | None | Mapping\[[str](https://docs.python.org/3/library/stdtypes.html#str), [str](https://docs.python.org/3/library/stdtypes.html#str)\])

Substrings to replace, or a `{pattern: replacement}` mapping.

parameter

`replace_with`IntoExpr ([int](https://docs.python.org/3/library/functions.html#int) | [float](https://docs.python.org/3/library/functions.html#float) | [Decimal](https://docs.tabsdata.com/api/module/tabsdatak-tableframe-datatypes#tabsdatak.tableframe.datatypes.Decimal) | [date](https://docs.python.org/3/library/datetime.html#datetime.date) | [time](https://docs.python.org/3/library/datetime.html#datetime.time) | [datetime](https://docs.python.org/3/library/datetime.html#datetime.datetime) | [timedelta](https://docs.python.org/3/library/datetime.html#datetime.timedelta) | [str](https://docs.python.org/3/library/stdtypes.html#str) | [bool](https://docs.python.org/3/library/functions.html#bool) | [bytes](https://docs.python.org/3/library/stdtypes.html#bytes) | [list](https://docs.python.org/3/library/stdtypes.html#list)\[[Any](https://docs.python.org/3/library/typing.html#typing.Any)\] | [Expr](https://docs.tabsdata.com/api/category/tableframe/tableframe/expr) | [str](https://docs.python.org/3/library/stdtypes.html#str) | None)

Replacement for each pattern, matched by position; omit when `patterns` is a mapping.

parameter

`ascii_case_insensitive`[bool](https://docs.python.org/3/builtins/functions.html#bool)

Match ASCII letters case-insensitively.

parameter

`leftmost`[bool](https://docs.python.org/3/builtins/functions.html#bool)

Match the leftmost pattern instead of the longest.

**Example:**

```python
col("email").str.replace_many({"example": "acme", ".com": ".io"})
```

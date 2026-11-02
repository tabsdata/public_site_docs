# col

> Reference one or more columns as an expression.

Source: https://docs.tabsdata.com/api/category/tableframe/projection/col

function

```python
def col(
    name: str | PolarsDataType | PythonDataType | Iterable[str] | Iterable[PolarsDataType | PythonDataType],
    *more_names: str | PolarsDataType | PythonDataType = (),
) -> Expr
```

**Categories:** projection

Reference one or more columns as an expression.

The returned [`Expr`](https://docs.tabsdata.com/api/category/tableframe/tableframe/expr) is the building block passed to `select`, `with_columns`, `filter` and `agg`.

## Parameters

parameter

`name`[str](https://docs.python.org/3/builtins/stdtypes.html#str) | PolarsDataType | PythonDataType | [Iterable](https://docs.python.org/3/library/typing.html#typing.Iterable)\[[str](https://docs.python.org/3/builtins/stdtypes.html#str)\] | [Iterable](https://docs.python.org/3/library/typing.html#typing.Iterable)\[PolarsDataType | PythonDataType\] ([str](https://docs.python.org/3/library/stdtypes.html#str) | DataType | [type](https://docs.python.org/3/library/functions.html#type)\[[int](https://docs.python.org/3/library/functions.html#int)\] | [type](https://docs.python.org/3/library/functions.html#type)\[[float](https://docs.python.org/3/library/functions.html#float)\] | [type](https://docs.python.org/3/library/functions.html#type)\[[bool](https://docs.python.org/3/library/functions.html#bool)\] | [type](https://docs.python.org/3/library/functions.html#type)\[[str](https://docs.python.org/3/library/stdtypes.html#str)\] | [type](https://docs.python.org/3/library/functions.html#type)\[[date](https://docs.python.org/3/library/datetime.html#datetime.date)\] | [type](https://docs.python.org/3/library/functions.html#type)\[[time](https://docs.python.org/3/library/datetime.html#datetime.time)\] | [type](https://docs.python.org/3/library/functions.html#type)\[[datetime](https://docs.python.org/3/library/datetime.html#datetime.datetime)\] | [type](https://docs.python.org/3/library/functions.html#type)\[[timedelta](https://docs.python.org/3/library/datetime.html#datetime.timedelta)\] | [type](https://docs.python.org/3/library/functions.html#type)\[[list](https://docs.python.org/3/library/stdtypes.html#list)\[[Any](https://docs.python.org/3/library/typing.html#typing.Any)\]\] | [type](https://docs.python.org/3/library/functions.html#type)\[[tuple](https://docs.python.org/3/library/stdtypes.html#tuple)\[[Any](https://docs.python.org/3/library/typing.html#typing.Any), ...\]\] | [type](https://docs.python.org/3/library/functions.html#type)\[[bytes](https://docs.python.org/3/library/stdtypes.html#bytes)\] | [type](https://docs.python.org/3/library/functions.html#type)\[[object](https://docs.python.org/3/library/functions.html#object)\] | [type](https://docs.python.org/3/library/functions.html#type)\[[Decimal](https://docs.tabsdata.com/api/module/tabsdatak-tableframe-datatypes#tabsdatak.tableframe.datatypes.Decimal)\] | [type](https://docs.python.org/3/library/functions.html#type)\[None\] | Iterable\[[str](https://docs.python.org/3/library/stdtypes.html#str)\] | Iterable\[DataType | [type](https://docs.python.org/3/library/functions.html#type)\[[int](https://docs.python.org/3/library/functions.html#int)\] | [type](https://docs.python.org/3/library/functions.html#type)\[[float](https://docs.python.org/3/library/functions.html#float)\] | [type](https://docs.python.org/3/library/functions.html#type)\[[bool](https://docs.python.org/3/library/functions.html#bool)\] | [type](https://docs.python.org/3/library/functions.html#type)\[[str](https://docs.python.org/3/library/stdtypes.html#str)\] | [type](https://docs.python.org/3/library/functions.html#type)\[[date](https://docs.python.org/3/library/datetime.html#datetime.date)\] | [type](https://docs.python.org/3/library/functions.html#type)\[[time](https://docs.python.org/3/library/datetime.html#datetime.time)\] | [type](https://docs.python.org/3/library/functions.html#type)\[[datetime](https://docs.python.org/3/library/datetime.html#datetime.datetime)\] | [type](https://docs.python.org/3/library/functions.html#type)\[[timedelta](https://docs.python.org/3/library/datetime.html#datetime.timedelta)\] | [type](https://docs.python.org/3/library/functions.html#type)\[[list](https://docs.python.org/3/library/stdtypes.html#list)\[[Any](https://docs.python.org/3/library/typing.html#typing.Any)\]\] | [type](https://docs.python.org/3/library/functions.html#type)\[[tuple](https://docs.python.org/3/library/stdtypes.html#tuple)\[[Any](https://docs.python.org/3/library/typing.html#typing.Any), ...\]\] | [type](https://docs.python.org/3/library/functions.html#type)\[[bytes](https://docs.python.org/3/library/stdtypes.html#bytes)\] | [type](https://docs.python.org/3/library/functions.html#type)\[[object](https://docs.python.org/3/library/functions.html#object)\] | [type](https://docs.python.org/3/library/functions.html#type)\[[Decimal](https://docs.tabsdata.com/api/module/tabsdatak-tableframe-datatypes#tabsdatak.tableframe.datatypes.Decimal)\] | [type](https://docs.python.org/3/library/functions.html#type)\[None\]\])

A column name, a data type (to select every column of that type), or an iterable of either. A name wrapped in `^` and `$` is treated as a regular expression.

parameter

`*more_names`[str](https://docs.python.org/3/builtins/stdtypes.html#str) | PolarsDataType | PythonDataType ([str](https://docs.python.org/3/library/stdtypes.html#str) | DataType | [type](https://docs.python.org/3/library/functions.html#type)\[[int](https://docs.python.org/3/library/functions.html#int)\] | [type](https://docs.python.org/3/library/functions.html#type)\[[float](https://docs.python.org/3/library/functions.html#float)\] | [type](https://docs.python.org/3/library/functions.html#type)\[[bool](https://docs.python.org/3/library/functions.html#bool)\] | [type](https://docs.python.org/3/library/functions.html#type)\[[str](https://docs.python.org/3/library/stdtypes.html#str)\] | [type](https://docs.python.org/3/library/functions.html#type)\[[date](https://docs.python.org/3/library/datetime.html#datetime.date)\] | [type](https://docs.python.org/3/library/functions.html#type)\[[time](https://docs.python.org/3/library/datetime.html#datetime.time)\] | [type](https://docs.python.org/3/library/functions.html#type)\[[datetime](https://docs.python.org/3/library/datetime.html#datetime.datetime)\] | [type](https://docs.python.org/3/library/functions.html#type)\[[timedelta](https://docs.python.org/3/library/datetime.html#datetime.timedelta)\] | [type](https://docs.python.org/3/library/functions.html#type)\[[list](https://docs.python.org/3/library/stdtypes.html#list)\[[Any](https://docs.python.org/3/library/typing.html#typing.Any)\]\] | [type](https://docs.python.org/3/library/functions.html#type)\[[tuple](https://docs.python.org/3/library/stdtypes.html#tuple)\[[Any](https://docs.python.org/3/library/typing.html#typing.Any), ...\]\] | [type](https://docs.python.org/3/library/functions.html#type)\[[bytes](https://docs.python.org/3/library/stdtypes.html#bytes)\] | [type](https://docs.python.org/3/library/functions.html#type)\[[object](https://docs.python.org/3/library/functions.html#object)\] | [type](https://docs.python.org/3/library/functions.html#type)\[[Decimal](https://docs.tabsdata.com/api/module/tabsdatak-tableframe-datatypes#tabsdatak.tableframe.datatypes.Decimal)\] | [type](https://docs.python.org/3/library/functions.html#type)\[None\])

Additional column names or data types, as positional arguments.

## Examples

```python
tf.select(col("a"), (col("b") * 2).alias("b2"))
tf.filter(col("g").is_in(["x", "y"]))
```

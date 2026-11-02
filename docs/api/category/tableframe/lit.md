# lit

> Build an expression from a literal (constant) value.

Source: https://docs.tabsdata.com/api/category/tableframe/lit

function

```python
def lit(
    value: Any,
    dtype: PolarsDataType | None = None,
    *,
    allow_object: bool = False,
) -> Expr
```

**Categories:** generation

Build an expression from a literal (constant) value.

Use it to add or compare against constant values in `select` / `with_columns` / `filter`.

## Parameters

parameter

`value`[Any](https://docs.python.org/3/library/typing.html#typing.Any)

The literal value.

parameter

`dtype`PolarsDataType | None (DataType | None)

Data type for the literal; inferred from `value` when omitted.

parameter

`allow_object`[bool](https://docs.python.org/3/builtins/functions.html#bool)

Allow storing an arbitrary Python object as the value.

## Examples

```python
tf.with_columns(lit(7).alias("c"))
tf.select(lit(1.5).alias("r"))
```

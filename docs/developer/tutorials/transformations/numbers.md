# Transform Numbers

Source: https://docs.tabsdata.com/developer/tutorials/transformations/numbers

Mathematical and numeric operations on columns.

## Arithmetic Operations

Basic arithmetic

add.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["orders"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    expr = col("price") + 10
    return tf.with_columns(expr)
```

orders

| price |
| --- |
| 100 |
| 40 |

2 rows

result

| price |
| --- |
| 110 |
| 50 |

2 rows

Subtract one column from another, row by row.

subtract.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["orders"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    expr = col("price") - col("discount")
    return tf.with_columns(expr)
```

orders

| price | discount |
| --- | --- |
| 100 | 15 |
| 40 | 5 |

2 rows

result

| price | discount |
| --- | --- |
| 85 | 15 |
| 35 | 5 |

2 rows

Multiply two columns, row by row.

multiply.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["orders"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    expr = col("quantity") * col("unit_price")
    return tf.with_columns(expr)
```

orders

| quantity | unit\_price |
| --- | --- |
| 3 | 10 |
| 2 | 4.5 |

2 rows

result

| quantity | unit\_price |
| --- | --- |
| 30 | 10 |
| 9 | 4.5 |

2 rows

Divide one column by another, row by row.

divide.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["orders"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    expr = col("total") / col("count")
    return tf.with_columns(expr)
```

orders

| total | count |
| --- | --- |
| 90 | 3 |
| 50 | 4 |

2 rows

result

| total | count |
| --- | --- |
| 30 | 3 |
| 12.5 | 4 |

2 rows

Method syntax

add.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["pairs"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    expr = col("a").add(col("b"))
    return tf.with_columns(expr)
```

pairs

| a | b |
| --- | --- |
| 7 | 2 |
| 9 | 4 |

2 rows

result

| a | b |
| --- | --- |
| 9 | 2 |
| 13 | 4 |

2 rows

Method form of -.

sub.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["pairs"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    expr = col("a").sub(col("b"))
    return tf.with_columns(expr)
```

pairs

| a | b |
| --- | --- |
| 7 | 2 |
| 9 | 4 |

2 rows

result

| a | b |
| --- | --- |
| 5 | 2 |
| 5 | 4 |

2 rows

Method form of \*.

mul.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["pairs"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    expr = col("a").mul(col("b"))
    return tf.with_columns(expr)
```

pairs

| a | b |
| --- | --- |
| 7 | 2 |
| 9 | 4 |

2 rows

result

| a | b |
| --- | --- |
| 14 | 2 |
| 36 | 4 |

2 rows

Method form of /, always returning a float.

truediv.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["pairs"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    expr = col("a").truediv(col("b"))
    return tf.with_columns(expr)
```

pairs

| a | b |
| --- | --- |
| 7 | 2 |
| 9 | 4 |

2 rows

result

| a | b |
| --- | --- |
| 3.5 | 2 |
| 2.25 | 4 |

2 rows

Modulo

mod.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["pairs"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    expr = col("a").mod(col("b"))  # Modulo
    return tf.with_columns(expr)
```

pairs

| a | b |
| --- | --- |
| 7 | 2 |
| 9 | 4 |

2 rows

result

| a | b |
| --- | --- |
| 1 | 2 |
| 1 | 4 |

2 rows

## Rounding and Clipping

Round to 2 decimal places

round.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["items"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    expr = col("price").round(2)  # Round to 2 decimal places
    return tf.with_columns(expr)
```

items

| item | price |
| --- | --- |
| widget | 19.9876 |
| gadget | 4.201 |

2 rows

result

| item | price |
| --- | --- |
| widget | 19.99 |
| gadget | 4.2 |

2 rows

Round to 3 significant figures

round\_sig\_figs.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["readings"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    expr = col("value").round_sig_figs(3)  # Round to 3 significant figures
    return tf.with_columns(expr)
```

readings

| value |
| --- |
| 1234.5678 |
| 0.00098765 |

2 rows

result

| value |
| --- |
| 1230 |
| 0.000988 |

2 rows

Round down

floor.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["orders"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    expr = col("amount").floor()  # Round down
    return tf.with_columns(expr)
```

orders

| amount |
| --- |
| 19.7 |
| \-3.2 |

2 rows

result

| amount |
| --- |
| 19 |
| \-4 |

2 rows

Round up

ceil.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["orders"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    expr = col("amount").ceil()  # Round up
    return tf.with_columns(expr)
```

orders

| amount |
| --- |
| 19.7 |
| \-3.2 |

2 rows

result

| amount |
| --- |
| 20 |
| \-3 |

2 rows

Clipping (constrain to range)

clip.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["results"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    expr = col("score").clip(lower_bound=0, upper_bound=100)
    return tf.with_columns(expr)
```

results

| score |
| --- |
| 142 |
| \-8 |
| 73 |

3 rows

result

| score |
| --- |
| 100 |
| 0 |
| 73 |

3 rows

## Mathematical Functions

Absolute value and sign

abs.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["readings"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    expr = col("change").abs()
    return tf.with_columns(expr)
```

readings

| change |
| --- |
| \-4.5 |
| 2 |

2 rows

result

| change |
| --- |
| 4.5 |
| 2 |

2 rows

Returns -1, 0, or 1

sign.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["readings"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    expr = col("value").sign()  # Returns -1, 0, or 1
    return tf.with_columns(expr)
```

readings

| value |
| --- |
| \-4 |
| 0 |
| 7 |

3 rows

result

| value |
| --- |
| \-1 |
| 0 |
| 1 |

3 rows

Negate

neg.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["readings"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    expr = col("value").neg()  # Negate
    return tf.with_columns(expr)
```

readings

| value |
| --- |
| \-4 |
| 7 |

2 rows

result

| value |
| --- |
| 4 |
| \-7 |

2 rows

Square

pow.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["values"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    expr = col("x").pow(2)  # Square
    return tf.with_columns(expr)
```

values

| x |
| --- |
| 8 |
| 27 |

2 rows

result

| x |
| --- |
| 64 |
| 729 |

2 rows

Square root

sqrt.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["values"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    expr = col("x").sqrt()  # Square root
    return tf.with_columns(expr)
```

values

| x |
| --- |
| 9 |
| 2 |

2 rows

result

| x |
| --- |
| 3 |
| 1.4142 |

2 rows

Cube root

cbrt.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["values"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    expr = col("x").cbrt()  # Cube root
    return tf.with_columns(expr)
```

values

| x |
| --- |
| 27 |
| 8 |

2 rows

result

| x |
| --- |
| 3 |
| 2 |

2 rows

Natural logarithm

log.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["values"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    expr = col("x").log()  # Natural logarithm
    return tf.with_columns(expr)
```

values

| x |
| --- |
| 1 |
| 10 |

2 rows

result

| x |
| --- |
| 0 |
| 2.3026 |

2 rows

Base-10 logarithm

log10.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["values"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    expr = col("x").log10()  # Base-10 logarithm
    return tf.with_columns(expr)
```

values

| x |
| --- |
| 1 |
| 10 |

2 rows

result

| x |
| --- |
| 0 |
| 1 |

2 rows

log(1 + x)

log1p.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["values"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    expr = col("x").log1p()  # log(1 + x)
    return tf.with_columns(expr)
```

values

| x |
| --- |
| 0 |
| 1 |

2 rows

result

| x |
| --- |
| 0 |
| 0.6931 |

2 rows

e^x

exp.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["values"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    expr = col("x").exp()  # e^x
    return tf.with_columns(expr)
```

values

| x |
| --- |
| 0 |
| 1 |

2 rows

result

| x |
| --- |
| 1 |
| 2.7183 |

2 rows

## Trigonometric Functions

Basic trig functions

sin.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["readings"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    expr = col("angle").sin()
    return tf.with_columns(expr)
```

readings

| angle |
| --- |
| 0 |
| 1 |

2 rows

result

| angle |
| --- |
| 0 |
| 0.8415 |

2 rows

Cosine of an angle in radians.

cos.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["readings"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    expr = col("angle").cos()
    return tf.with_columns(expr)
```

readings

| angle |
| --- |
| 0 |
| 1 |

2 rows

result

| angle |
| --- |
| 1 |
| 0.5403 |

2 rows

Tangent of an angle in radians.

tan.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["readings"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    expr = col("angle").tan()
    return tf.with_columns(expr)
```

readings

| angle |
| --- |
| 0 |
| 1 |

2 rows

result

| angle |
| --- |
| 0 |
| 1.5574 |

2 rows

Cotangent, the reciprocal of the tangent.

cot.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["readings"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    expr = col("angle").cot()
    return tf.with_columns(expr)
```

readings

| angle |
| --- |
| 1 |
| 2 |

2 rows

result

| angle |
| --- |
| 0.6421 |
| \-0.4577 |

2 rows

Inverse trig functions

arcsin.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["readings"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    expr = col("x").arcsin()
    return tf.with_columns(expr)
```

readings

| x |
| --- |
| 0 |
| 0.5 |

2 rows

result

| x |
| --- |
| 0 |
| 0.5236 |

2 rows

Angle in radians whose cosine is this value.

arccos.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["readings"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    expr = col("x").arccos()
    return tf.with_columns(expr)
```

readings

| x |
| --- |
| 0 |
| 0.5 |

2 rows

result

| x |
| --- |
| 1.5708 |
| 1.0472 |

2 rows

Angle in radians whose tangent is this value.

arctan.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["readings"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    expr = col("x").arctan()
    return tf.with_columns(expr)
```

readings

| x |
| --- |
| 0 |
| 0.5 |

2 rows

result

| x |
| --- |
| 0 |
| 0.4636 |

2 rows

Hyperbolic functions

sinh.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["readings"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    expr = col("x").sinh()
    return tf.with_columns(expr)
```

readings

| x |
| --- |
| 0 |
| 0.5 |

2 rows

result

| x |
| --- |
| 0 |
| 0.5211 |

2 rows

Hyperbolic cosine.

cosh.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["readings"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    expr = col("x").cosh()
    return tf.with_columns(expr)
```

readings

| x |
| --- |
| 0 |
| 0.5 |

2 rows

result

| x |
| --- |
| 1 |
| 1.1276 |

2 rows

Hyperbolic tangent.

tanh.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["readings"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    expr = col("x").tanh()
    return tf.with_columns(expr)
```

readings

| x |
| --- |
| 0 |
| 0.5 |

2 rows

result

| x |
| --- |
| 0 |
| 0.4621 |

2 rows

Degrees to radians

radians.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["readings"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    expr = col("degrees").radians()  # Degrees to radians
    return tf.with_columns(expr)
```

readings

| degrees |
| --- |
| 180 |
| 90 |

2 rows

result

| degrees |
| --- |
| 3.1416 |
| 1.5708 |

2 rows

Radians to degrees

degrees.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["readings"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    expr = col("radians").degrees()  # Radians to degrees
    return tf.with_columns(expr)
```

readings

| radians |
| --- |
| 3.14159 |
| 1.5708 |

2 rows

result

| radians |
| --- |
| 180 |
| 90.0002 |

2 rows

## Difference and Comparison

Difference from previous row

diff.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["readings"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    expr = col("value").diff()  # Difference from previous row
    return tf.with_columns(expr)
```

readings

| value |
| --- |
| 10 |
| 13 |
| 9 |

3 rows

result

| value |
| --- |
| null |
| 3 |
| \-4 |

3 rows

Difference from 2 rows ago

diff.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["readings"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    expr = col("value").diff(n=2)  # Difference from 2 rows ago
    return tf.with_columns(expr)
```

readings

| value |
| --- |
| 10 |
| 13 |
| 9 |

3 rows

result

| value |
| --- |
| null |
| null |
| \-1 |

3 rows

See [TableFrame API Guide](https://docs.tabsdata.com/developer/guide/tables) for the whole API in one place.

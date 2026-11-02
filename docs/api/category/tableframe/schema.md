# Schema

> Ordered mapping of column name to data type.

Source: https://docs.tabsdata.com/api/category/tableframe/schema

class

```python
class Schema
```

**Categories:** attributes

Ordered mapping of column name to data type.

Returned by `TableFrame.schema`. Iterates in column order and supports mapping access (`schema["col"]`, `"col" in schema`, `len(schema)`) plus the query helpers below.

## Examples

```python
tf.schema["a"]
tf.schema.names()
```

## Methods

method

`clear`

```python
def clear(*args = (), **kwargs = {})
```

Remove all entries, leaving an empty schema.

**Parameters:**

parameter

`*args`

parameter

`**kwargs`

method

`copy`

```python
def copy(*args = (), **kwargs = {})
```

Return a shallow copy of this schema.

**Parameters:**

parameter

`*args`

parameter

`**kwargs`

method

`fromkeys`

```python
def fromkeys(iterable, value = None)
```

Build a schema from the given names, all with the same data type.

**Parameters:**

parameter

`iterable`

parameter

`value`

method

`get`

```python
def get(key, default = None)
```

Return the data type for `key`, or `default` if absent.

**Parameters:**

parameter

`key`

parameter

`default`

**Example:**

```python
tf.schema.get("a")
```

A default keeps the lookup total when the column may be absent:

```python
tf.schema.get("missing", String)
```

method

`items`

```python
def items(*args = (), **kwargs = {})
```

Return the `(name, data type)` pairs, in column order.

**Parameters:**

parameter

`*args`

parameter

`**kwargs`

**Example:**

```python
[(name, dtype) for name, dtype in tf.schema.items()]
```

method

`keys`

```python
def keys(*args = (), **kwargs = {})
```

Return the column names, in column order.

**Parameters:**

parameter

`*args`

parameter

`**kwargs`

**Example:**

```python
list(tf.schema.keys())
```

method

`move_to_end`

```python
def move_to_end(key, last = True)
```

Move column `key` to the end (or the start when `last` is False).

**Parameters:**

parameter

`key`

parameter

`last`

method

`pop`

```python
def pop(*args = (), **kwargs = {})
```

Remove column `key` and return its data type.

**Parameters:**

parameter

`*args`

parameter

`**kwargs`

method

`popitem`

```python
def popitem(last = True)
```

Remove and return the last (or first) `(name, data type)` pair.

**Parameters:**

parameter

`last`

method

`setdefault`

```python
def setdefault(key, default = None)
```

Return `key`'s data type, inserting `default` if it is absent.

**Parameters:**

parameter

`key`

parameter

`default`

method

`update`

```python
def update(*args = (), **kwargs = {})
```

Update this schema in place from another mapping of columns.

**Parameters:**

parameter

`*args`

parameter

`**kwargs`

method

`values`

```python
def values(*args = (), **kwargs = {})
```

Return the data types, in column order.

**Parameters:**

parameter

`*args`

parameter

`**kwargs`

**Example:**

```python
list(tf.schema.values())
```

method

`names`

```python
def names() -> list[str]
```

Return the column names, in column order.

**Example:**

```python
tf.schema.names()
```

method

`dtypes`

```python
def dtypes() -> list[DataType]
```

Return the column data types, in column order.

**Example:**

```python
tf.schema.dtypes()
```

method

`to_arrow`

```python
def to_arrow(*, compat_level: None = None) -> Any
```

Return this schema as a PyArrow schema.

**Parameters:**

parameter

`compat_level`None

**Example:**

```python
tf.schema.to_arrow()
```

method

`to_frame`

```python
def to_frame() -> TableFrame
```

Return an empty [`TableFrame`](https://docs.tabsdata.com/api/category/tableframe/tableframe/tableframe) having exactly this schema.

**Example:**

```python
tf.schema.to_frame()
```

method

`len`

```python
def len() -> int
```

Return the number of columns.

**Example:**

```python
tf.schema.len()
```

method

`to_python`

```python
def to_python() -> dict[str, type]
```

Return a dict mapping each column name to its Python type.

**Example:**

```python
tf.schema.to_python()["a"]  # <class 'int'>
```

method

`contains_dtype`

```python
def contains_dtype(dtype: DataType, *, recursive: bool) -> bool
```

Return whether any column has the given data type.

**Parameters:**

parameter

`dtype`[DataType](https://docs.tabsdata.com/api/module/tabsdatak-tableframe-datatypes#tabsdatak.tableframe.datatypes.DataType)

Data type to look for.

parameter

`recursive`[bool](https://docs.python.org/3/builtins/functions.html#bool)

Also match the type nested inside [`List`](https://docs.tabsdata.com/api/module/tabsdatak-tableframe-datatypes#tabsdatak.tableframe.datatypes.List) / [`Struct`](https://docs.tabsdata.com/api/module/tabsdatak-tableframe-datatypes#tabsdatak.tableframe.datatypes.Struct) / [`Array`](https://docs.tabsdata.com/api/module/tabsdatak-tableframe-datatypes#tabsdatak.tableframe.datatypes.Array) columns.

**Example:**

```python
tf.schema.contains_dtype(String, recursive=False)
```

`recursive=True` also looks inside [`List`](https://docs.tabsdata.com/api/module/tabsdatak-tableframe-datatypes#tabsdatak.tableframe.datatypes.List) / [`Struct`](https://docs.tabsdata.com/api/module/tabsdatak-tableframe-datatypes#tabsdatak.tableframe.datatypes.Struct) / [`Array`](https://docs.tabsdata.com/api/module/tabsdatak-tableframe-datatypes#tabsdatak.tableframe.datatypes.Array) columns:

```python
tf.schema.contains_dtype(String, recursive=True)
```

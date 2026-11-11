# DevFrameDest

> Destination reporting the `LazyFrame` s a `@subscriber` hands it -- it writes no data.

Source: https://docs.tabsdata.com/api/category/connectors/destination/devframedest

class

```python
class DevFrameDest(outputs: int = 1)
```

Bases: [Dest](https://docs.tabsdata.com/api/category/connectors/destination/dest)

**Categories:** destination

Destination reporting the `LazyFrame`\\ s a `@subscriber` hands it -- it writes no data.

Each run writes one JSON report to its connection's folder with, per output and by position, the type of the table it received, its row count and its column names. Useful to check what a destination receives without an external system.

## Examples

```python
@subscriber(destination=DevFrameDest(outputs=2), input_tables=["a", "b"])
def report(a: TableFrameSpec, b: TableFrameSpec):
    return a, b
```

## Parameters

parameter

`outputs`[int](https://docs.python.org/3/builtins/functions.html#int)

How many outputs the subscriber returns.

## Methods

method

`validate`

```python
def validate()
```

Validate `outputs` is a positive integer.

Called by the framework; raises `DevValidateException`.

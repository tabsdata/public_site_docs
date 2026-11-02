# BinlogPosition

> CDC start position: a binlog file + byte offset.

Source: https://docs.tabsdata.com/api/category/connectors/source/binlogposition

class

```python
class BinlogPosition(file: str, pos: int)
```

**Categories:** source

CDC start position: a binlog file + byte offset.

A `start_from` value in the pre-GTID position shape.

## Parameters

parameter

`file`[str](https://docs.python.org/3/builtins/stdtypes.html#str)

Binlog filename as reported by `SHOW BINARY LOGS` (e.g. `"mysql-bin.000001"`).

parameter

`pos`[int](https://docs.python.org/3/builtins/functions.html#int)

Byte offset within `file`. The binlog magic bytes occupy positions 0-3; use 4 to replay from the beginning.

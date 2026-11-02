# GtidPosition

> CDC start position: a MySQL Global Transaction ID.

Source: https://docs.tabsdata.com/api/category/connectors/source/gtidposition

class

```python
class GtidPosition(gtid: str)
```

**Categories:** source

CDC start position: a MySQL Global Transaction ID.

A `start_from` value; the ingester converts `"uuid:N"` to the pymysqlreplication-friendly set range `"uuid:1-N"`.

## Parameters

parameter

`gtid`[str](https://docs.python.org/3/builtins/stdtypes.html#str)

GTID to resume from, in `"uuid:N"` shape (single position) or `"uuid:M-N"` shape (range). Empty string is the cold-start marker.

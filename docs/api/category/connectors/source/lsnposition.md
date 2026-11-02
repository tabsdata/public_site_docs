# LsnPosition

> CDC start position: a WAL Log Sequence Number.

Source: https://docs.tabsdata.com/api/category/connectors/source/lsnposition

class

```python
class LsnPosition(lsn: int)
```

**Categories:** source

CDC start position: a WAL Log Sequence Number.

A `start_from` value; resuming from a persisted offset uses this shape too (the runner persists `{"lsn": int}` on the trx state).

## Parameters

parameter

`lsn`[int](https://docs.python.org/3/builtins/functions.html#int)

64-bit integer LSN -- the value `pg_current_wal_lsn() - '0/0'::pg_lsn` returns. Use `0` to replay from the oldest WAL the slot retains.

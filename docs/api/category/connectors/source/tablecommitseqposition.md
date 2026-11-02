# TableCommitSeqPosition

> CDC start position: independent commit sequence per table.

Source: https://docs.tabsdata.com/api/category/connectors/source/tablecommitseqposition

class

```python
class TableCommitSeqPosition(seqs: dict[str, str])
```

**Categories:** source

CDC start position: independent commit sequence per table.

A `start_from` value giving each CD table its own resume point -- useful after a partial re-snapshot.

## Parameters

parameter

`seqs`[dict](https://docs.python.org/3/builtins/stdtypes.html#dict)\[[str](https://docs.python.org/3/builtins/stdtypes.html#str), [str](https://docs.python.org/3/builtins/stdtypes.html#str)\]

Mapping of qualified CD table names (`"CDSCHEMA.CDTABLE"`) to hex-string commit-sequence values. Tracked CD tables missing from the mapping start from the origin (16 zero bytes).

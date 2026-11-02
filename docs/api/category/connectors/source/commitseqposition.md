# CommitSeqPosition

> CDC start position: one global commit sequence for every table.

Source: https://docs.tabsdata.com/api/category/connectors/source/commitseqposition

class

```python
class CommitSeqPosition(seq: str)
```

**Categories:** source

CDC start position: one global commit sequence for every table.

A `start_from` value applying a single commit sequence to every tracked CD table.

## Parameters

parameter

`seq`[str](https://docs.python.org/3/builtins/stdtypes.html#str)

Hex-string form of the binary 16-byte `IBMSNAP_COMMITSEQ` column (e.g. `"000...0042"`). All zeros is the cold-start marker.

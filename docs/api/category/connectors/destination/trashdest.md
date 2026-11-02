# TrashDest

> Destination that discards the frame for `@subscriber` -- a sink to nowhere.

Source: https://docs.tabsdata.com/api/category/connectors/destination/trashdest

class

```python
class TrashDest
```

Bases: [Dest](https://docs.tabsdata.com/api/category/connectors/destination/dest)

**Categories:** destination

Destination that discards the frame for `@subscriber` -- a sink to nowhere.

Carries no configuration; the subscriber returns a single frame, which is dropped.

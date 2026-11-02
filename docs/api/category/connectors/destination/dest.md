# Dest

> Abstract destination.

Source: https://docs.tabsdata.com/api/category/connectors/destination/dest

class

```python
class Dest
```

Bases: [ABC](https://docs.python.org/3/library/abc.html#abc.ABC), `DescriptorBase`

**Categories:** destination

Abstract destination.

Passed as the `destination` argument of `@subscriber`. Concrete subclasses live in the connector packages (e.g. [`S3Dest`](https://docs.tabsdata.com/api/category/connectors/destination/s3dest), [`PostgresDest`](https://docs.tabsdata.com/api/category/connectors/destination/postgresdest)) and carry only per-flow config. The connection and credentials live on the collection's registered connection, not on the subclass.

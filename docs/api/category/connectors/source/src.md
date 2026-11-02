# Src

> Abstract batch source.

Source: https://docs.tabsdata.com/api/category/connectors/source/src

class

```python
class Src
```

Bases: [ABC](https://docs.python.org/3/library/abc.html#abc.ABC), `DescriptorBase`

**Categories:** source

Abstract batch source.

Passed as the `source` argument of `@publisher`. Concrete subclasses live in the connector packages (e.g. [`S3Src`](https://docs.tabsdata.com/api/category/connectors/source/s3src), [`PostgresSrc`](https://docs.tabsdata.com/api/category/connectors/source/postgressrc)) and carry only per-flow config (paths, queries, ...). The connection and its credentials are not set here -- they live on the connection registered on the function's collection.

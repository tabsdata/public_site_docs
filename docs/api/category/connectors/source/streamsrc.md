# StreamSrc

> Abstract stream source.

Source: https://docs.tabsdata.com/api/category/connectors/source/streamsrc

class

```python
class StreamSrc
```

Bases: [ABC](https://docs.python.org/3/library/abc.html#abc.ABC), `DescriptorBase`

**Categories:** source

Abstract stream source.

Passed as the `source` argument of `@stream_publisher`. Concrete subclasses (e.g. [`PostgresCdcStreamSrc`](https://docs.tabsdata.com/api/category/connectors/source/postgrescdcstreamsrc)) drive a long-lived change stream. As with [`Src`](https://docs.tabsdata.com/api/category/connectors/source/src), the connection and credentials live on the collection's registered connection, not on the subclass.

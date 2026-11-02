# StreamStageSrc

> Config type for the hidden batch source that ingests a stream's staged manifests.

Source: https://docs.tabsdata.com/api/category/spi/spi/streamstagesrc

class

```python
class StreamStageSrc
```

Bases: [Src](https://docs.tabsdata.com/api/category/connectors/source/src)

**Categories:** spi

Config type for the hidden batch source that ingests a stream's staged manifests.

A [`StreamSrcDef`](https://docs.tabsdata.com/api/category/spi/spi/streamsrcdef) names it (or a subclass) via `publisher_src`. Subclass it only when pairing it with a customised [`StreamStageSrcPlugin`](https://docs.tabsdata.com/api/category/spi/spi/streamstagesrcplugin).

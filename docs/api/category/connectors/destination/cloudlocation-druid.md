# CloudLocation

> Abstract base for a `DruidDest` cloud staging area.

Source: https://docs.tabsdata.com/api/category/connectors/destination/cloudlocation-druid

class

```python
class CloudLocation
```

Bases: `DescriptorBase`, [ABC](https://docs.python.org/3/library/abc.html#abc.ABC)

**Categories:** destination

Abstract base for a [`DruidDest`](https://docs.tabsdata.com/api/category/connectors/destination/druiddest) cloud staging area.

Concrete subclasses (`S3Location` / `AzBlobLocation`) are set as the connection's `staging` field; the plugin uploads parquet there before submitting the Druid ingestion task.

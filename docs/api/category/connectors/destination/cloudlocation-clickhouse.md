# CloudLocation

> Abstract base for a ClickHouse `staging` cloud location.

Source: https://docs.tabsdata.com/api/category/connectors/destination/cloudlocation-clickhouse

class

```python
class CloudLocation
```

Bases: `DescriptorBase`, [ABC](https://docs.python.org/3/library/abc.html#abc.ABC)

**Categories:** destination

Abstract base for a ClickHouse `staging` cloud location.

Concrete forms are `S3Location` / `AzBlobLocation` / `GCSLocation`; set one as `ClickHouseDestConn.staging`.

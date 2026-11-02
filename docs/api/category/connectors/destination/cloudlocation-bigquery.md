# CloudLocation

> Abstract base for a BigQuery `staging` location.

Source: https://docs.tabsdata.com/api/category/connectors/destination/cloudlocation-bigquery

class

```python
class CloudLocation
```

Bases: `DescriptorBase`, [ABC](https://docs.python.org/3/library/abc.html#abc.ABC)

**Categories:** destination

Abstract base for a BigQuery `staging` location.

The only concrete form today is `GCSLocation` -- BigQuery stages exclusively via GCS. Kept parallel to the other connectors so the import / dispatch surface stays consistent.

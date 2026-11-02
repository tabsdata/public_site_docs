# GCSLocation

> GCS staging area for `BigQueryDest`.

Source: https://docs.tabsdata.com/api/category/connectors/destination/gcslocation-bigquery

class

```python
class GCSLocation(
    bucket: GCSBucketSpec,
    credentials: GCPJson,
    base_path: CloudRelativePathSpec = '/',
    cfg: CfgSpec | None = None,
)
```

Bases: [CloudLocation](https://docs.tabsdata.com/api/category/connectors/destination/cloudlocation-bigquery)

**Categories:** destination

GCS staging area for [`BigQueryDest`](https://docs.tabsdata.com/api/category/connectors/destination/bigquerydest).

The plugin uploads parquet here, then runs a `load_table_from_uri` load job against BigQuery referencing the object.

## Parameters

parameter

`bucket`[GCSBucketSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-common-types#tabsdatak.conn.common.types.GCSBucketSpec) ([str](https://docs.python.org/3/library/stdtypes.html#str) | [Secret](https://docs.tabsdata.com/api/category/connectors/credentials/secret))

A valid GCS bucket name.

parameter

`credentials`[GCPJson](https://docs.tabsdata.com/api/category/connectors/credentials/gcpjson)

GCP service-account JSON credentials.

parameter

`base_path`[CloudRelativePathSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-common-types#tabsdatak.conn.common.types.CloudRelativePathSpec) ([str](https://docs.python.org/3/library/stdtypes.html#str) | [Secret](https://docs.tabsdata.com/api/category/connectors/credentials/secret))

Object-key prefix from the bucket root; starts with `/`, has no trailing `/` and no empty segments (`//`) (the leading `/` is trimmed when forming the key). Defaults to `/`.

parameter

`cfg`[CfgSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-common-types#tabsdatak.conn.common.types.CfgSpec) | None ([dict](https://docs.python.org/3/library/stdtypes.html#dict) | None)

Optional connector-config dict for the GCS client.

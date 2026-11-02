# GCSLocation

> GCS staging area for `ClickHouseDest`.

Source: https://docs.tabsdata.com/api/category/connectors/destination/gcslocation-clickhouse

class

```python
class GCSLocation(
    bucket: GCSBucketSpec,
    credentials: GCPJson,
    hmac_credentials: GCPHmac,
    base_path: CloudRelativePathSpec = '/',
    cfg: CfgSpec | None = None,
)
```

Bases: [CloudLocation](https://docs.tabsdata.com/api/category/connectors/destination/cloudlocation-clickhouse)

**Categories:** destination

GCS staging area for [`ClickHouseDest`](https://docs.tabsdata.com/api/category/connectors/destination/clickhousedest).

Carries two credentials, one per code path: `credentials` (GCP service-account JSON) uploads parquet via the native GCS API, while `hmac_credentials` (GCS HMAC keys) let ClickHouse's `s3()` table function fetch the staged file back through the S3-compatible endpoint (the only protocol ClickHouse speaks to GCS). Both are required.

## Parameters

parameter

`bucket`[GCSBucketSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-common-types#tabsdatak.conn.common.types.GCSBucketSpec) ([str](https://docs.python.org/3/library/stdtypes.html#str) | [Secret](https://docs.tabsdata.com/api/category/connectors/credentials/secret))

A valid GCS bucket name.

parameter

`credentials`[GCPJson](https://docs.tabsdata.com/api/category/connectors/credentials/gcpjson)

GCP service-account JSON credentials (upload).

parameter

`hmac_credentials`[GCPHmac](https://docs.tabsdata.com/api/category/connectors/credentials/gcphmac)

GCS HMAC access-key / secret-key credentials (ClickHouse's S3-compatible read-back).

parameter

`base_path`[CloudRelativePathSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-common-types#tabsdatak.conn.common.types.CloudRelativePathSpec) ([str](https://docs.python.org/3/library/stdtypes.html#str) | [Secret](https://docs.tabsdata.com/api/category/connectors/credentials/secret))

Object-key prefix from the bucket root; starts with `/`, has no trailing `/` and no empty segments (`//`) (the leading `/` is trimmed when forming the key). Defaults to `/`.

parameter

`cfg`[CfgSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-common-types#tabsdatak.conn.common.types.CfgSpec) | None ([dict](https://docs.python.org/3/library/stdtypes.html#dict) | None)

Optional connector-config dict for the GCS client.

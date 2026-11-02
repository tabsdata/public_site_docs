# S3Location

> S3 staging area for `DruidDest`.

Source: https://docs.tabsdata.com/api/category/connectors/destination/s3location-druid

class

```python
class S3Location(
    bucket: S3BucketSpec,
    region: AwsRegionSpec,
    credentials: AwsAccessSecretKey,
    base_path: CloudRelativePathSpec = '/',
    cfg: CfgSpec | None = None,
)
```

Bases: [CloudLocation](https://docs.tabsdata.com/api/category/connectors/destination/cloudlocation-druid)

**Categories:** destination

S3 staging area for [`DruidDest`](https://docs.tabsdata.com/api/category/connectors/destination/druiddest).

The plugin uploads parquet here, then issues a Druid ingestion spec referencing the S3 input source.

## Parameters

parameter

`bucket`[S3BucketSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-common-types#tabsdatak.conn.common.types.S3BucketSpec) ([str](https://docs.python.org/3/library/stdtypes.html#str) | [Secret](https://docs.tabsdata.com/api/category/connectors/credentials/secret))

A valid S3 bucket name.

parameter

`region`[AwsRegionSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-common-types#tabsdatak.conn.common.types.AwsRegionSpec) ([str](https://docs.python.org/3/library/stdtypes.html#str) | [Secret](https://docs.tabsdata.com/api/category/connectors/credentials/secret))

A valid AWS region, e.g. `us-east-1`.

parameter

`credentials`[AwsAccessSecretKey](https://docs.tabsdata.com/api/category/connectors/credentials/awsaccesssecretkey)

[`AwsAccessSecretKey`](https://docs.tabsdata.com/api/category/connectors/credentials/awsaccesssecretkey) (access key id / secret access key).

parameter

`base_path`[CloudRelativePathSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-common-types#tabsdatak.conn.common.types.CloudRelativePathSpec) ([str](https://docs.python.org/3/library/stdtypes.html#str) | [Secret](https://docs.tabsdata.com/api/category/connectors/credentials/secret))

Object-key prefix from the bucket root, e.g. `/staging/druid`; starts with `/`, has no trailing `/` and no empty segments (`//`) (the leading `/` is trimmed when forming the key). Defaults to `/`.

parameter

`cfg`[CfgSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-common-types#tabsdatak.conn.common.types.CfgSpec) | None ([dict](https://docs.python.org/3/library/stdtypes.html#dict) | None)

Optional connector config for the underlying S3 client (see [`CfgSpec`](https://docs.tabsdata.com/api/module/tabsdatak-conn-common-types#tabsdatak.conn.common.types.CfgSpec)).

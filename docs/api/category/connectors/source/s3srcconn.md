# S3SrcConn

> S3 connection used by `S3Src`.

Source: https://docs.tabsdata.com/api/category/connectors/source/s3srcconn

class

```python
class S3SrcConn(
    bucket: S3BucketSpec,
    region: AwsRegionSpec,
    credentials: CredentialsSpec,
    base_path: CloudRelativePathSpec = '/',
    conn_cfg: CfgSpec | None = None,
)
```

Bases: [Conn](https://docs.tabsdata.com/api/category/spi/spi/conn)

**Categories:** source

S3 connection used by [`S3Src`](https://docs.tabsdata.com/api/category/connectors/source/s3src).

Registered on a collection; the runtime resolves it and hands it to the plugin at run time. Each field accepts a plain string or a [`Secret`](https://docs.tabsdata.com/api/category/connectors/credentials/secret).

## Parameters

parameter

`bucket`[S3BucketSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-common-types#tabsdatak.conn.common.types.S3BucketSpec) ([str](https://docs.python.org/3/library/stdtypes.html#str) | [Secret](https://docs.tabsdata.com/api/category/connectors/credentials/secret))

A valid S3 bucket name.

parameter

`region`[AwsRegionSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-common-types#tabsdatak.conn.common.types.AwsRegionSpec) ([str](https://docs.python.org/3/library/stdtypes.html#str) | [Secret](https://docs.tabsdata.com/api/category/connectors/credentials/secret))

A valid AWS region, e.g. `us-east-1`.

parameter

`credentials`[CredentialsSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-s3#tabsdatak.conn.s3.CredentialsSpec) ([AwsAccessSecretKey](https://docs.tabsdata.com/api/category/connectors/credentials/awsaccesssecretkey))

AWS [`AwsAccessSecretKey`](https://docs.tabsdata.com/api/category/connectors/credentials/awsaccesssecretkey) credentials.

parameter

`base_path`[CloudRelativePathSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-common-types#tabsdatak.conn.common.types.CloudRelativePathSpec) ([str](https://docs.python.org/3/library/stdtypes.html#str) | [Secret](https://docs.tabsdata.com/api/category/connectors/credentials/secret))

Object-key prefix from the bucket root; starts with `/`, has no trailing `/` and no empty segments (`//`) (the leading `/` is trimmed when forming the key). Defaults to `/`.

parameter

`conn_cfg`[CfgSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-common-types#tabsdatak.conn.common.types.CfgSpec) | None ([dict](https://docs.python.org/3/library/stdtypes.html#dict) | None)

Optional connector-config dict (see [`CfgSpec`](https://docs.tabsdata.com/api/module/tabsdatak-conn-common-types#tabsdatak.conn.common.types.CfgSpec)).

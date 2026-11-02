# S3DestConn

> S3 connection used by `S3Dest`.

Source: https://docs.tabsdata.com/api/category/connectors/destination/s3destconn

class

```python
class S3DestConn(
    bucket: S3BucketSpec,
    region: AwsRegionSpec,
    credentials: CredentialsSpec,
    base_path: CloudRelativePathSpec = '/',
    conn_cfg: CfgSpec | None = None,
)
```

Bases: [Conn](https://docs.tabsdata.com/api/category/spi/spi/conn)

**Categories:** destination

S3 connection used by [`S3Dest`](https://docs.tabsdata.com/api/category/connectors/destination/s3dest).

Field-identical to [`S3SrcConn`](https://docs.tabsdata.com/api/category/connectors/source/s3srcconn) but a distinct class; source and destination connections are separate types and cannot be used in place of one another. See [`S3SrcConn`](https://docs.tabsdata.com/api/category/connectors/source/s3srcconn) for the field meanings.

## Parameters

parameter

`bucket`[S3BucketSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-common-types#tabsdatak.conn.common.types.S3BucketSpec) ([str](https://docs.python.org/3/library/stdtypes.html#str) | [Secret](https://docs.tabsdata.com/api/category/connectors/credentials/secret))

parameter

`region`[AwsRegionSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-common-types#tabsdatak.conn.common.types.AwsRegionSpec) ([str](https://docs.python.org/3/library/stdtypes.html#str) | [Secret](https://docs.tabsdata.com/api/category/connectors/credentials/secret))

parameter

`credentials`[CredentialsSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-s3#tabsdatak.conn.s3.CredentialsSpec) ([AwsAccessSecretKey](https://docs.tabsdata.com/api/category/connectors/credentials/awsaccesssecretkey))

parameter

`base_path`[CloudRelativePathSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-common-types#tabsdatak.conn.common.types.CloudRelativePathSpec) ([str](https://docs.python.org/3/library/stdtypes.html#str) | [Secret](https://docs.tabsdata.com/api/category/connectors/credentials/secret))

parameter

`conn_cfg`[CfgSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-common-types#tabsdatak.conn.common.types.CfgSpec) | None ([dict](https://docs.python.org/3/library/stdtypes.html#dict) | None)

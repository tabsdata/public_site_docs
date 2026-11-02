# AwsAccessSecretKey

> AWS access key ID / secret access key credentials.

Source: https://docs.tabsdata.com/api/category/connectors/credentials/awsaccesssecretkey

class

```python
class AwsAccessSecretKey(access_key_id: Secret, secret_access_key: Secret)
```

Bases: [Credentials](https://docs.tabsdata.com/api/category/connectors/credentials/credentials)

**Categories:** credentials

AWS access key ID / secret access key credentials.

Used by the S3 connector ([`S3SrcConn`](https://docs.tabsdata.com/api/category/connectors/source/s3srcconn) / [`S3DestConn`](https://docs.tabsdata.com/api/category/connectors/destination/s3destconn)).

## Parameters

parameter

`access_key_id`[Secret](https://docs.tabsdata.com/api/category/connectors/credentials/secret)

The AWS access key ID.

parameter

`secret_access_key`[Secret](https://docs.tabsdata.com/api/category/connectors/credentials/secret)

The AWS secret access key.

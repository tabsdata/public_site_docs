# GCPHmac

> HMAC access key / secret for GCS's S3-compatible endpoint.

Source: https://docs.tabsdata.com/api/category/connectors/credentials/gcphmac

class

```python
class GCPHmac(access_key: Secret, secret_key: Secret)
```

Bases: [GCPCredentials](https://docs.tabsdata.com/api/category/connectors/credentials/gcpcredentials)

**Categories:** credentials

HMAC access key / secret for GCS's S3-compatible endpoint.

Used by connectors that read or write GCS via the S3 protocol (e.g. ClickHouse's `s3()` table function pointed at `https://storage.googleapis.com`).

## Parameters

parameter

`access_key`[Secret](https://docs.tabsdata.com/api/category/connectors/credentials/secret)

The HMAC access key.

parameter

`secret_key`[Secret](https://docs.tabsdata.com/api/category/connectors/credentials/secret)

The HMAC secret.

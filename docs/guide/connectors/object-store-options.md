# Object Store Options

> The obstore.* keys that configure the object store behind the file connectors and the staging locations: which keys each provider takes, where they are set, and what they override.

Source: https://docs.tabsdata.com/guide/connectors/object-store-options

Several connectors read or write cloud object storage through an object store client. Keys that start with `obstore.` configure that client. Set them where the connector takes its other settings: `conn_cfg` on the connection for the file connectors, and `cfg` on the `staging` location for ClickHouse, StarRocks and Druid.

## Where the keys apply

| Connector | Set with | What the keys configure |
| --- | --- | --- |
| Amazon S3, Google Cloud Storage, Azure Blob Storage | `conn_cfg` on the connection | Reads and writes |
| ClickHouse | `cfg` on the `staging` location | The staging upload, the address ClickHouse reads the files from, and the cleanup |
| StarRocks | `cfg` on the `staging` location | The staging upload. StarRocks reads the files through its own path, which the keys do not change |
| Druid | `cfg` on the `staging` location | The staging upload. The ingestion input source does not use them |

On the file connectors, a key in `conn_cfg` overrides the matching credential in the connection. The explorer ignores these keys.

## Keys by provider

| Provider | Keys |
| --- | --- |
| Amazon S3 | `access_key_id`, `secret_access_key`, `session_token`, `region`, `endpoint`, `virtual_hosted_style_request`, `allow_http`, `anonymous`, `skip_signature` |
| Azure Blob Storage | `account_name`, `account_key`, `sas_token`, `endpoint`, `allow_http` |
| Google Cloud Storage | `service_account_key`, `service_account`, `allow_http` |

`service_account` is the path to a key file on the Tabsdata server. Raw option names with the `aws_`, `azure_` or `google_` prefix are accepted as well.

For example, to point an S3 connection at a MinIO server:

```yaml
conn_cfg:
  obstore.endpoint: 'http://minio.internal:9000'
```

On ClickHouse, an unknown `obstore.*` key fails the write.

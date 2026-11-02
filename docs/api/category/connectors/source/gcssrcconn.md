# GCSSrcConn

> GCS connection used by `GCSSrc`.

Source: https://docs.tabsdata.com/api/category/connectors/source/gcssrcconn

class

```python
class GCSSrcConn(
    bucket: GCSBucketSpec,
    credentials: CredentialsSpec,
    project: ProjectSpec | None = None,
    base_path: CloudRelativePathSpec = '/',
    conn_cfg: CfgSpec | None = None,
)
```

Bases: [Conn](https://docs.tabsdata.com/api/category/spi/spi/conn)

**Categories:** source

GCS connection used by [`GCSSrc`](https://docs.tabsdata.com/api/category/connectors/source/gcssrc).

Registered on a collection; the runtime resolves it and hands it to the plugin at run time. Each field accepts a plain string or a [`Secret`](https://docs.tabsdata.com/api/category/connectors/credentials/secret).

## Parameters

parameter

`bucket`[GCSBucketSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-common-types#tabsdatak.conn.common.types.GCSBucketSpec) ([str](https://docs.python.org/3/library/stdtypes.html#str) | [Secret](https://docs.tabsdata.com/api/category/connectors/credentials/secret))

A valid GCS bucket name: 3-63 characters, lowercase letters, digits, hyphens and underscores, starting and ending with a letter or digit.

parameter

`credentials`[CredentialsSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-gcs#tabsdatak.conn.gcs.CredentialsSpec) ([GCPJson](https://docs.tabsdata.com/api/category/connectors/credentials/gcpjson))

GCP [`GCPJson`](https://docs.tabsdata.com/api/category/connectors/credentials/gcpjson) service-account JSON credentials.

parameter

`project`[ProjectSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-gcs#tabsdatak.conn.gcs.ProjectSpec) | None ([str](https://docs.python.org/3/library/stdtypes.html#str) | [Secret](https://docs.tabsdata.com/api/category/connectors/credentials/secret) | None)

Optional GCP project id; any non-empty string.

parameter

`base_path`[CloudRelativePathSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-common-types#tabsdatak.conn.common.types.CloudRelativePathSpec) ([str](https://docs.python.org/3/library/stdtypes.html#str) | [Secret](https://docs.tabsdata.com/api/category/connectors/credentials/secret))

Object-key prefix from the bucket root; starts with `/`, has no trailing `/` and no empty segments (`//`) (the leading `/` is trimmed when forming the key). Defaults to `/`.

parameter

`conn_cfg`[CfgSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-common-types#tabsdatak.conn.common.types.CfgSpec) | None ([dict](https://docs.python.org/3/library/stdtypes.html#dict) | None)

Optional connector-config dict (see [`CfgSpec`](https://docs.tabsdata.com/api/module/tabsdatak-conn-common-types#tabsdatak.conn.common.types.CfgSpec)).

# GCSDestConn

> GCS connection used by `GCSDest`.

Source: https://docs.tabsdata.com/api/category/connectors/destination/gcsdestconn

class

```python
class GCSDestConn(
    bucket: GCSBucketSpec,
    credentials: CredentialsSpec,
    project: ProjectSpec | None = None,
    base_path: CloudRelativePathSpec = '/',
    conn_cfg: CfgSpec | None = None,
)
```

Bases: [Conn](https://docs.tabsdata.com/api/category/spi/spi/conn)

**Categories:** destination

GCS connection used by [`GCSDest`](https://docs.tabsdata.com/api/category/connectors/destination/gcsdest).

Field-identical to [`GCSSrcConn`](https://docs.tabsdata.com/api/category/connectors/source/gcssrcconn) but a distinct class; source and destination connections are separate types and cannot be used in place of one another. See [`GCSSrcConn`](https://docs.tabsdata.com/api/category/connectors/source/gcssrcconn) for the field meanings.

## Parameters

parameter

`bucket`[GCSBucketSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-common-types#tabsdatak.conn.common.types.GCSBucketSpec) ([str](https://docs.python.org/3/library/stdtypes.html#str) | [Secret](https://docs.tabsdata.com/api/category/connectors/credentials/secret))

parameter

`credentials`[CredentialsSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-gcs#tabsdatak.conn.gcs.CredentialsSpec) ([GCPJson](https://docs.tabsdata.com/api/category/connectors/credentials/gcpjson))

parameter

`project`[ProjectSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-gcs#tabsdatak.conn.gcs.ProjectSpec) | None ([str](https://docs.python.org/3/library/stdtypes.html#str) | [Secret](https://docs.tabsdata.com/api/category/connectors/credentials/secret) | None)

parameter

`base_path`[CloudRelativePathSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-common-types#tabsdatak.conn.common.types.CloudRelativePathSpec) ([str](https://docs.python.org/3/library/stdtypes.html#str) | [Secret](https://docs.tabsdata.com/api/category/connectors/credentials/secret))

parameter

`conn_cfg`[CfgSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-common-types#tabsdatak.conn.common.types.CfgSpec) | None ([dict](https://docs.python.org/3/library/stdtypes.html#dict) | None)

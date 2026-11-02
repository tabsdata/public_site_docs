# DruidDestConn

> Druid Overlord connection used by `DruidDest`.

Source: https://docs.tabsdata.com/api/category/connectors/destination/druiddestconn

class

```python
class DruidDestConn(
    overlord_url: UrlSpec,
    staging: CloudLocation,
    credentials: CredentialsSpec,
    conn_cfg: CfgSpec | None = None,
)
```

Bases: [Conn](https://docs.tabsdata.com/api/category/spi/spi/conn)

**Categories:** destination

Druid Overlord connection used by [`DruidDest`](https://docs.tabsdata.com/api/category/connectors/destination/druiddest).

Registered on a collection; the runtime resolves it and hands it to the plugin at run time.

## Examples

A connection that stages parquet in S3 before Druid ingests it:

```python
DruidDestConn(
    overlord_url="http://druid.example:8081",
    staging=S3Location(
        bucket="my-bucket",
        region="us-east-1",
        credentials=AwsAccessSecretKey(
            access_key_id=Secret("AKIA..."),
            secret_access_key=Secret("..."),
        ),
        base_path="/staging/druid",
    ),
    credentials=UserPassword(
        user=Secret("admin"),
        password=Secret("..."),
    ),
)
```

## Parameters

parameter

`overlord_url`[UrlSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-druid#tabsdatak.conn.druid.UrlSpec) ([str](https://docs.python.org/3/library/stdtypes.html#str) | [Secret](https://docs.tabsdata.com/api/category/connectors/credentials/secret))

Druid Overlord `http(s)://` URL, e.g. `http://druid.example:8081`. Accepts a plain string or a [`Secret`](https://docs.tabsdata.com/api/category/connectors/credentials/secret).

parameter

`staging`[CloudLocation](https://docs.tabsdata.com/api/category/connectors/destination/cloudlocation-druid)

Cloud staging area for parquet uploads -- an `S3Location` or `AzBlobLocation`.

parameter

`credentials`[CredentialsSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-druid#tabsdatak.conn.druid.CredentialsSpec) ([UserPassword](https://docs.tabsdata.com/api/category/connectors/credentials/userpassword))

[`UserPassword`](https://docs.tabsdata.com/api/category/connectors/credentials/userpassword) for Overlord HTTP basic auth.

parameter

`conn_cfg`[CfgSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-common-types#tabsdatak.conn.common.types.CfgSpec) | None ([dict](https://docs.python.org/3/library/stdtypes.html#dict) | None)

Optional connector config dict (see [`CfgSpec`](https://docs.tabsdata.com/api/module/tabsdatak-conn-common-types#tabsdatak.conn.common.types.CfgSpec)).

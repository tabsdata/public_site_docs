# StarRocksDestConn

> StarRocks connection.

Source: https://docs.tabsdata.com/api/category/connectors/destination/starrocksdestconn

class

```python
class StarRocksDestConn(
    host: HostSpec,
    port: PortSpec = '9030',
    credentials: CredentialsSpec,
    staging: CloudLocation,
    database: DatabaseSpec = 'default',
    entity_whitelist: EntityWhitelistSpec | None = None,
    conn_cfg: CfgSpec | None = None,
)
```

Bases: [Conn](https://docs.tabsdata.com/api/category/spi/spi/conn)

**Categories:** destination

StarRocks connection.

Registered on a collection; the runtime resolves it and hands it to the plugin at run time. Each string field accepts a plain string or a [`Secret`](https://docs.tabsdata.com/api/category/connectors/credentials/secret); the plugin reads parsed values through the `_host` / `_port` / `_database` getters.

## Parameters

parameter

`host`[HostSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-common-types#tabsdatak.conn.common.types.HostSpec) ([str](https://docs.python.org/3/library/stdtypes.html#str) | [Secret](https://docs.tabsdata.com/api/category/connectors/credentials/secret))

A DNS host name or IPv4 literal for the StarRocks FE.

parameter

`port`[PortSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-common-types#tabsdatak.conn.common.types.PortSpec) ([str](https://docs.python.org/3/library/stdtypes.html#str) | [Secret](https://docs.tabsdata.com/api/category/connectors/credentials/secret))

The MySQL-protocol port, 1-65535. Defaults to `"9030"`.

parameter

`credentials`[CredentialsSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-starrocks#tabsdatak.conn.starrocks.CredentialsSpec) ([UserPassword](https://docs.tabsdata.com/api/category/connectors/credentials/userpassword))

[`UserPassword`](https://docs.tabsdata.com/api/category/connectors/credentials/userpassword) (user + password).

parameter

`staging`[CloudLocation](https://docs.tabsdata.com/api/category/connectors/destination/cloudlocation-starrocks)

A `CloudLocation` (`S3Location` / `AzBlobLocation` / `GCSLocation`) where parquet is staged before ingest.

parameter

`database`[DatabaseSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-starrocks#tabsdatak.conn.starrocks.DatabaseSpec) ([str](https://docs.python.org/3/library/stdtypes.html#str) | [Secret](https://docs.tabsdata.com/api/category/connectors/credentials/secret))

The default database (a StarRocks identifier: a letter or underscore, then letters, digits and underscores). Defaults to `"default"`.

parameter

`entity_whitelist`[EntityWhitelistSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-common-types#tabsdatak.conn.common.types.EntityWhitelistSpec) | None ([list](https://docs.python.org/3/library/stdtypes.html#list)\[[str](https://docs.python.org/3/library/stdtypes.html#str)\] | None)

Optional list of regex patterns narrowing which tables the connector considers; `None` (the default) filters nothing.

parameter

`conn_cfg`[CfgSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-common-types#tabsdatak.conn.common.types.CfgSpec) | None ([dict](https://docs.python.org/3/library/stdtypes.html#dict) | None)

Optional connector-config dict (see [`CfgSpec`](https://docs.tabsdata.com/api/module/tabsdatak-conn-common-types#tabsdatak.conn.common.types.CfgSpec)).

# ClickHouseDestConn

> ClickHouse connection.

Source: https://docs.tabsdata.com/api/category/connectors/destination/clickhousedestconn

class

```python
class ClickHouseDestConn(
    host: HostSpec,
    port: PortSpec = '8123',
    credentials: CredentialsSpec,
    staging: CloudLocation,
    database: DatabaseSpec = 'default',
    secure: BoolSpec = 'false',
    entity_whitelist: EntityWhitelistSpec | None = None,
    conn_cfg: CfgSpec | None = None,
)
```

Bases: [Conn](https://docs.tabsdata.com/api/category/spi/spi/conn)

**Categories:** destination

ClickHouse connection.

Registered on a collection; the runtime resolves it and hands it to the plugin at run time. Each string field accepts a plain string or a [`Secret`](https://docs.tabsdata.com/api/category/connectors/credentials/secret); the plugin reads parsed values through the `_host` / `_port` / `_database` / `_secure` getters.

## Parameters

parameter

`host`[HostSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-common-types#tabsdatak.conn.common.types.HostSpec) ([str](https://docs.python.org/3/library/stdtypes.html#str) | [Secret](https://docs.tabsdata.com/api/category/connectors/credentials/secret))

A DNS host name or IPv4 literal for the ClickHouse server.

parameter

`port`[PortSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-common-types#tabsdatak.conn.common.types.PortSpec) ([str](https://docs.python.org/3/library/stdtypes.html#str) | [Secret](https://docs.tabsdata.com/api/category/connectors/credentials/secret))

The HTTP(S) port, 1-65535. Defaults to `"8123"`.

parameter

`credentials`[CredentialsSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-clickhouse#tabsdatak.conn.clickhouse.CredentialsSpec) ([UserPassword](https://docs.tabsdata.com/api/category/connectors/credentials/userpassword))

[`UserPassword`](https://docs.tabsdata.com/api/category/connectors/credentials/userpassword) (user + password).

parameter

`staging`[CloudLocation](https://docs.tabsdata.com/api/category/connectors/destination/cloudlocation-clickhouse)

A `CloudLocation` (`S3Location` / `AzBlobLocation` / `GCSLocation`) where parquet is staged before ingest.

parameter

`database`[DatabaseSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-clickhouse#tabsdatak.conn.clickhouse.DatabaseSpec) ([str](https://docs.python.org/3/library/stdtypes.html#str) | [Secret](https://docs.tabsdata.com/api/category/connectors/credentials/secret))

The default database (a ClickHouse identifier: a letter or underscore, then letters, digits and underscores). Defaults to `"default"`.

parameter

`secure`[BoolSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-common-types#tabsdatak.conn.common.types.BoolSpec) ([str](https://docs.python.org/3/library/stdtypes.html#str) | [Secret](https://docs.tabsdata.com/api/category/connectors/credentials/secret))

`true` for HTTPS, `false` for HTTP (boolean as text). Defaults to `"false"`.

parameter

`entity_whitelist`[EntityWhitelistSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-common-types#tabsdatak.conn.common.types.EntityWhitelistSpec) | None ([list](https://docs.python.org/3/library/stdtypes.html#list)\[[str](https://docs.python.org/3/library/stdtypes.html#str)\] | None)

Optional list of regex patterns narrowing which tables the connector considers; `None` (the default) filters nothing.

parameter

`conn_cfg`[CfgSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-common-types#tabsdatak.conn.common.types.CfgSpec) | None ([dict](https://docs.python.org/3/library/stdtypes.html#dict) | None)

Optional connector-config dict (see [`CfgSpec`](https://docs.tabsdata.com/api/module/tabsdatak-conn-common-types#tabsdatak.conn.common.types.CfgSpec)).

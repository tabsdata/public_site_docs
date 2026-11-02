# PostgresDestConn

> Postgres connection used by `PostgresDest`.

Source: https://docs.tabsdata.com/api/category/connectors/destination/postgresdestconn

class

```python
class PostgresDestConn(
    uri: UriSpec,
    credentials: CredentialsSpec,
    entity_whitelist: EntityWhitelistSpec | None = None,
    conn_cfg: CfgSpec | None = None,
)
```

Bases: [Conn](https://docs.tabsdata.com/api/category/spi/spi/conn)

**Categories:** destination

Postgres connection used by [`PostgresDest`](https://docs.tabsdata.com/api/category/connectors/destination/postgresdest).

Attribute-identical to [`PostgresSrcConn`](https://docs.tabsdata.com/api/category/connectors/source/postgressrcconn) but a distinct class; source and destination connections are separate types and cannot be used in place of one another. See [`PostgresSrcConn`](https://docs.tabsdata.com/api/category/connectors/source/postgressrcconn) for the field meanings.

## Parameters

parameter

`uri`[UriSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-postgres#tabsdatak.conn.postgres.UriSpec) ([str](https://docs.python.org/3/library/stdtypes.html#str) | [Secret](https://docs.tabsdata.com/api/category/connectors/credentials/secret))

parameter

`credentials`[CredentialsSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-postgres#tabsdatak.conn.postgres.CredentialsSpec) ([UserPassword](https://docs.tabsdata.com/api/category/connectors/credentials/userpassword))

parameter

`entity_whitelist`[EntityWhitelistSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-common-types#tabsdatak.conn.common.types.EntityWhitelistSpec) | None ([list](https://docs.python.org/3/library/stdtypes.html#list)\[[str](https://docs.python.org/3/library/stdtypes.html#str)\] | None)

parameter

`conn_cfg`[CfgSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-common-types#tabsdatak.conn.common.types.CfgSpec) | None ([dict](https://docs.python.org/3/library/stdtypes.html#dict) | None)

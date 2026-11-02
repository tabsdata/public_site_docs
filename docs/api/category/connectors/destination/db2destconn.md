# Db2DestConn

> Db2 connection used by `Db2Dest`.

Source: https://docs.tabsdata.com/api/category/connectors/destination/db2destconn

class

```python
class Db2DestConn(
    uri: UriSpec,
    credentials: CredentialsSpec,
    entity_whitelist: EntityWhitelistSpec | None = None,
    conn_cfg: CfgSpec | None = None,
)
```

Bases: [Conn](https://docs.tabsdata.com/api/category/spi/spi/conn)

**Categories:** destination

Db2 connection used by [`Db2Dest`](https://docs.tabsdata.com/api/category/connectors/destination/db2dest).

Attribute-identical to [`Db2SrcConn`](https://docs.tabsdata.com/api/category/connectors/source/db2srcconn) but a distinct class; source and destination connections are separate types and cannot be used in place of one another. See [`Db2SrcConn`](https://docs.tabsdata.com/api/category/connectors/source/db2srcconn) for the field meanings.

## Parameters

parameter

`uri`[UriSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-db2#tabsdatak.conn.db2.UriSpec) ([str](https://docs.python.org/3/library/stdtypes.html#str) | [Secret](https://docs.tabsdata.com/api/category/connectors/credentials/secret))

parameter

`credentials`[CredentialsSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-db2#tabsdatak.conn.db2.CredentialsSpec) ([UserPassword](https://docs.tabsdata.com/api/category/connectors/credentials/userpassword))

parameter

`entity_whitelist`[EntityWhitelistSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-common-types#tabsdatak.conn.common.types.EntityWhitelistSpec) | None ([list](https://docs.python.org/3/library/stdtypes.html#list)\[[str](https://docs.python.org/3/library/stdtypes.html#str)\] | None)

parameter

`conn_cfg`[CfgSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-common-types#tabsdatak.conn.common.types.CfgSpec) | None ([dict](https://docs.python.org/3/library/stdtypes.html#dict) | None)

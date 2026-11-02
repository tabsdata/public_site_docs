# MSSQLSrcConn

> MSSQL connection used by `MSSQLSrc`.

Source: https://docs.tabsdata.com/api/category/connectors/source/mssqlsrcconn

class

```python
class MSSQLSrcConn(
    uri: UriSpec,
    credentials: CredentialsSpec,
    entity_whitelist: EntityWhitelistSpec | None = None,
    conn_cfg: CfgSpec | None = None,
)
```

Bases: [Conn](https://docs.tabsdata.com/api/category/spi/spi/conn)

**Categories:** source

MSSQL connection used by [`MSSQLSrc`](https://docs.tabsdata.com/api/category/connectors/source/mssqlsrc).

Registered on a collection; the runtime resolves it and hands it to the plugin at run time. The `uri` accepts a plain string or a [`Secret`](https://docs.tabsdata.com/api/category/connectors/credentials/secret).

## Parameters

parameter

`uri`[UriSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-mssql#tabsdatak.conn.mssql.UriSpec) ([str](https://docs.python.org/3/library/stdtypes.html#str) | [Secret](https://docs.tabsdata.com/api/category/connectors/credentials/secret))

An MSSQL connection URI -- either a SQLAlchemy URI (`mssql[+driver]://host[:port][/db]`; the driver defaults to `pyodbc`) or a raw ODBC connection string (`DRIVER=...;SERVER=...;DATABASE=...`).

parameter

`credentials`[CredentialsSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-mssql#tabsdatak.conn.mssql.CredentialsSpec) ([UserPassword](https://docs.tabsdata.com/api/category/connectors/credentials/userpassword))

[`UserPassword`](https://docs.tabsdata.com/api/category/connectors/credentials/userpassword) (user + password).

parameter

`entity_whitelist`[EntityWhitelistSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-common-types#tabsdatak.conn.common.types.EntityWhitelistSpec) | None ([list](https://docs.python.org/3/library/stdtypes.html#list)\[[str](https://docs.python.org/3/library/stdtypes.html#str)\] | None)

Optional list of regex patterns narrowing which tables the source considers; `None` (the default) filters nothing.

parameter

`conn_cfg`[CfgSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-common-types#tabsdatak.conn.common.types.CfgSpec) | None ([dict](https://docs.python.org/3/library/stdtypes.html#dict) | None)

Optional connector-config dict (see [`CfgSpec`](https://docs.tabsdata.com/api/module/tabsdatak-conn-common-types#tabsdatak.conn.common.types.CfgSpec)).

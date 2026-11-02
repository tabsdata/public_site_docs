# Db2CdcStreamSrcConn

> Db2 CDC connection used by `Db2CdcStreamSrc`.

Source: https://docs.tabsdata.com/api/category/connectors/source/db2cdcstreamsrcconn

class

```python
class Db2CdcStreamSrcConn(
    uri: UriSpec,
    credentials: CredentialsSpec,
    entity_whitelist: EntityWhitelistSpec | None = None,
    conn_cfg: CfgSpec | None = None,
)
```

Bases: [Conn](https://docs.tabsdata.com/api/category/spi/spi/conn)

**Categories:** source

Db2 CDC connection used by [`Db2CdcStreamSrc`](https://docs.tabsdata.com/api/category/connectors/source/db2cdcstreamsrc).

Mirrors [`Db2SrcConn`](https://docs.tabsdata.com/api/category/connectors/source/db2srcconn) for the SQLAlchemy / catalog introspection side. SQL Replication needs no distinct replica identifier on the connection: the CD tables and the `ASN.IBMSNAP_*` capture tables live in the same database as the source, so an authenticated role with SELECT on the CD tables and `ASN.IBMSNAP_REGISTER` suffices. Not a subclass of [`Db2SrcConn`](https://docs.tabsdata.com/api/category/connectors/source/db2srcconn) -- CDC and batch SQL have different operational guarantees (the capture schema must be in place, the connecting role typically needs different grants).

## Parameters

parameter

`uri`[UriSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-db2#tabsdatak.conn.db2.UriSpec) ([str](https://docs.python.org/3/library/stdtypes.html#str) | [Secret](https://docs.tabsdata.com/api/category/connectors/credentials/secret))

SQLAlchemy-style Db2 URI; accepts a plain string or a [`Secret`](https://docs.tabsdata.com/api/category/connectors/credentials/secret) (see `UriSpec`).

parameter

`credentials`[CredentialsSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-db2#tabsdatak.conn.db2.CredentialsSpec) ([UserPassword](https://docs.tabsdata.com/api/category/connectors/credentials/userpassword))

[`UserPassword`](https://docs.tabsdata.com/api/category/connectors/credentials/userpassword) credentials.

parameter

`entity_whitelist`[EntityWhitelistSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-common-types#tabsdatak.conn.common.types.EntityWhitelistSpec) | None ([list](https://docs.python.org/3/library/stdtypes.html#list)\[[str](https://docs.python.org/3/library/stdtypes.html#str)\] | None)

Optional regex patterns narrowing discovery; `None` (default) means no filtering.

parameter

`conn_cfg`[CfgSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-common-types#tabsdatak.conn.common.types.CfgSpec) | None ([dict](https://docs.python.org/3/library/stdtypes.html#dict) | None)

Optional ibm\_db connection keywords forwarded as `connect_args` to every engine the stream opens, the initial load's included.

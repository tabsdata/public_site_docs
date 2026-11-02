# PostgresCdcStreamSrcConn

> Postgres CDC connection used by `PostgresCdcStreamSrc`.

Source: https://docs.tabsdata.com/api/category/connectors/source/postgrescdcstreamsrcconn

class

```python
class PostgresCdcStreamSrcConn(
    uri: UriSpec,
    credentials: CredentialsSpec,
    entity_whitelist: EntityWhitelistSpec | None = None,
    conn_cfg: CfgSpec | None = None,
)
```

Bases: [Conn](https://docs.tabsdata.com/api/category/spi/spi/conn)

**Categories:** source

Postgres CDC connection used by [`PostgresCdcStreamSrc`](https://docs.tabsdata.com/api/category/connectors/source/postgrescdcstreamsrc).

Mirrors [`PostgresSrcConn`](https://docs.tabsdata.com/api/category/connectors/source/postgressrcconn) for the SQLAlchemy / catalog introspection side. The replication slot and publication live on [`PostgresCdcStreamSrc`](https://docs.tabsdata.com/api/category/connectors/source/postgrescdcstreamsrc) instead, so one connection can front multiple sources if each uses a distinct slot. Not a subclass of [`PostgresSrcConn`](https://docs.tabsdata.com/api/category/connectors/source/postgressrcconn) -- CDC and batch SQL have different operational guarantees (the connecting role needs the `REPLICATION` attribute; the slot retention model is separate from query permissions).

## Parameters

parameter

`uri`[UriSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-postgres#tabsdatak.conn.postgres.UriSpec) ([str](https://docs.python.org/3/library/stdtypes.html#str) | [Secret](https://docs.tabsdata.com/api/category/connectors/credentials/secret))

SQLAlchemy-style Postgres URI; accepts a plain string or a [`Secret`](https://docs.tabsdata.com/api/category/connectors/credentials/secret) (see `UriSpec`).

parameter

`credentials`[CredentialsSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-postgres#tabsdatak.conn.postgres.CredentialsSpec) ([UserPassword](https://docs.tabsdata.com/api/category/connectors/credentials/userpassword))

[`UserPassword`](https://docs.tabsdata.com/api/category/connectors/credentials/userpassword) credentials. The connecting role must have the `REPLICATION` attribute.

parameter

`entity_whitelist`[EntityWhitelistSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-common-types#tabsdatak.conn.common.types.EntityWhitelistSpec) | None ([list](https://docs.python.org/3/library/stdtypes.html#list)\[[str](https://docs.python.org/3/library/stdtypes.html#str)\] | None)

Optional regex patterns narrowing discovery; `None` (default) means no filtering.

parameter

`conn_cfg`[CfgSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-common-types#tabsdatak.conn.common.types.CfgSpec) | None ([dict](https://docs.python.org/3/library/stdtypes.html#dict) | None)

Optional psycopg2 connection keywords (`sslmode`, `sslrootcert`, `connect_timeout`, `application_name`, ...) every connection the stream opens takes: the catalog and snapshot engines, the initial load and the replication connection alike.

# MySQLCdcStreamSrcConn

> MySQL CDC connection used by `MySQLCdcStreamSrc`.

Source: https://docs.tabsdata.com/api/category/connectors/source/mysqlcdcstreamsrcconn

class

```python
class MySQLCdcStreamSrcConn(
    uri: UriSpec,
    credentials: CredentialsSpec,
    server_id: int = DEFAULT_SERVER_ID,
    entity_whitelist: EntityWhitelistSpec | None = None,
    conn_cfg: CfgSpec | None = None,
)
```

Bases: [Conn](https://docs.tabsdata.com/api/category/spi/spi/conn)

**Categories:** source

MySQL CDC connection used by [`MySQLCdcStreamSrc`](https://docs.tabsdata.com/api/category/connectors/source/mysqlcdcstreamsrc).

Mirrors [`MySQLSrcConn`](https://docs.tabsdata.com/api/category/connectors/source/mysqlsrcconn) for the SQLAlchemy / catalog introspection side and adds `server_id` -- the unique replica identifier the source uses for binlog replication. Each concurrent CDC connection against the same MySQL must declare a distinct `server_id`; collisions cause the source to disconnect one of the replicas. Not a subclass of [`MySQLSrcConn`](https://docs.tabsdata.com/api/category/connectors/source/mysqlsrcconn) -- CDC and batch SQL have different operational guarantees (replication grants vs query permissions, replica-id reservation).

## Parameters

parameter

`uri`[UriSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-mysql#tabsdatak.conn.mysql.UriSpec) ([str](https://docs.python.org/3/library/stdtypes.html#str) | [Secret](https://docs.tabsdata.com/api/category/connectors/credentials/secret))

SQLAlchemy-style MySQL URI; accepts a plain string or a [`Secret`](https://docs.tabsdata.com/api/category/connectors/credentials/secret) (see `UriSpec`).

parameter

`credentials`[CredentialsSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-mysql#tabsdatak.conn.mysql.CredentialsSpec) ([UserPassword](https://docs.tabsdata.com/api/category/connectors/credentials/userpassword))

[`UserPassword`](https://docs.tabsdata.com/api/category/connectors/credentials/userpassword) credentials.

parameter

`server_id`[int](https://docs.python.org/3/builtins/functions.html#int)

MySQL replica id for the binlog stream. Defaults to [`DEFAULT_SERVER_ID`](https://docs.tabsdata.com/api/module/tabsdatak-conn-mysql#tabsdatak.conn.mysql.DEFAULT_SERVER_ID) (512).

parameter

`entity_whitelist`[EntityWhitelistSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-common-types#tabsdatak.conn.common.types.EntityWhitelistSpec) | None ([list](https://docs.python.org/3/library/stdtypes.html#list)\[[str](https://docs.python.org/3/library/stdtypes.html#str)\] | None)

Optional regex patterns narrowing discovery; `None` (default) means no filtering.

parameter

`conn_cfg`[CfgSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-common-types#tabsdatak.conn.common.types.CfgSpec) | None ([dict](https://docs.python.org/3/library/stdtypes.html#dict) | None)

Optional pymysql connection keywords (`ssl_ca`, `ssl_cert`, `ssl_key`, `ssl_disabled`, `charset`, `connect_timeout`, ...) every connection the stream opens takes: the catalog engine, the binlog reader, the initial load and the server checks alike. A bare `mysql://` URI connects through pymysql here, the stream's driver; an explicit `+driver` is honoured for the catalog engine.

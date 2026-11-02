# MongoDBDestConn

> MongoDB connection used by `MongoDBDest`.

Source: https://docs.tabsdata.com/api/category/connectors/destination/mongodbdestconn

class

```python
class MongoDBDestConn(
    uri: UriSpec,
    credentials: CredentialsSpec,
    conn_cfg: CfgSpec | None = None,
)
```

Bases: [Conn](https://docs.tabsdata.com/api/category/spi/spi/conn)

**Categories:** destination

MongoDB connection used by [`MongoDBDest`](https://docs.tabsdata.com/api/category/connectors/destination/mongodbdest).

Registered on a collection; the runtime resolves it and hands it to the plugin at run time.

## Parameters

parameter

`uri`[UriSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-mongodb#tabsdatak.conn.mongodb.UriSpec) ([str](https://docs.python.org/3/library/stdtypes.html#str) | [Secret](https://docs.tabsdata.com/api/category/connectors/credentials/secret))

MongoDB connection URI WITHOUT credentials, e.g. `mongodb://host:27017/?...`. Must start with `mongodb://` or `mongodb+srv://`. The plugin splices in the user / password from `credentials` at write time. Accepts a plain string or a [`Secret`](https://docs.tabsdata.com/api/category/connectors/credentials/secret).

parameter

`credentials`[CredentialsSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-mongodb#tabsdatak.conn.mongodb.CredentialsSpec) ([UserPassword](https://docs.tabsdata.com/api/category/connectors/credentials/userpassword))

[`UserPassword`](https://docs.tabsdata.com/api/category/connectors/credentials/userpassword) for the connection.

parameter

`conn_cfg`[CfgSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-common-types#tabsdatak.conn.common.types.CfgSpec) | None ([dict](https://docs.python.org/3/library/stdtypes.html#dict) | None)

Optional connector config; `pymongo.*` keys are forwarded to `pymongo.MongoClient` (see [`CfgSpec`](https://docs.tabsdata.com/api/module/tabsdatak-conn-common-types#tabsdatak.conn.common.types.CfgSpec)).

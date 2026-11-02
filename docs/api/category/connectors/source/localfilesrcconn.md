# LocalFileSrcConn

> LocalFile connection used by `LocalFileSrc`.

Source: https://docs.tabsdata.com/api/category/connectors/source/localfilesrcconn

class

```python
class LocalFileSrcConn(
    base_path: LocalAbsolutePathSpec = '/',
    conn_cfg: CfgSpec | None = None,
)
```

Bases: [Conn](https://docs.tabsdata.com/api/category/spi/spi/conn)

**Categories:** source

LocalFile connection used by [`LocalFileSrc`](https://docs.tabsdata.com/api/category/connectors/source/localfilesrc).

Registered on a collection; the runtime resolves it and hands it to the plugin at run time. Has no credentials.

## Parameters

parameter

`base_path`[LocalAbsolutePathSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-common-types#tabsdatak.conn.common.types.LocalAbsolutePathSpec) ([str](https://docs.python.org/3/library/stdtypes.html#str) | [Secret](https://docs.tabsdata.com/api/category/connectors/credentials/secret))

Absolute local-filesystem path — POSIX (`/a/b`) or Windows drive-absolute (`C:/a/b` or `C:\a\b`). No trailing separator (other than a bare root) and no empty segments. Defaults to `/`. Accepts a plain string or a [`Secret`](https://docs.tabsdata.com/api/category/connectors/credentials/secret).

parameter

`conn_cfg`[CfgSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-common-types#tabsdatak.conn.common.types.CfgSpec) | None ([dict](https://docs.python.org/3/library/stdtypes.html#dict) | None)

Optional connector-config dict (see [`CfgSpec`](https://docs.tabsdata.com/api/module/tabsdatak-conn-common-types#tabsdatak.conn.common.types.CfgSpec)).

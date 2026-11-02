# LocalFileDestConn

> LocalFile connection used by `LocalFileDest`.

Source: https://docs.tabsdata.com/api/category/connectors/destination/localfiledestconn

class

```python
class LocalFileDestConn(
    base_path: LocalAbsolutePathSpec = '/',
    conn_cfg: CfgSpec | None = None,
)
```

Bases: [Conn](https://docs.tabsdata.com/api/category/spi/spi/conn)

**Categories:** destination

LocalFile connection used by [`LocalFileDest`](https://docs.tabsdata.com/api/category/connectors/destination/localfiledest).

Field-identical to [`LocalFileSrcConn`](https://docs.tabsdata.com/api/category/connectors/source/localfilesrcconn) but a distinct class; source and destination connections are separate types and cannot be used in place of one another. See [`LocalFileSrcConn`](https://docs.tabsdata.com/api/category/connectors/source/localfilesrcconn) for the field meanings.

## Parameters

parameter

`base_path`[LocalAbsolutePathSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-common-types#tabsdatak.conn.common.types.LocalAbsolutePathSpec) ([str](https://docs.python.org/3/library/stdtypes.html#str) | [Secret](https://docs.tabsdata.com/api/category/connectors/credentials/secret))

parameter

`conn_cfg`[CfgSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-common-types#tabsdatak.conn.common.types.CfgSpec) | None ([dict](https://docs.python.org/3/library/stdtypes.html#dict) | None)

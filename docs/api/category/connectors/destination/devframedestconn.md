# DevFrameDestConn

> Connection for `DevFrameDest` -- the folder its reports go to.

Source: https://docs.tabsdata.com/api/category/connectors/destination/devframedestconn

class

```python
class DevFrameDestConn(folder: str)
```

Bases: [Conn](https://docs.tabsdata.com/api/category/spi/spi/conn)

**Categories:** destination

Connection for [`DevFrameDest`](https://docs.tabsdata.com/api/category/connectors/destination/devframedest) -- the folder its reports go to.

## Parameters

parameter

`folder`[str](https://docs.python.org/3/builtins/stdtypes.html#str)

Folder where each run writes its report, `<transaction id>.json`.

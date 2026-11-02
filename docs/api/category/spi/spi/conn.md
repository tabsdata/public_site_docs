# Conn

> Abstract base for every connection.

Source: https://docs.tabsdata.com/api/category/spi/spi/conn

class

```python
class Conn
```

Bases: `DescriptorBase`, [ABC](https://docs.python.org/3/library/abc.html#abc.ABC)

**Categories:** spi

Abstract base for every connection.

Concrete subclasses live in the connector packages (e.g. [`S3SrcConn`](https://docs.tabsdata.com/api/category/connectors/source/s3srcconn), `MySQLConn`) and declare their own `uri` / `credentials` / `conn_cfg` fields. A connection is never declared on a flow function; it is registered on the function's collection and the runtime resolves it and hands it to the connector's plugin (`read_in` / `write_out` / `run`) at run time. Subclasses share the `"connectionDef"` `__kind__` and must not redefine it (they are told apart by their envelope `type`).

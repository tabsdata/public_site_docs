# DestDef

> Entry-point registration for a `Dest` binding.

Source: https://docs.tabsdata.com/api/category/spi/spi/destdef

class

```python
class DestDef(
    type_: str,
    system: str,
    dest_version: str,
    conn: Type[Conn],
    dest: Type[D],
    cardinality: Callable[[D], int],
    plugin: Type[DestPlugin],
    explorer: Type[Explorer] | None,
    icon: str | None,
)
```

**Categories:** spi

Entry-point registration for a [`Dest`](https://docs.tabsdata.com/api/category/connectors/destination/dest) binding.

Registered via the `tabsdatak.connectors` entry point. Binds a [`Dest`](https://docs.tabsdata.com/api/category/connectors/destination/dest) config type to the [`DestPlugin`](https://docs.tabsdata.com/api/category/spi/spi/destplugin) that writes it.

## Parameters

parameter

`type_`[str](https://docs.python.org/3/builtins/stdtypes.html#str)

Wire-stable identifier, unique across _all_ plugins (e.g. `"s3-file-out"`).

parameter

`system`[str](https://docs.python.org/3/builtins/stdtypes.html#str)

Human-readable name of the target system (e.g. `"AWS S3"`); shown by `tdk connection types`.

parameter

`dest_version`[str](https://docs.python.org/3/builtins/stdtypes.html#str)

Connector schema version.

parameter

`conn`[Type](https://docs.python.org/3/library/typing.html#typing.Type)\[[Conn](https://docs.tabsdata.com/api/category/spi/spi/conn)\]

Concrete [`Conn`](https://docs.tabsdata.com/api/category/spi/spi/conn) subclass the destination binds to.

parameter

`dest`[Type](https://docs.python.org/3/library/typing.html#typing.Type)\[D\]

Concrete [`Dest`](https://docs.tabsdata.com/api/category/connectors/destination/dest) subclass this binding registers.

parameter

`cardinality`[Callable](https://docs.python.org/3/library/typing.html#typing.Callable)\[\[D\], [int](https://docs.python.org/3/builtins/functions.html#int)\]

Callable returning the number of input slots `dest` declares (e.g. `lambda d: len(d.paths)`).

parameter

`plugin`[Type](https://docs.python.org/3/library/typing.html#typing.Type)\[[DestPlugin](https://docs.tabsdata.com/api/category/spi/spi/destplugin)\]

[`DestPlugin`](https://docs.tabsdata.com/api/category/spi/spi/destplugin) subclass implementing `write_out`.

parameter

`explorer`[Type](https://docs.python.org/3/library/typing.html#typing.Type)\[[Explorer](https://docs.tabsdata.com/api/category/spi/spi/explorer)\] | None

Optional [`Explorer`](https://docs.tabsdata.com/api/category/spi/spi/explorer) for tooling.

parameter

`icon`[str](https://docs.python.org/3/builtins/stdtypes.html#str) | None

Path to the connector's icon relative to the `tabsdatak` namespace root, or `None` for none.

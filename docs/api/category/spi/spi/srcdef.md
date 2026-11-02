# SrcDef

> Entry-point registration for a batch `Src` binding.

Source: https://docs.tabsdata.com/api/category/spi/spi/srcdef

class

```python
class SrcDef(
    type_: str,
    system: str,
    src_version: str,
    conn: Type[Conn],
    src: Type[S],
    table_mode: TableMode,
    cardinality: Callable[[S], int],
    plugin: Type[SrcPlugin],
    explorer: Type[Explorer] | None,
    icon: str | None,
)
```

**Categories:** spi

Entry-point registration for a batch [`Src`](https://docs.tabsdata.com/api/category/connectors/source/src) binding.

Registered via the `tabsdatak.connectors` entry point. Binds a [`Src`](https://docs.tabsdata.com/api/category/connectors/source/src) config type to the [`SrcPlugin`](https://docs.tabsdata.com/api/category/spi/spi/srcplugin) that reads it.

## Parameters

parameter

`type_`[str](https://docs.python.org/3/builtins/stdtypes.html#str)

Wire-stable identifier, unique across _all_ plugins (sources, stream sources and destinations share one namespace), e.g. `"s3-file-in"`. The registry's key.

parameter

`system`[str](https://docs.python.org/3/builtins/stdtypes.html#str)

Human-readable name of the target system (e.g. `"AWS S3"`); shown by `tdk connection types`.

parameter

`src_version`[str](https://docs.python.org/3/builtins/stdtypes.html#str)

Connector schema version.

parameter

`conn`[Type](https://docs.python.org/3/library/typing.html#typing.Type)\[[Conn](https://docs.tabsdata.com/api/category/spi/spi/conn)\]

Concrete [`Conn`](https://docs.tabsdata.com/api/category/spi/spi/conn) subclass the source binds to.

parameter

`src`[Type](https://docs.python.org/3/library/typing.html#typing.Type)\[S\]

Concrete [`Src`](https://docs.tabsdata.com/api/category/connectors/source/src) subclass this binding registers.

parameter

`table_mode`[TableMode](https://docs.tabsdata.com/api/category/spi/spi/tablemode)

Whether `read_in` produces one file per slot or many; see [`TableMode`](https://docs.tabsdata.com/api/category/spi/spi/tablemode).

parameter

`cardinality`[Callable](https://docs.python.org/3/library/typing.html#typing.Callable)\[\[S\], [int](https://docs.python.org/3/builtins/functions.html#int)\]

Callable returning the number of output slots `src` declares (e.g. `lambda s: len(s.paths)`).

parameter

`plugin`[Type](https://docs.python.org/3/library/typing.html#typing.Type)\[[SrcPlugin](https://docs.tabsdata.com/api/category/spi/spi/srcplugin)\]

[`SrcPlugin`](https://docs.tabsdata.com/api/category/spi/spi/srcplugin) subclass implementing `read_in`.

parameter

`explorer`[Type](https://docs.python.org/3/library/typing.html#typing.Type)\[[Explorer](https://docs.tabsdata.com/api/category/spi/spi/explorer)\] | None

Optional [`Explorer`](https://docs.tabsdata.com/api/category/spi/spi/explorer) for tooling introspection.

parameter

`icon`[str](https://docs.python.org/3/builtins/stdtypes.html#str) | None

Path to the connector's icon relative to the `tabsdatak` namespace root (e.g. `"conn/s3/resources/s3.svg"`), or `None` for none.

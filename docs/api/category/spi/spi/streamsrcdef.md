# StreamSrcDef

> Entry-point registration for a `StreamSrc` binding.

Source: https://docs.tabsdata.com/api/category/spi/spi/streamsrcdef

class

```python
class StreamSrcDef(
    type_: str,
    system: str,
    src_version: str,
    conn: Type[Conn],
    src: Type[S],
    cardinality: Callable[[S], int],
    plugin: Type[StreamSrcPlugin],
    publisher_src: Type[StreamStageSrc],
    explorer: Type[Explorer] | None,
    icon: str | None,
)
```

**Categories:** spi

Entry-point registration for a [`StreamSrc`](https://docs.tabsdata.com/api/category/connectors/source/streamsrc) binding.

Registered via the `tabsdatak.connectors` entry point. Binds a [`StreamSrc`](https://docs.tabsdata.com/api/category/connectors/source/streamsrc) config type to the [`StreamSrcPlugin`](https://docs.tabsdata.com/api/category/spi/spi/streamsrcplugin) that runs it.

## Parameters

parameter

`type_`[str](https://docs.python.org/3/builtins/stdtypes.html#str)

Wire-stable identifier, unique across _all_ plugins (e.g. `"postgres-cdc"`, `"kafka-topic-in"`).

parameter

`system`[str](https://docs.python.org/3/builtins/stdtypes.html#str)

Human-readable name of the target system (e.g. `"Apache Kafka"`); shown by `tdk connection types`.

parameter

`src_version`[str](https://docs.python.org/3/builtins/stdtypes.html#str)

Connector schema version.

parameter

`conn`[Type](https://docs.python.org/3/library/typing.html#typing.Type)\[[Conn](https://docs.tabsdata.com/api/category/spi/spi/conn)\]

Concrete [`Conn`](https://docs.tabsdata.com/api/category/spi/spi/conn) subclass the stream source binds to.

parameter

`src`[Type](https://docs.python.org/3/library/typing.html#typing.Type)\[S\]

Concrete [`StreamSrc`](https://docs.tabsdata.com/api/category/connectors/source/streamsrc) subclass this binding registers.

parameter

`cardinality`[Callable](https://docs.python.org/3/library/typing.html#typing.Callable)\[\[S\], [int](https://docs.python.org/3/builtins/functions.html#int)\]

Callable returning the number of output slots `src` declares (e.g. `lambda s: len(s.tables)`).

parameter

`plugin`[Type](https://docs.python.org/3/library/typing.html#typing.Type)\[[StreamSrcPlugin](https://docs.tabsdata.com/api/category/spi/spi/streamsrcplugin)\]

[`StreamSrcPlugin`](https://docs.tabsdata.com/api/category/spi/spi/streamsrcplugin) subclass implementing `run`.

parameter

`publisher_src`[Type](https://docs.python.org/3/library/typing.html#typing.Type)\[[StreamStageSrc](https://docs.tabsdata.com/api/category/spi/spi/streamstagesrc)\]

[`StreamStageSrc`](https://docs.tabsdata.com/api/category/spi/spi/streamstagesrc) subclass naming the hidden batch source that ingests this stream's staged manifests; use [`StreamStageSrc`](https://docs.tabsdata.com/api/category/spi/spi/streamstagesrc) itself for the default behaviour.

parameter

`explorer`[Type](https://docs.python.org/3/library/typing.html#typing.Type)\[[Explorer](https://docs.tabsdata.com/api/category/spi/spi/explorer)\] | None

Optional [`Explorer`](https://docs.tabsdata.com/api/category/spi/spi/explorer) for tooling.

parameter

`icon`[str](https://docs.python.org/3/builtins/stdtypes.html#str) | None

Path to the connector's icon relative to the `tabsdatak` namespace root, or `None` for none.

# LazyFrameInput

> One table `SrcPlugin.read_in` produces for a publisher input: its data, as a polars `LazyFrame`, and the metadata that says how to serve it.

Source: https://docs.tabsdata.com/api/category/spi/spi/lazyframeinput

class

```python
class LazyFrameInput(
    frame: pl.LazyFrame,
    metadata: FrameMetadata | Callable[[], FrameMetadata] | None = None,
)
```

**Categories:** spi

One table `SrcPlugin.read_in` produces for a publisher input: its data, as a polars `LazyFrame`, and the metadata that says how to serve it.

## Parameters

parameter

`frame`pl.LazyFrame

The table, or one chunk of it.

parameter

`metadata`[FrameMetadata](https://docs.tabsdata.com/api/category/spi/spi/framemetadata) | [Callable](https://docs.python.org/3/library/typing.html#typing.Callable)\[\[\], [FrameMetadata](https://docs.tabsdata.com/api/category/spi/spi/framemetadata)\] | None

Optional [`FrameMetadata`](https://docs.tabsdata.com/api/category/spi/spi/framemetadata), or a function returning it. A function is called once the frame has landed, for metadata learnt while the frame streams.

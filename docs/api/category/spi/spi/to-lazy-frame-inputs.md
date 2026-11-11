# to_lazy_frame_inputs

> Wrap per-input `LazyFrame` s as `LazyFrameInput` s with no metadata -- the shape `SrcPlugin.read_in` returns.

Source: https://docs.tabsdata.com/api/category/spi/spi/to-lazy-frame-inputs

function

```python
def to_lazy_frame_inputs(
    frames: list[list[pl.LazyFrame]],
) -> list[Iterable[LazyFrameInput]]
```

**Categories:** spi

Wrap per-input `LazyFrame`\\ s as [`LazyFrameInput`](https://docs.tabsdata.com/api/category/spi/spi/lazyframeinput)\\ s with no metadata -- the shape `SrcPlugin.read_in` returns.

## Parameters

parameter

`frames`[list](https://docs.python.org/3/builtins/stdtypes.html#list)\[[list](https://docs.python.org/3/builtins/stdtypes.html#list)\[pl.LazyFrame\]\]

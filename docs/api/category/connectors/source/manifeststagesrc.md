# ManifestStageSrc

> Stream-stage source -- materialises the files in one manifest.

Source: https://docs.tabsdata.com/api/category/connectors/source/manifeststagesrc

class

```python
class ManifestStageSrc
```

Bases: [Src](https://docs.tabsdata.com/api/category/connectors/source/src)

**Categories:** source

Stream-stage source -- materialises the files in one manifest.

Carries no configuration: each run fetches the next unseen manifest from the stage and emits its listed parquet files. The manifest decides the output slot count, so it is not fixed on the class.

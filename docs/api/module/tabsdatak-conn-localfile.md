# tabsdatak.conn.localfile

> tabsdatak.conn.localfile API reference.

Source: https://docs.tabsdata.com/api/module/tabsdatak-conn-localfile

|  |  |
| --- | --- |
| [`DestCfgKey`](#tabsdatak.conn.localfile.DestCfgKey) |  |
| [`DestCfgSpec`](#tabsdatak.conn.localfile.DestCfgSpec) |  |
| [`LocalFileDest`](https://docs.tabsdata.com/api/category/connectors/destination/localfiledest) | LocalFile destination for `@subscriber` -- one target file per path. |
| [`LocalFileDestConn`](https://docs.tabsdata.com/api/category/connectors/destination/localfiledestconn) | LocalFile connection used by `LocalFileDest`. |
| [`LocalFileSrc`](https://docs.tabsdata.com/api/category/connectors/source/localfilesrc) | LocalFile source for `@publisher` -- one output slot per path. |
| [`LocalFileSrcConn`](https://docs.tabsdata.com/api/category/connectors/source/localfilesrcconn) | LocalFile connection used by `LocalFileSrc`. |
| [`SrcCfgKey`](#tabsdatak.conn.localfile.SrcCfgKey) |  |
| [`SrcCfgSpec`](#tabsdatak.conn.localfile.SrcCfgSpec) |  |

* * *

## DestCfgKey

type\_alias

```python
DestCfgKey: Literal['tabsdata.file.chunk_size']
```

* * *

## DestCfgSpec

type\_alias

```python
DestCfgSpec: Mapping[DestCfgKey, Any]
```

**Resolved type:**

```python
Mapping[Literal['tabsdata.file.chunk_size'], Any]
```

* * *

## SrcCfgKey

type\_alias

```python
SrcCfgKey: Literal['tabsdata.file.chunk_size', 'tabsdata.src_metadata.drop']
```

* * *

## SrcCfgSpec

type\_alias

```python
SrcCfgSpec: Mapping[SrcCfgKey, Any]
```

**Resolved type:**

```python
Mapping[Literal['tabsdata.file.chunk_size', 'tabsdata.src_metadata.drop'], Any]
```

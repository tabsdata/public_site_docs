# tabsdatak.conn.s3

> tabsdatak.conn.s3 API reference.

Source: https://docs.tabsdata.com/api/module/tabsdatak-conn-s3

|  |  |
| --- | --- |
| [`CredentialsSpec`](#tabsdatak.conn.s3.CredentialsSpec) | The credential type for S3 connections: `AwsAccessSecretKey` (access key ID + secret access key). |
| [`DestCfgKey`](#tabsdatak.conn.s3.DestCfgKey) |  |
| [`DestCfgSpec`](#tabsdatak.conn.s3.DestCfgSpec) |  |
| [`S3Dest`](https://docs.tabsdata.com/api/category/connectors/destination/s3dest) | S3 destination for `@subscriber` -- one target file per path. |
| [`S3DestConn`](https://docs.tabsdata.com/api/category/connectors/destination/s3destconn) | S3 connection used by `S3Dest`. |
| [`S3Src`](https://docs.tabsdata.com/api/category/connectors/source/s3src) | S3 source for `@publisher` -- one output slot per path. |
| [`S3SrcConn`](https://docs.tabsdata.com/api/category/connectors/source/s3srcconn) | S3 connection used by `S3Src`. |
| [`SrcCfgKey`](#tabsdatak.conn.s3.SrcCfgKey) |  |
| [`SrcCfgSpec`](#tabsdatak.conn.s3.SrcCfgSpec) |  |

* * *

## CredentialsSpec

type\_alias

```python
CredentialsSpec: AwsAccessSecretKey
```

The credential type for S3 connections: [`AwsAccessSecretKey`](https://docs.tabsdata.com/api/category/connectors/credentials/awsaccesssecretkey) (access key ID + secret access key).

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

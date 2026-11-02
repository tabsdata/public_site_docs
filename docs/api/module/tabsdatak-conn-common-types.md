# tabsdatak.conn.common.types

> tabsdatak.conn.common.types API reference.

Source: https://docs.tabsdata.com/api/module/tabsdatak-conn-common-types

|  |  |
| --- | --- |
| [`AwsAccessSecretKey`](https://docs.tabsdata.com/api/category/connectors/credentials/awsaccesssecretkey) | AWS access key ID / secret access key credentials. |
| [`AwsRegionSpec`](#tabsdatak.conn.common.types.AwsRegionSpec) | A valid AWS region name, e.g. |
| [`AzContainerSpec`](#tabsdatak.conn.common.types.AzContainerSpec) | A valid Azure Blob container name: 3-63 characters, lowercase letters and digits with single (non-leading, non-trailing) hyphens. |
| [`AzureAccountKey`](https://docs.tabsdata.com/api/category/connectors/credentials/azureaccountkey) | Azure storage account name / key credentials. |
| [`AzureCredentials`](https://docs.tabsdata.com/api/category/connectors/credentials/azurecredentials) | Abstract base for Azure credential types. |
| [`BoolSpec`](#tabsdatak.conn.common.types.BoolSpec) | A boolean flag as text: one of `true`/`false`, `t`/`f`, `yes`/`no`, `y`/`n`, `on`/`off`, `1`/`0` (case-insensitive). |
| [`CfgSpec`](#tabsdatak.conn.common.types.CfgSpec) | Type for a connector `conn_cfg` field: a free-form dict forwarding 3rd-party-specific configuration. |
| [`cloud_full_path`](#tabsdatak.conn.common.types.cloud_full_path) | Join a cloud `base_path` (object-key prefix) with `path`, stripping leading and trailing `/` from each side and from the result. |
| [`CloudRelativePathSpec`](#tabsdatak.conn.common.types.CloudRelativePathSpec) | A cloud object-key prefix, relative to the container/bucket root. |
| [`Credentials`](https://docs.tabsdata.com/api/category/connectors/credentials/credentials) | Abstract base for every credential type. |
| [`DataType`](#tabsdatak.conn.common.types.DataType) | Placeholder enumeration of basic data types. |
| [`EntityWhitelistSpec`](#tabsdatak.conn.common.types.EntityWhitelistSpec) | Optional list of regex patterns narrowing which of the external system's entities (tables / collections / objects / datasets / ...) a source considers. |
| [`GCPCredentials`](https://docs.tabsdata.com/api/category/connectors/credentials/gcpcredentials) | Abstract base for Google Cloud credential types. |
| [`GCPHmac`](https://docs.tabsdata.com/api/category/connectors/credentials/gcphmac) | HMAC access key / secret for GCS's S3-compatible endpoint. |
| [`GCPJson`](https://docs.tabsdata.com/api/category/connectors/credentials/gcpjson) | GCP service-account JSON key credentials. |
| [`GCSBucketSpec`](#tabsdatak.conn.common.types.GCSBucketSpec) | A valid GCS bucket name: 3-63 characters, lowercase letters, digits, hyphens and underscores, starting and ending with a letter or digit. |
| [`HostSpec`](#tabsdatak.conn.common.types.HostSpec) | A DNS host name or IPv4 literal (e.g. |
| [`local_full_path`](#tabsdatak.conn.common.types.local_full_path) | Join a local-filesystem `base_path` with the relative `path`, returning a native path for the running OS. |
| [`LocalAbsolutePathSpec`](#tabsdatak.conn.common.types.LocalAbsolutePathSpec) | An absolute local-filesystem path: POSIX (`/a/b`) or Windows drive-absolute (`C:/a/b` or `C:\a\b`). |
| [`normalize_dir_path`](#tabsdatak.conn.common.types.normalize_dir_path) | Render `path` as a directory-style prefix with a leading and/or trailing `/` forced on per the flags -- for an external driver that expects a specific spelling of the prefix. |
| [`PortSpec`](#tabsdatak.conn.common.types.PortSpec) | A TCP port number, 1-65535. |
| [`S3BucketSpec`](#tabsdatak.conn.common.types.S3BucketSpec) | A valid S3 bucket name: 3-63 characters, lowercase letters, digits and hyphens, starting and ending with a letter or digit. |
| [`UserPassword`](https://docs.tabsdata.com/api/category/connectors/credentials/userpassword) | Username / password credentials. |

* * *

## AwsRegionSpec

type\_alias

```python
AwsRegionSpec: StrOrSecretSpec
```

**Resolved type:**

```python
str | Secret
```

A valid AWS region name, e.g. `us-east-1` or `us-gov-west-1`. Accepts a plain string or a [`Secret`](https://docs.tabsdata.com/api/category/connectors/credentials/secret).

* * *

## AzContainerSpec

type\_alias

```python
AzContainerSpec: StrOrSecretSpec
```

**Resolved type:**

```python
str | Secret
```

A valid Azure Blob container name: 3-63 characters, lowercase letters and digits with single (non-leading, non-trailing) hyphens. Accepts a plain string or a [`Secret`](https://docs.tabsdata.com/api/category/connectors/credentials/secret).

* * *

## BoolSpec

type\_alias

```python
BoolSpec: StrOrSecretSpec
```

**Resolved type:**

```python
str | Secret
```

A boolean flag as text: one of `true`/`false`, `t`/`f`, `yes`/`no`, `y`/`n`, `on`/`off`, `1`/`0` (case-insensitive). Accepts a plain string or a [`Secret`](https://docs.tabsdata.com/api/category/connectors/credentials/secret); read the parsed bool with `_convert(x, bool)`.

* * *

## CfgSpec

type\_alias

```python
CfgSpec: dict
```

Type for a connector `conn_cfg` field: a free-form dict forwarding 3rd-party-specific configuration.

Keys targeting a dependency are prefixed with its package name plus `.` (e.g. `"sqlalchemy.connect_args"`, `"mysql.charset"`); the connector strips the prefix before forwarding. Values must be JSON-like: `str` / `int` / `float` / `bool` / `None`, or a (recursively validated) str-keyed `dict` or `list`.

* * *

## cloud\_full\_path

function

```python
def cloud_full_path(base_path: CloudRelativePathSpec, path: str) -> str
```

Join a cloud `base_path` (object-key prefix) with `path`, stripping leading and trailing `/` from each side and from the result. `base_path` may be a `str` or a [`Secret`](https://docs.tabsdata.com/api/category/connectors/credentials/secret) whose `.value()` resolves to the path string.

**Parameters:**

parameter

`base_path`[CloudRelativePathSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-common-types#tabsdatak.conn.common.types.CloudRelativePathSpec) ([str](https://docs.python.org/3/library/stdtypes.html#str) | [Secret](https://docs.tabsdata.com/api/category/connectors/credentials/secret))

parameter

`path`[str](https://docs.python.org/3/builtins/stdtypes.html#str)

* * *

## CloudRelativePathSpec

type\_alias

```python
CloudRelativePathSpec: StrOrSecretSpec
```

**Resolved type:**

```python
str | Secret
```

A cloud object-key prefix, relative to the container/bucket root.

Starts with `/`, has no trailing `/` (except the bare root `/`) and no empty segments (no `//`); backslash and NUL are forbidden. Accepts a plain string or a [`Secret`](https://docs.tabsdata.com/api/category/connectors/credentials/secret).

* * *

## DataType

class

```python
class DataType(
    BOOL = 'bool',
    INT = 'int',
    FLOAT = 'float',
    STRING = 'string',
    BYTES = 'bytes',
    DATE = 'date',
    TIME = 'time',
    DATETIME = 'datetime',
)
```

Bases: [Enum](https://docs.python.org/3/library/enum.html#enum.Enum)

Placeholder enumeration of basic data types.

Not yet part of the stable public surface; subject to change.

**Parameters:**

parameter

`BOOL`

parameter

`INT`

parameter

`FLOAT`

parameter

`STRING`

parameter

`BYTES`

parameter

`DATE`

parameter

`TIME`

parameter

`DATETIME`

* * *

## EntityWhitelistSpec

type\_alias

```python
EntityWhitelistSpec: list[str]
```

Optional list of regex patterns narrowing which of the external system's entities (tables / collections / objects / datasets / ...) a source considers.

`None` (the default) means no filtering. Each entry must be a valid Python regular expression, matched against entity metadata names.

* * *

## GCSBucketSpec

type\_alias

```python
GCSBucketSpec: StrOrSecretSpec
```

**Resolved type:**

```python
str | Secret
```

A valid GCS bucket name: 3-63 characters, lowercase letters, digits, hyphens and underscores, starting and ending with a letter or digit. Accepts a plain string or a [`Secret`](https://docs.tabsdata.com/api/category/connectors/credentials/secret).

* * *

## HostSpec

type\_alias

```python
HostSpec: StrOrSecretSpec
```

**Resolved type:**

```python
str | Secret
```

A DNS host name or IPv4 literal (e.g. `localhost`, `db.example.com`, `10.0.0.1`). Accepts a plain string or a [`Secret`](https://docs.tabsdata.com/api/category/connectors/credentials/secret).

* * *

## local\_full\_path

function

```python
def local_full_path(base_path: LocalAbsolutePathSpec, path: str) -> str
```

Join a local-filesystem `base_path` with the relative `path`, returning a native path for the running OS.

`base_path` is absolute (POSIX or Windows drive-absolute). `path` is relative to it and may use `/` or `\` separators; both are accepted and the segments are re-joined with the OS-native separator so the result is usable directly for filesystem access. `base_path` may be a `str` or a [`Secret`](https://docs.tabsdata.com/api/category/connectors/credentials/secret).

**Parameters:**

parameter

`base_path`[LocalAbsolutePathSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-common-types#tabsdatak.conn.common.types.LocalAbsolutePathSpec) ([str](https://docs.python.org/3/library/stdtypes.html#str) | [Secret](https://docs.tabsdata.com/api/category/connectors/credentials/secret))

parameter

`path`[str](https://docs.python.org/3/builtins/stdtypes.html#str)

* * *

## LocalAbsolutePathSpec

type\_alias

```python
LocalAbsolutePathSpec: StrOrSecretSpec
```

**Resolved type:**

```python
str | Secret
```

An absolute local-filesystem path: POSIX (`/a/b`) or Windows drive-absolute (`C:/a/b` or `C:\a\b`). UNC and relative paths are rejected; no empty segments or NUL. Accepts a plain string or a [`Secret`](https://docs.tabsdata.com/api/category/connectors/credentials/secret).

* * *

## normalize\_dir\_path

function

```python
def normalize_dir_path(path: str, lead_separator: bool, back_separator: bool) -> str
```

Render `path` as a directory-style prefix with a leading and/or trailing `/` forced on per the flags -- for an external driver that expects a specific spelling of the prefix. `path` is first reduced to its slash-stripped core; an empty core yields `""` regardless of the flags (there is no directory to delimit).

**Parameters:**

parameter

`path`[str](https://docs.python.org/3/builtins/stdtypes.html#str)

parameter

`lead_separator`[bool](https://docs.python.org/3/builtins/functions.html#bool)

parameter

`back_separator`[bool](https://docs.python.org/3/builtins/functions.html#bool)

* * *

## PortSpec

type\_alias

```python
PortSpec: StrOrSecretSpec
```

**Resolved type:**

```python
str | Secret
```

A TCP port number, 1-65535. Accepts a plain string or a [`Secret`](https://docs.tabsdata.com/api/category/connectors/credentials/secret); read the parsed int with `_convert(x, int)`.

* * *

## S3BucketSpec

type\_alias

```python
S3BucketSpec: StrOrSecretSpec
```

**Resolved type:**

```python
str | Secret
```

A valid S3 bucket name: 3-63 characters, lowercase letters, digits and hyphens, starting and ending with a letter or digit. Accepts a plain string or a [`Secret`](https://docs.tabsdata.com/api/category/connectors/credentials/secret).

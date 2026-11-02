# tabsdatak.conn.salesforce

> tabsdatak.conn.salesforce API reference.

Source: https://docs.tabsdata.com/api/module/tabsdatak-conn-salesforce

|  |  |
| --- | --- |
| [`ApiNameSpec`](#tabsdatak.conn.salesforce.ApiNameSpec) |  |
| [`ApiVersionSpec`](#tabsdatak.conn.salesforce.ApiVersionSpec) |  |
| [`CredentialsSpec`](#tabsdatak.conn.salesforce.CredentialsSpec) |  |
| [`FilterSpec`](#tabsdatak.conn.salesforce.FilterSpec) |  |
| [`InstanceUrlSpec`](#tabsdatak.conn.salesforce.InstanceUrlSpec) |  |
| [`ObjectsNameSpec`](#tabsdatak.conn.salesforce.ObjectsNameSpec) |  |
| [`OperatorSpec`](#tabsdatak.conn.salesforce.OperatorSpec) |  |
| [`QueriesSpec`](#tabsdatak.conn.salesforce.QueriesSpec) |  |
| [`ReportsSpec`](#tabsdatak.conn.salesforce.ReportsSpec) |  |
| [`SalesforceCredentials`](https://docs.tabsdata.com/api/category/connectors/credentials/salesforcecredentials) | Abstract base for Salesforce credential shapes. |
| [`SalesforceReportSrc`](https://docs.tabsdata.com/api/category/connectors/source/salesforcereportsrc) | Salesforce report source for `@publisher` -- Tabular reports only. |
| [`SalesforceSrc`](https://docs.tabsdata.com/api/category/connectors/source/salesforcesrc) | Salesforce SOQL source for `@publisher` -- one query. |
| [`SalesforceSrcConn`](https://docs.tabsdata.com/api/category/connectors/source/salesforcesrcconn) | Salesforce org connection used by `SalesforceSrc` / `SalesforceReportSrc`. |
| [`SalesforceTokenCredentials`](https://docs.tabsdata.com/api/category/connectors/credentials/salesforcetokencredentials) | Salesforce username / password / security-token credentials. |
| [`SrcCfgKey`](#tabsdatak.conn.salesforce.SrcCfgKey) |  |
| [`SrcCfgSpec`](#tabsdatak.conn.salesforce.SrcCfgSpec) |  |

* * *

## ApiNameSpec

type\_alias

```python
ApiNameSpec: str
```

* * *

## ApiVersionSpec

type\_alias

```python
ApiVersionSpec: str
```

* * *

## CredentialsSpec

type\_alias

```python
CredentialsSpec: SalesforceTokenCredentials
```

* * *

## FilterSpec

type\_alias

```python
FilterSpec: list[tuple[str, OperatorSpec, str]]
```

**Resolved type:**

```python
list[tuple[str, Literal['equals', 'notEqual', 'lessThan', 'greaterThan', 'lessOrEqual', 'greaterOrEqual', 'contains', 'notContain', 'startsWith', 'includes', 'excludes', 'within', 'between'], str]]
```

* * *

## InstanceUrlSpec

type\_alias

```python
InstanceUrlSpec: StrOrSecretSpec
```

**Resolved type:**

```python
str | Secret
```

* * *

## ObjectsNameSpec

type\_alias

```python
ObjectsNameSpec: list[ApiNameSpec]
```

**Resolved type:**

```python
list[str]
```

* * *

## OperatorSpec

type\_alias

```python
OperatorSpec: Literal['equals', 'notEqual', 'lessThan', 'greaterThan', 'lessOrEqual', 'greaterOrEqual', 'contains', 'notContain', 'startsWith', 'includes', 'excludes', 'within', 'between']
```

* * *

## QueriesSpec

type\_alias

```python
QueriesSpec: list[str]
```

* * *

## ReportsSpec

type\_alias

```python
ReportsSpec: list[str]
```

* * *

## SrcCfgKey

type\_alias

```python
SrcCfgKey: Literal['salesforce.logging_level', 'tabsdata.src_metadata.drop']
```

* * *

## SrcCfgSpec

type\_alias

```python
SrcCfgSpec: Mapping[SrcCfgKey, Any]
```

**Resolved type:**

```python
Mapping[Literal['salesforce.logging_level', 'tabsdata.src_metadata.drop'], Any]
```

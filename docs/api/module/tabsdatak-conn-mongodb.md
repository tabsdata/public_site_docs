# tabsdatak.conn.mongodb

> tabsdatak.conn.mongodb API reference.

Source: https://docs.tabsdata.com/api/module/tabsdatak-conn-mongodb

|  |  |
| --- | --- |
| [`CollectionSpec`](#tabsdatak.conn.mongodb.CollectionSpec) |  |
| [`CollectionsWithIdsSpec`](#tabsdatak.conn.mongodb.CollectionsWithIdsSpec) |  |
| [`ColumnNameSpec`](#tabsdatak.conn.mongodb.ColumnNameSpec) |  |
| [`CredentialsSpec`](#tabsdatak.conn.mongodb.CredentialsSpec) |  |
| [`DestCfgKey`](#tabsdatak.conn.mongodb.DestCfgKey) |  |
| [`DestCfgSpec`](#tabsdatak.conn.mongodb.DestCfgSpec) |  |
| [`IfTableExistsSpec`](#tabsdatak.conn.mongodb.IfTableExistsSpec) |  |
| [`MongoDBDest`](https://docs.tabsdata.com/api/category/connectors/destination/mongodbdest) | MongoDB destination for `@subscriber` -- one slot per collection. |
| [`MongoDBDestConn`](https://docs.tabsdata.com/api/category/connectors/destination/mongodbdestconn) | MongoDB connection used by `MongoDBDest`. |
| [`UriSpec`](#tabsdatak.conn.mongodb.UriSpec) |  |

* * *

## CollectionSpec

type\_alias

```python
CollectionSpec: str
```

* * *

## CollectionsWithIdsSpec

type\_alias

```python
CollectionsWithIdsSpec: list[tuple[CollectionSpec, ColumnNameSpec | None]]
```

**Resolved type:**

```python
list[tuple[str, str | None]]
```

* * *

## ColumnNameSpec

type\_alias

```python
ColumnNameSpec: str
```

* * *

## CredentialsSpec

type\_alias

```python
CredentialsSpec: UserPassword
```

* * *

## DestCfgKey

type\_alias

```python
DestCfgKey: Literal['mongodb.logging_level']
```

* * *

## DestCfgSpec

type\_alias

```python
DestCfgSpec: Mapping[DestCfgKey, Any]
```

**Resolved type:**

```python
Mapping[Literal['mongodb.logging_level'], Any]
```

* * *

## IfTableExistsSpec

type\_alias

```python
IfTableExistsSpec: Literal['append', 'replace']
```

* * *

## UriSpec

type\_alias

```python
UriSpec: StrOrSecretSpec
```

**Resolved type:**

```python
str | Secret
```

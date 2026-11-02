# Entity

> Abstract base for an entity within a connection.

Source: https://docs.tabsdata.com/api/category/spi/spi/entity

class

```python
class Entity(connection_type: ConnMetaModel)
```

Bases: [ABC](https://docs.python.org/3/library/abc.html#abc.ABC)

**Categories:** spi

Abstract base for an entity within a connection.

Every concrete entity carries a back-reference to the [`ConnMetaModel`](https://docs.tabsdata.com/api/category/spi/spi/connmetamodel) that produced it so that `fqn` can format the entity's fully qualified name using the meta-model's hierarchy.

## Parameters

parameter

`connection_type`[ConnMetaModel](https://docs.tabsdata.com/api/category/spi/spi/connmetamodel)

The [`ConnMetaModel`](https://docs.tabsdata.com/api/category/spi/spi/connmetamodel) that produced this entity.

## Methods

method

`fqn`

```python
def fqn() -> str
```

Return the fully qualified name of this entity.

The format follows the meta-model's hierarchy (e.g. SQL uses `database.schema.table`, storage uses `prefix/path`).

method

`field_names`

```python
def field_names() -> list[str]
```

Return the names of all fields/columns/properties here.

method

`to_dict`

```python
def to_dict() -> dict
```

Serialize the entity to a dict, omitting falsy values.

method

`from_dict`

```python
def from_dict(data: dict, connection_type: 'ConnMetaModel') -> 'Entity'
```

Rebuild an entity from `to_dict` output.

`connection_type` is supplied explicitly because it is a runtime reference, not part of the serialized dict.

**Parameters:**

parameter

`data`[dict](https://docs.python.org/3/builtins/stdtypes.html#dict)

parameter

`connection_type`'ConnMetaModel'

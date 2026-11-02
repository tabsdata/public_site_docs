# ConnMetaModel

> Abstract base for a connection *kind* (SQL, objects, storage, ...).

Source: https://docs.tabsdata.com/api/category/spi/spi/connmetamodel

class

```python
class ConnMetaModel
```

Bases: [ABC](https://docs.python.org/3/library/abc.html#abc.ABC)

**Categories:** spi

Abstract base for a connection _kind_ (SQL, objects, storage, ...).

## Methods

method

`entity_fqn`

```python
def entity_fqn(entity: dict) -> str
```

Format the fully qualified name of an entity.

**Parameters:**

parameter

`entity`[dict](https://docs.python.org/3/builtins/stdtypes.html#dict)

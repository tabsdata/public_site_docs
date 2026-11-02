# Explorer

> Optional connector capability for ad-hoc inspection of a live `Conn`: catalog metadata and arbitrary query execution.

Source: https://docs.tabsdata.com/api/category/spi/spi/explorer

class

```python
class Explorer(meta_model: ConnMetaModel, entity_type: type[Entity])
```

Bases: [ABC](https://docs.python.org/3/library/abc.html#abc.ABC)

**Categories:** spi

Optional connector capability for ad-hoc inspection of a live [`Conn`](https://docs.tabsdata.com/api/category/spi/spi/conn): catalog metadata and arbitrary query execution.

Used by tooling (UIs, schema diff), not by the flow runtime. Bound to a [`SrcDef`](https://docs.tabsdata.com/api/category/spi/spi/srcdef) / [`StreamSrcDef`](https://docs.tabsdata.com/api/category/spi/spi/streamsrcdef) / [`DestDef`](https://docs.tabsdata.com/api/category/spi/spi/destdef) via its `explorer` field.

## Parameters

parameter

`meta_model`[ConnMetaModel](https://docs.tabsdata.com/api/category/spi/spi/connmetamodel)

The [`ConnMetaModel`](https://docs.tabsdata.com/api/category/spi/spi/connmetamodel) describing this connection kind (set by the subclass).

parameter

`entity_type`[type](https://docs.python.org/3/builtins/functions.html#type)\[[Entity](https://docs.tabsdata.com/api/category/spi/spi/entity)\]

The concrete [`Entity`](https://docs.tabsdata.com/api/category/spi/spi/entity) type this explorer returns (set by the subclass).

## Methods

method

`check_connect`

```python
def check_connect(conn: C)
```

Verify that a connection can be established to `conn`.

Performs the smallest possible round-trip (open a session, issue a single-row query, list one resource, ...) and raises if it fails; returns `None` on success.

**Parameters:**

parameter

`conn`C

The connection to check.

method

`metadata`

```python
def metadata(conn: C) -> list[Entity] | None
```

Return the connection's catalog metadata (schemas, tables, columns).

**Parameters:**

parameter

`conn`C

method

`data`

```python
def data(conn: C, entity: Entity, limit: int = 100) -> list[dict] | None
```

Return up to `limit` sample rows from `entity`.

The base implementation returns `None` -- the connector does not support a row-level preview (file / object storage inherits this). SQL-like extractors override to issue a `SELECT` and return a list (empty when the entity has no rows -- still distinct from `None`).

**Parameters:**

parameter

`conn`C

The connection to query.

parameter

`entity`[Entity](https://docs.tabsdata.com/api/category/spi/spi/entity)

The entity to sample rows from.

parameter

`limit`[int](https://docs.python.org/3/builtins/functions.html#int)

Maximum number of rows to return.

**Returns:**

One dict per row, or `None` when row-level preview is

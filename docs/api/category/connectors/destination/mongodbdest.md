# MongoDBDest

> MongoDB destination for `@subscriber` -- one slot per collection.

Source: https://docs.tabsdata.com/api/category/connectors/destination/mongodbdest

class

```python
class MongoDBDest(
    collections_with_ids: CollectionsWithIdsSpec,
    if_collection_exists: IfTableExistsSpec = 'append',
    use_trxs: bool = False,
    docs_per_trx: int = 1000,
    maintain_order: bool = False,
    update_existing: bool = True,
    fail_on_duplicate_key: bool = True,
    log_intermediate_files: bool = False,
    dest_cfg: DestCfgSpec | None = None,
)
```

Bases: [Dest](https://docs.tabsdata.com/api/category/connectors/destination/dest)

**Categories:** destination

MongoDB destination for `@subscriber` -- one slot per collection.

## Examples

Append documents, letting MongoDB auto-generate `_id` (the id field is `None`):

```python
@subscriber(
    destination=MongoDBDest(
        collections_with_ids=[("cap_append", None)],
    ),
    input_tables=["caps_input/cap_rows"],
)
def publish(rows: TableFrameSpec) -> TableFrameSpec:
    return rows
```

Upsert on a natural key -- `code` becomes each document's `_id`, so re-runs update the same documents instead of inserting duplicates:

```python
@subscriber(
    destination=MongoDBDest(
        collections_with_ids=[("cap_upsert", "code")],
        update_existing=True,
    ),
    input_tables=["caps_input/cap_rows"],
)
def upsert(rows: TableFrameSpec) -> TableFrameSpec:
    return rows
```

## Parameters

parameter

`collections_with_ids`[CollectionsWithIdsSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-mongodb#tabsdatak.conn.mongodb.CollectionsWithIdsSpec) ([list](https://docs.python.org/3/library/stdtypes.html#list)\[[tuple](https://docs.python.org/3/library/stdtypes.html#tuple)\[[str](https://docs.python.org/3/library/stdtypes.html#str), [str](https://docs.python.org/3/library/stdtypes.html#str) | None\]\])

List of `(collection, id_field)` pairs, one write slot per entry. `collection` is the target collection, optionally qualified as `<database>.<collection>`; a bare `<collection>` targets the database named in the connection URI (a name up to 235 bytes, no NUL or `$`, not starting with `system.`). `id_field` is the document field used as the unique id, e.g. `("mydb.users", "user_id")`; pass `None` (e.g. `("mydb.logs", None)`) to let MongoDB auto-generate `_id`. An `id_field` may not be empty, contain `.` or NUL, or start with `$`.

parameter

`if_collection_exists`[IfTableExistsSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-mongodb#tabsdatak.conn.mongodb.IfTableExistsSpec) (Literal\['append', 'replace'\])

`"append"` (default) leaves existing documents in place; `"replace"` drops the collection first.

parameter

`use_trxs`[bool](https://docs.python.org/3/builtins/functions.html#bool)

When true, each batch of `docs_per_trx` documents is wrapped in a MongoDB transaction (requires a replica set).

parameter

`docs_per_trx`[int](https://docs.python.org/3/builtins/functions.html#int)

Max documents per write batch / transaction (default 1000; must be greater than 0).

parameter

`maintain_order`[bool](https://docs.python.org/3/builtins/functions.html#bool)

When true, documents are inserted in input order (slower but deterministic server-side ordering).

parameter

`update_existing`[bool](https://docs.python.org/3/builtins/functions.html#bool)

When true, documents whose id already exists are upserted (`UpdateOne` with `upsert=True`); when false, `InsertOne` is used and a collision aborts the batch. Ignored when `id_field` is `None` (auto-generated ids never collide).

parameter

`fail_on_duplicate_key`[bool](https://docs.python.org/3/builtins/functions.html#bool)

When true, a duplicate-key error is re-raised; when false it is logged and the batch continues.

parameter

`log_intermediate_files`[bool](https://docs.python.org/3/builtins/functions.html#bool)

When true, each intermediate JSONL chunk written to the work dir is logged before upload -- useful for debugging large writes.

parameter

`dest_cfg`[DestCfgSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-mongodb#tabsdatak.conn.mongodb.DestCfgSpec) | None (Mapping\[Literal\['mongodb.logging\_level'\], [Any](https://docs.python.org/3/library/typing.html#typing.Any)\] | None)

Optional connector config over the single key `mongodb.logging_level`. Note: `pymongo.*` options are read from the connection's `conn_cfg`, not here.

## Methods

method

`validate`

```python
def validate()
```

Validate that `docs_per_trx` is positive.

Called by the framework; raises `MongoDBValidateException`.

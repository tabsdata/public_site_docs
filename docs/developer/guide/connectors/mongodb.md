# MongoDB

> Reference for the Tabsdata MongoDB destination connector and subscriber configuration.

Source: https://docs.tabsdata.com/developer/guide/connectors/mongodb

The MongoDB connector lets Tabsdata subscribers write data from Tabsdata tables into MongoDB collections, one document per row.

[See the full subscriber walkthrough](https://docs.tabsdata.com/developer/tutorials/subscribers/mongodb)

The subscriber is registered in a collection created with a `MongoDBDestConn` connection. The connection, and how to create the collection, are described in [Connection](#connection), at the end of this page.

### Prerequisites

-   The MongoDB deployment is reachable from the Tabsdata server.
-   The MongoDB user can create and write the target collections, and can drop them when replace mode is used.
-   `use_trxs=True` requires a replica set or sharded cluster that supports transactions.

### Subscriber

Configure `MongoDBDest` as the `destination` of a subscriber function to define which MongoDB collections Tabsdata writes.

write\_orders.py

```python
from tabsdatak.api import subscriber, TableFrameSpec
from tabsdatak.conn.mongodb import MongoDBDest

@subscriber(
    destination=MongoDBDest(
        collections_with_ids=[("sales_db.orders", "order_id")],
    ),
    input_tables=["orders"],
)
def write_orders(orders: TableFrameSpec) -> TableFrameSpec:
    return orders
```

-   required
    
-   optional
    
-   optional
    
-   optional
    
-   optional
    
-   optional
    
-   optional
    
-   optional
    
-   optional
    

### Function Config Parameters

#### `collections_with_ids`

A list of `(collection, id_field)` pairs. `collection` is the target collection, written `<database>.<collection>` or as a bare `<collection>` in the database named in the connection URI. `id_field` is the field used as each document's `_id`; `None` lets MongoDB generate the ids.

Each pair in `collections_with_ids` represents one destination slot and maps positionally to a value returned by the subscriber function.

#### `if_collection_exists`

`"append"` (the default) leaves the existing documents in place. `"replace"` drops the collection before writing.

#### `update_existing`

When `True` (the default), a document whose id already exists is updated (an upsert). When `False`, documents are inserted and an existing id fails the batch. Ignored when `id_field` is `None`, since generated ids never collide.

#### `use_trxs` and `docs_per_trx`

`docs_per_trx` sets the documents per write batch, `1000` by default. With `use_trxs=True`, each batch is written in a MongoDB transaction, which requires a replica set.

#### `maintain_order`

When `True`, documents are inserted in input order. Slower, but the server-side order is deterministic.

#### `fail_on_duplicate_key`

When `True` (the default), a duplicate-key error fails the write. When `False`, it is logged and the batch continues.

#### `log_intermediate_files`

When `True`, each intermediate JSONL file is logged before upload, for debugging large writes.

#### `dest_cfg`

Sets additional destination configuration. The only accepted key is `mongodb.logging_level`. `pymongo.*` options go in the connection's `conn_cfg`.

## Write behavior

Each `(collection, id_field)` entry in `collections_with_ids` is one destination slot. A named `id_field` becomes the document `_id`; `None` lets MongoDB generate it.

`if_collection_exists="append"` keeps existing documents. `"replace"` drops the collection first. With `update_existing=True`, matching ids are upserted; with it disabled, the connector inserts and an id collision fails the batch.

## Operational notes

-   `docs_per_trx` is both the write-batch size and, when transactions are enabled, the number of documents per transaction.
-   `maintain_order=True` keeps input order but gives up some write throughput.
-   `fail_on_duplicate_key=False` logs duplicate-key errors and continues the batch. Use it only when skipping those documents is acceptable.
-   Tabsdata does not connect to MongoDB when the collection is created. URI, credential, topology, and permission errors appear when the subscriber runs.

## Connection

MongoDB subscribers use `MongoDBDestConn` to define the server and the credentials used by the subscriber.

conn-mongodb.yaml

```yaml
kind: connectionDef
apiVersion: '1.0'
type: tabsdatak.conn.mongodb:MongoDBDestConn
spec:
  uri: 'mongodb://mongo.internal:27017/sales_db'
  credentials:
    kind: userPasswordCredentials
    apiVersion: '1.0'
    type: tabsdatak.conn.common.types:UserPassword
    spec:
      user: 'secret:tabsdata_writer'
      password: 'secret:example-password'
```

-   required
    
-   required
    
-   optional
    

### Create the collection

A subscriber is registered in a destination collection, and a destination collection is created with its connection. Every function registered in the collection uses that connection.

Generate a connection template, which lists all the connection fields:

```bash
tdk connection template --type mongodb-out --file conn-mongodb.yaml
```

Edit the template file with the MongoDB connection information, check it, and create the collection with it:

```bash
tdk connection validate --file conn-mongodb.yaml
```

```bash
tdk collection create --name mongodb_out --conn-file conn-mongodb.yaml
```

Then register the subscriber in the collection:

```bash
tdk fn register --coll mongodb_out --path write_orders.py::write_orders
```

-   The collection goes in the `destinations` group, because the connection is a destination connection. `--group` can be left out; if it is given, it must be `destinations`.
-   `secret:<value>` gives a secret value in the file itself. `$secret:<ENV_VAR>` reads it from an environment variable when the collection is created, so the value never appears in the file. Either way, Tabsdata stores the secret separately, and the stored connection only shows a placeholder.
-   Functions in the collection must use the connector of its connection: `MongoDBDest` for a collection created with `MongoDBDestConn`. Transformers go in a collection of their own.
-   To change the connection later, for example to rotate a password, run `tdk collection update --name mongodb_out --conn-file conn-mongodb.yaml`. The connector cannot change; to use another one, create another collection.
-   Creating a source or destination collection requires permission to manage the project.

### Connection Config Parameters

#### `uri`

The MongoDB connection URI without credentials, starting with `mongodb://` or `mongodb+srv://`, for example `mongodb://host:27017/sales_db`. The database in the URI is the one bare collection names are written to. Accepts `secret:` too.

#### `credentials`

A `UserPassword` with the MongoDB user and password, spliced into the URI when the subscriber writes.

#### `conn_cfg`

Options for the MongoDB client. `pymongo.*` keys are forwarded to `pymongo.MongoClient`.

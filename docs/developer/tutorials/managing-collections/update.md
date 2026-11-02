# Update a Collection

Source: https://docs.tabsdata.com/developer/tutorials/managing-collections/update

Before you begin

[Create a Collection](https://docs.tabsdata.com/developer/tutorials/managing-collections/create)

`tdk collection update` changes a collection's name, its description, its storage path, or the connection it carries. What it cannot change is the collection's type or the group it belongs to: both are fixed at creation.

Step 1Rename it, or change its description

```bash
tdk collection update \
  --proj finance \
  --name sales_src \
  --new-name sales_source \
  --description "Postgres sales tables"
```

Renaming a source or destination collection renames its connection too, since the connection is named by the collection.

Step 2Or replace the connection

```bash
tdk collection update \
  --proj finance \
  --name sales_src \
  --conn-file conn-postgres-prod.yaml
```

The connector kind is fixed for the collection's life, so the replacement document has to be the same kind. Pointing a publisher at a different database means a new connection of the same kind, not a different connector.

Step 3Check the result

```bash
tdk collection get --proj finance --name sales_source
```

A request that changes nothing is rejected: _The collection update request has nothing to update_. When a rename and a connection change are passed together, the rename is applied first.

## What cannot be changed

The collection's type, and therefore its group, are immutable. There is no command that moves a collection to another group, and `CollectionUpdate` carries no field for it. Changing connectors means deleting the collection and creating it again.

`--storage-path` applies to new artifacts only. Existing data versions keep the path stamped at write time.

See [`tdk collection update`](https://docs.tabsdata.com/cli/tdk/collection/update) for the full option list.

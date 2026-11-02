# Create a Collection

Source: https://docs.tabsdata.com/developer/tutorials/managing-collections/create

Before you begin

[Create a Project](https://docs.tabsdata.com/developer/tutorials/managing-projects/create)

A collection holds functions and the tables they write. The group it is created in decides which kind of function it can hold, and that is fixed for the collection's life.

A source or destination collection also carries exactly one connection, and it is created together with that connection rather than separately.

Step 1Create a data product collection, for transformers

```bash
tdk collection create \
  --proj finance \
  --name reporting \
  --group default \
  --description "Reporting tables"
```

A collection in `default`, or in any group you created, holds transformers and takes no connection. Passing `--conn-file` here is an error.

Step 2Or create a source collection, with its connection

```bash
tdk collection create \
  --proj finance \
  --name sales_src \
  --group sources \
  --conn-file conn-postgres.yaml
```

`--conn-file` is required for `sources` and `destinations`. The CLI derives the group from the connection's direction, so `--group` acts as an assertion: a mismatch is an error rather than a preference.

Step 3Confirm it exists

```bash
tdk collection list --proj finance
tdk collection get --proj finance --name sales_src
```

`tdk collection get` prints a data product collection's type as **Data Factory**, which is the same thing the docs call a data product.

## Storage path

`--storage-path` is the logical prefix for the collection's artifacts, written as `base_path` in the API. Unset, it inherits the project's prefix, and the resolved value is readable as `effective_base_path`.

Changing it later is not retroactive: existing data versions keep the path they were written under, and only new artifacts use the new prefix.

## What to do next

[Register a function](https://docs.tabsdata.com/developer/tutorials/managing-functions/register) into the collection. A source collection takes publishers, a destination collection takes subscribers, and a data product collection takes transformers.

See [`tdk collection create`](https://docs.tabsdata.com/cli/tdk/collection/create) for the full option list.

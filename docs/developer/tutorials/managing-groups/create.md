# Create a Group

Source: https://docs.tabsdata.com/developer/tutorials/managing-groups/create

Before you begin

[Create a Project](https://docs.tabsdata.com/developer/tutorials/managing-projects/create)

A group sits inside a project and holds collections. Which group a collection is created in fixes what that collection can hold, and that choice is permanent.

Three groups exist in every project already: `sources` for publishers, `destinations` for subscribers, and `default` for transformers. A group you create yourself holds transformers too, so the reason to add one is organising a pipeline rather than unlocking anything new.

Step 1Create the group

```bash
tdk group create \
  --proj finance \
  --name bronze \
  --description "Raw ingested data"
```

`--proj` names the project the group belongs to, and can be omitted when a project is pinned. Collections created in `bronze` hold transformers, the same as `default`.

Step 2Confirm it exists

```bash
tdk group list --proj finance
```

The three seeded groups are listed alongside it. System groups cannot be renamed or deleted.

## Why add a group at all

Collections in a user-created group hold transformers, which `default` already does, so grouping is organisational. The medallion layout, `bronze` then `silver` then `gold`, is a common convention for naming the stages of a pipeline; it is a docs convention rather than something Tabsdata enforces.

## What to do next

[Create a Collection](https://docs.tabsdata.com/developer/tutorials/managing-collections/create) in the group.

See [`tdk group create`](https://docs.tabsdata.com/cli/tdk/group/create) for the full option list.

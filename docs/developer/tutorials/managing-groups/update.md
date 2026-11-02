# Update a Group

Source: https://docs.tabsdata.com/developer/tutorials/managing-groups/update

Before you begin

[Create a Group](https://docs.tabsdata.com/developer/tutorials/managing-groups/create)

`tdk group update` changes a group's name or description. The collections inside it are untouched, and so is what those collections are allowed to hold.

Step 1Rename the group, or change its description

```bash
tdk group update \
  --proj finance \
  --name bronze \
  --new-name raw \
  --description "Raw ingested data"
```

`--name` is the current name and `--new-name` the replacement. Either `--new-name` or `--description` is enough on its own.

Step 2Check the result

```bash
tdk group get --proj finance --name raw
```

The three system groups, `default`, `sources` and `destinations`, cannot be updated at all.

## What a rename does not change

A collection's type follows from the group it was created in, and renaming the group does not revisit that. A collection created in `sources` still holds publishers after the group is called something else.

See [`tdk group update`](https://docs.tabsdata.com/cli/tdk/group/update) for the full option list.

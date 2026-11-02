# Update a Project

Source: https://docs.tabsdata.com/developer/tutorials/managing-projects/update

Before you begin

[Create a Project](https://docs.tabsdata.com/developer/tutorials/managing-projects/create)

`tdk project update` changes a project's name or its description. Both are metadata: renaming a project does not move, rebuild or re-path anything inside it.

Step 1Rename the project, or change its description

```bash
tdk project update \
  --name finance \
  --new-name billing \
  --description "Subscription billing and dunning"
```

`--name` names the project as it stands now; `--new-name` is what it becomes. Passing only `--description` changes the description and leaves the name alone.

Step 2Check the result

```bash
tdk project get --name billing
```

A request that changes nothing is rejected rather than silently accepted, with _The project update request has nothing to update_.

## What a rename does not change

The project keeps its id, its groups, its collections and their data. Anything referring to the project by id keeps working; anything referring to it by name, a pinned project or a script passing `--proj`, needs the new name.

See [`tdk project update`](https://docs.tabsdata.com/cli/tdk/project/update) for the full option list.

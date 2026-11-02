# Create a Project

Source: https://docs.tabsdata.com/developer/tutorials/managing-projects/create

Before you begin

[Install Tabsdata](https://docs.tabsdata.com/developer/server-admin/install)

[Start a Server](https://docs.tabsdata.com/developer/server-admin/start)

A project is the outermost resource within Tabsdata server and allows full isolation from workflows and resources in other projects.

Step 1Create the project

```bash
tdk project create \
  --name finance \
  --description "Subscription billing"
```

`--name` starts with a letter and continues with letters, digits or underscores, up to 100 characters, and has to be unique on the server. `--description` is optional and capped at 200 characters.

Step 2Confirm it exists and see its groups

```bash
tdk project list
tdk group list --proj finance
```

The three seeded groups appear straight away. A collection created in `sources` holds publishers, one in `destinations` holds subscribers, and one in `default` or any group you add yourself holds transformers.

## Pin it, so later commands need no `--proj`

Most commands take `--proj` to say which project they act on. Pinning one makes it the default:

```bash
tdk project pin --name finance
```

Every later command then acts on `finance` unless it passes `--proj` explicitly.

## What to do next

A project on its own holds nothing. Create a collection in one of its groups: [Create a Collection](https://docs.tabsdata.com/developer/tutorials/managing-collections/create).

See [`tdk project create`](https://docs.tabsdata.com/cli/tdk/project/create) for the full option list.

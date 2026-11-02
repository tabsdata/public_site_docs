# tdk group create

> Create a new group

Source: https://docs.tabsdata.com/cli/tdk/group/create

Create a new group

```bash
tdk group create \
  --proj quickstart \
  --name bronze \
  --description Ingests raw sales data from Postgres \
  --profile production
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `--proj, -P` | string | Optional | Project to target; overrides the pinned project. Prompted for when a command needs one and neither is set. |
| `--name, -n` | string | Required | Name of the group to create. |
| `--description` | string | Optional | Description of the group. |
| `--profile` | string | Optional | Profile whose connection and settings this command uses: '<NAME>-connection.json' and '<NAME>-options.json' under the Tabsdata directory. Default: the profile set with 'tdk set --profile', else 'connection.json' and 'options.json'. |

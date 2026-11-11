# tdk group update

> Update a group by name. System groups cannot be updated.

Source: https://docs.tabsdata.com/cli/tdk/group/update

Update a group by name. System groups cannot be updated.

```bash
tdk group update \
  --proj quickstart \
  --format table \
  --name bronze \
  --new-name sales_data_v2 \
  --description Ingests raw sales data from Postgres \
  --profile production
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `--proj, -P` | string | Optional | Project to target; overrides the pinned project. Prompted for when a command needs one and neither is set. |
| `-o, --format` | table \| json \| yaml | Optional | Output format. 'json' and 'yaml' give a listing as an array and table data as one object per row. |
| `--name, -n` | string | Required | Name of the group to update. |
| `--new-name` | string | Optional | New name for the group. |
| `--description` | string | Optional | New description for the group. |
| `--profile` | string | Optional | Profile whose login and pinned project and collection this command uses; with no NAME, the default profile. Default: the profile set with 'tdk set --profile', else the default profile. |

# tdk project delete

> Delete a project by name.

Source: https://docs.tabsdata.com/cli/tdk/project/delete

Delete a project by name.

```bash
tdk project delete \
  --format table \
  --name quickstart \
  --confirm delete \
  --profile production
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `-o, --format` | table \| json \| yaml | Optional | Output format. 'json' and 'yaml' give a listing as an array and table data as one object per row. |
| `--name, -n` | string | Required | Name of the project to delete. |
| `--confirm` | string | Required | Write 'delete' to confirm deletion. Will be prompted for it if not provided. |
| `--profile` | string | Optional | Profile whose login and pinned project and collection this command uses; with no NAME, the default profile. Default: the profile set with 'tdk set --profile', else the default profile. |

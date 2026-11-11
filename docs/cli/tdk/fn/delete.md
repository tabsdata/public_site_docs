# tdk fn delete

> Delete a function

Source: https://docs.tabsdata.com/cli/tdk/fn/delete

Delete a function

```bash
tdk fn delete \
  --proj quickstart \
  --format table \
  --name read_world \
  --coll <function pinned.<locals>.default at 0x10b614d60> \
  --confirm delete \
  --profile production
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `--proj, -P` | string | Optional | Project to target; overrides the pinned project. Prompted for when a command needs one and neither is set. |
| `-o, --format` | table \| json \| yaml | Optional | Output format. 'json' and 'yaml' give a listing as an array and table data as one object per row. |
| `--name, -n` | string | Required | Name of the function to be deleted. |
| `--coll, -c` | string | Optional | Name of the collection to which the function belongs. Defaults to `<function pinned.<locals>.default at 0x10b614d60>`. |
| `--confirm` | string | Required | Write 'delete' to confirm deletion. Will be prompted for it if not provided. |
| `--profile` | string | Optional | Profile whose login and pinned project and collection this command uses; with no NAME, the default profile. Default: the profile set with 'tdk set --profile', else the default profile. |

# tdk cron disable

> Disable a cron-triggered function

Source: https://docs.tabsdata.com/cli/tdk/cron/disable

Disable a cron-triggered function

'tdk fn disable' restricted to functions that have a cron trigger; disabling an already-disabled one does nothing.

```bash
tdk cron disable \
  --proj quickstart \
  --format table \
  --name sales_data \
  --coll <function pinned.<locals>.default at 0x10b6c9a80> \
  --profile production
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `--proj, -P` | string | Optional | Project to target; overrides the pinned project. Prompted for when a command needs one and neither is set. |
| `-o, --format` | table \| json \| yaml | Optional | Output format. 'json' and 'yaml' give a listing as an array and table data as one object per row. |
| `--name, -n` | string | Optional | Name of the cron-triggered function to disable. |
| `--coll, -c` | string | Optional | Name of the collection to which the function belongs. Defaults to `<function pinned.<locals>.default at 0x10b6c9a80>`. |
| `--profile` | string | Optional | Profile whose login and pinned project and collection this command uses; with no NAME, the default profile. Default: the profile set with 'tdk set --profile', else the default profile. |
